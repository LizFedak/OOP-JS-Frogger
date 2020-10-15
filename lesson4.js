let rls = require('readline-sync');

class Frog {
  constructor(height, depth) {
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
    this.lane = (new Array(20)).fill("_");
  }
  display() {
    console.log(this.lane.join(""));
  }
}

class Landscape {
  constructor() {
    this.lanes = [];
    for (let counter = 0; counter <= 5; counter++ ) {
      this.lanes.push(new Lane().lane);
    }
    // let startLane = (new Array(19)).fill("_");
    // startLane[4] = "🐸";
    // this.lanes.push(startLane);
  }
  display() {
    this.lanes.forEach(lane => console.log(lane.join("")));
  }
}

class FroggerGame {
  constructor() {
    this.landscape = new Landscape();
    this.player = new Frog(this.landscape.lanes.length - 1, this.landscape.lanes[0].length / 2 );
    this.obstacles = new Obstacles();
    this.obstacle = new Obstacle();
  } 
  addObstacles() {
    let obj = this.obstacles.obstacles;
    for (const key in obj) {
      // console.log(obj[key].height);
      let height = obj[key].height;
      let depth = obj[key].depth;
      this.landscape.lanes[height][depth] = this.obstacle.icon;
      // console.log(this.obstacles.obstacles[key])
      obj[key].depth = obj[key].depth - 1;
      // console.log(this.obstacles.obstacles[key])
    }
  }
  
  froggieStart() {
    let height = this.player.height;
    let depth = this.player.depth;
    this.landscape.lanes[height][depth] = this.player.icon;
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
    this.addObstacles();
    this.froggieStart();

    while (true) {
      this.landscape.display();
      let nextMove = rls.question("Your turn > ");
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
      // this.landscape.display();
      // if (this.gameOver()) break;
    }
  }


  displayWelcomeMessage() {
    console.log("Welcome to Frogger! To control Frogger, use your keyboard arrow keys. This is Frogger Checkers, so the obstacles won't move until you do. The obstacles will advance one spot ahead each time you move. If they hit you, Frogger dies.");
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
