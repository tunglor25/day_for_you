import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // Chỉ yêu cầu databaseURL vì dùng public rtdb
  databaseURL:
    "https://birthday-d859f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Đọc URL Parameter để tạo không gian riêng
const urlParams = new URLSearchParams(window.location.search);
const currentId = urlParams.get("id") || "chunghi";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const wishesRef = ref(database, "wishes/" + currentId);
const configRef = ref(database, "celebrations/" + currentId);

// Lấy tham chiếu các elements
const wishForm = document.getElementById("wish-form");
const wishesList = document.getElementById("wishes-list");
const wishNameInput = document.getElementById("wish-name");
const wishContentInput = document.getElementById("wish-content");
// Tải tham chiếu elements mới cho tính năng up ảnh
const wishFileInput = document.getElementById("wish-file");
const wishImgPreviewContainer = document.getElementById(
  "wish-img-preview-container",
);
const wishImgPreview = document.getElementById("wish-img-preview");
const btnRemoveImg = document.getElementById("btn-remove-img");
const btnSubmitWish = document.getElementById("btn-submit-wish");
const btnWishLoader = document.getElementById("btn-wish-loader");

let selectedFile = null;

// Xử lý chọn ảnh & Preview
if (wishFileInput) {
  wishFileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = function (event) {
        wishImgPreview.src = event.target.result;
        wishImgPreviewContainer.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });
}

if (btnRemoveImg) {
  btnRemoveImg.addEventListener("click", () => {
    selectedFile = null;
    wishFileInput.value = "";
    wishImgPreviewContainer.classList.add("hidden");
  });
}

// Tải thông số trang web Động từ Firebase 1 lần khi load trang
get(configRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      applyConfig(snapshot.val());
    } else {
      // Dữ liệu mẫu hiển thị nếu Link cấu hình ID Sai hoặc chưa có DB
      applyConfig({
        name: "Lovie",
        birthYear: 2005,
        folder: "",
        imgCount: 7,
      });
    }
  })
  .catch((error) => console.error("Lỗi tải Config:", error));

