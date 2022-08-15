(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m4l4_atlas_1", frames: [[0,0,749,635]]},
		{name:"m4l4_atlas_2", frames: [[0,0,460,977]]},
		{name:"m4l4_atlas_3", frames: [[0,0,813,526]]},
		{name:"m4l4_atlas_4", frames: [[362,705,351,253],[0,491,360,301],[0,0,372,489],[374,372,362,331],[374,0,330,370]]},
		{name:"m4l4_atlas_5", frames: [[0,0,321,273],[323,0,211,367],[0,275,112,95],[0,372,108,87],[536,0,102,81],[225,275,96,70],[536,217,92,57],[213,461,47,48],[48,515,39,40],[0,461,52,52],[262,459,46,47],[536,276,69,51],[536,83,101,68],[536,153,100,62],[114,275,109,91],[114,368,106,91],[222,369,105,88],[329,369,105,84],[436,369,105,81],[0,515,46,43],[160,461,51,48],[108,461,50,50],[436,452,55,56],[262,508,45,46],[54,461,52,52]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_43 = function() {
	this.initialize(img.CachedBmp_43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,698,1538);


(lib.CachedBmp_42 = function() {
	this.initialize(img.CachedBmp_42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,396,1630);


(lib.CachedBmp_41 = function() {
	this.initialize(ss["m4l4_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(img.CachedBmp_40);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,850,1888);


(lib.CachedBmp_39 = function() {
	this.initialize(ss["m4l4_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(img.CachedBmp_37);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,420,1629);


(lib.CachedBmp_36 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["m4l4_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(img.CachedBmp_34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,421,1538);


(lib.CachedBmp_33 = function() {
	this.initialize(ss["m4l4_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(img.CachedBmp_32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,261,1195);


(lib.CachedBmp_31 = function() {
	this.initialize(img.CachedBmp_31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,421,1538);


(lib.CachedBmp_30 = function() {
	this.initialize(img.CachedBmp_30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,368,1181);


(lib.CachedBmp_29 = function() {
	this.initialize(img.CachedBmp_29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,698,1363);


(lib.CachedBmp_28 = function() {
	this.initialize(ss["m4l4_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["m4l4_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(img.CachedBmp_26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,605,1745);


(lib.CachedBmp_25 = function() {
	this.initialize(ss["m4l4_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["m4l4_atlas_5"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["m4l4_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1126,958);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yilt678lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-54.7,-241.05,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.7,-241,109.4,241);


(lib.yilt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-31.2,-0.1,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-0.1,62.099999999999994,255.5);


(lib.uoy89y89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-58.65,-49.75,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.6,-49.7,117.30000000000001,99.5);


(lib.uol7tt7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-66.55,-147.9,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.5,-147.9,133.2,295.9);


(lib.uo89y89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(0,0,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,127.4,82.5);


(lib.uiol7l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AhFBWQgSgoACgJIAFgbQgFgKgCgOQgGgaANgMQAegbAMgFQAggPAiAYQAoAcANANQAMAMgEAHIgHAMQgFAFgOgCIAGANQAFAOgCAEQgCAEgKAEQgKAEgCgDIgfgjQATArgCAGQgBAFgTAAIgYgsQARA2gHAHIgIALQgEADgEgEQgDgFgKggIgKgeIgMAMQgLAPADAIQAEAKABALQABAKgCABIgHAEIgDABQgDAAgBgFg");
	this.shape.setTransform(-13.7786,149.8937,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#897E7D").s().p("ACFLmQgZADgpgeQgKgJhhiBQhsiQg6g9Qgxg0gMhGQgNhGAdhAIAGgMQAWhAANgTQAQgZASiDQAXiqAWhTQBVlTDvgSIATgBQAWADAPARQAuA2gtC1QgJApgmB3Ih0BDIg7DfQg/DiggAQICTCxQCaDGAbBrIhwBAQgCgFgOAAg");
	this.shape_1.setTransform(-36.1321,74.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.3,0,63.3,163.8);


(lib.uioy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8E3433").s().p("AiSENQADgRAIgPQAMgsAHgMQAKgSAOhUQAThvANg0QA3jeB0giIAOADQAPAHAFAUQAQA+hYClIgrDNQgqC0gUAMQgXAVgaAEIgKACQgrAAgMhIg");
	this.shape.setTransform(-0.026,52.302,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.6,0,45.2,104.6);


(lib.uioy79y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BD8888").s().p("AiIGXQgygdgVjpQgVjhAdg9QAWguBZhxIBWhnQBsgpAeAzQAPAZgHAiIAzE/QArFFgqAjQg0AshwAXQg0ALgoAAQgvAAgdgQg");
	this.shape.setTransform(-0.0098,-0.0259,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.3,-64.9,66.6,129.8);


(lib.uiot7t79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#897E7D").s().p("ABTFaQgQgDgTgMIgPgLQgUgMgqi4IgsjQQhaioAQhAQAGgUAPgHIAOgDQB3AiA4DjQANA1ATBwQAPBWAKASQAHAPAMArQAIAPADARQgMBJgsAAIgLgBg");
	this.shape.setTransform(22.9879,53.2394,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46,106.5);


(lib.uiltyguifyui = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-33,-0.1,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33,-0.1,65.8,255.29999999999998);


(lib.uilt7lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(0,0,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,33.1,57.5);


(lib.uilt7l8t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#926969").s().p("AguE2IgKgFIAUieQAYjGgJiEIgNhdQAKgpAaAGQAOAEAMALQAwDzgeDEQgKBJgTAwQgRArgMADQgKADgIAAQgJAAgHgDg");
	this.shape.setTransform(-0.0238,-0.0239,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.8,-48,17.6,96);


(lib.uil7tlt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BCB453").s().p("ACGBnIgCAAQiYghjGg4QAWhHAMgvIAFAKQAKANAaALQBQAmDHAOQAPgCAOAEQAcAHAPAVQAQAXgHAZQgGAZgYAMQgQAIgSAAQgJAAgKgCg");
	this.shape.setTransform(-33.7659,3.2215,1.5355,1.5355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#775A45").s().p("AA5BPQhDgCg6gOQgUgEgFgEQgEgDABgHQABgHApAFQAmAGgBgCQgCgDgZgEIgygHQgVgDgGgHQgDgDABgHQACgFAHgBQAMgBAlAHQBAAMgXgLQgFgDgngIIgvgIQgLgCgFgCQgJgDgCgHQgEgQA3AMQA4ANAAgCQAAgDhNgcQgSgGAEgKQAEgLAUAGQBYAhAfAFQASADAFgHQADgDgfgJIgogMQgQgFgIgDQgMgGAFgGQAFgGAaADIAYAEQBkAdAbAZQAfAbgRA6QgEANg3AAIgVAAg");
	this.shape_1.setTransform(-85.0064,-7.4495,1.5355,1.5355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107,-19.6,106.9,39);


(lib.uilt79t789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-33.15,-0.05,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.1,0,65.9,241);


(lib.ui79y88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#959042").s().p("AkXGXQAOhRAliNQgUhXgMhiQgZjGAhg+QAyhwAMgnIAggSQAkgRATAFIBUANQBYAIAbgYIAaACQAiAGAsAaQByBFgwDEQgYBigvBTIgUBFQgNBRAfA7IALBBQAKBIgFAoQhYAPhpAGQgoACglAAQiVAAhFgmg");
	this.shape.setTransform(0.0306,-68.3075,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.9,-136.6,85.9,136.6);


(lib.uy79y898 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-20.4,0,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.4,0,40.9,187.3);


(lib.uy79y8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E2E2E").s().p("AACDkQhfgehzg4IhggzQgPgwAChCQADiEBRhcIAGgKQA3AYC+gDQBfgCBUgGIA5BjQAYAeARAzQAaBNgDBjQgFCSiUAAQhCAAhhgeg");
	this.shape.setTransform(-0.0169,39.656,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.8,0,97.69999999999999,79.3);


(lib.uy989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#916E50").s().p("AgwBCQgMgfABgGIADgVQgDgIgCgKQgDgVAIgJQAWgVAHgEQAXgLAXASQAcAWAJAKQAJAJgDAFQgDAIgCACQgDADgKgBQAIATgCAFQgBADgHADQgHAEgCgDIgVgbQANAhgBAEQgBAFgNgBIgQgiQALArgFAFIgFAIQgDADgDgEQgDgDgGgZIgHgYIgIAKQgIAMACAGIAEAQQABAIgCAAIgFAEIgCAAQgCAAgBgEg");
	this.shape.setTransform(29.2981,50.8833,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8E3433").s().p("AAkCxIgPgDQhxh1gLiAQgDgoAHglIAIgdIBwAmQgGBrArBSQAWApAXATQALA4guAJQgJADgLAAIgMgBg");
	this.shape_1.setTransform(16.1314,27.2557,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.9,61.7);


(lib.ul979l7tt9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-33.1,-0.1,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.1,-0.1,66,241);


(lib.rtysty = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-29,-0.05,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29,0,57.7,185);


(lib.ouily7l789l8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AA7BdIgHgFQgCgBABgLQABgKADgKQADgJgKgPIgLgNQgQA9gGAIQgDAFgEgEIgIgLQgDgEAFgeIAIgdIgWAtQgRAAgCgFQgBgEAJgYIAIgXIgcAlQgDADgJgEQgJgEgCgFQgBgDAEgOIAFgOQgNABgEgEIgGgNQgEgHALgNQAMgNAlgcQAggZAeAPQAKAFAcAcQAMAMgFAcQgCANgFALIAFAcQABAFgHATIgJAaQgBAFgDAAIgCAAg");
	this.shape.setTransform(-31.474,53.8324,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#897E7D").s().p("AhECzQgvgKALg5QAXgUAXgqQAshSgGhuIBygmIAIAdQAHAmgDApQgLCDhzB2QgOAEgOAAQgKAAgKgCg");
	this.shape_1.setTransform(-16.4428,27.7805,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.2,0,44.2,68.2);


(lib.oiuy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#916E50").s().p("AgXA+QgFgCAIgbIAJgbQgZA2gQACQgKACARglIASgkQgLASgOAQQgbAigIgJQgJgIAWgcQAJgMAKgKQgnAlgLgFQgJgEAugoQAugqAOAAQARABArASQAvAVAHAPQAGAOgNASIgPAPQgdAJgagNIgVgOQgVApgJAAIgBgBg");
	this.shape.setTransform(-76.5633,76.0908,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A73A37").s().p("AjgDaIgIgsQA5gLCShsQBJg2A+gzQg9kSBTBFQAqAjA2BZIAIBSQABAmgSAhQgSAiggAUQh0BNjZB0QgpgGgPgtg");
	this.shape_1.setTransform(-35.7082,41.3743,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.1,0,93.1,85.8);


(lib.oy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C4A082").s().p("AhmCxQAHgDAOgoQAdhRAki6QAAgOAFgMQAJgaAWgMQAXgMAXAJQAXAIAJAZQAKAYgKAaIgBABIguBrQg0B5gmBdQgUgLgrgRg");
	this.shape.setTransform(-15.9867,31.4027,1.5355,1.5355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AgjBUQATgzgCgBQgCAAgRAhIgSAkQgIAQgKgFQgKgFAJgSQAohPAJgcQAEgRgFgFQgDgDgMAbIgQAlIgKAVQgHALgFgFQgGgGAGgXIAHgWQAnhcAbgXQAcgZA1AWQAPAGgMBHQgKA/gTA1QgHASgEAEQgDAEgGgCQgGgCAJgmQAJgjgBAAQgGADgQBEQgIAggOgHQgEgBAAgHQAAgLAKgiQASg4gMAQQgDAFgaBPIgFAPQgEAIgHABIgCAAQgNAAARgwg");
	this.shape_1.setTransform(-33.5214,77.8646,1.5355,1.5355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.3,-0.1,46.199999999999996,98.19999999999999);


(lib.o8y9y89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9D8A93").s().p("AhoCfIAPhjQgFg0APg2QAehtBigOIANAHQAPAKAKAPQAhAzgcBaIgEAmQgFAvAAAtQgeAPgnAKQglALgdAAQgfAAgVgLg");
	this.shape.setTransform(-16.1025,26.0574,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("Ag7FbQgVgIgKgWQgJgWAHgYQgChTAKlJQgJgmAMguIAAgEIABAAIAGgTQAUg1AmgdQAkgdAgANQAhANAJAuQAIAugUA1IgIASIgCAIQgiB4gOFBIgBAQIgBAAIgDALQgKAagWAMQgNAHgOAAQgJAAgKgEg");
	this.shape_1.setTransform(-15.2608,56.6687,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.2,0,32.2,110.6);


(lib.lktl7l75l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AAKgKQgmALgSAEQgOAFgIgEIgFgFQALADACgHQgJgDAAgFIABgEQAIAJAHgEQgJgBgBgHIAAgHIAIAIQAPAHAigJQAkgKAZAbQANAMAGAQQgegngiADg");
	this.shape.setTransform(-0.025,2.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AAWAJIg8gGQgWACgIgEIgFgEQAKADAGgBQgOgGgCgGIAVAHQgJgJgDgHIARAOQAIAGAdgBQAdgBAWAJQAWAJALAJg");
	this.shape_1.setTransform(0.025,3.0875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AAUAbQglgBgVgNQgagRgEgGIgFgFIATAKQgRgOgCgGIAVAOIgIgPQAFAIAMALQAVASAbAEQAcAEAOgEQANgDAOgBQgPAQgjAAIgEAAg");
	this.shape_2.setTransform(0.025,4.2895);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AgeAVQgdgRgJgRIgFgKIASAUQgQgYgCgFIAYAaIgEgNQAGALAOAPQANAPAcACQAeACALgIQAMgJANgGQgEAUgkAIQgLACgKAAQgXAAgUgMg");
	this.shape_3.setTransform(0.025,5.0171);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},19).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(25));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E5BFA4").s().p("AAQAAIhVAIIAAghQBJgmAwAoQAfAygZARg");
	this.shape_4.setTransform(1.5015,0.6743);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E5BFA4").s().p("AhCATIAGgKIgIgjQBIgmAwAoQAfAygZAUQgvgYhNgDg");
	this.shape_5.setTransform(1.4938,0.7993);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5BFA4").s().p("AhCAPIAGgLIgIgiQBIgmAwAoQAfAygZATQgeAJgYAAQgwAAgWgjg");
	this.shape_6.setTransform(1.4938,1.2157);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E5BFA4").s().p("Ag9AbIgEgcIAFgDIgIgjQBIgmAwAoQAfAxgZAUQgiAbgcAAQggAAgZggg");
	this.shape_7.setTransform(1.4938,2.1297);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},19).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.4,-3.7,15.9,12.100000000000001);


(lib.iuy79789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BCB453").s().p("AAxFyQgYgDgQgUQgOgVABgaIAAAAQgThEhNlkQgTgjABgzIgBgEIABgBIABgVQAIg7AfgnQAfgnAlAEQAjAFAUAtQAVAugHA7IgEAVIAAAIQgCBSAaCrQAQBpAWBqIADARIgBAAIgBAMQgDAdgUASQgSAPgUAAIgIAAg");
	this.shape.setTransform(0.0222,56.8453,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,0,36.9,113.7);


(lib.iop8898y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3AAB6").s().p("Ag4C1IgWhiQgXgvgGg3QgLhxBZgwIAOABQARAEAPALQAwAkAHBeIAJAlQANAtAPAqQgWAZggAYQg5AqgsAAIgKAAg");
	this.shape.setTransform(16.7657,27.8251,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AAtFHQgRgRgCgZIgBAAQgVg0h1lQQgWgfgGgvIgBgEIABgBIgBgUQAAg5AZgoQAYgoAjAAQAjAAAYAoQAYAoAAA5IgBAUIABAIQAHBNAuCeQAcBkAgBeIAFAPIgBAAIABAMQAAAcgRATQgSATgYAAQgXAAgQgRg");
	this.shape_1.setTransform(23.5782,55.541,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45.5,108.4);


(lib.iop8y08y0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A73A37").s().p("ABTFZQgPgIgQgTIgNgQQgUgMgri0IgtjMQhailAQg+QAFgUAOgHQAIgDAGAAQB1AhA5DeQAOA0ATBuQAPBUAKASQAIAOAMAqQAIAPgHA2QgKA7gcAAQgKAAgMgHg");
	this.shape.setTransform(22.4789,54.0391,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45,108.1);


(lib.ioy89y89y98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("AgWDNQAFgGgBgqQgChWghi6QgFgMAAgPQAAgbARgTQARgUAYAAQAYAAARAUQASATAAAbIAAACIgFB0QgGCEgCBlQgXgEgtAAg");
	this.shape.setTransform(-1.9421,31.955,1.5355,1.5355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgDBcQgBg2gCAAQgCABgEAlIgFAoQgBASgLgBQgLgCABgTQAKhZgDgdQgBgRgHgDQgEgCgBAdIgBAoIgDAYQgCANgHgDQgHgDgDgYIgCgYQAEhjARgeQASgjA4ACQAQAAAPBHQANA/ABA3QABAUgDAFQgBAEgHABQgHAAgEgmQgEglgBABQgDADACAYIAFAwQAEAfgQAAQgFAAgCgGQgDgLgCgkQgEg8gFAWQgCAEAEBUIABAQQgBAJgHADIgDABQgKAAAAgvg");
	this.shape_1.setTransform(-0.1314,81.8371,1.5355,1.5355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.9,-0.1,21.6,103.3);


(lib.ioy8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-54.7,-106.85,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.7,-106.8,109.4,213.6);


(lib.iol79y89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-29.1,-38.35,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.1,-38.3,58.3,76.6);


(lib.io8y8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("Ag0IfQgLgDgGgFQgGgGgGgNQgEgIgHjFQgIjFgEgJQgLgXgEgOQgHgVABgSQADghAhgnIAcgfQAQgSAJgPQAUgiAHg3QAGhBADgfQALhVArhKQAHgMgFgQQgDgIgLgVIgKgMIgKgNIgHgJQgEgFAEgCIAIgFQA1A9AXAxQAbA6AABDQAAAygGAlIgYCBQgLBJgBA3IgEEGQgDDhAEAkQgeAHgdAAQgkAAgmgMg");
	this.shape.setTransform(27.9893,85.2568,1.5358,1.5358);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DCB783").s().p("AhjDsQAaiUAFgMQADgHADgOIAFgWQATg9AEgvQAGg6gPg0QgThIgEgcQgHg6AQgqIgMADQgBgFAEgDQADgEAFAAQAHgBAKAHQA6AoAoA9QAnA+ALBGQAHAmgBA0QgBAfgDA7QgCA4AJAdQAEAOAGB2QAHBygCASQgngFhcAMQhpAOgaAAQAGgNAaiSg");
	this.shape_1.setTransform(-27.1919,98.5765,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.4,0,94.8,170.5);


(lib.io8y98y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#926969").s().p("AgIhVQgVgkgcgbIgWgUQAYgbAWATQAKAJAGAPQAqAtAaBUQAOApAOBQQAGAngTAcQgJAOgLAGQANidhDhxg");
	this.shape.setTransform(0.0086,-0.0306,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-28.4,24.700000000000003,56.8);


(lib.ilt68lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-47.4,-136.75,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.4,-136.7,94.8,273.4);


(lib.i808080 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EDC19B").s().p("ACoEIQAPCfgPgXQgJgOgVg+IgTg8QgLBqgOgGQgIgDgJgxIgHgwIgbgUIAPARQANATgKAHQgUAOgxggQg8gmgOhMIgGgiIiCk6IA+jgICvI8ICuAyQAkDVgNAAQgNAAgjiag");
	this.shape.setTransform(21.9474,41.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,43.9,83.7);


(lib.hmjdtyktrktuk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-23.8,0,0.2575,0.2575);

	this.instance_1 = new lib.CachedBmp_21();
	this.instance_1.setTransform(-23.8,0,0.2575,0.2575);

	this.instance_2 = new lib.CachedBmp_22();
	this.instance_2.setTransform(-23.8,-1,0.2575,0.2575);

	this.instance_3 = new lib.CachedBmp_23();
	this.instance_3.setTransform(-23.8,-0.65,0.2575,0.2575);

	this.instance_4 = new lib.CachedBmp_24();
	this.instance_4.setTransform(-23.8,-0.9,0.2575,0.2575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[]},1).wait(7));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFA477").s().p("Ag1AeQgOgIANgQQAMgOAVgIIAbgLQAIgDAPgBIAYgCQAJAAgBAEQgPAxg2ALQgOADgLAAQgNAAgHgEg");
	this.shape.setTransform(-4.5545,11.8145,0.8209,0.8209);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({_off:false},0).wait(1).to({x:-4.4045,y:13.0145},0).wait(1).to({x:-3.6045,y:15.2145},0).to({_off:true},1).wait(7));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CD573F").s().p("AhMgDICZhMIgXBpIhlA2QANgpgqgqg");
	this.shape_1.setTransform(-5.725,7.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CD573F").s().p("AhSgDICihMQANBOgtAbQgrAyg5AEQAMgpgqgqg");
	this.shape_2.setTransform(-5.1517,7.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CD573F").s().p("AhWgNICshNQAEBPggA3Qg5AWg0AZQAHg+gqgqg");
	this.shape_3.setTransform(-4.7857,8.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA8F8F").s().p("AgMBAQgfgNAEgdQgggJgCgUQgCgZAUgQQARgPAXgBQAxgDAkAdQAIAPgJAdQgIAegeARQgWAMgNAAQgEAAgEgBgAAGgdQgPABgGAFQgGAEgBACIgBACIgBACQAOAIAFAHQAFAIAAAFIABAHQAXACAFgMQAFgMgEgKQgHgTgPAAIgCAAg");
	this.shape_4.setTransform(-9.8467,11.6229);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CD573F").s().p("AgBAaIgCgHQgBgFgFgIQgFgHgNgIIABgCIABgCQAAgCAGgFQAGgEAPgBQARgCAIAVQADAKgFAMQgEAKgTAAIgDAAg");
	this.shape_5.setTransform(-9.4872,11.2273);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},5).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.8,-1,28.9,24.6);


(lib.gjhkuykuylyruliyl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("Ah4AhIgPgQQAKAJAdgCQgVgKgPgZIgJgWQALAZAyAPQgTgHgNgVIgIgUIATAWQAiASBDgSQBDgRA+AdIANAGQg0gYhUAfQhSAfAAgBQgKAGgKAAQgMAAgMgJg");
	this.shape.setTransform(0,0.0164);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AiIAdQgJgKgBgJQAIANAeABQgegHgPgdIgHgNQASAWAjASQgOgKgQgTQgHgJgEgRIAaAfQAlAmBCgNQBCgNAjgBQAkgBArAVQg+gGhAAMQg/AMg1ABIgCAAQggAAgVgMg");
	this.shape_1.setTransform(1.6,0.401);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AhAAtQgygSgRgKQgOgMgBgCQAIAFAaALQgagQgPgdIgHgNQAYAiAhAPQgOgJgMgNQgMgPgHgbQAOAbAPAPQAsAwBJABQBIACAigPQAigOAXgCQgvAehAAMQgaAFgYAAQgiAAgegKg");
	this.shape_2.setTransform(1.6,1.8357);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("Ag5A4QgbgKgOgIQgSgKgLgOQgGgFgGgJIgFgKIAOALQAMAKAKAEQgWgOgXgkIgIgOQAMARASAQQASAQAQAHQgCgEgIgHIgMgPQgUgZgGgVQAGAMANAOIAUATQAcAiAWASQAWASA2AAQA3AAAYgLQAYgMAPgNQAPgOAJAAQgJAXgdARQgaAPgmAGQgcAFgYAAQgkAAgdgKg");
	this.shape_3.setTransform(1.675,2.768);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},14).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.5,-4.1,32.4,13.5);


(lib.ghkkmtyktktuktk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AhBAAQAsgmAmAHQAnAHAOgHQAHgCAAgFIAAAGQgCAHgMAGQAUgCAFgOIAAAIQgDAKgMAHQAYAHAFgIQgDAGgGAEQgLAIgOgGQgxgUggAIQgdAIg7Aqg");
	this.shape.setTransform(0.025,-0.0125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AgvAJIA/gPQAhgIAKgFQAKgFAYgGIgVAPQALgCAUgJQgMANgNAEQARgCAFgHQgDAFgFAFQgMAIgcABQgcACgeAIQgfAIhCANQAYgOAggJg");
	this.shape_1.setTransform(0.2,0.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AhmAYQA3ALAigEQAggEATgOQATgNAGgJQAHgKAXgTIgSAZIAcgaIgUAcQANgHAFgIIgJAOQgGAIgNANQgTAUgnAIQgPADgSAAQgnAAgtgQg");
	this.shape_2.setTransform(0.125,1.4871);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AgvAxQgdgIgagZQAZAOAaAGQAXAFASgCQAdgEAPgJQAPgJAFgIIAKgOIALgTQAFgMAKgPIgMAhIAUgeIgOAeQANgHAGgQQgEAOgGAIQgGAIgLAUQgSAjgxAGQgNACgNAAQgQAAgOgDg");
	this.shape_3.setTransform(0,2.1924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},19).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(25));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E5BFA4").s().p("AhbgTQBRg+BXAYIAPBSQgrgag1AOQg3APggAlg");
	this.shape_4.setTransform(-0.8,-2.7505);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E5BFA4").s().p("AhbgTQBRg+BXAYIAPBSQgqAFg2ANQg2ANghAJg");
	this.shape_5.setTransform(-0.8,-2.7505);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5BFA4").s().p("AhbA6IAAhUQBRg+BXAXIAPBTQggAng3ALQgSAEgRAAQgiAAgbgOg");
	this.shape_6.setTransform(-0.8,-2.0483);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E5BFA4").s().p("AhbAxIAAhUQBRg/BXAYIAPBTQgZA8g4AKQgLACgKAAQgsAAglggg");
	this.shape_7.setTransform(-0.8,-1.1103);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},19).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.2,-9.2,20.799999999999997,16.7);


(lib.ClipGroup_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(3.3,0,0.1089,0.1089);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_12, new cjs.Rectangle(3.3,0,5.1000000000000005,5.3), null);


(lib.ClipGroup_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(2.05,0.45,0.152,0.152);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_10, new cjs.Rectangle(2.1,0.5,5.9,6.1), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(1.55,0.9,0.1442,0.1442);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(1.6,0.9,7.5,7.5), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A/DfFMAAAg+KMA+HAAAMAAAA+Kg");
	mask.setTransform(198.75,198.95);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgzAJIgJgcQAxgdApAYQAUANAMARQgBAHgHAIQgPAPgiAAIgBAAQglAAgSgbg");
	this.shape.setTransform(286.5,191.1947);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(280.4,187.6,12.300000000000011,7.200000000000017), null);


(lib.ClipGroup_2_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(1.6,0,0.1442,0.1442);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_0, new cjs.Rectangle(1.6,0,6.700000000000001,6.8), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3DA8AB").s().p("Ag2AbQgOAAAKgRQAKgRAPgKQASgMARAEQARAEATAOQAUANAFAPQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBABIgCABIgRgHIgcgOQgPgGgLACQgNACgJAMQgIALgMAAIgBAAg");
	this.shape.setTransform(6.2955,2.6994);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,12.7,5.4), null);


(lib.Group = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3DA8AB").s().p("AgoAhIgBgSQgBgNAJgNQAIgNAMgHQANgHAOADQAQADAJALQAFAHgDAGQgDAHgIAAQgTgBgLACQgIABgLAMQgKAKgFAKQgDAEgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAgBAAgBg");
	this.shape.setTransform(4.2263,3.7425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,8.5,7.5), null);


(lib.fgryjdsrtyjrsyj = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CD958C").s().p("Ag4AkQgKgHAHgOIAGgKQAJgJANADIAfgEQAjgKAcgZQgHATgRAUQgiAngyADQgGgBgFgEg");
	this.shape.setTransform(-1.6176,-1.5848,0.6215,0.6215,20.2067);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C28B85").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAhgbAgQgUAZggARQgJAEgGAAQgJAAgFgHg");
	this.shape_1.setTransform(-1.1412,-0.4458,0.6215,0.6215,20.2067);

	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-5.95,-2.65,0.0877,0.0877);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-5.95,-2.6,0.0877,0.0877);

	this.instance_2 = new lib.CachedBmp_15();
	this.instance_2.setTransform(-5.65,-1.9,0.0877,0.0877);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[]},1).to({state:[{t:this.instance_2}]},3).to({state:[]},1).wait(15));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_2.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_3.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_4.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},9).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_3
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CD958C").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_5.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CD958C").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_6.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD958C").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_7.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},9).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_4
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_8.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_9.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_10.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},9).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_5
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_11.setTransform(0.65,1.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_12.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11}]},10).to({state:[{t:this.shape_12}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_6
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_13.setTransform(0.55,1.0856);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_14.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},10).to({state:[{t:this.shape_14}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_7
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C25D57").s().p("AgNATIAAAAIgBgBIgBAAIgBgFQACgBgFgJIgFgBIgBgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIAAgCIACgBIAIgGIAGgEIACAAIACgBIABAAIACAAIAAAAIACAAIACAAIACgBIABAAIAGgBIAAgBIAFAAIAAgBIADgBQACACAAAEIABgBQABgCABAAQABgBABgBQAAAAAAAAQAAAAgBABIABAEIABADIgEAJIgGAFIgHACIgDAEIgDACIAAABIgCABIgCABQgBADgFABIgEABg");
	this.shape_15.setTransform(0,-0.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_16.setTransform(0.2313,-0.2179);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_17.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},9).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-2.8,9.4,7.8);


(lib.fgnhjrdjrtjrejy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AiIA7QApgqBSgNQBQgNAcgiQAOgQgCgNQAHAogdAbQAugmADgfQAFAxgfAfQAjgKAFgQQgCAOgIAMQgRAagegFQg4gBg9ADQhTADgmArg");
	this.shape.setTransform(0.225,0.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AhnAvQA8gdBJgSQBLgUASgVQASgVAJgTQgJApggAUQArgTAQgqQgBAwgpAUQAhgJAKgSQACAFgNATQgNATgmgBQg9AGhIAaIiOAwg");
	this.shape_1.setTransform(-1.3862,3.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AioBSIBfgCQBLgLAzgwQAzguAPgTQAQgUAHgRQAAAlglAdQAygdAEgxQAKA2hBAlQA6gaAHgkQADAXgRATQgRASglANQgfAyhYAYQgsALglAAQgmAAgfgMg");
	this.shape_2.setTransform(-1.6093,3.7787);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AhbBoQgrgIgcgcQAyAYAtADQBcAAArhBQArhAAJgUIAUgsQgDAjgZAmQAfgnAKgqQAFAvgtAuQAughADgrQABAcgMAVQgLAUgXARQgXApgaAXQgdAagqAMQgcAIgaAAQgRAAgRgDg");
	this.shape_3.setTransform(-2.2993,5.1811);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#171714").s().p("AiIA7QApgqBSgNQBQgNAcgiQAOgPgCgOQAHAogdAbQAugmADgfQAFAxgfAfQAjgKAFgQQgCAOgIAMQgRAagegFQg4gBg9ADQhTADgmArg");
	this.shape_4.setTransform(0.225,0.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},14).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_4}]},1).wait(30));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ECBE97").s().p("AiDg3IDbg3IAvCDQiHATiGBHg");
	this.shape_5.setTransform(-4.525,0.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#ECBE97").s().p("AiFBuIAIisIDbg3IAnCLQg5BAhCAVQggALgnAAQgiAAgmgIg");
	this.shape_6.setTransform(-5.15,1.1208);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ECBE97").s().p("AiFBiIAIisIDbg3IAnCLQgYBYhMAYQgZAIgaAAQg2AAg9ggg");
	this.shape_7.setTransform(-5.15,2.3099);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},14).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[]},1).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.5,-10.7,34.1,26.6);


(lib.hjdryjryjrdjcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgaAoQhNgIAQg2QAGgWA3AEQA9AGA4ArQgkAhg5AAIgYgCg");
	this.shape.setTransform(-0.0126,-0.0194);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgaAfQhNgIAQg2QAAgCAMADQAMADAoAAQAmAABMAbQgkAhg5AAIgYgCg");
	this.shape_1.setTransform(-0.0126,0.8713);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZAfQhNgIAQg2QABgCALAHQALAHAlALQAkAKBQAAQgiAeg4AAIgZgBg");
	this.shape_2.setTransform(-0.1376,0.8949);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.1,-4.1,18.2,8.3);


(lib.hjdjrrsyjsykcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#68513A").s().p("AA7AoIgDgGIgLgPQgLgMgUgHQgSgGgSAAIgVABIgPgFQgNgEAUgNQATgOAWABQAWAAARAKQAPAJALARQALARgCAQQgCAMgCAAIgBgBg");
	this.shape.setTransform(4.7037,3.6775,1,1,2.2378);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#68513A").s().p("AA5AoIgEgFIgQgLQgPgKgQgGIgggKQgQgEgHgBQgIgBgEgGQgDgGAQgJQAQgJAWgCQAUgBARAKQAPAJALARQALARgCAQQgCANgCAAIgBgBg");
	this.shape_1.setTransform(4.6753,4.0308);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#68513A").s().p("AA3ApIgGgBIgRgFQgRgEgQgIQgRgHgPgJQgQgIgHgGQgHgGAEgEQAEgEAMgIQANgJAUgCQAUgCARAKQAPAJALARQALARgDAQQgCAOgDAAIgBAAg");
	this.shape_2.setTransform(4.7345,4.1486);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#68513A").s().p("AAYAvQgQgBgRgHQgTgGgQgPQgRgPgBgLQgBgNAFgFQAGgFALgHQAMgHAVgCQATgCARAKQAPAJALARQALARgCAQQgDAQgGAFQgGAFgEABIgHABIgNgBg");
	this.shape_3.setTransform(4.6123,4.8145);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-0.5,12.7,10.1);


(lib.hgmkjdkdytktuy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1C1A").s().p("Ag1gDQApglAkAIQAqAKAIgHQAAAHgHADIAEABQAFABAHgFQAAAKgIABIAGABQAGAAADgBQgHALgRgDQgsgVgdAJQgWAHg7Aqg");
	this.shape.setTransform(0.0222,-0.0169,2.0882,2.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1C1A").s().p("AgTgBQAigNAZgHQAZgHASABQAAADgKAEIAPgFQgDAIgMACIAIgBQAGABADgCQgHAMgQgBQgjADgbAGQgZAIhEARg");
	this.shape_1.setTransform(0.0222,1.174,2.0882,2.0882);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1C1A").s().p("AhaAdIBXgOQAhgGASgMIAkgaQgCAFgLAIIASgKQgDAIgLAJQALgFAFgFQgJAPgMAHQgMAJgaAJQgYAJhSAAIgQgBg");
	this.shape_2.setTransform(0.1355,1.3244,2.0882,2.0882);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1C1A").s().p("AhYARQA+ARAlgFQAmgEANgXQANgWAIgTIgHAZIAMgWQAAAFgGATQAFgPADgBQgCAMgGAOQgKAXgjAMQgRAHgUAAQgmAAgygXg");
	this.shape_3.setTransform(-18.35,7.1,2.0882,2.0882,4.4424,0,0,-8.8,1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1D1C1A").s().p("AgTgBQAigNAZgHQAZgHASABQAAADgNAEQAGgBAMgEQgDAIgMACIAIgBQAGABADgCQgHAMgQgBQgjADgbAGQgZAIhEARg");
	this.shape_4.setTransform(0.0222,1.174,2.0882,2.0882);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},20).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape}]},1).wait(29));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7ABBB8").s().p("AhbgfQA9gxBeAEQBWgHAOBRQh1AGjSBKQAAg6BIgzg");
	this.shape_5.setTransform(-1.275,-0.9745);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7ABBB8").s().p("AhZgiQA8gyBeAFQBWgHAQBHQhGBZkHAHQAFhABIgzg");
	this.shape_6.setTransform(-1.4,-0.6528);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7ABBB8").s().p("AiuA6QAFg/BIg0QA9gxBdAEQBWgHAgBYQgHBfhiAXQgbAHgeAAQhRAAhqgug");
	this.shape_7.setTransform(-0.625,1.6135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},20).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.8,-8.7,38.1,22);


(lib.hgjdtyekjtykekucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("Ag5AVQATghAlgFQAjgFANgQQAEgDABgLIAAALQgCANgIAIQAVgTABgOIAAANQgCAPgJAJQAPgEADgHIgEALQgHAMgOgBQg3AEgHACQgmALgQAqQADgQAKgRg");
	this.shape.setTransform(0.0308,-0.0009,2.023,2.023);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AgjATQAagQAZgGQAagHAGgSIAHgYQgBAZgJALQAOgLAKgRQgEAXgNAJQANgFAGgOQABAKgGAJQgFAJggAHQgeAIgSALIg0AeQALgSAZgQg");
	this.shape_1.setTransform(0.191,0.252,2.023,2.023);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AhJAvIApgHQAfgHAXgVQAYgUAEgNIAKgcIgKAnQAMgMAIgTQgCASgMASQAKgIAIgPIgGAQQgDAKgaAQQgZASgWALQgOAHgUAAQgOAAgRgDg");
	this.shape_2.setTransform(0.663,1.3903,2.023,2.023);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("Ag7AtQAUAFASgIQAUgKASgTQAKgMAIgTQAGgQAEgTQAFARgJAYQAMgMgCgUQAIAKgLAbQAJgGADgPQADASgWATQgWATgaARQgNAJgNAAQgOAAgMgJg");
	this.shape_3.setTransform(0.4153,3.9307,2.023,2.023);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#171714").s().p("AhJAvIApgHQAfgHAXgVQAYgUAEgNIAKgcIgKAnQAMgMAIgTQgCASgMASQAKgIAIgPIgGARQgEAKgZARQgZARgWALQgOAGgTAAQgPAAgRgDg");
	this.shape_4.setTransform(0.663,1.3965,2.023,2.023);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},34).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(10));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#916E50").s().p("Aibg8IFEhNIguCEIijAvQg6AwgDAwQhgg0AqiSg");
	this.shape_5.setTransform(-4.0579,-2.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#916E50").s().p("Aibg8IFEhNIg1CdIiBAxIhYBFQhgg0AqiSg");
	this.shape_6.setTransform(-4.0579,-2.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#916E50").s().p("Aibg8IFEhNIg0C2QgOA9hNARIh/APQhgg0AqiSg");
	this.shape_7.setTransform(-4.0579,-2.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#916E50").s().p("AhNCQQh5hKAqiSIFEhNIg0C1QgOA9g8AtQgfAUgjAAQgZAAgcgKg");
	this.shape_8.setTransform(-3.9584,-1.294);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5}]}).to({state:[{t:this.shape_6}]},34).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.9,-16.7,36.599999999999994,31.5);


(lib.gjkfujyulicopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8D6463").s().p("AhRgKQgBgFABgBQABgCAEgBQANgDAPABQAMAAARAEIAgAFQAQABAPgEIAVgFQAPgEACgEQgRAshBALQgLACgLAAQguAAgNgng");
	this.shape.setTransform(-0.038,-5.0764,2.0882,2.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#967575").s().p("AhEAlQgKgXAYgNIAHgCQANgEAcAAQAcgBAcgXQAOgMAIgMQACAtgrAdQgUAPglAOQgKAEgIAAQgRAAgHgRg");
	this.shape_1.setTransform(2.0914,-0.0274,2.0882,2.0882);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#967575").s().p("Ah3BuQgggrAsgmQA5gCA3gVQA5gUAdguQAeguAHgbQAXBXhKBQQgjAnhHAsQgbARgVAAQgaAAgQgYg");
	this.shape_2.setTransform(16.9,-11.25,1,1,-1.7042,0,0,12.8,-13.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8D6463").s().p("AhUgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFQARACAKgBQALAAAQgFIAXgFQgYAmhAALQgNACgKAAQgvAAgMgog");
	this.shape_3.setTransform(0.7451,-4.3977,2.0882,2.0882);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#967575").s().p("Ah4B3QgfgqArgmQA6gCA3gVQA4gVAeguQAeguAIgtQAVBqhKBQQgiAnhIAsQgaAQgVAAQgaAAgRgYg");
	this.shape_4.setTransform(18.5,-8.05,1,1,-1.7042,0,0,12.8,-12.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8D6463").s().p("AhXgOQgBgEABgCQABgCAEgBQAMgDAQABQALABASADIAfAFIAcADQAKABARgEQAQgFALgBQgdAjhAALQgMACgLAAQguAAgNgog");
	this.shape_5.setTransform(1.2672,-4.3716,2.0882,2.0882);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#967575").s().p("Ah5B+QgggqAsgmQA5gCA3gVQA5gWAegtQAdguANg7QARB4hKBQQgjAnhHAsQgbAQgVAAQgZAAgRgYg");
	this.shape_6.setTransform(19.05,-5.95,1,1,-1.7042,0,0,12.6,-11.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8D6463").s().p("AhZgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFIAbAEQALACAQgFIAhgIQgiAkhAALQgMACgLAAQguAAgNgog");
	this.shape_7.setTransform(1.737,-4.3716,2.0882,2.0882);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#967575").s().p("Ah6CHQgfgrArgmQA5gCA4gVQA4gVAegtQAegvAOhLQAPCIhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgXg");
	this.shape_8.setTransform(20.05,-4.45,1,1,-1.7042,0,0,12.6,-10.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(8));

	// Layer_2
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ah0ADQCigBBIhcQgIA+gXAaQhABLhsASQgIgwgXgog");
	this.shape_9.setTransform(5.05,-1.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("Ah2AJQCigBBLhTQgKAwgrArQgrAshnAQQgPgcgXgng");
	this.shape_10.setTransform(5.25,-1.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ah5AGQCigBBRhMQgQApgrArQgqAshoAPQgPgbgXgng");
	this.shape_11.setTransform(5.525,-1.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[]},1).wait(8));

	// Layer_5
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgPQAMgOAMgKIAMASQgIAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_12.setTransform(9.75,5.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgOQAMgPAMgKIALASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_13.setTransform(9.65,6.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},3).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(8));

	// Layer_4
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#BB6F6F").s().p("AhBAPQAVgfAqgMQAogMATABQATAWgWATQgqAkg2ACQgRgFgGgUg");
	this.shape_14.setTransform(8.2349,6.917);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BB6F6F").s().p("Ag/AUQASghApgOQAngPATAAQAVAVgVAUQgoAmg2AGQgRgDgGgUg");
	this.shape_15.setTransform(9.2003,8.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BB6F6F").s().p("AhAAUQATghApgOQAngPATAAQAVAVgWAVQgnAlg2AGQgRgEgHgTg");
	this.shape_16.setTransform(8.8003,8.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},2).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[]},1).wait(8));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#AF3838").s().p("Ag6BkQgFgDgDgGQgEgHgBgOQgCgOgDgJIgHgTQgDgKgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAjgRQAdgNACgHQABgGACAHQACAGgBAKQgBASgDAGIgEAMQgJAYgIASQgIAPgMATQgNATgMAKIgjAZQgTAMgXADIgFAAQgGAAgCgBg");
	this.shape_17.setTransform(8.4692,0.3906);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#AF3838").s().p("Ag7BZQgBgPgIgTQgJgTgEgBQgEgBgDgKQgDgKgHgIIgGgGQgDgFABgDQABgDAHgFIAMgHQAdgPAggMQA0gOAkgPQApgQADgDIgCAPQgBAJgRAvQgQAtgGAJQgEAGgOAKIgUAOIgjAZQgTALgXADQgJABAAACg");
	this.shape_18.setTransform(8.9525,0.8125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AF3838").s().p("AhABaQgBgPgIgTQgJgTgEgBQgEAAgDgKQgDgLgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAkgOIAhgNQATgHACgDQgJB4gXAHQgYAIgOAJIgUAOIgjAZQgTAMgXADQgJABAAACg");
	this.shape_19.setTransform(9.4525,0.6625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#967575").s().p("AgFBWQgugFgUgpQgTgqATgkQASggAigOQARgFARAFQArASAQAsQASAugZAjQgVAdgjAAIgQgCgAgegGQgGAgAbALQAaAMAOgeQAMgcgTgPQgVgNgNgBIgBAAQgOAAgFAgg");
	this.shape_20.setTransform(1.1103,0.5369);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#AF3838").s().p("AgLAkQgagLAFggQAGghAPABQANABAUANQAUAPgNAcQgKAWgRAAQgFAAgIgEg");
	this.shape_21.setTransform(1.2969,0.6061);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},2).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[]},1).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-11.2,38.1,34.099999999999994);


(lib.ghstshqw12313copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AAAAcQg3gMgQguQACAFAfAJQANAFAPgCIAbgEIAZgEQAOgBALAEQAEABAAACQABACgBAEQgKAognAAQgKAAgMgDg");
	this.shape.setTransform(0,-2.494);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AAZA0QghgOgSgQQgmgfACguIAUAYQAYAZAYABQAoACACAFQAVAPgIAXQgGAQgOAAQgHAAgJgEg");
	this.shape_1.setTransform(-0.8304,0.025);

	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-7.45,-5.65,0.1424,0.1424);

	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(-7.45,-5.7,0.1424,0.1424);

	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(-7.55,-5.8,0.1424,0.1424);

	this.instance_3 = new lib.CachedBmp_11();
	this.instance_3.setTransform(-7.65,-5.85,0.1424,0.1424);

	this.instance_4 = new lib.CachedBmp_12();
	this.instance_4.setTransform(-8.15,-5.05,0.1424,0.1424);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},17).to({state:[]},1).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AACALIgLgEIgHgBIgJgDQgEgBgBgDIgBgCIABgEIABgBQABgCADgBQAfAJAZgBQgCADACACQACADgCADQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBIgCADIgCABIgEABIgNgBg");
	this.shape_2.setTransform(-1.0177,4.3728,1,1,10.4691);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AANAPQgJgBgEgCIgLgGIgHgCQgEgCgDgCQgEgCAAgEIAAgCIAAgEIABgBQACgBAEgBQAcAPAZADQgCACABADQACAEgEACQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBIgCACIgDACg");
	this.shape_3.setTransform(-1.1,4.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},23).to({state:[{t:this.shape_3}]},1).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BB6F6F").s().p("AgXAEQgFgFADgIQAOgGAQAGQAQAFAGAEQACALgMACIgIAAQgRAAgPgJgAAAABIANADIAAgBIgGgHg");
	this.shape_4.setTransform(-1.225,3.537,1,1,10.4691);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BB6F6F").s().p("AgXACQgGgGABgGQAUgDAQAFQARAFAEAHQAAAGgMABIgHABQgRAAgQgKg");
	this.shape_5.setTransform(-1.3208,3.6327,1,1,10.4691);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BB6F6F").s().p("AARAPQgVgBgQgOIgGgHQgEgEACgDQAYAAAQAJQAPAGADAJQgBAFgKAAIgCAAg");
	this.shape_6.setTransform(-1.6205,4.0771);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},22).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).wait(1));

	// Layer_2
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#916E50").s().p("AgJAWQgNgGgGgHQgGgIgDgJQgCgKAFgFIAAAAIAGACQAIACAHgBQAHgCADgDIAAACQACAKACACQADABAGgBQAGgCADgJIACAAIANAEQAIAKgGAQQgGARgQABIgFAAQgLAAgHgEg");
	this.shape_7.setTransform(-0.6981,4.0197);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#523F31").s().p("AASAcIgCgBIADgGQADgFAAgHQAAgHgCgCIgDgCQgBgBgFAAQgFAAgGAJQgHAJABAJQgDADgHACQgIACgHgDIgGgCQgEgJADgKQADgJAOgOQAPgPAXABQAXABAAAWQABAVgKARIAAAAIgNgDg");
	this.shape_8.setTransform(-0.37,-1.0026);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF3838").s().p("AgJAVQgDgCgBgKIAAgCQgBgIAHgKQAGgJAFAAQAFAAABABIADADQACACAAAHQgBAHgCAEIgDAGQgDAJgGACIgFAAIgEAAg");
	this.shape_9.setTransform(0.3496,0.7365);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AF3838").s().p("AgoAJIgMgyIBpAbQgbAYAMAgg");
	this.shape_10.setTransform(-1.7,-0.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AF3838").s().p("AggAOIgWgvIBsAHQgVAcARAdQgMADgLAAQgdAAgegUg");
	this.shape_11.setTransform(-2.2441,-0.2417,1,1,10.4691);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#AF3838").s().p("AggAJIgWgvIBsAHQgRAuASAYQgwgDgngbg");
	this.shape_12.setTransform(-2.313,0.2692,1,1,10.4691);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#AF3838").s().p("AgkgBQgfgsATgHIBpAbQgbAyALAcQg1gCgYg0g");
	this.shape_13.setTransform(-2.0574,0.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},9).to({state:[]},1).to({state:[{t:this.shape_10}]},11).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.1,-5.8,15.6,13.7);


(lib.ghmktuktuku = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1C1A").s().p("AAGgIQgHAAg2AOQgGACgHgEIgGgEQAFACAJgDQgEAAgEgFIgEgEQAJADAHgCIgKgHIALABQARAAAZgGQAjgIAeAaQAPAMAIAPQgdgigoACg");
	this.shape.setTransform(0.0071,0.0176,2.0882,2.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1C1A").s().p("AAHAKQgXABgWgDQgXgEgHgDIgGgDQAFACAJgBQgGgBgDgFIgDgGQAJAGAHABQgIgGgCgHQAIAJANAEQAJADAagDQAZgCAaAHQAaAHAIAOQgsgLgYABg");
	this.shape_1.setTransform(0.0071,0.7362,2.0882,2.0882);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1C1A").s().p("AA2A6QhDgDg6gfIhCglIgWgRIAXAKQAFACAEAAIgIgHQgKgGgCgNQATATALABQgPgOgCgTQAKAVAtAZQAsAZAxAKQAyALAigFIA+gJQgkAlg/AAIgHAAg");
	this.shape_2.setTransform(-0.525,2.2938);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1C1A").s().p("Ag+AdQhCg0gJgGQgNgMgGgLQAPAOAFACIAKADQAAgCgHgFQgGgFgIgQQAZAUAJABQgLgMgKgVQATAUAbAhQAcAgA5AaQA4AaAwgPQAxgPAHgfQAAA7hNAKQgNACgMAAQg9AAg4gtg");
	this.shape_3.setTransform(-0.3,3.8278);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},20).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7ABBB8").s().p("AiAALQAhgeAvgRQA5gYA7AVQA/AggCA5QgxgqjQADg");
	this.shape_4.setTransform(2.5282,-0.1097);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7ABBB8").s().p("AiEAAQApgcAvgQQA5gYA7AVQA/AfgCA1Qg4AVg0AAQhUAAhJg6g");
	this.shape_5.setTransform(2.1299,0.7452);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7ABBB8").s().p("AARBIQhKgNhLhKQApgdAvgQQA5gYA7AVQA/AfgCA1QggA1g7AAQgMAAgNgCg");
	this.shape_6.setTransform(2.1299,2.3258);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},20).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-5.1,32.1,16.4);


(lib.ghkmtktrykucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag5ASIgIgOQAMgTAYgJQAtgTAyAeIgPAVQgXAWgjACIgHAAQgeAAgNgOg");
	this.shape.setTransform(0.025,0.0267);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag5ALIgIgNQAMgJAjgJQAjgKAxAKIgPAVQgXAXgjACIgHAAQgeAAgNgPg");
	this.shape_1.setTransform(0.025,0.6668);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag5AJIgIgNQASAGAlgFQAlgGAngNIgPAWQgXAVgjACIgHAAQgeAAgNgOg");
	this.shape_2.setTransform(0.025,0.9358);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.6,-3.2,13.3,6.5);


(lib.fjfdgjdftjdfjcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A93F74").s().p("AA7AoIgDgGIgLgPQgLgMgUgHQgSgGgSAAIgVABIgPgFQgNgEAUgNQATgOAWABQAWAAARAKQAPAJALARQALARgCAQQgCAMgCAAIgBgBg");
	this.shape.setTransform(4.7037,3.6775,1,1,2.2378);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A93F74").s().p("AA5AoIgEgFIgQgLQgPgKgQgGIgggKQgQgEgHgBQgIgBgEgGQgDgGAQgJQAQgJAWgCQAUgBARAKQAPAJALARQALARgCAQQgCANgCAAIgBgBg");
	this.shape_1.setTransform(4.6753,4.0308);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A93F74").s().p("AA3ApIgGgBIgRgFQgRgEgQgIQgRgHgPgJQgQgIgHgGQgHgGAEgEQAEgEAMgIQANgJAUgCQAUgCARAKQAPAJALARQALARgDAQQgCAOgDAAIgBAAg");
	this.shape_2.setTransform(4.7345,4.1486);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A93F74").s().p("AAYAvQgQgBgRgHQgTgGgQgPQgRgPgBgLQgBgNAFgFQAGgFALgHQAMgHAVgCQATgCARAKQAPAJALARQALARgCAQQgDAQgGAFQgGAFgEABIgHABIgNgBg");
	this.shape_3.setTransform(4.6123,4.8145);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-0.5,12.7,10.1);


(lib.fgyjrtyj5sewkjew4copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhUgQQADgcAzgDQA4gDA7AvQgiAyhFABIgCAAQhFAAAFhAg");
	this.shape.setTransform(0.0146,0.024,2.023,2.023);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhUgbIAHgEQAJgEAOAFIARgCQARgFAhAAQAhABAnAXQgiAyhFABIgCAAQhFAAAFhBg");
	this.shape_1.setTransform(0.0146,2.1643,2.023,2.023);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhUggQAKAKAGABIATAGIAaAMQASAGAegGQAfgHAdgIQgiAyhFABIgCAAQhFAAAFhBg");
	this.shape_2.setTransform(0.0146,3.1273,2.023,2.023);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhSgGQAGACAPAMIAYANQAaAFAlgOQAmgNATgYQgmAyg5ABIgDAAQg4AAgLggg");
	this.shape_3.setTransform(0.3577,4.4685,2.023,2.023);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},34).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.2,-9.7,34.4,19.5);


(lib.fghndfgmjdhjcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AAMgIQgfgFgrAaQgMAIgNgIIgIgJQAFAFAQgCQgLgFgKgMIgGgNQAHANAcAIQgKgEgIgLIgFgLIALAMQATAIAlgMQAkgNAwAeQAXAOARASQhCgigYgDg");
	this.shape.setTransform(-0.0354,0.0153,2.023,2.023);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AB1AdQhLgRgYABQgYABgmALQgnALgZABQgaABgVgIIgYgMQgNgEgEgHQALAEAjAEQgegNgKgPIgMgTQAOAVA2AOQgQgGgVgZIgRgVIAdATQArAtBEgRQBDgTBHATQBHARAqAjIhWgVg");
	this.shape_1.setTransform(0.2625,0.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AguA+QgtgKgbgNIgogVQgOgGgHgFQgIgFgPgQQAUAGAZALQgegOgRgjQAaAYAYAJQgKgFgKgOQgNgSgFgSIAiAcQApAlA6AYQA4AZA3gFQA3gEBigSQgTALgpARQgpAQg1AFIgfABQgiAAgggHg");
	this.shape_2.setTransform(0.225,3.9729);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("Ag2BVQgugQgbgWIgmghQgNgMgIgKQgIgKgKgaQAZAkAJAGIglhCIAvA5QgJgVgLgTQgKgUgJgWIAcAtQAmA+A2AeQA2AdBDgEQBDgFBjhPQgNATgmAmQgnAlhAALQgZAEgXAAQggAAgcgJg");
	this.shape_3.setTransform(-0.075,7.4124);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},34).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(10));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#916E50").s().p("AiFAvIhOiEQCVgdCLAdQB6AyANCIQiiiRi3Bbg");
	this.shape_4.setTransform(-0.575,-4.2327);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#916E50").s().p("AAfAzQhlAsg/gwIhOiEQCVgdCLAdQB6AyANCIQhlg3hQAFg");
	this.shape_5.setTransform(-0.575,-4.2327);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#916E50").s().p("AAYB1Qhegpg/gRIhOijQCVgeCLAeQB6AyANCIQhOAmhHAAQgUAAgTgDg");
	this.shape_6.setTransform(-0.575,-2.314);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#916E50").s().p("AiJBRIhKjWQCVgdCLAdQB6AyANCIQgbBEilAcQhUgIhJg8g");
	this.shape_7.setTransform(-0.575,0.5673);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},34).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.7,-14.3,42.4,31.1);


(lib.FGHMDFGHMJDTUMKTUKMcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AA/AWQgFgDgOgLQgYgRgagBQgbgBhBARIApgUQAzgSAhAQQAhAQANgCQAMgDAGgFQgKALgQAEIAIAAQATgDAHgGQgMASgUABIAIACQAKACAHgCQgGAFgIACIgEAAQgFAAgGgCg");
	this.shape.setTransform(9.975,-2.3646);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AAoAIQgfgIgggDQghgEgrABIAxgGQArgDAeAIQAfAHAPgFIASgIQgCAKgUACQASABASgFQgNALgWgCQABAEAQAAIAOgEQgFAFgKAEIgJABQgMAAgVgGg");
	this.shape_1.setTransform(10.05,-1.2427);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AgZAJQghgEgqgQIA3AGQAcAFAjAAQAjAAAPgGQAPgGASAGQgMgCgaAIQATgFATACQgNAEgXAEIAiAAQgmAGgXABIgPAAQgXAAgZgDg");
	this.shape_2.setTransform(10.15,-0.6726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AgMAeQgugGgog3QAeAZAfAPQAfARAdgKQAdgKAOgRQAOgTATAGQgOgDgWAXQAZgVAKAEQgJADgVAQQAOgKAOAAQgWAKgVATQgQAPgeAAIgTgCg");
	this.shape_3.setTransform(10.425,1.1213);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},31).to({state:[]},1).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.8,20.3,9.1);


(lib.fghdrjreyjwrcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#68513A").s().p("ABDAhQgLgGgIgHIgJgHQgJgGgMgDQgLgEgUACIgfAFQgKACgLAFQgLAEgDAAQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAIgQAagPQAZgOAWgDQAYgCAXAPQAVAOAMAXQADAIgCAHQgBAEgEAAQgEAAgFgCg");
	this.shape.setTransform(8.2187,3.4736);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#68513A").s().p("ABOAoQgJgBgWgFIgOgBIgZgFIgbgGQgNgDgJABQgIABgQgBQgPgCgEACQgDgKAHgJQAIgIAagPQAZgOAWgDQAYgCAXAPQAVAOAMAXQADAIACALQABAKgIAAIgBAAg");
	this.shape_1.setTransform(8.1394,3.9843);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#68513A").s().p("ABNAtQgMgBgKgEIgRAAQgPACgHgBIgYgEIgegEQgMgBgOgGIgVgHQgCgOAHgIQAHgJAbgPQAYgOAWgDQAZgCAWAPQAVAOAMAXQAEAIACAQQADAPgLAAIgBAAg");
	this.shape_2.setTransform(8.1895,4.4966);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#68513A").s().p("AgMA6QgTgJgNgKQgMgKgLgLIgVgUQAAgNAIgIQAHgJAagPQAZgOAWgDQAYgDAXAQQAVAOAMAYQADAHAEAWQAEAWgIABQgHABgMALIgPALQgMADgPABIgDAAQgOAAgRgIg");
	this.shape_3.setTransform(8.2041,6.5372);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,0,17.700000000000003,13.1);


(lib.FDSGJSTJRWTJRYTJcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AAPAAQgJgBgxgCQgNABgIgKIgEgKQADAGAOAEQgIgIgDgMIgCgLQACALAVAPQgIgGgCgLIgBgJIAGAMQANANAhAEQAjAEAUAbQALAOADANQgSgjgkgJg");
	this.shape.setTransform(0,-0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AAQAPQgXgJgkgJQgNABgIgKIgEgKQADAGAPAFQgLgGgBgPIgBgJQACAMAPAQQgEgKgBgLIgBgJIAEAOQAGAVAiAFQAhAEAUAPQAVAPADANQgdgVgYgIg");
	this.shape_1.setTransform(0,-0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AAUAjQgRgFgLgHQgQgIgVgRQgIgBgIgKQgEgEgBgGQgBgGACgCQABAHAFAGQAFAIAGACQgOgKAAgKQAAgKAGgFQgEASAPANQgIgLgBgMIABgIIAEAOQAGAXAfAPQAYANAZALQATAIAMADIgEAAQgNAAgfgJg");
	this.shape_2.setTransform(0.1333,-0.0156);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AAfAzQgcgCgQgOQgSgPgNgQQgNgOgEgHQgEgIgBgGQgBgGACgCQABAOAPATQgNgaAAgFQgBgGAFgGQgEASASAXQgJgPAAgbQAGAaAKASQAFAVAeARQAcARASgFQATgGAEgEQgHARgYAAIgFAAg");
	this.shape_3.setTransform(0.1083,0.7701);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},31).to({state:[]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.9,-4.4,13.8,10.3);


(lib.Group_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2EA3A7").s().p("AhEAmQgDgCABgCQACgSATgVQARgUASgJQATgJAXAIQAVAHAPASQAQARgTAPQgTAOgNgUQgXgggZAUIgVATQgNAMgKAFIgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBg");
	this.shape.setTransform(7.1371,4.0261);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,14.3,8.1), null);


(lib.Group_1copy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A93F74").s().p("ABDAhQgLgGgIgHIgJgHQgJgGgMgDQgLgEgUACIgfAFQgKACgLAFQgLAEgDAAQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAIgQAagPQAZgOAWgDQAYgCAXAPQAVAOAMAXQADAIgCAHQgBAEgEAAQgEAAgFgCg");
	this.shape.setTransform(8.2187,3.4736);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A93F74").s().p("ABOAoQgJgBgWgFIgOgBIgZgFIgbgGQgNgDgJABQgIABgQgBQgPgCgEACQgDgKAHgJQAIgIAagPQAZgOAWgDQAYgCAXAPQAVAOAMAXQADAIACALQABAKgIAAIgBAAg");
	this.shape_1.setTransform(8.1394,3.9843);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A93F74").s().p("ABNAtQgMgBgKgEIgRAAQgPACgHgBIgYgEIgegEQgMgBgOgGIgVgHQgCgOAHgIQAHgJAbgPQAYgOAWgDQAZgCAWAPQAVAOAMAXQAEAIACAQQADAPgLAAIgBAAg");
	this.shape_2.setTransform(8.1895,4.4966);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A93F74").s().p("AgMA6QgTgJgNgKQgMgKgLgLIgVgUQAAgNAIgIQAHgJAagPQAZgOAWgDQAYgDAXAQQAVAOAMAYQADAHAEAWQAEAWgIABQgHABgMALIgPALQgMADgPABIgDAAQgOAAgRgIg");
	this.shape_3.setTransform(8.2041,6.5372);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,0,17.700000000000003,13.1);


(lib.Group_1_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2EA3A7").s().p("AAbAkQgIgEgHgHIgMgNQgGgGgKABIgRAEQgJACgGgHQgFgGAEgIQAHgQARgHQARgIAPAFQAPAFAOANQAOANACAOQABALgHAJQgGAGgHAAIgGgBg");
	this.shape_1.setTransform(5.1493,3.6865);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1_1, new cjs.Rectangle(0,0,10.4,7.4), null);


(lib.ClipGroup_13copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(4.45,0,0.1468,0.1468);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_13copy, new cjs.Rectangle(4.5,0,6.699999999999999,6.3), null);


(lib.ClipGroup_11copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(3.3,0.1,0.1468,0.1468);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_11copy, new cjs.Rectangle(3.3,0.1,7.500000000000001,7.1000000000000005), null);


(lib.ClipGroup_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(1.5,0,0.1322,0.1322);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(1.5,0,6.6,6.6), null);


(lib.ClipGroup_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(2.5,0.45,0.1322,0.1322);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(2.5,0.5,7.300000000000001,7.4), null);


(lib.ClipGroup_3copy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(3.05,0,0.1439,0.1439);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3copy2, new cjs.Rectangle(3.1,0,6.5,6.6), null);


(lib.ClipGroup_1_0copy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(7.35,0.5,0.141,0.141);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0copy2, new cjs.Rectangle(7.4,0.5,7.299999999999999,7.4), null);


(lib.ghjdtjtyktyktutcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AggAhQgGgUABgSQABgSALgRQAKgRAXgBQAPAGAHASQAGASABAOQAEAigLANQgLAOgWABQgWgFgHgWgAACAVQAKAIADgNQAEgMgNgcQgPAYALAVg");
	this.shape.setTransform(20.0532,0.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#971B30").s().p("AgEAWQgMgWAQgXQANAcgEAMQgCAHgFAAQgCAAgEgCg");
	this.shape_1.setTransform(20.7194,0.7442);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#604A3E").s().p("AiVgSQAYAGAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgKAAQhvAAgnhBg");
	this.shape_2.setTransform(16.7311,-4.0094,0.6832,0.6832);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#AF856A").s().p("AA9BAQhLgMglgQQhUgjgDhCQASAPAbAOQA4AdAzgHQA1gGAYACQAMABACACQAVAGAIAPQAIAOgGAPQgNAfgpAAQgKAAgLgCg");
	this.shape_3.setTransform(15.926,-0.8023,0.6832,0.6832);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#604A3E").s().p("AidgcQAoAQAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAg2hLg");
	this.shape_4.setTransform(16.289,-4.0391,0.6832,0.6832);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AF856A").s().p("AAxBVQhHgbghgXQhKgzgEhMQAZAtAmAWQAmAVA1AEQA2AEAQAEQAQAFACACQATAKAFASQAEAPgJAOQgOAVgbAAQgQAAgWgIg");
	this.shape_5.setTransform(5.6,-6.25,0.6832,0.6832,3.7034,0,0,-13.3,-9.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AiigbQAyAPAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAhAhKg");
	this.shape_6.setTransform(15.9303,-4.0391,0.6832,0.6832);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AF856A").s().p("AAuBlQhEgRg0gmQg0glgKh0QAmBVAmAUQAlATAyAAQAyAAASAFIAXAGQANAIAFARQAFAQgNAZQgHAOgbAAQgTAAgdgHg");
	this.shape_7.setTransform(5.55,-4.1,0.6832,0.6832,3.7034,0,0,-12.4,-8.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AilgQQA4AEAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgKAAQhwAAhGg/g");
	this.shape_8.setTransform(15.7254,-4.0384,0.6832,0.6832);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF856A").s().p("AAyBwQhEgSg1glQg0gmgQiJQAsBrAmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_9.setTransform(5.55,-2.05,0.6832,0.6832,3.7034,0,0,-12,-7.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("AisgHQBFgFAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgLAAQhwAAhSg2g");
	this.shape_10.setTransform(15.2813,-4.0378,0.6832,0.6832);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AF856A").s().p("AA5B2QhEgSg1glQg0gmgeiVQA6B3AmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_11.setTransform(5.6,-0.55,0.6832,0.6832,3.7034,0,0,-11.3,-6.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},1).wait(4));

	// Layer_2
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgdAbQgpgVgNguQBAAwBngYQgKAVgFAOIgIAVIgZABQgkAAgdgOg");
	this.shape_12.setTransform(14.05,-1.5765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgnAlQg5gdgSg/QBYBBCNggQgOAcgHAUIgKAcQgSACgQAAQgyAAgngTg");
	this.shape_13.setTransform(14.0455,-1.5716,0.7334,0.7334);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgZAZQgqgWgUgoQBIAqBmgXQgJAUgFAPIgIAUIgZABQgmAAgbgNg");
	this.shape_14.setTransform(13.7,-1.3015);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAWQgpgVgbgkQBOAmBngYQgKAVgFAOIgIAVIgZABQglAAgcgOg");
	this.shape_15.setTransform(13.35,-1.0515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},8).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(4));

	// Layer_8
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgwgDIgOgfQA9AjA/gGIAAAog");
	this.shape_16.setTransform(13.2,6.575);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(11).to({_off:false},0).wait(1).to({_off:true},1).wait(4));

	// Layer_5
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F7919F").s().p("AghAOIgWgmQAsgJARACQAcAEANAPQACACADAHIAEAEIgWAfg");
	this.shape_17.setTransform(13.8622,4.8042,0.7334,0.7334);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggGANABQAUADAJALIAFAHIACACIgQAXg");
	this.shape_18.setTransform(13.85,6.0433);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggHANABQAUADAJALQACACACAFIADADIgQAXg");
	this.shape_19.setTransform(13.525,6.8183);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F7919F").s().p("AggAYIgPgbQAYABAhgXQAigWAEASQADATgKAKQgJAMABADIgPAXg");
	this.shape_20.setTransform(14.286,5.4076);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[]},1).wait(4));

	// Layer_4
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#971B30").s().p("AhQAqIgeh7IBHBJQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIAAgCIAOgGIACgDIAMgGIADgDIALgEIAEAAIAMgGIANgDIAEgCIBIgPIgJAgIgIBIQgCAfAKAGg");
	this.shape_21.setTransform(12.8538,0.0451,0.7334,0.7334);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#971B30").s().p("Ag4AXIgahTIA3AuQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAgBIAKgFIACgCIAJgEIACgDIAHgDIADAAIAJgEIAKgCIACgCIA1gLIgGAXQgJAZgDAjQABAUAGAIIgMABQg8AAg4gmg");
	this.shape_22.setTransform(12.65,0.8218);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#971B30").s().p("AAHA+QgcgMgfgpIgjhMIBBAoQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABAAIAAgBIAKgEIABgDIAIgEIACgCIAIgDIAEAAIAJgFIAKgCIACgBIA1gLIgHAXQgJAZgCAiIAAAWQAAAMACAGQgTAKgTAAQgOAAgNgGg");
	this.shape_23.setTransform(12.2,2.194);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_21}]},9).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_23}]},1).to({state:[]},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-7.3,27.1,20.7);


