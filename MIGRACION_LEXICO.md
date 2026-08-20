# Migración a léxico central — Registro de fases

> Documento de seguimiento de la evolución arquitectónica de AZBUKA hacia un
> sistema de identidad léxica global y búsqueda transversal. Complementa a
> `CONTEXTO_PROYECTO.md` (que sigue siendo la fuente de verdad del estado
> *actual* de la app) — este archivo es el registro específico de **esta
> migración**: qué se hizo en cada fase, qué se verificó, y qué queda
> pendiente. Se actualiza al cerrar cada fase, nunca antes.

Última actualización: Fase 6 completada (`azSearchLexicon()` agregado; sigue sin conectarse a ningún buscador visible).

---

## Fix post-Fase-2 — Reconstrucción de `verbos.html`

Después de cerrar la Fase 2, se reportó `verbos.html` en blanco (nav visible, sin interacción). Diagnóstico:

### Qué pasó
- Se comparó contra un backup subido por el usuario que resultó ser una versión **anterior a toda la migración a `core.js`** (sin drawer, sin `localStorage`, con `const MODULES`/`const verbsRaw` **embebidos dentro del propio HTML**, con XP/gamificación). No era el "original" de esta migración — era una etapa más vieja del proyecto, previa incluso a la Fase 0.
- Hipótesis de causa raíz más probable: en algún punto convivieron, en el mismo `verbos.html`, una declaración inline de `MODULES`/`verbsRaw` (como la del backup) **y** la carga del `data-verbos.js` externo, que declara las mismas variables. Eso produce `SyntaxError: Identifier 'MODULES' has already been declared` — un error de *parseo*, no de ejecución: el script entero queda sin correr, así que ningún botón responde, pero el HTML estático (nav, bottom nav) se sigue viendo. Coincide exactamente con el síntoma reportado.
- Se verificó que el contenido de los 50 verbos (inf/es/conj/case_/caseNote/ex/vocab) es **idéntico** entre el backup viejo y el `data-verbos.js` actual de Fase 1 → **se decidió mantener `data-verbos.js` tal cual está**, sin reconstruirlo.
- `verbos.html` se reconstruyó **completo, en una sola pasada**, en vez de seguir parcheando el archivo anterior — para eliminar cualquier duda sobre inconsistencias acumuladas. Usa exclusivamente `MODULES`/`verbs` cargados desde `data-verbos.js` (nunca los redeclara), usa `verbKey(v)` de forma consistente en **absolutamente todos** los accesos a `state.srs` (incluida la instancia que tenía el bug de "Nivel: undefined", ya corregida en el mismo paso), y no tiene rastro de XP/gamificación.

### Verificación aplicada
- Chequeo explícito de que el archivo no contiene `const MODULES`, `const verbsRaw` ni `const verbs` (para descartar el escenario de redeclaración).
- Sintaxis del script inline validada.
- Simulación completa en DOM real (jsdom + servidor HTTP local, no un simple chequeo de sintaxis): Módulos → módulo 1 → verbo → "Practicar este verbo" → flashcard → revelar → responder "Lo sabía" → siguiente flashcard; y por separado, Práctica → "Elegir el caso correcto" → responder. **Cero errores en todo el flujo.**

### Nota para vos
Si el problema persiste después de subir este archivo, es casi seguro **caché del navegador** sirviendo una versión vieja de algún `.js`. Recomendado: hard refresh / borrar caché del sitio antes de volver a probar.

---

## Fase 1 — IDs estables (`data-verbos.js`, `data-casos.js`)

### 1.1 Qué se hizo

**`data-verbos.js`:**
- Cada uno de los 50 verbos de `verbsRaw` ahora trae `id` y `module` como campos **literales**, escritos directamente en el objeto — ya no se calculan con un contador (`autoId`) que recorría `MODULES` en runtime.
- Los valores numéricos asignados son **idénticos** a los que el contador venía generando hasta ahora (verificado programáticamente, entrada por entrada). Esto significa que el progreso SRS guardado en `localStorage` (`az_progress.modules.verbos.srs[id]`) de cualquier usuario existente **sigue siendo válido sin ninguna migración** — el id de "быть" era 1 y sigue siendo 1, el de "нести" era 50 y sigue siendo 50, etc.
- `const verbs = verbsRaw;` reemplaza el bloque `MODULES.forEach(...)` que antes reconstruía el array — `MODULES` se sigue usando normalmente para los metadatos de cada módulo (título, descripción, objetivo) en `verbos.html`, eso no cambió.
- Regla nueva documentada en el propio archivo: si se agrega un verbo 51 en el futuro, se le asigna el siguiente id libre (51) sin tocar los 50 existentes, sin importar en qué posición del array se lo inserte.

