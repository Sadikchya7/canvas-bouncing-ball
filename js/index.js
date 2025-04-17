const ballList = 10;
const minRad = 20;
const maxRad = 80;
const speedofBall = 2;
const elasticity = 1.0;

var canvasDom = document.getElementById("main");
var ctx = canvasDom.getContext("2d");
canvasDom.width = window.innerWidth;
canvasDom.height = window.innerHeight;
canvasDom.style.backgroundColor = "black";

const balls = [];
let ballMax = 0;

class Ball {
  constructor(minrad = 10, maxrad = 50, speed = 1) {
    const cmaxr = Math.min(canvasDom.width, canvasDom.height) * 0.5;
    if (maxrad > cmaxr) maxrad = cmaxr;
    // this.speed = speed;
    this.radius = Math.random() * maxrad + minrad;
    this.mass = this.radius;
    this.x = Math.random() * (canvasDom.width - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvasDom.height - this.radius * 2) + this.radius;
    this.dx = Math.random() * 2 * speed - speed;
    this.dy = Math.random() * 2 * speed - speed;
    this.color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //drawing circle
    ctx.fillStyle = "#" + this.color;
    ctx.fill();
  }
  vrotate(sinAngle, cosAngle) {
    const newXspeed = this.dx * cosAngle + this.dy * sinAngle;
    const newYspeed = -this.dx * sinAngle + this.dy * cosAngle;
    this.dx = newXspeed;
    this.dy = newYspeed;
  }
  vUnrotate(sinAngle, cosAngle) {
    const newXspeed = this.dx * cosAngle - this.dy * sinAngle;
    const newYspeed = this.dx * sinAngle + this.dy * cosAngle;
    this.dx = newXspeed;
    this.dy = newYspeed;
  }
  testingHitForAll() {
    for (let ballIndex = 0; ballIndex < ballMax; ballIndex++) {
      const otherBall = balls[ballIndex];
      const xdistance = otherBall.x - this.x;
      const ydistance = otherBall.y - this.y;
      const distanceBtwnTwoBall = Math.sqrt(
        xdistance * xdistance + ydistance * ydistance
      );
      const combinedradius = this.radius + otherBall.radius;
      if (distanceBtwnTwoBall < combinedradius) {
        return ballIndex;
      }
    }
    return false;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  checkCollisionWithOtherBalls(balls, firstBallIndex) {
    for (let another = firstBallIndex + 1; another < balls.length; another++) {
      let anotherBall = balls[another];
      const dx = anotherBall.x - this.x;
      const dy = anotherBall.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const overlapDistance = this.radius + anotherBall.radius - distance;
      if (overlapDistance > 0) {
        //overlap
        const moveX = dx + anotherBall.dx - this.dx;
        const moveY = dy + anotherBall.dy - this.dy;
        const moveDistance = Math.sqrt(moveX * moveX + moveY * moveY);
        if (moveDistance < distance) {
          if (overlapDistance > maximumOverlapDistance) {
            maximumOverlapDistance = overlapDistance > 0;
          }
          debugger;
          const hitAngleArc = Math.atan2(dy, dx);
          const hitAngleSin = Math.sin(hitAngleArc);
          const hitAngleCos = Math.cos(hitAngleArc);
          anotherBall.vrotate(hitAngleSin, hitAngleCos);
          this.vrotate(hitAngleSin, hitAngleCos);

          const newSpeedI =
            (this.mass * this.dx +
              anotherBall.mass * anotherBall.dx -
              anotherBall.mass * (this.dx - anotherBall.dx) * elasticity) /
            (this.mass + anotherBall.mass);
          //ELASTICITY FORMULS v'1 =(m1 x v1 + m2 x v2 - m2 x (v1-v2) x elasticity)/(m1 + m2)
          const newSpeedJ =
            (this.mass * this.dx +
              anotherBall.mass * anotherBall.dx -
              this.mass * (anotherBall.dx - this.dx) * elasticity) /
            (this.mass + anotherBall.mass);
          this.dx = newSpeedI;
          anotherBall.dx = newSpeedJ;
          anotherBall.vUnrotate(hitAngleSin, hitAngleCos);
          this.vUnrotate(hitAngleSin, hitAngleCos);
        }
        debugger;
      }
    }
  }
  checkCollisionWithWalls() {
    if (this.x + this.radius > canvasDom.width && this.dx > 0)
      this.dx = -this.dx;
    else if (this.x - this.radius < 0 && this.dx < 0) this.dx = -this.dx;
    if (this.y + this.radius > canvasDom.height && this.dy > 0)
      this.dy = -this.dy;
    else if (this.y - this.radius < 0 && this.dy < 0) this.dy = -this.dy;
  }
}

let maximumOverlapDistance = 0;
moveBall = () => {
  for (let first = 0; first < ballMax; first++) {
    const firstBall = balls[first];
    firstBall.move();

    firstBall.checkCollisionWithOtherBalls(balls, first);

    firstBall.checkCollisionWithWalls();
  }
};

drawTheBall = () => {
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
  for (let i = 0; i < ballMax; i++) {
    const manyBall = balls[i];
    manyBall.drawBall(i);
  }
};
animate = () => {
  drawTheBall();
  moveBall();
  requestAnimationFrame(animate);
};

generateBall = () => {
  let count = 0;
  for (let i = 0; i < ballList; i++) {
    while (count++ < 100000) {
      const newBall = new Ball(minRad, maxRad, speedofBall);
      const collisionCheck = newBall.testingHitForAll();
      if (collisionCheck === false) {
        balls.push(newBall);
        ballMax = balls.length;
        break;
      }
    }
  }
};

init = () => {
  generateBall();
  animate();
};
init();
