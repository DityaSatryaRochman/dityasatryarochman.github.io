/* ═══════════════════════════════════════════
   Ditya Satrya Rochman — Personal Branding
   script.js
   ═══════════════════════════════════════════ */

/* ── AOS Init ── */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

/* ════════════════════════════════════
   NAVBAR — Scroll & Active Link
════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
  toggleBackToTop();
  animateSkillBars();
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* Hamburger */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ════════════════════════════════════
   TYPEWRITER EFFECT
════════════════════════════════════ */
const typeEl = document.getElementById('typewriter');
const phrases = [
  'Student of Networking',
  'Cisco Packet Tracer Enthusiast',
  'Future IT Professional',
  'Teknik Jaringan Komputer',
  'Pelajar SMKN 13 Bandung',
];

let pIdx = 0, cIdx = 0, deleting = false;

function typeWriter() {
  const current = phrases[pIdx];

  if (!deleting) {
    typeEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      setTimeout(() => { deleting = true; }, 2200);
      setTimeout(typeWriter, 2300);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, deleting ? 45 : 80);
}
setTimeout(typeWriter, 1200);

/* Animate underline on hero name */
setTimeout(() => {
  const highlight = document.querySelector('.name-highlight');
  if (highlight) highlight.classList.add('animate');
}, 1800);

/* ════════════════════════════════════
   HERO CANVAS — Particle Network
════════════════════════════════════ */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animId;

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      r:   Math.random() * 1.5 + 0.5,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
    ctx.fill();

    // Lines to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q   = particles[j];
      const dx  = p.x - q.x;
      const dy  = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  });

  animId = requestAnimationFrame(drawParticles);
}

function initCanvas() {
  resizeCanvas();
  createParticles();
  cancelAnimationFrame(animId);
  drawParticles();
}

window.addEventListener('resize', initCanvas);
initCanvas();

/* ════════════════════════════════════
   PORTFOLIO FILTER
════════════════════════════════════ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.style.transition = 'opacity 0.3s, transform 0.3s';

      if (show) {
        card.classList.remove('hidden');
        card.style.opacity   = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

/* ════════════════════════════════════
   SKILL BARS — Animate on visible
════════════════════════════════════ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    const bars = document.querySelectorAll('.skill-fill');
    bars.forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    skillsAnimated = true;
  }
}

/* ════════════════════════════════════
   CONTACT FORM
════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Mengirim...';

  // Simulasi pengiriman (ganti dengan EmailJS / Formspree jika perlu)
  setTimeout(() => {
    btn.innerHTML = '<i class="bx bx-send"></i> Kirim Pesan';
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

/* ════════════════════════════════════
   BACK TO TOP
════════════════════════════════════ */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ════════════════════════════════════
   FOOTER — Tahun Otomatis
════════════════════════════════════ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ════════════════════════════════════
   SMOOTH SCROLL for Anchor Links
════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ════════════════════════════════════
   INFO CARDS — Hover tilt effect
════════════════════════════════════ */
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const tiltX  = ((y - cy) / cy) * 4;
    const tiltY  = ((x - cx) / cx) * -4;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

/* ════════════════════════════════════
   CONSOLE SIGNATURE
════════════════════════════════════ */
console.log('%c👋 Ditya Satrya Rochman', 'font-size:20px; font-weight:bold; color:#0ea5e9;');
console.log('%cFuture IT Professional | SMKN 13 Bandung', 'color:#94a3b8;');
console.log('%c📂 github.com/ditya', 'color:#6366f1;');
