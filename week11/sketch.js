let aps = [];
let boroughs = [];
let ripples = [];

let loading = true;
let playing = false;
let soundOn = true;

let firstDate;
let lastDate;
let currentDate;
let currentYear = 2010;
let currentIndex = 0;

let elapsedTime = 0;
let animationDuration = 90000;

let playButton;
let resetButton;
let soundButton;
let yearSlider;

let synth;
let lastSoundTime = 0;

let mapLayer;

let minLon = -74.28;
let maxLon = -73.68;
let minLat = 40.48;
let maxLat = 40.94;

let mapLeft;
let mapTop;
let mapWidth;
let mapHeight;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(5);
  textFont("Arial");

  // sound
  synth = new Tone.Synth({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.08,
      sustain: 0,
      release: 0.05,
    },
    volume: -12,
  }).toDestination();

  // buttons
  playButton = createButton("Play");
  resetButton = createButton("Reset");
  soundButton = createButton("Sound ON");

  playButton.mousePressed(togglePlay);
  resetButton.mousePressed(resetAnimation);
  soundButton.mousePressed(toggleSound);

  // bar
  yearSlider = createSlider(0, 1000, 0, 1);
  yearSlider.style("accent-color", "#FEBE02");
  yearSlider.attribute("aria-label", "Installation timeline");
  yearSlider.input(changeTimeline);

  positionControls();

  // APS API
  // I found that removing the limit caused the visualization to not work as expected.
  // The NYC Open Data API returns only 1000 records by default.
  // I set the limit to 10000 to retrieve the current dataset.

  let apsURL =
    "https://data.cityofnewyork.us/resource/de3m-c5p4.json?$limit=10000";

  let data = await loadJSON(apsURL);

  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    if (item.date_insta === undefined) {
      continue;
    }

    let lon = Number(item.point_x);
    let lat = Number(item.point_y);
    let installDate = new Date(item.date_insta);
    let installTime = installDate.getTime();

    if (isNaN(lon) || isNaN(lat) || isNaN(installTime)) {
      continue;
    }

    if (lon < minLon || lon > maxLon || lat < minLat || lat > maxLat) {
      continue;
    }

    aps.push({
      lon: lon,
      lat: lat,
      time: installTime,
      year: installDate.getFullYear(),
      borough: item.boroname || "Unknown",
    });
  }

  // Sort by date
  aps.sort(function (a, b) {
    return a.time - b.time;
  });

  if (aps.length > 0) {
    firstDate = aps[0].time;
    lastDate = aps[aps.length - 1].time;
    currentDate = firstDate;
    currentYear = aps[0].year;
  }

  console.log("APS locations:", aps.length);

  // nyc map
  let mapURL =
    "https://data.cityofnewyork.us/resource/gthc-hcne.json?$limit=10";

  let mapData = await loadJSON(mapURL);

  for (let i = 0; i < mapData.length; i++) {
    if (mapData[i].the_geom !== undefined) {
      boroughs.push(mapData[i].the_geom);
    }
  }

  //console.log("Borough shapes:", boroughs.length);

  calculateMapSize();
  createMapLayer();

  loading = false;
}

function draw() {
  background(0);

  if (loading) {
    noStroke();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Loading NYC data...", 40, 40);
    return;
  }

  if (playing) {
    updateAnimation();
  }

  image(mapLayer, 0, 0);

  drawAPS();
  drawRipples();
  drawInformation();
  drawTimeline();
}

function positionControls() {
  playButton.position(40, height - 90);
  resetButton.position(100, height - 90);
  soundButton.position(160, height - 90);

  yearSlider.position(40, height - 48);
  yearSlider.size(width - 80, 16);
}

//map resize
function calculateMapSize() {
  let availableWidth = width - 80;
  let availableHeight = height - 240;

  let geographicWidth = maxLon - minLon;
  let geographicHeight = maxLat - minLat;

  let scaleX = availableWidth / geographicWidth;
  let scaleY = availableHeight / geographicHeight;

  let mapScale = Math.min(scaleX, scaleY);

  mapWidth = geographicWidth * mapScale;
  mapHeight = geographicHeight * mapScale;

  mapLeft = (width - mapWidth) / 2;
  mapTop = 120 + (availableHeight - mapHeight) / 2;
}

function mapX(lon) {
  return map(lon, minLon, maxLon, mapLeft, mapLeft + mapWidth);
}

function mapY(lat) {
  return map(lat, minLat, maxLat, mapTop + mapHeight, mapTop);
}

// draw map
function createMapLayer() {
  mapLayer = createGraphics(width, height);
  //mapLayer.pixelDensity(2);

  mapLayer.noFill();
  mapLayer.stroke(255);
  mapLayer.strokeWeight(0.8);

  for (let i = 0; i < boroughs.length; i++) {
    let geometry = boroughs[i];

    for (let j = 0; j < geometry.coordinates.length; j++) {
      let polygon = geometry.coordinates[j];

      for (let k = 0; k < polygon.length; k++) {
        let coordinates = polygon[k];

        mapLayer.beginShape();

        for (let m = 0; m < coordinates.length; m++) {
          let lon = coordinates[m][0];
          let lat = coordinates[m][1];

          mapLayer.vertex(mapX(lon), mapY(lat));
        }

        mapLayer.endShape(CLOSE);
      }
    }
  }
}

