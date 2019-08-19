new p5();

var W;
var H;
var CHASERS = [];
var n_chasers = 400;
var mode = "loop";
var chasing  ="pos";
var n_hist= 200;
var min_r =0;
var dr = 25;

var maxd= 0;

class chaser{
  constructor(mass,genes){
    this.OM = min_r+random(dr);
    this.M = this.OM;
    this.GENES = [randomGaussian(0,0.02),randomGaussian(0,0.02),
    randomGaussian(0,0.1),randomGaussian(0,0.1)];
    this.init=floor(random(2));
    this.X = 0;
    this.Y = 0;
    this.T = floor(random(6));
    }


    abs_genes(){
      let newG = [];
      for(let i =0;i<this.GENES.length;i++){
        newG[i]=-abs(this.GENES[i]);
      }
      this.GENES = newG;
    }
    bivalent_genes(){
      let newG = [];
      for(let i =0;i<this.GENES.length;i++){
        if(random()>0.5){newG[i]=-this.GENES[i];}
        else{newG[i]=this.GENES[i];}

      }
      this.GENES = newG;

    }

    random_T(){
      this.T=floor(random(6));
    }

    distance_to(oth){
      return sqrt((this.X-oth.X)**2+(this.Y-oth.Y)**2)
    }

    min_dist(OTHERS){
      let distances = 1000;
        for(let i = 0;i<OTHERS.length;i++){

          if(OTHERS[i] != this & this.distance_to(OTHERS[i])<distances){
            distances=this.distance_to(OTHERS[i]);
          }

        }
      return distances;
    }
    max_dist(OTHERS){
      let distances = 0;
        for(let i = 0;i<OTHERS.length;i++){

          if(OTHERS[i] != this & this.distance_to(OTHERS[i])>distances){
            distances=this.distance_to(OTHERS[i]);
          }

        }
      return distances;
    }

    mean_dist(OTHERS){
    let distances = 0;
      for(let i = 0;i<OTHERS.length;i++){

        if(OTHERS[i] != this){
        distances=distances+this.distance_to(OTHERS[i])
        }

      }
      return distances/(OTHERS.length-1)


    }

    dist_mouse(){
      return [this.X-(mouseX-W/2),this.Y-(mouseY-H/2)]
    }

    move(){

      let distances = this.dist_mouse()
      let dx=0;
      let dy=0;

      if(chasing=="chase"){
        dx = min(-0.02,this.GENES[0])*distances[0]+this.GENES[2]
        dy = min(-0.02,this.GENES[1])*distances[1]+this.GENES[3]
      }
      if(chasing=="pos"){
        dx = this.GENES[0]*(mouseX-W/2)+this.GENES[2]
        dy = this.GENES[1]*(mouseY-H/2)+this.GENES[3]

      }


      let newposx = this.X + dx
      let newposy = this.Y + dy

      if(mode =="loop"){
      if(newposx<-W/2){newposx = W - newposx}
      if(newposy<-H/2){newposy = H - newposy}
      if(newposx>W/2){newposx = -W + newposx}
      if(newposy>H/2){newposy = -H + newposy}
    }
      if(mode == "border"){
      if(newposx<-W/2){newposx = -W/2}
      if(newposy<-H/2){newposy = -H/2}
      if(newposx>W/2){newposx = W/2}
      if(newposy>H/2){newposy = H/2}
    }
      this.X = newposx;
      this.Y = newposy;
    }

    paint(){
      push();
      translate(W/2,H/2);
      // if(this.mean_dist(CHASERS)>maxd){
      // maxd=this.mean_dist(CHASERS)
      // console.log(maxd);
      // }

      let mean  =this.mean_dist(CHASERS);
      let maxx = this.max_dist(CHASERS);
      let minn = this.min_dist(CHASERS);


      if(this.T==0){
        fill(255*abs(this.init-mean/1000),255*abs(this.init-minn/100),255*abs(this.init-maxx/1000))
      }
      if(this.T==1){
        fill(255*abs(this.init-mean/1000),255*abs(this.init-maxx/1000),255*abs(this.init-minn/100))
      }

      if(this.T==2){
        fill(255*abs(this.init-maxx/1000),255*abs(this.init-minn/100),255*abs(this.init-mean/1000))
      }
      if(this.T==3){
        fill(255*abs(this.init-maxx/1000),255*abs(this.init-mean/1000),255*abs(this.init-minn/100))
      }

      if(this.T==4){
        fill(255*abs(this.init-minn/100),255*abs(this.init-maxx/1000),255*abs(this.init-mean/1000))
      }
      if(this.T==5){
        fill(255*abs(this.init-minn/100),255*abs(this.init-mean/1000),255*abs(this.init-maxx/1000))
      }

      noStroke();
      circle(this.X,this.Y,this.M);
      pop();
      this.M=max(min(this.M+dr*0.05*(0.5-this.min_dist(CHASERS)/20),this.OM),min_r)


    }







}

function abs_chasers(){
  for(let i = 0;i<CHASERS.length;i++){
    CHASERS[i].abs_genes();
  }
}

function bivalent_chasers(){
  for(let i = 0;i<CHASERS.length;i++){
    CHASERS[i].bivalent_genes();
  }

}



function mouseClicked(){
  if(mode=="border"){mode="loop";}
  else{mode="border"}
  if(chasing=="chase"){chasing="pos";bivalent_chasers();}
  else{chasing="chase";abs_chasers();}

  for(let i = 0;i<CHASERS.length;i++){
    CHASERS[i].random_T();
  }
}


function setup(){
  H = windowHeight;
  W = windowWidth;
  createCanvas(W,H);
  for(var i=0;i<n_chasers;i++){
    CHASERS[i]=new chaser();
  }


}


var prev  = 0;
function draw(){
background(prev);
let new_b = 0;
let tot_m = 0;
let max_m = 0;
let visib = 0;
for(var i=0;i<CHASERS.length;i++){
  CHASERS[i].move();
  CHASERS[i].paint();
  new_b = new_b+CHASERS[i].mean_dist(CHASERS);
  tot_m = tot_m+CHASERS[i].M;
  max_m = tot_m+CHASERS[i].OM;
  if(CHASERS[i].M>min_r){visib=visib+1;}
}
prev = max(255*(1-new_b/(500*CHASERS.length)),0)
fill(255,0,0)
text("FOCUS DENSITY",20,20)
text((prev/255).toFixed(2),200,20)
text("MASS MEAN DENSITY",20,40)
text((abs(2*tot_m/(CHASERS.length*(min_r+dr)) -0.01)).toFixed(2),200,40)
text("EXISTENCE RATIO",20,60)
text((abs(visib/CHASERS.length)).toFixed(2),200,60)
}
