/* ==========================================
   Women's Day 8/3 — Firebase (Slim)
   Config + gallery only, max 10 photos
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://birthday-d859f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const urlParams = new URLSearchParams(window.location.search);
const currentId = urlParams.get("id");
const noId = !currentId; // true nếu không có ?id= trong URL

// Ảnh hoa online — dùng khi không có id
const onlineFlowerImages = [
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=600&h=800&fit=crop",
  "https://images.pexels.com/photos/11116395/pexels-photo-11116395.jpeg?_gl=1*1nwvcdp*_ga*OTI5ODE1NDM5LjE3NzI2ODEzMDc.*_ga_8JE65Q40S6*czE3NzI2ODEzMDckbzEkZzEkdDE3NzI2ODEzNjEkajYkbDAkaDA.",
  "https://i.pinimg.com/1200x/02/65/0f/02650fcfb1399c0333fb2b0d0dd3d11b.jpg",
];

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const configRef = ref(database, "celebrations/" + (currentId || "chunghi"));

get(configRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      applyConfig(snapshot.val());
    } else {
      applyConfig({ name: "Bạn", folder: "", imgCount: 10 });
    }
  })
  .catch((error) => console.error("Lỗi tải Config:", error));

function applyConfig(config) {
  const name = config.name || "Bạn";

  // Hero
  const heroName = document.getElementById("hero-name");
  if (heroName) heroName.textContent = "Gửi đến " + name;

  // Letter Greeting
  const letterGreeting = document.getElementById("letter-greeting");
  if (letterGreeting) letterGreeting.textContent = "Gửi " + name + ",";

  // Letter Custom Content
  if (config.letterContent && config.letterContent.trim() !== "") {
    const letterBody = document.querySelector(".letter-body");
    if (letterBody) {
      letterBody.innerHTML = "";
      const lines = config.letterContent.split("\n");
      lines.forEach((line) => {
        if (line.trim() !== "") {
          const p = document.createElement("p");
          p.textContent = line.trim();
          letterBody.appendChild(p);
        }
      });
    }
  }

  // Final
  const finalName = document.getElementById("final-name");
  if (finalName) finalName.textContent = "Chúc " + name;

  // ---- Nếu không có id → dùng ảnh hoa online ----
  if (noId) {
    applyOnlineImages();
    return;
  }

  // ---- Có id → dùng ảnh local theo folder ----
  let basePath = "assets/images/";
  if (config.folder && config.folder.trim() !== "") {
    basePath += config.folder.trim() + "/";
  }

  // Vinyl Cover
  const vinylImg = document.getElementById("vinyl-img");
  if (vinylImg) {
    vinylImg.src = `${basePath}Anh1.PNG`;
    vinylImg.onerror = function () {
      this.onerror = null;
      this.src = `${basePath}Anh1.jpg`;
      this.onerror = function () {
        this.onerror = null;
        this.src = `${basePath}Anh1.jpeg`;
      };
    };
  }

  // Mobile Nav Vinyl
  const mobileVinylImg = document.getElementById("mobile-vinyl-img");
  if (mobileVinylImg) {
    mobileVinylImg.src = `${basePath}Anh1.PNG`;
    mobileVinylImg.onerror = function () {
      this.onerror = null;
      this.src = `${basePath}Anh1.jpg`;
      this.onerror = function () {
        this.onerror = null;
        this.src = `${basePath}Anh1.jpeg`;
      };
    };
  }

  // Book Cover (Anh7)
  const coverImg = document.getElementById("letter-cover-img");
  if (coverImg) {
    coverImg.src = `${basePath}Anh7.PNG`;
    coverImg.onerror = function () {
      this.onerror = null;
      this.src = `${basePath}Anh7.jpg`;
      this.onerror = function () {
        this.onerror = null;
        this.src = `${basePath}Anh7.jpeg`;
      };
    };
  }

  // Gallery — random 10 ảnh từ tổng số ảnh
  loadLocalGallery(basePath, config);
}

// ===== ẢNH HOA ONLINE (KHI KHÔNG CÓ ID) =====
function applyOnlineImages() {
  // Shuffle ảnh
  const shuffled = [...onlineFlowerImages].sort(() => Math.random() - 0.5);

  // Vinyl Cover
  const vinylImg = document.getElementById("vinyl-img");
  if (vinylImg) vinylImg.src = shuffled[0];

  // Mobile Nav Vinyl
  const mobileVinylImg = document.getElementById("mobile-vinyl-img");
  if (mobileVinylImg) mobileVinylImg.src = shuffled[0];

  // Book Cover
  const coverImg = document.getElementById("letter-cover-img");
  if (coverImg) coverImg.src = shuffled[1] || shuffled[0];

  // Gallery
  const galleryWrapper = document.getElementById("gallery-wrapper");
  if (galleryWrapper) {
    let html = "";
    for (let i = 0; i < shuffled.length; i++) {
      html += `
        <div class="swiper-slide">
          <img src="${shuffled[i]}" alt="Hoa ${i + 1}" loading="lazy" />
        </div>
      `;
    }
    galleryWrapper.innerHTML = html;

    setTimeout(() => {
      if (window.initGallerySwiper) window.initGallerySwiper();
    }, 100);
  }
}

// ===== GALLERY LOCAL (KHI CÓ ID) =====
function loadLocalGallery(basePath, config) {
  const galleryWrapper = document.getElementById("gallery-wrapper");
  if (!galleryWrapper) return;

  const totalPhotos = parseInt(config.imgCount) || 10;
  const maxShow = 10;

  let allIndices = [];
  for (let i = 1; i <= totalPhotos; i++) allIndices.push(i);

  // Shuffle (Fisher-Yates)
  for (let i = allIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
  }

  const selected = allIndices.slice(0, Math.min(maxShow, totalPhotos));

  let html = "";
  for (const idx of selected) {
    html += `
      <div class="swiper-slide">
        <img src="${basePath}Anh${idx}.PNG" alt="Ảnh ${idx}" loading="lazy"
             onerror="this.onerror=null; this.src='${basePath}Anh${idx}.jpg'; this.onerror=function(){this.onerror=null; this.src='${basePath}Anh${idx}.jpeg'; this.onerror=function(){this.closest('.swiper-slide').style.display='none';};};"
        />
      </div>
    `;
  }

  galleryWrapper.innerHTML = html;

  setTimeout(() => {
    if (window.initGallerySwiper) window.initGallerySwiper();
  }, 100);
}