**`data-casos.js`:**
- Se agregó un nuevo mapa `CASOS_WORD_IDS` (ru → id literal, formato `cs001`…`cs381`) que congela el orden de construcción actual de `WORDS` como valores fijos y arbitrarios — el id ya no se deriva ni del texto ni del orden de iteración de `Object.entries(REG)` en runtime.
- Se verificó que las 381 palabras de `WORDS` (paladras regulares + `IRREGULAR`) tienen valores de `ru` **únicos** en toda la lista — sin eso, el mapa por texto no habría sido seguro.
- El contador `_casosId` fue eliminado; la construcción de `WORDS` y de `IRREGULAR` ahora consulta `CASOS_WORD_IDS[ru]`, con un valor de respaldo (`cs-sin-id-<ru>`) solo por seguridad ante un error futuro, nunca esperado en uso normal.
- **No requirió migración de datos**: `casos.html` nunca guardó progreso por `id` (usa el texto `ru` como clave en `wrongWords`, y `caseKey`/`level` en `levelStats`/`caseStats`), confirmado en la Fase 0. Este cambio deja la base preparada para el léxico central (Fase 4) sin ningún efecto sobre el progreso guardado hoy.

### 1.2 Qué NO se tocó
- Ningún archivo HTML (`verbos.html`, `casos.html` y el resto siguen funcionando exactamente igual — consumen `verbs`/`WORDS` de la misma forma que antes).
- El contenido pedagógico (conjugaciones, ejemplos, casos que rige cada verbo, declinaciones de cada sustantivo) no se modificó en absoluto — solo se agregó/relocalizó la asignación del id.
- `data-azbuka2.js` — el riesgo de favoritos por índice detectado en Fase 0 sigue abierto (no estaba en el alcance declarado de esta fase). Se recomienda tratarlo como una fase adicional antes de Fase 4, cuando convenga.

### 1.3 Verificación aplicada
- `node --check` sobre ambos archivos nuevos → sintaxis válida.
- Ejecución real en sandbox (Node `vm`) de ambos archivos, comparando el `verbs`/`WORDS` resultante contra el snapshot calculado del archivo original **antes** del cambio:
  - `data-verbos.js`: 50/50 ids y `module` coinciden exactamente con los valores previos.
  - `data-casos.js`: 381/381 ids coinciden exactamente con el snapshot congelado; ids únicos; formato `csNNN` consistente; contenido de declinación (`forms`) intacto (verificado con el ejemplo "стол").
- Checklist de la sección 0.4 aplicable a partir de este punto: pendiente de tu verificación manual al subir los archivos (carga sin errores, drawer/búsqueda, progreso existente, ningún contenido perdido).

---

## Fase 0 — Snapshot de referencia y superficie de riesgo

### 0.1 Inventario de datasets (estado actual, antes de tocar nada)

| Archivo | Entidad | Cardinalidad | Mecanismo de ID |
|---|---|---|---|
| `data-alphabet.js` | `ALPHABET` (letras) | 33 | **Explícito**, hardcodeado 1–33 |
| `data-alphabet.js` | `words[]` de cada letra | ~130 | Ninguno (sub-array anónimo) |
| `data-diccionario.js` | `DATA` (palabras) | ~400 | Ninguno — tupla posicional |
| `data-verbos.js` | `verbs` (derivado de `verbsRaw`) | 50 | **`autoId` en runtime**, depende del orden de iteración `MODULES.forEach(mod.verbs.forEach(...))` |
| `data-casos.js` | `WORDS` (regulares + `IRREGULAR`) | 381 | **`_casosId` en runtime**, formato `w0,w1...`, depende del orden de `Object.entries(REG)` |
| `data-casos.js` | `TEMPLATES` | ~12 | Ninguno |
| `data-azbuka2.js` | `MODULES2[].vocab` | ~90 | Ninguno (id ad-hoc `moduleId+'_'+índice` generado solo dentro de `azbuka-2.html`, no en el dataset) |
| `data-azbuka2.js` | `DIALOGUES2` | 7 | Ninguno |
| `data-azbuka3.js` | `NOUNS` | 69 | **Explícito**, hardcodeado 1–69 |
| `data-azbuka3.js` | `ADJECTIVES` | 8 | **Explícito**, hardcodeado 1–8 |
| `azbuka-1.html` (inline) | `DIALOGUES` | 3 | Ninguno — no migrado a `data-*.js` |
| `dialogos.html` (inline, React) | `DIALOGS` | 30 | `id` numérico 1–30, explícito pero **aislado**: no conectado a `core.js` ni a `AZ_SEARCH_INDEX` |
| `dialogos.html` (inline, React) | `VOCAB` | 63 | Ninguno — aislado |

### 0.2 Sistemas existentes que esta migración NO debe romper

**Esquema de persistencia (`localStorage`, key `az_progress`):**
```js
{
  units: {},        // azUnit(id) — id de AZ_UNITS, numérico 1–12
  modules: {},       // azModule(id) — id de AZ_MODULES, string
  favorites: [],      // ids globales cross-módulo, formato libre por módulo
  notes: [],           // [{text, date, moduleId}]
  lastStudied: null
}
```
Este esquema (forma del objeto, nombres de campo, tipo `az_progress`/`az_theme` como keys de `localStorage`) no cambia en ninguna fase de esta migración. Los helpers `azGet/azSet/azUnit/azModule/azSaveProgress/azTouchStudied/azAddNote/azToggleFavorite` de `core.js` mantienen su firma.

**Contrato de inicialización de página:**
`azInit({activeType, activeId})` es llamado por 8 de las 9 páginas migradas. `alfabeto.html` (React) es la excepción: replica manualmente `azLoadProgress()` + `azRegisterAllKnownSearchIndexes()` dentro de su propio `useEffect` porque el drawer ahí lo controla React, no `azWireDrawer`. **Cualquier cambio a `azRegisterAllKnownSearchIndexes()` en fases posteriores debe reflejarse también en ese `useEffect` manual**, o `alfabeto.html` queda con el buscador transversal desactualizado sin dar error visible.

