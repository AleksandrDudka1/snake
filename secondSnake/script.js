const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d'); 


class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}



let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount;

let tailLength  = 2;
const snakeParts = []; 
let headX = 10;
let headY = 10;
let xPosition = 0;
let yPosition = 0;



let appleX =  Math.floor(Math.random() * tileCount);
let appleY =  Math.floor(Math.random() * tileCount);

let score = document.querySelector('span');

const sound = new Audio('sound.mp3');
const lose = new Audio('lose.mp3');

function drawGame(){ 
      changeSnakePosition();

      let result = isGameOver();
      if(result) {
          return;
      }
      renderScreen();
      appleCheckCollision();
      drawSnake();
      drawApple();


      setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;
    if(xPosition == 0 && yPosition == 0) {
        return false;
    }
    if(headX < 0 || headX == tileCount || headY < 0 || headY == tileCount) {
        gameOver = true;
        score.innerText = 0;
        ctx.fillStyle = 'red';
        ctx.font = '50px Sans-serif';
        ctx.fillText('Game over', canvas.width / 4.5, canvas.height / 2);
        lose.play();
    }

    for(let i = 0; i< snakeParts.length; i++) {
        if(snakeParts[i].x == headX && snakeParts[i].y == headY) {
            ctx.fillStyle = 'red';
            ctx.font = '50px Sans-serif';
            ctx.fillText('Game over', canvas.width / 4.5, canvas.height / 2);
            score.innerText = 0;
            gameOver = true;
            lose.play();
            break;
        }
    }
    
    return gameOver;
}

function renderScreen() {
    ctx.fillStyle = "#ffefd5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {


    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++) {
        ctx.fillRect(snakeParts[i].x * tileCount, snakeParts[i].y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
    headX = headX + xPosition;
    headY = headY + yPosition;

}
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function appleCheckCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        score.innerText = + score.innerText + 1;
        tailLength++;
        sound.play()
    }
}
 
document.body.addEventListener('keydown', keyDown);


function keyDown(event) {

    if(event.keyCode == 38) {         //bottom
        if(yPosition == 1) return;
        xPosition = 0;
        yPosition = -1;
    } else if(event.keyCode == 40) {  // top
        if(yPosition == -1) return;
        xPosition = 0;
        yPosition = 1;
    } else if(event.keyCode == 37) {  // left
        if(xPosition == 1) return;
        xPosition = -1;
        yPosition = 0;
    } else if(event.keyCode == 39) {  // right
        if(xPosition ==  -1) return;
        xPosition = 1;
        yPosition = 0;
    }
}


drawGame();


