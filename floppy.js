window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Webaudio fixing 

(function (global, exports, perf) {
  'use strict';

  function fixSetTarget(param) {
    if (!param)	// if NYI, just return
      return;
    if (!param.setTargetAtTime)
      param.setTargetAtTime = param.setTargetValueAtTime;
  }

  if (window.hasOwnProperty('webkitAudioContext') &&
      !window.hasOwnProperty('AudioContext')) {
    window.AudioContext = webkitAudioContext;

    if (!AudioContext.prototype.hasOwnProperty('createGain'))
      AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    if (!AudioContext.prototype.hasOwnProperty('createDelay'))
      AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
    if (!AudioContext.prototype.hasOwnProperty('createScriptProcessor'))
      AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
    if (!AudioContext.prototype.hasOwnProperty('createPeriodicWave'))
      AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;


    AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function() {
      var node = this.internal_createGain();
      fixSetTarget(node.gain);
      return node;
    };

    AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;
    AudioContext.prototype.createDelay = function(maxDelayTime) {
      var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();
      fixSetTarget(node.delayTime);
      return node;
    };

    AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;
    AudioContext.prototype.createBufferSource = function() {
      var node = this.internal_createBufferSource();
      if (!node.start) {
        node.start = function ( when, offset, duration ) {
          if ( offset || duration )
            this.noteGrainOn( when || 0, offset, duration );
          else
            this.noteOn( when || 0 );
        };
      } else {
        node.internal_start = node.start;
        node.start = function( when, offset, duration ) {
          if( typeof duration !== 'undefined' )
            node.internal_start( when || 0, offset, duration );
          else
            node.internal_start( when || 0, offset || 0 );
        };
      }
      if (!node.stop) {
        node.stop = function ( when ) {
          this.noteOff( when || 0 );
        };
      } else {
        node.internal_stop = node.stop;
        node.stop = function( when ) {
          node.internal_stop( when || 0 );
        };
      }
      fixSetTarget(node.playbackRate);
      return node;
    };

    AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function() {
      var node = this.internal_createDynamicsCompressor();
      fixSetTarget(node.threshold);
      fixSetTarget(node.knee);
      fixSetTarget(node.ratio);
      fixSetTarget(node.reduction);
      fixSetTarget(node.attack);
      fixSetTarget(node.release);
      return node;
    };

    AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;
    AudioContext.prototype.createBiquadFilter = function() {
      var node = this.internal_createBiquadFilter();
      fixSetTarget(node.frequency);
      fixSetTarget(node.detune);
      fixSetTarget(node.Q);
      fixSetTarget(node.gain);
      return node;
    };

    if (AudioContext.prototype.hasOwnProperty( 'createOscillator' )) {
      AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function() {
        var node = this.internal_createOscillator();
        if (!node.start) {
          node.start = function ( when ) {
            this.noteOn( when || 0 );
          };
        } else {
          node.internal_start = node.start;
          node.start = function ( when ) {
            node.internal_start( when || 0);
          };
        }
        if (!node.stop) {
          node.stop = function ( when ) {
            this.noteOff( when || 0 );
          };
        } else {
          node.internal_stop = node.stop;
          node.stop = function( when ) {
            node.internal_stop( when || 0 );
          };
        }
        if (!node.setPeriodicWave)
          node.setPeriodicWave = node.setWaveTable;
        fixSetTarget(node.frequency);
        fixSetTarget(node.detune);
        return node;
      };
    }
  }

  if (window.hasOwnProperty('webkitOfflineAudioContext') &&
      !window.hasOwnProperty('OfflineAudioContext')) {
    window.OfflineAudioContext = webkitOfflineAudioContext;
  }

}(window));

var actx = new AudioContext();

