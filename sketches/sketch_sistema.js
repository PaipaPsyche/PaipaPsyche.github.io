
new p5();
let W = windowWidth;
let H = windowHeight;


let T = random()*2000;
let dT=0.0001 ;
let c;

let pPlaneta =0.6;
let pInv=0.004;
let Nmoons=3;
let pAnillo = 0.3;
let pNum = 0.3;
let pHered = 0.1;
let long_name = 3;
let pCiv=0.25;
let pEat=0.0007;
let nStars;



let Pobs="";

let STARS=[];
let BUTTONS=[];

let timeS;

let c_prev  = "";



let ELEMS={"Helio":[25,10],"Agua":[30,20],"Aluminio":[20,25],"Hidrogeno":[10,8],"Manganeso":[2,1],"Fosforo":[5,4],"Titanio":[8,5],"Oro":[2,1],"Platino":[2,1],"Yodo":[4,1],"Sodio":[10,8],"Potasio":[10,5],"Cloro":[20,20],"Calcio":[15,10],"Plomo":[2,0.2],"Uranio":[0.5,0.4],"Carbono":[20,10],"Nitrogeno":[9,5],"Silicio":[30,25],"Oxigeno":[40,30],"Azufre":[2,2],"Magnesio":[10,10],"Selenio":[20,10],"Boro":[5,2],"Hierro":[40,30],"Litio":[20,12]}
let elems= Object.keys(ELEMS);


let SILABAS =["pl","v","s","ph","pr","d","sh","z","h","n","str","gr","br",
              "tr","f","dr","ch","k","z","cl",
              "fr","y","k","c","tr","cr","gl","t","p","b","m","g","l","r"];

let ENDINGS=["rys","llus","shiba","ndi","rsei","cury","rth","rte","scus","nte",
            "","rn","ptuno","rno","rano","sto","lgia","nz","lcani","rd","nucci",
              "tina","ngo","gnikai","ccini","cordia","loide","maritano","rineris",
              "lypso","lkanti","ntico","dici","tafar","nica","nyx","nsk","lucci",
              "bino","nita","tana","mble","ptera","bdis","scylla","dore","loch","ntos",
              "schen","klich","nich","niakea","stans","varius","leaux","kour","nse","reau",
              "leau","ngria","nakea","lax","nax","nds","ngis","nt","reen","nax","max","lax",
              "sis","tät","rok","fari","tanari","gneko","gana","vyr","nys","ghal","tto",
              "mander","rgen","nde","nt","ngs","ruchen","ska","pyr","pton","nge","xy","xion",
              "nimedae","rga","stin","nge","ngi","lton","stralis","hr","keshi","phorus",
              "toris","rly","quila","stein","mark","burg","rtz","lf","rov","rnov","tröen","land",
              "tch","rmir","rsay","ght","mpton","koft","nst","mst","ft","gs","nk","ntic","ntis","phoros",
              "mp","lish","pture","nger","lette","tion","zung","schaft","ncia","sta","smus",
              "nginus","rnet","ster","star","ridas","ston","tani","ton","nata","sky","nov","rys",
              "riana","berg","ton","tron","rinae","stro","ris","nksy","kov","rok","gnar"," nde","lsar"];


let VOCALES = ["ua","ia","a","e","i","o","u","a","e","i","o","u","ae","ie","oa","io"]//,"ee","oo"];
let GREEK=["Alpha","Epsilon","Nega","Proxima","Magna","Ultima","Central","Prima","Majora",
            "Minora","Nova","Eta","Lambda","Tau","Beta","Gamma","Delta","Omicron","Omega",
            "Ypsilon","Ultra","Phi","Sigma","Zion","Nova"];
let SCALES=[" millones de"," billones de"," trillones de","",""]
let CIVENDINGS=["riana","siana","niana","na","rgiana","bina","nita","lita","miana","liana","nica","nicoide","micode",
                "nte","","giana","tiana","noide","loide","quiana","diana","nsiana","viana","mana","manoide","soide",
                "sdiana","ndina","laria"];
let ROMNUM=["-A","-B","-C","-D","-I","-II","-III","-IV","-V","-X","-Y","-Z"];

