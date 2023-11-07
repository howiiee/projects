class Firefly {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.phase = TWO_PI - 0.01;  // Start with a random phase between 0 and 2π
      this.frequency = random(0.45, 0.55); // Random natural frequency, adjust range as needed
      this.neighbors = []; // Store recent phases of neighboring fireflies
      this.brightness = 0;
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.noiseOffsetX = random(0, 1000);  // For Perlin noise
      this.noiseOffsetY = random(1000, 2000);  // For Perlin noise
      this.toneFrequency = random(pentatonicScale);
    }
  
    // Display the firefly
    display() {
        push(); // Isolate the styles and transformations for this firefly
        noStroke();  // Ensure no outlines for all parts of the firefly
    
        // Glow 2: Outermost glow
        let outerGlowSize = 30;  // Increase overlap for a smoother blend
        let outerGlowAlpha = this.brightness * 0.25; // Slight reduction in transparency
        let outerGlowColor = color(237, 230, 165, outerGlowAlpha); 
        fill(outerGlowColor);
        ellipse(this.position.x, this.position.y, outerGlowSize, outerGlowSize);
    
        // Glow 1: Intermediate glow
        let innerGlowSize = 22;  // Increase overlap for a smoother blend
        let innerGlowAlpha = this.brightness * 0.5; // Stronger intermediate glow
        let innerGlowColor = color(237, 230, 165, innerGlowAlpha); 
        fill(innerGlowColor);
        ellipse(this.position.x, this.position.y, innerGlowSize, innerGlowSize);
    
        // Core of the firefly
        let coreSize = 14;  // Increase a bit for overlap
        let coreColor = color(237, 230, 165, this.brightness); 
        fill(coreColor);
        ellipse(this.position.x, this.position.y, coreSize, coreSize);
    
        pop(); // Reset styles and transformations
    }

    // Update the firefly's phase based on the Kuramoto model
    update(fireflies, couplingStrength) {
        // Kuramoto model equation
        let sumSinDifferences = 0;
        for (let other of fireflies) {
            if (other !== this) {
                let difference = other.phase - this.phase;
                sumSinDifferences += sin(difference);
            }
        }
    
        let deltaTime = 0.05;  // Small time step; adjust as necessary
        this.phase += (this.frequency + (couplingStrength / fireflies.length) * sumSinDifferences) * deltaTime;
    
        // Check if the firefly should adjust brightness
        if (this.phase > TWO_PI) {
            this.phase -= TWO_PI;
        
            // Play sound first before updating brightness
            if (state === 2 && this.brightness != 255) {
                playTone(this.toneFrequency, 0.2);  // Play the tone for 0.2 seconds
            }
            
        
            this.brightness = 255;  // Set max brightness after checking
        } else {
            // Gradually dim the firefly
            this.brightness *= 0.95;  // Adjust this factor to control dimming speed
        }
        
    
        // Only move the fireflies if state is 2
        if (state === 2) {
            // Movement using Perlin noise
            this.acceleration.x = map(noise(this.noiseOffsetX), 0, 1, -0.05, 0.05);
            this.acceleration.y = map(noise(this.noiseOffsetY), 0, 1, -0.05, 0.05);
            this.velocity.add(this.acceleration);
            this.velocity.limit(2);  // Limit speed
            this.position.add(this.velocity);
    
            // Increment noise offsets for the next frame
            this.noiseOffsetX += 0.01;
            this.noiseOffsetY += 0.01;
    
            // Boundary check to wrap fireflies around canvas
            if (this.position.x > width) this.position.x = 0;
            if (this.position.x < 0) this.position.x = width;
            if (this.position.y > height) this.position.y = 0;
            if (this.position.y < 0) this.position.y = height;
        }
    
    }
  }


let fireflies = [];
let numFireflies = 260;
let couplingStrength = 0.1;
let tone;
let state = 0; // Start with a black canvas state
let font;
let fontPoints = [];
let fontSize = 100;
let pentatonicScale = [329.63, 392, 440, 493.88, 587.33];  // E4, G4, A4, B4, D5
let couplingSlider;
let sliderGap = 30; // Gap between slider and the bottom of the canvas
let textGap = 20;   // Gap between text and the slider

