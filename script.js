/* ============ PRELOADER ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
  }, 1200);
});

/* ============ CURSOR GLOW ============ */
const glow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateGlow(){
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(){ this.reset(); }
  reset(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.35 + 0.08;
    this.color = Math.random() > 0.75 ? '227,30,36' : '220,220,225';
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}
for (let i = 0; i < 70; i++) particles.push(new Particle());

function animateParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].draw();
    for (let j = i + 1; j < particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120){
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(180,180,190,${0.06 * (1 - d / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============ NAVBAR ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ============ BURGER ============ */
document.getElementById('burger').onclick = () => {
  document.querySelector('.navbar nav').classList.toggle('open');
};
document.querySelectorAll('.navbar nav a').forEach(a => {
  a.onclick = () => document.querySelector('.navbar nav').classList.remove('open');
});

/* ============ SCROLL REVEAL ============ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => observer.observe(el));
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 1300);

/* ============ TYPEWRITER ============ */
const typeText = 'Скорость. Качество. Доверие.';
const typeEl = document.getElementById('typewriter');
let typeIdx = 0;
function typeWriter(){
  if (typeIdx < typeText.length){
    typeEl.textContent += typeText.charAt(typeIdx);
    typeIdx++;
    setTimeout(typeWriter, 80);
  }
}
setTimeout(typeWriter, 1400);

/* ============ COUNTERS ============ */
function animateCounter(el){
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();
  function step(now){
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(target * ease);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ============ 3D TILT ============ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = (y - cy) / 20;
    const rotY = (cx - x) / 20;
    card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============ FAQ ============ */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').onclick = () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isActive){
      item.classList.add('active');
      const ans = item.querySelector('.faq-answer');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  };
});

/* ============ CONTACT FORM ============ */
document.getElementById('contactForm').onsubmit = e => {
  e.preventDefault();
  document.getElementById('formSuccess').classList.add('show');
  e.target.reset();
  setTimeout(() => {
    document.getElementById('formSuccess').classList.remove('show');
  }, 4000);
};

/* ============ PARALLAX BG ============ */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.body.style.backgroundPosition = `center ${-y * 0.15}px`;
});

/* ============ RIPPLE ============ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background: rgba(255,255,255,.4);
      width:0; height:0; left:${e.clientX - rect.left}px; top:${e.clientY - rect.top}px;
      transform:translate(-50%,-50%); pointer-events:none;
      animation: rippleAnim .6s ease-out forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
const style = document.createElement('style');
style.textContent = `@keyframes rippleAnim { to { width: 300px; height: 300px; opacity: 0; } }`;
document.head.appendChild(style);

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});