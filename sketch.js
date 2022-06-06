let ballY;
let ballX;
let x; 
let keyClick;
let poop;
let img;
let bg;
let y;
let x2 = 0;
let yOff=0; 
let yPos1;
let yPos2;
let falling = false;
let score = 0;
let topScores = [];
let ballSize = 25;
let wallSpeed = 1; //not needed

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  ballX = 10;//sets the balls x position
  ballY = height/2; // sets the balls y pos
  x = -10; //variable used to find the curve of porabola
  poop = 0; //dw bout it
  img = loadImage('flappy bird.gif');
  bg = loadImage('wp6957163.png');
  x2 = width; // the x of the pole 
  y = height/2; //the center from which the poles will be offset 
  yPos1 = 0; //the y pos of the top pole (going downwards)
  yPos2 = y+50; //pos of the bottom pole (goes upwards)
} 

function draw() {
  background(bg);
  text(score, width / 5 * 4, 50); 

  //fill('black');
  x++; // increments the x value in the porabola formula
  ballY = 0.05*x**2-1.5*x-19; // calculation for the curve of porabola
  //ballX++;
  
  circle(width/2, ballY+height/2+poop,ballSize); // width/3
  //img.resize(142,80);

  //checks if the person clicked and did not run into a wall
  if (keyClick===true && falling === false) {
    x = -10; 
    keyClick = false; 
    poop += ballY;
  }
  // if (ballY+height/2+poop+80>height) {
  //   x = -10; 
  //   keyClick = false; 
  //   poop += ballY;
  // }
  
  //the poles move on the condition that the player is not falling
  if (falling === false) {
    x2-= wallSpeed;
    //x2-=2;
  }
  yOff += 0.005; //offset for the center of the poles
  
  //when the pole reaches the end it generates a new pair
  if (x2<-25) {
    y = noise(yOff) * height; 
    yPos1 = 0;
    yPos2 = y+50;
    x2 = width;
  } 
  
  //generates poles
  fill('green');
  rect(x2,0,25,y-50);
  rect(x2,yPos2,25,height-yPos2);
  fill('white');  
  
  //check if player hits the poles
  if (!(ballY+height/2+poop>y-40&&ballY+height/2+poop<y+40)&&(x2<width/2+15&&x2>width/2+-35)) { 
    //console.log('poop');
    falling = true;
  } 
  
  //increases players score and wall speed
  if (width/2>x2-wallSpeed/2&&width/2<=x2+wallSpeed/2) {
    score++;
    wallSpeed+=0.25;
    //console.log(wallSpeed);
    //ballSize++;
    //console.log(wallSpeed);
    topScores.push(score);
  }
  
  //death message
  if (ballY > height) {
    if (topScores.includes(score) === false) {
      topScores.push(score);
    }
    text(`YOUR TOP SCORE IS ${greatest(topScores)}`, width / 2, 100);
    score = 0;
  }
  
}
function mouseClicked() {
  keyClick = true;
}
function greatest(arr) {
  let greatestVal = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > greatestVal) {
      greatestVal = arr[i];
    }
  }
  return greatestVal;
}
