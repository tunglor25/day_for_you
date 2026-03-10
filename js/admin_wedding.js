// js/admin_wedding.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase config (should match your main app)
const firebaseConfig = {
  databaseURL: "https://birthday-d859f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById('adminForm');
const toast = document.getElementById('toast');

// Load current data from Firebase on load
async function loadCurrentConfig() {
    const configRef = ref(db, 'wedding/config');
    try {
        const snapshot = await get(configRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('groomId').value = data.groomId || '';
            document.getElementById('brideId').value = data.brideId || '';
            document.getElementById('groomBio').value = data.groomBio || '';
            document.getElementById('brideBio').value = data.brideBio || '';
            document.getElementById('loveStory').value = data.loveStory || '';
            document.getElementById('galleryFolder').value = data.galleryFolder || '';
            document.getElementById('musicUrl').value = data.musicUrl || '';
            document.getElementById('groomAddress').value = data.groomAddress || '';
            document.getElementById('brideAddress').value = data.brideAddress || '';
            document.getElementById('groomMap').value = data.groomMap || '';
            document.getElementById('brideMap').value = data.brideMap || '';
            document.getElementById('weddingDate').value = data.weddingDate || '';
            document.getElementById('weddingTime').value = data.weddingTime || '';
            document.getElementById('dressCode').value = data.dressCode || '';
        }
    } catch (error) {
        console.error("Error loading config:", error);
    }
}

// Save data to Firebase
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const config = {
        groomId: document.getElementById('groomId').value,
        brideId: document.getElementById('brideId').value,
        groomBio: document.getElementById('groomBio').value,
        brideBio: document.getElementById('brideBio').value,
        loveStory: document.getElementById('loveStory').value,
        galleryFolder: document.getElementById('galleryFolder').value,
        musicUrl: document.getElementById('musicUrl').value,
        groomAddress: document.getElementById('groomAddress').value,
        brideAddress: document.getElementById('brideAddress').value,
        groomMap: document.getElementById('groomMap').value,
        brideMap: document.getElementById('brideMap').value,
        weddingDate: document.getElementById('weddingDate').value,
        weddingTime: document.getElementById('weddingTime').value,
        dressCode: document.getElementById('dressCode').value,
        updatedAt: new Date().toISOString()
    };

    try {
        await set(ref(db, 'wedding/config'), config);
        showToast();
    } catch (error) {
        alert("Lỗi khi lưu dữ liệu: " + error.message);
    }
});

function showToast() {
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

loadCurrentConfig();
