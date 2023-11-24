let video;
let amp; let song; let vol; let mapVol; let volume;
let button;
let index;
let alpha; let blue; let red; let green;
let dia; let d;
let gridSize;

function preload(){
	song = loadSound("/assets/sounds/SZA - Kill Bill (Audio).mp3");
}
 

function setup() {
	createCanvas(windowWidth, windowHeight);

	song.loop();
	song.stop();

	video = createCapture(VIDEO);
	video.size(width,height-40);
	video.hide();

	amp = new p5.Amplitude;

	button = createButton ("Play");
	button.mousePressed(toggleSong);
	button.position((windowWidth/2)-20, windowHeight+85);
	button.style('background-color', "#CDD7AC");
	button.style("font-family", "Times New Roman");
	button.style("color", "#fdf6e3");
	

	slider = createSlider(0, 1, 1,0.1);
	slider.position(55, windowHeight+85);
	
}

function draw() {
	background(0);


	vol = amp.getLevel();
	
	song.setVolume(slider.value());
	mapVol = int(map(vol, 0, 1, 5, 50));

	video.loadPixels();
	for (let y = 0; y < video.height; y+=gridSize){
		for (let x = 0; x < video.width; x+=gridSize){
//choose what to put for gridsize
			gridSize = mapVol;

			index = (y * video.width + x) * 4; //so memorize this to get the specific pixel.
			red = video.pixels[index]; // for red value
			green = video.pixels[index+1]; // for green value
			blue = video.pixels[index+2]; // for blue value
			alpha = video.pixels[index+3]; // for alpha value
			dia = map(blue, 0, 255, gridSize, 2);

			
			d = dist(mouseX, mouseY, x,y);
			if (d <= 50){
				dia *= 2;			
			}
			
			fill(red,green,blue, alpha);	
			noStroke(0);
			circle (x,y,dia);
			
		}
	}

	fill("#C9BBDD");
	rect(0, windowHeight-40, windowWidth, 40)
	
	fill("#fdf6e3");
	textFont("Times New Roman");
	textSize(15);
	text("Volume:", 3,windowHeight-15);

	fill("#fdf6e3");
	textFont("Times New Roman");
	textSize(15);
	text("P.S. These effects are volumed-based!", windowWidth -235,windowHeight-15);

}		 

function toggleSong(){
	if (song.isPlaying()){
		song.pause();
		button.html("Play");
	}
	else{
		song.play();
		button.html("Pause");
	}
}
