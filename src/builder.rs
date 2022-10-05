use crate as bjs;
use std::rc::Rc;

/// A helper builder for `bevy_js` JavaScript
/// [RuntimeOptions](bjs::RuntimeOptions)
#[derive(Default)]
pub struct JsRuntimeBuilder {
    options: bjs::RuntimeOptions,
}

impl JsRuntimeBuilder {
    pub fn new() -> Self {
        JsRuntimeBuilder {
            options: bjs::RuntimeOptions::default(),
        }
    }

    pub fn extensions(&mut self) -> &mut Vec<bjs::Extension> {
        &mut self.options.extensions
    }

    // /// Whether inspector should break on the first line and wait
    // pub fn inspector_should_wait(mut self, inspector_should_wait: bool) -> Self {
    //     self.options.worker.should_break_on_first_statement = inspector_should_wait;
    //     self
    // }

    /// Sets the module loader to use to load `JavaScript`
    pub fn with_module_loader(mut self, loader: Rc<dyn bjs::ModuleLoader>) -> Self {
        self.options.module_loader.replace(loader);
        self
    }

    /// Adds JavaScript [bjs::Extension]
    pub fn with_extension(mut self, extension: bjs::Extension) -> Self {
        self.options.extensions.push(extension);
        self
    }

    /// Builds [bjs::JsRuntime]
    pub fn build(self) -> bjs::JsRuntime {
        bjs::JsRuntime::new(self.options)
    }
}
