const projectDetails = {
  cryptotrace: {
    accent: "blue",
    eyebrow: "Software and cybersecurity",
    title: "CryptoTrace India",
    description:
      "A team-built blockchain-forensics decision-support concept for authorized agencies working with crypto-fraud cases. My contribution has focused on the frontend and bringing investigation data into a clear dashboard experience.",
    details:
      "React dashboard; address search; risk-level and chain filters; transaction direction, counterparty, amount, timestamp and risk cues; graph-oriented investigation views. The wider architecture includes a REST API and PostgreSQL. Treat the dashboard as a prototype, not an operational law-enforcement system.",
    status: "Team project / prototype in development",
    tags: [
      "React",
      "JavaScript",
      "REST APIs",
      "PostgreSQL",
      "Blockchain analytics"
    ]
  },

  expense: {
    accent: "yellow",
    eyebrow: "Software",
    title: "Expense Tracker",
    description:
      "A practical expense-management project built to connect a C backend with a browser-based interface.",
    details:
      "Add, view, search, edit and delete expenses; filter by category or date; view summaries; export data to CSV. File handling and simple frontend/backend communication were key learning areas.",
    status: "Built as a learning / lab project",
    tags: [
      "C",
      "HTML",
      "CSS",
      "JavaScript",
      "File handling",
      "CSV"
    ]
  },

  genome: {
    accent: "pink",
    eyebrow: "Research and bioinformatics",
    title: "Genomic Analysis with Graph Neural Networks",
    description:
      "An early-stage exploration of how graph learning could represent relationships in genomic or biological data.",
    details:
      "Current work is centered on understanding the research question, identifying reliable datasets, deciding what entities and edges a graph should represent, and defining a meaningful baseline before choosing a GNN architecture. It is a research concept, not a completed model.",
    status: "Concept / dataset and methodology research",
    tags: [
      "Graph Neural Networks",
      "Bioinformatics",
      "Python",
      "Research"
    ]
  },

  antariksh: {
    accent: "violet",
    eyebrow: "Space and instrumentation",
    title: "Microgravity Biofilm Payload",
    description:
      "Payload planning connected to Team Antariksh and an ISRO PS4 microgravity experiment concept investigating quorum-sensing inhibition and biofilm formation.",
    details:
      "The measurement plan centers on electrochemical impedance spectroscopy (EIS), with optical density and fluorescence as complementary checks. Design considerations include multi-well scheduling, sensor timing, embedded control, data integrity, power, and constraints of a spaceflight payload.",
    status: "Team contribution / engineering and documentation work",
    tags: [
      "EIS",
      "Embedded systems",
      "Instrumentation",
      "Payload systems",
      "Data flow"
    ]
  },

  pcb: {
    accent: "teal",
    eyebrow: "Hardware",
    title: "LDR Night-Light PCB",
    description:
      "A KiCad training project for translating a simple light-sensing circuit into a physical PCB layout.",
    details:
      "Explored an LDR, MOSFET switching, LED output, component placement, trace widths, clearances, ground routing and single-layer board constraints. The focus was learning the design workflow and layout rules.",
    status: "Electronics / PCB learning project",
    tags: [
      "KiCad",
      "LDR",
      "MOSFET",
      "PCB layout",
      "Electronics"
    ]
  }
};

// Project filters
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const projectGrid = document.getElementById("projectGrid");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const show =
        filter === "all" || card.dataset.category === filter;

      card.hidden = !show;
    });

    // Let the visible cards share the row when the set is filtered
    projectGrid.classList.toggle("is-filtered", filter !== "all");
  });
});

// Project detail pop-ups
const dialog = document.getElementById("projectDialog");

document.querySelectorAll(".open-project").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.id];

    if (!project) return;

    dialog.dataset.accent = project.accent;

    document.getElementById("dialogEyebrow").textContent =
      project.eyebrow;

    document.getElementById("dialogTitle").textContent =
      project.title;

    document.getElementById("dialogDescription").textContent =
      project.description;

    document.getElementById("dialogDetails").textContent =
      project.details;

    document.getElementById("dialogStatus").textContent =
      project.status;

    const tags = document.getElementById("dialogTags");

    tags.replaceChildren(
      ...project.tags.map(tag => {
        const element = document.createElement("li");
        element.textContent = tag;
        return element;
      })
    );

    dialog.showModal();
  });
});

// Close project pop-up
document.getElementById("dialogClose").addEventListener("click", () => {
  dialog.close();
});

// Close when clicking the dimmed area outside the dialog box
dialog.addEventListener("click", event => {
  const box = dialog.getBoundingClientRect();
  const outside =
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom;

  if (outside) dialog.close();
});

// Light / dark theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeIcon.textContent = dark ? "☼" : "◐";
  themeMeta.setAttribute("content", dark ? "#121036" : "#efedf8");
}

// Follow the system preference on first load
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme(true);
}

themeToggle.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  showToast(dark ? "Night mode on" : "Day mode on");
});

// Toast notification
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Hero circles drift slightly with the pointer, like ink shifting on paper
const hero = document.getElementById("home");
const heroArt = document.getElementById("heroArt");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (hero && heroArt) {
  hero.addEventListener("pointermove", event => {
    if (reduceMotion.matches) return;

    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.style.setProperty("--mx", (x * 2).toFixed(3));
    heroArt.style.setProperty("--my", (y * 2).toFixed(3));
  });

  hero.addEventListener("pointerleave", () => {
    heroArt.style.setProperty("--mx", 0);
    heroArt.style.setProperty("--my", 0);
  });
}

// Email placeholder reminder
document.getElementById("emailLink").addEventListener("click", event => {
  if (event.currentTarget.href.includes("your.email@example.com")) {
    event.preventDefault();
    showToast("Replace your.email@example.com in index.html with your email.");
  }
});