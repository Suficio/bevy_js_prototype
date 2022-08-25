// Demonstrates a startup system (one that runs once when the app starts up).
//
// JavaScript systems operate on different rules than those defined in Rust.
// In fact, systems here are just functions that request data from the Bevy
// world, thus we demonstrate how to implement similar behaviour.

(async () => {
  await startup_system();

  // [normal_system] runs in lockstep with Bevy frames.
  // Note that [startup_system] blocks on the await, therefore,
  // [normal_frame] will only run on the frame after [startup_system].
  for (let i = 0; i < 4; i++) {
    await normal_system();
  }
})();

async function startup_system() {
  await Bevy.system();
  Deno.core.print("startup system ran first\n");
}

async function normal_system() {
  await Bevy.system();
  Deno.core.print("normal system ran second\n");
}
