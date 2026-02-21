const tg = window.Telegram.WebApp;
tg.expand();

// Force the Transition
window.onload = function() {
    console.log("App Started...");
    
    setTimeout(() => {
        // 1. Hide Intro
        const intro = document.getElementById('intro-layer');
        if(intro) intro.style.display = 'none';
        
        // 2. Show App
        const app = document.getElementById('main-app');
        if(app) {
            app.style.display = 'block';
            setTimeout(() => { app.style.opacity = '1'; }, 50);
        }
        
        // 3. Enable Scroll
        document.body.style.overflow = 'auto';
        console.log("Feed is now visible");
    }, 3000); 
};

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
}

function showSection(name) {
    toggleMenu();
    const feed = document.getElementById('feed-view');
    const studio = document.getElementById('studio-view');
    
    if(name === 'studio') {
        feed.style.display = 'none';
        studio.style.display = 'block';
    } else {
        feed.style.display = 'block';
        studio.style.display = 'none';
    }
}
