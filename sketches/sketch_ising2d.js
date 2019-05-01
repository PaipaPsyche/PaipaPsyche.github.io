new p5();

//variables de entorno y color
let W = windowWidth;
let H = windowHeight;

let ncols = 40;
let nrows = 20;


let dx = W/ncols;
let dy = H/nrows;

//variables de objeto
let SPINS = [];

//variables de tiempo

//constantes


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
  for(var i  = 0;i<ncols;i++){
    SPINS[i]=[];
    for(var j  = 0;j<nrows;j++){

      SPINS[i][j]=255*floor(2*random());

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

function deltaErandom(M){
  let MatR = M;
  let MatP = M  



}








function switchXY(i,j){
  if(SPINS[i][j]==255){SPINS[i][j]=0;}
  else{SPINS[i][j]=255;}
}
function mouseClicked(){
  //switchXY(10,10);
}






function draw(){
  background(200);

  for(var i  = 0;i<ncols;i++){
    for(var j  = 0;j<nrows;j++){
      var x = i * dx;
      var y = j* dy;
      stroke(0);
      fill(SPINS[i][j]);
      rect(x,y,dx,dy);
    }
  }





}
