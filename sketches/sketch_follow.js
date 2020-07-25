new p5();
var W;
var H;
var n_chasers  = 10;
var CHASERS;
var TRANSPARENT =true;

class chaser{
  constructor(x,y,theta){
    this.X = x;
    this.Y = y;
    this.THETA = theta;
    this.R = 15+randomGaussian(0,2);
    this.C = [255,255,255];
    this.V = 0;
    this.A = 0.01+0.05*random()
  }


  get_mouse(){
    let d  = sqrt((this.X-mouseX)**2 + (this.Y-mouseY)**2);
    push();
    translate(this.X,this.Y);


    let df = PI/2
    if(-this.Y+mouseY>0){df = -PI/2}
    let th = atan((-this.X+mouseX)/(-this.Y+mouseY))+df;



    pop();
    return [d,-th];

  }

  get_d_otras(xx,yy,ARR){

    let ds  = [];
    let minn = 1000
    let winner=0;
    for(var i =0;i<ARR.length;i++){
      if(ARR[i]!=this){

      ds[i] = sqrt((xx-ARR[i].X)**2+(yy-ARR[i].Y)**2)
      if(ds[i]<minn){winner = ARR[i].R;minn=ds[i]}

    }
    else{ds[i]=10000}

    }

    return [ds,winner];
  }








  update(ARR){

    let mouse_c = this.get_mouse()

    this.THETA = mouse_c[1];
    // if(random()>0.1){this.THETA = this.THETA+randomGaussian(0,0.1)}


    let d  = mouse_c[0];


  push();
  translate(this.X,this.Y);
  rotate(this.THETA);


  let mult = 2;
  if(d <100){mult=-2}
  if(d <10){mult=0;this.V=0.1;}
  this.V = max(min(this.V + (mult*this.A  ),5),0.1);



  let xxx= this.X + this.V*cos(this.THETA);
  let yyy = this.Y + this.V*sin(this.THETA);

  if(TRANSPARENT){
  this.X = xxx;
  this.Y = yyy;
  }
  else{
  let old_d  =min(this.get_d_otras(this.X,this.Y,ARR)[0])
  let new_d  =min(this.get_d_otras(xxx,yyy,ARR)[0])


  let new_other_R = this.get_d_otras(xxx,yyy,ARR)[1]
  console.log(new_other_R)
  if(new_d>(new_other_R+this.R) | new_d>old_d){
    this.X = xxx;
    this.Y = yyy;

  }
  if(new_d<100){
    this.V = 0.95*this.V
  }
}




  pop();




  }

  paint(){


    push();
    translate(this.X,this.Y);

    rotate(this.THETA);

    fill([255,0,0]);
    triangle(2*this.R, 0, 0.8*this.R, 0.4*this.R,0.8*this.R, -0.4*this.R);
    fill(this.C);
    circle(0,0,this.R);

    pop();

  }

}


function mouseClicked(){
  TRANSPARENT = !TRANSPARENT;
}




function setup(){
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);
  angleMode(RADIANS);

  CHASERS = [];
  for(var i =0;i<n_chasers;i++){
    CHASERS[i] = new chaser(random()*W,random()*H,0);
  }


}

function draw(){
background(0);
for(var i =0;i<n_chasers;i++){
  CHASERS[i].update(CHASERS);

  CHASERS[i].paint();

}
}
