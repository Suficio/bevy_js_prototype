// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

use bevy::utils::Uuid;
use dc::{
    futures::channel,
    serde_json::{json, Value},
};
use deno_core as dc;
use std::{net::SocketAddr, process};

/// Information for inspector how to connect to a runtime
pub struct InspectorInfo {
    pub host: SocketAddr,
    pub uuid: Uuid,
    pub name: String,
    pub new_session_tx: channel::mpsc::UnboundedSender<dc::InspectorSessionProxy>,
    pub deregister_rx: channel::oneshot::Receiver<()>,
    pub inspector_should_wait: bool,
}

impl InspectorInfo {
    pub fn new(
        host: SocketAddr,
        uuid: Uuid,
        name: String,
        new_session_tx: channel::mpsc::UnboundedSender<dc::InspectorSessionProxy>,
        deregister_rx: channel::oneshot::Receiver<()>,
        inspector_should_wait: bool,
    ) -> Self {
        Self {
            host,
            uuid,
            name,
            new_session_tx,
            deregister_rx,
            inspector_should_wait,
        }
    }

    pub fn uuid(&self) -> Uuid {
        self.uuid
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn json_version_response() -> Value {
        json!({
          "Browser": "BevyJS",
          "Protocol-Version": "1.3",
          "V8-Version": dc::v8_version(),
        })
    }

    pub fn json_metadata(&self) -> Value {
        json!({
          "description": "deno",
          "devtoolsFrontendUrl": self.frontend_url(),
          "faviconUrl": "https://deno.land/favicon.ico",
          "id": self.uuid.to_string(),
          "title": self.title(),
          "type": "node",
          "url": self.name().to_string(),
          "webSocketDebuggerUrl": self.websocket_debugger_url(),
        })
    }

    pub fn websocket_debugger_url(&self) -> String {
        format!("ws://{}/ws/{}", &self.host, &self.uuid)
    }

    pub fn frontend_url(&self) -> String {
        format!(
            "devtools://devtools/bundled/js_app.html?ws={}/ws/{}&experiments=true&v8only=true",
            &self.host, &self.uuid
        )
    }

    pub fn title(&self) -> String {
        format!("bevy_js \"{}\" [pid: {}]", self.name(), process::id(),)
    }
}
