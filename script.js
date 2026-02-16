/**
 * Salvador 2026 - Dynamic Checklist Logic (Fixed Accordion)
 */

const TARGET_DATE = new Date("March 1, 2026 00:00:00").getTime();
const STORAGE_KEY = 'salvador_2026_dynamic_data';
let successCelebrated = false;

const defaultData = [
    { id: 'ad', title: "Maleta Adultos", icon: "👜", color: "border-l-indigo-500", items: ["3 Trajes de baño p/u", "7 Remeras/Musculosas", "3 Shorts/Bermudas", "2 Outfits noche", "Ropa interior (15 d)", "Pijama liviano", "Ojotas/Calzado", "Gafas y Sombreros"].map(name => ({ name, checked: false })) },
    { id: 'ni', title: "Maleta Niña", icon: "🧸", color: "border-l-pink-500", items: ["12 Cambios ropa", "3 Remeras UV", "3 Mallas infantiles", "Sandalias/Crocs", "Pañales (inicio)", "Neceser familiar", "Protector solar 50+", "Repelente insectos", "Toallas microfibra"].map(name => ({ name, checked: false })) },
    { id: 'ma', title: "Mano (Carry On)", icon: "✈️", color: "border-l-emerald-500", items: ["Muda ropa extra x3", "Pasaportes/DNI", "Seguros/Reservas", "Cargadores/Powerbank", "Tablet niña", "Abrigo liviano"].map(name => ({ name, checked: false })) },
    { id: 'mt', title: "Equipo Mate", icon: "🧉", color: "border-l-orange-500", items: ["Termo (vacío)", "Mate y bombilla", "Yerba (sellada)", "Azúcar/Edulcorante"].map(name => ({ name, checked: false })) },
    { id: 'bt', title: "Botiquín Niña", icon: "🏥", color: "border-l-red-500", items: ["Termómetro", "Ibuprofeno/Paracet.", "Antihistamínico", "Sales rehidratación", "Curitas/Gasas", "Post-solar/Aloe"].map(name => ({ name, checked: false })) }
];

let appState = [];

