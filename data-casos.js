/* ============================================================
   DATA-CASOS.JS — Fuente única de los 6 casos rusos
   Usado por: casos.html (módulo independiente) y opcionalmente
   index.html / azbuka-index.html (para el buscador transversal).
   Cargar ANTES del script que lo usa: <script src="data-casos.js"></script>
   Expone: CASE_META, CASE_ORDER, GENDER_LABEL, CASOS_WORD_IDS (mapa de
   ids estables), WORDS (381 sustantivos con sus 6 formas declinadas,
   cada uno con id fijo), TEMPLATES (frases de ejemplo por caso),
   approxPron(ru) y getAllCasosWords() para el buscador global.
   ============================================================ */

const CASE_META = {
  nom:{id:'nom',es:'Nominativo',short:'Nom.',color:'var(--gold)',
    rule:'El caso del sujeto: quién o qué realiza la acción, o "quién/qué es esto". Es la forma que encontrarás en el diccionario.',
    example:'Это стол. — Esto es una mesa.'},
  acc:{id:'acc',es:'Acusativo',short:'Ac.',color:'var(--orange)',
    rule:'El caso del objeto directo (a quién / qué). Con sustantivos inanimados, la forma es igual al nominativo. Con sustantivos animados, es igual al genitivo (en masculino singular).',
    example:'Я вижу стол (inanimado). Я вижу брата (animado).'},
  gen:{id:'gen',es:'Genitivo',short:'Gen.',color:'var(--green)',
    rule:'Expresa posesión ("de"), ausencia ("нет" = no hay), cantidad, y aparece tras preposiciones como у, из, для, без, до, около.',
    example:'У меня нет брата. — No tengo hermano.'},
  dat:{id:'dat',es:'Dativo',short:'Dat.',color:'var(--accent)',
    rule:'El caso del destinatario ("a quién"). Se usa con звонить, давать, помогать, y en construcciones impersonales de edad/sentimientos.',
    example:'Я звоню брату. — Llamo a mi hermano.'},
  inst:{id:'inst',es:'Instrumental',short:'Inst.',color:'#E2B86A',
    rule:'Expresa el instrumento o medio ("con qué/con quién"), y se usa con быть/стать y con la preposición с (con).',
    example:'Я работаю с братом. — Trabajo con mi hermano.'},
  prep:{id:'prep',es:'Preposicional',short:'Prep.',color:'var(--purple)',
    rule:'El único caso que SIEMPRE va con preposición: о/об (sobre), в (en), на (en/sobre). Para hablar de temas o de ubicación.',
    example:'Я думаю о брате. — Pienso en mi hermano.'}
};
const CASE_ORDER = ['nom','acc','gen','dat','inst','prep'];
const GENDER_LABEL = {m:'masculino',f:'femenino',n:'neutro'};

/* ── TRANSLITERACIÓN APROXIMADA (cirílico → español) ─────── */
const PRON_MAP = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'io','ж':'zh','з':'z','и':'i','й':'i',
  'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
  'х':'j','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'i','ь':'','э':'e','ю':'iu','я':'ia'};
function approxPron(ru){
  let out='';
  for(const ch of ru.toLowerCase()){ out += PRON_MAP.hasOwnProperty(ch) ? PRON_MAP[ch] : ch; }
  return out;
}

/* ── MOTOR DE DECLINACIÓN ──────────────────────────────────── */
const SIB_VELAR = ['г','к','х','ж','ч','ш','щ'];
const SIB_INST = ['ж','ч','ш','щ','ц'];
function declineRegular(nom, type, animate){
  const last = s=>s.slice(-1);
  let stem, f={};
  if(type==='m-hard'){
    stem = nom;
    f.nom = nom; f.gen = stem+'а'; f.dat = stem+'у';
    f.acc = animate ? f.gen : nom;
    f.inst = stem + (SIB_INST.includes(last(stem)) ? 'ем':'ом');
    f.prep = stem+'е';
  } else if(type==='m-soft-ь' || type==='m-soft-й'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.gen = stem+'я'; f.dat = stem+'ю';
    f.acc = animate ? f.gen : nom;
    f.inst = stem+'ем'; f.prep = stem+'е';
  } else if(type==='f-a'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.acc = stem+'у';
    f.gen = stem + (SIB_VELAR.includes(last(stem)) ? 'и':'ы');
    f.dat = stem+'е'; f.inst = stem+'ой'; f.prep = stem+'е';
  } else if(type==='f-ya'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.acc = stem+'ю'; f.gen = stem+'и';
    f.dat = stem+'е'; f.inst = stem+'ей'; f.prep = stem+'е';
  } else if(type==='f-soft'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.acc = nom; f.gen = stem+'и';
    f.dat = stem+'и'; f.inst = stem+'ью'; f.prep = stem+'и';
  } else if(type==='n-o'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.acc = nom; f.gen = stem+'а'; f.dat = stem+'у';
    f.inst = stem + (SIB_INST.includes(last(stem)) ? 'ем':'ом');
    f.prep = stem+'е';
  } else if(type==='n-e'){
    stem = nom.slice(0,-1);
    f.nom = nom; f.acc = nom; f.gen = stem+'я'; f.dat = stem+'ю';
    f.inst = stem+'ем'; f.prep = stem+'е';
  }
  return f;
}
function genderOf(type){
  if(type.startsWith('m-')) return 'm';
  if(type.startsWith('f-')) return 'f';
  return 'n';
}

