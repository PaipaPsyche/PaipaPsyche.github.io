new p5();

//variables de entorno y color
let W = windowWidth;
let H = windowHeight;

let ncols = 30;
let nrows = 15;

let C1;
let C2;
let dx = W/ncols;
let dy = H/nrows;

//variables de objeto
let SPINS = [];

//variables de tiempo

//constantes
let J=100;
let Kb = 1;
let Tc = (2*J)/(Kb*0.88137);
let Tp=Tc*(0.4);
let b = 1/(Kb*Tp);

//variables de control




class celda {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
    this.S = floor(2*random())*2 - 1; //spin up - down
    let v  = floor(random()*3);
    if(v ==-1){this.C=[0,0,255];}else{this.C=[255,0,0];}

  }
  paint() {
    fill(this.C);
    rect(this.X, this.Y, dx, dy);
  }

switch(){
  if(this.C==[0,0,255]){this.C=[255,0,0];}
  else{this.C=[0,0,255];}
}
}








function setup(){

  createCanvas(W,H);
  C1=[255*random(),0,255*random()];
  C2=[255*random(),255,255*random()];
  for(var i  = 0;i<ncols;i++){
    SPINS[i]=[];
    for(var j  = 0;j<nrows;j++){
      //SPINS[i][j]=1;
      SPINS[i][j]=floor(2*random())*2 -1;

    }
  }
}


function calculoEvecino(Sa,Sb){
  if(Sa == Sb){return 1;}
  else{return -1;}
}

function calculoEgrilla(M){
  let H = 0;
  //vertical
  for(var j = 0;j<nrows; j++ ){
      for(var i = 0;i<ncols; i++ ){
          if(i==ncols-1){
            H=H+calculoEvecino(M[i][j],M[0][j]);
          }
          else{
            H=H+calculoEvecino(M[i][j],M[i+1][j]);
          }
      }

  }
  for(var i = 0;i<ncols; i++ ){
      for(var j = 0;j<nrows; j++ ){
          if(j==nrows-1){
            H=H+calculoEvecino(M[i][j],M[i][0]);
          }
          else{
            H=H+calculoEvecino(M[i][j],M[i][j+1]);
          }
      }

  }
  return -J*H;
}

function copiar(M){
  let RET=[];
  for(let  i =0;i<M.length;i++){
    RET[i]=M[i];
  }
  return RET;

}





function deltaErandom(M){
  let MatR = copiar(M); //matriz respuesta
  let MatP = copiar(M);  // matriz prueba



  let ret = 0;
  let irand = floor(random()*ncols);
  let jrand = floor(random()*nrows);

  let Eini = calculoEgrilla(MatP);
  let E = Eini;

  let newM = switchXY(MatP,irand,jrand);
  let Efin = calculoEgrilla(newM);

  let Delta = Efin - Eini;
  if(Delta<=0){
    ret = Delta;
    E=Efin;
    MatR = copiar(newM);
    //console.log("CHANGE1");
  }
  else{
    //console.log("hheeeh heeee");
    p = random();
    let exponencial = exp(-b*Delta);
    if(p<exponencial){
      //console.log(p,exponencial);
      ret = Delta;

      E=Efin;
      MatR=copiar(newM);
      //console.log("CHANGE2");
    }
    else{MatR = switchXY(MatR,irand,jrand);}
  }

  return {"MAT" : MatR, "RET" : ret,"EN":E};







}








function switchXY(Mat,i,j){
  let M = copiar(Mat);
  M[i][j]=-M[i][j];
  return M;

}
function mouseClicked(){
  setup();
  //switchXY(10,10);
}






function draw(){
  background(200);
  J=pow(10,map(mouseX,0,W,-4,5));

  Tc = (2*J)/(Kb*0.88137);
  Tp=pow(10,map(mouseY,H,0,-4,6));
  b=1/(Kb*Tp);
  console.log(J,Tp);
  let TOSS = deltaErandom(SPINS);
  SPINS = TOSS["MAT"];
  for(var i  = 0;i<ncols;i++){
    for(var j  = 0;j<nrows;j++){
      var x = i * dx;
      var y = j* dy;
      stroke(0);
      F=C1;
      if(SPINS[i][j]==1){F=C2;}
      fill(F);
      rect(x,y,dx,dy);
    }

  let TextoE = "Energy = "+TOSS["EN"].toFixed(4)+" J";
  let TextoT="Temperature = "+Tp.toFixed(4)+" K";

  noStroke();
  fill(0,0,0,5);
  rect(10,5,max(textWidth(TextoT),textWidth(TextoE))+20,70);



  fill(0,255,0,100);
  textSize(16);
  text(TextoT,20,20);
  text("J = "+J.toFixed(4),20,40);
  text(TextoE,20,60);
  }





}
