// BOARD

let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

// food
let foodX;
let foodY;

let snakBody = [];

let gameOver = false;

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // digunakan for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakBody.length - 1; i > 0; i--) {
    snakBody[i] = snakBody[i - 1];
  }
  if (snakBody.length) {
    snakBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "white";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakBody.length; i++) {
    context.fillRect(snakBody[i][0], snakBody[i][1], blockSize, blockSize);
  }

  // game over condition

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("yah lu mati lah goblok");
  }

  for (let i = 0; i < snakBody.length; i++) {
    if (snakeX == snakBody[i][0] && snakeY == snakBody[i][1]) {
      gameOver = true;
      alert("yah lu mati lah goblok");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
