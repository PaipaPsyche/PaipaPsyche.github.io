
let BUTT_C = {"butt_on":[200,200,0],
              "butt_off":[50,50,50],
              "box_val":[20,20,20],
              "font_val":[255,255,255],
              "font_butt":[10,10,10],
              "toogle_on":[0,200,0],
              "toogle_off":[200,50,0]}




class slider_val{
  constructor(x,y,atts){
  this.position = createVector(x,y)
  this.atts= atts;
  this.W = this.atts["W"];
  this.H = this.atts["H"];

  this.text = this.atts["text"];
  this.val = this.atts["init"]
  this.active = 1;

  this.d_val = this.atts["dval"]



}

action(a){
  if(a=="+"){
    this.val = this.val + this.d_val
  }
  else if(a=="-"){
    this.val = this.val - this.d_val
  }
  else if(a=="on"){
    this.active = 1;
  }
  else if(a=="off"){
    this.active = 0;
  }
  this.val = constrain(this.val,this.atts["low"],this.atts["high"])
}


in_range(){

  if(dist(mouseX,mouseY,this.position.x+this.W/6,this.position.y+this.H/2)<=this.atts["butt_rad"]*this.H){

    return "-"
  }
  else if(dist(mouseX,mouseY,this.position.x+5*this.W/6,this.position.y+this.H/2)<=this.atts["butt_rad"]*this.H){
    return "+"
  }
  return ""
}


check(){
  trigger();
  if(this.active==1){
  this.action(this.in_range())
}
}




paint(){
  let d_pix = 5;

  push()

  translate(this.position.x,this.position.y)
  noStroke()
  fill(BUTT_C["box_val"])


  rect(this.W/3+d_pix,2*d_pix,this.W/3-2*d_pix,this.H-4*d_pix)
  textAlign(CENTER,CENTER)
  fill(BUTT_C["font_val"])


  textSize(0.3*this.H)
  text(this.text,this.W/2,0)

  textSize(0.4*this.H)
  let dec_places = this.atts["dtype"]=="i"?0:2;
  text(this.val.toFixed(dec_places),this.W/2,this.H/2)




  let col_butt = this.active==1?BUTT_C["butt_on"]:BUTT_C["butt_off"];
  fill(col_butt)
  circle(this.W/6,this.H/2,this.atts["butt_rad"]*this.H);
  fill(BUTT_C["font_butt"])
  text("-",this.W/6,this.H/2);
  fill(col_butt)
  circle(5*this.W/6,this.H/2,this.atts["butt_rad"]*this.H);
  fill(BUTT_C["font_butt"])
  text("+",5*this.W/6,this.H/2);
  pop()




}






}


class toogle{
  constructor(x,y,atts){
    this.position = createVector(x,y)
    this.atts= atts;
    this.W = this.atts["W"];
    this.H = this.atts["H"];

    this.text = this.atts["text"];
    this.val = this.atts["init"]
    this.active = 1;

  }

  switch(){
    this.val = 1-this.val;
  }

  in_range(){
    if(mouseX>this.position.x & mouseY>this.position.y & mouseX<(this.position.x+this.W) & mouseY<(this.position.y+this.H)){
      return 1
    }
    return 0
}

  check(){
    if(this.active==1 & this.in_range()==1){
      this.switch()
      trigger();
  }
  }


  paint(){

    push()
    translate(this.position.x,this.position.y)
    textAlign(CENTER,CENTER)
    let col_butt = this.val==1?BUTT_C["toogle_on"]:BUTT_C["toogle_off"];
    fill(col_butt)
    noStroke()
    rect(0,0,this.W,this.H)
    textSize(this.H*0.6)
    fill(BUTT_C["font_butt"]);
    text(this.atts["text"],this.W/2,this.H/2)
    pop()




  }




}


class press{

  constructor(x,y,atts){
    this.position = createVector(x,y)
    this.atts= atts;
    this.W = this.atts["W"];
    this.H = this.atts["H"];

    this.text = this.atts["text"];
    this.val = 0
    this.active = 1;

  }
  switch(){
    this.val = 1-this.val;
  }
  in_range(){
    if(mouseX>this.position.x & mouseY>this.position.y & mouseX<(this.position.x+this.W) & mouseY<(this.position.y+this.H)){
      return 1
    }
    return 0
}

  check(){
    if(this.active==1 & this.in_range()==1){
      this.switch()
      trigger();
  }
  }

  paint(){

    push()
    translate(this.position.x,this.position.y)
    textAlign(CENTER,CENTER)
    let col_butt = this.val==1?BUTT_C["butt_off"]:BUTT_C["butt_on"];
    fill(col_butt)
    noStroke()
    rect(0,0,this.W,this.H)
    textSize(this.H*0.6)
    fill(BUTT_C["font_butt"]);
    text(this.atts["text"],this.W/2,this.H/2)
    pop()




  }




}
