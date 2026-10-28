
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const toast = document.getElementById("toast");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after selecting a section
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Back-to-top button
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Rotating hero text
const words = ["code", "create", "explore", "innovate", "dream"];
const changingWord = document.getElementById("changingWord");
let wordIndex = 0;

setInterval(() => {
  changingWord.style.opacity = "0";

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    changingWord.textContent = words[wordIndex];
    changingWord.style.opacity = "1";
  }, 200);
}, 2200);

// Project buttons: demo interaction until real links are added
let toastTimeout;

document.querySelectorAll(".project-link").forEach(button => {
  button.addEventListener("click", () => {
    const projectName = button.dataset.project;

    toast.textContent =
      `🐚 ${projectName} is a project concept! Add your GitHub or live demo link here.`;

    toast.classList.add("show");
    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });
});

// Generate floating ocean bubbles
const bubbleContainer = document.getElementById("bubbles");

for (let i = 0; i < 22; i++) {
  const bubble = document.createElement("span");
  const size = Math.random() * 24 + 8;

  bubble.className = "bubble";
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 12 + 9}s`;
  bubble.style.animationDelay = `${Math.random() * -20}s`;

  bubbleContainer.appendChild(bubble);
}

console.log("🌊 Welcome to OceanDev!");
console.log("🐬 Keep swimming, keep coding.");