**Consumidores actuales de `AZ_SEARCH_INDEX` / `azSearch()`:**
- `azRenderDrawerSearch()` en `core.js`, disparado por el input `#drawerSearch` en el drawer — es el **único** consumidor real hoy.
- `diccionario.html` tiene su propio buscador local (`doSearch()` sobre `getAllDiccionarioWords()`) que **no** pasa por `AZ_SEARCH_INDEX` — es un sistema paralelo e independiente que tampoco debe romperse, pero no es parte de la capa transversal.

### 0.3 Datos persistentes en riesgo por cambios de ID (por dataset)

| Dataset | Key de persistencia afectada | Riesgo | Motivo |
|---|---|---|---|
| `data-verbos.js` → `verbs[].id` | `az_progress.modules.verbos.srs[id]` (progreso SRS 0–4 por verbo) | 🔴 **Alto** | El id se genera en runtime iterando `MODULES` en orden. Agregar, quitar o reordenar un verbo dentro de cualquier `MODULES[n].verbs` corre los ids posteriores — el progreso guardado queda atribuido al verbo equivocado sin ningún error visible. |
| `data-casos.js` → `WORDS[].id` | Ninguna directa | 🟢 Ninguno | `casos.html` guarda progreso por `ru` (string) y por `caseKey`/`level`, nunca por `w.id`. El id sintético `_casosId` no se persiste en ningún lado — seguro tocarlo. |
| `data-alphabet.js` → `ALPHABET[].id` | `az_progress.modules.alfabeto.mastery[id]` | 🟡 Bajo | Id ya explícito y hardcodeado (1–33), compartido entre `azbuka-1.html` y `alfabeto.html`. Riesgo solo si en el futuro se inserta una letra a mitad de la lista sin cuidar los ids existentes — no es un riesgo de *esta* migración, es una regla de mantenimiento a documentar. |
| `data-azbuka3.js` → `NOUNS[].id` / `ADJECTIVES[].id` | `az_progress.units["3"].nounMastery[id]` | 🟡 Bajo | Mismo caso que alfabeto: ya explícito, mismo cuidado a futuro. |
| `data-azbuka2.js` → `MODULES2[].vocab[]` (sin id propio) | `az_progress.units["2"].favs[]` (favoritos, formato `moduleId+'_'+índice`) | 🟠 **Medio** | El id de favorito depende del **índice dentro del array `vocab` de ese módulo**. Si se agrega/reordena una palabra en `vocab[]` de cualquier módulo, los favoritos existentes de otros usuarios apuntarían silenciosamente a una palabra distinta. No es tan crítico como verbos (es solo un ★, no una métrica de dominio), pero corresponde al mismo patrón de riesgo y se resuelve en la misma fase. |
| `data-azbuka2.js` → `MODULES2[].id` (top-level, ya explícito 1–10) | `az_progress.units["2"].mod2[id]` (dominio por módulo) | 🟢 Ninguno | Ya es un id explícito estable, no requiere cambios. |
| `dialogos.html` → `DIALOGS[].id` | Ninguna | 🟢 Ninguno | `dialogos.html` no persiste ningún progreso hoy (estado 100% en memoria de React). Migrarlo no arrastra riesgo de persistencia, solo de integración. |

**Conclusión de riesgo:** el único caso que exige diseño cuidadoso de migración de datos guardados es **`verbs.id`**. El caso de `MODULES2[].vocab` (favoritos por índice) es secundario pero se resuelve con el mismo mecanismo. Todo lo demás es seguro de tocar sin plan de migración de datos de usuario.

### 0.4 Checklist de validación (a aplicar al cierre de cada fase siguiente)

1. La app carga sin errores de consola en las 9 páginas HTML + `dialogos.html`.
2. El drawer abre, la búsqueda transversal (`#drawerSearch`) devuelve resultados equivalentes a los de antes de la fase.
3. El buscador local de `diccionario.html` sigue funcionando de forma independiente.
4. El progreso guardado previamente (`localStorage` de una sesión anterior) se sigue leyendo sin `NaN`/`undefined` en las UI de progreso de cada módulo/unidad.
5. Ningún contenido (palabra, ejemplo, diálogo) desaparece de su ubicación original.
6. `alfabeto.html` (React) sigue registrando su índice de búsqueda manualmente si `azRegisterAllKnownSearchIndexes()` cambió de forma.

---

## Fase 1b — IDs estables en `data-azbuka2.js` (cierre de cabo suelto de Fase 0)

Riesgo 🟠 detectado en la Fase 0 y resuelto ahora, a pedido explícito, después de cerrar la Fase 2: los favoritos (★) de vocabulario de la Unidad 2 se guardaban como `'u2_'+moduleId+'_'+índice`, dependiente de la posición de la palabra dentro de `vocab[]` de cada módulo.

