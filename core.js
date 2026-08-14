/* ============================================================
   CORE.JS — Lógica compartida · Ruso desde Cero
   Importar en TODOS los módulos: <script src="core.js"></script>
   Requiere en el HTML: #overlay, #drawer #drawerUnits #drawerFoot,
   #themeBtnDrawer, #menuBtn, #bnav con #navMid #prevBtn #nextBtn, #toast
   ============================================================ */

/* ── CATÁLOGO GLOBAL DE MÓDULOS ─────────────────────────────
   Fuente de verdad única para nombres, iconos y hrefs.
   Si agregás una unidad o módulo nuevo, se declara UNA VEZ acá
   y todos los archivos (index, azbuka-index, drawers) lo heredan. */
const AZ_UNITS = [
  {id:1,title:"Alfabeto y pronunciación",desc:"Las 33 letras, sonidos y primeras palabras.",href:"azbuka-1.html"},
  {id:2,title:"Presentaciones básicas",desc:"Saludos, nombres, primeras frases.",href:"azbuka-2.html"},
  {id:3,title:"Sustantivos y género",desc:"Masculino, femenino, neutro.",href:"azbuka-3.html"},
  {id:4,title:"Casos básicos",desc:"Nominativo y acusativo.",href:"azbuka-4.html"},
  {id:5,title:"Verbos en presente",desc:"Conjugación y uso cotidiano.",href:"azbuka-5.html"},
  {id:6,title:"Movimiento y ubicación",desc:"Verbos de movimiento, preposiciones.",href:"azbuka-6.html"},
  {id:7,title:"Tiempo y rutina diaria",desc:"Horas, días, rutinas.",href:"azbuka-7.html"},
  {id:8,title:"Pasado",desc:"Aspecto verbal y pasado.",href:"azbuka-8.html"},
  {id:9,title:"Futuro",desc:"Formas y uso del futuro.",href:"azbuka-9.html"},
  {id:10,title:"Casos restantes",desc:"Genitivo, dativo, instrumental.",href:"azbuka-10.html"},
  {id:11,title:"Conversaciones cotidianas",desc:"Diálogos extendidos, situaciones reales.",href:"azbuka-11.html"},
  {id:12,title:"Consolidación B1",desc:"Repaso integral y examen final.",href:"azbuka-12.html"},
];
const AZ_MODULES = [
  {id:"alfabeto",title:"Alfabeto",desc:"Letras, sonidos y caligrafía — consulta libre",href:"alfabeto.html",icon:"orange",glyph:"Я"},
  {id:"dialogos",title:"Diálogos",desc:"30 conversaciones con audio y vocabulario",href:"dialogos.html",icon:"yellow",glyph:"Ди"},
  {id:"diccionario",title:"Diccionario",desc:"Vocabulario español–ruso por categorías",href:"diccionario.html",icon:"green",glyph:"Дс"},
  {id:"verbos",title:"Verbos",desc:"Los 50 verbos más usados, con conjugación",href:"verbos.html",icon:"blue",glyph:"Вб"},
  {id:"casos",title:"Casos",desc:"Declinaciones del ruso, los 6 casos",href:"casos.html",icon:"purple",glyph:"Пд"},
];
const AZ_ALL_ENTRIES = [
  {kind:"unit", ...({})}, // placeholder, no usado directamente
];

/* ── STORAGE UNIFICADO ───────────────────────────────────────
   IMPORTANTE: usamos localStorage, NO window.storage.
   window.storage es una API exclusiva del preview de artifacts de
   Claude.ai — no existe en un navegador real (Chrome, Safari, etc.)
   corriendo un sitio hosteado en GitHub Pages. Si el código de acá
   volviera a usar window.storage, el try/catch de abajo lo atraparía
   en silencio y SIEMPRE devolvería el valor por defecto — que es
   exactamente el bug de "el tema no persiste" que estábamos viendo.
   localStorage es la API estándar real, funciona en cualquier
   navegador, y persiste por dominio — perfecta para GitHub Pages. */
async function azGet(key, fallback){
  try{
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  }catch{ return fallback; }
}
async function azSet(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
}