(lib.bhmjhjmdhjktdykdyk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECBE97").s().p("Ah3gqIDwAAIgLA9Qhdgmh5A+g");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECBE97").s().p("AhyAwIgRhfIDwAAIAXBZQgzgKhCAEQhBAMg4AAIgIAAg");
	this.shape_1.setTransform(1.175,0.5779);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ECBE97").s().p("AhwAvIgVhtIDwAAIAcBYQgdAUhbARIgEAAQhVAAgmgQg");
	this.shape_2.setTransform(1.4,2.0255);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECBE97").s().p("AhwAkIgVhtIDwAAIAcBXQgXAvhhALIgcACQhJAAgagmg");
	this.shape_3.setTransform(1.4,3.1161);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},14).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12,-4.2,26.9,14.7);


(lib.uilt7lt78l8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.iop8898y9("synched",0);
	this.instance.setTransform(5.2,7.1,1,1,0,0,0,5.2,7.1);

	this.instance_1 = new lib.ioy89y89y98("synched",0);
	this.instance_1.setTransform(39.35,94.85,1,1,0,0,0,0.8,5.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,49.3,192.3);


(lib.uilt7lt78l_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.iuy79789("synched",0);
	this.instance.setTransform(-23.65,11.7,1,1,18.7446,0,0,-4,7.5);

	this.instance_1 = new lib.uil7tlt78l("synched",0);
	this.instance_1.setTransform(-40.05,111.05,1,1,-79.5148,0,0,-10,13.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.4,4.6,74.2,197.4);


(lib.uil7l7t8lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.io8y98y9("synched",0);
	this.instance.setTransform(25.6,-94.9);

	this.instance_1 = new lib.CachedBmp_33();
	this.instance_1.setTransform(-37.9,-153.05,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.9,-153,75.9,153.1);


(lib.ioy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.oy89y89("synched",0);
	this.instance.setTransform(7.3,98.5,1,1,0,0,0,-10,7.1);

	this.instance_1 = new lib.o8y9y89y89("synched",0);
	this.instance_1.setTransform(10,4.3,1,1,0,0,0,-18.9,4.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29,0,57.9,189.5);


(lib.hjluyglyilyitl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.gjhkuykuylyruliyl("synched",0);
	this.instance.setTransform(-42.65,5.1,1.3199,1.3199,-0.7061,0,0,-0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_10
	this.instance_1 = new lib.bhmjhjmdhjktdykdyk("synched",0);
	this.instance_1.setTransform(-38.4,2.1,1.3199,1.3199,-0.7061,0,0,-0.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_3
	this.instance_2 = new lib.fgnhjrdjrtjrejy("synched",0);
	this.instance_2.setTransform(31.45,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgkA5IgegVIA+hCQBUg8B1AlQgBAYgPAaQgfAyhGAPQggAGgaAAQghAAgZgLg");
	mask.setTransform(19.6832,-0.4283);

	// _Clip_Group__10
	this.instance_3 = new lib.ClipGroup_10();
	this.instance_3.setTransform(28.45,0.65,2.0439,2.0439,0,0,180,6,3.2);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AguAaIgOgKIAcgeQAngbA2ARQgBALgGAMQgOAXghAGQgOAEgMAAQgPAAgMgGg");
	this.shape.setTransform(26.1857,-0.4283,2.1608,2.1608);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AjYA4IgmgvQBuhXB0AbQA6APAkAfQgDAQgUAUQgpAnhTAOQgUADgSAAQg4AAgpgfg");
	mask_1.setTransform(-25.5118,8.7198);

	// _Clip_Group__12
	this.instance_4 = new lib.ClipGroup_12();
	this.instance_4.setTransform(-34.3,10.95,2.852,2.852,21.0126,0,0,5.5,2.6);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhcAeIgdgiQBVhCBXAVQArAMAbAYQgBANgPAOQggAdhAAKQgNACgOAAQgrAAgfgZg");
	this.shape_1.setTransform(-34.9844,10.0941,1.3199,1.3199,-0.7061);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.5,-19.5,108.5,37);


(lib.hkjdtykukuk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.hgmkjdkdytktuy("synched",0);
	this.instance.setTransform(30.55,-2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55));

	// _Clip_Group__6 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AheATQBkhcBxgLQBjgJAMAuQAdBxiMARQgXADgWAAQhnAAhBhDg");
	mask.setTransform(23.474,1.15);

	// _Clip_Group__6
	this.instance_1 = new lib.ClipGroup_6();
	this.instance_1.setTransform(29.1,0.35,2.0882,2.0882,0,0,0,8,4.2);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(55));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhOAJQAxgsA1gFQAvgEAGAWQAOA1hDAJIgWABQgxAAgfggg");
	this.shape.setTransform(30.4594,1.15,2.0882,2.0882);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(55));

	// Layer_5
	this.instance_2 = new lib.ghmktuktuku("synched",0);
	this.instance_2.setTransform(-28.6,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55));

	// _Clip_Group__8 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AgyBGQhFgEgsgyIgegvQBhhBBZArQAqAWAaAhQAAATgPATQgZAfg2AAIgRgBg");
	mask_1.setTransform(-19.4226,1.3777);

	// _Clip_Group__8
	this.instance_3 = new lib.ClipGroup_8();
	this.instance_3.setTransform(-26.85,-1.35,2.0882,2.0882,0,0,0,6.2,3.8);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(55));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAHAiQgfgCgWgYIgOgWQAvgfApAUQAVALAMAPQAAAJgHAJQgMAPgaAAIgJAAg");
	this.shape_1.setTransform(-26.107,1.3777,2.0882,2.0882);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(55));

	// Layer_2
	this.instance_4 = new lib.Group_1_1();
	this.instance_4.setTransform(-26.05,-4.25,2.3635,2.3635,0,0,0,5.2,3.6);
	this.instance_4.alpha = 0.3398;

	this.instance_5 = new lib.Group_2();
	this.instance_5.setTransform(30.95,-7.05,2.3635,2.3635,0,0,0,7.2,4);
	this.instance_5.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.1,-16.5,95,27.1);


(lib.ghjkdtktuktuykutcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.hgjdtyekjtykekucopy("synched",0);
	this.instance.setTransform(34.6,-7.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_4
	this.instance_1 = new lib.fghndfgmjdhjcopy("synched",0);
	this.instance_1.setTransform(-28.3,2.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AjRgiQAGg4BngGQBzgGB2BfQhEBmiMACIgEAAQiNAAALiDg");
	mask.setTransform(-21.0351,8.974);

	// _Clip_Group__1_0
	this.instance_2 = new lib.ClipGroup_1_0copy2();
	this.instance_2.setTransform(-26.6,8.2,2.0646,2.0646,0,0,0,8.5,4.9);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AARBGIgZgfQAKgnAighQBDhFBuAeIgMA3QgYA7g9AbQggANgZAAQgYAAgSgMg");
	mask_1.setTransform(21.2856,-1.7277);

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3copy2();
	this.instance_3.setTransform(34.4,-3.95,2.023,2.023,0,0,0,5.5,4.4);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgpAiIgNgPQAGgTAQgQQAggiA3APIgGAbQgMAdgeANQgPAHgMAAQgMAAgJgHg");
	this.shape.setTransform(31.4951,-1.7277,2.023,2.023);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	// Layer_7
	this.instance_4 = new lib.fgyjrtyj5sewkjew4copy("synched",0);
	this.instance_4.setTransform(-24.9,8.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-24.5,100.3,43.7);


(lib.gfhsrtjhqecopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.FGHMDFGHMJDTUMKTUKMcopy2("synched",0);
	this.instance.setTransform(-5.45,4.7,1.1236,1.1236,0,16.0446,-163.9554,0.1,-1.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(53));

	// _Group__1
	this.instance_1 = new lib.Group_1copy2("synched",0);
	this.instance_1.setTransform(-13.95,-0.5,1,1,0,19.7336,-160.2664,8.3,4);
	this.instance_1.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(53));

	// Layer_3
	this.instance_2 = new lib.fghdrjreyjwrcopy("synched",0);
	this.instance_2.setTransform(-13.95,-0.5,1,1,0,19.7336,-160.2664,8.3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(53));

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ag5AoQhNgIAQg2QAHgWA3AEQA9AGA4ArQgkAhg5AAIgZgCg");
	mask.setTransform(-12.1626,3.4806);

	// _Clip_Group__11
	this.instance_3 = new lib.ClipGroup_11copy();
	this.instance_3.setTransform(-13.65,5.75,1,1,0,0,0,7,4);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(53));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#996740").s().p("AguATQgmgIgGgdIAAgEQAEAOARAJQAPAJARADQA0AFAsgQQAVgGALgJQgNANgYAJQgeAOghAAQgSAAgTgEg");
	this.shape.setTransform(-15.2,5.816);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(53));

	// Layer_6
	this.instance_4 = new lib.hjdryjryjrdjcopy("synched",0);
	this.instance_4.setTransform(-15.2,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(53));

	// fjfdjdyj
	this.instance_5 = new lib.FDSGJSTJRWTJRYTJcopy2("synched",0);
	this.instance_5.setTransform(18.1,1.45,1.1415,1.1415,0,16.5756,-163.4244);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(53));

	// fjfdgjdftjdfj
	this.instance_6 = new lib.fjfdgjdftjdfjcopy2("synched",0);
	this.instance_6.setTransform(15.2,1.45,1,1,0,15.7677,-164.2323,5.5,4.2);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(53));

	// Layer_8
	this.instance_7 = new lib.hjdjrrsyjsykcopy("synched",0);
	this.instance_7.setTransform(15.2,1.45,1,1,0,15.7677,-164.2323,5.5,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(53));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#996740").s().p("Ag8ALIgBgDQAKAMAaABQATABASgFQAVgGARgRIAMgRQgFAWgZANQgMAHgLADQgOACgNAAQgcAAgOgNg");
	this.shape_1.setTransform(16.225,4.5958);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(53));

	// Layer_4 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AgLAUIgIgOQAMgTAXgJQAugTAyAeIgPAVQgXAWgkACIgHAAQgeAAgMgOg");
	mask_1.setTransform(11.225,3.4358);

	// _Clip_Group__13
	this.instance_8 = new lib.ClipGroup_13copy();
	this.instance_8.setTransform(14.8,5.2,1,1,0,0,0,6.2,3.9);

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(53));

	// Layer_14
	this.instance_9 = new lib.ghkmtktrykucopy("synched",0);
	this.instance_9.setTransform(15.8,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(53));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-4.8,54.1,13.7);


