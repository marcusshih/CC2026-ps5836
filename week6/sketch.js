const palettes = [
  {
    h: 0,
    bg: "#11172b",
    table: "#644050",
    tray: "#252b3b",
    paper: "#e6d7c7",
    cup: "#e9dbcf",
    light: "#f2b57f",
    shadow: "#43373e",
    ink: "#f4dfce",
  },
  {
    h: 5.5,
    bg: "#395e72",
    table: "#e4b9a2",
    tray: "#55515b",
    paper: "#f0e1cf",
    cup: "#f4e7d8",
    light: "#ffd8a0",
    shadow: "#7e6658",
    ink: "#7b6558",
  },
  {
    h: 8.5,
    bg: "#86c4d2",
    table: "#f8dcae",
    tray: "#777876",
    paper: "#fff0dd",
    cup: "#fbefdf",
    light: "#fff0c0",
    shadow: "#9a826a",
    ink: "#7d6b5c",
  },
  {
    h: 12,
    bg: "#81b7d0",
    table: "#fae3b6",
    tray: "#807970",
    paper: "#fff2e1",
    cup: "#fcf1e1",
    light: "#fff3cf",
    shadow: "#a18a73",
    ink: "#7e6d5f",
  },
  {
    h: 16.5,
    bg: "#b96d72",
    table: "#f7cd8f",
    tray: "#775e5c",
    paper: "#f8e5cf",
    cup: "#f9e7d8",
    light: "#ffd08e",
    shadow: "#8f6854",
    ink: "#7a5d4d",
  },
  {
    h: 19,
    bg: "#473557",
    table: "#d78167",
    tray: "#4e4050",
    paper: "#efdcca",
    cup: "#f3e0d3",
    light: "#ffb56d",
    shadow: "#674741",
    ink: "#f0d3bf",
  },
  {
    h: 22,
    bg: "#18233b",
    table: "#8b5064",
    tray: "#2c2c40",
    paper: "#ead9c7",
    cup: "#efddd1",
    light: "#f1b379",
    shadow: "#4d3e43",
    ink: "#f4dcc8",
  },
  {
    h: 24,
    bg: "#11172b",
    table: "#644050",
    tray: "#252b3b",
    paper: "#e6d7c7",
    cup: "#e9dbcf",
    light: "#f2b57f",
    shadow: "#43373e",
    ink: "#f4dfce",
  },
];

// set up the canvas and basic drawing settings

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(min(displayDensity(), 2));
  frameRate(30);
  angleMode(RADIANS);
  textFont("monospace");
}

// redraw everything using the current time

function draw() {
  let timeData = clockTime();
  let palette = getPalette(timeData.hFloat);

  drawBackground(timeData, palette);
  drawPaperAndShadows(timeData, palette);
  drawCoffeeCup(timeData, palette);
}

// get the actual time from the computer

function clockTime() {
  let hours = hour();
  let minutes = minute();
  let seconds = second() + new Date().getMilliseconds() / 1000;

  return {
    h: hours,
    m: minutes,
    s: seconds,
    hFloat: hours + minutes / 60 + seconds / 3600,
  };
}

// blend between the colors for different times of day
function getPalette(currentHour) {
  for (let i = 0; i < palettes.length - 1; i++) {
    let current = palettes[i];
    let following = palettes[i + 1];

    if (currentHour >= current.h && currentHour <= following.h) {
      let blendAmount = (currentHour - current.h) / (following.h - current.h);

      return {
        bg: lerpColor(color(current.bg), color(following.bg), blendAmount),

        table: lerpColor(
          color(current.table),
          color(following.table),
          blendAmount
        ),

        tray: lerpColor(
          color(current.tray),
          color(following.tray),
          blendAmount
        ),

        paper: lerpColor(
          color(current.paper),
          color(following.paper),
          blendAmount
        ),

        cup: lerpColor(color(current.cup), color(following.cup), blendAmount),

        light: lerpColor(
          color(current.light),
          color(following.light),
          blendAmount
        ),

        shadow: lerpColor(
          color(current.shadow),
          color(following.shadow),
          blendAmount
        ),

        ink: lerpColor(color(current.ink), color(following.ink), blendAmount),
      };
    }
  }

  return getPalette(12);
}

// use different lighting depending on the time of day
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

// use the same random-looking values so the texture stays in place

function stableNoise(seedNumber) {
  return noise(seedNumber, frameCount * 0.0003);
}

// draw a diagonal gradient using many thin rectangles

function drawDiagonalGradient(x, y, areaW, areaH, startColor, endColor) {
  let steps = 280;

  let gradientAngle = atan2(areaH, areaW);
  let diagonalLength = sqrt(areaW * areaW + areaH * areaH);
  let gradientTop = -areaW * sin(gradientAngle) - 2;

  let gradientHeight =
    areaW * sin(gradientAngle) + areaH * cos(gradientAngle) + 4;

  push();
  translate(x, y);
  rotate(gradientAngle);
  noStroke();

  for (let i = 0; i < steps; i++) {
    let blendAmount = i / (steps - 1);

    fill(lerpColor(startColor, endColor, blendAmount));

    rect(
      (i * diagonalLength) / steps,
      gradientTop,
      diagonalLength / steps + 2,
      gradientHeight
    );
  }

  pop();
}

