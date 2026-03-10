// js/wedding.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

console.log("Wedding JS Loaded");

// --- 0. Firebase Setup for Real-time Features ---
const firebaseConfig = {
  databaseURL: "https://birthday-d859f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
const locationsRef = ref(db, 'wedding/locations');
const myLocationRef = ref(db, `wedding/locations/${guestId}`);

// Delete my location when I close the browser
onDisconnect(myLocationRef).remove();

let guestName = "Khách mời";

// --- URL & Config Parameter Data Loading ---
const urlParams = new URLSearchParams(window.location.search);
let groomId = urlParams.get('groomId');
let brideId = urlParams.get('brideId');

async function initWeddingData() {
    // 1. Fetch Global Admin Config
    const configRef = ref(db, 'wedding/config');
    try {
        const snapshot = await get(configRef);
        if (snapshot.exists()) {
            const config = snapshot.val();
            
            // Only strictly use URL params for identity. Do NOT fallback to global config ID.
            // if (!groomId) groomId = config.groomId;  <-- REMOVED
            // if (!brideId) brideId = config.brideId;  <-- REMOVED
            
            // Apply other global settings
            if (config.loveStory) {
                const storyEl = document.getElementById('story-content');
                if (storyEl) storyEl.innerText = config.loveStory;
            }
            // Wedding Bio overrides
            window.adminConfig = config; // Store globals for later use

            // --- Apply New Fields to UI ---
            if (config.groomAddress) {
                const el = document.getElementById('groom-address');
                if (el) el.innerText = config.groomAddress;
            }
            if (config.brideAddress) {
                const el = document.getElementById('bride-address');
                if (el) el.innerText = config.brideAddress;
            }
            if (config.groomMap) {
                const el = document.getElementById('groom-map-link');
                if (el) el.href = config.groomMap;
            }
            if (config.brideMap) {
                const el = document.getElementById('bride-map-link');
                if (el) el.href = config.brideMap;
            }
            if (config.weddingTime) {
                const el = document.getElementById('wedding-time-text');
                if (el) el.innerText = config.weddingTime;
            }
            if (config.dressCode) {
                const el = document.getElementById('dress-code-text');
                if (el) el.innerText = config.dressCode;

                const container = document.getElementById('dress-code-container');
                if (container) {
                    container.innerHTML = ''; // Clear existing
                    const colors = config.dressCode.split('&').map(c => c.trim());
                    
                    const colorMap = {
                        'đỏ rượu': '#B22222',
                        'vàng gold': '#D4AF37',
                        'vàng ánh kim': '#D4AF37',
                        'trắng kem': '#FFF8E7',
                        'đen lịch lãm': '#1A1A1A',
                        'đen': '#1A1A1A',
                        'trắng': '#FFFFFF',
                        'đỏ': '#FF0000',
                        'vàng': '#FFFF00',
                        'xanh': '#0000FF',
                        'hồng': '#FFC0CB',
                        'do ruou': '#B22222',
                        'vang gold': '#D4AF37',
                        'vang anh kim': '#D4AF37',
                        'trang kem': '#FFF8E7'
                    };

                    const displayNames = {
                        'vang gold': 'Vàng Gold',
                        'vàng gold': 'Vàng Gold',
                        'do ruou': 'Đỏ Rượu',
                        'đỏ rượu': 'Đỏ Rượu',
                        'trang kem': 'Trắng Kem',
                        'trắng kem': 'Trắng Kem',
                        'den lich lam': 'Đen Lịch Lãm',
                        'đen lịch lãm': 'Đen Lịch Lãm'
                    };

                    colors.forEach((colorName) => {
                        const hex = colorMap[colorName.toLowerCase()] || '#CCCCCC';
                        const displayName = displayNames[colorName.toLowerCase()] || colorName;
                        const colorDiv = document.createElement('div');
                        colorDiv.className = 'flex flex-col items-center';
                        colorDiv.innerHTML = `
                            <div class="color-circle-luxury">
                                <div class="w-full h-full rounded-full border-[3px] border-white shadow-xl relative z-10" style="background-color: ${hex};"></div>
                            </div>
                            <span class="mt-6 luxury-label text-weddingGold uppercase">${displayName}</span>
                        `;
                        container.appendChild(colorDiv);
                    });
                }
            }
            // Update countdown date if provided
            if (config.weddingDate) {
                window.weddingDateOverride = new Date(config.weddingDate + 'T18:00:00').getTime();
            }
        }
    } catch (e) {
        console.warn("No admin config found, using defaults/URL.");
    }

    // 2. Load Specific User Data
    loadUserData(groomId, 'groom');
    loadUserData(brideId, 'bride');
}

async function loadUserData(id, role) {
    if (!id) {
        // Fallback explicit fake avatars when no ID is present
        if (role === 'groom') {
            document.getElementById('groom-photo').src = "https://images.unsplash.com/photo-1549410196-8ebdc93ff06c?auto=format&fit=crop&q=80&w=600";
        } else if (role === 'bride') {
            document.getElementById('bride-photo').src = "https://images.unsplash.com/photo-1541250848049-b4f71426cadb?auto=format&fit=crop&q=80&w=600";
        }
        return;
    }

    // Ngay lập tức bọc ảnh chuẩn (Ảnh local/thư mục) khi có ID
    // Thay thế ảnh người mẫu trên mạng bằng ảnh thật của user
    const defaultPhotoPath = `./assets/images/${id}/Anh1.PNG`;
    if (role === 'groom') {
        document.getElementById('groom-photo').src = defaultPhotoPath;
    } else if (role === 'bride') {
        document.getElementById('bride-photo').src = defaultPhotoPath;
    }

    const userRef = ref(db, `celebrations/${id}`);
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            updateUIRole(data, role);
        }
    } catch (error) {
        console.error(`Error loading ${role} data:`, error);
    }
}