class random_name{
  constructor(n,end=true){
    let txt ="";
    for(let i =0;i<n-1;i++){

      txt=txt+SILABAS[floor(random()*SILABAS.length)]+VOCALES[floor(random()*VOCALES.length)];
      if(random()<0.2 & i<(n-3)){txt=txt+"-";}
    }
    if(end & random()<0.8 & txt.split("").length<=6){
      txt=txt+ENDINGS[floor(random()*ENDINGS.length)];


    }
    this.TXT=txt;

  }

}


class button{
  constructor(x,y,txt,c,f){

    this.X=x;
    this.Y=y;
    this.T=txt;
    this.R=20;
    this.C=c;
    this.F=f;
  }
  clickInRange(){
    if(mouseIsPressed  & sqrt((this.X-mouseX)**2+(this.Y-mouseY)**2)<=1.5*this.R){

      return true;

    }
    else{


      return false;}
  }

  act(){
    if(this.F ==0){setsystem();}
    else if(this.F ==1){setprev();}

  }



  paint(){



    if(this.clickInRange()){
      push();
      strokeWeight(2);
      stroke(255);
      textSize(10);
      fill(255);
      circle(this.X,this.Y,this.R+5*sin(170*T));
      fill(0);
      noStroke();


      text(this.T,this.X-textWidth(this.T)/4,this.Y-5 );
      pop();

    }
    else{
      push();
      strokeWeight(2);
      stroke(255);
      textSize(10);
      fill(100+100*sin(140*(T*(this.F+1))),100+100*sin(100*(T+200*this.F)),100+100*sin(80*T));
      circle(this.X,this.Y,this.R);
      fill(255);
      noStroke();
      text(this.T,this.X-textWidth(this.T)/4,this.Y-5);
      pop();


    }




  }

}





class planet{
  constructor(x,y,r,kind="p"){
    this.W=floor(10000*abs(1-2*r/min(W,H))/pow(r,3/2))+1;
    if(random()<pInv){this.W=-this.W;}
    this.X=x;
    this.Y=y;
    this.R=3*r;

    this.pos=0;


    //elementos
    let nelem=5+floor(4*random());
    let phonyelems=elems.slice(0);
    this.elementos=[];
    if(kind=="p"){
      for (let k =0;k<nelem;k++){
        let pick=floor(random()*phonyelems.length);
        let arr = ELEMS[phonyelems[pick]];
        let abund=randomGaussian(arr[1],arr[2]);
        this.elementos[k]=[phonyelems[pick],abs(abund)];
        phonyelems.splice(pick,1);
          }
    }




    this.ATMOS=0.2+1.8*random();


    this.NAME=new random_name(2+floor(random()*long_name)).TXT;

    this.RP= 2+random()*this.R/50;
    this.C =[50+random()*205,50+random()*205,50+random()*205];
    let nmoon=floor(random()*(Nmoons));
    this.MOON=[];
    if(kind=="p"){
      for(let m = 0;m<nmoon;m++){
        this.MOON[m]= new planet(this.X,this.Y,this.RP,kind="m");
        this.MOON[m].MOON=[];
        this.MOON[m].W=1.5*(m+1)*this.W + 4*(2*random()-1);
        this.MOON[m].R= this.MOON[m].R + 6*m**2;
        this.MOON[m].RING=0;
        this.MOON[m].NAME="";
      }
    }
    this.RING = 0;
    this.CIVI=0;
    this.RUINA=0;
    if(random()<pAnillo*this.RP){this.RING=1};

    this.falling=0;

  }
  setXY(x,y){
    this.X=x;
    this.Y=y;

  }
  inRange(xx,yy){
    let val_inicial=0.9+this.falling*0.08*sin(80*T)*cos(49*T);

    let mx=val_inicial;
    let my=val_inicial;
    if(W<H){
      my=2-my;
    }
    else if(H<W){
      mx=2-mx;
    }

    let x = this.X+mx*this.R*cos(this.W*T)//-0.4*this.R;
    let y = this.Y+my*this.R*sin(this.W*T);
    if(sqrt((x-xx)**2+(y-yy)**2)<=max(30,2*this.RP)){
      return true;
    }
    else{return false;}

  }




