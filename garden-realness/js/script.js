let flowerImages = [];
let flowers = [];
let pests = [];
let gardener;
const numFlowers = 10;

function preload() {
    for (let i = 0; i < 16; i++) {
        flowerImages[i] = loadImage("assets/images/flower" + nf(i, 2) + ".png");
    }
    pestImage = loadImage("assets/images/pest.gif");
    bgImage = loadImage("assets/images/bg.png");
    bgFlowerImage = loadImage("assets/images/flowers.gif");
}

function setup() {
    createCanvas(800, 600);
    gardener = new Gardener();
    for (let i = 0; i < numFlowers; i++) {
        flowers.push(new Flower(random(50, width - 50), random(50, height - 50)));
    }

    currentState = new TitleState();

    // Spawn the initial pest(s) after 5 seconds
    pests.push(new Pest());
    pests.push(new Pest());

    // Call spawnPest every second
    setInterval(spawnPest, 5000);
}


function draw() {
    currentState.display();
}

function keyPressed() {
    currentState.keyPressed();
}

function mouseClicked() {
    currentState.mouseClicked();
}

function drawTiledBackground() {
    let bgWidth = bgImage.width;
    let bgHeight = bgImage.height;

    // Creating tiled background
    for (let x = 0; x <= width; x += bgWidth) {
        for (let y = 0; y <= height; y += bgHeight) {
            image(bgImage, x, y, bgWidth, bgHeight);
        }
    }
}

function drawTiledBackgroundFlowers() {
    let bgFlowerImageWidth = bgFlowerImage.width;
    let bgFlowerImageHeight = bgFlowerImage.height;

    // Creating tiled background
    for (let x = 0; x <= width; x += bgFlowerImageWidth) {
        for (let y = 0; y <= height; y += bgFlowerImageHeight) {
            image(bgFlowerImage, x, y, bgFlowerImageWidth, bgFlowerImageHeight);
        }
    }
}

function spawnPest() {
    // Set a maximum number of pests to avoid performance issues
    const maxPests = 25;

    if (pests.length >= maxPests) {
        // If we've reached the maximum number of pests, don't spawn new ones
        return;
    }
    if (!(currentState instanceof SimulationState)) {
        return;
    }
    if (pests.length < 1) {
        // Delay the first spawn by 5 seconds if there are no pests
        setTimeout(() => {
            if (pests.length < maxPests) { // Check again to avoid overshooting the max limit
                pests.push(new Pest());
            }
        }, 5000);
    } else {
        // Immediately spawn a new pest for each existing one
        let newPests = [];
        pests.forEach(pest => {
            if (pests.length + newPests.length < maxPests) { // Check to avoid overshooting the max limit
                newPests.push(new Pest(pest.x, pest.y));
            }
        });
        pests = pests.concat(newPests);
    }
}


class TitleState {
    display() {
        drawTiledBackground();
        drawTiledBackgroundFlowers();
        textSize(32);
        textAlign(CENTER);
        fill(0);
        text("Garden Simulation", width / 2, height / 2 - 40);
        textSize(16);
        text("[click to start]", width / 2, height / 2);
    }

    mouseClicked() {
        currentState = new RulesState();
    }

}

class RulesState {
    display() {
        drawTiledBackground();
        textSize(24);
        textAlign(CENTER);
        fill(252, 186, 3);

        // Display the rules
        text("rules:", width / 2, height / 2 - 100);
        textSize(20);
        text("make all the flowers bloom, watch out for the pests!", width / 2, height / 2 - 60);
        text("use the keypad to move the gardener", width / 2, height / 2 - 30);
        text("click the space bar to water the plants in gardener mode", width / 2, height / 2);
        text("click the space bar to kill the pests in exterminator mode", width / 2, height / 2 + 30);
        text("press the 'F' key to change between gardener mode and exterminator mode", width / 2, height / 2 + 60);
        textSize(16);
        text("[click to start the game]", width / 2, height / 2 + 110);
    }

    mouseClicked() {
        currentState = new SimulationState(); // Transition to the simulation state on click
    }
}

class SimulationState {
    display() {
        drawTiledBackground();
        gardener.move();
        gardener.display();

        for (let pest of pests) {
            pest.move();
            pest.display();
            for (let flower of flowers) {
                pest.attack(flower);
            }
        }

        let allBloomed = true;
        let allDamaged = true;
        for (let flower of flowers) {
            flower.update();
            flower.display();
            if (flower.bloomState !== flowerImages.length - 1) allBloomed = false;
            if (flower.bloomState !== 0) allDamaged = false;
        }

        if (allBloomed) {
            currentState = new WinState();
        } else if (allDamaged) {
            currentState = new LoseState();
        }
    }

    keyPressed() {
        if (keyCode === 70) { // 'F' key
            gardener.toggleMode();
        } else if (keyCode === 32) { // Spacebar
            if (gardener.mode === 'watering') {
                flowers.forEach(flower => {
                    if (dist(flower.x, flower.y, gardener.x, gardener.y) < flower.size) {
                        flower.water();
                    }
                });
            } else if (gardener.mode === 'pest control') {
                // Check for pests close to the gardener and "kill" them
                pests = pests.filter(pest => {
                    if (dist(pest.x, pest.y, gardener.x, gardener.y) < 50) {
                        return false; // Remove the pest from the array
                    }
                    return true;
                });
            }
        }
    }

