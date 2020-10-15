let rls = require('readline-sync');

class Frog {
  constructor(height, depth, icon = "🐸") {
    this.icon = icon;
    this.lives = 3;
    this.height = height;
    this.depth = depth;
    this.wonRound = false;
    this.didNotDie = true;
    this.direction;
    this.outOfBounds = false;
    this.hitByCar = false;
  }
}

class Obstacles {
  constructor() {
    this.obstacles = {};
    this.counter;
    this.addCounterGenerator;
    this.lastkey;
    this.startingNumberOfObstacles();
    for (let count = 0; count <= this.counter; count++ ) {
      this.obstacles[String(count)] = new Obstacle(true);
    }
  }
  startingNumberOfObstacles() {
    this.counter = Math.floor(Math.random() * 10) + 1;
  }
  addNumber() {
    this.addCounterGenerator = Math.floor(Math.random() * 3) + 1;
  }
  lastKey() {
    this.lastkey = Math.max(...Object.keys(this.obstacles)) + 1;
  }
}

class Obstacle {
  constructor(newGame, icon = "🚗") {
    this.icon = icon;
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
    this.points = 0;
    this.newGame = true;
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
    let max = this.obstacles.addCounterGenerator + count;
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

  checkOutOfBounds() {
    this.player.outOfBounds = (this.player.height - 1 === 0 && this.player.direction === "up") || (this.player.height + 1 === 6 && this.player.direction === "down") || (this.player.depth - 1 < 0 && this.player.direction === "left") || (this.player.depth + 1 === 20 && this.player.direction === "right");
  }

  moveIcon(lanes, direction) {
    lanes[this.player.height][this.player.depth] = this.lane.square;
    switch (direction) {
      case "up":
        this.player.height -= 1;
        break;
      case "down":
        this.player.height += 1;
        break;
      case "left":
        this.player.depth -= 1;
        break;
      case "right":
        this.player.depth += 1;
        break;
    }
    lanes[this.player.height][this.player.depth] = this.player.icon;
  }

  move(lanes, direction) {
    this.player.direction = direction;
    this.checkOutOfBounds();
    this.checkHitByCar(lanes);

    if (this.player.outOfBounds) {
      if (this.player.direction === "up") {
      this.gameOver();
      this.froggerWon();
      } else {
        console.log("Missed turn");
      }
    } else if (this.player.hitByCar) {
      this.gameOver();
      this.collision();
    } else {
      this.moveIcon(lanes, direction);
      return lanes;
    }
  }
  checkHitByCar(input) {
    let lanes = input;
    if (lanes[this.player.height - 1][this.player.depth] === this.obstacle.icon && this.player.direction === "up") {
      this.player.hitByCar = true;
    }
  }

  play() {
    this.wonRound = false;
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
          this.move(this.landscape.lanes, "up");
          break;
        case '[B':
          this.move(this.landscape.lanes, "down");
          break;
        case '[C':
          this.move(this.landscape.lanes, "right");
          break;
        case '[D':
          this.move(this.landscape.lanes, "left");
          break;
      };
      this.moveObstacles();
      this.addMoreObstacles();
      if (!this.wonRound) {
        this.testForCollision();
      }
      console.clear();
    }
    while (this.player.lives > 0) {
      if (this.player.didNotDie === true) {
        this.useNextLife();
      } else {
        this.removeLife();
        this.useNextLife();
      }
    }
    this.askToPlayAgain();
    // console.log(this.continuePlaying);
    this.continuePlaying === "yes" ? this.playAgain() : console.log("Goodbye");
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
  askToPlayAgain() {
    this.continuePlaying = rls.question("Do you want to play again? ");
  }
  playAgain(player) {
    console.log(player.lives, "LIVES");
    if (player.lives === 0) {
      this.player = new Frog(this.landscape.lanes.length - 1, this.landscape.lanes[0].length / 2 );
    }
    this.landscape = new Landscape();
    this.obstacles = new Obstacles();
    this.obstacle = new Obstacle();
    this.lane = new Lane();
    this.keepPlaying = true;
    this.play();
  }

  useNextLife() {
    this.player.depth = 10;
    this.player.height = 5;
    this.player.didNotDie = true;
    this.playAgain(this.player);
  }

  removeLife() {
    this.player.lives -= 1;
  }

  increasePoints() {
    this.points += 100;
  }

  displayPoints() {
    console.log(`Total points: ${this.points}`);
  }

  displayWelcomeMessage() {
    if (this.newGame) {
      console.log("Welcome to Frogger! To control Frogger, use your keyboard arrow keys. This is Frogger Checkers, so the obstacles won't move until you do. The obstacles will advance one spot ahead each time you move. If they hit you, Frogger loses a life. If you are hit 3 times, the game is over.");
    }
    this.newGame = false;
  }
  gameOver() {
    console.clear();
    this.keepPlaying = false;
  }

  collision() {
    // if Frogger is hit by an obstacle
    this.player.didNotDie = false;
    console.log("YOU HIT AN OBSTACLE WAH")
  }
  froggerWon() {
    this.wonRound = true;
    this.increasePoints();
    console.log("YOU WON!");
    this.displayPoints();
  }
}

let game = new FroggerGame();
game.play();
