const tg = window.Telegram.WebApp;
tg.expand();

// Splash sequence
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    }, 2500);
});

// Menu Toggle
function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
}

function showSection(section) {
    toggleMenu(); // Close menu
    const feed = document.getElementById('feed-container');
    
    // Switch content based on button click
    if(section === 'tasks') {
        feed.innerHTML = "<h2>Active Tasks</h2><div class='video-card'>Task: Follow @OurBot (+50 pts)</div>";
    } else if(section === 'home') {
        location.reload(); // Returns to video feed
    }
    // Add more section logic here
}
