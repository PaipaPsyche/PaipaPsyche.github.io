new p5();
let W = windowWidth;
let H = windowHeight;
let Rnuc = 5;
let pRad =0.005;



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
    console.log(this.E);
  }

  }




  paint(){
    this.decaer();
    this.X=this.X+(2*random()-1)*0.005/this.Pdecay;
    this.Y=this.Y+(2*random()-1)*0.005/this.Pdecay;
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

      text(this.Z,this.X,this.Y)

    }


  }


}











function setup() {
  createCanvas(W, H);
  frameRate(20);

}

let Natomos = 5;
let ATOMOS =[];
for(let j =0;j<Natomos;j++){
  ATOMOS[j]=new atomo(W/5 + random()*3*W/5,H/5 + random()*3*H/5,floor(random()*50)+1);
}




function draw() {
  let fr = map(mouseX,0,W,0.0001,0.1);
  pRad = fr;
  background(0);
  stroke(255);
  text("pRad = "+pRad.toFixed(4),10,10);
  noStroke();

for(let j =0;j<Natomos;j++){
  ATOMOS[j].paint();

}
}
