
// ==========================================
// BUGBUN.EXE — BUNNY PORTFOLIO INTERACTIONS
// ==========================================

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatic copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Navbar shadow and back-to-top button
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Cute project pop-ups
const toast = document.getElementById("toast");
let toastTimeout;

const projectMessages = {
  "BunOS": "🐰 BunOS says: welcome to the fluffiest operating system!",
  "Queue the Chaos": "🧠 Queue the Chaos: first in, first out... usually.",
  "VibeCheck.exe": "🎀 VibeCheck.exe: current vibe = adorable chaos.",
  "Touch Grass Tracker": "🌱 Your virtual plant believes in you!",
  "Pass the Vibe": "🔐 Password tip: use long, unique passwords, bun!",
  "Packet Panic!": "📡 Packet Panic! All packets, please form an orderly queue."
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

document.querySelectorAll(".project-link").forEach((button) => {
  button.addEventListener("click", () => {
    const projectName = button.dataset.project;
    showToast(
      projectMessages[projectName] ||
      "🐇 This little project is still hopping along!"
    );
  });
});

// Bunny says hi when the logo is clicked
document.querySelector(".logo").addEventListener("click", (event) => {
  if (window.location.hash === "#home" || window.scrollY < 10) {
    event.preventDefault();
    showToast("૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა hiiii!! welcome back, bun!");
  }
});

// Contact email reminder
document.getElementById("email-link").addEventListener("click", () => {
  showToast("💌 Don't forget to replace hello@example.com with your email!");
});

// Reveal a tiny welcome message on page load
window.addEventListener("load", () => {
  console.log("🐰 Welcome to bugbun.exe!");
  console.log("🥕 Status: compiling cuteness...");
  console.log("✨ Developer mode: activated.");
});