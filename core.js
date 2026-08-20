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
/* introducesLex (Fase 5 — ver MIGRACION_LEXICO.md): ids de data-lexicon.js
   que cada unidad introduce como vocabulario objetivo. Es una relación
   INDEPENDIENTE de "appearsIn" (que vive en data-lexicon.js, del lado de
   cada palabra) — ninguna se infiere de la otra. Solo cubre las 254
   palabras que están en el léxico central (las que aparecen en 2+
   módulos); el resto del vocabulario de cada unidad no tiene id léxico
   todavía porque no había ninguna ambigüedad que resolver para él. Datos
   fijos y literales, igual criterio que el resto de los ids del proyecto
   — nunca se recalculan en runtime. Unidades 4-12 quedan con array vacío
   hasta que esos archivos existan. */
const AZ_UNITS = [
  {id:1,title:"Alfabeto y pronunciación",desc:"Las 33 letras, sonidos y primeras palabras.",href:"azbuka-1.html",
   introducesLex:["LEX-adj-001","LEX-adj-003","LEX-adj-005","LEX-otro-011","LEX-otro-016","LEX-otro-020","LEX-otro-025","LEX-otro-036","LEX-otro-037","LEX-otro-038","LEX-otro-039","LEX-otro-042","LEX-otro-043","LEX-sust-001","LEX-sust-005","LEX-sust-006","LEX-sust-009","LEX-sust-011","LEX-sust-016","LEX-sust-020","LEX-sust-025","LEX-sust-026","LEX-sust-027","LEX-sust-029","LEX-sust-032","LEX-sust-034","LEX-sust-035","LEX-sust-037","LEX-sust-039","LEX-sust-041","LEX-sust-042","LEX-sust-046","LEX-sust-048","LEX-sust-049","LEX-sust-056","LEX-sust-062","LEX-sust-063","LEX-sust-068","LEX-sust-073","LEX-sust-074","LEX-sust-076","LEX-sust-078","LEX-sust-079","LEX-sust-082","LEX-sust-083","LEX-sust-084","LEX-sust-085","LEX-sust-087","LEX-sust-088","LEX-sust-091","LEX-sust-095","LEX-sust-098","LEX-sust-101","LEX-sust-103","LEX-sust-107","LEX-sust-112","LEX-sust-117","LEX-sust-118","LEX-sust-119","LEX-sust-122","LEX-sust-126","LEX-sust-127","LEX-sust-133","LEX-sust-134","LEX-sust-139","LEX-sust-142","LEX-sust-143","LEX-sust-149","LEX-sust-152","LEX-sust-157","LEX-sust-158","LEX-sust-160","LEX-sust-161","LEX-sust-163","LEX-sust-165","LEX-sust-167","LEX-sust-169","LEX-sust-171","LEX-sust-172","LEX-sust-174","LEX-verb-004","LEX-verb-008","LEX-verb-014","LEX-verb-020","LEX-verb-026"]},
  {id:2,title:"Presentaciones básicas",desc:"Saludos, nombres, primeras frases.",href:"azbuka-2.html",
   introducesLex:["LEX-otro-002","LEX-otro-004","LEX-otro-007","LEX-otro-008","LEX-otro-009","LEX-otro-010","LEX-otro-012","LEX-otro-013","LEX-otro-014","LEX-otro-019","LEX-otro-020","LEX-otro-022","LEX-otro-023","LEX-otro-024","LEX-otro-025","LEX-otro-026","LEX-otro-027","LEX-otro-029","LEX-otro-033","LEX-otro-034","LEX-otro-037","LEX-otro-039","LEX-otro-042","LEX-otro-043"]},
  {id:3,title:"Sustantivos y género",desc:"Masculino, femenino, neutro.",href:"azbuka-3.html",
   introducesLex:["LEX-adj-001","LEX-adj-002","LEX-adj-004","LEX-adj-005","LEX-adj-006","LEX-sust-005","LEX-sust-008","LEX-sust-010","LEX-sust-015","LEX-sust-016","LEX-sust-030","LEX-sust-031","LEX-sust-033","LEX-sust-034","LEX-sust-036","LEX-sust-037","LEX-sust-038","LEX-sust-040","LEX-sust-047","LEX-sust-051","LEX-sust-054","LEX-sust-055","LEX-sust-056","LEX-sust-057","LEX-sust-058","LEX-sust-060","LEX-sust-062","LEX-sust-064","LEX-sust-065","LEX-sust-067","LEX-sust-075","LEX-sust-076","LEX-sust-081","LEX-sust-082","LEX-sust-086","LEX-sust-098","LEX-sust-103","LEX-sust-104","LEX-sust-107","LEX-sust-109","LEX-sust-111","LEX-sust-118","LEX-sust-121","LEX-sust-123","LEX-sust-127","LEX-sust-129","LEX-sust-131","LEX-sust-133","LEX-sust-134","LEX-sust-136","LEX-sust-142","LEX-sust-144","LEX-sust-145","LEX-sust-146","LEX-sust-148","LEX-sust-149","LEX-sust-151","LEX-sust-152","LEX-sust-153","LEX-sust-154","LEX-sust-158","LEX-sust-159","LEX-sust-161","LEX-sust-162","LEX-sust-164","LEX-sust-166","LEX-sust-170","LEX-sust-171","LEX-sust-174"]},
  {id:4,title:"Casos básicos",desc:"Nominativo y acusativo.",href:"azbuka-4.html",introducesLex:[]},
  {id:5,title:"Verbos en presente",desc:"Conjugación y uso cotidiano.",href:"azbuka-5.html",introducesLex:[]},
  {id:6,title:"Movimiento y ubicación",desc:"Verbos de movimiento, preposiciones.",href:"azbuka-6.html",introducesLex:[]},
  {id:7,title:"Tiempo y rutina diaria",desc:"Horas, días, rutinas.",href:"azbuka-7.html",introducesLex:[]},
  {id:8,title:"Pasado",desc:"Aspecto verbal y pasado.",href:"azbuka-8.html",introducesLex:[]},
  {id:9,title:"Futuro",desc:"Formas y uso del futuro.",href:"azbuka-9.html",introducesLex:[]},
  {id:10,title:"Casos restantes",desc:"Genitivo, dativo, instrumental.",href:"azbuka-10.html",introducesLex:[]},
  {id:11,title:"Conversaciones cotidianas",desc:"Diálogos extendidos, situaciones reales.",href:"azbuka-11.html",introducesLex:[]},
  {id:12,title:"Consolidación B1",desc:"Repaso integral y examen final.",href:"azbuka-12.html",introducesLex:[]},
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

/* ── BÚSQUEDA POR LÉXICO CENTRAL (Fase 6 — ver MIGRACION_LEXICO.md) ──
   Capa NUEVA y SEPARADA de azSearch()/AZ_SEARCH_INDEX de arriba, que
   sigue funcionando exactamente igual que antes — nada de lo anterior
   se tocó ni se reemplazó. Esta capa consulta data-lexicon.js (si la
   página lo cargó) y devuelve UN resultado por identidad léxica en vez
   de un resultado suelto por cada módulo donde aparece la palabra —
   por ejemplo, buscar "аптека" con azSearch() da 5 filas (una por
   módulo); con azSearchLexicon() da 1 fila con las 5 fuentes adentro.
   Solo cubre las 254 palabras que están en data-lexicon.js (las que
   aparecen en 2+ módulos) — para todo lo demás, azSearch() sigue
   siendo la única fuente de resultados.
   Esta función todavía no está conectada a ningún buscador visible de
   la UI (eso es Fase 7) — queda lista para usarse cuando corresponda. */
function azSearchLexicon(query){
  if(typeof LEXICON === 'undefined') return [];
  const q = (query||'').trim().toLowerCase();
  if(!q) return [];
  return Object.entries(LEXICON)
    .filter(([id,e]) => e.ru.toLowerCase().includes(q) || e.es.toLowerCase().includes(q))
    .map(([id,e]) => ({
      id, ru:e.ru, es:e.es, pos:e.pos, gender:e.gender, sense:e.sense||null,
      introducedIn:e.introducedIn, appearsIn:e.appearsIn,
      sourceCount: Object.keys(e.sources).length,
      sources: e.sources
    }))
    .slice(0, 40);
}
/* Atajo para una ficha de palabra completa por id (Fase 7 la va a usar
   para armar la vista de detalle transversal de una palabra). */
function azLexiconEntry(id){
  return (typeof lexById==='function') ? lexById(id) : null;
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
  if(typeof MODULES2!=='undefined' && typeof getAllAzbuka2Words==='function'){
    azRegisterSearchEntries('azbuka-2','Unidad 2 · Presentaciones','azbuka-2.html', getAllAzbuka2Words());
  }
  if(typeof NOUNS!=='undefined' && typeof getAllAzbuka3Words==='function'){
    azRegisterSearchEntries('azbuka-3','Unidad 3 · Sustantivos','azbuka-3.html', getAllAzbuka3Words());
  }
  if(typeof VOCAB!=='undefined' && typeof getAllDialogosWords==='function'){
    azRegisterSearchEntries('dialogos','Diálogos','dialogos.html', getAllDialogosWords());
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
