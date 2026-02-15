/**
 * Salvador 2026 - Lógica SPA
 */

const TARGET_DATE = new Date("March 1, 2026 00:00:00").getTime();
const STORAGE_KEY = 'salvador_2026_checklist_state';
let successCelebrated = false;

const tripData = [
    { id: 'ad', title: "Maleta Adultos", icon: "👜", color: "border-l-indigo-500", items: ["3 Trajes de baño p/u", "7 Remeras/Musculosas", "3 Shorts/Bermudas", "2 Outfits noche", "Ropa interior (15 d)", "Pijama liviano", "Ojotas/Calzado", "Gafas y Sombreros"] },
    { id: 'ni', title: "Maleta Niña", icon: "🧸", color: "border-l-pink-500", items: ["12 Cambios ropa", "3 Remeras UV", "3 Mallas infantiles", "Sandalias/Crocs", "Pañales (inicio)", "Neceser familiar", "Protector solar 50+", "Repelente insectos", "Toallas microfibra"] },
    { id: 'ma', title: "Mano (Carry On)", icon: "✈️", color: "border-l-emerald-500", items: ["Muda ropa extra x3", "Pasaportes/DNI", "Seguros/Reservas", "Cargadores/Powerbank", "Tablet niña", "Abrigo liviano"] },
    { id: 'mt', title: "Equipo Mate", icon: "🧉", color: "border-l-orange-500", items: ["Termo (vacío)", "Mate y bombilla", "Yerba (sellada)", "Azúcar/Edulcorante"] },
    { id: 'bt', title: "Botiquín Niña", icon: "🏥", color: "border-l-red-500", items: ["Termómetro", "Ibuprofeno/Paracet.", "Antihistamínico", "Sales rehidratación", "Curitas/Gasas", "Post-solar/Aloe"] }
];

document.addEventListener('DOMContentLoaded', () => {
    renderChecklist();
    loadProgress();
    startCountdown();
    setInterval(startCountdown, 1000);
});

function startCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    const ids = ["days", "hours", "minutes", "seconds"];
    
    if (distance < 0) {
        ids.forEach(id => document.getElementById(id).innerText = "00");
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}

function renderChecklist() {
    const container = document.getElementById('app-content');
    container.innerHTML = tripData.map(section => `
        <div id="card-${section.id}" class="bg-white rounded-[2rem] shadow-sm border-l-4 ${section.color} overflow-hidden">
            <div class="p-5 bg-slate-50/50 cursor-pointer flex justify-between items-center" onclick="toggleSection('${section.id}')">
                <div class="flex items-center gap-4">
                    <span class="text-2xl">${section.icon}</span>
                    <div>
                        <h3 class="font-bold text-slate-800 text-sm tracking-tight">${section.title}</h3>
                        <span id="count-${section.id}" class="text-[10px] font-bold text-slate-400">0/0</span>
                    </div>
                </div>
                <svg class="chevron-icon w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            
            <div id="content-${section.id}" class="section-content collapsed px-2 pb-2">
                <div class="flex justify-end pt-2 pr-2">
                    <button onclick="checkAllInSection(event, '${section.id}')" class="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all">
                        Marcar Todo
                    </button>
                </div>
                <div class="space-y-1">
                    ${section.items.map((item, idx) => `
                        <label class="flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50/50 cursor-pointer transition-all">
                            <input type="checkbox" data-section="${section.id}" data-id="${section.id}-${idx}" onchange="updateState()" class="checkbox-custom">
                            <span class="text-sm text-slate-700 font-semibold tracking-tight">${item}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

window.toggleSection = (id) => {
    const content = document.getElementById(`content-${id}`);
    const card = document.getElementById(`card-${id}`);
    content.classList.toggle('collapsed');
    card.classList.toggle('collapsed-icon');
};

window.checkAllInSection = (event, sectionId) => {
    event.stopPropagation(); // Evita que el acordeón se cierre
    const checkboxes = document.querySelectorAll(`input[data-section="${sectionId}"]`);
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    checkboxes.forEach(c => c.checked = !allChecked);
    updateState();
};

function updateState() {
    const checks = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(c => ({
        id: c.getAttribute('data-id'),
        checked: c.checked
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
    updateProgressDisplay();
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return updateProgressDisplay();
    JSON.parse(saved).forEach(item => {
        const el = document.querySelector(`input[data-id="${item.id}"]`);
        if (el) el.checked = item.checked;
    });
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const checks = document.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checks).filter(c => c.checked).length;
    const perc = checks.length > 0 ? Math.round((checked / checks.length) * 100) : 0;
    
    document.getElementById('global-bar').style.width = perc + '%';
    document.getElementById('global-perc').innerText = perc + '%';
    
    // Efecto 100% y estilos de la etiqueta de porcentaje
    const percLabel = document.getElementById('perc-label');
    if (perc === 100) {
        percLabel.classList.add('text-yellow-400', 'scale-110');
        if (!successCelebrated) {
            showSuccessModal();
            successCelebrated = true;
        }
    } else {
        percLabel.classList.remove('text-yellow-400', 'scale-110');
        successCelebrated = false;
    }
    
    tripData.forEach(s => {
        const sChecks = document.querySelectorAll(`input[data-section="${s.id}"]`);
        const sChecked = Array.from(sChecks).filter(c => c.checked).length;
        document.getElementById(`count-${s.id}`).innerText = `${sChecked}/${sChecks.length}`;
    });
}

function showSuccessModal() {
    document.getElementById('success-modal').classList.remove('hidden');
}

window.closeSuccessModal = () => {
    document.getElementById('success-modal').classList.add('hidden');
};

window.showResetModal = () => document.getElementById('reset-modal').classList.remove('hidden');
window.closeResetModal = () => document.getElementById('reset-modal').classList.add('hidden');
window.confirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
    updateProgressDisplay();
    closeResetModal();
};