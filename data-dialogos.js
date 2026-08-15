/* ============================================================
   DATA-DIALOGOS.JS — Fuente única de los diálogos y vocabulario del
   módulo "Diálogos" (dialogos.html)
   Fase 2 de la migración a léxico central — ver MIGRACION_LEXICO.md.
   Extraído desde dialogos.html, donde antes vivía embebido dentro
   del <script> de la app React y no era accesible desde ningún otro
   módulo ni desde el buscador transversal.
   Cargar ANTES del script que lo usa:
   <script src="data-dialogos.js"></script>
   Expone:
   - DIALOGS: 30 diálogos completos, cada uno con id explícito (1-30,
     sin cambios respecto al original) y sus líneas con glosa palabra
     por palabra (campo w[] de cada línea).
   - VOCAB: 64 palabras/frases del glosario del módulo, con categoría.
   - getAllDialogosWords(): aplana SOLO VOCAB (el vocabulario objetivo
     explícito del módulo) para el buscador global — mismo criterio
     que getAllAzbuka2Words()/getAllAzbuka3Words(): las líneas de los
     diálogos (w[] de cada line) son vocabulario incidental/contextual,
     no vocabulario objetivo, y no se indexan para evitar ruido y
     duplicados en los resultados de búsqueda.
   IDs: los diálogos ya traían id explícito y estable (1-30) en el
   archivo original — se preservó sin cambios. Las entradas de VOCAB
   no tienen id propio todavía (no había ninguna persistencia atada a
   su posición en dialogos.html: es estado 100% en memoria de React).
   Si una fase futura necesita referenciarlas de forma estable, se
   les asignará un id explícito en ese momento — no se inventa aquí
   sin necesidad real (ver principio de no unificar/expandir el
   modelo prematuramente, MIGRACION_LEXICO.md).
   ============================================================ */

