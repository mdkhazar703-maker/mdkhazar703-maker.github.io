// ── TYPING ANIMATION ──
const words = ["web.", "fun.", "the future.", "people.", "yourself."];
const el = document.getElementById("typed");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseTimer = null;

function type() {
  const current = words[wordIndex];

  if (!deleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      // Pause before deleting
      deleting = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 90);
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
      return;
    }
    setTimeout(type, 50);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 600);
});

// ── SMOOTH NAV ACTIVE STATE ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}`
          ? "var(--cyan)"
          : "";
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── FADE-IN ON SCROLL ──
const fadeEls = document.querySelectorAll(".card, .stat, .about-text p");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  fadeObserver.observe(el);
});