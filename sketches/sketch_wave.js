new p5();


//variables de entorno
let W = windowWidth;
let H = windowHeight;


//variables de objetos
let Ndiv = 50;
let dx = (W/Ndiv);
let dy = (H/Ndiv);
let R = 3*min(dx,dy)/5;

let RMIN_prop=0.4;

let OSC = [];

//variables de tiempo
let T = 0;
let dt = 1;


class oscillator{
  constructor(x,y,w,p){

    //estaticas
    this.W=w;
    this.P=p;
    this.X=x;
    this.Y=y;
    this.r_min=RMIN_prop*R;


  }




  paint(){

    noFill();
    stroke(80);

    circle(this.X,this.Y,R);



    let x = this.X+R*cos(this.W*T+8*this.P*(mouseY-H/2)/H);
    let y = this.Y+R*sin(this.W*T+8*this.P*(mouseY-H/2)/H);
    noStroke();

    // let cr = 180+50*sin(13*T);
    // let cg = 180+50*sin(7*T);
    // let cb = 180+50*sin(11*T);

    let C = [map(sin(T+8*this.P*(mouseY-H/2)/H),-1,1,50,255),
        map(sin(this.W*T+7*this.P*(mouseY-H/2)/H),-1,1,50,255),
        map(sin(2*this.W*T+9*this.P*(mouseY-H/2)/H),-1,1,50,255)]

    fill(C);
    circle(x,y,this.r_min+0.5*sin(this.W*T));



  }



}





function setup(){
  createCanvas(W,H);
  angleMode(DEGREES);
  let contador=0;
  for(let i = 0;i<Ndiv;i++){
    for(let j = 0;j<Ndiv;j++){
      let phas =sqrt((W/2-i*dx-R/2)**2+(H/2-j*dy-R/2)**2);
      //let phas =(i+j)*25;
      OSC[contador] = new oscillator(i*dx+R/2,j*dy+R/2,5,phas)  ;
      contador=contador+1;
    }

  }


}



function draw(){
  background(0);

  for (k = 0; k<OSC.length;k++){
    OSC[k].paint();
  }

    dt = 8*(mouseX/W-0.5);
   T = T+dt;
   W = windowWidth;
   H = windowHeight;
   R = 2*min(dx,dy)/5;// + 10*sin(((mouseX-W/2)*(mouseX-W/2)/(W*H))*T);
}