function applyConfig(config) {
  // Đổi các thẻ Tên ở trang phụ (Index, Lock)
  const nameReceivers = document.querySelectorAll(".receiver-name");
  nameReceivers.forEach(
    (el) => (el.textContent = "Thư mời của " + (config.name || "Lovie")),
  );

  const lockReceivers = document.querySelectorAll(".receiver-name-lock");
  lockReceivers.forEach(
    (el) =>
      (el.innerHTML =
        'Mở khóa trái tim<br><span class="text-rose-500 mt-2 block">' +
        (config.name || "Lovie") +
        "</span>"),
  );

  // Đổi tiêu đề
  const titleEl = document.getElementById("main-title");
  if (titleEl) {
    titleEl.innerHTML =
      'Happy Birthday<br><span class="text-4xl md:text-6xl text-rose-500 mt-2 block">' +
      (config.name || "Lovie") +
      "</span>!";
  }

  // Đổi ảnh đại diện khung tròn và icon âm nhạc
  const introImg =
    document.getElementById("intro-avatar") ||
    document.querySelector(".intro-content img");
  const musicImg =
    document.getElementById("music-avatar") ||
    document.querySelector("#music-toggle img");

  if (introImg || musicImg) {
    let basePath = "assets/images/";
    if (config.folder && config.folder.trim() !== "") {
      basePath += config.folder.trim() + "/";
    }

    if (introImg) {
      // Ưu tiên dùng ảnh có đuôi theo imgCount hoặc ảnh 7 (do trước đó HTML hardcode Anh7)
      introImg.src =
        basePath +
        (config.imgCount ? "Anh" + config.imgCount + ".PNG" : "Anh7.PNG");
      // Xử lý báo lỗi tải ảnh Fallback
      introImg.onerror = function () {
        this.src = "https://loremflickr.com/600/400/birthday,cake";
      };
    }

    if (musicImg) {
      musicImg.src = basePath + "Anh1.PNG";
      musicImg.onerror = function () {
        this.src = "https://loremflickr.com/600/400/birthday,cake";
      };
    }
  }
  // Đổi nền text background
  const scrollTextEl = document.querySelector(".scrolling-text");
  if (scrollTextEl) {
    const text = "Happy Birthday " + (config.name || "Lovie") + " ✨ ";
    scrollTextEl.textContent = text.repeat(5);
  }

  // Load Album ẢNh kỷ niệm động
  const swiperWrapper = document.getElementById("swiper-dynamic-wrapper");
  if (swiperWrapper) {
    let basePath = "assets/images/";
    if (config.folder && config.folder.trim() !== "") {
      basePath += config.folder.trim() + "/";
    }

    const count = parseInt(config.imgCount) || 6;
    let slidesHTML = "";

    // Tạo danh sách ảnh
    for (let i = 1; i <= count; i++) {
      slidesHTML += `
          <div class="swiper-slide overflow-hidden rounded-3xl">
            <div class="absolute inset-0 bg-black/10 z-0"></div>
            <!-- Lớp nền mờ (Blurred Background) -->
            <img src="${basePath}Anh${i}.PNG" class="absolute inset-0 w-full h-full object-cover z-0 blur-xl opacity-50 scale-110" 
                 onerror="this.src='https://loremflickr.com/600/400/birthday,cake'" />
            <!-- Lớp ảnh chính sắc nét (Sharp Foreground) -->
            <img src="${basePath}Anh${i}.PNG" class="relative z-10 w-full h-full object-contain drop-shadow-2xl" 
                 onerror="this.src='https://loremflickr.com/600/400/birthday,cake'" />
          </div>
        `;
    }
    // Lặp thêm file chính nó để chống Lỗi đen viền loop của CSS (Swiper Loop yêu cầu ít nhất 6 slides)
    // Swiper Cards Effect và Loop mode yêu cầu ít nhất 6-8 slides để hoạt động mượt mà và không báo lỗi
    if (count < 8) {
      let duplicateNeeded = 8 - count;
      for (let i = 1; i <= duplicateNeeded; i++) {
        // Lấy lại ảnh theo vòng lặp bằng toán tử chia lấy dư
        let imgIndex = ((i - 1) % count) + 1;
        slidesHTML += `
          <div class="swiper-slide overflow-hidden rounded-3xl">
            <div class="absolute inset-0 bg-black/10 z-0"></div>
            <!-- Lớp nền mờ -->
            <img src="${basePath}Anh${imgIndex}.PNG" class="absolute inset-0 w-full h-full object-cover z-0 blur-xl opacity-50 scale-110" 
                    onerror="this.src='https://loremflickr.com/600/400/birthday,cake'" />
            <!-- Lớp ảnh chính -->
            <img src="${basePath}Anh${imgIndex}.PNG" class="relative z-10 w-full h-full object-contain drop-shadow-2xl" 
                    onerror="this.src='https://loremflickr.com/600/400/birthday,cake'" />
          </div>
        `;
      }
    }

    swiperWrapper.innerHTML = slidesHTML;
    // Báo cho SwiperJS là đã Cập nhật Slide HTML xong và bắt đầu chạy Effect Slider
    if (window.initMySwiper) {
      window.initMySwiper();
    }
  }

  // Set biến toàn cục để file renderCake tính số độ tuổi trên nến
  window.cakeBirthYear = config.birthYear || 2005;
}

