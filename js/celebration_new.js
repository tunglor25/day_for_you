document.addEventListener("DOMContentLoaded", function () {
  // 1. Khởi tạo Swiper Slider (Chuyển thành Global Function để Firebase gọi sau khi Load Ảnh)
  window.initMySwiper = function () {
    if (window.mySwiper) {
      window.mySwiper.destroy(true, true);
    }
    const slides = document.querySelectorAll(".mySwiper .swiper-slide");
    const shouldLoop = slides.length >= 6; // Đảm bảo loop chỉ bật khi đủ slide

    window.mySwiper = new Swiper(".mySwiper", {
      grabCursor: true,
      loop: shouldLoop,
      speed: 800,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
          opacity: 0,
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
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
  };

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
          cakeRendered = true;
          entry.target.classList.add("intersected");

          // Delay nhỏ để lách bug không chạy animation SVG của một số trình duyệt khi thẻ div đang opacity 0
          setTimeout(() => {
            window.renderCakeSVG();
          }, 100);
        }
      }
    });
  }, observerOptions);

  observer.observe(document.querySelector(".intro-content"));
  observer.observe(document.getElementById("cake-renderer"));

  // 6. Audio Blowing Logic
  const activateBtn = document.getElementById("activate-mic-btn");
  const micStatus = document.getElementById("mic-status");
  const btnStartRitual = document.getElementById("btn-start-ritual");
  const wishNotice = document.getElementById("wish-notice");

  if (btnStartRitual) {
    btnStartRitual.addEventListener("click", function () {
      // 1. Châm nến (Từng ngọn cho đẹp)
      const flames = document.querySelectorAll(".fuego");
      flames.forEach((f, index) => {
        setTimeout(() => {
          f.classList.add("ignited");
          setTimeout(() => f.classList.add("animating"), 300);
        }, index * 150);
      });

      // 2. Tắt đèn
      document.body.classList.add("lights-off");

      // 3. Ẩn nút bắt đầu & Bắt đầu thu âm ngay lập tức
      this.classList.add("hidden");

      // Kích hoạt Mic tự động
      if (!window.AudioContext && !window.webkitAudioContext) {
        alert(
          "Trình duyệt không hỗ trợ bắt Microphone. Hãy chạm vào nến để tắt nhé!",
        );
        setupClickToBlow();
        return;
      }

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
          console.log("Mic access denied:", err);
          setupClickToBlow(); // Fallback
        });
    });
  }

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

      // Sau khi nến tắt 2s là sáng đèn lại theo yêu cầu người dùng
      setTimeout(() => {
        document.body.classList.remove("lights-off");
      }, 2000);
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
