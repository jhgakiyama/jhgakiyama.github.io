// CONFIG
const TARGET_ISO = '2026-03-13T00:00:00-03:00';

// Countdown
const TARGET = new Date(TARGET_ISO);

function tick(){
  let d = Math.max(0, Math.floor((TARGET - new Date()) / 1000));
  const ds = Math.floor(d / 86400); d -= ds * 86400;
  const hs = Math.floor(d / 3600); d -= hs * 3600;
  const ms = Math.floor(d / 60); const ss = d - ms * 60;

  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');

  if (elDays) elDays.textContent = String(ds).padStart(2,'0');
  if (elHours) elHours.textContent = String(hs).padStart(2,'0');
  if (elMinutes) elMinutes.textContent = String(ms).padStart(2,'0');
  if (elSeconds) elSeconds.textContent = String(ss).padStart(2,'0');
}

tick();
setInterval(tick,1000);

// Swiper init (unchanged)
const swiper = new Swiper('.mySwiper',{
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  speed: 700
});

// Accessibility: pause on hover/focus
const swiperEl = document.querySelector('.mySwiper');
if (swiperEl) {
  swiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
  swiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());
  swiperEl.addEventListener('focusin', () => swiper.autoplay.stop());
  swiperEl.addEventListener('focusout', () => swiper.autoplay.start());
}

// Image error fallback
document.querySelectorAll('.swiper-slide img').forEach((img, idx) => {
  img.addEventListener('error', () => {
    console.error(`Imagen ${idx+1} falló:`, img.src);
    const fallback = document.createElement('div');
    fallback.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#fff';
    fallback.textContent = 'Imagen no disponible';
    img.replaceWith(fallback);
  });
});
