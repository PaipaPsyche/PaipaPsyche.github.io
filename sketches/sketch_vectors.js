let W;
let H;

let vecs = []
let n_vecs = 40
let maxlen = 200
let lenvect;
let T = 0;
let dt  = 0.02;

let dictC = {
  1:[250,20,20],
  2:[250,150,20],
  3:[150,250,20],
  4:[20,250,20],
  5:[20,250,150],
  6:[20,150,250],
  7:[20,20,250],
  8:[150,20,250],
  9:[250,20,150],
}
let maxT;


function mouseClicked(){
  dt=-dt;
}
function keyTyped(){
  if(key == "p"){
    if(dt ==0){
      dt=0.02
    }
    else{
      dt=0
    }
  }
}
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};






function setup(){
  if(isMobileDevice()){
    n_vecs = 25
  }


  //canvas
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);


  let dx = W/n_vecs;
  let dy = H/n_vecs;
  maxT = Object.keys(dictC).length

  lenvect = 0.99 * min(dx,dy)
  for(let i =0;i<=n_vecs;i++){
    let x = dx*i
    for(let j =0;j<=n_vecs;j++){
      let y = dy*j

      let t = floor(random(maxT)+1)
      vecs.push(new vector(x,y,0,0,t))
    }
  }

}



class vector{
  constructor(x,y,vx,vy,T){
    this.position = createVector(x,y)
    this.vel = createVector(vx,vy).limit(maxlen)
    this.T = T;
    this.C = dictC[this.T];
    this.mult = map(T,1,maxT,-2,2)//+random([-0.5,-0.2,0,0.2,0.5])

  }
  track(x,y){
    let dist  = createVector(x,y).sub(this.position)
    this.vel = dist.limit(maxlen)
  }

  paint(){
    push();

    let theta = this.vel.heading() + radians(90);
    translate(this.position.x,this.position.y)
    rotate(theta+T*this.mult);
    if(this.T==0){
      this.track(W-mouseX,H-mouseY)
    }
    else if(this.T==1){
      this.track(mouseX,H-mouseY)
    }
    else if(this.T==2){
      this.track(W-mouseX,mouseY)
    }
    else if(this.T==3){
      this.track(mouseX,mouseY)
    }
    else if(this.T==4){
      this.track(W/2,mouseY)
    }
    else if(this.T==5){
      this.track(mouseX,H/2)
    }
    else if(this.T==6){
      this.track(W/2,H-mouseY)
    }
    else if(this.T==7){
      this.track(W-mouseX,H/2)
    }
    else if(this.T==8){
      this.track(W/2,mouseY)
    }
    else if(this.T==9){
      this.track(W/2,H-mouseY)
    }



    fill(this.C);
    let mag  = this.vel.mag()
    mag = map(mag,0,maxlen,0,lenvect)
    rect(-1,-mag/2,2,mag+1+sin(15*T+T))
    pop();

  }

}



function draw(){
background(0);
for(let i =0;i<vecs.length;i++){
  vecs[i].paint()

}
T=T+dt;
}
