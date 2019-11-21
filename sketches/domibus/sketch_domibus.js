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
var thresholdr = 0.73;
var thresholdf = 0.73;

var T=0;

var buenas=1;
var malas = 0;

var pintar_rec=0;

var opc_but ="";
var opc_elems = [];

var activate_auto=0;

var primero=1;

var last_five=3;


function keyTyped() {
if(key =='m'){
  pintar_rec=(1+pintar_rec)%3;
}
if(key =='a'){
  activate_auto=1-activate_auto;
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



function check_spot(XX,YY){


    if(rango_mina()!=0 & buenas-malas>0 & activate_auto==0){
      if( rango_mina().T<=4){
        rango_mina().T=5;
        rango_mina().evaluar_tipo();
        malas=malas+1;
      }

    }





    if(m.M_tierra[XX][YY]==1){

      let nuevo = new centro(XX,YY,1);
      let n_ir = nuevo.give_high_in_range(CENTROS);



      if(CENTROS.length>=1){
        let clst=nuevo.give_closest(CENTROS);



        let num_c = clst.connect;
        let num_n = nuevo.connect;
        if(distancia(nuevo,clst)<=clst.maxdist & distancia(nuevo,clst)>clst.mindist & num_c<DICT_MIN_CON[5] & num_n<DICT_MIN_CON[5]){
          CENTROS.push(nuevo);

          var nc = new canal(clst,nuevo,floor(1+random(3)));
          CANALES.push(nc);
          nuevo.mis_canales.push(CANALES[CANALES.length-1]);
          clst.mis_canales.push(CANALES[CANALES.length-1]);

          nuevo.conectar();
          clst.conectar();
      }
      else if(n_ir.length>0 & distancia(nuevo,clst)>clst.mindist){

        var chosen=CENTROS[0].mindist;
        var n_ir_c="";
        for(var i=n_ir.length-1;i>0;i--){
          if(distancia(n_ir[i],nuevo)<chosen){
            chosen=distancia(n_ir[i],nuevo);
            n_ir_c=n_ir[i];
          }

        }
        if(n_ir_c!=""){
          CENTROS.push(nuevo);
          var nc = new canal(n_ir_c,nuevo,floor(1+random(3)));
          CANALES.push(nc);

          nuevo.conectar();
          n_ir_c.conectar();
        }

      }

      else if(buenas-malas>0 & distancia(nuevo,clst)>(W+H)/6){
        malas=malas+1;
        nuevo.T=5;
        nuevo.evaluar_tipo();
        CENTROS.push(nuevo);
      }

    }
    else if(buenas-malas>0){
      malas=malas+1;
      nuevo.T=5;
      nuevo.evaluar_tipo();
      CENTROS.push(nuevo);

    }


    }
}



function mouseClicked(){
  check_spot(mouseX,mouseY);


}
function get_rand_coords(xx,yy,sd){
   let x = max(min(floor(randomGaussian(xx,sd)),W-20),20);
   let y = max(min(floor(randomGaussian(yy,sd)),H-20),20);
   return [x,y];
}

function setup() {
  H = windowHeight;
  W = windowWidth;

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
  for(var i =0;i<CANALES.length;i++){
    CANALES[i].pintar();
  }

  for(var i =0;i<CENTROS.length;i++){
    CENTROS[i].pintar(T);
    if(CENTROS[i].T==5){five++;}

  }
  buenas=floor(sqrt(five));
  if(CENTROS.length==0){buenas=1;}


  // if(five>last_five & five>3){
  //   primero+=five-last_five;
  //   last_five=five;
  // }


  T+=0.5;

  push();
  stroke([255,0,0]);
  fill([255,0,0]);

  text("SEEDS "+str(max(buenas-malas,0)),20,20)
  if(CENTROS.length>0 & activate_auto==1){
    var coords = get_rand_coords(CENTROS[CENTROS.length-1].X,CENTROS[CENTROS.length-1].Y,100)
    console.log(coords);
  check_spot(coords[0],coords[1]);
}
}
