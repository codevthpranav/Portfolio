document.documentElement.classList.add("js");

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const navLinks = [...document.querySelectorAll(".nav-link")];

function closeMenu() {
  primaryNav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = primaryNav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (
    primaryNav.classList.contains("is-open") &&
    !clickedInsideNav &&
    !clickedToggle
  ) {
    closeMenu();
  }
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("is-active", isCurrent);

          if (isCurrent) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.getElementById("currentYear").textContent = new Date().getFullYear();