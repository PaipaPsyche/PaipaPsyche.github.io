//let PRE_ALTO = ["Mount ","Peak ","Top ","High ","Hill of ","Forest of"];


let POST_TOP=[ "Mountains ", "Mountain", "Tundra","Peak ","Mount ","Peaks ","Upper ", "Mount","Glacier"]

let POST_BOT=["Rift ", "Crack ", "pit ", "Abyss ", "Fault ","Trench ","Deep"]




let POST_ALTO = ["Hill ", "Mountains ", "Mountain", "Cannon ", "Hills ","Tundra",
 "Woods ","Cave ","Peak ","Mount ","Peaks "," ","Upper ","Boulder","Mesa", "Mount"]

let POST_FOSA = ["Rift ", "Crack ", "pit ", "Abyss ", "Fault ","Trench ","Deep"]

let POST_VALLE = ["Valley ", "Arids ", "Plains ", "Jungle ", "River ", "Cave ","Tropics","Desert",
 " Fields ", " Swamp "," savanna","Farms", "Camps", " Oasis" , "Pond" , "Park","Taiga","Grassland",
"Plateau","Woodland","Chaparral", "Pass"]
let POST_WATER = ["Sea ", "Waters", "Extension ", "Point ","Strait"]
let POST_SHORE = ["Shore ", "Port ", "Reef ", "Gulf ", "Bottom ","Bay",
"Coast ", "Landing ", "Beach ", "Delta ","Cliff","Cape","Peninsula"]



let POST_EPIC_LOW=["Sea ", "Sunken ruins", "underwater chimneys", "Ocean", "electric anomaly","magnetic anomaly",
  " underwater volcano", "perpetual storm","Currents" ,"Sunken city", "Crater" ]
let POST_EPIC_HIGH=["Crater","Tunnels","Firepit", "Volcano" ,"Hidden Beach", "Salt valley", "Obsidian Terrains",
                "Ruins","Carbon deposit","Fossil site", "Magma deposit", "electric anomaly","magnetic anomaly",
              "Lost city" , "Falls"]

let POST_NAME = ["Ville ", "Dale ", "Post ", "Stand ", " Gate", " Rise", " Fort ", " Bridge ",
                " Watch ", " Lair ", " Castle "," Rock"," Wall"," State"," Village"];
let PRE_NAME = ["Mines of ","United ","Saint ", "The ", "Last ", "", "Front ","Rocky " ,
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
  ["m", "r"],
  ["h", ""],
  ["", "n"],
  ["sn", "p"],
  ["sl", "p"],
  ["cr", "ss"],
  ["cr", "st"],
  ["sn", "p"],
  ["d", ""],
  ["f", ""],
  ["", "c"],
  ["", "v"],
  ["", "b"],
  ["", "n"],
  ["", "m"],
  ["", "l"],
  ["", "s"],
  ["", "sh"],
  ["", "ch"],
  ["", "t"],
  ["b", "rg"],
  ["v", "rg"],
  ["b", "ltr"],
  ["m", "tt"],
  ["ph", "r"],
  ["chr", "st"],
  ["m", "tr"],
  ["d", "m"],
  ["g", "th"],
  ["t", "nc"],
  ["d", "st"],
  ["r", "st"],
  ["", "r"],
  ["sc", "r"],
  ["r", "pt"],
  ["cr", "sc"],
  ["", "d"],
  ["", "f"],
  ["", "p"],
  ["v", "nd"],
  ["d", "sh"],
  ["s", "mps"],
  ["n", "gh"],
  ["h", "gh"],
  ["n", "x"],
  ["cr", "z"],
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
  ["", "r"],
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
  ["p", "ss"],
  ["v", "nt"],
  ["g", "st"],
  ["l", "gdr"],
  ["pr", "g"],
  ["s", "nt"],
  ["cl", "st"],
  ["f", "nst"],
  ["f", "ck"],
  ["fr", "g"],
  ["p", "ch"],
  ["l", "nt"],
  ["n", "rd"],
  ["h", "sh"],
  ["ch", "h"],
  ["w", "ng"],
  ["fl", "r"]
]

