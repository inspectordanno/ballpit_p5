//setting color theme constants

const themeGreen = 'rgba(58,180,169,1)';
const themeOrange = 'rgba(253,121,29,0.7861519607843137)';
const themePurple = 'rgba(128,69,252,1)'

//delcaring buttons, balls, and the array where the balls will be stored

let greenBallButton;
let orangeBallButton;
let purpleBallButton;
let resetButton;
let greenBall;
let orangeBall;
let purpleBall;
let balls = [];

//make ball class
class Ball {
  constructor(fill) {
    this.x = random(width);
    this.y = random(height);
    this.r = random(5, 25);
    this.fill = fill;
    this.xVel = random(-3, 3);
    this.yVel = random(-3, 3);
  }

  //check to see if a ball has hit a wall

  move() {
  //this.xVel += xVel;
  this.x = this.x + this.xVel;
  this.y = this.y + this.yVel;
  this.checkWalls();
  }

  checkBalls(){
    //for each for ball array checking distance
  }

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

 //

  show() {
  stroke(255);
  strokeWeight(1);
  fill(this.fill);
  ellipse(this.x, this.y, this.r);
  }

} //end class declaration

function setup() {

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
    .position(.05 * windowWidth, .5 * windowHeight)
    .html('Ball <br /> Pit')
    .id('titleDiv');

    //instantiating new ball when analogous button is clicked

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

    function makecounter(counterWidth, counterClass, counterID) {
      let counter = createDiv();
      counter.style('font-size', '1em')
      .position(counterWidth * windowWidth, 25)
      .class(counterClass)
      .id(counterID);
    }

    //update each counter by one every time it is clicked

    makecounter(.28, 'counter', 'greenBallCounter');
    makecounter(.48, 'counter', 'orangeBallCounter');
    makecounter(.68, 'counter', 'purpleBallCounter');

    function updateCounter(buttonID, counterID) {
      let counterNum = 0;
      select(buttonID).mouseClicked(function(){
        counterNum +=1;
        select(counterID)
        .style('display', 'inline')
        .html(counterNum);
      })
      select('#resetButton').mouseClicked(function(){
        console.log('hello');
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

function draw() { //trying to get ball to show and move

  background(180);

  balls.forEach(function(i){
    i.show();
    i.move();
  });
}