### Qué se hizo
- **`data-azbuka2.js`**: las 103 palabras de `MODULES2[].vocab` ahora traen un `id` literal y estable (`az2-001`…`az2-103`), congelado a partir del orden actual — igual criterio que Fase 1 (verbos/casos). `DIALOGUES2` no se tocó.
- **`azbuka-2.html`**: `words2()` y `mod2Practice()` ahora usan `w.id` directamente en vez de recalcular `moduleId+'_'+índice`.
- **Migración de datos (a diferencia de casos/verbos, acá sí hacía falta)**: se agregó `migrateFavsV1()`, que corre una sola vez en `init()`. Reconstruye la tabla `moduleId_índice → id nuevo` a partir de la estructura actual de `MODULES2` (la misma que generó las claves viejas) y convierte cada favorito guardado con el esquema viejo al nuevo formato. Claves que ya no correspondan a ninguna palabra existente se descartan sin romper nada. Es idempotente — en corridas posteriores no hace ningún cambio.

### Verificación aplicada
- `node --check` y validación de sintaxis de todos los `<script>` inline de `azbuka-2.html`.
- 103/103 ids únicos y coincidentes con el mapa de migración calculado.
- `diff` contra la versión de Fase 2: solo los cambios declarados (4 líneas de comentario + 2 líneas de lógica + el bloque de migración completo + su llamada en `init()`).
- Simulación con favoritos falsos en formato viejo (incluyendo una clave obsoleta a propósito): migración correcta, descarte seguro de la clave inválida, e idempotencia confirmada en una segunda corrida.

---

## Fase 2 — Centralización de diálogos de `dialogos.html`

### 2.1 Qué se hizo

- **`data-dialogos.js` (nuevo)**: contiene `DIALOGS` (30 diálogos, id explícito 1–30 preservado tal cual del original) y `VOCAB` (64 palabras/frases — el conteo real verificado es 64, no ~63 como se estimaba en la Fase 0) más `getAllDialogosWords()`. Se extrajo con un parser consciente de strings (no regex ingenuo) para no arriesgar corromper texto ruso con comillas/escapes al recortar el bloque original — se verificó carácter por carácter que el contenido resultante es idéntico al embebido en el `dialogos.html` original.
- **`dialogos.html`**: se eliminaron los bloques `const DIALOGS = [...]` y `const VOCAB = [...]` (antes embebidos dentro del `<script>` de la app) y se agregó `<script src="data-dialogos.js"></script>` antes de ese script. Verificado byte a byte: el resto del archivo (los dos bundles de React/ReactDOM y el componente `App` completo) quedó **idéntico**, sin ninguna alteración además de la extracción declarada.
- **`core.js`**: se agregó un bloque a `azRegisterAllKnownSearchIndexes()` que registra `VOCAB` (vocabulario objetivo de Diálogos) en `AZ_SEARCH_INDEX` cuando el dataset está cargado — mismo patrón que los 6 bloques existentes, sin tocar ninguno de ellos.
- **Las 9 páginas ya migradas** (`index.html`, `azbuka-index.html`, `azbuka-1.html`, `azbuka-2.html`, `azbuka-3.html`, `alfabeto.html`, `diccionario.html`, `verbos.html`, `casos.html`): se agregó `<script src="data-dialogos.js"></script>` justo después de `data-azbuka3.js` en cada una — es la única línea que cambió por archivo (verificado con `diff` uno por uno). Esto es lo que hace que el vocabulario de Diálogos ahora aparezca en el buscador del drawer (`#drawerSearch`) desde **cualquier** página de la app, no solo desde `dialogos.html`.

### 2.2 Criterio aplicado: vocabulario objetivo vs. incidental
Solo se indexa `VOCAB` (el glosario explícito del módulo). Las glosas palabra-por-palabra dentro de cada línea de diálogo (campo `w[]` de cada `line`) **no** se indexan — mismo criterio ya usado en `data-azbuka2.js`/`data-azbuka3.js`, documentado en el propio `data-dialogos.js`.

### 2.3 Qué NO se hizo (fuera del alcance declarado de esta fase)
- **No se le agregó id a `VOCAB`.** No hay ninguna persistencia atada a su posición (confirmado en Fase 0: `dialogos.html` no guarda progreso, todo es estado de React en memoria) y agregarlo ahora habría sido una decisión de modelado no pedida para esta fase. Queda anotado para cuando se aborde en Fase 4.
- **No se integró el drawer/bottom-nav/tema/`azInit()` a `dialogos.html`.** Ese archivo sigue siendo una app React aislada visualmente (sin drawer propio) — es una migración de UI, no de datos, y corresponde a un trabajo separado ya identificado en `CONTEXTO_PROYECTO.md` §10 ("`dialogos.html` — falta migrarlo: drawer, core.js/storage, safe-area"). Esta fase solo resolvió la parte de **datos** (extracción + búsqueda transversal), tal como estaba declarado en el plan.

### 2.4 Verificación aplicada
- Extracción con parser consciente de strings (no regex simple) para evitar cortes erróneos en textos con comillas.
- `DIALOGS.length === 30`, ids únicos y exactamente `1..30`.
- `VOCAB.length === 64`, `getAllDialogosWords().length === 64`.
- `node --check` sobre `data-dialogos.js` y `core.js`.
- Cada uno de los 10 archivos HTML tocados (`dialogos.html` + las 9 páginas) pasó un chequeo de sintaxis de **todos** sus bloques `<script>` inline (vía `new Function(code)`).
- Comparación byte a byte contra el original en los 10 HTML: en `dialogos.html` se confirmó que el único contenido alterado es exactamente la extracción declarada (dos bloques removidos + una línea de script + un comentario agregados); en las 9 páginas restantes, `diff` confirmó **una única línea agregada por archivo**, sin ningún otro cambio.

