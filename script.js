// Countdown (igual que antes)
const TARGET_ISO = '2026-03-13T00:00:00-03:00';
const targetDate = new Date(TARGET_ISO);
function updateCountdown(){
  const now = new Date();
  let diff = Math.floor((targetDate - now)/1000);
  if(diff<0) diff=0;
  const days = Math.floor(diff/86400); diff -= days*86400;
  const hours = Math.floor(diff/3600); diff -= hours*3600;
  const minutes = Math.floor(diff/60); const seconds = diff - minutes*60;
  document.getElementById('days').textContent=String(days).padStart(2,'0');
  document.getElementById('hours').textContent=String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent=String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent=String(seconds).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

// Swiper init
const swiper = new Swiper('.mySwiper',{
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  speed: 700
});

// Detectar fallos de carga en imágenes
document.querySelectorAll('.swiper-slide img').forEach((img, idx) => {
  img.addEventListener('error', (e) => {
    console.error(`Error cargando imagen #${idx+1}:`, img.src);
    // fallback visual: mostrar texto dentro del slide
    const fallback = document.createElement('div');
    fallback.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#fff';
    fallback.textContent = 'Imagen no disponible';
    img.replaceWith(fallback);
  });
});
