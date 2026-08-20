# AZBUKA — Contexto de proyecto (pegar esto al inicio de cualquier chat nuevo)

Estoy migrando/expandiendo **Азбука**, una app de ruso para hispanohablantes: sitio estático, sin build step, hosteado en GitHub Pages. No hay gamificación (sin XP, sin racha) — solo tracking honesto de progreso real.

Subo siempre los archivos actuales del repo al chat. Esto describe las decisiones ya tomadas para que no se reinventen ni se rompan.

---

## 1. Arquitectura de archivos

**Capa compartida (nunca duplicar esto en un archivo individual):**
- `core.css` — sistema de diseño único: variables de color, drawer, bottom nav, cards, botones, tipografía, todos los componentes reutilizables.
- `core.js` — storage, tema, drawer, progreso, búsqueda, TTS, toast. Todo lo transversal vive acá.
- `data-alphabet.js` — las 33 letras del alfabeto. Compartido por `azbuka-1.html` (sección Alfabeto) y `alfabeto.html` (módulo independiente).
- `data-diccionario.js` — ~400 palabras temáticas por categoría. Compartido por `diccionario.html` y `index.html` (buscador global).
- `data-verbos.js` — 50 verbos con conjugación. Compartido por `verbos.html` y `index.html` (buscador global).
- `data-azbuka1.js` — diálogos de ejemplo de la Unidad 1 (`DIALOGUES1`). Usado por `azbuka-1.html`; cargado también en el resto del stack por consistencia, aunque no se indexa en el buscador (son diálogo de contexto, no vocabulario objetivo).
- `data-lexicon.js` — léxico central (Fase 4 de `MIGRACION_LEXICO.md`). Capa de mapeo por encima de los `data-*.js` existentes: agrupa bajo un id estable (`LEX-<tipo>-NNN`) las palabras rusas que aparecen en 2+ módulos, sin duplicar ni tocar el contenido de esos módulos. Desde la Fase 6, se carga en el stack estándar de todas las páginas (después de `data-azbuka1.js`); todavía no alimenta ningún elemento visible de la UI (eso es Fase 7).

**Regla de oro:** si un dato (letras, palabras, verbos, casos) se usa en más de un archivo, va a un `data-*.js` propio que ambos importan. Nunca se copia y pega contenido de dominio entre archivos.

**Páginas:**
- `index.html` — hub general. Drawer con todo el índice + buscador global.
- `azbuka-index.html` — selector de las 12 unidades del curso.
- `azbuka-1.html` a `azbuka-12.html` — unidades del curso (1, 2, 3 migradas; 4–12 no existen todavía).
- `alfabeto.html`, `diccionario.html`, `verbos.html` — módulos independientes.
- `dialogos.html`, `casos-ruso.html` (pendiente renombrar a `casos.html`) — módulos independientes.

**Nomenclatura:** cada módulo independiente es una sola palabra en minúscula, coincidiendo con `AZ_MODULES` en `core.js` (`alfabeto`, `dialogos`, `diccionario`, `verbos`, `casos`). No usar nombres compuestos como `abecedario.html` o `casos-ruso.html`.

**Catálogo global de unidades:** desde la Fase 5 de la migración a léxico central, cada unidad de `AZ_UNITS` en `core.js` trae también `introducesLex: [...]` — los ids de `data-lexicon.js` que esa unidad enseña como vocabulario objetivo. Es un dato fijo y literal (no se recalcula en runtime), vacío todavía en las unidades 4-12 porque esos archivos no existen. Ver `MIGRACION_LEXICO.md` para el detalle completo de cómo se generó.

**Regla de nombres de archivos:** no agregar sufijos de versión al nombre de los archivos del proyecto. Mantener nombres como `alfabeto.html`, `diccionario.html`, `dialogos.html`, etc.

---

## 2. Storage — REGLA CRÍTICA

**Usar SIEMPRE `localStorage` a través de `azGet`/`azSet` de `core.js`. NUNCA `window.storage`.**

`window.storage` es una API exclusiva del preview de artifacts de Claude.ai — no existe en un navegador real. Si algo la usa, falla en silencio (el try/catch la atrapa) y siempre devuelve el valor por defecto, dando la falsa impresión de que "no se guarda nada". Este fue un bug real que ya pasamos y corregimos — no repetirlo.

```js
await azGet(key, fallback)   // lee y parsea JSON desde localStorage
await azSet(key, value)      // guarda como JSON en localStorage
```