const DIALOGS = [{
  id: 1,
  title: "Saludo básico",
  titleRu: "Простое приветствие",
  cat: "Saludos",
  lines: [{
    s: "A",
    ru: "Привет!",
    tr: "Priviet!",
    es: "¡Hola!",
    w: [{
      r: "Привет",
      t: "Priviet",
      e: "Hola"
    }]
  }, {
    s: "B",
    ru: "Привет! Как дела?",
    tr: "Priviet! Kak dilá?",
    es: "¡Hola! ¿Cómo estás?",
    w: [{
      r: "Как",
      t: "Kak",
      e: "Cómo"
    }, {
      r: "дела",
      t: "dilá",
      e: "van las cosas"
    }]
  }, {
    s: "A",
    ru: "Хорошо, спасибо.",
    tr: "Jorosho, spásibo.",
    es: "Bien, gracias.",
    w: [{
      r: "Хорошо",
      t: "Jorosho",
      e: "Bien"
    }, {
      r: "спасибо",
      t: "spásibo",
      e: "gracias"
    }]
  }, {
    s: "B",
    ru: "А у тебя?",
    tr: "A u tibiá?",
    es: "¿Y tú?",
    w: [{
      r: "А",
      t: "A",
      e: "Y"
    }, {
      r: "у тебя",
      t: "u tibiá",
      e: "¿y tú?"
    }]
  }]
}, {
  id: 2,
  title: "Buenos días",
  titleRu: "Доброе утро",
  cat: "Saludos",
  lines: [{
    s: "A",
    ru: "Доброе утро!",
    tr: "Dóbroye útro!",
    es: "¡Buenos días!",
    w: [{
      r: "Доброе",
      t: "Dóbroye",
      e: "Buen/buenas"
    }, {
      r: "утро",
      t: "útro",
      e: "mañana"
    }]
  }, {
    s: "B",
    ru: "Доброе утро! Как спал?",
    tr: "Dóbroye útro! Kak spal?",
    es: "¡Buenos días! ¿Cómo dormiste?",
    w: [{
      r: "спал",
      t: "spal",
      e: "dormiste (m.)"
    }]
  }, {
    s: "A",
    ru: "Хорошо, спасибо.",
    tr: "Jorosho, spásibo.",
    es: "Bien, gracias.",
    w: []
  }, {
    s: "B",
    ru: "Отлично!",
    tr: "Otlichno!",
    es: "¡Genial!",
    w: [{
      r: "Отлично",
      t: "Otlichno",
      e: "Genial/excelente"
    }]
  }]
}, {
  id: 3,
  title: "¿Cómo te llamas?",
  titleRu: "Как тебя зовут?",
  cat: "Presentaciones",
  lines: [{
    s: "A",
    ru: "Как тебя зовут?",
    tr: "Kak tibiá zavút?",
    es: "¿Cómo te llamas?",
    w: [{
      r: "тебя",
      t: "tibiá",
      e: "te/ti"
    }, {
      r: "зовут",
      t: "zavút",
      e: "llaman (lit.)"
    }]
  }, {
    s: "B",
    ru: "Меня зовут Мария.",
    tr: "Miniá zavút María.",
    es: "Me llamo María.",
    w: [{
      r: "Меня",
      t: "Miniá",
      e: "me/a mí"
    }]
  }, {
    s: "A",
    ru: "Очень приятно!",
    tr: "Óchin priátno!",
    es: "¡Mucho gusto!",
    w: [{
      r: "Очень",
      t: "Óchin",
      e: "Muy/mucho"
    }, {
      r: "приятно",
      t: "priátno",
      e: "agradable"
    }]
  }, {
    s: "B",
    ru: "Мне тоже!",
    tr: "Mne tozhe!",
    es: "¡Igualmente!",
    w: [{
      r: "Мне",
      t: "Mne",
      e: "a mí"
    }, {
      r: "тоже",
      t: "tozhe",
      e: "también"
    }]
  }]
}, {
  id: 4,
  title: "¿De dónde eres?",
  titleRu: "Откуда ты?",
  cat: "Presentaciones",
  lines: [{
    s: "A",
    ru: "Откуда ты?",
    tr: "Otkúda ty?",
    es: "¿De dónde eres?",
    w: [{
      r: "Откуда",
      t: "Otkúda",
      e: "¿De dónde?"
    }]
  }, {
    s: "B",
    ru: "Я из Испании.",
    tr: "Ya iz Ispánii.",
    es: "Soy de España.",
    w: [{
      r: "Я",
      t: "Ya",
      e: "yo"
    }, {
      r: "из",
      t: "iz",
      e: "de (origen)"
    }, {
      r: "Испании",
      t: "Ispánii",
      e: "España"
    }]
  }, {
    s: "A",
    ru: "А я из России!",
    tr: "A ya iz Rossii!",
    es: "¡Y yo soy de Rusia!",
    w: [{
      r: "России",
      t: "Rossii",
      e: "Rusia"
    }]
  }, {
    s: "B",
    ru: "Интересно!",
    tr: "Interésno!",
    es: "¡Interesante!",
    w: [{
      r: "Интересно",
      t: "Interésno",
      e: "interesante"
    }]
  }]
}, {
  id: 5,
  title: "Despedida",
  titleRu: "До свидания",
  cat: "Saludos",
  lines: [{
    s: "A",
    ru: "До свидания!",
    tr: "Do svidániya!",
    es: "¡Hasta luego!",
    w: [{
      r: "До",
      t: "Do",
      e: "Hasta"
    }, {
      r: "свидания",
      t: "svidániya",
      e: "la vista"
    }]
  }, {
    s: "B",
    ru: "Пока!",
    tr: "Paká!",
    es: "¡Chao!",
    w: [{
      r: "Пока",
      t: "Paká",
      e: "Chao (informal)"
    }]
  }, {
    s: "A",
    ru: "Увидимся завтра.",
    tr: "Uvídimsia závtra.",
    es: "Nos vemos mañana.",
    w: [{
      r: "Увидимся",
      t: "Uvídimsia",
      e: "nos veremos"
    }, {
      r: "завтра",
      t: "závtra",
      e: "mañana"
    }]
  }, {
    s: "B",
    ru: "Хорошо, пока!",
    tr: "Jorosho, paká!",
    es: "De acuerdo, ¡chao!",
    w: []
  }]
}, {
  id: 6,
  title: "Gracias y de nada",
  titleRu: "Спасибо и пожалуйста",
  cat: "Básico",
  lines: [{
    s: "A",
    ru: "Спасибо большое!",
    tr: "Spásibo bolshoié!",
    es: "¡Muchas gracias!",
    w: [{
      r: "большое",
      t: "bolshoié",
      e: "grande/mucho"
    }]
  }, {
    s: "B",
    ru: "Пожалуйста!",
    tr: "Pazhalúysta!",
    es: "¡De nada!",
    w: [{
      r: "Пожалуйста",
      t: "Pazhalúysta",
      e: "De nada / Por favor"
    }]
  }, {
    s: "A",
    ru: "Ты очень добрый.",
    tr: "Ty óchin dóbriy.",
    es: "Eres muy amable.",
    w: [{
      r: "очень",
      t: "óchin",
      e: "muy"
    }, {
      r: "добрый",
      t: "dóbriy",
      e: "amable (m.)"
    }]
  }, {
    s: "B",
    ru: "Нет проблем!",
    tr: "Net probliém!",
    es: "¡No hay problema!",
    w: [{
      r: "Нет",
      t: "Net",
      e: "No hay"
    }, {
      r: "проблем",
      t: "probliém",
      e: "problema(s)"
    }]
  }]
}, {
  id: 7,
  title: "Sí y no",
  titleRu: "Да и нет",
  cat: "Básico",
  lines: [{
    s: "A",
    ru: "Ты говоришь по-русски?",
    tr: "Ty govórysh po-rússki?",
    es: "¿Hablas ruso?",
    w: [{
      r: "говоришь",
      t: "govórysh",
      e: "hablas"
    }, {
      r: "по-русски",
      t: "po-rússki",
      e: "en ruso"
    }]
  }, {
    s: "B",
    ru: "Да, немного.",
    tr: "Da, nemnógo.",
    es: "Sí, un poco.",
    w: [{
      r: "немного",
      t: "nemnógo",
      e: "un poco"
    }]
  }, {
    s: "A",
    ru: "Ты понимаешь?",
    tr: "Ty ponimáiesh?",
    es: "¿Entiendes?",
    w: [{
      r: "понимаешь",
      t: "ponimáiesh",
      e: "entiendes"
    }]
  }, {
    s: "B",
    ru: "Нет, не понимаю.",
    tr: "Net, ne ponimáyu.",
    es: "No, no entiendo.",
    w: [{
      r: "не",
      t: "ne",
      e: "no (negación)"
    }, {
      r: "понимаю",
      t: "ponimáyu",
      e: "entiendo"
    }]
  }]
}, {
  id: 8,
  title: "En la cafetería",
  titleRu: "В кафе",
  cat: "Comida",
  lines: [{
    s: "A",
    ru: "Что вы хотите?",
    tr: "Shto vy jotíte?",
    es: "¿Qué desea?",
    w: [{
      r: "Что",
      t: "Shto",
      e: "Qué"
    }, {
      r: "вы",
      t: "vy",
      e: "usted"
    }, {
      r: "хотите",
      t: "jotíte",
      e: "quiere(n)"
    }]
  }, {
    s: "B",
    ru: "Кофе, пожалуйста.",
    tr: "Kófe, pazhalúysta.",
    es: "Café, por favor.",
    w: [{
      r: "Кофе",
      t: "Kófe",
      e: "café"
    }]
  }, {
    s: "A",
    ru: "С молоком?",
    tr: "S molokom?",
    es: "¿Con leche?",
    w: [{
      r: "С",
      t: "S",
      e: "Con"
    }, {
      r: "молоком",
      t: "molokom",
      e: "leche"
    }]
  }, {
    s: "B",
    ru: "Да, спасибо.",
    tr: "Da, spásibo.",
    es: "Sí, gracias.",
    w: []
  }]
}, {
  id: 9,
  title: "¿Cuánto cuesta?",
  titleRu: "Сколько стоит?",
  cat: "Compras",
  lines: [{
    s: "A",
    ru: "Сколько стоит?",
    tr: "Skólko stóit?",
    es: "¿Cuánto cuesta?",
    w: [{
      r: "Сколько",
      t: "Skólko",
      e: "Cuánto"
    }, {
      r: "стоит",
      t: "stóit",
      e: "cuesta/vale"
    }]
  }, {
    s: "B",
    ru: "Двести рублей.",
    tr: "Dvésti rubliéy.",
    es: "Doscientos rublos.",
    w: [{
      r: "Двести",
      t: "Dvésti",
      e: "Doscientos"
    }, {
      r: "рублей",
      t: "rubliéy",
      e: "rublos"
    }]
  }, {
    s: "A",
    ru: "Это дорого!",
    tr: "Eto dórogo!",
    es: "¡Eso es caro!",
    w: [{
      r: "Это",
      t: "Eto",
      e: "eso/esto"
    }, {
      r: "дорого",
      t: "dórogo",
      e: "caro"
    }]
  }, {
    s: "B",
    ru: "Хорошо, возьму.",
    tr: "Jorosho, vozmú.",
    es: "Bien, me lo llevo.",
    w: [{
      r: "возьму",
      t: "vozmú",
      e: "me lo llevo"
    }]
  }]
}, {
  id: 10,
  title: "¿Dónde está?",
  titleRu: "Где находится?",
  cat: "Ciudad",
  lines: [{
    s: "A",
    ru: "Где вокзал?",
    tr: "Gde vakzál?",
    es: "¿Dónde está la estación?",
    w: [{
      r: "Где",
      t: "Gde",
      e: "Dónde"
    }, {
      r: "вокзал",
      t: "vakzál",
      e: "estación de tren"
    }]
  }, {
    s: "B",
    ru: "Прямо и направо.",
    tr: "Priámo i naprávo.",
    es: "Recto y a la derecha.",
    w: [{
      r: "Прямо",
      t: "Priámo",
      e: "Recto"
    }, {
      r: "направо",
      t: "naprávo",
      e: "a la derecha"
    }]
  }, {
    s: "A",
    ru: "Это далеко?",
    tr: "Eto dalikó?",
    es: "¿Está lejos?",
    w: [{
      r: "далеко",
      t: "dalikó",
      e: "lejos"
    }]
  }, {
    s: "B",
    ru: "Нет, близко.",
    tr: "Net, blízko.",
    es: "No, está cerca.",
    w: [{
      r: "близко",
      t: "blízko",
      e: "cerca"
    }]
  }]
}, {
  id: 11,
  title: "La familia",
  titleRu: "Семья",
  cat: "Familia",
  lines: [{
    s: "A",
    ru: "У тебя есть брат?",
    tr: "U tibiá yest brat?",
    es: "¿Tienes hermano?",
    w: [{
      r: "У тебя есть",
      t: "u tibiá yest",
      e: "¿tienes? (lit. 'en ti hay')"
    }, {
      r: "брат",
      t: "brat",
      e: "hermano"
    }]
  }, {
    s: "B",
    ru: "Да, есть.",
    tr: "Da, yest.",
    es: "Sí, tengo.",
    w: []
  }, {
    s: "A",
    ru: "А сестра?",
    tr: "A siestrá?",
    es: "¿Y hermana?",
    w: [{
      r: "сестра",
      t: "siestrá",
      e: "hermana"
    }]
  }, {
    s: "B",
    ru: "Нет, нет сестры.",
    tr: "Net, net siestrý.",
    es: "No, no tengo hermana.",
    w: [{
      r: "сестры",
      t: "siestrý",
      e: "hermana (gen.)"
    }]
  }]
}, {
  id: 12,
  title: "¿Qué hora es?",
  titleRu: "Который час?",
  cat: "Tiempo",
  lines: [{
    s: "A",
    ru: "Который час?",
    tr: "Kotóry chas?",
    es: "¿Qué hora es?",
    w: [{
      r: "Который",
      t: "Kotóry",
      e: "Cuál/qué"
    }, {
      r: "час",
      t: "chas",
      e: "hora"
    }]
  }, {
    s: "B",
    ru: "Три часа.",
    tr: "Tri chasá.",
    es: "Son las tres.",
    w: [{
      r: "Три",
      t: "Tri",
      e: "Tres"
    }, {
      r: "часа",
      t: "chasá",
      e: "horas (gen.)"
    }]
  }, {
    s: "A",
    ru: "Ты торопишься?",
    tr: "Ty torópishsia?",
    es: "¿Tienes prisa?",
    w: [{
      r: "торопишься",
      t: "torópishsia",
      e: "tienes prisa"
    }]
  }, {
    s: "B",
    ru: "Немного.",
    tr: "Nemnógo.",
    es: "Un poco.",
    w: []
  }]
}, {
  id: 13,
  title: "Tengo hambre",
  titleRu: "Я хочу есть",
  cat: "Comida",
  lines: [{
    s: "A",
    ru: "Ты хочешь есть?",
    tr: "Ty jócheesh yest?",
    es: "¿Tienes hambre?",
    w: [{
      r: "хочешь",
      t: "jócheesh",
      e: "quieres"
    }, {
      r: "есть",
      t: "yest",
      e: "comer"
    }]
  }, {
    s: "B",
    ru: "Да, очень!",
    tr: "Da, óchin!",
    es: "¡Sí, mucho!",
    w: []
  }, {
    s: "A",
    ru: "Что ты хочешь?",
    tr: "Shto ty jócheesh?",
    es: "¿Qué quieres?",
    w: []
  }, {
    s: "B",
    ru: "Пиццу или суп.",
    tr: "Píttsu íli sup.",
    es: "Pizza o sopa.",
    w: [{
      r: "или",
      t: "íli",
      e: "o"
    }, {
      r: "суп",
      t: "sup",
      e: "sopa"
    }]
  }]
}, {
  id: 14,
  title: "El clima",
  titleRu: "Погода",
  cat: "Clima",
  lines: [{
    s: "A",
    ru: "Какая сегодня погода?",
    tr: "Kakáya sivódnia pogóda?",
    es: "¿Qué tiempo hace hoy?",
    w: [{
      r: "Какая",
      t: "Kakáya",
      e: "qué/cuál (f.)"
    }, {
      r: "сегодня",
      t: "sivódnia",
      e: "hoy"
    }, {
      r: "погода",
      t: "pogóda",
      e: "tiempo/clima"
    }]
  }, {
    s: "B",
    ru: "Сегодня холодно.",
    tr: "Sivódnia jólodno.",
    es: "Hoy hace frío.",
    w: [{
      r: "холодно",
      t: "jólodno",
      e: "frío (hace frío)"
    }]
  }, {
    s: "A",
    ru: "Идёт дождь?",
    tr: "Idyot dozhd?",
    es: "¿Llueve?",
    w: [{
      r: "Идёт",
      t: "Idyot",
      e: "va/cae (lit.)"
    }, {
      r: "дождь",
      t: "dozhd",
      e: "lluvia"
    }]
  }, {
    s: "B",
    ru: "Нет, солнечно.",
    tr: "Net, sólnechno.",
    es: "No, hace sol.",
    w: [{
      r: "солнечно",
      t: "sólnechno",
      e: "hace sol"
    }]
  }]
}, {
  id: 15,
  title: "En casa",
  titleRu: "Дома",
  cat: "Casa",
  lines: [{
    s: "A",
    ru: "Ты дома?",
    tr: "Ty dóma?",
    es: "¿Estás en casa?",
    w: [{
      r: "дома",
      t: "dóma",
      e: "en casa"
    }]
  }, {
    s: "B",
    ru: "Да, я дома.",
    tr: "Da, ya dóma.",
    es: "Sí, estoy en casa.",
    w: []
  }, {
    s: "A",
    ru: "Где мама?",
    tr: "Gde máma?",
    es: "¿Dónde está mamá?",
    w: [{
      r: "мама",
      t: "máma",
      e: "mamá"
    }]
  }, {
    s: "B",
    ru: "Она на кухне.",
    tr: "Oná na kújne.",
    es: "Está en la cocina.",
    w: [{
      r: "Она",
      t: "Oná",
      e: "Ella"
    }, {
      r: "на",
      t: "na",
      e: "en (lugar)"
    }, {
      r: "кухне",
      t: "kújne",
      e: "cocina"
    }]
  }]
}, {
  id: 16,
  title: "Me gusta / no me gusta",
  titleRu: "Нравится / не нравится",
  cat: "Preferencias",
  lines: [{
    s: "A",
    ru: "Тебе нравится музыка?",
    tr: "Tibiée nrávitsia muzýka?",
    es: "¿Te gusta la música?",
    w: [{
      r: "Тебе",
      t: "Tibiée",
      e: "a ti"
    }, {
      r: "нравится",
      t: "nrávitsia",
      e: "gusta"
    }, {
      r: "музыка",
      t: "muzýka",
      e: "música"
    }]
  }, {
    s: "B",
    ru: "Да, очень!",
    tr: "Da, óchin!",
    es: "¡Sí, mucho!",
    w: []
  }, {
    s: "A",
    ru: "А кино?",
    tr: "A kinó?",
    es: "¿Y el cine?",
    w: [{
      r: "кино",
      t: "kinó",
      e: "cine"
    }]
  }, {
    s: "B",
    ru: "Не очень.",
    tr: "Ne óchin.",
    es: "No mucho.",
    w: [{
      r: "Не",
      t: "Ne",
      e: "No (negación)"
    }]
  }]
}, {
  id: 17,
  title: "Pedir ayuda",
  titleRu: "Попросить помощь",
  cat: "Situaciones",
  lines: [{
    s: "A",
    ru: "Помогите, пожалуйста!",
    tr: "Pomogíte, pazhalúysta!",
    es: "¡Ayúdeme, por favor!",
    w: [{
      r: "Помогите",
      t: "Pomogíte",
      e: "Ayúdeme (formal)"
    }]
  }, {
    s: "B",
    ru: "Что случилось?",
    tr: "Shto sluchílos?",
    es: "¿Qué pasó?",
    w: [{
      r: "случилось",
      t: "sluchílos",
      e: "pasó/ocurrió"
    }]
  }, {
    s: "A",
    ru: "Я потерялся.",
    tr: "Ya poteriálsia.",
    es: "Estoy perdido.",
    w: [{
      r: "потерялся",
      t: "poteriálsia",
      e: "me perdí (m.)"
    }]
  }, {
    s: "B",
    ru: "Не волнуйтесь!",
    tr: "Ne volnúytes!",
    es: "¡No se preocupe!",
    w: [{
      r: "волнуйтесь",
      t: "volnúytes",
      e: "se preocupe(n)"
    }]
  }]
}, {
  id: 18,
  title: "De compras",
  titleRu: "Покупки",
  cat: "Compras",
  lines: [{
    s: "A",
    ru: "Можно посмотреть?",
    tr: "Mózhno posmotriét?",
    es: "¿Puedo ver?",
    w: [{
      r: "Можно",
      t: "Mózhno",
      e: "¿Se puede?"
    }, {
      r: "посмотреть",
      t: "posmotriét",
      e: "ver/mirar"
    }]
  }, {
    s: "B",
    ru: "Конечно!",
    tr: "Konéchno!",
    es: "¡Por supuesto!",
    w: [{
      r: "Конечно",
      t: "Konéchno",
      e: "Por supuesto"
    }]
  }, {
    s: "A",
    ru: "Есть другой размер?",
    tr: "Yest drugóy razmiér?",
    es: "¿Hay otra talla?",
    w: [{
      r: "другой",
      t: "drugóy",
      e: "otro (m.)"
    }, {
      r: "размер",
      t: "razmiér",
      e: "talla/tamaño"
    }]
  }, {
    s: "B",
    ru: "Да, есть маленький.",
    tr: "Da, yest málenkiy.",
    es: "Sí, hay pequeño.",
    w: [{
      r: "маленький",
      t: "málenkiy",
      e: "pequeño"
    }]
  }]
}, {
  id: 19,
  title: "¿Hablas inglés?",
  titleRu: "Вы говорите по-английски?",
  cat: "Idiomas",
  lines: [{
    s: "A",
    ru: "Вы говорите по-английски?",
    tr: "Vy govórite po-anglíyski?",
    es: "¿Habla usted inglés?",
    w: [{
      r: "говорите",
      t: "govórite",
      e: "habla (formal)"
    }, {
      r: "по-английски",
      t: "po-anglíyski",
      e: "en inglés"
    }]
  }, {
    s: "B",
    ru: "Нет, только по-русски.",
    tr: "Net, tólko po-rússki.",
    es: "No, solo ruso.",
    w: [{
      r: "только",
      t: "tólko",
      e: "solo/solamente"
    }]
  }, {
    s: "A",
    ru: "Я не понимаю.",
    tr: "Ya ne ponimáyu.",
    es: "No entiendo.",
    w: []
  }, {
    s: "B",
    ru: "Говорите медленнее!",
    tr: "Govórite médlenneye!",
    es: "¡Hable más despacio!",
    w: [{
      r: "медленнее",
      t: "médlenneye",
      e: "más despacio"
    }]
  }]
}, {
  id: 20,
  title: "Presentar un amigo",
  titleRu: "Познакомьтесь",
  cat: "Social",
  lines: [{
    s: "A",
    ru: "Это мой друг Алекс.",
    tr: "Eto moy drug Aléks.",
    es: "Este es mi amigo Alex.",
    w: [{
      r: "мой",
      t: "moy",
      e: "mi (m.)"
    }, {
      r: "друг",
      t: "drug",
      e: "amigo"
    }]
  }, {
    s: "B",
    ru: "Привет, Алекс!",
    tr: "Priviet, Aléks!",
    es: "¡Hola, Alex!",
    w: []
  }, {
    s: "A",
    ru: "Откуда ты?",
    tr: "Otkúda ty?",
    es: "¿De dónde eres?",
    w: []
  }, {
    s: "B",
    ru: "Я из Мексики.",
    tr: "Ya iz Méksiki.",
    es: "Soy de México.",
    w: [{
      r: "Мексики",
      t: "Méksiki",
      e: "México (gen.)"
    }]
  }]
}, {
  id: 21,
  title: "Número de teléfono",
  titleRu: "Номер телефона",
  cat: "Comunicación",
  lines: [{
    s: "A",
    ru: "Позвони мне!",
    tr: "Pozvoni mne!",
    es: "¡Llámame!",
    w: [{
      r: "Позвони",
      t: "Pozvoni",
      e: "llama (informal)"
    }, {
      r: "мне",
      t: "mne",
      e: "me/a mí"
    }]
  }, {
    s: "B",
    ru: "Какой твой номер?",
    tr: "Kakóy tvoy nómer?",
    es: "¿Cuál es tu número?",
    w: [{
      r: "твой",
      t: "tvoy",
      e: "tu (m.)"
    }, {
      r: "номер",
      t: "nómer",
      e: "número"
    }]
  }, {
    s: "A",
    ru: "Запиши: 123-456.",
    tr: "Zapishí: 123-456.",
    es: "Apunta: 123-456.",
    w: [{
      r: "Запиши",
      t: "Zapishí",
      e: "Apunta/escribe"
    }]
  }, {
    s: "B",
    ru: "Хорошо, записал!",
    tr: "Jorosho, zapisál!",
    es: "Bien, ¡apuntado!",
    w: [{
      r: "записал",
      t: "zapisál",
      e: "apunté (m.)"
    }]
  }]
}, {
  id: 22,
  title: "Me siento mal",
  titleRu: "Мне плохо",
  cat: "Salud",
  lines: [{
    s: "A",
    ru: "Как ты себя чувствуешь?",
    tr: "Kak ty sibiá chústvuiesh?",
    es: "¿Cómo te sientes?",
    w: [{
      r: "себя",
      t: "sibiá",
      e: "a ti mismo"
    }, {
      r: "чувствуешь",
      t: "chústvuiesh",
      e: "te sientes"
    }]
  }, {
    s: "B",
    ru: "Плохо. Болит голова.",
    tr: "Plójo. Bolít golová.",
    es: "Mal. Me duele la cabeza.",
    w: [{
      r: "Болит",
      t: "Bolít",
      e: "duele"
    }, {
      r: "голова",
      t: "golová",
      e: "cabeza"
    }]
  }, {
    s: "A",
    ru: "Нужен врач?",
    tr: "Nuzhen vrach?",
    es: "¿Necesitas un médico?",
    w: [{
      r: "Нужен",
      t: "Nuzhen",
      e: "necesitas (lit. 'necesario')"
    }, {
      r: "врач",
      t: "vrach",
      e: "médico"
    }]
  }, {
    s: "B",
    ru: "Нет, просто устал.",
    tr: "Net, prósto ustál.",
    es: "No, solo estoy cansado.",
    w: [{
      r: "просто",
      t: "prósto",
      e: "simplemente"
    }, {
      r: "устал",
      t: "ustál",
      e: "cansado (m.)"
    }]
  }]
}, {
  id: 23,
  title: "En el restaurante",
  titleRu: "В ресторане",
  cat: "Comida",
  lines: [{
    s: "A",
    ru: "Дайте меню, пожалуйста.",
    tr: "Dáyte menú, pazhalúysta.",
    es: "El menú, por favor.",
    w: [{
      r: "Дайте",
      t: "Dáyte",
      e: "Dé/Den (formal)"
    }, {
      r: "меню",
      t: "menú",
      e: "menú/carta"
    }]
  }, {
    s: "B",
    ru: "Вот меню.",
    tr: "Vot menú.",
    es: "Aquí está el menú.",
    w: [{
      r: "Вот",
      t: "Vot",
      e: "Aquí está / he aquí"
    }]
  }, {
    s: "A",
    ru: "Я хочу борщ.",
    tr: "Ya jochú borshch.",
    es: "Quiero borscht.",
    w: [{
      r: "хочу",
      t: "jochú",
      e: "quiero"
    }, {
      r: "борщ",
      t: "borshch",
      e: "borscht (sopa rusa)"
    }]
  }, {
    s: "B",
    ru: "Отличный выбор!",
    tr: "Otlichny výbor!",
    es: "¡Excelente elección!",
    w: [{
      r: "выбор",
      t: "výbor",
      e: "elección"
    }]
  }]
}, {
  id: 24,
  title: "Transporte",
  titleRu: "Транспорт",
  cat: "Ciudad",
  lines: [{
    s: "A",
    ru: "Как доехать до центра?",
    tr: "Kak doyékhat do tséntра?",
    es: "¿Cómo llego al centro?",
    w: [{
      r: "доехать",
      t: "doyékhat",
      e: "llegar (en transporte)"
    }, {
      r: "центра",
      t: "tséntра",
      e: "centro"
    }]
  }, {
    s: "B",
    ru: "На метро или автобусе.",
    tr: "Na metró íli avtóbuse.",
    es: "En metro o en autobús.",
    w: [{
      r: "На",
      t: "Na",
      e: "En (transporte)"
    }, {
      r: "автобусе",
      t: "avtóbuse",
      e: "autobús"
    }]
  }, {
    s: "A",
    ru: "Где станция метро?",
    tr: "Gde stántsiya metró?",
    es: "¿Dónde está el metro?",
    w: [{
      r: "станция",
      t: "stántsiya",
      e: "estación"
    }]
  }, {
    s: "B",
    ru: "Вон там, направо.",
    tr: "Von tam, naprávo.",
    es: "Allí, a la derecha.",
    w: [{
      r: "Вон там",
      t: "Von tam",
      e: "Allí (lejos)"
    }]
  }]
}, {
  id: 25,
  title: "Planes del viernes",
  titleRu: "Планы",
  cat: "Tiempo",
  lines: [{
    s: "A",
    ru: "Ты свободен в пятницу?",
    tr: "Ty svobóden v piátnitsu?",
    es: "¿Estás libre el viernes?",
    w: [{
      r: "свободен",
      t: "svobóden",
      e: "libre (m.)"
    }, {
      r: "пятницу",
      t: "piátnitsu",
      e: "viernes"
    }]
  }, {
    s: "B",
    ru: "Да, свободен.",
    tr: "Da, svobóden.",
    es: "Sí, estoy libre.",
    w: []
  }, {
    s: "A",
    ru: "Встретимся в шесть?",
    tr: "Vstretimsia v shest?",
    es: "¿Quedamos a las seis?",
    w: [{
      r: "Встретимся",
      t: "Vstretimsia",
      e: "nos veremos/quedamos"
    }, {
      r: "шесть",
      t: "shest",
      e: "seis"
    }]
  }, {
    s: "B",
    ru: "Отлично, договорились!",
    tr: "Otlichno, dogovorilis!",
    es: "¡Genial, quedamos!",
    w: [{
      r: "договорились",
      t: "dogovorilis",
      e: "acordado"
    }]
  }]
}, {
  id: 26,
  title: "Cumplidos",
  titleRu: "Комплименты",
  cat: "Social",
  lines: [{
    s: "A",
    ru: "Ты хорошо говоришь по-русски!",
    tr: "Ty jorosho govórysh po-rússki!",
    es: "¡Hablas ruso muy bien!",
    w: []
  }, {
    s: "B",
    ru: "Спасибо, я учусь.",
    tr: "Spásibo, ya uchús.",
    es: "Gracias, estoy aprendiendo.",
    w: [{
      r: "учусь",
      t: "uchús",
      e: "estoy aprendiendo"
    }]
  }, {
    s: "A",
    ru: "Продолжай!",
    tr: "Prodolzháy!",
    es: "¡Sigue adelante!",
    w: [{
      r: "Продолжай",
      t: "Prodolzháy",
      e: "Continúa/sigue"
    }]
  }, {
    s: "B",
    ru: "Постараюсь!",
    tr: "Postaráyus!",
    es: "¡Lo intentaré!",
    w: [{
      r: "Постараюсь",
      t: "Postaráyus",
      e: "lo intentaré"
    }]
  }]
}, {
  id: 27,
  title: "Hobbies",
  titleRu: "Хобби",
  cat: "Social",
  lines: [{
    s: "A",
    ru: "Чем ты занимаешься?",
    tr: "Chem ty zanimaeshsia?",
    es: "¿A qué te dedicas?",
    w: [{
      r: "Чем",
      t: "Chem",
      e: "¿A qué?"
    }, {
      r: "занимаешься",
      t: "zanimaeshsia",
      e: "te dedicas"
    }]
  }, {
    s: "B",
    ru: "Я читаю книги.",
    tr: "Ya chitáyu knígi.",
    es: "Leo libros.",
    w: [{
      r: "читаю",
      t: "chitáyu",
      e: "leo"
    }, {
      r: "книги",
      t: "knígi",
      e: "libros"
    }]
  }, {
    s: "A",
    ru: "А спорт?",
    tr: "A sport?",
    es: "¿Y el deporte?",
    w: [{
      r: "спорт",
      t: "sport",
      e: "deporte"
    }]
  }, {
    s: "B",
    ru: "Иногда плаваю.",
    tr: "Inogdá plavayu.",
    es: "A veces nado.",
    w: [{
      r: "Иногда",
      t: "Inogdá",
      e: "A veces"
    }, {
      r: "плаваю",
      t: "plavayu",
      e: "nado"
    }]
  }]
}, {
  id: 28,
  title: "Cumpleaños",
  titleRu: "День рождения",
  cat: "Social",
  lines: [{
    s: "A",
    ru: "Когда у тебя день рождения?",
    tr: "Kogdá u tibiá den rozhdéniya?",
    es: "¿Cuándo es tu cumpleaños?",
    w: [{
      r: "Когда",
      t: "Kogdá",
      e: "Cuándo"
    }, {
      r: "день рождения",
      t: "den rozhdéniya",
      e: "cumpleaños (lit. 'día de nacimiento')"
    }]
  }, {
    s: "B",
    ru: "Пятого марта.",
    tr: "Piátogo márta.",
    es: "El cinco de marzo.",
    w: [{
      r: "Пятого",
      t: "Piátogo",
      e: "del cinco (gen.)"
    }, {
      r: "марта",
      t: "márta",
      e: "de marzo"
    }]
  }, {
    s: "A",
    ru: "С днём рождения!",
    tr: "S dnyom rozhdéniya!",
    es: "¡Feliz cumpleaños!",
    w: [{
      r: "С",
      t: "S",
      e: "Con"
    }, {
      r: "днём",
      t: "dnyom",
      e: "día (instr.)"
    }]
  }, {
    s: "B",
    ru: "Спасибо большое!",
    tr: "Spásibo bolshoié!",
    es: "¡Muchas gracias!",
    w: []
  }]
}, {
  id: 29,
  title: "En el hotel",
  titleRu: "В гостинице",
  cat: "Viajes",
  lines: [{
    s: "A",
    ru: "Есть свободные номера?",
    tr: "Yest svobódnyie nomirá?",
    es: "¿Tienen habitaciones libres?",
    w: [{
      r: "свободные",
      t: "svobódnyie",
      e: "libres/disponibles"
    }, {
      r: "номера",
      t: "nomirá",
      e: "habitaciones"
    }]
  }, {
    s: "B",
    ru: "Да, на сколько ночей?",
    tr: "Da, na skólko nochéy?",
    es: "Sí, ¿para cuántas noches?",
    w: [{
      r: "ночей",
      t: "nochéy",
      e: "noches (gen. pl.)"
    }]
  }, {
    s: "A",
    ru: "На три ночи.",
    tr: "Na tri nochi.",
    es: "Para tres noches.",
    w: [{
      r: "ночи",
      t: "nochi",
      e: "noches"
    }]
  }, {
    s: "B",
    ru: "Вот ваш ключ.",
    tr: "Vot vash kliuch.",
    es: "Aquí tiene su llave.",
    w: [{
      r: "ваш",
      t: "vash",
      e: "su (formal)"
    }, {
      r: "ключ",
      t: "kliuch",
      e: "llave"
    }]
  }]
}, {
  id: 30,
  title: "Emergencia",
  titleRu: "Срочная помощь",
  cat: "Emergencias",
  lines: [{
    s: "A",
    ru: "Вызовите скорую!",
    tr: "Výzovite skóruyu!",
    es: "¡Llamen a la ambulancia!",
    w: [{
      r: "Вызовите",
      t: "Výzovite",
      e: "Llamen (formal)"
    }, {
      r: "скорую",
      t: "skóruyu",
      e: "ambulancia"
    }]
  }, {
    s: "B",
    ru: "Что случилось?",
    tr: "Shto sluchílos?",
    es: "¿Qué pasó?",
    w: []
  }, {
    s: "A",
    ru: "Человеку плохо!",
    tr: "Chelovéku plójo!",
    es: "¡Alguien se siente mal!",
    w: [{
      r: "Человеку",
      t: "Chelovéku",
      e: "a la persona"
    }, {
      r: "плохо",
      t: "plójo",
      e: "mal"
    }]
  }, {
    s: "B",
    ru: "Уже звоню!",
    tr: "Uzhe zvonú!",
    es: "¡Ya llamo!",
    w: [{
      r: "Уже",
      t: "Uzhe",
      e: "Ya (ahora)"
    }, {
      r: "звоню",
      t: "zvonú",
      e: "llamo (por tel.)"
    }]
  }]
}];