let PRE_ERA_A=["dark ","golden","thousand year","first great","imperial","cursed","blessed","cruel","slow","last","blessed",
"glorious","dreadful","false","violent","long","short","silver","iron","fierce","nameless","fast","colorful","strong"]
let PRE_ERA_B=["Neo","traditional","late","pre","post","super","multi","mini","early","broken","weak","inter","infra","ultra"]
let PRE_ERA_C=["war","cold war","inquisition","infestation","fall","tremor","silence","growth","rebelion","revolution","cataclysm","sorrow","death","gods",
"inflation","empire","kingdom","state","regime","unification","consolidation","glory","globalization","depression","disintegration","feudalism","Republic"]
function name_era(){
  let n = era;
  let orig = CENTROS[0].origin_name;
  let randcit = active_cities.length==0?random(CENTROS).nombre["NAME"]:random(active_cities).nombre["NAME"];
  let capname = cap.nombre["NAME"]
  let att1 = random(PRE_ERA_A)
  let att2 = random(PRE_ERA_B)
  let item =  random(PRE_ERA_C)
  let pres;
    if(n==0){
       pres = [`Rise of the ${orig}`,`Arrival of the ${orig}`,`The first ${orig}`,`${orig} Prima`,`The great ${orig} explorations`,
       `Early ${orig} colonies`,`First songs of the ${orig}`,`${orig} origins`,`prehistorical ${orig}`,`${orig} tribes`]

    }
    else if(n==1){

      pres = [`${orig} colonialism`,`${att1} fall of ${capname}`,`The ${att1} abundance`,
        `Pre industrial ${capname}`,`${orig} minning rush`,`${att2}-renaisance`,`${att2} expansion of the ${att1} ${item}`,
      `${att2}-colonialism`,`${att2}-imperialism`,`${att2} - ${capname}`,`The ${item} of the ${att1} ${capname}`]



    }else if (n==2) {

       pres = [`${orig} globalism`,`${capname} great depression`,`The ${att1} bankruptcy`,
        `The order of ${randcit}`,`${orig} illumination`,`The ${att1} ${item}`,`${capname} starvation`,
      `${att1} industrialization`,`The ${randcit} minor ${item} `,`The ${capname}  ${item}`]


  }else if (n==3) {

     pres = [`${orig} decay`,`${capname} solitude`,`The last stand of the ${orig}`,`echo of the ${orig}`,`The protectorate of ${capname}`,
      `The order of ${capname}`,`The last ${orig}`,`The ${att1} ${item}`,`The rotten ${capname}`,`${capname} Ultima`,
    `${item} of the ${att1} ${orig}`,`Eternal ${capname}`,`${att1} ${att2} ${item}`,`The ${att1} legacy of the ${orig}`]

  }
    return (random(pres)).toLowerCase();
}




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


function mid_vocal(word){
  let n = word.length
  n = int(n/2);
  let a = word.slice(0,n);
  let b = word.slice(n,word.length);
  let ans = a + random(VOCAL) + b;
  return ans;
}

function mid_silaba(word){
  let n = word.length
  n = int(n/2);
  let a = word.slice(0,n);
  let b = word.slice(n,word.length);
  let ans = a + random(SILABAS) + b;
  return ans;
}



function gen_root(elemento){
  let raiz = "";
  let nombre = "";


  let long = int(random(4));
  for (let i = 0; i < (1 + long); i++) {
    raiz = raiz + random(SILABAS)
    if (random() > 0.8 && i<long/2 && i>2) {
      raiz = raiz + random(["-", "'"]) + random(SILABAS);
    }
    else if (random() > 0.7) {
      raiz = raiz + random(VOCAL);
    }
  }
  if (raiz.length > 8 & random() < 0.2) {
    raiz = raiz.slice(4, raiz.length - 1)
    raiz = mid_vocal(raiz)
    raiz = raiz + random(SILABAS);
    if(random()>0.5){
      raiz = raiz + random(VOCAL);}
  }

  if (raiz.length<4){
    raiz = mid_silaba(raiz);
    raiz = mid_vocal(raiz);
    raiz = raiz+ random(SILABAS);


  }


  return {
        "NAME": nombre,
        "RAIZ": raiz
      };
}

