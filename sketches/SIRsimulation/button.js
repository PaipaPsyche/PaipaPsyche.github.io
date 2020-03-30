let BUTT_C = {
  "butt_on": [255, 0, 0],
  "butt_off": [50, 50, 50],
  "box_val": [20, 20, 40],
  "font_val": [255, 255, 255],
  "font_butt": [10, 10, 10],
  "toogle_on": [0, 200, 0],
  "toogle_off": [200, 50, 0]
}




class slider_val {
  constructor(x, y, atts) {
    this.position = createVector(x, y)
    this.atts = atts;
    this.W = this.atts["W"];
    this.H = this.atts["H"];

    this.text = this.atts["text"];
    this.val = this.atts["init"]
    this.active = 1;

    this.d_val = this.atts["dval"]



  }

  action(a) {
    if (a == "+") {
      this.val = this.val + this.d_val
    } else if (a == "-") {
      this.val = this.val - this.d_val
    } else if (a == "on") {
      this.active = 1;
    } else if (a == "off") {
      this.active = 0;
    }
    this.val = constrain(this.val, this.atts["low"], this.atts["high"])
  }


  in_range() {

    if (dist(mouseX, mouseY, this.position.x + this.W / 6, this.position.y + this.H / 2) <= this.atts["butt_rad"] * this.H) {

      return "-"
    } else if (dist(mouseX, mouseY, this.position.x + 5 * this.W / 6, this.position.y + this.H / 2) <= this.atts["butt_rad"] * this.H) {
      return "+"
    }
    return ""
  }


  check() {
    trigger();
    if (this.active == 1) {
      this.action(this.in_range())
    }
  }




  paint() {
    let d_pix = 5;

    push()

    translate(this.position.x, this.position.y)
    noStroke()
    fill(BUTT_C["box_val"])


    rect(this.W / 3 + d_pix, 1 * d_pix, this.W / 3 - 2 * d_pix, this.H - 3 * d_pix)
    textAlign(CENTER, CENTER)
    fill(BUTT_C["font_val"])


    textSize(0.45 * this.H)
    text(this.text, this.W / 2, -8)

    textSize(0.5 * this.H)
    let dec_places = this.atts["dtype"] == "d" ? 2 : 0;
    let value = this.atts["dtype"] == "p" ? (this.val * 100).toFixed(dec_places) + "%" : (this.val).toFixed(dec_places);
    text(value, this.W / 2, this.H / 2)




    let col_butt = this.active == 1 ? BUTT_C["butt_on"] : BUTT_C["butt_off"];
    // fill(col_butt)
    noFill()
    stroke(255)
    strokeWeight(2)
    circle(this.W / 6, this.H / 2, this.atts["butt_rad"] * this.H);

    circle(5 * this.W / 6, this.H / 2, this.atts["butt_rad"] * this.H);
    fill(255)

    text("-", this.W / 6, this.H / 2);
    text("+", 5 * this.W / 6, this.H / 2);
    pop()




  }






}


class toogle {
  constructor(x, y, atts) {
    this.position = createVector(x, y)
    this.atts = atts;
    this.W = this.atts["W"];
    this.H = this.atts["H"];

    this.text = this.atts["text"];
    this.val = this.atts["init"]
    this.active = 1;

  }

  switch () {
    this.val = 1 - this.val;
  }

  in_range() {
    if (mouseX > this.position.x & mouseY > this.position.y & mouseX < (this.position.x + this.W) & mouseY < (this.position.y + this.H)) {
      return 1
    }
    return 0
  }

  check() {
    if (this.active == 1 & this.in_range() == 1) {
      this.switch()
      trigger();
    }
  }


  paint() {

    push()
    let r = this.atts["H"] * 0.4
    translate(this.position.x, this.position.y)
    textAlign(LEFT, CENTER)
    let col_butt = this.val == 1 ? [0, 255, 0] : [0, 0, 0];
    fill(0)
    stroke(255)
    circle(10, this.atts["H"] / 2, r)
    fill(col_butt)
    noStroke()
    circle(10, this.atts["H"] / 2, 0.7 * r)

    textSize(this.H * 0.75)
    fill(255);
    text(this.atts["text"], 3 * r, this.H / 2)
    pop()




  }




}


class press {

  constructor(x, y, atts) {
    this.position = createVector(x, y)
    this.atts = atts;
    this.W = this.atts["W"];
    this.H = this.atts["H"];

    this.text = this.atts["text"];
    this.val = 0
    this.active = 1;

  }
  switch () {
    this.val = 1 - this.val;
  }
  in_range() {
    if (mouseX > this.position.x & mouseY > this.position.y & mouseX < (this.position.x + this.W) & mouseY < (this.position.y + this.H)) {
      return 1
    }
    return 0
  }

  check() {
    if (this.active == 1 & this.in_range() == 1) {
      this.switch()
      trigger();
    }
  }

  paint() {

    push()
    translate(this.position.x, this.position.y)
    textAlign(CENTER, CENTER)
    let col_butt = this.val == 1 ? BUTT_C["butt_off"] : BUTT_C["butt_on"];
    fill(col_butt)

    rect(0, 0, this.W, this.H)
    textSize(this.H * 0.7)
    stroke(255)
    fill(255);
    text(this.atts["text"], this.W / 2, this.H / 2)
    pop()




  }




}