let capture;
let disp;
let mode = 1;
let camW = 640;
let camH = 480;

let particleStep = 8;
let particleMovement = 20;

let lightStep = 5;
let lightThreshold = 220;
let lightWindow = 18;
let prevX;
let prevY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  capture = createCapture(VIDEO);
  capture.size(camW, camH);
  capture.hide();

  disp = createGraphics(camW, camH);

  disp.pixelDensity(1);
  disp.background(0);
}

function draw() {
  background(0);

  capture.loadPixels();

  if (capture.pixels.length === 0) {
    return;
  }

  if (mode === 1) {
    drawParticles();
  }

  if (mode === 2) {
    drawLight();
  }

  push();
  translate(width, 0);
  scale(-1, 1);
  image(disp, 0, 0, width, height);
  pop();
}

// particle
function drawParticles() {
  disp.noStroke();
  disp.fill(0, 30);
  disp.rect(0, 0, camW, camH);

  for (let y = 0; y < camH; y += particleStep) {
    for (let x = 0; x < camW; x += particleStep) {
      let index = (x + y * camW) * 4;

      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let bright = (r + g + b) / 3;
      let size = map(bright, 0, 255, 2, 35);
      let movement = map(bright, 0, 255, 2, particleMovement);

      let offsetX =
        (noise(x * 0.02, y * 0.02, frameCount * 0.01) - 0.5) * movement * 2;

      let offsetY =
        (noise(x * 0.02 + 100, y * 0.02, frameCount * 0.01) - 0.5) *
        movement *
        2;

      disp.fill(r, g, b, 200);
      disp.circle(x + offsetX, y + offsetY, size);
    }
  }
}

// light-drawing
function drawLight() {
  let brightest = 0;
  let brightX = 0;
  let brightY = 0;

  for (let y = 0; y < camH; y += lightStep) {
    for (let x = 0; x < camW; x += lightStep) {
      let index = (x + y * camW) * 4;

      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let bright = (r + g + b) / 3;

      if (bright > brightest) {
        brightest = bright;
        brightX = x;
        brightY = y;
      }
    }
  }

  if (brightest < lightThreshold) {
    prevX = undefined;
    prevY = undefined;
    return;
  }

  let sumX = 0;
  let sumY = 0;
  let count = 0;

  let threshold = max(lightThreshold, brightest - lightWindow);

  for (
    let y = max(0, brightY - 40);
    y < min(camH, brightY + 40);
    y += lightStep
  ) {
    for (
      let x = max(0, brightX - 40);
      x < min(camW, brightX + 40);
      x += lightStep
    ) {
      let index = (x + y * camW) * 4;

      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let bright = (r + g + b) / 3;

      if (bright >= threshold) {
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }

  if (count === 0) {
    prevX = undefined;
    prevY = undefined;
    return;
  }

  let cx = sumX / count;
  let cy = sumY / count;

  let size = map(brightest, lightThreshold, 255, 4, 8);

  // make it smoother along th path
  if (prevX !== undefined) {
    let moveDist = dist(prevX, prevY, cx, cy);

    if (moveDist < 100) {
      let steps = max(1, ceil(moveDist / 3));

      for (let i = 0; i <= steps; i++) {
        let t = i / steps;

        let x = lerp(prevX, cx, t);
        let y = lerp(prevY, cy, t);

        drawBlueCircle(x, y, size);
      }
    } else {
      drawBlueCircle(cx, cy, size);
    }
  } else {
    drawBlueCircle(cx, cy, size);
  }

  prevX = cx;
  prevY = cy;
}

function drawBlueCircle(x, y, size) {
  disp.noStroke();

  // outer glow
  disp.fill(0, 100, 255, 25);
  disp.circle(x, y, size * 4);

  // inner glow
  disp.fill(0, 170, 255, 80);
  disp.circle(x, y, size * 2);

  // blue center
  disp.fill(50, 210, 255);
  disp.circle(x, y, size);
}

function scanColor() {
  let warm = 0;
  let cool = 0;

  for (let y = 100; y < 380; y += 10) {
    for (let x = 100; x < 540; x += 10) {
      let index = (x + y * camW) * 4;

      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let highest = max(r, g, b);
      let lowest = min(r, g, b);

      // ignore dark or low contrast colors
      if (highest < 40 || highest - lowest < 20) {
        continue;
      }

      // warm: red, orange, yellow
      if ((r > g * 1.1 && r > b * 1.2) || (r > b * 1.3 && g > b * 1.1)) {
        warm++;
      }

      // cool: green, blue, purple
      else if (g > r * 1.1 || b > r * 1.1) {
        cool++;
      }
    }
  }

  console.log("warm", warm, "cool", cool);

  if (warm > cool && warm > 10) {
    mode = 1;
  } else if (cool > warm && cool > 10) {
    mode = 2;
  }

  disp.background(0);
  prevX = undefined;
  prevY = undefined;
}

function keyPressed() {
  if (key === "s" || key === "S") {
    capture.loadPixels();

    if (capture.pixels.length > 0) {
      scanColor();
    }
  }

  if (key === "c" || key === "C") {
    disp.background(0);
    prevX = undefined;
    prevY = undefined;
  }

  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