function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    appState = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultData));
    
    renderAll();
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function renderAll() {
    const container = document.getElementById('app-content');
    if (!container) return;

    // Guardamos qué acordeones estaban abiertos antes de re-renderizar
    const openSections = Array.from(document.querySelectorAll('.accordion-content.is-open')).map(el => el.id.replace('content-', ''));

    container.innerHTML = appState.map(section => `
        <div class="bg-white rounded-[2rem] shadow-sm border-l-4 ${section.color} overflow-hidden border border-slate-100 mb-4">
            <div class="p-5 bg-white cursor-pointer flex justify-between items-center active:bg-slate-50 transition-colors" onclick="handleToggle('${section.id}')">
                <div class="flex items-center gap-4">
                    <span class="text-2xl">${section.icon}</span>
                    <div>
                        <h3 class="font-extrabold text-slate-800 text-sm tracking-tight">${section.title}</h3>
                        <span id="count-${section.id}" class="text-[10px] font-black text-slate-300">
                            ${section.items.filter(i => i.checked).length}/${section.items.length}
                        </span>
                    </div>
                </div>
                <svg id="chevron-${section.id}" class="chevron-icon w-5 h-5 text-slate-300 ${openSections.includes(section.id) ? 'chevron-rotated' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            
            <div id="content-${section.id}" class="accordion-content ${openSections.includes(section.id) ? 'is-open' : ''}" 
                 style="max-height: ${openSections.includes(section.id) ? 'none' : '0px'}">
                <div class="p-4 pt-0">
                    <div class="flex justify-between items-center mb-2 px-1">
                        <button onclick="addItem(event, '${section.id}')" class="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl active:scale-95">
                            + Añadir
                        </button>
                        <button onclick="checkAll(event, '${section.id}')" class="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl active:scale-95">
                            Marcar Todo
                        </button>
                    </div>
                    <div class="space-y-1">
                        ${section.items.map((item, idx) => `
                            <label class="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent group">
                                <div class="flex items-center space-x-3 flex-1 overflow-hidden" onclick="toggleItem('${section.id}', ${idx})">
                                    <input type="checkbox" ${item.checked ? 'checked' : ''} class="checkbox-custom pointer-events-none">
                                    <span class="item-text text-sm text-slate-600 font-semibold tracking-tight truncate pr-2">${item.name}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button onclick="editItem(event, '${section.id}', ${idx})" class="delete-btn p-2 text-slate-300 hover:text-blue-500 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </button>
                                    <button onclick="deleteItem(event, '${section.id}', ${idx})" class="delete-btn p-2 text-slate-300 hover:text-red-500 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Ajustamos la altura de los que deben estar abiertos tras el render
    openSections.forEach(id => {
        const content = document.getElementById(`content-${id}`);
        if (content) content.style.maxHeight = content.scrollHeight + "px";
    });

    updateProgressDisplay();
}

window.handleToggle = (id) => {
    const content = document.getElementById(`content-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    
    // Si no tiene maxHeight definido inline, lo inicializamos basado en la clase
    if (!content.style.maxHeight || content.style.maxHeight === '0px') {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('is-open');
        chevron.classList.add('chevron-rotated');
    } else {
        content.style.maxHeight = '0px';
        content.classList.remove('is-open');
        chevron.classList.remove('chevron-rotated');
    }
};

window.addItem = (event, sectionId) => {
    event.stopPropagation();
    const name = prompt("¿Qué quieres agregar?");
    if (name && name.trim()) {
        const section = appState.find(s => s.id === sectionId);
        section.items.push({ name: name.trim(), checked: false });
        saveAndRefresh();
    }
};

window.toggleItem = (sectionId, index) => {
    const section = appState.find(s => s.id === sectionId);
    section.items[index].checked = !section.items[index].checked;
    saveAndRefresh();
};

window.editItem = (event, sectionId, index) => {
    event.stopPropagation();
    const section = appState.find(s => s.id === sectionId);
    const newName = prompt("Editar ítem:", section.items[index].name);
    if (newName && newName.trim()) {
        section.items[index].name = newName.trim();
        saveAndRefresh();
    }
};

window.deleteItem = (event, sectionId, index) => {
    event.stopPropagation();
    const section = appState.find(s => s.id === sectionId);
    section.items.splice(index, 1);
    saveAndRefresh();
};

window.checkAll = (event, sectionId) => {
    event.stopPropagation();
    const section = appState.find(s => s.id === sectionId);
    const allChecked = section.items.every(i => i.checked);
    section.items.forEach(i => i.checked = !allChecked);
    saveAndRefresh();
};

function saveAndRefresh() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    renderAll();
}

function updateProgressDisplay() {
    const allItems = appState.flatMap(s => s.items);
    const checkedCount = allItems.filter(i => i.checked).length;
    const total = allItems.length;
    const perc = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    
    const bar = document.getElementById('global-bar');
    const percText = document.getElementById('global-perc');
    if (bar) bar.style.width = perc + '%';
    if (percText) percText.innerText = perc + '%';
    
    const label = document.getElementById('perc-label');
    if (perc === 100 && total > 0) {
        label?.classList.add('success-glow');
        if (!successCelebrated) { showSuccessModal(); successCelebrated = true; }
    } else {
        label?.classList.remove('success-glow');
        successCelebrated = false;
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance < 0) return;
    
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
    if (minsEl) minsEl.innerText = m.toString().padStart(2, '0');
    if (secsEl) secsEl.innerText = s.toString().padStart(2, '0');
}

window.showSuccessModal = () => document.getElementById('success-modal')?.classList.remove('hidden');
window.closeSuccessModal = () => document.getElementById('success-modal')?.classList.add('hidden');
window.showResetModal = () => document.getElementById('reset-modal')?.classList.remove('hidden');
window.closeResetModal = () => document.getElementById('reset-modal')?.classList.add('hidden');
window.confirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    init();
    closeResetModal();
};

window.onload = init;