  paint(){
    stroke(0);


    let val_inicial=0.9+this.falling*0.08*sin(80*T)*cos(49*T);

    let mx=val_inicial;
    let my=val_inicial;
    if(W<H){
      my=2-my;
    }
    else if(H<W){
      mx=2-mx;
    }


    let x = this.X+mx*this.R*cos(this.W*T)//-0.4*this.R;
    let y = this.Y+my*this.R*sin(this.W*T);
    if(this.falling==1){
      this.R = max(0,this.R-150/this.R*abs(dT));
      this.W=this.W+0.005*dT;




      //this.W=this.W*1.002;
    }






    for(let m = 0;m<this.MOON.length;m++){
      this.MOON[m].setXY(x,y);
      this.MOON[m].paint();



    }




    fill(this.C);
    circle(x,y,this.RP);


    stroke(255);
    strokeWeight(0.5);
    textSize(12);
    fill(255);
    if(this.CIVI==1){
      fill(0,255,0);
      stroke(0);
    }
    if(this.falling==1){
      fill(255,0,0);
      if(random()<15/(this.R)){
        stroke(230);
        line(x+this.RP,y,W/2+0.5*this.RP,H/2);
        stroke(220+20*sin(7*T),0,0);
        line(x,y+this.RP,W/2,H/2+0.5*this.RP);
        stroke(255,220+20*sin(8*T),0);
        line(x-this.RP,y,W/2-0.5*this.RP,H/2);
        stroke(255,0,0)
        line(x,y-this.RP,W/2,H/2-0.5*this.RP);
        stroke(0);
      }

      fill(255,250*floor(2*random()),0);
      circle(x+this.R*random()*0.05*this.RP*cos(random()*T),y+this.R*0.05*random()*this.RP*sin(random()*T),230*random()*this.RP/(this.R+1));
      circle(x+this.R*random()*0.05*this.RP*cos(random()*T),y+this.R*0.05*random()*this.RP*sin(random()*T),230*random()*this.RP/(this.R+1));
      fill(255,0,0);
      stroke(0);

    }
    noStroke();
    if(this.inRange(mouseX,mouseY)){
    fill(0,100,255);
  }
  text(this.NAME,x-textWidth(this.NAME)/2,y-4*this.RP);


    stroke(0);

    if(this.RING==1){

    stroke(220);
    fill(255);
    strokeWeight(1.2);
    line(x-1.8*this.RP,y-1.8*this.RP,x+1.8*this.RP,y+1.8*this.RP);
    stroke(0);
  }


  }


}





class system{
  constructor(nP,r){

    this.DR = r/(nP+1)+4;
    this.PLANETS = [];
    this.NAME=new random_name(2+floor(random()*long_name)).TXT;
    this.Tciv=0;

    this.stars=[];

    this.Rsun=this.DR*(random());
    this.Wsun=80+50*random();
    this.Dtierra=floor(random()*10000);
    this.scales=SCALES[floor(random()*SCALES.length)];

    this.Tsun=floor(random()*3);
    this.TXTsun="";

    if(this.Rsun > 15 & random()<0.3){
      this.Tsun=3;
      this.TXTsun="Agujero Negro";
    }


    this.DYS=0;
    this.CIV=[];
    this.Tciv=0;
    this.nameciv="";

    let contador = 0;
    for(let p = 0;p<nP;p++){
      if((random()<pPlaneta | (p==(nP-1) & contador ==0 )) & contador <=8){

      this.PLANETS[contador]=new planet(W/2,H/2,this.DR*(p+1));
      this.PLANETS[contador].pos=contador;
      if(random()<pHered & this.PLANETS[contador].NAME.split("").length<=8 & this.NAME.split("").length<=8){ this.PLANETS[contador].NAME=this.NAME.slice(0,4)+this.PLANETS[contador].NAME.slice(4);}
      else if(random()<pNum){ this.PLANETS[contador].NAME=this.NAME+"-"+(contador+1);}
      else if (random()<pCiv & p>0.2*nP & p<0.5*nP & this.CIV.length<1){
        this.CIV[0]=this.PLANETS[contador];
        this.PLANETS[contador].CIVI=1;

        if(random()<0.05){this.Tciv=3}
        else if(random()<0.1){this.Tciv=2}
        else if(random()<0.25){this.Tciv=1}
        if(this.Tciv>0){
          this.DYS=1;
        }

        let sp=this.CIV[0].NAME.split("-")[0].split("");
        this.nameciv="";
        for(let nn =0;nn< min(sp.length,4+floor(random()*3));nn++){
          this.nameciv=this.nameciv+sp[nn];
        }
        this.nameciv=this.nameciv+VOCALES[floor(random()*VOCALES.length)]
        if(this.nameciv.length<=6){this.nameciv=this.nameciv+CIVENDINGS[floor(random()*CIVENDINGS.length)];}//;
        if(random()<0.1){
          let nname=new random_name(2,false);
          this.nameciv=nname.TXT+CIVENDINGS[floor(random()*CIVENDINGS.length)];
        }
      }
      if(this.PLANETS[contador].CIVI==0 & 3*random()<pCiv){
        this.PLANETS[contador].RUINA=1;

      }
      if (contador/nP < 0.5){this.PLANETS[contador].RING=0;}
      contador=contador+1;

      }
    }
    if(random()<0.3){this.NAME=GREEK[floor(random()*GREEK.length)]+"-"+this.NAME}
    if(random()<0.55 & this.NAME.split("").length<=2*(long_name+1) ){this.NAME=this.NAME+ROMNUM[floor(random()*ROMNUM.length)]}


    if(this.Tsun==1 & this.Rsun<=12 & this.Rsun>9){this.TXTsun="Enana blanca";}
    else if(this.Tsun==1 & this.Rsun<9){this.TXTsun="Estrella de neutrones";}
    else if(this.Tsun==1 & this.Rsun>12 ){this.TXTsun="Gigante Azul";}
    else if(this.Tsun==0 & this.Rsun>=12 ){this.TXTsun="Gigante roja";}
    else if(this.Tsun==0 & this.Rsun<12){this.TXTsun="Estrella Joven";}
    else if(this.Tsun==2 &  this.Rsun<6){this.TXTsun="Estrella pequeña";}
    else if(this.Tsun==2 &  this.Rsun>=6){this.TXTsun="Estrella Mediana";}



  }

