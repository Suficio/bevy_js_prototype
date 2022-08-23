// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

use super::server::InspectorInfoMap;
use bevy::{prelude::*, utils::Uuid};
use dc::{
    anyhow::Error as AnyError,
    futures::{channel, pin_mut, select, stream::StreamExt, FutureExt},
};
use deno_core as dc;

use tide_websockets::{
    tungstenite::protocol::{frame::coding::CloseCode, CloseFrame},
    Message, WebSocketConnection,
};

pub async fn inspector_uuid(
    url: &dc::ModuleSpecifier,
    stream: &mut WebSocketConnection,
) -> Result<Uuid, tide::Error> {
    match url
        .path()
        .strip_prefix("/ws/")
        .and_then(|s| Uuid::parse_str(s).ok())
    {
        Some(uuid) => Ok(uuid),
        None => {
            stream
                .send(Message::Close(Some(CloseFrame {
                    code: CloseCode::Error,
                    reason: "Malformed inspector UUID".into(),
                })))
                .await
                .map_err(|err| {
                    tide::Error::from_str(
                    tide::StatusCode::FailedDependency,
                    format!(
                        "Could not close WebSocket connection after receiving malformed inspector UUID due to: {}",
                        err
                    )
                )
                })?;

            Err(tide::Error::from_str(
                tide::StatusCode::BadRequest,
                "Malformed inspector UUID",
            ))
        }
    }
}

pub async fn handle_ws_request(
    uuid: Uuid,
    inspector_map: InspectorInfoMap,
    stream: WebSocketConnection,
) -> Result<(), tide::Error> {
    // Avoid holding Mutex while calling await
    let new_session_tx = inspector_map
        .lock()
        .get(&uuid)
        .map(|info| info.new_session_tx.clone());

    match new_session_tx {
        Some(new_session_tx) => {
            pump_websocket_messages(stream, new_session_tx).await;
            Ok(())
        }
        None => {
            stream
                .send(Message::Close(Some(CloseFrame {
                    code: CloseCode::Error,
                    reason: "Invalid inspector UUID".into(),
                })))
                .await
                .map_err(|err| {
                    tide::Error::from_str(
                        tide::StatusCode::FailedDependency,
                        format!(
                            "Could not close WebSocket connection after receiving invalid inspector UUID due to: {}",
                            err
                        )
                    )
                })?;

            Err(tide::Error::from_str(
                tide::StatusCode::NotFound,
                "Invalid inspector UUID",
            ))
        }
    }
}

pub async fn pump_websocket_messages(
    stream: WebSocketConnection,
    new_session_tx: channel::mpsc::UnboundedSender<dc::InspectorSessionProxy>,
) {
    // The 'outbound' channel carries messages sent to the websocket.
    let (outbound_tx, outbound_rx) = channel::mpsc::unbounded();
    // The 'inbound' channel carries messages received from the websocket.
    let (inbound_tx, inbound_rx) = channel::mpsc::unbounded();

    let inspector_session_proxy = dc::InspectorSessionProxy {
        tx: outbound_tx,
        rx: inbound_rx,
    };

    let _ = new_session_tx.unbounded_send(inspector_session_proxy);

    let outbound_stream = stream.clone();
    let outbound_pump = outbound_rx
        .then(|msg| async { outbound_stream.send_string(msg.content).await })
        .filter_map(|item| async {
            let _ = item.map_err(|err| error!("{}", err));
            None
        })
        .collect::<()>()
        .fuse();

    let inbound_stream = stream.clone();
    let inbound_pump = inbound_stream
        .map(|item| {
            inbound_tx
                .unbounded_send(item?.into_text()?)
                .map_err(|err| AnyError::new(err.into_send_error()))
        })
        .filter_map(|item| async {
            let _ = item.map_err(|err| error!("{}", err));
            None
        })
        .collect::<()>()
        .fuse();

    pin_mut!(outbound_pump);
    pin_mut!(inbound_pump);

    select!(
        _ = outbound_pump => (),
        _ = inbound_pump => ()
    );

    warn!("Debugger session ended");
}
