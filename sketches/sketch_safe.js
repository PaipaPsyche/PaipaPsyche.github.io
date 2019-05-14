

let W;
let H;

let test;

let level =1;

//settings
let n_ruedas=3;
let dT;
let T;
let maxv=1/5  ;

let mx;
let my;
let ticks = 4;



class rueda{

  constructor(x,y,r,n_ticks){
    this.NT=n_ticks; //numero de ticks de la tueda
    this.IS=0;

    //constantes de velocidad: A con Xmouse y B con Ymouse
    this.CONS_A=maxv*(random()*2-1)/2;
    this.CONS_B=maxv*(random()*2-1)/2;

    this.PH = randomGaussian()*10;

    //posicion
    this.X=x;
    this.Y=y;


    this.FIN = false;
    this.dAngle = round(360/this.NT);

    this.C=[0,0,0];
    this.C[floor(3*random())]=255;
    this.R = r;

  }



  paint(){
    push();

    noFill();
    stroke(0);
    strokeWeight(3);
    circle(this.X,this.Y,this.R);

    let angle = round(T*(this.CONS_A*(mx-W/2)+ this.CONS_B*(my-H/2)+this.PH)%360);
    if(angle<0){angle=max(360+angle,0)}





    for(let i =0;i<this.NT;i++){
        //console.log(angle)
        if(floor(angle/this.dAngle)==i){
          this.IS=i;
          fill(0);
          stroke(0);
          strokeWeight(2);
          if(this.FIN){fill(0,255,0);}
          circle(this.X+(this.R-10)*cos(i*this.dAngle),this.Y+(this.R-10)*sin(i*this.dAngle ),5);
          }
          else{

            noFill();
            strokeWeight(1);
            circle(this.X+(this.R-10)*cos(i*this.dAngle),this.Y+(this.R-10)*sin(i*this.dAngle ),5);
          }





    }


  }



}






function setup() {
  angleMode(DEGREES);

  W = windowWidth;
  H = windowHeight;
  dT = 0.1;
  T = 1000*random();
  mx=W/2;
  my=H/2;


  createCanvas(W, H);
  test = [];
  for(let j = 0;j<n_ruedas;j++){
    test[j]=new rueda(W/2,H/2,50+30*j,ticks);
    test[j].paint();
  }
}

function draw() {
  background(255 );
  for(let j = 0;j<test.length;j++){
    test[j].paint();
  }

  //agregar ticks binarios





  if(check()){dT=0;finished();}


  T=T+dT;

//
// if (mouseIsPressed & !check()){
//
// }
//
// if (mouseIsPressed & check()){
//   n_ruedas=n_ruedas+floor(random()*2)
//   ticks= ticks+floor(random()*4)
//   level++;
//   setup();
// }


strokeWeight(0.5);
fill(0);
textSize(25);

text("Nivel: "+level,50,50);


}







function mouseClicked() {
  if (check()) {
    n_ruedas=n_ruedas+floor(random()*2)
    ticks= ticks+floor(random()*2)
    level++;
    setup();
  } else {
    mx = mouseX;
    my = mouseY;
  }
}


function finished(){
  for(let i = 0;i<test.length;i++){
    test[i].FIN=true;


  }

}


function check(){
  let alined = true;
  for(let i = 0;i<test.length-1;i++){
    if(test[i].IS!=test[i+1].IS){alined=false;}
  }
  return alined;
}
