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

var pintar_rec=0;

var opc_but ="";
var opc_elems = [];


function keyTyped() {
if(key =='m'){
  pintar_rec=(1+pintar_rec)%3;
}
}

function rango_mina(){
  var ans = 0;
  for(var i =0;i<MINAS.length;i++){
    if(MINAS[i].mouseInMin()==1){
      ans  = 1;
      break;
    }
  }
  //console.log(ans);
  return ans;

}




function mouseClicked(){
  if(rango_mina()==0 &m.M_tierra[mouseX][mouseY]==1){

MINAS[MINAS.length]=new mina(mouseX,mouseY,1+floor(random(3)))
if(MINAS.length>1){
  CANALES[CANALES.length]=new canal(MINAS[MINAS.length-1],MINAS[MINAS.length-2],1+floor(random(3)))
}

}
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


  m.pintar();
  for(var i =0;i<CANALES.length;i++){
    CANALES[i].pintar();
  }

  for(var i =0;i<CENTROS.length;i++){
    CENTROS[i].pintar();
  }

  for(var i =0;i<MINAS.length;i++){
    MINAS[i].pintar();
  }

  T+=0.5;


}