function name_markpoint(elemento){
  let name = gen_root(elemento)
  if(elemento.desc==""){
    name =  complement_name(name["NAME"],name["RAIZ"],elemento.type,elemento.ground_level,"epic");

    return name;
  }


 name = complement_name(name["NAME"],name["RAIZ"],elemento.type,elemento.ground_level,"mark");

return name;
}

function complement_name(nombre,raiz,tipo,valor,el_type){
  if (raiz.length>=8){
    name1 = raiz.slice(0,5)+random(VOCAL)
    raiz = name1
    if(random()<0.1){
      raiz=raiz+random(["-"," "]) +raiz.slice(5,7)+random(VOCAL)}
  }
  if(el_type=="epic"){

    if(tipo>0){
      nombre = raiz + " " + random(POST_EPIC_HIGH);
    }else{
      nombre = raiz + " " + random(POST_EPIC_LOW);
    }


    return {
          "NAME": nombre,
          "RAIZ": raiz
        };

  }


  if (tipo ==-3) {
    nombre = raiz + " " + random(POST_BOT);

  }
  if(random()<0.3){

    if (tipo== -2) {
      nombre = raiz + " " + random(POST_FOSA);

    }

    if (tipo == -1) {
      nombre = raiz + " " + random(POST_WATER);

    }

    if (tipo == 1 & valor < 0.53) {
      nombre = raiz + " " + random(POST_SHORE);


    }
  }



 if (tipo == 1) {
    if (random() < 0.2) {
      nombre = raiz + " " + random(POST_VALLE);
    } else if (random() < 0.3) {
      nombre = raiz + random(VOCAL)
    }

  }

  if(tipo==3){

    nombre = raiz + " " + random(POST_TOP);
  }
   else if (tipo == 2 & random() < 0.4) {
    if (random() < 0.6) {
      nombre = raiz + " " + random(POST_ALTO);
    }

  }



  nombress = nombre.split(" ")
  nombreA = nombress[0]
  if(nombreA.length>10 & random()<0.5){
    nombre = nombreA.slice(0,6);
  }





  return {
        "NAME": nombre,
        "RAIZ": raiz
      };


}





function gen_nombre(elemento) {

  let name = gen_root(elemento);
  let nombre = name["NAME"];
  let raiz = name["RAIZ"];
  let tipo = m.M_tipos[elemento.X][elemento.Y];
  let valor = m.MAPA[elemento.X][elemento.Y];

  if(raiz.length > 8){
    raiz = raiz.slice(0,8)
  }

  if (elemento.is_origin == 1) {
    raiz = random(ORIGIN_NAME) + raiz;
    nombre = raiz;
    return {
      "NAME": nombre,
      "RAIZ": raiz
    };
  }

  if(random()<0.3 && MARCAS.length>0 && elemento.closest_mark()!=""){

    raiz = "";
    if (elemento.closest_mark().name.length > 6) {
      let word = elemento.closest_mark().name.split(" ")[0]
      raiz = word.slice(0, min(4, word.length))  + random(END_NAME);
      //console.log(elemento.closest_mark().name,word,  raiz)
    } else {
      raiz = elemento.closest_mark().name + random(SILABAS);
    }
    raiz = random(VOCAL) + raiz;

  }
  else if (random() > 0.2 & CENTROS.length > 1) {
    raiz = "";
    if (elemento.give_closest(CENTROS).nombre["RAIZ"].length > 4) {
      let word = elemento.give_closest(CENTROS).nombre["RAIZ"].split(" ")[0]
      raiz = word.slice(0, min(4, word.length))  + random(END_NAME);
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

  if (nombre == "") {
    nombre = raiz;
  }

  name = this.complement_name(nombre,raiz,tipo,valor,"centro");

  if(raiz.length>9){
    if(random()<0.5){
      raiz = raiz.slice(0,int(raiz.length/2))
    }else{
      raiz = raiz.slice(0,9)
    }

  }

  nombre = name["NAME"];
  raiz = name["RAIZ"];


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
