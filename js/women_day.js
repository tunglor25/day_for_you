/* ==========================================
   Women's Day 8/3 — Main JS
   Matrix BG, petals, gallery, qualities, music
   ========================================== */

// ====== MATRIX FALLING TEXT BACKGROUND ======
(function initMatrix() {
  const container = document.querySelector(".matrix-bg");
  if (!container) return;

  const texts = [
    "YêuThương♥HạnhPhúc✿XinhĐẹp🌸",
    "DịuDàng♡MạnhMẽ✦RạngRỡ🌷",
    "8/3♥Happy♡Women✿Day🌸",
    "SángTạo♥TỏaSáng✦YêuThương💕",
    "HoaTươi♡NắngMới✿MùaXuân🌷",
    "HạnhPhúc♥BìnhYên✦AnLành🌸",
    "EmĐẹp♡QuáĐi✿YêuEm💕",
    "NgọtNgào♥ĐặcBiệt✦TuyệtVời🌷",
  ];

  const isMobile = window.innerWidth < 768;
  const colWidth = isMobile ? 18 : 22;
  const totalCols = Math.ceil(window.innerWidth / colWidth);

  for (let i = 0; i < totalCols; i++) {
    const col = document.createElement("div");
    col.className = "matrix-col";
    col.style.left = i * colWidth + "px";

    const dur = (Math.random() * 12 + 8).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    col.style.animationDuration = dur + "s";
    col.style.animationDelay = delay + "s";

    // Slight random rotation for variety
    const rot = (Math.random() * 6 - 3).toFixed(1);
    col.style.transform = `rotate(${rot}deg)`;

    const text = texts[i % texts.length];
    col.setAttribute("data-text", text);
    const before = document.createElement("span");
    before.textContent = text;
    before.style.cssText = `
      background: linear-gradient(to bottom,
        rgba(201,24,74,0.45) 0%,
        rgba(251,113,133,0.3) 20%,
        rgba(212,165,116,0.2) 45%,
        rgba(201,24,74,0.1) 70%,
        transparent 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      writing-mode: vertical-lr;
      letter-spacing: 3px;
      font-style: italic;
    `;
    col.appendChild(before);
    container.appendChild(col);
  }
})();

// ====== QUOTE MATRIX FALLING TEXT ======
(function initQuoteMatrix() {
  const container = document.querySelector(".matrix-bg-quote");
  if (!container) return;

  const words = [
    "XINHĐẸP♥TỰTIN✿TỎASÁNG🌸",
    "MẠNHMẼ✦ĐỘCLẬP💕DỊUDÀNG♡",
    "QUYẾNRŨ🌷THÔNGMINH♥BẢNLĨNH",
    "KIÊUHÃNH🌸ĐÁNGYÊU✿NỔIBẬT💕",
    "PHỤNỮ♥TUYỆTVỜI♡MÙAXUÂN🌷",
  ];

  const isMobile = window.innerWidth < 768;
  const colWidth = isMobile ? 18 : 26;
  const totalCols = Math.ceil(window.innerWidth / colWidth);

  for (let i = 0; i < totalCols; i++) {
    const col = document.createElement("div");
    col.className = "matrix-column-quote";
    col.style.left = i * colWidth + "px";

    // Random delay (-10s đến 0s) và thời gian rơi (12s đến 20s) -> Rất chậm, lãng đãng lướt qua
    col.style.animationDelay = (Math.random() * -10).toFixed(1) + "s";
    col.style.animationDuration = (Math.random() * 8 + 12).toFixed(1) + "s";

    // Động nghiêng khác nhau từ -12 độ đến 12 độ
    const tilt = (Math.random() * 24 - 12).toFixed(1);
    col.style.transform = `rotate(${tilt}deg)`;

    // Nối chuỗi để đủ dài
    const textStr =
      words[Math.floor(Math.random() * words.length)] +
      words[Math.floor(Math.random() * words.length)] +
      words[Math.floor(Math.random() * words.length)];

    const before = document.createElement("span");
    before.textContent = textStr;
    before.className = "matrix-text-quote";

    col.appendChild(before);
    container.appendChild(col);
  }
})();

// ====== PETAL CANVAS ======
const canvas = document.getElementById("petals-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const isMobile = window.innerWidth < 768;
  const petalCount = isMobile ? 12 : 25;
  let petals = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Petal {
    constructor(spread) {
      this.reset(spread);
    }
    reset(spread) {
      this.x = Math.random() * canvas.width;
      this.y = spread ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 6 + 3;
      this.vy = Math.random() * 0.8 + 0.3;
      this.vx = Math.random() * 0.4 - 0.2;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.012 + 0.004;
      this.alpha = Math.random() * 0.25 + 0.1;
      const hues = [340, 345, 350, 0, 20];
      this.hue = hues[Math.floor(Math.random() * hues.length)];
      this.sat = Math.random() * 30 + 60;
      this.lit = Math.random() * 15 + 78;
    }
    update() {
      this.y += this.vy;
      this.wobble += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.wobble) * 0.3;
      this.rot += this.rotSpeed;
      if (this.y > canvas.height + 20) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = `hsl(${this.hue}, ${this.sat}%, ${this.lit}%)`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        this.size / 2,
        -this.size,
        this.size,
        -this.size / 2,
        0,
        this.size,
      );
      ctx.bezierCurveTo(
        -this.size,
        -this.size / 2,
        -this.size / 2,
        -this.size,
        0,
        0,
      );
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) petals.push(new Petal(true));

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  })();
}

