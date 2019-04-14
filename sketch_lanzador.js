new p5();
let W = windowWidth;
let H = windowHeight;
let G = -9.8;
let R = 3;
let CONT = 0;
let XTARGET = floor(random()*W);
let PMUT = 0.05;
let N = 200;
let P = [];
let GEN = [];
let generation = 0;
let dt = 0.007;
let decimal_places = 3;
let PROP = 0.4;
let SIGMA = 10;
let PREC=0.95;

let FOA;
let FOAscore = 0;
let FOAdist = 0;


let standby = 50;
let c_standby = 0;

let PDISPLAY = 0.5;
let DELTAY= 100;






function setup() {
  createCanvas(W, H);
  for (let i = 0; i < N; i++) {

    P[i] = particula_random();
  }
}

class particula {
  constructor(vo, th) {
    this.x = 0;
    this.y = 0;

    this.theta = th;
    this.vo = vo;



    this.final_x = 0;
    this.score = 0;

    this.vx = this.vo * cos(this.theta);
    this.vy = this.vo * sin(this.theta);


    //console.log(this.vy);
    this.t = 0;
    this.finishedC = 255;
    this.on_air = true;

    this.pdisplay = false;
    if (random() < PDISPLAY) {
      this.pdisplay = true;
    }

  }

  reset() {
    this.on_air = true;
    this.x = 0;
    this.y = 0;
    this.calcularV();
    this.final_x = 0;
    this.score = 0;
    this.t = 0;
    this.finishedC = 255;
    this.deltaY=random()*DELTAY;
  }

  rate(x_target) {
    let d = abs(x_target - this.final_x);
    let sigma = SIGMA;
    let rating = exp(-pow(d, 2) / (2 * pow(sigma, 2)));
    this.finishedC = [255 * (1 - rating * 30), 255 * rating * 30, 0];
    this.score = rating;
    return rating;

  }

  calcularV() {
    this.vx = this.vo * cos(this.theta);
    this.vy = this.vo * sin(this.theta);

  }

  get() {

    return [this.vo, this.theta]
  }

  definir(valores) {
    let VO = valores[0];
    let TH = valores[1];

    this.vo = VO;
    this.theta = TH;
    this.calcularV();

  }



  update() {
    this.t += dt;


    this.y += this.vy * this.t + 0.5 * G * this.t * this.t;
    this.vy += G * this.t;
    this.x += this.vx * this.t;
    fill(0);
    textSize(11);
    //    if(this.x<0 | this.x>W){
    //    this.vx=-this.vx;
    //    }
    if (this.y < 0) {
      this.y = 0;
      this.vx = 0;
      this.on_air = false;
      this.final_x = this.x;
      CONT += 1;



      let score = this.rate(XTARGET).toFixed(2);
      let grad = score * H * 0.4;



      if (this.pdisplay) {

        noStroke();
        text(this.x.toFixed(decimal_places - 1) + " m", this.x, H - 10 - grad-this.deltaY);
        fill(255 * (1 - score), 255 * score, 0);

        text(score, this.x, H - 20 - grad-this.deltaY);
        stroke(255 * (1 - score), 255 * score, 0);
        line(this.x, H - this.y - 10, this.x, H - grad-this.deltaY);

      }

    } else {

      fill(10, 255, 0);
      if (this.vy < 0) {
        fill(255, 0, 0);
      }
      noStroke();
      text(this.vy.toFixed(decimal_places - 1) + " m/s", this.x, H - this.y - 5);
    }

  }

  paint() {
    fill(255);
    if (this.on_air == false) {
      fill(this.finishedC);

    }
    stroke(0);
    circle(this.x, H - this.y, R);
  }

}



function particula_random() {
  return new particula(random() * W/12, random() * PI / 2);
}

function resetP(P) {
  for (let i = 0; i < P.length; i++) {
    P[i].reset();
  }

}


function hijos(P1, P2) {
  let n_th = (P1.theta + P2.theta) / 2;
  let v;
  if (min(P1.vo, P2.vo) / max(P1.vo, P2.vo) < 0.8) {
    v = min(P1.vo, P2.vo);
  } else {
    v = (P1.vo + P2.vo) / 2;
  }
  let p = new particula(v, n_th);
  if (random() < PMUT) {
    g = p.get();
    g[0] += randomGaussian(-10, 10);
    //g[1]+=random(0.1)*g[1];

    p.definir(g);
  }
  return p;

}


