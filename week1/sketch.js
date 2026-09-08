// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
// computer go home
const quotes = [
  {
    text: "A new interdisciplinary art form that bridges the gap between technologists and artists.",
    source: "Ahmad Moussa",
  },
  {
    text: "Sketching with code.",
    source: "Casey Reas & Ben Fry",
  },
  {
    text: "Writing code without necessarily knowing where it is going.",
    source: "Daniel Shiffman",
  },
  {
    text: "Creative coding is the practice of combining programming techniques with artistic expression",
    source: "SMU Meadows School of the Arts",
  },
  {
    text: "Creative coding uses software, code and computational processes to be expressive or to create art forms.",
    source: "University of the Arts London",
  },
  {
    text: "Creative coding is the practice of making art with code.",
    source: "Andrew Bryant",
  },
  {
    text: "For me Creative Coding is a method of exploring code through the lens of a designer.",
    source: "Nahuel Gerth",
  },
  {
    text: "Creative Coding is a way of learning how to program by creating visual art with computer graphics.",
    source: "Masood Kamandy",
  },
  {
    text: "Creative coding uses programming languages to generate art and music",
    source: "University of York",
  },
  {
    text: "Where the artist-programmer is primarily invested in speculation, experimentation, and iterative practice.",
    source: "David Young",
  },
];
// no need to edit anything below this line!
// if you have made an error, you can check your history to see what might have gone wrong

//colors elements
const colorPairs = [
  { bg: "#FFFFFF", text: "#F68320" }, // white
  { bg: "#fff000", text: "#0056b8" }, // bright yellow
  { bg: "#BC0E23", text: "#283D37" }, // red
  { bg: "#283D37", text: "#BC0E23" }, // green
  { bg: "#B1906A", text: "#000000" }, // purple
  { bg: "#000000", text: "#B1906A" }, // sky blue
  { bg: "#F68320", text: "#FFFFFF" }, // orange
  { bg: "#006bb6", text: "#f58426" }, // blue
];

// a variable that holds the current quote
let current = [];
let shuffledColors = [];
let currentColor;
let colorIndex = 0;
//for move in animation
let anim = 1;
let isExiting = false;
let isEntering = false;

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
  //prevent the color from repeating, if the colorIndex is greater than or equal to the length of the shuffledColors array, shuffle the colors again and reset the index to 0
  if (colorIndex >= shuffledColors.length) {
    shuffledColors = shuffle([...colorPairs]);
    colorIndex = 0;
  }

  currentColor = shuffledColors[colorIndex]; // pick the current color from the shuffled array
  colorIndex++;
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(currentColor.bg); // set the background color
  fill(currentColor.text);

  // move out
  if (isExiting) {
    anim -= 0.06; // decrease the animation value to move out

    //update the quote and color when the animation is done moving out
    if (anim <= 0) {
      anim = 0; //stop at 0 when it's negative

      pickQuote();
      pickColor();

      //break the loop check
      isExiting = false;
      isEntering = true;
    }
  }

  // move in
  if (isEntering) {
    anim += 0.06; // increase the animation value to move in

    if (anim >= 1) {
      anim = 1; //stop at 1 when it's over 1
      isEntering = false; //break the loop check
    }
  }

  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  let quoteWidth = width * 0.7;
  let sourceWidth = width * 0.55;

  let eased = easeOut(anim); // eased = 1 - (1-anim)^3

  //move in and out animation
  // entering: right -> center
  // exiting: center -> left
  //lerp(start, end, amount)
  //when anim=1, xoffset=0, when anim=0, xOffset=-width for exiting and xOffset=width for entering
  let xOffset;

  if (isExiting) {
    xOffset = lerp(-width, 0, eased);
  } else {
    xOffset = lerp(width, 0, eased);
  }

  // Title
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(32);

  text("Creative Coding is.....", width / 2, height / 2 - 180);

  // Quote
  textStyle(BOLD);
  textLeading(42);

  text(
    "'" + current.text + "'",
    width / 2 - quoteWidth / 2 + xOffset, // + xOffset for animation
    height / 2 - 100,
    quoteWidth,
    220
  );

  // Source
  textStyle(BOLD);
  textSize(20);
  textLeading(28);
  textAlign(RIGHT, TOP);

  text(
    "- " + current.source,
    width - sourceWidth - 80 + xOffset, // + xOffset for animation
    height - 160,
    sourceWidth,
    120
  );
}

function easeOut(x) {
  return 1 - pow(1 - x, 3); //if x = anim, so it will be y = 1 - (1-anim)^3, which is a cubic easing function that starts fast and slows down towards the end
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function newQuote() {
//   pickQuote();
//   pickColor();
//   redraw();
// }

function mousePressed() {
  //after click, check the animation collision, iif old quote is not exiting and new quote is not entering, means there's no animation, so should start the animation and let old quote exit.
  if (!isExiting && !isEntering) {
    isExiting = true;
  }
}
