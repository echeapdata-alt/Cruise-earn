const tg = window.Telegram.WebApp;
tg.expand();

// 1. Loading Simulation
window.onload = () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    }, 3000); // 3 seconds of "loading" for the iconic feel
};

// 2. Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('menu-open');
}

// 3. Section Switcher
function showSection(name) {
    toggleMenu(); // Close menu after clicking
    const content = document.getElementById('content');
    // Logic to load sections...
}
