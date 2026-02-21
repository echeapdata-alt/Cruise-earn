// Expand the Telegram window immediately
window.Telegram.WebApp.expand();

// THE 3-SECOND TIMER
setTimeout(function() {
    console.log("Switching to Main App...");
    
    // Hide the Intro
    document.getElementById('intro-layer').style.display = 'none';
    
    // Show the App
    document.getElementById('main-app').style.display = 'block';
    
    // Allow scrolling
    document.body.style.overflow = 'auto';
}, 3000);

function toggleMenu() {
    var menu = document.getElementById('side-menu');
    menu.classList.toggle('active');
}

function showSection(name) {
    toggleMenu();
    var feed = document.getElementById('feed-view');
    var studio = document.getElementById('studio-view');
    
    if(name === 'studio') {
        feed.style.display = 'none';
        studio.style.display = 'block';
    } else {
        feed.style.display = 'block';
        studio.style.display = 'none';
    }
}
