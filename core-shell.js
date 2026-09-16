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

/* ── FORZAR MÁS ALLÁ DE innerHeight — PROBADO Y DESCARTADO ──────────
   Se probó empujar la nav con un bottom negativo (igual a screen.height
   menos innerHeight) para que llegara más allá del borde de
   innerHeight. Matemáticamente SÍ llega — pero en el dispositivo real,
   iOS dibuja su propia capa encima de esa franja en modo standalone
   (para la zona de gesto del home indicator), tapando lo que haya ahí.
   Por eso en el resto de la app nunca se ve este problema: nunca antes
   empujamos contenido a esa zona. bottom:0 (sin forzar nada) es lo
   correcto — es lo que ya usa el resto de la app y alfabeto.html.
   Se deja la función sin uso, documentada, para no volver a probar
   esto por error más adelante. */
function azShellForceEdge(){
  return 0; // desactivado a propósito — ver nota arriba
}

/* ── ALTO REAL DE VIEWPORT (solo para el panel de diagnóstico) ─────
   Se probó fijar la nav bar y el drawer por píxeles calculados a
   partir de esto (en vez de bottom:0 / top:0 de CSS), pero midiendo
   con precisión de píxel sobre capturas reales del dispositivo se
   confirmó que ambos enfoques llegan exactamente al mismo límite: el
   borde de window.innerHeight. La franja que queda entre ese borde y
   el borde físico real (en modo standalone) es una zona que iOS
   reserva para sí mismo y que ningún contenido web puede pintar — ni
   con vh, ni con env(), ni con JS. Por eso NO fijamos nada por JS acá:
   el bottom:0 / top:0 de core.css ya llega tan lejos como se puede
   llegar. Esta función se deja solo para seguir viendo los números
   en el panel de diagnóstico si hace falta debuguear otra cosa. */
function azShellRealViewportH(){
  const vv = window.visualViewport;
  return vv ? Math.round(vv.height + vv.offsetTop) : window.innerHeight;
}

/* ── PANEL DE DIAGNÓSTICO (temporal, solo para esta demo) ──────────
   Muestra los números crudos que reporta el navegador. Todo esto sale
   directo del DOM (getBoundingClientRect / getComputedStyle) — cero
   ambigüedad de estar interpretando colores en una captura de pantalla.
   Si existe #shellDiag en la página, lo completa; si no, no hace nada. */
function azShellRenderDiag(){
  const el = document.getElementById('shellDiag');
  if(!el) return;
  const bnav = document.getElementById('bnav');
  const firstBtn = document.querySelector('#bnav .nb');
  const vv = window.visualViewport;
  const rect = bnav ? bnav.getBoundingClientRect() : null;
  const btnRect = firstBtn ? firstBtn.getBoundingClientRect() : null;
  const bnavCS = bnav ? getComputedStyle(bnav) : null;

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
    `BUILD: core-shell v13 (nav aplanada, sin .bn-inner)`,
    `window.innerHeight: ${window.innerHeight}px`,
    `visualViewport.height: ${vv ? Math.round(vv.height) + 'px' : 'no soportado'}`,
    `screen.height: ${window.screen.height}px`,
    `devicePixelRatio: ${window.devicePixelRatio}`,
    `env(safe-area-inset-bottom): ${safeBottom}`,
    `--- MEDICIÓN DIRECTA DEL DOM (sin fotos) ---`,
    `#bnav computed height (CSS): ${bnavCS ? bnavCS.height : 'n/d'}`,
    `#bnav getBoundingClientRect().height: ${rect ? Math.round(rect.height) + 'px' : 'n/d'}`,
    `#bnav getBoundingClientRect().top: ${rect ? Math.round(rect.top) + 'px' : 'n/d'}`,
    `#bnav getBoundingClientRect().bottom: ${rect ? Math.round(rect.bottom) + 'px' : 'n/d'}`,
    `primer .nb getBoundingClientRect().height: ${btnRect ? Math.round(btnRect.height) + 'px' : 'n/d'}`,
    `#bnav computed overflow: ${bnavCS ? bnavCS.overflow : 'n/d'}`,
    `¿bnav.bottom llega a innerHeight? ${rect ? (Math.round(rect.bottom) >= window.innerHeight - 1 ? 'SÍ' : 'NO — faltan ' + Math.round(window.innerHeight - rect.bottom) + 'px') : 'n/d'}`,
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
    azShellForceEdge();
    azShellRenderDiag();
  };
  refresh();
  requestAnimationFrame(refresh); // por si las fuentes/el layout tardan en asentarse
  setTimeout(refresh, 300);       // por si iOS ajusta el viewport recién al final

  window.addEventListener('resize', refresh);
  window.visualViewport?.addEventListener('resize', refresh);
}
