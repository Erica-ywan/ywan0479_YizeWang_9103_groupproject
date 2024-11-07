let Blocks = [];
let smallBlockSize;
let Cars = []; // Array to store car blocks

function setup() {
  createCanvas(windowWidth, windowHeight); // Drawing canvas as window size
  initializeBlocks(); // Draw different coloured blocks as buildings, roads, pavements, zebra crossings.
  generateRandomSmallBlocks(); // Generate small red or blue blocks to simulate cars
  drawBlocks();
}

function draw() {
  drawBlocks();
  updateSmallBlockColors(); // Update colors using Perlin noise
  moveCars(); // Move the cars along the roads
  drawCars(); // Draw the moving cars
}

// Allow output images to automatically adjust to changes in window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  Blocks = []; // Clear the original Blocks array at each window adjustment 
  Cars = []; // Clear the Cars array
  initializeBlocks();
  generateRandomSmallBlocks();
  drawBlocks();
}

function initializeBlocks() {
  smallBlockSize = 0.02 * min(windowWidth, windowHeight);
  // Simulate roads, buildings and pavements with blocks 
  // Yellow blocks simulate city roads, and set its isRoad to true
  Blocks.push(new Block(0, 2 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 6 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(3 * smallBlockSize, 12 * smallBlockSize, 23 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 17 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 20 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 26 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 30 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 39 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 46 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(3 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(6 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, 46 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(11 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(26 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(28 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(40 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(46 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));

  // Yellow blocks simulate buildings
  Blocks.push(new Block(7 * smallBlockSize, 7 * smallBlockSize, 4 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(8 * smallBlockSize, 26 * smallBlockSize, 2 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(7 * smallBlockSize, 31.8 * smallBlockSize, 5 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(20 * smallBlockSize, 21 * smallBlockSize, 3 * smallBlockSize, 5 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(20 * smallBlockSize, 27 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(41 * smallBlockSize, 9 * smallBlockSize, 5 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(41 * smallBlockSize, 22 * smallBlockSize, 5 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));

  //blue blocks simulate buildings
  Blocks.push(new Block(4 * smallBlockSize, 13 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(4 * smallBlockSize, 36 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(14 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 5 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(31 * smallBlockSize, 31 * smallBlockSize, 5 * smallBlockSize, 8 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(41 * smallBlockSize, 13 * smallBlockSize, 3 * smallBlockSize, 2.5 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(43 * smallBlockSize, 42 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(10 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(18 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(70, 100, 190)));

  // Red blocks simulate buildings
  Blocks.push(new Block(7 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 3 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(8 * smallBlockSize, 40 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(8 * smallBlockSize, 44 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(22 * smallBlockSize, smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(34 * smallBlockSize, 19 * smallBlockSize, 4 * smallBlockSize, smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(34 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 5 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(31 * smallBlockSize, 33 * smallBlockSize, 5 * smallBlockSize, 4 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(41 * smallBlockSize, 10 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(42 * smallBlockSize, 35 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(12 * smallBlockSize, 42 * smallBlockSize, 4 * smallBlockSize, 4 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(3 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(6 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(160, 55, 45)));

  // Grey blocks simulate buildings
  Blocks.push(new Block(8 * smallBlockSize, 9 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(8 * smallBlockSize, 42 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(13 * smallBlockSize, 43 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(20 * smallBlockSize, 23 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(20 * smallBlockSize, 26 * smallBlockSize, 3 * smallBlockSize, 1.3 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(34 * smallBlockSize, 18 * smallBlockSize, 4 * smallBlockSize, 1.3 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(35 * smallBlockSize, 20 * smallBlockSize, 2.5 * smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(35 * smallBlockSize, 23 * smallBlockSize, 2.3 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(8 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(13 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));

  // Grey blocks simulate pavements and zebra crossings
  Blocks.push(new Block(2 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(10 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(12 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(26 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(30 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));

  Blocks.push(new Block(smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(18 * smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(32 * smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
}

// Create a class with each block (buildings, roads) as a separate object for management and drawing
class Block {
  constructor(x, y, w, h, c, isRoad = false) {
    this.x = x;                
    this.y = y;                
    this.w = w; 
    this.h = h;
    this.c = c;
    this.isRoad = isRoad; // Checks if blocks are road blocks, defaults to false
  }

  updateColor(noiseVal) {
    // Adjust the color based on Perlin noise value
    let r = map(noiseVal, 0, 1, 63, 200);
    let g = map(noiseVal, 0, 1, 130, 150);
    let b = map(noiseVal, 0, 1, 100, 255);
    this.c = color(r, g, b);
  }

  display() {
    noStroke(); 
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}

// Clear the canvas background and generate all blocks
function drawBlocks() {
  // Setting the canvas background color
  background(240, 240, 235);
  for (let i = 0; i < Blocks.length; i++) {
    Blocks[i].display();
  }
}

// Generate random blocks on road blocks to simulate cars
function generateRandomSmallBlocks() {
  for (let i = 0; i < Blocks.length; i++) {
    if (Blocks[i].isRoad) {
      let numSmallBlocks = 5; // Each road generates five blocks
      for (let t = 0; t < numSmallBlocks; t++) {
        let x = Blocks[i].x + Math.floor(random(0, Blocks[i].w / smallBlockSize)) * smallBlockSize;
        let y = Blocks[i].y + Math.floor(random(0, Blocks[i].h / smallBlockSize)) * smallBlockSize;
        let colorSmallBlock = random() > 0.5 ? color(160, 55, 45) : color(70, 100, 190);
        Cars.push(new Car(x, y, smallBlockSize, colorSmallBlock, Blocks[i]));
      }
    }
  }
}

// Class to create car objects
class Car {
  constructor(x, y, size, c, roadBlock) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = c;
    this.roadBlock = roadBlock; // Reference to the road block the car is on
    this.speed = random(1, 3); // Random speed for each car
    this.direction = roadBlock.w > roadBlock.h ? 'horizontal' : 'vertical'; // Determine movement direction based on road orientation
    this.trailAlpha = 150; // Initial transparency for the trail
    this.easing = random(0.03, 0.07); // Random easing value for each car's trail
  }

  move() {
    if (this.direction === 'horizontal') {
      this.x += this.speed;
      // If car reaches the end of the current road block, loop back or continue on the road
      if (this.x > this.roadBlock.x + this.roadBlock.w) {
        this.x = this.roadBlock.x; // Loop back to the start of the road block
      }
    } else if (this.direction === 'vertical') {
      this.y += this.speed;
      // If car reaches the end of the current road block, loop back or continue on the road
      if (this.y > this.roadBlock.y + this.roadBlock.h) {
        this.y = this.roadBlock.y; // Loop back to the start of the road block
      }
    }
  }

  display() {
    // Draw the trail effect with easing
    this.trailAlpha = lerp(this.trailAlpha, 0, this.easing); // Gradually reduce trail alpha with unique easing per car
    fill(red(this.c), green(this.c), blue(this.c), this.trailAlpha);
    noStroke();
    ellipse(this.x, this.y, this.size * 1.5); // Draw the trail with a slightly larger size

    // Draw the car
    fill(this.c);
    rect(this.x, this.y, this.size, this.size);

    // Reset trailAlpha when the car moves to maintain the effect
    if (this.trailAlpha < 10) {
      this.trailAlpha = 150;
    }
  }
}

// Move the cars along the roads
function moveCars() {
  for (let i = 0; i < Cars.length; i++) {
    Cars[i].move();
  }
}

// Draw the moving cars
function drawCars() {
  for (let i = 0; i < Cars.length; i++) {
    Cars[i].display();
  }
}

// Update the color of small blocks using Perlin noise
function updateSmallBlockColors() {
  let timeOffset = frameCount * 0.01;
  for (let i = 0; i < Blocks.length; i++) {
    if (Blocks[i].isRoad) {
      let noiseVal = noise(Blocks[i].x * 0.05, Blocks[i].y * 0.05, timeOffset);
      Blocks[i].updateColor(noiseVal);
    }
  }
}