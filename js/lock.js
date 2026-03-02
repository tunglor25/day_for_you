document.addEventListener("DOMContentLoaded", function () {
  const privacyModal = document.getElementById("privacy-modal");
  const modalContent = document.getElementById("modal-content");
  const btnAcceptPrivacy = document.getElementById("btn-accept-privacy");

  // Luôn hiển thị modal khi vào trang theo yêu cầu người dùng
  privacyModal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 100);

  if (btnAcceptPrivacy) {
    btnAcceptPrivacy.addEventListener("click", async () => {
      try {
        // Xin quyền Microphone luôn để trang sau không hỏi lại
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // Đóng mic ngay để giải phóng tài nguyên nhưng trình duyệt vẫn ghi nhớ quyền
        stream.getTracks().forEach((track) => track.stop());

        localStorage.setItem("privacy_accepted", "true");

        // Hiệu ứng biến mất
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
          privacyModal.classList.add("hidden");
        }, 500);
      } catch (err) {
        console.warn("User denied mic access:", err);
        // Vẫn đóng modal để người dùng tiếp tục, nhưng sang trang kia sẽ lỗi mic
        localStorage.setItem("privacy_accepted", "true");
        privacyModal.classList.add("hidden");
      }
    });
  }

  createFloatingHearts();

  const heartWrapper = document.querySelector(".heart-unlock-wrapper");
  const heartFill = document.getElementById("heartFill");
  const progressBar = document.getElementById("unlockProgress");
  const lockMessage = document.getElementById("lockMessage");
  const container = document.querySelector(".lock-container");

  let pressTimer;
  let progress = 0;
  const maxProgress = 100;
  let isPressing = false;
  let unlocked = false;

  const updateUI = () => {
    // clip-path goes from bottom to top
    const percentage = 100 - progress;
    heartFill.style.clipPath = `polygon(0 100%, 100% 100%, 100% ${percentage}%, 0 ${percentage}%)`;
    progressBar.style.width = `${progress}%`;
  };

  const handlePressStart = (e) => {
    if (e.type === "touchstart") e.preventDefault(); // prevent default touch behavior
    if (unlocked) return;

    isPressing = true;
    heartWrapper.classList.add("is-pressing");
    lockMessage.textContent = "Tiếp tục giữ nhé... ❤️";

    clearInterval(pressTimer);
    pressTimer = setInterval(() => {
      if (progress < maxProgress) {
        progress += 2; // Speed of fill
        updateUI();
      }

      if (progress >= maxProgress) {
        handleUnlock();
      }
    }, 30);
  };

  const handlePressEnd = () => {
    if (unlocked) return;
    isPressing = false;
    heartWrapper.classList.remove("is-pressing");
    clearInterval(pressTimer);

    if (progress > 0 && progress < maxProgress) {
      // Automatically decrease if let go early
      lockMessage.textContent = "Đừng buông tay ra chứ! 🥺";

      pressTimer = setInterval(() => {
        if (isPressing || unlocked) {
          clearInterval(pressTimer);
          return;
        }
        if (progress > 0) {
          progress -= 3;
          if (progress < 0) progress = 0;
          updateUI();
        } else {
          clearInterval(pressTimer);
          lockMessage.textContent = "";
        }
      }, 30);
    }
  };

  const handleUnlock = () => {
    unlocked = true;
    clearInterval(pressTimer);
    heartWrapper.classList.remove("is-pressing");

    lockMessage.innerHTML = "❤️ Trái tim đã mở cửa! ❤️";
    heartWrapper.classList.add("unlock-success-anim");

    createFireworks();

    // Fade out container and redirect
    setTimeout(() => {
      container.style.opacity = "0";
      container.style.transform = "scale(1.1)";
    }, 1000);

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id") || "chunghi";

      // Lưu trạng thái đã mở khóa vào Session (tắt trình duyệt sẽ phải mở lại)
      sessionStorage.setItem("unlocked_" + id, "true");

      window.location.href = "celebration.html?id=" + id;
    }, 1500);
  };

  // Mouse Events
  heartWrapper.addEventListener("mousedown", handlePressStart);
  document.addEventListener("mouseup", handlePressEnd);
  heartWrapper.addEventListener("mouseleave", handlePressEnd);

  // Touch Events
  heartWrapper.addEventListener("touchstart", handlePressStart, {
    passive: false,
  });
  document.addEventListener("touchend", handlePressEnd);
  heartWrapper.addEventListener("touchcancel", handlePressEnd);
});

function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const heartCount = 15;
  const trollIcons = [
    "❤️",
    "💖",
    "💗",
    "💕",
    "💞",
    "💓",
    "💘",
    "💝",
    "✨",
    "🌸",
    "🦋",
  ];

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = trollIcons[Math.floor(Math.random() * trollIcons.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(heart);
  }
}

function createFireworks() {
  const colors = ["#ff6b8b", "#ff8e9e", "#ffb3c1", "#ffd6de", "#ffffff"];
  const container = document.querySelector(".lock-container");

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "10";
    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 3 + Math.random() * 3;
    const distance = 80 + Math.random() * 150;

    const animation = particle.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 800,
        easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
      },
    );

    animation.onfinish = () => particle.remove();
  }
}
