// Theme and sound preferences
const preferences = {
    theme: localStorage.getItem('theme') || 'light',
    sound: localStorage.getItem('sound') === 'true'
};

// Initialize theme
document.documentElement.setAttribute('data-theme', preferences.theme);
updateThemeButton();

// Initialize sound
updateSoundButton();

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    preferences.theme = preferences.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', preferences.theme);
    localStorage.setItem('theme', preferences.theme);
    updateThemeButton();
});

// Sound toggle
document.getElementById('soundToggle').addEventListener('click', () => {
    preferences.sound = !preferences.sound;
    localStorage.setItem('sound', preferences.sound);
    updateSoundButton();
});

function updateThemeButton() {
    const themeButton = document.getElementById('themeToggle');
    themeButton.textContent = preferences.theme === 'light' ? '🌙' : '☀️';
}

function updateSoundButton() {
    const soundButton = document.getElementById('soundToggle');
    soundButton.textContent = preferences.sound ? '🔊' : '🔇';
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