// add a warm glow to the tray during nighttime

function drawLampGlow(centerX, centerY, glowRadius) {
  noStroke();

  for (let i = 45; i >= 1; i--) {
    let amount = i / 45;

    fill(255, 194, 135, lerp(3.7, 0.45, amount));

    circle(centerX, centerY, glowRadius * 2 * amount);
  }
}

// draw several transparent layers to make a softer shadow

function drawSoftShadow(x, y, boxW, boxH, corner, offsetY, spread, strength) {
  noStroke();

  let layers = 14;

  for (let i = layers; i >= 1; i--) {
    let extra = (i / layers) * spread;

    fill(27, 17, 19, strength / layers);

    rect(
      x - extra,
      y + offsetY - extra,
      boxW + extra * 2,
      boxH + extra * 2,
      corner + extra
    );
  }
}

// draw the background and the tray with changing colors
function drawBackground(timeData, palette) {
  let mood = timeMood(timeData.hFloat);

  // make the background gradient fill the whole screen
  drawDiagonalGradient(0, 0, width, height, palette.bg, palette.table);

  noStroke();

  // add a slightly different color overlay for each time of day
  if (mood === "morning") {
    fill(255, 242, 207, 14);
    rect(0, 0, width, height);
  } else if (mood === "day") {
    fill(255, 250, 229, 12);
    rect(0, 0, width, height);
  } else if (mood === "sunset") {
    fill(255, 150, 85, 24);
    rect(0, 0, width, height);
  } else {
    fill(13, 18, 36, 22);
    rect(0, 0, width, height);
  }

  // put a soft shadow behind the tray
  drawSoftShadow(90, 57, 1332, 713, 28, 15, 18, 115);

  // mix the tray color with the background colors
  let trayStart = lerpColor(palette.tray, palette.table, 0.56);
  let trayEnd = lerpColor(palette.tray, palette.bg, 0.36);

  // clip the gradient so it stays inside the rounded tray
  push();
  beginClip();

  noStroke();
  rect(90, 57, 1332, 713, 28);

  endClip();

  drawDiagonalGradient(90, 57, 1332, 713, trayStart, trayEnd);

  // add warm light at night and a softer orange tint at sunset
  if (mood === "midnight") {
    drawLampGlow(1010, 355, 490);
  } else if (mood === "sunset") {
    noStroke();
    fill(255, 174, 110, 13);
    rect(90, 57, 1332, 713);
  }

  pop();

  // add a thin highlight around the edge of the tray
  noFill();
  stroke(244, 217, 177, 38);
  strokeWeight(2);
  rect(103, 70, 1306, 687, 22);
}

// use the shadows on the paper to represent the hours

function drawPaperAndShadows(timeData, palette) {
  let h12 = timeData.h % 12 || 12;
  let mood = timeMood(timeData.hFloat);
  let shadowStrength = mood === "sunset" ? 0.6 : 0.49;

  push();
  translate(235, 143);
  rotate(-0.075);

  drawSoftShadow(0, 0, 400, 550, 6, 11, 14, 90);

  noStroke();
  fill(palette.paper);
  rect(0, 0, 400, 550, 6);

  fill(
    red(palette.light),
    green(palette.light),
    blue(palette.light),
    mood === "sunset" ? 38 : 20
  );

  rect(0, 0, 400, 550, 6);

  push();
  beginClip();
  rect(0, 0, 400, 550, 6);
  endClip();

  noStroke();

  for (let i = 0; i < 12; i++) {
    let shadowY = 91 + i * 34;
    let shadowOpacity = i < h12 ? shadowStrength : 0.065;
    for (let j = 0; j < 28; j++) {
      let fade = max(0, Math.min(j / 7, (27 - j) / 7, 1));
      let opacityValue = shadowOpacity * 255 * fade;

      fill(
        red(palette.shadow),
        green(palette.shadow),
        blue(palette.shadow),
        opacityValue
      );

      rect(28, shadowY - 14 + j, 344, 1.15);
    }
  }

  pop();

  noStroke();
  fill(96, 72, 59, 172);
  textAlign(CENTER, TOP);
  textSize(22);
  text("Seasons of Love", 200, 35);

  textSize(10);
  text(
    "'In daylights, in sunsets, in midnights, in cups of coffee.'",
    200,
    511
  );

  pop();
}

// draw the coffee cup and everything inside it

