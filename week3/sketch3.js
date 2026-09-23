let zoomSpeed = 1.096;
let spacing = 2.5;

// I tried 8 before but it was too fast
// let spawnScale = 8;
let spawnScale = 10;

let removeScale = 50;
let newScale = 0.001;
let newZoomSpeed = 1.19;
let catchUpScale = 0.15;

let levels = 6;
let minDrawScale = 0.01;

let kaleidoscopes = [];
let rotation = 0;

let mousePower = 0;
let mouseBrightness = 1;

function setup() {
  createCanvas(900, 900);

  // learned from p5 reference
  pixelDensity(2);

  // hue is easier for this project because I want to use the color wheel
  colorMode(HSB, 360, 100, 100, 255);

  rectMode(CENTER);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  // create several kaleidoscopes at different starting scales
  for (let index = 0; index < levels; index++) {
    kaleidoscopes.push({
      seed: random(10000),
      scale: 1 / pow(spacing, index),
      spawned: false,
      growthSpeed: zoomSpeed,
    });
  }

  console.log("Setup complete. Loaded levels:", kaleidoscopes.length);
}

function draw() {
  background(0);

  // mouse distance from center
  let mouseDist = dist(mouseX, mouseY, width / 2, height / 2);
  let maxDist = dist(0, 0, width / 2, height / 2);

  // center = 1, farther away = closer to 0
  mousePower = map(mouseDist, 0, maxDist, 1, 0);
  mousePower = constrain(mousePower, 0, 1);

  // moving mouse left/right changes rotation direction and speed
  rotation += map(mouseX, 0, width, -0.035, 0.035);

  // closer to the center = brighter
  mouseBrightness = map(mousePower, 0, 1, 0.8, 1.25);

  // closer to the center = faster tunnel
  let mouseZoom = map(mousePower, 0, 1, 1, 1.015);

  for (let index = 0; index < kaleidoscopes.length; index++) {
    let kaleido = kaleidoscopes[index];

    // if too small, don't draw it because it will be invisible anyway
    if (kaleido.scale > minDrawScale) {
      drawKaleidoscope(kaleido.seed, kaleido.scale, rotation);
    }

    // scale grows faster when mouse is closer to center
    kaleido.scale *= kaleido.growthSpeed * mouseZoom;

    //console.log(kaleido.scale);

    // new kaleidoscopes start faster, then return to normal speed, to catch up to the others
    if (kaleido.growthSpeed > zoomSpeed && kaleido.scale >= catchUpScale) {
      kaleido.growthSpeed = zoomSpeed;
      // console.log("caught up to normal speed");
    }
  }

  // first item is the oldest / outermost one
  let outerKaleido = kaleidoscopes[0];

  // create one new kaleidoscope
  if (outerKaleido.scale >= spawnScale && outerKaleido.spawned == false) {
    console.log("Spawning new layer at scale:", outerKaleido.scale.toFixed(2));

    kaleidoscopes.push({
      seed: random(10000),
      scale: newScale,
      spawned: false,
      growthSpeed: newZoomSpeed,
    });

    // stop this same layer from spawning every frame
    outerKaleido.spawned = true;
  }

  // remove the old one after it goes far outside
  if (outerKaleido.scale >= removeScale) {
    // console.log("old gone");
    kaleidoscopes.shift();
  }
}

function drawKaleidoscope(seed, scaleAmount, rotAmount) {
  push();

  translate(width / 2, height / 2);
  scale(scaleAmount);
  rotate(rotAmount);

  // keeps the same random result for the same kaleidoscope
  randomSeed(seed);

  // each kaleidoscope starts from a different hue
  let baseHue = random(360);

  // quick helper function so I don't type % 360 every time
  let getHue = (offset) => (baseHue + offset) % 360;

  drawEllipses(
    int(random(10, 15)),
    random(45, 60),
    random(45, 60),
    random(145, 165),
    getHue(0),
    220,
    scaleAmount
  );

  drawEllipses(
    int(random(8, 12)),
    random(25, 35),
    random(25, 35),
    random(110, 130),
    getHue(45),
    210,
    scaleAmount
  );

  drawEllipses(
    int(random(8, 12)),
    random(25, 35),
    random(25, 35),
    random(65, 80),
    getHue(90),
    200,
    scaleAmount
  );

  drawEllipses(
    int(random(10, 14)),
    random(6, 10),
    random(6, 10),
    random(35, 50),
    getHue(150),
    240,
    scaleAmount
  );

  drawEllipses(
    int(random(5, 8)),
    random(12, 18),
    random(12, 18),
    random(25, 38),
    getHue(220),
    235,
    scaleAmount
  );

  drawTriangles(4, random(6, 9), random(60, 75), getHue(300), 230, scaleAmount);

  drawTriangles(
    4,
    random(8, 11),
    random(125, 145),
    getHue(0),
    220,
    scaleAmount
  );

  drawSquares(8, random(2, 4), random(80, 95), getHue(45), 220, scaleAmount);

  drawSquares(4, random(3, 5), random(115, 130), getHue(150), 220, scaleAmount);

  drawCenterHexagon(random(10, 15), getHue(90), 255, scaleAmount);

  pop();
}