const VOCAB = [{
  ru: "Привет",
  tr: "Priviet",
  es: "Hola (informal)",
  cat: "Saludos"
}, {
  ru: "Здравствуйте",
  tr: "Zdrástvuyte",
  es: "Hola (formal)",
  cat: "Saludos"
}, {
  ru: "Пока",
  tr: "Paká",
  es: "Chao",
  cat: "Saludos"
}, {
  ru: "До свидания",
  tr: "Do svidániya",
  es: "Hasta luego",
  cat: "Saludos"
}, {
  ru: "Доброе утро",
  tr: "Dóbroye útro",
  es: "Buenos días",
  cat: "Saludos"
}, {
  ru: "Добрый вечер",
  tr: "Dóbriy vécher",
  es: "Buenas tardes/noches",
  cat: "Saludos"
}, {
  ru: "Спокойной ночи",
  tr: "Spokóynoy nochi",
  es: "Buenas noches (al dormir)",
  cat: "Saludos"
}, {
  ru: "Да",
  tr: "Da",
  es: "Sí",
  cat: "Básico"
}, {
  ru: "Нет",
  tr: "Net",
  es: "No",
  cat: "Básico"
}, {
  ru: "Хорошо",
  tr: "Jorosho",
  es: "Bien / De acuerdo",
  cat: "Básico"
}, {
  ru: "Плохо",
  tr: "Plójo",
  es: "Mal",
  cat: "Básico"
}, {
  ru: "Спасибо",
  tr: "Spásibo",
  es: "Gracias",
  cat: "Básico"
}, {
  ru: "Пожалуйста",
  tr: "Pazhalúysta",
  es: "Por favor / De nada",
  cat: "Básico"
}, {
  ru: "Извините",
  tr: "Izviníte",
  es: "Disculpe / Perdón",
  cat: "Básico"
}, {
  ru: "Конечно",
  tr: "Konéchno",
  es: "Por supuesto",
  cat: "Básico"
}, {
  ru: "Очень",
  tr: "Óchin",
  es: "Muy / Mucho",
  cat: "Básico"
}, {
  ru: "Немного",
  tr: "Nemnógo",
  es: "Un poco",
  cat: "Básico"
}, {
  ru: "Не",
  tr: "Ne",
  es: "No (negación verbal)",
  cat: "Básico"
}, {
  ru: "Я",
  tr: "Ya",
  es: "Yo",
  cat: "Pronombres"
}, {
  ru: "Ты",
  tr: "Ty",
  es: "Tú",
  cat: "Pronombres"
}, {
  ru: "Он",
  tr: "On",
  es: "Él",
  cat: "Pronombres"
}, {
  ru: "Она",
  tr: "Oná",
  es: "Ella",
  cat: "Pronombres"
}, {
  ru: "Мы",
  tr: "My",
  es: "Nosotros",
  cat: "Pronombres"
}, {
  ru: "Вы",
  tr: "Vy",
  es: "Usted / Vosotros",
  cat: "Pronombres"
}, {
  ru: "Они",
  tr: "Oní",
  es: "Ellos / Ellas",
  cat: "Pronombres"
}, {
  ru: "Один",
  tr: "Odín",
  es: "Uno",
  cat: "Números"
}, {
  ru: "Два",
  tr: "Dva",
  es: "Dos",
  cat: "Números"
}, {
  ru: "Три",
  tr: "Tri",
  es: "Tres",
  cat: "Números"
}, {
  ru: "Четыре",
  tr: "Chetýre",
  es: "Cuatro",
  cat: "Números"
}, {
  ru: "Пять",
  tr: "Piat",
  es: "Cinco",
  cat: "Números"
}, {
  ru: "Десять",
  tr: "Désiat",
  es: "Diez",
  cat: "Números"
}, {
  ru: "Сто",
  tr: "Sto",
  es: "Cien",
  cat: "Números"
}, {
  ru: "Что",
  tr: "Shto",
  es: "Qué",
  cat: "Preguntas"
}, {
  ru: "Где",
  tr: "Gde",
  es: "Dónde",
  cat: "Preguntas"
}, {
  ru: "Как",
  tr: "Kak",
  es: "Cómo",
  cat: "Preguntas"
}, {
  ru: "Когда",
  tr: "Kogdá",
  es: "Cuándo",
  cat: "Preguntas"
}, {
  ru: "Почему",
  tr: "Pochimú",
  es: "Por qué",
  cat: "Preguntas"
}, {
  ru: "Сколько",
  tr: "Skólko",
  es: "Cuánto",
  cat: "Preguntas"
}, {
  ru: "Кто",
  tr: "Kto",
  es: "Quién",
  cat: "Preguntas"
}, {
  ru: "Хотеть",
  tr: "Jotét",
  es: "Querer",
  cat: "Verbos"
}, {
  ru: "Говорить",
  tr: "Govorít",
  es: "Hablar",
  cat: "Verbos"
}, {
  ru: "Понимать",
  tr: "Ponimat",
  es: "Entender",
  cat: "Verbos"
}, {
  ru: "Есть",
  tr: "Yest",
  es: "Comer / Hay",
  cat: "Verbos"
}, {
  ru: "Пить",
  tr: "Pit",
  es: "Beber",
  cat: "Verbos"
}, {
  ru: "Идти",
  tr: "Idtí",
  es: "Ir (a pie)",
  cat: "Verbos"
}, {
  ru: "Жить",
  tr: "Zhit",
  es: "Vivir",
  cat: "Verbos"
}, {
  ru: "Знать",
  tr: "Znat",
  es: "Saber / Conocer",
  cat: "Verbos"
}, {
  ru: "Читать",
  tr: "Chitát",
  es: "Leer",
  cat: "Verbos"
}, {
  ru: "Работать",
  tr: "Rabótat",
  es: "Trabajar",
  cat: "Verbos"
}, {
  ru: "Большой",
  tr: "Bolshóy",
  es: "Grande",
  cat: "Adjetivos"
}, {
  ru: "Маленький",
  tr: "Málenkiy",
  es: "Pequeño",
  cat: "Adjetivos"
}, {
  ru: "Хороший",
  tr: "Joroshiy",
  es: "Bueno",
  cat: "Adjetivos"
}, {
  ru: "Новый",
  tr: "Nóviy",
  es: "Nuevo",
  cat: "Adjetivos"
}, {
  ru: "Красивый",
  tr: "Krasíviy",
  es: "Bonito / Hermoso",
  cat: "Adjetivos"
}, {
  ru: "Дорогой",
  tr: "Dorogóy",
  es: "Caro / Querido",
  cat: "Adjetivos"
}, {
  ru: "Сегодня",
  tr: "Sivódnia",
  es: "Hoy",
  cat: "Tiempo"
}, {
  ru: "Завтра",
  tr: "Závtra",
  es: "Mañana",
  cat: "Tiempo"
}, {
  ru: "Вчера",
  tr: "Vchirá",
  es: "Ayer",
  cat: "Tiempo"
}, {
  ru: "Сейчас",
  tr: "Seichás",
  es: "Ahora",
  cat: "Tiempo"
}, {
  ru: "Дом",
  tr: "Dom",
  es: "Casa / Edificio",
  cat: "Lugares"
}, {
  ru: "Магазин",
  tr: "Magazín",
  es: "Tienda",
  cat: "Lugares"
}, {
  ru: "Метро",
  tr: "Metró",
  es: "Metro",
  cat: "Lugares"
}, {
  ru: "Ресторан",
  tr: "Restorán",
  es: "Restaurante",
  cat: "Lugares"
}, {
  ru: "Аптека",
  tr: "Aptéka",
  es: "Farmacia",
  cat: "Lugares"
}];

/* Aplana VOCAB (vocabulario objetivo del módulo) para el buscador
   transversal — mismo patrón que el resto de los data-*.js. */
function getAllDialogosWords(){
  return VOCAB.map(w=>({ru:w.ru, es:w.es, tr:w.tr, cat:w.cat}));
}