/* ── PROGRESO — SIN GAMIFICACIÓN ─────────────────────────────
   Nada de xp/streak. Guardamos SOLO estado de dominio real:
   qué se estudió, qué se domina, notas del usuario.
   Todo bajo una única key 'az_progress' para minimizar llamadas
   y que sea trivial de inspeccionar/exportar. */
function azDefaultProgress(){
  return {
    units: {},        // { "1": { alfa:{А:2,...}, sections:{palabras:true,...} }, "2": {...} }
    modules: {},       // { abecedario:{dominadas:[...]}, dialogos:{vistos:[...]}, diccionario:{...}, verbos:{...}, casos:{...} }
    favorites: [],      // ids globales tipo "diccionario:banana" para favoritos cross-módulo
    notes: [],          // [{text, date, moduleId}]
    lastStudied: null
  };
}
let AZ_PROGRESS = azDefaultProgress();
async function azLoadProgress(){
  AZ_PROGRESS = await azGet('az_progress', azDefaultProgress());
  return AZ_PROGRESS;
}
function azSaveProgress(){ azSet('az_progress', AZ_PROGRESS); }
function azTouchStudied(){
  AZ_PROGRESS.lastStudied = new Date().toISOString().slice(0,10);
  azSaveProgress();
}
/* Helpers de conveniencia para leer/escribir la rama de una unidad o módulo */
function azUnit(id){
  const k = String(id);
  if(!AZ_PROGRESS.units[k]) AZ_PROGRESS.units[k] = {};
  return AZ_PROGRESS.units[k];
}
function azModule(id){
  if(!AZ_PROGRESS.modules[id]) AZ_PROGRESS.modules[id] = {};
  return AZ_PROGRESS.modules[id];
}
function azToggleFavorite(globalId){
  const i = AZ_PROGRESS.favorites.indexOf(globalId);
  if(i>=0) AZ_PROGRESS.favorites.splice(i,1); else AZ_PROGRESS.favorites.push(globalId);
  azSaveProgress();
  return AZ_PROGRESS.favorites.includes(globalId);
}
function azAddNote(text, moduleId){
  AZ_PROGRESS.notes.push({text, date:new Date().toISOString().slice(0,10), moduleId});
  azSaveProgress();
}

/* ── TEMA ─────────────────────────────────────────────────── */
function azApplyTheme(t){
  document.body.classList.toggle('light', t === 'light');
  // #themeBtnDrawer ahora es un botón cuadrado chico, solo ícono (sin texto)
  const btn = document.getElementById('themeBtnDrawer');
  if(btn) btn.textContent = t === 'light' ? '☀️' : '🌙';
  const topBtn = document.getElementById('themeBtn'); // botones sueltos legacy, si quedara alguno
  if(topBtn) topBtn.textContent = t === 'light' ? '☀️' : '🌙';
}
async function azToggleTheme(){
  const isLight = document.body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  azApplyTheme(next);
  await azSet('az_theme', next);
}
async function azInitTheme(){
  const t = await azGet('az_theme', 'dark');
  azApplyTheme(t);
}

/* ── TTS (texto a voz en ruso) ──────────────────────────────── */
let AZ_RU_VOICE = null;
let AZ_CURRENT_UTTER = null;
function azPickVoice(){
  if(!('speechSynthesis' in window)) return;
  const voices = speechSynthesis.getVoices();
  AZ_RU_VOICE = voices.find(v=>v.lang && v.lang.toLowerCase().startsWith('ru')) || null;
}
if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = azPickVoice;
  azPickVoice();
}
function speak(text){
  if(!('speechSynthesis' in window)){ azToast('Tu navegador no soporta audio de voz.'); return; }
  if(!AZ_RU_VOICE) azPickVoice();
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ru-RU'; if(AZ_RU_VOICE) u.voice = AZ_RU_VOICE; u.rate = 0.85; u.volume = 1;
  u.onerror = () => azToast('No se pudo reproducir el audio.');
  AZ_CURRENT_UTTER = u; // evita que el GC descarte el utterance antes de hablar
  setTimeout(()=>speechSynthesis.speak(u), 15);
}

