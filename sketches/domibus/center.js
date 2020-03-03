var DICT_R_M = {
  1: 2.5,
  2: 3.5,
  3: 4.5,
  4: 6,
  5: 7
};
var DICT_C_M = {
  "-1": [10,10,10],
  "1": [90, 90, 90],
  "2": [120, 50, 120],
  "3": [0, 40, 200],
  "4": [20, 190, 0],
  "5": [255, 255, 0]
}


var DICT_P_MIN = {
  1: 10**2,
  2: 10**3,
  3: 10**4,
  4: 10**5,
  5: 10**6
}

var DICT_MIN_CON = {
  1: 3,
  2: 5,
  3: 7,
  4: 11,
  5: 8
};


var DICT_DESC = {
  1: "Camp",
  2: "settlement",
  3: "Town",
  4: "City",
  5: "Metrópolis"
};


var DICT_NAME_RANGE = {
  0:"נול",
  1:"צוויי",
  2:"צוויי",
  3:"דריי",
  4:"דריי",
  5:"דריי",
  6:"פיר",
  7:"פיר",
  8:"פיר",
  9:"פינף",
  10:"פינף",
  11:"פינף",
  12:"זעקס",
  13:"זעקס",
  14:"זעקס",
  15:"זעקס",
  16:"זעקס",
  17:"זיבן",
  18:"זיבן",
  19:"זיבן",
  20:"אַכט"


}

var DICT_R_MINMAX = {
  1: [15, 40],
  2: [15, 60],
  3: [15, 80],
  4: [15, 120],
  5: [20, 160]
};

class centro {

  constructor(x, y, t) {
    this.X = x;
    this.Y = y;
    this.T = t;
    this.connect = 0;
    this.pop = 2+int(random(100));
    this.prov = 0;
    this.mis_canales = [];
    this.born = T;
    this.is_origin = 0;
    this.origin_name = "";


    this.in_fuel = 0;
    this.in_food = 0;
    this.in_mountain = 0;

    this.cost = 0;

    this.maxpop = DICT_P_MIN[1];
    this.maxlevel = 0;

    this.consumo = 0;
    this.genfuel = 0;
    this.genfood = 0;
    this.population = 1+floor(random(20));

    this.evaluar_tipo();

  }
  conectar() {
    this.connect++;
    if (random() < 0.2) {
      this.connect++;
    }


  }
  desconectar() {
    this.connect=this.connect--;
    this.population = int(this.population * 0.4*(1+random()));
    this.evaluar_tipo();

  }
  give_age() {
    let age = T - this.born;
    return floor(age + 1);
  }

  score_center() {
    return log(this.population + 1)+this.connect+2*log(this.give_age());
  }

  give_high_canal(ARR) {
    let maxt = 1;
    let ans = 0;
    for (var i = ARR.length - 1; i >= 0; i--) {
      if (ARR[i].T > maxt) {
        ans = ARR[i];
      }
    }
    return ans;


  }


  give_closest(ARR) {
    let closest = 1000;
    let closest_elem = 0;
    for (var i = 0; i < ARR.length; i++) {
      if (ARR[i] != this & dist(this.X, this.Y, ARR[i].X, ARR[i].Y) <= closest & ARR[i].T > 0) {
        closest = dist(this.X, this.Y, ARR[i].X, ARR[i].Y);
        closest_elem = ARR[i];
      }
    }
    return closest_elem;
  }


  give_closest_all(ARR) {
    let closest = 1000;
    let closest_elem = 0;
    for (var i = 0; i < ARR.length; i++) {
      if (ARR[i] != this & dist(this.X, this.Y, ARR[i].X, ARR[i].Y) <= closest) {
        closest = dist(this.X, this.Y, ARR[i].X, ARR[i].Y);
        closest_elem = ARR[i];
      }
    }
    return closest_elem;
  }


  give_in_range(ARR) {
    let ir = [];
    for (var i = 0; i < ARR.length; i++) {
      let dd = dist(this.X, this.Y, ARR[i].X, ARR[i].Y);
      if (ARR[i] != this & dd >= ARR[i].mindist & dd <= ARR[i].maxdist) {
        ir.push(ARR[i]);
      }
    }
    return ir;
  }

  give_high_in_range(ARR) {
    let inr = this.give_in_range(ARR);
    let ans = [];
    for (let i = 0; i < inr.length; i++) {
      if (ARR[i].T >= 2) {
        ans.push(ARR[i]);
      }
    }
    return ans

  }


  asignar_valores_mapa(m) {
    this.in_fuel = m.M_petro[this.X][this.Y];
    this.in_food = m.M_food[this.X][this.Y];
    this.in_mountain = m.M_tipos[this.X][this.Y] == 2 ? 1 : 0;


    this.evaluar_tipo();
  }



