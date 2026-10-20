// ORDINARY THINGS CLOCK
// Responsive p5.js 2.x
//
// Hours = Shadows
// Minutes = Latte art
// Seconds = Coffee bubbles

let clockMode = "real";
let previewStartMs = 0;
let showLabels = false;

const palettes = [
  {
    h: 0,
    bg: "#2c2933",
    table: "#594a47",
    tray: "#2f2f36",
    paper: "#e6d7c7",
    cup: "#e9dbcf",
    light: "#f2b57f",
    shadow: "#43373e",
    ink: "#f4dfce",
  },
  {
    h: 5.5,
    bg: "#81706b",
    table: "#b29081",
    tray: "#534b4c",
    paper: "#f0e1cf",
    cup: "#f4e7d8",
    light: "#ffd8a0",
    shadow: "#7e6658",
    ink: "#7b6558",
  },
  {
    h: 8.5,
    bg: "#d4c5b2",
    table: "#e6d4bc",
    tray: "#6c635c",
    paper: "#fff0dd",
    cup: "#fbefdf",
    light: "#fff0c0",
    shadow: "#9a826a",
    ink: "#7d6b5c",
  },
  {
    h: 12,
    bg: "#e5d8c5",
    table: "#ecdac0",
    tray: "#6e655e",
    paper: "#fff2e1",
    cup: "#fcf1e1",
    light: "#fff3cf",
    shadow: "#a18a73",
    ink: "#7e6d5f",
  },
  {
    h: 16.5,
    bg: "#ddb79d",
    table: "#e7c5a7",
    tray: "#665755",
    paper: "#f8e5cf",
    cup: "#f9e7d8",
    light: "#ffd08e",
    shadow: "#8f6854",
    ink: "#7a5d4d",
  },
  {
    h: 19,
    bg: "#9b6f68",
    table: "#b9856f",
    tray: "#4b4347",
    paper: "#efdcca",
    cup: "#f3e0d3",
    light: "#ffb56d",
    shadow: "#674741",
    ink: "#f0d3bf",
  },
  {
    h: 22,
    bg: "#594952",
    table: "#7d635c",
    tray: "#34343a",
    paper: "#ead9c7",
    cup: "#efddd1",
    light: "#f1b379",
    shadow: "#4d3e43",
    ink: "#f4dcc8",
  },
  {
    h: 24,
    bg: "#2c2933",
    table: "#594a47",
    tray: "#2f2f36",
    paper: "#e6d7c7",
    cup: "#e9dbcf",
    light: "#f2b57f",
    shadow: "#43373e",
    ink: "#f4dfce",
  },
];

// --------------------------------
// SETUP
// --------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);

  pixelDensity(min(displayDensity(), 2));

  frameRate(30);
  angleMode(RADIANS);
  textFont("monospace");
}

// --------------------------------
// DRAW
// --------------------------------

function draw() {
  let t = clockTime();
  let p = getPalette(t.hFloat);
  let layout = getLayout();

  drawBackground(t, p, layout);
  drawPaperAndShadows(t, p, layout);
  drawCoffeeCup(t, p, layout);

  if (showLabels) {
    drawLabels(t, p);
  }
}

// --------------------------------
// RESPONSIVE LAYOUT
// --------------------------------

// All positions depend on canvas size.

function getLayout() {
  let marginX = width * 0.05;
  let marginY = height * 0.07;

  let trayX = marginX;
  let trayY = marginY;

  let trayW = width - marginX * 2;
  let trayH = height - marginY * 2;

  let paperW;
  let paperH;
  let paperX;
  let paperY;

  let cupX;
  let cupY;
  let cupR;

  if (width < height * 0.8) {
    // Portrait: paper above coffee

    paperW = min(trayW * 0.5, trayH * 0.29);

    paperH = paperW * 1.39;

    paperX = trayX + (trayW - paperW) / 2;

    paperY = trayY + trayH * 0.055;

    cupX = trayX + trayW * 0.48;

    cupY = trayY + trayH * 0.72;

    cupR = min(trayW * 0.34, trayH * 0.23);
  } else {
    // Landscape: paper left, coffee right

    paperW = min(trayW * 0.31, (trayH * 0.74) / 1.39);

    paperH = paperW * 1.39;

    paperX = trayX + trayW * 0.085;

    paperY = trayY + (trayH - paperH) / 2;

    cupX = trayX + trayW * 0.715;

    cupY = trayY + trayH * 0.5;

    cupR = min(trayH * 0.325, trayW * 0.202);
  }

  return {
    trayX,
    trayY,
    trayW,
    trayH,
    paperX,
    paperY,
    paperW,
    paperH,
    cupX,
    cupY,
    cupR,
  };
}