function drawCoffeeCup(timeData, palette) {
  let cupX = 1020;
  let cupY = 410;
  let coffeeRadius = 207;

  // draw the shadow under the cup and saucer
  noStroke();
  fill(12, 8, 11, 43);
  ellipse(cupX + 17, cupY + 22, 564, 538);

  // draw the handle slightly behind the cup
  push();
  translate(1246, 490);
  rotate(-0.35);

  noFill();
  stroke(189, 106, 58);
  strokeWeight(34);
  ellipse(0, 0, 111, 126);

  stroke(245, 179, 113, 110);
  strokeWeight(5);
  ellipse(0, 0, 115, 130);

  pop();

  // use two circles to create the saucer
  noStroke();

  fill(224, 210, 196);
  circle(cupX, cupY, 531);

  fill(158, 128, 107, 65);
  circle(cupX, cupY, 489);

  // draw the ceramic cup and its darker inner edge
  fill(palette.cup);
  circle(cupX, cupY, 475);

  fill(145, 99, 69, 100);
  circle(cupX, cupY, 435);

  // clip the coffee and latte art to the inside of the cup
  push();
  beginClip();

  noStroke();
  circle(cupX, cupY, coffeeRadius * 2);

  endClip();

  drawCoffeeGradient(cupX, cupY, coffeeRadius);
  drawCoffeeTexture(cupX, cupY, coffeeRadius);
  drawRosetta(cupX, cupY, timeData);
  drawSecondBubbles(cupX, cupY, coffeeRadius, timeData);

  pop();

  // add highlights around the cup rim
  noFill();

  stroke(255, 242, 223, 210);
  strokeWeight(6);
  circle(cupX, cupY, 465);

  stroke(245, 198, 143, 110);
  strokeWeight(2.5);
  circle(cupX, cupY, coffeeRadius * 2);
}

// make the coffee surface using several blended brown colors

function drawCoffeeGradient(cupX, cupY, coffeeRadius) {
  let dark = color("#59372a");
  let brown = color("#875036");
  let caramel = color("#b77a49");
  let cream = color("#d3a36c");

  noStroke();

  // draw circles from large to small to build the coffee gradient
  for (let i = 135; i >= 0; i--) {
    let amount = i / 135;
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
      cupX - 43 * (1 - amount),
      cupY - 39 * (1 - amount),
      2 * coffeeRadius * amount + 1
    );
  }
}

// add small spots to make the coffee surface less flat

function drawCoffeeTexture(cupX, cupY, coffeeRadius) {
  noStroke();

  // keep the spots in the same positions instead of changing every frame
  for (let i = 0; i < 360; i++) {
    let angleValue = stableNoise(i * 2.7) * TWO_PI;
    let coffeeDistance = coffeeRadius * (0.8 + stableNoise(i * 8.1) * 0.19);

    fill(65, 35, 26, 18 + stableNoise(i * 6.1) * 65);

    circle(
      cupX + cos(angleValue) * coffeeDistance,
      cupY + sin(angleValue) * coffeeDistance,
      1 + stableNoise(i * 3.3) * 3.2
    );
  }
}

// use the rosetta latte art to show the current minute

function drawRosetta(cupX, cupY, timeData) {
  push();

  translate(cupX, cupY + 6);
  rotate(0.38);

  // draw 30 pairs of leaves to represent all 60 minutes
  for (let i = 0; i < 30; i++) {
    let leafY = 142 - i * 10;
    let leafW = 23 + 57 * sin(((i + 1) / 31) * PI);

    for (let side of [-1, 1]) {
      let leafIndex = i * 2 + (side === -1 ? 0 : 1);
      let opacityValue = leafIndex < timeData.m ? 245 : 10;

      // slowly reveal the current leaf as the seconds pass
      if (leafIndex === timeData.m) {
        opacityValue = lerp(10, 245, timeData.s / 60);
      }

      drawOneLeaf(leafY, leafW, side, opacityValue);
    }
  }

  pop();
}

// draw one side of a leaf using a custom shape

function drawOneLeaf(leafY, leafW, side, opacityValue) {
  noStroke();
  fill(255, 242, 219, opacityValue);

  beginShape();

  vertex(side * 3, leafY + 4);

  bezierVertex(side * leafW * 0.19, leafY - 3);
  bezierVertex(side * leafW * 0.7, leafY - 20);
  bezierVertex(side * leafW, leafY - 21);
  bezierVertex(side * leafW * 0.91, leafY - 3);
  bezierVertex(side * leafW * 0.42, leafY + 11);
  bezierVertex(side * 3, leafY + 4);

  endShape(CLOSE);
}

// use the small bubbles around the coffee to represent seconds

function drawSecondBubbles(cupX, cupY, coffeeRadius, timeData) {
  let wholeSeconds = floor(timeData.s);
  let secondProgress = timeData.s - wholeSeconds;

  noStroke();

  // place 60 bubbles around the edge of the coffee
  for (let i = 0; i < 60; i++) {
    let angleValue = -HALF_PI + (i * TWO_PI) / 60;

    let bubbleDistance =
      coffeeRadius * (0.905 + (stableNoise(i * 5.4) - 0.5) * 0.015);

    let isComplete = i < wholeSeconds;
    let opacityValue = isComplete ? 190 : 28;
    let bubbleDiameter = isComplete ? 7.3 : 3.9;

    // make the current second bubble slightly bigger and brighter
    if (i === wholeSeconds) {
      opacityValue = 255;
      bubbleDiameter = 8.4 + 2 * sin(secondProgress * PI);
    }

    fill(255, 238, 201, opacityValue);

    circle(
      cupX + cos(angleValue) * bubbleDistance,
      cupY + sin(angleValue) * bubbleDistance,
      bubbleDiameter
    );
  }
}
