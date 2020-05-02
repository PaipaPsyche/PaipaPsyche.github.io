let W;
let H;




let sim_act;


let buttons;
let butt_keys;


let butt_dacc;

let T = 0;
let paused = 0;


let atts_sim = {
  "active":1,
  "ended":0,
  "n": 700,
  "p_zero": 1,
  "obedience_rate": 0.8,
  "r_boids": 4.5,
  "day": 0,
  "dt_day": 25,
  "maxvel": 1.5,
  "disp_index": 0.5,
  "dacc": 0.4,
  "r_infect": 3.2,
  "inf_rate": 0.4,
  "wash": 0,
  "restriction": 0,
  "distancing": 0,
  "r_distancing": 100,
  "f_distancing": 0.5,
  "days_tolerance": 19,
  "min_days": 7,
  "p_death": 0.5,
  "margin": 18,
  "plt_max_days": 80,
  "coverage_rate": 0.1,
  "lim_width": 850,
  "closed":1,
  "density_th":0.04

}




let butt_maxvel;
let butt_obd;
let butt_n;
let butt_covrg;
let butt_mort;
let butt_days;


let butt_wash;
let butt_rest;
let butt_dist;
let butt_closed;

let butt_set;

function preload() {
  W = windowWidth;
  H = windowHeight;
  if (W < atts_sim["lim_width"]) {
    atts_sim["plt_max_days"] = 50
  }

  w_sliders = W * 0.2;
  w_butts = W * 0.2;
  w_res = W * 0.2;

}


function setup() {


  createCanvas(W, H);
  T = 0;
  buttons = {};
  butt_keys = [];
  let xo = atts_sim["margin"]
  let yo = 0.2 * H + 10;

  butt_maxvel = new slider_val(xo, yo + 40, att_butt_maxvel);
  buttons[butt_maxvel.atts["key"]] = butt_maxvel

  butt_obd = new slider_val(xo, yo + 95, att_butt_obd);
  buttons[butt_obd.atts["key"]] = butt_obd

  butt_n = new slider_val(xo, yo + 150, att_butt_n);
  buttons[butt_n.atts["key"]] = butt_n

  butt_covrg = new slider_val(xo, yo + 205, att_butt_covrg);
  buttons[butt_covrg.atts["key"]] = butt_covrg

  butt_mort = new slider_val(xo + 200, yo + 40, att_butt_mort);
  buttons[butt_mort.atts["key"]] = butt_mort

  butt_contg = new slider_val(xo + 200, yo + 95, att_butt_contg);
  buttons[butt_contg.atts["key"]] = butt_contg

  butt_days = new slider_val(xo, yo + 260, att_butt_days);
  buttons[butt_days.atts["key"]] = butt_days


  butt_rest = new toogle(xo + 200, yo + 150, att_butt_rest);
  buttons[butt_rest.atts["key"]] = butt_rest

  butt_wash = new toogle(xo + 200, yo + 185, att_butt_wash);
  buttons[butt_wash.atts["key"]] = butt_wash

  butt_dist = new toogle(xo + 200, yo + 220, att_butt_dist);
  buttons[butt_dist.atts["key"]] = butt_dist

  butt_closed = new toogle(xo + 200, yo + 255, att_butt_closed);
  buttons[butt_closed.atts["key"]] = butt_closed

  butt_set = new press(xo, H - 30, att_butt_set);
  buttons[butt_set.atts["key"]] = butt_set

  butt_keys = Object.keys(buttons)


  sim_act = new simulation(0.4 * W,
    atts_sim["margin"] + 0.2 * H + 10,
    W * 0.6 - atts_sim["margin"],
    0.8 * H - 2 * atts_sim["margin"],
    atts_sim)


  adapt_sim()
}



function pause() {
  atts_sim["active"]=0
}

function unpause() {
  if(atts_sim["ended"]=0){
  atts_sim["active"]=1}

}


function keyPressed() {
  if (key == "p") {
    if (atts_sim["active"]=1) {
      pause();
    } else {
      unpause();
    }
  }
}


function get_val(key) {
  for (let butt of butt_keys) {
    if (butt == key) {
      return buttons[butt].val
    }


  }
  return "";
}

function reset() {
  att_butt_wash["init"] = get_val("wash");
  att_butt_maxvel["init"] = get_val("disp_index");
  att_butt_rest["init"] = get_val("restriction");
  att_butt_obd["init"] = get_val("obedience_rate");
  att_butt_covrg["init"] = get_val("coverage_rate");
  att_butt_n["init"] = get_val("n");
  att_butt_mort["init"] = get_val("p_death");
  att_butt_contg["init"] = get_val("inf_rate");
  att_butt_dist["init"] = get_val("distancing");
  att_butt_days["init"] = get_val("days_tolerance");
  att_butt_closed["init"] = get_val("closed");
  atts_sim["day"] = 0;
  atts_sim["ended"] = 0;
  atts_sim["active"] = 1;
  preload();
  setup();
  draw();
  unpause();
}

function adapt_sim() {
  if (get_val("set") == 1) {
    reset();
  }


  // let atts = {}
  for (let butt of butt_keys) {

    atts_sim[butt] = buttons[butt].val;
  }
  // sim_act.change_boids(atts)

}



function trigger() {
  sim_act.changes++;
}

function mouseClicked() {
  for (let butt of butt_keys) {
    buttons[butt].check()

  }
  adapt_sim()

}



function draw() {
  background(0)
  for (let butt of butt_keys) {
    buttons[butt].paint()
  }

  let adv = T % atts_sim["dt_day"] == 0 ? 1 : 0;

  sim_act.run(adv)
  if (atts_sim["ended"]==1) {
    pause();
  }

  T++;
}
