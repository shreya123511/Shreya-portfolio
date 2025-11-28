document.getElementById('year').textContent = new Date().getFullYear();
const clickSound = document.getElementById('click-sound');
const workButton = document.getElementById('work-button');
if (clickSound && workButton) {
  workButton.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  });
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

const typedText = document.querySelector(".hero-text p");
const text = "A Computer Science student creating clean and functional websites.";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typedText.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50); 
  }
}
typedText.textContent = ""; 
typeWriter();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".about, .projects, .contact").forEach(el => observer.observe(el));
