var DICT_R = {1:3,2:6,3:10,4:14,5:18};
var DICT_C = {
  1:[200,0,0],
  2:[220,120,0],
  3:[0,150,0],
  4:[0,150,200],
  5:[200,0,200]};
class centro{

  constructor(x,y,t){
    this.X=x;
    this.Y=y;
    this.T=t;

    this.evaluar_tipo();

  }
  evaluar_tipo(){
    this.R = DICT_R[this.T];
    this.min_R = 5*this.R;
    this.C = DICT_C[this.T];
  }
  mouseInRange(){
    return dist(mouseX,mouseY,this.X,this.Y)<=2*this.R?1:0;
  }
  mouseInMin(){
    return dist(mouseX,mouseY,this.X,this.Y)<=5*this.R?1:0;
  }
  pintar(){
    push();

    this.mouseInRange()==1?fill(255):fill(this.C);

    stroke(100);
    circle(this.X,this.Y,this.R+sin(T));
    pop();
  }


}
