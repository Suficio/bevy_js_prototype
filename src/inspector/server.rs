// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

use crate::inspector::{websocket, InspectorInfo};
use bevy::{prelude::*, tasks::IoTaskPool, utils::Uuid};
use core::convert::Infallible as Never;
use deno_core::{
    futures::{channel, future, pin_mut, select, stream::StreamExt, task::Poll, FutureExt},
    parking_lot::Mutex,
    serde_json::Value,
};
use std::{collections::HashMap, net::SocketAddr, sync::Arc};
use tide::{Request, Response};
use tide_websockets::WebSocket;

pub type InspectorInfoMap = Arc<Mutex<HashMap<Uuid, InspectorInfo>>>;

pub async fn initialize_inspector_server(
    host: SocketAddr,
    shutdown_server_rx: channel::oneshot::Receiver<()>,
    register_inspector_rx: channel::mpsc::UnboundedReceiver<InspectorInfo>,
) {
    let inspector_map: InspectorInfoMap = Arc::new(Mutex::new(HashMap::new()));

    let register_inspector_map = inspector_map.clone();
    let register_inspector_handler = register_inspector_rx
        .map(|info| {
            let mut map = register_inspector_map.lock();

            // Only display for first inspector
            if map.is_empty() {
                info!("Visit chrome://inspect or edge://inspect to connect to inspectors");
            }

            info!("Registered inspector for {}", info.name());

            if info.inspector_should_wait {
                info!(
                    "Waiting for debugger to connect on {}",
                    info.websocket_debugger_url()
                );
            }

            // Freely overwrite old info if we are dealing with a reload
            map.insert(info.uuid(), info);
        })
        .collect::<()>()
        .fuse();

    let deregister_inspector_map = inspector_map.clone();
    let deregister_inspector_handler = future::poll_fn(|cx| {
        deregister_inspector_map
            .lock()
            .retain(|_, info| info.deregister_rx.poll_unpin(cx) == Poll::Pending);

        Poll::<Never>::Pending
    })
    .fuse();

    let server_handler = inspector_server(host, inspector_map).fuse();

    pin_mut!(shutdown_server_rx);
    pin_mut!(register_inspector_handler);
    pin_mut!(deregister_inspector_handler);
    pin_mut!(server_handler);

    select! {
        _ = shutdown_server_rx => (),
        _ = register_inspector_handler => (),
        _ = deregister_inspector_handler => unreachable!(),
        _ = server_handler => (),
    };
}

async fn inspector_server(
    host: SocketAddr,
    inspector_map: InspectorInfoMap,
) -> Result<(), std::io::Error> {
    let mut app = tide::with_state(inspector_map);

    app.at("/ws/*").get(WebSocket::new(
        |req: Request<InspectorInfoMap>, mut stream| async move {
            let uuid = websocket::inspector_uuid(req.url(), &mut stream).await?;
            let inspector_map = req.state();

            IoTaskPool::get()
                .spawn(websocket::handle_ws_request(
                    uuid,
                    inspector_map.clone(),
                    stream,
                ))
                .detach();

            Ok(())
        },
    ));

    app.at("/json")
        .get(|req: Request<InspectorInfoMap>| async move {
            handle_json_request(req.state().clone())
        });
    app.at("/json/list")
        .get(|req: Request<InspectorInfoMap>| async move {
            handle_json_request(req.state().clone())
        });
    app.at("/json/version")
        .get(|_req| async { handle_json_version_request() });

    app.listen(host).await
}

fn handle_json_request(inspector_map: InspectorInfoMap) -> Result<Response, tide::Error> {
    let data = inspector_map
        .lock()
        .values()
        .map(|meta| meta.json_metadata())
        .collect::<Vec<_>>();

    let response = Response::builder(tide::StatusCode::Ok)
        .content_type(tide::http::mime::JSON)
        .body(Value::Array(data))
        .build();

    Ok(response)
}

fn handle_json_version_request() -> Result<Response, tide::Error> {
    let response = Response::builder(tide::StatusCode::Ok)
        .content_type(tide::http::mime::JSON)
        .body(InspectorInfo::json_version_response())
        .build();

    Ok(response)
}