function preload() {
    tone = loadSound("assets/sounds/chime.mp3"); 
    font = loadFont("assets/fonts/AckiPreschool.ttf")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fontPoints = font.textToPoints("f i R E f L I E S", 39, 450, fontSize);

    // Slider in stage 2
    couplingSlider = createSlider(0, 1, 0.1, 0.01);
    couplingSlider.hide(); 

    let fontBounds = {
        xMin: Infinity,
        yMin: Infinity,
        xMax: -Infinity,
        yMax: -Infinity
    };
    
    for (let point of fontPoints) {
        fontBounds.xMin = min(fontBounds.xMin, point.x);
        fontBounds.yMin = min(fontBounds.yMin, point.y);
        fontBounds.xMax = max(fontBounds.xMax, point.x);
        fontBounds.yMax = max(fontBounds.yMax, point.y);
    }
    
    let fontWidth = fontBounds.xMax - fontBounds.xMin;
    let fontHeight = fontBounds.yMax - fontBounds.yMin;
    let xOffset = width / 2 - (fontBounds.xMin + fontWidth / 2);
    let yOffset = height / 2 - (fontBounds.yMin + fontHeight / 2);


    for (let i = 0; i < fontPoints.length; i++) {
        let x = fontPoints[i].x + xOffset;
        let y = fontPoints[i].y + yOffset;
        let firefly = new Firefly(x, y);
        fireflies.push(firefly);
    }
    
}

function draw() {
    background(0);

    if (state === 0) {
        textAlign(CENTER, CENTER);
        fill(237, 230, 165);
        textSize(30);  // Adjust font size so that text fits well
        textFont(font);

        // Split the text into lines
        let lines = [
            "Welcome to the Fireflies Simulation!",
            "\n",
            "This program creates a mesmerizing visual and auditory experience",
            "that models the synchronized flashing patterns observed in",
            "real-life fireflies.",
            "\n",
            "It is based on the Kuramoto model, which seeks to describe",
            "the collective synchronization of coupled oscillators",
            "\n",
            "click to continue"
        ];

        // Display each line with a vertical offset
        let lineSpacing = 50;
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], width/2, (height/2) - (lineSpacing * (lines.length / 2)) + (i * lineSpacing));
        }
    }
    else if (state === 1){
        textAlign(CENTER, CENTER);
        fill(237, 230, 165, 25);
        textSize(fontSize);
        textFont(font);
        //text("f i R E f L I E S", width/2, height/2);

        for (let firefly of fireflies){
            firefly.update(fireflies, couplingStrength);
            firefly.display();
        }
    } else if (state === 2) {

        couplingSlider.show();
        couplingSlider.position(20, height - sliderGap);
        couplingStrength = couplingSlider.value();
        fill(237, 230, 165);
        textSize(20);
        textAlign(LEFT, BOTTOM);  // Change the alignment
        let labelText = "Coupling Strength: " + couplingStrength.toFixed(2);
        text(labelText, couplingSlider.x, couplingSlider.y);


        for (let firefly of fireflies){
            firefly.update(fireflies, couplingStrength);
            firefly.display();
        }

        // Display instructions
    textAlign(CENTER, BOTTOM);
    fill(237, 230, 165); 
    textSize(30);    
    textFont(font);    
    text("click to add a firefly", width/2, height - 50); // 50 pixels from the bottom
    text("click and drag to reset fireflies lights", width/2, height - 10); // 20 pixels from the bottom
    textAlign(CENTER, TOP);
    text("be patient, the fireflies will sync", width/2, 10);
    }
}

function mousePressed() {
    if (state === 0) {
        state = 1;
    } else if (state === 1) {
        state = 2;
        for (let firefly of fireflies) {
            firefly.phase = random(TWO_PI);  // Randomize phase
        }
    } else if (state === 2) {
        fireflies.push(new Firefly(mouseX, mouseY));
    }
}

function mouseDragged() {
    if (state === 2){
       for (let firefly of fireflies) {
            let distance = dist(mouseX, mouseY, firefly.position.x, firefly.position.y);
            if (distance < 50) {
                firefly.phase = random(TWO_PI);
                firefly.brightness = 0;  // Reset brightness
            }
        } 
    }
}

function playTone(frequency, duration) {
    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(frequency);
    osc.amp(0.5, 0);  // Immediate ramp up to 0.5 amplitude
    osc.start();
    
    setTimeout(() => {
        osc.amp(0, 0.1);  // Ramp down to 0 amplitude over 0.1 seconds
    }, duration * 1000 - 100);  // Subtract a little time to start the fade-out earlier
    
    setTimeout(() => {
        osc.stop();
    }, duration * 1000);
}

function windowResized() {
    // Resize the canvas to new window dimensions
    resizeCanvas(windowWidth, windowHeight);
    
    // (Optional) Re-position any UI elements or make adjustments based on the new size
    couplingSlider.position(20, height - sliderGap);
}

