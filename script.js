/* ═══════════════════════════════════════════════
   ARABIC WEDDING INVITATION — SCRIPT.JS
   Particles · Countdown · Scroll Reveal · RSVP
═══════════════════════════════════════════════ */

// ─── WEDDING DATE (change this) ───
const WEDDING_DATE = new Date('2026-05-15T19:00:00');

// ─── ARABIC NUMERAL CONVERSION ───
function toArabicNumerals(n) {
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return String(n).padStart(2, '0').replace(/\d/g, d => arabicDigits[+d]);
}

// ═══════════════════════════════════════════════
// 1. FLOATING LIGHT PARTICLES
// ═══════════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size  = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha  = 0;
      this.maxAlpha = Math.random() * 0.55 + 0.15;
      this.life   = 0;
      this.maxLife = Math.random() * 300 + 200;
      // gold or white tint
      const roll = Math.random();
      if (roll < 0.5)      this.color = `rgba(201,168,76,`;   // gold
      else if (roll < 0.8) this.color = `rgba(248,244,236,`;  // cream
      else                 this.color = `rgba(255,255,255,`;   // white
    }
    update() {
      this.x    += this.speedX;
      this.y    += this.speedY;
      this.life += 1;
      const progress = this.life / this.maxLife;
      if (progress < 0.2)      this.alpha = (progress / 0.2) * this.maxAlpha;
      else if (progress > 0.7) this.alpha = ((1 - progress) / 0.3) * this.maxAlpha;
      else                     this.alpha = this.maxAlpha;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      // Draw a tiny 4-pointed star
      const s = this.size;
      ctx.translate(this.x, this.y);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.shadowColor = this.color.replace('rgba', 'rgb').replace(',', '').replace(/,\d+\)/, ')');
      ctx.shadowBlur = s * 4;
      // Star shape
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-s * 0.25, -s * 1.5, s * 0.5, s * 3);
      }
      ctx.restore();
    }
  }

  function initParticlePool() {
    particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 14));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  resize();
  initParticlePool();
  loop();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    initParticlePool();
    loop();
  });
})();

// ═══════════════════════════════════════════════
// 2. SCROLL REVEAL
// ═══════════════════════════════════════════════
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-child');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ═══════════════════════════════════════════════
// 3. COUNTDOWN TIMER
// ═══════════════════════════════════════════════
(function initCountdown() {
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');
  if (!daysEl) return;

  let prevValues = { d: -1, h: -1, m: -1, s: -1 };

  function animateFlip(el) {
    el.classList.remove('flip');
    void el.offsetWidth; // reflow
    el.classList.add('flip');
  }

  function update() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '٠٠';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (d !== prevValues.d) { daysEl.textContent  = toArabicNumerals(d); animateFlip(daysEl);  prevValues.d = d; }
    if (h !== prevValues.h) { hoursEl.textContent = toArabicNumerals(h); animateFlip(hoursEl); prevValues.h = h; }
    if (m !== prevValues.m) { minsEl.textContent  = toArabicNumerals(m); animateFlip(minsEl);  prevValues.m = m; }
    if (s !== prevValues.s) { secsEl.textContent  = toArabicNumerals(s); animateFlip(secsEl);  prevValues.s = s; }
  }

  update();
  setInterval(update, 1000);
})();

// ═══════════════════════════════════════════════
// 4. MUSIC PLAYER
// ═══════════════════════════════════════════════
(function initMusic() {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      btn.querySelector('.music-label').textContent = 'موسيقى';
    } else {
      audio.play().catch(() => {});
      btn.classList.add('playing');
      btn.querySelector('.music-label').textContent = 'إيقاف';
    }
    playing = !playing;
  });
})();

// ═══════════════════════════════════════════════
// 5. ATTENDANCE SELECTION
// ═══════════════════════════════════════════════
document.querySelectorAll('.attendance-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.attendance-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    opt.querySelector('input').checked = true;
  });
});

// ═══════════════════════════════════════════════
// 6. RSVP FORM SUBMISSION
// ═══════════════════════════════════════════════
async function submitRSVP() {
  const name       = document.getElementById('rsvp-name').value.trim();
  const guestCount = document.getElementById('rsvp-guests').value.trim();
  const message    = document.getElementById('rsvp-msg').value.trim();
  const attendanceEl = document.querySelector('.attendance-opt.selected input');

  const btnText   = document.getElementById('rsvp-btn-text');
  const loader    = document.getElementById('rsvpLoader');
  const successEl = document.getElementById('rsvpSuccess');
  const errorEl   = document.getElementById('rsvpError');
  const btn       = document.getElementById('rsvpBtn');

  // — Validation —
  if (!name) { showFormError('يرجى إدخال اسمك الكريم'); return; }
  if (!attendanceEl) { showFormError('يرجى اختيار خيار الحضور'); return; }
  const attendance = attendanceEl.value;

  // — Loading state —
  hideAll();
  btnText.textContent = 'جارٍ الإرسال...';
  loader.classList.remove('hidden');
  btn.disabled = true;

  try {
    const res = await fetch('https://rsvp-xedary.vercel.app/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        attendance,
        guests: guestCount || '1',
        message,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // — Success —
    loader.classList.add('hidden');
    btnText.textContent = 'تم الإرسال ✓';
    btn.style.background = 'linear-gradient(135deg, #3d7055, #2d5040)';
    btn.style.color = '#e8d5a3';
    successEl.classList.remove('hidden');

    // Reset after 8s
    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'إرسال التأكيد';
      btn.style.background = '';
      btn.style.color = '';
    }, 8000);

  } catch (err) {
    console.error('RSVP Error:', err);
    loader.classList.add('hidden');
    btnText.textContent = 'إرسال التأكيد';
    btn.disabled = false;
    errorEl.classList.remove('hidden');
  }

  function hideAll() {
    successEl.classList.add('hidden');
    errorEl.classList.add('hidden');
  }
}

function showFormError(msg) {
  const errorEl = document.getElementById('rsvpError');
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
  setTimeout(() => errorEl.classList.add('hidden'), 3500);
}

// ═══════════════════════════════════════════════
// 7. NOOR GLOW ON HERO MOUSE MOVE (desktop)
// ═══════════════════════════════════════════════
(function initNoorGlow() {
  const hero = document.querySelector('.hero');
  if (!hero || window.innerWidth < 768) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--glow-x', `${x}%`);
    hero.style.setProperty('--glow-y', `${y}%`);
  });
})();

// ═══════════════════════════════════════════════
// 8. GALLERY LIGHTBOX (simple)
// ═══════════════════════════════════════════════
(function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        background:rgba(20,40,30,0.96);
        display:flex;align-items:center;justify-content:center;
        cursor:zoom-out;animation:fade-in-up 0.3s ease;
        padding:20px;
      `;
      const lightImg = document.createElement('img');
      lightImg.src = img.src;
      lightImg.style.cssText = `
        max-width:90vw;max-height:90vh;
        border-radius:18px;
        border:1px solid rgba(201,168,76,0.3);
        box-shadow:0 0 60px rgba(201,168,76,0.2);
        animation:fade-in-up 0.3s ease;
      `;
      overlay.appendChild(lightImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
})();
