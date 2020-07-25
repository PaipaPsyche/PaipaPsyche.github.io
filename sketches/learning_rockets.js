

let atts = {
  target:{
    x:1000,
    y:300,
    radius:30
  },
  origin:{
    x:100,
    y:250
  },
  rocket:{
    n_genes:10,
    radius:10,
    max_vel:8,
    max_hop:5

  },
  plot:{
    r_plot:10
  },
  paint:{
    path_mean:true,
    path_best:true,
    path_worst:true
  },
  adaptative:{
    active:true,
    limits:[0.025,0.075,0.15,0.2,0.3,0.5,0.6,0.7,1],
    values:[0.05,0.02,0.01,0.005,0.001,0.0005,0.0002,0.0001,0],
    max_hist:50,
    likelihood:{
      active:true,
      min_gen:10,
      altered:"",
      stdev:50,
      min_scaler:1.5,
      max_scaler:0.5,
      min_cond:[0.8,0.4,0],
      max_cond:[0.9,0.6,0.4]
    }
  },
  borders:{
    left:true,
    right:false,
    up:true,
    down:true
  },
  w:1100, //GENERAL ATTS
  h:600,
  g:0,
  n_rocket:500,
  framerate:60,
  n_seconds_hop:0.5, //SIM ATTS
  maxtime:7,
  p_mut:0.01,
  likelihood_norm:140,
  method: "crazy",
  frames_stop:30,
  max_score:1000,
  penal:0.05

}

let fitness_hist = [];
let rockets = [];
let obstacles = [];
let gen=1;
let best = null;
let boa = null;
let worst = null;

let stop = 0;
let statistics = null;


function setup(){
  createCanvas(atts.w,atts.h);
  frameRate(atts.framerate);





  set_scenario(3);

  for(var i=0;i<atts.n_rocket;i++){
    rockets[i] = new rocket(atts.origin.x,atts.origin.y);
  }
}


function reset(){
  fitness_hist = [];
  obstacles = [];
  gen=1;
  best = null;
  boa = null;
  worst = null;
  stop = 0;
  statistics = null;

  make_new_rockets();

}

function make_new_rockets(){
  rockets = [];
  for(var i=0;i<atts.n_rocket;i++){
    rockets[i] = new rocket(atts.origin.x,atts.origin.y);
  }
}


function defuse_adaptative(){
  atts.adaptative.active = false;
  this.p_mut = 0.05;
}

function set_scenario(n){
  obstacles=[];

  if(n==0){
    atts.target.x = 1050;
    atts.target.y = 300;
    atts.origin.x = 100;
    atts.origin.y = 300;
  }
  if(n==1){
    atts.target.x = 1050;
    atts.target.y = 500;
    atts.origin.x = 100;
    atts.origin.y = 400;


    obstacles.push(new obstacle(450,200,{shape:"square",h:100,w:50}))
    obstacles.push(new obstacle(600,50,{shape:"circle",r:150}))
    obstacles.push(new obstacle(350,440,{shape:"square",h:50,w:50}))
    obstacles.push(new obstacle(600,350,{shape:"square",h:120,w:50}))
    obstacles.push(new obstacle(850,250,{shape:"circle",r:150}))
    obstacles.push(new obstacle(1050,150,{shape:"square",h:50,w:150}))
    obstacles.push(new obstacle(800,500,{shape:"square",h:200,w:50}))
  }
  if(n==2){
    atts.target.x = 900;
    atts.target.y = 300;
    atts.origin.x = 250;
    atts.origin.y = 300;
    obstacles.push(new obstacle(600,300,{shape:"circle",r:420}))
  }
  if(n==3){
    atts.target.x = 1070;
    atts.target.y = 250;//se queda asi
    atts.origin.x = 100;
    atts.origin.y = 450;
    obstacles.push(new obstacle(400,atts.origin.y,{shape:"square",h:400,w:50}))
    obstacles.push(new obstacle(750,atts.origin.y-300,{shape:"square",h:400,w:50}))
    //obstacles.push(new obstacle(1050,atts.origin.y+80,{shape:"square",h:50,w:160}))
  }
  if(n==4){
    atts.target.x = 1000;
    atts.target.y = 300;
    atts.origin.x = 100;
    atts.origin.y = 300;
    obstacles.push(new obstacle(600,0,{shape:"circle",r:500}))
    obstacles.push(new obstacle(600,atts.h,{shape:"circle",r:500}))
    obstacles.push(new obstacle(850,atts.origin.y,{shape:"square",h:100,w:100}))
  }
}



