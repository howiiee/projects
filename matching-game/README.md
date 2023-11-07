# Template p5 project

Game Description:

Title: Whimsical World Builder

Platform: Web Browser (using the p5.js library)

Gameplay Overview:

Whimsical World Builder is a delightful, casual web game that allows players to explore a dynamic virtual environment. The game challenges players to match the image under their mouse cursor with various floating objects in a serene world. As they successfully match images, their score increases, and the game progresses through various humorous and encouraging states.

Gameplay Elements:

- Sun, Cloud, Grass, Bush, Flowers, White Flowers: The clickable and interactive objects that float around the game environment.
- Score: A tally of successful object matches, which dictates the game state progression.
- Game States: The game features several states, ranging from the initial instruction screen (state 0) to various gameplay states (states 1-5), each with unique messages and conditions.
- Mouse Image: An image that changes to match one of the objects, which players must align with its counterpart in the game world.
- Background Image: A static image that provides a backdrop for the gameplay elements.

Technical Aspects:

- Dynamic Positioning: Objects move around the screen, avoiding overlaps, to create a continuously engaging experience.
- Image Preloading: All images are preloaded to ensure smooth transitions and gameplay without visual hiccups.
- State Management: The game handles multiple states to provide instructions, gameplay, feedback, and humor as the player progresses.
- Responsive Mouse Cursor: The image under the mouse cursor changes every 2 seconds to a random object, adding to the game's dynamism.

Gameplay Mechanics:

- Matching Mechanism: Players move their mouse to align the cursor image with its corresponding object to increase the score.
- Score Milestones: Specific scores trigger different game states, introducing new messages and challenges.
- Random Object Movement: Objects are repositioned randomly within the game area to avoid overlapping and maintain gameplay variety.
- Game Over and Replay: The game prompts the player to replay after reaching the final state.

Controls:

- Mouse Movement: Players use the mouse to move the cursor image across the screen.
- Mouse Click: Used to begin the game from the instruction screen, to transition between messages, and to replay the game after completion.

Functions:

- preload(): Loads all the images required for the game.
- setup(): Initializes the game canvas and sets image modes.
- draw(): Controls the game rendering based on the current state, including object displays and score updates.
- updatePosition(): Changes the positions of the objects on the screen.
- updateImg(): Alters the mouse cursor image to match a random object.
- mousePressed(): Manages state transitions upon mouse clicks.
- isOverlapping(): Determines if two objects are overlapping.

Classes and Objects:

- Object Definitions: Each game element (sun, cloud, grass, bush, flowers, whiteFlowers) is defined as an object with properties for image, position, and size.
- Mouse Image: Object that holds properties for the dynamic image under the mouse cursor, including size and current image.
- Background Image: A singular object that holds the image data for the game's background.
- Game States: Not explicitly classes or objects, but are represented by numerical values that dictate the flow and mechanics of the game.
