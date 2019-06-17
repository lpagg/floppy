# :floppy_disk: floppy :floppy_disk:

*floppy* is a (simple) game engine, it cames with a (simple) <a href="https://lpagg.github.io/floppy/editor/">web editor</a> online.
It can be used as ...
or ...

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

[Commands](#commands)

[Editor](#editor)

## Tutorial

### Step 0

Description here ...

#### Code

```javascript
function update() {

}
function render() {

}
```

### Step 1 - Coloring Background

Description here ...

#### Code

```javascript
function update() {

}
function render() {
Rect(0,0,WIDTH,HEIGHT,"lightblue"); // NEW
}
```

#### Result

<img src="/images/step1.png" width="160">

### Step 2 - Drawing Pad

Description here ...

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

Description here ...

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

Description here ...

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

Description here ...

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

Description here ...

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

Description here ...

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

Description here ...

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

Description here ...

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

## Commands

### Game Loop

```javascript
function update() {};
function render() {};
```

### Draw

```javascript
Rect(left, top, width, height, color);
Circle(left, top, radius, color);
Text(text, left, top, size, color);
Line(xi, yi, xf, yf, width, col);
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

### Utils

```javascript
Random(min, max);
PitchToFrequency(octave, semitone);
```


## Editor

aaa