  evaluar_tipo() {



    this.T = 1;







    for (var i = 2; i <= 5; i++) {
      if (this.connect >= DICT_MIN_CON[i - 1] & this.population>=0.8*DICT_P_MIN[i-1]) {
        this.T = i;
      }
    }
    if (this.connect < 0 | this.population==0) {
      this.T = -1
    };


    if(this.T>this.maxlevel){this.maxlevel=this.T;}


    this.R = this.T == -1 ? 0.5 * DICT_R_M[abs(this.T)] : DICT_R_M[this.T];

    this.min_R = 5 * this.R;
    this.C = DICT_C_M[str(abs(this.T))];
    let dists = DICT_R_MINMAX[abs(this.T)];
    if (this.T == -1) {
      dists = [5, 1000];
      this.C = [0, 0, 0]
    }
    this.maxdist = dists[1];
    this.mindist = dists[0];

    // this.maxdist= 50+4*(this.T**2);
    // this.mindist= 12+2*(this.T);
  }

  evolve() {
    //if(this.T<0 & this.population>100 & random()<0.005){this.population = this.population*random();}
    if (mult != 0) {
      this.genfood = this.T <= 0 ? 0 : 0.1 * this.in_food * (10 + this.connect + this.T * 100 * log(this.population + 1));
      this.genfuel = this.T <= 0 ? 0 : 0.1 * this.in_fuel * (10 + this.connect + this.T * 100 * log(this.population + 1));

      if(this.T>0){
        this.maxpop = int(DICT_P_MIN[abs(this.T)]*(1+random())*(1.001**this.give_age()));
        let popgrowth = map(abs(this.T)*(this.genfuel+this.genfood),0,100000,0.5,1.5);

        let dndt = popgrowth*((this.maxpop-this.population)/(this.maxpop+1))*this.population;

        this.population=max(0,this.population+dndt);
        if(this.connect>=3 & random()<0.01){
          this.population++;
        }

      }
      else if(random()>0.1){
        this.population=int(this.population*random());
      }

      // let add_pop = this.T <= 1 ? 0 : max(-0.1*this.population, -this.consumo + 1.5*this.genfood + this.genfuel) + int(this.T *this.connect / 6);
      //
      // let resta = this.genfood+this.genfuel-this.consumo;







      this.consumo = this.T <= 0 ? 0 : 0.012 * log(this.give_age() + 1) * (this.T * 60 * log(this.population+1) * (1 + 0.5 * this.in_mountain));
      this.consumo = this.consumo*(1+(log(this.population+1)*0.05))*(1/max(1,this.connect))


      this.cost = this.in_food * 300 + this.infuel * 1000 + this.in_mountain * 800;

      this.genfood = int(this.genfood);
      this.genfuel = int(this.genfuel);
      this.consumo = int(this.consumo);
      this.population = floor(this.population);
    }
  }




  mouseInRange() {
    return dist(mouseX, mouseY, this.X, this.Y) <= 2 * this.R ? 1 : 0;
  }
  mouseInMin() {
    return dist(mouseX, mouseY, this.X, this.Y) <= this.mindist ? 1 : 0;
  }
  pintar(T) {
    if(T%5==0){
    this.evolve();}
    if (this.mouseInRange() == 1) {
      push();
      noStroke();
      fill([255,80,80]);

      textSize(12);
      //textSize(15);
      let xo = 670;
      let yo = 18;



      // text("Potential : " + str(max(this.connect, 0)), xo, yo);
      // let tipox = this.T == -1 ? "Ruins" : DICT_DESC[this.T];
      //text("Type : " + tipox, xo, yo + 20);
      // text("Age : " + str(this.give_age()) + " years", xo, yo + 40);
      // text("Consume rate: " + str(this.consumo) + " pts", xo, yo + 60);
      // text("Fuel production rate: " + str(this.genfuel) + " pts", xo, yo + 80);
      // text("Food production rate: " + str(this.genfood) + " pts", xo, yo + 100);
      // text("Population: " + str(this.population) + " ciudadanos", xo, yo + 120);
      //
      //
      text("Type : ",xo,yo+18);
      text("Age : ",xo,yo+33);
      text("Pop. : ",xo+95,yo+18);
      text("Range : ",xo+95,yo+33);
      text("Clan : ",xo+210,yo+18);


      fill([255,255,255]);

      let tipox = this.T == -1 ? "Ruins" : DICT_DESC[this.T];

      let addx = this.T==-1 & this.maxlevel>=4?"City ":"";


      text(addx+tipox,xo+35,yo+18);
      text(str(this.give_age()) + " Yrs",xo+35,yo+33);
      text( parse_pop(this.population),xo+140,yo+18);
      text(str(max(this.connect,0))+" - "+DICT_NAME_RANGE[constrain(this.connect,1,20)],xo+140,yo+33);
      text(this.origin_name,xo+245,yo+18);






      textSize(16);
      fill(255);
      text(this.nombre["NAME"].toUpperCase(), xo,18);
      //text("Score : "+str(this.score_center()),20,140);

      pop();
    }
    push();


    this.mouseInRange() == 1 ? fill([255, 255, 255]) : fill(this.C);

    stroke(0);
    strokeWeight(1);
    circle(this.X, this.Y, this.R); //+sin(T*(this.T+1)*0.3));
    pop();
  }


}