// --------------------------------
// TIME
// --------------------------------

function clockTime() {
  let h = hour();
  let m = minute();

  let s = second() + new Date().getMilliseconds() / 1000;

  if (clockMode === "day") {
    // 48 seconds = one full day
    // Starting from 6 AM

    let virtualHour = (6 + ((millis() - previewStartMs) * 24) / 48000) % 24;

    h = floor(virtualHour);
    m = floor((virtualHour % 1) * 60);
    s = (virtualHour * 3600) % 60;
  } else if (clockMode === "minute") {
    // 30 seconds = 60 minutes

    let virtualMinute = (((millis() - previewStartMs) * 60) / 30000) % 60;

    h = 10;
    m = floor(virtualMinute);
    s = (virtualMinute % 1) * 60;
  }

  return {
    h: h,
    m: m,
    s: s,
    hFloat: h + m / 60 + s / 3600,
  };
}

// --------------------------------
// COLORS
// --------------------------------

function getPalette(currentHour) {
  for (let i = 0; i < palettes.length - 1; i++) {
    let first = palettes[i];
    let next = palettes[i + 1];

    if (currentHour >= first.h && currentHour <= next.h) {
      let blend = (currentHour - first.h) / (next.h - first.h);

      return {
        bg: lerpColor(color(first.bg), color(next.bg), blend),

        table: lerpColor(color(first.table), color(next.table), blend),

        tray: lerpColor(color(first.tray), color(next.tray), blend),

        paper: lerpColor(color(first.paper), color(next.paper), blend),

        cup: lerpColor(color(first.cup), color(next.cup), blend),

        light: lerpColor(color(first.light), color(next.light), blend),

        shadow: lerpColor(color(first.shadow), color(next.shadow), blend),

        ink: lerpColor(color(first.ink), color(next.ink), blend),
      };
    }
  }

  return getPalette(12);
}

function timeMood(currentHour) {
  if (currentHour >= 5 && currentHour < 10) {
    return "morning";
  }

  if (currentHour >= 10 && currentHour < 17) {
    return "day";
  }

  if (currentHour >= 17 && currentHour < 20.5) {
    return "sunset";
  }

  return "midnight";
}

function stableNoise(seed) {
  return (sin(seed * 127.1) * 43758.5453 + 100000) % 1;
}

// --------------------------------
// GRADIENT AND SHADOW HELPERS
// --------------------------------

function drawFullScreenGradient(firstColor, lastColor) {
  noStroke();

  let bands = 160;

  for (let i = 0; i < bands; i++) {
    let blend = i / (bands - 1);

    fill(lerpColor(firstColor, lastColor, blend));

    rect(0, (i * height) / bands, width, height / bands + 1);
  }
}

// Soft lamp glow made with circles

function drawLampGlow(centerX, centerY, glowRadius) {
  noStroke();

  for (let i = 44; i >= 1; i--) {
    let amount = i / 44;

    fill(255, 194, 135, lerp(3.7, 0.45, amount));

    circle(centerX, centerY, glowRadius * 2 * amount);
  }
}

// Soft shadow made with rectangles

function drawSoftShadow(x, y, boxW, boxH, corner, offsetY, spread, strength) {
  noStroke();

  for (let i = 12; i >= 1; i--) {
    let extra = (i / 12) * spread;

    fill(27, 17, 19, strength / 12);

    rect(
      x - extra,
      y + offsetY - extra,
      boxW + extra * 2,
      boxH + extra * 2,
      corner + extra
    );
  }
}

// --------------------------------
// BACKGROUND AND TRAY
// --------------------------------

