<div align="center">

# 🛡️ SYSTEM SECURED: ACCESS DENIED UI

<p align="center">
  <img src="https://img.shields.io/badge/Status-Secured-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

Một giao diện trang web **Từ chối truy cập (Access Denied / 403 Forbidden)** mang đậm phong cách **Cyberpunk / Hacker 3D** cực kỳ chuyên nghiệp và ngầu lòi. Đặc biệt, dự án này không chỉ tập trung vào trải nghiệm thị giác (UI/UX) mà còn tích hợp các phương thức bảo vệ mã nguồn Client-side (Anti-Inspect & Anti-Debug) cực mạnh nhằm "chặn quyền thao tác" của những vị khách lọt vào nhầm chỗ hoặc đang có ý định dòm ngó mã nguồn.

</div>

---

## 📑 Bảng Mục Lục

1. [Giới thiệu Chung](#-giới-thiệu-chung)
2. [Tính Năng Nổi Bật (Features)](#-tính-năng-nổi-bật-features)
   - [Trải Nghiệm Thị Giác & Đồ Họa 3D](#1-trải-nghiệm-thị-giác--đồ-họa-3d)
   - [Chi Tiết Cảnh Báo & Giả Lập Hệ Thống](#2-chi-tiết-cảnh-báo--giả-lập-hệ-thống)
   - [Giao Thức Bảo Mật Anti-Inspect (Client-Side Defence)](#3-giao-thức-bảo-mật-anti-inspect-client-side-defence)
3. [Công Nghệ Chống Đỡ (Responsive Design)](#-công-nghệ-chống-đỡ-responsive-design)
4. [Hướng Dẫn Cài Đặt và Tùy Biến (Setup & Customization)](#-hướng-dẫn-cài-đặt-và-tùy-biến-setup--customization)
5. [Cấu Trúc Lõi (Tech Stack)](#-cấu-trúc-lõi-tech-stack)

---

## � Giới thiệu Chung

Bạn đã bảo giờ muốn tạo một trang báo lỗi như **404 Not Found** hoặc **403 Forbidden Access** mà nó không nhàm chán như những thông báo mặc định của máy chủ?

Dự án này là câu trả lời hoàn hảo cho điều đó. Mang dáng dấp của một hệ thống an ninh lõi (Security Core System) trong những bộ phim Khoa học Viễn tưởng / Cyber hacker đình đám (The Matrix, Cyberpunk 2077...). Bất cứ ai chạm trán với giao diện này cũng sẽ phải ấn tượng bởi độ chân thực từ những hiệu ứng báo lỗi giả lập (Glitch, CRT Scanline) cho tới âm thanh cảnh báo và các tệp nhật ký Terminal báo động đỏ.

Hơn thế nữa, đối với những người được gọi là "lập trình viên" muốn F12 / chuột phải để tải code về máy hay can thiệp phá mã... Giao diện này sẽ là một cơn ác mộng cực độ với hàng lớp bẫy bảo vệ đa tầng bọc thép.

---

## ✨ Tính Năng Nổi Bật (Features)

### 1. Trải Nghiệm Thị Giác & Đồ Họa 3D

- **Matrix Digital Rain**: Màn mưa mã lệnh (ASCII & Hexadecimal Code) tuân chuẩn The Matrix liên tục rơi xuống màn hình tạo cảm giác bí ẩn đằng sau lớp kính làm mờ.
- **Glassmorphism 3D Panel**: Bảng điều khiển chính kết hợp kính nhám siêu thực.
- **True 3D Interactive Tilt**: Màn hình điều khiển ảo 3D. Giao diện nghiêng tương tác theo đường di chuyển chuột của người dùng. Sử dụng thuật toán _Linear Interpolation (Lerp)_ và _RequestAnimationFrame_ mang lại độ trễ "dẻo" chuẩn xác siêu mượt mà ở 60->144 FPS trên PC mà không bị giật lác.
- **Hologram Core Shield**: Một khối cầu và ổ khóa 3D được xoay đa trục bằng CSS Animations thuần để mô phỏng "Lõi An Ninh" đang quét mục tiêu.
- **CRT & Tech Glitch**: Tích hợp các vạch quét ngang màn hình (Scanlines), ánh sáng mờ dần từ tâm (Vignette) và nhiễu sóng màn hình máy tính cũ (Flicker). Tiêu đề lõi `ACCESS DENIED` xuất hiện hiệu ứng giật lag, chia dải màu RGB loạn xạ siêu chân thực.
- **Smart Custom Cursor**: Ẩn hoàn toàn trỏ chuột Window cũ kỹ, thay bằng "Tâm ngắm Hacker" (Crosshair) đi kèm "vòng radar tracking" xoay mượt mà chạy theo sau. Khi rê vào các công tắc/nút bấm vùng khả dụng, nó sẽ tự động khóa mục tiêu và chuyển sang màu Đỏ báo động.

### 2. Chi Tiết Cảnh Báo & Giả Lập Hệ Thống

- **Máy đánh chữ cảnh báo (Typewriter)**: Cảnh báo "CẢNH BÁO: BẠN ĐÃ ĐI NHẦM NƠI" tự động được "hệ thống" gõ từng ký tự với độ trễ (delay) được thiết lập ngẫu nhiên hệt như máy gõ thật. Đặc biệt, con trỏ nhấp nháy `_` ở cuối chữ áp dụng thông minh vào Inline-DOM nên sẽ không bao giờ bị lệch kể cả khi màn hình thiếu chỗ làm rớt câu văn xuống dòng.
- **Hệ Thống Nhật Ký Terminal (Pro Terminal Logs)**: Ở phía dưới bảng là một khung màn hình Command Line thu nhỏ, tự động liên tục in (log) ra các thông báo như đang quét virus, chặn tường lửa, truy thu IP, Lock Cluster... làm người xem hoảng sợ tưởng mình xâm nhập nhầm vào căn cứ quân sự.
- **Industrial Audio API**: Kết hợp hiệu ứng âm thanh tít tít máy móc công nghiệp (Web Audio API) ngay khi màn hình báo động được click / chạm vào.

### 3. Giao Thức Bảo Mật Anti-Inspect (Client-Side Defence)

**_Lưu ý:_** Đây là phân lớp rào chắn sinh ra để "hành hạ, quấy phá" tâm lý lập trình viên nào muốn chôm Code từ project. Tuy bảo mật phía client (Trình duyệt) không bao giờ là tuyệt đối 100%, nhưng chúng ta có thể làm nó thật ức chế.

- **Khóa Chuột Phải (No-Context Menu)**: Chặn copy, chặn menu bấm "Kiểm tra phần tử" (Inspect Element).
- **Chặn Tổ Hợp Phím Lập Trình**: Bắt dính Event Listeners để vô hiệu hóa ngay từ vòng gửi xe các nút chuyên dụng: `F12`, Tổ hợp gọi Console `Ctrl + Shift + I/J`, Tổ hợp Xem Mã Nguồn `Ctrl + U`.
- **Máy Chém Môi Trường Console (Aggressive Console Wipe)**:
  - Thay vì dùng `console.clear()` thông thường (sẽ có độ lọt thời gian vài chục mili-giây để Dev gõ kịp phím), hệ thống này ghi đè (Override) TOÀN BỘ các API của Web Console (`log`, `table`, `dir`...) thành hàm Rỗng (`Empty function`).
  - Nó chặt đứt hoàn toàn tính năng Gợi ý 코드 (Autocomplete Hinting) của trình duyệt.
  - Song song với việc in cảnh báo đỏ ra Console với chu kỳ làm mới chỉ vỏn vẹn `10ms` (100 lần chớp sạch 1 giây), **Người xem hoàn toàn không thể gõ trúng được 1 chữ cái nào vào khung Nhập liệu của Console** vì màn hình sẽ xóa ngay chớp ngoáng.
- **Bẫy Khóa Debugger Vô Hạn (Trapper Reload Loop)**: Cứ mỗi `100ms`, trang web dùng thước đo thời gian của Date() Object kết hợp hàm `debugger;` nội bộ.
  - Nếu phát hiện thấy có kẻ dùng ngoại lệ (thủ thuật cao) mở được cửa sổ Developer Tools. Browser lập tức sẽ đóng băng.
  - Màn hình sẽ chuyển sang nội dung Đóng cửa Đỏ rực `CONNECTION TERMINATED`.
  - Tiến hành Spam ký tự Enter tàng hình (`\n`) vào Console raw để đá văng con trỏ gõ của Dev xuống tuốt luốt làm mất tầm nhìn của Dev.
  - Ngay lập tức Refresh (`window.location.reload()`) ép sập trang, khiến Dev bị mất sạch dữ liệu vừa copy tại chỗ.

---

## 📱 Công Nghệ Chống Đỡ (Responsive Design)

Hệ thống được thiết kế hoàn hảo từ Màn hình siêu lớn (Ultra-wide PC / 4k) cho tới Điện thoại di động bé xíu dọc đứng (Mobile Phones/Tablets):

- **Phản Vệ Giao Diện (Mobile Fixed CSS)**: Nhận diện tỉ lệ màn hình nhỏ qua Media Queries `@media` để tự động dọn dẹp các yếu tố thừa thải:
  - Tắt tính năng Xoay 3D Nghiêng (Z-axis perspective / Tilt TranslateZ) ở các Panel con rườm rà chồng lớp > Trả lại trải nghiệm lướt Web chạm (Touch) siêu nhạy 2D đơn giản, nút bấm cắn ngay không bị trễ hay mắc "Lớp tàng hình".
  - Tắt hoàn toàn Con Trỏ Chuột Radar (do trên Mobile thao tác dùng ngón tay chứ không hover).
- **Mở Khóa Cơ Chế Cuộn Cứng (Overflow Unblock)**: Tự động đổi trục chặn `overflow: hidden` sang `overflow-y: auto`, cho phép người dùng lướt ngón tay xem trọn vẹn màn hình hệ thống trên điện thoại thay vì bị che mất nút quay lại.
- **Chống Tràn Cữ (Word-Break Protection)**: Giảm kích thước Font chữ (Font-size Rem scale) và ép vỡ từ chữ (`break-word`) để nhồi gọn các dòng Cảnh bão lỗi / Text Hacker quá dài vào màn hình bề ngang dưới 400px cực kỳ thông minh mà không bị tụt chữ mất nghĩa.

---

## � Hướng Dẫn Cài Đặt và Tùy Biến (Setup & Customization)

Vì kiến trúc gốc hoàn toàn dựa trên cấu trúc **Pure HTML/CSS/JS** không cài đặt các Bundle (React, Webpack, Node Modules...) cực kỳ nhanh:

**Bước 1:** Chỉ việc Clone (hoặc Tải) file `index.html` về máy.
**Bước 2:** Mở file `index.html` trong môi trường giả lập (VS Code Live Server...) hoặc chép lên bất kỳ ổ đĩa nào và Double Click chạy thẳng trên Chrome. Phù hợp hoàn hảo để đẩy lên Netlify, Vercel hoặc Github Pages.

**Tùy biến (Thay đổi liên kêt MXH cá nhân):**
Bạn sửa trực tiếp các thẻ `<a>` ở dòng **`545`** và **`552`**

```html
   <!-- Đây là Nút Liên Hệ Admin Cực Đẹp -->
   <a href="https://www.tiktok.com/@tgun258" target="_blank" class="btn-system group interactive-element" ... >

   <!-- Đây là Nút Link Phụ Phòng Bị -->
   <a href="https://www.facebook.com/" target="_blank" class="text-xs text-[var(--secondary)] ... >
```

---

## 🏗 Cấu Trúc Lõi (Tech Stack)

Để tối ưu trọng lượng nhỏ gọn, Project sử dụng các siêu kĩ nghệ:

- **Tầng Hiển Thị (Mark-up)**: `HTML5` sematic, `CSS3` (với CSS Variables).
- **Tầng Trình Xử Lý Động (Logic)**: `ES6 Vanilla JS`. Thuần không cần Jquery.
- **Hỗ Trợ Tái Thiết Kế (UI Boosters)**:
  - `TailwindCSS` Nhúng qua phương thức Load CDN khẩn cấp nhằm xử dụng nhanh các layout Flexbox / Absolute. Hỗ trợ rút gọn code.
  - `Font Awsome v6.5.0` (Biểu đồ, Ổ khóa Shield, Logo Tiktok, Facebook).
  - Bộ lưu chuyển ký tự (Typography): Trích dẫn siêu tốc từ kho của Google Fonts gồm `Fira Code` (Phông chữ gốc cho Coder cực mượt) & `Orbitron` (Vẻ đẹp Cyberpunk ngầu lòi ngoài dải Ngân hà).

---

<div align="center">
<i>Tác phẩm được bảo hộ với tinh thần ngầu là chính, chất là mười. <br>Hãy dùng nó làm rào chắn phòng thủ tối thượng bảo vệ những Web Pages chưa được publish của bạn.</i><br><br>
<b><span style="color:red; font-size:24px;">"HỆ THỐNG CỦA BẠN, LUẬT CHƠI CỦA BẠN!"</span></b>
</div>
