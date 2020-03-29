let W;
let H;




let sim_act;


let buttons;
let butt_keys;


let butt_dacc;

let T = 0;
let paused = 0;

let colors = {
  "infected":[255,50,0],
  "suceptible":[255,255,255],
  "cured":[20,70,255],
  "dead":[130,120,60]
}
let atts_sim = {
  "n":500,
  "p_zero":1,
  "obedience_rate":0.8,
  "r_boids":3,
  "day":0,
  "dt_day":40,
   "maxvel":1,
  "dacc":0.03,
  "r_infect":1.8,
  "inf_rate":0.4,
  "wash":0,
  "restriction":1,
  "days_tolerance":19,
  "min_days":8,
  "p_death":0.02,
  "margin":18,
  "plt_max_days":70

}



let att_butt_dacc = {
  "key":"dacc",
  "text":"Acceletarion delta",
  "dval":0.01,
  "low":0.01,
  "high":1,
  "init":0.03,
  "W":200,
  "H":60,
  "dtype":"d",
  "butt_rad":0.3
}

let butt_maxvel;
let att_butt_maxvel = {
  "key":"maxvel",
  "text":"Dispersion Index",
  "dval":0.05,
  "low":0,
  "high":2,
  "init":0.9,
  "W":180,
  "H":35,
  "dtype":"d",
  "butt_rad":0.3
}
let butt_obd;
let att_butt_obd = {
  "key":"obedience_rate",
  "text":"Collaboration Rate",
  "dval":0.05,
  "low":0,
  "high":1,
  "init":0.8,
  "W":180,
  "H":35,
  "dtype":"d",
  "butt_rad":0.3
}
let butt_n;
let att_butt_n = {
  "key":"n",
  "text":"Population",
  "dval":50,
  "low":50,
  "high":1000,
  "init":500,
  "W":180,
  "H":35,
  "dtype":"i",
  "butt_rad":0.3
}


let butt_wash;
let att_butt_wash = {
  "key":"wash",
  "text":"Washing Hands",
  "dval":0.05,
  "low":0,
  "high":2,
  "init":0,
  "W":180,
  "H":25,
  "dtype":"i",
  "butt_rad":0.25
}


let butt_rest;
let att_butt_rest = {
  "key":"restriction",
  "text":"Movement Restriction",
  "dval":0.05,
  "low":0,
  "high":2,
  "init":0,
  "W":180,
  "H":25,
  "dtype":"i",
  "butt_rad":0.25
}


let butt_set;
let att_butt_set = {
  "key":"set",
  "text":"RESET",
  "dval":0.05,
  "low":0,
  "high":2,
  "init":0,
  "W":180,
  "H":20,
  "dtype":"i",
  "butt_rad":0.25
}




function setup(){
W  = windowWidth;
H = windowHeight;
createCanvas(W,H);
T=0;
buttons={};
butt_keys=[];
let xo = atts_sim["margin"]
let yo = H/2+0.2*H;
// butt_dacc = new slider_val(700,100,att_butt_dacc);
// buttons[butt_dacc.atts["key"]] = butt_dacc

butt_maxvel = new slider_val(xo,yo+40,att_butt_maxvel);
buttons[butt_maxvel.atts["key"]] = butt_maxvel

butt_obd= new slider_val(xo,yo+80,att_butt_obd);
buttons[butt_obd.atts["key"]] = butt_obd

butt_n= new slider_val(xo,yo+120,att_butt_n);
buttons[butt_n.atts["key"]] = butt_n


butt_rest= new toogle(xo+200,yo+40,att_butt_rest);
buttons[butt_rest.atts["key"]] = butt_rest

butt_wash = new toogle(xo+200,yo+80,att_butt_wash);
buttons[butt_wash.atts["key"]] = butt_wash

butt_set = new press(xo,H-30,att_butt_set);
buttons[butt_set.atts["key"]] = butt_set

butt_keys =  Object.keys(buttons)


sim_act = new simulation(0.4*W,atts_sim["margin"]+0.2*H+10,W*0.6-2*atts_sim["margin"],0.8*H-2*atts_sim["margin"],atts_sim)


adapt_sim()
}



function pause(){
  noLoop()
  paused=1
}

function unpause(){
  loop()
  paused=0
}


function keyPressed(){
  if(key=="p"){
    if(paused ==0){
      pause();
    }
    else{
      unpause();
    }
  }
}


function get_val(key){
  for (let butt of butt_keys){
    if(butt == key){
      return buttons[butt].val
    }


  }
  return "";
}
function reset(){
  att_butt_wash["init"]=get_val("wash");
  att_butt_maxvel["init"]=get_val("maxvel");
  att_butt_rest["init"]=get_val("restriction");
  att_butt_obd["init"]=get_val("obedience_rate");
  att_butt_n["init"]=get_val("n");
  atts_sim["day"]=0;
sim_act.ended=0;

    setup();
  draw();
  unpause();
}

function adapt_sim(){
  if(get_val("set")==1){
    reset();
  }


  // let atts = {}
  for (let butt of butt_keys){

    atts_sim[butt]=buttons[butt].val;
  }
  // sim_act.change_boids(atts)

}



function trigger(){
  sim_act.changes++;
}

function mouseClicked(){
  for (let butt of butt_keys){
    buttons[butt].check()

  }
  adapt_sim()

}



function draw(){
background(0)
for (let butt of butt_keys){
  buttons[butt].paint()
}
let adv  = T%atts_sim["dt_day"]==0?1:0;

sim_act.run(adv)
if(sim_act.ended){
  pause();
}
T++;
}
