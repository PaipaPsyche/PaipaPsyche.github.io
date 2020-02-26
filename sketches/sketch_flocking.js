let flock;
let alphax  = 25;
let pmut;
let pflip = 0.3;
let  n_flock =250;
let maxconnect;
let W;
let H;

function setup() {
    W = windowWidth;
    H = windowHeight;
    createCanvas(W,H);
    pmut = random(0,0.1);
    maxconnect = random([0,1,2,3,4,5,6])
  //createP("Drag the mouse to generate new boids.");

  flock = new Flock();
  let add_one  = random([1,2,3,4]);
  let add_minus = random([0,1,2,3]);
  // Add an initial set of boids into the system
  for (let i = 0; i < n_flock; i++) {
    let b = new Boid(random(width),random(height));
    if(add_one>0 ){b.one=1;add_one-=1;}
    else if(add_minus>0){
      if(random()<0.3){
        b.one=2;
      }
      else{
        b.one=-1;
      }
      add_minus-=1;
      }
    flock.addBoid(b);
  }
}

function draw() {
  background(0);
  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  // dominance, shape, R, G, B
  this.genes = {
    "DOM": random(),
    "SHP": random(1,2),
    "R": random(50,210),
    "G": random(50,210),
    "B": random(50,210)
  }
  this.myC = {"R":this.genes["R"],"G":this.genes["G"],"B":this.genes["B"]};
  //this.c = createVector(random(0,255),random(0,255),random(0,255));
  this.r = 3.5;
  this.maxspeed = random(2,4);    // Maximum speed
  this.maxforce = 0.06; // Maximum steering force
  this.infected = 0;
  this.one = 0;

  this.genes[random(["R","G","B"])]=0




}


Boid.prototype.infect = function(boid) {



this.infected =1;
this.maxforce = 0.03
this.maxspeed= random([0,0,0,0,0.5,1.2])

}

Boid.prototype.cure = function(boid){



  // this.genes["R"]=this.myC["R"];
  // this.genes["G"]=this.myC["G"];
  // this.genes["B"]=this.myC["B"];
  // this.genes["R"]=255;
  // this.genes["G"]=0;
  // this.genes["B"]=0;
  this.infected =-1;
  this.maxforce = 0.5;
  this.maxspeed=4;
  }


  Boid.prototype.skip = function(boid){



    this.genes["R"]=this.myC["R"];
    this.genes["G"]=this.myC["G"];
    this.genes["B"]=this.myC["B"];
    // this.genes["R"]=255;
    // this.genes["G"]=0;
    // this.genes["B"]=0;
    this.infected =0;
    this.maxspeed = random(2,5);    // Maximum speed
    this.maxforce = 0.08;
    // if(random()<map(2*pflip,0,2,0,0.5)){
    //   this.velocity = this.velocity.mult(-1);
    // }
    this.velocity = createVector(random(-1, 1), random(-1, 1)).mult(2*this.velocity.mag());
    }




Boid.prototype.mutate = function(boid) {
  stroke(255);
  line(this.position.x,this.position.y,boid.position.x,boid.position.y)
  // if(boid.infected ==1){
  //   if(random()<pflip){
  //     boid.cure()
  //   }
  //   else{
  //     this.infect()
  //
  //   }
  // }
  // else{
  //   if(this.infected ==1){
  //     this.cure()
  //   }
  // }
  this.genes["R"]=boid.genes["R"];
  this.genes["G"]=boid.genes["G"];
  this.genes["B"]=boid.genes["B"];

  if(boid.one==1 & this.infected!=1){
  this.infect(boid)}
  else if(boid.one==-1){
    this.cure(boid)
  }
  else if (boid.one==2){
    this.skip(boid)
  }


}



Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);


  // sep.mult(random(0.5,2));
  // ali.mult(random(0.5,2));
  // coh.mult(random(0.5,2));
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {

  if(this.one==1){this.genes["R"]=0;this.genes["G"]=0;this.genes["B"]=255;this.maxforce = 0.2;this.maxspeed=4;}
  if(this.one==-1){this.genes["R"]=255;this.genes["G"]=0;this.genes["B"]=0;this.maxforce=0.2;this.maxspeed=4;}
  if(this.one==2){this.genes["R"]=0;this.genes["G"]=255;this.genes["B"]=30;this.maxforce=0.5;this.maxspeed=4;}
  //if(random()<pow(pmut,3)/10 & this.infected!=0){this.skip()}

  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  //console.log(this.c.x);


if(this.one!=0){
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  fill([this.genes["R"],
  this.genes["G"],
this.genes["B"]]);
  stroke(map(sin(frameCount*this.velocity.mag()/50),-1,1,0,255))

  let R =  this.r *(1.2+this.velocity.mag()/2)
  let xx = R*cos(this.one*frameCount*this.velocity.mag()/100)
  let yy = R*sin(this.one*frameCount*this.velocity.mag()/91)

  circle(xx,yy,1);
  circle(-xx,-yy,1);
  circle(xx,-yy,1);
  circle(-xx,yy,1);
circle(0,0,this.r+sin(frameCount/4))

pop();
}
  else{

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    stroke(55);
    noFill()
    let dx = 3;
    let w = 10/this.velocity.mag();
    let l_tail = 2*this.maxspeed;
      bezier(0, 1.5*this.r, -dx*this.r*sin(frameCount/w), (l_tail/2)*this.r, dx*this.r*sin(frameCount/w), (3*l_tail/4)*this.r, 0, l_tail*this.r);
      fill([this.genes["R"],
      this.genes["G"],
    this.genes["B"]]);
      stroke(0);
        if(this.infected!=0){stroke(100)}
        if(this.infected==1){
          rect(-this.r,-this.r,2*this.r,2*this.r)
        }
        else{
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);}
    pop();
  }






  // push();
  //
  // translate(this.position.x, this.position.y);
  // rotate(theta);
  // // if(this.genes["SHP"]=="triangle"){
  // if(this.one==0){
  //
  // }
  // else{
  //   circle(0,0,this.r+sin(frameCount/2))
  // }
  //
  //
  //
  // // }
  // // else if (this.genes["SHP"]=="square") {
  // //   rect(-this.r/2,-this.r/2,this.r,4*this.r)
  // // }
  // // else if(this.genes["SHP"]=="circle"){
  // //   circle(0,0,this.r)
  // // }
  // pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {

      if(boids[i].one!=0 & this.one!=0 & this.one!=boids[i].one){
        sum.add(createVector(randomGaussian(0,1),randomGaussian(0,1)));
      }
      else {
        sum.add(boids[i].velocity);
      }

      if(random()<pmut & boids[i].one!=0 & this.one==0){this.mutate(boids[i]);}

      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let n_connect = maxconnect
  let neighbordist = 60;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist) ) {
      if(this.one!=0 & boids[i].one!=0 & boids[i].one!=this.one){
        count--; // Add location
      }
      else {
        sum.add(boids[i].position); // Add location
      }
      if(d<0.5*neighbordist & this.infected==1 & boids[i].infected==1 & n_connect>0){
        push();
        stroke(155);
        line(this.position.x,this.position.y,boids[i].position.x,boids[i].position.y)
        pop();
        n_connect--;
      }
      // if(d<0.5*neighbordist & this.infected==-1 & boids[i].infected==-1 ){
      //   push();
      //   stroke(55);
      //   //noFill()
      //   //circle(this.position.x,this.position.y,d)
      //   line(this.position.x,this.position.y,boids[i].position.x,boids[i].position.y)
      //   pop();
      // }


      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
