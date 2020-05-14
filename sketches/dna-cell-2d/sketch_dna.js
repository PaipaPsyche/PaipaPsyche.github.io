
// 9  2  3
// 8  1  4
// 7  6  5


// PARAMS

ATTS = {
  running : 0,
  gen :1,
  bombing:0,
  max_gen:15,
  neigh_check : [1,2,3,4,5,6,7,8,9],
  n_side :75,
  rect_cells : {
    xo:30,
    yo:40,
    w:500
  },
  rule:{
    raw:"",
    enconded:""
  },
  mode:"single case",
  orders:[],

  fr:60,
  info:1
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

let colors_dict={}


VECINITY_COLORS_A={
  0:[120,0,20],
  1:[250,10,0],
  2:[250,160,5],
  3:[150,240,15],
  4:[15,250,180],
  5:[5,150,220],
  6:[0,80,250],
  7:[80,0,230],
  8:[230,0,180]
}
VECINITY_COLORS_B={
  0:[10,40,10],
  1:[10,70,20],
  2:[10,100,40],
  3:[40,140,60],
  4:[40,180,80],
  5:[40,210,100],
  6:[40,130,130],
  7:[40,250,180],
  8:[250,250,250]
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
let butt_order;
let butt_mode;
let butt_load;
let butt_save;
let butt_clear;
let butt_blank;
let butt_step;
let butt_random;
let butt_zeroed;
let butt_info;
let butt_image;



let clickable=[];

//FUNCTIONS





function setup(){
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);

  colors_dict={
    "Jet":VECINITY_COLORS_A,
    "Green gradient":VECINITY_COLORS_B
  }

  frameRate(ATTS.fr)
  //ATTS set
  ATTS.rect_cells.dx = ATTS.rect_cells.w/ATTS.n_side;

  gen_random_rule("0");

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
  clickable=[butt_load,butt_mode,butt_order,butt_blank,butt_random,
    butt_save,gene_edit,butt_clear,butt_play,butt_step,butt_zeroed,
    butt_info,butt_image]



    ATTS.min_width = ATTS.rect_cells.xo+ATTS.rect_cells.w+260
    if(W>(ATTS.min_width+200)){
      let result= int(W-ATTS.min_width-10);
      let div2 = document.getElementById('div2').style.width = str(result)+"px";
      //div2.style("width",)


    }else{
      ATTS.info=0;
      document.getElementById('div2').style.visibility = 'hidden';

    }




}




function create_image(){
  let img = createImage(ATTS.n_side,ATTS.n_side);
  img.loadPixels();
  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      let c = CELLS[i][j].give_color()
      let new_c = color(0,0,0)
      new_c.setRed(c[0])
      new_c.setGreen(c[1])
      new_c.setBlue(c[2])
      new_c.setAlpha(255)
          img.set(i, j,new_c);

    }
  }
  img.updatePixels();

  let scale  = 4;
  img.resize(scale*ATTS.n_side,scale*ATTS.n_side)
  save(img, 'my_genome.jpg');


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



function read_orders(){
  let total_changed = 0;
  if(ATTS.orders.length >0){
    console.log("readorders")
    let new_indexed = {}



      let keys = Object.keys(INDEXED);
    for(let k of keys){
      let val = evaluate_vecinity_key(k);
      //console.log(k+" ---- "+val,val=="-",val!=0,val!=1)
      if((val!=0 && val!=1) || val=="-"){
        new_indexed[k]=INDEXED[k]

      }else{
        //console.log("rule "+k + " NOT updated.")
        total_changed++;
        new_indexed[k]=int(val);
        //console.log("rule "+k + " reinterprted as " + val,val=="")
      }

    }
    INDEXED = new_indexed;

    keys = Object.keys(COMBS);
    for(let k of keys){
      let kk = int(k)
      let key = COMBS[kk]
      let res = new_indexed[key]
      if(int(rule_code[kk])!=int(res)){
        //console.log(rule_code[kk]+" ------ "+ int(res))
        change_gene(kk,res)
      }

    }
  }
  console.log("A total of "+total_changed+" genes were overwritten.")
  update_on_dna()
  clear_orders()
}


