(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m4l1_atlas_1", frames: [[357,132,95,51],[82,207,79,48],[0,111,355,46],[454,170,51,46],[163,207,51,46],[0,159,355,46],[0,0,356,109],[358,67,78,63],[357,185,78,62],[454,118,50,50],[322,249,44,45],[438,67,66,49],[358,0,97,65],[265,207,55,41],[0,207,80,54],[437,218,46,47],[457,0,51,52],[265,250,41,42],[368,249,44,44],[216,207,47,48],[163,255,38,39]]}
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



(lib.CachedBmp_54 = function() {
	this.initialize(img.CachedBmp_54);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,314,1193);


(lib.CachedBmp_53 = function() {
	this.initialize(img.CachedBmp_53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,584,1685);


(lib.CachedBmp_52 = function() {
	this.initialize(img.CachedBmp_52);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,606,2184);


(lib.CachedBmp_51 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(img.CachedBmp_50);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,556,1587);


(lib.CachedBmp_49 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,595,1515);


(lib.CachedBmp_60 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["m4l1_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,918);// helper functions:

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


(lib.yuilt6lt68lt867l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-46.45,0,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.4,0,93,353.3);


(lib.ytk5e7ke57k = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D94E4D").s().p("AhFCvIhFg9QATg1AQg6IAMguQAJh3A+gtQATgOAVgFQALgCAHAAQBxA9gOCOQgHBHgdA7IgdB7IgMABQg5AAhIg2g");
	this.shape.setTransform(-29.118,47.8104,2.0925,2.0925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AifGZQgWgYAAgiQAAgIABgHIgBAAIAHgTQAqiAAih1QA6jIAJhiIABgJQgBgMAAgNQAAhHAfg0QAfgyAsAAQAtAAAfAyQAfA0AABHIgBAZIABAAIgBAGQgHA7gdAoQiPGVghBUQgDAggWAVQgVAWgdAAQgfAAgWgZg");
	this.shape_1.setTransform(-40.9973,95.5032,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.1,0,79.1,186.3);


(lib.yiult678lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C4A082").s().p("AhBgMIg6iHIgBgCQgMggALgfQAMgeAdgLQAdgLAeAPQAcAPAMAgQAHAQAAARQAtDrAlBmQASAzAJAEQgjANgaANIgTAKQgyh4hCiXg");
	this.shape.setTransform(27.3716,53.942,2.0918,2.0918);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AAwCmQgJgBgFgJIgGgUQgghjgFgGQgRgXAYBIQANArABAPQAAAIgGACQgGADgFgDQgKgGgGgZQgWhWgGgEQgCgBALAtQAMAwgIACQgIACgEgEQgFgFgIgXQgZhEgNhPQgOhZATgIQBDgbAlAgQAhAcAyB0IAJAcQAHAegHAHQgHAGgIgOIgOgbIgUguQgPgjgDAEQgHAIAGAUQALAkAzBkQAKAWgMAHQgNAGgJgUIgXgtQgWgqgDAAQgCABAXBAQAXA8gSAAIgCAAg");
	this.shape_1.setTransform(57.7673,133.7493,2.0918,2.0918);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,-0.2,80,168.79999999999998);


(lib.yiul6rlr68l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#EBBF9A").s().p("AhEgfIgGiSIABgCQAAgiAVgZQAXgYAdAAQAfAAAWAYQAWAZAAAiQAAASgGAPQgqDsgDBsQgBA1AHAIQgkAAgeACIgVACQgDh/gIing");
	this.shape.setTransform(3.0349,54.945,2.0918,2.0918);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgNCuQgIgEgBgLIABgUIADg5QACgwgCgHQgIgbgEBMQgCAtgFANQgCAJgHAAQgIAAgDgFQgHgJADgaIAHg8QADgegEgEQgBgBgGAuQgGAwgIAAQgIgBgDgFQgCgHAAgYQAChGAQhQQAThZAUAAQBIgCAYArQAVAmAFB9IgCAeQgEAfgJAEQgJAEgDgRIgDgeIgCgzQgBglgFADQgJAEgCAVQgDAmAMBvQACAZgOABQgOACgCgWIgFgzQgGgvgCAAQgDgBgBBFQgBA6gNAAIgEgBg");
	this.shape_1.setTransform(-0.0592,140.656,2.0918,2.0918);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.8,-0.1,37.5,177.5);


(lib.uykrtkr6k = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#DCB783").s().p("AhrLeQAGgwgEkuIgGleQgBhKgPhiQgFgegaiOQgKgxAAhEQAAhZAlhOQAfhCBHhSIAKAHQAGADgFAGIgKAMQgCAFgLAMQgLANgCAEQgQAdgDAKQgHAVAJARQA6BjAOBxQAGAqAGBWQAKBKAcAuQALATAWAZIAlApQAtA0ADAtQABAYgIAcQgGATgPAfQgFAMgKEHQgKEIgGALQgIASgIAHQgHAHgQAEQgxAQgyAAQgnAAgogJg");
	this.shape.setTransform(-51.0947,155.5086,2.0928,2.0928);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DCB783").s().p("AAAH/Qh6gQg1AHQgCgZAJiZQAIidAGgUQAMgpgDhHQgEhRgBgpQgChFAJg0QAPhdA1hTQA1hSBOg1QANgJAKAAQAGABAFAEQAFAFgCAGIgQgDQAWA4gKBNQgFAogaBfQgTBGAHBNQAGBAAZBRIAHAdQAEASAEAKQAIASAiDEQAjDFAHAQQgiAAiOgSg");
	this.shape_1.setTransform(49.6111,179.773,2.0928,2.0928);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.4,0,172.9,311);


(lib.uiylt687lt8 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C3AAB6").s().p("AhIC6IhJhBQAUg4ARg9IANgxQAJh/BBgvQAfgYAeACQB3BAgPCXQgHBLgfA+IgeCDIgNAAQg7AAhMg4g");
	this.shape.setTransform(10.9219,50.7382,2.0926,2.0926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AinGzQgXgaAAglIABgQIgBAAIAHgUQAsiFAkh/QA9jUAJhnIABgLIgBgaQAAhMAhg2QAgg2AvAAQAuAAAhA2QAhA2AABMQAAAOgBAMIABABIgCAFQgGA/geArQiaG3ggBQIAAAAQgDAigXAXQgWAXgfAAQggAAgXgag");
	this.shape_1.setTransform(-1.4955,101.3572,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.5,0,83,197.8);


(lib.uioy89y79 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(-86.45,-249.45,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.4,-249.4,172.9,498.9);


(lib.uioy8989 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(-89.7,-323.35,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89.7,-323.3,179.5,646.7);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("AhIghQgGiSAAgJIAAgCQAAgkAXgaQAXgbAgAAQAgAAAYAbQAXAaAAAkQAAASgHASQgsD5gDBzQgCA5AIAIQgmAAgeACIgXACQgEiEgIi0g");
	this.shape.setTransform(3.2506,58.4105,2.0922,2.0922);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgNC5QgJgFgBgLIABgVIADg9QACgygCgIQgIgegEBRQgDAwgFAOQgCAJgHAAQgJAAgDgEQgHgKADgcIAHg/QADgggEgEQgBgCgGAyQgGAzgJgBQgIAAgDgGQgDgHABgbQABhKAShVQATheAWAAQBLgDAZAvQAWApAGCEIgDAgQgEAhgJAEQgKADgDgRIgDgfIgCg2QgBgogFACQgKAFgCAWQgDAoANB3QABAagOABQgPACgCgXIgFg1QgGgzgDgBQgCAAgBBJQgBA+gOAAIgEgBg");
	this.shape_1.setTransform(-0.0484,149.4222,2.0922,2.0922);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.8,0,39.6,188.4);


(lib.uilt7lt78ltry = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D0AD89").s().p("AgiEVQAJgIgCg5QgDh0gyj8QgIgSAAgRQAAglAagbQAagaAkAAQAlAAAaAaQAaAbAAAlIAAACQAAAJgHCTQgJC0gECHQgigFhFAAg");
	this.shape.setTransform(-3.9473,58.752,2.0917,2.0917);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0AD89").s().p("AgFB9QgChKgCABQgDAAgHAzIgGA2QgDAYgQgCQgQgCABgaQAPh3gEgpQgCgWgLgFQgFgCgCAnIgCA3IgDAgQgEARgKgEQgLgEgFghIgDggQAHiFAZgqQAcguBUACQAZABAWBfQAUBVABBLQABAbgEAHQgCAFgKABQgKAAgHgzQgGgygCACQgGAGANBeQAEAcgIAJQgEAGgKAAQgHAAgDgJQgGgPgDgwQgFhRgIAdQgCAIACAzIADA8IABAWQgBAMgKAEIgFACQgPAAgBg/g");
	this.shape_1.setTransform(-0.2312,150.4263,2.0917,2.0917);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,-0.2,44.6,189.89999999999998);


(lib.uil7tlt78l87 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-82.4,-235.05,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-82.4,-235,164.7,470);


(lib.oiuy8y98y98 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-88.1,-224.35,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88.1,-224.3,176.2,448.6);


(lib.oiu8y989 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#BE4339").s().p("AhZgbIgQiVIAAgDQgFgkAUgdQAUgdAggEQAggEAZAXQAaAXAFAlQADASgFARQgND+AiBrQASA2AUADIibAXQgWiSgTifg");
	this.shape.setTransform(-2.7699,58.1978,2.0922,2.0922);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A8845F").s().p("AAEC4QgJgEgCgLIgCgWQgIhsgEgJQgKgdAFBRQADAwgDAPQgBAJgHABQgIABgFgFQgIgIAAgcQAAhegGgFQgCgCABAyQAAAzgJABQgJAAgDgFQgDgHgDgaQgIhMAHhUQAIhgAVgDQBKgMAfArQAbAmAWCCIABAgQAAAhgJAFQgJAGgFgRIgHgfIgIg1QgGgogFADQgJAHABAWQACAoAbB0QAFAagPADQgOADgFgXIgMg0QgMgxgDAAQgCAAAIBIQAGA/gPAAIgDAAg");
	this.shape_1.setTransform(5.3337,149.2275,2.0922,2.0922);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.1,0,50.2,187.8);


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
	this.shape.graphics.f("#B4A58E").s().p("AhVD0IghiEQgjg/gIhLQgRiYCGhBIAVACQAaAFAWAPQBJAwAKB/IAOAyQATA9AXA5QgiAhgwAgQhWA5hCAAIgPAAg");
	this.shape.setTransform(34.3607,51.1393,2.0924,2.0924);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0AD89").s().p("ABDG5QgZgXgDgiIgBAAQgohbipmwQgigqgHhBIgCgEIABgBQgBgOAAgNQAAhNAlg2QAlg2A0gBQA1ABAkA2QAlA2AABNQAAANgBAOIABAKQALBpBEDVQArCHAwB+IAHAVIgBAAIABAQQAAAlgaAaQgZAaglAAQgjAAgZgXg");
	this.shape_1.setTransform(48.3605,102.1213,2.0924,2.0924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,93.4,199.3);


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


(lib.iul7yt8lt87l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C4A082").s().p("AhEgNIg9iOIgBgDQgNgiAMggQAMghAfgMQAegLAfAQQAeAQANAiQAHARAAASQAwD6AmBsQATA2AKAEQglAOgbANIgVALQg0h+hFiig");
	this.shape.setTransform(28.7922,57.4239,2.0922,2.0922);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AAzCxQgKgCgFgKIgHgUQgghngGgJQgSgaAZBOQAOAuAAAPQABAJgGADQgHACgGgDQgJgGgHgbIgQg+QgJgegFgDQgCgBAMAwQANAygJADQgIACgEgEQgFgGgJgZQgahHgNhUQgPheATgJQBHgdAmAiQAkAeA0B7IAJAdQAIAggHAHQgIAHgJgPIgOgcIgVgxQgPglgEAEQgIAIAHAVQALAnA2BqQALAYgNAGQgNAHgKgVIgZgwQgXgtgDABQgCAAAZBFQAXBAgSAAIgCAAg");
	this.shape_1.setTransform(60.7493,142.1793,2.0922,2.0922);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,84,179.1);


(lib.iu7t8lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#A94242").s().p("AgRDJIhXghQgBg4gGg7IgFgxQgjhxAphAQANgTATgNIAQgIQB/ARAmCKQATBEgGBBIASB9QgbAOgnAAQglAAgwgNg");
	this.shape.setTransform(0.006,44.8248,2.0925,2.0925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AASGyQgcgQgNggIgEgOIgBAAIgBgUQgGiEgLh8QgSjPgbheIgCgJIgKgXQgahDALg7QALg6ApgQQAqgPAuAkQAwAkAaBDIAIAYIABAAIAAAFQAQA5gMAxQAMGugCBZQAJAfgMAcQgNAcgbAKQgMAEgMAAQgRAAgRgIg");
	this.shape_1.setTransform(-1.483,97.4622,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.9,0,55.9,190);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0AD89").s().p("AAuDzQgegPgNggIgBgCIgwiKQg4ibguh5IAVgGQAcgJAigOIABAKQADARAOAfQArBjB/DKQAMANAHAQQANAggLAfQgLAfgdAMQgNAFgNAAQgQAAgQgHg");
	this.shape.setTransform(-31.2977,-52.5814,2.0917,2.0917);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0AD89").s().p("AgdBpQgthDgdhBQgKgXAAgHQAAgGAIgEQAIgDAXAqQAWAoABgCQACgFgOgaIgdg0QgMgXACgLQACgGAHgDQAGgDAGAHQAJALATApQAhBCgEgaQgBgLgshbQgGgMgCgHQgDgKAGgHQANgPAaA9QAbA/ACgBQAEgCgdheQgGgVANgEQANgEAIAXQAeBsASAjQAJASAKAAQAGABgNgjIgSgwIgIgdQgEgQAKAAQAPAAAXA2QArB1gFAsQgGAyhDAZIgEABQgUAAgthEg");
	this.shape_1.setTransform(-66.3882,-130.1939,2.0917,2.0917);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90.1,-166.3,89.89999999999999,166.10000000000002);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A29582").s().p("AgaDCQhmgBgsgqIA1hzQADgQAIgXQAPgvAYgnQBKh5B/ATIANANQAPARAHAXQAWBIhCBjIgTAtQgWA3gQA2QgnAHgvAAIgGAAg");
	this.shape.setTransform(-36.0725,40.6328,2.0924,2.0924);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0AD89").s().p("Ai/GRQgXgSgEgeQgEgeARgbIAAAAQAVhNCGmjQADgxAegzIACgFIABAAIAOgVQArg5A4gVQA4gWAjAbQAjAagFA8QgGA7gsA5QgGAJgKAKIgFAIQg0BUhLDBQguB4gpB5IgGATIgBgBIgIANQgVAbghAHQgIACgIAAQgXAAgSgOg");
	this.shape_1.setTransform(-47.5866,90.4034,2.0924,2.0924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.6,0,93.6,177.2);


(lib.io8y9y89 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#923933").s().p("AAKHMQgdgQgNgjIgEgPIgBAAIgBgVQgDiGgJiKQgQjbgahlIgDgKIgKgZQgahHANg+QANg+ArgQQAsgPAxAnQAxAnAaBIIAIAZIABABIAAAFQAPA+gNAyQAEHbgDBMIAAABQAIAggNAdQgNAegdAKQgMAEgMAAQgSAAgTgKg");
	this.shape.setTransform(0.0212,98.4342,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.7,0,51.5,196.9);


(lib.io8y8y9 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#923933").s().p("AhigOQghhcgQgzIgBgCQgMgiAMghQANggAfgLQAfgLAeAQQAfARAMAjQAFARAAASQAsD6A5BhQAdAwAUgBQglANg6AYIg0AUQg1iLg1iVg");
	this.shape.setTransform(32.4304,57.363,2.0922,2.0922);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#856A4F").s().p("AAvCxQgKgBgFgKIgGgVQgchjgIgNQgRgYAXBMQANAuAAAPQABAJgHADQgHACgFgDQgKgHgGgbIgPg9QgIgfgFgDQgCgBALAwQAMAygJADQgIACgEgEQgFgGgIgZQgZhHgMhVQgNhfATgIQBHgcAmAjQAjAfAzB7IAIAeQAHAggHAHQgIAHgIgPIgOgdIgUgxQgPglgEAEQgIAHAGAWQALAnA0BrQALAYgNAGQgOAHgJgWIgYgwQgWgtgDAAQgCABAXBEQAWBAgSAAIgCAAg");
	this.shape_1.setTransform(58.699,142.8915,2.0922,2.0922);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81.6,180);


(lib.ilt768lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#9D8A93").s().p("AgSDVIhcgiQgBg8gGg/IgFgzQglh5ArhDQAWgiAdgJQCFASAoCSQAUBIgHBGIATCEQgcAPgpAAQgoAAgxgOg");
	this.shape.setTransform(0.0056,47.5743,2.0926,2.0926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AATHMQgegQgNgiIgFgPIgBAAIgBgWQgFiFgMiKQgTjbgchlIgDgKIgLgYQgbhHAMg+QAMg+ArgRQAsgQAxAmQAxAnAcBHIAIAZIABABIABAFQAQA9gNAzQANHBgCBmIAAAAQAJAhgNAdQgMAegdALQgNAFgNAAQgRAAgSgKg");
	this.shape_1.setTransform(-1.5298,103.4313,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.3,0,58.7,201.7);


(lib.hjlyui = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#BE4339").s().p("Ah3HCQgagXgFgkIAAgQIgCAAIAFgVQBTmmgFioIAAgKIgEgaQgKhMAbg5QAZg6AugFQAugGAnAyQAnAxAKBLIACAbIABAAIgBAGQABA/gZAuQhgHAgYBaIAAAAQAAAigRAaQgUAZgfAEIgJABQgaAAgXgUg");
	this.shape.setTransform(0.0042,98.2355,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.9,0,63.8,196.5);


(lib.hgjdtyekjtykeku = function(mode,startPosition,loop,reversed) {
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


(lib.Path_1_0 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#F2F0F3").s().p("AgvA/QgYgOgRgfQgOgZADgSQADgOANgLQAagWA8AAQAZAAAaAFQAXADAHAEQAZAQgNAwQgTA9hCAHIgNABQgaAAgTgKg");
	this.shape.setTransform(10.0209,7.2871);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_0, new cjs.Rectangle(0,0,20.1,14.6), null);


(lib.Path_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#F2F0F3").s().p("AgJBIQgqgEgXgbQgOgQgGgVQgPgvAbgRQAGgEAXgDQAagFAaAAQA8AAAZAWQANALADAOQADASgOAZQgQAfgZAOQgTAKgZAAIgNgBg");
	this.shape.setTransform(9.9709,7.2871);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,20,14.6), null);


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
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(1.55,0.9,0.1503,0.1503);

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
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(1.6,0,0.1503,0.1503);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_0, new cjs.Rectangle(1.6,0,6.6,6.8), null);


(lib.fgyjrtyj5sewkjew4 = function(mode,startPosition,loop,reversed) {
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

	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-5.95,-2.6,0.0914,0.0914);

	this.instance_1 = new lib.CachedBmp_38();
	this.instance_1.setTransform(-5.65,-1.9,0.0914,0.0914);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[{t:this.instance_1}]},3).to({state:[]},1).wait(15));

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


(lib.fghndfgmjdhj = function(mode,startPosition,loop,reversed) {
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


(lib.tyutdyujyj = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E98E8E").s().p("Ag4AkQgKgHAHgOIAGgKQAJgJANADIAfgEQAjgKAcgZQgHATgRAUQgiAngyADQgGgBgFgEg");
	this.shape.setTransform(-1.6176,-1.5848,0.6215,0.6215,20.2067);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE7E7D").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAhgbAgQgUAZggARQgJAEgGAAQgJAAgFgHg");
	this.shape_1.setTransform(-1.1412,-0.4458,0.6215,0.6215,20.2067);

	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-5.95,-2.6,0.1106,0.1106);

	this.instance_1 = new lib.CachedBmp_36();
	this.instance_1.setTransform(-5.65,-1.9,0.1106,0.1106);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[{t:this.instance_1}]},4).to({state:[]},1).wait(12));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},10).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(13));

	// Layer_3
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E98E8E").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_5.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E98E8E").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_6.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E98E8E").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_7.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},10).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).wait(13));

	// Layer_4
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CE7E7D").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_8.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CE7E7D").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_9.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CE7E7D").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_10.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},10).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[]},1).wait(13));

	// Layer_5
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_11.setTransform(0.65,1.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_12.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11}]},11).to({state:[{t:this.shape_12}]},1).to({state:[]},1).wait(13));

	// Layer_6
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_13.setTransform(0.55,1.0856);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_14.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},11).to({state:[{t:this.shape_14}]},1).to({state:[]},1).wait(13));

	// Layer_7
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_15.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_16.setTransform(0.2313,-0.2179);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_17.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},10).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-2.8,9.4,7.8);


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


