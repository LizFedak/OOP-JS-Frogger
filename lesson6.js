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
    this.startNumber();
    for (let counter = 0; counter <= this.counter; counter++ ) {
      this.obstacles[String(counter)] = new Obstacle(true);
    }
  }
  startNumber() {
    this.counter = Math.floor(Math.random() * 10) + 1;
  }
  addNumber() {
    this.addCounter = Math.floor(Math.random() * 3) + 1;
  }
  lastKey() {
    this.lastkey = Math.max(...Object.keys(this.obstacles)) + 1;
  }
}

class Obstacle {
  constructor(newGame) {
    this.icon = "🚗";
    this.startHeight();
    this.new = newGame;
    this.startDepth();
    this.legal = true;
    
  }
  move() {
    this.depth -= 1;
    this.legal = this.depth >= 0 ? true : false;
  }
  startHeight() {
    this.height = Math.floor(Math.random() * 4 + 1);
  }
  startDepth() {
    if (this.new) {
      this.depth = Math.floor(Math.random() * 20);
    } else {
      this.depth = 19;
    }
  }
}

class Lane {
  constructor() {
    this.square = "_ ";
    this.lane = (new Array(20)).fill(this.square);
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
    this.lane = new Lane();
    this.keepPlaying = true;
  } 
  addObstaclesStart() {
    let obj = this.obstacles.obstacles;
    for (const key in obj) {
      let height = obj[key].height;
      let depth = obj[key].depth;
      this.landscape.lanes[height][depth] = this.obstacle.icon;
    }
  }
  addMoreObstacles() {
    
    let obj = this.obstacles.obstacles
    this.obstacles.addNumber();
    this.obstacles.lastKey();
    let count = Number(String(this.obstacles.lastkey));
    let max = this.obstacles.addCounter + count;
    for (count; count < max; count++ ) {

      obj[String(count)] = new Obstacle(false);
      for (const key in obj) {
        let height = obj[key].height;
        let depth = obj[key].depth;
        this.landscape.lanes[height][depth] = this.obstacle.icon;
      }
    }
  }


  froggieStart() {
    let height = this.player.height;
    let depth = this.player.depth;
    this.landscape.lanes[height][depth] = this.player.icon;
  }

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
    console.log(this.player.height);
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

  play() {
    this.displayWelcomeMessage();
    this.addObstaclesStart();
    this.froggieStart();
    this.ready();
    console.clear();
    
    while (this.keepPlaying) {
      this.landscape.display();
      let nextMove = rls.question("Your turn > ");;      
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
      this.moveObstacles();
      this.addMoreObstacles();
      this.testForCollision();
      // console.clear();
    }
  }

  testForCollision() {
    let lanes = this.landscape.lanes;
    let froggieIsHere = false;
    lanes.forEach(array => {
      if (array.includes("🐸")) {
        froggieIsHere = true;
      }
    });
    if (!froggieIsHere) {
      this.gameOver();
      this.collision();
    }
  }

  ready() {
    rls.question("ARE YOU READY? ");
  }
  moveObstacles() {
    let obj = this.obstacles.obstacles;
    Object.keys(obj).forEach(innerObj => {
      let height = obj[innerObj].height;
      let depth = obj[innerObj].depth;
      this.landscape.lanes[height][depth] = this.lane.square;
      
      obj[innerObj].move();

      if (obj[innerObj].legal === false) {
        delete obj[innerObj];
      } else {
        depth = obj[innerObj].depth;
        this.landscape.lanes[height][depth] = this.obstacle.icon;
      }
    });
  }


  displayWelcomeMessage() {
    console.log("Welcome to Frogger! To control Frogger, use your keyboard arrow keys. This is Frogger Checkers, so the obstacles won't move until you do. The obstacles will advance one spot ahead each time you move. If they hit you, Frogger loses a life. If you are hit 3 times, the game is over.");
  }
  gameOver() {
    console.clear();
    this.keepPlaying = false;
    // increase points
    // return this.collision() || this.froggerWon();
  }

  collision() {
    // if Frogger is hit by an obstacle
    console.log("YOU HIT AN OBSTACLE WAH")
  }
  froggerWon() {
    console.log("YOU WON!");
  }
}

let game = new FroggerGame();
game.play();
