
var DICT_CM = {
  11:[200,0,0],
  12:[220,120,0],
  13:[0,150,150]};
var DICT_RM = {
    11:3,
    12:4,
    13:5};


var DICT_RM_MINMAX = {
    11:[15,60],
    12:[15,65],
    13:[25,80]};



class mina{

  constructor(x,y){
    this.X=x;
    this.Y=y;
    this.T=11;



    this.evaluar_tipo();

  }



  evaluar_tipo(){
    this.C = DICT_CM[this.T];
    this.R = DICT_RM[this.T];
  }
  mouseInRange(){
    return dist(mouseX,mouseY,this.X,this.Y)<=this.R*1.1?1:0;
  }


  mouseInMin(){
    return dist(mouseX,mouseY,this.X,this.Y)<=35?1:0;
  }

  pintar(){
    push();
    translate(this.X,this.Y)
    beginShape();
    vertex(0, -this.R * 2);
    vertex(-this.R, this.R * 2);
    vertex(this.R, this.R * 2);
    endShape(CLOSE);
    pop();
  }


}