async function loadGalleryData(folder) {
    if (!folder) return;
    // For now, we'll just log it as we'll need to implement the gallery loading logic later 
    // based on how the files are structured in that folder.
    console.log("Gallery Folder to load:", folder);
}

function updateUIRole(data, role) {
    // Map Firebase fields to UI
    const name = data.name;
    
    // Check if admin provided a specific bio for this wedding, else use user's bio
    const config = window.adminConfig || {};
    const adminBio = (role === 'groom') ? config.groomBio : config.brideBio;
    const desc = adminBio || data.weddingBio || data.bio; 
    
    // Construct photo path from 'folder' field if it exists explicitly, or use direct photo URL
    let photo = null;
    if (data.folder) {
        photo = `./assets/images/${data.folder}/Anh1.PNG`;
    } else if (data.photo) {
        photo = data.photo;
    }

    // Use admin's gallery folder if specified
    if (config.galleryFolder) {
        loadGalleryData(config.galleryFolder);
    }

    if (role === 'groom') {
        if (name) {
            document.getElementById('groom-name-hero').innerText = name;
            document.getElementById('groom-name-main').innerText = name;
        }
        if (photo) document.getElementById('groom-photo').src = photo;
        if (desc) document.getElementById('groom-desc').innerText = desc;
    } else if (role === 'bride') {
        if (name) {
            document.getElementById('bride-name-hero').innerText = name;
            document.getElementById('bride-name-main').innerText = name;
        }
        if (photo) document.getElementById('bride-photo').src = photo;
        if (desc) document.getElementById('bride-desc').innerText = desc;
    }
}

// Start loading
initWeddingData();


// --- 1. Audio Toggle ---
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtnDesktop = document.getElementById('musicToggleBtn');
const musicToggleBtnMobile = document.getElementById('musicToggleBtnMobile');

let isPlaying = false;

