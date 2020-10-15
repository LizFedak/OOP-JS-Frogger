moveUp(lanes) {
  // console.log(lanes);
  if (this.player.height - 1 === 0) {
    this.gameOver();
    this.froggerWon();
  } else if (lanes[this.player.height - 1][this.player.depth] === this.obstacle.icon ) {
    this.gameOver();
    this.collision();
  } else {
    lanes[this.player.height][this.player.depth] = this.lane.square;
    lanes[this.player.height - 1][this.player.depth] = this.player.icon;
    this.player.height -= 1;
    return lanes;
  }
}
moveDown(lanes) {
  // console.log(this.player.height);
  if (this.player.height + 1 === 6) {
    console.log("INVALID MOVE - MISS A TURN");
    return lanes;
  } else if (lanes[this.player.height + 1][this.player.depth] === this.obstacle.icon ) {
    this.gameOver();
    this.collision();
  } else {
    lanes[this.player.height][this.player.depth] = this.lane.square;
    lanes[this.player.height + 1][this.player.depth] = this.player.icon;
    this.player.height += 1;
    return lanes;
  }
}

moveLeft(lanes) {
  if (this.player.depth - 1 < 0) {
    console.log("INVALID MOVE - MISS A TURN");
    return lanes;
  } else if (lanes[this.player.height][this.player.depth - 1] === this.obstacle.icon ) {
    this.gameOver();
    this.collision();
  } else {
    lanes[this.player.height][this.player.depth] = this.lane.square;
    lanes[this.player.height][this.player.depth - 1] = this.player.icon;
    this.player.depth -= 1;
    return lanes;
  }
}

moveRight(lanes) {
  if (this.player.depth + 1 === 20) {
    console.log("INVALID MOVE - MISS A TURN");
    return lanes;
  } else if (lanes[this.player.height][this.player.depth + 1] === this.obstacle.icon ) {
    this.gameOver();
    this.collision();
  } else {
    lanes[this.player.height][this.player.depth] = this.lane.square;
    lanes[this.player.height][this.player.depth + 1] = this.player.icon;
    this.player.depth += 1;
    return lanes;
  }
}