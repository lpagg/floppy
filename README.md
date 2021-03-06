# :floppy_disk: floppy :floppy_disk:

*floppy* is a micro game engine for beginners written in javascript.

* it has basic primitives for drawing (rectangles, circles, lines, text)
* it includes interaction (click, tap)
* it includes sound (generated)
* it comes with a (simple) <a href="https://lpagg.github.io/floppy/editor/">web editor</a> online and ...
* ... with a tutorial to write your first game (simple, but complete) 

## Index

[Tutorial](#tutorial)
* [Step 0](#step-0)
* [Step 1 - Coloring Background](#step-1---coloring-background)
* [Step 2 - Drawing Pad](#step-2---drawing-pad)
* [Step 3 - Drawing Ball](#step-3---drawing-ball)
* [Step 4 - Moving Ball](#step-4---moving-ball)
* [Step 5 - Bounching Right](#step-5---bounching-right)
* [Step 6 - Bounching Left](#step-6---bounching-left)
* [Step 7 - Bounching Top](#step-7---bounching-top)
* [Step 8 - Moving Pad](#step-8---moving-pad)
* [Step 9 - Bounching Pad](#step-9---bounching-pad)
* [Step 10 - Restarting Ball](#step-10---restarting-ball)
* [Step 11 - Adding Score](#step-11---adding-score)
* [Step 12 - Adding Lifes](#step-12---adding-lifes)
* [Step 13 - Adding Challenge](#step-13---adding-challenge)
* [Step 14 - Adding Sound](#step-14---adding-sound)
* [Step 15 - Publishing Online](#step-15---publishing-online)

[Commands](#commands)

[Editor](#editor)

[Thanks and Inspiration](#thanks-and-inspirations) 

## Tutorial

In this tutorial we will create a squash like game.

### Step 0

When opening the <a href="https://lpagg.github.io/floppy/editor/">web editor</a> default code include two functions (update and render) with empty body.

#### Code

```javascript
function update() {

}
function render() {

}
```

What it is inside those functions it is  executed continuosly (about 60 times each second).
First the update function, then the render function.

#### Result

<img src="/images/step0.png">

### Step 1 - Coloring Background

In order to color the whole game window with a light blue, we add a [Rect](#rect) command to the render function.

#### Code

```javascript
function update() {

}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue"); // NEW
}
```

WIDTH is a constant = 320 = the whole width of game window

HEIGHT is a constant = 480 = the whole height of game window


#### Result

<img src="/images/step1.png" width="160">

### Step 2 - Drawing Pad

To draw the pad, first we define four new variables (padX, padY, padW, padH) and then add a Rect command (using those variables). 

#### Code

```javascript
padX=100; // NEW
padY=430; // NEW 
padW=120; // NEW
padH=15; // NEW
function update() {

}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green"); // NEW
}
```

#### Result

<img src="/images/step2.png" width="160">

### Step 3 - Drawing Ball

To draw the ball, first we define its variables (ballX, ballY, ballR) and then add a [Circle](#circle) command (using those variables). 

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160; // NEW
ballY=70; // NEW
ballR=16; // NEW
function update() {

}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); // NEW
}
```

#### Result

<img src="/images/step3.png" width="160">

### Step 4 - Moving Ball

To move the ball we update its position (ballX, ballY).

Three new variables are defined in order to manage the update (dirX, dirY, speed).

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1; // NEW
dirY=1; // NEW
speed=2; // NEW
function update() {
ballX=ballX+dirX*speed; // NEW
ballY=ballY+dirY*speed; // NEW
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); // NEW
}
```

#### Result

<img src="/images/step4.png" width="160">

### Step 5 - Bounching Right

When the ball reaches the right border of game window we set dirX to -1 in order to have the ball bounching.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) { // NEW
dirX=-1; // NEW
} // NEW 
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

### Step 6 - Bounching Left

When the ball reaches the left border of game window we set dirX to 1 in order to have the ball bounching.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) {  // NEW
dirX=1;  // NEW 
}  // NEW
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

### Step 7 - Bounching Top

When the ball reaches the top border of game window we set dirY to 1 in order to have the ball bounching.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) { // NEW
dirY=1; // NEW
} // NEW
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

### Step 8 - Moving Pad

To move the pad, when TAPPED is true, we set the position of the pad taking the x position of our tapping (TAPX). 

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) { // NEW
padX=TAPX-padW/2; // NEW
} // NEW
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

#### Result

<img src="/images/step8.png" width="160">

### Step 9 - Bounching Pad

When the ball reaches the pad we set dirY to -1 in order to have the ball bounching on the pad.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { // NEW
dirY=-1; // NEW
} // NEW
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

### Step 10 - Restarting Ball

If the ball crosses the pad games is restarted from initial position.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { 
dirY=-1; 
} 
if  ( ballY+ballR > padY+padH )   { // NEW
ballX=160; // NEW
ballY=70; // NEW
}
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red"); 
}
```

### Step 11 - Adding Score

In order to manage and show the score, we add a new variable (score) and we use the [Text](#text) command in the render function.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
score=0; // NEW
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { 
dirY=-1;
score=score+10; // NEW
} 
if  ( ballY+ballR > padY+padH )   { 
ballX=160; 
ballY=70; 
}
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red");
Text(score,50,50,30,"green"); // NEW
}
```

### Step 12 - Adding Lifes

To manage multiple lifes, we add a new variable (lifes). We set it initially to 3 and we subtract 1 every time we lose a ball.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
score=0; 
lifes=3; // NEW
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { 
dirY=-1;
score=score+10; 
} 
if  ( ballY+ballR > padY+padH )   { 
ballX=160; 
ballY=70;
lifes=lifes-1; // NEW
}
if (lifes==0)  { // NEW
speed=0; // NEW
} // NEW
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red");
Text(score,50,50,30,"green");
Text(lifes,250,50,30,"red"); // NEW
}
```

### Step 13 - Adding Challenge

To add a challenge in the game, we increase the ball speed by 0.2 at each bounch on the pad.  

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
score=0; 
lifes=3; 
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
}
if  (ballX < ballR) { 
dirX=1; 
}
if  (ballY < ballR) {
dirY=1;
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { 
dirY=-1;
score=score+10;
speed=speed+0.2; // NEW
} 
if  ( ballY+ballR > padY+padH )   { 
ballX=160; 
ballY=70;
lifes=lifes-1; 
}
if (lifes==0)  { 
speed=0; 
} 
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red");
Text(score,50,50,30,"green");
Text(lifes,250,50,30,"red"); 
}
```

### Step 14 - Adding Sound

Last enrichment. We add a sound (generic) when bounching using the [SoundEffect](#sound) command.

#### Code

```javascript
padX=100;
padY=430;
padW=120;
padH=15;
ballX=160;
ballY=70;
ballR=16;
dirX=1;
dirY=1;
speed=2;
score=0; 
lifes=3; 
function update() {
if (ballX + ballR > WIDTH) {
dirX=-1;
SoundEffect (); //
}
if  (ballX < ballR) { 
dirX=1;
SoundEffect (); //
}
if  (ballY < ballR) {
dirY=1;
SoundEffect (); //
}
if (TAPPED) {
padX=TAPX-padW/2;
}
if  ( (ballX >padX)  &&  (ballX <padX+padW)  &&  (ballY+ballR>padY)  )  { 
dirY=-1;
score=score+10;
speed=speed+0.2;
SoundEffect (); //
} 
if  ( ballY+ballR > padY+padH )   { 
ballX=160; 
ballY=70;
lifes=lifes-1; 
}
if (lifes==0)  { 
speed=0; 
} 
ballX=ballX+dirX*speed;
ballY=ballY+dirY*speed;
}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue");
Rect(padX,padY,padW,padH,"green");
Circle(ballX,ballY,ballR,"red");
Text(score,50,50,30,"green");
Text(lifes,250,50,30,"red"); 
}
```

### Step 15 - Publishing Online

We can finally publish the game using <a href="https://htmlpasta.com/">HTML Pasta</a>.

Here the game published online.
<a href="https://683ea9a6-99c6-4b8d-b537-c1af99256276.htmlpasta.com">Game</a>.

## Commands

### Game Loop

```javascript
function update() {};
function render() {};
```

### Draw

#### Rect

```javascript
Rect(x, y, w, h, "color");
```
<img src="/images/rect.png">

#### Circle

```javascript
Circle(x, y, r, "color");
```
<img src="/images/circle.png">

#### Text

```javascript
Text("text", x, y, size, "color");
```

#### Line

```javascript
Line(x_init, y_init, x_end, y_end, width, "color");
```

### Constants

```javascript
WIDTH
HEIGHT
```

### Interaction

```javascript
TAPPED
TAPX
TAPY
```

### Sound

```javascript
SoundEffect(frequencyValue, attack, decay, type, volumeValue, panValue, wait, pitchBendAmount, reverse, randomValue, dissonance,  echo,    reverb, timeout);
```
more information @:
https://github.com/kittykatattack/sound.js#generating-sound-effects-and-music

### Utils

```javascript
Random(min, max); // Random integer from min to max
PitchToFrequency(octave, semitone); // Frequency from octave (integer), semitone (integer)
```

## Editor

<a href="https://lpagg.github.io/floppy/editor/">web editor</a>

with:

* live preview 
* syntax warnings
* saving game
* exporting game
* using offline

## Thanks and Inspirations

For game engine:
<a href="https://www.smashingmagazine.com/2012/10/design-your-own-mobile-game/">How To Design A Mobile Game With HTML5</a>

For approach:
<a href="https://www.lexaloffle.com/pico-8.php">pico-8</a>

For sound:
<a href="https://github.com/kittykatattack/sound.js">sound.js</a>
