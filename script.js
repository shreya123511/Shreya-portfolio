document.getElementById('year').textContent = new Date().getFullYear();
const typingText = document.querySelector(".hero-text p");
const phrases = ["A Computer science student" , "Creating clean and functional Website" ];
let phraseIndex = 0;
let charIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function typeEffect() {
  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex];

  if (!isDeleting && charIndex <= currentPhrase.length) {
    typingText.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex >= 0) {
    typingText.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
    setTimeout(typeEffect, 80);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      phraseIndex++;
      setTimeout(typeEffect, 200);
    }
  }
}
typeEffect();

const menuButton = document.getElementById('menu-button');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
  navLinks.classList.toggle('open');
  const isExpanded = navLinks.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isExpanded);
  menuButton.innerHTML = isExpanded ? '✖' : '☰';
}

if (menuButton) {
  menuButton.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });
}

const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".about, .skills, .projects, .contact")
  .forEach(section => observer.observe(section));

const contactForm = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

if (contactForm && messageDiv) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const msgInput = document.getElementById('message').value.trim();

    if (!nameInput || !emailInput || !msgInput) {
      messageDiv.textContent = 'Please fill out all required fields.';
      messageDiv.style.color = 'red';
    } else {
      messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.';
      messageDiv.style.color = 'green';
      contactForm.reset();
    }
  });
}


const clickSound = document.getElementById('click-sound');
const workButton = document.getElementById('work-button');

if (clickSound && workButton) {
  workButton.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  });
}

document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});
