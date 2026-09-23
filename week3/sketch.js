let cellSize = 80;

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(0);

  for (let y = cellSize / 2; y < height; y += cellSize) {
    for (let x = cellSize / 2; x < width; x += cellSize) {
      let xIndex = x / cellSize;
      let yIndex = y / cellSize;
      let rotation = xIndex * 12 + yIndex * 8;
      let hue = (xIndex * 25 + yIndex * 18) % 360;
      let shapeSize = 40 + yIndex * 2;

      push();

      translate(x, y);
      rotate(rotation);
      noFill();
      stroke(hue, 80, 100, 90);
      strokeWeight(2);
      rect(0, 0, shapeSize, shapeSize);
      stroke((hue + 80) % 360, 70, 100, 80);
      ellipse(0, 0, shapeSize * 0.6, shapeSize * 0.6);
      stroke((hue + 160) % 360, 60, 100, 70);
      line(-shapeSize / 2, -shapeSize / 2, shapeSize / 2, shapeSize / 2);

      pop();
    }
  }
}