(lib.gjkfujyuli = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#8C6C63").s().p("AhRgKQgBgFABgBQABgCAEgBQANgDAPABQAMAAARAEIAgAFQAQABAPgEIAVgFQAPgEACgEQgRAshBALQgLACgLAAQguAAgNgng");
	this.shape.setTransform(-0.038,-5.0764,2.0882,2.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#957E75").s().p("AhEAlQgKgXAYgNIAHgCQANgEAcAAQAcgBAcgXQAOgMAIgMQACAtgrAdQgUAPglAOQgKAEgIAAQgRAAgHgRg");
	this.shape_1.setTransform(2.0914,-0.0274,2.0882,2.0882);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#957E75").s().p("Ah3BuQgggrAsgmQA5gCA3gVQA5gUAdguQAeguAHgbQAXBXhKBQQgjAnhHAsQgbARgVAAQgaAAgQgYg");
	this.shape_2.setTransform(16.9,-11.25,1,1,-1.7042,0,0,12.8,-13.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8C6C63").s().p("AhUgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFQARACAKgBQALAAAQgFIAXgFQgYAmhAALQgNACgKAAQgvAAgMgog");
	this.shape_3.setTransform(0.7451,-4.3977,2.0882,2.0882);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#957E75").s().p("Ah4B3QgfgqArgmQA6gCA3gVQA4gVAeguQAeguAIgtQAVBqhKBQQgiAnhIAsQgaAQgVAAQgaAAgRgYg");
	this.shape_4.setTransform(18.5,-8.05,1,1,-1.7042,0,0,12.8,-12.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6C63").s().p("AhXgOQgBgEABgCQABgCAEgBQAMgDAQABQALABASADIAfAFIAcADQAKABARgEQAQgFALgBQgdAjhAALQgMACgLAAQguAAgNgog");
	this.shape_5.setTransform(1.2672,-4.3716,2.0882,2.0882);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#957E75").s().p("Ah5B+QgggqAsgmQA5gCA3gVQA5gWAegtQAdguANg7QARB4hKBQQgjAnhHAsQgbAQgVAAQgZAAgRgYg");
	this.shape_6.setTransform(19.05,-5.95,1,1,-1.7042,0,0,12.6,-11.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8C6C63").s().p("AhZgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFIAbAEQALACAQgFIAhgIQgiAkhAALQgMACgLAAQguAAgNgog");
	this.shape_7.setTransform(1.737,-4.3716,2.0882,2.0882);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#957E75").s().p("Ah6CHQgfgrArgmQA5gCA4gVQA4gVAegtQAegvAOhLQAPCIhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgXg");
	this.shape_8.setTransform(20.05,-4.45,1,1,-1.7042,0,0,12.6,-10.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(7));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[]},1).wait(7));

	// Layer_5
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgPQAMgOAMgKIAMASQgIAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_12.setTransform(9.75,5.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgOQAMgPAMgKIALASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_13.setTransform(9.65,6.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},3).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(7));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},2).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[]},1).wait(7));

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
	this.shape_20.graphics.f("#8C6C63").s().p("AgFBWQgugFgUgpQgTgqATgkQASggAigOQARgFARAFQArASAQAsQASAugZAjQgVAdgjAAIgQgCgAgegGQgGAgAbALQAaAMAOgeQAMgcgTgPQgVgNgNgBIgBAAQgOAAgFAgg");
	this.shape_20.setTransform(1.1103,0.5369);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#AF3838").s().p("AgLAkQgagLAFggQAGghAPABQANABAUANQAUAPgNAcQgKAWgRAAQgFAAgIgEg");
	this.shape_21.setTransform(1.2969,0.6061);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},2).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-11.2,38.1,34.099999999999994);


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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(1.5,0,0.1417,0.1417);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(1.5,0,6.5,6.7), null);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(2.5,0.45,0.1424,0.1424);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(2.5,0.5,7.300000000000001,7.4), null);


