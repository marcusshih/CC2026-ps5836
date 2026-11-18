# Alternative Guitar

For this assignment, I wanted to create an alternative version of a guitar. Since the guitar is the instrument I am most familiar with, I thought it would be easier for me to learn a new digital instrument if I could build it around the playing techniques and musical concepts I already know.

I didn't want to simply recreate the sound of a guitar. I wanted to make an instrument where I could play chords, change pitches, and create visuals at the same time. I also wanted to keep some of the feeling of playing a guitar, while taking advantage of the possibilities of a digital instrument.

The instrument allows the performer to switch between major and minor chords, play six different strings, change octaves, and use an automatic arpeggio mode.

## How to Play

The instrument is mainly controlled using the computer keyboard. I divided the controls into two parts: choosing chords and playing strings.

| Key                  | Action                      |
| -------------------- | --------------------------- |
| 1–7                  | Select major chords         |
| Q–Y, Shift+U         | Select minor chords         |
| Space, B, H, U, I, O | Play the six guitar strings |
| + / -                | Change octave               |
| P                    | Turn arpeggio on or off     |
| 8                    | Switch to 4/4 time          |
| 9                    | Switch to 3/4 time          |
| F                    | Toggle fullscreen           |
| Z                    | Show or hide the interface  |

You can also change the key using the dropdown menu in the top-left corner. Before playing, click the Enable Sound button.

In manual mode, you can choose which strings to play and when to play them. When arpeggio mode is turned on, the instrument automatically plays a repeating pattern based on the selected chord, so you can focus more on changing chords.

## Sound and Visuals

Since the guitar is a string instrument, I wanted the visuals to be based on lines instead of circles or particles, which are often used in audio visualizers.

However, I felt that simply drawing six straight lines would be too boring. I started experimenting with sine waves to make the lines look more like vibrating strings. Every time a note is played, new wavy lines appear on the screen and slowly fade away.

I also gave each string a different angle. When multiple notes are played together, the lines overlap and create more interesting patterns instead of staying in the same position.

For the colors, I wanted to show how major and minor chords feel different to me. I used warmer colors like orange, yellow, and red for major chords, and cooler colors like blue, cyan, and purple for minor chords. I also made the lines bend in opposite directions depending on whether the chord is major or minor.

For the sound, I used Tone.js to combine three different sound layers. One provides a softer main sound, another adds a metallic texture, and the last adds a higher tone. I wanted the result to feel less like a simple electronic beep and more like a plucked string with a long resonance.

My goal was to make the sound and visuals feel connected, so that every note I play creates both an audible and a visible response.

## What I Learned

This was my first time using Tone.js to build a complete playable instrument.

I learned how to use MIDI notes to control pitch and how to create different sounds with Tone.js. Since I already have some experience with audio effects and sound processing, I was able to understand how synthesizers, envelopes, and reverb work pretty quickly.

For me, this part was more about learning how to control familiar audio concepts through code rather than learning sound design from the beginning.

I also learned how to use Tone.Transport to control BPM and schedule the arpeggio pattern. I used Tone.Draw.schedule to keep the visual animations synchronized with the sound.

On the visual side, I learned more about using sine waves to create movement. By changing the amplitude, phase, and time, I could make simple lines move in different ways. I also experimented with blend modes to create a glowing effect when the lines overlap.

One of the biggest challenges for me was figuring out how to make the sound and visuals feel meaningfully connected, instead of just drawing random shapes whenever a sound plays.

## Practice and Reflection

I spent some time practicing with the instrument.

At first, I mainly tried playing it manually, using different keys to create chords and melodies like I would on a guitar. However, I quickly realized that even though I was familiar with guitar fingerings, playing them on a computer keyboard was something I had to get used to.

When I tried to play different chords continuously, I had to remember both the chord selection keys and the string keys at the same time. After practicing for a while, I actually started getting a headache.

Because of this, I decided to add an arpeggio function that automatically plays the notes of the selected chord in a repeating rhythm. This way, I don't have to manually play every string, and I can focus more on changing chords and exploring how different chord combinations affect the sound and visuals.
