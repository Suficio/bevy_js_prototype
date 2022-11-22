// Demonstrates a startup system (one that runs once when the app starts up).
//
// JavaScript systems operate on different rules than those defined in Rust.
// In fact, systems here are just functions that request data from the Bevy
// world, thus we demonstrate how to implement similar behaviour.

(async () => {
  startup_system();

  // [normal_system] runs in lockstep with Bevy frames.
  // Note that [startup_system] blocks on the await, therefore, [normal_frame]
  // will only run during the first four frames after [startup_system].
  for (let i = 0; i < 4; i++) {
    await Bevy.ecs.nextFrame();
    normal_system(i);
  }
})();

function startup_system() {
  console.log("startup system ran first");
}

function normal_system(i) {
  console.log(`normal system ran ${i + 1} time`);
}