function drawBackground(t, p, layout) {
  let mood = timeMood(t.hFloat);

  drawFullScreenGradient(p.bg, p.table);

  noStroke();

  if (mood === "morning") {
    fill(255, 246, 210, 26);
    rect(0, 0, width, height);
  } else if (mood === "day") {
    fill(255, 252, 233, 18);
    rect(0, 0, width, height);
  } else if (mood === "sunset") {
    fill(255, 158, 94, 38);
    rect(0, 0, width, height);

    fill(206, 98, 113, 16);
    rect(0, 0, width, height);
  } else {
    fill(21, 17, 31, 28);
    rect(0, 0, width, height);
  }

  let { trayX, trayY, trayW, trayH } = layout;

  let corner = min(trayW, trayH) * 0.043;

  // Tray shadow

  drawSoftShadow(
    trayX,
    trayY,
    trayW,
    trayH,
    corner,
    trayH * 0.024,
    trayH * 0.028,
    120
  );

  // Tray

  noStroke();
  fill(p.tray);

  rect(trayX, trayY, trayW, trayH, corner);

  // Lighting

  if (mood === "midnight") {
    push();

    beginClip();

    rect(trayX, trayY, trayW, trayH, corner);

    endClip();

    drawLampGlow(
      layout.cupX,
      layout.cupY - layout.cupR * 0.25,
      layout.cupR * 2.1
    );

    pop();
  } else if (mood === "sunset") {
    fill(255, 174, 110, 12);

    rect(trayX, trayY, trayW, trayH, corner);
  }

  // Tray edge

  noFill();

  stroke(244, 217, 177, 38);

  strokeWeight(max(1, corner * 0.075));

  let edge = min(trayW, trayH) * 0.019;

  rect(
    trayX + edge,
    trayY + edge,
    trayW - edge * 2,
    trayH - edge * 2,
    corner * 0.8
  );
}

// --------------------------------
// HOURS: SHADOWS ON PAPER
// --------------------------------

function drawPaperAndShadows(t, p, layout) {
  let { paperX, paperY, paperW, paperH } = layout;

  let currentHour12 = t.h % 12 || 12;

  let shadowStrength = timeMood(t.hFloat) === "sunset" ? 0.6 : 0.49;

  let corner = paperW * 0.014;

  push();

  // Rotate around paper center

  translate(paperX + paperW / 2, paperY + paperH / 2);

  rotate(-0.075);

  translate(-paperW / 2, -paperH / 2);

  // Paper shadow

  drawSoftShadow(
    0,
    0,
    paperW,
    paperH,
    corner,
    paperH * 0.019,
    paperW * 0.035,
    96
  );

  // Paper

  noStroke();
  fill(p.paper);

  rect(0, 0, paperW, paperH, corner);

  // Light reflection

  fill(
    red(p.light),
    green(p.light),
    blue(p.light),
    timeMood(t.hFloat) === "sunset" ? 38 : 21
  );

  rect(0, 0, paperW, paperH, corner);

  // Clip window shadows to paper

  push();

  beginClip();

  rect(0, 0, paperW, paperH, corner);

  endClip();

  noStroke();

  // 12 bands = 12 hours

  for (let i = 0; i < 12; i++) {
    let centerY = paperH * (0.18 + i * 0.06);

    let shadowOpacity = i < currentHour12 ? shadowStrength : 0.065;

    let strips = 24;

    // Soft shadow edges

    for (let j = 0; j < strips; j++) {
      let edgeFade = min(j / 6, (strips - 1 - j) / 6, 1);

      let opacityValue = 255 * shadowOpacity * max(0, edgeFade);

      fill(red(p.shadow), green(p.shadow), blue(p.shadow), opacityValue);

      rect(
        paperW * 0.07,

        centerY - paperH * 0.017 + (j * paperH * 0.034) / strips,

        paperW * 0.86,

        (paperH * 0.034) / strips + 0.5
      );
    }
  }

  pop();

  // Paper text

  noStroke();

  fill(96, 72, 59, 172);

  textAlign(CENTER, TOP);

  textSize(paperW * 0.052);

  text("Seasons of Love", paperW * 0.5, paperH * 0.064);

  textSize(paperW * 0.018);

  text(
    "'In daylights, in sunsets, in midnights, in cups of coffee.'",
    paperW * 0.5,
    paperH * 0.919
  );

  pop();
}

// --------------------------------
// COFFEE CUP
// --------------------------------

