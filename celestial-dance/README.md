# Celestial Dance

Game Description:

Title: Celestial Dance

Platform: Web Browser (utilizing p5.js library)

Gameplay Overview:

Celestial Dance Simulator is an interactive simulation game that enables players to experience the motion of celestial bodies within a simplified solar system. The game is set in a 2D universe where players can move planets around a central sun, observe their interactions, and learn about gravitational attraction and orbital dynamics.

Gameplay Elements:

- Sun: A static central body that exerts gravitational force on other celestial bodies.
- Planets: A collection of different planets that players can move around. Each planet has unique properties.
- Fire Gif: A visual effect that appears when planets come too close to the sun, simulating the heat impact.
- Background: A starry gif background that sets the stage for the celestial theme.
- Drag & Drop Mechanics: Players interact with planets through a click and drag mechanic to simulate orbits or avoid collisions.

Technical Aspects:

- Asset Preloading: Preloads images for the sun, planets, and background to ensure smooth gameplay.
- Canvas: Utilizes a 500x500 canvas to represent the cosmic playground.
- Collision Detection: Employs a simple distance-based collision detection to trigger the fire effect when a planet comes too close to the sun.
- Draggable Objects: Planets are draggable and respond to mouse input for interactive learning.
- State Management: Uses boolean flags to manage the dragging state of each celestial body.
- Image Rendering: Displays celestial bodies with their corresponding images using p5.js's image functions.

Gameplay Mechanics:

- Celestial Movement: Players can drag planets around the sun to simulate different orbits.
- Heat Impact Simulation: Planets that get too close to the sun display a fire gif, representing the concept of solar destruction.
- Orbital Reset: Releasing the mouse button resets planets to their initial orbits, symbolizing the stability of celestial orbits.

Controls:

- Mouse Drag: Click and hold on a planet to move it around.
- Mouse Release: Release the planet to return it to its original orbit.

Functions:

- preload(): Loads all images and gifs required for the simulation.
- setup(): Establishes the canvas and initializes celestial bodies.
- draw(): Handles the rendering of celestial bodies, background, and the heat impact simulation.
- mousePressed(): Checks if a planet has been clicked to enable dragging.
- mouseReleased(): Resets the planets to their initial orbits and disables dragging.

Classes and Objects:

- Planet: Represents each planet with properties for position, image, size, and dragging state.