**Schema de progreso** — una sola key `az_progress`, sin XP ni racha:
```js
{
  units: {},       // { "1": {exDone, timeSec, alfa:{...}, mod2:{...}, nounMastery:{...}} }
  modules: {},     // { alfabeto:{mastery,favorites}, verbos:{srs,stats}, diccionario:{...} }
  favorites: [],   // ids globales cross-módulo
  notes: [],       // [{text, date, moduleId}] — proyectos finales, cuadernos
  lastStudied: null
}
```

Helpers: `azUnit(id)`, `azModule(id)`, `azSaveProgress()`, `azTouchStudied()`, `azAddNote(text, moduleId)`, `azToggleFavorite(globalId)`.

**Tema** — key separada `az_theme` (`'dark'|'light'`), vía `azInitTheme()`/`azToggleTheme()`/`azApplyTheme()`.

---

## 3. Paleta de colores (variables CSS, ambos temas)

**Oscuro (default, `:root`):**
```css
--bg:#0F0F14; --bg2:#17171E; --bg3:#1E1E28;
--card:#1A1A24; --border:#2A2A38;
--gold:#C9A84C; --goldD:#C9A84C33;
--text:#F0EEE8; --muted:#888080; --sub:#B8B0A8;
--accent:#4B6FAB; --green:#4CAF82; --orange:#E2884A; --purple:#9B7FE8;
--nav-h:64px; --r:14px;
```

**Claro (`body.light`, mismas variables sobreescritas):**
```css
--bg:#F7F5F0; --bg2:#EDEAE4; --bg3:#E2DED7;
--card:#FFFFFF; --border:#D5D0C8;
--text:#1A1812; --muted:#8A847A; --sub:#5A5450;
--green:#2E7D55; --orange:#C85A1A; --purple:#6B4EC0;
/* gold y accent NO cambian entre temas */
```

**Semántica de color:** `--green` = correcto/dominado, `--orange` = incorrecto/aprendiendo, `--gold` = acento de marca/dorado ruso, `--purple` = pronunciación/detalle especial, `--accent` = azul, uso secundario.

**Iconos de módulo:** `red` `#B5605C`, `orange` `#C48254`, `yellow` `#C9B369` (texto oscuro), `green` `#5C9B78`, `blue` `#5D7DA6`, `purple` `#8871A8`.

---

## 4. Tipografía

```css
--sans: -apple-system,"Inter","Helvetica Neue",Arial,sans-serif;
--serif: -apple-system,"Inter","Helvetica Neue",Arial,sans-serif;
```

Fuente cursiva cirílica: `@font-face "CyrCursive"` (Marck Script embebida en base64 dentro de `core.css`) — se usa para mostrar la caligrafía manuscrita de letras (`.acv`, `.dcur`, `.wcv`).

`--serif` se usa para títulos grandes, letras/palabras en cirílico grandes (`font-family:var(--serif)` en `.pt`, `.dbig`, `.wru`, etc.) — a pesar del nombre, el stack real es sans-serif; es una convención de nombres heredada, no cambiarla sin razón.

---

## 5. Patrón canónico del drawer (obligatorio en TODA página nueva)

Estructura fija, de arriba a abajo:
1. **🏠 Inicio** → `index.html` (hub general, siempre, sin importar en qué página esté el drawer)
2. **Buscador** (`#drawerSearch`, placeholder `"Buscar…"`, ancho completo del drawer)
3. **Índice** → `azbuka-index.html` (link clickeable, primer ítem de la lista, no un botón separado)
4. Las 12 unidades (`AZ_UNITS`)
5. Label **"Herramientas"** + los módulos independientes (`AZ_MODULES`)
6. Botón de tema: **cuadrado chico, solo ícono** (🌙/☀️, sin texto), abajo del todo

Markup HTML estándar (páginas no-React):
```html
<div id="overlay"></div>
<div id="drawer">
  <div class="dh"><a id="homeBtnDrawer" href="index.html">🏠 Inicio</a></div>
  <div class="drawer-search">
    <input type="text" id="drawerSearch" placeholder="Buscar…" autocomplete="off">
  </div>
  <div id="drawerUnits"></div>
  <div id="drawerFoot">
    <button id="themeBtnDrawer" aria-label="Cambiar tema"></button>
  </div>
</div>
```

En páginas React/Preact (como `alfabeto.html`), se replica la misma estructura como JSX a mano — `azRenderDrawer` no se puede llamar directo porque React controla ese subárbol del DOM.

**Todo el wiring es automático** con una sola llamada:
```js
await azInit({activeType:'unit'|'module'|null, activeId:<id o null>});
```

