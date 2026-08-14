/* ============================================================
   DATA-AZBUKA2.JS — Fuente única del vocabulario y diálogos de la
   Unidad 2 (Presentaciones básicas)
   Usado por: azbuka-2.html. Se extrajo a este archivo para que su
   vocabulario también entre al buscador transversal (igual criterio
   que data-alphabet.js/data-diccionario.js/data-verbos.js/data-casos.js) —
   antes vivía inline en azbuka-2.html y no era buscable desde otras
   páginas. Cargar ANTES del script que lo usa:
   <script src="data-azbuka2.js"></script>
   Expone: MODULES2 (10 módulos temáticos con vocab/teoría/ejemplos),
   DIALOGUES2 (7 diálogos completos) y getAllAzbuka2Words() para el
   buscador global.
   ============================================================ */

const MODULES2=[
{id:1,title:"Saludos",icon:"👋",objective:"Saludar y despedirse en situaciones formales e informales.",
 theory:"Здравствуйте es el saludo formal (a desconocidos, mayores, en el trabajo). Привет es informal, entre amigos o gente de tu edad. Доброе утро / Добрый день / Добрый вечер se usan según la hora del día, tanto formal como informalmente. Пока es la despedida informal; До свидания es la formal. Спасибо y Пожалуйста son básicos de cortesía desde el primer día.",
 vocab:[
  {ru:"Здравствуйте",tr:"Zdrávstvuyte",es:"Hola (formal)",note:"Saludo formal, úsalo con desconocidos o mayores"},
  {ru:"Привет",tr:"Privét",es:"Hola (informal)",note:"Entre amigos o gente joven"},
  {ru:"Доброе утро",tr:"Dóbroye útro",es:"Buenos días",note:"Hasta el mediodía aprox."},
  {ru:"Добрый день",tr:"Dóbriy den'",es:"Buenas tardes",note:"Desde el mediodía hasta el atardecer"},
  {ru:"Добрый вечер",tr:"Dóbriy véchyer",es:"Buenas noches (al llegar)",note:"Al encontrarse por la noche"},
  {ru:"Спокойной ночи",tr:"Spakóynay nóchi",es:"Buenas noches (al despedirse)",note:"Solo para despedirse antes de dormir"},
  {ru:"Пока",tr:"Paká",es:"Chau",note:"Despedida informal"},
  {ru:"До свидания",tr:"Da svidániya",es:"Adiós (formal)",note:"Despedida formal"},
  {ru:"До завтра",tr:"Da záftra",es:"Hasta mañana",note:""},
  {ru:"Спасибо",tr:"Spasíba",es:"Gracias",note:""},
  {ru:"Пожалуйста",tr:"Pazhálusta",es:"Por favor / de nada",note:"Sirve para ambas cosas según el contexto"},
  {ru:"Извините",tr:"Izvinítye",es:"Disculpe / perdón",note:"Formal, para pedir disculpas o llamar la atención"},
 ],
 examples:[
  {title:"Saludo formal",lines:[["A","Здравствуйте!","Zdrávstvuyte!","¡Hola!"],["B","Здравствуйте!","Zdrávstvuyte!","¡Hola!"]]},
  {title:"Despedida informal",lines:[["A","Пока!","Paká!","¡Chau!"],["B","Пока!","Paká!","¡Chau!"]]},
 ]},

{id:2,title:"Presentarse",icon:"🙋",objective:"Decir tu nombre y presentarte a otra persona.",
 theory:"«Меня зовут…» significa literalmente «me llaman…» y es la forma más natural de decir tu nombre. «Я…» (Yo…) también funciona pero es más directo/escueto. «Это…» se usa para presentar a otra persona («Este/esta es…»). Después de conocer a alguien se dice «Очень приятно» (encantado/a) — un hombre también puede decir «Рад познакомиться» y una mujer «Рада познакомиться».",
 vocab:[
  {ru:"Меня зовут…",tr:"Miniá zavút…",es:"Me llamo…",note:"Forma más natural y usada"},
  {ru:"Я…",tr:"Ya…",es:"Yo soy… / Yo…",note:"Más directo, menos usado para el nombre"},
  {ru:"Это…",tr:"Éta…",es:"Este/esta es…",note:"Para presentar a otra persona"},
  {ru:"Очень приятно",tr:"Óchen' priyátna",es:"Mucho gusto",note:"Neutro, lo dice cualquiera"},
  {ru:"Рад познакомиться",tr:"Rad paznakómitsa",es:"Encantado de conocerte",note:"Dicho por un hombre"},
  {ru:"Рада познакомиться",tr:"Ráda paznakómitsa",es:"Encantada de conocerte",note:"Dicho por una mujer"},
 ],
 examples:[
  {title:"Presentación simple",lines:[["A","Меня зовут Иван.","Miniá zavút Iván.","Me llamo Iván."],["B","Очень приятно!","Óchen' priyátna!","¡Mucho gusto!"]]},
 ]},

{id:3,title:"Preguntar nombres",icon:"❓",objective:"Preguntar cómo se llama alguien y quién es alguien.",
 theory:"«Как тебя зовут?» es informal (tú), «Как вас зовут?» es formal o plural (usted/ustedes). «Кто это?» pregunta quién es una persona que señalás; se responde con «Это…».",
 vocab:[
  {ru:"Как тебя зовут?",tr:"Kak tebiá zavút?",es:"¿Cómo te llamas?",note:"Informal"},
  {ru:"Как вас зовут?",tr:"Kak vas zavút?",es:"¿Cómo se llama (usted)?",note:"Formal o plural"},
  {ru:"Кто это?",tr:"Kto éta?",es:"¿Quién es?",note:"Para preguntar por una tercera persona"},
  {ru:"Это…",tr:"Éta…",es:"Es…",note:"Respuesta a «Кто это?»"},
 ],
 examples:[
  {title:"Preguntar el nombre",lines:[["A","Как тебя зовут?","Kak tebiá zavút?","¿Cómo te llamás?"],["B","Меня зовут Анна. А тебя?","Miniá zavút Ánna. A tebiá?","Me llamo Anna. ¿Y vos?"],["A","Меня зовут Иван.","Miniá zavút Iván.","Me llamo Iván."]]},
 ]},

{id:4,title:"Países y nacionalidades",icon:"🌍",objective:"Decir de dónde eres y reconocer países y nacionalidades.",
 theory:"«Откуда ты?» pregunta de dónde eres; se responde «Я из…» + país. Las nacionalidades cambian según el género: la forma masculina y femenina suelen ser distintas (испанец / испанка). «Ты русский?» pregunta si alguien es de una nacionalidad; se responde «Да» o «Нет» + la nacionalidad correcta.",
 vocab:[
  {ru:"Откуда ты?",tr:"Atkúda ty?",es:"¿De dónde eres?",note:"Informal"},
  {ru:"Я из…",tr:"Ya iz…",es:"Soy de…",note:"+ país en genitivo (se aprende luego)"},
  {ru:"Ты русский?",tr:"Ty rúskiy?",es:"¿Eres ruso?",note:""},
  {ru:"Нет",tr:"Nyet",es:"No",note:""},
  {ru:"Да",tr:"Da",es:"Sí",note:""},
  {ru:"Россия",tr:"Rassíya",es:"Rusia",note:"país"},
  {ru:"русский / русская",tr:"rúskiy / rúskaya",es:"ruso / rusa",note:"nacionalidad m/f"},
  {ru:"Испания",tr:"Ispániya",es:"España",note:"país"},
  {ru:"испанец / испанка",tr:"ispányets / ispánka",es:"español / española",note:"nacionalidad m/f"},
  {ru:"Аргентина",tr:"Argentína",es:"Argentina",note:"país"},
  {ru:"аргентинец / аргентинка",tr:"argentínyets / argentínka",es:"argentino / argentina",note:"nacionalidad m/f"},
  {ru:"Украина",tr:"Ukraína",es:"Ucrania",note:"país"},
  {ru:"украинец / украинка",tr:"ukraínyets / ukraínka",es:"ucraniano / ucraniana",note:"nacionalidad m/f"},
  {ru:"Беларусь",tr:"Bielarús'",es:"Bielorrusia",note:"país"},
  {ru:"белорус / белоруска",tr:"bielarús / bielarúska",es:"bielorruso / bielorrusa",note:"nacionalidad m/f"},
  {ru:"Франция",tr:"Frántsiya",es:"Francia",note:"país"},
  {ru:"француз / француженка",tr:"frantsúz / frantsúzhenka",es:"francés / francesa",note:"nacionalidad m/f"},
  {ru:"Италия",tr:"Itáliya",es:"Italia",note:"país"},
  {ru:"итальянец / итальянка",tr:"ital'yánets / ital'yánka",es:"italiano / italiana",note:"nacionalidad m/f"},
  {ru:"Германия",tr:"Germániya",es:"Alemania",note:"país"},
  {ru:"немец / немка",tr:"nyémets / nyémka",es:"alemán / alemana",note:"nacionalidad m/f"},
  {ru:"Польша",tr:"Pól'sha",es:"Polonia",note:"país"},
  {ru:"поляк / полька",tr:"paliák / pól'ka",es:"polaco / polaca",note:"nacionalidad m/f"},
  {ru:"США",tr:"Sae-Shá",es:"Estados Unidos",note:"país (sigla)"},
  {ru:"американец / американка",tr:"amerikányets / amerikánka",es:"estadounidense (m/f)",note:"nacionalidad m/f"},
  {ru:"Мексика",tr:"Méksika",es:"México",note:"país"},
  {ru:"мексиканец / мексиканка",tr:"meksikányets / meksikánka",es:"mexicano / mexicana",note:"nacionalidad m/f"},
  {ru:"Колумбия",tr:"Kalúmbiya",es:"Colombia",note:"país"},
  {ru:"Чили",tr:"Chíli",es:"Chile",note:"país"},
  {ru:"Перу",tr:"Peru",es:"Perú",note:"país"},
  {ru:"Бразилия",tr:"Brazíliya",es:"Brasil",note:"país"},
  {ru:"бразилец / бразильянка",tr:"brazílyets / brazil'yánka",es:"brasileño / brasileña",note:"nacionalidad m/f"},
  {ru:"Португалия",tr:"Partugáliya",es:"Portugal",note:"país"},
  {ru:"Великобритания",tr:"Vyelikabritániya",es:"Reino Unido",note:"país"},
  {ru:"англичанин / англичанка",tr:"anglicháninn / anglichánka",es:"inglés / inglesa",note:"nacionalidad m/f"},
  {ru:"Китай",tr:"Kitáy",es:"China",note:"país"},
  {ru:"китаец / китаянка",tr:"kitáyets / kitayánka",es:"chino / china",note:"nacionalidad m/f"},
  {ru:"Япония",tr:"Yapóniya",es:"Japón",note:"país"},
  {ru:"японец / японка",tr:"yapónyets / yapónka",es:"japonés / japonesa",note:"nacionalidad m/f"},
  {ru:"Корея",tr:"Karéya",es:"Corea",note:"país"},
  {ru:"Индия",tr:"Índiya",es:"India",note:"país"},
  {ru:"Канада",tr:"Kanáda",es:"Canadá",note:"país"},
  {ru:"канадец / канадка",tr:"kanádyets / kanádka",es:"canadiense (m/f)",note:"nacionalidad m/f"},
  {ru:"Куба",tr:"Kúba",es:"Cuba",note:"país"},
  {ru:"кубинец / кубинка",tr:"kubínyets / kubínka",es:"cubano / cubana",note:"nacionalidad m/f"},
  {ru:"Венесуэла",tr:"Venesuéla",es:"Venezuela",note:"país"},
  {ru:"Эквадор",tr:"Ekvadór",es:"Ecuador",note:"país"},
  {ru:"Уругвай",tr:"Urugváy",es:"Uruguay",note:"país"},
  {ru:"Парагвай",tr:"Paragváy",es:"Paraguay",note:"país"},
  {ru:"Боливия",tr:"Balíviya",es:"Bolivia",note:"país"},
  {ru:"Турция",tr:"Túrtsiya",es:"Turquía",note:"país"},
  {ru:"турок / турчанка",tr:"túrak / turchánka",es:"turco / turca",note:"nacionalidad m/f"},
  {ru:"Египет",tr:"Yegípyet",es:"Egipto",note:"país"},
 ],
 examples:[
  {title:"De dónde eres",lines:[["A","Откуда ты?","Atkúda ty?","¿De dónde sos?"],["B","Я из Аргентины. Я аргентинец.","Ya iz Argentíny. Ya argentínyets.","Soy de Argentina. Soy argentino."],["A","Ты русский?","Ty rúskiy?","¿Sos ruso?"],["B","Нет, я аргентинец.","Nyet, ya argentínyets.","No, soy argentino."]]},
 ]},

{id:5,title:"Idiomas",icon:"🗣️",objective:"Decir qué idiomas hablas o estudias.",
 theory:"«Я говорю на…» + idioma indica qué hablás; en el habla informal muchos simplifican a «Я говорю по-русски» (uso del prefijo по- + adjetivo). «Я изучаю…» indica qué estás estudiando/aprendiendo.",
 vocab:[
  {ru:"Я говорю по-русски",tr:"Ya gavariú pa-rúski",es:"Hablo ruso",note:"Estructura fija con по-"},
  {ru:"Я изучаю русский",tr:"Ya izucháyu rúskiy",es:"Estudio ruso",note:""},
  {ru:"русский",tr:"rúskiy",es:"ruso (idioma)",note:""},
  {ru:"испанский",tr:"ispánskiy",es:"español (idioma)",note:""},
  {ru:"английский",tr:"anglíyskiy",es:"inglés (idioma)",note:""},
  {ru:"каталанский",tr:"katalánskiy",es:"catalán (idioma)",note:""},
  {ru:"французский",tr:"frantsúzskiy",es:"francés (idioma)",note:""},
 ],
 examples:[
  {title:"Qué idiomas hablas",lines:[["A","Ты говоришь по-английски?","Ty gavarísh pa-anglíyski?","¿Hablás inglés?"],["B","Да, и я изучаю русский.","Da, i ya izucháyu rúskiy.","Sí, y estudio ruso."]]},
 ]},

{id:6,title:"¿Cómo estás?",icon:"🙂",objective:"Preguntar cómo está alguien y responder.",
 theory:"«Как дела?» es la pregunta estándar entre pares. Se responde con un adjetivo/adverbio corto: Хорошо (bien), Очень хорошо (muy bien), Нормально (normal / más o menos), Плохо (mal), Отлично (excelente). Devolver la pregunta con «А у тебя?» (¿y vos?) es casi obligatorio en la conversación real.",
 vocab:[
  {ru:"Как дела?",tr:"Kak dielá?",es:"¿Cómo estás?",note:""},
  {ru:"Хорошо",tr:"Jarashó",es:"Bien",note:""},
  {ru:"Очень хорошо",tr:"Óchen' jarashó",es:"Muy bien",note:""},
  {ru:"Нормально",tr:"Narmál'na",es:"Normal / más o menos",note:""},
  {ru:"Плохо",tr:"Plója",es:"Mal",note:""},
  {ru:"Отлично",tr:"Atlíchna",es:"Excelente",note:""},
  {ru:"Спасибо",tr:"Spasíba",es:"Gracias",note:"se repite acá en contexto de respuesta"},
  {ru:"А у тебя?",tr:"A u tebiá?",es:"¿Y vos/tú?",note:"Para devolver la pregunta"},
 ],
 examples:[
  {title:"Cómo estás",lines:[["A","Привет! Как дела?","Privét! Kak dielá?","¡Hola! ¿Cómo estás?"],["B","Хорошо, спасибо. А у тебя?","Jarashó, spasíba. A u tebiá?","Bien, gracias. ¿Y vos?"],["A","Тоже хорошо.","Tózhe jarashó.","También bien."]]},
 ]},

{id:7,title:"Pronombres personales",icon:"👤",objective:"Reconocer y usar los pronombres personales básicos.",
 theory:"Por ahora solo hay que reconocer los pronombres, sin conjugaciones complejas: Я (yo), Ты (tú, informal), Он (él), Она (ella), Мы (nosotros), Вы (usted / ustedes / vosotros, formal o plural), Они (ellos/ellas). El ruso no tiene un verbo «ser» explícito en presente, por eso «Я Иван» ya significa «Yo soy Iván», sin necesidad de un verbo.",
 vocab:[
  {ru:"Я",tr:"Ya",es:"Yo",note:""},
  {ru:"Ты",tr:"Ty",es:"Tú / vos (informal)",note:""},
  {ru:"Он",tr:"On",es:"Él",note:""},
  {ru:"Она",tr:"Aná",es:"Ella",note:""},
  {ru:"Мы",tr:"My",es:"Nosotros/as",note:""},
  {ru:"Вы",tr:"Vy",es:"Usted / ustedes / vosotros",note:"formal o plural"},
  {ru:"Они",tr:"Aní",es:"Ellos/as",note:""},
 ],
 examples:[
  {title:"Ser implícito",lines:[["A","Я Иван.","Ya Iván.","Yo soy Iván."],["B","Она Анна. Они дома.","Aná Ánna. Aní dóma.","Ella es Anna. Ellos están en casa."]]},
 ]},

{id:8,title:"Frases útiles",icon:"💡",objective:"Manejar frases de supervivencia desde el primer día.",
 theory:"Estas frases sirven para sostener cualquier conversación cuando algo no se entiende: pedir que repitan, que hablen más despacio, o simplemente avisar que estás aprendiendo ruso. Son de las expresiones más rentables de todo el curso.",
 vocab:[
  {ru:"Я не понимаю",tr:"Ya nye panimáyu",es:"No entiendo",note:""},
  {ru:"Повторите, пожалуйста",tr:"Paftarítye, pazhálusta",es:"Repita, por favor",note:"formal"},
  {ru:"Медленнее, пожалуйста",tr:"Myédlyennyeye, pazhálusta",es:"Más despacio, por favor",note:""},
  {ru:"Что это?",tr:"Shto éta?",es:"¿Qué es esto?",note:""},
  {ru:"Что значит…?",tr:"Shto znáchit…?",es:"¿Qué significa…?",note:""},
  {ru:"Я учу русский",tr:"Ya uchú rúskiy",es:"Estoy aprendiendo ruso",note:""},
 ],
 examples:[
  {title:"Pidiendo ayuda",lines:[["A","Я не понимаю. Повторите, пожалуйста.","Ya nye panimáyu. Paftarítye, pazhálusta.","No entiendo. Repita, por favor."],["B","Конечно! Медленнее?","Kanyéshna! Myédlyennyeye?","¡Claro! ¿Más despacio?"]]},
 ]},

{id:9,title:"Conversaciones reales",icon:"💬",objective:"Sostener una conversación completa combinando todo lo aprendido.",
 theory:"En este módulo no hay vocabulario nuevo: el objetivo es unir todo lo anterior en diálogos completos, cada vez un poco más largos, que puedas leer, escuchar, completar y ordenar.",
 vocab:[],
 examples:[]},

{id:10,title:"Proyecto final",icon:"🏁",objective:"Escribir una conversación completa sin ayuda.",
 theory:"El proyecto final consiste en escribir, sin ayuda, una conversación breve que incluya: presentarte, decir de dónde sos, qué idiomas hablás, preguntar el nombre del otro y despedirte. No hay una única respuesta correcta: lo importante es que uses correctamente las estructuras de la unidad.",
 vocab:[],
 examples:[]},
];

