new p5();

let W = windowWidth;
let H = windowHeight;

let Tstep=1;
let dtc = 1;


let torture = 0;
let limit = 200;

let text_normal = ["Hernan","04:20","Alexandria","Gibbs","Black Hole","12:45","01:22","Dic. 7 2018","Mar. 20 2352","Google","Anhedonia","Billy","Toronto","Bethe-Bloch","Escylla","Charibdis","Apollo 11","Polar","Keops","Nazi","Batman"];
let text_bad=["NO!","AAHH","STOP","STOP! NOW!","STOOOP","NO NO NO","HURTS!","PLEASE","DONT","IT HURTS", "KILL ME", "END IT!", "NO NO NO", "NOOOOOO"];





class floatingText{
  constructor(mood,xx,yy){
    this.T=" ";
    this.mood=mood;

    if(this.mood=="normal"){
      this.T=text_normal[floor(random()*text_normal.length)];
    }
    else if (this.mood=="bad") {
      this.T=text_bad[floor(random()*text_bad.length)];

    }


    this.X = xx;
    this.Y = yy;

    this.Tsize=random()*50;


    this.VY=2*(random()*2-1);
    this.VX=2*(random()*2-1);



  }

  changemood(m){
    if(m=="bad" & this.mood=="normal"){
      this.mood="bad";
      this.T=text_bad[floor(random()*text_bad.length)];
      this.VX=this.VX*5;
      this.VY=this.VY*5;
    }

    else if (m=="normal" & this.mood=="bad"){
      this.mood="normal";
      this.T=text_normal[floor(random()*text_normal.length)];
      this.VX=this.VX/5;
      this.VY=this.VY/5;


    }




  }



  move(){

    let m = 1;
    if(mouseIsPressed & random()<map(mouseY,0,H,0,1)){
      m=-1;
    }

    this.X=(this.X+this.VX*dtc*m ) % W;
    this.Y=(this.Y+this.VY*dtc*m ) % H;

    if(random()<0.05){
      this.X=this.X+2*(random()*2-1);
      this.Y=this.Y+2*(random()*2-1);

    }

  }


  paint(){


    let font = 200*(torture/limit);
    fill(255*torture/limit);

    let rr=0;
    if(mouseIsPressed){rr=random()*50*torture/limit;}
    textSize(font+rr+this.Tsize);

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

this.X=this.X+this.VX*dtc*m;
this.Y=this.Y+this.VY*dtc*m;

if(this.X < 0){this.X=W-1;}
if(this.X > W){this.X=1;}
if(this.Y < 0){this.Y=H-1;}
if(this.Y > W){this.Y=1;}





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
  let nang = 360-angrotm;
  rotate(nang);

  let angroth=(ang_h-90)*ran%360;

  rotate(angroth);
  rect(0,0,0.5*this.R*ran,0.01*this.R*ran);
  nang = 360-angroth;
  rotate(nang);
  //rotate(-angroth);
  translate(-this.X,-this.Y);

}






}
  let t = [];
  let r = [];
  let Nclocks= 20 ;
  let Nwords = 50 ;
function setup() {
  createCanvas(W, H);
  frameRate(15);


  for(let i = 0;i<Nclocks;i++){
  r[i] = new clock(random()*W,random()*H,floor(random()*12),floor(random()*60),random(),random()*150 + 20);
    r[i].VX=3*(random()*2 - 1);
    r[i].VY=3*(random()*2 -1);

  }



  for(let q = 0;q<Nwords;q++){
  t[q] = new floatingText("normal",random()*W,random()*H);
  }


}

function edit_word(val){
  if (val==1){
    if (random() < 0.6){t[t.length]=new floatingText("bad",random()*W,random()*H);}
    else{t[t.length]=new floatingText("normal",random()*W,random()*H);}


  }
  else if (val==-1) {
    t.pop();


  }
   W = windowWidth;
   H = windowHeight;


}





let color1 = 0;
let color2 = 0;
let color3 = 0;


function draw() {

  dtc = map(mouseX,0,W,0,10);

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

  if(random()<torture/limit){
    edit_word(1);

  }



  if(random()<dtc/4){
  color=[255*(1-coef),0,0];
  }
  if ((Tstep_exp+2)/8 > random()){

  color=[0,0,0];


  }

  }
  else{
  if(torture < limit & torture >=0){
    torture --;
    if(random()<1-torture/limit & t .length >= Nwords){
      edit_word(-1);

    }

  }



  }

  background(color);

  //console.log(r[0].X,W,r[0].Y,H);

  for(let k = 0;k<t.length;k++){
    if(mouseIsPressed & random()<dtc/100){
      t[k].changemood("bad");
    }
    if(!mouseIsPressed & random()<0.05) {
      t[k].changemood("normal");
    }

    t[k].move();
    t[k].paint();

  }
  for(let j = 0;j<r.length;j++){
    r[j].paint();
    r[j].move();
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