Esto ya carga tema + progreso + renderiza el drawer + wirea overlay/menú/tema/búsqueda. No hace falta escribir el event listener del buscador ni del tema a mano — `azWireDrawer` ya lo hace.

**Sección "Módulos independientes" NO se usa** — el label correcto es **"Herramientas"**.

---

## 6. Bottom nav (`#bnav`)

Patrón estándar: botón `☰ Menú` (abre el drawer) + contenido central (`#navMid` con `<b>título</b><span>subtítulo</span>`) + opcionalmente prev/next si la página es parte de una secuencia de unidad. Páginas que no son "unidad" (index, azbuka-index) llevan solo el botón de menú, sin prev/next.

En módulos con bottom nav propio (por ejemplo React/Preact), mantener el mismo principio: `☰ Menú` como primer botón y navegación propia del módulo a continuación.

---

## 7. Búsqueda global

- `window.AZ_SEARCH_INDEX` — array poblado en runtime por cada página que carga un `data-*.js` y llama:
```js
azRegisterSearchEntries(moduleId, moduleLabel, href, entries)
// entries: [{ru, es, tr?, pairEs?, pairRu?}]
```
- **Importante:** esto solo puebla el índice de la página ACTUAL (no es persistente entre páginas). Por eso `index.html` y `azbuka-index.html` cargan `data-diccionario.js` + `data-verbos.js` directamente y llaman `azRegisterSearchEntries` ellos mismos — no alcanza con que lo haga `diccionario.html` o `verbos.html` solos.
- `azSearch(query)` — busca por substring en `ru` y `es`, case-insensitive, máx 40 resultados.
- **Pares de género opuesto:** algunas palabras del diccionario llevan 5to/6to campo en la tupla `[es, ru, pronun, gender, pairEs, pairRu]`. Si existen, el resultado de búsqueda muestra "Palabras similares: <pairRu> (<pairEs>)". Extender este patrón a nuevas palabras con pareja de género cuando corresponda.
- Solo se indexa el **vocabulario explícito** de cada unidad/módulo, nunca las líneas de diálogos de ejemplo.
- **Caso especial `alfabeto.html`:** al ser React, llama manualmente a `azRegisterAllKnownSearchIndexes()` junto con `azLoadProgress()`.
- Si se crea otra página React en el futuro, replicar este mismo llamado manual.
- **Segunda capa (Fase 6, ver `MIGRACION_LEXICO.md`):** `azSearchLexicon(query)` en `core.js` consulta `data-lexicon.js` (si la página lo cargó) y devuelve un resultado por identidad léxica en vez de uno por módulo — ej. "аптека" da 1 fila con sus 5 fuentes adentro, en vez de 5 filas sueltas. Es una capa nueva y separada, `azSearch()`/`AZ_SEARCH_INDEX` no se tocaron. Todavía no está conectada a ningún buscador visible (eso es Fase 7).

---

## 8. Decisiones de diseño ya tomadas (no reabrir sin motivo)

