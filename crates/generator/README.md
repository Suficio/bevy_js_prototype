### Generating JavaScript definitions

Generator that generates JavaScript definitions for Bevy reflect types, it can be ran using:

```diff
- Be warned that the generator will overwrite existing files which will have to
- be corrected when comitting
```

```
cargo run -- -t ../../src/runtimes/bevy/ext -p
```
