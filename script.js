let timer;
let isRunning = false;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function updateDisplay(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay(0);
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${display.textContent}`;
        lapsContainer.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
