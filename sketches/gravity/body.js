class Body{
  constructor(pos,vel,m){
    this.pos = pos;
    this.charge = m;
    this.vel = vel;
    this.eaten = 0;
    this.fixed = 0;
    this.W = 1;
    this.gen=0;
    this.display=1;
    this.merge = 1;
    this.is_in=true;
    this. C = [];
    if(vel==null){
      this.vel = createVector(0,0);
    }
    this.acc = createVector(0,0);
  }

  explode(){
    if(abs(this.charge)>1){
      let n = round(this.charge*this.W);
      let sign = 1.2*(n/abs(n));
      for(let i = 0;i<abs(n);i++){
        let nb = new Body(this.pos.add(p5.Vector.random2D().setMag(10)),p5.Vector.random2D().setMag(ATTS.max_vel),sign);
        bodies.push(nb);
        //console.log("pushd")

      }

    }
    this.eaten =1;

    push()
    fill(255);
    circle(this.pos.x,this.pos.y,20);
    pop()

  }

  calcular_fuerza(b){

    if(b.eaten==1){
      let result = createVector(0,0);
      return result;
    }
    let d = b.pos.copy();
    d.sub(this.pos);

    let mag = ATTS.G*this.charge*this.W*b.W*b.charge/(d.magSq()+1);

    //return result;
    return d.setMag(mag);
  }

  update(bod){

    let result = createVector(0,0);

    let n_bod = bod.length;
    for(let i=0;i<n_bod;i++){
      if(bod[i]!=this && bod[i].eaten==0){

        if(this.merge==1 & bod[i].pos.dist(this.pos)<(abs(this.charge)+abs(bod[i].charge)) && abs(this.charge)>=abs(bod[i].charge)){

          let align = (bod[i].charge*this.charge)>0?true:false;
          if(align && bod[i].merge==1){
            let new_size = abs(this.charge)+sqrt(abs(bod[i].charge))*ATTS.collision_loss;
            this.charge = new_size*(this.charge/abs(this.charge))

          }
          // else{
          //   this.explode()
          //   bod[i].explode()
          // }

          //
          // let new_size = abs(this.charge)+sqrt(abs(bod[i].charge))*ATTS.collision_loss;
          // this.charge = new_size*(this.charge/abs(this.charge))
          // bod[i].eaten=1;
          bod[i].eaten=1;
        }
        result = result.add(this.calcular_fuerza(bod[i]));
      }
    }

    this.acc = result.div(abs(this.charge));
    this.vel.add(this.acc).limit(ATTS.max_vel);
      if(this.fixed == 0){
    this.pos.add(this.vel);
    }

  //console.log(result,this.vel,this.pos);
    if(ATTS.conditions=="p"){
      if(this.pos.x > W){
        this.pos.x = 0
      }
      else if(this.pos.x < 0){
        this.pos.x = W
      }
      if(this.pos.y < 0){
        this.pos.y = H
      }
      else if(this.pos.y > H){
        this.pos.y = 0
      }
    }
    else if(ATTS.conditions=="c"){
      if(this.pos.x > W){
        this.pos.x = W
      }
      else if(this.pos.x < 0){
        this.pos.x = 0
      }
      if(this.pos.y < 0){
        this.pos.y = 0
      }
      else if(this.pos.y > H){
        this.pos.y = H
      }
    }
    else if (ATTS.conditions=="l") {
      if(this.pos.x > W || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > H){
        this.is_in = false;
      }
    }
    // if(this.gen==1 && random()<0.1){
    //   gen_dust(this.pos.x+random(5),this.pos.y+random(5))
    // }

  }


  paint(){
    push()
    if(this.display ==1){

    stroke(0,255,0)
    line(this.pos.x,this.pos.y,this.pos.x+  0.02*this.vel.x,this.pos.y+0.02*this.vel.y)


    stroke(220,150,20)
    line(this.pos.x,this.pos.y,this.pos.x+.005*this.acc.x,this.pos.y+.005*this.acc.y)
    }
    noStroke()

    let filling = this.charge>0?[255,0,0]:[0,0,255];
    filling = this.C.length==0?filling:this.C;
    fill(filling);
    circle(this.pos.x,this.pos.y,abs(this.charge));
    pop();
  }




}
