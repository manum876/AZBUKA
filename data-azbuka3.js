/* ============================================================
   DATA-AZBUKA3.JS — Fuente única de los sustantivos y adjetivos de
   la Unidad 3 (Sustantivos y género)
   Usado por: azbuka-3.html. Se extrajo a este archivo para que su
   vocabulario también entre al buscador transversal (mismo criterio
   que data-alphabet.js/data-diccionario.js/data-verbos.js/data-casos.js) —
   antes vivía inline en azbuka-3.html y no era buscable desde otras
   páginas. Cargar ANTES del script que lo usa:
   <script src="data-azbuka3.js"></script>
   Expone: NOUNS (69 sustantivos con género/plural/nota), ADJECTIVES
   (8 adjetivos con sus 4 formas de concordancia) y
   getAllAzbuka3Words() para el buscador global.
   ============================================================ */

const NOUNS=[
  // PERSONAS
  {id:1,ru:"мужчина",translit:"muzhchina",es:"hombre",gender:"m",category:"personas",plural:"мужчины",irregular:false,exception:true,note:"Termina en -а pero es masculino: el significado (varón) manda sobre la terminación."},
  {id:2,ru:"женщина",translit:"zhenshchina",es:"mujer",gender:"f",category:"personas",plural:"женщины",irregular:false,exception:false,note:"Termina en -а, patrón femenino regular."},
  {id:3,ru:"ребёнок",translit:"rebyonok",es:"niño / niña",gender:"m",category:"personas",plural:"дети",irregular:true,exception:false,note:"Masculino. Su plural 'дети' es irregular (no deriva de la raíz singular)."},
  {id:4,ru:"друг",translit:"drug",es:"amigo",gender:"m",category:"personas",plural:"друзья",irregular:true,exception:false,note:"Masculino terminado en consonante. Plural irregular: друзья."},
  {id:5,ru:"подруга",translit:"podruga",es:"amiga",gender:"f",category:"personas",plural:"подруги",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:6,ru:"семья",translit:"sem'ya",es:"familia",gender:"f",category:"personas",plural:"семьи",irregular:false,exception:false,note:"Femenino en -я."},
  {id:7,ru:"брат",translit:"brat",es:"hermano",gender:"m",category:"personas",plural:"братья",irregular:true,exception:false,note:"Masculino. Plural irregular: братья."},
  {id:8,ru:"сестра",translit:"sestra",es:"hermana",gender:"f",category:"personas",plural:"сёстры",irregular:true,exception:false,note:"Femenino en -а. Plural irregular con cambio de acento: сёстры."},
  {id:9,ru:"папа",translit:"papa",es:"papá",gender:"m",category:"personas",plural:"папы",irregular:false,exception:true,note:"Termina en -а pero es masculino, igual que 'мужчина' y 'дядя'."},
  {id:10,ru:"мама",translit:"mama",es:"mamá",gender:"f",category:"personas",plural:"мамы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:11,ru:"дедушка",translit:"dedushka",es:"abuelo",gender:"m",category:"personas",plural:"дедушки",irregular:false,exception:true,note:"Termina en -а pero es masculino por su significado."},
  {id:12,ru:"бабушка",translit:"babushka",es:"abuela",gender:"f",category:"personas",plural:"бабушки",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:13,ru:"дядя",translit:"dyadya",es:"tío",gender:"m",category:"personas",plural:"дяди",irregular:false,exception:true,note:"Termina en -я pero es masculino, como 'папа'."},
  {id:14,ru:"тётя",translit:"tyotya",es:"tía",gender:"f",category:"personas",plural:"тёти",irregular:false,exception:false,note:"Femenino regular en -я."},
  {id:15,ru:"сын",translit:"syn",es:"hijo",gender:"m",category:"personas",plural:"сыновья",irregular:true,exception:false,note:"Masculino en consonante. Plural irregular: сыновья."},
  {id:16,ru:"дочь",translit:"doch'",es:"hija",gender:"f",category:"personas",plural:"дочери",irregular:true,exception:true,note:"Termina en -ь pero es femenino. Plural irregular: дочери."},
  {id:17,ru:"учитель",translit:"uchitel'",es:"profesor",gender:"m",category:"personas",plural:"учителя",irregular:true,exception:false,note:"Masculino en -ь. Plural con cambio de acento: учителя."},
  {id:18,ru:"учительница",translit:"uchitel'nitsa",es:"profesora",gender:"f",category:"personas",plural:"учительницы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:19,ru:"студент",translit:"student",es:"estudiante (varón)",gender:"m",category:"personas",plural:"студенты",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:20,ru:"студентка",translit:"studentka",es:"estudiante (mujer)",gender:"f",category:"personas",plural:"студентки",irregular:false,exception:false,note:"Femenino regular en -а."},
  // CASA
  {id:21,ru:"дом",translit:"dom",es:"casa",gender:"m",category:"casa",plural:"дома",irregular:true,exception:false,note:"Masculino. Plural irregular acentuado en -а: дома."},
  {id:22,ru:"квартира",translit:"kvartira",es:"departamento",gender:"f",category:"casa",plural:"квартиры",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:23,ru:"комната",translit:"komnata",es:"habitación",gender:"f",category:"casa",plural:"комнаты",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:24,ru:"кухня",translit:"kukhnya",es:"cocina",gender:"f",category:"casa",plural:"кухни",irregular:false,exception:false,note:"Femenino en -я."},
  {id:25,ru:"окно",translit:"okno",es:"ventana",gender:"n",category:"casa",plural:"окна",irregular:false,exception:false,note:"Neutro regular en -о."},
  {id:26,ru:"дверь",translit:"dver'",es:"puerta",gender:"f",category:"casa",plural:"двери",irregular:false,exception:true,note:"Termina en -ь pero es femenino, como 'кровать' y 'тетрадь'."},
  {id:27,ru:"стол",translit:"stol",es:"mesa",gender:"m",category:"casa",plural:"столы",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:28,ru:"стул",translit:"stul",es:"silla",gender:"m",category:"casa",plural:"стулья",irregular:true,exception:false,note:"Masculino. Plural irregular: стулья."},
  {id:29,ru:"кровать",translit:"krovat'",es:"cama",gender:"f",category:"casa",plural:"кровати",irregular:false,exception:true,note:"Termina en -ь pero es femenino."},
  {id:30,ru:"диван",translit:"divan",es:"sofá",gender:"m",category:"casa",plural:"диваны",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:31,ru:"шкаф",translit:"shkaf",es:"armario",gender:"m",category:"casa",plural:"шкафы",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:32,ru:"ковёр",translit:"kovyor",es:"alfombra",gender:"m",category:"casa",plural:"ковры",irregular:true,exception:false,note:"Masculino. La 'ё' desaparece en el plural: ковры."},
  {id:33,ru:"лампа",translit:"lampa",es:"lámpara",gender:"f",category:"casa",plural:"лампы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:34,ru:"зеркало",translit:"zerkalo",es:"espejo",gender:"n",category:"casa",plural:"зеркала",irregular:false,exception:false,note:"Neutro regular en -о."},
  {id:35,ru:"холодильник",translit:"kholodil'nik",es:"heladera",gender:"m",category:"casa",plural:"холодильники",irregular:false,exception:false,note:"Masculino en consonante."},
  // CIUDAD
  {id:36,ru:"улица",translit:"ulitsa",es:"calle",gender:"f",category:"ciudad",plural:"улицы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:37,ru:"магазин",translit:"magazin",es:"tienda",gender:"m",category:"ciudad",plural:"магазины",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:38,ru:"банк",translit:"bank",es:"banco",gender:"m",category:"ciudad",plural:"банки",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:39,ru:"метро",translit:"metro",es:"metro (subte)",gender:"n",category:"ciudad",plural:"метро",irregular:true,exception:false,note:"Neutro indeclinable, préstamo del francés: no cambia en plural."},
  {id:40,ru:"школа",translit:"shkola",es:"escuela",gender:"f",category:"ciudad",plural:"школы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:41,ru:"университет",translit:"universitet",es:"universidad",gender:"m",category:"ciudad",plural:"университеты",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:42,ru:"парк",translit:"park",es:"parque",gender:"m",category:"ciudad",plural:"парки",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:43,ru:"ресторан",translit:"restoran",es:"restaurante",gender:"m",category:"ciudad",plural:"рестораны",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:44,ru:"кафе",translit:"kafe",es:"café (bar)",gender:"n",category:"ciudad",plural:"кафе",irregular:true,exception:false,note:"Neutro indeclinable, préstamo del francés."},
  {id:45,ru:"аптека",translit:"apteka",es:"farmacia",gender:"f",category:"ciudad",plural:"аптеки",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:46,ru:"больница",translit:"bol'nitsa",es:"hospital",gender:"f",category:"ciudad",plural:"больницы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:47,ru:"музей",translit:"muzey",es:"museo",gender:"m",category:"ciudad",plural:"музеи",irregular:false,exception:false,note:"Masculino terminado en -й."},
  {id:48,ru:"театр",translit:"teatr",es:"teatro",gender:"m",category:"ciudad",plural:"театры",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:49,ru:"церковь",translit:"tserkov'",es:"iglesia",gender:"f",category:"ciudad",plural:"церкви",irregular:false,exception:true,note:"Termina en -ь pero es femenino."},
  {id:50,ru:"площадь",translit:"ploshchad'",es:"plaza",gender:"f",category:"ciudad",plural:"площади",irregular:false,exception:true,note:"Termina en -ь pero es femenino."},
  // OBJETOS
  {id:51,ru:"телефон",translit:"telefon",es:"teléfono",gender:"m",category:"objetos",plural:"телефоны",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:52,ru:"компьютер",translit:"komp'yuter",es:"computadora",gender:"m",category:"objetos",plural:"компьютеры",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:53,ru:"книга",translit:"kniga",es:"libro",gender:"f",category:"objetos",plural:"книги",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:54,ru:"ручка",translit:"ruchka",es:"lapicera",gender:"f",category:"objetos",plural:"ручки",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:55,ru:"рюкзак",translit:"ryukzak",es:"mochila",gender:"m",category:"objetos",plural:"рюкзаки",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:56,ru:"ключ",translit:"klyuch",es:"llave",gender:"m",category:"objetos",plural:"ключи",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:57,ru:"часы",translit:"chasy",es:"reloj",gender:"m",category:"objetos",plural:"часы",irregular:true,exception:true,note:"Se usa siempre en plural (plurale tantum), como 'gafas' en español."},
  {id:58,ru:"сумка",translit:"sumka",es:"bolso",gender:"f",category:"objetos",plural:"сумки",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:59,ru:"тетрадь",translit:"tetrad'",es:"cuaderno",gender:"f",category:"objetos",plural:"тетради",irregular:false,exception:true,note:"Termina en -ь pero es femenino."},
  {id:60,ru:"карандаш",translit:"karandash",es:"lápiz",gender:"m",category:"objetos",plural:"карандаши",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:61,ru:"письмо",translit:"pis'mo",es:"carta",gender:"n",category:"objetos",plural:"письма",irregular:false,exception:false,note:"Neutro regular en -о."},
  {id:62,ru:"слово",translit:"slovo",es:"palabra",gender:"n",category:"objetos",plural:"слова",irregular:false,exception:false,note:"Neutro regular en -о."},
  {id:63,ru:"место",translit:"mesto",es:"lugar",gender:"n",category:"objetos",plural:"места",irregular:false,exception:false,note:"Neutro regular en -о."},
  {id:64,ru:"яблоко",translit:"yabloko",es:"manzana",gender:"n",category:"objetos",plural:"яблоки",irregular:true,exception:false,note:"Neutro. Plural irregular: яблоки (no яблока)."},
  // ANIMALES
  {id:65,ru:"кот",translit:"kot",es:"gato",gender:"m",category:"animales",plural:"коты",irregular:false,exception:false,note:"Masculino en consonante."},
  {id:66,ru:"кошка",translit:"koshka",es:"gata",gender:"f",category:"animales",plural:"кошки",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:67,ru:"собака",translit:"sobaka",es:"perro / perra",gender:"f",category:"animales",plural:"собаки",irregular:false,exception:false,note:"Femenino regular en -а, aunque se use para cualquier sexo."},
  {id:68,ru:"птица",translit:"ptitsa",es:"pájaro",gender:"f",category:"animales",plural:"птицы",irregular:false,exception:false,note:"Femenino regular en -а."},
  {id:69,ru:"рыба",translit:"ryba",es:"pez",gender:"f",category:"animales",plural:"рыбы",irregular:false,exception:false,note:"Femenino regular en -а."},
];
const ADJECTIVES=[
  {id:1,es:"grande",masc:"большой",fem:"большая",neut:"большое",plur:"большие",translit:"bolshoy"},
  {id:2,es:"pequeño",masc:"маленький",fem:"маленькая",neut:"маленькое",plur:"маленькие",translit:"malen'kiy"},
  {id:3,es:"nuevo",masc:"новый",fem:"новая",neut:"новое",plur:"новые",translit:"novyy"},
  {id:4,es:"viejo",masc:"старый",fem:"старая",neut:"старое",plur:"старые",translit:"staryy"},
  {id:5,es:"bueno",masc:"хороший",fem:"хорошая",neut:"хорошее",plur:"хорошие",translit:"khoroshiy"},
  {id:6,es:"malo",masc:"плохой",fem:"плохая",neut:"плохое",plur:"плохие",translit:"plokhoy"},
  {id:7,es:"lindo / hermoso",masc:"красивый",fem:"красивая",neut:"красивое",plur:"красивые",translit:"krasivyy"},
  {id:8,es:"interesante",masc:"интересный",fem:"интересная",neut:"интересное",plur:"интересные",translit:"interesnyy"},
];
/* Aplana NOUNS y ADJECTIVES para el buscador transversal. De los
   adjetivos se indexa solo la forma masculina (forma de diccionario),
   igual que los verbos se indexan por su infinitivo — evita duplicar
   4 entradas casi idénticas por cada adjetivo. */
function getAllAzbuka3Words(){
  const out=NOUNS.map(n=>({ru:n.ru, es:n.es, tr:n.translit}));
  ADJECTIVES.forEach(a=>out.push({ru:a.masc, es:a.es, tr:a.translit}));
  return out;
}