  paint(){



  let dOrb =0.5;
  if(this.Wsun <=100){dOrb=-dOrb;}
  let mx=0;
  let my=0;
  if(W<H){
    my=dOrb;
  }
  else if(H<W){
    mx=dOrb;
  }




    let Xcenter=W/2  - mx*this.Rsun;
    let Ycenter=H/2 - my*this.Rsun;


    stroke(0);

    for(let p = 0;p<this.PLANETS.length;p++){
    this.PLANETS[p].paint();

    if(this.PLANETS[p].R < 1.5*this.Rsun){
      fill(255);
      let plan=this.PLANETS[p];
      circle(plan.X+plan.R*cos(plan.W*T),plan.Y+plan.R*sin(plan.W*T),10*plan.RP);
      if(this.CIV[0] == plan){
        this.CIV=[];
        this.nameciv="";
      }
      if(Pobs!=""){
        if(Pobs.NAME==plan.NAME){
          Pobs="";
        }
      }
      this.PLANETS.splice(p,1);
      this.Rsun=1.35*this.Rsun;



    }
    }
    stroke(0);
    if(this.Tsun ==0 ){fill(230+25*cos(T*7),150+50*sin(T*11),0);}
    else if(this.Tsun==1){fill(150+100*sin(T/3),250,230+20*sin(T/5));}
    else if(this.Tsun==2){fill(255,240,80+70*sin(3*T));}
    else if(this.Tsun==3){
      fill(255,180+40*sin(200*(this.Rsun/12)*T),0);
      circle(Xcenter,Ycenter,1.3*(this.Rsun+0.12*this.DR*sin(this.Wsun*T)));

      fill(0);

      circle(Xcenter,Ycenter,1.2*(this.Rsun+0.1*this.DR*sin(this.Wsun*T)));

      // noFill();
      // strokeWeight(0.3);
      // stroke(255*(1+sin(50000*T))/2);
      // circle(W/2,H/2,1.1*(this.Rsun+0.1*this.DR*sin(this.Wsun*T)))
      // stroke(255*(1+sin(20000*T))/2);
      //   circle(W/2,H/2,1.5*(this.Rsun+0.1*this.DR*sin(this.Wsun*T)))
      // noStroke();

      fill(255,190+30*sin(500*T),0);}



    if(this.Tsun==3 & random()<pEat & this.PLANETS.length>=2){this.PLANETS[0].falling=1;}

    circle(Xcenter,Ycenter,this.Rsun+0.1*this.DR*sin(this.Wsun*T));
    if(this.Tsun==3){
      fill(0);
      circle(Xcenter,Ycenter,0.9*(this.Rsun+0.05*this.DR*sin(4*this.Wsun*T+0.1)));
    }

    let multip=70;
    let distance=1.5+0.3*sin(100*T);
    let Rdis=1;
    if(this.DYS==1){
      let n_dys=5;
      for(let theta=0;theta<360;theta=theta+360/n_dys){
        push();
        fill(155+50*sin(500*T));
        noStroke();
        circle(Xcenter+this.Rsun*distance*sin(theta+multip*T),Ycenter+this.Rsun*distance*cos(theta+multip*T),Rdis);
        circle(Xcenter+this.Rsun*distance*sin(theta+multip*T),Ycenter+this.Rsun*distance*sin(theta+multip*T),Rdis);
        circle(Xcenter+this.Rsun*distance*cos(theta+multip*T),Ycenter-this.Rsun*distance*cos(theta+multip*T),Rdis);
        circle(Xcenter+this.Rsun*distance*cos(theta+multip*T),Ycenter,Rdis);
        circle(Xcenter,Ycenter+this.Rsun*distance*cos(theta+multip*T),Rdis);

      }

    }


    stroke(255);
    strokeWeight(0.5);
    textSize(28);
    fill(255);
    text("Sistema "+this.NAME,20,40);
    textSize(14);

    text("A "+this.Dtierra+this.scales+" años luz de la tierra",20,60);
    if(this.CIV.length==1){

      text("Civilización "+this.nameciv+" presente en "+this.CIV[0].NAME+" ( Tipo "+this.Tciv+")",20,100);
    }
    else{text("No hay civilizaciones en este sistema.",20,100);}
    text("Tipo de estrella : "+this.TXTsun,20,80);
    strokeWeight(1.5);
    line(20,85,300,85);
    strokeWeight(0.5);
    text(this.PLANETS.length+" planetas : ",20,120);
    for(let i = 0;i<this.PLANETS.length;i++){
      textSize(12);
      stroke(255);
       fill(255);
      if(this.PLANETS[i].CIVI==1){noStroke(); fill(0,255,0);}
      if(this.PLANETS[i].falling==1){this.DYS=0;noStroke(),fill(255,20,20);this.PLANETS[i].ATMOS=max(0,(1+1/10000)*this.PLANETS[i].ATMOS) }

      let multip = 0;
      if(this.Tsun ==1){multip=2}
      else if(this.Tsun ==0){multip=0.01}
      else if(this.Tsun ==3){multip=1}
      else if(this.Tsun ==2){multip=0.5}

      let Tsup=this.PLANETS[i].falling*10+40 *multip+min(floor(1000000/(this.PLANETS[i].R**2)-0.01*this.PLANETS[i].R),950)+(this.PLANETS[i].ATMOS-1.1)*40;
      let Tinf=this.PLANETS[i].falling*10-30*multip+max(floor(300000/(this.PLANETS[i].R**2)-0.2*this.PLANETS[i].R),-210)-(this.PLANETS[i].ATMOS-1.1)*40;


      text(this.PLANETS[i].NAME,40,140+i*35);
      textSize(10);
      if(this.PLANETS[i].CIVI==0){fill(0,180,255);}
      noStroke();
      //let long_texto  = max(textWidth("["+floor(Tinf)+"°C   a  "+floor(Tsup)+"°C]"),textWidth(this.PLANETS[i].NAME));
      text("["+floor(min(Tsup,Tinf))+"°C   a  "+floor(max(Tsup,Tinf))+"°C]",40,153+i*35);
      noStroke();
      fill(this.PLANETS[i].C);
      circle(20,142+i*35,this.PLANETS[i].RP);
      if(this.PLANETS[i].RING==1){

      stroke(220);
      fill(255);
      strokeWeight(1.2);
      line(20-1.8*this.PLANETS[i].RP,142+i*35-1.8*this.PLANETS[i].RP,20+1.8*this.PLANETS[i].RP,142+i*35+1.8*this.PLANETS[i].RP);
      stroke(0);
      strokeWeight(0.5);
    }
    }
    stroke(0);



    let xxx=W-450;
    let yyy=40;
    let _=anyRange(mouseX,mouseY);
    if(mouseIsPressed & _!=""){
      Pobs=_;

          //text("g = "+((Pobs.RP**2)/3).toFixed(2)+" m/s2",xxx+120,yyy+40);
          //text("Horas/dia = "+round(30*(Pobs.R/600)*Pobs.NAME.length*0.2+Pobs.MOON.length*10)+" Horas",xxx+120,yyy+60);

      }

    if(Pobs != "" & Pobs!="Sun"){
      push();
      textSize(22);
      stroke(255);
      fill(255);
      text("Planeta ",xxx,yyy);
      fill(Pobs.C);
      strokeWeight(1.5);
      stroke(100+100*sin(50*T));
      if(Pobs.CIVI==1){
        stroke(0,100+100*sin(50*T),0);
      }
      if(Pobs.falling==1){
        stroke(100+100*sin(50*T),0,0);
      }
      text(Pobs.NAME,xxx+textWidth("Planeta "),yyy);
      pop();

      if(Pobs.CIVI==1){
        let add = "";
        if(this.Wsun > 100 & this.Tciv>0 ){add=" de paso";}
        push();
        fill(255);
        stroke(255);
        textSize(15);
        let txtciv="Hogar"+add+ " de la civilización "+this.nameciv;

        text(txtciv,xxx,yyy+25);
        pop();
      }
      if(Pobs.RUINA==1){let txtciv="Ruinas de una antigua civilización desconocida.";text(txtciv,xxx,yyy+25);}

      textSize(14);
      fill(255);
      //text("Abundancia de :",xxx,yyy+45);
      textSize(12);
      for(let k =0;k<Pobs.elementos.length;k++){
        text(Pobs.elementos[k][0]+"  "+(Pobs.elementos[k][1]*(1.5-k/Pobs.elementos.length)).toFixed(2)+"%",xxx,yyy+40+18*k);
      }
      text("g = "+((Pobs.RP**2)/3).toFixed(2)+" m/s2",xxx+120,yyy+40);
      text("Horas/dia = "+round(30*(Pobs.R/600)*Pobs.NAME.length*0.4+Pobs.MOON.length*10)+" Horas",xxx+120,yyy+60);
      let porb=0.8*((5**map(Pobs.W,0,Pobs.W,Pobs.pos/4,-1)+(Pobs.R/200)**3 +Pobs.pos*this.Rsun/2)/2 + 1.5*max(0,(Pobs.pos-3)*this.Rsun*3)).toFixed(1);
      let torb;
      if(porb >1){
        let yr = floor(porb)
        let mnth=  floor(12*(porb-floor(porb)))
        let s_yr = ""
        let s_mt = ""
        if(yr>1){s_yr="s"}
        if(mnth >1){s_mt="es"}
        torb=yr+" año"+s_yr+" y "+mnth+" mes"+s_mt;
      }
      else{
        let mnth = (porb*12).toFixed(0)
        let s_mt = ""
        if(mnth >1){s_mt="es"}
        torb = mnth+ " mes"+s_mt}
      text("P. orbital = "+ torb,xxx+120,yyy+80);
    }
    else if (Pobs=="Sun"){


          push();
          textSize(22);
          stroke(255);
          fill(255);
          text("Sol "+this.NAME,xxx,yyy);

          pop();

          if(this.CIV.length>0){
            let add = "Cuna ";
            if(this.Wsun>100 & this.Tciv>0){add="Colonia ";}
            push();
            fill(255);
            stroke(255);
            textSize(15);

            let txtciv=add+ "de la civilización "+this.nameciv;
            text(txtciv,xxx,yyy+25);
            pop();
          }
          textSize(14);
          fill(255);
          //text("Abundancia de :",xxx,yyy+45);
          textSize(12);
          text("Tipo de estrella : "+this.TXTsun,xxx,yyy+58);
          text("Temperatura (a 1.2 radios Solares) = "+((this.Tsun+1)*this.Rsun*this.Wsun*10).toFixed(0)+" K",xxx,yyy+78);
          text("Radio estelar : "+(10**map(this.Rsun,1,30,-0.5,3.5)*0.00465247).toFixed(3)+" UA ("+(10**map(this.Rsun,1,30,-0.5,3.5)).toFixed(3)+" Rsun)",xxx,yyy+98);
          if(this.DYS>0){text("Esfera de Dyson presente (Civilización "+this.nameciv+")",xxx,yyy+118);}
    }


}
}