const DIALOGUES2=[
 {title:"Primer encuentro",lines:[
   ["A","Привет!","Privét!","¡Hola!"],
   ["B","Привет! Как тебя зовут?","Privét! Kak tebiá zavút?","¡Hola! ¿Cómo te llamás?"],
   ["A","Меня зовут Иван. Очень приятно.","Miniá zavút Iván. Óchen' priyátna.","Me llamo Iván. Mucho gusto."],
   ["B","Мне тоже. Я Мария.","Mnye tózhe. Ya Maríya.","Igualmente. Yo soy María."],
 ]},
 {title:"De dónde eres",lines:[
   ["A","Откуда ты?","Atkúda ty?","¿De dónde sos?"],
   ["B","Я из Испании. А ты?","Ya iz Ispánii. A ty?","Soy de España. ¿Y vos?"],
   ["A","Я из Аргентины. Я аргентинец.","Ya iz Argentíny. Ya argentínyets.","Soy de Argentina. Soy argentino."],
 ]},
 {title:"Idiomas",lines:[
   ["A","Ты говоришь по-английски?","Ty gavarísh pa-anglíyski?","¿Hablás inglés?"],
   ["B","Да, немного. И я изучаю русский.","Da, nyemnóga. I ya izucháyu rúskiy.","Sí, un poco. Y estudio ruso."],
   ["A","Отлично! Я тоже изучаю русский.","Atlíchna! Ya tózhe izucháyu rúskiy.","¡Excelente! Yo también estudio ruso."],
 ]},
 {title:"Cómo estás",lines:[
   ["A","Привет! Как дела?","Privét! Kak dielá?","¡Hola! ¿Cómo estás?"],
   ["B","Хорошо, спасибо. А у тебя?","Jarashó, spasíba. A u tebiá?","Bien, gracias. ¿Y vos?"],
   ["A","Тоже хорошо, спасибо.","Tózhe jarashó, spasíba.","También bien, gracias."],
 ]},
 {title:"Presentando a alguien",lines:[
   ["A","Кто это?","Kto éta?","¿Quién es?"],
   ["B","Это Анна. Она из России.","Éta Ánna. Aná iz Rassíi.","Es Anna. Ella es de Rusia."],
   ["A","Очень приятно, Анна!","Óchen' priyátna, Ánna!","¡Mucho gusto, Anna!"],
 ]},
 {title:"No entiendo",lines:[
   ["A","Как тебя зовут?","Kak tebiá zavút?","¿Cómo te llamás?"],
   ["B","Извините, я не понимаю. Медленнее, пожалуйста.","Izvinítye, ya nye panimáyu. Myédlyennyeye, pazhálusta.","Perdón, no entiendo. Más despacio, por favor."],
   ["A","Как. Тебя. Зовут?","Kak. Tebiá. Zavút?","¿Cómo. Te. Llamás?"],
   ["B","А, понятно! Меня зовут Мария.","A, paniátna! Miniá zavút Maríya.","¡Ah, entendido! Me llamo María."],
 ]},
 {title:"Despedida",lines:[
   ["A","Мне пора идти. До завтра!","Mnye pará idtí. Da záftra!","Me tengo que ir. ¡Hasta mañana!"],
   ["B","Пока! Было очень приятно.","Paká! Býla óchen' priyátna.","¡Chau! Fue un placer."],
   ["A","До свидания!","Da svidániya!","¡Adiós!"],
 ]},
];

/* Aplana el vocabulario de los 10 módulos — usado por azbuka-2.html
   internamente y por el buscador transversal (core.js). Solo se indexa
   el vocabulario EXPLÍCITO de cada módulo (target vocabulary), no las
   líneas de los diálogos de ejemplo, para no duplicar entradas ni
   meter ruido incidental en los resultados de búsqueda. */
function getAllAzbuka2Words(){
  const out=[];
  MODULES2.forEach(m=>m.vocab.forEach(w=>out.push({ru:w.ru, es:w.es, tr:w.tr})));
  return out;
}
