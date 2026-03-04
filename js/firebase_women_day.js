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
const currentId = urlParams.get("id") || "chunghi";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const configRef = ref(database, "celebrations/" + currentId);

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
      // Xóa nội dung cũ
      letterBody.innerHTML = "";
      // Đọc từng dòng, bọc vào thẻ <p>
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

  // Vinyl Cover
  const vinylImg = document.getElementById("vinyl-img");
  let basePath = "assets/images/";
  if (config.folder && config.folder.trim() !== "") {
    basePath += config.folder.trim() + "/";
  }

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
  const galleryWrapper = document.getElementById("gallery-wrapper");
  if (galleryWrapper) {
    const totalPhotos = parseInt(config.imgCount) || 10;
    const maxShow = 10;

    // Tạo mảng tất cả index [1, 2, ..., totalPhotos]
    let allIndices = [];
    for (let i = 1; i <= totalPhotos; i++) allIndices.push(i);

    // Shuffle (Fisher-Yates)
    for (let i = allIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
    }

    // Lấy tối đa 10 ảnh ngẫu nhiên
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

    // Init Swiper after slides are in DOM
    setTimeout(() => {
      if (window.initGallerySwiper) window.initGallerySwiper();
    }, 100);
  }
}
