// Theme preference only
const preferences = {
    theme: localStorage.getItem('theme') || 'light'
};

// Initialize theme
document.documentElement.setAttribute('data-theme', preferences.theme);
updateThemeButton();

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    preferences.theme = preferences.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', preferences.theme);
    localStorage.setItem('theme', preferences.theme);
    updateThemeButton();
});

function updateThemeButton() {
    const themeButton = document.getElementById('themeToggle');
    themeButton.textContent = preferences.theme === 'light' ? '🌙' : '☀️';
}

// Modal content loaders
function loadBreathing() {
    document.getElementById('breathingContent').innerHTML = `
        <h2>Breathing Exercise</h2>
        <div class="breathing-circle" id="breathingCircle"></div>
        <div class="breathing-text" id="breathingText">Inhale... Hold... Exhale...</div>
        <div class="timer" id="breathingTimer">60</div>
        <div class="controls">
            <button onclick="closeModal('breathingModal')">Back</button>
            <button id="restartBreathing">Restart</button>
        </div>
    `;
    startBreathingTimer();
    document.getElementById('restartBreathing').onclick = startBreathingTimer;
}

let breathingInterval;
function startBreathingTimer() {
    clearInterval(breathingInterval);
    let timeLeft = 60;
    const timerDisplay = document.getElementById('breathingTimer');
    const breathingText = document.getElementById('breathingText');
    const breathingCircle = document.getElementById('breathingCircle');
    if (breathingCircle) breathingCircle.style.animation = 'breathe 8s infinite ease-in-out';
    function updateTimer() {
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(breathingInterval);
            if (breathingCircle) breathingCircle.style.animation = 'none';
            breathingText.textContent = "Exercise complete!";
        }
        timeLeft--;
    }
    breathingText.textContent = "Inhale... Hold... Exhale...";
    updateTimer();
    breathingInterval = setInterval(updateTimer, 1000);
}

function loadYoga() {
    document.getElementById('yogaContent').innerHTML = `
        <h2>Quick Yoga Pose</h2>
        <div class="pose-container">
            <img src="assets/tadasana.jpg" alt="Tadasana" class="pose-image" id="poseImage">
            <h3 class="pose-title" id="poseTitle">Tadasana (Mountain Pose)</h3>
            <p class="pose-description" id="poseDescription">Stand tall with feet together, arms at sides. Feel grounded and centered.</p>
        </div>
        <div class="timer" id="yogaTimer">20</div>
        <div class="controls">
            <button onclick="closeModal('yogaModal')">Back</button>
            <button id="nextPoseBtn">Next Pose</button>
        </div>
    `;
    startYogaTimer();
    document.getElementById('nextPoseBtn').onclick = nextYogaPose;
}

const poses = [
    {
        title: "Tadasana (Mountain Pose)",
        description: "Stand tall with feet together, arms at sides. Feel grounded and centered.",
        image: "assets/tadasana.jpg"
    },
    {
        title: "Sukhasana (Easy Pose)",
        description: "Sit cross-legged with a straight spine. Place hands on knees, palms up.",
        image: "assets/sukhasana.jpg"
    },
    {
        title: "Balasana (Child's Pose)",
        description: "Kneel and fold forward, arms extended. Rest forehead on the ground.",
        image: "assets/balasana.jpg"
    }
];
let currentPose = 0;
let yogaInterval;
function startYogaTimer() {
    clearInterval(yogaInterval);
    let timeLeft = 20;
    const timerDisplay = document.getElementById('yogaTimer');
    function updateTimer() {
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            nextYogaPose();
            timeLeft = 20;
        }
        timeLeft--;
    }
    updateYogaPose();
    updateTimer();
    yogaInterval = setInterval(updateTimer, 1000);
}
function nextYogaPose() {
    currentPose = (currentPose + 1) % poses.length;
    updateYogaPose();
    startYogaTimer();
}
function updateYogaPose() {
    const pose = poses[currentPose];
    document.getElementById('poseImage').src = pose.image;
    document.getElementById('poseTitle').textContent = pose.title;
    document.getElementById('poseDescription').textContent = pose.description;
}

function loadMeditation() {
    document.getElementById('meditationContent').innerHTML = `
        <h2>1-Minute Meditation</h2>
        <div class="meditation-text">Focus on your breath...<br>Let thoughts pass like clouds in the sky...</div>
        <div class="timer-circle" id="meditationTimer">60</div>
        <div class="controls">
            <button onclick="closeModal('meditationModal')">Back</button>
            <button id="restartMeditation">Restart</button>
        </div>
    `;
    startMeditationTimer();
    document.getElementById('restartMeditation').onclick = startMeditationTimer;
}
let meditationInterval;
function startMeditationTimer() {
    clearInterval(meditationInterval);
    let timeLeft = 60;
    const timerDisplay = document.getElementById('meditationTimer');
    function updateTimer() {
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(meditationInterval);
            timerDisplay.textContent = "Done";
        }
        timeLeft--;
    }
    updateTimer();
    meditationInterval = setInterval(updateTimer, 1000);
}

// Service Worker Registration for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
} 