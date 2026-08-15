# Migración a léxico central — Registro de fases

> Documento de seguimiento de la evolución arquitectónica de AZBUKA hacia un
> sistema de identidad léxica global y búsqueda transversal. Complementa a
> `CONTEXTO_PROYECTO.md` (que sigue siendo la fuente de verdad del estado
> *actual* de la app) — este archivo es el registro específico de **esta
> migración**: qué se hizo en cada fase, qué se verificó, y qué queda
> pendiente. Se actualiza al cerrar cada fase, nunca antes.

Última actualización: Fase 2 completada. Fase 3 no iniciada.

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

## Estado de fases

| Fase | Descripción | Estado |
|---|---|---|
| 0 | Snapshot de referencia y superficie de riesgo | ✅ Completada |
| 1 | IDs estables (`data-verbos.js`, `data-casos.js`) | ✅ Completada |
| 2 | Centralizar diálogos de `dialogos.html` → `data-dialogos.js` | ✅ Completada |
| 3 | Centralizar diálogos inline de `azbuka-1.html` | ⏳ Pendiente |
| 4 | Creación de `data-lexicon.js` | ⏳ Pendiente |
| 5 | Relaciones pedagógicas (`introducedIn` / `appearsIn`) | ⏳ Pendiente |
| 6 | Segunda capa de búsqueda basada en léxico central | ⏳ Pendiente |
| 7 | Integración de interfaz | ⏳ Pendiente |
