let rls = require('readline-sync');

class Frog {
  constructor(height = 3, depth = 4) {
    this.icon = "🐸";
    this.lives = 3;
    this.height = height;
    this.depth = depth;
  }
}

class Obstacles {
  constructor() {
    this.obstacles = {};
    //  Can add in a way to have a max depth and max array for a variable sized board

    for (let counter = 0; counter <= 5; counter++ ) {
      // Add in randomization for the inner array and depth indices
      this.obstacles[String(counter)] = new Obstacle(2,3);
    }
  }
}

class Obstacle {
  constructor(height, depth) {
    this.icon = "🚗";
    this.height = height;
    this.depth = depth;
  }
  move() {
    this.depth -= 1;
  }
  moveFast() {
    this.depth -= 2;
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
    this.obstacles = new Obstacles();
    this.obstacle = new Obstacle();
  } 
  addObstacles() {
    let obj = this.obstacles.obstacles;
    for (const key in obj) {
      console.log(obj[key].height);
      let height = obj[key].height;
      let depth = obj[key].height;
      this.landscape.lanes[height][depth] = this.obstacle.icon;
      console.log(this.obstacles.obstacles[key])
      obj[key].depth = obj[key].depth - 1;
      console.log(this.obstacles.obstacles[key])
    }
  }

  moveUp(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height - 1][this.player.depth] = this.player.icon;
    this.player.height -= 1;
    return lanes;
  }
  moveDown(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height + 1][this.player.depth] = this.player.icon;
    this.player.height += 1;
    return lanes;
  }

  moveLeft(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height][this.player.depth - 1] = this.player.icon;
    this.player.depth -= 1;
    return lanes;
  }

  moveRight(lanes) {
    lanes[this.player.height][this.player.depth] = "_";
    lanes[this.player.height][this.player.depth + 1] = this.player.icon;
    this.player.depth += 1;
    return lanes;
  }

  play() {
    this.displayWelcomeMessage();
  
    while (true) {
      this.landscape.display();
      this.addObstacles();
      console.log("HERE")
      this.landscape.display();
      let nextMove = rls.question("Take a step: ");
      switch (nextMove) {
        case '[A':
          this.moveUp(this.landscape.lanes);
          break;
        case '[B':
          this.moveDown(this.landscape.lanes);
          break;
        case '[C':
          this.moveRight(this.landscape.lanes);
          break;
        case '[D':
          this.moveLeft(this.landscape.lanes);
          break;
      };
      this.landscape.display();
      // if (this.gameOver()) break;
    }
  }


  displayWelcomeMessage() {
    console.log("Welcome to Frogger!");
  }
  gameOver() {
    return this.collision() || this.froggerWon();
  }
  collision() {
    // if Frogger is hit by an obstacle
    return false;
  }
  froggerWon() {
    // if Frogger is in the 0 index sub-array
    // remove default true later
    return true;
  }
}

let game = new FroggerGame();
game.play();
