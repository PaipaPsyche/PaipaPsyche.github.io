//let PRE_ALTO = ["Mount ","Peak ","Top ","High ","Hill of ","Forest of"];
let POST_ALTO = ["Hill ", "Mountains ", "Mountain", "Cannon ", "Hills ","Tundra",
 "Woods ","Cave ","Peak ","Mount ","Peaks "," ","Upper ","Boulder","Mesa"]

let POST_FOSA = ["Rift ", "Crack ", "pit ", "Abyss ", "Fault "]

let POST_VALLE = ["Valley ", "Arids ", "Plains ", "Jungle ", "River ", "Cave ","Tropics","Desert",
 " Fields ", " Swamp "," savanna","Farms", "Camps", " Oasis" , "Pond" , "Park","Taiga","Grassland",
"Plateau","Woodland","Chaparral", "Pass"]
let POST_WATER = ["Sea ", "Lake ", "Waters", "Extension ", "Point ","Strait"]
let POST_SHORE = ["Shore ", "Port ", "Reef ", "Gulf ", "Bottom ","Bay",
"Coast ", "Landing ", "Beach ", "Delta ","Cliff","Cape","Peninsula"]


let POST_NAME = ["Ville ", "Dale ", "Post ", "Stand ", " Gate", " Rise", " Fort ", " Bridge ",
                " Watch ", " Lair ", " Castle "," Rock"," Wall"," State"," Village"];
let PRE_NAME = ["Mines of ","United ","Saint ", "The ", "Last ", "", "Front ","Rocky" ,
 "Will of ", "Forge ", "Temple of ", "Camp of ","Fort ","South " , "North ","East ","West "]
let ORIGIN_NAME = ["Fist of ", "Land of ", "Fire of the first ", "Hammer of ", "Light of ",
  " Mother ", "Path of ", "Nest of ", "Guard of ", "Rise of ", "Dawn of ","Gathering of the ","Ark of the "
];

let END_NAME = ["rys", "llus", "shiba", "ndi", "rsei", "cury", "rth", "rte", "scus", "nte", "bel", "vez",
  "", "rn", "sto", "lgia", "nz", "lcani", "rd", "nucci", "bba", "xto", "ctor","hasar","stas","scia",
  "tina", "ngo", "gnikai", "ccini", "cordia","por", "lytro", "scitt","shang","kong","nasor","scar",
  "lypso", "lkanti", "ntico", "dici", "tafar", "nica", "nyx", "nsk", "lucci", "tch", "ythe","ntan","tton",
  "bino", "nita", "tana", "mble", "ptera", "bdis", "scylla", "dore", "loch", "ntos", "rtz","zdan",
  "schen", "klich", "nich", "stans", "varius", "leaux", "kour", "nse", "reau", "ctra","fgen",
  "leau", "ngria",  "lax", "nax", "nds", "ngis", "nt", "reen", "lytra", "max", "gnon","stonis",
  "sis", "tät", "rok", "fari", "tanari", "gneko", "gana", "vyr", "nys", "ghal", "tto",
  "mander", "rgen", "nde", "nt", "ngs", "ruchen", "ska", "pyr", "pton", "nge", "xy", "xion", "",
  "rga", "stin", "nge", "ngi", "lton", "stralis", "hr", "keshi", "phorus", "gonoff",
  "stein", "mark", "burg", "rtz", "lf", "rov", "rnov", "tröen", "land","doch","sterly","lvania","nsil","sduch",
  "tch", "rmir", "rsay", "ght", "mpton", "koft", "nst", "mst", "ft", "gs", "nk", "phoros",
  "mp", "lish", "lette", "tion", "zung", "schaft", "ncia", "sta", "smus", "nodon",
  "nginus", "rnet", "ster", "star", "ridas", "ston", "tani", "ton", "nata", "sky", "nov", "rys", "leude",
  "riana", "berg", "ton","tzen" , "ris", "nksy", "kov", "rok", "gnar", " nde", "lsar"]

let VOCAL = ["a", "e", "i", "o", "u"]
let SILABAS = [];