function setsystem(){

c_prev=new system( 3, min(W,H)/5 );
c_prev = Object.assign(c_prev,c);

setup();
background(0);


}
function setprev(){

if(c_prev!="" & c!=c_prev){setup(c_prev);}
background(0);


}

function keyPressed() {
  if (keyCode === ENTER) {
    setsystem();


  } else if (keyCode ===BACKSPACE){
    T=0;

  }
  else if(keyCode == SHIFT){
    c.Tsun=3;
    c.TXTsun="Agujero Negro"
  }
  else if(keyCode == CONTROL){
    T=2000*random();
  }
}




  function setup(syst = ""){

    Pobs="";
    elems= Object.keys(ELEMS);

    let buttSet=new button(W-50,H-50,"FIND\nNEXT",[255,0,0],0);
    let buttPrev=new button(50,H-50,"PREV\nSYSTEM",[255,0,0],1);
    //timeS = createAudio('time.mp3');
    //timeS.autoplay(true);

    BUTTONS[0]=buttSet;

    BUTTONS[1]=buttPrev;



    createCanvas(W,H);
    angleMode(DEGREES);
    nStars=floor(500+random()*1000)
    let np =floor(random()*8)+4;
    pNum=(1-((np-3)/3-1)/3)*random();


    // try{
    if(syst==""){c = new system( np, min(W,H)/5 );}
    else{
      c = new system( np, min(W,H)/5 );

      c = Object.assign(c,syst);}

    // }
    // catch(error){
    //   console.log("HEE HEE");
    //   console.log(error);
    //   setsystem();
    // }


      let gal = 0;

      if(random()<0.6){gal=1;}

      for(let s = 0;s<nStars;s++){
        let st = [];
        st[0]=floor(random()*W);
        st[1]=floor(random()*H);
        st[2]=abs(randomGaussian(1.5,1));
        st[3]=[255,255,255];
        if(random()<0.01){st[3]=[180,0,0];}
        if(random()<0.01){st[3]=[0,0,180];}
        if(random()<0.01){st[3]=[180,180,0];}
        if(random()<0.01){st[3]=[180,0,180];}
        STARS[s]=st;




      }
      if(gal==1){
        for(let s = 0;s<floor(1.8*nStars);s++){
          let st = [];

          st[0]=floor(random()*W);
          st[1]=H/2+floor(randomGaussian(0,H/6));
          st[2]=abs(randomGaussian(1.5,0.5));
          st[3]=[255,255,255];
          if(random()<0.01){st[3]=[180,0,0];}
          if(random()<0.01){st[3]=[0,0,180];}
          if(random()<0.01){st[3]=[180,180,0];}
          if(random()<0.01){st[3]=[180,0,180];}

          STARS[nStars+s-1]=st;




        }
    }


  }