function drawCoffeeCup(t, p, layout) {
  let { cupX, cupY, cupR } = layout;

  let coffeeR = cupR * 0.88;

  // Cup shadow

  noStroke();
  fill(12, 8, 11, 42);

  ellipse(cupX + cupR * 0.075, cupY + cupR * 0.095, cupR * 2.4, cupR * 2.29);

  // Handle

  push();

  translate(cupX + cupR * 0.96, cupY + cupR * 0.34);

  rotate(-0.35);

  noFill();

  stroke(189, 106, 58);
  strokeWeight(cupR * 0.142);

  ellipse(0, 0, cupR * 0.47, cupR * 0.53);

  stroke(245, 179, 113, 110);
  strokeWeight(cupR * 0.022);

  ellipse(0, 0, cupR * 0.48, cupR * 0.54);

  pop();

  // Saucer

  noStroke();

  fill(224, 210, 196);

  circle(cupX, cupY, cupR * 2.26);

  fill(158, 128, 107, 65);

  circle(cupX, cupY, cupR * 2.08);

  // Ceramic cup

  fill(p.cup);

  circle(cupX, cupY, cupR * 2.02);

  fill(145, 99, 69, 100);

  circle(cupX, cupY, cupR * 1.85);

  // Clip coffee into circle

  push();

  beginClip();

  circle(cupX, cupY, coffeeR * 2);

  endClip();

  drawCoffeeGradient(cupX, cupY, coffeeR);

  drawCoffeeTexture(cupX, cupY, coffeeR);

  drawRosetta(cupX, cupY, coffeeR, t);

  drawSecondBubbles(cupX, cupY, coffeeR, t);

  pop();

  // Cup highlights

  noFill();

  stroke(255, 242, 223, 210);
  strokeWeight(cupR * 0.026);

  circle(cupX, cupY, cupR * 1.98);

  stroke(245, 198, 143, 110);
  strokeWeight(cupR * 0.01);

  circle(cupX, cupY, coffeeR * 2);
}

// --------------------------------
// COFFEE GRADIENT
// --------------------------------

function drawCoffeeGradient(cupX, cupY, coffeeR) {
  let dark = color("#59372a");
  let brown = color("#875036");
  let caramel = color("#b77a49");
  let cream = color("#d3a36c");

  noStroke();

  for (let i = 110; i >= 0; i--) {
    let amount = i / 110;
    let shade;

    if (amount < 0.66) {
      shade = lerpColor(dark, brown, amount / 0.66);
    } else if (amount < 0.86) {
      shade = lerpColor(brown, caramel, (amount - 0.66) / 0.2);
    } else {
      shade = lerpColor(caramel, cream, (amount - 0.86) / 0.14);
    }

    fill(shade);

    circle(
      cupX - coffeeR * 0.2 * (1 - amount),
      cupY - coffeeR * 0.19 * (1 - amount),
      coffeeR * 2 * amount + 1
    );
  }
}

// --------------------------------
// COFFEE TEXTURE
// --------------------------------

function drawCoffeeTexture(cupX, cupY, coffeeR) {
  noStroke();

  for (let i = 0; i < 360; i++) {
    let theta = stableNoise(i * 2.7) * TWO_PI;

    let distanceFromCenter = coffeeR * (0.8 + stableNoise(i * 8.1) * 0.19);

    fill(65, 35, 26, 18 + stableNoise(i * 6.1) * 65);

    circle(
      cupX + cos(theta) * distanceFromCenter,
      cupY + sin(theta) * distanceFromCenter,

      coffeeR * (0.005 + stableNoise(i * 3.3) * 0.015)
    );
  }
}

// --------------------------------
// MINUTES: LATTE ART
// --------------------------------

// 30 pairs = 60 leaves

function drawRosetta(cupX, cupY, coffeeR, t) {
  let leafScale = coffeeR / (166 * 0.88);

  push();

  translate(cupX, cupY + 4 * leafScale);

  rotate(0.38);

  for (let i = 0; i < 30; i++) {
    let leafY = (100 - i * 7) * leafScale;

    let leafW = (16 + 40 * sin(((i + 1) / 31) * PI)) * leafScale;

    for (let side of [-1, 1]) {
      let leafIndex = i * 2 + (side === -1 ? 0 : 1);

      let opacityValue = leafIndex < t.m ? 245 : 10;

      // Current leaf gradually appears

      if (leafIndex === t.m) {
        opacityValue = lerp(10, 245, t.s / 60);
      }

      drawOneLeaf(leafY, leafW, side, opacityValue, leafScale);
    }
  }

  pop();
}