/* ============================================================
   CASOS_WORD_IDS — IDs estables (Fase 1 — migración a léxico
   central, ver MIGRACION_LEXICO.md). Antes, cada palabra de WORDS
   recibía un id sintético ('w0','w1'...) calculado en runtime según
   el orden de iteración de REG/IRREGULAR — si se agregaba o
   reordenaba una palabra, todos los ids posteriores se corrían.
   Ahora cada palabra tiene un id LITERAL y fijo, guardado acá y
   consultado por su texto en ruso al construir WORDS más abajo.
   El valor del id es arbitrario (no se deriva del ruso ni de una
   transliteración) — 'ru' se usa solo como clave de búsqueda para
   pegar el id correcto a la palabra correspondiente.
   casos.html NO persiste progreso por id (usa el texto 'ru' como
   clave), así que este cambio no requiere migrar datos de usuarios
   existentes — se hace de todos modos para dejar la base preparada
   para el léxico central (Fase 4) y cualquier referencia cruzada
   futura entre módulos.
   IMPORTANTE: nunca reutilizar ni reasignar un id ya existente acá.
   Si se agrega una palabra nueva en el futuro, asignarle el
   siguiente id libre (cs382, cs383...) sin importar en qué grupo de
   REG o en qué posición del array se la agregue. */
