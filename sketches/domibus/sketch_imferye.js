new p5();

var W;
var H;

var m;
var maxDistance;
var CENTROS = [];
var MINAS = [];
var CANALES=[];
var BOTONES=[];

var scaleX=0.006;
var scaleY=0.006;

var threshold1 = 0.5;
var threshold2 = 0.68;
var thresholdr = 0.7;
var thresholdf = 0.7;

var T=0;
var dT = 0.1;

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

function poll(){
  let classes_M = {1:0,2:0,3:0,4:0,5:0};
  let classes_C = {1:0,2:0,3:0};

  for(var i = 0;i<CENTROS.length;i++){
    classes_M[CENTROS[i].T]++;
  }

    for(var i = 0;i<CANALES.length;i++){
      classes_C[CANALES[i].T]++;
    }
  return [classes_M,classes_C];


}


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
  if(mult!=0){
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

function mousePressed(event) {
  if(event.button==2 & rango_mina()!=0){
    rango_mina().desconectar();
  }
}


function get_rand_coords(xx,yy,sd){
   let x = max(min(floor(randomGaussian(xx,sd)),W-25),25);
   let y = max(min(floor(randomGaussian(yy,sd)),H-25),25);
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

  for(var i =0;i<CANALES.length;i++){
    // CANALES[i].evaluar_tipo();
    CANALES[i].pintar();
  }

  for(var i =0;i<CENTROS.length;i++){

    CENTROS[i].pintar(T);
    if(CENTROS[i].T==5){five++;}
    let score=CENTROS[i].score_center();
    if(CENTROS[i].T==mxlvl){cand.push([CENTROS[i],score])}

  }

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



  buenas=floor(five/2);
  if(CENTROS.length==0){buenas=1;}


  // if(five>last_five & five>3){
  //   primero+=five-last_five;
  //   last_five=five;
  // }


  T+=dT*mult;

  push();
  noStroke();
  fill([255,0,0]);
  let xo=20;
  let yo=-20;
  text("SEEDS "+str(max(buenas-malas,0)),xo,yo+40);
  text("MAP : "+["Standard","Fuel","Food","Terrain"][pintar_rec],xo,yo+60);
  text("Difficulty : "+str(int(map(m.DIFF,0.3,0.7,80,10))+"%"),xo,yo+80);
  if(activate_auto==1){

    text("AUTO-EXPLORATION MODE",xo+130,yo+40);

  }
  if(activate_virus==1){

    text("VIRUS",xo+130,yo+60);
    if(random()<killrate & CENTROS.length>0 & mult!=0){
      random(CENTROS).desconectar();
    }
  }
  pop();


  if(CENTROS.length>0 & activate_auto==1 & mult!=0){
    var centroelecto=CENTROS[CENTROS.length-1];
    var coords = get_rand_coords(centroelecto.X,centroelecto.Y,40)
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