    mouseClicked() { }
}

class WinState {
    display() {
        drawTiledBackground();
        textSize(32);
        textAlign(CENTER);
        fill(252, 186, 3);
        text("congratulations! all flowers have bloomed!", width / 2, height / 2);
    }

    keyPressed() { }
    mouseClicked() { }
}

class LoseState {
    display() {
        background(255, 0, 0);
        textSize(32);
        textAlign(CENTER);
        fill(255);
        text("oh no! all flowers have been damaged!", width / 2, height / 2);
    }

    keyPressed() { }
    mouseClicked() { }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bloomState = 1;
        this.lastBloomUpdate = millis();
        this.targetedByPests = 0;
        this.size = 75;
    }

    water() {
        this.bloomState = min(this.bloomState + 2, flowerImages.length - 1);
    }

    update() {
        // Only update bloomState if it's not already showing the last frame
        if (this.bloomState < flowerImages.length - 1) {
            if (millis() - this.lastBloomUpdate > 4000) {
                this.bloomState++;
                this.lastBloomUpdate = millis();
            }
        }
    }


    display() {
        image(flowerImages[this.bloomState], this.x, this.y, this.size, this.size);
    }

    addPest() {
        this.targetedByPests = min(this.targetedByPests + 1, 2); // Ensure the count doesn't exceed 2
    }

    removePest() {
        this.targetedByPests = max(this.targetedByPests - 1, 0); // Ensure the count doesn't go below 0
    }
}

class Gardener {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 50;
        this.mode = 'watering'; // Start in 'watering' mode
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;

        // Keep the gardener within the canvas
        this.x = constrain(this.x, this.size / 2, width - this.size / 2);
        this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }

    display() {
        // Draw the gardener
        fill(0, 128, 0);
        ellipse(this.x, this.y, this.size);

        // If in 'pest control' mode, draw a red circle around the gardener
        if (this.mode === 'pest control') {
            noFill(); // No fill for the circle
            stroke(255, 0, 0); // Red color
            strokeWeight(2); // Set the stroke weight to make the circle visible
            ellipse(this.x, this.y, this.size + 20); // Draw the circle slightly larger than the gardener
            noStroke(); // Reset stroke so it doesn't affect other drawings
        }
    }

    toggleMode() {
        // Toggle between 'watering' and 'pest control' modes
        this.mode = this.mode === 'watering' ? 'pest control' : 'watering';
    }
}


class Pest {
    constructor(x = random(width), y = random(height)) {
        this.x = x;
        this.y = y;
        this.speed = 0.5;
        this.size = 20;
        this.attackEnabled = false;
        this.targetFlower = null;
        this.lastAttackTime = 0;
        this.wanderTheta = random(TWO_PI); // Initialize a random direction for wandering
    }

    selectTarget() {
        let closestFlower = null;
        let recordDistance = Infinity;

        flowers.forEach(flower => {
            let d = dist(this.x, this.y, flower.x, flower.y);
            if (d < recordDistance && flower.bloomState > 0 && flower.targetedByPests < 2) {
                recordDistance = d;
                closestFlower = flower;
            }
        });

        if (this.targetFlower && this.targetFlower !== closestFlower) {
            this.targetFlower.removePest();
        }

        this.targetFlower = closestFlower;

        if (this.targetFlower) {
            this.targetFlower.addPest();
        }
    }

    wander() {
        // Update wanderTheta to steer the pest in a new random direction
        this.wanderTheta += random(-0.1, 0.1);

        // Apply the new direction to the pest's position
        this.x += this.speed * cos(this.wanderTheta);
        this.y += this.speed * sin(this.wanderTheta);

        // Keep the pest within the bounds of the canvas
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    move() {
        if (!this.targetFlower || this.targetFlower.bloomState === 0) {
            this.selectTarget();
        }
    
        if (this.targetFlower) {
            // Calculate the bottom center of the target flower
            let bottomCenterX = this.targetFlower.x + this.targetFlower.size / 2;
            let bottomCenterY = this.targetFlower.y + this.targetFlower.size;
    
            // Create a vector that points from the pest's position to the bottom center of the flower
            let desired = createVector(bottomCenterX - this.x, bottomCenterY - this.y);
            desired.setMag(this.speed);
            this.x += desired.x;
            this.y += desired.y;
        } else {
            // If no target flower, wander around
            this.wander();
        }
    }

    display() {
        image(pestImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    attack(flower) {
        // Check if the pest is near the bottom center of the flower
        let bottomCenterX = flower.x + flower.size / 2;
        let bottomCenterY = flower.y + flower.size;
        if (flower === this.targetFlower && dist(this.x, this.y, bottomCenterX, bottomCenterY) < this.size / 2) {
            const currentTime = millis();
            if (currentTime - this.lastAttackTime >= 750) {
                flower.bloomState = max(flower.bloomState - 1, 0);
                this.lastAttackTime = currentTime;
    
                if (flower.bloomState === 0) {
                    this.selectTarget();
                }
            }
        }
    }
}



