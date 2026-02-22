const tg = window.Telegram.WebApp;
const SB_URL = "https://chsybopznpfdvhmdspox.supabase.co"; 
const SB_KEY = "sb_publishable_IfqycsZxpWeXgSPA5U7D5w_u-nl_FJf";
const sb = supabase.createClient(SB_URL, SB_KEY);
const myName = tg.initDataUnsafe?.user?.first_name || "Guest";

let recorder, chunks = [], isLocked = false, startY = 0, voiceBlob = null;
const vBtn = document.getElementById('voice-btn');

// --- FEED LOGIC (Ensures everything shows) ---
async function load() {
    const { data, error } = await sb.from('posts').select('*').order('created_at', { ascending: false });
    if(error) return console.error(error);
    
    const feed = document.getElementById('feed');
    feed.innerHTML = data.map(p => `
        <div class="post">
            <div class="u-info"><div class="u-pfp">${p.username ? p.username[0] : 'C'}</div><b>@${p.username || 'cruiser'}</b></div>
            ${p.content ? `<p style="margin-bottom:10px;">${p.content}</p>` : ''}
            ${p.image_url ? `<img src="${p.image_url}" style="width:100%; border-radius:12px; border:1px solid #1e293b;">` : ''}
            ${p.video_url ? `<video src="${p.video_url}" controls style="width:100%; border-radius:12px;"></video>` : ''}
            ${p.voice_url ? `<audio src="${p.voice_url}" controls style="width:100%; margin-top:10px;"></audio>` : ''}
        </div>
    `).join('');
}

// --- VOICE LOGIC (Hold & Swipe) ---


vBtn.addEventListener('touchstart', async (e) => {
    e.preventDefault();
    startY = e.touches[0].clientY;
    isLocked = false; chunks = [];
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        recorder.start();
        
        document.getElementById('rec-dot').style.display = 'inline';
        vBtn.innerText = "🎙️ SLIDE UP TO LOCK";
        vBtn.style.color = "#ff4444";
        tg.HapticFeedback.impactOccurred('medium');

        recorder.ondataavailable = (ev) => chunks.push(ev.data);
        recorder.onstop = () => {
            voiceBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            document.getElementById('media-preview-box').style.display = 'block';
            document.getElementById('p-voice').style.display = 'block';
            document.getElementById('rec-dot').style.display = 'none';
        };
    } catch (err) {
        tg.showAlert("Mic access denied!");
    }
});

vBtn.addEventListener('touchmove', (e) => {
    if (startY - e.touches[0].clientY > 70 && !isLocked) {
        isLocked = true;
        vBtn.innerText = "🔒 RECORDING LOCKED";
        tg.HapticFeedback.notificationOccurred('success');
    }
});

vBtn.addEventListener('touchend', () => {
    if (!isLocked && recorder && recorder.state === "recording") {
        recorder.stop();
        vBtn.innerText = "🎤 Hold to Record";
        vBtn.style.color = "#fff";
    }
});

// --- SEND LOGIC ---
async function sendCruise() {
    const text = document.getElementById('studio-input').value;
    const img = document.getElementById('img-in').files[0];
    const vid = document.getElementById('vid-in').files[0];
    let fUrl = null;

    tg.MainButton.setText("SENDING...").show();

    // 1. Upload Media
    const file = img || vid || (voiceBlob ? new File([voiceBlob], "voice.ogg") : null);
    if (file) {
        const path = `media/${Date.now()}_${file.name || 'voice.ogg'}`;
        const { data, error } = await sb.storage.from('media').upload(path, file);
        if (!error) {
            fUrl = sb.storage.from('media').getPublicUrl(path).data.publicUrl;
        }
    }

    // 2. Insert Post
    const { error } = await sb.from('posts').insert([{ 
        username: myName, 
        content: text, 
        image_url: img ? fUrl : null, 
        video_url: vid ? fUrl : null, 
        voice_url: voiceBlob ? fUrl : null 
    }]);

    if(!error) {
        tg.MainButton.hide();
        closeStudio();
        load();
    } else {
        tg.showAlert(error.message);
    }
}

// Helpers
function attach(type) {
    const file = type === 'Image' ? document.getElementById('img-in').files[0] : document.getElementById('vid-in').files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        document.getElementById('media-preview-box').style.display = 'block';
        if(type === 'Image') { 
            document.getElementById('img-prev').src=url; 
            document.getElementById('img-prev').style.display='block';
        } else { 
            document.getElementById('vid-prev').src=url; 
            document.getElementById('vid-prev').style.display='block';
        }
    }
}

function openStudio() { document.getElementById('studio').classList.add('active'); }
function closeStudio() { document.getElementById('studio').classList.remove('active'); clearMedia(); }
function clearMedia() {
    document.getElementById('media-preview-box').style.display='none';
    document.getElementById('img-in').value=""; 
    document.getElementById('vid-in').value="";
    voiceBlob = null;
    vBtn.innerText = "🎤 Hold to Record";
    vBtn.style.color = "#fff";
}

load();
