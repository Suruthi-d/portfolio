// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === MOBILE HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0';
    spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => (s.style.cssText = ''));
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
  });
});

// === SCROLL FADE-IN ANIMATIONS ===
const animatedEls = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .about-grid, .contact-grid, .section-title, .section-label'
);

animatedEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * i);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedEls.forEach(el => observer.observe(el));

// === ACTIVE NAV HIGHLIGHT ===
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAs.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#C2703E';
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// === SMOOTH PARALLAX HERO TEXT ===
const heroName = document.querySelector('.hero-name');
window.addEventListener('scroll', () => {
  if (!heroName) return;
  const y = window.scrollY;
  heroName.style.transform = `translateY(${y * 0.12}px)`;
});

// === PHOTO SLOT — drag & drop your photo ===
const photoFrame = document.querySelector('.photo-frame');
const photoPlaceholder = document.querySelector('.photo-placeholder');

if (photoFrame) {
  photoFrame.addEventListener('dragover', e => {
    e.preventDefault();
    photoFrame.style.borderColor = '#C2703E';
    photoFrame.style.background  = '#F5E6DA';
  });

  photoFrame.addEventListener('dragleave', () => {
    photoFrame.style.borderColor = '';
    photoFrame.style.background  = '';
  });

  photoFrame.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => {
        photoFrame.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;" alt="Suruthi D" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Click to upload
  photoFrame.style.cursor = 'pointer';
  photoFrame.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => {
          photoFrame.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;" alt="Suruthi D" />`;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}

console.log('%c Suruthi D — Portfolio', 'color: #C2703E; font-size: 18px; font-weight: bold;');
console.log('%c Built with HTML, CSS & JS — GitHub Pages ready!', 'color: #5C5C58;');
