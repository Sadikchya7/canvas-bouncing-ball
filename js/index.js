var canvasDom = document.getElementById("main");
canvasDom.height = 400;
canvasDom.width = 800;
canvasDom.style.backgroundColor = "red";
var canvas = canvasDom.getContext("2d");
let x = Math.random() * 2 + 2;
let y = Math.random() * 2 + 2;
let dirX = 1;
let dirY = 1;
let speed = 2;
let radius = 40;
let move = () => {
  x += speed * dirX;
  y += speed * dirY;
  canvas.clearRect(0, 0, canvasDom.width, canvasDom.height);
  canvas.beginPath();
  canvas.arc(x, y, radius, 0, 360);
  canvas.arc(x, y, radius, 0, 360);
  canvas.fillStyle = "yellow";
  canvas.fill();

  requestAnimationFrame(move);
  if (x + radius >= canvasDom.width) {
    dirX = -1;
  }
  if (y + radius >= canvasDom.height) {
    dirY = -1;
  }
  if (x - radius <= 0) {
    dirX = 1;
  }
  if (y - radius <= 0) {
    dirY = 1;
  }
};
move();
