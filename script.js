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
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

function renderChecklist() {
    const container = document.getElementById('app-content');
    container.innerHTML = tripData.map(section => `
        <div class="bg-white rounded-[2rem] shadow-sm border-l-4 ${section.color} overflow-hidden">
            <div class="p-5 bg-slate-50/50 cursor-pointer flex justify-between items-center" onclick="toggleSection('${section.id}')">
                <div class="flex items-center gap-4">
                    <span class="text-2xl">${section.icon}</span>
                    <div>
                        <h3 class="font-bold text-slate-800 text-sm tracking-tight">${section.title}</h3>
                        <span id="count-${section.id}" class="text-[10px] font-bold text-slate-400">0/0</span>
                    </div>
                </div>
                <svg id="chevron-${section.id}" class="chevron-icon w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            
            <div id="content-${section.id}" class="section-content">
                <div class="flex justify-end p-4 pb-0">
                    <button onclick="checkAll(event, '${section.id}')" class="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95">
                        Marcar Todo
                    </button>
                </div>
                <div class="p-2 space-y-1">
                    ${section.items.map((item, idx) => `
                        <label class="flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50/50 cursor-pointer transition-all">
                            <input type="checkbox" data-section="${section.id}" data-id="${section.id}-${idx}" onchange="updateState()" class="checkbox-custom">
                            <span class="text-sm text-slate-700 font-semibold">${item}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

window.toggleSection = (id) => {
    const content = document.getElementById(`content-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    
    // Cerramos los demás si queremos acordeón real (opcional)
    // Para esta versión, solo alternamos el actual
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        content.classList.remove('expanded');
        chevron.classList.remove('rotated');
    } else {
        content.classList.add('expanded');
        chevron.classList.add('rotated');
    }
};

window.checkAll = (event, sectionId) => {
    event.stopPropagation();
    const checks = document.querySelectorAll(`input[data-section="${sectionId}"]`);
    const allChecked = Array.from(checks).every(c => c.checked);
    checks.forEach(c => c.checked = !allChecked);
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
    
    const label = document.getElementById('perc-label');
    if (perc === 100) {
        label.classList.add('success-glow');
        if (!successCelebrated) { showSuccessModal(); successCelebrated = true; }
    } else {
        label.classList.remove('success-glow');
        successCelebrated = false;
    }
    
    tripData.forEach(s => {
        const sChecks = document.querySelectorAll(`input[data-section="${s.id}"]`);
        const sChecked = Array.from(sChecks).filter(c => c.checked).length;
        document.getElementById(`count-${s.id}`).innerText = `${sChecked}/${sChecks.length}`;
    });
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance < 0) return;

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}

window.showSuccessModal = () => document.getElementById('success-modal').classList.remove('hidden');
window.closeSuccessModal = () => document.getElementById('success-modal').classList.add('hidden');
window.showResetModal = () => document.getElementById('reset-modal').classList.remove('hidden');
window.closeResetModal = () => document.getElementById('reset-modal').classList.add('hidden');
window.confirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
    updateProgressDisplay();
    closeResetModal();
};