(lib.ClipGroup_3_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(3.05,0,0.1569,0.1569);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(3.1,0,6.4,6.6), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AgxAQQgJgGgCgGQALgNAVgKQApgTAwAZQgCAKgIAKQgRAUggABIgCAAQgfAAgSgMg");
	mask.setTransform(6.125,2.8035);

	// Layer_3
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(2.1,0,0.131,0.131);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.1,0,5.800000000000001,5.6), null);


(lib.ClipGroup_1_0 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(7.35,0.5,0.1538,0.1538);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0, new cjs.Rectangle(7.4,0.5,7.199999999999999,7.4), null);


(lib.ClipGroup_1 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AAAAYQgcAAgPgSQgIgIgCgJQArgWAjARQATAIAKAMQgDAFgHAFQgQAKgbAAIgBAAg");
	mask.setTransform(5.35,2.4226);

	// Layer_3
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(2.95,0,0.131,0.131);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(3,0,5,4.9), null);


(lib.ghjdtjtyktyktut = function(mode,startPosition,loop,reversed) {
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},1).wait(5));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},8).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(5));

	// Layer_8
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgwgDIgOgfQA9AjA/gGIAAAog");
	this.shape_16.setTransform(13.2,6.575);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(11).to({_off:false},0).to({_off:true},1).wait(5));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).wait(5));

	// Layer_4
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#971B30").s().p("AhQAqIgeh7IBHBJQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIAAgCIAOgGIACgDIAMgGIADgDIALgEIAEAAIAMgGIANgDIAEgCIBIgPIgJAgIgIBIQgCAfAKAGg");
	this.shape_20.setTransform(12.8538,0.0451,0.7334,0.7334);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#971B30").s().p("Ag4AXIgahTIA3AuQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAgBIAKgFIACgCIAJgEIACgDIAHgDIADAAIAJgEIAKgCIACgCIA1gLIgGAXQgJAZgDAjQABAUAGAIIgMABQg8AAg4gmg");
	this.shape_21.setTransform(12.65,0.8218);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#971B30").s().p("AAHA+QgcgMgfgpIgjhMIBBAoQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABAAIAAgBIAKgEIABgDIAIgEIACgCIAIgDIAEAAIAJgFIAKgCIACgBIA1gLIgHAXQgJAZgCAiIAAAWQAAAMACAGQgTAKgTAAQgOAAgNgGg");
	this.shape_22.setTransform(12.2,2.194);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},9).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-7.3,27.1,20.7);


(lib.uit779 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.io8y9y89("synched",0);
	this.instance.setTransform(4.2,18.1,1,1,0,0,0,4.2,18.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.7,0,51.5,196.9);


(lib.uhilughlui = function(mode,startPosition,loop,reversed) {
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

	// _Clip_Group__2_0
	this.instance_2 = new lib.ClipGroup_2_0("synched",0);
	this.instance_2.setTransform(-22.9,-45.3,1,1,0,0,0,6.2,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(11.35,-47,1,1,0,0,0,8.8,4.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


(lib.uty79t7 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.io8y8y9("synched",0);
	this.instance.setTransform(-24,12.8,1,1,0,0,0,16.8,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.8,0,81.6,180);


(lib.ilt78lt78lt78 = function(mode,startPosition,loop,reversed) {
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#343433").s().p("AA5AQQgcgVgmAIQggANgCgEQgLAEgIgJIgFgHQADADANACQgIgFgEgMIgDgLQADALAVAMQgIgFgEgKIgCgKIAHALQANALAfgDQAegCAZARQAMAIAGAJg");
	this.shape.setTransform(-28.449,-0.8756,2.0047,2.0047);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AAIARIgugFQgPABgEgDQgLgFgCgFQAGAFAMABQgJgGgEgHIASAJQgHgGgDgGQgEgFgCgIQAIALALAIQALAIAZABQAYABAVAFQAWAFAKAHIABABg");
	this.shape_1.setTransform(-28.5743,-0.2742,2.0047,2.0047);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AghANIgZgNQgLgDAAgKQAEAKAMACQgIgIgEgKQAJAKAIAFIgJgPQgEgHABgBIAQATQAMAMAYAFQAXAEAVABIAhAAIABABQgPAJgaADQgvgFgPgJg");
	this.shape_2.setTransform(-28.5242,1.5802,2.0047,2.0047);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#343433").s().p("AgfALIgdgOQgGgEgDgKQAHAKAJACQgIgHgEgLQAJAKAIAFIgJgPIgDgHQAFAJASAPQARARAVAGQAZAHATgFIASgFIAHgDQgMASgfACIgIAAQgiAAgQgUg");
	this.shape_3.setTransform(-28.5242,2.3054,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},19).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(25));

	// Layer_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EBBF9A").s().p("AhnANIAOg4IC0ADIANBUg");
	this.shape_4.setTransform(-24.925,0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBBF9A").s().p("AhvAKIAdg5IC0ADIAOBUQgrAIglAAQhTAAg8gmg");
	this.shape_5.setTransform(-25.65,0.4638);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EBBF9A").s().p("AhvAAIAdg5IC0ADIAOBUQg5AcgvAAQhEAAgzg6g");
	this.shape_6.setTransform(-25.65,1.4902);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EBBF9A").s().p("AhvAGIAdg5IC0ADIAOBVQgzAPgrAAQhLAAg2gug");
	this.shape_7.setTransform(-25.65,0.834);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EBBF9A").s().p("AhvAOIAdg5IC0ADIAOBUQiAgWhfgIg");
	this.shape_8.setTransform(-25.65,0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},19).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},1).to({state:[]},1).wait(25));

	// Layer_3
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#343433").s().p("Ag9AOQAZgRAjACQAiADAQgMQAHgGAAgGQgBASgOAIQAXgLAEgOQgCAWgPALQAPgCAEgGQgCAFgFAFQgJAKgNgEIgygHQgpgFgTAPg");
	this.shape_9.setTransform(28.0585,-3.9327,2.0047,2.0047);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#343433").s().p("AhkAOQApgMA/gCQBAgEAXgSQAXgTAmgFQgWAXgsAQQAvgJAlgQQgQAUg1ASQATAJAegVQgBAEgNANQgNANgwgDQgpgDhMAJQhOAJgxALg");
	this.shape_10.setTransform(27.4,-1.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#343433").s().p("AipAnIBKgFQA1ACA0gSQA0gSAXgQQAXgQAsgWQgWAXgnAdQAqgWAlgQQgQAUg3AfQAVgEAegVQgBAEgNANQgNANgtATQgtAShMACIgOAAQhEAAgsgQg");
	this.shape_11.setTransform(27.4,-0.4168);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#343433").s().p("AipAWIBGAWQA/ACA1gZQA2gXAVgVQAVgWAngaIg9BBIBPgzQgQAUg3AlQAVgJAegTIgOAPQgNANgsAeQgtAehOAKQgMACgMAAQg/AAgmgyg");
	this.shape_12.setTransform(27.4,1.2529);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9}]}).to({state:[{t:this.shape_10}]},19).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_11}]},2).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},1).wait(25));

	// Layer_9
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EBBF9A").s().p("AhBg0IClAJIAWA0IjzAtg");
	this.shape_13.setTransform(22.775,-2.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EBBF9A").s().p("Ah6A1IA7huIClAKIAVA0QhUA1hjAAQgeAAgggFg");
	this.shape_14.setTransform(22.6,-1.6272);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EBBF9A").s().p("Ah+AqIA7htIClAJIAdBEQhFA6hNAAQg0AAg3gag");
	this.shape_15.setTransform(22.975,-0.5953);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},19).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_14}]},2).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(25));

	// _Clip_Group__2
	this.instance = new lib.ClipGroup_2();
	this.instance.setTransform(22.75,2.55,2.0047,2.0047,0,0,0,6.3,2.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgxAQIgLgMIAggXQApgTAwAZQgCAKgIAKQgRAUggABIgCAAQgfAAgSgMg");
	this.shape_16.setTransform(22.6959,2.5895,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(50));

	// _Clip_Group__1
	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(-25.25,3.65,2.0047,2.0047,0,0,0,5.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_7
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAYQgcAAgOgSIgJgRQApgWAkARQASAIALAMQgDAFgIAFQgPAKgbAAIgCAAg");
	this.shape_17.setTransform(-25.2665,3.7303,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.7,-8.6,87.1,17.5);


(lib.ghjkdtktuktuykut = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.hgjdtyekjtykeku("synched",0);
	this.instance.setTransform(34.6,-7.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_4
	this.instance_1 = new lib.fghndfgmjdhj("synched",0);
	this.instance_1.setTransform(-28.3,2.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AjRgiQAGg4BngGQBzgGB2BfQhEBmiMACIgEAAQiNAAALiDg");
	mask.setTransform(-21.0351,8.974);

	// _Clip_Group__1_0
	this.instance_2 = new lib.ClipGroup_1_0();
	this.instance_2.setTransform(-27.45,11.1,2.0646,2.0646,0,0,0,8.5,4.9);

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
	this.instance_3 = new lib.ClipGroup_3_1();
	this.instance_3.setTransform(34.2,-2,2.023,2.023,0,0,0,5.5,4.4);

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
	this.instance_4 = new lib.fgyjrtyj5sewkjew4("synched",0);
	this.instance_4.setTransform(-24.9,8.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-24.5,100.3,43.7);


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
	this.instance_1.setTransform(30.8,1.45,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_2.setTransform(-33.45,-3.15,1.005,1.005);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55));

	// _Clip_Group__8 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AhKBHQhFgFgsgyIgfgvQBihBBZArQArAWAZAhQAAATgOATQgYAfg4AAIgRAAg");
	mask_1.setTransform(-21.8816,0.7521);

	// _Clip_Group__8
	this.instance_3 = new lib.ClipGroup_8();
	this.instance_3.setTransform(-32.95,0.2,2.0986,2.0986,0,0,0,6.2,3.8);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(55));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAHAiQgfgCgWgYIgOgWQAvgfApAUQAVALAMAPQAAAJgHAJQgMAPgaAAIgJAAg");
	this.shape_1.setTransform(-30.9617,0.7521,2.0986,2.0986);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.1,-11.4,100,22);


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

	// _Clip_Group__2_0
	this.instance_2 = new lib.ClipGroup_2_0("synched",0);
	this.instance_2.setTransform(-25.95,-45.4,1,1,0,0,0,6.2,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(3.3,-46.3,1,1,0,0,0,8.8,4.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


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

	// Layer_21
	this.instance = new lib.fgryjdsrtyjrsyj("single",8);
	this.instance.setTransform(-2.8,-42.7,3.2394,3.1326,0,-5.6147,174.6989,2.4,-3);

	this.instance_1 = new lib.CachedBmp_51();
	this.instance_1.setTransform(-5.5,-41.95,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},936).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},384).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},1497).wait(133));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:6},0).wait(3).to({startPosition:9},0).wait(5).to({startPosition:6},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(936).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(10).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(15).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(384).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).to({_off:true},1497).wait(133));

	// Layer_20
	this.instance_2 = new lib.uhilughlui("synched",37);
	this.instance_2.setTransform(10.45,-83.95,1.9708,1.9708,0,0.1761,-179.8239,-5.3,-45.1);

	this.instance_3 = new lib.dfggdfgzrs("synched",41);
	this.instance_3.setTransform(10.45,-83.95,1.9708,1.9708,0,0.1761,-179.8239,-5.3,-45.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},604).wait(2742));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AjLByQgjgLg9gCIAcixIBog+IGQAAIAOAOQAQAUAMAbQAlBUgSB9Qg8AGhcABIgTAAQisAAiagZg");
	this.shape.setTransform(19.4813,-139.1614,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3346));

	// Layer_10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4AD91").s().p("AAJA+QAcgWgqgfQgIgKgHgQQgNggAGgcIAGAfQAJAkATARIAJAKQAJALADAKQAJAghAAIg");
	this.shape_1.setTransform(29.7853,-72.2089,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3346));

	// Layer_11
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4AD91").s().p("AALAYQgDgRgIgOQgGgKgBgLQgBgMgIgLQAHABAFAKIAGAQQAUAegGAuIgFgcg");
	this.shape_2.setTransform(-61.471,-79.1142,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3346));

	// Layer_12
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E5BFA4").s().p("AAABfQgqgNgHhSQgDgkANgbQALgYASgHQARgIAMANQAOAPgCAhQgBAYAKgIQAFgEAGgKIgMCDQgMAGgMAAQgIAAgHgDg");
	this.shape_3.setTransform(-60.6304,-77.564,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3346));

	// Layer_13
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DCB783").s().p("AghAHIgcAOQgMAGgIgIIAVgYQAcgYAiAEQAkADAZAYQANAMAGAMQhDgmgwATg");
	this.shape_4.setTransform(56.5074,-110.1302,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3213).to({rotation:11.7439,x:58.0816,y:-113.5151},0).wait(133));

	// Layer_14
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DCB783").s().p("ABFASQgWgLgMgEQgvgNhYAiIAbgYQAlgaApgDQAugEAeAgQAPAPAFARQgNgCgTgLg");
	this.shape_5.setTransform(-9.4596,-111.9507,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3213).to({scaleX:2.0926,scaleY:2.0926,rotation:-6.7102,x:-10.38,y:-114.3468},0).wait(133));

	// Layer_15
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5BFA4").s().p("AhmFaQgYgTgUgZIgOgVQgngfgVg2QgPglgHg2IgJAKQgSAMgUgHQgogNgMhcQgGgoAPgcQAMgYAWgFQAVgFAPAPQARASgCAhQgCAXAFgGQACgDADgJQAOhCAJggQARg3AhgdQAhgcA9gwQAkggADgXQgGgCgEgFQgFgIAFgFQAFgEAEAOQABAFAAAFQAVAHA2gkQBGgsBWANQArAGAdAQQARA1ArBrQAdBaggArQgfAoAAAxQABBXgCAMQgIAzhABgQgjA1geAeQgnAmgkAGQgaAFgYAAQhKAAg9gvg");
	this.shape_6.setTransform(0.3139,-82.2786,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3346));

	// Layer_16
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DCB783").s().p("Ai4ElQiDgzgEh2QgGiqAdhYQAoh5B3gkQDohHCIBrQBFA2AVBDQglDiitCJQg2Aqg8AdIgyAUQhBgChCgZg");
	this.shape_7.setTransform(-10.455,-131.1471,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3346));

	// Layer_17
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DCB783").s().p("AggE6QgggfgshEQgbgpgHgYQgHgmgKgoQgDgNAAgTIABggIgCh1QAAgYAFgLQAQglABgPQABgLASghQAIgPApgsQAqgsBIgYQBKgaAxAQIgtA9QgqAVghAvQghAvgPA8QgTBKAIBeQAFBIAWBhQAJAnAXA1QAOAeAABCQhFgygVgUg");
	this.shape_8.setTransform(-48.2284,-113.6786,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3346));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373432").s().p("AgDBFQgRgQgGgRIgGgWIgKgRQgGgLgBgHQgCgIADgRIAIguQA3ASAZAvQAMAZgBAaQgBAcgQAVQgDAGgEgCIADAQQgWgOgLgKg");
	this.shape_9.setTransform(65.1036,-138.5943,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3346));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DCB783").s().p("ACpDNQgSgQgOADQhAAMhCgHQhBgIg8gZQg+gagjgnQgegfgPgtQgKgcACgcQACgfAQgXQALgPAegXIBKg3IgIgGQAQgBAygPQAngMAaAIQAfAKBKARQBAASAdAcQArArAbBVQAfBggoApQgPAPgoA4QgGAHgGAAQgFAAgGgFg");
	this.shape_10.setTransform(26.0974,-149.0999,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3346));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-82.5,-198.2,165,198.2);


