// Define variables for the audio, amplitude, FFT, and spheres
let audio, amp, fft, freq, volume;
let myShader;
let gradientTexture;
let bassAngle = 0.0,
  midAngle = 0.0,
  trebleAngle = 0.0,
  volumeAngle = 0.0;
let bassPos, midPos, treblePos;
let bassVel, midVel, trebleVel;
let volumePos,
  volumeSphereSize = 100;

let maxSpeedBass = 5;
let maxSpeedMid = 5;
let maxSpeedTreble = 5;

window.onload = function () {
  // Set the initial theme to Theme 1
  changeTheme("theme1");

  // Event listeners for theme buttons
  document
    .getElementById("theme1")
    .addEventListener("click", () => changeTheme("theme1"));
  document
    .getElementById("theme2")
    .addEventListener("click", () => changeTheme("theme2"));
  document
    .getElementById("theme3")
    .addEventListener("click", () => changeTheme("theme3"));

  // Event listener for song upload button
  document.getElementById("uploadButton").addEventListener("click", () => {
    // Check if the audio is playing, if so, pause it
    if (audio.isPlaying()) {
      audio.pause();
    }
    
    // Trigger the file upload input
    document.getElementById("songUpload").click();
  });

  // Event listener for file input
  document
    .getElementById("songUpload")
    .addEventListener("change", (event) => uploadSong(event.target.files[0]));

    setTimeout(() => {
      document.getElementById('loadingScreen').style.opacity = '0';
      // Wait for the fade-out transition to finish before setting display to none
      setTimeout(() => {
          document.getElementById('loadingScreen').style.display = 'none';
      }, 500); 
  }, 3400);
};


function preload() {
  // Load an audio file
  audio = loadSound("assets/sounds/princess going digital.mp3");
  myShader = loadShader("shaders/vertex.vert", "shaders/fragment.frag");
  frameRate(60);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Start the audio playback
  audio.loop();

  // Create a new Amplitude analyzer
  amp = new p5.Amplitude();

  // Create a new FFT analyzer
  fft = new p5.FFT();

  shader(myShader);
  gradientTexture = createGradientTexture([
    "#F8C9DE",
    "#C0C9E6",
    "#F084B5",
    "#E64297",
  ]);

  // Initialize positions and velocities
  bassPos = createVector(random(windowWidth), random(windowHeight));
  midPos = createVector(random(windowWidth), random(windowHeight));
  treblePos = createVector(random(windowWidth), random(windowHeight));
  volumePos = createVector(windowWidth / 2, windowHeight / 2); // Centered

  bassVel = p5.Vector.random2D();
  midVel = p5.Vector.random2D();
  trebleVel = p5.Vector.random2D();
}

function draw() {
  background("#c8c8fa");

  // Analyze the frequency spectrum
  fft.analyze();

  volume = amp.getLevel();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");
  freq = fft.getCentroid();
  freq *= 0.001;

  // Update shader uniforms
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uTime", millis() / 1000.0);
  myShader.setUniform("uBass", map(bass, 0, 255, 0, 1));
  myShader.setUniform("uMid", map(mid, 0, 255, 0, 1));
  myShader.setUniform("uTreble", map(treble, 0, 255, 0, 1));
  myShader.setUniform("uVolume", map(volume, 0, 1, 0, 1));
  myShader.setUniform("uFreq", map(freq, 0, 1, 0, 20));
  myShader.setUniform("uGradient", gradientTexture);

  // Update positions based on velocity
  updateSpheres();

  // Draw spheres at updated positions
  drawSpheres();
}

function mousePressed() {
  // Check if the mouse is not over any of the buttons
  if (!isMouseOverButton()) {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  }
}

// Helper function to determine if the mouse is over any button
function isMouseOverButton() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let boundingBox = button.getBoundingClientRect();
    if (
      mouseX > boundingBox.left &&
      mouseX < boundingBox.right &&
      mouseY > boundingBox.top &&
      mouseY < boundingBox.bottom
    ) {
      return true;
    }
  }
  return false;
}

