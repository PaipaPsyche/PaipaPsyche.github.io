
class mapa{
  constructor(w, h  ){

    this.W = w;
    this.H = h;

    this.MAPA = [];
    this.M_tipos = [];
    this.M_tierra = [];
    this.M_montana = [];
    this.M_petro = [];
    this.M_food = [];

    this.crear_mapas();

    this.asignar_mapas();







  }

  crear_mapas(){
    var xoff=0;
    for (let x = 0; x < this.W; x++) {
      var yoff=0;
      this.MAPA[x] = []; // create nested array
      this.M_tipos[x] = [];
      this.M_tierra[x] = [];
      this.M_montana[x] = [];
      this.M_petro[x] = [];
      this.M_food[x]=[];
      for (let y = 0; y < this.H; y++) {
        // let distance = dist(this.W / 2, this.H / 2, x, y);
        var value1 = noise(xoff,yoff);
        var value2 = noise(2*xoff+100,2*yoff+100);
        var value3 = noise(5*xoff+200,5*yoff+200);
        this.M_petro[x][y] = value2;
        this.M_food[x][y] = value3;
        this.MAPA[x][y] = value1;
        yoff+=scaleY;
      }
      xoff+=scaleX;


    }

}

  asignar_mapas(){

    for(var y=0;y<this.H;y++){

      for(var x=0;x<this.W;x++){
        var tipo = 0;

        var value = this.MAPA[x][y];
        if(value>threshold1){
          tipo=1;
        }
        if(value>threshold2){
          tipo=2;
        }
        if(value<0.9*threshold1){
          tipo=-1;
        }
        if(value<0.7*threshold1){
          tipo=-2;
        }
        this.M_tipos[x][y]=tipo;
        this.M_tierra[x][y]=tipo>0?1:0;
        this.M_montana[x][y]=tipo==2?1:0;




      }
    }



  }




    pintar(){

      loadPixels();

      for(var y=0;y<this.H;y++){
        for(var x=0;x<this.W;x++){
          var rgba = [];
          var value = this.MAPA[x][y];
          var index = 4*(x+y*this.W);
          var tipo = this.M_tipos[x][y];
          if(tipo ==0){
          rgba = [0,50,200,255];
          }
          else if(tipo ==1){
          rgba = [35,124,39,255];
          }
          else if(tipo ==2){
          rgba = [80+value*80,80,0,255];
          }
          else if(tipo ==-1){
          rgba = [0,20,150,255];
          }
          else if(tipo ==-2){
          rgba = [0,0,120,255];
          }

          if(pintar_rec == 1){
            if(this.M_petro[x][y]>thresholdr){
              rgba=[0,0,0,30*sin(T)+200];
            }
          }
          if(pintar_rec == 2){
            if(this.M_food[x][y]>thresholdf){
              if(tipo>0){
                rgba=[150,20,100,50*sin(T)+200];
              }
              else{
                rgba=[50,120,100,50*sin(T)+200];
              }

            }
          }


          pixels[index+0]=rgba[0];
          pixels[index+1]=rgba[1];
          pixels[index+2]=rgba[2];
          pixels[index+3]=rgba[3];

        }

      }
      updatePixels();
    }





}
