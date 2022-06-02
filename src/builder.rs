use crate as bjs;
use deno_core as dc;
use std::rc::Rc;

/// A helper builder for `bevy_js` JavaScript
/// [RuntimeOptions](bjs::RuntimeOptions)
pub struct JsRuntimeBuilder {
    options: bjs::RuntimeOptions,
}

impl Default for JsRuntimeBuilder {
    fn default() -> Self {
        JsRuntimeBuilder {
            options: bjs::RuntimeOptions::default(),
        }
    }
}

impl JsRuntimeBuilder {
    // /// Whether an inspector should be registered for this
    // /// [JsRuntime](bjs::JsRuntime)
    // pub fn register_inspector(mut self, register_inspector: bool) -> Self {
    //     self.options.register_inspector = register_inspector;
    //     self
    // }

    // /// Whether inspector should break on the first line and wait
    // pub fn inspector_should_wait(mut self, inspector_should_wait: bool) -> Self {
    //     self.options.worker.should_break_on_first_statement = inspector_should_wait;
    //     self
    // }

    /// Sets the module loader to use to load `JavaScript`
    pub fn with_module_loader(&mut self, loader: Rc<dyn dc::ModuleLoader>) -> &mut Self {
        self.options.module_loader.replace(loader);
        self
    }

    /// Adds JavaScript [Extension](bjs::Extension)
    pub fn with_extension(&mut self, extension: bjs::Extension) -> &mut Self {
        self.options.extensions.push(extension);
        self
    }

    /// Builds [bjs::JsRuntime]
    pub fn build(self) -> bjs::JsRuntime {
        bjs::JsRuntime::new(self.options)
    }
}
