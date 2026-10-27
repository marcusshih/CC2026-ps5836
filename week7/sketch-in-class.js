let pMapper;
let Quad1;
let Quad2;
let Quad3;

let a = 0;
let randomColors;

let circleColors;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  // create two quads
  Quad1 = pMapper.createQuadMap(400, 400);
  Quad2 = pMapper.createQuadMap(400, 400);
  Quad3 = pMapper.createQuadMap(400, 400);
}

function draw() {
  background(0);

  // each quad runs its own function
  Quad1.displaySketch(marcusDrawing);
  Quad2.displaySketch(emilyDrawing);
  Quad3.displaySketch(bellaDrawing);
}

function marcusDrawing(marcusSketch) {
  let tunnelCount = 25;
  let speed = 0.008;
  marcusSketch.background(0, 0, 4);
  marcusSketch.colorMode(HSB, 360, 100, 100, 100);

  marcusSketch.noFill();
  marcusSketch.rectMode(CENTER);

  marcusSketch.stroke(220, 50, 25);
  marcusSketch.strokeWeight(1);

  marcusSketch.line(200, 200, 0, 0);
  marcusSketch.line(200, 200, 400, 0);
  marcusSketch.line(200, 200, 0, 400);
  marcusSketch.line(200, 200, 400, 400);

  for (let i = 0; i < 25; i++) {
    let depth = (i / 25 + frameCount * 0.008) % 1;
    let size = 5 + pow(depth, 3) * 560;
    let hueValue = (i * 25 + frameCount * 0.5) % 360;
    let brightness = 20 + depth * 80;
    marcusSketch.stroke(hueValue, 90, brightness);
    marcusSketch.strokeWeight(0.5 + depth * 4);
    marcusSketch.rect(200, 200, size, size);
  }
}

function emilyDrawing(emilySketch) {
  noStroke();

  // anything drawn on this surface needs 'mySketch.' in front of it
  emilySketch.background("skyblue");

  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 10; y++) {
      for (let i = 0; i < 10; i++) {
        emilySketch.push();
        emilySketch.stroke(1);
        // fill(color(circleColors[0]));
        // fill(circleColors[0]);
        randomColors = random(circleColors);
        emilySketch.stroke(randomColors[i * 10]);
        emilySketch.translate(x * 50, y * 50);
        emilySketch.noFill();
        emilySketch.ellipse(1, 1, i * 10 + 4, i * 10 + 4);
        emilySketch.pop();
      }
    }
  }
}

function bellaDrawing(BellaSketch) {
  BellaSketch.background(255, 200, 100);
  BellaSketch.fill(12, 49, 120);
  BellaSketch.stroke(199, 49, 120);

  if (mouseY < height / 2) {
    a += 1;
  } else {
    a -= 1;
  }

  a = constrain(a, 0, 30);
  BellaSketch.strokeWeight(a);

  for (let x = 50; x < BellaSketch.width; x += 200) {
    for (let y = 50; y < BellaSketch.height; y += 200) {
      BellaSketch.rect(x, y, 100, 100);
    }
  }
}
function keyPressed() {
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;
    case "f":
      let fs = fullscreen();
      fullscreen(!fs);
      break;
    case "l":
      pMapper.load("maps/map.json");
      break;
    case "s":
      pMapper.save("map.json");
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