---

## Fase 3 — Centralizar diálogos inline de `azbuka-1.html`

### 3.1 Qué se hizo
- **`data-azbuka1.js` (nuevo)**: contiene `DIALOGUES1`, los 3 mini diálogos ("Saludo", "Presentarse", "Despedida") que antes vivían como `const DIALOGUES` embebido dentro del `<script>` de `azbuka-1.html`. Contenido copiado sin ninguna alteración de texto, transliteración ni traducción.
- **`azbuka-1.html`**: se eliminó el array `const DIALOGUES=[...]` inline, se agregó `<script src="data-azbuka1.js"></script>` al stack de datasets (después de `data-dialogos.js`), y la función `renderDialogos()` ahora referencia `DIALOGUES1` en vez de `DIALOGUES`. Ningún otro contenido del archivo se modificó.
- **Las 9 páginas restantes del stack estándar** (`index.html`, `azbuka-index.html`, `azbuka-2.html`, `azbuka-3.html`, `alfabeto.html`, `diccionario.html`, `verbos.html`, `casos.html`, `dialogos.html`): se agregó la misma línea `<script src="data-azbuka1.js"></script>` después de `data-dialogos.js`, por consistencia con el resto del stack — es la única línea que cambió por archivo (verificado con `diff` uno por uno).

### 3.2 Por qué no se registró en el buscador transversal
`DIALOGUES1` son líneas de diálogo de ejemplo/contexto, no una lista de vocabulario objetivo explícito con traducción palabra por palabra (a diferencia de `VOCAB` en `data-dialogos.js`, que sí se indexa). Mismo criterio ya aplicado a `DIALOGUES2` en `data-azbuka2.js`, que tampoco se indexa. El vocabulario objetivo real de la Unidad 1 (las 33 letras + sus palabras de ejemplo) ya está indexado vía `data-alphabet.js` desde antes de esta migración.

### 3.3 Riesgo de datos
Ninguno. Confirmado en Fase 0: no hay ninguna clave de `localStorage` atada a la posición ni al contenido de estos 3 diálogos — de hecho, `renderDialogos()` ni siquiera está conectado a ninguna pestaña de `U1S` hoy (es una función existente pero no enlazada a la navegación de la Unidad 1), así que este cambio es puramente de arquitectura de datos, sin efecto visible para el usuario todavía.

### 3.4 Verificación aplicada
- `node --check` sobre `data-azbuka1.js` → sintaxis válida.
- Validación de sintaxis de **todos** los bloques `<script>` inline de los 10 archivos HTML tocados (vía `node --check` por bloque).
- Ejecución real en DOM (jsdom + servidor HTTP local): las 10 páginas cargan sin errores (el único mensaje que aparece es el ya conocido `Not implemented: Window's scrollTo()`, propio de jsdom y sin equivalente en navegadores reales).
- Verificado dentro del contexto real de ejecución de `azbuka-1.html` que `DIALOGUES1` es un objeto con 3 entradas y que la primera es `"Saludo"` — descarta el falso negativo de comprobar `window.DIALOGUES1` desde afuera (los `const` de nivel superior no cuelgan de `window`, es comportamiento normal de JS, no un bug).
- `diff` contra la versión anterior de cada uno de los 10 archivos: confirma que el único cambio en las 9 páginas es la línea agregada, y que en `azbuka-1.html` el único cambio es exactamente el descrito en 3.1 (sin alteración de ningún otro contenido).

---

## Fix — Duplicados dentro del mismo módulo en el buscador transversal

Detectado por Manu al notar que "город" aparecía dos veces en resultados de búsqueda. Chequeo programático confirmó que era un patrón, no un caso aislado.

### Causa
Tres datasets tienen palabras que aparecen más de una vez **dentro de sí mismos** (por diseño pedagógico: "город" ilustra tanto la letra Г como la О; "спасибо" se enseña en el Módulo 1 y se repasa en el Módulo 6 de la Unidad 2; etc.). Sus funciones `getAll*Words()` aplanaban esas repeticiones sin deduplicar, y esa lista aplanada es justo la que alimenta el buscador transversal (`AZ_SEARCH_INDEX`) — resultado: la misma palabra, del mismo módulo, aparecía dos veces seguidas en cualquier búsqueda.

### Qué se arregló
- `data-alphabet.js` → `getAllAlphabetWords()`: 18 palabras deduplicadas.
- `data-diccionario.js` → `getAllDiccionarioWords()`: 7 palabras deduplicadas.
- `data-azbuka2.js` → `getAllAzbuka2Words()`: 3 palabras deduplicadas.

En los tres casos se conserva la primera aparición según el orden del dataset. **No se tocó ningún contenido pedagógico**: las tarjetas de cada letra en Alfabeto siguen mostrando la palabra completa como ejemplo, las categorías del Diccionario siguen teniendo sus palabras, los módulos de la Unidad 2 siguen enseñando su vocabulario — el cambio es exclusivamente en la lista aplanada que consume la búsqueda.

