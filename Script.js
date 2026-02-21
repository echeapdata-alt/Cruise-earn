const tg = window.Telegram.WebApp;
tg.expand();

// 3-Second 3D Intro Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        // Hide the 3D layer
        document.getElementById('intro-layer').style.display = 'none';
        // Show the actual app
        document.getElementById('main-app').style.display = 'block';
        // Re-enable scrolling for the feed
        document.body.style.overflow = 'auto';
    }, 3000); 
});

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('show');
}

function showSection(section) {
    toggleMenu();
    const content = document.getElementById('feed-area');
    if (section === 'tasks') {
        content.innerHTML = "<div class='post-card'><h2>Tasks</h2><p>Follow channels to earn!</p></div>";
    } else {
        location.reload();
    }
}
