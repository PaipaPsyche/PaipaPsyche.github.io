class plot {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.days = []
  }

  add_day(poll) {
    let day = Object.assign({}, poll, {
      "n": atts_sim["day"]
    });

    if (this.days.length == atts_sim["plt_max_days"]) {
      this.days = this.days.slice(1);
    }
    this.days.push(day);

  }



  paint() {

    push()
    translate(this.position.x, this.position.y)
    let len_d = this.days.length
    let dx_day = (W - 2 * atts_sim["margin"]) / (len_d)
    if (len_d > 0) {
      for (let i = 0; i < len_d; i++) {
        let d = this.days[i]
        let h_c = 0;
        let h_s = 0;
        let h_i = 0;
        let h_d = 0;


        if (d["dead"] > 0) {
          h_c = (0.2 * H - atts_sim["margin"]) * d["dead"] / d["total"]
          fill(colors["dead"])
          rect(i * dx_day, 0, dx_day, h_c);
        }
        if (d["cured"] > 0) {
          h_s = (0.2 * H - atts_sim["margin"]) * d["cured"] / d["total"]
          fill(colors["cured"])
          rect(i * dx_day, h_c, dx_day, h_s);
        }
        if (d["suceptible"] > 0) {
          h_i = (0.2 * H - atts_sim["margin"]) * d["suceptible"] / d["total"]
          fill(colors["suceptible"])
          rect(i * dx_day, h_c + h_s, dx_day, h_i);
        }
        if (d["infected"] > 0) {
          h_d = (0.2 * H - atts_sim["margin"]) * d["infected"] / d["total"]
          fill(colors["infected"])
          rect(i * dx_day, h_c + h_s + h_i, dx_day, h_d);
        }

        noFill()
        stroke(0)
        strokeWeight(1)
        rect(i * dx_day, 0, dx_day, 0.2 * H - atts_sim["margin"])

        fill(255)
        noStroke()
        textAlign(CENTER, CENTER)
        textSize(8);
        text(d["n"], (i + 0.5) * dx_day, this.position.y - 25);


      }
    }

    pop()




    push()
    translate(this.position.x, this.position.y)
    noFill()
    stroke(0)
    strokeWeight(2)
    rect(0, 0, W - 2 * atts_sim["margin"], 0.2 * H - atts_sim["margin"])
    pop()


    if (this.days.length > 0) {
      let poll = this.days[this.days.length - 1]



      let texto_a = poll["n"] + " days"
      let texto_b = poll["suceptible"] + " Healthy " + "(" + (100 * poll["suceptible"] / poll["total"]).toFixed(2) + "%)"
      let texto_c = poll["infected"] + " Infected " + "(" + (100 * poll["infected"] / poll["total"]).toFixed(2) + "%)"
      let texto_d = poll["dead"] + " Dead " + "(" + (100 * poll["dead"] / poll["total"]).toFixed(2) + "%)"
      let texto_e = poll["cured"] + " Cured " + "(" + (100 * poll["cured"] / poll["total"]).toFixed(2) + "%)"
      let texto_f = "P(I) " + (100 * (1 - poll["suceptible"] / poll["total"])).toFixed(2) + "%"
      push()

      textSize(16);
      fill(255)
      text(texto_a, this.position.x + atts_sim["margin"], this.position.y + 0.2 * H)


      textSize(12);
      fill(colors["suceptible"])
      text(texto_b, this.position.x + 100, this.position.y + 0.2 * H)

      fill(colors["infected"])
      text(texto_c, this.position.x + 230, this.position.y + 0.2 * H)

      fill(colors["cured"])
      text(texto_e, this.position.x + 360, this.position.y + 0.2 * H)

      fill(colors["dead"])
      text(texto_d, this.position.x + 490, this.position.y + 0.2 * H)

      fill([175, 155, 155])
      text(texto_f, this.position.x + 610, this.position.y + 0.2 * H)

      pop()

      push()
      let h_linea = this.position.y + (1 - atts_sim["coverage_rate"]) * (0.2 * H - atts_sim["margin"])
      stroke([255, 155, 0])
      strokeWeight(2)
      line(this.position.x, h_linea, this.position.x + W - 2 * atts_sim["margin"], h_linea)
      pop()


    }


    if (this.days.length > 1) {
      let diff = this.days[this.days.length - 2]["suceptible"] - this.days[this.days.length - 1]["suceptible"]
      let tot = this.days[this.days.length - 1]["total"] - this.days[this.days.length - 1]["suceptible"]
      push()
      fill([155, 175, 155])
      text("Growth " + (100 * diff / tot).toFixed(2) + "%", this.position.x + 690, this.position.y + 0.2 * H)
      pop()

      push()
      fill([100, 245, 155])
      let dr = this.days[this.days.length - 1]["dead"]/tot
      text("P(D) " + (100 * dr).toFixed(2) + "%", this.position.x + 790, this.position.y + 0.2 * H)
      pop()

      push()
      fill([150, 125, 175])

      var avg = (this.days[this.days.length - 1]["infection"]["sum_rate"] / tot).toFixed(2)
      var most = int(this.days[this.days.length - 1]["infection"]["most"])
      var most_rate = (this.days[this.days.length - 1]["infection"]["most_rate"]).toFixed(2)
      text(avg +" | "+ most_rate + " | " +most, this.position.x + 880, this.position.y + 0.2 * H)
      pop()


    }




  }



}
