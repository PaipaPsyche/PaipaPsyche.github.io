let W,H;
let lanes_high = []
let advance = 1;
let proximity_threshold = 180;
let brake  = 6;
let accel  =1;

let tolerance = 0.7;
let change_rate  = 0.015;

let dv  = 0.04;
let freq_ranges=[250,520];
let n_lanes = 6 ;
let max_cars_per_lane =7;



let sl_proximity, sl_change, sl_tolerance;


function setup(){
  W  = windowWidth;
  H = windowHeight;
  frameRate(50);
  createCanvas(W,H);
  for(let i = 0;i<n_lanes;i++){
    let  l = new lane()
    l.setpos(H/4 + i*l.h+10);
    l.min_v = 0;
    l.max_v = int(5+1.25*i);
    l.index = i
    l.f_central = 220 + i*80
    lanes_high.push(l)
  }
  for(let i = 0;i<lanes_high.length;i++){
    if(i-1>=0){
      lanes_high[i].left = lanes_high[i-1]
    }
    if(i+1<lanes_high.length){
      lanes_high[i].right = lanes_high[i+1]
    }

  }
}




class instrument{
    constructor(type){
      this.osc = new p5.Oscillator(type);
      this.frequency = random(freq_ranges[0],freq_ranges[1]);
      this.amplitude = 0.2;
      this.pitch = 0;
      this.playing=0;

      this.set()
    }



    set(){
      this.osc.freq(this.frequency+ this.pitch)
      this.osc.amp(this.amplitude)
    }
    play(){
      if(this.playing==0){
        this.osc.start()
        this.playing = 1;
      }

    }
    stop(){
      if(this.playing==1){
        this.osc.stop()
        this.playing = 0;
      }

    }
    playFor(n){
      this.osc.start()
      this.playing = 1;
      this.osc.stop(n)
      this.playing = 0;
    }

    freq(x){
      this.frequency=x
      this.set()
    }
    amp(x){
      this.amplitude=x
      this.set()
    }
    ptch(x){
      this.pitch = x;
      this.set();
    }
}


class car{
  constructor(lane){
    this.x = 0;
    this.v = 1;
    this.lane = lane

    //this.d_pitch = random([0,random(1,100)];
    this.d_pitch = 10;

    this.reset()

    this.actual_color = this.color;

    this.active = 1;
    this.time_till_active=0;


  }

  step(d){
    if(this.active==1){
      if(this.v > d + this.long + 10 && d<this.lane.w){
        this.x = (this.x+d)
      }
      else{
        this.x = (this.x+accel*this.v);
      }
      if(this.x > this.lane.w){
        this.x = this.x%(this.lane.w)-50
        this.reset()
      }


    }else{
      this.time_till_active --;
      if(this.time_till_active==0){
        this.active = 1
        this.x = this.x + random(2,4)*this.long
        this.x = this.x%(this.lane.w)-50
        this.time_till_active=0;
      }
    }

  }

  deactivate(n){
    if(this.active==1){
      this.active=0
      this.time_till_active = n
    }

  }


  reset(){
    this.long = random()<0.8?60:100;

    this.tentative = this.lane
    if(this.instrument){this.instrument.stop()};
    let type = this.long==100?"triangle":"sine";

    this.instrument = new instrument(type);
    this.plate = gen_plate()
    this.color = [random(50,200),random(50,255),random(50,255)];
    if(random()<tolerance){
      this.instrument.amp(0)
    }
    else{
      this.instrument.amp(0.2)
    }
    if(this.long == 100 && random()<0.7){
      this.color = [0,0,200]
    }
    this.tentative = this.lane;
  }

  change_color(c){
    this.actual_color = c;
  }
  get_distance_to_front(){
    let distance = this.lane.w
    for(let c of this.lane.cars){
      if(c != this){
        if((c.x-this.x)>0 && (c.x-this.x)<distance){
          distance = (c.x-this.x)
        }
        if((c.x-this.x)<0 && (c.x+this.lane.w-this.x)<distance){
          distance = (c.x+this.lane.w-this.x)
        }
        if((c.x > this.x) && ((c.x-this.x)<(c.long/2 + this.long/2))){
          let ntime  = max(10,int(randomGaussian(500,50)))
          c.deactivate(ntime)
          this.deactivate(ntime+int(random(60,120)))

        }

      }

    }

    //let pt = map(distance,this.long-10,10+this.long+proximity_threshold,-this.d_pitch,this.d_pitch);
    //this.instrument.ptch(pt)

    return distance;
  }

  evaluate_lane_change(){
    let lft  = this.lane.left;
    let rgt  = this.lane.right;

    let posibilities = [this.lane]
    let avaliable=this.lane
    let x1 = this.x + this.v-proximity_threshold/2
    let x2 = this.x + this.v + this.long+proximity_threshold/2
    if(lft && lft.slot_avaliable(x1,x2) && lft.cars.length< avaliable.cars.length){
      avaliable=lft
      posibilities.push(lft)
    }
    if(rgt && rgt.slot_avaliable(x1,x2) && rgt.cars.length< avaliable.cars.length){
      avaliable = rgt
      posibilities.push(rgt)
    }
    if(random()<0.5){
      return avaliable
    }else{
      let chosen = random(posibilities)
      return chosen
    }

  }

