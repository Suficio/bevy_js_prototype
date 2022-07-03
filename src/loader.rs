use crate as bjs;
use bjs::{
    anyhow::{Context, Error as AnyError},
    futures::FutureExt,
};
use std::pin::Pin;

/// Basic file system module loader.
///
/// Note that this loader will **block** event loop
/// when loading file as it uses synchronous FS API
/// from standard library.
pub struct FsModuleLoader;

impl bjs::ModuleLoader for FsModuleLoader {
    fn resolve(
        &self,
        specifier: &str,
        referrer: &str,
        _is_main: bool,
    ) -> Result<bjs::ModuleSpecifier, AnyError> {
        Ok(bjs::resolve::import(specifier, referrer)?)
    }

    fn load(
        &self,
        module_specifier: &bjs::ModuleSpecifier,
        _maybe_referrer: Option<bjs::ModuleSpecifier>,
        _is_dynamic: bool,
    ) -> Pin<Box<bjs::ModuleSourceFuture>> {
        let module_specifier = module_specifier.clone();
        async move {
            let mut path = module_specifier.to_file_path().map_err(|_| {
                AnyError::msg(format!(
                    "Provided module specifier \"{}\" is not a file URL.",
                    module_specifier
                ))
            })?;

            if let None = path.extension() {
                path.set_extension("js");
            }

            let module_type = if let Some(extension) = path.extension() {
                let ext = extension.to_string_lossy().to_lowercase();
                if ext == "json" {
                    bjs::ModuleType::Json
                } else {
                    bjs::ModuleType::JavaScript
                }
            } else {
                bjs::ModuleType::JavaScript
            };

            let code = std::fs::read(path.clone())
                .with_context(|| format!("Could not load {}", module_specifier))?;

            Ok(bjs::ModuleSource {
                code: code.into_boxed_slice(),
                module_type,
                module_url_specified: module_specifier.to_string(),
                module_url_found: module_specifier.to_string(),
            })
        }
        .boxed_local()
    }
}
