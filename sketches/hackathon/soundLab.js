// let osc, fft;
// let started = false;
// let f  = 400;
// var myCanvas;
//
//
// function setup() {
//   myCanvas = createCanvas(500, 500);
//   myCanvas.parent("sound-canvas");
//
//   osc = new p5.TriOsc(); // set frequency and type
//
// }
//
// function mouseClicked(){
//   osc.amp(0.5);
//
//   fft = new p5.FFT();
//   osc.start();
//   started = true;
// }
//
// function draw() {
//
//   if(started){
//     f = f + randomGaussian(0,2)
//     background(map(f,40,800 ,0,255));
//     f= constrain(f,40,800)
//           // let freq = map(mouseX, 0, width, 40, 880);
//     //osc.freq(freq);
//       osc.freq(f);
//
//   }
// }
//
//





let osc,osc2, playing, freq, amp;
let T=0;

let oscillators =[];




function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('triangle');
}

function add_oscillator(id,type='sine',sets=[]){
  let osc = new p5.Oscillator(type);
  let setups = {freq:300,amp:0.5,dependent:{freq:0,amp:0}}
  for(let s of sets){
    setups[s[0]]=s[1]
  }
  oscillators.push({id:id,osc:osc,setup:setups})
}


function draw() {
  //background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  //text('tap to play', 20, 20);
  //text('freq: ' + freq, 20, 40);
  //text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    // osc.freq(freq, 0.1);
    // osc.amp(amp, 0.1);
    //
    // osc2.freq(freq-80, 0.1);
    // osc2.amp(amp, 0.1);
    for(let osci of oscillators){
      let ff  = osci.setup.freq + osci.setup.dependent.amp*sin(osci.setup.dependent.freq*T)
      osci.osc.freq(ff,0.1)

      osci.osc.amp(osci.setup.amp,0.1)
    }
  }
  T++;
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  for(let osci of oscillators){
    osci.osc.start()
  }
  playing = true;
}


function keyPressed(){
  if(key=="s"){
    add_oscillator("sine","sine",[["F",random([440,560,640])]]);
  }
  if(key=="t"){
    add_oscillator("tria","triangle");
  }
  if(key=="q"){
    add_oscillator("sqr","square",[["offset",random(-50,50)]]);
  }
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  for(let osci of oscillators){

    osci.osc.amp(0,0.05)
  }
  playing = false;
}