function draw(){
  background(0);
  for(let s = 0;s<nStars;s++){
    stroke(STARS[s][3]);
    let rand  = 0;
    if(random()<0.0002){rand=1};
    strokeWeight(max(STARS[s][2]+rand*randomGaussian(),0.1));
    point(STARS[s][0],STARS[s][1]);
    noStroke();

  }
  if(STARS.length > nStars){
    for(let s = nStars;s<STARS.length;s++){

      stroke(STARS[s][3]);
      let rand  = 0;
      if(random()<0.0002){rand=1};
      strokeWeight(max(STARS[s][2]+rand*randomGaussian(),0.1));
      point(STARS[s][0],STARS[s][1]+(STARS[s][0]-W/2)*(nStars-1200)/200);
      noStroke();

    }


  }

  strokeWeight(0.5);

  c.paint();

  for(let b =0;b<BUTTONS.length;b++){
    BUTTONS[b].paint();
  }










  T=T+dT;
  mult=map(mouseY,0,H,3  ,0.01);
  dT = mult * map(mouseX,0,W,0,0.02);

}


function mouseClicked(){
  for(var i =0;i<BUTTONS.length;i++){
    if(sqrt((BUTTONS[i].X-mouseX)**2+(BUTTONS[i].Y-mouseY)**2)<=1.5*BUTTONS[i].R){
      BUTTONS[i].act();
    }
  }

}


function anyRange(xx,yy){
  let ans="";
  for (let i = 0 ; i<c.PLANETS.length;i++){
    if(c.PLANETS[i].inRange(xx,yy)){
      ans=c.PLANETS[i];
    }
  }
  if(ans==""){
    if(sqrt((xx-W/2)**2+(yy-H/2)**2)<=2*c.Rsun){
      ans="Sun";
    }
  }
  return ans;
}




//mobile
function deviceShaken() {
 setsystem();
}





// function windowResized() {
//   W = windowWidth;
//   H = windowHeight;//P5 window resize function
//   resizeCanvas( W,H);
// }