const CASOS_WORD_IDS = {
  "стол":"cs001",
  "дом":"cs002",
  "город":"cs003",
  "стул":"cs004",
  "шкаф":"cs005",
  "завод":"cs006",
  "банк":"cs007",
  "парк":"cs008",
  "урок":"cs009",
  "ответ":"cs010",
  "вопрос":"cs011",
  "вагон":"cs012",
  "билет":"cs013",
  "поезд":"cs014",
  "автобус":"cs015",
  "магазин":"cs016",
  "телефон":"cs017",
  "компьютер":"cs018",
  "интернет":"cs019",
  "университет":"cs020",
  "институт":"cs021",
  "завтрак":"cs022",
  "обед":"cs023",
  "ужин":"cs024",
  "хлеб":"cs025",
  "суп":"cs026",
  "сыр":"cs027",
  "сахар":"cs028",
  "стакан":"cs029",
  "пол":"cs030",
  "двор":"cs031",
  "сад":"cs032",
  "лес":"cs033",
  "остров":"cs034",
  "океан":"cs035",
  "вокзал":"cs036",
  "аэропорт":"cs037",
  "паспорт":"cs038",
  "документ":"cs039",
  "журнал":"cs040",
  "фильм":"cs041",
  "театр":"cs042",
  "стадион":"cs043",
  "спорт":"cs044",
  "футбол":"cs045",
  "снег":"cs046",
  "мороз":"cs047",
  "дым":"cs048",
  "воздух":"cs049",
  "свет":"cs050",
  "цвет":"cs051",
  "вкус":"cs052",
  "запах":"cs053",
  "звук":"cs054",
  "голос":"cs055",
  "взгляд":"cs056",
  "характер":"cs057",
  "возраст":"cs058",
  "рост":"cs059",
  "вес":"cs060",
  "размер":"cs061",
  "номер":"cs062",
  "адрес":"cs063",
  "район":"cs064",
  "банан":"cs065",
  "апельсин":"cs066",
  "помидор":"cs067",
  "лимон":"cs068",
  "рис":"cs069",
  "ковёр":"cs070",
  "диван":"cs071",
  "телевизор":"cs072",
  "холодильник":"cs073",
  "карандаш":"cs074",
  "рюкзак":"cs075",
  "чемодан":"cs076",
  "замок":"cs077",
  "мост":"cs078",
  "рынок":"cs079",
  "этаж":"cs080",
  "заказ":"cs081",
  "отдых":"cs082",
  "праздник":"cs083",
  "подъезд":"cs084",
  "квартал":"cs085",
  "студент":"cs086",
  "сосед":"cs087",
  "начальник":"cs088",
  "инженер":"cs089",
  "журналист":"cs090",
  "актёр":"cs091",
  "солдат":"cs092",
  "капитан":"cs093",
  "президент":"cs094",
  "министр":"cs095",
  "директор":"cs096",
  "доктор":"cs097",
  "кот":"cs098",
  "слон":"cs099",
  "тигр":"cs100",
  "волк":"cs101",
  "крокодил":"cs102",
  "дельфин":"cs103",
  "верблюд":"cs104",
  "петух":"cs105",
  "баран":"cs106",
  "бык":"cs107",
  "кролик":"cs108",
  "пациент":"cs109",
  "клиент":"cs110",
  "турист":"cs111",
  "гражданин":"cs112",
  "миллионер":"cs113",
  "школьник":"cs114",
  "спортсмен":"cs115",
  "чемпион":"cs116",
  "повар":"cs117",
  "космонавт":"cs118",
  "химик":"cs119",
  "словарь":"cs120",
  "календарь":"cs121",
  "рубль":"cs122",
  "спектакль":"cs123",
  "автомобиль":"cs124",
  "уровень":"cs125",
  "корабль":"cs126",
  "руль":"cs127",
  "ноль":"cs128",
  "картофель":"cs129",
  "апрель":"cs130",
  "январь":"cs131",
  "учитель":"cs132",
  "писатель":"cs133",
  "водитель":"cs134",
  "житель":"cs135",
  "зритель":"cs136",
  "читатель":"cs137",
  "родитель":"cs138",
  "гость":"cs139",
  "медведь":"cs140",
  "олень":"cs141",
  "гусь":"cs142",
  "конь":"cs143",
  "тюлень":"cs144",
  "музей":"cs145",
  "трамвай":"cs146",
  "чай":"cs147",
  "ручей":"cs148",
  "случай":"cs149",
  "край":"cs150",
  "сарай":"cs151",
  "юбилей":"cs152",
  "урожай":"cs153",
  "обычай":"cs154",
  "герой":"cs155",
  "гений":"cs156",
  "попугай":"cs157",
  "книга":"cs158",
  "газета":"cs159",
  "комната":"cs160",
  "машина":"cs161",
  "работа":"cs162",
  "школа":"cs163",
  "улица":"cs164",
  "страна":"cs165",
  "столица":"cs166",
  "картина":"cs167",
  "музыка":"cs168",
  "природа":"cs169",
  "погода":"cs170",
  "вода":"cs171",
  "еда":"cs172",
  "рыба":"cs173",
  "гора":"cs174",
  "река":"cs175",
  "дорога":"cs176",
  "квартира":"cs177",
  "библиотека":"cs178",
  "больница":"cs179",
  "аптека":"cs180",
  "минута":"cs181",
  "секунда":"cs182",
  "суббота":"cs183",
  "весна":"cs184",
  "зима":"cs185",
  "трава":"cs186",
  "цена":"cs187",
  "разница":"cs188",
  "причина":"cs189",
  "система":"cs190",
  "программа":"cs191",
  "группа":"cs192",
  "команда":"cs193",
  "карта":"cs194",
  "бумага":"cs195",
  "сумка":"cs196",
  "шапка":"cs197",
  "юбка":"cs198",
  "рубашка":"cs199",
  "куртка":"cs200",
  "зарплата":"cs201",
  "встреча":"cs202",
  "задача":"cs203",
  "шутка":"cs204",
  "ошибка":"cs205",
  "привычка":"cs206",
  "среда":"cs207",
  "фабрика":"cs208",
  "ферма":"cs209",
  "ракета":"cs210",
  "планета":"cs211",
  "наука":"cs212",
  "техника":"cs213",
  "победа":"cs214",
  "основа":"cs215",
  "мама":"cs216",
  "сестра":"cs217",
  "подруга":"cs218",
  "бабушка":"cs219",
  "девушка":"cs220",
  "женщина":"cs221",
  "студентка":"cs222",
  "учительница":"cs223",
  "актриса":"cs224",
  "собака":"cs225",
  "кошка":"cs226",
  "корова":"cs227",
  "неделя":"cs228",
  "кухня":"cs229",
  "деревня":"cs230",
  "земля":"cs231",
  "семья":"cs232",
  "песня":"cs233",
  "линия":"cs234",
  "идея":"cs235",
  "станция":"cs236",
  "профессия":"cs237",
  "религия":"cs238",
  "история":"cs239",
  "компания":"cs240",
  "территория":"cs241",
  "энергия":"cs242",
  "фантазия":"cs243",
  "аудитория":"cs244",
  "традиция":"cs245",
  "ситуация":"cs246",
  "эмоция":"cs247",
  "тётя":"cs248",
  "судья":"cs249",
  "ночь":"cs250",
  "дверь":"cs251",
  "кровать":"cs252",
  "тетрадь":"cs253",
  "площадь":"cs254",
  "соль":"cs255",
  "боль":"cs256",
  "роль":"cs257",
  "цель":"cs258",
  "жизнь":"cs259",
  "часть":"cs260",
  "вещь":"cs261",
  "помощь":"cs262",
  "речь":"cs263",
  "мысль":"cs264",
  "новость":"cs265",
  "радость":"cs266",
  "грусть":"cs267",
  "молодость":"cs268",
  "старость":"cs269",
  "болезнь":"cs270",
  "осень":"cs271",
  "власть":"cs272",
  "честь":"cs273",
  "страсть":"cs274",
  "скорость":"cs275",
  "постель":"cs276",
  "мебель":"cs277",
  "запись":"cs278",
  "лошадь":"cs279",
  "молоко":"cs280",
  "мясо":"cs281",
  "масло":"cs282",
  "яблоко":"cs283",
  "яйцо":"cs284",
  "облако":"cs285",
  "озеро":"cs286",
  "слово":"cs287",
  "дело":"cs288",
  "место":"cs289",
  "утро":"cs290",
  "лето":"cs291",
  "вино":"cs292",
  "пиво":"cs293",
  "мыло":"cs294",
  "зеркало":"cs295",
  "кресло":"cs296",
  "колесо":"cs297",
  "золото":"cs298",
  "серебро":"cs299",
  "железо":"cs300",
  "стекло":"cs301",
  "тело":"cs302",
  "число":"cs303",
  "правило":"cs304",
  "кольцо":"cs305",
  "искусство":"cs306",
  "государство":"cs307",
  "общество":"cs308",
  "лицо":"cs309",
  "село":"cs310",
  "пятно":"cs311",
  "решение":"cs312",
  "движение":"cs313",
  "настроение":"cs314",
  "здание":"cs315",
  "растение":"cs316",
  "путешествие":"cs317",
  "знание":"cs318",
  "событие":"cs319",
  "воскресенье":"cs320",
  "счастье":"cs321",
  "платье":"cs322",
  "занятие":"cs323",
  "упражнение":"cs324",
  "предложение":"cs325",
  "объявление":"cs326",
  "выражение":"cs327",
  "впечатление":"cs328",
  "направление":"cs329",
  "отношение":"cs330",
  "изменение":"cs331",
  "явление":"cs332",
  "мнение":"cs333",
  "значение":"cs334",
  "понимание":"cs335",
  "желание":"cs336",
  "умение":"cs337",
  "развитие":"cs338",
  "воспоминание":"cs339",
  "поведение":"cs340",
  "поле":"cs341",
  "море":"cs342",
  "горе":"cs343",
  "сердце":"cs344",
  "солнце":"cs345",
  "день":"cs346",
  "отец":"cs347",
  "ребёнок":"cs348",
  "ветер":"cs349",
  "лёд":"cs350",
  "огонь":"cs351",
  "сон":"cs352",
  "конец":"cs353",
  "палец":"cs354",
  "заяц":"cs355",
  "подарок":"cs356",
  "звонок":"cs357",
  "кусок":"cs358",
  "значок":"cs359",
  "щенок":"cs360",
  "цветок":"cs361",
  "платок":"cs362",
  "носок":"cs363",
  "подросток":"cs364",
  "орёл":"cs365",
  "продавец":"cs366",
  "певец":"cs367",
  "месяц":"cs368",
  "нож":"cs369",
  "муж":"cs370",
  "врач":"cs371",
  "товарищ":"cs372",
  "гараж":"cs373",
  "плащ":"cs374",
  "ёж":"cs375",
  "время":"cs376",
  "имя":"cs377",
  "путь":"cs378",
  "мать":"cs379",
  "дочь":"cs380",
  "любовь":"cs381"
};