function keyPressed(){
  if(key == "o"){
    atts.origin.x = mouseX;
    atts.origin.y = mouseY;
  }
  if(key == "r"){
    reset();
  }
  if(key == "t"){
    atts.target.x = mouseX;
    atts.target.y = mouseY;
  }
  if((["0","1","2","3","4"]).includes(key)){
    set_scenario(int(key))
  }
}
class obstacle{
  constructor(x,y,params){
    this.x = x;
    this.y = y;
    this.params = params;
    this.shape = params.shape;
  }
  in_range(rckt){
    if(this.shape=="square"){
    let borde_aba = this.y+this.params.h/2+atts.rocket.radius/2;
    let borde_arr = this.y-this.params.h/2-atts.rocket.radius/2;
    let borde_izq = this.x-this.params.w/2-atts.rocket.radius/2;
    let borde_der = this.x+this.params.w/2+atts.rocket.radius/2;

    if(rckt.pos.x >= borde_izq && rckt.pos.x <= borde_der && rckt.pos.y >= borde_arr && rckt.pos.y <= borde_aba){
      rckt.choque=1;
    }

    }else if(this.shape=="circle"){
      let dst = dist(this.x,this.y,rckt.pos.x,rckt.pos.y)
      if(dst <= (atts.rocket.radius/2+this.params.r/2)){
        rckt.choque=1;
      }
    }
  }



  paint(){
    push()
    fill(80);
    stroke(120);
    translate(this.x,this.y);
    if(this.shape=="square"){
      rectMode(CENTER,CENTER);
      rect(0,0,this.params.w,this.params.h);
    }else if(this.shape=="circle"){
      circle(0,0,this.params.r);
    }
    pop()
  }
}




class rocket{
  constructor(x,y,genes=null){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    if(genes){
      this.genes = genes;
    }
    else{
      this.genes =  [];
      for(let i = 0; i<atts.rocket.n_genes+1;i++){
        this.genes[i] = createVector(randomGaussian(0,atts.rocket.max_hop),randomGaussian(0,atts.rocket.max_hop)).limit(atts.rocket.max_hop)
      }
    }

    this.actual_hop = 0;
    this.choque = 0;

    this.score = 0;


    this.hop();

  }

  hop(){
    this.acc = this.acc.add(this.genes[this.actual_hop]);
    this.actual_hop++;
  }
  evaluate_crash(){
    for(let obs of obstacles){
      obs.in_range(this);
    }
    if((this.pos.x >= (atts.w-atts.rocket.radius) && atts.borders.right)|| (this.pos.x <= (0+atts.rocket.radius) && atts.borders.left) || (this.pos.y >= (atts.h-atts.rocket.radius) && atts.borders.down) || (this.pos.y <= (0+atts.rocket.radius) && atts.borders.up) ){
      this.choque = 1;
    }
  }




  update(){
    if(this.choque==0){
      this.vel.add(this.acc).limit(atts.rocket.max_vel);
      this.pos.add(this.vel)
      this.acc = createVector(0,atts.g);
      this.evaluate_crash()
    }
  }

  paint(){
    let dist = this.pos.copy().sub(createVector(atts.target.x,atts.target.y)).mag();
    push()
    translate(this.pos.x,this.pos.y);

    let max_val= atts.likelihood_norm;
    let color = [255,
    map(dist,0,max_val,0,255),
  map(dist,0,max_val,0,255)];

    fill(color);
    if(this.choque ==1){fill(120);}
    stroke(0);
    rotate(this.vel.heading()-PI/2)
    beginShape()
    vertex(atts.rocket.radius/3,0);
    vertex(-atts.rocket.radius/3,0);
    vertex(0,atts.rocket.radius);
    endShape()
    //circle(0,0,atts.rocket.radius);

    pop()
  }

}



