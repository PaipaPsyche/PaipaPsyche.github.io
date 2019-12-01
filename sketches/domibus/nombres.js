//let PRE_ALTO = ["Mount ","Peak ","Top ","High ","Hill of ","Forest of"];
let POST_ALTO = ["Hill ","Mountains ","Mountain","Cannon ","Hills ","Woods ","Mine "]

let POST_FOSA = ["Rift ","Crack ","pit ","Abyss ","Fault "]

let POST_VALLE = ["Valley ","Arids ","Planes ","Park ","River ","Cave "]
let POST_WATER = ["Sea ","Lake ","Waters","Extension ","Point "]
let POST_SHORE = ["Shore ","Port ","Reef ","Gulf ","Bottom "]


let POST_NAME=[" Ville "," Town "," Post "," Stand "," Gate"," Rise"," Fort "," Landing "," Castle "];
let PRE_NAME = ["Saint ","The ","Last ","Fist of ","Hammer of ","Light of ","","Front ",
                  "Will of ","Path of "]


let END_NAME= ["ngton","shire","ston","strong","nford","ldorf","vhys","stern","ster","stan",
                "derson","rdens","xtus","mnius","nimus","ntic","ntis","polis","kyo","bai",
              "nville","town","fort","lord","stand","nys","rys","gdri","rk","ndon","rdam",
            "toris","rly","quila","stein","mark","burg","rtz","lf","rov","rnov","tröen","land"]


let SILABAS = ["","man","men","min","mon","mun",
                "ma","me","mi","mo","mu",
                "san","sen","sin","son","sun",
                "ta","te","ti","to","tu",
                "na","ne","ni","no","nu",
                "man","men","min","mon","mun",
                "ra","re","ri","ro","ru",
                "mar","mer","mir","mor","mur",
                "fas","fes","fis","fos","fus",
                "chas","ches","chis","chos","chus",
                "al","el","il","ol","ul",
                "ar","er","ir","or","ur",
                "af","ef","if","of","uf",
                "as","es","is","os","us",
                "sha","she","shi","sho","shu"

                ];



function gen_nombre(elemento){
  let raiz ="";
  let nombre = "";
  let valor = m.MAPA[elemento.X][elemento.Y];
  let tipo = m.M_tipos[elemento.X][elemento.Y];

  let long=int(random(2));
  for (let i =0;i<(2+long);i++){
    raiz=raiz+random(SILABAS);
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


  if(random()>0.4){
    raiz=raiz+random(END_NAME);
  }
  else if(random()<0.7){
    raiz=random(PRE_NAME)+raiz;
  }
  else{

  if(tipo==1 ){
    if(random()>0.3){nombre = raiz+" "+random(POST_VALLE);}

      else if(random()>0.3){nombre=raiz+" "+random(POST_NAME)}

  }
  if(tipo==2 & random()>0.3){
    if(random()>0.3){nombre = raiz+" "+random(POST_ALTO);}

      else if(random()>0.3){nombre=raiz+" "+random(POST_NAME);}

  }
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
