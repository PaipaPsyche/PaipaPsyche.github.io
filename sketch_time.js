new p5();

let W = windowWidth;
let H = windowHeight;

let Tstep=1;
let dtc = 1;


let torture = 0;
let limit = 500;

let text_normal = ["Billy","Toronto","Bethe-Bloch","Escylla","Charibdis","Apollo 11","Polar","Keops","Nazi","Batman"];
let text_bad=["NO!","AAHH","STOP","PLEASE","DONT","IT HURTS", "KILL ME", "END IT!", "NO NO NO", "NOOOOOO"];





class floatingText{
  constructor(mood){
    this.T=" ";
    this.mood=mood;

    if(this.mood=="normal"){
      this.T=text_normal[floor(random()*text_normal.length)];
    }
    else if (this.mood=="bad") {
      this.T=text_bad[floor(random()*text_bad.length)];

    }


    this.X = random()*W;
    this.Y = random()*H;




    this.VY=random();
    this.VX=random();



  }

  changemood(m){
    if(m=="bad"){
      this.mood="bad";
      this.T=text_bad[floor(random()*text_bad.length)];
    }

    else{
      this.mood="normal";
      this.T=text_normal[floor(random()*text_normal.length)];


    }


  }



  move(){

    let m = 1;
    if(mouseIsPressed & random()<map(mouseY,0,H,0,1)){
      m=-1;
    }

    this.X=(this.X+this.VX*dtc*m ) % W;
    this.Y=(this.Y+this.VY*dtc*m ) % H;

  }


  paint(){


    let font = 15 + 100*(torture/limit);
    fill(255*torture/limit);
    textSize(font);
    stroke(255*torture/limit);
    text(this.T,this.X,this.Y);
  }

}





class clock{
constructor(x,y,ho,mo,dt,r){
  this.H=(ho%12);
  this.M=(mo%60);
  this.DT=dt;
  this.R=r;

  this.X=x;
  this.Y=y;

  this.VX=0;
  this.VY=0;

}
avanzar(min){
  let newM=(this.M+min*Tstep);
  let add = floor(newM/60);
  newM= newM % 60;

  this.H=(this.H+add)%12;
  this.M=newM;



}

move(){

let m = 1;
if(mouseIsPressed & random()<map(mouseY,0,H,0,1)){
  m=-1;
}

this.X=max(this.X+this.VX*dtc*m,0 ) % W;
this.Y=max(this.Y+this.VY*dtc*m,0 ) % H;

}

paint(){
  this.avanzar(this.DT);
  let ran = 1;
  stroke(0);
  if(mouseIsPressed){



  ran = 0.5+random()*0.2+random()*(torture/limit);
  stroke(255*(floor(random()*2)),0,0);
  }



  noFill();

  circle(this.X,this.Y,this.R*ran);

  fill(0);
  angleMode(DEGREES);
  translate(this.X,this.Y);

  let ang_h= map (this.H,0,11,0,359);
  let ang_m = map(this.M,0,59,0,359);



  let angrotm=(ang_m-90)*ran%360;
  rotate(angrotm);
  rect(0,0,0.9*this.R*ran,0.01*this.R*ran);
//  rotate(-angrotm);

  let angroth=(ang_h-90)*ran%360;
  rotate(angroth-angrotm);
  rect(0,0,0.5*this.R*ran,0.01*this.R*ran);
  //rotate(-angroth);

}






}
  let t = [];
  let r = [];
  let Nclocks= 100 ;
  let Nwords = 20;
function setup() {
  createCanvas(W, H);


  for(let i = 0;i<Nclocks;i++){
  r[i] = new clock(W/4+random()*W/4,H/4+random()*H/4,floor(random()*12),floor(random()*60),random(),random()*150 + 20);
    r[i].VX=random()*2;
    r[i].VY=random()*2;

  }



  for(let q = 0;q<3*Nwords;q++){
  t[q] = new floatingText("normal");
  }

}




let color1 = 0;
let color2 = 0;
let color3 = 0;


function draw() {

  dtc = map(mouseX,0,W,0.1,1);

  Tstep_exp = map(mouseY,0,H,-2,1);
  Tstep=pow(10,Tstep_exp);


  map_tstep=map(mouseY,0,H,0,1);
  map_dtc=map(mouseX,0,W,0,1);

  color1 = color1 + floor(0.3*dtc+random()*3);
  color2 = color2 + floor(0.5*dtc+random()*5);
  color3 = color3 + floor(0.7*dtc+random()*7);


  let coef = torture/limit;
  let color = [(40+color1%160)*(1-coef) ,(40+color2%160)*(1-coef),(40+color3%160)*(1-coef)];

  if(mouseIsPressed & torture < limit){
    let add = floor(map_tstep+map_dtc);
    torture = torture + add;




  if(random()<dtc/4){
  color=[255*(1-coef),0,0];
  }
  if ((Tstep_exp+2)/8 > random()){

  color=[0,0,0];


  }

  }
  else{
  if(torture < limit & torture >=0){torture --;}



  }

  background(color);
  for(let j = 0;j<r.length;j++){
    r[j].paint();
    r[j].move();
  }

  for(let k = 0;k<t.length;k++){
    if(mouseIsPressed){
      t[k].changemood("bad");
    }
    else{
      t[k].changemood("normal");
    }
    t[k].paint();
    t[k].move();
  }




  if(torture == limit){
    r=[];
    background(0);
    stroke(255);
    fill(255);
    textSize(16);
    text("YOU'VE KILLED TIME.",W/2-60,H/2-60);
    text("YOU MONSTER.",W/2-40,H/2+40);

  }







}
