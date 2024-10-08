let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCount = 0;
}

function addLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
        laps.appendChild(lapTime);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-audio');
    const playbtn = document.getElementById('playAudioBtn');
    const pausebtn = document.getElementById('pauseAudioBtn');
    const mutebtn = document.getElementById('muteAudioBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    playbtn.addEventListener('click', function() {
        audio.play();
    });

    pausebtn.addEventListener('click', function() {
        audio.pause();
    });

    mutebtn.addEventListener('click', function() {
        audio.muted = !audio.muted;
        mutebtn.textContent = audio.muted ? 'Unmute' : 'Mute';
    });

    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
    });

    // Initialize volume slider with the current audio volume
    volumeSlider.value = audio.volume;
});


startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
