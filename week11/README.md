# WEEK11

## Inspiration

As I am interested in accessibility, I started looking into Accessible Pedestrian Signals (APS) in New York City. These signals provide audible and tactile information to help blind and low-vision pedestrians cross streets.

I noticed that this kind of infrastructure is often overlooked by sighted pedestrians. I wanted to explore how accessibility in NYC has changed over time and make this development more visible through data visualization.

Since APS communicate information through sound, I also wanted to incorporate sound into the visualization itself.

## Implementation

I used two datasets from NYC Open Data to visualize the installation of APS across the five boroughs of New York City.

Each yellow dot represents an APS location. As the timeline progresses, new locations appear with a small ripple animation and sound. Each borough has a different sound frequency, and the sounds become more frequent when more APS locations are installed within a short period of time.

Users can play, pause, reset, or drag the timeline to explore different years. The visualization also displays the total number of APS locations and the number of new installations during each year.

Through the combination of visuals and sound, I hope to provide a different way of experiencing the development of accessible infrastructure in NYC.

## Data Sources

- [Accessible Pedestrian Signals (APS)](https://data.cityofnewyork.us/resource/de3m-c5p4.json?$limit=10000)
- [NYC Borough Boundaries](https://data.cityofnewyork.us/resource/gthc-hcne.json?$limit=10)
