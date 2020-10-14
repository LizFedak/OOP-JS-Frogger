/*
_____________________
🐸🚚🚗🚚          🚚
🚗     🚗🚗
     🚚        🚚🚚
_____________________

trucks are slow (1 spot)
cars are fast (2 spots)
_________________
|     end       |
|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|
|____start______|

_________________
|     end       |
|_|_|_|_|_|=|=|_|
|_|_|x|_|_|_|_|_|
|_|_|x|_|_|_|_|_|
|_|_|_|_|_|_|x|_|
|_|_|_|_|_|_|_|x|
|____start______|

_________________
|     end       |
|_|_|_|=|=|_|_|_|
|_|x|_|_|_|_|_|_|
|_|x|_|_|_|_|_|_|
|_|_|_|_|_|x|_|_|
|_|_|_|_|_|_|x|_|
|____start______|



nouns
car
truck 
vehicle 
road 
frogger 
grid/board 

behavior 
move 

go back to start 
get hit 
win 


*/
// 🐸🚚🚗

class Frog {
  constructor() {
    this.icon = "🐸";
  }

}

class Obstacle {
  constructor() {
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

class StartLane extends Lane {
  constructor(lane) {
    super(lane);
    this.lane = (new Array(19)).fill("_");
    this.lane[9] = "🐸";
  }
}

class Landscape {
  constructor() {
    this.lanes = [];
    this.startlane = new StartLane().lane;
    for (let counter = 0; counter <= 5; counter++ ) {
      this.lanes.push(new Lane().lane);
    }
  }
  display() {
    this.lanes.forEach(lane => console.log(lane.join("")));
    console.log(this.startlane.join(""));
  }
}

class FroggerGame {
  constructor() {
    this.landscape = new Landscape();
  } 
  play() {
    let x = 1;
    while (x < 2) {
      this.landscape.display();
      x ++;
    }
  }
}

let game = new FroggerGame();
game.play();