// PAINTING FUNCTIONS =  ==== = = = = = =
function paint_time_progress(time,x,y,diameter = atts.target.radius+12){
  let portion = 360*(time/atts.maxtime);
  data = [portion,360-portion];
  let lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(
      x,
      y,
      diameter,
      diameter,
      lastAngle,
      lastAngle + radians(data[i])
    );
    lastAngle += radians(data[i]);

  }
}

function paint_polygon(genes,x,y,r,c_line=[255,255,255],c_vtx=[0,0,255]){
  push()
  translate(x,y);
  beginShape()
  fill(c_vtx)

  let prevx = 0;
  let prevy=0;

  for(let i =0;i<genes.length;i++){

    let xx = prevx+r*genes[i].x;
    let yy = prevy+r*genes[i].y;
    //stroke(c_line);
    if(i>=0){
      stroke(c_line);
      if(rockets[0].actual_hop<i+1){
        stroke(0);
      }
      //line(xx,yy,r*genes[i-1].x,r*genes[i-1].y);
      line(xx,yy,prevx,prevy);
    }

    noStroke()
    if(rockets[0].actual_hop==i){
      fill(0);
    }
    circle(xx,yy,5);

    prevx = xx;
    prevy = yy;
  }
  endShape();
  pop()
}

function adaptative_response(value){
  let nvalue = 0;
  for(let i = atts.adaptative.limits.length; i>=0;i--){
    if(value<=atts.adaptative.limits[i]*atts.max_score){
      nvalue = atts.adaptative.values[i]
    }
  }
  if(nvalue == 0){
    atts.borders.right = true;
  }

  if(atts.adaptative.likelihood.active && gen>atts.adaptative.likelihood.min_gen){
    let mid_hist  =[];
    for(let i = 0;i<fitness_hist.length;i++){
      mid_hist.push(fitness_hist[i][1]);
    }


    let std = math.std(mid_hist);




    let minix  = [int(best.score<=atts.adaptative.likelihood.min_cond[0]*atts.max_score),
                  int(value<=atts.adaptative.likelihood.min_cond[1]*atts.max_score),
                  int(worst.score<=atts.adaptative.likelihood.min_cond[2]*atts.max_score)]
    let maxix  = [int(best.score>=atts.adaptative.likelihood.max_cond[0]*atts.max_score),
                  int(value>=atts.adaptative.likelihood.max_cond[1]*atts.max_score),
                  int(worst.score>=atts.adaptative.likelihood.max_cond[2]*atts.max_score)]
    minix.push(int(std<atts.adaptative.likelihood.stdev))
    maxix.push(int(std<atts.adaptative.likelihood.stdev))
    let mini  =  0;
    let maxi  =  0;
    for(let i = 0;i<minix.length;i++){
      mini=int(mini+minix[i]);
      maxi=int(maxi+maxix[i]);
    }
    let limit_cond  = 3;
    console.log(mini,maxi);
    if(mini>=limit_cond && atts.adaptative.likelihood.altered!="min"){
      let prev =   atts.likelihood_norm;
      atts.likelihood_norm = int(atts.likelihood_norm*atts.adaptative.likelihood.min_scaler);
      atts.adaptative.likelihood.altered="min";
      console.log("Normalizer changed from "+int(prev)+" to " +int(atts.likelihood_norm) + " due to adaptative response.")
    }else if(maxi>=limit_cond && atts.adaptative.likelihood.altered!="max"){
      let prev =   atts.likelihood_norm;
      atts.likelihood_norm = int(atts.likelihood_norm*atts.adaptative.likelihood.max_scaler);
      atts.adaptative.likelihood.altered="max";
      console.log("Normalizer changed from "+int(prev)+" to " +int(atts.likelihood_norm) + " due to adaptative response.")
    }

    // if(best.score<atts.adaptative.likelihood.min_cond[0] )
  }
  return nvalue;
}