let C_SILABAS = [
  ["c", ""],
  ["v", ""],
  ["b", ""],
  ["n", ""],
  ["m", ""],
  ["l", ""],
  ["s", ""],
  ["sh", ""],
  ["ch", ""],
  ["t", ""],
  ["r", ""],
  ["p", ""],
  ["d", ""],
  ["f", ""],
  ["r", "s"],
  ["pr", ""],
  ["tr", ""],
  ["fr", ""],
  ["gr", ""],
  ["sc", ""],
  ["l", "g"],
  ["l", "p"],
  ["p", "s"],
  ["sk", ""],
  ["", "lm"],
  ["", "l"],
  ["", "m"],
  ["", "n"],
  ["", "s"],
  ["", "th"],
  ["th", ""],
  ["dr", ""],
  ["d", "ns"],
  ["", "x"],
  ["", "rg"],
  ["", "rp"],
  ["", "st"],
  ["sh", "st"],
  ["ch", "r"],
  ["sh", "r"],
  ["br", "sh"],
  ["k", "sh"],
  ["sh", "k"],
  ["x", "n"],
  ["cr", "sh"],
  ["cr", "x"],
  ["p", "ss"],
  ["s", "x"],
  ["v", "nt"],
  ["g", "st"],
  ["l", "gdr"],
  ["pr", "g"],
  ["s", "nt"],
  ["cl", "st"],
  ["f", "nst"],
  ["f", "ck"],
  ["fr", "g"],
  ["fl", "r"]
]






function add_silabas() {
  for (var j = 0; j < C_SILABAS.length; j++) {
    let C1 = C_SILABAS[j][0];
    let C2 = C_SILABAS[j][1];
    for (var i = 0; i < VOCAL.length; i++) {
      if(VOCAL[i]!=" "){
        SILABAS.push(C1 + VOCAL[i] + C2);

      }

    }
  }
}




function gen_code(elemento){

  let root = elemento.give_closest(CENTROS).origin_name
  let sigla = root.substring(0,3).toUpperCase()

  let number = 1000+last_marine;


  return {
    "NAME": sigla+"-"+number,
    "RAIZ": root
  }
}



function gen_nombre(elemento) {
  let raiz = "";
  let nombre = "";
  let valor = m.MAPA[elemento.X][elemento.Y];
  let tipo = m.M_tipos[elemento.X][elemento.Y];

  let long = int(random(2));
  for (let i = 0; i < (1 + long); i++) {
    raiz = raiz + random(SILABAS)
    if (random() > 0.8) {
      raiz = raiz + random(["-", "'"]) + random(SILABAS);
    }
  }

  if (raiz.length > 7 & random() > 0.2) {
    raiz = raiz.slice(4, raiz.length - 1)
  }

  if (raiz.length<3){
    raiz = raiz+random(SILABAS)
  }

  if (elemento.is_origin == 1) {
    raiz = random(ORIGIN_NAME) + raiz;
    nombre = raiz;
    return {
      "NAME": nombre,
      "RAIZ": raiz
    };
  }


  if (random() > 0.2 & CENTROS.length > 1) {
    raiz = "";
    if (elemento.give_closest(CENTROS).nombre["RAIZ"].length > 4) {
      let word = elemento.give_closest(CENTROS).nombre["RAIZ"].split(" ")
      raiz = word.pop().slice(0, min(4, word.length))  + random(END_NAME);
    } else {
      raiz = elemento.give_closest(CENTROS).nombre["RAIZ"] + random(SILABAS);
    }
    raiz = random(VOCAL) + raiz;
  }






  if (random() < 0.4) {
    raiz = raiz  + random(END_NAME);
  }
  if (random() < 0.2) {
    raiz = random(PRE_NAME) + raiz;
  }

  // if(random()>0.5){
  //   raiz=raiz+random(END_NAME);
  // }
  // else if(random()<0.5){
  //   raiz=random(PRE_NAME)+raiz;
  // }
  if (nombre == "") {
    nombre = raiz;
  }

  if (tipo == -2) {
    nombre = raiz + " " + random(POST_FOSA);

  }

  if (tipo == -1) {
    nombre = raiz + " " + random(POST_WATER);

  }

  if (tipo == 1 & valor < 0.53) {
    nombre = raiz + " " + random(POST_SHORE);


  }






  if (tipo == 1) {
    if (random() < 0.2) {
      nombre = raiz + " " + random(POST_VALLE);
    } else if (random() < 0.3) {
      nombre = raiz + random(VOCAL) + " " + random(POST_NAME)
    }

  }
  if (tipo == 2 & random() < 0.4) {
    if (random() < 0.6) {
      nombre = raiz + " " + random(POST_ALTO);
    } else if (random() < 0.2) {
      nombre = raiz + " " + random(POST_NAME);
    }

  }


  if (elemento.give_closest_all(CENTROS).T == -1) {
    raiz = elemento.give_closest_all(CENTROS).nombre["RAIZ"];
    nombre = "New " + raiz;
    if (raiz.length > 3 & random() < 0.5) {
      nombre = raiz.slice(0, 3) + random(END_NAME);
      elemento.give_closest_all(CENTROS).nombre["NAME"] = "Old " + elemento.give_closest_all(CENTROS).nombre["RAIZ"]
    }

  }



  return {
    "NAME": nombre,
    "RAIZ": raiz
  }

}
