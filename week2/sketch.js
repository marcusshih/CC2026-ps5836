let variation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  // V1
  if (variation === 0) {
    background(0, 0, 0);

    noStroke();

    //circle 1
    fill(340, 75, 95);
    push();
    translate(width * 0.25, height * 0.3);
    scale(0.8, 0.8);
    circle(0, 0, 210);
    pop();

    // circle 2
    fill(48, 75, 100);
    push();
    translate(width * 0.7, height * 0.25);
    scale(1.1, 1.1);
    circle(0, 0, 72);
    pop();

    // circle 3
    fill(160, 95, 85);
    push();
    translate(width * 0.68, height * 0.7);
    scale(0.9);
    circle(0, 0, 34);
    pop();

    // triangle 1
    fill(20, 95, 98);
    push();
    translate(width * 0.4, height * 0.7);
    rotate(-25);
    scale(1.2);
    triangle(0, 0, 40, 15, 0, 32);
    pop();

    // tirangle 2
    fill(205, 90, 85);
    push();
    translate(width * 0.2, height * 0.75);
    rotate(20);
    scale(0.8);
    triangle(0, -148, 0, 0, 120, 0);
    pop();

    // triangle 3
    fill(270, 75, 90);
    push();
    translate(width * 0.58, height * 0.48);
    rotate(-35);
    scale(0.7);
    triangle(0, -170, 0, 0, 100, 0);
    pop();

    // lines
    stroke(215, 80, 90);
    strokeWeight(3);
    line(width * 0.12, height * 0.15, width * 0.32, height * 0.22);

    stroke(15, 90, 95);
    line(width * 0.55, height * 0.18, width * 0.82, height * 0.4);

    stroke(150, 85, 80);
    line(width * 0.3, height * 0.5, width * 0.5, height * 0.38);

    stroke(300, 70, 85);
    line(width * 0.55, height * 0.78, width * 0.82, height * 0.63);
  }

  // V2
  if (variation === 1) {
    background(220, 70, 7);

    //orbit-cricle
    push();
    translate(width / 2, height / 2);
    scale(width / 900, height / 950);

    noFill();

    stroke(48, 90, 100, 0.15);
    strokeWeight(16);
    ellipse(0, 0, 780, 360);

    stroke(48, 90, 100, 0.4);
    strokeWeight(8);
    ellipse(0, 0, 780, 360);

    stroke(48, 90, 100);
    strokeWeight(3);
    ellipse(0, 0, 780, 360);

    pop();

    noStroke();

    // circle 1
    fill(random(0, 360), random(70, 95), random(85, 100));
    push();
    translate(width * 0.75 + random(-30, 30), height * 0.33 + random(-20, 20));
    scale(random(1.2, 5.0), random(1.0, 3.7));
    circle(0, 0, 72);
    pop();

    // circle 2
    fill(random(0, 360), random(70, 95), random(85, 100));
    push();
    translate(width * 0.25 + random(-25, 25), height * 0.65 + random(-20, 20));
    scale(random(1.1, 1.8));
    circle(0, 0, 34);
    pop();

    // triangle 1
    fill(random(0, 360), random(75, 100), random(85, 100));
    push();
    translate(width * 0.85, height * 0.52);
    rotate(random(-60, 60));
    scale(random(1.0, 1.8));
    triangle(0, 0, 40, 15, 0, 32);
    pop();

    // tirangle 2
    fill(random(0, 360), random(75, 100), random(75, 95));
    push();
    translate(width * 0.18, height * 0.36);
    rotate(random(-180, 180));
    scale(random(0.5, 3));
    triangle(0, -148, 0, 0, 120, 0);
    pop();

    // triangle 3
    fill(random(0, 360), random(75, 100), random(75, 95));
    push();
    translate(width * 0.52, height * 0.72);
    rotate(random(-180, 180));
    scale(random(0.7, 1.2));
    triangle(0, -170, 0, 0, 100, 0);
    pop();

    // lines
    stroke(random(0, 360), random(70, 100), random(85, 100));
    strokeWeight(random(3, 8));
    line(
      width * 0.63 + random(-25, 25),
      height * 0.28 + random(-15, 15),
      width * 0.69 + random(-25, 25),
      height * 0.25 + random(-15, 15)
    );

    stroke(random(0, 360), random(70, 100), random(85, 100));
    strokeWeight(random(2, 6));
    line(
      width * 0.27 + random(-25, 25),
      height * 0.68 + random(-15, 15),
      width * 0.33 + random(-25, 25),
      height * 0.72 + random(-15, 15)
    );

    stroke(random(0, 360), random(70, 100), random(85, 100));
    strokeWeight(random(1, 10));
    line(
      width * 0.84 + random(-25, 25),
      height * 0.5 + random(-15, 15),
      width * 0.9 + random(-25, 25),
      height * 0.52 + random(-15, 15)
    );

    stroke(random(0, 360), random(70, 100), random(85, 100));
    strokeWeight(random(4, 7));
    line(
      width * 0.1 + random(-25, 25),
      height * 0.45 + random(-15, 15),
      width * 0.16 + random(-25, 25),
      height * 0.43 + random(-15, 15)
    );
  }

  // V3
  if (variation === 2) {
    background(210, 55, 14);

    noStroke();

    // core-circle
    fill(210, 45, 25);
    push();
    translate(width / 2, height / 2);
    scale(random(0.8, 1.1), random(0.6, 0.85));
    circle(0, 0, 210);
    pop();

    // shapes get pulled
    fill(random(190, 220), 40, 90);
    push();
    translate(width * 0.58 + random(-25, 25), height * 0.42 + random(-20, 20));
    scale(random(0.9, 1.2));
    circle(0, 0, 72);
    pop();

    fill(45, 65, 90);
    push();
    translate(width * 0.53 + random(-15, 15), height * 0.52 + random(-15, 15));
    scale(random(0.6, 0.9));
    circle(0, 0, 34);
    pop();

    fill(40, 65, 90);
    push();
    translate(width * 0.63, height * 0.5);
    rotate(random(-25, 20));
    scale(random(0.8, 1.2));
    triangle(0, 0, 40, 15, 0, 32);
    pop();

    fill(random(190, 220), 45, 80);
    push();
    translate(width * 0.38, height * 0.43);
    rotate(random(5, 30));
    scale(random(0.8, 1.1), random(0.5, 0.8));
    triangle(0, -148, 0, 0, 120, 0);
    pop();

    fill(random(190, 220), 45, 85);
    push();
    translate(width * 0.43, height * 0.6);
    rotate(random(-25, 0));
    scale(random(0.8, 1.1), random(0.5, 0.8));
    triangle(0, -170, 0, 0, 100, 0);
    pop();

    // lines outside
    stroke(45, 65, 90);
    strokeWeight(3);

    line(width * 0.78, height * 0.23, width * 0.61, height * 0.38);
    line(width * 0.12, height * 0.48, width * 0.38, height * 0.49);
    line(width * 0.16, height * 0.75, width * 0.39, height * 0.59);
    line(width * 0.82, height * 0.74, width * 0.62, height * 0.59);
  }

  // V4
  if (variation === 3) {
    background(334, 20, 92);

    let pgX = width * 0.38;
    let pgY = height * 0.62;
    let pgScale = 1.25;
    let pgAngle = -25;

    push();

    translate(pgX, pgY);
    rotate(pgAngle);
    scale(pgScale);

    noStroke();

    // body
    fill(random(180, 230), random(5, 20), random(85, 100));
    circle(0, 0, 210);

    // head
    fill(random(180, 230), random(5, 20), random(90, 100));
    circle(130, 5, 72);

    // eye
    fill(random(180, 230), random(20, 50), random(10, 25));
    circle(140, -5, 14);

    // beak
    fill(random(25, 50), random(60, 80), random(75, 95));
    triangle(165, -10, 205, 5, 165, 22);

    // wing 1
    fill(random(180, 230), random(10, 35), random(40, 65));
    triangle(-95, -150, -95, -2, 25, -2);

    // wing 2
    fill(random(180, 230), random(10, 35), random(45, 70));
    triangle(-45, -150, -45, 20, 55, 20);

    // lines
    stroke(random(180, 230), random(15, 35), random(20, 40));
    strokeWeight(3);

    line(125, -25, 145, -10);
    line(-250, -40, -205, -40);
    line(-250, 0, -205, 0);
    line(-250, 40, -205, 40);

    pop();
  }

  // V5
  if (variation === 4) {
    background(197, 43, 92);

    let pgX = width / 2;
    let pgY = height / 2;
    let pgScale = 2;

    push();
    translate(pgX, pgY);
    scale(pgScale);

    noStroke();

    // body-rectangle (constrct the body with two triangles)
    fill(random(180, 230), random(0, 10), random(90, 100));

    triangle(-25, -70, 35, -70, -25, 180);

    triangle(35, -70, 35, 180, -25, 180);

    // body-circle
    fill(random(180, 230), random(0, 10), random(88, 100));
    circle(0, 70, 220);

    // wing 1 - triangle
    fill(random(180, 230), random(10, 30), random(35, 60));
    triangle(-220, 105, -25, 105, -25, -30);

    // wing 2 - triangle
    fill(random(180, 230), random(10, 30), random(40, 65));
    triangle(-180, 180, 35, 180, 35, -25);

    // head - circle
    fill(random(180, 230), random(0, 10), random(92, 100));
    circle(0, -100, 75);

    // eye - circle
    fill(random(180, 230), random(20, 50), random(10, 25));
    circle(10, -108, 13);

    // beak - triangle
    fill(random(25, 50), random(60, 80), random(75, 95));
    triangle(38, -115, 82, -95, 38, -78);

    pop();
  }
}

function mousePressed() {
  variation++;

  if (variation > 4) {
    variation = 0;
  }

  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
