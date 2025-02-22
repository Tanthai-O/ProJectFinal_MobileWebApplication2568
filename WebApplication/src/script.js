// ตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyChd5kiWywUOAh3XYCn_02hWY0jmjJGRzM",
    authDomain: "projectfinalwebapplication2568.firebaseapp.com",
    projectId: "projectfinalwebapplication2568"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ตรวจสอบสถานะผู้ใช้
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in: ", user);
        const uid = user.uid;
        const userDocRef = db.collection("users").doc(uid);

        // ดึงข้อมูลผู้ใช้จาก Firestore
        userDocRef.onSnapshot((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById("user-name").innerText = userData.displayName || user.displayName || "ไม่ระบุ";
                document.getElementById("user-email").innerText = userData.email || user.email || "-";
                
                // อัปเดตรูปโปรไฟล์
                const profileImg = document.querySelector(".profile-img");
                profileImg.src = userData.photoURL || user.photoURL || "imageprofiledefault.jpg";
            }
        });

        // โหลดวิชาที่ผู้ใช้สร้างไว้
        loadSubjects(uid);
    } else {
        console.log("❌ ยังไม่ได้เข้าสู่ระบบ");
        window.location.href = "login.html";
    }
});

// ฟังก์ชันเปลี่ยนหน้า
function toggleAddSubject() {
    window.location.href = "addSubject.html";
}

function toggleProfile() {
    window.location.href = "Profile.html";
}

function toggleLogOut() {
    firebase.auth().signOut().then(() => {
        alert("คุณออกจากระบบแล้ว!");
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("เกิดข้อผิดพลาดในการออกจากระบบ:", error);
    });
}

// โหลดรายชื่อวิชาของผู้ใช้
function loadSubjects(userId) {
    const subjectList = document.getElementById("subject-list1");
    subjectList.innerHTML = "<li>กำลังโหลดข้อมูล...</li>";

    db.collection("users").doc(userId).collection("classroom")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
            subjectList.innerHTML = "";
            if (querySnapshot.empty) {
                subjectList.innerHTML = "<li>ไม่มีรายวิชา</li>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const subjectData = doc.data();
                const li = document.createElement("li");
                li.innerHTML = `<span>${subjectData.code} - ${subjectData.name}</span>`;
                subjectList.appendChild(li);
            });
        });
}
