var DICT_R_M = {1:3,2:5,3:7,4:9,5:12};
var DICT_C_M = {
  1:[200,0,0],
  2:[220,120,0],
  3:[0,150,0],
  4:[0,150,200],
  5:[200,0,200]};

var DICT_MIN_CON = {
  1:2,
  2:3,
  3:4,
  4:5,
  5:8
};

class centro{

  constructor(x,y,t){
    this.X=x;
    this.Y=y;
    this.T=t;
    this.connect=0;
    this.mis_canales=[];

    this.evaluar_tipo();

  }
  conectar(){
    this.connect++;
    if(this.T==1 & this.connect==DICT_MIN_CON[this.T]){
      this.T=2;
      this.evaluar_tipo();
    }
    else if(this.T==2 & this.connect==DICT_MIN_CON[this.T]){
      this.T=3;
      this.evaluar_tipo();
    }
    else if(this.T==3 & this.connect==DICT_MIN_CON[this.T]){
      this.T=4;
      this.evaluar_tipo();
    }
    else if(this.T==4 & this.connect==DICT_MIN_CON[this.T]){
      this.T=5;
      this.evaluar_tipo();
    }

  }
  desconectar(){
    this.connect--;
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
      if(ARR[i]!=this & dist(this.X,this.Y,ARR[i].X,ARR[i].Y)<=closest ){
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
      if(ARR[i].T>=4){
        ans.push(ARR[i]);
      }
    }
    return ans

  }






  evaluar_tipo(){
    this.R = DICT_R_M[this.T];
    this.min_R = 5*this.R;
    this.C = DICT_C_M[this.T];
    this.maxdist= 50+4*(this.T**2);
    this.mindist= 20+2*(this.T);
  }
  mouseInRange(){
    return dist(mouseX,mouseY,this.X,this.Y)<=2*this.R?1:0;
  }
  mouseInMin(){
    return dist(mouseX,mouseY,this.X,this.Y)<=this.mindist?1:0;
  }
  pintar(T){
    push();

    this.mouseInRange()==1?fill([255,255,255]):fill(this.C);

    stroke(100);
    circle(this.X,this.Y,this.R+sin(T+this.T));
    pop();
  }


}
