/* ============================================================
   DATA-LEXICON.JS — Léxico central (identidad cruzada entre módulos)
   Fase 4 (identidad léxica) y Fase 5 (relaciones pedagógicas) de la
   migración a léxico central — ver MIGRACION_LEXICO.md.

   Este archivo NO reemplaza a ningún data-*.js existente. Es una capa
   de mapeo por encima: agrupa las palabras rusas que aparecen en 2 o
   más módulos bajo una misma identidad léxica estable (LEX-<tipo>-NNN),
   sin duplicar ni modificar el contenido pedagógico original — cada
   entrada guarda una referencia liviana a dónde vive esa palabra en
   cada módulo (campo 'sources'), no una copia de todo su contenido.

   Alcance: SOLO las 254 identidades léxicas que aparecen en 2+ módulos
   (253 palabras rusas; 'среда' se separó en 2 sentidos — día de la
   semana vs. entorno/ambiente — por ser un homónimo real). Las
   palabras que viven en un único módulo no están acá: no había
   ninguna ambigüedad que resolver para ellas.

   pos: 'sustantivo' | 'verbo' | 'adjetivo' | 'otro' (pronombres,
     numerales, preguntas, saludos y frases fijas).
   gender: 'm' | 'f' | 'n' | null (solo sustantivos).
   sources: {módulo: {es, ref}} — traducción tal cual en ESE módulo +
     referencia legible a su ubicación (no un puntero funcional).

   introducedIn (Fase 5): array de números de unidad del CURSO (1-12)
     que enseñan esta palabra como vocabulario objetivo. Se deriva de
     'sources': alfabeto → Unidad 1, azbuka2 → Unidad 2, azbuka3 →
     Unidad 3. Array vacío = todavía no se enseña en ninguna unidad
     del curso (solo vive en herramientas independientes). Puede tener
     más de un número — el curso recicla vocabulario a propósito (ej.
     'дом' aparece como ejemplo en el Alfabeto de la Unidad 1 y se
     retoma formalmente en la Unidad 3 con género y plural).
     Unidades 4-12 no existen todavía, por eso nunca aparecen acá.

   appearsIn (Fase 5): array de herramientas INDEPENDIENTES (no
     unidades del curso) donde la palabra aparece — 'diccionario',
     'casos', 'verbos', 'dialogos', 'alfabeto'. 'alfabeto' puede
     figurar en appearsIn Y ADEMÁS causar introducedIn:[1] — son
     relaciones independientes a propósito (ninguna se infiere de la
     otra): el mismo dato de data-alphabet.js cumple dos roles, se
     enseña en la Unidad 1 Y se puede consultar aparte en la
     herramienta Alfabeto.

   Expone: LEXICON (objeto, clave = id LEX-<tipo>-NNN) y los helpers
   lexById(id) / lexByRu(ru) / lexByUnit(n) / lexByTool(name).
   ============================================================ */
