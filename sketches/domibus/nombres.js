//let PRE_ALTO = ["Mount ","Peak ","Top ","High ","Hill of ","Forest of"];
let POST_ALTO = ["Hill ","Mountains ","Mountain","Cannon ","Hills ","Woods ","Mine "]

let POST_FOSA = ["Rift ","Crack ","pit ","Abyss ","Fault "]

let POST_VALLE = ["Valley ","Arids ","Plains ","Park ","River ","Cave "]
let POST_WATER = ["Sea ","Lake ","Waters","Extension ","Point "]
let POST_SHORE = ["Shore ","Port ","Reef ","Gulf ","Bottom "]


let POST_NAME=[" Ville "," Dale "," Post "," Stand "," Gate"," Rise"," Fort "," Bridge "," Landing "," Castle "];
let PRE_NAME = ["Saint ","The ","Last ","","Front ","Will of ","Forge ","Temple of ","Camp of "]
let ORIGIN_NAME=["Fist of ","Land of ","Fire of the first ","Hammer of ","Light of ","Path of ","Nest of ","Guard of ","Rise of ","Dawn of "];

let END_NAME= ["ngton","shire","ston","strong","nford","ldorf","vhys","stern","ster","stan",
                "derson","rdens","xtus","mnius","nimus","ntic","ntis","polis","kyo","bai",
              "nville","town","fort","lord","stand","nys","rys","gdri","rk","ndon","rdam",
            "toris","rly","quila","stein","mark","burg","rtz","lf","rov","rnov","tröen","land"]

let VOCAL=["a","e","i","o","u"]
let SILABAS = [];

let C_SILABAS=[
  ["c",""],["v",""],
  ["b",""],["n",""],
  ["m",""],["l",""],
  ["s",""],["sh",""],
  ["ch",""],["t",""],
  ["r",""],["p",""],
  ["d",""],["f",""],
  ["r","s"],["pr",""],
  ["tr",""],["fr",""],
  ["gr",""],["sc",""],
  ["l","g"],["l","p"],
  ["p","s"],["sk",""],
  ["","lm"],["","l"],
  ["","m"],["","n"],
  ["","s"],["","th"],
  ["th",""],["dr",""],
  ["",""],["","x"],
  ["","rg"],["","rp"],
  ["","st"],["sh","st"],
  ["ch","r"],["sh","r"],
  ["br","sh"],["g","st"]
]





function add_silabas(){
for(var j =0;j<C_SILABAS.length;j++){
  let C1 = C_SILABAS[j][0];
  let C2 = C_SILABAS[j][1];
  for(var i = 0;i<VOCAL.length;i++){
    SILABAS.push(C1+VOCAL[i]+C2);
  }
}
}








function gen_nombre(elemento){
  let raiz ="";
  let nombre = "";
  let valor = m.MAPA[elemento.X][elemento.Y];
  let tipo = m.M_tipos[elemento.X][elemento.Y];

  let long=int(random(3));
  for (let i =0;i<(1+long);i++){
    raiz=raiz+random(SILABAS)
    if(random()>0.7){
      raiz=raiz+random(["-"," ","'",""])+random(SILABAS);
    }
  }

  if(raiz.length>10 & random()>0.4){
    raiz = raiz.slice(5,raiz.length-1)
  }

  if(elemento.is_origin==1){
    raiz=random(ORIGIN_NAME) + raiz;
    nombre=raiz;
    return {"NAME":nombre,"RAIZ":raiz};
  }


  if(random()>0.2 & CENTROS.length>1){
    raiz="";
    if(elemento.give_closest(CENTROS).nombre["RAIZ"].length>4){
      let word=elemento.give_closest(CENTROS).nombre["RAIZ"].split(" ")
    raiz=word.pop().slice(0,min(5,word.length))+random(VOCAL)+random(END_NAME);}
    else{
      raiz=elemento.give_closest(CENTROS).nombre["RAIZ"]+random(SILABAS);
    }
    raiz=random(VOCAL)+raiz;
}






  if(random()>0.5){
    raiz=raiz+random(VOCAL)+random(END_NAME);
  }
  if(random()<0.5){
    raiz=random(PRE_NAME)+random(VOCAL)+raiz;
  }

  // if(random()>0.5){
  //   raiz=raiz+random(END_NAME);
  // }
  // else if(random()<0.5){
  //   raiz=random(PRE_NAME)+raiz;
  // }

  nombre=raiz;
  if(tipo==-2){
    nombre = raiz+" "+random(POST_FOSA);

  }

  if(tipo==-1){
    nombre = raiz+" "+random(POST_WATER);

  }

  if(tipo==0 ){
        nombre = raiz+" "+random(POST_SHORE);


  }






  if(tipo==1 ){
    if(random()>0.5){nombre = raiz+" "+random(POST_VALLE);}

      else if(random()>0.5){nombre=raiz+random(VOCAL)+" "+random(POST_NAME)}

  }
  if(tipo==2 & random()>0.5){
    if(random()>0.5){nombre = raiz+" "+random(POST_ALTO);}

      else if(random()>0.5){nombre=raiz+" "+random(POST_NAME);}

  }


  if(elemento.give_closest_all(CENTROS).T==-1){
    raiz = elemento.give_closest_all(CENTROS).nombre["RAIZ"];
    nombre = "New "+raiz;
    if(raiz.length>3&random()>0.5){
      nombre = raiz.slice(0,3)+random(END_NAME);
      elemento.give_closest_all(CENTROS).nombre["NAME"]="Old "+elemento.give_closest_all(CENTROS).nombre["RAIZ"]
    }

  }


  return {"NAME":nombre,"RAIZ":raiz}

}