(lib.dfggdfgzrs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.lktl7l75l("synched",0);
	this.instance.setTransform(-27.3,-47.4,1,1,0,0,0,-0.1,2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_4
	this.instance_1 = new lib.ghkkmtyktktuktk("synched",0);
	this.instance_1.setTransform(4.65,-49.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AiWjHIgKgdQAygdAqAYQAUANALASQAAAHgIAIQgOAPgiAAIgCAAQglAAgSgbg");
	mask.setTransform(-16.075,-24.5058);

	// _Clip_Group__2_0
	this.instance_2 = new lib.ClipGroup_2_0("synched",0);
	this.instance_2.setTransform(-25.9,-43.35,1,1,0,0,0,6.2,3.6);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_5 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AhXjEQAzg5BAgBQAaAAARAJQARAJAAAMQACA0hFAKQgNABgKAAQg0AAghgjg");
	mask_1.setTransform(3.3278,-25.45);

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(4.3,-44.7,1,1,0,0,0,8.8,4.6);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


(lib._8y9y89y8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _ghjdtjtyktyktut_copy
	this.instance = new lib.ghjdtjtyktyktutcopy("single",8);
	this.instance.setTransform(-8.4,89.25,0.7737,0.7949,0,8.3318,-171.4792,6,-5.2);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(-43.6,38.35,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},373).to({state:[{t:this.instance}]},45).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},982).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},18).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},22).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},96).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).wait(1159));
	
	var _tweenStr_0 = cjs.Tween.get(this.instance).to({_off:true},373).wait(45).to({_off:false},0).wait(4).to({startPosition:7},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(982).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:9},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(11).to({startPosition:8},0).wait(16).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(22).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3);
	this.timeline.addTween(_tweenStr_0.to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(20).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:12},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({regX:0,regY:0,x:-4.4,y:94.05,startPosition:8},0).wait(96).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(12).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(10).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(1159));

	// ghjkdtktuktuykut_copy
	this.instance_2 = new lib.ghjkdtktuktuykutcopy("synched",0);
	this.instance_2.setTransform(-12.85,66.45,0.5283,0.5382,0,-2.7416,177.8499,-7.6,7.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},373).wait(45).to({_off:false,startPosition:18},0).wait(3694));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DE7739").s().p("AAIANQgfgSgTgCIAHgVIAjAKQAjAOAIAPIgHASQgMgIgQgIg");
	this.shape.setTransform(14.3138,159.7151,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4112));

	// Layer_8
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#604A3E").s().p("AgCgdQAGgIAKgIQANgKAIABQgMAMgJAMIgQAVQgOAPgHASIgLAgQACg2Aegfg");
	this.shape_1.setTransform(28.3666,74.398,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(4112));

	// Layer_9
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#916E50").s().p("Ag6BTIgLgHIAIheIAIAEQAJABACgSQACgYAZgRQAXgQAZABQAbABAHAXQAJAagYAvQgkBKguAEIgEAAQgMAAgMgFg");
	this.shape_2.setTransform(28.5784,74.2092,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4112));

	// Layer_10
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AhIHbQgbgLgWgXQgVgXgLgeQgHgSACgQQgNgUgDgWQgFgfANgkQAJgbAXgkQgPgVgCgsIABgoIBahMIAGiiQhHgpgLhgQgEgfADggIANhfIAZABIANgDQAOgJAcgGQAngIAXAAQAigBAaALQAjAPAVApIAeBTQALAfACAnQAAARgDA4QgEBKgUAxQgZA8gyAeQAVBbgvA7QAQAYACAdQABAZgHAeQgFAUgNAhQgHAUgHAKIAEAIQADAKgDAPQgGAjgSAWQgUAbgdABQgPAAgRgIg");
	this.shape_3.setTransform(30.07,87.1408,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(4112));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("Ag1BKQgUgSgHgUQgGgVAGggQAIgpAUgUQAMgNARgFQASgEAOAHIBLB+QgKAXgaAVQgTARgSAEIgKABQgZAAgdgZg");
	this.shape_4.setTransform(19.4396,100.7098,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4112));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("AgIBvQhEgqAHhbQADgdAKgfQAHgWADgEQAHgJADAMIABAPQgfBPAZA3QANAdATAMQAMAHAmgWIALAPQAmgegnAiQgYAWgUACg");
	this.shape_5.setTransform(13.0861,37.1098,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(4112));

	// Layer_13
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("AiqCnQg4gjABhSIAEgaQAIgfAOgcQAwhcBngaIAQgJQAUgKAWgGQBIgSBHAkIAfASQAgATAKANQABAKgGANQgMAagjANIgDABQgpATgnAJQhHARgigYQgbgIgfgBQg+gDgRAfIgJANQgKARgFASQgPA5AuAtIAeAqQgcgBgcgRg");
	this.shape_6.setTransform(-22.4213,28.4444,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(4112));

	// Layer_14
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D342E").s().p("AhHAPQAFgeALghQAYhAAkgEIBDAPQgKAMgJAQQgTAfgBAPQgPANgOAXQgbAuAFAxIgTANg");
	this.shape_7.setTransform(-44.2396,32.6637,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(4112));

	// Layer_15
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("AgygDQgDgaAGgfIAGgaIgCgGQBbAAAEBcQACAvgQAvQhRgPgHhSg");
	this.shape_8.setTransform(14.1639,34.6219,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(4112));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("AgSAXQAZACACgWQACgWgXgHQAQgEAJALQAHAJgBAOQgCAPgKAGQgFADgEAAQgHAAgJgFg");
	this.shape_9.setTransform(-14.8477,77.5285,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(4112));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("AgMAWQgIgJACgNQACgPAKgIQAKgIAPAHQgYACgDAWQgDAVAYAFQgGACgFAAQgIAAgGgGg");
	this.shape_10.setTransform(-26.0708,76.4733,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4112));

	// Layer_20
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#604A3E").s().p("AguACQATgXAZgDQAZgCAUAXQALAKAFAMQgFAFgLgGQgOgJgIgEQglgQgqAkg");
	this.shape_11.setTransform(-34.2568,43.2037,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).to({_off:true},373).wait(45).to({_off:false},0).wait(3694));

	// Layer_21
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#604A3E").s().p("AgWgHIghAGQgPABgFgFIAagSQAggQAgAKQAhAJARAcQAJAOACAMQgugvg0AGg");
	this.shape_12.setTransform(-1.774,47.5582,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).to({_off:true},373).wait(45).to({_off:false},0).wait(3694));

	// Layer_24
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#916E50").s().p("AiUEIQgrgWglhBQgkg+AAgtQAAgOAOg5QAKgmgRghQgTgmANg4QALgrAgg+IANAOQARAQAVAKQBDAhBTgnQA7gcAiAaQAfAXgNAbQgMAaABAMQABAVAbAhQAUAZAFApQACAYACAwIAIAEQAIABACgSQADgYAZgQQAXgQAZABQAbABAIAXQAIAZgXAwQglBKguAEQgPABgNgGIgLgHQgVBChAAhQghAPgpALQgsALgfAAQgbAAgRgIg");
	this.shape_13.setTransform(-2.1214,65.0931,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(4112));

	// Layer_25
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("Ah1AjIBEgnQBUgnBTgBIgCANQhQABhQAlIhBAmg");
	this.shape_14.setTransform(26.6004,57.237,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4112));

	// Layer_26
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("Ah5AjIBGgoQBXgoBWABIgBANQhTgBhTAmIhFAng");
	this.shape_15.setTransform(26.6772,51.7061,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(4112));

	// Layer_27
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("Ah5AjIBHgoQBWgoBWACIAAAMQhTgBhUAmIhFAng");
	this.shape_16.setTransform(27.0612,46.5972,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4112));

	// Layer_28
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("Ah1AjIBEgnQBTgnBUgBIAAANQhRAAhQAlIhDAng");
	this.shape_17.setTransform(27.7139,41.1876,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(4112));

	// Layer_29
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("Ah+AjIBJgpQBagpBZAEIACAMQhXgEhYAnIhIApg");
	this.shape_18.setTransform(26.1781,37.5895,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(4112));

	// Layer_30
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D342E").s().p("AiHAjIBPgrQBggrBdAJIADANQhcgKheAoQgeANgaARIgVAOg");
	this.shape_19.setTransform(24.4503,33.9756,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(4112));

	// Layer_31
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("AiOAjIAXgPQAcgSAggMQBlgsBhANIAEANQhggOhjAqQggANgcARIgXAPg");
	this.shape_20.setTransform(22.6457,30.3607,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(4112));

	// Layer_32
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3D342E").s().p("AiUAjIAYgQQAdgSAhgNQBpgrBkAQIAGANQhjgShoArQgiAMgdASIgXAQg");
	this.shape_21.setTransform(20.6491,26.7659,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(4112));

	// Layer_33
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#453B33").s().p("AATECIgjgCQg/gag/g8Qh+h2ACilIAegiQAngnAtgbQCRhVCdBNQBoAyALBzQAHBBgfCPQgSBTh6ATQgeAEgiAAIgSAAg");
	this.shape_22.setTransform(4.9128,40.7423,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(4112));

	// Layer_34
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3D342E").s().p("AgZB0QgXgGgKglQgJgmALgvQAKgwAZgeQAXgeAYAFQAXAGAKAlQAJAmgLAvQgKAwgYAeQgVAagTAAIgIgBg");
	this.shape_23.setTransform(-39.6705,37.0505,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(4112));

	// Layer_35
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#453B33").s().p("AgcDsQgOgLgJgUQgrhjATiAQANhYA2iHIBOAyQgdBFgMAjQgUA7gEAwQgEA7ASA0QAUA4ArAhQgYAHgagLQgYgKgPgVQgPgSgKgbQgGgQgJghQgCAqANApQAOAoAZAhQgEADgFAAQgLAAgLgKg");
	this.shape_24.setTransform(16.2308,176.2338,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,0,114.30000000000001,214);


