new p5();
let W = windowWidth;
let H = windowHeight;

//variables de tiempo
let dt = 0.5;

//variables de entorno
let amortiguador = 1;
let N_part = 100;
let Rmax = 0.03; //proporcion del radio maximo a la maxima medida del canvas
let potenciador_color=10;

let pPar=0.02;
let pCamb=0.005;

function setup() {
  createCanvas(W, H);

}

function remover_sistema(oldP,id){
  let nP=[];
  let c=0;
  for(let k = 0;k<oldP.length;k++){
    if(oldP[k].ID==id){
      c++;
    }
    nP[k]=oldP[k+c];

  }
  return nP
}


class particula{
  constructor(id,xo,yo,velx,vely,m){
    this.ID = id;
    this.M = m;
    this.R = map(this.M,5,200,10,Rmax*min(H,W));



    this.ID_lastchange=-1;

    this.X = xo;
    this.Y = yo;

    this.VX = velx;
    this.VY = vely;

    this.exist=1;

    this.system=[];

    this.C=[255-this.ID*potenciador_color,255-this.M,this.M-this.ID*potenciador_color];

  }

  distancia(otra){
    return sqrt(pow((this.X-otra.X),2)+pow((this.Y-otra.Y),2));
  }

  aceleracion(otra){
    let r = this.distancia(otra);
    let theta = acos((otra.X-this.X)/r);
    let A = -0.005*(otra.M/pow(r,2));
    let ax = A * cos(theta);
    let ay = A * sin(theta);

    this.VY=this.VY+ay*dt;
    this.VX=this.VX+ax*dt;
  }


  set_system(P){
    this.system = P;
  }

  avanzar(){


    let newx = this.X + this.VX*dt;
    let newy = this.Y + this.VY*dt;

    if(newx+this.R >= W | newx-this.R <= 0){
      //this.VX = -this.VX*amortiguador;
      newx = W-this.X;
    }
    if(newy+this.R >= H | newy-this.R <= 0){
      //this.VY = -this.VY*amortiguador;
      newy = H-this.Y;
    }


    for(let j = 0;j<this.system.length;j++){
      let other = this.system[j];
      if(other != this){
        if(other.ID==this.ID){
          this.aceleracion(other);
          if(this.distancia(other) < (this.R + other.R)){
          fill(255);
          let RR=max(this.R,other.R);
          let Dx = other.X - this.X;
          let Dy = other.Y - this.Y;
          circle(this.X+Dx/2,this.Y+Dy/2,2*RR+2*RR*random());
          this.exist=0;
          other.exist=0;
          }

        }


      }

    }
    this.X  = newx;
    this.Y = newy;
    let sumaV=this.VX+this.VY
    if(random()<pCamb){
      this.VX=-this.VX+10*(2*random()-1)/2;
    }
    if(random()<pCamb){
      this.VY=-this.VY+10*(2*random()-1)/2;
    }






  }


  paint(){

    fill(this.C);
    circle(this.X,this.Y,this.R);
    fill(0);
    text(this.ID,this.X-5,this.Y+5);




  }

}

P=[];
function crear_par(){
  let l=P.length;
  let ranx =random()*W;
  let rany =random()*H;
  let ranm = random()*200;
  let ranr = map(ranm,0,200,3,Rmax*min(H,W));
  let ranorient = floor(2*random());
  fill(255);
  circle(ranx,rany,4*ranr);

  if(ranorient == 0){
    P[l] = new particula(l,ranx-5-ranr,rany,-5,ranx/10-5,ranm);
    P[l+1]=new particula(l,ranx+5+ranr,rany,5,ranx/10-5,ranm);
  }
  else{
    P[l] = new particula(l/2,ranx,rany-5-ranr,ranx/20-10,-5,ranm);
    P[l+1]=new particula(l/2,ranx,rany+5+ranr,ranx/20-10,5,ranm);



  }
}




function draw() {
  if(random()< pPar & P.length < N_part){
    crear_par();
  }

  dt_exp = map(mouseX,0,W,-2,1);
  pPar = map(mouseY,0,H,0.005,0.01);
  dt = pow(10,dt_exp);
  background(0);
  for(let i = 0;i<P.length;i++){
  if(P[i].exist==1){
  P[i].set_system(P);
  P[i].avanzar();
  P[i].paint();
  }

  }
    console.log(P);

}
