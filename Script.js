// Call this inside your initApp() function after getting the user data
        function setupReferral() {
            try {
                const user = tg.initDataUnsafe?.user;
                if(user && user.id) {
                    // Replace 'YourBotName' with your actual bot username
                    const botUsername = "CruiseEarnBot"; 
                    const refLink = `https://t.me/${botUsername}?start=${user.id}`;
                    document.getElementById('referral-link').value = refLink;
                }
            } catch(e) { console.error("Ref Setup Error", e); }
        }

        function copyRef() {
            const linkInput = document.getElementById('referral-link');
            linkInput.select();
            linkInput.setSelectionRange(0, 99999); // For mobile
            
            // Use Telegram's clipboard if available, otherwise fallback
            if (tg.readTextFromClipboard) {
                navigator.clipboard.writeText(linkInput.value);
            } else {
                navigator.clipboard.writeText(linkInput.value);
            }
            
            tg.HapticFeedback.notificationOccurred('success');
            tg.showAlert("Link copied! Share it with your friends.");
        }

        // Add setupReferral() to your initApp()
        // Example:
        // function initApp() {
        //    ... existing code ...
        //    setupReferral();
        // }