(lib.ul7yl78lt7l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// gj_kfujyuli_copy
	this.instance = new lib.gjkfujyulicopy("single",1);
	this.instance.setTransform(12.4,-20.3,0.5092,0.5092,0,-14.8841,165.1159,16.8,-12.4);

	this.instance_1 = new lib.CachedBmp_38();
	this.instance_1.setTransform(-8,-55.3,0.1567,0.1567);

	this.instance_2 = new lib.Group();
	this.instance_2.setTransform(32.15,-51.25,1.4339,1.4339,0,0,0,4.2,3.6);
	this.instance_2.alpha = 0.3398;

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(3.3,-45.4,1.4339,1.4339,0,0,0,6.3,2.6);
	this.instance_3.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},258).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},14).to({state:[{t:this.instance}]},40).to({state:[{t:this.instance}]},3163).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).wait(445));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(258).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).to({_off:true},14).wait(40).to({_off:false},0).wait(3163).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(445));

	// hkjdtykukuk
	this.instance_4 = new lib.hkjdtykukuk("synched",0);
	this.instance_4.setTransform(12.25,-42.4,0.5677,0.5677,0,-12.5731,167.4269,12.9,1.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true},373).wait(40).to({_off:false,startPosition:28},0).wait(3699));

	// Layer_15
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AgNAEQgFgdAaAEQgRAIADAPQACAQATgCQgJAGgGAAQgKAAgDgSg");
	this.shape.setTransform(19.0047,-32.3411,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4112));

	// Layer_16
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0A07E").s().p("AgIAUQASgEgDgQQgDgQgSAAQAXgOAFAeQAEAWgQAAIgKgCg");
	this.shape_1.setTransform(26.302,-33.4186,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(4112));

	// Layer_17
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgLByIgUgrIgIgWQgFgSACgkQACgVAEgHQACgEAJgJIAdgcQAHgHABgDIAFgKQAGgQARgDIgCABQAJALgEAPQgFAPgNAEQAHAKgEAMQgEAMgKAEQAEAOgBAHQgCAMgLABQACAFgDAHIgDALIAAAQQAAALgHADQANAQgIAeQgEAKgFAAIAAAAg");
	this.shape_2.setTransform(-13.0574,-53.2266,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4112));

	// Layer_18
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AivBfQgZgYAHg/QAEgbAIgLQAFgHAMgJIAcgVQATgNAJgCQAMgDAVAEQAXAEAKgBQAIAAANgFQAPgFAGgBQALgBAKAFQALAFACAKQAIgOASgCQARgCALALQAHgJALgEQALgEALACQACgHAHgDQAIgDAHACQAKADAOAOIAHAAQAJAFADALQACALgEAKQgGAOgVASQgMALgIACQgGACgGgCQgHgCgDgFQAAASgMALQgGAFgJABQgIABgHgFQgBAFgGACQgFACgFgCQgIgDgIgMQgIAKgOgCQgOgDgEgLQgFAHgIACQgKACgIgEIgEgDIgFgCQgCAAgIAFQgJAHgMAAQgNAAgJgIQABAHgHAEQgHAEgGgEQAGAHgGAIQgGAJgJgDQAJAJgFAQQgEANgLALQgJAJgHACIgHABQgLAAgMgKg");
	this.shape_3.setTransform(7.2675,-75.9337,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(4112));

	// Layer_19
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AjGD8QgIgDgGgJQgFgJAAgKQAAgLgBgDIgFgFIgGgEQgDgFACgKQADgMgCgEIgGgJQgLgOAGglQgJgDgEgMQgDgLABgMIACgWQABgNgEgJIgGgPQgEgJADgFQAHgGABgEQAAgDgDgIQgJgTAHgVQAIgVARgHQgEgIABgKQABgKAFgIQAFgHAIgEQAJgDAIABQgCgOALgMQALgKAPgCIAMgBQAHgCAEgEIAHgKQADgFAJgFQARgMAKgEQAPgHAOABIAJAAQADgBAHgGQARgOAXAAQAWABATAOQABgLALgEQAKgFAJAFQANAFARAYQAOgIARALQARALAAASQAKgHAMgBQANgCAKAGQALAGAHAMQAIAMAAANQANgDAMAFQANAGAIALQAIAMAAAPQAAAPgHALQAEATgOAOQgNAOgQgFIgBgBQgFgGgLAAQgkAEgRgBQgfAAgRgPIgSgRQgUgTghgBQgWAAgiAJQglAJgTAJQgeANgQAWQgMAPgMAiQghBpgBBzQAAANgHABIgBAAIgEgBg");
	this.shape_4.setTransform(-3.3888,-75.8531,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4112));

	// Layer_20
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0A07E").s().p("AAUASQgHgPgLgKIgOgQQgHgJgKgJQALgCATAUQAYAXAFArIgKgZg");
	this.shape_5.setTransform(-21.0213,-32.5087,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(4112));

	// Layer_21
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AgZAPQgphJAngJQAPgEAOALQARALADATQACAOAHgBQADAAADgEIAKBLQgFANgMACIgDAAQgXAAgdg2g");
	this.shape_6.setTransform(-19.448,-32.1005,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(4112));

	// Layer_22
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("AgTAAIgYAIQgLAEgFgEQAGgIAKgHQAWgOAZADQAaADARARQAJAJAEAJQgrgcgkAIg");
	this.shape_7.setTransform(31.696,-65.6057,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(4112));

	// Layer_23
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("Ag+AQQAPgZAfgRQAdgQAgAEQAQACAKAFQgEAGgPACQgUACgMACQgyAKgoAxQABgKAHgOg");
	this.shape_8.setTransform(-1.1707,-56.4251,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(4112));

	// Layer_24
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B289").s().p("AgQEMIhIgXQg9gfgYhDIgBgYIgNhIQgCgxABgXQABgrARgaQAXgigBgVQAAgNgNgZQgNgbAagZQAfgcA5AbQBQAlA8gjQATgLAPgRIAKgPQAjA9ANAsQAQA4gPAoQgNAiALAlQARA6ABANQAEAugeBBQgfBDgmAXQgRALgdAAQgbAAglgKg");
	this.shape_9.setTransform(14.0369,-42.7075,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(4112));

	// Layer_25
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AhIEEQhygPgXhUQgmiQABhBQADh1Bdg3QCOhTCMBRQBHAoAqA5QAOCnhuB9Qg2A+g6AdQgdAFgeAAQgYAAgagDg");
	this.shape_10.setTransform(-3.7409,-66.3079,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4112));

	// Layer_26
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BEBB89").s().p("AghBvQgOgpghhFQglhPgMgeQgCgFABgDQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAIADAEQAVgOAaAJQAaAIAIAXQAUgJAVALQAWAMAEAVQANgEAOACQAOABALAIQAYARABAcQAKgBAIAGQAIAIAAAJQAAAKgIAHQgJAHgKgCQAGANgLANQgLANgOgEQgBASgIAIQgFAFgIAAQgIAAgDgGQgKAQgjACIgHABQgTAAgDgMg");
	this.shape_11.setTransform(23.4683,-95.1099,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(4112));

	// Layer_27
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AioCJQgNgGgCAAQgFgBgJAEQgMAEgNgDQgMgCgLgJQgVgTABgfQABgKAFgMQAJgTAegZQgFgEABgGQACgHAFgEQAQgGAGgGQADgDADgGIAFgJQADgFAFgCQAFgDAFADQgEgIAGgIQAGgIAIABIAGACIAHACQAEgBAGgFIAJgJQAEgDAOgCQALgCAEgHQACgHADgDQAEgFANAEQAPAGAFgDQADgBACgDIAEgFQAHgHAKABQALACAFAIQABgNAKgIQAKgIAMABQAWACATAZQARgJAUAOQAMAIANAXQAJgKAOAEQAPADAFAOQAXAFARAVQARAVACAZQAHgEAJAFQAIAFADAJQAEAOgHAQIADACIgFADIACgFQgNgIgdAMQgbALg7APQgSAFgKABQgPABgMgEQgMgEgEAAQgFAAgKAHQgOAHgRAAIgLgBQgGgBgFABQgJACgMAKQgPAMgGACQgJAFgRAAQgVAAgGABIgiALQgKADgJAAQgIAAgGgDg");
	this.shape_12.setTransform(0.3309,-101.9703,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(4112));

	// Layer_28
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AASA/QgBAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQgQAGgJgDQgHgBgEgGQgFgFAAgHQgCAEgGABQgFABgFgCQgGgDgHgLQgIgMAFgGQgHAAgCgKQgDgUALgTQAMgUAUgGQAMgDASAAQAMAAADABIAIAEIAIACIAIAAQAGAAAFAEIACACQALAFADAKQABAFgDAGQgDAGgFAAQALAHAAANQABAOgKAHQAFAMgFAIQgDAFgGAAQgGABgDgEQgDAHgIAIQgFAEgEAAIgBAAIgDgBg");
	this.shape_13.setTransform(33.3629,-84.5113,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(4112));

	// Layer_29
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AAcBpQgJABgJgGQgJgGgDgJQgKACgJgHQgKgIgBgLQgVABgLgKQgGgGgBgKQAAgLAGgEQgRgQgFgMQgEgJACgKQACgKAHgFQgOgKAAgUQAAgVAOgJIgDgBQACgQAagFQATgFAKAEQAMAFAEAMQAFgHAJACQAJACAGAHQAIAMACAYQAOgFAMAQQAHAJAGAVIAVBIQAHAYgCANQgCAJgLARIgXAOQgGAEgCAAIgCAAQgLAAgJgWg");
	this.shape_14.setTransform(-24.004,-33.8479,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.1,-123.5,88.1,123.5);


