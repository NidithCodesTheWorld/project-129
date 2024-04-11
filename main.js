song1 = "";
song2 = "";
leftWristX = '';
leftWristY = '';
rightWristX = '';
rightWristY = '';
scoreLeftWrist = 0;


function preload()
{
	song1 = loadSound("harryPotter.mp3");
	song2 = loadSound();
}

function setup() 
{
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function gotPoses(results){

	if (results.length > 0){
		console.log(results)
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log('scoreLeftWrist')

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;



	}

}

function modelLoaded()
{
	console.log('PoseNet is Intialized')
}

function draw() 
{
	image(video, 0, 0, 600, 500);

	song1.isPlaying();

	fill('#000000');
	stroke('#000000');

	if(leftWristY > 0.2){

		circle(leftWristX, leftWristY, 20);

		song2.stop();

	}
	if(song1 == false){

		song1.play();

		document.getElementById('note').innerHTML = 'Playing = Harry Potter Theme Song.';
	}

}

function play()
{
	song1.play();
}