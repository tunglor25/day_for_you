<div align="center">

# � DAY FOR YOU: SPECIAL EVENT SYSTEM

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
</p>

**"Day For You"** là một hệ thống Website tương tác đa cấp độ được thiết kế đặc biệt dành riêng cho một kiện sự/nhân vật quan trọng (ví dụ: Tỏ tình, Chúc mừng 8/3, Lễ Kỷ niệm). Hệ thống này chứa nhiều lớp giao diện, từ trang bìa bảo mật ngẫu nhiên, cho đến trang mở thư 3D, trang chúc mừng hoành tráng và cả một trang quản trị (Admin Panel) theo dõi dữ liệu người dùng.

</div>

---

## 📑 Bảng Mục Lục

1. [Luồng Hoạt Động Của Hệ Thống (System Flow)](#1-luồng-hoạt-động-của-hệ-thống-system-flow)
2. [Chi Tiết Các Phân Hệ (Modules)](#2-chi-tiết-các-phân-hệ-modules)
   - [Trang Cảnh Báo (Index / Access Denied)](#-trang-cảnh-báo-index--access-denied)
   - [Trang Mở Khóa (Lock)](#-trang-mở-khóa-lock)
   - [Trang Chúc Mừng Phụ Nữ 8/3 (Women's Day)](#-trang-chúc-mừng-phụ-nữ-83-womens-day)
   - [Khán Phòng Bay (Celebration)](#-khán-phòng-bay-celebration)
   - [Hệ Quản Trị Trung Tâm (Admin Dashboard)](#-hệ-quản-trị-trung-tâm-admin-dashboard)
3. [Cơ Sở Dữ Liệu & Logic (Backend - Firebase)](#3-cơ-sở-dữ-liệu--logic-backend---firebase)
4. [Hướng Dẫn Cài Đặt (Setup Guide)](#4-hướng-dẫn-cài-đặt-setup-guide)

---

## 🧭 1. Luồng Hoạt Động Của Hệ Thống (System Flow)

Hệ thống được thiết kế chạy theo một luồng kịch bản (Journey) có chủ đích để tạo sự bất ngờ lớn cho người nhận:

1. **Người dùng vô tình/hoặc nhận được link gốc (`index.html`)**: Đập vào mắt họ là một giao diện **Cảnh báo Đỏ (Bộ đếm Hacker)**. Điều này tạo ra sự tò mò và cảm giác "mình đang xâm nhập khu vực cấm".
2. **Kích hoạt chuyển hướng (Redirect)**: Thông qua các cơ chế mở khóa ẩn bên trong hoặc qua một đường link bí mật, người dùng sẽ được đưa đến **Trang Xác Thực (`lock.html`)**.
3. **Mở Bức Thư Chúc Mừng (`women_day.html`)**: Sau khi xác minh chính chủ, một giao diện Lá thư 3D (Đang nằm trong phong bì) hiện ra. Khi bấm gửi, lá thư mở bung với các hiệu ứng lấp lánh và thông điệp ngọt ngào.
4. **Bữa Tiệc Chúc Mừng Tối Thượng (`celebration.html`)**: Trạm cuối của hệ thống là một khán phòng hoặc một không gian tiệc tùng lộng lẫy, chứa đựng lời chúc ý nghĩa nhất kèm âm thanh, pháo hoa nổ rợp trời.
5. **Giám Sát Toàn Cầu (Admin)**: Toàn bộ quá trình người dùng truy cập, người ta nhập mật khẩu gì, họ ở lại trang nào bao lâu... đều được Database ghi nhận và Admin theo dõi trực tiếp (`admin.html`).

---

## 🧩 2. Chi Tiết Các Phân Hệ (Modules)

### 🚨 Trang Cảnh Báo (`index.html` - Access Denied)

Trang Web làm nhiệm vụ "Bức tường chắn phòng thủ". Khách lạ truy cập sẽ tưởng đây là một trang lỗi mạng.

- **Tính năng**: Giao diện Cyber Hacker 3D Parallax với hình nền Matrix rơi. Hiệu ứng Glitch giật lag ảnh và nhiễu sóng màn hình CRT.
- **Bảo mật mạnh (Anti-Inspect)**: Chặn F12, Click chuột phải, Xóa sạch tự động Console Log và tạo Vòng lặp báo lỗi (Debugger Trap) bắt đứng máy những ai cố tình soi Source Code. Hệ thống sinh ra để thách thức người xem. Liên kết với Admin qua Tiktok và Facebook nếu gặp lỗi "Đi nhầm nhà".

### 🔐 Trang Mở Khóa (`lock.html`)

- Cơ chế xác minh quyền lực để chắt lọc đúng "Nhân vật chính" mới được phép vào bữa tiệc. Yêu cầu nhập đúng mật mã bí mật hoặc thao tác đặc biệt.

### 💌 Trang Chúc Mừng Phụ Nữ / Bức Thư (`women_day.html`)

- Giao diện **Thư mời 3D** mượt mà. CSS thuần mô phỏng một chiếc phong bì chuyển động, lật nắp lên và rút thiệp mời từ bên trong ra ngoài qua tương tác Hover/Click.
- Phong bì thư sử dụng Polygon-Clip-Path để tạo các nếp gấp giấy siêu ảo diệu.

### 🎆 Khán Phòng Bay (`celebration.html`)

- Bùng nổ thị giác. Được thiết kế như một phòng tiệc sang trọng.
- Gắn kết với các file ảnh, Audio nhạc nền. Các hiệu ứng Pháo hoa rơi, Trái tim nổi xung quanh khung màn hình.

### 💻 Hệ Quản Trị Trung Tâm (`admin.html`)

- Giao diện Dashboard nội bộ (Chỉ dành cho bạn).
- Giám sát Real-time quá trình khách hàng / người ấy đi tới bước nào trong hệ thống.
- Giao tiếp trực tiếp với **Firebase Database**.

---

## ☁️ 3. Cơ Sở Dữ Liệu & Logic (Backend - Firebase)

Hệ thống hoạt động mượt mà không cần phải thuê Server đắt tiền nhờ sự tích hợp xuất sắc của hệ sinh thái **Google Firebase**:

- **Cấu trúc lưu trữ (Thư mục `/js/`)**:
  - `firebase_db.js`: Khởi tạo và kết nối SDK của Firebase vào hệ thống.
  - Chứa mọi logic Đọc/Ghi (Read/Write) vào Realtime Database.
- **Tính năng Data Flow**:
  1. Ghi nhận log truy cập của người dùng ở từng màn hình (`index` tới `celebration`).
  2. Lưu lại lịch sử nhập mã khóa (Thử sai mật khẩu). Nắm thóp người ấy nghĩ gì.
  3. Cập nhật trạng thái trực tuyến của "Bữa tiệc" đẩy liền lên `admin.html`.

---

## ⚙️ 4. Hướng Dẫn Cài Đặt (Setup Guide)

Vì cấu trúc hoàn toàn thuần túy dựa trên kiến trúc **Web Tĩnh Client-Side Base** cực kì linh hoạt, bạn chỉ cần một vài thao tác để đẩy Code chạy thực tế:

### 👉 Môi Trường Chạy Code (Run Local)

1. Cài đặt **Visual Studio Code**.
2. Cài đặt Extension **Live Server** (Ext ID: `ritwickdey.LiveServer`).
3. Mở thư mục `day_for_you`. Chuột phải vào `celebration.html` hoặc `index.html` > Chọn **"Open with Live Server"**. Hệ thống sẽ chạy ngay trên `http://127.0.0.1:5500`.

### 👉 Kết Nối Database của Riêng Bạn

Để tránh lỗi phân quyền (Firebase Auth/Rules), bạn cần tích hợp Database thật của bạn:

1. Đăng nhập vào [Firebase Console](https://console.firebase.google.com/). Tạo một Project mới.
2. Mở tính năng **Realtime Database** > Chọn chế độ **Mode Test** (Nới lỏng rules Đọc/Ghi).
3. Lấy chuỗi **Config** (Cấu hình) gồm các mã `apiKey`, `authDomain`, `databaseURL`...
4. Pass (Dán) chuỗi config đó vào trong file `js/firebase_db.js` của bạn thay thế cho mảng cấu hình mặc định.

### 👉 Xuất Bản Web (Deploy)

Chỉ việc kéo & thả toàn bộ Folder chứa `index.html`, `CSS/`, `JS/`, `Assets/` lên các Hosting cung cấp Website tĩnh hoàn toàn miễn phí cực khỏe:

- [Github Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

Hệ thống của bạn sẽ Online 24/7 và sẵn sàng gửi gắm sự bất ngờ đến tận tay Người Ấy!

<br>
<div align="center">
<i>Sản phẩm tinh hoa được mã hóa từ trái tim 💖. <br>"Không chỉ là những dòng Code, đó là một món quà kĩ thuật số."</i>
</div>