(lib.uilt78lt78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _8y9_y89_y8_
	this.instance = new lib._8y9y89y8("synched",0);
	this.instance.setTransform(14.7,-272.1,1,1,0,0,0,4.8,99.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4112));

	// u_y9_89_
	this.instance_1 = new lib.uy989("synched",0);
	this.instance_1.setTransform(-63.15,-157.1,1,1,0,0,0,4,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4112));

	// oiu_y89_y89_
	this.instance_2 = new lib.oiuy89y89("synched",0);
	this.instance_2.setTransform(44.3,-155.95,1,1,0,0,0,-6.6,26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4112));

	// uo_y89_y89_y89_
	this.instance_3 = new lib.uoy89y89y89("synched",0);
	this.instance_3.setTransform(-1.2,-49.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4112));

	// yilt678lt78l
	this.instance_4 = new lib.yilt678lt78l("synched",0);
	this.instance_4.setTransform(-2.75,-160.35,1,1,0,0,0,-0.1,-120.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4112));

	// iop_8y0_8y0_
	this.instance_5 = new lib.iop8y08y0("synched",0);
	this.instance_5.setTransform(21.3,-243.1,1,1,0,0,0,15.9,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4112));

	// uio_y89_y89_
	this.instance_6 = new lib.uioy89y89("synched",0);
	this.instance_6.setTransform(-25.25,-253.7,1,1,0,0,0,19,2.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.1,-371.3,134.2,371.3);