(lib.u9l78l867tl87l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tyutdyujyj
	this.instance = new lib.tyutdyujyj("single",6);
	this.instance.setTransform(17.9,-35.95,2.6764,2.5888,0,-5.3412,175.0061,2.8,-2.8);

	this.instance_1 = new lib.CachedBmp_49();
	this.instance_1.setTransform(16.9,-37.05,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},162).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},14).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},21).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},2634).wait(130));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(162).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:6},0).wait(12).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(6).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(21).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(15).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).to({_off:true},2634).wait(130));

	// ilt78lt78lt78
	this.instance_2 = new lib.ilt78lt78lt78("synched",0);
	this.instance_2.setTransform(23.4,-78.3,1.1274,1.1274,0,0,180,10.5,3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3346));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#796A6A").s().p("Ah2AOQgKgGgEgIIgCgHQAeATA1gHQASgCA9gQQAcgHAqgDIAlgBQgnAEg7AUIgxASQghAHgZAAQgfAAgRgLg");
	this.shape.setTransform(26.1733,-143.8646,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3346));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#796A6A").s().p("ADhA7IAEgZQgthCh8ANQgmADhCAPQhIAOgYADQh2APAChUQAAgNAPgbIAQgYIgDAWQgDAbAGATQARA/BVgZQBxgjCEAEQCQAFgJA1QgIAxgVAfQgLAQgJAGQAKgdAHgeg");
	this.shape_1.setTransform(43.646,-153.1101,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3346));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("ACTB9IgogKQjKAPhVhHQgbgWgMgcIgGgXQhKgIAQg4QAGgSANgUIANgRQC7htCmBJQB3A1A3BmQAdA1gwBVQgXArgeAgQgPg1gqgVg");
	this.shape_2.setTransform(41.263,-150.9151,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3346));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEA840").s().p("AgIAJQgEgDAAgGQAAgEAEgEQAEgEAEAAQAFAAAEAEQAEAEAAAEQAAAFgEAEQgEAEgFgBQgEABgEgEg");
	this.shape_3.setTransform(-39.8479,-53.7644,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3346));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AAGAsQAXgYglgPQgGgFgEgLQgIgYAFgcIAEAYQAFAcAMAOIAWAUQAMAYg5ARQATgJAKgLg");
	this.shape_4.setTransform(44.0018,-62.2394,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3346));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D5AE90").s().p("AAPAWQgEgQgIgNIgKgSQgFgLgHgLQALABAOAXQASAcgFArIgEgag");
	this.shape_5.setTransform(-41.4424,-70.3482,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3346));

	// Layer_13
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EBBF9A").s().p("AAABYQgtgMgHhMQgDgiAOgZQAMgWAUgHQASgHAOANQAOANgCAfQgBAXAKgIIAKgNIgLB5QgNAGgNAAQgJAAgIgDg");
	this.shape_6.setTransform(-41.2112,-68.9223,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3346));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AhLATQAGgKAMgKQAZgVAgABQAhACAZATQAMAKAGAKQg5gsguAYQgLAFgSAMQgHAFgFAAQgEAAgDgDg");
	this.shape_7.setTransform(71.2163,-102.4667,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3216).to({rotation:15.2409,x:73.0273,y:-106.4777},0).wait(130));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("ABCAMQgUgPgNgGQgvgWhOApQAKgKARgJQAjgTAmAAQAsAAAZAcQANAOADAPQgJgDgSgOg");
	this.shape_8.setTransform(9.3279,-103.0985,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3216).to({scaleX:2.0925,scaleY:2.0925,rotation:-13.2087,x:7.4682,y:-107.3718},0).wait(130));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBBF9A").s().p("Ag3E4IhZg9QgogegUgjQgSgggFgnQgUAMgWgFQgrgJgMhWQgFglAOgaQAMgXAUgGQAUgFAOAOQAQAPgCAfQgBAWAKgHIAKgMQANg9AJgeQAPg0AfgaQA/gyAZgVQAhgeACgWQgFgBgEgFQgEgHAEgFQAFgEADANQACAFgBAEQAUAHAyghQBBgpBQAMQAoAGAbAOQAQAyAoBjQAbBTgeAoQgdAngCAuIgEBcQgKA9g2BNQg7BUg5ARQgLAEgNAAQgwAAhOgug");
	this.shape_9.setTransform(15.5615,-74.8942,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3346));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AiqEbQh6gwgEhtQgGiiAbhZQAmh8BughQDXhCB/BuQBAA4AUBEQgiDSihB/QhRBAhIAVQg8gBg9gYg");
	this.shape_10.setTransform(6.8613,-120.8508,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3346));

	// Layer_21
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AgeEmQgegdgpg/QgZgmgGgWQgHgjgJgmQgDgMAAgRIABgeQgBhbACgdQABggAFgMQAOgigDgPQgDgKAVgeQAcgoASgTQAkgmBFgNQBBgLAyAPIgqA5QgnAUgfArQgeAsgOA4QgSBFAHBXQAFBDAUBbQAJAjAWAyQANAcgBA9Qg/gugUgTg");
	this.shape_11.setTransform(-28.1369,-111.3523,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3346));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AhdDYIgphCQg7hGATiTQAGgvANgwIAMgnQBLi/CDA/QBCAfAzBFIgsCKQADgqgyggIgxgYQg+AcAHB6QADA8APA4QAgByg4BYQgdAtgjAVQAcg1gkhMg");
	this.shape_12.setTransform(-63.7169,-111.0951,2.0926,2.0926);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3346));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.3,-192.6,202.6,192.6);


