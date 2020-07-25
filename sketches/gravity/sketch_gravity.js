//------------constants-------------
let ATTS = {
  G: 0.8,
  max_vel:40,
  collision_loss:0.8,
  conditions:"l"
};
//.............variables...........
let W;
let H;

let bodies;

let font_offset= -30;



function setup(){

  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);
  bodies = [];
  create_custom_bodies();
  // frameRate(1);

}


function gen_block(xo,yo,w,h,dimx,dimy,offx=0,offy=0,mode="r"){

  let dx =  w/dimx;
  let dy = h/dimy;


  for(let i = 0; i< dimx;i++){

    for(let j = 0; j< dimy;j++){
      let mult = mode == "r"?random([-1,1]):mode;
      let b = new Body(createVector((xo-w/2)+i*dx+ j*offx,(yo-h/2)+j*dy + i*offy),createVector(0,0),4*mult);
      b.W = 500;
      //b.C = [250,100,0];
      b.fixed = 1;
      b.merge=0;
      bodies.push(b);
    }
  }
}

function create_custom_bodies(){


  //SOLAR SYSTEM
 //  let nb1 = new Body(createVector(W/2+100,H/2),createVector(0,0),20);
 //  nb1.fixed=1;
 //  nb1.W=100;
 //  nb1.C = [255,255,0];
 //  let nb2 = new Body(createVector(W/2-650,H/2),createVector(0,1.2),7);
 //  let nb4 = new Body(createVector(W/2+700,H/2),createVector(0,-1),4);
 //  nb2.W=2;
 //  let nb3 = new Body(createVector(W/2+25,H/2),createVector(0.25,-3.5),4);
 //  nb3.W=0.5;
 //  nb3.gen=1;
 //  nb2.C = [0,0,255];
 //  nb3.C = [150,150,150];
 //
 //
 // bodies.push(nb1);
 // bodies.push(nb2);
 //  bodies.push(nb3);
 //    bodies.push(nb4);





 //CELL MEMBRANE
gen_block(W/2,H/3-50,1000,80,18,4,1,0,1)
gen_block(W/2,H/2,1000,80,18,4,0,0,"r")
gen_block(W/2,2*H/3+50,1000,80,18,4,1,0,-1)



}
function gen_dust(x,y){
  let b = new Body(createVector(x,y),createVector(0,10).limit(10),1.8);
  b.W = 0.1;
  b.merge=0;
  b.C = [120,120,120];
  bodies.push(b);
}

function random_flip(){
  let flipped = 0;
  while(flipped==0){
    let b  =random(bodies)
    if(b.fixed ==1){
      if(random()<0.1){
        b.fixed = 0;
        flipped=1;
      }else{
        b.charge = -1*b.charge
        flipped=1;
        push()
        fill(255)
        circle(b.pos.x,b.pos.y,25)
        pop()
      }
    }
  }
}
function mousePressed(){
  gen_dust(mouseX,mouseY);
}
function keyPressed(){
  if(key=="w"){
    font_offset-=2;
  }
  if(key=="s"){
    font_offset+=2;
  }
  if(key=="f"){
    random_flip();
  }
}


function random_pop(n_pop,minc,maxc,mix,speed){
  for(let i = 0;i<n_pop;i++){
    let mm = random(minc,maxc);
    if(mix && random()>0.5){
      mm *= -1;
    }

    let nb = new Body(createVector(random(W),random(H)),createVector(randomGaussian(0,speed),randomGaussian(0,speed)),mm);
    bodies.push(nb);
  }
}


function prune(popu){
  let res = [];
  for(let b of popu){
    if(b.eaten==0 && b.is_in){
      res.push(b)
    }
  }
  return res;
}




function draw(){
  gen_dust(W/2+font_offset,0)
  background(0);
  for(let i=0;i<bodies.length;i++){
    bodies[i].update(bodies)
    bodies[i].paint()
  }
  bodies = prune(bodies);
}
