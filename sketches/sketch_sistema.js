
new p5();
let W = windowWidth;
let H = windowHeight;


let T = random()*2000;
let dT=0.0001 ;
let c;

let pPlaneta =0.6;
let pInv=0.004;
let Nmoons=3;
let pAnillo = 0.3;
let pNum = 0.1;
let pHered = 0.2;
let long_name = 3;
let pCiv=0.15;
let pEat=0.0005;








let SILABAS =["pl","v","s","kl","ph","th","sh","z","h","n","thr","str","gr","br","fr","y","k","c","tr","cr","gl","kr","t","p","b","m","g","l","r"];
let ENDINGS=["rsei","cury","rth","rte","rn","ptuno","rno","rano","sto","lgia","nz","lcani","nucci","tina","ngo","gnikai","ccini","cordia","loide","maritano","rineris","lypso","lkanti","ntico","dici","tafar","nica","nyx","nsk","lucci","bino","nita","tana","mble","ptera","bdis","scylla","dore","loch","schen","klich","nich","niakea","stans","varius","leaux","kour","leau","ngria","nakea","lax","nax","nds","ngis","nt","reen","sis","tät","rok","fari","tanari","gneko","gana","mander","rgen","ruchen","ska","nimedae","keshi","phorus","toris","stein","mark","burg","tröen","land","ntis","phoros","tch","rmir","rsay","ght","mpton","koft","nst","mst","ft","gs","nk","ntic","mp","lish","pture","nger","lette","tion","zung","schaft","ncia","sta","smus","nginus","rnet","ster","star","ridas","ston","tani","ton","nata","sky","nov","rys","riana","berg","ton","tron","rinae","stro","ris","nksy","kov"]
let VOCALES = ["ua","ia","a","e","i","o","u","ee","oo","ae","ie","oa","io"];
let GREEK=["Alpha","Epsilon","Nega","Proxima","Magna","Ultima","Central","Prima","Majora","Minora","Nova","Eta","Lambda","Tau","Beta","Gamma","Delta","Omicron","Omega","Ypsilon","Phi","Sigma"]
let SCALES=[" millones de"," billones de"," trillones de","",""]
let ROMNUM=["-A","-B","-C","-D","-I","-II","-III","-IV","-V","-X","-Y","-Z"]

class random_name{
  constructor(n){
    let txt ="";
    for(let i =0;i<n-1;i++){

      txt=txt+SILABAS[floor(random()*SILABAS.length)]+VOCALES[floor(random()*VOCALES.length)];
      if(random()<0.2 & i<(n-3)){txt=txt+"-";}
    }
    if(random()<0.6 & txt.split("").length<=6){
      txt=txt+ENDINGS[floor(random()*ENDINGS.length)];


    }
    this.TXT=txt;

  }

}






class planet{
  constructor(x,y,r){
    this.W=floor(10000*abs(1-2*r/min(W,H))/pow(r,3/2))+1;
    if(random()<pInv){this.W=-this.W;}
    this.X=x;
    this.Y=y;
    this.R=3*r;

    this.NAME=new random_name(2+floor(random()*long_name)).TXT;

    this.RP= 2+random()*this.R/50;
    this.C =[50+random()*205,50+random()*205,50+random()*205];
    let nmoon=floor(random()*(Nmoons));
    this.MOON=[];
    for(let m = 0;m<nmoon;m++){
      this.MOON[m]= new planet(this.X,this.Y,this.RP);
      this.MOON[m].MOON=[];
      this.MOON[m].W=1.5*(m+1)*this.W + 4*(2*random()-1);
      this.MOON[m].R= this.MOON[m].R + 6*m**2;
      this.MOON[m].RING=0;
      this.MOON[m].NAME="";
    }
    this.RING = 0;
    this.CIVI=0;
    if(random()<pAnillo*this.RP){this.RING=1};

    this.falling=0;

  }
  setXY(x,y){
    this.X=x;
    this.Y=y;

  }




