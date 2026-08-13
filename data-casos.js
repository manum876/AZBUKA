/* ============================================================
   DATA-CASOS.JS — Fuente única de los 6 casos rusos
   Usado por: casos.html (módulo independiente) y opcionalmente
   index.html / azbuka-index.html (para el buscador transversal).
   Cargar ANTES del script que lo usa: <script src="data-casos.js"></script>
   Expone: CASE_META, CASE_ORDER, GENDER_LABEL, WORDS (~300 sustantivos
   con sus 6 formas declinadas), TEMPLATES (frases de ejemplo por caso),
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

let _casosId = 0;
const WORDS = [];
Object.entries(REG).forEach(([groupKey,group])=>{
  const type = TYPE_MAP[groupKey];
  group.list.forEach(pair=>{
    const [ru,es] = pair.split(':');
    WORDS.push({
      id:'w'+(_casosId++), ru, es, gender:genderOf(type), animate:group.animate,
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
IRREGULAR.forEach(w=>{ w.id='w'+(_casosId++); WORDS.push(w); });

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
