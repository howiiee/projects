
// Initial game state and score setup
let state = 0; // possible states are: 0, 1, 2, 3, 4 and 5
let score = 0;

// Definitions for various game objects with their positions, sizes and image placeholders
let sun = {
    x: 100,
    y: 100,
    img: undefined,
    width: 100,
    height: 100
};

let cloud = {
    x: 400,
    y: 125,
    img: undefined,
    width: 130,
    height: 130
};
let grass = {
    x: 200,
    y: 300,
    img: undefined,
    width: 120,
    height: 27
};

let bush = {
    x: 300,
    y: 325,
    img: undefined,
    width: 180,
    height: 51
};

let flowers = {
    x: 500,
    y: 350,
    img: undefined,
    width: 40,
    height: 40
};

let whiteFlowers = {
    x: 100,
    y: 280,
    img: undefined,
    width: 43,
    height: 45
    
};

let mouseImg ={
    width: undefined, // Will represent the image under the mouse cursor
    height: undefined,
    img: undefined
};

let bgImg;
let objects = [grass, bush, whiteFlowers, flowers, sun, cloud]; // Array to store all objects

function preload() {

    bgImg = loadImage("assets/images/xp.jpg");

    // Load image assets for various game objects
    grass.img = loadImage("assets/images/grass.gif");
    sun.img = loadImage("assets/images/sun.gif");
    bush.img = loadImage("assets/images/bush.gif");
    flowers.img = loadImage("assets/images/flowers.gif");
    whiteFlowers.img = loadImage("assets/images/whiteFlowers.gif");
    cloud.img = loadImage("assets/images/cloud.gif");
    mouseImg.img = loadImage("assets/images/sun.gif");

}


function setup() {

    createCanvas(640, 400);
    imageMode(CENTER);

    // Set interval to update object positions and image for mouse cursor every 2 seconds
    setInterval(updatePosition, 2000);
    setInterval(updateImg, 2000);
    
}


function draw() {

    // Conditional rendering based on game state
    if (state === 0){
        // Display game instructions
        textAlign(CENTER, CENTER);
        textSize(20);
        background(166, 219, 245);
        fill(255);
        text("match the mouse icon to the icons displayed on the screen <3", width/2, height/2);
    }
    else if (state === 1){
        // Main gameplay display and logic
        image(bgImg, width/2, height/2, width, height);

        textSize(20);
        textAlign(LEFT, TOP);
        fill(166, 219, 245);
        text(`score: ${score}`, 4, 0);


        image(grass.img, grass.x, grass.y, grass.width, grass.height);
        image(bush.img, bush.x, bush.y, bush.width, bush.height);
        image(flowers.img, flowers.x, flowers.y, flowers.width, flowers.height);
        image(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        image(sun.img, sun.x, sun.y, sun.width, sun.height);
        image(whiteFlowers.img, whiteFlowers.x, whiteFlowers.y, whiteFlowers.width, whiteFlowers.height);
        image(mouseImg.img, mouseX, mouseY, mouseImg.width, mouseImg.height);   

        for (let i = 0; i < objects.length; i++){

            let d = dist(mouseX, mouseY, objects[i].x, objects[i].y);

            if (objects[i].img === mouseImg.img && d < mouseImg.width / 4 + objects[i].width / 4){
                score++;
                if (score === 5){
                    state = 3;
                }
                else if(score === 15){
                    state = 4;
                }
                else if(score === 25){
                    state = 5;
                }
                else{
                    state = 2;
                }
                
            }
        }
    }
    else if (state === 2){
        // Display feedback when a match is found
        textAlign(CENTER, CENTER);
        textSize(20);
        background(166, 219, 245);
        fill(255);
        text("MATCH!", width/2, height/2);
    }
    else if (state === 3){
        // Display message for reaching score of 5
        textAlign(CENTER, CENTER);
        textSize(20);
        background(255, 0, 0);
        fill(255);
        text("tired of playing? sucks... keep playing.", width/2, height/2);
    }
    else if (state === 4){
        // Display message for reaching score of 15
        textAlign(CENTER, CENTER);
        textSize(20);
        background(199, 0, 0);
        fill(255);
        text("I SAID, keep playing.", width/2, height/2);
    }
    else if (state === 5){
        // Display win message and offer to replay
        textAlign(CENTER, CENTER);
        textSize(20);
        background(166, 219, 245);
        fill(255);
        text("ok fine, you win or whatever...", width/2, height/2);
        textSize(10);
        text("click if you want to replay :)", width/2, height/2 + 50);
        score = 0;
    }

    

}


function updatePosition() {

    // Ensure objects do not overlap when repositioned
    for (let i = 0; i < objects.length; i++) {
        let overlap;
        let attempt = 0; 
        do {
            overlap = false;
            if (i < 4) {
                objects[i].x = random(objects[i].width / 2, width - objects[i].width / 2);
                objects[i].y = random(260 + objects[i].height / 2, height - objects[i].height / 2);
            } else {
                objects[i].x = random(objects[i].width / 2, width - objects[i].width / 2);
                objects[i].y = random(objects[i].height / 2, 260 - objects[i].height / 2);
            }

            // Check for overlaps with other objects
            for (let j = 0; j < i; j++) {
                if (isOverlapping(objects[i], objects[j])) {
                    overlap = true;
                    break;
                }
            }
            attempt++;
        } while (overlap && attempt < 10); // reposition current object up to 10 times if overlaps are detected
    }
}

// Check if two objects overlap
function isOverlapping(obj1, obj2) {
    let distance = dist(obj1.x, obj1.y, obj2.x, obj2.y);
    return distance < (obj1.width / 2 + obj2.width / 2);
}

// Update the image and size of the mouse cursor to a random game object
function updateImg(){
    let randomImg = floor(random(0, objects.length));
    mouseImg.img = objects[randomImg].img;
    mouseImg.width = objects[randomImg].width;
    mouseImg.height = objects[randomImg].height;
}

// Handle mouse presses to change game states
function mousePressed(){
    if (state === 0){
        state = 1;
    }
    else if (state === 2){
        state = 1
    }
    else if (state === 3){
        state = 1;
    }
    else if (state === 4){
        state = 1;
    }
    else if (state === 5){
        state = 0;
    }
}





