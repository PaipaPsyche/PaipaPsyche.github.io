new p5();

var W;
var H;
var H_chart=60;

var m;
var maxDistance;
var CENTROS = [];
var MINAS = [];
var CANALES=[];
var BOTONES=[];

var scaleX=0.006;
var scaleY=0.006;

var buenas_off=0;

var threshold1 = 0.5;
var threshold2 = 0.68;
var thresholdr = 0.7;
var thresholdf = 0.7;

var T=0;
var dT = 0.5;

var mult= 1;

var buenas=1;
var malas = 0;

var pintar_rec=0;

var opc_but ="";
var opc_elems = [];

var activate_auto=0;
var activate_virus=0;

var primero=1;

var last_five=3;

var killrate=1;

var titulo = "אימפעריע";


function keyTyped() {
if(key =='m'){
  pintar_rec=(1+pintar_rec)%4;
}
if(key =='a'){
  activate_auto=1-activate_auto;
}
if(key =='v'){
  activate_virus=1-activate_virus;
}
if(key =='p'){
  mult = 1-mult;
}

if(key =='k' & rango_mina()!=0 & random()<killrate){
      rango_mina().desconectar();
}

if(key =='f'){
console.log(primero);
console.log(last_five);
}
}





function rango_mina(){
  var ans = 0;
  for(var i =0;i<CENTROS.length;i++){
    if(CENTROS[i].mouseInRange()==1){
      ans  = CENTROS[i];
      break;
    }
  }
  //console.log(ans);
  return ans;

}

// function poll(){
//   let classes_M = {"1":0,"2":0,"3":0,"4":0,"5":0,"-1":0};
//   let classes_C = {1:0,2:0,3:0};
//   let consume=0;
//   let world_pop = 0;
//   let fuel_prod= 0;
//   let food_prod= 0;
//   let maxage  = 0;
//   let trace =0;
//   let maxage_city= "";
//
//
//
//
//
//
//   for(var i = 0;i<CENTROS.length;i++){
//     let elected = CENTROS[i];
//     classes_M[elected.T]++;
//     world_pop+=elected.population;
//     fuel_prod+=elected.genfuel;
//     food_prod+=elected.genfood;
//     consume+=elected.consumo;
//     if(elected.give_age()>maxage & elected.T>0){
//       maxage = elected.give_age();
//       maxage_city = elected.nombre["NAME"].toUpperCase();
//
//     }
//     if(elected.give_age()>trace){trace=elected.give_age()}
//   }
//
//     for(var i = 0;i<CANALES.length;i++){
//       classes_C[CANALES[i].T]++;
//
//     }
//
//     let ans  = {"POLL_CEN":classes_M,"POLL_CAN":classes_C,"WPOP":world_pop,
//                 "WFUEL":fuel_prod,"WFOOD":food_prod,"WCONS":consume,"MAXAGE":[maxage,maxage_city,trace]};
//
//   return ans;
//
//
// }


function distancia(el1,el2){
  return dist(el1.X,el1.Y,el2.X,el2.Y);
}



function check_spot(XX_a,YY_a){

    let XX = min(max(XX_a,20),W-20);
    let YY = min(max(YY_a,20),H-20);


    if(rango_mina()!=0 & buenas-malas>0 & activate_auto==0){
      if( rango_mina().T<=4){
        rango_mina().connect+=10;
        rango_mina().evaluar_tipo();

        malas=malas+1;
      }

    }

    else{



    if(m.M_tierra[XX][YY]==1){

      let nuevo = new centro(XX,YY,1);
      nuevo.asignar_valores_mapa(m);
      let nombre_nuevo = gen_nombre(nuevo);
      nuevo.nombre=nombre_nuevo;



      //console.log(nuevo.in_mountain,nuevo.in_food,nuevo.in_fuel)
      let n_ir = nuevo.give_high_in_range(CENTROS);



      if(CENTROS.length>=1){
        let clst=nuevo.give_closest(CENTROS);
        let clst_real=nuevo.give_closest_all(CENTROS);




        if(distancia(nuevo,clst)<=clst.maxdist & distancia(nuevo,clst)>clst.mindist & distancia(nuevo,clst_real)>5){
          CENTROS.push(nuevo);
          //console.log(nuevo.in_mountain,nuevo.in_food,nuevo.in_fuel)

          var nc = new canal(clst,nuevo,1);
          CANALES.push(nc);
          nuevo.mis_canales.push(CANALES[CANALES.length-1]);
          clst.mis_canales.push(CANALES[CANALES.length-1]);

          nuevo.conectar();
          nuevo.evaluar_tipo();
          clst.conectar();
          clst.evaluar_tipo();
      }
      // else if(n_ir.length>0 ){
      //
      //   var chosen=cls;
      //   var n_ir_c="";
      //   for(var i=n_ir.length-1;i>0;i--){
      //     if(distancia(n_ir[i],nuevo)<chosen & n_ir[i]!=clst){
      //       chosen=distancia(n_ir[i],nuevo);
      //       n_ir_c=n_ir[i];
      //     }
      //
      //   }
      //   if(n_ir_c!=""){
      //     CENTROS.push(nuevo);
      //     var nc = new canal(n_ir_c,nuevo,floor(1+random(3)));
      //     CANALES.push(nc);
      //
      //     nuevo.conectar();
      //     n_ir_c.conectar();
      //   }
      //
      // }

      else if(buenas-malas>0 & distancia(nuevo,clst)>(W+H)/8){
        malas=malas+1;
        nuevo.T=1;
        nuevo.evaluar_tipo();
        nuevo.is_origin=1;
        let nombre_nuevo = gen_nombre(nuevo);
        console.log(nombre_nuevo["NAME"])
        nuevo.nombre=nombre_nuevo;
        CENTROS.push(nuevo);

      }

    }
    else if(buenas-malas>0){
      malas=malas+1;
      nuevo.T=1;
      nuevo.evaluar_tipo();
      nuevo.is_origin=1;
      let nombre_nuevo = gen_nombre(nuevo);
      nuevo.nombre=nombre_nuevo;
      CENTROS.push(nuevo);

    }


    }
  }
}



