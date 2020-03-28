var DICT_R_M = {
  1: 2.5,
  2: 3.5,
  3: 4.5,
  4: 6,
  5: 7,
  11:3,
  12:4,
  13:5
};
var DICT_C_M = {
  "-1": [10,10,10],
  "1": [90, 90, 90],
  "2": [120, 50, 120],
  "3": [0, 40, 200],
  "4": [20, 190, 0],
  "5": [255, 255, 0],
  "11": [0, 180, 255],
  "12": [60, 125, 255],
  "13": [255, 255, 0]
}


var DICT_P_MIN = {
  1: 10**2,
  2: 10**3,
  3: 10**4,
  4: 10**5,
  5: 10**6,
  11: 10**2.5,
  12: 10**4,
  13: 10**5
}

var DICT_MIN_CON = {
  1: 3,
  2: 5,
  3: 8,
  4: 11,
  5: 8,
  11: 3,
  12: 6,
  13: 7};


var DICT_DESC = {
  1: "Camp",
  2: "settlement",
  3: "Town",
  4: "City",
  5: "Metropolis",
  11: "Station",
  12: "Platform",
  13: "Sea Town"
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
  5: [20, 160],
  11: [50, 80],
  12: [50, 100],
  13: [50, 100],
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

    this.ground_level = 0 ;


    this.in_fuel = 0;
    this.in_food = 0;
    this.in_mountain = 0;
    this.in_ocean = 0;
    this.name_change=0;


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
    this.connect--;
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


    this.connect = max(0,this.connect)
    this.T = 1;
    for (var i = 2; i <= 5; i++) {
      if (this.connect >= DICT_MIN_CON[i - 1] & this.population>=0.8*DICT_P_MIN[i-1]) {
        this.T = i;
      }
    }
    if(this.in_ocean==1){
      this.T=11
      for (var i = 12; i <= 13; i++) {
        if (this.connect >= DICT_MIN_CON[i - 1] & this.population>=0.8*DICT_P_MIN[i-1]) {
          this.T = i;
        }
        if(this.name_change==0 & this.T==13){
          this.nombre = gen_nombre(this);
          this.name_change=1;
        }

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

      let realt =  this.T;
      if(this.T>10){realt=this.T-10}


      this.genfood = this.T <= 0 ? 0 : 0.18 * this.in_food * (10 + this.connect + realt * 100 * log(this.population + 1)*log(2+this.give_age()));
      this.genfuel = this.T <= 0 ? 0 : 0.18 * this.in_fuel * (10 + this.connect + realt * 100 * log(this.population + 1)*log(2+this.give_age()));

      if(this.T>0){
        this.maxpop = int(DICT_P_MIN[abs(this.T)]*(1+random(0.4,0.65))*(1.001**this.give_age()))+3**min(this.connect,15);
        let popgrowth = map(abs(realt)*(this.genfuel+this.genfood),0,100000,0.5,1.2);

        let dndt = int(0.35*popgrowth*((this.maxpop-this.population)/(this.maxpop+1))*this.population);
        if(this.T>10){
          dndt = 0.8*dndt
        }
        this.population=max(0,this.population+dndt);
        if(random()<0.01*this.connect){
          this.population++;
        }

      }
      else if(random()>0.1){
        this.population=int(this.population*random());
      }

      // let add_pop = this.T <= 1 ? 0 : max(-0.1*this.population, -this.consumo + 1.5*this.genfood + this.genfuel) + int(this.T *this.connect / 6);
      //
      // let resta = this.genfood+this.genfuel-this.consumo;







      this.consumo = this.T <= 0 ? 0 : 0.05 * log(this.give_age() + 1) * (realt * 70 * log(this.population+1) * (1 + 0.5 * this.in_mountain));
      this.consumo = this.consumo*(1+(log(this.population+1)*0.05))*(1/max(1,this.connect))
      if(this.T>10){
        let m_consumo = map(this.ground_level,0,0.5,1.5,1)
        this.consumo=this.consumo*m_consumo
      }



      this.genfood = int(this.genfood);
      this.genfuel = int(this.genfuel);
      this.consumo = int(this.consumo);
      this.population = floor(this.population);

      this.cost = log((this.genfuel+this.genfood+1)/max(this.consumo,1));
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
      let xo = 685;
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
      text("Pop. : ",xo+105,yo+18);
      text("Range : ",xo+105,yo+33);
      text("Clan : ",xo+210,yo+18);
      text("Rate : ",xo+210,yo+33);


      fill([255,255,255]);

      let tipox="";
      let addx = "";

      if(this.T ==-1){
        tipox = "Ruins"
      if(this.maxlevel>10 & this.maxlevel<13){
        tipox = "Debrye"
      }
      else if(this.maxlevel>=4 & this.maxlevel<10){
        addx = "City "
      }
      else if( this.maxlevel>=13){
        addx = "Sunken "
      }


      }
      else {
        tipox =  DICT_DESC[this.T];
      }

      // let tipox = this.T == -1 ? "Ruins" : DICT_DESC[this.T];
      // tipox = this.T == -1 & this.maxlevel<13 & this.maxlevel>10? "Debrye" : tipox;
      // let addx = this.T==-1 & this.maxlevel>=4 & this.maxlevel<10?"City ":"";
      // addx = this.T==-1 & this.maxlevel>=13?"Underwater ":"";


      text(addx+tipox,xo+35,yo+18);
      text(str(this.give_age()) + " Yrs",xo+35,yo+33);
      text( parse_pop(this.population),xo+150,yo+18);
      text(str(max(this.connect,0))+" - "+DICT_NAME_RANGE[constrain(this.connect,1,20)],xo+150,yo+33);
      text(this.origin_name,xo+245,yo+18);
      text((this.cost).toFixed(2),xo+245,yo+33);






      textSize(16);
      fill(255);
      text(this.nombre["NAME"].toUpperCase(), xo,18);
      //text("Score : "+str(this.score_center()),20,140);

      pop();
    }
    push();


    this.mouseInRange() == 1 ? fill([255, 255, 255]) : fill(this.C);


    stroke(0);
    // this.R = int(map(log(this.population+1),0,20,3,16))/2
    this.R = DICT_R_M[abs(this.T)]
    if(this.T==-1){this.R = this.R-1}
    if(this.in_fuel+this.in_food>0 & this.T>0){stroke(155);}
    strokeWeight(1);
    if(this.T<10){

    if(this.is_origin!=0){
      rect(this.X-this.R,this.Y-this.R,2*this.R,2*this.R)
    }
    else{

    circle(this.X, this.Y, this.R)
    }
  }
    else {
      push();
      translate(this.X,this.Y)
      beginShape();
      if(this.T==13){
        vertex(0, this.R );
        vertex(-this.R, -this.R );
        vertex(this.R, -this.R );
      }
      else{
        vertex(0, -this.R );
        vertex(-this.R, this.R );
        vertex(this.R, this.R );

      }

      endShape(CLOSE);
      pop();
    } //+sin(T*(this.T+1)*0.3));
    pop();
  }


}