(lib.uilrtysty = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fgryjdsrtyjrsyj
	this.instance = new lib.fgryjdsrtyjrsyj("single",8);
	this.instance.setTransform(0.95,-23.2,1.7864,1.7275,0,6.6136,6.3001,2.4,-3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({startPosition:8},0).to({_off:true},1).wait(20).to({_off:false},0).wait(63).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).to({_off:true},208).wait(43).to({_off:false},0).wait(859).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(10).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(1163).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(373).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(3).to({startPosition:12},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(440).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(554));

	// dfggdfgzrs
	this.instance_1 = new lib.dfggdfgzrs("synched",37);
	this.instance_1.setTransform(-6,-46.1,1.0868,1.0868,0.8238,0,0,-5.4,-45.1);

	this.instance_2 = new lib.CachedBmp_35();
	this.instance_2.setTransform(-38.35,-54.6,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{startPosition:37}}]}).to({state:[{t:this.instance_1,p:{startPosition:16}}]},29).to({state:[]},1).to({state:[{t:this.instance_1,p:{startPosition:37}}]},20).to({state:[{t:this.instance_2}]},321).to({state:[{t:this.instance_1,p:{startPosition:1}}]},43).wait(3698));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AhpBoIhygFQgNheAcg/QAJgTAMgPIAKgLIEqAAIBOAuIAVCEQgdABgYAFIgTAEQhzATiBAAIgNAAg");
	this.shape.setTransform(-10.7745,-76.2729,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_11
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4AD91").s().p("AgUAcIAQgXQAOgMAHgbIAEgYQAEAWgKAYQgEAMgGAHQggAXAVARQAKAIARAEQgvgGAGgZg");
	this.shape_1.setTransform(-16.4091,-39.5717,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_12
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4AD91").s().p("AAAgSIAEgMQAEgHAFgBQgGAJAAAIQgBAJgEAHQgGAKgDANIgDAVQgFgjAPgWg");
	this.shape_2.setTransform(33.5979,-43.3343,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_13
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E5BFA4").s().p("AgTBIIgJgDIgJhiIAIAKQAIAHgBgTQgCgYALgLQAJgKAMAGQAiAOgFA4QgFA9gfAKQgEACgGAAIgKgBg");
	this.shape_3.setTransform(33.1893,-42.5189,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_14
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DCB783").s().p("AguACQATgSAbgCQAZgDAVASQAKAIAFAJQgFAGgJgEQgNgHgIgEQgkgNgyAcg");
	this.shape_4.setTransform(-31.0549,-60.3664,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_15
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DCB783").s().p("Ag7AAQAVgZAjADQAfADAbATQANAJAIAJQhCgZgkAJQgeASgTADg");
	this.shape_5.setTransform(5.1124,-61.3663,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_16
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5BFA4").s().p("Ag9EiQgwgJg5hWQgwhJgGglQgBgJAAhAQABglgXgeQgYggAVhDQAhhQAMgoIA2gQQBAgKA0AhQApAaAQgFIAAgHQADgLAEAEQADADgDAGQgDAEgEABQACARAaAYQAUASAyAnQAZAWANAqQAHAYAKAxQAIAYgCgcQgBgZAMgNQALgMAQAEQApAKgJA+QgJBFgeAKQgJADgKgDIgJgEIgHgHQgMBdgxAmQgOAagdAXQgtAjg4AAQgSAAgTgEg");
	this.shape_6.setTransform(-0.2386,-45.089,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_17
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DCB783").s().p("AhSCrQiBhmgcioIAPgfQAVgjAggZQBmhQCtA1QBYAbAeBaQAWBCgFB/QgDBYhiAmQgeAMglAFIgeADQg6gRhBgzg");
	this.shape_7.setTransform(5.6442,-71.9028,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DCB783").s().p("AggDXQARgnAHgdQAQhJAEg2QAFhGgNg3QgLgtgZgjQgYgjghgQIggguQAkgLA4ATQA1ASAfAhQAgAhAFALQANAZABAIQABALAMAbQADAJABASIgCBXIABAYQAAAOgCAKIgOA6QgEASgVAeQggAzgYAXQgQAQg0AlQAAgxALgXg");
	this.shape_8.setTransform(26.3827,-62.3269,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373432").s().p("AgTA5QgCABgEgDQgLgQgBgVQgBgUAJgSQASgjAqgNIAGAiQACAMgCAGQgBAGgEAIIgHANIgFAQQgEANgNALQgHAHgSALg");
	this.shape_9.setTransform(-35.8069,-75.9694,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DCB783").s().p("AiPCYQgggtgIgJQgegeAXhIQAUhAAggfQAWgVAwgOIBNgUQAUgGAdAJQAmAMAMAAIgGAEIA3AqQAXASAHAKQAMARACAXQABAVgHAVQgKAggXAZQgaAcgvAUQhcAohjgTQgLgCgNAMQgEAEgEAAQgFAAgEgFg");
	this.shape_10.setTransform(-14.3808,-81.764,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(29).to({_off:true},1).wait(20).to({_off:false},0).wait(4062));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.2,-108.6,90.4,108.6);


(lib.ioy8y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ghstshqw12313_copy
	this.instance = new lib.ghstshqw12313copy("single",17);
	this.instance.setTransform(-8.1,-79.65,1.1001,1.1001,0,0.2456,-179.7544,-6.7,-5.7);

	this.instance_1 = new lib.CachedBmp_28();
	this.instance_1.setTransform(-45.65,-114.55,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},24).to({state:[]},1).to({state:[{t:this.instance}]},25).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},281).to({state:[{t:this.instance}]},48).to({state:[{t:this.instance}]},453).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},137).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},1512).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},25).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).wait(588));
	
	var _tweenStr_1 = cjs.Tween.get(this.instance).wait(24).to({startPosition:17},0).to({_off:true},1).wait(25).to({_off:false},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(5).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).to({_off:true},281).wait(48).to({_off:false},0).wait(453).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(16).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(11).to({startPosition:17},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(9).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(3).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(3).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(137).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(16).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(8).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(5).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(4).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:17},0).wait(1512).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(9).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(8).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(3).to({startPosition:24},0).wait(3).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(5).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(1).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(25);
	this.timeline.addTween(_tweenStr_1.to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:17},0).wait(6).to({startPosition:17},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(3).to({startPosition:20},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(4).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(588));

	// gfhsrtjhqe_copy
	this.instance_2 = new lib.gfhsrtjhqecopy("synched",14);
	this.instance_2.setTransform(-27.55,-98.8,1.0584,1.0675,0,-0.5889,179.4094,9.5,3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({startPosition:38},0).to({_off:true},1).wait(25).to({_off:false,startPosition:11},0).to({_off:true},321).wait(48).to({_off:false,startPosition:9},0).wait(3693));

	// Layer_15
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3B4C56").s().p("AiNAtQgEgDgBgGQgCgPAIgPQAHgMANgLQAhgbA3AAQAhAAA7AQQAgAHASAJQAZAMAMATQgMgBgOgIIgZgMQgjgRgpAEQgcADg6AYIhEAfIgCACIgCAAIAAAAIgDAAg");
	this.shape.setTransform(-25.0539,-134.6552,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_16
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#465E6D").s().p("ACCCYQgFhIgghAQghhAg4gpQg6gqhFgEQgdgCgWAHQgNAEgQAJIgcAQQgXAMgoARQgIgSADgSQAAgLALgOQATgYAcgQQgFgDACgIQADgHAGgFQArglAfgSQAsgaApgEQBYgJAgAAQBHACApAaQAKAHAkAlQAdAfANAPQAOARAQArQAPAsAKBJQAKBKhBBWQg0BFhRA5QAYhCgFhJg");
	this.shape_1.setTransform(-2.0859,-117.0366,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_17
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1A5A8").s().p("Ah5hKQAogWAqAEQB3ADBFBWQAiAqAKArQjPhShuAmQgiAMgUAXIgNAVQgLh9BRgrg");
	this.shape_2.setTransform(-17.3595,-129.28,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_18
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#664F3F").s().p("AgRALIARgWQAPgUACgTQAFAPgHAPQgDAHgFAEQghAUAUAWQAIALARAHQgtgOAJgag");
	this.shape_3.setTransform(-22.2046,-91.0436,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_24
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#664F3F").s().p("AgFgVQAPgWALgBQgIALgFAKIgKARQgJAMgDAPIgFAYQgGgnAUgbg");
	this.shape_4.setTransform(24.8174,-96.7255,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_25
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#775A45").s().p("AgaBAIgGgGIgIhFIAHACQAHgBgBgNQgBgSAOgNQAOgNAOAAQArAAgZBLQgTA7gYABIgBAAQgIAAgGgEg");
	this.shape_5.setTransform(23.1566,-95.9542,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_28
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("AAqAOQgNgHgJgDQghgLgqAWIANgPQASgOAYgBQAYgBATAQQAJAHAEAIIgFABQgEAAgFgCg");
	this.shape_6.setTransform(-36.8077,-111.1016,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_29
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("AhKARIASgRQAZgRAfgBQAhAAAYAPQAMAGAGAIQg4gVgtAOIgcALQgIAEgGAAIgGgCg");
	this.shape_7.setTransform(-0.5278,-112.0354,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_30
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#775A45").s().p("AgeD/QgtgNgvg2Qgug1gHgqQgCgNAEg4QACgkgVgbQgaghADg2QADgrAVg/IAPALQATANAWAGQBGATBJgyQA0gkAmASQAhARgHAbQgGAUAMASQAKAOAlAfQAWATACAnQAEA7ADAHIADBEIAFAWQgIBBg4ApQgeAUgmARQg5AZgjAAQgMAAgKgDg");
	this.shape_8.setTransform(-13.7587,-97.4836,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_31
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#465E6D").s().p("AiYCAIA3gUQAjgNARgIQA5gbAjguQAJgNAjg9QAZguAagVQADgDADAAQAGgBABAHQACAGgCAGQgYBUhABAQhABAhTAYQgaAIgUAAQgOAAgMgEgAiaCAIACAAIgDACgAiYCAIAAAAg");
	this.shape_9.setTransform(7.8909,-77.4157,1.5357,1.5357);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_5
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#465E6D").s().p("AhVBeQA5iPAPhDIAKgzQAEgeAGgUQAMgoAYgwIAGAFIABACQAFgFAGAKQAOAbAGAnQAEATAFAxIAPCaQAMBUAgA7QADAHAAAFIgEALQgEAHgNAGIgPAFIgJACQgKACgdAWIgbAUQgnAkgyAVQgyAUg1ADQANhNA1iGg");
	this.shape_10.setTransform(24.9323,-62.3946,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_6
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3B4C56").s().p("AhNEwQgegtgOgYQgXgngLgjIgLgjQgHgVgHgOQgOgXgFgMQgJgUgBgdIABgzQAAg0gOg4IAHABQAhAsApAiQAPAMAKADQARAGAdgKQBegeBNhEQBNhEAqhaQAHArgJA2QgGAjgSA9IghB5QgNAsgJATQgJAVgWAiQhDBlhVBfQgHAIgFABIgDAAQgJAAgJgPg");
	this.shape_11.setTransform(1.8685,-49.0168,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	// Layer_7
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#465E6D").s().p("AgbBfQgJgKgCgGQgDgHADgQQAUhqgOhtIACAIQAAgEAEgCQAFgEAGACQAHADAFAOQAeBHAJBNQAKBOgMBNg");
	this.shape_12.setTransform(-30.1391,-50.6631,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(24).to({_off:true},1).wait(25).to({_off:false},0).wait(4062));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-161.7,96.5,161.7);


(lib.i8y9y89y98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hmjdtyktrktuk
	this.instance = new lib.hmjdtyktrktuk("single",0);
	this.instance.setTransform(13.75,-21.3,0.6087,0.6087,0,-11.5953,168.4047,-0.7,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},372).wait(47).to({_off:false},0).wait(260).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(7).to({startPosition:1},0).wait(12).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3261));

	// hjluyglyilyitl
	this.instance_1 = new lib.hjluyglyilyitl("synched",0);
	this.instance_1.setTransform(22.6,-48.35,0.4969,0.5045,0.9099,0,0,0.5,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},372).wait(47).to({_off:false,startPosition:19},0).wait(3693));

	// Layer_27
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1AA3F").s().p("AgFAIQgDgCgBgEQgBgDACgEQADgDAEgBQADAAADACQAEACABAEQABADgDAEQgDADgEABIgBAAQgCAAgDgCg");
	this.shape.setTransform(-20.9454,-23.6243,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4112));

	// Layer_28
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7F8F8").s().p("AizBYQghgHgigOIgcgNQBKhQBQgnQAogTAYgDQB2gOB3AiQA7ARAjAUQgWgKgmgEIghgCQg7gLhPAwIhCAwQgoA1hIAAQgVAAgYgEg");
	this.shape_1.setTransform(20.5488,-72.8302,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(4112));

	// Layer_29
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9E9E8").s().p("Aj+CuQgXi8BmhfQAzgvA4gKQCSgjBpBsQA1A2AXA8IlnBxQgxAkg6AGg");
	this.shape_2.setTransform(-1.5965,-88.1242,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4112));

	// Layer_30
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D7B092").s().p("AAMAeQAPgVgfgHQgFgCgFgJQgKgRAAgYIAGATQAJAUAKALIAVALQAMARgpAWQAMgJAHgLg");
	this.shape_3.setTransform(25.8565,-36.6547,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(4112));

	// Layer_31
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D7B092").s().p("AAPAPQgFgMgIgJIgKgNIgNgPQAJAAAOAQQASASACAjIgHgUg");
	this.shape_4.setTransform(-23.6446,-32.9315,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4112));

	// Layer_32
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EDC19B").s().p("AAMBGQgkgDgQg7QgPg1AkgUQAPgJALAIQANAJADAYQACASAGgIIAGgLIAJBgQgNAJgQAAIgFgBg");
	this.shape_5.setTransform(-23.35,-32.33,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(4112));

	// Layer_33
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#292929").s().p("Ag6AVIALgTQAQgTAagDQAZgEAWAMQALAHAGAFQgygaggAZIgUASQgGAFgFAAIgEgBg");
	this.shape_6.setTransform(37.9037,-62.227,1.5358,1.5358);

	this.instance_2 = new lib.CachedBmp_25();
	this.instance_2.setTransform(-8.5,-66.55,0.1567,0.1567);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6}]}).to({state:[{t:this.instance_2}]},372).to({state:[{t:this.shape_6}]},47).wait(3693));

	// Layer_34
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("Ag3AEQAZgTAegFQAigGAYATQALAIAFALQgIgBgQgJQgRgJgLgCQgogLg3ArQAGgJAMgKg");
	this.shape_7.setTransform(2.4645,-57.2686,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).to({_off:true},372).wait(47).to({_off:false},0).wait(3693));

	// Layer_35
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EDC19B").s().p("AAJELIhOgiQgjgSgUgZQgTgWgJgeQgOANgRgBQgkgCgVhAQgTg9AmgRQAPgGANAIQAOAJADAZQACASAHgIIAGgLQACgwADgZQAEgqAVgaQAqgvAQgUQAVgcgBgRQAQACAkghQArgpBAgBQAggBAXAHQAUAkAtBIQAhA9gSAjQgRAiAFAlIAKBIQAAAxgfBDQgiBKgqAVQgOAHgVAAQgjAAg1gTgAg9jYQgFgFAEgEQADgEAEAKIACAHQgFAAgDgEg");
	this.shape_8.setTransform(7.2532,-43.9804,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(4112));

	// Layer_36
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("AhTDzQhmgUgThVQgbh+AJhIQAMhmBQgpQCfhSByBEQA5AjAaAyQADCnhrB6Qg2A9g2AbQgUAEgUAAQgcAAgdgGg");
	this.shape_9.setTransform(-2.6143,-66.6005,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(4112));

	// Layer_37
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AAnD0QgcgSgogrQgYgagIgRQgKgagNgcQgEgJgCgNIgEgYIgQhdQgEgZADgKQAGgdgFgLQgDgHALgbQARgjALgRQAXgjA0gTQAxgSAoAFIgYAyQgcAVgRAmQgSAmgDAuQgGBgA+CSQALAaAYAkQAOAUAJAvQg6gbgRgMg");
	this.shape_10.setTransform(-23.4942,-59.5068,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4112));

	// Layer_38
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AgWCwIgqgtQg3gugGh1QgCglADgoIAEggQAgifBuAeQA4APAxAvIgPBxQgDghgrgSIgqgLQgtAeAWBeQALAuAVApQApBUggBNQgQAngZAWQAPgtgmg3g");
	this.shape_11.setTransform(-43.5126,-53.1465,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(4112));

	// Layer_39
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DEDEDE").s().p("AgRAYQhMgQgMgcIBKgMQBTgHA0AhQADAJgFAJQgJAUgmACQgjgCglgIg");
	this.shape_12.setTransform(46.7827,-76.6299,1.5358,1.5358);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63,-115.1,126,115.1);