function playSound(
  frequencyValue,      //The sound's fequency pitch in Hertz
  attack,              //The time, in seconds, to fade the sound in
  decay,               //The time, in seconds, to fade the sound out
  type,                //waveform type: "sine", "triangle", "square", "sawtooth"
  volumeValue,         //The sound's maximum volume
  panValue,            //The speaker pan. left: -1, middle: 0, right: 1
  wait,                //The time, in seconds, to wait before playing the sound
  pitchBendAmount,     //The number of Hz in which to bend the sound's pitch down
  reverse,             //If `reverse` is true the pitch will bend up
  randomValue,         //A range, in Hz, within which to randomize the pitch
  dissonance,          //A value in Hz. It creates 2 dissonant frequencies above and below the target pitch
  echo,                //An array: [delayTimeInSeconds, feedbackTimeInSeconds, filterValueInHz]
  reverb,              //An array: [durationInSeconds, decayRateInSeconds, reverse]
  timeout              //A number, in seconds, which is the maximum duration for sound effects
) {

  //Set the default values
  if (frequencyValue === undefined) frequencyValue = 200;
  if (attack === undefined) attack = 0;
  if (decay === undefined) decay = 1;
  if (type === undefined) type = "sine";
  if (volumeValue === undefined) volumeValue = 1;
  if (panValue === undefined) panValue = 0;
  if (wait === undefined) wait = 0;
  if (pitchBendAmount === undefined) pitchBendAmount = 0;
  if (reverse === undefined) reverse = false;
  if (randomValue === undefined) randomValue = 0;
  if (dissonance === undefined) dissonance = 0;
  if (echo === undefined) echo = undefined;
  if (reverb === undefined) reverb = undefined;
  if (timeout === undefined) timeout = undefined;

  //Create an oscillator, gain and pan nodes, and connect them
  //together to the destination
  var oscillator, volume, pan;
  oscillator = actx.createOscillator();
  volume = actx.createGain();
  if (!actx.createStereoPanner) {
    pan = actx.createPanner();
  } else {
    pan = actx.createStereoPanner();
  }
  oscillator.connect(volume);
  volume.connect(pan);
  pan.connect(actx.destination);

  //Set the supplied values
  volume.gain.value = volumeValue;
  if (!actx.createStereoPanner) {
    pan.setPosition(panValue, 0, 1 - Math.abs(panValue));
  } else {
    pan.pan.value = panValue; 
  }
  oscillator.type = type;

  //Optionally randomize the pitch. If the `randomValue` is greater
  //than zero, a random pitch is selected that's within the range
  //specified by `frequencyValue`. The random pitch will be either
  //above or below the target frequency.
  var frequency;
  var randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
  };
  if (randomValue > 0) {
    frequency = randomInt(
      frequencyValue - randomValue / 2,
      frequencyValue + randomValue / 2
    );
  } else {
    frequency = frequencyValue;
  }
  oscillator.frequency.value = frequency;

  //Apply effects
  if (attack > 0) fadeIn(volume);
  fadeOut(volume);
  if (pitchBendAmount > 0) pitchBend(oscillator);
  if (echo) addEcho(volume);
  if (reverb) addReverb(volume);
  if (dissonance > 0) addDissonance();

  //Play the sound
  play(oscillator);

  //The helper functions:
  
  function addReverb(volumeNode) {
    var convolver = actx.createConvolver();
    convolver.buffer = impulseResponse(reverb[0], reverb[1], reverb[2], actx);
    volumeNode.connect(convolver);
    convolver.connect(pan);
  }

  function addEcho(volumeNode) {

    //Create the nodes
    var feedback = actx.createGain(),
        delay = actx.createDelay(),
        filter = actx.createBiquadFilter();

    //Set their values (delay time, feedback time and filter frequency)
    delay.delayTime.value = echo[0];
    feedback.gain.value = echo[1];
    if (echo[2]) filter.frequency.value = echo[2];

    //Create the delay feedback loop, with
    //optional filtering
    delay.connect(feedback);
    if (echo[2]) {
      feedback.connect(filter);
      filter.connect(delay);
    } else {
      feedback.connect(delay);
    }

    //Connect the delay loop to the oscillator's volume
    //node, and then to the destination
    volumeNode.connect(delay);

    //Connect the delay loop to the main sound chain's
    //pan node, so that the echo effect is directed to
    //the correct speaker
    delay.connect(pan);
  }

  //The `fadeIn` function
  function fadeIn(volumeNode) {

    //Set the volume to 0 so that you can fade
    //in from silence
    volumeNode.gain.value = 0;

    volumeNode.gain.linearRampToValueAtTime(
      0, actx.currentTime + wait
    );
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue, actx.currentTime + wait + attack
    );
  }

  //The `fadeOut` function
  function fadeOut(volumeNode) {
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue, actx.currentTime + attack + wait
    );
    volumeNode.gain.linearRampToValueAtTime(
      0, actx.currentTime + wait + attack + decay
    );
  }

  //The `pitchBend` function
  function pitchBend(oscillatorNode) {
    //If `reverse` is true, make the note drop in frequency. Useful for
    //shooting sounds

    //Get the frequency of the current oscillator
    var frequency = oscillatorNode.frequency.value;

    //If `reverse` is true, make the sound drop in pitch
    if (!reverse) {
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency, 
        actx.currentTime + wait
      );
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency - pitchBendAmount, 
        actx.currentTime + wait + attack + decay
      );
    }

    //If `reverse` is false, make the note rise in pitch. Useful for
    //jumping sounds
    else {
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency, 
        actx.currentTime + wait
      );
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency + pitchBendAmount, 
        actx.currentTime + wait + attack + decay
      );
    }
  }

  //The `addDissonance` function
  function addDissonance() {

    //Create two more oscillators and gain nodes
    var d1 = actx.createOscillator(),
        d2 = actx.createOscillator(),
        d1Volume = actx.createGain(),
        d2Volume = actx.createGain();

    //Set the volume to the `volumeValue`
    d1Volume.gain.value = volumeValue;
    d2Volume.gain.value = volumeValue;

    //Connect the oscillators to the gain and destination nodes
    d1.connect(d1Volume);
    d1Volume.connect(actx.destination);
    d2.connect(d2Volume);
    d2Volume.connect(actx.destination);

    //Set the waveform to "sawtooth" for a harsh effect
    d1.type = "sawtooth";
    d2.type = "sawtooth";

    //Make the two oscillators play at frequencies above and
    //below the main sound's frequency. Use whatever value was
    //supplied by the `dissonance` argument
    d1.frequency.value = frequency + dissonance;
    d2.frequency.value = frequency - dissonance;

    //Fade in/out, pitch bend and play the oscillators
    //to match the main sound
    if (attack > 0) {
      fadeIn(d1Volume);
      fadeIn(d2Volume);
    }
    if (decay > 0) {
      fadeOut(d1Volume);
      fadeOut(d2Volume);
    }
    if (pitchBendAmount > 0) {
      pitchBend(d1);
      pitchBend(d2);
    }
    if (echo) {
      addEcho(d1Volume);
      addEcho(d2Volume);
    }
    if (reverb) {
      addReverb(d1Volume);
      addReverb(d2Volume);
    }
    play(d1);
    play(d2);
  }

  //The `play` function
  function play(node) {
    node.start(actx.currentTime + wait);

    //Oscillators have to be stopped otherwise they accumulate in 
    //memory and tax the CPU. They'll be stopped after a default
    //timeout of 2 seconds, which should be enough for most sound 
    //effects. Override this in the `soundEffect` parameters if you
    //need a longer sound
    node.stop(actx.currentTime + wait + 2);
  }
}

