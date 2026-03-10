import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://birthday-d859f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function createTestData() {
    const users = {
        "Ong_bo": {
            name: "Bố Của Chú Rể",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
            desc: "Người đàn ông mẫu mực, trụ cột của gia đình."
        },
        "Mom": {
            name: "Mẹ Của Cô Dâu",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
            desc: "Người phụ nữ hiền hậu, luôn chăm lo cho con cái."
        }
    };

    await set(ref(db, 'wedding/users'), users);
    console.log("Test data populated successfully!");
}

createTestData();
