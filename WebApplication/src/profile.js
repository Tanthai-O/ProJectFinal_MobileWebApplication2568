let currentUserUID = ""; 

// ✅ ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
document.addEventListener("DOMContentLoaded", function () {
    const userData = {
        displayName: "สมชาย ตัวอย่าง",
        email: "example@email.com",
        phone: "0812345678",
        photoURL: "/images/imageprofiledefault.jpg"
    };

    document.getElementById("display-username").innerText = userData.displayName;
    document.getElementById("display-email").innerText = userData.email;
    document.getElementById("display-phone").innerText = userData.phone;
    document.getElementById("profile-pic").src = userData.photoURL;
});

function toggleEdit(editMode) {
    document.getElementById("edit-form").classList.toggle("hidden", !editMode);
    document.getElementById("edit-btn").classList.toggle("hidden", editMode);
    document.getElementById("save-btn").classList.toggle("hidden", !editMode);
    document.getElementById("cancel-btn").classList.toggle("hidden", !editMode);

    if (editMode) {
        document.getElementById("username").value = document.getElementById("display-username").innerText;
        document.getElementById("email").value = document.getElementById("display-email").innerText;
        document.getElementById("phone").value = document.getElementById("display-phone").innerText;
    }
}

// ✅ เปลี่ยนรูปโปรไฟล์แบบ Static
document.getElementById("profile-image").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("profile-pic").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function saveProfile() {
    document.getElementById("display-username").innerText = document.getElementById("username").value;
    document.getElementById("display-email").innerText = document.getElementById("email").value;
    document.getElementById("display-phone").innerText = document.getElementById("phone").value;
    toggleEdit(false);
}
