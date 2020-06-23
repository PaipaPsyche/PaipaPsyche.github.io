
let w,h;

let max_steps;
let step;

let orders_A=["primera","segunda","tercera"]
let orders_O=["primer","segundo","tercer"]
let orders_B = ["derecha","izquierda"]
let orders_J = ["hidrante","arbol","bolardo","poste","'PARE'"]
let orders_U = ["metros","pasos","centimetros"];

let orders = []

function setup(){
w = windowWidth;
h = windowHeight;
createCanvas(w,h)
step=0;
max_steps=round(random(6,15));
orders.push(primera_order())
}

function primera_order(){
  let ord ="Pararse en la esquina de la"
  let carr = int(random(1,120))
  let call = int(random(1,120))
  let addit = int(random(1,100))
  let carr_b = random(["A","B","C","","",""])
  let call_b = random(["A","B","C","","","",""])
  let comp = " mirando hacia el"+random([" sur "," este "," oeste "," norte "])

  opciones = [ord +" carrera "+carr+carr_b+" con calle " + call + call_b+comp, ord +" calle "+call+call_b+" con carrera " + carr + carr_b+comp]

  return random(opciones)



}

function generar_orden(){
  let order_type  = random([1,2,3,4,5,6])
  let order = ""
  if(order_type==1){
    order += "Tome la " + random(orders_A)+" salida hacia la "+random(orders_B)
  }
  if(order_type==2){
    order += "Gire a la "+random(orders_B) + " en el "+random(orders_O)+" cruce"
  }
  if(order_type==3){
    order += "Gire a la "+random(orders_B) + " y luego gire a la " + random(orders_B)
  }
  if(order_type==4){
    order += "Gire a la "+random(orders_B) + " y continue hasta el proximo "+random(orders_J) + " que vea"
  }
  if(order_type==5){
    order += "Avance recto otras "+int(random(2,4))+ " cuadras"
  }
  if(order_type==6){
    order += "Avance "+ int(random(10,50)) +" "+ random(orders_U) + " hacia el"+random([" sur "," este "," oeste "," norte "])
  }

  orders.push(order)

}

function mouseClicked(){
  if(step<max_steps){
  if(step +1  == max_steps){
    orders.push("Ha llegado a su destino.")
    step = max_steps

  }
  else{
    generar_orden()
    step++;
  }
  }

}

function draw(){
  background(0)
  for(let  i = 0; i<orders.length;i++){
    if(i==orders.length-1){
      fill(255)
      textSize(28)
    }
    else{
      fill(150)
      textSize(25)
    }

    text(orders[i],20,30*(i+1))

  }

}
