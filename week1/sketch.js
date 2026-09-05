// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
// computer go home
const quotes = [
  {
    text: "A new interdisciplinary art form that bridges the gap between technologists and artists.",
    source: "Ahmad Moussa — Creative Coding: The New Era, Gorilla Sun, 2023.",
  },
  {
    text: "Sketching with code.",
    source:
      "Casey Reas & Ben Fry — A Modern Prometheus: The History of Processing, Processing Foundation, 2018.",
  },
  {
    text: "Writing code without necessarily knowing where it is going.",
    source:
      "Daniel Shiffman — Daniel Shiffman on The Nature of Code, interview by Tim Rodenbröker.",
  },
  {
    text: "Creative coding is the practice of combining programming techniques with artistic expression.",
    source: "SMU Meadows School of the Arts — What is Creative Coding?, 2024.",
  },
  {
    text: "Creative coding uses software, code and computational processes to be expressive or to create art forms.",
    source: "University of the Arts London — How to Start Creative Coding.",
  },
  {
    text: "Creative coding is the practice of making art with code.",
    source:
      "Andrew Bryant — How to Make Art with Creative Coding, Artsy Shark, 2021.",
  },
  {
    text: "For me Creative Coding is a method of exploring code through the lens of a designer.",
    source: "Nahuel Gerth — Getting Started with Creative Coding.",
  },
  {
    text: "Creative Coding is a way of learning how to program by creating visual art with computer graphics.",
    source: "Masood Kamandy — Creative Coding with Swift.",
  },
  {
    text: "A discovery-based process consisting of exploration, iteration, and reflection.",
    source:
      "Mark C. Mitchell & Oliver Bown — Towards a Creativity Support Tool in Processing: Understanding the Needs of Creative Coders, OzCHI 2013.",
  },
  {
    text: "Creative Coding is an approach to programming computers.",
    source:
      "The College of New Jersey, Design and Creative Technology — Creative Coding.",
  },
  {
    text: "Creative coding uses programming languages to generate art and music.",
    source:
      "University of York — Creative Coding, Fundamentals of Creative Technologies and Interactive Experiences.",
  },
  {
    text: "Creative coding is defined by a more playful, interdisciplinary mindset.",
    source:
      "David Young — Theorising while() Practising: A Review of Aesthetic Programming, Computational Culture, 2021.",
  },
  {
    text: "The field of ‘creative coding’ emphasizes the goal of expression, rather than function.",
    source:
      "Daria Tsoupikova — Creative Coding, University of Illinois Chicago.",
  },
  {
    text: "Creative Coding is an exciting practice of art and design work that uses software.",
    source: "Anthony Stagliano — Creative Coding, John Cabot University, 2024.",
  },
  {
    text: "‘Creative coding’ is a computing pedagogy.",
    source:
      "Kazjon Grace, Brittany Klaassens, Liam Bray & Alex Elton-Pym — An Open-Ended Blended Approach to Teaching Interaction Designers to Code, Frontiers in Computer Science, 2022.",
  },
  {
    text: "Creative coding uses code in the contexts of art, play, creativity, and self-expression.",
    source: "The Guidebook — What is Creative Coding?",
  },
  {
    text: "Programming with aesthetic intent.",
    source: "Cinder — About.",
  },
];
// no need to edit anything below this line!
// if you have made an error, you can check your history to see what might have gone wrong

//colors elements
const colorPairs = [
  { bg: "#FC4EA0", text: "#FAFC4E" }, // vivid red-pink
  { bg: "#FAFC4E", text: "#FC4EA0" }, // bright yellow
  { bg: "#fa0a0a", text: "#29ff34" }, // red
  { bg: "#29ff34", text: "#fa0a0a" }, // green
  { bg: "#7C4DFF", text: "#29f8ff" }, // purple
  { bg: "#29f8ff", text: "#7C4DFF" }, // sky blue
  { bg: "#f58426", text: "#006bb6" }, // orange
  { bg: "#006bb6", text: "#f58426" }, // blue
];

// a variable that holds the current quote
let current = [];
let shuffledColors = [];
let currentColor;
let colorIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  //fill(10, 255, 10);
  // calls the function to pick a quote
  shuffledColors = shuffle([...colorPairs]);
  pickQuote();
  pickColor();
}

function pickColor() {
  if (colorIndex >= shuffledColors.length) {
    shuffledColors = shuffle([...colorPairs]);
    colorIndex = 0;
  }

  currentColor = shuffledColors[colorIndex];
  colorIndex++;
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(currentColor.bg); // set the background color
  fill(currentColor.text);
  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, (height / 2) * 0.25);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2 - 300, height / 2 - 100, 600, 200);
  textAlign(RIGHT, CENTER);
  // Source
  let sourceWidth = width * 0.55;

  text(
    "- " + current.source,
    width - sourceWidth - 50,
    height - 160,
    sourceWidth,
    120
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  pickColor();
  redraw();
}

function mousePressed() {
  newQuote();
}
