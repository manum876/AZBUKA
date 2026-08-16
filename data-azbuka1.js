/* ============================================================
   DATA-AZBUKA1.JS — Fuente única de los diálogos de la Unidad 1
   (Alfabeto y pronunciación)
   Fase 3 de la migración a léxico central — ver MIGRACION_LEXICO.md.
   Extraído desde azbuka-1.html, donde antes vivía embebido como
   const DIALOGUES dentro del <script> de la página.
   Cargar ANTES del script que lo usa:
   <script src="data-azbuka1.js"></script>
   Expone: DIALOGUES1 (3 mini diálogos de la Unidad 1).
   No se registra en el buscador transversal (AZ_SEARCH_INDEX):
   estas líneas son diálogo de ejemplo/contexto, no una lista de
   vocabulario objetivo con traducción palabra por palabra — mismo
   criterio ya aplicado a DIALOGUES2 en data-azbuka2.js y a las
   líneas de ejemplo dentro de MODULES2. Si en el futuro se agrega
   vocabulario objetivo explícito a la Unidad 1 más allá del
   alfabeto (que ya se indexa vía data-alphabet.js), se indexará ahí.
   ============================================================ */
const DIALOGUES1=[
  {title:"Saludo",lines:[
    ["A","Привет!","Privét!","¡Hola!"],
    ["B","Привет! Как дела?","Privét! Kak dielá?","¡Hola! ¿Cómo estás?"],
    ["A","Хорошо, спасибо. А у тебя?","Jarashó, spasíba. A u tebiá?","Bien, gracias. ¿Y vos?"],
    ["B","Тоже хорошо.","Tózhe jarashó.","También bien."],
  ]},
  {title:"Presentarse",lines:[
    ["A","Как тебя зовут?","Kak tebiá zavút?","¿Cómo te llamás?"],
    ["B","Меня зовут Анна. А тебя?","Miniá zavút Ánna. A tebiá?","Me llamo Anna. ¿Y vos?"],
    ["A","Меня зовут Иван. Очень приятно!","Miniá zavút Iván. Óchien' priiátna!","Me llamo Iván. ¡Mucho gusto!"],
  ]},
  {title:"Despedida",lines:[
    ["A","Мне пора идти.","Mnie pará idtí.","Me tengo que ir."],
    ["B","Пока! До встречи!","Paká! Da fstriéchi!","¡Chau! ¡Hasta pronto!"],
  ]},
];
