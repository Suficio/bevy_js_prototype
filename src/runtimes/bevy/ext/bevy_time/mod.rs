use crate as bjs;
use bjs::include_js_files;

mod time;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_time",
            "04_stopwatch.js",
            "04_time.js",
            "05_timer.js",
        ))
        .ops(vec![
            time::op_time_delta::decl(),
            time::op_time_delta_seconds::decl(),
            time::op_time_seconds_since_startup::decl(),
            time::op_time_since_startup::decl(),
        ])
        .build()
}
