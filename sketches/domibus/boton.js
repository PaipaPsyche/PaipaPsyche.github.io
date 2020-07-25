var butwidth=100;
var butheight=50;

class boton{
  constructor(x,y,txt){
    this.X = x;
    this.Y= y;
    this.C = [255,0,0];
    this.T = txt;


  }

  mouseInRange(){
    var ans=0;
    if(mouseX>=this.X & mouseX<this.X+butwidth & mouseY>=this.Y & mouseY<this.Y+butheight){
      ans = 1
    }
    return ans
  }




  pintar(){

    

    fill(this.C);
    rect(this.X,this.Y,butwidth,butheight);
  }





}
