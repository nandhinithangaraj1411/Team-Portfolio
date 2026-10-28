
/* ======================================
   BUTTERFLYDEV — INTERACTIVE MAGIC
   ====================================== */

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatic footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Navbar shadow and back-to-top button
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("back-to-top");

function updateScrollUI() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("visible", window.scrollY > 350);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Project interaction messages
const toast = document.getElementById("toast");
let toastTimer;

const projectMessages = {
  "BloomBoard":
    "🌷 BloomBoard: tiny tasks, big dreams! This concept is ready to grow.",
  "AlgoGarden":
    "🧩 AlgoGarden: watch those algorithms bloom, one step at a time!",
  "Packet Petals":
    "📡 Packet Petals: all packets need a little room to flow.",
  "BugBounty Journal":
    "🐛 BugBounty Journal: every bug caught is a tiny victory!",
  "Secret Garden":
    "🔐 Secret Garden: strong passwords help keep your digital garden safe.",
  "Campus Connect":
    "🎓 Campus Connect: good ideas grow better together!"
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3300);
}

document.querySelectorAll(".project-link").forEach((button) => {
  button.addEventListener("click", () => {
    const projectName = button.dataset.project;

    showToast(
      projectMessages[projectName] ||
      "🦋 A little idea is getting ready to fly!"
    );
  });
});

// Friendly console message for developer tools
console.log("🦋 Welcome to ButterflyDev!");
console.log("🌷 Growing ideas, one line of code at a time.");
console.log("✨ All systems are fluttering nicely.");

// Email reminder when the contact link is clicked
document.getElementById("email-link").addEventListener("click", () => {
  showToast("💌 Replace the example email with your real email address!");
});
