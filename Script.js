const tg = window.Telegram.WebApp;
tg.expand();

// Handle the 3-second 3D Intro
window.addEventListener('load', () => {
    setTimeout(() => {
        const intro = document.getElementById('intro-layer');
        const main = document.getElementById('main-app');
        
        // Hide intro and show main app
        intro.style.display = 'none';
        main.style.display = 'block';
        
        // Allow scrolling now that the app is visible
        document.body.style.overflow = 'auto';
    }, 3000); 
});

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
}

function showSection(name) {
    toggleMenu();
    if(name === 'tasks') {
        document.getElementById('feed').innerHTML = "<h2>Tasks</h2><p>Coming Soon...</p>";
    } else {
        location.reload();
    }
}