function reproduce(rckt1,rckt2,method="rand"){
  let n_genes = [];
  let midv = int(random(rckt1.genes.length));
  for(let i = 0;i<rckt1.genes.length;i++){
    if(method == "crazy") {let choice = random(["rand","switch","split","mean"]);return reproduce(rckt1,rckt2,choice)}
    if(method=="rand"){
      n_genes[i]=random([rckt1.genes[i],rckt2.genes[i]]);
    }else if(method=="mean"){
      let magn = 0.5*(rckt1.genes[i].mag() + rckt1.genes[i].mag())
      n_genes[i]=(rckt1.genes[i]).add(rckt2.genes[i]).setMag(magn);
    }
    else if(method=="switch"){
      if(random()<0.5){
        n_genes[i]=createVector(rckt1.genes[i].x,rckt2.genes[i].y);
      }else{
        n_genes[i]=createVector(rckt2.genes[i].x,rckt1.genes[i].y)
      }
    }else if(method=="split"){

      if(i<=midv){
        n_genes[i]=rckt1.genes[i];
      }else{
        n_genes[i]=rckt2.genes[i];
      }
    }


    //MUT
    if(random()<atts.p_mut){
      switch (int(random(5))) {
        case 1:
          n_genes[i].add(createVector(randomGaussian(0,atts.rocket.max_hop),randomGaussian(0,atts.rocket.max_hop)));
          break;
        case 2:
          n_genes[i] = createVector(randomGaussian(0,atts.rocket.max_hop),randomGaussian(0,atts.rocket.max_hop));
          break;
        case 3:
          n_genes[i].mult(random([0.5,2]));
          break;
        case 4:
          n_genes[i].rotate(random([-PI,PI]));
        default:
          n_genes[i].mult(random([0.5,2]));
      }

    }
    n_genes[i].limit(atts.rocket.max_hop);

  }
  return n_genes;
}

function mean_gene(rocketis,last=10){
  let ans_gene = rocketis[0].genes;
  for(let i  = 0;i<ans_gene.length;i++){
    let  val = createVector(0,0);
    for(let j = 1;j<rocketis.length;j++){
      val.add(rocketis[j].genes[i]);
    }
    ans_gene[i].add(val);
    ans_gene[i].mult(1/rocketis.length);
  }
  return ans_gene;
}


function var_gene(rocketis,last=10){
  let ans_gene = [];
  for(let i  = 0;i<ans_gene.length;i++){
    let  val = 0;
    for(let j = 1;j<rocketis.length;j++){
      val.add(rocketis[j].genes[i]);
    }
    ans_gene[i].add(val);
    ans_gene[i].mult(1/rocketis.length);
  }
  return ans_gene;
}



function breed_new_gen(results,method="rand"){
  let pool = [];
  let n_boa;
  if(boa){
    n_boa = new Array(100).fill(boa);
  }
  pool = pool.concat(n_boa);
  for(let i = 0;i<results.length;i++){
    let rckt = results[i][1];
    let score = max(results[i][0],1);

    //console.log(score)
    for(let j=0;j<score;j++){
      pool.push(rckt)
      if(score> 0.8*atts.max_score){
        score = int(score * 1.2);
      }
    }

  }
  let new_rckt = [];
  for(let i = 0;i<atts.n_rocket;i++){
    let gn = reproduce(random(pool),random(pool),method);
    new_rckt[i] = new rocket(atts.origin.x,atts.origin.y,gn);
  }

  return new_rckt;
}


