<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</div>

<h1 align="center">🎂 Day For You - Interactive Celebration App</h1>

<p align="center">
  A beautifully crafted, interactive web application to send personalized greetings, celebration wishes, and virtual gifts. Packed with eye-catching animations, a virtual cake-cutting experience, and a digital memories album to make your loved ones feel special.
</p>

---

## 🚀 Live Demo

Experience the magic here: **[Live Preview](https://tunglor25.github.io/day_for_you/index.html?id=Em_yeu)**

> **Note:** The application uses URL parameters (e.g., `?id=Em_yeu`) to dynamically fetch and display personalized content!

## ✨ Features

- **💌 Interactive Envelope:** A smooth 3D envelope opening animation that reveals a personalized invitation.
- **✨ Stunning Animations:** Integrates `Animate.css` and custom CSS keyframes for flying hearts, glowing text, and smooth transitions.
- **🎂 Virtual Cake:** Blow out the candles and make a wish in a beautifully designed virtual birthday cake section!
- **💬 Real-Time Wishes Board:** An elegant, vertically scrollable board filled with heartfelt messages.
- **🖼️ Memories Album:** A photo album that gracefully opens images in a customized, responsive popup modal.
- **📱 Fully Responsive:** Carefully optimized with Tailwind CSS to look stunning on both mobile devices and large desktop screens.
- **☁️ Cloud Powered:** Integrated with Firebase (`firebase_db.js`) to seamlessly store and retrieve personalized content dynamically.

## 🛠 Tech Stack

- **Structure:** HTML5
- **Styling:** Tailwind CSS (via CDN), CSS3 (Custom animations)
- **Scripting:** Vanilla JavaScript (ES6 Modules)
- **Backend/Database:** Firebase
- **Icons & Typography:** FontAwesome 6, Google Fonts (Dancing Script & Quicksand)
- **Animation Framework:** Animate.css

## 📂 Project Structure

```text
📦 day_for_you
 ┣ 📂 assets/        # Images, icons, and audio files
 ┣ 📂 css/           # Custom CSS files (envelope.css, etc.)
 ┣ 📂 js/            # JavaScript logic (script.js, firebase_db.js)
 ┣ 📜 index.html     # Entry point (Envelope Invitation)
 ┣ 📜 celebration.html # Main celebration & wishes page
 ┣ 📜 admin.html     # Admin dashboard for managing wishes/images
 ┣ 📜 lock.html      # Security/Password-protected entry
 ┗ 📜 README.md      # Project Documentation
```

## 💻 Local Development

To run this project locally, follow these simple steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tunglor25/day_for_you.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd day_for_you
   ```

3. **Serve the project:**
   Since this project uses ES6 modules (`type="module"` in script tags), you need a local server. You can use the **Live Server** extension in VS Code, or Python:

   ```bash
   python -m http.server 8000
   ```

4. **Open in Browser:**
   Go to `http://localhost:8000/index.html?id=Em_yeu`

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/tunglor25/day_for_you/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ by Tunglor
</p>