(lib.oy89y89_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_30
	this.instance = new lib.gjkfujyuli("single",1);
	this.instance.setTransform(-1.2,-40.6,0.8401,0.8401,0.9096,0,0,17.1,-10.4);

	this.instance_1 = new lib.CachedBmp_42();
	this.instance_1.setTransform(-23.4,-38.75,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},612).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},699).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},650).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},10).to({state:[{t:this.instance_1}]},141).to({state:[]},1).wait(2));
	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(612).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(699).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(650).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(19).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(16).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).to({_off:true},10).wait(144));

	// Layer_8
	this.instance_2 = new lib.CachedBmp_46();
	this.instance_2.setTransform(-16.95,-83.15,0.2961,0.2961);

	this.instance_3 = new lib.Path_1_0();
	this.instance_3.setTransform(5.7,-70.1,2.0895,2.0895,0,0,0,11.2,7.8);
	this.instance_3.alpha = 0.5;

	this.instance_4 = new lib.CachedBmp_45();
	this.instance_4.setTransform(-73.45,-83.7,0.2961,0.2961);

	this.instance_5 = new lib.Path_1();
	this.instance_5.setTransform(-49.4,-69.25,2.0895,2.0895,0,0,0,11.2,7.8);
	this.instance_5.alpha = 0.5;

	this.instance_6 = new lib.CachedBmp_59();
	this.instance_6.setTransform(-77,-87.7,0.2961,0.2961);

	this.instance_7 = new lib.CachedBmp_43();
	this.instance_7.setTransform(-77.15,-87.5,0.2961,0.2961);

	this.instance_8 = new lib.CachedBmp_60();
	this.instance_8.setTransform(-77,-87.7,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.instance_7},{t:this.instance_8},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},3353).to({state:[]},1).wait(2));

	// Layer_29
	this.instance_9 = new lib.hkjdtykukuk("synched",40);
	this.instance_9.setTransform(-4.6,-74.65,0.9756,0.9956,-0.678,0,0,14,2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3353).to({startPosition:38},0).to({_off:true},1).wait(2));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#444444").s().p("AgGAKQgEgQgKgIIASgDQATACAEAYQgDAFgFADQgDABgDAAQgHAAgGgIg");
	this.shape.setTransform(64.6526,-86.895,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3353).to({_off:true},1).wait(2));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#444444").s().p("AgzgGIBngSIgHAHQgIAKgEAJIhTAXg");
	this.shape_1.setTransform(39.2283,-83.252,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3353).to({_off:true},1).wait(2));

	// Layer_12
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C2A083").s().p("AgPAaQAagDgCgXQgCgVgZgEQAQgHAKAKQAKAIABAOQABAPgJAIQgGAGgHAAQgGAAgHgDg");
	this.shape_2.setTransform(-13.8063,-54.5843,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3353).to({_off:true},1).wait(2));

	// Layer_13
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C2A083").s().p("AgHAZQgKgHgBgPQAAgOAIgKQAKgKAPAFQgYAGABAWQABAXAaAAQgJAEgHAAQgFAAgFgEg");
	this.shape_3.setTransform(-32.7578,-53.6149,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3353).to({_off:true},1).wait(2));

	// Layer_14
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#323130").s().p("AAwCFQgWglANgaQgJgBgEgPQgBgPgEgHIgJgOQgGgIABgGQgOABgIgPQgDgJABgTQgQgDgIgPQgJgPAFgOQgTgCgKgSQgLgTAIgRIgCgBQAXAAAPARIAJANQAFAFAKAFIAvAcQANAHAHAHQAKAKAIAZIAKAkQAEAUgBARIgFAfIgNBAIgCAAQgGAAgHgKg");
	this.shape_4.setTransform(31.496,-104.8274,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3353).to({_off:true},1).wait(2));

	// Layer_15
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#323130").s().p("ADaB2QgKgBgNgIQgSgMgJgQQgLgTAIgPQgJAHgKgKQgKgJAFgKQgHAGgJgDQgKgDgCgJQgJAMgQAEQgPAFgOgHQgJgEgEABQgDAAgJAJQgIAIgMAAQgNAAgHgIQgCARgSAHQgRAIgNgLQgHASgIAGQgGAFgHgCQgIgBgDgGQgHAIgLACQgLACgKgFQgSgKgGgZQgCAHgIAFQgHAEgIgBQgMAAgSgLQgggRgLgRQgIgMAAgOQAAgQAJgJIAJgCQANgXAMgHQAJgFAKACQALABAEAJQAOgGAPACQAPACALAJQALgSAXgCQAXgCAOAPQgBgOANgKQALgKAPgBQAJgBATACQASACAKgBQAMgCAdgNQAagNAQABQAOAAAaAMIApATQATAJAHAGQAQAOAMAiQAMAkACAZQADAjgPAYQgOAVgTAAIgCAAg");
	this.shape_5.setTransform(-15.9771,-143.5613,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3353).to({_off:true},1).wait(2));

	// Layer_16
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#323130").s().p("AFeEiQgniZhSiAQgagogXgSQgdgYgugJQgdgFg3gBQg1gBgeAIQgtAKgWAfQgMAUgHAJQgUAZgrAJQgzAIgYAFQgQADgFAIIAAADQgWALgXgPQgXgPgBgZQgOgLgEgVQgEgUAGgRQAHgSARgLQAQgLASAAQgDgRAGgSQAGgSAOgLQANgLASgDQARgCAQAHQgFgYATgUQAUgUAXAHQAPglARgMQAMgIAPACQAQADAGANQAVgYAggHQAhgHAbANQALAFAFAAIANgDQASgFAZAEQAOADAcAKQAOAFAHAGIAMAKQAHAEAKAAIASgBQAVgDATALQAUALABAUQALgEANACQANACAJAIQAKAJAEAMQAFANgDANQAbAEARAZQARAagGAbQgDAMACAEQADAGALAFQAGAHgCANIgEAWQgCAMAFAQIALAdQAFAQgBAPQgCARgMAIQAKAVADANQAFAUgHAPIgGANQgBAGAHAPQAHANgDAHIgGAIIgGAHQgCAEAEAPQAEANgFAOQgEANgLAHQgCADgFABQgJAAgEgRg");
	this.shape_6.setTransform(-0.2238,-148.9522,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3353).to({_off:true},1).wait(2));

	// Layer_17
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C2A083").s().p("AgHgfQAGgKAIgKQAMgNAIgBQgKAQgHAOIgNAZQgMATgEAVIgGAkQgHg6AZgng");
	this.shape_7.setTransform(55.9444,-71.7431,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3353).to({_off:true},1).wait(2));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D0AD89").s().p("AgjBdIgHgIIgJhmIAAAAIAJADQAJAAgCgUQgBgaASgUQARgTAUABQAWAAAIAZQAJAegQA2QgZBWggACIgCAAQgJAAgJgGg");
	this.shape_8.setTransform(52.9314,-70.1627,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3353).to({_off:true},1).wait(2));

	// Layer_21
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#323130").s().p("AA5APIgdgKQgugNg6AZIASgRQAZgQAhAAQAhgBAaARQAMAIAGAIQgDACgEAAQgFAAgIgDg");
	this.shape_9.setTransform(-52.2152,-94.188,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3212).to({rotation:-24.9617,x:-55.2979,y:-100.6762},0).wait(141).to({_off:true},1).wait(2));

	// Layer_22
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#323130").s().p("AhlATIAYgTQAigTArAAQAtgBAiARQAQAHAIAIQhOgXg9APIgnANQgKADgIAAQgFAAgDgBg");
	this.shape_10.setTransform(11.5546,-95.614,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3212).to({scaleX:2.0926,scaleY:2.0926,rotation:16.992,x:13.7676,y:-101.6854},0).wait(141).to({_off:true},1).wait(2));

	// Layer_23
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D0AD89").s().p("AgpFoQg9gThAhMQg/hKgJg7QgDgSAFhQQADgzgdgnQgigtAEhNQADg8AdhZIAUAQQAZARAeAJQBgAbBjhHQBIgzA0AbQATAKAKATQAJARgEAQQgKAkAEARQAHAbAqAkQAgAcAQA2QAJAfAOA+IAFBgIAGAfQgLBchMA5QgpAcgzAYQhNAkgwAAQgQAAgOgEg");
	this.shape_11.setTransform(-10.8905,-76.0976,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3353).to({_off:true},1).wait(2));

	// Layer_24
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#323130").s().p("AiAEOQi3iDgijhIAdg2QAog/AygvQCjiXDUBDQCMArAoCaQAWBYgHDJQgEB2iTA3QguARg3AIIgtAGQhUgVhbhBg");
	this.shape_12.setTransform(7.1772,-126.1362,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3353).to({_off:true},1).wait(2));

	// Layer_25
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#323130").s().p("AleCIIADgDQgOgQACgQQABgLAJgHQAKgIALACQgFgcAPgbQAQgbAdgMQACgQATgHQASgIAOAJQALgdANgMQAKgJAMgEQANgFAMADQATghAbgHQAQgEAQAGQARAGAFAOQAFgKANgEQANgEALAFIAHAFQADACAEABQAIABARgJQAQgIAIAFQAEACAFAIQAHAGAQgBQAUgBAGACIAPAHQAIAFAGgBQAGgBAKgGQAKgEALAIQAKAHgCAKQAFgEAIABQAHABAGAEIAJAKQAGAGAFACQAFADALABIAQAEQAIADAEAHQAFAIgFAFQAuATASASQAJAJAGAOQAFAPgDAQQgDAQgKAMQgLAMgQAHQgRAGgRgBIgKgBQgFgBgEABQgFABgEAEIgJAGQgPAKgdgCIgwgDQgJAAgbAGQgXAEgNgCQgJgCgXgJQgTgIgNABQgGAAgJACIgOAEQgVAGgWgGQgPgEgHABQgDAAgRAJQgPAHgUACQgOACgYgBIg+gCQgigBgbgEQgWgCgLAAQgPABgJAIIAFAFg");
	this.shape_13.setTransform(-7.8673,-184.3137,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3353).to({_off:true},1).wait(2));

	// Layer_26
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#323130").s().p("AgRBXQgKgFgJgLQgDAGgIABQgIABgFgFQgKgJADgRQgPgHgEgTQgEgTANgLQgIABgFgGQgGgHABgIQAAgNAOgLIABgCQAFgHAIgCIALgDQAHgCAMgLQAGgDAOgDQAcgGAMABQAdACAWAWQAVAWACAcQAAAQgJAAQAIAHgGARQgGARgHAGQgGAFgHAAQgIABgEgFQACAIgEAJQgFAJgIAEQgOAGgVgDQABADgDADQgBADgDABIgCAAQgFAAgGgEg");
	this.shape_14.setTransform(-64.7224,-142.3762,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3353).to({_off:true},1).wait(2));

	// Layer_27
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#323130").s().p("AgrC0IgjgLQgTgSgGgNQgHgRACgiIAFhmQABgdAHgPQAEgKAJgHQAJgGAJABQgEgjAHgPQAFgMAMgFQAMgFAJAHQACgSANgKQALgIAcAAQAlABAGATIgDADQAUAHAHAbQAGAbgOASQAKAEAGANQAFAMgCANQgCASgTAbQAKADADAOQACAOgHAKQgKARgdAFQACAPgKANQgLANgNAAQgCAOgKAKQgKALgMABQgFAigRACIgBAAQgEAAgHgDg");
	this.shape_15.setTransform(61.9979,-75.2406,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3353).to({_off:true},1).wait(2));

	// Layer_28
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#444444").s().p("AhHAAICPghIgKAKQgLAMgGAOIh0Afg");
	this.shape_16.setTransform(-61.7885,-85.1352,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3353).to({_off:true},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-84.9,-213.1,169.8,213.1);


