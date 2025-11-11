/* IMÁGENES LOCALES (asegúrate de tenerlas en /assets/images/) */
const images = [
    "assets/images/salvador1.jpg",
    "assets/images/salvador2.jpg",
    "assets/images/salvador3.jpg",
    "assets/images/salvador4.jpg"
];

let index = 0;
const img = document.getElementById("carousel-image");
const dotsContainer = document.getElementById("carousel-dots");

/* Render inicial */
function renderImage() {
    img.src = images[index];

    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add(i === index ? "active" : "");
        dot.addEventListener("click", () => {
            index = i;
            renderImage();
        });
        dotsContainer.appendChild(dot);
    });
}

document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    renderImage();
});

document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    renderImage();
});

renderImage();

/* COUNTDOWN */
function updateCountdown() {
    const target = new Date("March 13, 2026 00:00:00").getTime();
    const now = Date.now();
    const diff = target - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `Faltan ${d} días, ${h}h ${m}m ${s}s`;

    if (diff > 0) setTimeout(updateCountdown, 1000);
}

updateCountdown();
