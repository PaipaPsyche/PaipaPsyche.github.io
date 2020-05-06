
// 9  2  3
// 8  1  4
// 7  6  5


// PARAMS

ATTS = {
  running : 0,
  gen :1,
  max_gen:15,
  neigh_check : [1,2,3,4,5,6,7,8,9],
  n_side :100,
  rect_cells : {
    xo:30,
    yo:40,
    w:500
  },
  rule:{
    raw:"",
    enconded:""
  },

  fr:60
}

//CONSTANTS

INDEX = {
  1: [0,0],
  2: [0,-1],
  3: [1,-1],
  4: [1,0],
  5: [1,1],
  6: [0,1],
  7: [-1,1],
  8: [-1,0],
  9: [-1,-1]
}

CHARS = {
  blank:"#",
  sep:"-"
}

COLORS={
  0:[20,20,20],
  1:[250,225,0]
}

VECINITY_COLORS={
  1:[0,0,0],
  2:[0,0,0],
  3:[0,0,0],
  4:[0,0,0],
  5:[0,0,0],
  6:[0,0,0],
  7:[0,0,0],
  8:[0,0,0]
}

//VARIABLES
let W;
let H;


let rule_code="";
let CELLS = [];
let COMBS =[];
let INDEXED ={};
let dna;
let gene_edit;



//FUNCTIONS





function setup(){
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);

  frameRate(ATTS.fr)
  //ATTS set
  ATTS.rect_cells.dx = ATTS.rect_cells.w/ATTS.n_side;

  gen_random_rule();

  for(let i = 0;i<ATTS.n_side;i++){
    CELLS[i]=[]
    for(let j = 0;j<ATTS.n_side;j++){
      CELLS[i][j] = new Cell(i,j,0);
    }
  }

  blank_center()
  create_combs()
  make_buttons()


  gene_edit=new gene_editor(600,350)

}


function gen_random_rule(mode="r"){
  rule_code="";
  for(let i =0;i<511;i++){
    if(mode=="r"){rule_code+=random(["1","0"]);}
    if(mode=="1"){rule_code+="1";}
    if(mode=="0"){rule_code+="0";}

  }
  rule_code="0"+rule_code

  update_on_dna()
}



function update_on_dna(){
  ATTS.rule.raw = rule_code;
  ATTS.rule.encoded = hiper_encode_rule(rule_code);
  dna = new dna_string(rule_code);
  create_combs()
}



function change_gene(pos,val){
  console.log("changed gene "+pos)
  console.log("---before "+rule_code[pos])
    rule_code = rule_code.slice(0,pos)+val+rule_code.slice(pos+1,rule_code.length);
    console.log("---after "+rule_code[pos])
    update_on_dna()
}


function save_genome(){
  prompt("Copy the genome", ATTS.rule.encoded);
}

function load_genome(){
  var rule = prompt("Specify the new genome",'');
  set_rule(rule)
}


function mutate_random_gene(){

  let pos = 1+floor(random(rule_code.length-1)); // no instant emergence (full 0 state cant arise 1)
  console.log("changed gene "+pos)
  console.log("---before "+rule_code[pos])
  let putvalue =  rule_code[pos]=="1"?"0":"1";
  change_gene(pos,putvalue)
  console.log("---after "+rule_code[pos])



}




function create_combs(){
  let baseN = Combinatorics.baseN(['0','1'], ATTS.neigh_check.length);
  let combs = baseN.toArray();

  let ans = {};
  let indexed = {};
  for(let i=0;i<combs.length;i++){
    ans[i]=combs[i].join('')
    indexed[combs[i].join('')]=int(rule_code[i])
  }
  COMBS = ans;
  INDEXED = indexed;
}


function set_rule(rule){
  if(rule.length==512 && tell_unique(rule).length<=2 && (rule.includes("1") || rule.includes("0"))){
    rule_code=rule;
  }else if(rule.split("-").length==16){
    rule_code=hiper_decode_rule(rule)
  }else{
    console.log("unable to identify rule form")
  }
  update_on_dna()



}

function tell_unique(nonUnique){
  var unique = nonUnique.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
  return unique;
}






function make_buttons(){
 let xo =580
 let yo = 300;

  //maxgen
  slider_mg = createSlider(5,500,50,10);
  slider_mg.position(xo, yo+15);
  slider_mg.style('width', '120px');

  //
  // slider_mg = createSlider(1,100,1,20);
  // slider_mg.position(xo, yo+15);
  // slider_mg.style('width', '120px');




}




function evaluate_cells(){

  let new_c = []

  for(let i = 0;i<ATTS.n_side;i++){
    new_c[i] = []
    for(let j = 0;j<ATTS.n_side;j++){
      new_c[i][j] = new Cell(i,j,0);
      let str = CELLS[i][j].read_state()
      new_c[i][j].set(translate_state(str))

    }
  }

  return new_c;
}


function look_for(str){
  for(let i =0 ; i<Object.keys(COMBS).length;i++){
    if(str == COMBS[i]){
      return i;
    }
  }
}


function translate_state(str){

  return INDEXED[str];
}


function blank(){
  ATTS.gen=1;
  ATTS.running=0;
  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      CELLS[i][j].set(0);
    }
  }
}


function blank_center(){
  //blank()
  let mid = int(ATTS.n_side/2)
  CELLS[mid][mid].set(1)
}



function blank_border(dir){
  //blank()
  let mid = int(ATTS.n_side/2)
  for(let i = 0;i<ATTS.n_side;i++){

    if(dir=="h"){
      CELLS[i][mid].set(i%2)
    }
    else if(dir=="v"){
      CELLS[mid][i].set(i%2)
    }
    else if(dir=="a"){
      CELLS[ATTS.n_side-1-i][i].set(i%2)
    }
    else if(dir=="d"){
      CELLS[i][i].set(i%2)
    }

  }

}


function keyPressed(){
  if(key=="e"){
    evolve();
  }
  if(key=="r"){
    blank_center()
    gen_random_rule()
  }
  if(key=="m"){
      mutate_random_gene()
  }
  if(key=="c"){
    blank_center()
  }
  if(key=="b"){
    blank();
  }
  if(key=="0"){
    gen_random_rule("0")
  }

  if(keyCode==SHIFT){
    gen_random_rule()
  }
  if(keyCode==ENTER){
    ATTS.running = 1-ATTS.running;
  }
  if(key=="h"){
    blank_border("h")
  }
  if(key=="v"){
    blank_border("v")
  }
  if(key=="d"){
    blank_border("d")
  }
  if(key=="a"){
    blank_border("a")
  }
}


function mouseClicked(){
  gene_edit.click()
  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      if(CELLS[i][j].mouseInRange()){
        CELLS[i][j].switch()
        return;
      }

    }
  }
}


function evolve(){
  CELLS =  evaluate_cells()
  ATTS.gen = ATTS.gen+1;
}




//MAIN LOOP
function draw(){
  background(0);

  fill(255)




  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      CELLS[i][j].paint();
    }
  }

  if(ATTS.running==1 && ATTS.gen < ATTS.max_gen){
    evolve()
  }



  dna.paint(600,70,50,200)
  gene_edit.paint()
  ATTS.max_gen=slider_mg.value()
  push()
  textSize(16)
  text("Generation : "+ATTS.gen+"/"+ATTS.max_gen,ATTS.rect_cells.xo,30)


  textSize(14)
  text("max. generations",580,300)
  pop()
}
