new p5();
var W;
var H;
var n_neurons=800;
var NEURONS=[];


var time = 1+10*random();
var dt = 0.5;

var max_connections=1+15*random();
var max_D=5+50*random();

class neuron{
  constructor(x,y){
    this.X = x;
    this.Y = y;
    this.R = 2+floor(random()*7);
    this.C1=[80*(1+2*random()),80*(1+2*random()),80*(1+2*random())];

    this.Cs=[255,255,255];
    this.estado=0;
    this.C2=255*(this.estado+1)/(2*max_connections+1);
    this.conectadas=0;

    this.parent=0;


    this.CONNECT=[];



  }

  deactivate(){
    if(this.estado>0){
      this.estado=0;
    this.C2=255*(this.conectadas+this.CONNECT.length+1)/(2*max_connections+1);
    this.Cs=255*((max_connections-i+1)/(max_connections+1));
    for(var i =0;i<this.CONNECT.length;i++){
      this.CONNECT[i].deactivate();
    }
  }

  }

  activate(n){
      if(this.estado==0 & n>0){
        this.estado=n;
    this.C2=[255*(n+1)/(max_D),0,0];
    this.Cs=[155*(n+1)/(max_D)+50*cos(n*time),255-255*(n+1)/(max_D),127+127*sin(n*time)];


    for(var i =0;i<this.CONNECT.length;i++){
      this.CONNECT[i].activate(n-1);
    }


  }
  }



  nearest(A){
    var Nearest;
    var dN = W*H; //aleatorio
    for (var i =0;i<A.length;i++){
      if(distancia(A[i],this)<dN & A[i]!=this){
        dN=distancia(A[i],this);
        Nearest=A[i];
      }

    }
    return Nearest;
  }


  existe_conexion(n){
    var ex =false;
    for(var i =0;i<this.CONNECT.length;i++){
      if(this.CONNECT[i]==n){
        ex=true;
        break;
      }
    }
    return ex;
  }


  add_connection(n){
    if(this.existe_conexion(n)==false & this.CONNECT.length<=max_connections & n.conectadas <max_connections){
    this.CONNECT[this.CONNECT.length]=n;
    n.conectadas++;


    if(n.estado>0){this.activate(n.estado-1);}
    else{
    n.C2=255*(n.conectadas+n.CONNECT.length+1)/(2*max_connections+1);
    }
    if(this.estado>0){n.activate(this.estado-1);}

    }

  }

flip(){

  if(this.estado==0){this.activate(max_D);}
  else{this.deactivate();}
}





  paint(){

    strokeWeight(2);



    if(mouseIsPressed){
      if(sqrt((mouseX-this.X)**2+(mouseY-this.Y)**2)<=this.R)
      {

      }



    }
    this.add_connection(this.nearest(NEURONS));


    for(var i =0;i<this.CONNECT.length;i++){
      if(this.CONNECT[i].estado>0){this.activate(this.CONNECT[i].estado-1)}
      stroke(255*((max_connections-i+1)/(max_connections+1)));
      if(this.estado>0){stroke(this.Cs);}
    line(this.X,this.Y,this.CONNECT[i].X,this.CONNECT[i].Y);
    }


    noStroke();



    fill(this.C2);
    circle(this.X,this.Y,this.R);


    var amp=sin(time*0.1);
    this.X=this.X+randomGaussian(0,amp*abs(sin(time*0.05)));
    this.Y=this.Y+randomGaussian(0,amp*abs(sin(time*0.05)));
    if(this.X<0){this.X=0;}
    if(this.Y<0){this.Y=0;}
    if(this.X>W){this.X=W;}
    if(this.Y>H){this.Y=H;}

  }


}

function distancia(a,b){return sqrt((a.X-b.X)**2+(a.Y-b.Y)**2);}


function choca(n){
  var clash = false;
  for(var i = 0;i<NEURONS.length;i++){
    if(distancia(n,NEURONS[i])<=(n.R+NEURONS[i].R)){
      clash = true;
    }
  }
  return clash;


}






function setup(){
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);
  for (var i =0;i<n_neurons;i++){
    var f = false;
    let nn;
    while (f==false){
      var new_n=new neuron(random()*W,random()*H);
      if(choca(new_n)==false){
        f=true;
        nn=new_n;
      }
    }
    NEURONS[i]=nn;

    if(choca(new_n)){}
  }


}

function mouseClicked(){
  for (var i =0;i<NEURONS.length;i++){
    if(sqrt((mouseX-NEURONS[i].X)**2+(mouseY-NEURONS[i].Y)**2)<=NEURONS[i].R){
      NEURONS[i].flip();
      break;
    }


  }



}




function draw(){
  background(0);
  for (var i =0;i<n_neurons;i++){
    NEURONS[i].paint();
  }
dt=map(mouseX,0,W,-0.5,0.5)
time=time+dt;
}
