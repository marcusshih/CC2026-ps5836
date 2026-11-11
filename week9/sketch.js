let video;
let faceMesh;
let handPose;

let faces = [];
let hands = [];

let showCamera = true;

let mouthWidthRatio = 0.7;
let mouthHeightRatio = 0.3;
let holdTime = 300;
let warningTime = 1000;

let nearStart = 0;
let warningUntil = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh = await ml5.faceMesh({ maxFaces: 1 });
  handPose = await ml5.handPose();

  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);
}

function draw() {
  let near = checkHandNearMouth();

  if (near) {
    if (nearStart === 0) {
      nearStart = millis();
    }

    if (millis() - nearStart > holdTime) {
      warningUntil = millis() + warningTime;
    }
  } else {
    nearStart = 0;
  }

  let warning = millis() < warningUntil;

  let bg = "#111111";
  let fg = "#E52828";

  if (warning && floor(millis() / 350) % 2 === 0) {
    bg = "#E52828";
    fg = "#111111";
  }

  background(bg);
  noStroke();
  fill(fg);

  textFont("Arial");
  textAlign(CENTER, CENTER);

  if (warning) {
    textStyle(BOLD);
    textSize(min(width * 0.28, height * 0.38));
    text("STOP.", width / 2, height / 2);

    textSize(30);
    text("HANDS AWAY FROM YOUR MOUTH.", width / 2, height / 1.3);
  } else {
    textStyle(BOLD);
    textSize(min(width * 0.075, 100));
    text("DON'T BITE NAILS.", width / 2, height / 2);
  }

  if (showCamera) {
    drawCamera(near);
  }
}

function getMouth() {
  let face = faces[0].keypoints;

  let x = (face[13].x + face[14].x) / 2;
  let y = (face[13].y + face[14].y) / 2;

  let mouthWidth = dist(face[61].x, face[61].y, face[291].x, face[291].y);

  return {
    x: x,
    y: y,
    rx: mouthWidth * mouthWidthRatio,
    ry: mouthWidth * mouthHeightRatio,
  };
}

function checkHandNearMouth() {
  if (faces.length === 0 || hands.length === 0) {
    return false;
  }

  let mouth = getMouth();

  for (let hand of hands) {
    for (let i of [4, 8, 12, 16, 20]) {
      let fingertip = hand.keypoints[i];

      let dx = (fingertip.x - mouth.x) / mouth.rx;
      let dy = (fingertip.y - mouth.y) / mouth.ry;

      if (dx * dx + dy * dy < 1) {
        return true;
      }
    }
  }

  return false;
}

function drawCamera(near) {
  let w = min(260, width * 0.35);
  let h = w * 0.75;
  let x = width - w - 25;
  let y = 25;
  let s = w / 640;

  push();
  translate(x + w, y);
  scale(-1, 1);

  image(video, 0, 0, w, h);

  // face tracking
  if (faces.length > 0) {
    let face = faces[0].keypoints;

    noStroke();
    fill(0, 255, 130, 160);

    // face keypoints
    for (let i = 0; i < face.length; i += 3) {
      circle(face[i].x * s, face[i].y * s, 2);
    }

    // mouth ellipse
    let mouth = getMouth();

    noFill();
    stroke(near ? "#FF3030" : "#00FF88");
    strokeWeight(2);

    ellipse(mouth.x * s, mouth.y * s, mouth.rx * 2 * s, mouth.ry * 2 * s);
  }

  // hand tracking
  for (let hand of hands) {
    let p = hand.keypoints;

    let fingers = [
      [0, 1, 2, 3, 4],
      [0, 5, 6, 7, 8],
      [0, 9, 10, 11, 12],
      [0, 13, 14, 15, 16],
      [0, 17, 18, 19, 20],
    ];

    // hand skleton
    stroke("#FFE44D");
    strokeWeight(1.5);

    for (let finger of fingers) {
      for (let i = 0; i < finger.length - 1; i++) {
        let a = p[finger[i]];
        let b = p[finger[i + 1]];

        line(a.x * s, a.y * s, b.x * s, b.y * s);
      }
    }

    // hand keypoints
    noStroke();
    fill("#FFE44D");

    for (let landmark of p) {
      circle(landmark.x * s, landmark.y * s, 4);
    }

    // fingertips
    fill(near ? "#FF3030" : "#FFFFFF");

    for (let i of [4, 8, 12, 16, 20]) {
      circle(p[i].x * s, p[i].y * s, 7);
    }
  }

  pop();
}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
}

function keyPressed() {
  if (key === "c" || key === "C") {
    showCamera = !showCamera;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
