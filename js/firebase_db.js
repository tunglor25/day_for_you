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
        imgCount: 6,
      });
    }
  })
  .catch((error) => console.error("Lỗi tải Config:", error));

function applyConfig(config) {
  // Đổi tiêu đề
  const titleEl = document.getElementById("main-title");
  if (titleEl) {
    titleEl.innerHTML = `Happy Birthday<br><span class="text-4xl md:text-6xl text-rose-500 mt-2 block">\${config.name}</span>!`;
  }

  // Đổi nền text background
  const scrollTextEl = document.querySelector(".scrolling-text");
  if (scrollTextEl) {
    const text = `Happy Birthday \${config.name} ✨ `;
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
          <div class="swiper-slide h-[300px] md:h-[500px]">
            <img src="\${basePath}Anh\${i}.PNG" class="w-full h-full object-cover object-center" 
                 onerror="this.src='https://images.unsplash.com/photo-1513258496099-48166d22c97a?w=400&q=80'" />
          </div>
        `;
    }
    // Lặp thêm file rỗng để chống Lỗi đen viền loop của CSS
    if (count < 6) {
      for (let i = 1; i <= 6 - count; i++) {
        slidesHTML += `
          <div class="swiper-slide h-[300px] md:h-[500px]">
             <img src="\${basePath}Anh\${i}.PNG" class="w-full h-full object-cover object-center" 
                  onerror="this.src='https://images.unsplash.com/photo-1513258496099-48166d22c97a?w=400&q=80'" />
          </div>
        `;
      }
    }

    swiperWrapper.innerHTML = slidesHTML;
    // Báo cho SwiperJS là đã Cập nhật Slide HTML xong
    if (window.mySwiper) {
      window.mySwiper.update();
    }
  }

  // Set biến toàn cục để file renderCake tính số độ tuổi trên nến
  window.cakeBirthYear = config.birthYear || 2005;
}

// Lắng nghe sự kiện thêm mới hoặc fetch dữ liệu ban đầu
onValue(wishesRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    wishesList.innerHTML = ""; // Xóa các lời chúc ở giao diện tĩnh
    // Data là một Object các key đẩy lên, biến thành Array, sắp xếp thời gian (mới nhất lên trên)
    const wishesArray = Object.values(data).sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0),
    );

    wishesArray.forEach((wish) => {
      const newMsg = renderWishMsg(wish.name, wish.content, wish.dateStr);
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

function renderWishMsg(name, content, dateStr) {
  const initials = name.substring(0, 2).toUpperCase();
  return `
    <div class="bg-white/90 p-5 rounded-2xl border-l-4 border-pink-400 shadow-md font-quicksand animate-slide-up transform transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-pink-100 flex justify-center items-center text-pink-500 font-bold text-sm">
                ${initials}
            </div>
            <h4 class="font-bold text-pink-600">${name}</h4>
        </div>
        <p class="text-gray-700 leading-relaxed text-sm md:text-base">${content}</p>
        <div class="text-xs text-gray-400 mt-2 text-right">${dateStr}</div>
    </div>
  `;
}

// Xử lý Gửi Lời chúc mới
wishForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = wishNameInput.value.trim();
  const contentInput = wishContentInput.value.trim();
  const dateStr = new Date().toLocaleDateString("vi-VN");

  if (nameInput === "" || contentInput === "") return;

  push(wishesRef, {
    name: nameInput,
    content: contentInput,
    dateStr: dateStr,
    timestamp: serverTimestamp(),
  })
    .then(() => {
      // Thành công, Firebase Realtime Database sẽ tự gọi \`onValue\` cập nhật lại List
      wishForm.reset();

      // Kích hoạt hiệu ứng bắn pháo hoa
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    })
    .catch((error) => {
      console.error("Lỗi khi gửi lời chúc:", error);
      alert("Đã có lỗi xảy ra. Hãy thử lại sau nhé!");
    });
});