// ====== MUSIC & VINYL ======
const vinylDisc = document.getElementById("vinyl-disc");
const bgMusic = document.getElementById("bg-music");
let isMusicPlaying = false;

// Playlist
const playlist = [
  "assets/sounds/Em_trong_mat_toi.mp3",
  "assets/sounds/The_gioi_cua_anh.mp3",
];
let currentSongIndex = 0;

if (vinylDisc && bgMusic) {
  bgMusic.volume = 0.3;
  bgMusic.src = playlist[currentSongIndex];

  // Chuyển bài khi hát xong
  bgMusic.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    bgMusic.src = playlist[currentSongIndex];
    bgMusic.play().catch(() => {});
  });

  vinylDisc.addEventListener("click", () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      vinylDisc.classList.remove("spinning");
    } else {
      bgMusic.play().catch(() => {});
      vinylDisc.classList.add("spinning");
    }
    isMusicPlaying = !isMusicPlaying;
  });
}

let hasAutoPlayed = false;
function tryAutoPlay() {
  if (hasAutoPlayed || !bgMusic) return;

  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        hasAutoPlayed = true;
        isMusicPlaying = true;
        if (vinylDisc) vinylDisc.classList.add("spinning");

        // Gỡ bỏ listeners sau khi play thành công
        ["click", "touchstart", "scroll", "mousemove", "keydown"].forEach(
          (evt) => {
            document.removeEventListener(evt, tryAutoPlay);
          },
        );
      })
      .catch((error) => {
        // Auto-play prevented
        console.log("Auto-play prevented. User interaction needed.");
      });
  }
}

// Lắng nghe nhiều loại tương tác để tăng tỉ lệ bắt được (nhất là PC)
["click", "touchstart", "scroll", "mousemove", "keydown"].forEach((evt) => {
  document.addEventListener(evt, tryAutoPlay, { once: true, passive: true });
});

// ====== SWIPER GALLERY INIT (called by Firebase after loading photos) ======
window.initGallerySwiper = function () {
  new Swiper(".gallery-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 3,
      stretch: 80,
      depth: 150,
      modifier: 1.5,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  });
};

// ====== REVEAL ON SCROLL ======
const revealEls = document.querySelectorAll(
  ".quote-section, .letter-section, .gallery-section, .qualities-section",
);
revealEls.forEach((el) => el.classList.add("reveal"));

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 },
);

revealEls.forEach((el) => revealObs.observe(el));

// ====== CONFETTI ON FINAL ======
let confettiFired = false;
const finalSection = document.getElementById("final");
if (finalSection) {
  const finalObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !confettiFired) {
          confettiFired = true;
          if (typeof confetti !== "undefined") {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 },
              colors: ["#c9184a", "#fb7185", "#d4a574", "#f0d9b5"],
            });
            setTimeout(
              () =>
                confetti({
                  particleCount: 40,
                  spread: 60,
                  origin: { x: 0.3, y: 0.6 },
                  colors: ["#c9184a", "#fb7185"],
                }),
              300,
            );
          }
        }
      });
    },
    { threshold: 0.4 },
  );
  finalObs.observe(finalSection);
}

// ====== SPARKLE CURSOR TRAIL ======
(function initSparkle() {
  const emojis = ["🌸", "✨", "💕", "🌷", "✿", "❀", "💮"];
  let lastTime = 0;
  const interval = 80; // ms giữa mỗi sparkle

  function createSparkle(x, y) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = x + (Math.random() * 16 - 8) + "px";
    el.style.top = y + (Math.random() * 16 - 8) + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime > interval) {
      lastTime = now;
      createSparkle(e.clientX, e.clientY);
    }
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      const now = Date.now();
      if (now - lastTime > interval * 1.5) {
        lastTime = now;
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
      }
    },
    { passive: true },
  );
})();

// ====== PROTECTION ======
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s"))
    e.preventDefault();
  if (e.key === "F12") e.preventDefault();
});

// ====== FLYING MUSIC NOTES ======
setInterval(() => {
  if (typeof isMusicPlaying === "undefined" || !isMusicPlaying) return;
  const vinylTypeDisc = document.getElementById("vinyl-disc");
  if (!vinylTypeDisc) return;

  const notes = ["🎵", "🎶", "🎼", "✨", "💕"];
  const rect = vinylTypeDisc.getBoundingClientRect();

  const el = document.createElement("span");
  el.className = "music-note";
  el.textContent = notes[Math.floor(Math.random() * notes.length)];

  // Random start near the top-center of disc
  const startX = rect.left + rect.width / 2 + (Math.random() * 30 - 15);
  const startY = rect.top + Math.random() * 15;

  el.style.left = startX + "px";
  el.style.top = startY + "px";

  // Random drift and rotation
  const drift = Math.random() * 60 - 30 + "px";
  const rot = Math.random() * 40 - 20 + "deg";
  el.style.setProperty("--drift", drift);
  el.style.setProperty("--rot", rot);

  const dur = (Math.random() * 1 + 1.5).toFixed(1); // 1.5s - 2.5s
  el.style.animation = `noteFloat ${dur}s ease-out forwards`;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}, 450);