(lib.l7t8l78l78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _ghjdtjtyktyktut
	this.instance = new lib.ghjdtjtyktyktut("single",8);
	this.instance.setTransform(-9.1,-34.1,1.2958,1.2958,0.3259,0,0,6,-5.2);

	this.instance_1 = new lib.CachedBmp_41();
	this.instance_1.setTransform(-8.15,-37.6,0.2961,0.2961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1317).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},26).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},550).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},22).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},18).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},14).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},418).wait(133));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1317).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(26).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(550).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(22).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(20).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).to({_off:true},418).wait(133));

	// ghjkdtktuktuykut
	this.instance_2 = new lib.ghjkdtktuktuykut("synched",0);
	this.instance_2.setTransform(3.4,-72.2,0.9327,0.9254,0,11.7088,10.7178,-8,7.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3346));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AAYAkQgFgZgOgWIgQgfQgIgRgNgSQASACAYAlQAeAvgJBFIgHgqg");
	this.shape.setTransform(-69.1735,-71.024,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3346));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8F6F50").s().p("AARB2Qg5gPgdhmQgThBAQggQAPgbAiAFQAfAEAaAaQAcAbgCAfQgBAXAKABQAGABAFgFIgLB6QgPAIgRAAQgKAAgKgCg");
	this.shape_1.setTransform(-69.3039,-71.358,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3346));

	// Layer_6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgcCJQgagHgZghQgaghAKAKIAPAQIARgPIAYARQAbARALgEQAagLAWghQAthBgWhrQACgLADgIQAGgPAIAOQADAFAEAeQAFApgDAmQgLB2hfAkQgEACgEAAQgGAAgGgCg");
	this.shape_2.setTransform(-32.4489,-129.6943,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3346));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("ABhEAIAvgvQBEgugFhMQgCgYgJgYIgJgTQgOgrhPgKIhMgCQgxAXhWglQgxgVgughIgDgCQgqgZgKgjIgBgeQAPgOAvgSQAXgJAUgGQBhgeBXAnQAsAUAYAZQB9A4AoB/QATA/gFA0QgRBnhPAgQgZAKgbABg");
	this.shape_3.setTransform(33.8975,-133.8301,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3346));

	// Layer_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D342E").s().p("AgJCEQASg8gYhCIgdgzQACgUgRgrIgSgoIBYgEQAsANAQBYQAIArgBAoIhDB5g");
	this.shape_4.setTransform(70.8203,-120.0938,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3346));

	// Layer_9
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("AhCgJQAah1BzATIgEAIIACAjQAAAogJAfQgbBohqAAQgKg/ANg5g");
	this.shape_5.setTransform(-32.3371,-135.5038,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3346));

	// Layer_11
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AgNAdQgLgKACgTQABgSAMgKQAMgMAVAJQggAEgCAbQgCAdAgAEQgJADgIAAQgJAAgHgHg");
	this.shape_6.setTransform(4.0897,-52.2004,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3346));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#604A3E").s().p("AgWAfQAgAAABgdQABgbgfgIQAUgGANANQAKALgBATQgBATgLAJQgHAEgHAAQgJAAgKgFg");
	this.shape_7.setTransform(24.1544,-50.9496,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3346));

	// Layer_15
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AhLAdIATgeQAYgeAhABQAgABAZAdQAMAPAGAOQg5gsgtAXIgdATQgIAEgFAAQgEAAgDgCg");
	this.shape_8.setTransform(48.6802,-101.4138,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3213).to({rotation:17.2381,x:51.3869,y:-105.8678},0).wait(133));

	// Layer_16
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("ABKAcQgWgOgQgHQg8gahMAnQAIgOAQgNQAhgbArABQArABAhAgQARAQAIAQQgEACgEAAQgIAAgLgGg");
	this.shape_9.setTransform(-14.0434,-103.976,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3213).to({rotation:-15.9688,x:-16.8107,y:-109.5137},0).wait(133));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8F6F50").s().p("AgiE8IhZgxQhJg4gMhZQgXAOgdgIQg6gOgdhmQgThCARgfQAOgbAiAFQAgAEAaAaQAcAbgCAfQgBAWAKABQAGAAAFgEQANg8AJgeQAQg0AfgbQAogjAHgaQAEgQgKgjQgEgOAJgSQAKgSATgKQAxgZBFAxQBhBFBdgbQAugNAagbQAcBWADA6QAEBJghAsQgcAmADAxQAFBNgDARQgJA5g9BHQg+BKg7ASQgMAEgQAAQgvAAhKgjg");
	this.shape_10.setTransform(-10.9669,-73.4345,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3346));

	// Layer_21
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D342E").s().p("AA2AUQhdhBhkgUIAAgQQBpATBhBEQAxAjAcAeIgMALQgbgdgvghg");
	this.shape_11.setTransform(-60.8114,-100.2671,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3346));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D342E").s().p("AA5ATQhhhEhpgRIAAgQQBuARBlBGQAzAjAdAgIgLALQgdgegxgig");
	this.shape_12.setTransform(-59.3467,-109.8927,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3346));

	// Layer_23
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D342E").s().p("AA5ASQhihDhpgRIACgQQBtARBmBGQAzAjAdAgIgMALQgcgfgygig");
	this.shape_13.setTransform(-58.562,-118.786,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3346));

	// Layer_24
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("AA4ATQhfhBhmgUIADgPQBqATBhBEQAxAiAdAgIgMAKQgcgdgvgig");
	this.shape_14.setTransform(-58.1435,-128.3593,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3346));

	// Layer_25
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("AA8AQQhmhGhvgOIAEgPQByAPBqBHQA0AlAfAhIgLALQgfghg0gjg");
	this.shape_15.setTransform(-54.3769,-134.0091,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3346));

	// Layer_26
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("ABAANQhuhIh1gJIAFgQQB4AKBxBLQA5AlAgAkIgLALQgggjg5glg");
	this.shape_16.setTransform(-50.4011,-139.6066,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3346));

	// Layer_27
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("ABEAKQh1hLh8gEIAIgQQB+AGB2BOQA8AmAjAmIgMALQgigmg8gmg");
	this.shape_17.setTransform(-46.1637,-145.0472,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3346));

	// Layer_28
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("ABIAHQh7hNiCACIALgRQCCACB8BPQA+AoAkAnIgMALQgkgng+gog");
	this.shape_18.setTransform(-41.6648,-150.4355,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3346));

	// Layer_29
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#453B33").s().p("AjEEuQiWg0gEhtQgHi7AXhRQAoiQCPgoQDZg+ClCMQBSBGAnBTQgiDRi6B6QhdA9hWATQhKgEhLgZg");
	this.shape_19.setTransform(-16.2545,-122.5808,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3346));

	// Layer_30
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("AgwBuQgYgrgDhAQgCg+AUguQAUgtAfgCQAfgBAYAsQAYAsADA/QACA+gUAuQgUAtgfABIgCABQgdAAgYgrg");
	this.shape_20.setTransform(59.509,-114.7578,2.0925,2.0925);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3346));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90.1,-191.8,180.3,191.8);


