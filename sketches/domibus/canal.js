var DICT_R_C = {
  0: 0.2,
  1: 1,
  2: 1.5,
  3: 2,
  11:1,
  12:1.5,
  13:2
};
var DICT_C_C = {
  0: [0, 0, 0, 180],
  1: [200, 0, 0],
  3: [200, 5, 0],
  2: [220, 0, 1],
  11:[50,100,200],
  12:[50,10,200],
  13:[50,50,200],
};
class canal {

  constructor(el1, el2, t) {
    this.EL1 = el1;
    this.EL2 = el2;
    this.X1 = el1.X;
    this.Y1 = el1.Y;
    this.X2 = el2.X;
    this.Y2 = el2.Y;
    this.ph1 = random(-7,7);
    this.ph2 = random(-7,7);





    this.evaluar_tipo();

  }
  evaluar_tipo() {
    let prev_T = this.T;
    let el1 = this.EL1;
    let el2 = this.EL2;
    if ((el1.T + el2.T) <= 3) {
      this.T = 1;
    } else if ((el1.T + el2.T) < 5) {
      this.T = 2;

    } else if((el1.T + el2.T) < 11)  {
      this.T = 3;


  } else if((el1.T + el2.T) < 21)  {
    this.T = 11;

  }
  else if((el1.T + el2.T) < 24)  {
    this.T = 12;

  }
  else{
    this.T=13;
  }

    if ((el1.T == -1 | el2.T == -1) & (el1.T+el2.T<11)) {
      this.T = 1;
    }
    if ((el1.T == -1 | el2.T == -1) & (el1.T+el2.T>=10)) {
      this.T = 11;
    }

    if (el1.T == -1 & el2.T == -1) {
      this.T = 0;
    }

    if (this.T > prev_T & random() > 0.65) {
      this.EL1.conectar();
      this.EL2.conectar();
    }

    this.EL1.evaluar_tipo();
    this.EL2.evaluar_tipo();



    this.R = DICT_R_C[this.T];

    this.C = DICT_C_C[this.T];
  }

  pintar() {
    this.evaluar_tipo();
    push();

    stroke(this.C);
    strokeWeight(this.R);
    noFill();
    //line(this.X1, this.Y1, this.X2, this.Y2);

    if(this.T<10){

    let set_els=[this.EL1,this.EL2];
    let election = random()>0.5?0:1;




    let ee1 = set_els[election];
    let ee2 = set_els[1-election];



    let promx = floor((ee1.X+ee2.X)/2)+this.ph1;
    let promy = floor((ee1.Y+ee2.Y)/2)+this.ph2;

    bezier(ee1.X, ee1.Y,ee1.X, promy,promx, ee1.Y,promx, promy);
    bezier(promx, promy,promx, ee2.Y,ee2.X, promy,ee2.X, ee2.Y);
    }
    else{
      line(this.EL1.X,this.EL1.Y,this.EL2.X,this.EL2.Y)
    }


    pop();
  }


}
