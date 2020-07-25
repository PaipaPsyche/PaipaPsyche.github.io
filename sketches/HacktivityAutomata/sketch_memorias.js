new p5();

let W;
let H;


let T =0;

let nMem=10;
let nStars=1000;

let nCon = 3*nMem;

let img_logo;
let STARS=[];
let CONNECTIONS=[];


let EXPERIENCIAS=[
  ["Primer dia del colegio","confundido",20],
  ["Elecciones a presidencia 2018","confundido",15],
  ["Mundial 2014","enojado",15],
  ["Elecciones a presidencia 2010","confundido",15],
  ["Mundial del 2006","triste",15],
  ["Accidente en bicicleta ","enojado",10],
  ["Primera ruptura amorosa","triste",25],
  ["Primer viaje a tierra caliente","feliz",15],
  ["Perdida en un centro comercial","confundido",14],
  ["Campeon en torneo de futbol","orgullo",20],
  ["Primer mascota","feliz",25],
  ["Accidente familiar","preocupacion",17],
  ["Castigo sin justa causa","envidia",15],
  ["Peor borrachera","verguenza",12],
  ["Arresto policial","enojado",23],
  ["Ser victima de discriminacion","triste",25],
  ["Ser atracado","confundido",15],
  ["Ganar una rifa","feliz",17],
  ["Graduacion del coelgio","orgullo",20],
  ["Conocer a Maluma","feliz",12],
  ["Ir a Mundo Aventura","feliz",14],
  ["Muerte de tu primer gato","triste",22],
  ["Hacer el ridiculo en la calle","verguenza",15],
  ["Perdida de una amistad","triste",18],
  ["Amor imposible","enojado",13],
  ["Muerte de la abuela","triste",20],
  ["Participar de Science Hack Day 3","feliz",23],
  ["Ser aceptado en la universidad","orgullo",27],
  ["Atentado escuela de cadetes","confundido",14],
  ["Conocer a los suegros","verguenza",16]
]
let EMOCIONES={"verguenza":[130,70,170],"envidia":[0,255,0],"orgullo":[255,100,50],"preocupacion":[180,180,10],"triste":[0,0,255],"confundido":[255,0,255],"enojado":[255,0,0],"feliz":[255,200,0]};
let EMO = ["verguenza","envidia","preocupacion","orgullo","feliz","triste","confundido"];

let MEMORIAS=[];




class memoria{
  constructor( x,y,exp){


    this.X=x;
    this.Y=y;
    this.T=exp[0];
    this.R=exp[2];
    this.E=exp[1];
    this.C=EMOCIONES[this.E];
    this.P1=random();
    this.P2=random();



  }
  isInRange(){
    let ans = false;
    if(sqrt((mouseX-this.X)**2+(mouseY-this.Y)**2) <= 2*this.R){
      ans=true;
    }
    return ans;
  }

  paint(){
    fill(this.C);
    noStroke();
    circle(this.X+cos(this.P2**2*T),this.Y+sin(this.P1**2*T),this.R+(this.P1+this.P2)*sin(0.05*T));




    if(this.isInRange()==true){
      fill(255);
      if(mouseIsPressed){
        this.C=[200+55*sin(0.2*T),200+55*sin(0.7*T),200+55*sin(0.5*T)];
      }
      else{
        this.C=EMOCIONES[this.E];

      }

      textSize(16);
      stroke(0);
    text(this.T,this.X-textWidth(this.T)/2,this.Y);
  }
  }




}


function isInMem(text){
  let esta = 0;
  if(MEMORIAS.length!=0){
    for(let i =0;i<MEMORIAS.length;i++){
      if(text==MEMORIAS[i].T){
        esta = 1;
        break;


      }
  }

  }

return esta;


}


function isInRange(mem){
  ans = false;
  if(sqrt((mouseX-mem.X)**2+(mouseY-mem.Y)**2) <= 2*mem.R){
    ans=true;
  }
  return ans;



}





function setup(){
  W = windowWidth;
  H = windowHeight;
  img_logo=loadImage("imgs/logoblanco.png");

  nMem = 15+floor(random()*10);
  nCon = 2*nMem;
  createCanvas(W,H);
  let contador=0
  for(let j =0;j<nStars;j++){
    STARS[j]=[W*random(),H*random(),0.3+4*random()];
  }




  while(contador < nMem){
    let exp_opt = EXPERIENCIAS[floor(random()*EXPERIENCIAS.length)];


    if(isInMem(exp_opt[0])==0){

      MEMORIAS[contador]=new memoria(map(contador,0,nMem,150,W-60),map(random(),0,1,60,H-60),exp_opt);
      contador++;
    }
  }
  for(let j =0;j<nCon;j++){
    let iss1= MEMORIAS[floor(random()*MEMORIAS.length)];
    let iss2= MEMORIAS[floor(random()*MEMORIAS.length)];


    CONNECTIONS[j]=[iss1.X,iss1.Y,iss2.X,iss2.Y];
  }


}





function draw(){
  background(0);



  for(let j =0;j<STARS.length;j++){
    strokeWeight(STARS[j][2]+0.4*sin(STARS[j][2]*0.05*T));
    stroke(255);
    point(STARS[j][0],STARS[j][1]);
  }


  for(let i =0;i<CONNECTIONS.length;i++){
    stroke(255);
    strokeWeight(1);
    line(CONNECTIONS[i][0],CONNECTIONS[i][1],CONNECTIONS[i][2],CONNECTIONS[i][3]);
}




  strokeWeight(0.5);


  for(let i =0;i<MEMORIAS.length;i++){
    MEMORIAS[i].paint();
}


for(let i = 0;i<EMO.length;i++){
  let emo = EMO[i];
  fill(EMOCIONES[emo]);
  //console.log(EMOCIONES[emo][0]);
  circle(20,150+22*i,10);
  fill(255);
  text(emo,40,150+22*i);

}





fill(0);
rect(10,10,99,85);
image(img_logo,10,10);

  T++;


}