/* ── TOAST ───────────────────────────────────────────────────── */
let _azToastTimer;
function azToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_azToastTimer);
  _azToastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ── DRAWER GLOBAL ───────────────────────────────────────────
   Estructura canónica, igual en TODAS las páginas:
   1. #homeBtnDrawer — <a href="index.html"> arriba del todo, va al hub general
   2. #drawerSearch — buscador, dentro del drawer
   3. #drawerUnits — arranca con "Índice" (link a azbuka-index.html),
      después las 12 unidades, después "Herramientas" con los módulos
   4. #themeBtnDrawer — botón cuadrado chico (solo ícono) al fondo
   Cada módulo/unidad pasa su propio id activo para resaltarlo en la lista.
   activeType: 'unit' | 'module' | null    activeId: number|string */
function azOpenDrawer(){ document.getElementById('drawer')?.classList.add('open'); document.getElementById('overlay')?.classList.add('show'); }
function azCloseDrawer(){ document.getElementById('drawer')?.classList.remove('open'); document.getElementById('overlay')?.classList.remove('show'); }

let AZ_DRAWER_ACTIVE = {type:null, id:null};

function azRenderDrawer(activeType, activeId){
  const el = document.getElementById('drawerUnits');
  if(!el) return;
  let html = '<div class="d-lbl">Azbuka</div>';
  const idxAc = activeType==='index';
  html += `<a class="d-u${idxAc?' ac':''}" href="azbuka-index.html"><span class="d-n">00</span><span>Índice</span></a>`;
  AZ_UNITS.forEach(u=>{
    const ac = activeType==='unit' && Number(activeId)===u.id;
    html += `<a class="d-u${ac?' ac':''}" href="${u.href}"><span class="d-n">${String(u.id).padStart(2,'0')}</span><span>${u.title}</span></a>`;
  });
  html += '<div class="d-lbl" style="margin-top:12px;">Herramientas</div>';
  AZ_MODULES.forEach(m=>{
    const ac = activeType==='module' && activeId===m.id;
    html += `<a class="d-u${ac?' ac':''}" href="${m.href}"><span class="d-n">${m.glyph}</span><span>${m.title}</span></a>`;
  });
  el.innerHTML = html;
}

/* Búsqueda dentro del drawer: mientras hay texto, reemplaza la lista de
   unidades/herramientas por resultados en el mismo contenedor. Al borrar
   el texto, vuelve a mostrar la lista normal (recordando cuál era la
   unidad/módulo activo para no perder el resaltado). */
function azRenderDrawerSearch(query){
  const el = document.getElementById('drawerUnits');
  if(!el) return;
  const q = (query||'').trim();
  if(!q){ azRenderDrawer(AZ_DRAWER_ACTIVE.type, AZ_DRAWER_ACTIVE.id); return; }
  const results = azSearch(q);
  if(results.length===0){
    el.innerHTML = '<div class="empty">Sin resultados.</div>';
    return;
  }
  el.innerHTML = results.map(r=>`
    <a class="d-u" href="${r.href}" style="flex-direction:column;align-items:flex-start;gap:2px;">
      <span style="font-family:var(--serif);color:var(--gold);">${r.ru}</span>
      <span style="font-size:11.5px;">${r.es} · ${r.moduleLabel}</span>
      ${r.pairRu?`<span style="font-size:10.5px;color:var(--muted);">También: ${r.pairRu} (${r.pairEs})</span>`:''}
    </a>`).join('');
}

/* Wire-up genérico de los controles del drawer — llamar una vez en init() */
function azWireDrawer(activeType, activeId){
  AZ_DRAWER_ACTIVE = {type: activeType, id: activeId};
  azRenderDrawer(activeType, activeId);
  document.getElementById('overlay')?.addEventListener('click', azCloseDrawer);
  document.getElementById('menuBtn')?.addEventListener('click', azOpenDrawer);
  document.getElementById('themeBtnDrawer')?.addEventListener('click', azToggleTheme);
  document.getElementById('drawerSearch')?.addEventListener('input', e=>azRenderDrawerSearch(e.target.value));
  const themeBtn = document.getElementById('themeBtn');
  if(themeBtn) themeBtn.addEventListener('click', azToggleTheme);
}

