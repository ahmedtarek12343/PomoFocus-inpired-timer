const body = document.querySelector("body");
const modeBtns = document.querySelectorAll(".modeBtn");
const timeFrame = document.getElementById("timeFrame");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");

const timeMap = new Map([
  ["Pomodoro", "25:00"],
  ["Short Break", "05:00"],
  ["Long Break", "15:00"],
]);

modeBtns.forEach((mode) => {
  mode.addEventListener("click", setActiveMode);
});

function setActiveMode(e) {
  modeBtns.forEach((mode) => mode.classList.remove("active"));
  e.target.classList.add("active");
  applyActiveStyle(e.target.textContent.trim());
}

function getActive() {
  for (let mode of modeBtns) {
    if (mode.classList.contains("active")) {
      return mode.textContent.trim();
    }
  }
}

function applyActiveStyle(mode) {
  switch (mode) {
    case "Pomodoro":
      applyPomodoroStyles();
      break;
    case "Short Break":
      applyShortBreakStyles();
      break;
    case "Long Break":
      applyLongBreakStyles();
      break;
    default:
      console.log("Invalid name");
  }
}

function applyPomodoroStyles() {
  body.style.backgroundColor = "rgb(186, 73, 73)";
  timeFrame.textContent = "25:00";
}

function applyShortBreakStyles() {
  body.style.backgroundColor = "rgb(56 133 138)";
  timeFrame.textContent = "05:00";
}

function applyLongBreakStyles() {
  body.style.backgroundColor = "rgb(57 112 151)";
  timeFrame.textContent = "15:00";
}

startBtn.addEventListener("click", startPauseTimer);

let timerInterval;
let lastTimeFrame;
function startPauseTimer() {
  if (startBtn.classList.contains("active")) {
    // Pause
    clearInterval(timerInterval);
    startBtn.textContent = "Start";
    startBtn.classList.remove("active"); // store paused time
  } else {
    // Resume or start
    startBtn.classList.add("active");
    startBtn.textContent = "Pause";
    let [minutes, seconds] = timeFrame.textContent.split(":").map(Number); // converts both to numbers directly

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerInterval);
          startBtn.textContent = "Start";
          startBtn.classList.remove("active");
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      timeFrame.textContent = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }, 1000);
  }
}

function getCurrentTime() {
  return timeFrame.textContent;
}

resetBtn.addEventListener("click", () => {
  timeFrame.textContent = timeMap.get(getActive());
  startBtn.textContent = "Start";
  startBtn.classList.remove("active");
  clearInterval(timerInterval);
});
