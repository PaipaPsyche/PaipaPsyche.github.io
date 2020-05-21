
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

    this.images = {}

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

      for (let y = 0; y < this.H; y++) {
        // let distance = dist(this.W / 2, this.H / 2, x, y);
        var value1 = noise(xoff,yoff);
        var value2 = noise(3*xoff+100,3*yoff+100);
        var value3 = noise(4*xoff+200,4*yoff+200);

        this.MAPA[x][y] = value1;
        //this.PUNTOS_INTERES={};
        yoff+=scaleY;
      }
      xoff+=scaleX;


    }
    this.asignar_recursos()

}

  asignar_recursos(){
    var xoff=int(random()*20);

    for (let x = 0; x < this.W; x++) {
      var yoff=0;
      this.M_petro[x] = [];
      this.M_food[x]=[];
      for (let y = 0; y < this.H; y++) {
        // let distance = dist(this.W / 2, this.H / 2, x, y);
        var value2 = noise(3*xoff+100,3*yoff+100);
        var value3 = noise(4*xoff+200,4*yoff+200);
        this.M_petro[x][y] = value2>thresholdr?1:0;
        this.M_food[x][y] = value3>thresholdf?1:0;
        //this.PUNTOS_INTERES={};
        yoff+=scaleY;
      }
      xoff+=scaleX;


    }
  }

  asignar_mapas(){

    let suma_tierra=0;

    let lower =[0,0,1];
    let higher=[0,0,0];

    let add_marks=[];
    let max_marks=(2+random([1,2,3]))-MARCAS.length;

    let beaches = [];
    let mountains = [];

    for(var y=0;y<this.H;y++){

      for(var x=0;x<this.W;x++){
        var tipo = 0;
        var in_range_mark = (x<(this.W-50) && x>(50) && y<(this.H-30) && y>H_chart)?1:0;

        var value = this.MAPA[x][y];
        if(value>threshold1){
          tipo=1;
        }
        if(value>threshold2){
          tipo=2;
        }
        if(value>threshold3){
          tipo=3;
        }
        if(value<0.95*threshold1){
          tipo=-1;
        }
        if(value<0.7*threshold1){
          tipo=-2;
        }
        if(value<0.4*threshold1){
          tipo=-3;
        }

        if(random()<2E-5 && random()<0.12  && add_marks.length<max_marks && in_range_mark==1 && tipo!=0){
          add_marks.push([x,y,value,tipo]);
        }



        if(value>higher[2] && in_range_mark==1){
          higher = [x,y,value,tipo];
        }
        if(value<lower[2] && in_range_mark==1){
          lower = [x,y,value,tipo];
        }
        this.M_tipos[x][y]=tipo;


        let es_tierra;
        es_tierra=tipo>0?1:0;

        this.M_tierra[x][y]=es_tierra;
        suma_tierra=suma_tierra+es_tierra;


        this.M_montana[x][y]=tipo==2?1:0;




      }
    }

    if(MARCAS.length==0){
      MARCAS.push(new markpoint(lower[0],lower[1],lower[2],lower[3]))
      MARCAS.push(new markpoint(higher[0],higher[1],higher[2],higher[3]))
      MARCAS[1].desc = "Highest point"
      MARCAS[0].desc = "Lowest point"
      for(let mark of add_marks){
        MARCAS.push(new markpoint(mark[0],mark[1],mark[2],mark[3]))
      }
    }


    //console.log(suma_tierra,(this.W*this.H),suma_tierra/(this.W*this.H));
    this.DIFF= suma_tierra/(this.W*this.H);

    this.crear_imagenes()



  }

  change_era(){
    if(era==0){
      thresholdf = 0.66
      thresholdr = 0.66

    }
    if(era==1){
      thresholdf = 0.72
      thresholdr = 0.72
    }
    if(era==2){
      thresholdf = 0.69
      thresholdr = 0.69
    }
    console.log(thresholdf,thresholdr)
    this.asignar_recursos()
    this.asignar_mapas()
  }




  crear_imagenes(){
    for(let pc = 0;pc<=3;pc++){
      let img = createImage(this.W,this.H);
      img.loadPixels();

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
          else if(tipo ==3){
          rgba = [255-value*80,255-value*80,255-value*80,255-value*80];
          }
          else if(tipo ==-3){
          rgba = [0,0,80,255];
          }
          else if(tipo ==-1){
          rgba = [0,20,150,255];
          }
          else if(tipo ==-2){
          rgba = [0,0,120,255];
          }




          if(pc == 1){
            if(this.M_petro[x][y]>thresholdr){

              if(tipo>0){
                rgba=[0,0,0,120];
              }
              else{
                rgba=[10,180,120,120];
              }
            }
          }
          if(pc == 2){
            if(this.M_food[x][y]>thresholdf){
              if(tipo>0){
                rgba=[150,20,100,120];
              }
              else{
                rgba=[50,120,100,120];
              }

            }
          }
          if(pc == 3){
            let r,g,b;

              if(this.M_tipos[x][y]>0){
                r = int(map(this.MAPA[x][y],0.5,0.7,0,185));
                g = this.MAPA[x][y]>0.72?30+int(this.MAPA[x][y]*35):150+int(this.MAPA[x][y]*55);
                b = int(map(this.MAPA[x][y],0.5,1,0,80));


                //console.log(r,g,b);

  } else {
                r = 0;
                g = int(10+150*this.MAPA[x][y]);
                b = int(10+400*this.MAPA[x][y]);
              }
                r=r-r%15;
                g=g-g%15;
                b=b-b%15;
                rgba=[r,g,b,255];

          }

          img.set(x, y, color(rgba[0], rgba[1], rgba[2],rgba[3]));
          // pixels[index+0]=rgba[0];
          // pixels[index+1]=rgba[1];
          // pixels[index+2]=rgba[2];
          // pixels[index+3]=rgba[3];

        }

      }
      img.updatePixels();
      this.images[pc] = img;
    }





  }



    pintar(){

      image(this.images[pintar_rec],0,0);
    }





}
