
// http://paulirish.com/2011/requestanimationframe-for-smart-animating
// shim layer with setTimeout fallback
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

// namespace our game
var F = {

    // set up some inital values
    WIDTH: 320, 
    HEIGHT:  480, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // store all bubble, touches, particles etc
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
	
	actx: null,

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
		F.actx = new AudioContext();
		
        F.ua = navigator.userAgent.toLowerCase();
        F.android = F.ua.indexOf('android') > -1 ? true : false;
        F.ios = ( F.ua.indexOf('iphone') > -1 || F.ua.indexOf('ipad') > -1  ) ? true : false;

        // set up our wave effect
        // basically, a series of overlapping circles
        // across the top of screen


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
        
		update(dt);
		
		F.Input.tapped = false;

    },


    // this is where we draw all the entities
    render: function() {
	
		render();

    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

        var now = Date.now();
		var delta = now - F.then;

		F.then = now;

		// Request to do this again ASAP
		requestAnimationFrame(F.loop);
		
		if (delta < 1000) {
			F.update(delta);
			F.render();
		}
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
		//context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		F.ctx.arc(x, y, r, 0,  Math.PI * 2, true);
        //F.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        F.ctx.closePath();
        F.ctx.fill();
    },

    text: function(string, x, y, size, col) {
        F.ctx.font = 'bold '+size+'px Monospace';
        F.ctx.fillStyle = col;
        F.ctx.fillText(string, x, y);
    },
	
	line: function(xi, yi, xf, yf, width, col) {
        F.ctx.strokeStyle = '#ff0000';
		F.ctx.beginPath();
		F.ctx.lineWidth = width;
		F.ctx.moveTo(xi,yi);
		F.ctx.lineTo(xf,yf);
		F.ctx.stroke();
    }

};

F.Play = {
	
	note: function (type,x) {
		o = F.actx.createOscillator();
		g = F.actx.createGain();
		o.connect(g);
		o.type=type;
		g.connect(F.actx.destination);
		o.start(0);
		g.gain.exponentialRampToValueAtTime(0.00001,F.actx.currentTime+ x);
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

// API

// DRAWING
function Rect(x, y, w, h, col) { F.Draw.rect(x, y, w, h, col); };
function Circle(x, y, r, col) { F.Draw.circle(x, y, r, col); };
function Text(string, x, y, size, col) { F.Draw.text(string, x, y, size, col); };
function Line(xi, yi, xf, yf, width, col) { F.Draw.line(xi, yi, xf, yf, width, col); };

// INTERACTION
function isTapped() { return F.Input.tapped };
function clearTap() { F.Input.tapped = false };
function getTapX() { return F.Input.x };
function getTapY() { return F.Input.y };

// SOUND
function Play(t,d) { F.Play.note(t,d) };

// CANVAS
var FH = F.HEIGHT; // 480
var FW = F.WIDTH; // 320

// GAME LOOP
// update(dt)
// render()