  paint(){
    stroke(0);
    let x = this.X+this.R*cos(this.W*T);
    let y = this.Y+this.R*sin(this.W*T);
    if(this.falling==1){
      this.R = max(0,this.R-50000/this.R*abs(dT));
      this.W=max(min(100,this.W+1/this.R*abs(dT)*(this.W/abs(this.W))),-100);
      console.log(this.W);



      //this.W=this.W*1.002;
    }


    for(let m = 0;m<this.MOON.length;m++){
      this.MOON[m].setXY(x,y);
      this.MOON[m].paint();



    }




    fill(this.C);
    circle(x,y,this.RP);


    stroke(255);
    strokeWeight(0.5);
    textSize(11);
    fill(255);
    if(this.CIVI==1){
      fill(0,255,0);
      stroke(0);
    }
    if(this.falling==1){
      fill(255,0,0);
      if(random()<15/(this.R)){
        stroke(230);
        line(x+this.RP,y,W/2+0.5*this.RP,H/2);
        stroke(220+20*sin(7*T),0,0);
        line(x,y+this.RP,W/2,H/2+0.5*this.RP);
        stroke(255,220+20*sin(8*T),0);
        line(x-this.RP,y,W/2-0.5*this.RP,H/2);
        stroke(255,0,0)
        line(x,y-this.RP,W/2,H/2-0.5*this.RP);
        stroke(0);
      }

      fill(255,250*floor(2*random()),0);
      circle(x+this.R*random()*0.05*this.RP*cos(random()*T),y+this.R*0.05*random()*this.RP*sin(random()*T),230*random()*this.RP/(this.R+1));
      fill(255,0,0);
      stroke(0);

    }
    text(this.NAME,x-textWidth(this.NAME)/2,y-4*this.RP);



    stroke(0);

    if(this.RING==1){

    stroke(220);
    fill(255);
    strokeWeight(1.2);
    line(x-1.8*this.RP,y-1.8*this.RP,x+1.8*this.RP,y+1.8*this.RP);
    stroke(0);
  }


  }


}





class system{
  constructor(nP,r){

    this.DR = r/(nP+1)+4;
    this.PLANETS = [];
    this.NAME=new random_name(2+floor(random()*long_name)).TXT;
    this.Tciv=0;



    this.Rsun=this.DR*(random()+0.2);
    this.Wsun=80+40*random();
    this.Dtierra=floor(random()*100000);
    this.scales=SCALES[floor(random()*SCALES.length)];

    this.Tsun=floor(random()*3);
    this.TXTsun="";

    if(this.Rsun > 17 & random()<0.2){
      this.Tsun=3;
      this.TXTsun="Agujero Negro";
    }



    this.CIV=[];
    this.nameciv="";

    let contador = 0;
    for(let p = 0;p<nP;p++){
      if(random()<pPlaneta){

      this.PLANETS[contador]=new planet(W/2,H/2,this.DR*(p+1));
      if(random()<pHered & this.PLANETS[contador].NAME.split("").length<=4 & this.NAME.split("").length<=6){ this.PLANETS[contador].NAME=this.NAME+this.PLANETS[contador].NAME;}
      else if(random()<pNum){ this.PLANETS[contador].NAME=this.NAME+"-"+(contador+1);}
      else if (random()<pCiv & p>0.2*nP & p<0.6*nP & this.CIV.length<1){
        this.CIV[0]=this.PLANETS[contador];
        this.PLANETS[contador].CIVI=1;

        let sp=this.CIV[0].NAME.split("-")[0].split("");
        this.nameciv="";
        for(let nn =0;nn< min(sp.length,4+floor(random()*3));nn++){
          this.nameciv=this.nameciv+sp[nn];
        }
        this.nameciv=this.nameciv+VOCALES[floor(random()*VOCALES.length)];
      }
      if (contador/nP < 0.5){this.PLANETS[contador].RING=0;}
      contador=contador+1;

      }
    }
    if(random()<0.2){this.NAME=GREEK[floor(random()*GREEK.length)]+"-"+this.NAME}
    if(random()<0.5 & this.NAME.split("").length<=2*(long_name+1) ){this.NAME=this.NAME+ROMNUM[floor(random()*ROMNUM.length)]}


    if(this.Tsun==1 & this.Rsun<=12 & this.Rsun>9){this.TXTsun="Enana blanca";}
    else if(this.Tsun==1 & this.Rsun<9){this.TXTsun="Estrella de neutrones";}
    else if(this.Tsun==1 & this.Rsun>12 ){this.TXTsun="Gigante Azul";}
    else if(this.Tsun==0 & this.Rsun>=12 ){this.TXTsun="Gigante roja";}
    else if(this.Tsun==0 & this.Rsun<12){this.TXTsun="Estrella Joven";}
    else if(this.Tsun==2 &  this.Rsun<6){this.TXTsun="Estrella pequeña";}
    else if(this.Tsun==2 &  this.Rsun>=6){this.TXTsun="Estrella Mediana";}



  }