// Lắng nghe sự kiện thêm mới hoặc fetch dữ liệu ban đầu
if (wishesList) {
  onValue(wishesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      wishesList.innerHTML = ""; // Xóa các lời chúc ở giao diện tĩnh
      // Data là một Object các key đẩy lên, biến thành Array, sắp xếp thời gian (mới nhất lên trên)
      const wishesArray = Object.values(data).sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0),
      );

      wishesArray.forEach((wish) => {
        const newMsg = renderWishMsg(
          wish.name,
          wish.content,
          wish.dateStr,
          wish.imgUrl,
        );
        wishesList.insertAdjacentHTML("beforeend", newMsg);
      });
    } else {
      // Empty state khi không có data
      wishesList.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full py-12 px-6 text-center animate-slide-up">
        <div class="w-24 h-24 mb-6 rounded-full bg-pink-100 flex items-center justify-center relative shadow-inner">
          <i class="fa-solid fa-envelope-open-text text-4xl text-pink-400 absolute"></i>
        </div>
        <h3 class="text-xl font-bold text-pink-500 font-quicksand mb-3">Hòm Thư Đang Trống!</h3>
        <p class="text-gray-500 text-sm md:text-base font-quicksand">Bạn hãy là người đầu tiên gửi lời chúc ngọt ngào nhất đến chủ nhân bữa tiệc nhé! 🎈</p>
      </div>
    `;
    }
  });
}

function renderWishMsg(name, content, dateStr, imgUrl) {
  return `
    <div class="relative bg-[#fff9c4]/50 p-6 rounded-sm shadow-md border-l-4 border-pink-400/50 font-quicksand animate-slide-up transform transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
        <!-- Băng dính trang trí (Tape effect) -->
        <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-pink-200/40 rotate-2 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="flex items-center gap-3 mb-3 relative z-10">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 flex justify-center items-center text-white font-bold shadow-sm">
                <i class="fa-solid fa-user-pen text-sm"></i>
            </div>
            <div>
                <h4 class="font-bold text-pink-600 text-sm">${name}</h4>
                <div class="text-[10px] text-gray-400 italic">${dateStr}</div>
            </div>
        </div>
        
        <p class="text-gray-700 font-dancing text-xl leading-relaxed relative z-10">
            "${content}"
        </p>

        ${
          imgUrl
            ? `
        <div class="mt-4 rounded-lg overflow-hidden border border-pink-100 shadow-sm relative z-10 group/img">
            <img src="${imgUrl}" class="w-full h-auto max-h-60 object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        `
            : ""
        }
        
        <!-- Icon trang trí nhỏ -->
        <div class="absolute bottom-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
            <i class="fa-solid fa-heart text-pink-500 text-2xl"></i>
        </div>
    </div>
  `;
}

// Hàm Upload lên ImgBB (Free API)
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);
  // API Key cá nhân của người dùng (Đảm bảo ổn định và nhanh chóng)
  const apiKey = "d5cece8e50f4cb425b5f5583b432c9c1";

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await response.json();
    if (result.success) {
      return result.data.url;
    }
    console.error("ImgBB Error:", result.error);
    throw new Error(result.error.message || "Unknown error");
  } catch (error) {
    console.error("ImgBB Upload Fail:", error);
    return null;
  }
}

// Xử lý Gửi Lời chúc mới
if (wishForm) {
  wishForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = wishNameInput.value.trim();
    const contentInput = wishContentInput.value.trim();
    const dateStr = new Date().toLocaleDateString("vi-VN");

    if (nameInput === "" || contentInput === "") return;

    // Bắt đầu Loading
    if (btnSubmitWish) btnSubmitWish.disabled = true;
    if (btnWishLoader) btnWishLoader.classList.remove("hidden");

    let imgUrl = "";
    if (selectedFile) {
      imgUrl = await uploadToImgBB(selectedFile);
      if (!imgUrl) {
        alert("Lỗi khi tải ảnh lên. Lời chúc sẽ được gửi mà không có ảnh nhé!");
      }
    }

    push(wishesRef, {
      name: nameInput,
      content: contentInput,
      imgUrl: imgUrl || "",
      dateStr: dateStr,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        wishForm.reset();
        selectedFile = null;
        if (wishImgPreviewContainer)
          wishImgPreviewContainer.classList.add("hidden");

        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gửi lời chúc:", error);
        alert("Đã có lỗi xảy ra. Hãy thử lại sau nhé!");
      })
      .finally(() => {
        if (btnSubmitWish) btnSubmitWish.disabled = false;
        if (btnWishLoader) btnWishLoader.classList.add("hidden");
      });
  });
}

/* Bảo mật Content: Chặn chuột phải, copy và F12 */
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  // Chặn Ctrl+C, Ctrl+U, Ctrl+S, F12
  if (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s")) {
    e.preventDefault();
  }
  if (e.key === "F12") {
    e.preventDefault();
  }
});