function toggleMusic(e) {
    if(e) e.stopPropagation();
    if (isPlaying) {
        bgMusic.pause();
        if(musicToggleBtnDesktop) musicToggleBtnDesktop.innerHTML = '<i class="fas fa-volume-mute text-xl pointer-events-none"></i>';
        if(musicToggleBtnMobile) musicToggleBtnMobile.innerHTML = '<i class="fas fa-volume-mute text-xl pointer-events-none"></i>';
    } else {
        bgMusic.play().catch(e => console.log("Audio play caught:", e));
        if(musicToggleBtnDesktop) musicToggleBtnDesktop.innerHTML = '<i class="fas fa-volume-up text-xl pointer-events-none"></i>';
        if(musicToggleBtnMobile) musicToggleBtnMobile.innerHTML = '<i class="fas fa-volume-up text-xl pointer-events-none"></i>';
    }
    isPlaying = !isPlaying;
}

// Attempt to play music on first interaction
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        toggleMusic();
    }
}, { once: true });

if(musicToggleBtnDesktop) musicToggleBtnDesktop.addEventListener('click', toggleMusic);
if(musicToggleBtnMobile) musicToggleBtnMobile.addEventListener('click', toggleMusic);

// --- 2. GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Reveal elements
const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach((el) => {
    gsap.fromTo(el, 
        { autoAlpha: 0, y: 50 }, 
        { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out", 
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
});

const revealLeft = document.querySelectorAll('.gs-reveal-left');
revealLeft.forEach((el) => {
    gsap.fromTo(el, 
        { autoAlpha: 0, x: -50 }, 
        { duration: 1, autoAlpha: 1, x: 0, ease: "power3.out", 
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
});

const revealRight = document.querySelectorAll('.gs-reveal-right');
revealRight.forEach((el) => {
    gsap.fromTo(el, 
        { autoAlpha: 0, x: 50 }, 
        { duration: 1, autoAlpha: 1, x: 0, ease: "power3.out", 
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
});

// --- 3. Countdown Timer ---
// Set Wedding Date (YYYY-MM-DDTHH:MM:SS)
const defaultWeddingDate = new Date('2026-10-20T18:00:00').getTime();

const daysEl = document.querySelector('.days');
const hoursEl = document.querySelector('.hours');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');

function updateCountdown() {
    const weddingDate = window.weddingDateOverride || defaultWeddingDate;
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        // Wedding passed
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
}

// Initial call and set interval
updateCountdown();
setInterval(updateCountdown, 1000);

// --- 4. Gallery Lightbox ---
const galleryImages = document.querySelectorAll('.image-gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');

galleryImages.forEach(img => {
    img.parentElement.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
});

// --- 5. Guestbook Form Submission ---
const wishForm = document.getElementById('wish-form');
const wishesContainer = document.getElementById('wishes-container');

wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('guest-name');
    const wishInput = document.getElementById('guest-wish');
    
    if (nameInput.value.trim() && wishInput.value.trim()) {
        
        // Create new comment element
        const newWish = document.createElement('div');
        newWish.className = "border-b border-gray-100 py-4 mb-2 animate-fade-in";
        newWish.innerHTML = `
            <h4 class="font-bold text-weddingDarkRed"><i class="fas fa-heart text-weddingGold text-sm mr-2"></i> ${// escape HTML simply
            nameInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h4>
            <p class="text-gray-600 mt-2 text-sm italic font-montserrat">"${wishInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"</p>
        `;
        
        // Prepend to list
        wishesContainer.prepend(newWish);
        
        // Clear form
        nameInput.value = '';
        wishInput.value = '';
        
        // Show thank you alert (or replace with a custom modal)
        alert('Cảm ơn bạn đã gửi lời chúc tốt đẹp tới chúng tôi! ❤️');
    }
});


// --- 6. Falling Flowers Canvas Particle Effect ---
const canvas = document.getElementById('falling-flowers-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 40; // Reduced for performance, keeping it elegant

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Petal properties
class Petal {
    constructor() {
        this.reset();
        // distribute initially across the screen height
        this.y = Math.random() * height; 
    }
    
    reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 5 + 3; // 3 to 8px
        this.speedY = Math.random() * 1 + 0.5; // fall speed
        this.speedX = (Math.random() - 0.5) * 1; // drift
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        // Asian color palette colors (Gold, Red, Pink-white)
        const colors = ['rgba(212, 175, 55, 0.7)', 'rgba(178, 34, 34, 0.5)', 'rgba(255, 228, 225, 0.6)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 50) * 0.5; // slight wave
        this.rotation += this.rotationSpeed;
        
        if (this.y > height + 20) {
            this.reset();
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        
        // Draw an elegant petal shape (ellipse-like)
        ctx.beginPath();
        // A simple petal-like tear drop
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size, -this.size/2, this.size/2, this.size);
        ctx.quadraticCurveTo(0, this.size*1.5, -this.size/2, this.size);
        ctx.quadraticCurveTo(-this.size, -this.size/2, 0, -this.size);
        ctx.fill();
        ctx.restore();
    }
}

// Init particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Petal());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// --- 7. Interactive Real-time Map (Leaflet) ---
// Coordinates for "Nhà Hàng Trọng Đại" (Example coordinates in Hanoi)
const venueCoords = [21.003117, 105.820140]; // Changed purely for example

// Initialize Map only if the element exists
const mapEl = document.getElementById('wedding-map');
if (mapEl && typeof L !== 'undefined') {
    const map = L.map('wedding-map').setView(venueCoords, 15);
    
    // Custom Gold Map Style using CartoDB Positron for elegant look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom Icon for Venue
    const venueIcon = L.divIcon({
        html: '<i class="fas fa-gem text-weddingDarkRed text-4xl drop-shadow-md"></i>',
        className: 'bg-transparent',
        iconSize: [36, 36],
        iconAnchor: [18, 36]
    });

    const venueMarker = L.marker(venueCoords, {icon: venueIcon}).addTo(map)
        .bindPopup('<b class="text-weddingDarkRed font-playfair font-bold text-lg">Nhà Hàng Cưới Trọng Đại</b><br>123 Nguyễn Trãi, Thanh Xuân, Hà Nội')
        .openPopup();

    let routingControl = null;
    let watchId = null;
    let otherGuestMarkers = {};

    // Map cluster for other guests
    const guestIcon = L.divIcon({
        html: '<div class="relative"><div class="w-8 h-8 bg-weddingGold rounded-full border-2 border-white flex items-center justify-center text-white font-bold shadow-lg shadow-weddingGold/50"><i class="fas fa-car-side"></i></div></div>',
        className: 'bg-transparent',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    document.getElementById('find-route-btn').addEventListener('click', () => {
        const infoText = document.getElementById('route-info');
        
        if (!navigator.geolocation) {
            infoText.innerText = "Trình duyệt của bạn không hỗ trợ định vị (Geolocation).";
            return;
        }
        
        // Ask for their name if they haven't provided one
        const manualName = prompt("Vui lòng nhập tên của bạn để hiển thị trên bản đồ (để trống nếu muốn ẩn danh):");
        if(manualName && manualName.trim() !== '') {
            guestName = manualName.trim();
        }

        infoText.innerText = "Đang kết nối vệ tinh và chia sẻ vị trí của bạn...";
        infoText.classList.add('animate-pulse');

        // Stop previous watch if exists
        if(watchId) navigator.geolocation.clearWatch(watchId);

        // Turn on Live Tracking (Watch Position) instead of one-time (Current Position)
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                infoText.classList.remove('animate-pulse');
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const userCoords = L.latLng(userLat, userLng);

                // 1. Update own map route
                if (routingControl) {
                    routingControl.setWaypoints([
                        userCoords,
                        L.latLng(venueCoords[0], venueCoords[1])
                    ]);
                } else {
                    // Create routing control for the first time
                    routingControl = L.Routing.control({
                        waypoints: [
                            userCoords,
                            L.latLng(venueCoords[0], venueCoords[1])
                        ],
                        routeWhileDragging: false,
                        addWaypoints: false,
                        lineOptions: {
                            styles: [{color: '#D4AF37', opacity: 0.8, weight: 6}] // Gold route line
                        },
                        createMarker: function(i, wp, nWps) {
                            if (i === 0) {
                                return L.marker(wp.latLng, {
                                    icon: L.divIcon({
                                        html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div><div class="mt-1 text-xs font-bold bg-white/80 px-1 rounded whitespace-nowrap -ml-4">Bạn (${guestName})</div>`,
                                        className: 'bg-transparent'
                                    })
                                }).bindPopup('Vị trí hiện tại của bạn');
                            }
                            if (i === nWps - 1) return null; // Venue is already marked
                        },
                        show: false
                    }).addTo(map);

                    routingControl.on('routesfound', function(e) {
                        const routes = e.routes;
                        const summary = routes[0].summary;
                        const distanceKm = (summary.totalDistance / 1000).toFixed(1);
                        const timeMin = Math.round(summary.totalTime / 60);
                        
                        infoText.innerHTML = `<span class="text-weddingDarkRed font-bold"><i class="fas fa-car mr-1"></i> ${distanceKm} km</span> • Khoảng <span class="text-weddingGold font-bold">${timeMin} phút</span> di chuyển tới điểm cưới.`;
                    });
                }

                // 2. Broadcast location to Firebase
                set(myLocationRef, {
                    name: guestName,
                    lat: userLat,
                    lng: userLng,
                    timestamp: serverTimestamp()
                });
            },
            (error) => {
                infoText.classList.remove('animate-pulse');
                console.error(error);
                infoText.innerHTML = `<span class="text-red-500"><i class="fas fa-exclamation-triangle"></i> Lỗi kết nối GPS. Hãy kiểm tra cài đặt thiết bị.</span>`;
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
        
        // --- 3. Listen to other guests' locations from Firebase ---
        onValue(locationsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            // Loop through all guests in DB
            Object.keys(data).forEach(key => {
                if (key === guestId) return; // Skip ourself
                
                const guestData = data[key];
                
                // If timestamp is older than 30 mins, ignore (they probably left without unregistering)
                // Note: Server timestamps are hard to compare directly on client without clock skew correction, 
                // but we skip complex logic here for simplicity.
                
                // Add a very slight random jitter (offset) to coordinates. 
                // This prevents markers from perfectly overlapping if multiple devices are at the exact same location.
                // 0.0001 roughly equals 11 meters.
                const jitterLat = (Math.random() - 0.5) * 0.0002;
                const jitterLng = (Math.random() - 0.5) * 0.0002;

                const coords = [guestData.lat + jitterLat, guestData.lng + jitterLng];
                
                // If marker already exists, update its position
                if (otherGuestMarkers[key]) {
                    // Update content dynamically too just in case name changes
                    otherGuestMarkers[key].setLatLng(coords)
                        .setPopupContent(`<div class="text-center"><b class="text-weddingDarkRed font-montserrat text-lg">${guestData.name || 'Khách mời'}</b><br><span class="text-xs text-gray-500">Đang trên đường đến...</span></div>`);
                } else {
                    // Create new marker for this guest
                    otherGuestMarkers[key] = L.marker(coords, {icon: guestIcon})
                        .bindPopup(`<div class="text-center"><b class="text-weddingDarkRed font-montserrat text-lg">${guestData.name || 'Khách mời'}</b><br><span class="text-xs text-gray-500">Đang trên đường đến...</span></div>`)
                        .addTo(map);
                }
            });
            
            // Cleanup markers that are no longer in DB
            Object.keys(otherGuestMarkers).forEach(key => {
                if (!data[key]) {
                    map.removeLayer(otherGuestMarkers[key]);
                    delete otherGuestMarkers[key];
                }
            });
        });
        
    });
}

// --- 8. RSVP Form Submission ---
const rsvpForm = document.getElementById('rsvp-form');
if(rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('rsvp-name').value;
        const guests = document.getElementById('rsvp-guests').value;
        const attending = document.querySelector('input[name="attendance"]:checked').value;
        
        // Disable button during theoretical API call
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Đang Gửi...';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            if (attending === 'yes') {
                alert(`Tuyệt vời! Cám ơn ${name} đã xác nhận tham dự cùng ${guests} vị khách. Hẹn gặp bạn tại hôn lễ nhé!`);
            } else {
                alert(`Cám ơn ${name} đã phản hồi. Rất tiếc vì bạn không thể tới chung vui cùng chúng tôi.`);
            }
            
            // Reset state
            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Đã Xác Nhận';
            submitBtn.classList.remove('bg-weddingDarkRed', 'hover:bg-weddingRed');
            submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            
        }, 1500);
    });
}

// --- 9. Confetti Cursor Trail Effect ---
const confettiCanvas = document.getElementById('confetti-cursor-canvas');
if (confettiCanvas && window.matchMedia("(pointer: fine)").matches) {
    const cCtx = confettiCanvas.getContext('2d');
    let cw = confettiCanvas.width = window.innerWidth;
    let ch = confettiCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        cw = confettiCanvas.width = window.innerWidth;
        ch = confettiCanvas.height = window.innerHeight;
    });

    const confettiParticles = [];
    const confettiColors = ['#D4AF37', '#B22222', '#FFF8E7', '#FF69B4', '#FFD700'];

    class Confetti {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 6 + 4;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * -2 - 1;
            this.gravity = 0.15;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = 1;
            this.shape = Math.random() > 0.5 ? 'circle' : 'square';
        }
        
        update() {
            this.x += this.speedX;
            this.speedY += this.gravity;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.015; // fade out speed
        }
        
        draw() {
            cCtx.save();
            cCtx.globalAlpha = this.opacity;
            cCtx.translate(this.x, this.y);
            cCtx.rotate(this.rotation * Math.PI / 180);
            cCtx.fillStyle = this.color;
            
            if (this.shape === 'square') {
                cCtx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            } else {
                cCtx.beginPath();
                cCtx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                cCtx.fill();
            }
            cCtx.restore();
        }
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Spawn 1-2 particles per mouse move event
        for(let i=0; i<2; i++) {
            confettiParticles.push(new Confetti(mouseX, mouseY));
        }
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    function animateConfetti() {
        cCtx.clearRect(0, 0, cw, ch);
        
        for (let i = 0; i < confettiParticles.length; i++) {
            confettiParticles[i].update();
            confettiParticles[i].draw();
            
            // Remove dead particles
            if (confettiParticles[i].opacity <= 0) {
                confettiParticles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
    
    // Keep Magnetic effect for buttons only
    const magneticElements = document.querySelectorAll('button, a, .image-gallery>div');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
        });
        el.classList.add('magnetic');
    });
}

// Global Tilt Effect Initiation (3D perspective on photos)
if (typeof VanillaTilt !== 'undefined') {
    const tiltElements = document.querySelectorAll('.image-gallery>div, #couple .rounded-full');
    VanillaTilt.init(tiltElements, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.4
    });
}

// --- 10. Mobile Bottom Nav Handling ---
const navButtons = document.querySelectorAll('.mobile-nav-btn');
const sectionIds = Array.from(navButtons).map(btn => btn.getAttribute('data-target'));
const navSections = sectionIds.map(id => document.getElementById(id));

if (navButtons.length > 0) {
    // Click to smooth scroll
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
             // Let the scroll listener handle the active state
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Change active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        navSections.forEach(section => {
            if(!section || section.classList.contains('hidden')) return;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Special case for very bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'wishes';
        }

        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('active');
            }
        });
    });
}
