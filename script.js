// CONFIG
const TARGET_ISO = '2026-03-13T00:00:00-03:00';
const TARGET = new Date(TARGET_ISO);

// Contador
function updateCountdown(){
  const now = new Date();
  let diff = Math.max(0, Math.floor((TARGET - now) / 1000));

  const days = Math.floor(diff / 86400); diff -= days * 86400;
  const hours = Math.floor(diff / 3600); diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - (minutes * 60);

  document.getElementById('days').textContent   = String(days).padStart(2,'0');
  document.getElementById('hours').textContent  = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent= String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent= String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// Swiper init
const swiper = new Swiper('.mySwiper',{
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  speed: 700
});

// Modo claro/oscuro toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const htmlEl = document.documentElement;
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', next);
  toggleBtn.innerHTML = next === 'dark'
  ? '<span class="material-icons">dark_mode</span>'
  : '<span class="material-icons">light_mode</span>';

  localStorage.setItem('theme', next);
});
// Persistir preferencia
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
  toggleBtn.innerHTML = saved === 'dark'
    ? '<span class="material-icons">dark_mode</span>'
    : '<span class="material-icons">light_mode</span>';
}
