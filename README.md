<div align="center">

# 🛡️ SYSTEM SECURED: ACCESS DENIED UI

<p align="center">
  <img src="https://img.shields.io/badge/Status-Secured-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

Một giao diện trang web **Từ chối truy cập (Access Denied)** mang đậm phong cách **Cyberpunk / Hacker 3D** cực kỳ chuyên nghiệp và ngầu lòi, tích hợp các phương thức bảo vệ Client-side (Anti-Inspect) cực mạnh. Dùng để "chặn cửa" những vị khách lọt vào nhầm chỗ.

</div>

---

## ✨ Features (Tính Năng Nổi Bật)

### 🎨 1. Giao Diện Đồ Họa Đỉnh Cao (Aesthetics)

- **Matrix Digital Rain**: Màn mưa mã lệnh (ASCII/Hex) chuẩn phong cách The Matrix liên tục rơi xuống màn hình.
- **True 3D Tilt Effect**: Màn hình điều khiển ảo 3D. Giao diện nghiêng tương tác theo đường di chuyển chuột sử dụng thuật toán _Linear Interpolation (Lerp)_ để tạo độ "dẻo" và siêu mượt ở 60+ FPS.
- **Hologram Core Shield**: Khối lập phương bảo vệ tàng hình xoay vòng trên trục Z chuẩn tương lai.
- **CRT & Tech Glitch**: Tích hợp các vạch quét ngang (Scanlines), viền mờ tối (Vignette) và nhiễu sóng màn hình CRT cổ điển. Tiêu đề `ACCESS DENIED` có hiệu ứng giật lag dải màu RGB loạn xạ siêu chân thực.
- **Smart Custom Cursor**: Ẩn hoàn toàn trỏ chuột Window cũ kỹ, thay bằng "Tâm ngắm Hacker" (Crosshair) mượt mà có "vòng quét" chạy theo sau. Khi rê vào các vùng click được nó sẽ tự động biến dạng sang dạng khoá mục tiêu.

### � 2. Giả Lập Hệ Thống (Cyber terminal)

- **Chữ máy chữ (Typewriter)**: Cảnh báo "Bạn đã đi nhầm nơi" tự động được gõ từng ký tự với bộ nhấp nháy `_` chuẩn xác kể cả khi văn bản bị đẩy xuống dòng (Responsive Text Wrap).
- **Pro Terminal Logs**: Một khung Command Line giả lập nhảy log tự động liên tục thông báo các thao tác quét virus, chặn tường lửa... làm người xem tưởng mình hacker xâm nhập thật.
- **Industrial Audio API**: Kết hợp hiệu ứng âm thanh tít tít điện tử (Web Audio API) ngay khi chạm / click vào các công tắc trên bảng điều khiển.

### � 3. Giao Thức Bảo Mật Anti-Inspect (Client-Side Defence)

**_Lưu ý:_** Đây là các tính năng sinh ra để "hành" lập trình viên khác muốn ăn cắp/soi Code của bạn, khiến họ cảm thấy vô cùng ức chế:

- **Khóa Chuột Phải (No-Context Menu)**: Chặn copy, chặn xem mã nguồn.
- **Chặn Tổ Hợp Phím Chuyên Dụng**: Vô hiệu hóa `F12`, `Ctrl + Shift + I/J`, `Ctrl + U` hoàn toàn.
- **Máy Chém Console (Console Wipe)**: Quét sạch bộ đệm Console (`console.clear()`) ở tốc độ 100 lần 1 giây (10ms). Gõ chữ vào là chữ bốc hơi.
- **Console Override**: Tắt phế hoàn toàn chức năng gợi ý code và mọi Method như `console.log, console.table` nhằm bịt lỗ hổng tiêm script từ DevTools.
- **Bẫy Debugger Vô Hạn (Debugger Trap)**: Ép trình duyệt đứng hình bằng `debugger;` ngay khi bắt quả tang ai đó cố mẹo mở Developer Tools lên. Liên tục ép văng chữ và Refresh trang cực ác liệt.

---

## 📱 Responsive (Tương Thích Mọi Thiết Bị)

Hệ thống được thiết kế hoàn hảo từ Màn hình siêu rộng (Ultra-wide PC) cho tới Điện thoại di động bé xíu:

- **Mobile Fixed CSS**: Nhận diện tỉ lệ màn hình nhỏ để tự động vô hiệu hóa tính năng xoay 3D (Z-axis transform), trả lại trải nghiệm lướt Web chạm (Touch) siêu nhạy nhẹ nhàng nhất.
- Chế độ cuộn trục Y (`overflow-y: auto`) để xem Terminal Logs ngay trên iPhone/Android mà không bị che lấp.
- Text và Titles linh hoạt tự xuống dòng.

---

## 🚀 How to use (Hướng dẫn sử dụng)

Vì cấu trúc hoàn toàn thuần túy dựa trên kiến trúc **Vanilla Web** (không cần Node.js, Webpack hay Setup phức tạp):

1. Mở file `index.html` lên bằng bất kỳ trình duyệt nào.
2. Hoặc upload file HTML này lên hosting dùng trực tiếp làm file `403 Forbidden` / `404 Not Found` Catch-all Page.
3. Liên kết thay đổi ở khối `[ LIÊN HỆ ADMIN ]` và Dòng Text phụ tùng Facebook theo ý muốn.
   ```html
   <a href="https://www.tiktok.com/@tgun258" target="_blank" class="btn-system group interactive-element" ...
   ```

---

## 🛠 Lõi Công Nghệ (Tech Stack)

- **Ngôn ngữ**: `HTML5` + `CSS3` + `ES6 Vanilla JS`.
- **Thư viện phụ trợ UI**:
  - `TailwindCSS` (nhúng thẳng qua CDN cho các Setup CSS Base nhanh).
  - `Font Awsome v6.5.0` (Biểu tượng ổ khoá và Logo Mạng Xã Hội).
  - Tham chiếu phông chữ Google Fonts: `Fira Code` (Phông cốt lõi lập trình) & `Orbitron` (Phông Cyber tương lai).

---

<div align="center">
<i>Tác phẩm được bảo hộ với tinh thần ngầu là chính, chất là mười.</i><br>
<b>"Hệ thống của bạn, luật chơi của bạn!"</b>
</div>
