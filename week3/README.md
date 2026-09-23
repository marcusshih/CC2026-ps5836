# Week 3 - Iteration Generation

I love listening to music while I work. By chance, Spotify started playing Coldplay’s album A Head Full of Dreams, whose cover looks like a kaleidoscope. That made me realize that loops and repetition are the basic principles behind making a kaleidoscope, so I decided to start sketching one.

## Sketch 1 - Grid Iteration

For my first sktech, I started from a very basic grid pattern.

I used two for loops to repeat the same shape on both x and y direction. Then I tried to change the rotation, size, and color based on the position of each shape.

At first I just wanted to understand how the loop works when it repeats a simple form many times. After that I started to change some values inside the loop, so the pattern would not look completely the same.

This version was quite simple, but it helped me understand the basic idea of iteration.

---

## Sketch 2 - Interactive Grid

For the second sketch, I kept the same grid idea, but I wanted to make it react to mouse movement.

I used `dist()` to calculate the distance between the mouse and each shape.

```js
let d = dist(mouseX, mouseY, x, y);
```

Then I used `map()` to turn the distance into another value that I could use for size, rotation, and color.

```js
let influence = map(d, 0, maxDistance, 1, 0);
```

The shapes closer to the mouse become bigger and rotate more. Their hue also changes when the mouse gets closer.

I think this made the pattern feel more alive because the grid is still repeating the same form, but each shape can react differently depending on the mouse position.

---

## Skecth 3 - Kaleidoscope

I love listening to music when I'm working. By chance, Spotify started playing Coldplay's album _A Head Full of Dreams_, and I noticed that the album cover looks like a kaleidoscope. It made me think that loops and repetition are also the basic rules of making a kaleidoscope, so I started to sketch one.

I created first no movement kaleidoscope by using loop function to draw different shapes, mostly circles.

I divided `TWO_PI` by the number of shapes so that each repeated form would be spaced evenly around one full circle.

I then repeated this process with ellipses, triangles, squares, and a center hexagon.

After building the radial pattern, I added more behavior:

- multiple kaleidoscope layers
- random HSB color palettes
- continuous zooming
- rotation
- new layers spawning from the center
- old layers being removed after they move outside the canvas
- mouse-controlled rotation
- mouse-controlled zoom speed
- mouse-controlled brightness
- click interaction

After I adjusted the rotation speed to very very fast, the final result started to feel more like a tunnel than a static kaleidoscope.

I did not plan the tunnel effect at the beginning, but I liked how it looked, so I kept developing it in this direction.

This version became much more complicated than the first two sketches, but it helped me understand what is actually happening behind radial repetition before using a library.

---

## Sketch 4 - p5.Polar Version

For the bonus version, I tried to recreate the kaleidoscope with the p5.Polar library.

The final visual is quite similar to Sketch 3, but the way I made it is very different.

In Sketch 3, I had to calculate the angle by myself:

```js
let a = i * (TWO_PI / num);
```

Then for every shape I needed to use:

```js
rotate(a);
translate(distance, 0);
```

to move the repeated shapes around the center.

After I started using p5.Polar, I could use functions like:

```js
polarEllipses(...)
polarSquares(...)
polarTriangles(...)
polarHexagon(...)
```

This made the radial repetition much easier.

I think the biggest difference is that in my manual version I spent more time thinking about where every shape should go, but with p5.Polar I could spend more time adjusting the layers, colors, scale, and movement.

I still think making the manual version first was useful because otherwise I probably would not really understand what p5.Polar is doing for me.

---

## New Calls and Functions I Learned via P5 reference and Internet research

During this assignment, I also researched some new p5.js calls and functions because I needed them for the interaction and kaleidoscope.

### `map()`

`map()` was one of the most useful new functions for me.

It can take one range of numbers and change it into another range.

For example:

```js
rotation += map(mouseX, 0, width, -0.035, 0.035);
```

Here, the mouse x position is originally between `0` and `width`, and I change it into a rotation speed between `-0.035` and `0.035`.

I also used `map()` for zoom speed, brightness, size, and color.

---

### `dist()`

I used `dist()` to calculate how far the mouse is from a shape or from the center of the canvas.

For example:

```js
let d = dist(mouseX, mouseY, width / 2, height / 2);
```

I used this distance to control the tunnel.

When the mouse moves closer to the center, the tunnel can become faster and brighter.

---

### `constrain()`

I used `constrain()` together with `map()`.

Sometimes the mapped value can go outside the range I want, so I used:

```js
mousePower = constrain(mousePower, 0, 1);
```

This keeps the value between 0 and 1.

---

### `randomSeed()`

At first I used a lot of `random()` because I wanted every kaleidoscope to have a different pattern and color.

But I found that if I only use `random()` inside `draw()`, the random result changes every frame, so the shapes keep flickering.

Then I learned about `randomSeed()`.

Each kaleidoscope has its own seed:

```js
seed: random(10000);
```

and before drawing it I use:

```js
randomSeed(seed);
```

This lets every kaleidoscope be different, but the same kaleidoscope can keep the same shape while it is rotating and zooming.

---

### `TWO_PI`

I used `TWO_PI` to represent one full circle.

For example:

```js
let a = i * (TWO_PI / num);
```

If I want 12 shapes, I divide one full circle into 12 parts.

Before this assignment I did not really think about using `TWO_PI` this way, but it became the basic logic of my manual kaleidoscope.

---

### `pixelDensity()`

I found `pixelDensity()` from the p5.js reference when I was trying to make the lines look cleaner.

```js
pixelDensity(2);
```

I am using a Retina screen, and the sketch looked noticeably sharper after I changed the pixel density.

---

### `pow()`

I used `pow()` when I created the starting size of different kaleidoscope layers.

```js
scale: 1 / pow(spacing, i);
```

This lets each new layer start smaller than the previous layer.

It helped me create the feeling that there are many layers going deeper into the center.

---

## Reflection

I think the biggest thing I learned this week is that iteration does not have to mean simply copying the exact same shape again and again.

The first sketch is mostly basic repetition. In the second sketch, I added mouse interaction and made each repeated shape react differently.

Then in Sktech 3, I changed the grid repetition into circular repetition and made the kaleidoscope manually. This part was much harder because I had to think about angle, rotation, and distance from the center.

After I understood the manual version, p5.Polar became much easier to understand. I could see which parts of my code the library was helping me replace.

I also learned that sometimes the result can go somewhere I did not plan. I originally wanted to make a kaleidoscope, but after increasing the zoom and rotation speed, it started to look like a tunnel. I liked that result, so I kept it and continued experimenting from there.

I think this was also one of the interesting parts of creative coding for me. I can start with one rule or Sktech, but after changing some parameters, the system can create another visual result that I did not expect.