// --------------------------------
// INDIVIDUAL LATTE ART LEAF
// --------------------------------

// p5.js 2.x Bezier curve syntax

function drawOneLeaf(leafY, leafW, side, opacityValue, leafScale) {
  noStroke();

  fill(255, 242, 219, opacityValue);

  beginShape();

  // Starting point

  bezierVertex(side * 2 * leafScale, leafY + 3 * leafScale);

  // First curve

  bezierVertex(side * leafW * 0.19, leafY - 2 * leafScale);

  bezierVertex(side * leafW * 0.7, leafY - 14 * leafScale);

  bezierVertex(side * leafW, leafY - 15 * leafScale);

  // Second curve

  bezierVertex(side * leafW * 0.91, leafY - 2 * leafScale);

  bezierVertex(side * leafW * 0.42, leafY + 8 * leafScale);

  bezierVertex(side * 2 * leafScale, leafY + 3 * leafScale);

  endShape(CLOSE);
}

// --------------------------------
// SECONDS: COFFEE BUBBLES
// --------------------------------

// 60 bubbles around the coffee

function drawSecondBubbles(cupX, cupY, coffeeR, t) {
  let completedSeconds = floor(t.s);

  let secondProgress = t.s - completedSeconds;

  noStroke();

  for (let i = 0; i < 60; i++) {
    let theta = -HALF_PI + (i * TWO_PI) / 60;

    let bubbleRadius = coffeeR * (0.905 + (stableNoise(i * 5.4) - 0.5) * 0.015);

    let isComplete = i < completedSeconds;

    let opacityValue = isComplete ? 190 : 28;

    let bubbleDiameter = coffeeR * (isComplete ? 0.034 : 0.018);

    // Current second

    if (i === completedSeconds) {
      opacityValue = 255;

      bubbleDiameter = coffeeR * (0.039 + 0.009 * sin(secondProgress * PI));
    }

    fill(255, 238, 201, opacityValue);

    circle(
      cupX + cos(theta) * bubbleRadius,
      cupY + sin(theta) * bubbleRadius,
      bubbleDiameter
    );
  }
}

// --------------------------------
// OPTIONAL TIME LABELS
// --------------------------------

function drawLabels(t, p) {
  let currentHour12 = t.h % 12 || 12;

  let ampm = t.h < 12 ? "AM" : "PM";

  let fontPx = min(width, height) * 0.019;

  fill(p.ink);
  noStroke();

  textAlign(LEFT, TOP);
  textSize(fontPx);

  text("MEASURED IN ORDINARY THINGS", width * 0.025, height * 0.025);

  textSize(fontPx * 0.6);

  text(
    "HOURS / SHADOWS   MINUTES / ROSETTA   SECONDS / CREMA",
    width * 0.025,
    height * 0.058
  );

  text(
    "T: DAY   M: MINUTE   D: LABELS   S: SAVE",
    width * 0.025,
    height * 0.962
  );

  textAlign(RIGHT, TOP);
  textSize(fontPx);

  text(
    nf(currentHour12, 2) +
      ":" +
      nf(t.m, 2) +
      ":" +
      nf(floor(t.s), 2) +
      " " +
      ampm,

    width * 0.975,
    height * 0.025
  );

  if (clockMode !== "real") {
    textSize(fontPx * 0.6);

    text(
      clockMode === "day" ? "DAY PREVIEW" : "MINUTE PREVIEW",

      width * 0.975,
      height * 0.058
    );
  }
}

// --------------------------------
// KEYBOARD
// --------------------------------

function keyPressed() {
  // T = Preview one day

  if (key === "t" || key === "T") {
    clockMode = clockMode === "day" ? "real" : "day";

    previewStartMs = millis();
  }

  // M = Preview one hour

  if (key === "m" || key === "M") {
    clockMode = clockMode === "minute" ? "real" : "minute";

    previewStartMs = millis();
  }

  // D = Toggle time labels

  if (key === "d" || key === "D") {
    showLabels = !showLabels;
  }

  // S = Save PNG

  if (key === "s" || key === "S") {
    saveCanvas("ordinary-things-clock", "png");
  }
}

// --------------------------------
// RESIZE
// --------------------------------

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
