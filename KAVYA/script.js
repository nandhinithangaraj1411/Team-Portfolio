
document.addEventListener("DOMContentLoaded", () => {
  // Show the current year in the footer.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Reveal sections when they enter the screen.
  const revealElements = document.querySelectorAll(".reveal");
  const skillsPanel = document.querySelector(".skills-panel");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    if (skillsPanel) {
      observer.observe(skillsPanel);
    }
  } else {
    // Fallback for older browsers.
    revealElements.forEach((element) => element.classList.add("visible"));

    if (skillsPanel) {
      skillsPanel.classList.add("visible");
    }
  }

  // Highlight the navigation link for the current section.
  const navLinks = document.querySelectorAll(".navigation .nav-link");
  const sections = document.querySelectorAll(
    "#home, #projects, #skills, #education"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Add a small click response to project cards.
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointerenter", () => {
      card.style.setProperty("--hovered", "1");
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--hovered");
    });
  });
});
