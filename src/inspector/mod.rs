// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

mod info;
mod server;
mod websocket;

pub use info::InspectorInfo;

use bevy::{prelude::*, tasks::IoTaskPool};
use deno_core::futures::channel;
use std::net::SocketAddr;

#[derive(Clone)]
pub struct InspectorMeta {
    pub host: SocketAddr,
    pub register_inspector_tx: channel::mpsc::UnboundedSender<InspectorInfo>,
}

/// `Websocket` server that is used to proxy connections from
/// devtools to the inspector.
pub struct JsInspector {
    meta: InspectorMeta,
    shutdown_server_tx: Option<channel::oneshot::Sender<()>>,
}

impl JsInspector {
    pub fn new(host: SocketAddr) -> Self {
        let (register_inspector_tx, register_inspector_rx) =
            channel::mpsc::unbounded::<InspectorInfo>();
        let (shutdown_server_tx, shutdown_server_rx) = channel::oneshot::channel();

        IoTaskPool::get()
            .spawn(async move {
                server::initialize_inspector_server(
                    host,
                    shutdown_server_rx,
                    register_inspector_rx,
                )
                .await;

                warn!("JsInspector server has stopped");
            })
            .detach();

        let meta = InspectorMeta {
            host,
            register_inspector_tx,
        };

        Self {
            meta,
            shutdown_server_tx: Some(shutdown_server_tx),
        }
    }

    pub fn meta(&self) -> &InspectorMeta {
        &self.meta
    }
}

impl Drop for JsInspector {
    fn drop(&mut self) {
        if let Some(shutdown_server_tx) = self.shutdown_server_tx.take() {
            if shutdown_server_tx.is_canceled() {
                return error!(
                    "Could not shutdown inspector as the receiver has already been dropped"
                );
            };

            if let Err(_) = shutdown_server_tx.send(()) {
                error!("Failed to shutdown inspector");
            }
        }
    }
}
