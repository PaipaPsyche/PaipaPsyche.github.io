var DICT_R = {1:2,2:3,3:4};
var DICT_C = {
  1:[200,0,0],
  2:[120,220,0],
  3:[0,50,100]};
class canal{

  constructor(el1,el2,t){
    this.X1=el1.X;
    this.Y1=el1.Y;
    this.X2=el2.X;
    this.Y2=el2.Y;
    this.T=t;


    this.evaluar_tipo();

  }
  evaluar_tipo(){
    this.R = DICT_R[this.T];

    this.C = DICT_C[this.T];
  }

  pintar(){
    push();

    stroke(this.C);
    strokeWeight(this.R);
    line(this.X1,this.Y1,this.X2,this.Y2);
    pop();
  }


}
