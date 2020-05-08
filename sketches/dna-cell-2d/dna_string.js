class dna_string{
  constructor(rule){
    this.dna = rule_to_colors(rule);
    this.encoded  = hiper_encode_rule(rule).split(CHARS.sep);

  }

paint(xo,yo,w,h){
  let levels = int(this.dna.length/2)
  let dx = w/2;
  let dy = h/levels;
  let marginx = 5;
  let marginy = 5;



  push()
  textAlign(CENTER)
  fill(255)
  textSize(18)
  text("DNA codification",xo+w/2,yo-10)
  pop()

  push()
  translate(xo,yo)

  for(let i = 0;i< levels;i++){
    let col1 = this.dna[2*i]
    let col2 = this.dna[2*i+1]

    stroke(155)
    strokeWeight(1)
    fill(col1)
    rect(marginx,i*dy+marginy,dx-marginx,dy-marginy)
    fill(col2)
    rect(dx+marginx,i*dy+marginy,dx-marginx,dy-marginy)

    fill(255)
    noStroke()
    textAlign(LEFT)
    text(this.encoded[2*i],marginx-58,i*dy+marginy+dy/2)
    text(this.encoded[2*i+1],w+10,i*dy+marginy+dy/2)
  }
  pop()
}

}
