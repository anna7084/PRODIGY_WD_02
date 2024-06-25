// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapsArray = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(() => {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        display.innerHTML = formatTime(difference);
    }, 10);
    running = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    running = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    lapsArray = [];
}

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        let lapTime = formatTime(difference);
        lapsArray.push(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsArray.length}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
        startStopButton.textContent = 'Stop';
    } else {
        stopStopwatch();
        startStopButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
