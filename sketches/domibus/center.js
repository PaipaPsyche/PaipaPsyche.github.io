var DICT_R_M = {1:3,2:5,3:7,4:9,5:11};
var DICT_C_M = {
  1:[200,0,0],
  2:[220,120,0],
  3:[0,250,0],
  4:[0,150,200],
  5:[200,0,200]}

var DICT_MIN_CON = {
  1:3,
  2:5,
  3:7 ,
  4:10,
  5:8
};


var DICT_DESC = {
  1:"Station",
  2:"Base",
  3:"Town",
  4:"City",
  5:"Metrópolis"
};

var DICT_R_MINMAX = {
  1:[20,50],
  2:[20,60],
  3:[20,80],
  4:[20,120],
  5:[25,160]};

class centro{

  constructor(x,y,t){
    this.X=x;
    this.Y=y;
    this.T=t;
    this.connect=0;
    this.mis_canales=[];
    this.born=frameCount;

    this.evaluar_tipo();

  }
  conectar(){
    this.connect++;
    if(random()<0.2){this.connect++;}


  }
  desconectar(){
    this.connect--;
    this.evaluar_tipo();
  }
  give_age(){
    return frameCount-this.born;
  }

  score_center(){
    return this.give_age()+100*this.connect;
  }

  give_high_canal(ARR){
    let maxt = 1;
    let ans = 0;
    for(var  i =ARR.length-1;i>=0;i--){
      if(ARR[i].T>maxt){
        ans=ARR[i];
      }
    }
    return ans;


  }


  give_closest(ARR){
    let closest = 1000;
    let closest_elem=0;
    for(var i =0;i<ARR.length;i++){
      if(ARR[i]!=this & dist(this.X,this.Y,ARR[i].X,ARR[i].Y)<=closest & ARR[i].T>0){
          closest = dist(this.X,this.Y,ARR[i].X,ARR[i].Y);
          closest_elem=ARR[i];
      }
    }
    return closest_elem;
  }


  give_in_range(ARR){
    let ir = [];
    for(var i =0;i<ARR.length;i++){
      let dd  = dist(this.X,this.Y,ARR[i].X,ARR[i].Y);
      if(ARR[i]!=this & dd>=ARR[i].mindist & dd<=ARR[i].maxdist){
          ir.push(ARR[i]);
      }
    }
    return ir;
  }

  give_high_in_range(ARR){
    let inr=this.give_in_range(ARR);
    let ans=[];
    for(let i =0;i<inr.length;i++){
      if(ARR[i].T>=2){
        ans.push(ARR[i]);
      }
    }
    return ans

  }






  evaluar_tipo(){


    this.T=1;

    for(var i=2;i<=5;i++){
      if(this.connect>=DICT_MIN_CON[i-1]){
        this.T=i;
      }
    }
    if(this.connect<0){this.T=-1};


    this.R = DICT_R_M[abs(this.T)];
    this.min_R = 5*this.R;
    this.C = DICT_C_M[abs(this.T)];
    let dists = DICT_R_MINMAX[abs(this.T)];
    if(this.T==-1){dists=[0,1000];this.C=[0,0,0]}
    this.maxdist= dists[1];
    this.mindist= dists[0];

    // this.maxdist= 50+4*(this.T**2);
    // this.mindist= 12+2*(this.T);
   }
  mouseInRange(){
    return dist(mouseX,mouseY,this.X,this.Y)<=2*this.R?1:0;
  }
  mouseInMin(){
    return dist(mouseX,mouseY,this.X,this.Y)<=this.mindist?1:0;
  }
  pintar(T){

    if(this.mouseInRange()==1){
      push();
      noStroke();
      fill(0);
      textSize(15);
      text("Potential : "+str(max(this.connect,0)),20,80);
      let tipox=this.T==-1?"Ruins":DICT_DESC[this.T];
      text("Type : "+tipox,20,100);
      text("Age : "+str(this.give_age())+" years",20,120);
      text("Score : "+str(this.score_center()),20,140);
      pop();
    }
    push();


    this.mouseInRange()==1?fill([255,255,255]):fill(this.C);

    stroke(100);
    circle(this.X,this.Y,this.R+sin(T*(this.T+1)*0.3));
    pop();
  }


}