- **Sin gamificación:** nada de XP, puntos, racha. Solo progreso real (ejercicios hechos, dominio 0-2/0-4, favoritos, notas).
- **Cards de módulo:** ícono + título en una fila horizontal, subtítulo/tagline debajo ocupando todo el ancho de la card.
- **Títulos de módulo:** una sola palabra, coincidiendo con el nombre de archivo (Alfabeto, Diálogos, Diccionario, Verbos, Casos) — no "Alfabeto cirílico" ni "Verbos frecuentes".
- **Hero card del curso principal:** ancho completo, ícono grande a la altura de la card, título al lado, tagline abajo.
- **Zoom bloqueado** en todas las páginas:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```
- **Sin frases de relleno** tipo "El progreso se guarda automáticamente..." — no reintroducir.

### Responsive / zona segura — REGLA ACTUAL

La app utiliza una **zona segura de diseño diferenciada por eje**:
- Horizontal: **3vw** a izquierda y derecha.
- Vertical superior: **6vh**.
- Vertical inferior del contenido: **4vh**.
- Esta zona segura de diseño se considera suficiente para **Dynamic Island y bottom indicator** en el diseño de referencia.
- **No usar `env(safe-area-inset-*)`** como parte de esta regla.
- La **navbar inferior no forma parte de la zona segura**: debe ocupar todo el ancho del viewport, llegar hasta los bordes izquierdo/derecho y quedar pegada al borde inferior (`bottom:0`), sin apariencia de caja flotante.
- El contenido debe reservar el espacio necesario para que la navbar no tape contenido, manteniendo la zona inferior de 4vh del contenido.
- El scroll horizontal debe estar **deshabilitado** globalmente.
- El scroll vertical debe seguir disponible cuando el contenido lo necesite.
- El fondo de la zona segura debe ser **exactamente el mismo fondo de la app** (`--bg`), sin cortes visuales.
- **Excepción del drawer:** el drawer lateral ignora la zona segura inferior: su footer de tema llega hasta el borde inferior del viewport, sin reservar el 3% inferior. El drawer mantiene 6vh arriba y 3vw a los lados.
- La **navbar inferior no forma parte de esta zona segura**: debe llegar hasta los bordes del viewport (`left:0; right:0; bottom:0`) y no verse como una caja flotante. El contenido debe reservar el espacio necesario para que la navbar no lo tape.
- `core.css` debe centralizar esta regla para las páginas que usan el shell común.
- Los módulos con shell/layout propio, como `alfabeto.html` y `dialogos.html`, deben aplicar el mismo criterio en sus estilos propios; sus navbars también deben ser edge-to-edge.
- `diccionario.html`, por tener layout propio, también debe respetar el mismo criterio; su navbar debe ser edge-to-edge.
- El fondo de la zona segura debe ser exactamente el mismo fondo de la app (`--bg`), sin cortes visuales.
- No convertir el contenido en una altura rígida de 90vh si eso impide que listas o contenidos largos hagan scroll vertical.
- En el drawer, el footer del toggle de tema debe apoyarse correctamente cerca del final del drawer respetando el **4vh inferior**, sin reservar espacio para la navbar.
---

## 9. Metodología de trabajo (cómo validamos cambios)

Cada archivo modificado se valida con:
1. `node --check` sobre el JS extraído de cada `<script>` — sintaxis.
2. Servidor HTTP local (`python3 -m http.server`) + `jsdom` (`JSDOM.fromURL`) — ejecución real, cero mocks inventados de `window.storage`. Se mockea solo `speechSynthesis`/`SpeechSynthesisUtterance` si hace falta.
3. Para persistencia cross-página: se transporta el `localStorage` real de una carga de JSDOM a la siguiente.
4. El visualizador de archivos integrado puede tirar error en archivos migrados que dependan de rutas relativas; la validación real es servidor local + jsdom, o el sitio ya deployado.

---

## 10. Estado de la migración

✅ Migrados al patrón v2/canónico: `index.html`, `azbuka-index.html`, `azbuka-1.html`, `azbuka-2.html`, `azbuka-3.html`, `alfabeto.html`, `diccionario.html`, `dialogos.html`.

✅ Migración a léxico central (ver `MIGRACION_LEXICO.md`) — Fases 0 a 6 completadas: IDs estables, diálogos extraídos, correcciones/unificación regional, `data-lexicon.js` construido, relaciones `introducedIn`/`appearsIn` conectadas, y segunda capa de búsqueda (`azSearchLexicon()`) agregada en `core.js` — sin reemplazar el buscador actual del drawer. Próxima fase (7): integración de interfaz.

- `alfabeto.html`, `diccionario.html` y `dialogos.html` fueron actualizados recientemente para respetar la regla responsive del 5%.
- `dialogos.html` fue migrado desde su versión anterior a la estructura v2 siguiendo la estructura de `alfabeto.html`, manteniendo sus datos existentes y el buscador transversal.
- `core.css` es la base común del sistema responsive y de diseño.
- `verbos.html` y `casos.html` no deben darse por migrados al patrón completo sin revisar sus versiones actuales.

❌ No existen todavía: `azbuka-4.html` a `azbuka-12.html`.

⚠️ Pendiente: auditoría de vocabulario cruzado entre unidades y módulos.

---

## 11. Al crear una unidad o módulo NUEVO

1. Nombre de archivo: una palabra, minúscula, sin guiones si es posible.
2. Agregar la entrada correspondiente en `AZ_UNITS` o `AZ_MODULES` en `core.js` (fuente única de verdad para el catálogo).
3. Si tiene datos de dominio reusables (vocabulario, conjugaciones, etc.), van en `data-<nombre>.js`, no inline.
4. Usar el drawer canónico (sección 5) y el bottom nav estándar (sección 6).
5. Aplicar la zona segura de diseño del 5% (`5vw`/`5vh`) y deshabilitar scroll horizontal.
6. Llamar `azInit({activeType, activeId})` al final del script cuando corresponda.
7. Si tiene contenido buscable, registrar sus entradas mediante `azRegisterSearchEntries(...)` y/o el mecanismo transversal establecido en `core.js`.
8. Validar con el método de la sección 9 antes de darlo por terminado.