/* ── BÚSQUEDA TRANSVERSAL ────────────────────────────────────
   Cada módulo puede registrar su propio índice de contenido acá.
   window.AZ_SEARCH_INDEX se puebla al vuelo desde cada archivo
   (ver ejemplo al pie). El index.html central los junta todos
   vía az-search-index.js (se arma en la siguiente etapa). */
window.AZ_SEARCH_INDEX = window.AZ_SEARCH_INDEX || [];
function azRegisterSearchEntries(moduleId, moduleLabel, href, entries){
  // entries: [{ru, es, tr?, pairEs?, pairRu?}]
  // pairEs/pairRu: contraparte de género opuesto (ej. gato/кот ↔ gata/кошка),
  // se muestra como "También: ..." debajo del resultado si existe.
  entries.forEach(e=>{
    window.AZ_SEARCH_INDEX.push({
      module: moduleId, moduleLabel, href,
      ru: e.ru, es: e.es, tr: e.tr || '',
      pairEs: e.pairEs || null, pairRu: e.pairRu || null
    });
  });
}
function azSearch(query){
  const q = (query||'').trim().toLowerCase();
  if(!q) return [];
  return window.AZ_SEARCH_INDEX.filter(e=>
    e.ru.toLowerCase().includes(q) || e.es.toLowerCase().includes(q)
  ).slice(0, 40);
}

/* Registro automático de TODOS los datasets compartidos que la página
   haya cargado por <script src="data-*.js">. Se llama solo, dentro de
   azInit(), en TODA página — así el buscador es transversal de verdad:
   no importa en qué módulo o unidad estés, encontrás lo mismo que en
   index.html. Cada bloque chequea que su data-*.js esté presente
   (typeof) antes de registrar, así no rompe si algún archivo no lo
   carga. Al agregar un data-*.js nuevo al proyecto, sumar acá su
   bloque UNA vez — no hace falta tocar cada página individualmente. */
function azRegisterAllKnownSearchIndexes(){
  if(typeof DATA!=='undefined' && typeof getAllDiccionarioWords==='function'){
    azRegisterSearchEntries('diccionario','Diccionario temático','diccionario.html',
      getAllDiccionarioWords().map(w=>({ru:w.ru, es:w.es, tr:w.pronun, pairEs:w.pairEs, pairRu:w.pairRu})));
  }
  if(typeof verbs!=='undefined'){
    azRegisterSearchEntries('verbos','Verbos frecuentes','verbos.html',
      verbs.map(v=>({ru:v.inf, es:v.es, tr:''})));
  }
  if(typeof WORDS!=='undefined' && typeof getAllCasosWords==='function'){
    azRegisterSearchEntries('casos','Casos','casos.html', getAllCasosWords());
  }
  if(typeof ALPHABET!=='undefined' && typeof getAllAlphabetWords==='function'){
    azRegisterSearchEntries('alfabeto','Alfabeto','alfabeto.html', getAllAlphabetWords());
  }
}

/* ── UTILIDADES DE EJERCICIOS (compartidas por los motores de quiz) ─ */
function azRnd(a){ return a[Math.floor(Math.random()*a.length)]; }
function azShuf(a){ return [...a].sort(()=>Math.random()-.5); }
function azSample(a,n){ return azShuf(a).slice(0,n); }
function azNorm(s){ return String(s).trim().toLowerCase().replace(/ё/g,'е').normalize('NFD').replace(/[\u0300-\u036f]/g,''); }

/* ── INIT COMÚN — llamar al final de cada módulo:
     await azInit({activeType:'unit', activeId:1});
   Carga tema + progreso + wire del drawer, en un solo await. */
async function azInit({activeType=null, activeId=null} = {}){
  await azInitTheme();
  await azLoadProgress();
  azWireDrawer(activeType, activeId);
  azRegisterAllKnownSearchIndexes();
}
