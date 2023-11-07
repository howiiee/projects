# Template p5 project

Game Description:

Title: Gardening Realness

Platform: Web Browser (using p5.js library)

Gameplay Overview:

The Garden Simulation Game is a casual, interactive browser-based game where players assume the role of a gardener. The primary objective is to nurture a garden full of flowers to full bloom while defending against pests that threaten to damage the plants.

Gameplay Elements:

- Flowers: The garden consists of flowers that the player must tend to. Each flower has stages of growth, represented by different images, and players interact with them to ensure they reach full bloom.
- Gardener: The player controls a character called the gardener, moving around the canvas with arrow keys and switching between two modes: watering and pest control, using the 'F' key. Watering helps the flowers bloom, while pest control is necessary to protect them from pests.
- Pests: The game includes pests that appear and attack the flowers. The gardener must switch to pest control mode to eliminate these threats.

Technical Aspects:

- Preloading Assets: The game preloads images for flowers, pests, and background graphics to ensure smooth gameplay without loading delays.
- Game States: The game utilizes different states (Title, Rules, Simulation, Win, and Lose) to manage the flow of the game. Each state displays different information and interacts with user input accordingly.
- Background Graphics: The game features a tiled background that enhances the visual appeal and theme of the garden.
- Interaction: Players interact with the game through mouse clicks to transition between states and keyboard inputs for game actions like watering flowers and exterminating pests.
- Dynamic Pest Spawning: The game dynamically spawns pests at a set interval with a maximum limit to balance difficulty and performance.
- Flower and Pest Mechanics: Flowers have a bloom state that updates over time and when watered, while pests select targets and attack flowers, reducing their bloom state.

Objective and Challenges:

- Main Objective: Make all the flowers bloom to their fullest state.
- Challenges: Defend against an increasing number of pests and ensure none of the flowers is fully damaged.

Endgame:

- Winning Condition: All flowers reach full bloom.
- Losing Condition: All flowers get damaged by pests.
