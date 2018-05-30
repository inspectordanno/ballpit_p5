//setting color theme constants

const themeGreen = 'rgba(58,180,169,1)';
const themeOrange = 'rgba(253,121,29,0.7861519607843137)';
const themePurple = 'rgba(128,69,252,1)'

//declaring buttons, balls, and the array where the balls will be stored, and a background image

let greenBallButton;
let orangeBallButton;
let purpleBallButton;
let resetButton;
let greenBall;
let orangeBall;
let purpleBall;
let balls = [];
let bg;

//make ball class
class Ball {
  constructor(fill) {
    this.x = random(width);
    this.y = random(height);
    this.r = random(5, 25);
    this.fill = fill;            //line 24 sets the fill to a fill argument which is set when a button is
    this.yVel = random(-3, 3);  //clicked and when the balls hit each other
    this.xVel = random(-3, 3);
  }

  //this sets the x position to the constructor + the x velocity
  //and sets the y position to the constructor + the y velocity
  //and runs the checkBalls() and checkWalls() functions

  move() {
  //this.xVel += xVel;
  this.x = this.x + this.xVel;
  this.y = this.y + this.yVel;
  this.checkWalls();
  this.checkBalls();
  }

  //this is a for loop that loops through all the balls in an array
  //if the current ball doesn't equal itself
  //then when half the current balls radius plus half the other balls radius is greater than their
  //midpoints, a hit is made, and velocity is reversed
  //I also have the balls change color when they hit each other

  //Note: There is a weird edge case when the balls get stuck inside each other
  //which I haven't been able to figure out

  checkBalls() {
    for(this.i = 0; this.i < balls.length; this.i++){
      if(this !== balls[this.i]){
      if( this.r/2 + balls[this.i].r/2 > dist(this.x, this.y, balls[this.i].x, balls[this.i].y)){
        console.log("hit");
        this.xVel *= -1;
        this.yVel *= -1;
        // balls[this.i].xVel *= 1;
        // balls[this.i].yVel *= -1;
        if ((this.r/2+ balls[this.i].r/2 > dist(this.x, this.y, balls[this.i].x, balls[this.i].y)) && this.fill===themeGreen) {
          balls[this.i].fill = themeOrange;
        } else if ((this.r/2+ balls[this.i].r/2 > dist(this.x, this.y, balls[this.i].x, balls[this.i].y)) && this.fill===themeOrange) {
          balls[this.i].fill = themePurple;
        } else if ((this.r/2+ balls[this.i].r/2 > dist(this.x, this.y, balls[this.i].x, balls[this.i].y)) && this.fill===themePurple)
          balls[this.i].fill = themeGreen;
        }
      }
    }
  }

  //if x is less than zero and greater than width,
  //and y is less than zero and greater than height,
  //reverse velocity

  checkWalls() {
   //check for walls
   if(this.x < 0 || this.x > width) {
    this.xVel *= -1;
    //this.x = width-this.r;
    console.log(this.xVel);
   }
   if(this.y < 0 || this.y > height) {
    this.yVel *= -1;
    console.log("hit y wall");
   }
 }

 //this is a method that shows the ball, and is run in draw

  show() {
  stroke(255);
  strokeWeight(1);
  fill(this.fill);
  ellipse(this.x, this.y, this.r);
  }

} //end class declaration

