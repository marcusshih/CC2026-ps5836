# Week 1 notes

## Coding "CC is..." work

The last time I worked with p5.js was almost a year ago. Coming back to Creative Coding this time, I wanted to refresh my memory and also learn more things that I did not get to try in my undergraduate Creative Coding course.

This Week 1 assignment helped me bring back some memories of the p5 library and coding.

Besides replacing the original "CC is..." quotes as required by the assignment, I also tried to write some CSS and animation.

### First, CSS:

1. I created several background and text color combinations (inspired by the colors of some of my favorite bubble tea brands in Taiwan).

2. I put them into an array of objects called `colorPairs`. Each pair has a `bg` and `text` value, so when the background color changes, it can also switch to a matching text color.

3. I used `pickColor()` to choose the next color pair, and `shuffle()` to randomize the order of `colorPairs`, so the order of the colors can be different each time.

4. At first, I used random selection directly, but I realized that the same color could appear multiple times in a row. So I changed it to pick colors in order from the shuffled array. This way, every color appears once before the array is shuffled again, and it avoids repeatedly picking the same color.

5. Finally, in `draw()`, I used `currentColor.bg` and `currentColor.text` to control `background()` and `fill()`, so each quote can appear with a different background and text color combination.

6. Some of the quotes and sources were too long and could go outside the screen, so I also adjusted the text layout to make them fit better.

7. Instead of only giving text() an x and y position, I also gave it a width and height, so p5.js can wrap the text automatically when the content is too long.

8. I used relative values based on the browser size instead of fixed dimensions, so the text area can change with the window size.

9. I also adjusted the text alignment, line spacing, and source position to keep the quote and source readable and prevent them from going outside the screen.

### Next, animation:

1. I wanted to try creating a move in / move out feeling for the quotes.

2. My approach was to first create states: `anim` records the progress of the animation, while `isExiting` / `isEntering` record the entering and exiting states of the old and new quotes.

3. I modified what happens after a mouse click. Originally, clicking would directly generate a new quote. I changed it so the old quote has to move out first, and then the new quote can move in. I also check both states to make sure clicking the mouse while an animation is already happening will not start another animation and cause conflicts.

4. Inside `draw()`, I update `anim` depending on the `isExiting` / `isEntering` state. When the old quote is leaving, `anim` gradually decreases from 1 to 0. When the new quote enters, it increases from 0 to 1.

5. I use `anim` to control `xOffset`:

   ```text
   anim = 1 → xOffset = 0

   anim = 0 → xOffset = -width (outside the screen)
   ```

6. I use `lerp(start, end, amount)` to calculate what the current `xOffset` should be. `anim` can be used as the `amount`, so the position changes between the start and end positions based on the progress of the animation.

7. I add `xOffset` to the x position of the text. Since `xOffset` is updated continuously, the position of the text also keeps changing.

8. **Because `draw()` in p5.js keeps updating by default**, I need to stop updating `anim` when the animation is finished. Otherwise, it would keep increasing or decreasing. Therefore, I need to set conditions and update the `isExiting` / `isEntering` states when each animation finishes.

9. Finally, to make the movement look a little better, I added an easing effect. I used an `easeOutCubic` cubic curve to change the `amount` used by `lerp()`. Originally, `anim` changes linearly from 0 to 1 at a constant rate. With easing, the movement can start faster and slow down near the end, making the move in / move out animation feel less like simple constant-speed movement.

---

## CC is... def and src list

**1. CC is...**

A new interdisciplinary art form that bridges the gap between technologists and artists.

**Definition:**

“Creative coding detaches code from its original purpose as a tool for functional problem solving.”

**Source:**

Ahmad Moussa — _Creative Coding: The New Era_, Gorilla Sun, 2023.

**Link:**

https://www.gorillasun.de/blog/creative-coding-the-new-era/

---

**2. CC is...**

Sketching with code.

**Definition:**

“One idea was the synthesis of graphic design with computer science, combining the visual principles of design with ways of thinking about systems from computer science. We also wanted to share a way of working with code where things are figured out during the process of writing the software. We called this sketching with code. ”

**Source:**

Casey Reas & Ben Fry — _A Modern Prometheus: The History of Processing_, Processing Foundation, 2018.

**Link:**

https://medium.com/processing-foundation/a-modern-prometheus-59aed94abe85

---

**3. CC is...**

Writing code without necessarily knowing where it is going.

**Definition:**

