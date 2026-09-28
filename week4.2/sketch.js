let layerCount = 20;
let sizeStep = 20;
let angleStep = 5;

let exportSvg = false;

function setup() {
  createCanvas(576, 384);

  angleMode(DEGREES);
  rectMode(CENTER);
  pixelDensity(10);

  noLoop();
}

function draw() {
  background(255);

  if (exportSvg) {
    beginRecordSvg("Week4_Plotter.svg");
  }

  stroke(0);
  strokeWeight(1);
  noFill();

  translate(width / 2, height / 2);

  // rotate the whole drawing
  rotate(-90);

  for (let i = 0; i < layerCount; i++) {
    let size = 70 + i * sizeStep;
    let angle = i * angleStep;

    let offsetX = sin(i * 18) * 10;
    let offsetY = cos(i * 14) * 8;

    push();

    translate(offsetX, offsetY);
    rotate(angle);

    drawUnit(size);

    pop();
  }

  if (exportSvg) {
    endRecordSvg();
    exportSvg = false;
  }
}

function drawUnit(size) {
  rect(0, 0, size, size * 0.55);

  ellipse(0, 0, size * 0.8, size * 0.32);

  line(-size / 2, -size * 0.275, size / 2, size * 0.275);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    exportSvg = true;

    redraw();
  }
}