(lib._89y8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uilt7lt78l8
	this.instance = new lib.uilt7lt78l8("synched",0);
	this.instance.setTransform(30.75,-143.6,1,1,33.4777,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-4.9626,y:-143.55},14).to({rotation:33.4777,y:-143.6},15).wait(1));

	// uilrtysty
	this.instance_1 = new lib.uilrtysty("synched",0);
	this.instance_1.setTransform(12.75,-170.4,1,1,0,0,0,16.1,-12.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({startPosition:14},14).to({startPosition:29},15).wait(1));

	// ilt68lt78l
	this.instance_2 = new lib.ilt68lt78l("synched",0);
	this.instance_2.setTransform(-11.75,3.1,1,1,0,0,0,-13.8,49.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({startPosition:0},14).to({startPosition:0},15).wait(1));

	// ui_lt79_t789_
	this.instance_3 = new lib.uilt79t789("synched",0);
	this.instance_3.setTransform(14.65,71.6,1,1,-16.2492,0,0,1.9,46.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({rotation:12.2007,y:71.65},14).to({rotation:-16.2492,y:71.6},15).wait(1));

	// u_l9_79__l_7t_t9
	this.instance_4 = new lib.ul979l7tt9("synched",0);
	this.instance_4.setTransform(-11.9,53.35,1,1,14.7089,0,0,13.7,39.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-16.2531,x:-8.05,y:49.2},14).to({rotation:14.7089,x:-11.9,y:53.35},15).wait(1));

	// io_y89_y89_
	this.instance_5 = new lib.ioy89y89("synched",0);
	this.instance_5.setTransform(-31.55,-141.6,1,1,-26.9529,0,0,9.2,11.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({rotation:14.7345},14).to({rotation:-26.9529},15).wait(1));

	// io_8y_89_89_
	this.instance_6 = new lib.io8y8989("synched",0);
	this.instance_6.setTransform(18.1,-243.75,1,1,0,0,0,18.5,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({startPosition:0},14).to({startPosition:0},15).wait(1));

	// io_l79_y89_y89_
	this.instance_7 = new lib.iol79y89y89("synched",0);
	this.instance_7.setTransform(37.65,-113.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({startPosition:0},14).to({startPosition:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.1,-266.3,211,535.6);


(lib.yiult78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uiol_7l78l
	this.instance = new lib.uiol7l78l("synched",0);
	this.instance.setTransform(-22.65,-253.9,1,1,0,0,0,-18.2,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4112));

	// ul_7yl78lt7l
	this.instance_1 = new lib.ul7yl78lt7l("synched",0);
	this.instance_1.setTransform(-5.45,-291.45,1,1,0,0,0,-3.3,-13.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4112));

	// ouil_y7l789l8
	this.instance_2 = new lib.ouily7l789l8("synched",0);
	this.instance_2.setTransform(67.85,-170.95,1,1,0,0,0,-4.3,5.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4112));

	// uio_t7_t79_
	this.instance_3 = new lib.uiot7t79("synched",0);
	this.instance_3.setTransform(34.1,-262.75,1,1,0,0,0,8.3,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4112));

	// uo_l7t_t79_79
	this.instance_4 = new lib.uol7tt7979("synched",0);
	this.instance_4.setTransform(13.25,-98.1,1,1,0,0,0,18.9,49.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.2,-401.3,144.4,401.40000000000003);


(lib.uiltfyudtyu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// iop__8_89_8y9_
	this.instance = new lib._89y8989("synched",0);
	this.instance.setTransform(103.05,-341.75,1,1,0,0,0,-127.2,-75.2);

	this.instance_1 = new lib.iop8898y9("synched",0);
	this.instance_1.setTransform(27.3,-405.05,1,1,0,0,0,5.2,7.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-127.35,startPosition:19},49).to({_off:true},1).wait(4064));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50).to({_off:false},0).wait(64).to({regX:5.3,regY:7,rotation:-7.4418,x:21.6,y:-405.85},0).wait(79).to({regX:5.2,regY:7.1,rotation:0,x:27.3,y:-405.05},0).wait(1080).to({regY:7,rotation:-2.7042,x:20.75,y:-406.25},0).wait(108).to({regY:7.1,rotation:0,x:27.3,y:-405.05},0).wait(1162).to({regY:7,rotation:7.7399,x:17.2,y:-406.95},0).wait(69).to({regY:7.1,rotation:0,x:27.3,y:-405.05},0).wait(365).to({regY:7,rotation:-3.9409,x:18.75,y:-406.6},0).wait(127).to({regY:7.1,rotation:0,x:27.3,y:-405.05},0).wait(431).to({rotation:-2.4714,x:21.8,y:-406.15},0).wait(33).to({rotation:0,x:27.3,y:-405.05},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// io_y89_y89_y98_
	this.instance_2 = new lib.ioy89y89y98("synched",0);
	this.instance_2.setTransform(61.45,-317.3,1,1,0,0,0,0.8,5.8);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50).to({_off:false},0).wait(64).to({regX:0.9,rotation:-7.4418,x:66.85,y:-323.2},0).wait(79).to({regX:0.8,rotation:0,x:61.45,y:-317.3},0).wait(1080).to({regY:5.6,rotation:93.6999,x:58.8,y:-313.2},0).wait(108).to({regY:5.8,rotation:0,x:61.45,y:-317.3},0).wait(1162).to({rotation:83.4882,x:39.1,y:-308.15},0).wait(69).to({rotation:0,x:61.45,y:-317.3},0).wait(365).to({rotation:-3.9409,x:58.85,y:-321.35},0).wait(127).to({rotation:0,x:61.45,y:-317.3},0).wait(431).to({rotation:-2.4714,x:59.7,y:-320},0).wait(33).to({rotation:0,x:61.45,y:-317.3},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// uilrtysty
	this.instance_3 = new lib.uilrtysty("synched",50);
	this.instance_3.setTransform(12.6,-436.95,1,1,0,0,0,16.1,-12.7);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50).to({_off:false},0).wait(64).to({rotation:-2.7042,x:5.65,y:-437.35,startPosition:114},0).wait(79).to({rotation:0,x:12.6,y:-436.95,startPosition:193},0).wait(1080).to({rotation:-2.7042,x:4.6,y:-437.35,startPosition:1273},0).wait(108).to({rotation:0,x:12.6,y:-436.95,startPosition:1381},0).wait(1162).to({rotation:-3.4677,x:1.55,y:-437.35,startPosition:2543},0).wait(69).to({rotation:0,x:12.6,y:-436.95,startPosition:2612},0).wait(365).to({regX:16,rotation:-3.9409,x:1.85,y:-437.35,startPosition:2977},0).wait(127).to({regX:16.1,rotation:0,x:12.6,y:-436.95,startPosition:3104},0).wait(431).to({regX:16,rotation:-2.4714,x:5.7,y:-437.45,startPosition:3535},0).wait(33).to({regX:16.1,rotation:0,x:12.6,y:-436.95,startPosition:3568},0).wait(543).to({startPosition:4111},0).to({_off:true},1).wait(2));

	// ilt68lt78l
	this.instance_4 = new lib.ilt68lt78l("synched",0);
	this.instance_4.setTransform(-11.9,-263.45,1,1,0,0,0,-13.8,49.6);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50).to({_off:false},0).wait(64).to({regY:49.5,rotation:-2.7042,x:-10.7,y:-262.95},0).wait(79).to({regY:49.6,rotation:0,x:-11.9,y:-263.45},0).wait(1080).to({regY:49.5,rotation:-2.7042,x:-11.7,y:-262.95},0).wait(108).to({regY:49.6,rotation:0,x:-11.9,y:-263.45},0).wait(1162).to({regY:49.5,rotation:-3.4677,x:-12.35,y:-262.75},0).wait(69).to({regY:49.6,rotation:0,x:-11.9,y:-263.45},0).wait(365).to({regY:49.5,rotation:-3.9409,x:-10.6,y:-262.65},0).wait(127).to({regY:49.6,rotation:0,x:-11.9,y:-263.45},0).wait(431).to({regX:-13.7,regY:49.5,rotation:-2.4714,x:-11.2,y:-263.1},0).wait(33).to({regX:-13.8,regY:49.6,rotation:0,x:-11.9,y:-263.45},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// ui_lt79_t789_
	this.instance_5 = new lib.uilt79t789("synched",0);
	this.instance_5.setTransform(14.55,-195.05,1,1,0,0,0,2,46.2);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50).to({_off:false},0).wait(64).to({startPosition:0},0).wait(79).to({startPosition:0},0).wait(1080).to({startPosition:0},0).wait(108).to({startPosition:0},0).wait(1162).to({startPosition:0},0).wait(69).to({startPosition:0},0).wait(365).to({startPosition:0},0).wait(127).to({startPosition:0},0).wait(431).to({startPosition:0},0).wait(33).to({startPosition:0},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// u_l9_79__l_7t_t9
	this.instance_6 = new lib.ul979l7tt9("synched",0);
	this.instance_6.setTransform(-12,-213.25,1,1,0,0,0,13.7,39.3);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(50).to({_off:false},0).wait(64).to({startPosition:0},0).wait(79).to({startPosition:0},0).wait(1080).to({startPosition:0},0).wait(108).to({startPosition:0},0).wait(1162).to({startPosition:0},0).wait(69).to({startPosition:0},0).wait(365).to({startPosition:0},0).wait(127).to({startPosition:0},0).wait(431).to({startPosition:0},0).wait(33).to({startPosition:0},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// o_y89_y89_
	this.instance_7 = new lib.oy89y89("synched",0);
	this.instance_7.setTransform(-35.45,-319.25,1,1,0,0,0,-10,7.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(50).to({_off:false},0).wait(64).to({regX:-10.1,regY:7,rotation:43.949,x:-47.4,y:-317.85},0).wait(79).to({regX:-10,regY:7.1,rotation:0,x:-35.45,y:-319.25},0).wait(1080).to({regY:7,rotation:-4.9414,x:-37.85,y:-317.65},0).wait(108).to({regY:7.1,rotation:0,x:-35.45,y:-319.25},0).wait(1162).to({regX:-10.1,regY:7,rotation:-15.9656,x:-22.4,y:-319.9},0).wait(69).to({regX:-10,regY:7.1,rotation:0,x:-35.45,y:-319.25},0).wait(365).to({regX:-10.1,rotation:70.4734,x:-54.65,y:-316.3},0).wait(127).to({regX:-10,rotation:0,x:-35.45,y:-319.25},0).wait(431).to({regX:-10.2,regY:7,rotation:61.7347,x:-42.55,y:-317.75},0).wait(33).to({regX:-10,regY:7.1,rotation:0,x:-35.45,y:-319.25},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// o_8y9_y89_y89_
	this.instance_8 = new lib.o8y9y89y89("synched",0);
	this.instance_8.setTransform(-32.75,-413.45,1,1,0,0,0,-18.9,4.3);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50).to({_off:false},0).wait(64).to({regY:4.2,rotation:4.0057,x:-38.1,y:-411.6},0).wait(79).to({regY:4.3,rotation:0,x:-32.75,y:-413.45},0).wait(1080).to({regY:4.2,rotation:-2.7042,x:-39.6,y:-411.8},0).wait(108).to({regY:4.3,rotation:0,x:-32.75,y:-413.45},0).wait(1162).to({regY:4.2,rotation:-15.9656,x:-45.6,y:-411.25},0).wait(69).to({regY:4.3,rotation:0,x:-32.75,y:-413.45},0).wait(365).to({regY:4.4,rotation:7.0213,x:-40.35,y:-409.35},0).wait(127).to({regY:4.3,rotation:0,x:-32.75,y:-413.45},0).wait(431).to({regY:4.2,rotation:2.769,x:-37.55,y:-411.65},0).wait(33).to({regY:4.3,rotation:0,x:-32.75,y:-413.45},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// io_8y_89_89_
	this.instance_9 = new lib.io8y8989("synched",0);
	this.instance_9.setTransform(17.95,-510.3,1,1,0,0,0,18.5,11);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50).to({_off:false},0).wait(64).to({regX:18.4,regY:10.9,rotation:-2.7042,x:7.45,y:-510.9},0).wait(79).to({regX:18.5,regY:11,rotation:0,x:17.95,y:-510.3},0).wait(1080).to({regX:18.4,regY:10.9,rotation:-2.7042,x:6.4,y:-510.9},0).wait(108).to({regX:18.5,regY:11,rotation:0,x:17.95,y:-510.3},0).wait(1162).to({regX:18.4,rotation:-3.4677,x:2.35,y:-510.85},0).wait(69).to({regX:18.5,rotation:0,x:17.95,y:-510.3},0).wait(365).to({regY:10.9,rotation:-3.9409,x:2.2,y:-511},0).wait(127).to({regY:11,rotation:0,x:17.95,y:-510.3},0).wait(431).to({rotation:-2.4714,x:7.95,y:-510.9},0).wait(33).to({rotation:0,x:17.95,y:-510.3},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	// io_l79_y89_y89_
	this.instance_10 = new lib.iol79y89y89("synched",0);
	this.instance_10.setTransform(37.5,-380.45);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(50).to({_off:false},0).wait(64).to({regY:-0.1,rotation:-2.7042,x:33.15,y:-382.15},0).wait(79).to({regY:0,rotation:0,x:37.5,y:-380.45},0).wait(1080).to({regY:-0.1,rotation:-2.7042,x:32.1,y:-382.15},0).wait(108).to({regY:0,rotation:0,x:37.5,y:-380.45},0).wait(1162).to({rotation:-3.4677,x:29.8,y:-382.45},0).wait(69).to({rotation:0,x:37.5,y:-380.45},0).wait(365).to({regY:-0.1,rotation:-3.9409,x:30.6,y:-382.8},0).wait(127).to({regY:0,rotation:0,x:37.5,y:-380.45},0).wait(431).to({rotation:-2.4714,x:33.05,y:-382.05},0).wait(33).to({rotation:0,x:37.5,y:-380.45},0).wait(543).to({startPosition:0},0).to({_off:true},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150.3,-532.9,479.40000000000003,535.8);


(lib.uilt78lt7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// io_y8_y89_
	this.instance = new lib.ioy8y89("synched",0);
	this.instance.setTransform(-1.9,-163.25,1,1,0,0,0,-3.8,-50.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:3},3).to({startPosition:6},3).to({startPosition:9},3).to({startPosition:12},3).to({startPosition:15},3).to({startPosition:18},3).to({startPosition:21},3).to({startPosition:24},3).wait(1));

	// iu_y79_789_
	this.instance_1 = new lib.uilt7lt78l_1("synched",0);
	this.instance_1.setTransform(34,-141.4,1,1,0,0,0,-24.4,10.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:10.7,rotation:-7.3624,y:-141.5},3).to({rotation:-14.7237},3).to({scaleX:0.9999,scaleY:0.9999,rotation:-22.085},3).to({regX:-24.3,regY:10.8,scaleX:1,scaleY:1,rotation:-29.4486,x:34.05,y:-141.4},3).to({regX:-24.2,regY:10.7,scaleX:0.9999,scaleY:0.9999,rotation:-22.0859,x:34.1,y:-141.55},3).to({rotation:-14.7244,y:-141.6},3).to({regY:10.6,rotation:-7.3637,x:34.15,y:-141.65},3).to({regX:-24.4,regY:10.8,scaleX:1,scaleY:1,rotation:0,x:34,y:-141.4},3).wait(1));

	// io_y89_89_
	this.instance_2 = new lib.ioy8989("synched",0);
	this.instance_2.setTransform(18.1,-56.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).wait(1));

	// ui_79_y8_8
	this.instance_3 = new lib.ui79y88("synched",0);
	this.instance_3.setTransform(-6.05,-24.05,1,1,0,0,0,-7.1,-3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).wait(1));

	// yilt78lt78l
	this.instance_4 = new lib.yilt78lt78l("synched",0);
	this.instance_4.setTransform(15.75,20.5,1,1,-13.9429,0,0,-2.5,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-5.629,x:18.8,y:20.85},3).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6808,x:21.9,y:21.15},3).to({rotation:10.9931,x:24.85,y:21.4},3).to({scaleX:1,scaleY:1,rotation:19.3053,x:27.8,y:21.6},3).to({regY:12.7,rotation:10.9943,x:24.85,y:21.15},3).to({regY:12.8,scaleX:0.9999,scaleY:0.9999,rotation:2.6825,x:21.8},3).to({scaleX:1,scaleY:1,rotation:-5.6283,x:18.75,y:20.85},3).to({rotation:-13.9429,x:15.75,y:20.5},3).wait(1));

	// u_y79_y8_
	this.instance_5 = new lib.uy79y8("synched",0);
	this.instance_5.setTransform(2.25,-29.1,1,1,0,0,0,2.5,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).to({startPosition:0},3).wait(1));

	// uiltyguifyui
	this.instance_6 = new lib.uiltyguifyui("synched",0);
	this.instance_6.setTransform(-36.55,16.35,1,1,18.1953,0,0,-7.5,16.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regX:-7.7,rotation:11.2599,x:-37.4,y:12.9},3).to({rotation:4.3267,x:-38.05,y:9.45},3).to({regY:16.3,rotation:-2.6054,x:-38.45,y:6.05},3).to({regX:-7.5,regY:16.4,rotation:-9.5422,x:-38.9,y:2.4},3).to({regX:-7.6,rotation:-2.6071,x:-38.4,y:5.95},3).to({regY:16.3,rotation:4.3249,x:-37.95,y:9.4},3).to({rotation:11.2592,x:-37.3,y:12.95},3).to({regX:-7.5,regY:16.4,rotation:18.1953,x:-36.55,y:16.35},3).wait(1));

	// rtysty
	this.instance_7 = new lib.rtysty("synched",0);
	this.instance_7.setTransform(-35.6,-150,1,1,-19.2439,0,0,8.2,2.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regX:8.1,rotation:-10.1209,x:-33.95,y:-150.15},3).to({rotation:-1.0002,x:-32.15,y:-150.3},3).to({regY:2,rotation:8.1197,x:-30.35,y:-150.5},3).to({regY:2.1,rotation:17.2449,x:-28.35,y:-150.55},3).to({rotation:8.1232,x:-30.3,y:-150.4},3).to({rotation:-0.9968,x:-32.1,y:-150.35},3).to({regX:8,regY:2,rotation:-10.1201,x:-34,y:-150.25},3).to({regX:8.2,regY:2.1,rotation:-19.2439,x:-35.6,y:-150},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.3,-274.2,241.9,540.3);


