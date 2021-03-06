new p5();
let W = windowWidth;
let H = windowHeight;
let Rnuc = 5;
let pRad =0.005;
let exp_i = -4;
let exp_f= -1;
let ESCALAS=["Tenths ","Hundreds ","Thousands ","Millions ","Hundreds of Billions ","Trillions ","Billions of Trillions ","Trillions of Trillions ","Billions of trillions of trillions ","Trillions of Trillions of Trillions of Trillions "]


class atomo{
  constructor(xo,yo,Z){

      this.X = xo;
      this.Y = yo;




      this.PROT=Z;
      this.NEUT=floor(random()*this.PROT);
      this.A=this.PROT+this.NEUT;

      this.R=this.A/2;

      this.Pdecay=pRad*this.R;
      this.E=this.PROT;

  }


  decaer(){
    if(random()<this.Pdecay){
    this.PROT=max(this.PROT-1,0);
    this.NEUT = max(this.NEUT-1,0);
    this.A=this.PROT+this.NEUT;

    this.R=this.A/2;

    this.Pdecay=pRad*this.R;
    this.E=this.PROT;
    stroke(255);
    let newR = 20*this.R;
    let th = random()*2*3.141592;
    line(this.X+0.2*newR*cos(th),this.Y+0.2*newR*sin(th),this.X+newR*cos(th),this.Y+newR*sin(th));
    stroke(0);

  }

  }




  paint(){
    this.decaer();
    this.X=this.X+(2*random()-1)*0.001/this.Pdecay;
    this.Y=this.Y+(2*random()-1)*0.001/this.Pdecay;
    let c_prot=0;
    //nuecleones
    for(let i = 0; i < this.A;i++){
      let th = 2*3.141592 *i/ this.A;
      let x = this.X + this.R * (2*random()-1)*cos(th) ;
      let y = this.Y + (2*random()-1)*this.R * sin(th);
      if(random()<this.NEUT/this.A){
        fill([0,0,255]);
        circle(x,y,Rnuc);
      }
      else  {
        fill([255,0,0]);
        circle(x,y,Rnuc);
      }
    }
    //electrones
    for(let i = 0;i<this.E;i++){
      let th = 2*3.141592 *random();
      let x = this.X + 2*(this.R +5)*cos(th)+(2*random()-1)*this.R/2;//+(this.R/2)*(this.PROT/2)*(2*random()-1);
      let y = this.Y + 2 *(this.R + 5)* sin(th)+(2*random()-1)*this.R/2;//+(this.R/2)*(this.PROT/2)*(2*random()-1);
      fill(255);
      circle(x,y,2);

      //text(this.Z,this.X,this.Y)
    }
//   if(this.PROT>0){
//   let name = DATA["elements"][this.PROT-1].name;
//   let mass =DATA["elements"][this.PROT-1].atomic_mass;
//   text(name,this.X,this.Y+2*(this.R+5));
//   text(mass,this.X,this.Y+2*(this.R+5)+10);
// }


  }


}






function escala(exp,ini,fin){

  let n = int(floor(map(exp,ini,fin,0,ESCALAS.length))) ;

  return ESCALAS[n];



}





let Natomos = floor(random()*15)+2;
let ATOMOS =[];






function setup() {

  createCanvas(W, H);
  frameRate(20);
  for(let j =0;j<Natomos;j++){
    ATOMOS[j]=new atomo(W/5 + random()*3*W/5,H/5 + random()*3*H/5,floor(random()*50)+1);
  }

}


function draw() {

  let fr = map(mouseX,0,W,exp_i,exp_f);
  frameRate(30);

  pRad = pow(10,fr);

  let texto = escala(fr,exp_i,exp_f);


  background(0);
  stroke(255);
  text("Approximate Time Scale (per milisecond of simulation) : "+texto+"of years.",10,10);
  noStroke();

for(let j =0;j<Natomos;j++){
  ATOMOS[j].paint();

}




}

function mouseClicked(){
  background(0);
  setup();
  background(0);
}
