







class plot{
constructor(x,y){
  this.position = createVector(x,y)
  this.days=[]
}

add_day(poll){
let day = Object.assign({}, poll, {"n":atts_sim["day"]});

if(this.days.length==atts_sim["plt_max_days"]){
  this.days=this.days.slice(1);
}
this.days.push(day);

}



paint(){

push()
translate(this.position.x,this.position.y)
let len_d = this.days.length
let dx_day = (W-2*atts_sim["margin"])/(len_d)
if(len_d>0){
for(let i=0;i<len_d;i++){
  let d = this.days[i]
  let h_c=0;
  let h_s=0;
  let h_i=0;
  let h_d=0;


  if(d["cured"]>0){
    h_c = (0.2*H-atts_sim["margin"])*d["cured"]/d["total"]
    fill(colors["cured"])
    rect(i*dx_day,0,dx_day,h_c);
  }
  if(d["suceptible"]>0){
    h_s = (0.2*H-atts_sim["margin"])*d["suceptible"]/d["total"]
    fill(colors["suceptible"])
    rect(i*dx_day,h_c,dx_day,h_s);
  }
  if(d["infected"]>0){
    h_i = (0.2*H-atts_sim["margin"])*d["infected"]/d["total"]
    fill(colors["infected"])
    rect(i*dx_day,h_c+h_s,dx_day,h_i);
  }
  if(d["dead"]>0){
    h_d = (0.2*H-atts_sim["margin"])*d["dead"]/d["total"]
    fill(colors["dead"])
    rect(i*dx_day,h_c+h_s+h_i,dx_day,h_d);
  }

  noFill()
  stroke(0)
  strokeWeight(1.5)
  rect(i*dx_day,0,dx_day,0.2*H-atts_sim["margin"])

  fill(255)
  noStroke()
  textAlign(CENTER,CENTER)
  textSize(9);
  text(d["n"],(i+0.5)*dx_day,this.position.y-25);


}
}

pop()




  push()
  translate(this.position.x,this.position.y)
  noFill()
  stroke(255)
  strokeWeight(3)
  rect(0,0,W-2*atts_sim["margin"],0.2*H-atts_sim["margin"])
  pop()


}



}
