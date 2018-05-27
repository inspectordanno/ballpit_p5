const themeGreen = 'rgba(58,180,169,1)';
const themeOrange = 'rgba(253,121,29,0.7861519607843137)';
const themePurple = 'rgba(128,69,252,1)'

var greenBallButton;
var orangeBallButton;
var purpleBallButton;
var startButton;

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
  buttonMaker(startButton, 'gray', 'Start/Reset', .5, 'startButton');

  select('#startButton').position(.8 * windowWidth, .5 * windowHeight);

  //creating titleDiv

  var titleDiv = createDiv()
    .style('font-size', '3em')
    .style('text-align', 'center')
    .style('background', `linear-gradient(270deg, ${themeOrange} 0%, ${themePurple} 100%)`)
    .style('-webkit-background-clip', 'text')
    .style('-webkit-text-fill-color', 'transparent')
    .position(.05 * windowWidth, .5 * windowHeight)
    .html('Ball <br /> Pit')
    .id('titleDiv');


}

function draw() {

}
