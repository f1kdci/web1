let seconds = 0;
let interval = null;

function tick() {
  seconds++;
  postMessage({ type: "tick", seconds }); // Send the updated seconds to the main thread
}

onmessage = function (e) {
  const command = e.data;

  if (command === "start") {
    if (!interval) {
      interval = setInterval(tick, 1000); // Start the timer if not already running
      postMessage({ type: "status", message: "Timer started" });
    }
  } else if (command === "stop") {
    if (interval) {
      clearInterval(interval); // Stop the timer
      interval = null;
      postMessage({ type: "status", message: "Timer stopped" });
    }
  } else if (command === "reset") {
    clearInterval(interval); // Stop the timer
    interval = null;
    seconds = 0; // Reset the seconds
    postMessage({ type: "tick", seconds }); // Send the reset seconds to the main thread
    postMessage({ type: "status", message: "Timer reset" });
  }
};