Las apariciones de una misma palabra en **módulos distintos** (ej. "аптека" en Diccionario, Casos, Alfabeto, Azbuka-3 y Diálogos a la vez) siguen mostrándose todas — eso es intencional y es justamente lo que la Fase 4 (léxico central) va a organizar mejor, no a eliminar.

### Verificación aplicada
- `node --check` sobre los 3 archivos.
- Ejecución real: `getAllAlphabetWords()`, `getAllDiccionarioWords()` y `getAllAzbuka2Words()` devuelven 0 duplicados internos tras el fix (antes: 18/7/3).
- Simulación de `azSearch()` real dentro de `index.html` vía jsdom: "город", "аптека" y "спасибо" ya no repiten resultados del mismo módulo.
- Las 10 páginas HTML del stack siguen cargando sin errores nuevos.

---

## Fase 4 — Preparación: correcciones y unificación regional (previas a `data-lexicon.js`)

Antes de construir la tabla de mapeo, se generó un informe programático de las 253 palabras rusas presentes en 2+ módulos (188 con traducción idéntica, 65 con alguna diferencia). Manu revisó los 65 casos con diferencia y resolvió tres bloques:

### A) Errores reales corregidos (no eran variantes, estaban mal traducidos)
- **говорить** (Diccionario, "Verbos esenciales"): "decir" → **"hablar / decir (proceso)"**. "Decir" es más propio de сказать; говорить es el proceso de hablar.
- **ребёнок** (Diccionario, "Familia"): "bebé" → **"niño/a, criatura, hijo/a"**. Bebé específicamente es младенец.
- **брать** (`data-verbos.js`, id 36): "tomar / coger" → **"tomar / agarrar"**. Se evita "coger" por su connotación vulgar en gran parte de Latinoamérica; también se corrigió el ejemplo asociado ("Coge un paraguas." → "Agarra un paraguas.").

### B) Variantes regionales — unificadas a español rioplatense como forma principal
Se confirmó que el proyecto usa rioplatense (vos/che) como registro canónico. Se puso la forma rioplatense primero, conservando la otra variante como secundaria donde ya existía:
- **банан**: "plátano" → **"banana / plátano"** (Diccionario); "plátano" → **"banana"** (Alfabeto, ejemplo de la letra Б). Casos ya decía "banana", sin cambios.
- **компьютер**: "ordenador" → **"computadora / ordenador"** (Diccionario). Casos/Azbuka-3 ya decían "computadora", sin cambios.
- **холодильник**: "nevera" → **"heladera / nevera"** (Diccionario); "refrigerador" → **"heladera / refrigerador"** (Casos). Azbuka-3 ya decía "heladera", sin cambios.

### C) Homónimo confirmado — no se fusiona
- **среда**: "miércoles" (Diccionario) y "entorno/ambiente" (Casos) son dos significados sin relación (como "banco" en español). Se van a modelar como **dos entradas separadas** en `data-lexicon.js`, no como una sola palabra con dos traducciones.

### Verificación aplicada
- `node --check` sobre los 4 archivos tocados (`data-diccionario.js`, `data-alphabet.js`, `data-casos.js`, `data-verbos.js`).
- Las 10 páginas HTML siguen cargando sin errores nuevos (jsdom + servidor local).
- Confirmado programáticamente que los 6 valores quedaron exactamente como se aprobó y que no queda ninguna otra aparición de "coger" en el proyecto.

**Próximo paso dentro de la Fase 4:** con las 188 coincidencias exactas + los 65 casos ya resueltos, construir `data-lexicon.js` (tabla `LEX-<tipo>-<id>` → `{ru, es, pos, gender, sources}`), referenciando los datasets existentes sin duplicarlos.

---

## Fase 4 (continuación) — Construcción de `data-lexicon.js`

### Qué se hizo
- **`data-lexicon.js` (nuevo)**: 254 identidades léxicas (`LEX-<tipo>-NNN`), una por cada palabra rusa que aparece en 2 o más módulos (253 palabras; "среда" se separó en 2 sentidos por Fase 4-C). Cada entrada tiene `{ru, es, pos, gender, sources}`, donde `sources` es un objeto `{módulo: {es, ref}}` — la traducción tal cual aparece en cada fuente original, más una referencia legible a su ubicación. Ningún `data-*.js` existente fue tocado ni duplicado: esto es una capa de mapeo por encima, no una fuente de datos nueva.
- **Clasificación gramatical (`pos`)**: heurística automática — infinitivo presente en `data-verbos.js` → `verbo`; forma masculina presente en `ADJECTIVES` de `data-azbuka3.js` → `adjetivo`; cualquier fuente con género (`m`/`f`/`n`) marcado → `sustantivo`; el resto → `otro` (pronombres, numerales, preguntas, saludos, frases fijas). Un solo caso necesitó corrección manual: **красный** (rojo) no traía género marcado en su única fuente (categoría "Colores" del Diccionario, que no anota género ahí) — se forzó a `adjetivo`.
- **Elección de traducción canónica (`es`)**: para las 188 coincidencias exactas no hubo nada que elegir. Para los 64 casos de matices menores restantes (tras resolver los 3 grupos A/B/C con Manu), se aplicó una prioridad automática por fuente (Diccionario > Casos > Azbuka-3 > Azbuka-2 > Verbos > Diálogos > Alfabeto) con limpieza de formato (sin "¿...?", primera letra en minúscula) — **sin perder ninguna traducción**: la de cada módulo sigue accesible en `sources`. Dos excepciones manuales donde combinar era más preciso que elegir una sola fuente:
  - **рука** → `"mano / brazo"` (el ruso no distingue mano de brazo; Diccionario decía solo "brazo", Alfabeto solo "mano" — ambas son correctas según contexto).
  - **это** → `"esto / eso"` (la prioridad automática iba a elegir una frase de uso específico de la Unidad 2 — "Este/esta es…" — en vez del significado base).
  - **хорошо** → `"bien / de acuerdo"` (mismo caso: cubre dos sentidos relacionados, no es un error de ningún módulo).
