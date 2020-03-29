




function random_vel(d){
  return createVector(randomGaussian(0,d/2),randomGaussian(0,d/2)).limit(d)
}


class  boid{
  constructor(x1,y1,x2,y2){
      this.x_bounds= [x1,x2]
      this.y_bounds= [y1,y2]


      this.state = {
        "state":"suceptible",
        "days_infected":0

      }





      this.position = createVector(random(this.x_bounds[0],this.x_bounds[1]),
                                    random(this.y_bounds[0],this.y_bounds[1]))
      this.velocity = random_vel(atts_sim["maxvel"])


      this.acc = createVector(0,0)

      this.obedience=random()<atts_sim["obedience_rate"]?1:0;
  }



  set_posterior(){

    this.obedience= random() < atts_sim["obedience_rate"]?1:0;
  }

  infect(){
    this.state["state"] = "infected"

  }


  cure(){
    this.state["state"] = "cured"

  }

  plus_day(prop_inf){
    if(this.state["state"]=="infected"){
      this.state["days_infected"]++;

    let frac_days = map(this.state["days_infected"]/atts_sim["days_tolerance"],0,1,0,0.5)
    if(random()<frac_days & this.state["days_infected"]>atts_sim["min_days"]){
      let mult = map(prop_inf,0,1,1,3)
      if(random()<atts_sim["p_death"]*mult){
        this.state["state"]="dead"
      }
      else{
        this.state["state"]="cured"
      }
    }
}
  }



  // add_atts(atts){
  //
  //   for(let att of Object.keys(atts)){
  //     atts_sim[att]=atts[att];
  //   }
  //
  //
  //
  //
  //
  // }


  refresh(boids){
    let p_infect_rate = this.obedience==1?1/(1+atts_sim["wash"]):1;
    let inf_d = atts_sim["r_infect"]*atts_sim["r_boids"]/(1+0.5*atts_sim["wash"])
    if(this.state["state"]=="infected"){

      for(let bd of boids){
        //console.log( bd.state["state"],bd.position.dist(this.position))
        if(bd!=this & bd.state["state"]=="suceptible" & bd.position.dist(this.position)<inf_d){

          if(random()<(atts_sim["inf_rate"]*p_infect_rate)) {
            bd.infect()
          }
        }
      }

    }
  }




  evolve(boids){


    this.acc  = this.acc.add(random_vel(atts_sim["dacc"])).limit(2*atts_sim["dacc"])
    let limit_vel = 1
    if(this.obedience==1){

      limit_vel= map(atts_sim["restriction"],0,1,1,0.05);
    }

    this.velocity = this.velocity.add(this.acc).limit(limit_vel*atts_sim["maxvel"])
    this.position = this.position.add(this.velocity);

    if(this.position.x < this.x_bounds[0] ){
      this.position.x =  this.x_bounds[0]
      this.velocity.x  = - this.velocity.x
    }

    if(this.position.x > this.x_bounds[1] ){
      this.position.x =  this.x_bounds[1]
      this.velocity.x  = - this.velocity.x
    }

    if(this.position.y < this.y_bounds[0] ){
      this.position.y =  this.y_bounds[0]
      this.velocity.y  = - this.velocity.y
    }

    if(this.position.y > this.y_bounds[1] ){
      this.position.y = this.y_bounds[1]
      this.velocity.y  = - this.velocity.y
    }



    this.refresh(boids);




    //
    //
    // this.velocity = this.velocity.add(random_vel(atts_sim["maxvel"])).limit(atts_sim["maxvel"]*map(mouseX,0,W,0.1,2))



  }


  paint(){
    if(this.state["state"]!="dead"){
      push();

      fill(colors[this.state["state"]]);
      // if(this.obedience==0){fill([0,110,0])}
      noStroke();

      circle(this.position.x,this.position.y,atts_sim["r_boids"])
      pop();

    }



  }




}
