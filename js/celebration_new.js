document.addEventListener("DOMContentLoaded", function () {
  // 1. Khởi tạo Swiper Slider
  // Khắc phục lỗi lỏ lỏ khi vuốt tay bằng cách chặn bóng đổ, thiết lập chế độ xoay gắt hơn để Swiper hiểu lướt tới/lùi
  window.mySwiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    speed: 500, // Thêm độ mượt chuyển động
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    cardsEffect: {
      slideShadows: false, // Bỏ bóng đổ 3D tối để tránh viền đen khi kéo nhanh
      perSlideOffset: 10,
      perSlideRotate: 5,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 2. Logic tắt mở Music Spotify
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  let isMusicPlaying = false; // Bắt đầu là tắt

  // Tạo sẵn context nếu có thể, tránh lỗi không autoplay
  musicToggle.addEventListener("click", () => {
    if (!isMusicPlaying) {
      bgMusic
        .play()
        .then(() => {
          musicToggle.classList.add("play");
          isMusicPlaying = true;
        })
        .catch((e) => console.log(e));
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("play");
      isMusicPlaying = false;
    }
  });

  // 3. Header Scroll
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });

  // 4. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // 5. Intersection Observer: Trì hoãn Cake Animation & Các hiệu ứng Fade/Slide
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  let cakeRendered = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Intro text fade in
        if (entry.target.classList.contains("intro-content")) {
          entry.target.classList.add("opacity-100", "scale-100");
          entry.target.classList.remove("scale-95");
        }

        // Render Cake
        if (entry.target.id === "cake-renderer" && !cakeRendered) {
          window.renderCakeSVG();
          cakeRendered = true;
          entry.target.classList.add("intersected");
        }
      }
    });
  }, observerOptions);

  observer.observe(document.querySelector(".intro-content"));
  observer.observe(document.getElementById("cake-renderer"));

  // 6. Audio Blowing Logic
  const activateBtn = document.getElementById("activate-mic-btn");
  const micStatus = document.getElementById("mic-status");
  let audioContext, microphone, analyser;
  let blownCandles = 0;

  activateBtn.addEventListener("click", () => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      alert("Trình duyệt không hỗ trợ bắt Microphone.");
      return;
    }

    activateBtn.classList.add("hidden");
    micStatus.classList.remove("hidden");
    micStatus.classList.add("flex");

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        microphone.connect(analyser);
        detectBlowing();
      })
      .catch((err) => {
        alert(
          "Không thể truy cập Microphone! Bạn có thể tự click (chạm) vào nến để tắt nó.",
        );
        setupClickToBlow(); // Fallback
      });
  });

  function setupClickToBlow() {
    micStatus.innerHTML = "Hãy nhấn tay vào từng ngọn nến để thổi nhé!";
    const flames = document.querySelectorAll(".fuego");
    flames.forEach((flame) => {
      flame.style.cursor = "pointer";
      flame.addEventListener("click", function () {
        if (!this.classList.contains("blown")) {
          this.classList.add("blown");
          checkAllBlown();
        }
      });
    });
  }

  function detectBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let isBlowing = false;

    function checkVolume() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      if (average > 75 && !isBlowing) {
        isBlowing = true;
        blowCandle();
      } else if (average <= 75 && isBlowing) {
        isBlowing = false;
      }

      const flames = document.querySelectorAll(".fuego:not(.blown)");
      if (flames.length > 0) {
        requestAnimationFrame(checkVolume);
      }
    }
    checkVolume();
  }

  function blowCandle() {
    const flames = document.querySelectorAll(".fuego:not(.blown)");
    if (flames.length > 0) {
      // Tắt từng ngọn
      const targetFlame = flames[0];
      targetFlame.classList.add("blown");

      // Plats sound effect (optional)
      // new Audio("assets/sounds/blow.mp3").play().catch(e=>console.log(e));

      checkAllBlown();
    }
  }

  function checkAllBlown() {
    const flamesRemaining = document.querySelectorAll(".fuego:not(.blown)");
    if (flamesRemaining.length === 0) {
      micStatus.innerHTML = "Wow, Mọi điều ước sẽ thành hiện thực! ✨";
      fireConfetti();
    }
  }

  function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b8b", "#ff8e9e", "#ffd6de", "#ffffff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b8b", "#ff8e9e", "#ffd6de", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
});
