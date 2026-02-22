async function sendCruise() {
    const val = document.getElementById('studio-input').value;
    if(!val.trim()) return;

    const { error } = await sb.from('posts').insert([{ 
        username: myName, 
        content: val 
    }]);
    
    if(!error) {
        // 1. Reset input
        document.getElementById('studio-input').value = "";
        
        // 2. Close the Studio overlay
        closeStudio();
        
        // 3. Force switch to Home tab
        tab('home');
        
        // 4. Refresh the data
        load();
        
        tg.HapticFeedback.notificationOccurred('success');
    } else {
        tg.showAlert("Post failed: " + error.message);
    }
}
