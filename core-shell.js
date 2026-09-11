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

/* Llamar en vez de azInit() en las páginas que usen el esqueleto nuevo.
   Hace todo lo que hacía azInit() (tema, progreso, drawer, buscador
   transversal) y le suma el wiring de header + atrás + medición. */
async function azInitShell({activeType = null, activeId = null} = {}){
  await azInit({activeType, activeId});
  azShellPushNav();
  azShellRenderHeader();
  document.getElementById('backBtn')?.addEventListener('click', azShellGoBack);
  azShellMeasure();
  requestAnimationFrame(azShellMeasure); // por si las fuentes tardan en aplicar
  window.addEventListener('resize', azShellMeasure);
}