function drawSpheres() {
  
  // Draw Bass Sphere with rotation
  myShader.setUniform("sphereType", 0); // Type for Bass
  push();
  translate(bassPos.x - width / 2, bassPos.y - height / 2, 0); // Adjust for WEBGL coordinate system
  rotateX(bassAngle);
  rotateY(bassAngle);
  sphere(75, 400, 400); 
  pop();

  // Draw Mid Sphere with rotation
  myShader.setUniform("sphereType", 1); // Type for Mid
  push();
  translate(midPos.x - width / 2, midPos.y - height / 2, 0);
  rotateX(midAngle);
  rotateY(midAngle);
  sphere(75, 400, 400); 
  pop();

  // Draw Treble Sphere with rotation
  myShader.setUniform("sphereType", 2); // Type for Treble
  push();
  translate(treblePos.x - width / 2, treblePos.y - height / 2, 0);
  rotateX(trebleAngle);
  rotateY(trebleAngle);
  sphere(75, 400, 400); 
  pop();

  // Draw Volume Sphere (Stationary)
  myShader.setUniform("sphereType", 3); // Type for Volume
  push();
  translate(volumePos.x - width / 2, volumePos.y - height / 2, 0);
  rotateX(volumeAngle);
  rotateY(volumeAngle);
  sphere(volumeSphereSize, 400, 400);
  pop();
}
// Function to create gradient texture
function createGradientTexture(colorArray) {
  let gradTexture = createGraphics(256, 1);
  gradTexture.noStroke();
  for (let i = 0; i < gradTexture.width; i++) {
    let inter = map(i, 0, gradTexture.width, 0, 1);
    let c = lerpColorArray(colorArray, inter); 
    gradTexture.stroke(c);
    gradTexture.line(i, 0, i, gradTexture.height);
  }
  gradTexture.updatePixels();
  return gradTexture;
}

// Helper function to interpolate between an array of colors
function lerpColorArray(colors, amt) {
  let sections = colors.length - 1;
  let i = int(amt * sections);
  let inter = amt * sections - i;
  return lerpColor(color(colors[i]), color(colors[i + 1]), inter);
}

function updateSpheres() {
  // Update positions
  bassPos.add(bassVel);
  midPos.add(midVel);
  treblePos.add(trebleVel);

  // Update velocities for wandering effect
  wander(bassVel);
  wander(midVel);
  wander(trebleVel);

  // Make spheres flee from the mouse
  fleeFromMouse(bassPos, bassVel, 150); // flee if mouse is within 150 pixels of the bass sphere
  fleeFromMouse(midPos, midVel, 150); // flee if mouse is within 150 pixels of the mid sphere
  fleeFromMouse(treblePos, trebleVel, 150); // flee if mouse is within 150 pixels of the treble sphere

  // Collision detection and response
  checkCollisions(bassPos, bassVel, 75); 
  checkCollisions(midPos, midVel, 75); 
  checkCollisions(treblePos, trebleVel, 75); 

  constrainVelocity(bassVel, maxSpeedBass);
  constrainVelocity(midVel, maxSpeedMid);
  constrainVelocity(trebleVel, maxSpeedTreble);
}

function wander(vel) {
  let angleChange = 0.1; 
  let angle = vel.heading() + random(-angleChange, angleChange);
  let speed = vel.mag();
  vel.x = cos(angle) * speed;
  vel.y = sin(angle) * speed;
}

function checkCollisions(pos, vel, radius) {
  // Boundary collisions
  if (pos.x - radius < 0 || pos.x + radius > windowWidth) {
    vel.x *= -1; // Reverse X velocity
    pos.x = constrain(pos.x, radius, windowWidth - radius); // Keep sphere within canvas
  }
  if (pos.y - radius < 0 || pos.y + radius > windowHeight) {
    vel.y *= -1; // Reverse Y velocity
    pos.y = constrain(pos.y, radius, windowHeight - radius); // Keep sphere within canvas
  }

  // Collision with volume sphere
  let distanceToVolumeSphere = p5.Vector.dist(pos, volumePos);
  let combinedRadii = radius + volumeSphereSize / 2;
  if (distanceToVolumeSphere < combinedRadii) {
    let collisionNormal = p5.Vector.sub(pos, volumePos).normalize();
    let overlap = combinedRadii - distanceToVolumeSphere; // Calculate overlap distance
    pos.add(p5.Vector.mult(collisionNormal, overlap)); // Separate the sphere by moving it out of collision
    vel.reflect(collisionNormal); // Reflect the velocity
  }

  // Collision with other spheres (bass, mid, treble)
  checkSphereCollisions(pos, vel, radius, bassPos, bassVel, 75);
  checkSphereCollisions(pos, vel, radius, midPos, midVel, 75);
  checkSphereCollisions(pos, vel, radius, treblePos, trebleVel, 75);

  // Mouse interaction
  if (p5.Vector.dist(pos, createVector(mouseX, mouseY)) < radius + 100) {
    let mousePos = createVector(mouseX, mouseY);
    let collisionNormal = p5.Vector.sub(pos, mousePos).normalize();
    vel.reflect(collisionNormal);
  }
}

function checkSphereCollisions(pos1, vel1, radius1, pos2, vel2, radius2) {
  let distance = p5.Vector.dist(pos1, pos2);
  let minDist = radius1 + radius2;

  if (distance < minDist) {
    // Calculate collision response
    let angle = atan2(pos1.y - pos2.y, pos1.x - pos2.x);
    let targetX = pos2.x + cos(angle) * minDist;
    let targetY = pos2.y + sin(angle) * minDist;
    let ax = (targetX - pos1.x) * 0.5;
    let ay = (targetY - pos1.y) * 0.5;

    vel1.x += ax;
    vel1.y += ay;
    vel2.x -= ax;
    vel2.y -= ay;

    // Separate spheres to prevent sticking
    pos1.x += ax;
    pos1.y += ay;
    pos2.x -= ax;
    pos2.y -= ay;
  }
}

