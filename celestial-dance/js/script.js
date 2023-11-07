
let bgGif;
let fire;


// Define celestial bodies with initial properties
// sun object representing the Sun with its coordinates, dimensions, and image
let sun = {
    x: 250,
    y: 250,
    img: undefined,
    width: 200,
    height: 200

}

// Define other celestial bodies similarly, with initial properties and dragging states
let uranus = {
    x: 250,
    y:95,
    initialX: 250,
    initialY:95,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planet = {
    x: 375,
    y:125,
    initialX: 375,
    initialY:125,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planet2 = {
    x: 405,
    y:250,
    initialX: 405,
    initialY:250,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let mars = {
    x: 375,
    y:375,
    initialX: 375,
    initialY:375,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let moon = {
    x: 125,
    y: 375,
    initialX: 125,
    initialY: 375,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let saturn = {
    x: 125,
    y:125,
    initialX: 125,
    initialY:125,
    img: undefined,
    width: 120,
    height: 75,
    dragging: false
}

let alien = {
    x: 95,
    y:250,
    initialX: 95,
    initialY:250,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let earth = {
    x: 250,
    y:405,
    initialX: 250,
    initialY:405,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planets = [uranus, saturn, alien, planet, planet2, moon, mars, earth];

function preload() {

    // Load background, sun, planets, and fire images
    bgGif = loadImage("assets/images/space.gif");
    sun.img = loadImage("assets/images/sun.gif");
    earth.img = loadImage("assets/images/earth.gif");
    uranus.img = loadImage("assets/images/uranus.png");
    planet.img = loadImage("assets/images/planet.png");
    planet2.img = loadImage("assets/images/planet2.gif");
    mars.img = loadImage("assets/images/mars.png");
    saturn.img = loadImage("assets/images/saturn.png");
    alien.img = loadImage("assets/images/alien.png");
    moon.img = loadImage("assets/images/moon.png");
    fire = loadImage("assets/images/fire.gif");

}

function setup() {
    createCanvas(500, 500);
    imageMode(CENTER);
}


function draw() {
    // Draw the background gif and the sun at their respective positions
    image(bgGif, 250, 250, width, height);
    image(sun.img, sun.x, sun.y, sun.width, sun.height);

    // Loop through each planet in the planets array
    for (let i = 0; i < planets.length; i++) {
       // If the planet is being dragged, update its position to the mouse coordinates
        if (planets[i].dragging) {
            planets[i].x = mouseX;
            planets[i].y = mouseY;
        }
        
        let d = dist(sun.x, sun.y, planets[i].x, planets[i].y);
        
        // If a planet is too close to the sun, draw a fire image at the planet’s position
        if (d < sun.width / 2 + planets[i].width / 2) {
            image(fire, planets[i].x, planets[i].y, planets[i].width, planets[i].height);
        } else {
            image(planets[i].img, planets[i].x, planets[i].y, planets[i].width, planets[i].height);
        }
    }
}


// Mouse pressed function to check if a planet is selected for dragging
function mousePressed(){

    for (let i = 0; i < planets.length; i++){
      if (mouseX < planets[i].x + planets[i].width/2 && mouseX > planets[i].x - planets[i].width/2 && mouseY > planets[i].y - planets[i].height/2 && mouseY < planets[i].y + planets[i].height/2){
        planets[i].dragging = true;
        }  
    }
    

}

// Mouse released function to reset the planets to their initial positions and stop dragging
function mouseReleased() {
    for (let i = 0; i < planets.length; i++) {
        
        // If the planet was being dragged, reset its position and set dragging to false
        if(planets[i].dragging) {
            planets[i].x = planets[i].initialX;
            planets[i].y = planets[i].initialY;
        }
        planets[i].dragging = false;
    }
}