const LEXICON = {
 "LEX-adj-001": {
  "ru": "большой",
  "es": "grande",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "grande",
    "ref": "letra Б"
   },
   "azbuka3": {
    "es": "grande",
    "ref": "Unidad 3 · adjetivo (id 1)"
   },
   "dialogos": {
    "es": "Grande",
    "ref": "Diálogos · Adjetivos"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos"
  ]
 },
 "LEX-adj-002": {
  "ru": "красивый",
  "es": "lindo / hermoso",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "azbuka3": {
    "es": "lindo / hermoso",
    "ref": "Unidad 3 · adjetivo (id 7)"
   },
   "dialogos": {
    "es": "Bonito / Hermoso",
    "ref": "Diálogos · Adjetivos"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-adj-003": {
  "ru": "красный",
  "es": "rojo",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "rojo",
    "ref": "letra Р"
   },
   "diccionario": {
    "es": "rojo",
    "ref": "Conceptos básicos / Colores"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-adj-004": {
  "ru": "маленький",
  "es": "pequeño",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "azbuka3": {
    "es": "pequeño",
    "ref": "Unidad 3 · adjetivo (id 2)"
   },
   "dialogos": {
    "es": "Pequeño",
    "ref": "Diálogos · Adjetivos"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-adj-005": {
  "ru": "новый",
  "es": "nuevo",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "nuevo",
    "ref": "letra Н"
   },
   "azbuka3": {
    "es": "nuevo",
    "ref": "Unidad 3 · adjetivo (id 3)"
   },
   "dialogos": {
    "es": "Nuevo",
    "ref": "Diálogos · Adjetivos"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos"
  ]
 },
 "LEX-adj-006": {
  "ru": "хороший",
  "es": "bueno",
  "pos": "adjetivo",
  "gender": null,
  "sources": {
   "azbuka3": {
    "es": "bueno",
    "ref": "Unidad 3 · adjetivo (id 5)"
   },
   "dialogos": {
    "es": "Bueno",
    "ref": "Diálogos · Adjetivos"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-otro-001": {
  "ru": "вчера",
  "es": "ayer",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "ayer",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "dialogos": {
    "es": "Ayer",
    "ref": "Diálogos · Tiempo"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-002": {
  "ru": "вы",
  "es": "vosotros / ustedes",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "vosotros / ustedes",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Usted / ustedes / vosotros",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Usted / Vosotros",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-003": {
  "ru": "Где?",
  "es": "dónde",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Dónde?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Dónde",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-004": {
  "ru": "Да",
  "es": "sí",
  "pos": "otro",
  "gender": null,
  "sources": {
   "azbuka2": {
    "es": "Sí",
    "ref": "Unidad 2 · Módulo 4 (Países y nacionalidades)"
   },
   "dialogos": {
    "es": "Sí",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-otro-005": {
  "ru": "два",
  "es": "dos",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "dos",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Dos",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-006": {
  "ru": "десять",
  "es": "diez",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "diez",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Diez",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-007": {
  "ru": "До свидания",
  "es": "hasta luego",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Hasta luego",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Adiós (formal)",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Hasta luego",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-008": {
  "ru": "Доброе утро",
  "es": "buenos días",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Buenos días",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Buenos días",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Buenos días",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-009": {
  "ru": "Добрый вечер",
  "es": "buenas noches",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Buenas noches",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Buenas noches (al llegar)",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Buenas tardes/noches",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-010": {
  "ru": "Добрый день",
  "es": "buenas tardes",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Buenas tardes",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Buenas tardes",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-otro-011": {
  "ru": "завтра",
  "es": "mañana",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "mañana",
    "ref": "letra З"
   },
   "diccionario": {
    "es": "mañana",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "dialogos": {
    "es": "Mañana",
    "ref": "Diálogos · Tiempo"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-012": {
  "ru": "Здравствуйте",
  "es": "hola (formal)",
  "pos": "otro",
  "gender": null,
  "sources": {
   "azbuka2": {
    "es": "Hola (formal)",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Hola (formal)",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-otro-013": {
  "ru": "Извините",
  "es": "disculpe",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Disculpe",
    "ref": "Conceptos básicos / Cortesía"
   },
   "azbuka2": {
    "es": "Disculpe / perdón",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Disculpe / Perdón",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-014": {
  "ru": "Как дела?",
  "es": "cómo estás",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Cómo estás?",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "¿Cómo estás?",
    "ref": "Unidad 2 · Módulo 6 (¿Cómo estás?)"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-otro-015": {
  "ru": "Как?",
  "es": "cómo",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Cómo?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Cómo",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-016": {
  "ru": "когда",
  "es": "cuándo",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "cuando",
    "ref": "letra К"
   },
   "diccionario": {
    "es": "¿Cuándo?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Cuándo",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-017": {
  "ru": "Конечно",
  "es": "por supuesto",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Por supuesto",
    "ref": "Conceptos básicos / Cortesía"
   },
   "dialogos": {
    "es": "Por supuesto",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-018": {
  "ru": "Кто?",
  "es": "quién",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Quién?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Quién",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-019": {
  "ru": "мы",
  "es": "nosotros",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "nosotros",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Nosotros/as",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Nosotros",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-020": {
  "ru": "нет",
  "es": "no",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "no",
    "ref": "letra Н"
   },
   "azbuka2": {
    "es": "No",
    "ref": "Unidad 2 · Módulo 4 (Países y nacionalidades)"
   },
   "dialogos": {
    "es": "No",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos"
  ]
 },
 "LEX-otro-021": {
  "ru": "один",
  "es": "uno",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "uno",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Uno",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-022": {
  "ru": "он",
  "es": "él",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "él",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Él",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Él",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-023": {
  "ru": "она",
  "es": "ella",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "ella",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Ella",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Ella",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-024": {
  "ru": "они",
  "es": "ellos",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "ellos",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Ellos/as",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Ellos / Ellas",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-025": {
  "ru": "плохо",
  "es": "mal",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "mal",
    "ref": "letra Х"
   },
   "azbuka2": {
    "es": "Mal",
    "ref": "Unidad 2 · Módulo 6 (¿Cómo estás?)"
   },
   "dialogos": {
    "es": "Mal",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos"
  ]
 },
 "LEX-otro-026": {
  "ru": "Пожалуйста",
  "es": "de nada",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Por favor",
    "ref": "Conceptos básicos / Cortesía"
   },
   "azbuka2": {
    "es": "Por favor / de nada",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Por favor / De nada",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-027": {
  "ru": "Пока",
  "es": "adiós",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Adiós",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Chau",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Chao",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-028": {
  "ru": "Почему?",
  "es": "por qué",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Por qué?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Por qué",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-029": {
  "ru": "Привет!",
  "es": "¡Hola!",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¡Hola!",
    "ref": "Conceptos básicos / Saludos y despedidas"
   },
   "azbuka2": {
    "es": "Hola (informal)",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Hola (informal)",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-030": {
  "ru": "пять",
  "es": "cinco",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "cinco",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Cinco",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-031": {
  "ru": "сегодня",
  "es": "hoy",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "hoy",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "dialogos": {
    "es": "Hoy",
    "ref": "Diálogos · Tiempo"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-032": {
  "ru": "Сколько?",
  "es": "cuánto",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Cuánto?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Cuánto",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-033": {
  "ru": "Спасибо",
  "es": "gracias",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "Gracias",
    "ref": "Conceptos básicos / Cortesía"
   },
   "azbuka2": {
    "es": "Gracias",
    "ref": "Unidad 2 · Módulo 6 (¿Cómo estás?)"
   },
   "dialogos": {
    "es": "Gracias",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-034": {
  "ru": "Спокойной ночи",
  "es": "buenas noches (al despedirse)",
  "pos": "otro",
  "gender": null,
  "sources": {
   "azbuka2": {
    "es": "Buenas noches (al despedirse)",
    "ref": "Unidad 2 · Módulo 1 (Saludos)"
   },
   "dialogos": {
    "es": "Buenas noches (al dormir)",
    "ref": "Diálogos · Saludos"
   }
  },
  "introducedIn": [
   2
  ],
  "appearsIn": [
   "dialogos"
  ]
 },
 "LEX-otro-035": {
  "ru": "сто",
  "es": "cien",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "cien",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Cien",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-036": {
  "ru": "три",
  "es": "tres",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "tres",
    "ref": "letra Т"
   },
   "diccionario": {
    "es": "tres",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Tres",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-037": {
  "ru": "ты",
  "es": "tú",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "tú",
    "ref": "letra Ы"
   },
   "diccionario": {
    "es": "tú",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Tú / vos (informal)",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Tú",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-038": {
  "ru": "холодно",
  "es": "frío",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "hace frío",
    "ref": "letra Х"
   },
   "diccionario": {
    "es": "frío",
    "ref": "Naturaleza / Tiempo meteorológico"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-otro-039": {
  "ru": "хорошо",
  "es": "bien / de acuerdo",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "bien",
    "ref": "letra Ш"
   },
   "diccionario": {
    "es": "De acuerdo",
    "ref": "Conceptos básicos / Cortesía"
   },
   "azbuka2": {
    "es": "Bien",
    "ref": "Unidad 2 · Módulo 6 (¿Cómo estás?)"
   },
   "dialogos": {
    "es": "Bien / De acuerdo",
    "ref": "Diálogos · Básico"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-040": {
  "ru": "четыре",
  "es": "cuatro",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "cuatro",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "dialogos": {
    "es": "Cuatro",
    "ref": "Diálogos · Números"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-041": {
  "ru": "Что?",
  "es": "qué",
  "pos": "otro",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "¿Qué?",
    "ref": "Conceptos básicos / Preguntas básicas"
   },
   "dialogos": {
    "es": "Qué",
    "ref": "Diálogos · Preguntas"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-otro-042": {
  "ru": "это",
  "es": "esto / eso",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "esto / eso",
    "ref": "letra Э"
   },
   "azbuka2": {
    "es": "Es…",
    "ref": "Unidad 2 · Módulo 3 (Preguntar nombres)"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto"
  ]
 },
 "LEX-otro-043": {
  "ru": "я",
  "es": "yo",
  "pos": "otro",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "yo",
    "ref": "letra Я"
   },
   "diccionario": {
    "es": "yo",
    "ref": "Conceptos básicos / Pronombres"
   },
   "azbuka2": {
    "es": "Yo",
    "ref": "Unidad 2 · Módulo 7 (Pronombres personales)"
   },
   "dialogos": {
    "es": "Yo",
    "ref": "Diálogos · Pronombres"
   }
  },
  "introducedIn": [
   1,
   2
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-001": {
  "ru": "август",
  "es": "agosto",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "agosto",
    "ref": "letra А"
   },
   "diccionario": {
    "es": "agosto",
    "ref": "Conceptos básicos / Meses y estaciones"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-002": {
  "ru": "автобус",
  "es": "autobús",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "autobús",
    "ref": "La ciudad / Transporte"
   },
   "casos": {
    "es": "autobús",
    "ref": "id cs015"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-003": {
  "ru": "апельсин",
  "es": "naranja",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "naranja",
    "ref": "Alimentación / Frutas"
   },
   "casos": {
    "es": "naranja",
    "ref": "id cs066"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-004": {
  "ru": "апрель",
  "es": "abril",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "abril",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "abril",
    "ref": "id cs130"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-005": {
  "ru": "аптека",
  "es": "farmacia",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "farmacia",
    "ref": "letra А"
   },
   "diccionario": {
    "es": "farmacia",
    "ref": "Salud / En el médico"
   },
   "casos": {
    "es": "farmacia",
    "ref": "id cs180"
   },
   "azbuka3": {
    "es": "farmacia",
    "ref": "Unidad 3 · sustantivo (id 45)"
   },
   "dialogos": {
    "es": "Farmacia",
    "ref": "Diálogos · Lugares"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-006": {
  "ru": "арбуз",
  "es": "sandía",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "sandía",
    "ref": "letra А"
   },
   "diccionario": {
    "es": "sandía",
    "ref": "Alimentación / Frutas"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-007": {
  "ru": "аэропорт",
  "es": "aeropuerto",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "aeropuerto",
    "ref": "La ciudad / Transporte"
   },
   "casos": {
    "es": "aeropuerto",
    "ref": "id cs037"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-008": {
  "ru": "бабушка",
  "es": "abuela",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "abuela",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "abuela",
    "ref": "id cs219"
   },
   "azbuka3": {
    "es": "abuela",
    "ref": "Unidad 3 · sustantivo (id 12)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-009": {
  "ru": "банан",
  "es": "banana / plátano",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "banana",
    "ref": "letra Б"
   },
   "diccionario": {
    "es": "banana / plátano",
    "ref": "Alimentación / Frutas"
   },
   "casos": {
    "es": "banana",
    "ref": "id cs065"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-010": {
  "ru": "банк",
  "es": "banco",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "banco",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "banco",
    "ref": "id cs007"
   },
   "azbuka3": {
    "es": "banco",
    "ref": "Unidad 3 · sustantivo (id 38)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-011": {
  "ru": "библиотека",
  "es": "biblioteca",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "biblioteca",
    "ref": "letra Б"
   },
   "diccionario": {
    "es": "biblioteca",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "biblioteca",
    "ref": "id cs178"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-012": {
  "ru": "билет",
  "es": "billete",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "billete / boleto",
    "ref": "Viajes / En el aeropuerto"
   },
   "casos": {
    "es": "boleto/entrada",
    "ref": "id cs013"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-013": {
  "ru": "болезнь",
  "es": "enfermedad",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "enfermedad",
    "ref": "Salud / En el médico"
   },
   "casos": {
    "es": "enfermedad",
    "ref": "id cs270"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-014": {
  "ru": "боль",
  "es": "dolor",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "dolor",
    "ref": "Salud / En el médico"
   },
   "casos": {
    "es": "dolor",
    "ref": "id cs256"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-015": {
  "ru": "больница",
  "es": "hospital",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "hospital",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "hospital",
    "ref": "id cs179"
   },
   "azbuka3": {
    "es": "hospital",
    "ref": "Unidad 3 · sustantivo (id 46)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-016": {
  "ru": "брат",
  "es": "hermano",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "hermano",
    "ref": "letra Б"
   },
   "diccionario": {
    "es": "hermano",
    "ref": "La persona / Familia"
   },
   "azbuka3": {
    "es": "hermano",
    "ref": "Unidad 3 · sustantivo (id 7)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-017": {
  "ru": "весна",
  "es": "primavera",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "primavera",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "primavera",
    "ref": "id cs184"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-018": {
  "ru": "ветер",
  "es": "viento",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "viento",
    "ref": "Naturaleza / Tiempo meteorológico"
   },
   "casos": {
    "es": "viento",
    "ref": "id cs349"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-019": {
  "ru": "вино",
  "es": "vino",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "vino",
    "ref": "Alimentación / Bebidas"
   },
   "casos": {
    "es": "vino",
    "ref": "id cs292"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-020": {
  "ru": "вода",
  "es": "agua",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "agua",
    "ref": "letra В"
   },
   "diccionario": {
    "es": "agua",
    "ref": "Alimentación / Bebidas"
   },
   "casos": {
    "es": "agua",
    "ref": "id cs171"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-021": {
  "ru": "водитель",
  "es": "conductor/a",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "conductor/a",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "conductor",
    "ref": "id cs134"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-022": {
  "ru": "вокзал",
  "es": "estación",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "estación",
    "ref": "La ciudad / Transporte"
   },
   "casos": {
    "es": "estación de tren",
    "ref": "id cs036"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-023": {
  "ru": "волк",
  "es": "lobo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "lobo",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "lobo",
    "ref": "id cs101"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-024": {
  "ru": "воскресенье",
  "es": "domingo",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "domingo",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "casos": {
    "es": "domingo",
    "ref": "id cs320"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-025": {
  "ru": "врач",
  "es": "médico",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "médico",
    "ref": "letra В"
   },
   "diccionario": {
    "es": "médico",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "médico",
    "ref": "id cs371"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-026": {
  "ru": "газета",
  "es": "periódico",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "periódico",
    "ref": "letra З"
   },
   "casos": {
    "es": "periódico",
    "ref": "id cs159"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-027": {
  "ru": "голос",
  "es": "voz",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "voz",
    "ref": "letra Г"
   },
   "casos": {
    "es": "voz",
    "ref": "id cs055"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-028": {
  "ru": "гора",
  "es": "montaña",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "montaña",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "montaña",
    "ref": "id cs174"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-029": {
  "ru": "город",
  "es": "ciudad",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "ciudad",
    "ref": "letra О"
   },
   "casos": {
    "es": "ciudad",
    "ref": "id cs003"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-030": {
  "ru": "дверь",
  "es": "puerta",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "puerta",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "puerta",
    "ref": "id cs251"
   },
   "azbuka3": {
    "es": "puerta",
    "ref": "Unidad 3 · sustantivo (id 26)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-031": {
  "ru": "дедушка",
  "es": "abuelo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "abuelo",
    "ref": "La persona / Familia"
   },
   "azbuka3": {
    "es": "abuelo",
    "ref": "Unidad 3 · sustantivo (id 11)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-sust-032": {
  "ru": "день",
  "es": "día",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "día",
    "ref": "letra Ь"
   },
   "casos": {
    "es": "día",
    "ref": "id cs346"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-033": {
  "ru": "диван",
  "es": "sofá",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "sofá",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "sofá",
    "ref": "id cs071"
   },
   "azbuka3": {
    "es": "sofá",
    "ref": "Unidad 3 · sustantivo (id 30)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-034": {
  "ru": "дом",
  "es": "casa",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "casa",
    "ref": "letra Д"
   },
   "diccionario": {
    "es": "casa",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "casa",
    "ref": "id cs002"
   },
   "azbuka3": {
    "es": "casa",
    "ref": "Unidad 3 · sustantivo (id 21)"
   },
   "dialogos": {
    "es": "Casa / Edificio",
    "ref": "Diálogos · Lugares"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-035": {
  "ru": "дорога",
  "es": "camino",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "camino",
    "ref": "letra Д"
   },
   "casos": {
    "es": "camino",
    "ref": "id cs176"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-036": {
  "ru": "дочь",
  "es": "hija",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "hija",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "hija",
    "ref": "id cs380"
   },
   "azbuka3": {
    "es": "hija",
    "ref": "Unidad 3 · sustantivo (id 16)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-037": {
  "ru": "друг",
  "es": "amigo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "amigo",
    "ref": "letra Д"
   },
   "azbuka3": {
    "es": "amigo",
    "ref": "Unidad 3 · sustantivo (id 4)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto"
  ]
 },
 "LEX-sust-038": {
  "ru": "дядя",
  "es": "tío",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "tío",
    "ref": "La persona / Familia"
   },
   "azbuka3": {
    "es": "tío",
    "ref": "Unidad 3 · sustantivo (id 13)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-sust-039": {
  "ru": "ёж",
  "es": "erizo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "erizo",
    "ref": "letra Ё"
   },
   "casos": {
    "es": "erizo",
    "ref": "id cs375"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-040": {
  "ru": "женщина",
  "es": "mujer",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "mujer",
    "ref": "id cs221"
   },
   "azbuka3": {
    "es": "mujer",
    "ref": "Unidad 3 · sustantivo (id 2)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-041": {
  "ru": "жизнь",
  "es": "vida",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "vida",
    "ref": "letra Ж"
   },
   "casos": {
    "es": "vida",
    "ref": "id cs259"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-042": {
  "ru": "журнал",
  "es": "revista",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "revista",
    "ref": "letra Ю"
   },
   "casos": {
    "es": "revista",
    "ref": "id cs040"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-043": {
  "ru": "журналист",
  "es": "periodista",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "periodista",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "periodista",
    "ref": "id cs090"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-044": {
  "ru": "зарплата",
  "es": "sueldo",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "sueldo",
    "ref": "Trabajo / En el trabajo"
   },
   "casos": {
    "es": "salario",
    "ref": "id cs201"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-045": {
  "ru": "здание",
  "es": "edificio",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "edificio",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "edificio",
    "ref": "id cs315"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-046": {
  "ru": "земля",
  "es": "tierra",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "tierra",
    "ref": "letra Я"
   },
   "diccionario": {
    "es": "tierra",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "tierra",
    "ref": "id cs231"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-047": {
  "ru": "зеркало",
  "es": "espejo",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "casos": {
    "es": "espejo",
    "ref": "id cs295"
   },
   "azbuka3": {
    "es": "espejo",
    "ref": "Unidad 3 · sustantivo (id 34)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-048": {
  "ru": "зима",
  "es": "invierno",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "invierno",
    "ref": "letra З"
   },
   "diccionario": {
    "es": "invierno",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "invierno",
    "ref": "id cs185"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-049": {
  "ru": "имя",
  "es": "nombre (de pila)",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "nombre",
    "ref": "letra И"
   },
   "casos": {
    "es": "nombre (de pila)",
    "ref": "id cs377"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-050": {
  "ru": "инженер",
  "es": "ingeniero/a",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "ingeniero/a",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "ingeniero",
    "ref": "id cs089"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-051": {
  "ru": "карандаш",
  "es": "lápiz",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "lápiz",
    "ref": "id cs074"
   },
   "azbuka3": {
    "es": "lápiz",
    "ref": "Unidad 3 · sustantivo (id 60)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-052": {
  "ru": "карта",
  "es": "mapa",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "mapa",
    "ref": "Viajes / Turismo"
   },
   "casos": {
    "es": "mapa",
    "ref": "id cs194"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-053": {
  "ru": "картофель",
  "es": "patata",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "patata",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "patata",
    "ref": "id cs129"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-054": {
  "ru": "квартира",
  "es": "piso / apartamento",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "piso / apartamento",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "apartamento",
    "ref": "id cs177"
   },
   "azbuka3": {
    "es": "departamento",
    "ref": "Unidad 3 · sustantivo (id 22)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-055": {
  "ru": "ключ",
  "es": "llave",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "llave",
    "ref": "Viajes / Alojamiento"
   },
   "azbuka3": {
    "es": "llave",
    "ref": "Unidad 3 · sustantivo (id 56)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-sust-056": {
  "ru": "книга",
  "es": "libro",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "libro",
    "ref": "letra К"
   },
   "casos": {
    "es": "libro",
    "ref": "id cs158"
   },
   "azbuka3": {
    "es": "libro",
    "ref": "Unidad 3 · sustantivo (id 53)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-057": {
  "ru": "ковёр",
  "es": "alfombra",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "alfombra",
    "ref": "id cs070"
   },
   "azbuka3": {
    "es": "alfombra",
    "ref": "Unidad 3 · sustantivo (id 32)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-058": {
  "ru": "комната",
  "es": "habitación",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "habitación",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "habitación",
    "ref": "id cs160"
   },
   "azbuka3": {
    "es": "habitación",
    "ref": "Unidad 3 · sustantivo (id 23)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-059": {
  "ru": "компания",
  "es": "empresa",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "empresa",
    "ref": "Trabajo / En el trabajo"
   },
   "casos": {
    "es": "compañía",
    "ref": "id cs240"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-060": {
  "ru": "компьютер",
  "es": "computadora / ordenador",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "computadora / ordenador",
    "ref": "Trabajo / En el trabajo"
   },
   "casos": {
    "es": "computadora",
    "ref": "id cs018"
   },
   "azbuka3": {
    "es": "computadora",
    "ref": "Unidad 3 · sustantivo (id 52)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-061": {
  "ru": "корова",
  "es": "vaca",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "vaca",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "vaca",
    "ref": "id cs227"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-062": {
  "ru": "кот",
  "es": "gato",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "gato",
    "ref": "letra К"
   },
   "diccionario": {
    "es": "gato",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "gato",
    "ref": "id cs098"
   },
   "azbuka3": {
    "es": "gato",
    "ref": "Unidad 3 · sustantivo (id 65)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-063": {
  "ru": "кофе",
  "es": "café",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "café",
    "ref": "letra Ф"
   },
   "diccionario": {
    "es": "café",
    "ref": "Alimentación / Bebidas"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-064": {
  "ru": "кошка",
  "es": "gata",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "gata",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "gato (f)",
    "ref": "id cs226"
   },
   "azbuka3": {
    "es": "gata",
    "ref": "Unidad 3 · sustantivo (id 66)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-065": {
  "ru": "кровать",
  "es": "cama",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "cama",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "cama",
    "ref": "id cs252"
   },
   "azbuka3": {
    "es": "cama",
    "ref": "Unidad 3 · sustantivo (id 29)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-066": {
  "ru": "кролик",
  "es": "conejo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "conejo",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "conejo",
    "ref": "id cs108"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-067": {
  "ru": "кухня",
  "es": "cocina",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "cocina",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "cocina",
    "ref": "id cs229"
   },
   "azbuka3": {
    "es": "cocina",
    "ref": "Unidad 3 · sustantivo (id 24)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-068": {
  "ru": "лес",
  "es": "bosque",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "bosque",
    "ref": "letra Л"
   },
   "diccionario": {
    "es": "bosque",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "bosque",
    "ref": "id cs033"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-069": {
  "ru": "лето",
  "es": "verano",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "verano",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "verano",
    "ref": "id cs291"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-070": {
  "ru": "лимон",
  "es": "limón",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "limón",
    "ref": "Alimentación / Frutas"
   },
   "casos": {
    "es": "limón",
    "ref": "id cs068"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-071": {
  "ru": "лицо",
  "es": "cara",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "cara",
    "ref": "La persona / Cuerpo"
   },
   "casos": {
    "es": "cara/rostro",
    "ref": "id cs309"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-072": {
  "ru": "лошадь",
  "es": "caballo",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "caballo",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "caballo (yegua)",
    "ref": "id cs279"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-073": {
  "ru": "луна",
  "es": "luna",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "luna",
    "ref": "letra Л"
   },
   "diccionario": {
    "es": "luna",
    "ref": "Naturaleza / Geografía y paisaje"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-074": {
  "ru": "любовь",
  "es": "amor",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "amor",
    "ref": "letra Ю"
   },
   "casos": {
    "es": "amor",
    "ref": "id cs381"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-075": {
  "ru": "магазин",
  "es": "tienda",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "tienda",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "tienda",
    "ref": "id cs016"
   },
   "azbuka3": {
    "es": "tienda",
    "ref": "Unidad 3 · sustantivo (id 37)"
   },
   "dialogos": {
    "es": "Tienda",
    "ref": "Diálogos · Lugares"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-076": {
  "ru": "мама",
  "es": "mamá",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "mamá",
    "ref": "letra М"
   },
   "casos": {
    "es": "mamá",
    "ref": "id cs216"
   },
   "azbuka3": {
    "es": "mamá",
    "ref": "Unidad 3 · sustantivo (id 10)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-077": {
  "ru": "масло",
  "es": "mantequilla",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "mantequilla",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "mantequilla/aceite",
    "ref": "id cs282"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-078": {
  "ru": "мать",
  "es": "madre",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "madre",
    "ref": "letra Ь"
   },
   "diccionario": {
    "es": "madre",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "madre",
    "ref": "id cs379"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-079": {
  "ru": "машина",
  "es": "coche / carro",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "coche",
    "ref": "letra Ш"
   },
   "diccionario": {
    "es": "coche / carro",
    "ref": "La ciudad / Transporte"
   },
   "casos": {
    "es": "coche",
    "ref": "id cs161"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-080": {
  "ru": "медведь",
  "es": "oso",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "oso",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "oso",
    "ref": "id cs140"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-081": {
  "ru": "место",
  "es": "lugar",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "casos": {
    "es": "lugar",
    "ref": "id cs289"
   },
   "azbuka3": {
    "es": "lugar",
    "ref": "Unidad 3 · sustantivo (id 63)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-082": {
  "ru": "метро",
  "es": "metro",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "metro",
    "ref": "letra М"
   },
   "diccionario": {
    "es": "metro",
    "ref": "La ciudad / Transporte"
   },
   "azbuka3": {
    "es": "metro (subte)",
    "ref": "Unidad 3 · sustantivo (id 39)"
   },
   "dialogos": {
    "es": "Metro",
    "ref": "Diálogos · Lugares"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-083": {
  "ru": "молоко",
  "es": "leche",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "leche",
    "ref": "letra О"
   },
   "diccionario": {
    "es": "leche",
    "ref": "Alimentación / Bebidas"
   },
   "casos": {
    "es": "leche",
    "ref": "id cs280"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-084": {
  "ru": "море",
  "es": "mar",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "mar",
    "ref": "letra М"
   },
   "diccionario": {
    "es": "mar",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "mar",
    "ref": "id cs342"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-085": {
  "ru": "муж",
  "es": "marido / esposo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "marido",
    "ref": "letra Ж"
   },
   "diccionario": {
    "es": "marido / esposo",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "esposo",
    "ref": "id cs370"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-086": {
  "ru": "музей",
  "es": "museo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "museo",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "museo",
    "ref": "id cs145"
   },
   "azbuka3": {
    "es": "museo",
    "ref": "Unidad 3 · sustantivo (id 47)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-087": {
  "ru": "музыка",
  "es": "música",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "música",
    "ref": "letra М"
   },
   "casos": {
    "es": "música",
    "ref": "id cs168"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-088": {
  "ru": "мыло",
  "es": "jabón",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "jabón",
    "ref": "letra Ы"
   },
   "casos": {
    "es": "jabón",
    "ref": "id cs294"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-089": {
  "ru": "мясо",
  "es": "carne",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "carne",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "carne",
    "ref": "id cs281"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-090": {
  "ru": "начальник",
  "es": "jefe / jefa",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "jefe / jefa",
    "ref": "Trabajo / En el trabajo"
   },
   "casos": {
    "es": "jefe",
    "ref": "id cs088"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-091": {
  "ru": "небо",
  "es": "cielo",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "cielo",
    "ref": "letra Н"
   },
   "diccionario": {
    "es": "cielo",
    "ref": "Naturaleza / Geografía y paisaje"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-092": {
  "ru": "неделя",
  "es": "semana",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "semana",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "casos": {
    "es": "semana",
    "ref": "id cs228"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-093": {
  "ru": "ноль",
  "es": "cero",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "cero",
    "ref": "Conceptos básicos / Números (0–20)"
   },
   "casos": {
    "es": "cero",
    "ref": "id cs128"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-094": {
  "ru": "номер",
  "es": "habitación",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "habitación",
    "ref": "Viajes / Alojamiento"
   },
   "casos": {
    "es": "número",
    "ref": "id cs062"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-095": {
  "ru": "ночь",
  "es": "noche",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "noche",
    "ref": "letra Ч"
   },
   "casos": {
    "es": "noche",
    "ref": "id cs250"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-096": {
  "ru": "озеро",
  "es": "lago",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "lago",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "lago",
    "ref": "id cs286"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-097": {
  "ru": "океан",
  "es": "océano",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "océano",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "océano",
    "ref": "id cs035"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-098": {
  "ru": "окно",
  "es": "ventana",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "ventana",
    "ref": "letra О"
   },
   "diccionario": {
    "es": "ventana",
    "ref": "La ciudad / En casa"
   },
   "azbuka3": {
    "es": "ventana",
    "ref": "Unidad 3 · sustantivo (id 25)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-099": {
  "ru": "осень",
  "es": "otoño",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "otoño",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "otoño",
    "ref": "id cs271"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-100": {
  "ru": "остров",
  "es": "isla",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "isla",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "isla",
    "ref": "id cs034"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-101": {
  "ru": "отец",
  "es": "padre",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "padre",
    "ref": "letra Ц"
   },
   "diccionario": {
    "es": "padre",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "padre",
    "ref": "id cs347"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-102": {
  "ru": "палец",
  "es": "dedo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "dedo",
    "ref": "La persona / Cuerpo"
   },
   "casos": {
    "es": "dedo",
    "ref": "id cs354"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-103": {
  "ru": "папа",
  "es": "papá",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "papá",
    "ref": "letra П"
   },
   "azbuka3": {
    "es": "papá",
    "ref": "Unidad 3 · sustantivo (id 9)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto"
  ]
 },
 "LEX-sust-104": {
  "ru": "парк",
  "es": "parque",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "parque",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "parque",
    "ref": "id cs008"
   },
   "azbuka3": {
    "es": "parque",
    "ref": "Unidad 3 · sustantivo (id 42)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-105": {
  "ru": "паспорт",
  "es": "pasaporte",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "pasaporte",
    "ref": "Viajes / En el aeropuerto"
   },
   "casos": {
    "es": "pasaporte",
    "ref": "id cs038"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-106": {
  "ru": "пиво",
  "es": "cerveza",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "cerveza",
    "ref": "Alimentación / Bebidas"
   },
   "casos": {
    "es": "cerveza",
    "ref": "id cs293"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-107": {
  "ru": "письмо",
  "es": "carta",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "carta",
    "ref": "letra Ь"
   },
   "azbuka3": {
    "es": "carta",
    "ref": "Unidad 3 · sustantivo (id 61)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto"
  ]
 },
 "LEX-sust-108": {
  "ru": "платье",
  "es": "vestido",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "vestido",
    "ref": "La persona / Ropa"
   },
   "casos": {
    "es": "vestido",
    "ref": "id cs322"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-109": {
  "ru": "площадь",
  "es": "plaza",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "plaza",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "plaza",
    "ref": "id cs254"
   },
   "azbuka3": {
    "es": "plaza",
    "ref": "Unidad 3 · sustantivo (id 50)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-110": {
  "ru": "повар",
  "es": "cocinero/a",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "cocinero/a",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "cocinero",
    "ref": "id cs117"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-111": {
  "ru": "подруга",
  "es": "amiga",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "amiga",
    "ref": "id cs218"
   },
   "azbuka3": {
    "es": "amiga",
    "ref": "Unidad 3 · sustantivo (id 5)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-112": {
  "ru": "подъезд",
  "es": "portal/entrada",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "entrada (edificio)",
    "ref": "letra Ъ"
   },
   "casos": {
    "es": "portal/entrada",
    "ref": "id cs084"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-113": {
  "ru": "поезд",
  "es": "tren",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "tren",
    "ref": "La ciudad / Transporte"
   },
   "casos": {
    "es": "tren",
    "ref": "id cs014"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-114": {
  "ru": "пол",
  "es": "suelo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "suelo",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "piso/suelo",
    "ref": "id cs030"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-115": {
  "ru": "поле",
  "es": "campo",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "campo",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "campo",
    "ref": "id cs341"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-116": {
  "ru": "помидор",
  "es": "tomate",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "tomate",
    "ref": "Alimentación / Verduras"
   },
   "casos": {
    "es": "tomate",
    "ref": "id cs067"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-117": {
  "ru": "помощь",
  "es": "ayuda",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "ayuda",
    "ref": "letra П"
   },
   "casos": {
    "es": "ayuda",
    "ref": "id cs262"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-118": {
  "ru": "птица",
  "es": "pájaro",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "pájaro",
    "ref": "letra Ц"
   },
   "diccionario": {
    "es": "pájaro",
    "ref": "Naturaleza / Animales"
   },
   "azbuka3": {
    "es": "pájaro",
    "ref": "Unidad 3 · sustantivo (id 68)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-119": {
  "ru": "работа",
  "es": "trabajo",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "trabajo",
    "ref": "letra Р"
   },
   "casos": {
    "es": "trabajo",
    "ref": "id cs162"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-120": {
  "ru": "район",
  "es": "barrio",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "barrio",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "barrio",
    "ref": "id cs064"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-121": {
  "ru": "ребёнок",
  "es": "niño/a, criatura, hijo/a",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "niño/a, criatura, hijo/a",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "niño/a",
    "ref": "id cs348"
   },
   "azbuka3": {
    "es": "niño / niña",
    "ref": "Unidad 3 · sustantivo (id 3)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-122": {
  "ru": "река",
  "es": "río",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "río",
    "ref": "letra Р"
   },
   "diccionario": {
    "es": "río",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "río",
    "ref": "id cs175"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-123": {
  "ru": "ресторан",
  "es": "restaurante",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "restaurante",
    "ref": "Alimentación / En el restaurante"
   },
   "azbuka3": {
    "es": "restaurante",
    "ref": "Unidad 3 · sustantivo (id 43)"
   },
   "dialogos": {
    "es": "Restaurante",
    "ref": "Diálogos · Lugares"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "dialogos",
   "diccionario"
  ]
 },
 "LEX-sust-124": {
  "ru": "рис",
  "es": "arroz",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "arroz",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "arroz",
    "ref": "id cs069"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-125": {
  "ru": "рубашка",
  "es": "camisa",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "camisa",
    "ref": "La persona / Ropa"
   },
   "casos": {
    "es": "camisa",
    "ref": "id cs199"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-126": {
  "ru": "рука",
  "es": "mano / brazo",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "mano",
    "ref": "letra У"
   },
   "diccionario": {
    "es": "brazo",
    "ref": "La persona / Cuerpo"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-127": {
  "ru": "рыба",
  "es": "pescado",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "pez",
    "ref": "letra Ы"
   },
   "diccionario": {
    "es": "pez",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "pez/pescado",
    "ref": "id cs173"
   },
   "azbuka3": {
    "es": "pez",
    "ref": "Unidad 3 · sustantivo (id 69)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-128": {
  "ru": "рынок",
  "es": "mercado",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "mercado",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "mercado",
    "ref": "id cs079"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-129": {
  "ru": "рюкзак",
  "es": "mochila",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "mochila",
    "ref": "id cs075"
   },
   "azbuka3": {
    "es": "mochila",
    "ref": "Unidad 3 · sustantivo (id 55)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-130": {
  "ru": "сахар",
  "es": "azúcar",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "azúcar",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "azúcar",
    "ref": "id cs028"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-131": {
  "ru": "семья",
  "es": "familia",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "familia",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "familia",
    "ref": "id cs232"
   },
   "azbuka3": {
    "es": "familia",
    "ref": "Unidad 3 · sustantivo (id 6)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-132": {
  "ru": "сердце",
  "es": "corazón",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "corazón",
    "ref": "La persona / Cuerpo"
   },
   "casos": {
    "es": "corazón",
    "ref": "id cs344"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-133": {
  "ru": "сестра",
  "es": "hermana",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "hermana",
    "ref": "letra С"
   },
   "diccionario": {
    "es": "hermana",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "hermana",
    "ref": "id cs217"
   },
   "azbuka3": {
    "es": "hermana",
    "ref": "Unidad 3 · sustantivo (id 8)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-134": {
  "ru": "слово",
  "es": "palabra",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "palabra",
    "ref": "letra С"
   },
   "casos": {
    "es": "palabra",
    "ref": "id cs287"
   },
   "azbuka3": {
    "es": "palabra",
    "ref": "Unidad 3 · sustantivo (id 62)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-135": {
  "ru": "снег",
  "es": "nieve",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "nieve",
    "ref": "Naturaleza / Tiempo meteorológico"
   },
   "casos": {
    "es": "nieve",
    "ref": "id cs046"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-136": {
  "ru": "собака",
  "es": "perro",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "perro",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "perro",
    "ref": "id cs225"
   },
   "azbuka3": {
    "es": "perro / perra",
    "ref": "Unidad 3 · sustantivo (id 67)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-137": {
  "ru": "солнце",
  "es": "sol",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "sol",
    "ref": "Naturaleza / Geografía y paisaje"
   },
   "casos": {
    "es": "sol",
    "ref": "id cs345"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-138": {
  "ru": "соль",
  "es": "sal",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "sal",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "sal",
    "ref": "id cs255"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-139": {
  "ru": "сон",
  "es": "sueño",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "sueño",
    "ref": "letra С"
   },
   "casos": {
    "es": "sueño",
    "ref": "id cs352"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-140": {
  "ru": "среда",
  "es": "miércoles",
  "pos": "sustantivo",
  "gender": "f",
  "sense": "día de la semana",
  "sources": {
   "diccionario": {
    "es": "miércoles",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "casos": {
    "es": "miércoles/entorno",
    "ref": "id cs207"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-141": {
  "ru": "среда",
  "es": "entorno / ambiente",
  "pos": "sustantivo",
  "gender": "f",
  "sense": "entorno, medio",
  "sources": {
   "casos": {
    "es": "miércoles/entorno",
    "ref": "id cs207"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-142": {
  "ru": "стол",
  "es": "mesa/escritorio",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "mesa",
    "ref": "letra Л"
   },
   "casos": {
    "es": "mesa/escritorio",
    "ref": "id cs001"
   },
   "azbuka3": {
    "es": "mesa",
    "ref": "Unidad 3 · sustantivo (id 27)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-143": {
  "ru": "страна",
  "es": "país",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "país",
    "ref": "letra С"
   },
   "casos": {
    "es": "país",
    "ref": "id cs165"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-144": {
  "ru": "студент",
  "es": "estudiante",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "estudiante",
    "ref": "id cs086"
   },
   "azbuka3": {
    "es": "estudiante (varón)",
    "ref": "Unidad 3 · sustantivo (id 19)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-145": {
  "ru": "студентка",
  "es": "estudiante (f)",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "estudiante (f)",
    "ref": "id cs222"
   },
   "azbuka3": {
    "es": "estudiante (mujer)",
    "ref": "Unidad 3 · sustantivo (id 20)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-146": {
  "ru": "стул",
  "es": "silla",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "silla",
    "ref": "id cs004"
   },
   "azbuka3": {
    "es": "silla",
    "ref": "Unidad 3 · sustantivo (id 28)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-147": {
  "ru": "суббота",
  "es": "sábado",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "sábado",
    "ref": "Conceptos básicos / Días de la semana"
   },
   "casos": {
    "es": "sábado",
    "ref": "id cs183"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-148": {
  "ru": "сумка",
  "es": "bolso",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "bolso",
    "ref": "id cs196"
   },
   "azbuka3": {
    "es": "bolso",
    "ref": "Unidad 3 · sustantivo (id 58)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-149": {
  "ru": "сын",
  "es": "hijo",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "hijo",
    "ref": "letra Ы"
   },
   "diccionario": {
    "es": "hijo",
    "ref": "La persona / Familia"
   },
   "azbuka3": {
    "es": "hijo",
    "ref": "Unidad 3 · sustantivo (id 15)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario"
  ]
 },
 "LEX-sust-150": {
  "ru": "сыр",
  "es": "queso",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "queso",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "queso",
    "ref": "id cs027"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-151": {
  "ru": "театр",
  "es": "teatro",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "casos": {
    "es": "teatro",
    "ref": "id cs042"
   },
   "azbuka3": {
    "es": "teatro",
    "ref": "Unidad 3 · sustantivo (id 48)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-152": {
  "ru": "телефон",
  "es": "teléfono",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "teléfono",
    "ref": "letra Т"
   },
   "casos": {
    "es": "teléfono",
    "ref": "id cs017"
   },
   "azbuka3": {
    "es": "teléfono",
    "ref": "Unidad 3 · sustantivo (id 51)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-153": {
  "ru": "тетрадь",
  "es": "cuaderno",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "cuaderno",
    "ref": "id cs253"
   },
   "azbuka3": {
    "es": "cuaderno",
    "ref": "Unidad 3 · sustantivo (id 59)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-154": {
  "ru": "тётя",
  "es": "tía",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "tía",
    "ref": "La persona / Familia"
   },
   "casos": {
    "es": "tía",
    "ref": "id cs248"
   },
   "azbuka3": {
    "es": "tía",
    "ref": "Unidad 3 · sustantivo (id 14)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-155": {
  "ru": "тигр",
  "es": "tigre",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "tigre",
    "ref": "Naturaleza / Animales"
   },
   "casos": {
    "es": "tigre",
    "ref": "id cs100"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-156": {
  "ru": "турист",
  "es": "turista",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "turista",
    "ref": "Viajes / Turismo"
   },
   "casos": {
    "es": "turista",
    "ref": "id cs111"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-157": {
  "ru": "ужин",
  "es": "cena",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "cena",
    "ref": "letra Ж"
   },
   "casos": {
    "es": "cena",
    "ref": "id cs024"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-158": {
  "ru": "улица",
  "es": "calle",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "calle",
    "ref": "letra У"
   },
   "diccionario": {
    "es": "calle",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "calle",
    "ref": "id cs164"
   },
   "azbuka3": {
    "es": "calle",
    "ref": "Unidad 3 · sustantivo (id 36)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-159": {
  "ru": "университет",
  "es": "universidad",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "universidad",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "universidad",
    "ref": "id cs020"
   },
   "azbuka3": {
    "es": "universidad",
    "ref": "Unidad 3 · sustantivo (id 41)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-160": {
  "ru": "утро",
  "es": "mañana",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "mañana",
    "ref": "letra У"
   },
   "casos": {
    "es": "mañana",
    "ref": "id cs290"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-161": {
  "ru": "учитель",
  "es": "profesor/a",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "profesor",
    "ref": "letra Ь"
   },
   "diccionario": {
    "es": "profesor/a",
    "ref": "Trabajo / Profesiones"
   },
   "casos": {
    "es": "profesor",
    "ref": "id cs132"
   },
   "azbuka3": {
    "es": "profesor",
    "ref": "Unidad 3 · sustantivo (id 17)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-162": {
  "ru": "учительница",
  "es": "maestra",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "casos": {
    "es": "maestra",
    "ref": "id cs223"
   },
   "azbuka3": {
    "es": "profesora",
    "ref": "Unidad 3 · sustantivo (id 18)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos"
  ]
 },
 "LEX-sust-163": {
  "ru": "хлеб",
  "es": "pan",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "pan",
    "ref": "letra Х"
   },
   "diccionario": {
    "es": "pan",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "pan",
    "ref": "id cs025"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-164": {
  "ru": "холодильник",
  "es": "heladera / nevera",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "heladera / nevera",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "heladera / refrigerador",
    "ref": "id cs073"
   },
   "azbuka3": {
    "es": "heladera",
    "ref": "Unidad 3 · sustantivo (id 35)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-165": {
  "ru": "цена",
  "es": "precio",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "precio",
    "ref": "letra Ц"
   },
   "casos": {
    "es": "precio",
    "ref": "id cs187"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-166": {
  "ru": "церковь",
  "es": "iglesia",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "iglesia",
    "ref": "La ciudad / Lugares urbanos"
   },
   "azbuka3": {
    "es": "iglesia",
    "ref": "Unidad 3 · sustantivo (id 49)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "diccionario"
  ]
 },
 "LEX-sust-167": {
  "ru": "чай",
  "es": "té",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "té",
    "ref": "letra Ч"
   },
   "diccionario": {
    "es": "té",
    "ref": "Alimentación / Bebidas"
   },
   "casos": {
    "es": "té",
    "ref": "id cs147"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-168": {
  "ru": "чемодан",
  "es": "maleta",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "maleta",
    "ref": "Viajes / En el aeropuerto"
   },
   "casos": {
    "es": "maleta",
    "ref": "id cs076"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-169": {
  "ru": "шапка",
  "es": "gorro",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "gorro",
    "ref": "letra Ш"
   },
   "casos": {
    "es": "gorro",
    "ref": "id cs197"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-170": {
  "ru": "шкаф",
  "es": "armario",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "armario",
    "ref": "La ciudad / En casa"
   },
   "casos": {
    "es": "armario",
    "ref": "id cs005"
   },
   "azbuka3": {
    "es": "armario",
    "ref": "Unidad 3 · sustantivo (id 31)"
   }
  },
  "introducedIn": [
   3
  ],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-171": {
  "ru": "школа",
  "es": "escuela",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "alfabeto": {
    "es": "escuela",
    "ref": "letra Ш"
   },
   "diccionario": {
    "es": "escuela",
    "ref": "La ciudad / Lugares urbanos"
   },
   "casos": {
    "es": "escuela",
    "ref": "id cs163"
   },
   "azbuka3": {
    "es": "escuela",
    "ref": "Unidad 3 · sustantivo (id 40)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-172": {
  "ru": "этаж",
  "es": "planta/piso (edificio)",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "alfabeto": {
    "es": "piso (de edificio)",
    "ref": "letra Э"
   },
   "casos": {
    "es": "planta/piso (edificio)",
    "ref": "id cs080"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "casos"
  ]
 },
 "LEX-sust-173": {
  "ru": "юбка",
  "es": "falda",
  "pos": "sustantivo",
  "gender": "f",
  "sources": {
   "diccionario": {
    "es": "falda",
    "ref": "La persona / Ropa"
   },
   "casos": {
    "es": "falda",
    "ref": "id cs198"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-174": {
  "ru": "яблоко",
  "es": "manzana",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "alfabeto": {
    "es": "manzana",
    "ref": "letra Я"
   },
   "diccionario": {
    "es": "manzana",
    "ref": "Alimentación / Frutas"
   },
   "casos": {
    "es": "manzana",
    "ref": "id cs283"
   },
   "azbuka3": {
    "es": "manzana",
    "ref": "Unidad 3 · sustantivo (id 64)"
   }
  },
  "introducedIn": [
   1,
   3
  ],
  "appearsIn": [
   "alfabeto",
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-175": {
  "ru": "яйцо",
  "es": "huevo",
  "pos": "sustantivo",
  "gender": "n",
  "sources": {
   "diccionario": {
    "es": "huevo",
    "ref": "Alimentación / Alimentos básicos"
   },
   "casos": {
    "es": "huevo",
    "ref": "id cs284"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-sust-176": {
  "ru": "январь",
  "es": "enero",
  "pos": "sustantivo",
  "gender": "m",
  "sources": {
   "diccionario": {
    "es": "enero",
    "ref": "Conceptos básicos / Meses y estaciones"
   },
   "casos": {
    "es": "enero",
    "ref": "id cs131"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "casos",
   "diccionario"
  ]
 },
 "LEX-verb-001": {
  "ru": "брать",
  "es": "tomar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "tomar",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "tomar / agarrar",
    "ref": "infinitivo (id 36)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-002": {
  "ru": "быть",
  "es": "ser / estar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "ser / estar",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "ser / estar",
    "ref": "infinitivo (id 1)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-003": {
  "ru": "видеть",
  "es": "ver",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "ver",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "ver",
    "ref": "infinitivo (id 16)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-004": {
  "ru": "говорить",
  "es": "hablar / decir (proceso)",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "hablar",
    "ref": "letra Г"
   },
   "diccionario": {
    "es": "hablar / decir (proceso)",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "hablar",
    "ref": "infinitivo (id 6)"
   },
   "dialogos": {
    "es": "Hablar",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-005": {
  "ru": "давать",
  "es": "dar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "dar",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "dar",
    "ref": "infinitivo (id 37)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-006": {
  "ru": "делать",
  "es": "hacer",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "hacer",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "hacer",
    "ref": "infinitivo (id 3)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-007": {
  "ru": "думать",
  "es": "pensar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "pensar",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "pensar",
    "ref": "infinitivo (id 13)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-008": {
  "ru": "есть",
  "es": "comer",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "hay / comer",
    "ref": "letra Е"
   },
   "verbos": {
    "es": "comer",
    "ref": "infinitivo (id 43)"
   },
   "dialogos": {
    "es": "Comer / Hay",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "verbos"
  ]
 },
 "LEX-verb-009": {
  "ru": "ждать",
  "es": "esperar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "esperar",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "esperar",
    "ref": "infinitivo (id 34)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-010": {
  "ru": "жить",
  "es": "vivir",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "vivir",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "vivir",
    "ref": "infinitivo (id 26)"
   },
   "dialogos": {
    "es": "Vivir",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-011": {
  "ru": "закрывать",
  "es": "cerrar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "cerrar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "cerrar",
    "ref": "infinitivo (id 40)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-012": {
  "ru": "звонить",
  "es": "llamar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "llamar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "llamar (por teléfono)",
    "ref": "infinitivo (id 10)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-013": {
  "ru": "знать",
  "es": "saber",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "saber",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "saber / conocer",
    "ref": "infinitivo (id 11)"
   },
   "dialogos": {
    "es": "Saber / Conocer",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-014": {
  "ru": "идти",
  "es": "ir (a pie, ahora)",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "ir (a pie)",
    "ref": "letra И"
   },
   "verbos": {
    "es": "ir (a pie, ahora)",
    "ref": "infinitivo (id 21)"
   },
   "dialogos": {
    "es": "Ir (a pie)",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "dialogos",
   "verbos"
  ]
 },
 "LEX-verb-015": {
  "ru": "иметь",
  "es": "tener",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "tener",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "tener",
    "ref": "infinitivo (id 2)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-016": {
  "ru": "искать",
  "es": "buscar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "buscar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "buscar",
    "ref": "infinitivo (id 20)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-017": {
  "ru": "мочь",
  "es": "poder",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "poder",
    "ref": "Verbos clave / Verbos esenciales"
   },
   "verbos": {
    "es": "poder",
    "ref": "infinitivo (id 4)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-018": {
  "ru": "находить",
  "es": "encontrar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "encontrar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "encontrar",
    "ref": "infinitivo (id 45)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-019": {
  "ru": "открывать",
  "es": "abrir",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "abrir",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "abrir",
    "ref": "infinitivo (id 39)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-020": {
  "ru": "писать",
  "es": "escribir",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "escribir",
    "ref": "letra И"
   },
   "diccionario": {
    "es": "escribir",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "escribir",
    "ref": "infinitivo (id 29)"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-021": {
  "ru": "пить",
  "es": "beber",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "beber",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "beber",
    "ref": "infinitivo (id 44)"
   },
   "dialogos": {
    "es": "Beber",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-022": {
  "ru": "покупать",
  "es": "comprar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "comprar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "comprar",
    "ref": "infinitivo (id 41)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-023": {
  "ru": "понимать",
  "es": "entender",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "verbos": {
    "es": "entender",
    "ref": "infinitivo (id 12)"
   },
   "dialogos": {
    "es": "Entender",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "verbos"
  ]
 },
 "LEX-verb-024": {
  "ru": "продавать",
  "es": "vender",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "vender",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "vender",
    "ref": "infinitivo (id 42)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-025": {
  "ru": "работать",
  "es": "trabajar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "trabajar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "trabajar",
    "ref": "infinitivo (id 27)"
   },
   "dialogos": {
    "es": "Trabajar",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-026": {
  "ru": "слушать",
  "es": "escuchar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "alfabeto": {
    "es": "escuchar",
    "ref": "letra У"
   },
   "diccionario": {
    "es": "escuchar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "escuchar",
    "ref": "infinitivo (id 19)"
   }
  },
  "introducedIn": [
   1
  ],
  "appearsIn": [
   "alfabeto",
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-027": {
  "ru": "учиться",
  "es": "estudiar",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "estudiar",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "estudiar / aprender",
    "ref": "infinitivo (id 14)"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "diccionario",
   "verbos"
  ]
 },
 "LEX-verb-028": {
  "ru": "хотеть",
  "es": "querer",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "verbos": {
    "es": "querer",
    "ref": "infinitivo (id 5)"
   },
   "dialogos": {
    "es": "Querer",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "verbos"
  ]
 },
 "LEX-verb-029": {
  "ru": "читать",
  "es": "leer",
  "pos": "verbo",
  "gender": null,
  "sources": {
   "diccionario": {
    "es": "leer",
    "ref": "Verbos clave / Verbos cotidianos"
   },
   "verbos": {
    "es": "leer",
    "ref": "infinitivo (id 28)"
   },
   "dialogos": {
    "es": "Leer",
    "ref": "Diálogos · Verbos"
   }
  },
  "introducedIn": [],
  "appearsIn": [
   "dialogos",
   "diccionario",
   "verbos"
  ]
 }
};

function lexById(id){ return LEXICON[id] || null; }
function lexByRu(ru){
  const key = String(ru).trim().toLowerCase();
  return Object.entries(LEXICON).find(([id,e]) => e.ru.trim().toLowerCase() === key)?.[1] || null;
}
/* Devuelve todas las entradas introducidas en una unidad del curso (1-12). */
function lexByUnit(unitNumber){
  return Object.entries(LEXICON).filter(([id,e]) => e.introducedIn.includes(unitNumber)).map(([id,e])=>({id, ...e}));
}
/* Devuelve todas las entradas que aparecen en una herramienta independiente
   ("diccionario"|"casos"|"verbos"|"dialogos"|"alfabeto"). */
function lexByTool(toolName){
  return Object.entries(LEXICON).filter(([id,e]) => e.appearsIn.includes(toolName)).map(([id,e])=>({id, ...e}));
}
