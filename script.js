
// ================================
// 1. MOBILE NAVIGATION
// ================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after a navigation link is selected.
navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});


// ================================
// 2. AUTOMATIC COPYRIGHT YEAR
// ================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ================================
// 3. REVEAL ELEMENTS ON SCROLL
// ================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    // Fallback for older browsers.
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// ================================
// 4. BACK TO TOP BUTTON
// ================================

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}, { passive: true });

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ================================
// 5. NAVBAR SCROLL EFFECT
// ================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        navbar.style.boxShadow =
            "0 4px 20px rgba(20, 30, 55, 0.05)";
    } else {
        navbar.style.boxShadow = "none";
    }
}, { passive: true });
