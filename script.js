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

// Motivational quotes/tips for each activity
const quotes = {
    breathing: [
        "Breathe in calm, breathe out stress.",
        "Let each breath bring you back to the present.",
        "A minute of mindful breathing can change your whole day."
    ],
    yoga: [
        "Yoga is the journey of the self, through the self, to the self.",
        "A pose held in stillness brings peace to the mind.",
        "Let your breath guide your movement."
    ],
    meditation: [
        "Peace comes from within. Do not seek it without.",
        "Let thoughts pass like clouds in the sky.",
        "Inhale calm, exhale tension."
    ]
};

function randomQuote(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Modal content loaders
function loadBreathing() {
    document.getElementById('breathingContent').innerHTML = `
        <div class="quote">${randomQuote(quotes.breathing)}</div>
        <h2 id="breathingTitle">Breathing Exercise</h2>
        <div class="breathing-anim-wrapper">
            <div class="breathing-anim-circle"></div>
            <div class="breathing-anim-text" id="breathingAnimText">Inhale...</div>
        </div>
        <div class="breathing-text" id="breathingText">Inhale... Hold... Exhale...</div>
        <div class="timer" id="breathingTimer">60</div>
        <div class="controls">
            <button onclick="closeModal('breathingModal')">Back</button>
            <button id="restartBreathing">Restart</button>
        </div>
    `;
    startBreathingTimer();
    document.getElementById('restartBreathing').onclick = startBreathingTimer;
    startBreathingAnimText();
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

// Breathing animation text cue
let breathingAnimInterval;
function startBreathingAnimText() {
    clearInterval(breathingAnimInterval);
    const animText = document.getElementById('breathingAnimText');
    const phases = ["Inhale...", "Hold...", "Exhale...", "Hold..."];
    let phase = 0;
    function updateAnimText() {
        if (animText) animText.textContent = phases[phase % phases.length];
        phase++;
    }
    updateAnimText();
    breathingAnimInterval = setInterval(updateAnimText, 2000); // 2s per phase, 8s total
}
// Stop animation when modal closes
const breathingModal = document.getElementById('breathingModal');
if (breathingModal) {
    breathingModal.addEventListener('transitionend', () => {
        if (breathingModal.style.display === 'none') clearInterval(breathingAnimInterval);
    });
}

function loadYoga() {
    document.getElementById('yogaContent').innerHTML = `
        <div class="quote">${randomQuote(quotes.yoga)}</div>
        <h2 id="yogaTitle">Quick Yoga Pose</h2>
        <div class="pose-container">
            <div class="yoga-breath-circle"></div>
            <div id="yogaImageWrapper"></div>
            <h3 class="pose-title" id="poseTitle">Tadasana (Mountain Pose)</h3>
            <p class="pose-description" id="poseDescription">Stand tall with feet together, arms at sides. Feel grounded and centered.</p>
            <div class="yoga-breath-text" id="yogaBreathText" style="margin-top:1rem;font-size:1.1rem;font-weight:500;color:var(--primary-color);">Inhale...</div>
        </div>
        <div class="timer" id="yogaTimer">20</div>
        <div class="controls">
            <button onclick="closeModal('yogaModal')">Back</button>
            <button id="nextPoseBtn">Next Pose</button>
        </div>
    `;
    updateYogaPose();
    startYogaTimer();
    document.getElementById('nextPoseBtn').onclick = nextYogaPose;
    startYogaBreathAnimation();
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
    },
    {
        title: "Vrikshasana (Tree Pose)",
        description: "Stand on one leg, place the other foot on your inner thigh, and bring palms together overhead.",
        image: "assets/tree.jpg"
    },
    {
        title: "Bhujangasana (Cobra Pose)",
        description: "Lie on your stomach, place hands under shoulders, and gently lift your chest.",
        image: "assets/cobra.jpg"
    },
    {
        title: "Adho Mukha Svanasana (Downward Dog)",
        description: "Form an inverted V with your body, hands and feet on the mat, hips up.",
        image: "assets/downwarddog.jpg"
    },
    {
        title: "Virabhadrasana II (Warrior II)",
        description: "Step one foot back, bend the front knee, and extend arms out to the sides.",
        image: "assets/warrior2.jpg"
    },
    {
        title: "Utkatasana (Chair Pose)",
        description: "Stand with feet together, bend knees, and reach arms overhead.",
        image: "assets/chair.jpg"
    },
    {
        title: "Trikonasana (Triangle Pose)",
        description: "Stand with feet wide, reach one hand to your shin/ankle, other arm up, chest open.",
        image: "assets/triangle.jpg"
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

// SVG illustrations for each asana
const asanaSVGs = {
    "Tadasana (Mountain Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><path d='M32 44c-4 0-8 2-10 6h20c-2-4-6-6-10-6z' fill='#B8C6DB'/><circle cx='32' cy='24' r='8' fill='#B8C6DB'/><path d='M32 32v12' stroke='#B8C6DB' stroke-width='2' stroke-linecap='round'/></svg>`,
    "Sukhasana (Easy Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><path d='M22 50c2-4 8-4 10 0M42 50c-2-4-8-4-10 0' stroke='#B8C6DB' stroke-width='2' fill='none'/><circle cx='32' cy='28' r='8' fill='#B8C6DB'/></svg>`,
    "Balasana (Child's Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><ellipse cx='32' cy='48' rx='12' ry='6' fill='#B8C6DB'/><rect x='24' y='32' width='16' height='10' rx='5' fill='#B8C6DB'/></svg>`,
    "Vrikshasana (Tree Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><rect x='30' y='24' width='4' height='20' rx='2' fill='#B8C6DB'/><circle cx='32' cy='16' r='8' fill='#B8C6DB'/><ellipse cx='44' cy='32' rx='4' ry='10' fill='#B8C6DB' opacity='0.5'/></svg>`,
    "Bhujangasana (Cobra Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><rect x='20' y='40' width='24' height='8' rx='4' fill='#B8C6DB'/><ellipse cx='32' cy='36' rx='8' ry='6' fill='#B8C6DB'/></svg>`,
    "Adho Mukha Svanasana (Downward Dog)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><polygon points='16,52 32,32 48,52' fill='#B8C6DB'/></svg>`,
    "Virabhadrasana II (Warrior II)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><rect x='28' y='24' width='8' height='20' rx='4' fill='#B8C6DB'/><rect x='8' y='32' width='48' height='6' rx='3' fill='#B8C6DB'/><circle cx='32' cy='16' r='8' fill='#B8C6DB'/></svg>`,
    "Utkatasana (Chair Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><rect x='28' y='32' width='8' height='12' rx='4' fill='#B8C6DB'/><rect x='24' y='24' width='16' height='6' rx='3' fill='#B8C6DB'/><circle cx='32' cy='16' r='8' fill='#B8C6DB'/></svg>`,
    "Trikonasana (Triangle Pose)": `<svg class='yoga-fallback-icon' viewBox='0 0 64 64'><ellipse cx='32' cy='56' rx='16' ry='4' fill='#B8C6DB'/><polygon points='16,52 32,20 48,52' fill='#B8C6DB'/></svg>`
};

function updateYogaPose() {
    const pose = poses[currentPose];
    document.getElementById('yogaImageWrapper').innerHTML = asanaSVGs[pose.title] || asanaSVGs["Tadasana (Mountain Pose)"];
    document.getElementById('poseTitle').textContent = pose.title;
    document.getElementById('poseDescription').textContent = pose.description;
}

function loadMeditation() {
    document.getElementById('meditationContent').innerHTML = `
        <div class="quote">${randomQuote(quotes.meditation)}</div>
        <h2 id="meditationTitle">1-Minute Meditation</h2>
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

// Optional: SVG icon color polish for dark mode
function updateSVGColors() {
    const isDark = preferences.theme === 'dark';
    document.querySelectorAll('.card-icon svg').forEach(svg => {
        svg.querySelectorAll('path, ellipse, circle, rect').forEach(el => {
            el.setAttribute('stroke', isDark ? '#B8C6DB' : '#6B8EAD');
            el.setAttribute('fill', isDark ? '#B8C6DB' : '#6B8EAD');
        });
    });
}
updateSVGColors();
// Update SVG colors on theme change
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', updateSVGColors);

// Yoga inhale/exhale animation text
let yogaBreathInterval;
function startYogaBreathAnimation() {
    clearInterval(yogaBreathInterval);
    const breathText = document.getElementById('yogaBreathText');
    let phase = 0;
    function updateBreath() {
        if (!breathText) return;
        if (phase % 2 === 0) {
            breathText.textContent = 'Inhale...';
        } else {
            breathText.textContent = 'Exhale...';
        }
        phase++;
    }
    updateBreath();
    yogaBreathInterval = setInterval(updateBreath, 4000); // 4s inhale, 4s exhale
}
// Stop animation when modal closes
const yogaModal = document.getElementById('yogaModal');
if (yogaModal) {
    yogaModal.addEventListener('transitionend', () => {
        if (yogaModal.style.display === 'none') clearInterval(yogaBreathInterval);
    });
} 