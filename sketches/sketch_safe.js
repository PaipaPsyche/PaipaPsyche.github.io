

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
    this.CONS_A=maxv*(random()*2-1)*0.7;
    this.CONS_B=maxv*(random()*2-1)*0.7;

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

  frameRate(60);

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

  let CODES = [];
  for(let i = 0;i<ticks;i++){
    let chain="";
    for(let j=0;j<test.length;j++){

      if(test[j].IS == i){
        chain=chain+"1";
      }
      else{chain=chain+"0";}

    }
    CODES[i]=chain;



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


strokeWeight(1);
fill(0);
textSize(25);
noStroke();
text("Nivel: "+level,50,50);

strokeWeight(0.5);
fill(255,0,0);
textSize(15);
text("Factor XY : ["+((mx- W/2)/W).toFixed(3)+","+((my- H/2)/H).toFixed(3)+"]",50,80);
fill(0,0,255);

text("Posibilidad de Exito : 1 entre "+(ticks)**(n_ruedas+1),50,100);
textSize(13);
text("Tiempo estimado :" +round(((ticks)**n_ruedas)*ticks/60)+" segundos ("+round(((ticks)**n_ruedas)*ticks/3600)+" minutos)",50,120);
(((ticks)**n_ruedas)/60)


textSize(15);
fill(0,180,0);
text("CODIGOS: ",50,140);






let exito = "";
for(let i =0;i<n_ruedas;i++){
exito=exito+"1";
}

for (k =0;k<CODES.length;k++){
fill(0);
if(CODES[k]==exito){fill(0,255,0);}
text(CODES[k],50,160+k*20);

fill(255,0  ,0);
text(binToDec(CODES[k]),55+textWidth(CODES[k]),160+k*20);


}




}











function mouseClicked() {
  if (check()) {
    if(random()<0.5 & ticks<12){ticks= ticks+1+floor(random()*3);}
    else{n_ruedas=n_ruedas+1+floor(2*random());}


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

function binToDec(s){
let lista=s.split("");
let nterm=lista.length;

let ans= 0;
for(let i =0;i<nterm;i++){
  if(lista[i]==="1"){
    ans=ans+(2**i);
  }


}

return ans;

}



function check(){
  let alined = true;
  for(let i = 0;i<test.length-1;i++){
    if(test[i].IS!=test[i+1].IS){alined=false;}
  }
  return alined;
}
