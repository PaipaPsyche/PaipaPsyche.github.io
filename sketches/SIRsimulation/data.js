let colors = {
  "infected": [255, 50, 0],
  "suceptible": [255, 255, 255],
  "cured": [20, 70, 255],
  "dead": [130, 120, 60]
}


let att_butt_maxvel = {
  "key": "disp_index",
  "text": "Dispersion Index",
  "dval": 0.05,
  "low": 0,
  "high": 1,
  "init": 0.8,
  "W": 160,
  "H": 35,
  "dtype": "d",
  "butt_rad": 0.4
}

let att_butt_obd = {
  "key": "obedience_rate",
  "text": "Collaboration Rate",
  "dval": 0.05,
  "low": 0,
  "high": 1,
  "init": 0.8,
  "W": 160,
  "H": 35,
  "dtype": "p",
  "butt_rad": 0.4
}

let att_butt_n = {
  "key": "n",
  "text": "Population",
  "dval": 50,
  "low": 50,
  "high": 1200,
  "init": 600,
  "W": 160,
  "H": 35,
  "dtype": "i",
  "butt_rad": 0.4
}

let att_butt_covrg = {
  "key": "coverage_rate",
  "text": "Medical Coverage",
  "dval": 0.05,
  "low": 0,
  "high": 1,
  "init": 0.1,
  "W": 160,
  "H": 35,
  "dtype": "p",
  "butt_rad": 0.4
}


let att_butt_mort = {
  "key": "p_death",
  "text": "Mortality",
  "dval": 0.02,
  "low": 0,
  "high": 1,
  "init": 0.02,
  "W": 160,
  "H": 35,
  "dtype": "p",
  "butt_rad": 0.4
}

let att_butt_contg = {
  "key": "inf_rate",
  "text": "Contagion Rate",
  "dval": 0.05,
  "low": 0,
  "high": 1,
  "init": 0.25,
  "W": 160,
  "H": 35,
  "dtype": "p",
  "butt_rad": 0.4
}








let att_butt_wash = {
  "key": "wash",
  "text": "Washing Hands",
  "dval": 0.05,
  "low": 0,
  "high": 2,
  "init": 0,
  "W": 160,
  "H": 20,
  "dtype": "i",
  "butt_rad": 0.25
}


let att_butt_rest = {
  "key": "restriction",
  "text": "Movement Restriction",
  "dval": 0.05,
  "low": 0,
  "high": 2,
  "init": 0,
  "W": 160,
  "H": 20,
  "dtype": "i",
  "butt_rad": 0.25
}



let att_butt_dist = {
  "key": "distancing",
  "text": "Social Distancing",
  "dval": 1,
  "low": 0,
  "high": 1,
  "init": 0,
  "W": 160,
  "H": 20,
  "dtype": "i",
  "butt_rad": 0.25
}


var att_butt_set = {
  "key": "set",
  "text": "RESET",
  "dval": 0.05,
  "low": 0,
  "high": 2,
  "init": 0,
  "W": 180,
  "H": 20,
  "dtype": "i",
  "butt_rad": 0.25
}