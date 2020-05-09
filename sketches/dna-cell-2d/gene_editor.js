let edit_cell_width = 15;
let edit_margin = 1;
let edit_xo = 580
let edit_yo = 480;
let edit_dx =edit_cell_width+2*edit_margin;

class amino{
  constructor(id){
    this.id=id;
    this.val=0;
  }
  set(n){
    this.val=n
  }
  switch(){
    this.val=1-this.val;
  }

  inRange(){

    if(mouseX>(edit_xo+this.id["i"]*edit_dx) && (mouseY>edit_yo+this.id["j"]*edit_dx) && (mouseX<edit_xo+this.id["i"]*edit_dx+edit_cell_width) && (mouseY<edit_yo+this.id["j"]*edit_dx+edit_cell_width)){
      return true;
    }
      return false;
  }


  paint(){
    push()
    translate(edit_xo+this.id["i"]*edit_dx,edit_yo+this.id["j"]*edit_dx)
    fill(COLORS[this.val])
    rect(edit_margin,edit_margin,edit_cell_width,edit_cell_width)
    fill(0)
    //text(this.id["id"],edit_cell_width/2,edit_cell_width/2)
    pop()
  }
}







class button_do{
  constructor(x,y,doing,r=4,c=[0,25,250]){
    this.R = r;
    this.x=x;
    this.y=y;
    this.do=doing;
    this.C = c;
  }
  click(){
    if(dist(this.x,this.y,mouseX,mouseY)<3*this.R){
        this.do()

    }
  }
  paint(){
    push()
    translate(this.x,this.y)

    fill(this.C)
    beginShape();

    vertex(-this.R, 2*this.R);
    vertex(-this.R, -2*this.R);
    vertex(3*this.R, 0);
  endShape(CLOSE);
  pop()
  }
}


class  button_submit{
  constructor(x,y,parent){
    this.R = 3;
    this.x=x;
    this.y=y;
    this.parent=parent;
  }

  click(){
    if(dist(this.x,this.y,mouseX,mouseY)<3*this.R){
        this.parent.submit()
    }
  }

  paint(){
    push()
    translate(this.x,this.y)

    fill([0,255,40])
    beginShape();

    vertex(-this.R, 2*this.R);
    vertex(-this.R, -2*this.R);
    vertex(3*this.R, 0);
  endShape(CLOSE);
  pop()
  }
}








class gene_editor{
  constructor(){
    this.panels = {}
    this.build_panels()
    this.result=new amino({"i":6,"j":0})
    this.new_result =  new amino({"i":4,"j":0})
    this.sub = new button_submit(75+edit_xo,46+edit_yo,this)
  }

  set(str){
    for(let  i = 1;i<=9;i++){
      this.panels[i].val=str[i-1];
    }
  }


  read(){
    let ans =""
    for(let  i = 1;i<=9;i++){
      ans+=str(this.panels[i].val);
    }
    return ans
  }

  blank(){
    this.set("000000000")
  }

  submit(){
    let config =  this.read()
    let response = this.result.val
    if(radio.value()=="single case"){

      let index = look_for(config);

      change_gene(index,response);


    }else if(radio.value()=="all rotations"){

      let rots = this.rotations(config)
      for(let r of rots){
        let index = look_for(r);
        change_gene(index,response);
      }

    }
    this.blank()


  }

  rotations(str){
    //r1
    let r1 = [0,7,8,1,2,3,4,5,6]
    let r2 = [0,5,6,7,8,1,2,3,4]
    let r3 = [0,3,4,5,6,7,8,1,2]


    let r1_str = ""
    let r2_str = ""
    let r3_str = ""


    for(let i = 0;i<9;i++){
      r1_str+=str[r1[i]]
      r2_str+=str[r2[i]]
      r3_str+=str[r3[i]]
    }

    return [str,r1_str,r2_str,r3_str]

  }







  click(){

    for(let  i = 1;i<=9;i++){
      if(this.panels[i].inRange()){
        this.panels[i].switch()
        return;
      }
    }
    if(this.result.inRange()){
      this.result.switch()
      return;
    }
    // if(this.new_result.inRange()){
    //   this.new_result.switch()
    //   return;
    // }
    this.sub.click()


  }




  build_panels(){
    let order =[9,8,7,2,1,6,3,4,5]

    for(let  i = 0;i<9;i++){
      this.panels[order[i]]=new amino({"i":floor(i/3),"j":i%3,"id":order[i]});
    }
  }

  // mouseInRange(){
  //
  // }



  paint(){
    this.new_result.set(translate_state(this.read()))
    push()
    for(let  i = 1;i<=9;i++){
      this.panels[i].paint()
    }
    this.result.paint()
    this.new_result.paint()
    pop()


    push()
    fill(255)
    textSize(9)
    text(" actual     new",edit_xo+4*edit_dx-5, edit_yo+1*edit_dx+5)
    pop()



    push()
    stroke(255)
    line(edit_xo+5*edit_dx+2, edit_yo+1*edit_dx-edit_cell_width/2,edit_xo+5*edit_dx+15, edit_yo+1*edit_dx-edit_cell_width/2)

    fill(255)
    beginShape();

    vertex(edit_xo+5*edit_dx+10, edit_yo+1*edit_dx-edit_cell_width+4);
    vertex(edit_xo+5*edit_dx+10, edit_yo+1*edit_dx-4);
    vertex(edit_xo+5*edit_dx+16, edit_yo+1*edit_dx-edit_cell_width/2);
    endShape(CLOSE);

    pop()


    this.sub.paint()
  }
}