function evaluate(printing=false){
  let results = [];
  let stats = {
    best:0,
    mean:0,
    worst:0
  }

  for(let rckt of rockets){
    let dst = createVector(atts.target.x,atts.target.y).dist(rckt.pos);
    let dst_gauss = exp(-dst/atts.likelihood_norm);
    let score = constrain(int(map(dst_gauss,0,1,1,atts.max_score)),1,atts.max_score);
    if(rckt.choque ==1){score = int(atts.penal*score);}
    //if(rckt.choque ==1){score = int();}
    rckt.score=score;
    results.push([score,rckt])
    if(printing){
      push()
      rectMode(CENTER);
      textAlign(CENTER,CENTER);
      translate(rckt.pos.x,rckt.pos.y)
      fill(0);
      noStroke()
      rect(0,30,12,40);
      fill(255)
      text((score).toFixed(0),0,30);
      pop()
    }
    stats.mean+=score;
  }

  results.sort((a, b) => (a[0] > b[0]) ? -1 : 1);
  stats.best = float((results[0][0]).toFixed(0));
  stats.worst = float((results[results.length-1][0]).toFixed(0));
  stats.mean = float((stats.mean/results.length).toFixed(0));
  best = results[0][1];
  worst = results[results.length-1][1];
  if(!boa){
    boa = best;
  }else if(boa.score < results[0][1].score){
    boa = best;
  }

  worst = results[results.length-1][1];


  console.log("GENERATION "+gen+"\n",stats);
  statistics = stats;

  if(atts.adaptative.active){
    let preval = atts.p_mut;
    atts.p_mut=adaptative_response(stats.mean);
    if(preval != atts.p_mut){
      console.log("Mutation probability changed from "+ (preval*100).toFixed(2)+"% to "+(atts.p_mut*100).toFixed(2)+"% due to the adaptative response.")
    }
  }
  return results;
}
function draw(){
  background(0);

  //TIME & HOP
  let time = frameCount/atts.framerate;
  let dohop = false;
  if(time%atts.n_seconds_hop==0){
    dohop = true;
  }
  paint_time_progress(time,atts.target.x,atts.target.y);
  //TARGET
  push()
  fill(255,0,0)
  circle(atts.target.x,atts.target.y,atts.target.radius);
  pop()



  // POLYGON

  let n_best = 20;

  if(atts.paint.path_mean){
  paint_polygon(mean_gene(rockets,n_best),atts.origin.x,atts.origin.y,atts.plot.r_plot,c_line=[100,100,100],c_vtx=[0,0,255]);
  }
  if(best && atts.paint.path_best){
  paint_polygon(best.genes,atts.origin.x,atts.origin.y,atts.plot.r_plot,c_line=[100,100,100],c_vtx=[0,255,0]);
  }
  if(worst&& atts.paint.path_worst){
  paint_polygon(worst.genes,atts.origin.x,atts.origin.y,atts.plot.r_plot,c_line=[100,100,100],c_vtx=[255,0,0]);
  }





  // UPDATE & PAINT
  for(let rckt of rockets){
    if(dohop){
      rckt.hop();
    }
    rckt.update();
    rckt.paint();
  }
  for(let obs of obstacles){
    obs.paint();
  }



  push()
  fill(255);
  textSize(25);
  text("Generation: "+gen,20,40);
  if(statistics){

    // PAINT STATS
    textSize(16);
    text("Best of all: "+boa.score,20,60);
    text("Best: "+statistics.best,20,80);
    text("Mean: "+statistics.mean,20,100);
    text("Worst: "+statistics.worst,20,120);
  }
  pop()


  if(time>atts.maxtime){


    console.log("GENERATION "+gen)
    //console.log("Mean gene: \n",mean_gene(rockets))

    rockets = breed_new_gen(evaluate(),atts.method);
    if(statistics){
      //FITLOG
      let fitlog =[statistics.best,statistics.mean,statistics.worst];
      if(fitness_hist.length>=atts.adaptative.max_hist){
        fitness_hist.shift()
      }
      fitness_hist.push(fitlog);
    }


    frameCount=0;
    gen++;

  }
  let thicc = 8;
  if(atts.borders.right){
    push()
    rectMode(CENTER);
    fill(255,0,0);
    rect(atts.w,atts.h/2,thicc,atts.h);
    pop()
  }
  if(atts.borders.left){
    push()
    rectMode(CENTER);
    fill(255,0,0);
    rect(0,atts.h/2,thicc,atts.h);
    pop()
  }
  if(atts.borders.up){
    push()
    rectMode(CENTER);
    fill(255,0,0);
    rect(atts.w/2,0,atts.w,thicc);
    pop()
  }
  if(atts.borders.down){
    push()
    rectMode(CENTER);
    fill(255,0,0);
    rect(atts.w/2,atts.h,atts.w,thicc);
    pop()
  }

}