(lib.uilt7l78tl8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// io_y8_y89_
	this.instance = new lib.uilt78lt7("synched",0);
	this.instance.setTransform(239.5,-274.4);

	this.instance_1 = new lib.ioy8y89("synched",50);
	this.instance_1.setTransform(-2,-437.65,1,1,0,0,0,-3.8,-50.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.1,startPosition:24},49).to({_off:true},1).wait(4062));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50).to({_off:false},0).wait(2).to({rotation:-4.223,x:-11.75,y:-437.95,startPosition:52},0).wait(53).to({rotation:0,x:-2,y:-437.65,startPosition:105},0).wait(765).to({rotation:-3.1962,x:-9.5,y:-437.4,startPosition:870},0).wait(384).to({rotation:0,x:-2,y:-437.65,startPosition:1254},0).wait(135).to({regY:-50.9,rotation:-2.1923,x:-7.15,y:-437.8,startPosition:1389},0).wait(221).to({regY:-50.8,rotation:0,x:-2,y:-437.65,startPosition:1610},0).wait(1505).to({rotation:-4.2467,x:-14.05,y:-437.05,startPosition:3115},0).wait(411).to({rotation:0,x:-2,y:-437.65,startPosition:3526},0).wait(586));

	// iu_y79_789_
	this.instance_2 = new lib.iuy79789("synched",0);
	this.instance_2.setTransform(34.2,-417.3,1,1,0,0,0,-4.1,7.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50).to({_off:false},0).wait(2).to({rotation:-4.223,x:25.8,y:-420.35},0).wait(53).to({rotation:0,x:34.2,y:-417.3},0).wait(765).to({rotation:-3.1962,x:27.75,y:-419.1},0).wait(384).to({rotation:0,x:34.2,y:-417.3},0).wait(135).to({rotation:-2.1923,x:29.75,y:-418.8},0).wait(221).to({rotation:0,x:34.2,y:-417.3},0).wait(1505).to({regX:-4,rotation:7.2408,x:23,y:-418.75},0).wait(411).to({regX:-4.1,rotation:0,x:34.2,y:-417.3},0).wait(586));

	// uil7tlt78l
	this.instance_3 = new lib.uil7tlt78l("synched",0);
	this.instance_3.setTransform(50.55,-317.95,1,1,-98.2589,0,0,-10,13.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50).to({_off:false},0).wait(2).to({regX:-9.9,rotation:-22.7649,x:49.4,y:-322.6},0).wait(53).to({regX:-10,rotation:-98.2589,x:50.55,y:-317.95},0).wait(765).to({regX:-9.8,rotation:-41.5353,x:50.6,y:-318.15},0).wait(384).to({regX:-10,rotation:-98.2589,x:50.55,y:-317.95},0).wait(135).to({regX:-9.8,rotation:0.417,x:41.35,y:-321.35},0).wait(221).to({regX:-10,rotation:-98.2589,x:50.55,y:-317.95},0).wait(1505).to({regX:-9.8,rotation:-12.7886,x:21.7,y:-317.9},0).wait(411).to({regX:-10,rotation:-98.2589,x:50.55,y:-317.95},0).wait(586));

	// io_y89_89_
	this.instance_4 = new lib.ioy8989("synched",0);
	this.instance_4.setTransform(18,-331.15);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50).to({_off:false},0).wait(2).to({regY:-0.1,rotation:-4.223,x:16,y:-333.35},0).wait(53).to({regY:0,rotation:0,x:18,y:-331.15},0).wait(765).to({regY:-0.1,rotation:-3.1962,x:16.4,y:-332.3},0).wait(384).to({regY:0,rotation:0,x:18,y:-331.15},0).wait(135).to({regX:0.1,regY:-0.1,rotation:-2.1923,x:16.95,y:-332.15},0).wait(221).to({regX:0,regY:0,rotation:0,x:18,y:-331.15},0).wait(1505).to({regY:-0.1,rotation:-4.2467,x:13.75,y:-332.45},0).wait(411).to({regY:0,rotation:0,x:18,y:-331.15},0).wait(586));

	// ui_79_y8_8
	this.instance_5 = new lib.ui79y88("synched",0);
	this.instance_5.setTransform(-6.15,-298.45,1,1,0,0,0,-7.1,-3.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50).to({_off:false},0).wait(2).to({regY:-3.6,rotation:-4.223,x:-5.7,y:-299},0).wait(53).to({regY:-3.5,rotation:0,x:-6.15,y:-298.45},0).wait(765).to({regY:-3.6,rotation:-3.1962,x:-5.9,y:-298.3},0).wait(384).to({regY:-3.5,rotation:0,x:-6.15,y:-298.45},0).wait(135).to({regX:-7,rotation:-2.1923,x:-5.95,y:-298.5},0).wait(221).to({regX:-7.1,rotation:0,x:-6.15,y:-298.45},0).wait(1505).to({regX:-7.2,regY:-3.6,rotation:-4.2467,x:-7.95,y:-298.05},0).wait(411).to({regX:-7.1,regY:-3.5,rotation:0,x:-6.15,y:-298.45},0).wait(586));

	// yilt78lt78l
	this.instance_6 = new lib.yilt78lt78l("synched",0);
	this.instance_6.setTransform(23.95,-242.9,1,1,0,0,0,-2.6,12.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(50).to({_off:false},0).wait(2).to({startPosition:0},0).wait(53).to({startPosition:0},0).wait(765).to({startPosition:0},0).wait(384).to({startPosition:0},0).wait(135).to({startPosition:0},0).wait(221).to({startPosition:0},0).wait(1505).to({startPosition:0},0).wait(411).to({startPosition:0},0).wait(586));

	// u_y79_y8_
	this.instance_7 = new lib.uy79y8("synched",0);
	this.instance_7.setTransform(2.15,-303.5,1,1,0,0,0,2.5,7);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(50).to({_off:false},0).wait(2).to({startPosition:0},0).wait(53).to({startPosition:0},0).wait(765).to({startPosition:0},0).wait(384).to({startPosition:0},0).wait(135).to({startPosition:0},0).wait(221).to({startPosition:0},0).wait(1505).to({startPosition:0},0).wait(411).to({startPosition:0},0).wait(586));

	// uiltyguifyui
	this.instance_8 = new lib.uiltyguifyui("synched",0);
	this.instance_8.setTransform(-36.75,-258.1,1,1,0,0,0,-7.6,16.4);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50).to({_off:false},0).wait(2).to({startPosition:0},0).wait(53).to({startPosition:0},0).wait(765).to({startPosition:0},0).wait(384).to({startPosition:0},0).wait(135).to({startPosition:0},0).wait(221).to({startPosition:0},0).wait(1505).to({startPosition:0},0).wait(411).to({startPosition:0},0).wait(586));

	// Layer_15
	this.instance_9 = new lib.rtysty("synched",0);
	this.instance_9.setTransform(-35.7,-424.4,1,1,0,0,0,8.2,2.1);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50).to({_off:false},0).wait(2).to({regX:8.1,rotation:-4.223,x:-44.45,y:-422.3},0).wait(53).to({regX:8.2,rotation:0,x:-35.7,y:-424.4},0).wait(765).to({regX:8.1,regY:2,rotation:-8.8939,x:-42.5,y:-422.4},0).wait(384).to({regX:8.2,regY:2.1,rotation:0,x:-35.7,y:-424.4},0).wait(135).to({rotation:-2.1923,x:-40.3,y:-423.2},0).wait(221).to({rotation:0,x:-35.7,y:-424.4},0).wait(1505).to({rotation:-7.9641,x:-46.7,y:-421.35},0).wait(411).to({rotation:0,x:-35.7,y:-424.4},0).wait(586));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.4,-549.2,481.5,549);


(lib.iult78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// i_8y9_y8_9y98
	this.instance = new lib.i8y9y89y98("synched",0);
	this.instance.setTransform(-11.75,-216.25,1,1,0,0,0,0.5,-12.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67).to({rotation:-6.9746,startPosition:67},0).wait(4045));

	// uilt7l8t8l
	this.instance_1 = new lib.uilt7l8t8l("synched",0);
	this.instance_1.setTransform(-28.75,-149.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(67).to({startPosition:0},0).wait(4045));

	// u_y79y89_8_
	this.instance_2 = new lib.uy79y898("synched",0);
	this.instance_2.setTransform(-36.2,-189.9,1,1,0,0,0,5.9,1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(67).to({startPosition:0},0).wait(4045));

	// i__80_80_80_
	this.instance_3 = new lib.i808080("synched",0);
	this.instance_3.setTransform(29.3,-117.4,1,1,0,0,0,5.9,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(67).to({startPosition:0},0).wait(4045));

	// ui_l7l7t8lt78l
	this.instance_4 = new lib.uil7l7t8lt78l("synched",0);
	this.instance_4.setTransform(-0.25,-74.8,1,1,0,0,0,0,-0.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(67).to({startPosition:0},0).wait(4045));

	// uilt7lt78l
	this.instance_5 = new lib.uilt7lt78l("synched",0);
	this.instance_5.setTransform(15.1,-188.15,1,1,0,0,0,9.2,3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(67).to({startPosition:0},0).wait(4045));

	// uo_89_y89_y89_
	this.instance_6 = new lib.uo89y89y89("synched",0);
	this.instance_6.setTransform(1.35,-67.1,1,1,0,0,0,49.8,15.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(67).to({startPosition:0},0).wait(4045));

	// uio_y79_y89_
	this.instance_7 = new lib.uioy79y89("synched",0);
	this.instance_7.setTransform(-45.7,-131.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(67).to({startPosition:0},0).wait(4045));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.4,-318.8,160.4,318.90000000000003);


(lib.io8y989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.iult78lt78l("synched",0);
	this.instance.setTransform(-1.35,143.1,1,1,0,0,0,0,-159.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4112));

	// Layer_4
	this.instance_1 = new lib.uilt78lt78("synched",0);
	this.instance_1.setTransform(209.4,161.8,1,1,0,0,0,-0.1,-185.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4112));

	// Layer_6
	this.instance_2 = new lib.uiltfyudtyu("synched",0);
	this.instance_2.setTransform(169.6,238.65,1,1,0,0,0,-24.8,-38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4112));

	// Layer_7
	this.instance_3 = new lib.yiult78l78l("synched",0);
	this.instance_3.setTransform(-182.5,161.55,1,1,0,0,0,-0.1,-200.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4112));

	// Layer_5
	this.instance_4 = new lib.uilt7l78tl8l("synched",0);
	this.instance_4.setTransform(63,279.75,1,1,0,0,0,-1.8,-21.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4112));

	// Layer_8
	this.instance_5 = new lib.Bitmap1();
	this.instance_5.setTransform(-691,-625);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-691,-625,1214.5,987.3);


(lib.uilt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.io8y989("synched",0);
	this.instance.setTransform(-128.4,-131.2,1,1,0,0,0,-128.4,-131.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(52).to({regX:-128.3,regY:-131.1,scaleX:2.0936,scaleY:2.0936,x:-511.6,y:64.8,startPosition:52},0).wait(137).to({regX:-128.4,regY:-131.2,scaleX:1,scaleY:1,x:-128.4,y:-131.2,startPosition:189},0).wait(66).to({regX:-128.5,regY:-131.1,scaleX:2.0396,scaleY:2.0396,x:62.3,y:-373.45,startPosition:255},0).wait(110).to({regX:-128.4,regY:-131.2,scaleX:1,scaleY:1,x:-128.4,y:-131.2,startPosition:365},0).wait(60).to({regX:-128.5,regY:-131.1,scaleX:2.4099,scaleY:2.4099,x:-739.45,y:-458.15,startPosition:425},0).wait(245).to({regX:-128.4,scaleX:1.8613,scaleY:1.8613,x:-248.7,y:-368.4,startPosition:670},0).wait(191).to({regX:-128.3,regY:-131.2,scaleX:2.4502,scaleY:2.4502,x:-528.2,y:74.5,startPosition:861},0).wait(406).to({x:-747.35,y:81.15,startPosition:1267},0).wait(119).to({x:-485.1,y:66.2,startPosition:1386},0).wait(230).to({regY:-131.1,scaleX:2.0161,scaleY:2.0161,x:-573.05,y:-380.05,startPosition:1616},0).wait(917).to({regX:-128.4,regY:-131.2,scaleX:1.6776,scaleY:1.6776,x:-410.55,y:34.75,startPosition:2533},0).wait(82).to({regY:-131.1,scaleX:1.7806,scaleY:1.7806,x:-465.35,y:-303.75,startPosition:2615},0).wait(357).to({regX:-128.3,scaleX:1.747,scaleY:1.747,x:-448.6,y:34.9,startPosition:2972},0).wait(138).to({regX:-128.4,scaleX:2.0768,scaleY:2.0768,x:-392.2,y:-6.55,startPosition:3110},0).wait(421).to({x:-584.75,y:18.35,startPosition:3531},0).wait(41).to({regX:-128.5,scaleX:2.42,scaleY:2.42,x:87.25,y:-481.3,startPosition:3572},0).wait(115).to({regX:-128.4,regY:-131.2,scaleX:1,scaleY:1,x:-128.4,y:-131.2,startPosition:3687},0).wait(31).to({startPosition:3718},0).to({_off:true},1).wait(393));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2126,-1676.5,3576.9,2966.8);


// stage content:
(lib.m4l4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,40,670,1628,2613,3110,3718];
	this.streamSoundSymbolsList[40] = [{id:"audio1",startFrame:40,endFrame:670,loop:1,offset:0}];
	this.streamSoundSymbolsList[670] = [{id:"audio2",startFrame:670,endFrame:1628,loop:1,offset:0}];
	this.streamSoundSymbolsList[1628] = [{id:"audio3",startFrame:1628,endFrame:2613,loop:1,offset:0}];
	this.streamSoundSymbolsList[2613] = [{id:"audio4",startFrame:2613,endFrame:3110,loop:1,offset:0}];
	this.streamSoundSymbolsList[3110] = [{id:"audio5",startFrame:3110,endFrame:3719,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		//this.gotoAndPlay("m1");
	}
	this.frame_40 = function() {
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,40,670,1);
	}
	this.frame_670 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,670,1628,1);
	}
	this.frame_1628 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,1628,2613,1);
	}
	this.frame_2613 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,2613,3110,1);
	}
	this.frame_3110 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,3110,3719,1);
	}
	this.frame_3718 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(40).call(this.frame_40).wait(630).call(this.frame_670).wait(958).call(this.frame_1628).wait(985).call(this.frame_2613).wait(497).call(this.frame_3110).wait(608).call(this.frame_3718).wait(1));

	// Layer_4
	this.instance = new lib.uilt78lt78l("synched",0);
	this.instance.setTransform(232.9,229.25,1.3022,1.3022,0,0,0,-128.3,-131.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3719));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-1968.5,-1383.2,4257.8,3463.3);
// library properties:
lib.properties = {
	id: 'E15142497A5334479A4A47DEC9B58A61',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_43.png", id:"CachedBmp_43"},
		{src:"images/CachedBmp_42.png", id:"CachedBmp_42"},
		{src:"images/CachedBmp_40.png", id:"CachedBmp_40"},
		{src:"images/CachedBmp_37.png", id:"CachedBmp_37"},
		{src:"images/CachedBmp_34.png", id:"CachedBmp_34"},
		{src:"images/CachedBmp_32.png", id:"CachedBmp_32"},
		{src:"images/CachedBmp_31.png", id:"CachedBmp_31"},
		{src:"images/CachedBmp_30.png", id:"CachedBmp_30"},
		{src:"images/CachedBmp_29.png", id:"CachedBmp_29"},
		{src:"images/CachedBmp_26.png", id:"CachedBmp_26"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/m4l4_atlas_1.png", id:"m4l4_atlas_1"},
		{src:"images/m4l4_atlas_2.png", id:"m4l4_atlas_2"},
		{src:"images/m4l4_atlas_3.png", id:"m4l4_atlas_3"},
		{src:"images/m4l4_atlas_4.png", id:"m4l4_atlas_4"},
		{src:"images/m4l4_atlas_5.png", id:"m4l4_atlas_5"},
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio2.mp3", id:"audio2"},
		{src:"sounds/audio3.mp3", id:"audio3"},
		{src:"sounds/audio4.mp3", id:"audio4"},
		{src:"sounds/audio5.mp3", id:"audio5"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E15142497A5334479A4A47DEC9B58A61'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;