function check(A) {
  let oa = false;
  for (let i = 0; i < A.length; i++) {
    if (A[i].on_air == true) {
      oa = true;
    }
  }
  return oa;

}

function compare(P1, P2) {

  if (P1.rate(XTARGET) < P2.rate(XTARGET)) {

    return 1;
  }
  if (P1.rate(XTARGET) > P2.rate(XTARGET)) {

    return -1;
  }
  return 0;

}

function armar_pareja(P) {
  var P1 = int(random(0, P.length / 2));
  var P2 = int(random(P.length / 2, P.length));



  return hijos(P[P1], P[P2]);

}


function breed(P, prop) {
  let pnew = [];
  let mid = int(P.length * prop)
  P.sort(compare);
  let best = P.slice(0, mid);
  if (best[0].score > FOAscore) {
    FOA = best[0];
    FOAscore = FOA.score;
    FOAdist = FOA.final_x;
    //FOA.pdisplay=true;
  }
  for (let i = 0; i < P.length; i++) {
    if (i >= mid) {
      pnew[i] = armar_pareja(best);
    } else {
      pnew[i] = best[i];
    }

  }
  if (FOAscore > 0) {
    let addition = new particula(0, 0);
    addition.definir(FOA.get());
    addition.final_x = FOA.final_x;

    //pnew[mid-1]=addition;
  }
  return pnew;

}

function mean_score(P) {
  let suma = 0;
  for (let i = 0; i < P.length; i++) {
    suma += P[i].score;
  }
  return suma / P.length;

}


function mean_distance(P) {
  let suma = 0;
  for (let i = 0; i < P.length; i++) {
    suma += P[i].final_x;
  }

  let RR = suma / P.length;


  return RR;
}



function marcador_sup(x, lev, texto1, texto2, colores) {
  fill(colores);
  noStroke();
  let delta = 50;
  textSize(11);
  text(texto1, x - 25, H / 2 - 35 - 20 * lev - delta);
  text(texto2, x - 25, H / 2 - 45 - 20 * lev - delta);
  triangle(x - 5, H / 2 - 30 - delta, x + 5, H / 2 - 30 - delta, x, H / 2 - 20 - delta);


}

function mean_att(P){

  let sumaV = 0;
  let sumaT = 0;
  for (let i = 0; i < P.length; i++) {
    sumaV += P[i].vo;
    sumaT += P[i].theta;
  }
  let RV = sumaV / P.length;
  let RT = sumaT / P.length;


  return [RV,RT];
}









function draw() {
  CONT = 0;
  background(220);

  textSize(14);
  noStroke();
  fill(0);
  text("x objetivo =  " + XTARGET + " m", 0, 40);

  for (let i = 0; i < P.length; i++) {
    P[i].update();
    P[i].paint();
  }
  if (check(P) == false) {
    c_standby += 1;
  } else {
    c_standby = 0;
  }
  if (check(P) == false & c_standby == standby) {
    let promedioD = mean_distance(P);
    let promedioS = mean_score(P);
    GEN[generation] = [promedioD, promedioS];
    generation += 1;

    if (promedioS > PREC) {

      noLoop();
    } else {
      let nP = breed(P, PROP);
      resetP(P);
      P = nP;
    }




    //for (let i = 0; i<N;i++){
    //P[i]=particula_random();
    //}



  }
  if (GEN.length > 0) {
    let d = GEN[GEN.length - 1][0];
    let s = GEN[GEN.length - 1][1];
    textSize(18);
    fill(0);
    noStroke();
    text("GENERACION " + generation, 0, 20);
    textSize(14);
    fill(0);
    noStroke();
    text("Score promedio = " + s.toFixed(decimal_places), 0, 80);

    text("Score 'Fittest of all' = " + FOAscore.toFixed(decimal_places), 0, 100);
    text( N+" lanzamientos por generacion", 0, 60);

    textSize(10);
    text("Vo promedio = "+mean_att(P)[0].toFixed(decimal_places)+" m/s",0,115);
    text("Theta promedio = "+(mean_att(P)[1]*180/PI).toFixed(decimal_places-1)+" °",0,130);



    marcador_sup(d, 0, d.toFixed(decimal_places) + " m", "promedio", [0, 0, 255]);
    marcador_sup(FOAdist, 1, FOAdist.toFixed(decimal_places-1) + " m", "FOA", [255, 0, 0]);

  }


}