function fleeFromMouse(pos, vel, fleeDistance) {
  let mouseVec = createVector(mouseX, mouseY);
  let d = dist(mouseVec.x, mouseVec.y, pos.x, pos.y);
  if (d < fleeDistance) {
    let fleeVec = p5.Vector.sub(pos, mouseVec);
    fleeVec.normalize();
    fleeVec.mult(3); // Adjust the multiplier to control the speed of fleeing
    vel.add(fleeVec);
  }
}

function constrainVelocity(velocity, maxSpeed) {
  if (velocity.mag() > maxSpeed) {
    velocity.setMag(maxSpeed);
  }
}

function changeTheme(themeName) {
  // Define colors for each theme
  const themes = {
    theme1: { default: "#F8C9DE", hover: "#D06C8A", background: "#c8c8fa" },
    theme2: { default: "#FF5733", hover: "#D04623", background: "#f0d8d8" },
    theme3: { default: "#00CED1", hover: "#008B8B", background: "#d8f8d8" },
  };

  // Update the gradient texture and background color based on the theme
  switch (themeName) {
    case "theme1":
      gradientTexture = createGradientTexture([
        "#F8C9DE",
        "#C0C9E6",
        "#F084B5",
        "#E64297",
      ]);
      break;
    case "theme2":
      gradientTexture = createGradientTexture([
        "#6DDF6D",
        "#73C2FB",
        "#FFD700",
        "#FF6347",
      ]);
      break;
    case "theme3":
      gradientTexture = createGradientTexture([
        "#8A2BE2",
        "#FF69B4",
        "#00FFFF",
        "#20B2AA",
      ]);
      break;
  }

  // Update the document's background color
  document.body.style.backgroundColor = themes[themeName].background;

  // Highlight the active theme button
  highlightActiveButton(themeName, themes);
}

function highlightActiveButton(activeThemeId, themes) {
  let themeButtons = ["theme1", "theme2", "theme3", "uploadButton"];

  themeButtons.forEach((buttonId) => {
    let button = document.getElementById(buttonId);
    // Set all buttons to the default color of the active theme
    button.style.backgroundColor = themes[activeThemeId].default;

    // Set hover behavior for all buttons
    button.onmouseover = function () {
      this.style.backgroundColor = themes[activeThemeId].hover;
    };
    button.onmouseout = function () {
      this.style.backgroundColor = themes[activeThemeId].default;
    };
  });

  // Set the active theme button to its own hover color and remove hover effects
  let activeButton = document.getElementById(activeThemeId);
  if (activeButton) {
    activeButton.style.backgroundColor = themes[activeThemeId].hover;
    activeButton.onmouseover = null;
    activeButton.onmouseout = null;
  }
}

function updateToolbarStyle(defaultColor, hoverColor) {
  let buttons = document.querySelectorAll("#toolbar button");
  buttons.forEach((button) => {
    button.style.backgroundColor = defaultColor;
    button.onmouseover = function () {
      this.style.backgroundColor = hoverColor;
    };
    button.onmouseout = function () {
      this.style.backgroundColor = defaultColor;
    };
  });
}

// Function to upload a new song
function uploadSong(file) {
  // Clear the file input to allow re-uploading the same file
  document.getElementById("songUpload").value = "";

  if (file) {
    // Check if the file extension is .mp3 or .wav
    let fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension === "mp3" || fileExtension === "wav") {
      // Show loading screen
      document.getElementById('loadingScreen').style.display = 'flex';
      document.getElementById('loadingScreen').style.opacity = '1';

      // Reload the GIF to start from the beginning
      let loadingGif = document.getElementById('loadingGif');
      let gifSrc = loadingGif.src;
      loadingGif.src = ''; // Reset the source
      loadingGif.src = gifSrc; // Set it back to restart the GIF

      // Load and play the song
      audio = loadSound(
        file,
        () => {
          // Wait for 3 seconds before starting the fade-out transition
          setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            // Wait for the fade-out transition to finish before setting display to none
            setTimeout(() => {
              document.getElementById('loadingScreen').style.display = 'none';
            }, 500); //
          }, 3400);

          audio.play();
        },
        (e) => {
          // Hide loading screen if there's an error
          document.getElementById('loadingScreen').style.opacity = '0';
          setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
          }, 3400); 

          alert("Error loading the song: " + e);
        }
      );
    } else {
      alert("Invalid file type. Please upload an MP3 or WAV file.");
    }
  } else {
    alert("No file selected. Please upload a file.");
  }
}



