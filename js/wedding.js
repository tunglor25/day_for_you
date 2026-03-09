// js/wedding.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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


// --- 1. Audio Toggle ---
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');
let isPlaying = false;

// Attempt to play music on first interaction
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(e => console.log("Audio autoplay prevented by browser"));
    }
}, { once: true });

musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent triggering the body click again
    if (isPlaying) {
        bgMusic.pause();
        musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        bgMusic.play();
        musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});

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
const weddingDate = new Date('2026-10-20T18:00:00').getTime();

const daysEl = document.querySelector('.days');
const hoursEl = document.querySelector('.hours');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');

function updateCountdown() {
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
            <p class="text-gray-600 mt-2 text-sm italic font-noto">"${wishInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"</p>
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
                        .setPopupContent(`<div class="text-center"><b class="text-weddingDarkRed font-noto text-lg">${guestData.name || 'Khách mời'}</b><br><span class="text-xs text-gray-500">Đang trên đường đến...</span></div>`);
                } else {
                    // Create new marker for this guest
                    otherGuestMarkers[key] = L.marker(coords, {icon: guestIcon})
                        .bindPopup(`<div class="text-center"><b class="text-weddingDarkRed font-noto text-lg">${guestData.name || 'Khách mời'}</b><br><span class="text-xs text-gray-500">Đang trên đường đến...</span></div>`)
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

