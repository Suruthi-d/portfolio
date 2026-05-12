// =============================================
// SURUTHI D — MAJESTIC PORTFOLIO JS
// =============================================

// === CUSTOM STAR CURSOR + SPARKLE TRAIL ===
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
const canvas = document.getElementById('sparkle-canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = -200, mouseY = -200;
let trailX = 0, trailY = 0;
const particles = [];

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  // spawn sparkle
  if (Math.random() > 0.4) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5 - 1,
      size: Math.random() * 5 + 2,
      alpha: 1,
      hue: Math.random() > 0.5 ? '#E8845A' : '#D4AF70',
      shape: Math.random() > 0.5 ? 'star' : 'circle'
    });
  }
});

function drawStar(ctx, x, y, size, alpha, color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowBlur = 10;
  ctx.shadowColor = color;
  ctx.translate(x, y);
  ctx.rotate(Date.now() * 0.002);
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * 0.45;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04; // gravity
    p.alpha -= 0.028;
    p.size  -= 0.06;

    if (p.alpha <= 0 || p.size <= 0) { particles.splice(i, 1); continue; }

    if (p.shape === 'star') {
      drawStar(ctx, p.x, p.y, p.size, p.alpha, p.hue);
    } else {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.hue;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.hue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // trail dot follows cursor
  trailX += (mouseX - trailX) * 0.18;
  trailY += (mouseY - trailY) * 0.18;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';

  requestAnimationFrame(animateSparkles);
}
animateSparkles();

document.querySelectorAll('a, button, .live-card, .design-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    trail.style.width = '14px';
    trail.style.height = '14px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '28px';
    cursor.style.height = '28px';
    trail.style.width = '8px';
    trail.style.height = '8px';
  });
});

// === LOADER ===
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.6s ease';
    setTimeout(() => loader.style.display = 'none', 600);
  }, 2200);
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// === MOBILE HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0';
    spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => (s.style.cssText = ''));
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
  });
});

// === SCROLL FADE-IN ===
const animatedEls = document.querySelectorAll(
  '.live-card, .other-card, .design-item, .cert-card, .contact-card, .about-grid, .section-header, .tool-chip, .stat'
);

animatedEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80 * (i % 8));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => observer.observe(el));

// === ACTIVE NAV HIGHLIGHT ===
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// === PARALLAX HERO ===
const heroName = document.querySelector('.hero-name');
const heroOrbs = document.querySelectorAll('.orb');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroName) heroName.style.transform = `translateY(${y * 0.08}px)`;
  heroOrbs.forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (0.05 + i * 0.03)}px)`;
  });
});

// === MOUSE PARALLAX ON HERO ===
const heroSection = document.querySelector('.hero');
document.addEventListener('mousemove', e => {
  if (!heroSection) return;
  const rect = heroSection.getBoundingClientRect();
  if (rect.bottom < 0) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroOrbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform += ` translate(${x * factor}px, ${y * factor}px)`;
  });
});

// === COUNTER ANIMATION ===
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const dur = 1500;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * ease) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      const targets = [3, 50, 3];
      const suffixes = ['+', '+', ''];
      nums.forEach((n, i) => animateCounter(n, targets[i], suffixes[i]));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

console.log('%c Suruthi D — Portfolio', 'color: #E8845A; font-size: 20px; font-weight: bold;');
console.log('%c UI/UX Designer · Frontend Developer · Creative', 'color: #9B97A8;');
