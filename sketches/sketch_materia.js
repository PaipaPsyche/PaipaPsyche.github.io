new p5();
// var W = windowWidth;
// var H = windowHeight;


var Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var ground;

function Box(x,y,w,h,stat=false,ang=0){
  var options = {
    friction:0,
    restitution:0,
    isStatic:stat,
    angle:ang
  }
  this.body = Bodies.rectangle(x,y,w,h,options);
  this.w = w;
  this.h = h;
  this.c = [55+random()*200,55+random()*200,55+random()*200]
  World.add(world,this.body);

  this.remove = function(){
    World.remove(world,this.body);
  }
  this.event = function(){
    if(options.isStatic==false){
    this.c  = [0,0,255];}
    else{
      this.c  = [255,255,255];}
  }


  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;


    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(this.c);
    rect(0,0,this.w,this.h);
    pop();
  }
}


function Ball(x,y,r){
  this.body = Bodies.circle(x,y,r);
  this.r = r;
  this.c = [55+random()*200,55+random()*200,55+random()*200]
  World.add(world,this.body);


  this.event = function(){
    this.c  = [255,0,0]
  }
  this.remove = function(){
    World.remove(world,this.body);
  }

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;


    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(this.c);
    circle(0,0,this.r);
    pop();
  }
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  // boxes = [];
  engine = Engine.create();
  world = engine.world;

  Engine.run(engine);

  ground1 = new Box(width/4,height/6,width/2,30,istat= true,ang=PI/7)
  ground2 = new Box(5*width/6,height/3,width,30,istat= true,ang=-PI/7)
  ground3 = new Box(1*width/4,7*height/8,width,30,istat= true,ang=PI/11)
  //World.add(world,ground);
  boxes.push(ground1);
  boxes.push(ground2);
  boxes.push(ground3);



}

function keyPressed(){
  if (keyCode === ENTER) {
    for(var i =0;i<boxes.length;i++){
      boxes[i].event();
    }



  }
}

function newobj(x,y){
  if(random()>0.5){
  boxes.push(new Box(x,y,randomGaussian(20,8),randomGaussian(20,8)));
}
  else{
    boxes.push(new Ball(x,y,randomGaussian(10 ,2)));
  }
}


function mouseDragged(){
newobj(mouseX,mouseY);

}

var factorDel = 0.1
var factorAdd = 0.1

function draw() {
  background(0);

  factorDel = map(mouseX,0,width, 0.001,0.5)
  factorAdd = map(mouseY,0,height, 0.6,0.001)

  if(random()<factorAdd ){
    newobj(width/2+randomGaussian(0,150),0);
  }
  if(random()<factorDel & boxes.length>10){

    push();
    var rand  =random();
    var deleted  = int(map(rand,0,1,4,boxes.length-2))

    fill(255);

    circle(boxes[deleted].body.position.x,boxes[deleted].body.position.y,40+randomGaussian(15));
    pop();
    boxes[deleted].remove();
    boxes.splice(deleted,1);
  }

  for(var i =0;i<boxes.length;i++){
    boxes[i].show();
    if(boxes[i].body.position.y>height){
      boxes[i].remove();
      boxes.splice(i,1);
      i--;

    }
  }



}
