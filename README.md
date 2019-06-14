# :floppy_disk: floppy :floppy_disk:

*floppy* is a (simple) game engine, it comes with a (simple) <a href="https://lpagg.github.io/floppy/editor/">web editor</a> online.
It can be used as ...
or ...

## Index

[Index](#index)

[Tutorial](#tutorial)

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

#### Result

<img src="/images/step0.png" width="160">

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

WIDTH
HEIGHT

INTERACTION
TAPPED
TAPX
TAPY

SOUND
SoundEffect(frequencyValue, attack, decay, type, volumeValue, panValue, wait, pitchBendAmount, reverse, randomValue, dissonance,  echo,    reverb, timeout);

UTILS
Random(min, max);
PitchToFrequency(octave, semitone);

## Editor

aaa