  try_change_lane(){

    let instruction  = this.evaluate_lane_change()
    if(this.tentative != this.lane && instruction==this.tentative){

        this.lane.delete_car(this)
        instruction.cars.push(this)
        this.lane = instruction;
        this.tentative =this.lane


    }
    else if(this.tentative == this.lane){
      this.tentative = instruction;
    }
  }

  run(){

    let dfront = this.get_distance_to_front();
    //console.log(this.get_distance_to_front(), (this.long + this.v + proximity_threshold))
    if(this.active==1){
      if(dfront > (this.long + 0.5*this.v +12*this.lane.max_v)){
        this.v = min(this.lane.max_v,this.v + dv);
        this.change_color(this.color)

        this.instrument.stop()


        if(random()<change_rate/100){
          this.try_change_lane()
        }
      }else{
        let proximity_index = brake*max(1,2*proximity_threshold/dfront)
        this.v = max(this.lane.min_v,this.v - proximity_index*dv)
        if(this.instrument.amplitude==0.2){
          this.change_color([255,0,0])

        }
        else{
          this.change_color([255, 173, 51])

        }

        if(random()<change_rate){
          this.try_change_lane()
        }

        //this.instrument.pitch(proximity_index);
        this.instrument.play()

      }
  }else{
    this.instrument.stop()
    this.change_color([150,150,150])
  }


    this.step(dfront);

  }

  paint(){
    push()
    rectMode(CENTER);
    angleMode(DEGREES)
    let dir  = 0
    let h = 0.7*this.lane.h;
    if(this.tentative == this.lane.left){
      translate(this.x,this.lane.y-3)
      rotate(-1)
      dir = -h/2+5
    }
    else if(this.tentative == this.lane.right){
      translate(this.x,this.lane.y+3)
      rotate(1)
      dir = h/2-5
    }
    else{
      translate(this.x,this.lane.y)
    }



    fill(this.actual_color)

    rect(0,0,this.long,h);
    if(dir!=0){
      fill([255,255,0,120*(1+sin(10*frameCount))])
      noStroke()
      rect(-this.long/2+5,dir,5,5);
    }
    fill(0);
    textAlign(CENTER,CENTER)
    textStyle(BOLD)
    text(this.plate,0,0)
    pop()
    if(advance == 0){
      this.instrument.stop()
    }
  }


}


class lane{
  constructor(){
    this.cars  = []
    this.left  = null;
    this.right = null;

    this.f_central  = 400;
    this.df =40

    this.index = 0;

    this.min_v = 0;
    this.max_v = 5;

    this.w = W;
    this.h = 50;
    this.setpos(H/2); /// cambiar por automatico
    //this.highway = highway;
  }
  setpos(y){
    this.y = y;
  }
  add_car(x=0){
    let c  = new car(this);
    c.instrument.freq(randomGaussian(this.f_central,this.df));
    c.x=x;
    this.cars.push(c);

  }
  delete_car(d_car){
    let new_cars = []
    for(let c of this.cars){
      if(c != d_car){
        new_cars.push(c)
      }
    }
    this.cars = new_cars;
  }
  run(){
    for(let  i =0;i<this.cars.length;i++){
      this.cars[i].run()
    }
  }
  slot_avaliable(x1,x2){
    let is_obstructed = true; //is free
    for(let  i =0;i<this.cars.length;i++){
      let c = this.cars[i]
      if(c.x < x1 && c.x+c.long >x1 || c.x > x2 && c.x-c.long<x2){ //si esta el carro fuera pero una parte dentro
        is_obstructed = false;
        break;
      }
      if(c.x > x1 && c.x<x2){ // si esta dentro
        is_obstructed= false;
        break;
      }
    }
    return is_obstructed;
  }
  evaluate_click(){
    if(mouseY>(this.y-this.h/2) && mouseY<(this.y+this.h/2)){
      return true;
    }
    return false;

  }



  paint(){
    push()
    rectMode(CENTER);
    fill(150);
    strokeWeight(3);
    stroke(0);
    rect(W/2,this.y,this.w,this.h);
    pop()
    for(let  i =0;i<this.cars.length;i++){
      this.cars[i].paint()
    }
  }
}


class highway{
  constructor(n_lanes){
    this.lanes = []
    this.make_lanes(n_lanes)

  }

  make_lanes(n_lanes){
    for(let i = 0;i<n_lanes;i++){
      this.lanes.push(new lane(this))
    }
  }

  run(){

  }
}

function gen_plate(){
  let letr = ""
  let num = ""
  for(let  i = 0; i<3;i++){
    letr = letr + random('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
     num = num + floor(random(10))
  }
  return letr+" "+num;
}
function random_add(){
  slane = random(lanes_high)
  if(slane.cars.length<max_cars_per_lane-int(slane.index/2.5)){
      slane.add_car()
  }
}
function mouseClicked(){
  for(let L of lanes_high){
    if(L.evaluate_click()){
      L.add_car(mouseX)
      break;
    }
  }
}
function keyPressed(){
  if(key=='p'){
    advance = 1-advance
  }
}
function sliders(){
  slider_mg = createSlider(10,1000,70,5);
  slider_mg.position(xo, yo);
  slider_mg.style('width', str(ATTS.rect_cells.w)+'px');
  slider_mg.style('height', '2px');
  //slider_mg.style('rotate', '-90');
  slider_mg.style('background-color', 'black');
}





function draw(){
  background([0,120,0]);
  for(let L of lanes_high){
    if(advance==1){
      L.run()
    }

    L.paint()
  }
}
