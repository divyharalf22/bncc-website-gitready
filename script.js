/* ==========================================
   script.js - Profile Card (Anggota 3 / branch "scripting")
   Fitur:
   1. Dark mode
   2. Tombol Like (counter)
   3. Ganti profil Anggota 1 / 2 / 3
   ========================================== */

// ---------- Data anggota (ganti sesuai nama & info timmu) ----------
const members = [
  {
    name: "Nama Anggota 1",
    role: "Frontend Developer",
    about:
      "Saya fokus membangun tampilan web yang rapi, responsif, dan mudah digunakan melalui struktur HTML dan desain antarmuka yang konsisten.",
    skills: ["HTML", "CSS", "JavaScript"],
    photo:
      "https://i.pinimg.com/736x/fc/af/7a/fcaf7aec4b7be05a0d062eff7851d2aa.jpg",
  },
  {
    name: "Nama Anggota 2",
    role: "UI Designer",
    about:
      "Saya bertugas membuat tampilan website jadi enak dilihat, dengan warna dan tata letak yang nyaman untuk pengunjung.",
    skills: ["CSS", "Figma", "Responsive Design"],
    photo:
      "https://ui-avatars.com/api/?name=A2&size=280&background=2f5bea&color=fff",
  },
  {
    name: "Nama Anggota 3",
    role: "JavaScript Developer",
    about:
      "Saya membuat website jadi interaktif, mulai dari tombol, dark mode, sampai pergantian profil.",
    skills: ["JavaScript", "DOM", "Git & GitHub"],
    photo:
      "https://ui-avatars.com/api/?name=A3&size=280&background=1c2333&color=fff",
  },
];

// ---------- Ambil elemen dari HTML ----------
const themeToggle = document.getElementById("theme-toggle");
const counterBtn = document.getElementById("counter-btn");
const counterText = document.getElementById("counter");
const userName = document.getElementById("user-name");
const userRole = document.getElementById("user-role");
const avatar = document.querySelector(".avatar");
const aboutText = document.querySelector(".about p");
const skillList = document.getElementById("skill-list");
const memberLinks = document.querySelectorAll(".member-link");

// ---------- 1. Dark mode ----------
function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Simpan pilihan supaya tetap sama saat halaman di-refresh
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {
    // kalau penyimpanan tidak bisa dipakai, abaikan saja
  }
}

themeToggle.addEventListener("click", function () {
  const sekarangDark = document.body.classList.contains("dark-mode");
  setTheme(!sekarangDark);
});

// Cek pilihan tema yang tersimpan sebelumnya
try {
  if (localStorage.getItem("theme") === "dark") {
    setTheme(true);
  }
} catch (e) {
  // abaikan
}

// ---------- 2. Tombol Like (tiap anggota punya hitungan sendiri) ----------
const likes = [0, 0, 0];
let currentMember = 0;

counterBtn.addEventListener("click", function () {
  likes[currentMember] += 1;
  counterText.textContent = likes[currentMember];
});

// ---------- 3. Ganti profil anggota ----------
function showMember(index) {
  const data = members[index];
  currentMember = index;

  userName.textContent = data.name;
  userRole.textContent = data.role;
  aboutText.textContent = data.about;
  avatar.src = data.photo;
  avatar.alt = "Foto profil " + data.name;
  counterText.textContent = likes[index];

  // Isi ulang daftar skill
  skillList.innerHTML = "";
  data.skills.forEach(function (skill) {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.appendChild(li);
  });

  // Tandai tombol anggota yang sedang aktif
  memberLinks.forEach(function (btn, i) {
    const aktif = i === index;
    btn.classList.toggle("active", aktif);
    btn.setAttribute("aria-pressed", aktif);
  });
}

memberLinks.forEach(function (btn) {
  btn.addEventListener("click", function () {
    showMember(Number(btn.dataset.member));
  });
});

// Tampilkan Anggota 1 saat halaman pertama dibuka
showMember(0);
