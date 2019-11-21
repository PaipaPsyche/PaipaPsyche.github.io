var DICT_R_C = {1:2,2:3,3:4};
var DICT_C_C = {
  1:[200,0,0],
  2:[120,220,0],
  3:[0,50,100]};
class canal{

  constructor(el1,el2,t){
    this.EL1=el1;
    this.EL2=el2;
    this.X1=el1.X;
    this.Y1=el1.Y;
    this.X2=el2.X;
    this.Y2=el2.Y;






    this.evaluar_tipo();

  }
  evaluar_tipo(){
    let prev_T=this.T;
    let el1=this.EL1;
    let el2=this.EL2;
    if(el1.T<=2 & el2.T<=2){
      this.T=1;
    }
    else if(el1.T +el2.T<=6){
      this.T=2;

    }
    else{
      this.T = 3;

    }
    if(this.T>prev_T & random()>0.8){this.EL1.conectar();this.EL2.conectar();}

    if(this.EL2.T<5){this.EL1.evaluar_tipo();}
    if(this.EL1.T<5){this.EL2.evaluar_tipo();}



    this.R = DICT_R_C[this.T];

    this.C = DICT_C_C[this.T];
  }

  pintar(){
    this.evaluar_tipo();
    push();

    stroke(this.C);
    strokeWeight(this.R);
    line(this.X1,this.Y1,this.X2,this.Y2);
    pop();
  }


}
