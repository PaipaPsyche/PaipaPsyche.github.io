
class mapa{
  constructor(w, h  ){

    this.W = w;
    this.H = h;

    this.DIFF=0;

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
        var value2 = noise(3*xoff+100,3*yoff+100);
        var value3 = noise(4*xoff+200,4*yoff+200);
        this.M_petro[x][y] = value2>thresholdr?1:0;
        this.M_food[x][y] = value3>thresholdf?1:0;
        this.MAPA[x][y] = value1;
        //this.PUNTOS_INTERES={};
        yoff+=scaleY;
      }
      xoff+=scaleX;


    }

}

  asignar_mapas(){

    let suma_tierra=0;

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
        if(value<0.95*threshold1){
          tipo=-1;
        }
        if(value<0.7*threshold1){
          tipo=-2;
        }
        this.M_tipos[x][y]=tipo;


        let es_tierra;
        es_tierra=tipo>0?1:0;

        this.M_tierra[x][y]=es_tierra;
        suma_tierra=suma_tierra+es_tierra;


        this.M_montana[x][y]=tipo==2?1:0;




      }
    }
    //console.log(suma_tierra,(this.W*this.H),suma_tierra/(this.W*this.H));
    this.DIFF= suma_tierra/(this.W*this.H);



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
          if(pintar_rec == 3){
            let r,g,b;

              if(this.M_tipos[x][y]>0){
                r = int(map(this.MAPA[x][y],0.5,0.7,0,255));
                g = 150+int(this.MAPA[x][y]*55);
                b = int(map(this.MAPA[x][y],0.5,1,0,50));


                //console.log(r,g,b);


              }
              else{

                r = 0;
                g = int(10+150*this.MAPA[x][y]);
                b = int(10+400*this.MAPA[x][y]);
              }
                r=r-r%15;
                g=g-g%15;
                b=b-b%15;
                rgba=[r,g,b,255];

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
