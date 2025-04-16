var canvasDom = document.getElementById("main");
var ctx = canvasDom.getContext("2d");
canvasDom.width = 800;
canvasDom.height = 500;
canvasDom.style.backgroundColor = "black";

const balls = [];
const ballList = 5;
const ball = new Ball();

for (let i = 0; i < ballList; i++) {
  balls.push(new Ball());
}

moveBall = () => {
  for (let i = 0; i < ballList; i++) {
    const iball = balls[i];
    iball.x += iball.dirx;
    iball.y += iball.diry;

    if (iball.x + iball.radius > canvasDom.width && iball.dirx > 0)
      iball.dirx = -iball.dirx;
    else if (iball.x - iball.radius < 0 && iball.dirx < 0)
      iball.dirx = -iball.dirx;
    if (iball.y + iball.radius > canvasDom.height && iball.diry > 0)
      iball.diry = -iball.diry;
    else if (iball.y - iball.radius < 0 && iball.diry < 0)
      iball.diry = -iball.diry;

    for (let j = i + 1; j < ballList; j++) {
      let jball = balls[j];
      const dirx = jball.x - iball.x;
      const diry = jball.y - iball.y;
      const distance = Math.sqrt(dirx * dirx + diry * diry);
      const overLap = iball.radius + jball.radius - distance;
      if (overLap > 0) {
        // debugger;
        // dirx *= -1;
        // diry *= -1;
      }
    }
  }
};
function drawit() {
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
  for (let i = 0; i < ballList; i++) {
    const manyBall = balls[i];
    manyBall.drawBall(i);
  }
}
animate = () => {
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
  drawit();
  moveBall();
  requestAnimationFrame(animate);
};
animate();
