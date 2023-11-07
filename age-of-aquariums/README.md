# Template p5 project

Game Description:

Title: Age Of Aquariums

Platform: Web Browser (utilizing p5.js library)

Gameplay Overview:

Ocean Predator Game is an engaging browser-based simulation where players navigate a shark through an underwater environment. The primary goal is to eat fishes to grow larger while avoiding being caught by an enemy shark.

Gameplay Elements:

- Shark: The player’s character, a shark, grows in size with each fish eaten.
- Fishes: Small fish objects that the shark can eat.
- Enemy Shark: An AI-controlled enemy shark that poses a threat to the player.
- Bubbles: Decorative elements that enhance the underwater effect.
- Reef: A static image that adds to the background environment.

Technical Aspects:

- Asset Preloading: Preloads images for the shark, fish, enemy shark, bubbles, and background to prevent flickering and ensure a seamless experience.
- Canvas: Uses a 500x500 canvas for the game area.
- Collision Detection: Implements custom collision detection between the shark, fish, and enemy shark.
- Game States: Utilizes game states like "playing," "ending," and "enemyCollision" to manage the game's progression and outcome.
- Background Tiling: The water background is tiled across the canvas to create an immersive environment.
- Object-Oriented Approach: Fish, bubbles, and the enemy shark are instantiated as objects, encapsulating their properties and functions.

Gameplay Mechanics:

- Movement: The player moves the shark towards the mouse cursor within the bounds of the canvas.
- Eating Fishes: The shark eats fishes to grow in size. Each eaten fish increments the eatenCount.
- Game Progression: Eating 15 fishes triggers the "ending" game state, signaling the player’s win.
- Enemy Interaction: If the shark collides with the enemy shark, the game state changes to "enemyCollision," indicating a game over.
- Game Over Condition: The game ends either when the player is caught by the enemy shark or when the shark eats enough fish.

Controls:

- Mouse Movement: The shark follows the mouse cursor within the canvas boundaries.
- Mouse Click: A click resets the game after a game over condition has been met.

Functions:

- preload(): Preloads all necessary game assets.
- setup(): Initializes the game environment, characters, and objects.
- draw(): The main game loop that handles game state changes, object movements, and rendering.
- resetGame(): Resets the game to its initial state.

Classes and Objects:

- Fish: Handles the behavior and rendering of the fish objects.
- EnemyShark: Manages the enemy shark’s movement and collision with the player.
- Bubble: Manages the display of bubbles in the background.
