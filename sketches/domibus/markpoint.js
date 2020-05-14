class markpoint{
  constructor(x,y,gl,tipo){
    this.X = x;
    this.Y = y;
    this.name = '';
    this.ground_level = gl;
    this.type = tipo;
    this.desc="";


  }

  get_name(){
    this.name = name_markpoint(this)["NAME"];
  }

  hover(){
    if(dist(mouseX,mouseY,this.X,this.Y)<4.5){
      return true;
    }
    return false;
  }

  paint(){
    if(this.name==''){
      this.get_name()
    }
    push()
    stroke(0);
    fill([255,0,0]);
    circle(this.X,this.Y,2.5+0.8*sin(T*0.5));
    pop()
    if(this.hover()){
      push()
      noStroke()
      fill([0,0,0,150]);
      rectMode(CENTER)
      rect(this.X,this.Y+23,textWidth(this.name)*1.2,16)

      fill(255);

      textAlign(CENTER,CENTER);
      textSize(14);
      text(this.name,this.X,this.Y+23);
      if(this.desc!=""){
        fill([255,0,0]);
      text(this.desc,this.X,this.Y-23);
      }


      pop()
    }


  }


}


let REASONS=["Earthquake","Meteor Impact","Super Storm","Unknown volcano erupts","Flood"]

class Disaster{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.reason = random(REASONS)
    this.R = random(10,100);
    this.time = int(random(5,50))
  }

  paint(){
    push()
    fill([255,0,0,90])
    strokeWeight(1.5)
    circle(this.x,this.y,this.R)
    textAlign(CENTER,CENTER)
    noStroke()
    fill([255,0,0,190])
    text(this.reason,this.x,this.y+this.R+10)
    pop()
  }
}