(lib.iult78l87l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uilt7lt78l
	this.instance = new lib.uilt7lt78l("synched",0);
	this.instance.setTransform(-14.5,-313.75,1,1,0,0,0,-27.6,-24.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({startPosition:8},0).to({regY:-24.2,rotation:1.4838,x:-5.3,y:-314.15,startPosition:16},8).wait(116).to({startPosition:132},0).to({regY:-24.1,rotation:0,x:-14.5,y:-313.75,startPosition:141},9).wait(926).to({startPosition:1067},0).to({regY:-24.2,rotation:1.7331,x:-2.3,y:-313.95,startPosition:1076},9).wait(212).to({startPosition:1288},0).to({regY:-24.1,rotation:0,x:-14.5,y:-313.75,startPosition:1298},10).wait(379).to({startPosition:1677},0).to({rotation:1.0002,x:-7.95,y:-313.9,startPosition:1684},7).wait(37).to({startPosition:1721},0).to({rotation:0,x:-14.5,y:-313.75,startPosition:1728},7).wait(1617).to({startPosition:3345},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(3));

	// uiylt687lt8
	this.instance_1 = new lib.uiylt687lt8("synched",0);
	this.instance_1.setTransform(-72.4,-252.35,1,1,0,0,0,9.5,13.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(8).to({startPosition:0},0).to({regX:9.4,regY:13.3,rotation:2.9327,x:-64.85,y:-254.55},8).wait(116).to({startPosition:0},0).to({regX:9.5,regY:13.4,rotation:0,x:-72.4,y:-252.35},9).wait(926).to({startPosition:0},0).to({regX:9.4,rotation:3.1823,x:-62.05,y:-254.6},9).wait(212).to({startPosition:0},0).to({regX:9.5,rotation:0,x:-72.4,y:-252.35},10).wait(379).to({startPosition:0},0).to({regX:9.4,rotation:1.0002,x:-66.95,y:-253.5},7).wait(37).to({startPosition:0},0).to({regX:9.5,rotation:0,x:-72.4,y:-252.35},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	// uilt78lt78l
	this.instance_2 = new lib.uilt78lt78l("synched",0);
	this.instance_2.setTransform(-108.9,-88,1,1,0,0,0,1.9,15.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({startPosition:0},0).to({regY:15.5,rotation:2.9327,x:-109.6,y:-92.1},8).wait(116).to({startPosition:0},0).to({regY:15.4,rotation:0,x:-108.9,y:-88},9).wait(926).to({startPosition:0},0).to({regX:1.8,rotation:3.1823,x:-107.65,y:-92.5},9).wait(212).to({startPosition:0},0).to({regX:1.9,rotation:0,x:-108.9,y:-88},10).wait(379).to({startPosition:0},0).to({regY:15.3,rotation:-87.7306,x:-105,y:-82.2},7).wait(37).to({startPosition:0},0).to({regY:15.4,rotation:0,x:-108.9,y:-88},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	// uio_y89_y79
	this.instance_3 = new lib.uioy89y79("synched",0);
	this.instance_3.setTransform(5.7,47.35,1,1,0,0,0,9.2,132.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(8).to({startPosition:0},0).to({rotation:1.4838,x:5.6,y:47.45},8).wait(116).to({startPosition:0},0).to({rotation:0,x:5.7,y:47.35},9).wait(926).to({startPosition:0},0).to({rotation:1.7331,x:6.95,y:47.75},9).wait(212).to({startPosition:0},0).to({rotation:0,x:5.7,y:47.35},10).wait(379).to({startPosition:0},0).to({regY:132.2,rotation:1.0002,x:6,y:47.45},7).wait(37).to({startPosition:0},0).to({regY:132.3,rotation:0,x:5.7,y:47.35},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	// ilt768lt78l
	this.instance_4 = new lib.ilt768lt78l("synched",0);
	this.instance_4.setTransform(48.8,-261.5,1,1,0,0,0,-5.7,14.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(8).to({startPosition:0},0).to({regX:-5.6,rotation:-6.7572,x:56.15,y:-258.45},8).wait(116).to({startPosition:0},0).to({regX:-5.7,rotation:0,x:48.8,y:-261.5},9).wait(926).to({startPosition:0},0).to({regX:-5.6,regY:14.4,rotation:-1.5101,x:59.2,y:-259.75},9).wait(212).to({startPosition:0},0).to({regX:-5.7,regY:14.5,rotation:0,x:48.8,y:-261.5},10).wait(379).to({startPosition:0},0).to({regX:-5.6,regY:14.4,rotation:3.4712,x:54.35,y:-260.85},7).wait(37).to({startPosition:0},0).to({regX:-5.7,regY:14.5,rotation:0,x:48.8,y:-261.5},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	// iul_7yt8lt87l
	this.instance_5 = new lib.iul7yt8lt87l("synched",0);
	this.instance_5.setTransform(65.5,-90.95,1,1,0,0,0,19.2,18.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(8).to({startPosition:0},0).to({regX:19.3,rotation:-90.7493,x:92.65,y:-91.05},8).wait(116).to({startPosition:0},0).to({regX:19.2,rotation:0,x:65.5,y:-90.95},9).wait(926).to({startPosition:0},0).to({regX:19.4,rotation:-80.0043,x:84.1,y:-91.2},9).wait(212).to({startPosition:0},0).to({regX:19.2,rotation:0,x:65.5,y:-90.95},10).wait(379).to({startPosition:0},0).to({regX:19.3,rotation:3.4712,x:60.7,y:-89.5},7).wait(37).to({startPosition:0},0).to({regX:19.2,rotation:0,x:65.5,y:-90.95},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	// uykrtkr6k
	this.instance_6 = new lib.uykrtkr6k("synched",0);
	this.instance_6.setTransform(-0.05,-433.7,1,1,0,0,0,-1,31.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(8).to({startPosition:0},0).to({regX:-0.9,rotation:1.4838,x:12.35,y:-433.55},8).wait(116).to({startPosition:0},0).to({regX:-1,rotation:0,x:-0.05,y:-433.7},9).wait(926).to({startPosition:0},0).to({rotation:1.7331,x:15.75,y:-433.3},9).wait(212).to({startPosition:0},0).to({rotation:0,x:-0.05,y:-433.7},10).wait(379).to({startPosition:0},0).to({rotation:1.0002,x:8.6,y:-433.55},7).wait(37).to({startPosition:0},0).to({rotation:0,x:-0.05,y:-433.7},7).wait(1617).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.9,-487.8,395.79999999999995,655);


(lib.ilt78lt78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// l7t8l78l78
	this.instance = new lib.l7t8l78l78("synched",0);
	this.instance.setTransform(-20.5,-761.35,1,1,0,0,0,-22.9,-11.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1315).to({startPosition:1315},0).to({regY:-11.5,rotation:-1.0116,x:-13.1,y:-761.8,startPosition:1327},12).wait(323).to({startPosition:1650},0).to({regY:-11.4,rotation:0,x:-20.5,y:-761.35,startPosition:1662},12).wait(538).to({startPosition:2200},0).to({regY:-11.5,rotation:1.2258,x:-13.15,y:-761.5,startPosition:2211},11).wait(576).to({startPosition:2787},0).to({regY:-11.4,rotation:0,x:-20.5,y:-761.35,startPosition:2795},8).wait(550).to({startPosition:3345},0).to({_off:true},1).wait(1));

	// hjlyui
	this.instance_1 = new lib.hjlyui("synched",0);
	this.instance_1.setTransform(-62.6,-697.45,1,1,0,0,0,10.4,24.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1315).to({startPosition:0},0).to({regX:10.2,regY:24.1,rotation:-2.4785,x:-56,y:-698.9},12).wait(323).to({startPosition:0},0).to({regX:10.4,regY:24.2,rotation:0,x:-62.6,y:-697.45},12).wait(538).to({startPosition:0},0).to({regX:10.3,rotation:1.2258,x:-56.6,y:-698.4},11).wait(576).to({startPosition:0},0).to({regX:10.4,rotation:0,x:-62.6,y:-697.45},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	// oiu_8y9_89_
	this.instance_2 = new lib.oiu8y989("synched",0);
	this.instance_2.setTransform(-87.3,-549.05,1,1,0,0,0,-7.4,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1315).to({startPosition:0},0).to({rotation:-93.29,x:-79.15,y:-543.25},12).wait(323).to({startPosition:0},0).to({rotation:0,x:-87.3,y:-549.05},12).wait(538).to({startPosition:0},0).to({rotation:-75.7169,x:-90.1,y:-545.35},11).wait(576).to({startPosition:0},0).to({rotation:0,x:-87.3,y:-549.05},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	// oiu_y8_y98_y98
	this.instance_3 = new lib.oiuy8y98y98("synched",0);
	this.instance_3.setTransform(-11.55,-397.85,1,1,0,0,0,-2.1,169);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1315).to({startPosition:0},0).to({rotation:1.2258,x:-11.85,y:-397.8},12).wait(323).to({startPosition:0},0).to({rotation:0,x:-11.55,y:-397.85},12).wait(538).to({startPosition:0},0).to({rotation:1.2258,x:-11.9,y:-397.8},11).wait(576).to({startPosition:0},0).to({rotation:0,x:-11.55,y:-397.85},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	// yuilt6lt68lt867l
	this.instance_4 = new lib.yuilt6lt68lt867l("synched",0);
	this.instance_4.setTransform(-49.25,-860,1,1,0,0,0,11.5,69.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1315).to({startPosition:0},0).to({regY:69,rotation:-1.0116,x:-43.5,y:-859.95},12).wait(323).to({startPosition:0},0).to({regY:69.2,rotation:0,x:-49.25,y:-860},12).wait(538).to({startPosition:0},0).to({regY:69.1,rotation:1.2258,x:-39.75,y:-860.7},11).wait(576).to({startPosition:0},0).to({regY:69.2,rotation:0,x:-49.25,y:-860},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	// ui_t7_79_
	this.instance_5 = new lib.uit779("synched",0);
	this.instance_5.setTransform(36.55,-720.15,1,1,0,0,0,3.1,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1315).to({startPosition:0},0).to({regX:3.2,rotation:2.4513,x:43.2,y:-718.9},12).wait(323).to({startPosition:0},0).to({regX:3.1,rotation:0,x:36.55,y:-720.15},12).wait(538).to({startPosition:0},0).to({rotation:1.2258,x:43.05,y:-719},11).wait(576).to({startPosition:0},0).to({rotation:0,x:36.55,y:-720.15},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	// u_ty79_t7_
	this.instance_6 = new lib.uty79t7("synched",0);
	this.instance_6.setTransform(48.35,-557.35,1,1,0,0,0,-17.8,13.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1315).to({startPosition:0},0).to({regX:-17.7,rotation:2.4513,x:48.05,y:-555.75},12).wait(323).to({startPosition:0},0).to({regX:-17.8,rotation:0,x:48.35,y:-557.35},12).wait(538).to({startPosition:0},0).to({regY:13.9,rotation:1.2258,x:51.35,y:-555.9},11).wait(576).to({startPosition:0},0).to({regY:13.8,rotation:0,x:48.35,y:-557.35},8).wait(550).to({startPosition:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.2,-942.1,214.3,601.6);


(lib.yuil68lt678l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// u9l78l867tl87l
	this.instance = new lib.u9l78l867tl87l("synched",0);
	this.instance.setTransform(-22.8,-766.25,1,1,0,0,0,-19.1,-35.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(162).to({startPosition:162},0).to({regY:-35.4,rotation:-0.4949,x:-9.2,y:-766.6,startPosition:171},9).wait(412).to({startPosition:583},0).to({regY:-35.3,rotation:0,x:-22.8,y:-766.25,startPosition:593},10).wait(2752).to({startPosition:3345},0).to({_off:true},1).wait(1));

	// ytk5e7ke57k
	this.instance_1 = new lib.ytk5e7ke57k("synched",0);
	this.instance_1.setTransform(-52.05,-693.15,1,1,0,0,0,-13.6,15.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(162).to({startPosition:0},0).to({rotation:-4.7642,x:-39.75,y:-696.25},9).wait(412).to({startPosition:0},0).to({rotation:0,x:-52.05,y:-693.15},10).wait(2752).to({startPosition:0},0).to({_off:true},1).wait(1));

	// yiul6rlr68l
	this.instance_2 = new lib.yiul6rlr68l("synched",0);
	this.instance_2.setTransform(-99.5,-542.55,1,1,0,0,0,6,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(162).to({startPosition:0},0).to({regY:12.7,rotation:-113.8118,x:-74.65,y:-542.4},9).wait(412).to({startPosition:0},0).to({regY:12.8,rotation:0,x:-99.5,y:-542.55},10).wait(2752).to({startPosition:0},0).to({_off:true},1).wait(1));

	// uil7tlt78l87
	this.instance_3 = new lib.uil7tlt78l87("synched",0);
	this.instance_3.setTransform(-3.35,-537.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(162).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:1.9763,x:2.35,y:-537.75},9).wait(412).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-3.35,y:-537.95},10).wait(2752).to({startPosition:0},0).to({_off:true},1).wait(1));

	// iu7t8lt78l
	this.instance_4 = new lib.iu7t8lt78l("synched",0);
	this.instance_4.setTransform(54.9,-701.9,1,1,0,0,0,3,16.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(162).to({startPosition:0},0).to({regX:3.1,regY:16,rotation:5.6667,x:67.15,y:-699.75},9).wait(412).to({startPosition:0},0).to({regX:3,regY:16.1,rotation:0,x:54.9,y:-701.9},10).wait(2752).to({startPosition:0},0).to({_off:true},1).wait(1));

	// yiult678lt78l
	this.instance_5 = new lib.yiult678lt78l("synched",0);
	this.instance_5.setTransform(66.15,-552.5,1,1,0,0,0,22,8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(162).to({startPosition:0},0).to({regX:22.1,regY:8.3,rotation:5.6667,x:63.65,y:-549.9},9).wait(412).to({startPosition:0},0).to({regX:22,regY:8.4,rotation:0,x:66.15,y:-552.5},10).wait(2752).to({startPosition:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.3,-924.2,248.39999999999998,624.3000000000001);


(lib.uilty7il7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// o_y89_y89
	this.instance = new lib.oy89y89("synched",0);
	this.instance.setTransform(83.45,-260.8,1,1,0,0,0,25.7,16.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(604).to({_off:false},0).wait(12).to({startPosition:0},0).to({regX:25.8,rotation:-2.9161,x:76.55,y:-261.55},10).wait(420).to({startPosition:0},0).to({regX:25.7,rotation:0,x:83.45,y:-260.8},12).wait(679).to({startPosition:0},0).to({rotation:-5.1915,x:69.8,y:-263.8},12,cjs.Ease.quadInOut).wait(415).to({startPosition:0},0).to({rotation:0,x:83.45,y:-260.8},10).wait(640).to({startPosition:0},0).to({rotation:-2.4924,x:67.15,y:-262.85},10).wait(376).to({startPosition:0},0).to({rotation:0,x:83.45,y:-260.8},9).wait(136).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(7));

	// uilt7lt78ltry
	this.instance_1 = new lib.uilt7lt78ltry("synched",0);
	this.instance_1.setTransform(136.75,-99.9,1,1,0,0,0,-0.1,13.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(604).to({_off:false},0).wait(12).to({startPosition:0},0).to({regX:0,regY:13.6,rotation:-2.9161,x:138,y:-103.65},10).wait(420).to({startPosition:0},0).to({regX:-0.1,regY:13.7,rotation:0,x:136.75,y:-99.9},12).wait(679).to({startPosition:0},0).to({regX:0,regY:13.6,rotation:-5.1915,x:137.55,y:-108.45},12,cjs.Ease.quadInOut).wait(415).to({startPosition:0},0).to({regX:-0.1,regY:13.7,rotation:0,x:136.75,y:-99.9},10).wait(640).to({startPosition:0},0).to({regY:13.6,rotation:-2.4924,x:127.4,y:-104.55},10).wait(376).to({startPosition:0},0).to({regY:13.7,rotation:0,x:136.75,y:-99.9},9).wait(136).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(7));

	// o_y89_y89_
	this.instance_2 = new lib.oy89y89_1("synched",604);
	this.instance_2.setTransform(39.95,-325.4,1,1,0,0,0,20.2,-24.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(604).to({_off:false},0).wait(12).to({startPosition:616},0).to({rotation:-1.1838,x:32.05,y:-325.25,startPosition:626},10).wait(420).to({startPosition:1046},0).to({rotation:0,x:39.95,y:-325.4,startPosition:1058},12).wait(679).to({startPosition:1737},0).to({rotation:-6.6507,x:23.5,y:-326.1,startPosition:1749},12,cjs.Ease.quadInOut).wait(415).to({startPosition:2164},0).to({rotation:0,x:39.95,y:-325.4,startPosition:2174},10).wait(640).to({startPosition:2814},0).to({rotation:-2.4924,x:20.9,y:-325.6,startPosition:2824},10).wait(376).to({startPosition:3200},0).to({rotation:0,x:39.95,y:-325.4,startPosition:3209},9).wait(136).to({startPosition:3345},0).to({_off:true},1).wait(1).to({_off:false,startPosition:3347},0).wait(7));

	// uio_y8_989_
	this.instance_3 = new lib.uioy8989("synched",0);
	this.instance_3.setTransform(10.15,-52.95,1,1,0,0,0,-17.6,-33.4);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(604).to({_off:false},0).wait(12).to({startPosition:0},0).to({regX:-17.5,rotation:-1.1838,x:7.95,y:-52.3},10).wait(420).to({startPosition:0},0).to({regX:-17.6,rotation:0,x:10.15,y:-52.95},12).wait(679).to({startPosition:0},0).to({regX:-17.5,rotation:-2.4513,x:5.55,y:-52.6},12,cjs.Ease.quadInOut).wait(415).to({startPosition:0},0).to({regX:-17.6,rotation:0,x:10.15,y:-52.95},10).wait(640).to({startPosition:0},0).to({regX:-17.5,rotation:-2.4924,x:3.05,y:-52.05},10).wait(376).to({startPosition:0},0).to({regX:-17.6,rotation:0,x:10.15,y:-52.95},9).wait(136).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(7));

	// io_y8_y89_
	this.instance_4 = new lib.ioy8y89("synched",0);
	this.instance_4.setTransform(-33.1,-257.5,1,1,-13.4892,0,0,-27.6,19.3);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(604).to({_off:false},0).wait(12).to({startPosition:0},0).to({regX:-27.7,rotation:-3.9698,x:-41.65,y:-255.95},10).wait(420).to({rotation:-3.9698},0).to({regX:-27.6,rotation:-13.4892,x:-33.1,y:-257.5},12).wait(679).to({startPosition:0},0).to({regY:19.2,rotation:-6.2399,x:-47.75,y:-255.55},12,cjs.Ease.quadInOut).wait(415).to({startPosition:0},0).to({regY:19.3,rotation:-13.4892,x:-33.1,y:-257.5},10).wait(640).to({startPosition:0},0).to({rotation:-15.9811,x:-49.1,y:-254.55},10).wait(376).to({startPosition:0},0).to({rotation:-13.4892,x:-33.1,y:-257.5},9).wait(136).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(7));

	// io_y89_y89_
	this.instance_5 = new lib.ioy89y89("synched",0);
	this.instance_5.setTransform(-46.5,-106.35,1,1,-135.2337,0,0,-15.2,-10.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(604).to({_off:false},0).wait(12).to({startPosition:0},0).to({regX:-15.3,regY:-10.6,scaleX:0.9999,scaleY:0.9999,rotation:-15.4491,x:-83.25,y:-102.85},10).wait(420).to({rotation:-15.4491},0).to({regX:-15.2,regY:-10.5,scaleX:1,scaleY:1,rotation:-135.2337,x:-46.5,y:-106.35},12).wait(679).to({startPosition:0},0).to({regY:-10.6,scaleX:0.9999,scaleY:0.9999,rotation:-54.5477,x:-80.15,y:-107.3},12,cjs.Ease.quadInOut).wait(415).to({rotation:-54.5477},0).to({regY:-10.5,scaleX:1,scaleY:1,rotation:-135.2337,x:-46.5,y:-106.35},10).wait(640).to({startPosition:0},0).to({regX:-15.1,regY:-10.6,rotation:-69.7535,x:-56.05,y:-103.1},10).wait(376).to({startPosition:0},0).to({regX:-15.2,regY:-10.5,rotation:-135.2337,x:-46.5,y:-106.35},9).wait(136).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-243.8,-514.3,417.3,821.9);


(lib.ouiy8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ui_lty7il7t8l
	this.instance = new lib.uilty7il7t8l("synched",604);
	this.instance.setTransform(313.95,143.5,1,1,0,0,0,-0.1,-0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(604).to({_off:false},0).wait(2742));

	// yuil68lt678l
	this.instance_1 = new lib.yuil68lt678l("synched",0);
	this.instance_1.setTransform(-236.7,156.1,1,1,0,0,0,-0.1,-461.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3346));

	// ilt78lt78
	this.instance_2 = new lib.ilt78lt78("synched",0);
	this.instance_2.setTransform(-60.3,148.3,1,1,0,0,0,-0.1,-470.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3346));

	// iult78l87l
	this.instance_3 = new lib.iult78l87l("synched",0);
	this.instance_3.setTransform(83.45,162.95,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3346));

	// Layer_10
	this.instance_4 = new lib.Bitmap1();
	this.instance_4.setTransform(-512,-658);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3346));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-512,-658,1024,1109.2);


(lib.uy78989 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ouiy8989("synched",0);
	this.instance.setTransform(-53.9,181.25,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(155).to({scaleX:1.6075,scaleY:1.6075,x:258.2,y:254.45,startPosition:155},0).wait(449).to({scaleX:1,scaleY:1,x:-53.9,y:181.25,startPosition:604},0).wait(124).to({scaleX:1.5171,scaleY:1.5171,x:-333.6,y:268.9,startPosition:728},0).wait(329).to({scaleX:1,scaleY:1,x:-53.9,y:181.25,startPosition:1057},0).wait(254).to({scaleX:1.5678,scaleY:1.5678,x:71.3,y:281.4,startPosition:1311},0).wait(356).to({scaleX:1,scaleY:1,x:-53.9,y:181.25,startPosition:1667},0).wait(74).to({scaleX:1.552,scaleY:1.552,x:-358.65,y:308.6,startPosition:1741},0).wait(331).to({scaleX:1,scaleY:1,x:-53.9,y:181.25,startPosition:2072},0).wait(376).to({scaleX:1.6884,scaleY:1.6884,x:69.2,y:279.35,startPosition:2448},0).wait(360).to({scaleX:1,scaleY:1,x:-53.9,y:181.25,startPosition:2808},0).wait(538));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1153.1,-831.4,2234.6,1866.3000000000002);


// stage content:
(lib.m4l1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,151,376,599,728,964,1191,1441,1731,2072,2448,2814,3345];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:151,loop:1,offset:0}];
	this.streamSoundSymbolsList[151] = [{id:"audio2",startFrame:151,endFrame:376,loop:1,offset:0}];
	this.streamSoundSymbolsList[376] = [{id:"audio3",startFrame:376,endFrame:599,loop:1,offset:0}];
	this.streamSoundSymbolsList[599] = [{id:"audio4",startFrame:599,endFrame:728,loop:1,offset:0}];
	this.streamSoundSymbolsList[728] = [{id:"audio5",startFrame:728,endFrame:964,loop:1,offset:0}];
	this.streamSoundSymbolsList[964] = [{id:"audio6",startFrame:964,endFrame:1191,loop:1,offset:0}];
	this.streamSoundSymbolsList[1191] = [{id:"audio7",startFrame:1191,endFrame:1441,loop:1,offset:0}];
	this.streamSoundSymbolsList[1441] = [{id:"audio8",startFrame:1441,endFrame:1731,loop:1,offset:0}];
	this.streamSoundSymbolsList[1731] = [{id:"audio9",startFrame:1731,endFrame:2072,loop:1,offset:0}];
	this.streamSoundSymbolsList[2072] = [{id:"audio10",startFrame:2072,endFrame:2448,loop:1,offset:0}];
	this.streamSoundSymbolsList[2448] = [{id:"audio11",startFrame:2448,endFrame:2814,loop:1,offset:0}];
	this.streamSoundSymbolsList[2814] = [{id:"audio12",startFrame:2814,endFrame:3346,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,151,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_151 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,151,376,1);
	}
	this.frame_376 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,376,599,1);
	}
	this.frame_599 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,599,728,1);
	}
	this.frame_728 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,728,964,1);
	}
	this.frame_964 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,964,1191,1);
	}
	this.frame_1191 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,1191,1441,1);
	}
	this.frame_1441 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,1441,1731,1);
	}
	this.frame_1731 = function() {
		var soundInstance = playSound("audio9",0);
		this.InsertIntoSoundStreamData(soundInstance,1731,2072,1);
	}
	this.frame_2072 = function() {
		var soundInstance = playSound("audio10",0);
		this.InsertIntoSoundStreamData(soundInstance,2072,2448,1);
	}
	this.frame_2448 = function() {
		var soundInstance = playSound("audio11",0);
		this.InsertIntoSoundStreamData(soundInstance,2448,2814,1);
	}
	this.frame_2814 = function() {
		var soundInstance = playSound("audio12",0);
		this.InsertIntoSoundStreamData(soundInstance,2814,3346,1);
	}
	this.frame_3345 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(151).call(this.frame_151).wait(225).call(this.frame_376).wait(223).call(this.frame_599).wait(129).call(this.frame_728).wait(236).call(this.frame_964).wait(227).call(this.frame_1191).wait(250).call(this.frame_1441).wait(290).call(this.frame_1731).wait(341).call(this.frame_2072).wait(376).call(this.frame_2448).wait(366).call(this.frame_2814).wait(531).call(this.frame_3345).wait(1));

	// Layer_4
	this.instance = new lib.uy78989("synched",0);
	this.instance.setTransform(351.75,582.15,1,1,0,0,0,-53.8,181.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3346));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-347.5,-30.6,1834.5,1466.3);
