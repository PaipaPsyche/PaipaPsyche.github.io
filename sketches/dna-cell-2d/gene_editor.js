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
    this.result=new amino({"i":4,"j":0})
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
    let response = this.result.val;
    let index = look_for(config);

    change_gene(index,response);
    this.blank()

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
    push()
    for(let  i = 1;i<=9;i++){
      this.panels[i].paint()
    }
    this.result.paint()
    pop()

    this.sub.paint()
  }
}
