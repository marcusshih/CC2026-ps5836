let cellSize = 70;

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(ROUND);
}

function draw() {
  background(0);

  for (let y = cellSize / 2; y < height; y += cellSize) {
    for (let x = cellSize / 2; x < width; x += cellSize) {
      let d = dist(mouseX, mouseY, x, y);

      // limit the distance to a maximum value for influence calculation
      let maxDistance = 250;
      let influence = map(d, 0, maxDistance, 1, 0);
      influence = constrain(influence, 0, 1);
      let shapeSize = map(influence, 0, 1, 25, 65);

      //rotation
      let baseRotation = (x + y) * 0.05;
      let mouseRotation = influence * 90;
      let finalRotation = baseRotation + mouseRotation;

      //color
      let baseHue = (x * 0.3 + y * 0.25) % 360;
      let hue = (baseHue + influence * 150) % 360;

      //drawing the shape
      push();

      translate(x, y);
      rotate(finalRotation);

      noFill();
      stroke(hue, 80, 100, 90);
      strokeWeight(2);
      rect(0, 0, shapeSize, shapeSize);
      stroke((hue + 90) % 360, 70, 100, 80);
      ellipse(0, 0, shapeSize * 0.5, shapeSize * 0.5);
      stroke((hue + 180) % 360, 60, 100, 70);
      line(-shapeSize * 0.3, 0, shapeSize * 0.3, 0);
      line(0, -shapeSize * 0.3, 0, shapeSize * 0.3);

      pop();
    }
  }
}
