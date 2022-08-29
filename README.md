# bevy_js_prototype

Prototype JavaScript itegration with the Bevy game engine that allows you to write first class systems with all the freedom that JavaScript affords you.

# bevy_js_prototype

Prototype JavaScript itegration with the Bevy game engine that allows you to write first class systems with all the freedom that JavaScript affords you.

```diff
- This codebase is seriously unstable, basic features are not implemented, and you can easily expect the whole structure of the codebase to change at anytime.
```

That being said, we already have:

- Bevy and Deno (JavaScript engine) integration running on Bevy's task pools and in lockstep with the World.
- Ability to create Entities and assign Components to them in JavaScript
- Automatic generation of the majority of Bevy reflectable types
- In-browser Deno inspector for easy debugging

---

I intend to develop the feature set of this prototype, by replicating relevant Bevy examples, therefore the best usage documentation can currently be found in the [examples](examples) directory.

The nearest features you can expect:

- JavaScript file loading via Bevy asset server with built-in hot-reloading
- Query support, potentially some automatic entity state synchronization
- Quality of life features like Bevy bundles
- TypeScript, hopefully

---

Sounds good, what are the current limitations?

- No Query support
- Waiting on features on Bevy and Deno side
- General lack of possibilities :)

## Getting started

You can inspect the current extent of the possibilities of the prototype by looking into the examples.

```
cargo run --example hello_world
```

### Using the inspector

The prototype provides a JavaScript inspector which you can use to peer into your running JavaScript code, it is hidden behind the `#[cfg(feature="inspector")]` flag. The simplest way to try it out is by firing up the following example:

```
cargo run --example inspector
```

Using Chrome or Edge you can open up `chrome://inspect` or `edge://inspect` in your browser, and a runtime, `bevy_js "bevy_js::runtimes::bevy::BevyRuntime"`, will appear, ready for inspection.

### Generating JavaScript definitions

There is a built-in generator that generates JavaScript definitions for Bevy reflect types, it can be ran using:

```
cargo run --features="generator" --bin generator
```
