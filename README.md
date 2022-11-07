# bevy_js_prototype

Prototype JavaScript itegration with the Bevy game engine that allows you to write first class systems with all the freedom that JavaScript affords you.

```diff
- This codebase is seriously unstable, basic features are not implemented, and
- you can easily expect the whole structure of the codebase to change at anytime.
```

That being said, we already have:

- Direct integration between JS and Bevy Worlds
- Ability to manage Entities and their Components
- Query support
- Automatic generation of Bevy `Reflect` types
- In-browser Deno inspector for easy debugging

---

I intend to develop the feature set of this prototype, by replicating relevant Bevy examples, therefore the best usage documentation can currently be found in the [examples](examples) directory.

The nearest features you can expect:

- Component registration on the JS side
- JavaScript file loading via Bevy asset server with built-in hot-reloading
- TypeScript, hopefully

---

Sounds good, what are the current limitations?

- Waiting on Bevy features that would allow dynamic queries, this is currently worked around using a custom fork.

## Getting started

You can inspect the current extent of the possibilities of the prototype by looking into the examples.

```
cargo run --example hello_world
```

### Using the inspector

The prototype provides a JavaScript inspector which you can use to peer into your running JavaScript code, it is hidden behind the `#[cfg(feature="inspector")]` flag. The simplest way to try it out is by firing up the following example:

```
cargo run --features="inspector" --example inspector
```

Using Chrome or Edge you can open up `chrome://inspect` or `edge://inspect` in your browser, and a runtime, `bevy_js "bevy_js::runtimes::bevy::BevyRuntime"`, will appear, ready for inspection.

### Generating JavaScript definitions

There is a built-in generator that generates JavaScript definitions for Bevy reflect types, more information is available in [bevy_js_generator/README.md](crates/bevy_js_generator/README.md).