/* ── BANCO DE PALABRAS REGULARES (~300) — "ru:es" por grupo ── */
const REG = {
'm-hard':{animate:false,list:[
 'стол:mesa/escritorio','дом:casa','город:ciudad','стул:silla','шкаф:armario','завод:fábrica','банк:banco','парк:parque',
 'урок:lección','ответ:respuesta','вопрос:pregunta','вагон:vagón (de tren)','билет:boleto/entrada','поезд:tren','автобус:autobús',
 'магазин:tienda','телефон:teléfono','компьютер:computadora','интернет:internet','университет:universidad','институт:instituto',
 'завтрак:desayuno','обед:almuerzo','ужин:cena','хлеб:pan','суп:sopa','сыр:queso','сахар:azúcar','стакан:vaso','пол:piso/suelo',
 'двор:patio','сад:jardín','лес:bosque','остров:isla','океан:océano','вокзал:estación de tren','аэропорт:aeropuerto',
 'паспорт:pasaporte','документ:documento','журнал:revista','фильм:película','театр:teatro','стадион:estadio','спорт:deporte',
 'футбол:fútbol','снег:nieve','мороз:frío intenso','дым:humo','воздух:aire','свет:luz','цвет:color','вкус:sabor','запах:olor',
 'звук:sonido','голос:voz','взгляд:mirada','характер:carácter','возраст:edad','рост:estatura','вес:peso','размер:tamaño',
 'номер:número','адрес:dirección','район:barrio','банан:banana','апельсин:naranja','помидор:tomate','лимон:limón','рис:arroz',
 'ковёр:alfombra','диван:sofá','телевизор:televisor','холодильник:refrigerador','карандаш:lápiz','рюкзак:mochila','чемодан:maleta',
 'замок:castillo','мост:puente','рынок:mercado',
 'этаж:planta/piso (edificio)','заказ:pedido','отдых:descanso','праздник:fiesta/celebración','подъезд:portal/entrada','квартал:cuadra/manzana'
]},
'm-hard-anim':{animate:true,list:[
 'студент:estudiante','сосед:vecino','начальник:jefe','инженер:ingeniero','журналист:periodista','актёр:actor','солдат:soldado',
 'капитан:capitán','президент:presidente','министр:ministro','директор:director','доктор:doctor','кот:gato','слон:elefante',
 'тигр:tigre','волк:lobo','крокодил:cocodrilo','дельфин:delfín','верблюд:camello','петух:gallo','баран:carnero','бык:toro',
 'кролик:conejo','пациент:paciente','клиент:cliente','турист:turista','гражданин:ciudadano','миллионер:millonario','школьник:escolar',
 'спортсмен:deportista','чемпион:campeón','повар:cocinero','космонавт:cosmonauta','химик:químico'
]},
'm-soft':{animate:false,list:[
 'словарь:diccionario','календарь:calendario','рубль:rublo','спектакль:obra de teatro','автомобиль:automóvil','уровень:nivel',
 'корабль:barco','руль:volante (coche)','ноль:cero','картофель:patata','апрель:abril','январь:enero'
]},
'm-soft-anim':{animate:true,list:[
 'учитель:profesor','писатель:escritor','водитель:conductor','житель:habitante','зритель:espectador','читатель:lector',
 'родитель:padre/progenitor','гость:invitado','медведь:oso','олень:ciervo','гусь:ganso','конь:caballo','тюлень:foca'
]},
'm-soft-y':{animate:false,list:[
 'музей:museo','трамвай:tranvía','чай:té','ручей:arroyo','случай:caso/ocasión','край:borde/región','сарай:granero',
 'юбилей:aniversario','урожай:cosecha','обычай:costumbre'
]},
'm-soft-y-anim':{animate:true,list:[
 'герой:héroe','гений:genio','попугай:loro'
]},
'f-a':{animate:false,list:[
 'книга:libro','газета:periódico','комната:habitación','машина:coche','работа:trabajo','школа:escuela','улица:calle',
 'страна:país','столица:capital','картина:cuadro','музыка:música','природа:naturaleza','погода:clima','вода:agua','еда:comida',
 'рыба:pez/pescado','гора:montaña','река:río','дорога:camino','квартира:apartamento','библиотека:biblioteca','больница:hospital',
 'аптека:farmacia','минута:minuto','секунда:segundo','суббота:sábado','весна:primavera','зима:invierno','трава:hierba',
 'цена:precio','разница:diferencia','причина:razón/causa','система:sistema','программа:programa','группа:grupo','команда:equipo',
 'карта:mapa','бумага:papel','сумка:bolso','шапка:gorro','юбка:falda','рубашка:camisa','куртка:chaqueta','зарплата:salario',
 'встреча:encuentro/reunión','задача:tarea/problema','шутка:broma','ошибка:error','привычка:costumbre','среда:miércoles/entorno',
 'фабрика:fábrica','ферма:granja','ракета:cohete','планета:planeta','наука:ciencia','техника:técnica',
 'победа:victoria','основа:base/fundamento'
]},
'f-a-anim':{animate:true,list:[
 'мама:mamá','сестра:hermana','подруга:amiga','бабушка:abuela','девушка:chica joven','женщина:mujer','студентка:estudiante (f)',
 'учительница:maestra','актриса:actriz','собака:perro','кошка:gato (f)','корова:vaca'
]},
'f-ya':{animate:false,list:[
 'неделя:semana','кухня:cocina','деревня:pueblo/aldea','земля:tierra','семья:familia','песня:canción','линия:línea','идея:idea',
 'станция:estación','профессия:profesión','религия:religión','история:historia','компания:compañía','территория:territorio',
 'энергия:energía','фантазия:fantasía','аудитория:aula/audiencia','традиция:tradición','ситуация:situación','эмоция:emoción'
]},
'f-ya-anim':{animate:true,list:[
 'тётя:tía','судья:juez'
]},
'f-soft':{animate:false,list:[
 'ночь:noche','дверь:puerta','кровать:cama','тетрадь:cuaderno','площадь:plaza','соль:sal','боль:dolor','роль:rol','цель:objetivo',
 'жизнь:vida','часть:parte','вещь:cosa','помощь:ayuda','речь:habla/discurso','мысль:pensamiento','новость:noticia',
 'радость:alegría','грусть:tristeza','молодость:juventud','старость:vejez','болезнь:enfermedad','осень:otoño','власть:poder (político)',
 'честь:honor','страсть:pasión','скорость:velocidad','постель:cama/ropa de cama','мебель:muebles','запись:anotación/grabación'
]},
'f-soft-anim':{animate:true,list:[
 'лошадь:caballo (yegua)'
]},
'n-o':{animate:false,list:[
 'молоко:leche','мясо:carne','масло:mantequilla/aceite','яблоко:manzana','яйцо:huevo','облако:nube','озеро:lago','слово:palabra',
 'дело:asunto/negocio','место:lugar','утро:mañana','лето:verano','вино:vino','пиво:cerveza','мыло:jabón','зеркало:espejo',
 'кресло:sillón','колесо:rueda','золото:oro','серебро:plata','железо:hierro','стекло:vidrio','тело:cuerpo','число:número/fecha',
 'правило:regla','кольцо:anillo','искусство:arte','государство:estado (país)','общество:sociedad','лицо:cara/rostro',
 'село:pueblo/aldea','пятно:mancha'
]},
'n-e-ie':{animate:false,list:[
 'решение:decisión','движение:movimiento','настроение:estado de ánimo','здание:edificio','растение:planta','путешествие:viaje',
 'знание:conocimiento','событие:evento','воскресенье:domingo','счастье:felicidad','платье:vestido','занятие:actividad/clase',
 'упражнение:ejercicio','предложение:oración/oferta','объявление:anuncio','выражение:expresión','впечатление:impresión',
 'направление:dirección','отношение:relación','изменение:cambio','явление:fenómeno','мнение:opinión','значение:significado',
 'понимание:comprensión','желание:deseo','умение:habilidad','развитие:desarrollo','воспоминание:recuerdo','поведение:comportamiento'
]},
'n-e-pole':{animate:false,list:[
 'поле:campo','море:mar','горе:pena/dolor','сердце:corazón','солнце:sol'
]}
};

