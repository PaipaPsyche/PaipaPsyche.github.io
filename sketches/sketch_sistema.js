
new p5();
let W = windowWidth;
let H = windowHeight;


let T = random()*2000;
let dT=0.0001 ;
let c;

let pPlaneta =0.9;
let pInv=0.05;
let Nmoons=3;
let pAnillo = 0.2;
let pNum = 0.1;
let pHered = 0.1;
let long_name = 2;
let pCiv=0.1;

let SILABAS =["v","sk","gn","s","ph","th","sh","z","h","n","nsk","str","mn","pt","gr","thr","br","fr","y","k","c","tr","cr","gl","kr","t","p","b","m","g","l","r"];
let VOCALES = ["ua","ia","a","e","i","o","u","ee","oo","ae","au","ie","ao","oa","io"];
let GREEK=["Alpha","Beta","Gamma","Delta","Omicron","Omega","Ypsilon","Phi","Sigma"]
let SCALES=[" millones de"," billones de"," trillones de","",""]

class random_name{
  constructor(n){
    let txt ="";
    for(let i =0;i<n;i++){

      txt=txt+SILABAS[floor(random()*SILABAS.length)]+VOCALES[floor(random()*VOCALES.length)];
      if(random()<0.2 & i<(n-2)){txt=txt+"-";}
    }

    this.TXT=txt;
  }

}






class planet{
  constructor(x,y,r){
    this.W=floor(10000*(1-2*r/min(W,H))/pow(r,3/2))+1;
    if(random()<pInv){this.W=-this.W;}
    this.X=x;
    this.Y=y;
    this.R=3*r;

    this.NAME=new random_name(2+floor(random()*long_name)).TXT;

    this.RP= 2+random()*this.R/55;
    this.C =[50+random()*205,50+random()*205,50+random()*205];
    let nmoon=floor(random()*(Nmoons));
    this.MOON=[];
    for(let m = 0;m<nmoon;m++){
      this.MOON[m]= new planet(this.X,this.Y,this.RP);
      this.MOON[m].MOON=[];
      this.MOON[m].W=1.5*(m+1)*this.W + 4*(2*random()-1);
      this.MOON[m].R= this.MOON[m].R + 5* m**2;
      this.MOON[m].RING=0;
      this.MOON[m].NAME="";
    }
    this.RING = 0;
    this.CIVI=0;
    if(random()<pAnillo*this.RP){this.RING=1};

  }
  setXY(x,y){
    this.X=x;
    this.Y=y;

  }




  paint(){
    stroke(0);
    let x = this.X+this.R*cos(this.W*T);
    let y = this.Y+this.R*sin(this.W*T);


    for(let m = 0;m<this.MOON.length;m++){
      this.MOON[m].setXY(x,y);
      this.MOON[m].paint();



    }




    fill(this.C);
    circle(x,y,this.RP);


    stroke(255);
    strokeWeight(0.5);
    textSize(10);
    fill(255);
    if(this.CIVI==1){
      fill(0,255,0);
      stroke(0);
    }
    text(this.NAME,x-textWidth(this.NAME)/2,y-4*this.RP);
    stroke(0);

    if(this.RING==1){

    stroke(220);

    line(x-1.5*this.RP,y-1.5*this.RP,x+1.5*this.RP,y+1.5*this.RP);
    stroke(0);
  }


  }


}





class system{
  constructor(nP,r){

    this.DR = r/(nP+1);
    this.PLANETS = [];
    this.NAME=new random_name(2+floor(random()*long_name)).TXT;



    this.Rsun=this.DR*(random()+0.2);
    this.Wsun=80+40*random();
    this.Dtierra=floor(random()*100000);
    this.scales=SCALES[floor(random()*SCALES.length)];

    this.Tsun=floor(random()*3);

    this.CIV=[];
    this.nameciv="";

    let contador = 0;
    for(let p = 0;p<nP;p++){
      if(random()<pPlaneta){

      this.PLANETS[contador]=new planet(W/2,H/2,this.DR*(p+1));
      if(random()<pHered){ this.PLANETS[contador].NAME=this.NAME+this.PLANETS[contador].NAME;}
      else if(random()<pNum){ this.PLANETS[contador].NAME=this.NAME+"-"+(contador+1);}
      else if (random()<pCiv & p>0.2*nP & p<0.6*nP & this.CIV.length<1){
        this.CIV[0]=this.PLANETS[contador];
        this.PLANETS[contador].CIVI=1;
        let sp=this.CIV[0].NAME.split("-")[0].split("");
        this.nameciv="";
        for(let nn =0;nn<2*floor(2*random()+1) & nn < sp.length;nn++){
          this.nameciv=this.nameciv+sp[nn];
        }
        this.nameciv=this.nameciv+VOCALES[floor(random()*VOCALES.length)];
      }
      if (contador/nP < 0.5){this.PLANETS[contador].RING=0;}
      contador=contador+1;

      }
    }
    if(random()<0.1){this.NAME=GREEK[floor(random()*GREEK.length)]+"-"+this.NAME}




  }

  paint(){


    stroke(0);
    if(this.Tsun ==0 ){fill(230+25*cos(T*7),150+50*sin(T*11),0);}
    else if(this.Tsun==1){fill(150+100*sin(T/3),250,230+20*sin(T/5));}
    else{fill(255,240,80+70*sin(3*T));}



    circle(W/2,H/2,this.Rsun+0.1*this.DR*sin(this.Wsun*T));

    for(let p = 0;p<this.PLANETS.length;p++){
    this.PLANETS[p].paint();
    }


    stroke(255);
    strokeWeight(0.5);
    textSize(25);
    fill(255);
    text("Sistema "+this.NAME,20,40);
    textSize(12);

    text("A "+this.Dtierra+this.scales+" años luz de la tierra",20,60);
    if(this.CIV.length==1){

      text("Civilización "+this.nameciv+" presente en "+this.CIV[0].NAME,20,80);
    }
    else{text("No hay civilizaciones en este sistema.",20,80);}
    strokeWeight(1.5);
    line(20,85,300,85);
    strokeWeight(0.5);
    text(this.PLANETS.length+" planetas : ",20,100);
    for(let i = 0;i<this.PLANETS.length;i++){
      textSize(10);
      stroke(255);
       fill(255);
      if(this.PLANETS[i].CIVI==1){stroke(0,255,0); fill(0,255,0);}

      text(this.PLANETS[i].NAME,20,120+i*20);
    }
    stroke(0);



  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    T=0;
  } else if (keyCode ===BACKSPACE){
    T=2000*random();
  }
}



  function setup(){

    createCanvas(W,H);
    let np =floor(random()*8)+3;
    pNum=(1-((np-3)/3-1)/3)*random();
    c = new system( np, H/3.5);



  }





function draw(){
  background(0);

  c.paint();
  if(mouseIsPressed){
    setup();
    background(0);
  }

  T=T+dT;
  mult=map(mouseY,0,H,0.01  ,5);
  dT = mult * map(mouseX,0,W,-0.0005,0.0005);

}
