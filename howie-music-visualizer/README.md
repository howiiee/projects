# Howie's Music Visualizer

Game Description:

Platform: Web Browser (utilizing the p5.js library)

Gameplay Overview:

This program presents an innovative, interactive web-based experience using p5.js. It integrates audio and video to create a visually dynamic environment. The setup involves a video capture, which dynamically alters its pixelation based on the audio volume of a loaded song. This interactive environment allows users to play or pause the song and adjust its volume, thus changing the visual display.

Gameplay Elements:

- Video Capture: The central element of the display, it shows a pixelated version of the live video feed.
- Audio Interaction: The visual representation changes in response to the audio level of the song.
- Volume Control: A slider allows the user to adjust the song's volume.
- Play/Pause Button: This button toggles the playback of the song.
- Dynamic Pixelation: The size of the pixels in the video changes based on the audio volume.
- Mouse Interaction: Hovering the mouse over the display alters the size of the pixels.

Technical Aspects:

- Video Processing: The program processes live video feed and displays it with altered pixelation.
- Audio Analysis: It uses the p5.Amplitude object to analyze and respond to the audio levels.
- Responsive Interface: Elements like buttons and sliders are included for user interaction.
- Dynamic Visuals: Visuals change in real-time based on audio input and mouse interaction.

Gameplay Mechanics:

- Volume-Based Visual Changes: The pixel size in the video feed changes according to the audio volume.
- Mouse-Over Effect: Bringing the mouse close to the pixels causes them to enlarge.
- Song Control: Users can play or pause the song and adjust its volume through an interactive interface.

Controls:

- Mouse Movement: Interact with the visual elements on the screen.
- Slider: Adjust the volume of the song.
- Button: Toggle between playing and pausing the song.

Functions:

- preload(): Preloads the song.
- setup(): Sets up the canvas, video capture, audio analyzer, and interface elements.
- draw(): Continuously updates the display based on the song's volume and mouse position.
- toggleSong(): Controls the playback of the song.

Classes and Objects:

- p5.Amplitude: Used for analyzing the volume of the audio.
- Video Object: Captures and displays the live video feed.
- Slider and Button: Interface elements for user interaction.
