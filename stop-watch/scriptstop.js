let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  document.getElementById("time").textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let totalSeconds = Math.floor(ms / 1000);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let hours = Math.floor(totalSeconds / 3600);

  return (
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    "." +
    milliseconds.toString().padStart(3, "0")
  );
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  document.getElementById("time").textContent = "00:00:00.000";
}

function resetTimer() {
  stopTimer();
  document.getElementById("laps").innerHTML = "";
  lapCounter = 1;
}

function recordLap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = "Lap " + lapCounter + ": " + lapTime;
    document.getElementById("laps").appendChild(li);
    lapCounter++;
  }
}
