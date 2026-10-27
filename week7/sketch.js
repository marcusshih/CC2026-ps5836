let pMapper;
let Quad1, Quad2, Quad3;

let ribbons = [];
let time = 0;

let pullSpeed = 1.3;
let ribbonCount = 75;
let meshCount = 48;
let ringCount = 52;

let ribbonColors = [
  [255, 84, 120],
  [255, 148, 101],
  [255, 208, 160],
  [232, 106, 181],
];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  pMapper = createProjectionMapper(this);

  Quad1 = pMapper.createQuadMap(400, 400);
  Quad2 = pMapper.createQuadMap(400, 400);
  Quad3 = pMapper.createQuadMap(400, 400);

  for (let i = 0; i < ribbonCount; i++) {
    ribbons.push(new Ribbon(random(0.1, 0.95)));
  }
}

function draw() {
  background(0);
  time = frameCount * 0.016;
  //time = frameCount * 0.030;

  if (frameCount % 3 === 0) {
    ribbons.push(new Ribbon(0));
  }

  for (let r of ribbons) {
    r.update();
  }

  ribbons = ribbons.filter((r) => r.t < 1);

  Quad1.displaySketch(drawLeftWall);
  Quad2.displaySketch(drawRightWall);
  Quad3.displaySketch(drawCeiling);
}

// left wall!

function drawLeftWall(left) {
  left.background(24, 10, 22);
  left.strokeCap(ROUND);

  for (let r of ribbons) {
    r.display(left);
  }
}

class Ribbon {
  constructor(startT) {
    this.x = random(-60, 300);
    this.y = random(130, 520);
    this.t = startT;
    this.speed = random(0.002, 0.005);
    this.length = random(0.35, 0.72);
    this.width = random(35, 85);
    this.bend = random(40, 125);
    this.phase = random(TWO_PI);
    this.color = random(ribbonColors);
  }

  update() {
    this.t += this.speed * pullSpeed;
  }

  getPoint(t) {
    let bend = sin(t * PI) * this.bend;
    let wave = sin(t * 10 + time + this.phase);

    let x = lerp(this.x, 400, t * t) - bend;
    let y = lerp(this.y, 0, t * t) + wave * bend * 0.4;

    return { x, y };
  }

  display(left) {
    let start = max(0, this.t - this.length);

    let alphas = [30, 130, 220];
    let sizes = [1.6, 1, 0.15];

    for (let layer = 0; layer < 3; layer++) {
      left.stroke(this.color[0], this.color[1], this.color[2], alphas[layer]);

      for (let i = 0; i < 28; i++) {
        let t1 = lerp(start, this.t, i / 28);
        let t2 = lerp(start, this.t, (i + 1) / 28);

        let p1 = this.getPoint(t1);
        let p2 = this.getPoint(t2);

        let middle = (i + 0.5) / 28;
        let w = this.width * sin(middle * PI);

        left.strokeWeight(max(0.5, w * sizes[layer]));
        left.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  }
}

// right wall!

function drawRightWall(right) {
  right.background(6, 22, 29);
  right.noStroke();

  let bands = [3, 12, 22, 31, 42];

  for (let row of bands) {
    right.fill(60, 230, 205, 25);
    right.beginShape();

    for (let j = 0; j <= 40; j++) {
      let p = gridPoint(row, j / 40);
      right.vertex(p.x, p.y);
    }

    for (let j = 40; j >= 0; j--) {
      let p = gridPoint(row + 2, j / 40);
      right.vertex(p.x, p.y);
    }

    right.endShape(CLOSE);
  }

  right.noFill();

  for (let i = 0; i <= meshCount; i++) {
    if (i % 6 === 0) {
      right.stroke(175, 255, 225, 225);
      right.strokeWeight(1.8);
    } else {
      right.stroke(70, 205, 205, 115);
      right.strokeWeight(0.8);
    }

    right.beginShape();

    for (let j = 0; j <= 60; j++) {
      let p = gridPoint(i, j / 60);
      right.vertex(p.x, p.y);
    }

    right.endShape();
  }

  for (let j = 0; j < 35; j++) {
    let t = (j / 35 + frameCount * 0.002) % 1;

    if (j % 5 === 0) {
      right.stroke(235, 255, 220, 230);
      right.strokeWeight(1.8);
    } else {
      right.stroke(90, 210, 205, 90);
      right.strokeWeight(0.8);
    }

    right.beginShape();

    for (let i = 0; i <= meshCount; i++) {
      let p = gridPoint(i, t);
      right.vertex(p.x, p.y);
    }

    right.endShape();
  }
}

function gridPoint(row, t) {
  let startX;
  let startY;

  if (row <= meshCount / 2) {
    startX = 400;
    startY = map(row, 0, meshCount / 2, 0, 400);
  } else {
    startX = map(row, meshCount / 2, meshCount, 400, 0);
    startY = 400;
  }

  let x = lerp(startX, 0, t * t);
  let y = lerp(startY, 0, t * t);

  let wave = sin(row * 0.35 + t * 12 + time) * 35;
  let influence = sin(t * PI);

  x += wave * influence * 0.4;
  y += wave * influence;

  return { x, y };
}

// ceiling

function drawCeiling(up) {
  up.background(16, 12, 35);
  up.noFill();

  up.stroke(170, 145, 255, 50);
  up.strokeWeight(0.8);

  for (let i = 0; i <= 28; i++) {
    let a = PI + (HALF_PI * i) / 28;

    let x = 400 + cos(a) * 650;
    let y = 400 + sin(a) * 650;

    up.line(400, 400, x, y);
  }

  for (let i = 0; i < ringCount; i++) {
    let t = (i / ringCount + frameCount * 0.0018) % 1;
    let radius = 650 * (1 - t * t);

    if (i % 7 === 0) {
      up.stroke(255, 205, 165, 240);
      up.strokeWeight(2.5);
    } else if (i % 3 === 0) {
      up.stroke(215, 175, 255, 180);
      up.strokeWeight(1.4);
    } else {
      up.stroke(140, 115, 230, 125);
      up.strokeWeight(0.8);
    }

    up.beginShape();

    for (let j = 0; j <= 48; j++) {
      let a = PI + (HALF_PI * j) / 48;

      let wave = sin(j * 0.8 + i * 0.6 + time) * 0.07;
      let r = radius * (1 + wave);

      let x = 400 + cos(a) * r;
      let y = 400 + sin(a) * r;

      up.vertex(x, y);
    }

    up.endShape();
  }
}

function keyPressed() {
  if (key === "c") {
    pMapper.toggleCalibration();
  }

  if (key === "f") {
    fullscreen(!fullscreen());
  }

  if (key === "l") {
    pMapper.load("maps/map.json");
  }

  if (key === "s") {
    pMapper.save("map.json");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
