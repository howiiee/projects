# I Hate Your Phone

Game Description:

Title: i hate your phone

Platform: Web Browser, leveraging the p5.js library and WebGL for 3D graphics rendering

Gameplay Overview:

"i hate your phone" is a interactive music visualizer designed for web browsers. It employs the p5.js library and WebGL to create a 3D audio-reactive environment. This visualizer transforms music into a vivid visual experience, with each element within the visualizer responding dynamically to different aspects of the audio, such as frequency and volume. It's an exploration of the synergy between sound and visuals, offering a unique way for users to engage with their favorite music.

Gameplay Elements:

- 3D Audio Visualization: The core feature is the 3D visualization of audio using WebGL. It involves rendering spheres that respond to audio frequencies (bass, mid, treble) and volume. Each sphere's movement, size, and color shift according to the music's dynamics.
- Theme Customization: Users can alter the visualizer's aesthetic by switching between various themes, changing the color scheme and background to suit their preferences.
- Interactive Song Upload: The application supports user-uploaded songs, allowing for a personalized audio-visual journey.
- Responsive Controls: Intuitive controls for playing, pausing, and switching songs, as well as changing themes, provide a user-friendly interface.

Technical Aspects:

- WebGL Rendering: The application harnesses WebGL for sophisticated 3D graphics. This approach ensures smooth rendering of complex visual elements and supports the dynamic representation of audio in a 3D space.
- Audio Processing: Utilizing the p5.sound library, the application analyzes audio in real-time, dissecting various frequency bands and volume levels.
- Shader Effects: Custom GLSL shaders are implemented for advanced visual effects, creating a more immersive and visually stunning experience.
- Responsive Design: The layout and interface elements adapt seamlessly to different device screens, ensuring a consistent user experience across platforms.

Gameplay Mechanics:

- Frequency and Volume Visualization: The application visually interprets different frequency ranges and volume levels of the audio through the behavior and appearance of the 3D spheres.
- Mouse-Driven Interaction: Users can interact with the visualization using their mouse, influencing the movement and reactions of the spheres, adding an element of playfulness and discovery.
- Control Over Music Playback: Features like play/pause and song selection give users complete control over their listening and viewing experience.

Controls:

- Mouse Interaction: Enables users to influence the visual elements, offering an interactive layer to the music visualization.
- Theme and Song Controls: Buttons for changing themes and controlling music playback, enhancing user engagement.

Functions and Features:

- preload(): Responsible for preloading audio files and shaders to ensure a smooth experience.
- setup(): Sets up the initial environment, including the 3D canvas, audio analyzers, shaders, and user interface elements.
- draw(): The heart of the visualizer, this function continuously updates the visual elements in sync with the audio's properties.
- changeTheme(): Manages the theme-switching feature, offering different visual interpretations.
- uploadSong(): Handles user-provided song uploads, integrating them into the visualizer.

Classes and Objects:

- p5.SoundFile: Manages audio playback and analysis.
- p5.Amplitude and p5.FFT: For detailed audio analysis, capturing amplitude and frequency data.
- p5.Vector: Crucial for calculating and updating the positions and movements of the 3D spheres.
- Custom Shaders (GLSL): Enhance the visual effects, adding depth and richness to the visual output.
- User Interface Elements: Intuitive buttons and sliders for interactive song upload, theme selection, and playback control, ensuring a smooth user experience.