const TYPE_MAP = {
 'm-hard':'m-hard','m-hard-anim':'m-hard','m-soft':'m-soft-ь','m-soft-anim':'m-soft-ь',
 'm-soft-y':'m-soft-й','m-soft-y-anim':'m-soft-й',
 'f-a':'f-a','f-a-anim':'f-a','f-ya':'f-ya','f-ya-anim':'f-ya',
 'f-soft':'f-soft','f-soft-anim':'f-soft','n-o':'n-o','n-e-ie':'n-e','n-e-pole':'n-e'
};

const WORDS = [];
Object.entries(REG).forEach(([groupKey,group])=>{
  const type = TYPE_MAP[groupKey];
  group.list.forEach(pair=>{
    const [ru,es] = pair.split(':');
    WORDS.push({
      id: CASOS_WORD_IDS[ru] || ('cs-sin-id-'+ru), ru, es, gender:genderOf(type), animate:group.animate,
      forms: declineRegular(ru,type,group.animate)
    });
  });
});

/* Palabras irregulares (vocal móvil / declinación especial) */
const IRREGULAR = [
 {ru:'день',es:'día',gender:'m',animate:false,forms:{nom:'день',acc:'день',gen:'дня',dat:'дню',inst:'днём',prep:'дне'}},
 {ru:'отец',es:'padre',gender:'m',animate:true,forms:{nom:'отец',acc:'отца',gen:'отца',dat:'отцу',inst:'отцом',prep:'отце'}},
 {ru:'ребёнок',es:'niño/a',gender:'m',animate:true,forms:{nom:'ребёнок',acc:'ребёнка',gen:'ребёнка',dat:'ребёнку',inst:'ребёнком',prep:'ребёнке'}},
 {ru:'ветер',es:'viento',gender:'m',animate:false,forms:{nom:'ветер',acc:'ветер',gen:'ветра',dat:'ветру',inst:'ветром',prep:'ветре'}},
 {ru:'лёд',es:'hielo',gender:'m',animate:false,forms:{nom:'лёд',acc:'лёд',gen:'льда',dat:'льду',inst:'льдом',prep:'льде'}},
 {ru:'огонь',es:'fuego',gender:'m',animate:false,forms:{nom:'огонь',acc:'огонь',gen:'огня',dat:'огню',inst:'огнём',prep:'огне'}},
 {ru:'сон',es:'sueño',gender:'m',animate:false,forms:{nom:'сон',acc:'сон',gen:'сна',dat:'сну',inst:'сном',prep:'сне'}},
 {ru:'конец',es:'fin/final',gender:'m',animate:false,forms:{nom:'конец',acc:'конец',gen:'конца',dat:'концу',inst:'концом',prep:'конце'}},
 {ru:'палец',es:'dedo',gender:'m',animate:false,forms:{nom:'палец',acc:'палец',gen:'пальца',dat:'пальцу',inst:'пальцем',prep:'пальце'}},
 {ru:'заяц',es:'liebre',gender:'m',animate:true,forms:{nom:'заяц',acc:'зайца',gen:'зайца',dat:'зайцу',inst:'зайцем',prep:'зайце'}},
 {ru:'подарок',es:'regalo',gender:'m',animate:false,forms:{nom:'подарок',acc:'подарок',gen:'подарка',dat:'подарку',inst:'подарком',prep:'подарке'}},
 {ru:'звонок',es:'timbre/llamada',gender:'m',animate:false,forms:{nom:'звонок',acc:'звонок',gen:'звонка',dat:'звонку',inst:'звонком',prep:'звонке'}},
 {ru:'кусок',es:'pedazo',gender:'m',animate:false,forms:{nom:'кусок',acc:'кусок',gen:'куска',dat:'куску',inst:'куском',prep:'куске'}},
 {ru:'значок',es:'insignia',gender:'m',animate:false,forms:{nom:'значок',acc:'значок',gen:'значка',dat:'значку',inst:'значком',prep:'значке'}},
 {ru:'щенок',es:'cachorro',gender:'m',animate:true,forms:{nom:'щенок',acc:'щенка',gen:'щенка',dat:'щенку',inst:'щенком',prep:'щенке'}},
 {ru:'цветок',es:'flor',gender:'m',animate:false,forms:{nom:'цветок',acc:'цветок',gen:'цветка',dat:'цветку',inst:'цветком',prep:'цветке'}},
 {ru:'платок',es:'pañuelo',gender:'m',animate:false,forms:{nom:'платок',acc:'платок',gen:'платка',dat:'платку',inst:'платком',prep:'платке'}},
 {ru:'носок',es:'calcetín',gender:'m',animate:false,forms:{nom:'носок',acc:'носок',gen:'носка',dat:'носку',inst:'носком',prep:'носке'}},
 {ru:'подросток',es:'adolescente',gender:'m',animate:true,forms:{nom:'подросток',acc:'подростка',gen:'подростка',dat:'подростку',inst:'подростком',prep:'подростке'}},
 {ru:'орёл',es:'águila',gender:'m',animate:true,forms:{nom:'орёл',acc:'орла',gen:'орла',dat:'орлу',inst:'орлом',prep:'орле'}},
 {ru:'продавец',es:'vendedor',gender:'m',animate:true,forms:{nom:'продавец',acc:'продавца',gen:'продавца',dat:'продавцу',inst:'продавцом',prep:'продавце'}},
 {ru:'певец',es:'cantante',gender:'m',animate:true,forms:{nom:'певец',acc:'певца',gen:'певца',dat:'певцу',inst:'певцом',prep:'певце'}},
 {ru:'месяц',es:'mes',gender:'m',animate:false,forms:{nom:'месяц',acc:'месяц',gen:'месяца',dat:'месяцу',inst:'месяцем',prep:'месяце'}},
 {ru:'нож',es:'cuchillo',gender:'m',animate:false,forms:{nom:'нож',acc:'нож',gen:'ножа',dat:'ножу',inst:'ножом',prep:'ноже'}},
 {ru:'муж',es:'esposo',gender:'m',animate:true,forms:{nom:'муж',acc:'мужа',gen:'мужа',dat:'мужу',inst:'мужем',prep:'муже'}},
 {ru:'врач',es:'médico',gender:'m',animate:true,forms:{nom:'врач',acc:'врача',gen:'врача',dat:'врачу',inst:'врачом',prep:'враче'}},
 {ru:'товарищ',es:'camarada',gender:'m',animate:true,forms:{nom:'товарищ',acc:'товарища',gen:'товарища',dat:'товарищу',inst:'товарищем',prep:'товарище'}},
 {ru:'гараж',es:'garaje',gender:'m',animate:false,forms:{nom:'гараж',acc:'гараж',gen:'гаража',dat:'гаражу',inst:'гаражом',prep:'гараже'}},
 {ru:'плащ',es:'impermeable',gender:'m',animate:false,forms:{nom:'плащ',acc:'плащ',gen:'плаща',dat:'плащу',inst:'плащом',prep:'плаще'}},
 {ru:'ёж',es:'erizo',gender:'m',animate:true,forms:{nom:'ёж',acc:'ежа',gen:'ежа',dat:'ежу',inst:'ежом',prep:'еже'}},
 {ru:'время',es:'tiempo',gender:'n',animate:false,forms:{nom:'время',acc:'время',gen:'времени',dat:'времени',inst:'временем',prep:'времени'}},
 {ru:'имя',es:'nombre (de pila)',gender:'n',animate:false,forms:{nom:'имя',acc:'имя',gen:'имени',dat:'имени',inst:'именем',prep:'имени'}},
 {ru:'путь',es:'camino/vía',gender:'m',animate:false,forms:{nom:'путь',acc:'путь',gen:'пути',dat:'пути',inst:'путём',prep:'пути'}},
 {ru:'мать',es:'madre',gender:'f',animate:true,forms:{nom:'мать',acc:'мать',gen:'матери',dat:'матери',inst:'матерью',prep:'матери'}},
 {ru:'дочь',es:'hija',gender:'f',animate:true,forms:{nom:'дочь',acc:'дочь',gen:'дочери',dat:'дочери',inst:'дочерью',prep:'дочери'}},
 {ru:'любовь',es:'amor',gender:'f',animate:false,forms:{nom:'любовь',acc:'любовь',gen:'любви',dat:'любви',inst:'любовью',prep:'любви'}}
];
IRREGULAR.forEach(w=>{ w.id = CASOS_WORD_IDS[w.ru] || ('cs-sin-id-'+w.ru); WORDS.push(w); });

