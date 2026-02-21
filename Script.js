const tg = window.Telegram.WebApp;
tg.expand(); // Make the app full screen

// Set the username from Telegram
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('username').innerText = user.first_name;
}

function showSection(name) {
    const content = document.getElementById('content');
    if(name === 'tasks') content.innerHTML = "<h3>Earn by following channels...</h3>";
    if(name === 'cruise') content.innerHTML = "<h3>Watch & Earn Cruise Points</h3>";
    if(name === 'upload') content.innerHTML = "<h3>Upload your Funny Clips</h3>";
}
