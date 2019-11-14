
var DICT_CM = {
  1:[200,0,0],
  2:[220,120,0],
  3:[0,150,150]};
class mina{

  constructor(x,y,t){
    this.X=x;
    this.Y=y;
    this.T=t;
    this.S=0;

    this.evaluar_tipo();

  }
  select(){
    this.S=1;
  }
  deselect(){
    this.S=0;
  }



  evaluar_tipo(){
    this.C = DICT_C[this.T];
  }
  mouseInRange(){
    return dist(mouseX,mouseY,this.X,this.Y)<=12?1:0;
  }
  mouseClicked(){
    console.log("cc");
    if(this.mouseInRange()==1){
      if(this.S=0){
        this.S=1;
      }
      else{
        this.S=0;
      }
    }
  }


  mouseInMin(){
    return dist(mouseX,mouseY,this.X,this.Y)<=35?1:0;
  }

  pintar(){
    push();
    angleMode(DEGREES);
    this.mouseInRange()==1?fill(255):fill(this.C);
    stroke(100);
    beginShape();
    var r  = 8+sin(frameCount/100);
vertex(8*cos(30)+this.X, 8*sin(30)+this.Y);
vertex(8*cos(150)+this.X, 8*sin(150)+this.Y);
vertex(8*cos(270)+this.X, 8*sin(270)+this.Y);

  endShape(CLOSE);
    pop();
    if(this.S=1){
    push();
    noFill();
    stroke([255,0,0]);
    circle(this.X,this.Y,8);
    pop();
  }
  }


}