  paint(){


    stroke(0);

    for(let p = 0;p<this.PLANETS.length;p++){
    this.PLANETS[p].paint();

    if(this.PLANETS[p].R < 2*this.Rsun){
      fill(255);
      let plan=this.PLANETS[p];
      circle(plan.X+plan.R*cos(plan.W*T),plan.Y+plan.R*sin(plan.W*T),10*plan.RP);
      if(this.CIV[0] == plan){
        this.CIV=[];
        this.nameciv="";
      }
      this.PLANETS.splice(p,1);
      this.Rsun=1.35*this.Rsun;



    }
    }
    stroke(0);
    if(this.Tsun ==0 ){fill(230+25*cos(T*7),150+50*sin(T*11),0);}
    else if(this.Tsun==1){fill(150+100*sin(T/3),250,230+20*sin(T/5));}
    else if(this.Tsun==2){fill(255,240,80+70*sin(3*T));}
    else if(this.Tsun==3){
      fill(255,180+40*sin(200*(this.Rsun/12)*T),0);
      circle(W/2,H/2,1.3*(this.Rsun+0.12*this.DR*sin(this.Wsun*T)));

      fill(0);

      circle(W/2,H/2,1.2*(this.Rsun+0.1*this.DR*sin(this.Wsun*T)));


      fill(255,190+30*sin(500*T),0);}



    if(this.Tsun==3 & random()<pEat & this.PLANETS.length>=2){this.PLANETS[0].falling=1;}

    circle(W/2,H/2,this.Rsun+0.1*this.DR*sin(this.Wsun*T));
    if(this.Tsun==3){
      fill(0);
      circle(W/2,H/2,0.9*(this.Rsun+0.05*this.DR*sin(4*this.Wsun*T+0.1)));
    }


    stroke(255);
    strokeWeight(0.5);
    textSize(28);
    fill(255);
    text("Sistema "+this.NAME,20,40);
    textSize(14);

    text("A "+this.Dtierra+this.scales+" años luz de la tierra",20,60);
    if(this.CIV.length==1){

      text("Civilización "+this.nameciv+" presente en "+this.CIV[0].NAME,20,100);
    }
    else{text("No hay civilizaciones en este sistema.",20,100);}
    text("Tipo de estrella : "+this.TXTsun,20,80);
    strokeWeight(1.5);
    line(20,85,300,85);
    strokeWeight(0.5);
    text(this.PLANETS.length+" planetas : ",20,120);
    for(let i = 0;i<this.PLANETS.length;i++){
      textSize(12);
      stroke(255);
       fill(255);
      if(this.PLANETS[i].CIVI==1){stroke(0,255,0); fill(0,255,0);}
      if(this.PLANETS[i].falling==1){fill(255,0,0); }

      text(this.PLANETS[i].NAME,20,140+i*20);
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
    let np =floor(random()*8)+4;
    pNum=(1-((np-3)/3-1)/3)*random();
    c = new system( np, H/3.8);



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
