new p5();
var W;
var H;
var n_neurons=1250;
var NEURONS=[];


var time = 1+10*random();
var dt = 0.15;

var max_connections=1+floor(15*random());
var max_D=5+floor(65*random());

var varA = random()*0.2;
var varB = randomGaussian(varA,0.2);

var activated = 0;

var non_filled = 1;





function amplitudPulso(){
  return abs(sin(time*varA)*exp(-0.001*time)*cos(time*varB));
}



class neuron{
  constructor(x,y){
    this.X = x;
    this.Y = y;
    this.R = 2+floor(random()*4);
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
      if(n>this.estado){
        this.estado=n;
    this.C2=[255*(n+1)/(max_D),80*(1+sin(n*time+1)),255-255*(n+1)/(max_D)];
    this.Cs=[155*(n+1)/(max_D)+50*cos(n*time),255-255*(n+1)/(max_D),20+100*(1+sin(n*time))];


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

    strokeWeight(1.5);
    var osc = amplitudPulso()*(1+sin(0.5*(0.5*this.estado+1)*time*(varA+varB)));
    if(this.estado>0){strokeWeight(1+osc);}


    this.add_connection(this.nearest(NEURONS));


    for(var i =0;i<this.CONNECT.length;i++){
      if(this.CONNECT[i].estado>0){this.activate(this.CONNECT[i].estado-1)}
      stroke(255*((max_connections-i+1)/(max_connections+1)));
      if(this.estado>0){stroke(this.Cs);}
    line(this.X,this.Y,this.CONNECT[i].X,this.CONNECT[i].Y);
    }






    fill(this.C2);


    strokeWeight(1);

    stroke(100*osc);

    circle(this.X,this.Y,this.R*(1+osc/8));
        noStroke();

    var amp =amplitudPulso();
    this.X=this.X+non_filled*randomGaussian(0,amp*abs(sin(time*0.5)));
    this.Y=this.Y+non_filled*randomGaussian(0,amp*abs(sin(time*0.5)));
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

  }


}


function filled(){
  activas=0;
  for (var i =0;i<NEURONS.length;i++){
    if(NEURONS[i].estado>0){activas++;}
  }
  activated=activas;
  if(activated == NEURONS.length){non_filled=0;}
  else{non_filled=1;}
}



function mouseClicked(){
  for (var i =0;i<NEURONS.length;i++){
    if(sqrt((mouseX-NEURONS[i].X)**2+(mouseY-NEURONS[i].Y)**2)<=1.5*NEURONS[i].R){
      NEURONS[i].flip();
      NEURONS[i].parent=1;
      break;
    }


  }



}




function draw(){

  background(0);
  //background(155*(activated/NEURONS.length)*(1+amplitudPulso()));
  total=0
  for (var i =0;i<n_neurons;i++){
    NEURONS[i].paint();
    if(NEURONS[i].estado>0){total++;}
  }
  filled();

  // if(total-n_neurons ==0){dt=0;}
//dt=map(mouseX,0,W,-1.5,1.5)
time=time+dt;
}