- **среда**: modelada como 2 entradas (`día de la semana` / `entorno, medio`), tal como se aprobó en Fase 4-C. Detalle técnico: Diccionario separa limpiamente los dos sentidos en filas distintas, pero Casos tiene una única fila con traducción combinada `"miércoles/entorno"` (su motor de declinación trabaja por palabra, no por sentido) — por eso Casos queda referenciado en **ambos** sentidos, mientras que Diccionario solo en el de "día de la semana".

### Qué NO se hizo (fuera de alcance de esta fase)
- Solo se generó una entrada léxica para palabras que aparecen en **2 o más** módulos. Las palabras que viven en un único módulo (la gran mayoría del vocabulario total de la app) no tienen entrada todavía — no había ninguna ambigüedad que resolver para ellas, y agregarlas ahora habría sido expandir el alcance sin necesidad real. Si hace falta cobertura completa más adelante (por ejemplo, para Fase 5), se puede extender.
- No se conectó `data-lexicon.js` a ninguna página ni al buscador todavía — eso corresponde a las Fases 6 (segunda capa de búsqueda) y 7 (integración de interfaz).
- No se tocó ningún `data-*.js` existente en este paso (los cambios de contenido de la Fase 4-A/B ya se habían aplicado y confirmado en el paso anterior).

### Verificación aplicada
- `node --check` sobre `data-lexicon.js` → sintaxis válida.
- 254 ids únicos, sin colisiones.
- Recorrido automático de las 254 entradas: ninguna con campos faltantes (`ru`/`es`/`pos`), ninguna con `sources` vacío, ningún valor de `gender` fuera de `m`/`f`/`n`/`null`.
- Caso "среда" verificado a mano: 2 entradas, sentidos correctos, fuentes correctas (Diccionario solo en "día de la semana", Casos en ambos).
- Ejecución real en jsdom: se cargó `data-lexicon.js` dentro de `index.html` ya inicializado — `LEXICON` tiene 254 claves, `lexById('LEX-verb-001')` resuelve "брать" correctamente, y `azSearch()` (el buscador existente) sigue funcionando exactamente igual, confirmando que la nueva capa no interfiere con nada de lo que ya funciona.



---

## Fase 5 — Relaciones pedagógicas (`introducedIn` / `appearsIn`)

### Qué se hizo
- **`data-lexicon.js`**: cada una de las 254 entradas ahora trae dos campos nuevos, derivados de `sources` sin ninguna comparación difusa (nada de análisis morfológico ni matching de texto libre — es un remapeo mecánico y literal):
  - **`introducedIn`**: array de números de unidad del curso (1-12) que enseñan esa palabra. Se deriva así: fuente `alfabeto` → Unidad 1, fuente `azbuka2` → Unidad 2, fuente `azbuka3` → Unidad 3. Puede tener más de un número — el curso recicla vocabulario a propósito (30 palabras están en más de una unidad, ej. "дом" se ve como ejemplo en el Alfabeto de la Unidad 1 y se retoma formalmente con género/plural en la Unidad 3).
  - **`appearsIn`**: array de herramientas independientes donde la palabra aparece — `diccionario`, `casos`, `verbos`, `dialogos`, `alfabeto`. Es intencional que `alfabeto` pueda figurar tanto en `appearsIn` como generar `introducedIn:[1]`: el mismo `data-alphabet.js` cumple dos roles distintos (se enseña en la Unidad 1 y también se puede consultar aparte en la herramienta Alfabeto), y las dos relaciones son independientes tal como se definió desde el inicio de esta migración.
- **`core.js`**: cada objeto de `AZ_UNITS` ahora trae `introducesLex: [...]` — la lista de ids de `data-lexicon.js` que esa unidad introduce (el inverso de `introducedIn`, agrupado por unidad en vez de por palabra). Unidad 1: 85 ids. Unidad 2: 24 ids. Unidad 3: 69 ids. Unidades 4-12: array vacío, porque esos archivos todavía no existen — se completarán a medida que se construyan.

### Por qué solo cubre Unidades 1, 2 y 3
`introducesLex`/`introducedIn` son sobre el **curso** (`AZ_UNITS`), no sobre los módulos independientes. Hoy solo existen `azbuka-1.html`, `azbuka-2.html` y `azbuka-3.html` con vocabulario objetivo real — no hay nada que enseñar en las unidades 4-12 todavía porque esos archivos no existen (ver `CONTEXTO_PROYECTO.md` §10). Esto no es una limitación de la migración, es simplemente el estado real del curso.