function updateAnimation() {
  elapsedTime += deltaTime;

  if (elapsedTime >= animationDuration) {
    elapsedTime = animationDuration;
    playing = false;
    playButton.html("Play");
  }

  let progress = elapsedTime / animationDuration;

  currentDate = lerp(firstDate, lastDate, progress);
  currentYear = new Date(currentDate).getFullYear();

  yearSlider.value(Math.floor(progress * 1000));

  let newPoints = 0;

  for (let i = currentIndex; i < aps.length; i++) {
    let item = aps[i];

    if (item.time > currentDate) {
      break;
    }

    if (newPoints < 30) {
      ripples.push({
        lon: item.lon,
        lat: item.lat,
        radius: 2,
        alpha: 120,
      });
    }

    if (ripples.length > 80) {
      ripples.shift();
    }

    if (soundOn && millis() - lastSoundTime > 110) {
      playGrowthSound(item);
      lastSoundTime = millis();
    }

    currentIndex++;
    newPoints++;
  }
}

function drawAPS() {
  noStroke();

  for (let i = 0; i < currentIndex; i++) {
    let item = aps[i];

    let x = mapX(item.lon);
    let y = mapY(item.lat);

    fill(254, 190, 2, 25);
    circle(x, y, 11);

    fill("#FEBE02");
    circle(x, y, 3.5);
  }
}

function drawRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];

    let x = mapX(ripple.lon);
    let y = mapY(ripple.lat);

    noFill();
    stroke(254, 190, 2, ripple.alpha);
    strokeWeight(1);

    circle(x, y, ripple.radius * 2);

    ripple.radius += 0.35;
    ripple.alpha -= 5;

    if (ripple.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function drawInformation() {
  noStroke();

  textAlign(RIGHT, TOP);

  fill(255);
  textSize(56);
  text(currentYear, width - 40, 30);

  fill(180);
  textSize(12);
  text("INSTALLATION YEAR", width - 40, 98);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(36);
  text(currentIndex, 40, 30);

  fill(180);
  textSize(12);
  text("TOTAL APS LOCATIONS", 40, 78);

  let newThisYear = 0;

  for (let i = 0; i < currentIndex; i++) {
    if (aps[i].year === currentYear) {
      newThisYear++;
    }
  }

  fill("#FEBE02");
  textSize(36);
  text("+" + newThisYear, 230, 30);

  fill(180);
  textSize(12);
  text("INSTALLED THIS YEAR", 230, 78);
}

function drawTimeline() {
  if (aps.length === 0) {
    return;
  }

  noStroke();
  fill(180);
  textSize(12);

  textAlign(LEFT, TOP);
  text(aps[0].year, 40, height - 28);

  textAlign(RIGHT, TOP);
  text(aps[aps.length - 1].year, width - 40, height - 28);
}

function changeTimeline() {
  if (loading || aps.length === 0) {
    return;
  }

  playing = false;
  playButton.html("Play");

  let progress = yearSlider.value() / 1000;

  elapsedTime = progress * animationDuration;
  currentDate = lerp(firstDate, lastDate, progress);
  currentYear = new Date(currentDate).getFullYear();

  currentIndex = 0;

  for (let i = 0; i < aps.length; i++) {
    if (aps[i].time <= currentDate) {
      currentIndex++;
    } else {
      break;
    }
  }

  ripples = [];
}

async function togglePlay() {
  if (loading || aps.length === 0) {
    return;
  }

  if (playing) {
    playing = false;
    playButton.html("Play");
  } else {
    if (elapsedTime >= animationDuration) {
      resetAnimation();
    }

    if (soundOn) {
      await Tone.start();
    }

    playing = true;
    playButton.html("Pause");
  }
}

function resetAnimation() {
  if (loading || aps.length === 0) {
    return;
  }

  playing = false;
  elapsedTime = 0;

  currentDate = firstDate;
  currentYear = aps[0].year;
  currentIndex = 0;

  yearSlider.value(0);
  ripples = [];

  playButton.html("Play");
}

async function toggleSound() {
  soundOn = !soundOn;

  if (soundOn) {
    await Tone.start();
    soundButton.html("Sound ON");
  } else {
    soundButton.html("Sound OFF");
  }
}

function playGrowthSound(item) {
  let frequency = 660;
  let boroughName = item.borough.toUpperCase();

  if (boroughName === "MANHATTAN") {
    frequency = 880;
  } else if (boroughName === "BROOKLYN") {
    frequency = 740;
  } else if (boroughName === "QUEENS") {
    frequency = 660;
  } else if (boroughName === "BRONX") {
    frequency = 550;
  } else if (boroughName === "STATEN ISLAND") {
    frequency = 440;
  }

  synth.triggerAttackRelease(frequency, 0.1);
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (!loading) {
    calculateMapSize();
    createMapLayer();
  }

  positionControls();
}
