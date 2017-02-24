// SCREEN_WIDTH = 320 
// SCREEN_HEIGHT = 480

var x = 160;
var y = 240;
var d = 1;
var s = 320;

function loop(dt) {
	if (isTapped()) {
		if (getTapX()>160) {  
			s = s + 10;
		} else {
			s = s - 10;
		}
	};
	
	if ( (x>320) || (x<0) ) {
		d = d*(-1);
		/*
		playSound(
			523.25,       //frequency
			0.05,         //attack
			0.2,          //decay
			"sine",       //waveform
			3,            //volume
			0.8,          //pan
			0,            //wait before playing
			600,          //pitch bend amount
			true,         //reverse
			100,          //random pitch range
			0,            //dissonance
			undefined,    //echo array: [delay, feedback, filter]
			undefined     //reverb array: [duration, decay, reverse?]
		);
		*/
	}; 
	x = x + d*s*dt;
	
	drawRect(0,0,320,480,"#00FF00");
	drawCircle(x, y, 50, "#FF0000");
	drawText(s, 20, 20, 12, "#123456");
};