### Qué NO se hizo (fuera de alcance, por precisión)
No se intentó detectar apariciones **incidentales** de vocabulario dentro de las líneas de diálogo (`DIALOGUES1`, `DIALOGUES2`, ejemplos de `MODULES2`) para expandir `appearsIn`/`introducedIn`. Hacerlo bien requeriría un analizador morfológico real del ruso (para reconocer que "доме" en una frase es una forma declinada de "дом"), y una heurística de coincidencia de texto sin eso daría muchos falsos negativos (por la altísima flexión del ruso) y probablemente algunos falsos positivos. Se prefirió dejar esta relación con datos 100% confiables (derivados mecánicamente de qué dataset ya referencia cada palabra) antes que agregar cobertura aproximada. Si en el futuro se arma o integra un analizador morfológico, esto se puede retomar.

### Verificación aplicada
- `node --check` sobre `data-lexicon.js` y `core.js`.
- Las 254 entradas de `data-lexicon.js` recorridas programáticamente: `introducedIn` y `appearsIn` bien formados (arrays, sin duplicados, sin unidades fuera de 1-3).
- Ejecución real en jsdom: `index.html` renderiza igual que antes (5 tarjetas de herramientas, 18 filas de drawer — sin cambios); `azbuka-index.html` sigue mostrando las 12 unidades con sus títulos correctos; las 10 páginas HTML cargan sin errores nuevos.
- `diff` contra la versión anterior de `core.js`: el único bloque tocado es `AZ_UNITS` (se agregó el comentario explicativo y el campo `introducesLex` a cada unidad) — nada más en el archivo cambió.

---

---

## Fase 6 — Segunda capa de búsqueda basada en léxico central

### Qué se hizo
- **`core.js`**: se agregó `azSearchLexicon(query)`, una función completamente nueva y separada de `azSearch()`/`AZ_SEARCH_INDEX` — ninguna línea de código existente se tocó. Consulta `LEXICON` (de `data-lexicon.js`, si la página lo cargó) y devuelve **un resultado por identidad léxica**, con todas sus fuentes agrupadas adentro (`sources`), en vez de un resultado suelto por cada módulo — ej. buscar "аптека" da 5 filas con `azSearch()` (una por módulo) pero 1 sola fila con `azSearchLexicon()`, con las 5 fuentes visibles dentro de esa fila. Devuelve además `introducedIn`/`appearsIn` de cada palabra, listos para usarse en Fase 7.
- También se agregó `azLexiconEntry(id)`, un atajo de una línea sobre `lexById()` (ya expuesto por `data-lexicon.js`) pensado para cuando Fase 7 arme una ficha de detalle de palabra.
- **Las 10 páginas HTML del stack estándar**: se agregó `<script src="data-lexicon.js"></script>` después de `data-azbuka1.js` — es la única línea que cambió por archivo. Antes `data-lexicon.js` existía pero no se cargaba en ninguna página; ahora está disponible en todas, sin que nada lo use todavía visiblemente.

### Por qué es seguro
`azSearchLexicon()` no se llama desde ningún lado todavía — ni el buscador del drawer, ni el de `diccionario.html`, ni ningún otro. Es una función expuesta y lista, pero inerte hasta que la Fase 7 la conecte a algo visible. Si `data-lexicon.js` no estuviera cargado en alguna página (no debería pasar, pero por las dudas), la función devuelve `[]` en vez de tirar error (`typeof LEXICON === 'undefined'` como guarda).

### Verificación aplicada
- `node --check` sobre `core.js` y sobre los 10 archivos HTML tocados (todos sus `<script>` inline).
- Ejecución real en jsdom: las 10 páginas siguen cargando sin errores nuevos con `data-lexicon.js` sumado al stack.
- Comparación en vivo dentro de `index.html`: `azSearch("аптека")` sigue devolviendo 5 filas exactamente igual que antes (comportamiento intacto); `azSearchLexicon("аптека")` devuelve 1 fila agrupada con `sourceCount:5`. Mismo patrón verificado con "holodильник" (3→1) y "брать" (2→1). "среда" devuelve correctamente sus 2 sentidos por separado con `azSearchLexicon()`.
- `diff` contra la versión anterior: en `core.js` el único cambio es el bloque nuevo agregado al final (nada existente modificado); en las 10 páginas HTML, una única línea agregada por archivo.

---

## Estado de fases

| Fase | Descripción | Estado |
|---|---|---|
| 0 | Snapshot de referencia y superficie de riesgo | ✅ Completada |
| 1 | IDs estables (`data-verbos.js`, `data-casos.js`) | ✅ Completada |
| 2 | Centralizar diálogos de `dialogos.html` → `data-dialogos.js` | ✅ Completada |
| 3 | Centralizar diálogos inline de `azbuka-1.html` → `data-azbuka1.js` | ✅ Completada |
| 4 | Creación de `data-lexicon.js` | ✅ Completada |
| 5 | Relaciones pedagógicas (`introducedIn` / `appearsIn`) | ✅ Completada |
| 6 | Segunda capa de búsqueda basada en léxico central | ✅ Completada |
| 7 | Integración de interfaz | ⏳ Pendiente |