/*
impulseResponse
---------------
The `makeSound` and `soundEffect` functions uses `impulseResponse`  to help create an optional reverb effect.  
It simulates a model of sound reverberation in an acoustic space which 
a convolver node can blend with the source sound. Make sure to include this function along with `makeSound`
and `soundEffect` if you need to use the reverb feature.
*/

function impulseResponse(duration, decay, reverse, actx) {

  //The length of the buffer.
  var length = actx.sampleRate * duration;

  //Create an audio buffer (an empty sound container) to store the reverb effect.
  var impulse = actx.createBuffer(2, length, actx.sampleRate);

  //Use `getChannelData` to initialize empty arrays to store sound data for
  //the left and right channels.
  var left = impulse.getChannelData(0),
      right = impulse.getChannelData(1);

  //Loop through each sample-frame and fill the channel
  //data with random noise.
  for (var i = 0; i < length; i++){

    //Apply the reverse effect, if `reverse` is `true`.
    var n;
    if (reverse) {
      n = length - i;
    } else {
      n = i;
    }

    //Fill the left and right channels with random white noise which
    //decays exponentially.
    left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }

  //Return the `impulse`.
  return impulse;
};


// namespace our game
var F = {

    // set up some inital values
    WIDTH: 320, 
    HEIGHT:  480,
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,

	then: null,

    init: function() {
   
        // the proportion of width to height
        F.RATIO = F.WIDTH / F.HEIGHT;
        // these will change when the screen is resize
        F.currentWidth = F.WIDTH;
        F.currentHeight = F.HEIGHT;
        // this is our canvas element
        F.canvas = document.getElementsByTagName('canvas')[0];
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        F.canvas.width = F.WIDTH;
        F.canvas.height = F.HEIGHT;
        // the canvas context allows us to 
        // interact with the canvas api
        F.ctx = F.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        F.ua = navigator.userAgent.toLowerCase();
        F.android = F.ua.indexOf('android') > -1 ? true : false;
        F.ios = ( F.ua.indexOf('iphone') > -1 || F.ua.indexOf('ipad') > -1  ) ? true : false;

		F.then = Date.now();
		
        // listen for clicks
        window.addEventListener('click', function(e) {
            e.preventDefault();
            F.Input.set(e);
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            F.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function(e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        F.resize();

        F.loop();
		

    },


    resize: function() {
    
        F.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        F.currentWidth = F.currentHeight * F.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (F.android || F.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        F.canvas.style.width = F.currentWidth + 'px';
        F.canvas.style.height = F.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        F.scale = F.currentWidth / F.WIDTH;
        // position of canvas in relation to
        // the screen
        F.offset.top = F.canvas.offsetTop;
        F.offset.left = F.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    },

    // this is where all entities will be moved
    // and checked for collisions etc
    update: function(dt) {
		loop(dt);
		F.Input.tapped = false;
    },

    // this is where we draw all the entities
    render: function() {
		F.Draw.rect(0, 0, F.WIDTH, F.HEIGHT, '#036');
		render();
    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

		var now = Date.now();
		var delta = now - F.then;

		F.update(delta / 1000);
		//F.render();

		F.then = now;

		// Request to do this again ASAP
		requestAnimationFrame(F.loop);
		
    }

};

// abstracts various canvas operations into
// standalone functions
F.Draw = {

    clear: function() {
        F.ctx.clearRect(0, 0, F.WIDTH, F.HEIGHT);
    },

    rect: function(x, y, w, h, col) {
        F.ctx.fillStyle = col;
        F.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        F.ctx.fillStyle = col;
        F.ctx.beginPath();
        F.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        F.ctx.closePath();
        F.ctx.fill();
    },

    text: function(string, x, y, size, col) {
        F.ctx.font = 'bold '+size+'px Monospace';
        F.ctx.fillStyle = col;
        F.ctx.fillText(string, x, y);
    }

};

F.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = (data.pageX - F.offset.left) / F.scale;
        this.y = (data.pageY - F.offset.top) / F.scale;
        this.tapped = true;
    }

};
	

window.addEventListener('load', F.init, false);
window.addEventListener('resize', F.resize, false);

// simple API

// DRAWING
function drawRect(x, y, w, h, col) { F.Draw.rect(x, y, w, h, col); };
function drawCircle(x, y, r, col) { F.Draw.circle(x, y, r, col); };
function drawText(string, x, y, size, col) { F.Draw.text(string, x, y, size, col); };

// INTERACTION
function isTapped() { return F.Input.tapped };
function getTapX() { return F.Input.x };
function getTapY() { return F.Input.y };

// LOOP
// loop(dt)

// SOUND
/*
function playSound(
  frequencyValue,      //The sound's fequency pitch in Hertz
  attack,              //The time, in seconds, to fade the sound in
  decay,               //The time, in seconds, to fade the sound out
  type,                //waveform type: "sine", "triangle", "square", "sawtooth"
  volumeValue,         //The sound's maximum volume
  panValue,            //The speaker pan. left: -1, middle: 0, right: 1
  wait,                //The time, in seconds, to wait before playing the sound
  pitchBendAmount,     //The number of Hz in which to bend the sound's pitch down
  reverse,             //If `reverse` is true the pitch will bend up
  randomValue,         //A range, in Hz, within which to randomize the pitch
  dissonance,          //A value in Hz. It creates 2 dissonant frequencies above and below the target pitch
  echo,                //An array: [delayTimeInSeconds, feedbackTimeInSeconds, filterValueInHz]
  reverb,              //An array: [durationInSeconds, decayRateInSeconds, reverse]
  timeout              //A number, in seconds, which is the maximum duration for sound effects
)
*/