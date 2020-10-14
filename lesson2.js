class Frog {
  constructor() {
    this.icon = "🐸";
    this.position = null;
    this.lives = 3;
    this.height = 3;
    this.depth = 4;
  }
  // just for moving up right now

}

class Obstacle {
  constructor() {
  }
}

class Lane {
  constructor() {
    this.lane = (new Array(10)).fill("_");
  }
  display() {
    console.log(this.lane.join(""));
  }
}

class Landscape {
  constructor() {
    this.lanes = [];
    for (let counter = 0; counter <= 2; counter++ ) {
      this.lanes.push(new Lane().lane);
    }
    let startLane = (new Array(9)).fill("_");
    startLane[4] = "🐸";
    this.lanes.push(startLane);
  }
  display() {
    this.lanes.forEach(lane => console.log(lane.join("")));
  }
 
}

class FroggerGame {
  constructor() {
    this.landscape = new Landscape();
    this.player = new Frog();
  } 

  moveUp(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height - 1][this.player.depth] = "🐸";
    this.player.height -= 1;
    return lanes;
  }
  moveDown(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height + 1][this.player.depth] = "🐸";
    this.player.height += 1;
    return lanes;
  }

  moveLeft(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height][this.player.depth - 1] = "🐸";
    this.player.depth -= 1;
    return lanes;
  }

  moveRight(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height][this.player.depth + 1] = "🐸";
    this.player.depth += 1;
    return lanes;
  }

  play() {
    let x = 1;
    while (x < 2) {
      this.landscape.display();
      this.moveUp(this.landscape.lanes);
      this.landscape.display();
      this.moveDown(this.landscape.lanes);
      this.landscape.display();
      x ++;

      this.moveLeft(this.landscape.lanes);
      this.landscape.display();

      this.moveLeft(this.landscape.lanes);
      this.landscape.display();

      this.moveLeft(this.landscape.lanes);
      this.landscape.display();

      this.moveRight(this.landscape.lanes);
      this.landscape.display();
    }
  }
}

let game = new FroggerGame();
game.play();
