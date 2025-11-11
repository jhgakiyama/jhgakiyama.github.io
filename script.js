// Fecha objetivo
const TARGET_ISO = '2026-03-13T00:00:00-03:00';
const targetDate = new Date(TARGET_ISO);

function updateCountdown() {
  const now = new Date();
  let diff = Math.floor((targetDate - now) / 1000);
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (3600 * 24));
  diff -= days * 3600 * 24;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  effect: 'slide',
  speed: 700,
});

const swiperEl = document.querySelector('.mySwiper');
swiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
swiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());
