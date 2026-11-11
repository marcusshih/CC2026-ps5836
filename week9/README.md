# Week 9

For this week's assignment, I wanted to make something related to my own experience. I've had a bad habit of biting my nails since I was a kid, especially when I'm thinking about something or concentrating on my work. Sometimes I don't even notice that I'm doing it.

When I was thinking about what to make for this week's assignment, I realized I was biting my nails again. So I thought, why not make something that reminds me to stop?

My idea was to use ml5.js to detect when my hand gets close to my mouth and show a warning on the screen.

I used **FaceMesh** to track my face and find the position of my mouth, and **HandPose** to track my hands and fingertips. Then I calculated the distance between my fingertips and my mouth. At first, I used a circle around my mouth, but I realized it was too big and sometimes even covered my nose. So I changed it to an ellipse, which fits the shape of my mouth better.

For the visual design, I wanted something simple but strong enough to catch my attention. Normally, the screen is black with the words "DON'T BITE NAILS." When my fingers stay near my mouth for a short time, the screen starts flashing between red and black with a big "STOP." warning.

I also added a small camera preview in the corner to show the tracking points, so I can see how FaceMesh and HandPose are detecting my movements. I can press **C** to hide or show the camera.

One limitation is that the program doesn't actually know if I'm biting my nails. It only detects when my fingers are close to my mouth, so other movements might trigger the warning too. I also found that I could easily avoid the detection by covering my mouth with my other hand, since the camera couldn't track my mouth properly. But I think it's still an interesting experiment to see how coding and body tracking could help me become more aware of a habit that I usually do without thinking.
