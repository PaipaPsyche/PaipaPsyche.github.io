class Cell{
  constructor(i,j,s){
    this.coords = [i,j];
    this.state = s;
    this.active_neighbors = 0;
  }

  set(s){
    this.state = s;
  }

  get_val(n){
    let coord1 = (this.coords[0]+INDEX[n][0]+ATTS.n_side)% ATTS.n_side;
    let coord2 = (this.coords[1]+INDEX[n][1]+ATTS.n_side)% ATTS.n_side;

    return CELLS[coord1][coord2].state;
  }

  //
  // evaluate_vecinity(orders){
  //
  //
  //   for(let ord of orders){
  //     //both inclusive
  //     let mp_i = ord.markpoint.i
  //     let mp_f = ord.markpoint.f
  //
  //     if(this.active_neighbors>= mp_i && this.active_neighbors<=mp_f){
  //       this.execute(ord.order);
  //     }
  //
  //   }
  //
  // }
  //
  // execute(ord){
  //   if(ord == "death"){
  //     this.state = 0;
  //   }
  //   if(ord == "life"){
  //     this.state=1;
  //   }
  // }

  mouseInRange(){
    let x = ATTS.rect_cells.xo + ATTS.rect_cells.dx * this.coords[0];
    let y = ATTS.rect_cells.yo + ATTS.rect_cells.dx * this.coords[1];
    if(mouseX > x && mouseX< x+ATTS.rect_cells.dx && mouseY>y && mouseY<y + ATTS.rect_cells.dx){
      return true
    }
    return false
  }

  switch(){
    this.state = 1-this.state;
  }


  read_state(){
    let ans = '';
    let act = 0;
    for(let i = 0;i<ATTS.neigh_check.length;i++){
      let neigh = ATTS.neigh_check[i]
      let val  = this.get_val(neigh);
      ans+=val
      if(neigh!=1){
        act+=int(val)

      }
    }
    //console.log(act);
    this.active_neighbors = act;
    return ans;
  }

  paint(){
    let x = ATTS.rect_cells.xo + ATTS.rect_cells.dx * this.coords[0];
    let y = ATTS.rect_cells.yo + ATTS.rect_cells.dx * this.coords[1];

    push()
    stroke(0)
    strokeWeight(1.2);
    this.read_state()
    if(this.state==0){
      fill(COLORS[this.state]);
    }else{
      if(sel_pal.value()=="Yellow"){
        fill(COLORS[this.state]);
      }else{

        fill(colors_dict[sel_pal.value()][int(this.active_neighbors)]);
      }
      //console.log(this.active_neighbors)

    }

    rect(x,y,ATTS.rect_cells.dx,ATTS.rect_cells.dx);
    pop()
  }

}
