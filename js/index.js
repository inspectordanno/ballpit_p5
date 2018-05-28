const themeGreen = 'rgba(58,180,169,1)';
const themeOrange = 'rgba(253,121,29,0.7861519607843137)';
const themePurple = 'rgba(128,69,252,1)'

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
    this.r = random(2, 20);
    this.fill = fill;
  }


  move() {
  this.x = this.x + random(-2, 2);
  this.y = this.y + random(-2, 2);
  }

  show() {
  stroke(255);
  strokeWeight(4);
  fill(this.fill);
  ellipse(this.x, this.y, this.r);
  }
}

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





} //end setup

function draw() { //trying to get ball to show and move

  background(180);

  balls.forEach(function(i){
    i.show();
    i.move();
  });
}