“And for me, it boils down to the idea that when I’m, you know, in giant air quotes, now “Creative Coding”, I am writing code where that I don’t know where it’s going, necessarily. ”

**Source:**

Daniel Shiffman — _Daniel Shiffman on The Nature of Code_, interview by Tim Rodenbröker.

**Link:**

https://timrodenbroeker.de/daniel-shiffman/

---

**4. CC is...**

“Creative coding is the practice of combining programming techniques with artistic expression”

**Definition:**

“Creative coding is the practice of combining programming techniques with artistic expression in order to create aesthetically pleasing and optimized interactive digital experiences. In traditional programming, the primary focus usually is set on providing functionality and efficiency in a digital space. Creative coding adds equal emphasis on aesthetics and emotional impact.”

**Source:**

SMU Meadows School of the Arts — _What is Creative Coding?_, January 5, 2024.

**Link:**

https://www.smu.edu/meadows/newsandevents/news/2023/what-is-creative-coding

---

**5. CC is...**

“Creative coding uses software, code and computational processes to be expressive or to create art forms.”

**Definition:**

“Creative coding uses software, code and computational processes to be expressive or to create art forms. While creative coding is generally thought of as more aesthetic than functional, it is becoming increasingly commonplace in advertising, branding and the wider design industry.”

**Source:**

University of the Arts London — _How to Start Creative Coding_.
The article also features creative coding artist and lecturer Damien Borowik.

**Link:**

https://www.arts.ac.uk/study-at-ual/short-courses/stories/how-to-start-creative-coding

---

**6. CC is...**

“Creative coding is the practice of making art with code.”

**Definition:**

“Creative coding is the practice of making art with code. As computers have become more integral in our lives, artists have turned to the language the computer speaks, code, to communicate their ideas.”

**Source:**

Andrew Bryant — artist and coder, _How to Make Art with Creative Coding_, Artsy Shark, 2021.

**Link:**

https://www.artsyshark.com/2021/05/26/what-is-creative-coding/

---

**7. CC is...**

“For me Creative Coding is a method of exploring code through the lens of a designer.”

**Definition:**

“For me Creative Coding is a method of exploring code through the lens of a designer. Code becomes the fabric, the tool we work with. It opens doors to creating new generative things living outside the boundaries of the traditional designer’s toolkit.  
I view it as an explorative method allowing us to playfully navigate and adapt to new technologies. An experimental playground where code becomes both tool and artistic device. It will lead you on an open journey with uncertain and unpredictable outcome. In that sense creative coders are pioneers operating at the frontier of new technologies and exploring their potential.”

**Source:**

Nahuel Gerth — _Getting started with Creative Coding_.

**Link:**

https://nahuelgerth.de/thoughts/getting-started-with-creative-coding

---

**8. CC is...**

“Creative Coding is a way of learning how to program by creating visual art with computer graphics.”

**Definition:**

“Creative Coding is a way of learning how to program by creating visual art with computer graphics. It's an umbrella term that encompasses many different approaches to using code as a medium for art.”

**Source:**

Masood Kamandy — _Creative Coding with Swift_, an open-source course developed for Pasadena City College and the University of California Santa Barbara.

**Link:**

https://github.com/bluekamandy/Creative-Coding-Course-with-SwiftProcessing

---

**9. CC is.../source**

“Creative coding uses programming languages to generate art and music”

**Definition:**

“Creative coding, which uses code to generate on-screen art and music. Code serves as the paintbrush and the computer as the canvas.”

**Source:**

University of York — _Creative Coding_, from the online course _Fundamentals of Creative Technologies and Interactive Experiences_, hosted on FutureLearn.

**Link:**

https://www.futurelearn.com/info/courses/fundamentals-of-creative-technologies-and-interactive-experiences/0/steps/451373

---

**10. CC is...**

“Where the artist-programmer is primarily invested in speculation, experimentation, and iterative practice.”

**Definition:**

“Distinct from the instrumental and disciplinary approaches in computer science where software is ‘engineered’ and technical principles are mastered in a formal sense, creative coding is defined by a more playful, interdisciplinary mindset where the artist-programmer is primarily invested in speculation, experimentation, and iterative practice.”

**Source:**

David Young — “Theorising while() Practising: A Review of Aesthetic Programming,” _Computational Culture_, Issue 8, 2021.

**Link:**

https://computationalculture.net/theorising-while-practising-a-review-of-aesthetic-programming/
