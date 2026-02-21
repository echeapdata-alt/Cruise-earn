// Expand Telegram
window.Telegram.WebApp.expand();

function forceOpen() {
    console.log("Forcing App Open...");
    const intro = document.getElementById('intro-layer');
    const app = document.getElementById('main-app');
    
    if(intro) intro.style.display = 'none';
    if(app) app.style.display = 'block';
    document.body.style.overflow = 'auto';
}

// Auto-open after 3 seconds
setTimeout(forceOpen, 3000);

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
}

function showSection(name) {
    toggleMenu();
    const feed = document.getElementById('feed-view');
    // For now, just a simple alert to prove it works
    if(name !== 'home') {
        alert("Opening " + name);
    }
}
