class Ball {
  constructor(minrad = 10, maxrad = 50, speed = 1) {
    this.speed = speed;
    this.radius = Math.random() * maxrad + minrad;
    this.x = Math.random() * (canvasDom.width - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvasDom.height - this.radius * 2) + this.radius;
    this.dirx = Math.random() * 2 * speed - speed;
    this.diry = Math.random() * 2 * speed - speed;
    this.color = Math.floor(Math.random() * 16777215).toString(16);
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //drawing circle
    ctx.fillStyle = "#" + this.color;
    ctx.fill();
  }
  // moveBall() {
  //   // debugger;
  //   this.x += this.dirx;
  //   this.y += this.diry;
  // }
}
