new p5();

var W;
var H;
var H_chart=65;

var m;
var maxDistance;
var CENTROS = [];
var MINAS = [];
var CANALES=[];
var BOTONES=[];
var MARCAS =[];

var effects = [];

var scaleX=0.006;
var scaleY=0.006;

var buenas_off=0;

var limit_GT = 9;
var limit_FM = -3;
var best_prof = 0;
var worst_prof = 0;
var last_marine = 0 ;
var new_marine_permission=0;


var threshold1 = 0.5;
var threshold2 = 0.68;
var threshold3 = 0.75;
var thresholdr = 0.7;
var thresholdf = 0.7;

var population_reg = [];
var pop_inc=0;
var n_reg_pop = 50;

var T=0;
var dT = 1;
var prosperity_years=0;

var mult= 1;

var buenas=1;
var malas = 0;


var pintar_rec=0;

var opc_but ="";
var opc_elems = [];

var activate_auto=0;
var activate_virus=0;

var primero=1;

var show_ruinas=1;

var last_five=3;

var last_profit = 0;
var begin = 0;
var killrate=1;

var titulo = "אימפעריע";

let last_lost_leg = 0;
let lost_leg_off = 0;

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
if(key =='r'){
  show_ruinas = 1-show_ruinas;
}

if(key =='k' & rango_mina()!=0 & random()<killrate){
      rango_mina().desconectar();
}