// library properties:
lib.properties = {
	id: '6F53CC10F2C81940927BA93AF8372292',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_54.png", id:"CachedBmp_54"},
		{src:"images/CachedBmp_53.png", id:"CachedBmp_53"},
		{src:"images/CachedBmp_52.png", id:"CachedBmp_52"},
		{src:"images/CachedBmp_50.png", id:"CachedBmp_50"},
		{src:"images/CachedBmp_48.png", id:"CachedBmp_48"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/m4l1_atlas_1.png", id:"m4l1_atlas_1"},
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio10.mp3", id:"audio10"},
		{src:"sounds/audio11.mp3", id:"audio11"},
		{src:"sounds/audio12.mp3", id:"audio12"},
		{src:"sounds/audio2.mp3", id:"audio2"},
		{src:"sounds/audio3.mp3", id:"audio3"},
		{src:"sounds/audio4.mp3", id:"audio4"},
		{src:"sounds/audio5.mp3", id:"audio5"},
		{src:"sounds/audio6.mp3", id:"audio6"},
		{src:"sounds/audio7.mp3", id:"audio7"},
		{src:"sounds/audio8.mp3", id:"audio8"},
		{src:"sounds/audio9.mp3", id:"audio9"}
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
an.compositions['6F53CC10F2C81940927BA93AF8372292'] = {
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