function mouseClicked(){
  if(mult!=0 & mouseY>H_chart){
  check_spot(mouseX,mouseY);
  }

}


function get_maxlvl(){
  let maxlvl = 0;
  for(var i =0;i<CENTROS.length;i++){
    if(CENTROS[i].T>maxlvl){
      maxlvl=CENTROS[i].T;
    }
  }
  return maxlvl;

}

// function mousePressed(event) {
//   if(event.button==2 & rango_mina()!=0){
//     rango_mina().desconectar();
//   }
// }


function get_rand_coords(xx,yy,sd){
   let x = max(min(floor(randomGaussian(xx,sd)),W-25),25);
   let y = max(min(floor(randomGaussian(yy,sd)),H-25),H_chart);
   x=x-(x+8*(y%3))%10;
   y=y-y%10;
   return [x,y];
}

function setup() {
  H = windowHeight;
  W = windowWidth;
  frameRate(5);
  add_silabas();

  // H=600;
  // W=600;

  createCanvas(W, H);
  pixelDensity(1);
  maxDistance = dist(W / 2,H/ 2, W,H);
  m = new mapa(W,H);
background(0);
}



function draw() {


  let five=0;
  m.pintar();

  let mxlvl=get_maxlvl();

  let mx_cap=0;
  let cand = [];



  let polling;


  let classes_M = {"1":0,"2":0,"3":0,"4":0,"5":0,"-1":0};
  let classes_C = {1:0,2:0,3:0};
  let consume=0;
  let world_pop = 0;
  let fuel_prod= 0;
  let food_prod= 0;
  let maxage  = 0;
  let maxage_city= "";
  let trace=0;
  let sumal=0;
  let activas=0;


      for(var i = 0;i<CANALES.length;i++){
        CANALES[i].pintar();
        classes_C[CANALES[i].T]++;
      }

  for(var i = 0;i<CENTROS.length;i++){

    let elected = CENTROS[i];

    sumal+=elected.T;

    elected.pintar(T);
    if(elected.T==5){five++;}
    let score=elected.score_center();
    if(elected.T==mxlvl){cand.push([elected,score])}


    classes_M[elected.T]++;
    world_pop+=elected.population;
    fuel_prod+=elected.genfuel;
    food_prod+=elected.genfood;
    consume+=elected.consumo;
    if(elected.give_age()>maxage & elected.T>0){
      maxage = elected.give_age();
      maxage_city = elected.nombre["NAME"].toUpperCase();

    }
      if(elected.give_age()>trace){trace=elected.give_age()}
      if(elected.T>0){activas++};
  }

    let meanl=sumal/(CENTROS.length+1);

    let resta = fuel_prod+food_prod-consume;

    let profit =(resta/(abs(resta)+1))*log(max(abs(resta),1))+meanl;

    polling  = {"POLL_CEN":classes_M,"POLL_CAN":classes_C,"WPOP":world_pop,"PRFT":(profit).toFixed(3),"MEANL":meanl,
                "WFUEL":fuel_prod,"WFOOD":food_prod,"WCONS":consume,"MAXAGE":[maxage,maxage_city,trace],
              "ACTVS":activas};







  let cap ="";
  let max_score=0;
  for(var i = 0;i<cand.length;i++){
    if(cand[i][1]>max_score){
      cap=cand[i][0];
      max_score=cand[i][1];
    }
  }





  if(cap!=""){
  cap.nombre["NAME"]=cap.nombre["RAIZ"]

  push();
  noFill();
  stroke([255,255,255,150+50*sin(0.5*T)]);
  strokeWeight(1.5);
  circle(cap.X,cap.Y,cap.R+4);

  pop();

  push();
  fill([0,0,0]);
  noStroke();
  textAlign(CENTER,CENTER)
  text(" capital ",cap.X,cap.Y+cap.R+8);
  pop();
}



  buenas=floor(five/2)+buenas_off;
  if(CENTROS.length==0){buenas=1;}


  // if(five>last_five & five>3){
  //   primero+=five-last_five;
  //   last_five=five;
  // }


  T+=dT*mult;


  push();
  noStroke();
  fill([0,0,0,100]);
  rect(0,0,W,H_chart);
  pop();



  let xo=30;
  let yo=-20;
  push();
  noStroke();
  fill(255);
  textSize(50);
  textAlign(CENTER,CENTER);
  text(titulo,xo+90,yo+45);
  textSize(20);
  fill([250,0,0]);
  text("IMFERYE",xo+90,yo+70);
  fill([250,255,0]);
  text("~ ~ ~ ~ ________ ~ ~ ~ ~",xo+90,yo+70);
  pop();



  push();
  noStroke();
  fill([0,255,255]);

  xo = 250;
  yo=-22;


  text("Seeds : ",xo,yo+35);
  text("Map : ",xo,yo+50);
  text("Difficulty : ",xo,yo+65);
  text("Era : ",xo,yo+80);


  fill([255,255,255]);
  text(str(max(buenas-malas,0)),xo+60,yo+35);
  text(["Standard","Fuel","Food","Terrain"][pintar_rec],xo+60,yo+50);
  text(str(int(map(m.DIFF,0.3,0.7,80,10))+"%"),xo+60,yo+65);
  text("Hee Hee",xo+60,yo+80);

  xo = 400;

  fill([255,255,80]);

  text("Population : ",xo,yo+35);
  text("Fuel Prod. : ",xo,yo+50);
  text("Food Prod. : ",xo,yo+65);
  text("Consume : ",xo,yo+80);

  fill([255,255,255]);
  text(str(polling["WPOP"]),xo+75,yo+35);
  text(str(polling["WFUEL"])+" Pts.",xo+75,yo+50);
  text(str(polling["WFOOD"])+" Pts.",xo+75,yo+65);
  text(str(polling["WCONS"])+" Pts.",xo+75,yo+80);





  xo = 540;

  fill([255,255,80]);

  text("Profit : ",xo,yo+35);
  text("Legacy : ",xo,yo+50);
  text("Oldest : ",xo,yo+65);
  text("Tracing: ",xo,yo+80);

  fill([255,255,255]);
  text(str(polling["PRFT"]),xo+50,yo+35);
  text(str(polling["MAXAGE"][0])+" Yrs",xo+50,yo+50);
  text(str(polling["MAXAGE"][1]),xo+50,yo+65);
  text(str(polling["MAXAGE"][2])+" Yrs.",xo+50,yo+80);










  xo = W-230;



  if(activate_auto==1){
    fill([255,255,0]);
    text("AUTO-EXPLORATION MODE",xo,yo+40);

  }
  if(activate_virus==1 | profit<0){
    fill([0,255,0]);
    text("VIRUS",xo,yo+60);
    killrate = activate_virus==1?1:0.1*log(-min(resta,-1));
    console.log(killrate);
    if(random()<killrate & CENTROS.length>0 & mult!=0){
      random(CENTROS).desconectar();
    }
  }




  if(CENTROS.length>0 & activate_auto==1 & mult!=0){

    if(random()<0.8){
      var centroelecto=CENTROS[CENTROS.length-1];
      var coords = get_rand_coords(centroelecto.X,centroelecto.Y,40)
    }
    else{
      var centroelecto=random(CENTROS);
      var coords = get_rand_coords(centroelecto.X,centroelecto.Y,40)
    }



    //console.log(coords);
  check_spot(coords[0],coords[1]);
}
if(mult==0){
  push();
  fill([0,0,0,100]);
  noStroke();
  textSize(50);
  textAlign(CENTER,CENTER)
  text(" PAUSE ",W/2,H/2);
  pop();
}
}