if(key =='f'){
console.log(CENTROS.length)
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

// COLORBAR======================
function bar_proportion(dictio,colors, xo, yo, w, h) {

  let total = 0;

  let props = {};


  for (let elem in dictio) {

    total += dictio[elem]

  }

  for (let elem in dictio) {

    props[elem] = dictio[elem] / total;

  }


  let prev_point=0;

  for (let elem in props) {

    push();

    fill(colors[elem]);

    let dx = int(props[elem]*w);

    rect(xo+prev_point,yo,dx,h);

    pop();

    prev_point+= dx;

  }
}
function bar_profit(prof, xo, yo, w, h) {





  let pos_p  = map(prof,-13,13,yo+h,yo)
  pos_p = max(min(pos_p,yo+h),yo)


  let h1 = map(limit_FM,-13,13,yo+h,yo)
  let h2 = map(limit_GT,-13,13,yo+h,yo)

  let h_pos  = h2
  let h_norm  = h1-h2
  let h_neg  = h-h1

  stroke(0);
  strokeWeight(1);
  fill(0,255,0);
  rect(xo,yo,w,h_pos);
  fill(255,255,0);
  rect(xo,yo+h_pos,w,h_norm);
  fill(255,0,0);
  rect(xo,yo+h_pos+h_norm,w,h_neg);



  fill(0);
  stroke(0);

  rect(xo,pos_p+1.5,w,2)
  strokeWeight(0.5);
  textSize(11);
  fill(255);
  push()
  textAlign(CENTER);
  translate(xo+w/2,h+5)

  if(prof<limit_FM){
    fill(255,0,0)
  }
  if(prof>limit_GT){
    fill(0,255,0)
  }
  text((prof).toFixed(2),0,11)
  pop()


}




//COLORBAR======================








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
      console.log(rango_mina().nombre["NAME"].toUpperCase())
      // if( rango_mina().T<=4){
      //   rango_mina().connect+=10;
      //   rango_mina().evaluar_tipo();
      //
      //   malas=malas+1;
      // }

    }

    else{



    if(m.M_tierra[XX][YY]==1){

      let nuevo = new centro(XX,YY,1);
      nuevo.asignar_valores_mapa(m);
      let nombre_nuevo = gen_nombre(nuevo);
      nuevo.nombre=nombre_nuevo;
      nuevo.ground_level = m.MAPA[XX][YY]



      //console.log(nuevo.in_mountain,nuevo.in_food,nuevo.in_fuel)
      let n_ir = nuevo.give_high_in_range(CENTROS);



      if(CENTROS.length>=1){
        let clst=nuevo.give_closest(CENTROS);
        let clst_real=nuevo.give_closest_all(CENTROS);




        if(distancia(nuevo,clst)<=clst.maxdist & distancia(nuevo,clst)>clst.mindist & distancia(nuevo,clst_real)>5){
          CENTROS.push(nuevo);
          //console.log(nuevo.in_mountain,nuevo.in_food,nuevo.in_fuel)

          var nc = new canal(clst,nuevo,1);
          nuevo.origin_name  = clst.origin_name

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

      else if(m.MAPA[XX][YY]<0.53 & buenas-malas>0 & distancia(nuevo,clst)>(W+H)/8){
        malas=malas+1;
        nuevo.T=1;
        nuevo.evaluar_tipo();
        nuevo.is_origin=1;
        let nombre_nuevo = gen_nombre(nuevo);
        let arr_nom = split(nombre_nuevo["NAME"]," ")
        nuevo.origin_name=arr_nom[arr_nom.length-1]
        //console.log(nombre_nuevo["NAME"])
        nuevo.nombre=nombre_nuevo;
        CENTROS.push(nuevo);

      }

    }
    else if(m.MAPA[XX][YY]<0.53 & buenas-malas>0){
      malas=malas+1;
      nuevo.T=1;
      nuevo.evaluar_tipo();
      nuevo.is_origin=1;
      let nombre_nuevo = gen_nombre(nuevo);
      let arr_nom = split(nombre_nuevo["NAME"]," ")
      nuevo.origin_name=arr_nom[arr_nom.length-1]
      nuevo.nombre=nombre_nuevo;
      CENTROS.push(nuevo);

    }


    }
    //& last_profit>limit_GT)
    else if(CENTROS.length!=0 & last_profit>limit_GT & m.MAPA[XX][YY]>0.4*threshold1 & m.MAPA[XX][YY]<0.95*threshold1 & new_marine_permission == 1){
      let nuevo = new centro(XX,YY,11);
      nuevo.in_ocean=1;
      nuevo.asignar_valores_mapa(m);
      let nombre_nuevo = gen_code(nuevo);
      nuevo.nombre=nombre_nuevo;
      nuevo.ground_level = m.MAPA[XX][YY]
      let clst=nuevo.give_closest(CENTROS);
      let clst_real=nuevo.give_closest_all(CENTROS);

      if(clst.ground_level<0.53 & distancia(nuevo,clst)<=clst.maxdist & distancia(nuevo,clst)>clst.mindist & distancia(nuevo,clst_real)>5){
        CENTROS.push(nuevo);
        last_marine++;
        //console.log(nuevo.in_mountain,nuevo.in_food,nuevo.in_fuel)

        var nc = new canal(clst,nuevo,11);
        nuevo.origin_name  = clst.origin_name

        CANALES.push(nc);
        nuevo.mis_canales.push(CANALES[CANALES.length-1]);
        clst.mis_canales.push(CANALES[CANALES.length-1]);

        nuevo.conectar();
        nuevo.evaluar_tipo();
        clst.conectar();
        clst.evaluar_tipo();
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
    if(CENTROS[i].T>maxlvl & CENTROS[i].in_ocean==0){
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
function parse_pop(n){
  let ans = "";
  let s = str(n);
  let count = 0;
  for(var  i = s.length-1;i>=0;i--){
    ans =s[i]+ans;
    count++;
    if(count%3==0){
      count=0;
      ans=" "+ans;
    }

  }

  return trim(ans);

}

function get_rand_coords(xx,yy,sd){
   let x = max(min(floor(randomGaussian(xx,sd)),W-25),25);
   let y = max(min(floor(randomGaussian(yy,sd)),H-25),H_chart);
   // x=x-(x+8*(y%3))%10;
   // y=y-y%10;
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

  push();
  noStroke();
  fill([0,0,0,150]);
  rect(0,0,W,H_chart);
  pop();





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
  let marine = 0;
  let sumal=0;
  let activas=0;


      for(var i = 0;i<CANALES.length;i++){
        if(CANALES[i].T>0 | show_ruinas==1){
        CANALES[i].pintar();

      }
      classes_C[CANALES[i].T]++;
      }

  for(var i = 0;i<CENTROS.length;i++){

    let elected = CENTROS[i];

    let tt = elected.T;
    if (tt>10){tt=tt-10;marine++;}
    sumal+=tt;

    if(elected.T>0 | show_ruinas==1){
    elected.pintar(T);
  }
    if(elected.T==5){five++;}
    let score=elected.score_center();
    if(elected.T==mxlvl & elected.in_ocean==0){cand.push([elected,score])}

    if(elected.T<10){
    classes_M[str(elected.T)]++;}
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

    let profit =0.2*five+(resta/(abs(resta)+1))*log(max(abs(resta),1))+meanl;
    profit = profit*0.7-1.5;
    if(profit>best_prof){
      best_prof=profit;
    }
    if(profit<worst_prof){
      worst_prof=profit;
    }
    polling  = {"POLL_CEN":classes_M,"POLL_CAN":classes_C,"WPOP":world_pop,"PRFT":(profit).toFixed(3),"MEANL":meanl,
                "WFUEL":fuel_prod,"WFOOD":food_prod,"WCONS":consume,"MAXAGE":[maxage,maxage_city,trace],
              "ACTVS":activas,"MARINE":marine};



    let age = polling["MAXAGE"][2]
    new_marine_permission = int((age/150)-marine)>0?1:0;
    if(CENTROS.length>0 & activas==0){
      mult=0;



      let score;


      score = map(best_prof,-15,15,-1,1) + map(worst_prof,-15,15,-1,1) + map(last_lost_leg/age,0,1,1,-1) + log(age) +map(prosperity_years/age,0,1,0,2)
      score = int(map(score,-3,5+log(20000),0,10000))

      push()
      textAlign(CENTER);
      textSize(30);
      fill(255)
      text("GAME OVER",W/2,H/2)
      textSize(20);
      text("FINAL SCORE "+score+" / 10000",W/2,H/2+30)
      pop()

    }


    if(polling["MAXAGE"][2] - polling["MAXAGE"][0] < polling["MAXAGE"][2]){
    last_lost_leg=  polling["MAXAGE"][2] - polling["MAXAGE"][0]
    }

    last_profit=profit;

    for(var i = 0;i<MARCAS.length;i++){
      MARCAS[i].paint()
    }



    // if(CENTROS.length>0){
    //
    //
    //
    // }








    if(population_reg.length<n_reg_pop){
      population_reg.push(polling["WPOP"])
    }
    else{
      population_reg = population_reg.slice(1,population_reg.length)
      population_reg.push(polling["WPOP"])

      let suma_dif =0;
      for(var i =0;i<population_reg.length-1;i++){
        suma_dif+=(population_reg[i+1]-population_reg[i])
      }
      pop_inc = suma_dif/(n_reg_pop-1);
    }
    //console.log(population_reg);







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


  text("Seeds: ",xo,yo+35);
  text("Map: ",xo,yo+50);
  text("Difficulty: ",xo,yo+65);
  text("Growth: ",xo,yo+80);


  fill([255,255,255]);
  text(str(max(buenas-malas,0)),xo+60,yo+35);
  text(["Standard","Fuel","Food","Terrain"][pintar_rec],xo+60,yo+50);
  text(str(int(map(m.DIFF,0.3,0.7,80,10))+"%"),xo+60,yo+65);
  text(str(int(pop_inc)),xo+60,yo+80);

  xo = 375;

  fill([255,255,80]);

  text("Population : ",xo,yo+35);
  text("Fuel Prod. : ",xo,yo+50);
  text("Food Prod. : ",xo,yo+65);
  text("Consume : ",xo,yo+80);

  fill([255,255,255]);
  text(parse_pop(polling["WPOP"]),xo+75,yo+35);
  text(str(polling["WFUEL"])+" Pts.",xo+75,yo+50);
  text(str(polling["WFOOD"])+" Pts.",xo+75,yo+65);
  text(str(polling["WCONS"])+" Pts.",xo+75,yo+80);





  xo = 530;

  fill([255,255,80]);

  text("Active/Total : ",xo,yo+35);
  text("Lost legacy : ",xo,yo+50);
  text("Oldest City : ",xo,yo+65);
  text("Origin : ",xo,yo+80);

  fill([255,255,255]);
  text(polling["ACTVS"]+"/"+CENTROS.length,xo+70,yo+35);

  let lst_leg = polling["MAXAGE"][2] - polling["MAXAGE"][0]
  text(str(lst_leg + lost_leg_off)+" Yrs",xo+70,yo+50);
  text(str(polling["MAXAGE"][0])+" Yrs.",xo+70,yo+65);
  text(str(polling["MAXAGE"][2])+" Yrs.",xo+70,yo+80);




if(CENTROS.length>0){

  bar_proportion(classes_M,DICT_C_M,680,yo+80,350,5);
  bar_profit(profit,660,3,10,42)
}





  xo = W-230;


  noStroke();
  if(activate_auto==1){
    fill([170,170,255]);
    text("AUTO-EXPLORE",xo,yo+40);

  }
  if(profit>limit_GT){
    fill([250,255,0]);
    text("GOLDEN TIMES",xo+105,yo+40);
    prosperity_years++;
  }
  if(activate_virus==1 ){
    fill([0,255,0]);
    text("VIRUS",xo,yo+60);
    killrate =1;
    //console.log(killrate);
    if(random()<killrate & CENTROS.length>0 & mult!=0){
      random(CENTROS).desconectar();
    }
  }
  if(profit<limit_FM){
    fill([255,155,30]);
    text("FAMINE",xo+55,yo+60);
    killrate =0.1*log(-min(resta,-1));
    //console.log(killrate);
    if(random()<killrate & CENTROS.length>0 & mult!=0){
      random(CENTROS).desconectar();
    }

  }




  if(CENTROS.length>0 & (activate_auto==1 | profit>limit_GT)& mult!=0){

    if(random()<0.05 | activate_auto==1){


    if(random()<0.9){
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


}
if(mult==0 & activas>0){
  push();
  fill([0,0,0,100]);
  noStroke();
  textSize(50);
  textAlign(CENTER,CENTER)
  text(" PAUSE ",W/2,H/2);
  pop();
}



}