function invert(){
  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      CELLS[i][j].state = 1-CELLS[i][j].state;
    }
  }
}
function evaluate_vecinity_key(key){
  if(key.length!=9){
    console.log("evaluate vec.: not adecuate length - ",key)
    return "-";
  }
    let ans = "-";

    let neighbors = 0;
    for(let i=1;i<key.length;i++){
      neighbors+=int(key[i])
    }
      for(let ord of ATTS.orders){
        //both inclusive
        let mp_i = ord.mp_i
        let mp_f = ord.mp_f

        if(neighbors>= mp_i && neighbors<=mp_f){
          if(ord.order =="survive"){
            if(str(key[0])=="1"){
              ans= 1;
            }else{
              ans= 0;
            }


          }else if(ord.order=="die"){
            ans= 0;
          }else if(ord.order=="born"){
            ans= 1;
          }
        }

      }
      return ans
}



function update_on_dna(){
  ATTS.rule.raw = rule_code;
  ATTS.rule.encoded = hiper_encode_rule(rule_code);
  dna = new dna_string(rule_code);
  create_combs()
}



function change_gene(pos,val){
  console.log("changed gene "+ COMBS[pos] + " in position " + pos )
  console.log("---before "+rule_code[pos])
    rule_code = rule_code.slice(0,pos)+str(val)+rule_code.slice(pos+1,rule_code.length);
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
  }else if(Object.keys(genomes).indexOf(rule)>=0){
    rule_code=hiper_decode_rule(genomes[rule])
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
 let xo = 35
 let yo = ATTS.rect_cells.w+60;

  //maxgen
  slider_mg = createSlider(5,1000,50,5);
  slider_mg.position(xo, yo);
  slider_mg.style('width', str(ATTS.rect_cells.w)+'px');
  slider_mg.style('height', '2px');
  //slider_mg.style('rotate', '-90');
  slider_mg.style('background-color', 'black');


  radio = createRadio();
  radio.option('single case');
  radio.option('all rotations');
  radio.style('width', '300px');
  radio.style('color', 'white');
  radio.value("single case");
  fill(255, 0, 0);
  radio.position(550,460)


  radio_g = createRadio();
  radio_g.option('Limited');
  radio_g.option('Infinite');
  radio_g.style('width', '300px');
  radio_g.style('color', 'white');
  radio_g.value("Infinite");
  fill(255, 0, 0);
  radio_g.position(550,400)

  sel_pal = createSelect();
  sel_pal.position(560,363);
  sel_pal.option("Jet");
  sel_pal.option("Green gradient");
  sel_pal.option("Yellow");
  sel_pal.selected("Jet");
  sel_pal.style('height','15px')
  sel_pal.style('font-size','12px')


  // A cell that has _ to _ neighbors must ___.;



  sel_b1 = createSelect();
  sel_b1.position(ATTS.rect_cells.xo+100, ATTS.rect_cells.w+75);
  for(let i=0;i<=8;i++){
  sel_b1.option(str(i));
  }
  sel_b1.selected('0');

  sel_b2 = createSelect();
  sel_b2.position(ATTS.rect_cells.xo+160, ATTS.rect_cells.w+75);
  for(let i=0;i<=8;i++){
  sel_b2.option(str(i));
  }
  sel_b2.selected('0');




  sel_o = createSelect();
  sel_o.position(ATTS.rect_cells.xo+305, ATTS.rect_cells.w+75);

  sel_o.option("die");
  sel_o.option("survive");
  sel_o.option("born");

  sel_o.selected("survive");

  butt_info = new button_do(ATTS.rect_cells.xo+ATTS.rect_cells.w+200,28,toggle_info,4,[0,100,255])
  butt_image = new button_do(ATTS.rect_cells.xo+ATTS.rect_cells.w+200,78,create_image,4,[20,210,155])

  butt_play = new button_do(ATTS.rect_cells.xo+200,28,toggle_running,4,[255,0,0])
  butt_step = new button_do(ATTS.rect_cells.xo+405,26,evolve,4,[200,200,0])
  butt_blank = new button_do(ATTS.rect_cells.xo+485,26,blank,4,[100,100,100])

  butt_save = new button_do(550,260,save_genome,4,[0,250,100])
  butt_load = new button_do(550,ATTS.rect_cells.w/2+40,load_genome,4,[250,250,20])
  butt_random = new button_do(650, 260,gen_random_rule,4,[200,20,200])
  butt_zeroed = new button_do(650, ATTS.rect_cells.w/2+40,()=>{gen_random_rule("0")},4,[150,20,240])

  butt_clear = new button_do(ATTS.rect_cells.xo+420, ATTS.rect_cells.w+70,clear_orders,4,[250,20,20])
  butt_order = new button_do(ATTS.rect_cells.xo+380, ATTS.rect_cells.w+70,create_order)
  butt_mode = new button_do(ATTS.rect_cells.xo+500, ATTS.rect_cells.w+70,read_orders,4,[250,250,250])
//550,365

}