function setup() {

  //load background image
  bg = loadImage("nyancat.jpg");

  //designing background div
  const backgroundDiv = createDiv();
  backgroundDiv.style('width', windowWidth + 'px')
    .style('height', windowHeight + 'px')
    .style('background', `linear-gradient(90deg, ${themeGreen} 0%, ${themeOrange} 50%, ${themePurple} 100%)`);

  //designing canvas
  const cnv = createCanvas(windowWidth/2, windowHeight/1.5); //set canvas to window width and window height
  cnv.center()
      .style('box-shadow', '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)') //box shadow from https://codepen.io/sdthornton/pen/wBZdXq
      .style('margin-top', '2.5%')
      .background('grey');

  //designing buttons

  function buttonMaker (buttonVariable, color, string, x, id) {
    buttonVariable = createButton(string)
      .position(windowWidth * x, windowHeight * .1)
      .style('background-color', color)
      .style('box-shadow', '0 5px 10px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)')
      .style('border-radius', '3px')
      .style('border', 'none')
      .style('color', 'white')
      .style('padding', '1% 1%')
      .style('text-align', 'center')
      .style('text-decoration', 'none')
      .style('display', 'inline-block')
      .style('font-size', '16px')
      .id(id);
  }

  buttonMaker(greenBallButton, themeGreen, 'Green Ball', .25, 'greenButton');
  buttonMaker(orangeBallButton, themeOrange, 'Orange Ball', .45,'orangeButton');
  buttonMaker(purpleBallButton, themePurple, 'Purple Ball', .65, 'purpleButton');
  buttonMaker(resetButton, 'gray', 'Reset', .5, 'resetButton');

  select('#resetButton').position(.8 * windowWidth, .5 * windowHeight);

  //creating titleDiv

  const titleDiv = createDiv()
    .style('font-size', '3em')
    .style('text-align', 'center')
    .style('background', `linear-gradient(270deg, ${themeOrange} 0%, ${themePurple} 100%)`)
    .style('-webkit-background-clip', 'text')
    .style('-webkit-text-fill-color', 'transparent')
    .style('-webkit-text-stroke', '1px black')
    .style('-moz-text-stroke', '1px black')
    .position(.05 * windowWidth, .3 * windowHeight)
    .html('Ball <br /> Pit')
    .id('titleDiv');

  const infoDiv = createDiv()
      .style('font-size', '1.5em')
      .style('text-align', 'center')
      .style('background', `linear-gradient(270deg, ${themeOrange} 0%, ${themePurple} 100%)`)
      .style('-webkit-background-clip', 'text')
      .style('-webkit-text-fill-color', 'transparent')
      .style('-webkit-text-stroke', '1px black')
      .style('-moz-text-stroke', '1px black')
      .position(.05 * windowWidth, .5 * windowHeight)
      .html('Press any <br> key <br> to show <br> Nyancat')
      .id('infoDiv');

  //instantiating new ball when analogous button is clicked and pushing it to an array

    function makeBallwhenClicked(ball, buttonID, color) {
      select(buttonID).mouseClicked(function(){
        balls.push(new Ball(color));
      });
    }

    makeBallwhenClicked(greenBall, '#greenButton', themeGreen);
    makeBallwhenClicked(orangeBall, '#orangeButton', themeOrange);
    makeBallwhenClicked(purpleBall, '#purpleButton', themePurple);

    //when reset button is clicked, array of balls objects is set back to empty
    select('#resetButton').mouseClicked(function(){
        balls = [];
      });

    //making counters

    function makecounter(counterWidth, counterClass, counterID, color) {
      let counter = createDiv();
      counter.style('font-size', '1.5em')
      .position(counterWidth * windowWidth, 25)
      .class(counterClass)
      .id(counterID)
      .style('color', color)
      .style('-webkit-text-stroke', '1px black')
      .style('-moz-text-stroke', '1px black');
    }

    //update each counter by one every time it is clicked

    makecounter(.28, 'counter', 'greenBallCounter', themeGreen);
    makecounter(.48, 'counter', 'orangeBallCounter', themeOrange);
    makecounter(.68, 'counter', 'purpleBallCounter', themePurple);

    function updateCounter(buttonID, counterID) {
      let counterNum = 0;
      select(buttonID).mouseClicked(function(){
        counterNum +=1;
        select(counterID)
        .style('display', 'inline')
        .html(counterNum);
      })
      select('#resetButton').mouseClicked(function(){
        console.log('reset');
        counterNum = 0;
        select(counterID)
          .html(counterNum)
          .style('display', 'none');
      })
    }

    updateCounter('#greenButton', '#greenBallCounter');
    updateCounter('#orangeButton', '#orangeBallCounter');
    updateCounter('#purpleButton', '#purpleBallCounter');

} //end setup

function draw() {

  //if any key is pressed, have background show nyancat
  //otherwise, color it gray

  if (keyIsPressed === true) {
    background(bg);
  } else {
    background(180);
  }

  //custom shape (Pshape does not exist in P5.js, this is its closest equivalent)

  function drawShape(x, y) {
    push();
    translate(x, y)
    beginShape();
    vertex(92, 244);
    quadraticVertex(50, 222, 36, 322);
    bezierVertex(92, 344, 40, 189, 94, 335);
    endShape(CLOSE)
    pop();
  }

  drawShape();
  drawShape(width * .5, height * .25);
  drawShape(width * .25, height * .25);

  //for each ball in the array, run the show() and move() functions

  balls.forEach(function(i){
    i.show();
    i.move();
  });
}
