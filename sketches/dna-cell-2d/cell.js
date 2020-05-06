class Cell{
  constructor(i,j,s){
    this.coords = [i,j];
    this.state = s;
  }

  set(s){
    this.state = s;
  }

  get_val(n){
    let coord1 = (this.coords[0]+INDEX[n][0]+ATTS.n_side)% ATTS.n_side;
    let coord2 = (this.coords[1]+INDEX[n][1]+ATTS.n_side)% ATTS.n_side;

    return CELLS[coord1][coord2].state;
  }

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
    for(let i = 0;i<ATTS.neigh_check.length;i++){
      let neigh = ATTS.neigh_check[i]
      let val  = this.get_val(neigh);
      ans+=val
    }
    return ans;
  }

  paint(){
    let x = ATTS.rect_cells.xo + ATTS.rect_cells.dx * this.coords[0];
    let y = ATTS.rect_cells.yo + ATTS.rect_cells.dx * this.coords[1];

    push()
    stroke(0)
    strokeWeight(1.2);
    fill(COLORS[this.state]);
    rect(x,y,ATTS.rect_cells.dx,ATTS.rect_cells.dx);
    pop()
  }

}