// all shapes use the same neon colors
function getColors(hueVal, alphaVal) {
  let brightness = min(100, 100 * mouseBrightness);

  return {
    fill: color(hueVal, 80, brightness, alphaVal * 0.08),
    glow: color(hueVal, 90, brightness, alphaVal * 0.12),
    line: color(hueVal, 80, brightness, alphaVal),
    white: color(hueVal, 0, brightness, alphaVal * 0.95),
  };
}

function drawEllipses(
  count,
  ellipseWidth,
  ellipseHeight,
  distance,
  hueVal,
  alphaVal,
  scaleAmount
) {
  let colors = getColors(hueVal, alphaVal);

  // divide the full circle into equal parts
  for (let index = 0; index < count; index++) {
    let angle = index * (TWO_PI / count);

    push();

    // rotate first, then move outward
    // this places the same shape around a circle
    rotate(angle);
    translate(distance, 0);

    fill(colors.fill);
    noStroke();
    ellipse(0, 0, ellipseWidth, ellipseHeight);

    noFill();

    // faint wider line behind
    stroke(colors.glow);
    strokeWeight(1.8 / scaleAmount);
    ellipse(0, 0, ellipseWidth, ellipseHeight);

    // main line
    stroke(colors.line);
    strokeWeight(1.05 / scaleAmount);
    ellipse(0, 0, ellipseWidth, ellipseHeight);

    // bright highlight
    stroke(colors.white);
    strokeWeight(0.22 / scaleAmount);
    ellipse(0, 0, ellipseWidth, ellipseHeight);

    pop();
  }
}

function drawTriangles(count, size, distance, hueVal, alphaVal, scaleAmount) {
  let colors = getColors(hueVal, alphaVal);

  for (let index = 0; index < count; index++) {
    let angle = index * (TWO_PI / count);

    push();

    rotate(angle);
    translate(distance, 0);

    // rotate triangle so it faces outward better
    rotate(HALF_PI);

    fill(colors.fill);
    noStroke();
    triangle(-size, size, size, size, 0, -size);

    noFill();

    stroke(colors.glow);
    strokeWeight(1.6 / scaleAmount);
    triangle(-size, size, size, size, 0, -size);

    stroke(colors.line);
    strokeWeight(0.95 / scaleAmount);
    triangle(-size, size, size, size, 0, -size);

    stroke(colors.white);
    strokeWeight(0.2 / scaleAmount);
    triangle(-size, size, size, size, 0, -size);

    pop();
  }
}

function drawSquares(count, size, distance, hueVal, alphaVal, scaleAmount) {
  let colors = getColors(hueVal, alphaVal);

  for (let index = 0; index < count; index++) {
    let angle = index * (TWO_PI / count);

    push();

    rotate(angle);
    translate(distance, 0);

    // I liked them better as diamonds
    rotate(PI / 4);

    fill(colors.fill);
    noStroke();
    rect(0, 0, size * 2, size * 2);

    noFill();

    stroke(colors.glow);
    strokeWeight(1.6 / scaleAmount);
    rect(0, 0, size * 2, size * 2);

    stroke(colors.line);
    strokeWeight(0.95 / scaleAmount);
    rect(0, 0, size * 2, size * 2);

    stroke(colors.white);
    strokeWeight(0.2 / scaleAmount);
    rect(0, 0, size * 2, size * 2);

    pop();
  }
}

function drawCenterHexagon(radius, hueVal, alphaVal, scaleAmount) {
  let colors = getColors(hueVal, alphaVal);

  fill(colors.fill);
  noStroke();
  hexagon(radius);

  noFill();

  stroke(colors.glow);
  strokeWeight(1.8 / scaleAmount);
  hexagon(radius);

  stroke(colors.line);
  strokeWeight(1.05 / scaleAmount);
  hexagon(radius);

  stroke(colors.white);
  strokeWeight(0.22 / scaleAmount);
  hexagon(radius);
}

function hexagon(radius) {
  beginShape();

  // make a hexagon using 6 points around a circle
  for (let index = 0; index < 6; index++) {
    let angle = (index * TWO_PI) / 6;

    vertex(cos(angle) * radius, sin(angle) * radius);
  }

  endShape(CLOSE);
}

function mousePressed() {
  console.log("Mouse clicked! Adding rotation boost.");

  // click gives the tunnel a sudden 45 degree turn
  rotation += PI / 4;
}
