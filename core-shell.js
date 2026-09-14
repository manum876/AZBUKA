/* ============================================================
   CORE-SHELL.JS — Prototipo de arquitectura de navegación
   Se carga DESPUÉS de core.js. Agrega funciones NUEVAS únicamente
   (ningún nombre pisa algo de core.js):
   - Pila de navegación propia (sessionStorage) para que "atrás"
     vuelva a la pantalla anterior real, no a la jerarquía de archivos.
   - Medición dinámica de la altura del topbar y de la bottom nav,
     expuestas como variables CSS (--topbar-h / --shell-nav-h) para
     que .shell-content reserve exactamente ese espacio + 2vh.
   - azInitShell() llama a azInit() (core.js) y le suma este wiring.
   Una vez aprobado el esqueleto, esto se funde dentro de core.js. */

const AZ_SHELL_NAV_KEY = 'az_nav_stack_shell';

function azShellNavStack(){
  try{ return JSON.parse(sessionStorage.getItem(AZ_SHELL_NAV_KEY)) || []; }
  catch{ return []; }
}

function azShellPushNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  let stack = azShellNavStack();
  if(stack[stack.length - 1] !== here) stack.push(here);
  if(stack.length > 40) stack = stack.slice(-40); // tope de seguridad
  sessionStorage.setItem(AZ_SHELL_NAV_KEY, JSON.stringify(stack));
  return stack;
}

function azShellGoBack(){
  let stack = azShellNavStack();
  stack.pop();               // saca la página actual
  const prev = stack.pop();  // la pantalla anterior real
  sessionStorage.setItem(AZ_SHELL_NAV_KEY, JSON.stringify(stack));
  location.href = prev || 'index.html';
}

function azShellRenderHeader(){
  const btn = document.getElementById('backBtn');
  if(!btn) return;
  const hasBack = azShellNavStack().length > 1;
  btn.classList.toggle('hidden', !hasBack);
  btn.disabled = !hasBack;
}

function azShellMeasure(){
  const tb = document.getElementById('topbar');
  const bn = document.getElementById('bnav');
  if(tb) document.documentElement.style.setProperty('--topbar-h', tb.offsetHeight + 'px');
  if(bn) document.documentElement.style.setProperty('--shell-nav-h', bn.offsetHeight + 'px');
}

/* ── FIJADO POR PX REALES (no vh, no env()) ────────────────────────
   En vez de confiar en bottom:0 / vh / env(), medimos el alto real
   que reporta el propio navegador (visualViewport si existe, que es
   más confiable en iOS que innerHeight) y ubicamos la nav bar y el
   drawer con un `top` calculado en px concretos. Si el "hueco" que se
   ve es un bug de cómo iOS resuelve bottom:0 en modo standalone, esto
   lo evita del todo porque no usamos bottom en ningún momento. */
function azShellRealViewportH(){
  const vv = window.visualViewport;
  return vv ? Math.round(vv.height + vv.offsetTop) : window.innerHeight;
}

function azShellPinToRealBottom(){
  const h = azShellRealViewportH();
  const bnav = document.getElementById('bnav');
  const drawer = document.getElementById('drawer');
  if(bnav){
    bnav.style.bottom = 'auto';
    bnav.style.top = (h - bnav.offsetHeight) + 'px';
  }
  if(drawer){
    drawer.style.bottom = 'auto';
    drawer.style.height = h + 'px';
  }
}

/* ── PANEL DE DIAGNÓSTICO (temporal, solo para esta demo) ──────────
   Muestra los números crudos que reporta el navegador, para saber si
   el hueco es un bug nuestro de CSS o una zona que iOS reserva y no
   deja pintar — algo que ningún CSS puede arreglar. Si existe
   #shellDiag en la página, lo completa; si no, no hace nada. */
function azShellRenderDiag(){
  const el = document.getElementById('shellDiag');
  if(!el) return;
  const bnav = document.getElementById('bnav');
  const vv = window.visualViewport;
  const rect = bnav ? bnav.getBoundingClientRect() : null;

  // env(safe-area-inset-bottom) no se puede leer directo por JS —
  // se lee indirecto vía un elemento con esa propiedad en su CSS.
  let safeBottom = 'n/d';
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;bottom:0;height:0;padding-bottom:env(safe-area-inset-bottom, -1px);visibility:hidden;';
  document.body.appendChild(probe);
  const padVal = getComputedStyle(probe).paddingBottom;
  document.body.removeChild(probe);
  safeBottom = padVal;

  const lines = [
    `window.innerHeight: ${window.innerHeight}px`,
    `visualViewport.height: ${vv ? Math.round(vv.height) + 'px' : 'no soportado'}`,
    `visualViewport.offsetTop: ${vv ? Math.round(vv.offsetTop) + 'px' : 'n/d'}`,
    `screen.height: ${window.screen.height}px`,
    `devicePixelRatio: ${window.devicePixelRatio}`,
    `env(safe-area-inset-bottom): ${safeBottom}`,
    `#bnav.getBoundingClientRect().bottom: ${rect ? Math.round(rect.bottom) + 'px' : 'n/d'}`,
    `¿bnav toca el borde real medido? ${rect ? (Math.round(rect.bottom) >= azShellRealViewportH() - 1 ? 'SÍ' : 'NO — faltan ' + Math.round(azShellRealViewportH() - rect.bottom) + 'px') : 'n/d'}`,
  ];
  el.textContent = lines.join('\n');
}

/* Llamar en vez de azInit() en las páginas que usen el esqueleto nuevo.
   Hace todo lo que hacía azInit() (tema, progreso, drawer, buscador
   transversal) y le suma el wiring de header + atrás + medición. */
async function azInitShell({activeType = null, activeId = null} = {}){
  await azInit({activeType, activeId});
  azShellPushNav();
  azShellRenderHeader();
  document.getElementById('backBtn')?.addEventListener('click', azShellGoBack);

  const refresh = () => {
    azShellMeasure();
    azShellPinToRealBottom();
    azShellRenderDiag();
  };
  refresh();
  requestAnimationFrame(refresh); // por si las fuentes/el layout tardan en asentarse
  setTimeout(refresh, 300);       // por si iOS ajusta el viewport recién al final

  window.addEventListener('resize', refresh);
  window.visualViewport?.addEventListener('resize', refresh);
}
