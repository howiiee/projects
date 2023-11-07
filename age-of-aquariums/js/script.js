// Declaring initial global variables
let fishes = [];  // Array to hold fish objects
let fishImg;  // Fish image placeholder
let shark;  // Main character
let sharkImg;  // Main character image
let eatenCount = 0;  // Count of fishes eaten
let gameState = "playing";  // Tracks the game state
let offset = 10;  // Collision offset
let enemyShark;  // Enemy character
let sharkIsAlive = true;  // Checks if main shark is still alive
let enemySharkImg;  // Enemy character image
let reefImg;  // Image of a reef
let bubblesImg;  // Image of bubbles
let bubbles = [];  // Array to hold bubble objects

// Preloading assets for better performance and to avoid flickering
function preload() {
    fishImg1 = loadImage("assets/images/fish.png");
    fishImg2 = loadImage("assets/images/fish2.png");
    sharkImg = loadImage("assets/images/shark.gif");
    bgGif = loadImage("assets/images/water.png");
    enemySharkImg = loadImage("assets/images/enemyShark.gif");
    reefImg = loadImage("assets/images/reef.gif");
    bubblesImg = loadImage("assets/images/bubbles.gif");
}

// Setting up canvas and initial game state
function setup() {
    createCanvas(500, 500);  // Setting canvas size

    // Creating the main character, placing in the center
    shark = {
        img: sharkImg,
        x: width / 2,
        y: height / 2,
        size: 50
    };

    // Creating enemy shark
    enemyShark = new EnemyShark();

    // Initializing fish objects
    for (let i = 0; i < 20; i++) {
        fishes.push(new Fish());
    }

    // Initializing bubble objects
    for (let i = 0; i < 8; i++) {
        bubbles.push(new Bubble());
    }
}

// Main draw loop for rendering graphics
function draw() {
    let bgWidth = bgGif.width;
    let bgHeight = bgGif.height;
    imageMode(CENTER);

    // Creating tiled background
    for (let x = 0; x <= width + bgWidth; x += bgWidth) {
        for (let y = 0; y <= height + bgHeight; y += bgHeight) {
            image(bgGif, x, y, bgWidth, bgHeight);
        }
    }

    // Drawing reef image
    image(reefImg, 230, 467);

    // Displaying bubbles
    for (let bubble of bubbles) {
        bubble.show();
    }

    // Moving and displaying fishes, checking collisions
    for (let i = fishes.length - 1; i >= 0; i--) {
        fishes[i].show();
        fishes[i].move();

        if (collides(fishes[i])) {
            shark.size += 10;
            fishes.splice(i, 1);  // Removing eaten fish from array
            eatenCount++;

            if (eatenCount == 15) {  // Check for end game condition
                gameState = "ending";
            }
        }
    }

    // Moving and displaying enemy shark
    enemyShark.show();
    enemyShark.move();

    // Check collision with enemy shark
    if (enemyShark.enemyCollides(shark)) {
        gameState = "enemyCollision";
        sharkIsAlive = false;
    }

    // Ending game if collided with enemy
    if (gameState == "enemyCollision") {
        background(255, 0, 0);
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
        noLoop();
    }

    // Clamping shark's position to canvas dimensions
    let clampedMouseX = constrain(mouseX, shark.size / 2, width - shark.size / 2);
    let clampedMouseY = constrain(mouseY, shark.size / 2, height - shark.size / 2);

    // Drawing the main shark if alive
    if (sharkIsAlive) {
        imageMode(CENTER);
        image(shark.img, clampedMouseX, clampedMouseY, shark.size, shark.size);
    }

    // Ending game if all fishes are eaten
    if (gameState == "ending") {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("You ate! Slay!", width / 2, height / 2);
        noLoop();
    }
}

// Checking collision between shark and given fish
function collides(f) {
    let distance = dist(f.x, f.y, mouseX, mouseY);
    return distance < (f.size / 2 + shark.size / 2) - offset;
}

// Class defining properties and behaviors of Fish objects
class Fish {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = 30;
        this.speedX = random(-2, 2);
        this.speedY = random(-2, 2);
        this.img = random([fishImg1, fishImg2]);
    }

    // Method to move the fish
    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Check for edges and reverse speed if needed
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
    }

    // Method to display the fish
    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.size, this.size);
    }
}

// Class defining properties and behaviors of the enemy shark
class EnemyShark {
    constructor() {
        this.img = enemySharkImg;
        this.x = random(width);
        this.y = random(height);
        this.offset = 50;
        this.width = 150;
        this.height = 50;
        this.size = 40;
        this.chaseSpeed = 0.04;  // Speed at which it chases the player
    }

    // Method to move the enemy shark towards player
    move() {
        this.x = lerp(this.x, mouseX, this.chaseSpeed);
        this.y = lerp(this.y, mouseY, this.chaseSpeed);
    }

    // Method to display the enemy shark
    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
    }

    // Check collision with main shark
    enemyCollides() {
        let distance = dist(this.x, this.y, mouseX, mouseY);
        return (distance < (this.width / 2 + shark.size / 2) - this.offset) || (distance < (this.height / 2 + shark.size / 2) - this.offset);
    }
}

// Reset game to initial state
function resetGame() {
    fishes = [];
    bubbles = [];
    eatenCount = 0;
    gameState = "playing";
    sharkIsAlive = true;
    shark.size = 50;
    shark.x = width / 2;
    shark.y = height / 2;
    enemyShark = new EnemyShark();

    for (let i = 0; i < 20; i++) {
        fishes.push(new Fish());
    }

    for (let i = 0; i < 8; i++) {
        bubbles.push(new Bubble());
    }

    loop();  // Restart the game loop
}

// Mouse press event to handle game reset on game over
function mousePressed() {
    if (gameState === "ending" || gameState === "enemyCollision") {
        resetGame();
    }
}

// Class defining properties and behaviors of bubbles
class Bubble {
    constructor() {
        this.x = random(width);
        this.y = random(height);
    }

    // Method to display the bubble
    show() {
        imageMode(CENTER);
        image(bubblesImg, this.x, this.y);
    }
}
