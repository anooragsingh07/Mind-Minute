// Section navigation logic
const sections = {
  home: document.getElementById('home'),
  breathing: document.getElementById('breathing'),
  yoga: document.getElementById('yoga'),
  meditation: document.getElementById('meditation'),
};

let originalShowSection = showSection;
function showSection(section) {
  Object.values(sections).forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('active');
  });
  sections[section].classList.remove('hidden');
  sections[section].classList.add('active');

  // Handle section-specific logic
  if (section === 'breathing') {
    onShowBreathing();
  } else if (section === 'yoga') {
    onShowYoga();
  } else {
    resetBreathing();
    resetYoga();
  }
}

// Home buttons
const breathingBtn = document.getElementById('breathing-btn');
const yogaBtn = document.getElementById('yoga-btn');
const meditationBtn = document.getElementById('meditation-btn');

breathingBtn.addEventListener('click', () => showSection('breathing'));
yogaBtn.addEventListener('click', () => showSection('yoga'));
meditationBtn.addEventListener('click', () => showSection('meditation'));

// Go Home buttons
const breathingHome = document.getElementById('breathing-home');
const yogaHome = document.getElementById('yoga-home');
const meditationHome = document.getElementById('meditation-home');

breathingHome.addEventListener('click', () => showSection('home'));
yogaHome.addEventListener('click', () => showSection('home'));
meditationHome.addEventListener('click', () => showSection('home'));

// Start with home section
showSection('home');

// Breathing Exercise Logic
const breathCircle = document.getElementById('breath-circle');
const breathText = document.getElementById('breath-text');
const breathTimer = document.getElementById('breath-timer');
const breathingHomeBtn = document.getElementById('breathing-home');

let breathInterval = null;
let breathTimeout = null;
let breathTotalTimeout = null;
let breathSeconds = 60;
let breathPhase = 0; // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold

function resetBreathing() {
  clearInterval(breathInterval);
  clearTimeout(breathTimeout);
  clearTimeout(breathTotalTimeout);
  breathSeconds = 60;
  breathPhase = 0;
  breathTimer.textContent = breathSeconds;
  breathText.textContent = 'Inhale... Hold... Exhale...';
  breathCircle.style.transform = 'scale(1)';
  breathingHomeBtn.textContent = 'Go Home';
  breathingHomeBtn.disabled = false;
}

function startBreathing() {
  resetBreathing();
  let phaseDurations = [4000, 4000, 4000, 4000]; // ms: Inhale, Hold, Exhale, Hold
  let phaseTexts = ['Inhale...', 'Hold...', 'Exhale...', 'Hold...'];
  let phaseScales = [1.4, 1.4, 1, 1];
  let phase = 0;

  function nextPhase() {
    breathText.textContent = phaseTexts[phase];
    breathCircle.style.transform = `scale(${phaseScales[phase]})`;
    phase = (phase + 1) % 4;
    breathTimeout = setTimeout(nextPhase, phaseDurations[phase]);
  }

  // Start the animation
  nextPhase();

  // Timer countdown
  breathInterval = setInterval(() => {
    breathSeconds--;
    breathTimer.textContent = breathSeconds;
    if (breathSeconds <= 0) {
      clearInterval(breathInterval);
    }
  }, 1000);

  // Stop after 60 seconds
  breathTotalTimeout = setTimeout(() => {
    clearInterval(breathInterval);
    clearTimeout(breathTimeout);
    breathText.textContent = 'Well done!';
    breathingHomeBtn.textContent = 'Restart';
    breathingHomeBtn.disabled = false;
  }, 60000);
}

// When entering the breathing section, start the exercise
function onShowBreathing() {
  startBreathing();
}

// Restart breathing if 'Restart' is shown
breathingHomeBtn.addEventListener('click', () => {
  if (breathingHomeBtn.textContent === 'Restart') {
    startBreathing();
  }
});

// Yoga Pose Logic
const yogaImg = document.getElementById('yoga-img');
const yogaName = document.getElementById('yoga-name');
const yogaBenefit = document.getElementById('yoga-benefit');
const nextPoseBtn = document.getElementById('next-pose');
const yogaTimer = document.getElementById('yoga-timer');

const yogaPoses = [
  {
    name: 'Tadasana (Mountain Pose)',
    benefit: 'Improves posture and balance.',
    image: 'assets/yoga1.svg'
  },
  {
    name: 'Sukhasana (Easy Pose)',
    benefit: 'Calms the mind and reduces anxiety.',
    image: 'assets/yoga2.svg'
  },
  {
    name: 'Balasana (Child\'s Pose)',
    benefit: 'Relieves stress and fatigue.',
    image: 'assets/yoga3.svg'
  }
];

let currentPoseIndex = 0;
let yogaInterval = null;
let yogaSeconds = 60;
let poseTimeout = null;

function updateYogaPose(index) {
  const pose = yogaPoses[index];
  yogaImg.src = pose.image;
  yogaName.textContent = pose.name;
  yogaBenefit.textContent = pose.benefit;
}

function resetYoga() {
  clearInterval(yogaInterval);
  clearTimeout(poseTimeout);
  currentPoseIndex = 0;
  yogaSeconds = 60;
  yogaTimer.textContent = yogaSeconds;
  updateYogaPose(currentPoseIndex);
}

function startYoga() {
  resetYoga();
  
  // Timer countdown
  yogaInterval = setInterval(() => {
    yogaSeconds--;
    yogaTimer.textContent = yogaSeconds;
    if (yogaSeconds <= 0) {
      clearInterval(yogaInterval);
    }
  }, 1000);

  // Auto-advance pose every 20 seconds
  function advancePose() {
    currentPoseIndex = (currentPoseIndex + 1) % yogaPoses.length;
    updateYogaPose(currentPoseIndex);
    poseTimeout = setTimeout(advancePose, 20000);
  }
  
  poseTimeout = setTimeout(advancePose, 20000);
}

// Manual pose advancement
nextPoseBtn.addEventListener('click', () => {
  currentPoseIndex = (currentPoseIndex + 1) % yogaPoses.length;
  updateYogaPose(currentPoseIndex);
  // Reset the auto-advance timer
  clearTimeout(poseTimeout);
  poseTimeout = setTimeout(() => {
    currentPoseIndex = (currentPoseIndex + 1) % yogaPoses.length;
    updateYogaPose(currentPoseIndex);
  }, 20000);
});

// When entering the yoga section, start the exercise
function onShowYoga() {
  startYoga();
} 