function toggle_info(){
  ATTS.info=1-ATTS.info;
  if(ATTS.info==1){
    document.getElementById('div2').style.visibility = 'visible';

  }
  else{
    document.getElementById('div2').style.visibility = 'hidden';
  }


}



function clear_orders(){ATTS.orders=[]}

function create_order(){
  //validate
  if((sel_b1.value()>sel_b2.value())){
    alert("Wrong parameters, try again.")
    return;
  }



  let order = {mp_i:sel_b1.value(),mp_f:sel_b2.value(),order:sel_o.value()}
  ATTS.orders.push(order);
console.log("A cell that has ",sel_b1.value()," to ",sel_b2.value()," neighbors must",sel_o.value())
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

function random_switch(){
  random(random(CELLS)).switch()
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

function blank_figure(k){
  //blank()
  let mid = int(ATTS.n_side/2)

  if(k=="2"){
    CELLS[mid-1][mid].set(1)
    CELLS[mid+1][mid].set(1)
    CELLS[mid][mid-1].set(1)
    CELLS[mid][mid+1].set(1)
    CELLS[mid][mid].set(1)
  }else if(k=="3"){
    blank_figure("2")


    CELLS[mid-2][mid+1].set(1)
    CELLS[mid-2][mid-1].set(1)
    CELLS[mid+2][mid-1].set(1)
    CELLS[mid+2][mid+1].set(1)


    CELLS[mid-1][mid+2].set(1)
    CELLS[mid-1][mid-2].set(1)
    CELLS[mid+1][mid-2].set(1)
    CELLS[mid+1][mid+2].set(1)


  }
  else if(k=="4"){
    blank_figure("3")

    CELLS[mid-3][mid].set(1)
    CELLS[mid+3][mid].set(1)
    CELLS[mid][mid-3].set(1)
    CELLS[mid][mid+3].set(1)


    CELLS[mid-4][mid+1].set(1)
    CELLS[mid-4][mid-1].set(1)
    CELLS[mid+4][mid-1].set(1)
    CELLS[mid+4][mid+1].set(1)


    CELLS[mid-1][mid+4].set(1)
    CELLS[mid-1][mid-4].set(1)
    CELLS[mid+1][mid-4].set(1)
    CELLS[mid+1][mid+4].set(1)


  }
  else if(k=="5"){
    CELLS[mid][mid].set(1)
    CELLS[mid][mid-1].set(1)
    CELLS[mid][mid+1].set(1)
    CELLS[mid][mid-2].set(1)
    CELLS[mid][mid+2].set(1)
    CELLS[mid-1][mid].set(1)
    CELLS[mid+1][mid].set(1)
    CELLS[mid-2][mid].set(1)
    CELLS[mid+2][mid].set(1)
    CELLS[mid][mid-3].set(1)
    CELLS[mid][mid+3].set(1)
    CELLS[mid-3][mid].set(1)
    CELLS[mid+3][mid].set(1)


    CELLS[mid-2][mid+2].set(1)
    CELLS[mid+2][mid-2].set(1)
    CELLS[mid-2][mid-2].set(1)
    CELLS[mid+2][mid+2].set(1)

    CELLS[mid-3][mid+1].set(1)
    CELLS[mid+3][mid-1].set(1)
    CELLS[mid-3][mid-1].set(1)
    CELLS[mid+3][mid+1].set(1)

    CELLS[mid-1][mid+3].set(1)
    CELLS[mid+1][mid-3].set(1)
    CELLS[mid-1][mid-3].set(1)
    CELLS[mid+1][mid+3].set(1)




  }


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

function toggle_running(){
  ATTS.running = 1-ATTS.running;
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
  if(key=="p"){
      random_switch()
  }
  if(key=="i"){
      invert()
  }
  if(key=="c"){
    blank_center()
  }
  if(key=="b"){
    blank();
  }

  if(key=="x"){
    ATTS.bombing = 1-ATTS.bombing
  }
  if(key=="0"){
    gen_random_rule("0")
  }
  if(key=="1"){
    gen_random_rule("1")
  }
  if(key=="2" || key=="3" || key=="4" || key=="5" ) {
    blank_figure(key);
  }

  if(keyCode==SHIFT){
    gen_random_rule()
  }
  if(keyCode==ENTER){
    toggle_running()
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

function mouseDragged(){
  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      if(CELLS[i][j].mouseInRange()){
        CELLS[i][j].switch()
        return;
      }

    }
  }
}

function mouseClicked(){


  for(let c of clickable){
    c.click()
  }

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
  W = windowWidth;
  if(W>(ATTS.min_width+200)){
    let result= int(W-ATTS.min_width-10);
    let div2 = document.getElementById('div2').style.width = str(result)+"px";
    //div2.style("width",)


  }
  background(0);

  fill(255)

  if(ATTS.bombing==1 && ATTS.running==1){
    random_switch()
  }


  for(let i = 0;i<ATTS.n_side;i++){
    for(let j = 0;j<ATTS.n_side;j++){
      CELLS[i][j].paint();
    }
  }
  if(ATTS.running==1 && (radio_g.value()=="Infinite"||ATTS.gen < ATTS.max_gen)){
    evolve()

    //button color?
  }



  dna.paint(600,40,50,200)
  for(let c of clickable){
    c.paint()
  }
  ATTS.max_gen=slider_mg.value()

  if(ATTS.running==1){
    butt_play.C = [0,200,0]
    push()
    textAlign(LEFT)
    textSize(12)
    fill([0,180,0])
    text("Running",ATTS.rect_cells.xo+ATTS.rect_cells.w/2-100,30)
    pop()
  }else{
    butt_play.C = [200,0,0]
    push()
    textSize(12)
    fill([190,0,0])
    text("Stop",ATTS.rect_cells.xo+ATTS.rect_cells.w/2-100,30)
    pop()
  }


  if(ATTS.bombing==1){
    push()
    textSize(12)
    fill([210,210,0])
    text("Bombing",ATTS.rect_cells.xo+ATTS.rect_cells.w/2,30)
    pop()
  }




  push()
  textAlign(LEFT)
  textSize(15)
  let extra_txt = radio_g.value()=="Infinite"?"inf.":ATTS.max_gen;
  text("Generation : "+ATTS.gen+"/"+extra_txt,ATTS.rect_cells.xo,30)





  text("Settings",550,330)

  text("Behavior Programation Module",550,440)




  textSize(13)
  text(" Help ",ATTS.rect_cells.xo+ATTS.rect_cells.w+185,50)
  text(" Save \n Image ",ATTS.rect_cells.xo+ATTS.rect_cells.w+185,100)
  text("Save",570,265)
  text("Load",570,295)
  text("Palette",550,350)
  text("Max. Generations",550,385)
  text("Empty DNA",670,295)
  text("Random DNA",670,265)
  text("Step              blank",ATTS.rect_cells.xo+370,30)
  text("Update",480,ATTS.rect_cells.w+75)

  text("A cell that has              to               neghbors must",ATTS.rect_cells.xo, ATTS.rect_cells.w+80)


  textSize(11)
  text(ATTS.orders.length+" orders",480,ATTS.rect_cells.w+90)
  text("clear",440,ATTS.rect_cells.w+90)
  text("send",400,ATTS.rect_cells.w+90)



  stroke(255)
  line(550,310,700,310)
  line(550,420,700,420)
  //line(550,455,700,455)
  pop()
}