/* ── PLANTILLAS DE FRASES POR CASO ─────────────────────────── */
const TEMPLATES = {
  nom:[{pre:'',post:' здесь.',es:'___ está aquí.'},{pre:'Смотри, вот ',post:'.',es:'Mira, aquí está ___.'}],
  acc:[{pre:'Я вижу ',post:'.',es:'Veo ___.'},{pre:'Я люблю ',post:'.',es:'Amo / me gusta ___.'},{pre:'Она читает ',post:'.',es:'Ella lee ___.'}],
  gen:[{pre:'У меня нет ',post:'.',es:'No tengo ___.'},{pre:'Это цвет ',post:'.',es:'Este es el color de ___.'},{pre:'Я жду ',post:'.',es:'Espero a/el ___.'}],
  dat:[{pre:'Я звоню ',post:'.',es:'Llamo a ___.'},{pre:'Он пишет письмо ',post:'.',es:'Él escribe una carta a ___.'},{pre:'Мы помогаем ',post:'.',es:'Ayudamos a ___.'}],
  inst:[{pre:'Я работаю с ',post:'.',es:'Trabajo con ___.'},{pre:'Она гордится ',post:'.',es:'Ella está orgullosa de ___.'},{pre:'Мы довольны ',post:'.',es:'Estamos contentos con ___.'}],
  prep:[{pre:'Я думаю о ',post:'.',es:'Pienso en ___.'},{pre:'Мы говорим о ',post:'.',es:'Hablamos de ___.'}]
};

/* Aplana WORDS para el buscador global — igual patrón que getAllDiccionarioWords() */
function getAllCasosWords(){
  return WORDS.map(w=>({ru:w.ru, es:w.es, tr:approxPron(w.ru)}));
}
