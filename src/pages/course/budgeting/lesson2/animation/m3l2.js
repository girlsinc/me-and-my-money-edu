(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m3l2_atlas_1", frames: [[939,1164,949,855],[0,0,937,1569],[939,0,1079,1162]]},
		{name:"m3l2_atlas_2", frames: [[612,0,575,872],[1189,626,647,425],[0,0,610,1076],[1924,169,49,49],[1924,61,86,59],[1924,122,60,45],[1924,0,88,59],[1975,175,44,45],[1924,220,44,45],[1986,122,50,51],[1189,0,733,624]]}
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



(lib.CachedBmp_13 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["m3l2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["m3l2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["m3l2_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(ss["m3l2_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();
// helper functions:

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


(lib.yulk6l8t68l8 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#292929").s().p("AhTBBQgDhUAEg8QAAgjAEgRQAFgVAUgiQAHgNAHgDQAPgIATASQAPAQAWAoQAWAoARAPIAOAFQAAAggPAcIgaAuQgLAbABAgQgegtgFg1QgZAVgEAzIgBAoQgBAYgDAQQgKAxgjANIgDiMg");
	this.shape.setTransform(0.0019,20.5147);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.5,0,17,41.1);


(lib.yrtj56j5j56 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#CDA688").s().p("AA+DBQgyhEgshLQhaiUAMg0QANg3AigNQAdgLASAVQASAVA1CQQA5CaABA5IgFAqQgFANgIAAQgNAAgUgeg");
	this.shape.setTransform(11.2488,22.2862);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("AAeClQgIgCgEgKIgEgTQgUhggGgKQgNgXAQBHQAJArAAAOQAAAIgFACQgHABgEgDQgIgIgEgZIgKg5QgGgdgEgDQgBgBAHAtQAIAugIACQgHABgDgFQgEgFgGgYQgRhDgHhOQgHhXARgFQA9gSAeAkQAcAgAlB0QAPA4gLAJQgGAFgHgPIgKgbIgPgvQgLgkgEAEQgGAGAEAUQAIAlAnBmQAHAXgLAEQgLAEgIgUIgRguQgSgsgCAAQgCAAARBBQAQA7gOAAIgDgBg");
	this.shape_1.setTransform(21.608,51.3572);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30.5,68);


(lib.yl68l6t8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-31.45,0,0.1095,0.1095);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.4,0,62.9,95.5);


(lib.uo7997y = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#916E50").s().p("AhEBHQgLgEAJgiIAMghQgYA2gNAAQgKAAAbg4QAag6AOgFQARgGAvAAQA0ABANAMQAMALgGAWQgDALgFAJQgYATgegCIgZgFQgFAygHABQgGAAgDgdIgDgdQgCA9gOAIQgJAGABgpIADgpIgJApQgLAmgLAAIgCgBg");
	this.shape.setTransform(9.838,62.2202);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A73A37").s().p("AibEYIgZgmQAxghBfifQAvhPAmhJQikjpBpAgQA0AQBWA+IAoBLQAPAjgDAnQgEAngVAgQgxBIhkB/IhYBwQgJACgJAAQgeAAgZgcg");
	this.shape_1.setTransform(28.4081,30.8244);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46.5,69.4);


(lib.uioly8ly789l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-51.95,0,0.1095,0.1095);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.9,0,103.9,93.6);


(lib.uilt78lt78lerst = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#8E3433").s().p("AAQE8QgHgQgBgRQgMgqgCgRQgBgVgihQQgthpgRgzQhLjeBShdIAOgFQAQgCAPAOQAwAsAOC/IAMAaIBACtQA+CygKAVQgJAegTASQgPAOgRAAQgcAAgjgmg");
	this.shape.setTransform(15.4403,35.4143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8E3433").s().p("AAbE3QgHgPgCgRQgFgOgNgQQgNgPAAgFQgCgUgihOQgrhkgTg0QhJjXBPhfIAOgKQARgKATAAQA8ADA3BsQA2BtgHBEQgDAigPAMIg5AEIAvB3QAyCDASA3QgDAEgIgZQgHgXAAADIgBAGQgNATAGAXIAAABQgTAPg5Alg");
	this.shape_1.setTransform(14.7096,39.4238);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29.5,74.6);


(lib.uilt7tyutydu = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-97.85,-163.95,0.1045,0.1045);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.8,-163.9,97.89999999999999,163.9);


(lib.uilt7l78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#8E3433").s().p("Ag9DNQgegKgRgOQgIgHgDgLQgDgLAFgIIBulUIA+gKQA/gBADArQADAwguBrQgsBnhABlQgFAHgJADIgIACIgJgCg");
	this.shape.setTransform(-12.0847,20.6739);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AhWB/QgRgEAkgtQAlgvgCgBQgCgBgeAdIgfAfQgNANgJgIQgIgJAOgPQBFhFATgbQALgPgEgIQgCgEgWAZIgdAgIgSATQgLAJgEgHQgFgLAdgoIABgBQBIhRAjgOQAngQAwApQAOAMgkBGQggA9gmAxQgNARgGADQgEACgFgEQgGgEAWgkQAVgigCAAQgGABgoBCQgSAdgOgLQgEgEADgHQAEgLAXggQAlg0gSANQgGAEg1BJIgLAOQgFAGgHAAIgDgBg");
	this.shape_1.setTransform(-28.0211,48.4165);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.1,0,40.1,61.2);


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
	this.shape.graphics.f("#7D5C40").s().p("ABFB1QlEhTg+gcQg9gcgRA9QgIAfADAlQgdgIgHgdQgOg7BvhmQgNgNgCgSQgEglA3ghIgIAOQgJASgDATQgJA8A2ArQA3ApFQBNQCoAnCeAfIg4AsQiXgkijgpg");
	this.shape.setTransform(43.8716,26);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AhlEFQhkgbheg9QhEgsgqgtQgxgzAog9QALgRAcgeQAYgbAGgMQAGgMgCgcQgCgeAFgQQAVg3CWgYQCXgYDvDVQB4BpBaBwQi2CcjJAAQhKAAhNgWg");
	this.shape_1.setTransform(44.4337,28.2605);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,87.8,56.5);


(lib.oui8o8y9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(-445,-402);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-445,-402,733,624);


(lib.iult7l78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D43539").s().p("Ag+CTQhKg0gEgiQgCgzARg1QAghrBYglIAUgEQAagCAVAJQBHAeAHCIQAHCHghAqQgQAVgSgGIhFgqIABALQAAASgCAgQgjgUglgag");
	this.shape.setTransform(0.0058,19.249);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("AgsEqQgPgHgJggQgHgYABgLIApoLIAoAuQAuAtAWgGIgIDeQgLDjgRAVQgVAagWALQgOAHgMAAQgIAAgGgCg");
	this.shape_1.setTransform(-6.3812,48.8942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.1,0,28.2,79);


(lib.iu79797y9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-33.4,-117.8,0.1095,0.1095);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.4,-117.8,66.8,117.8);


(lib.ioytyutdyu = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#A73A37").s().p("ADaEiQgRgDgXgKIgTgLQgXgDhwiXIh6ivQiVh3gKhBQgDgUALgMQAGgHAGgCQB7gQCMC7QAhArA/BgQAvBJAQANQAOALAaAiQAOALAOA1QASBJgsAAIgJAAg");
	this.shape.setTransform(25.8644,29.0438);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,51.7,58.1);


(lib.iodrtyhsrty = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#B53538").s().p("AgQCNIABgLIhDAkQgRAFgOgVQgbgsAPiDQAQiEBDgZQAigMAdAOQBPApAXBqQAMA1gFAyQgHAghHAvQgkAXgiARQAAgfACgRg");
	this.shape.setTransform(13.1214,18.8802);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("AA1EYQgPgCgRgbQgNgUgEgMIh4nyIAzAgQA2AdARgMIA8DRQA6DVgJAZQgLAegQARQgPAQgPAAIgFAAg");
	this.shape_1.setTransform(18.9104,47.3402);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30.6,75.4);


(lib.io8yy89 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#AF8D75").s().p("ABqCpQhBgwg+g5Qh8hwgFgzQgEg4AagWQAWgSAWAOQAXAOBZB3QBiB/ARA1IAJAoQgBAQgKAAQgMAAgXgTg");
	this.shape.setTransform(15.1418,18.7954);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("ABbB+IgNgPQg/hKgIgFQgIgGACAFQADAIAcAhQAcAhAGAMQAEAHgEADQgFAFgFgBQgKgDgPgUQgyhDgGgBQgCAAAbAjQAbAlgGAEQgFAEgFgCQgGgDgPgSQgugzgpg/QguhIAMgMQApgpArAQQAlAPBUBVIASAWQASAXgDAHQgDAIgMgKIgVgTIgjghQgZgagBAEQgDAJANAPQAXAcBQBGQARARgIAJQgHAIgPgOIgkggQgigegCABQgCABAsAwQArAvgRAEIgDAAQgGAAgGgFg");
	this.shape_1.setTransform(34.1667,41.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,47.7,54.8);


(lib.ilt78lt7rtdyrty = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#292929").s().p("AAvAzQgfglgRgRIgGAzQgEAggBATQgEgZgVgsQgTgmgRgZQgGgJgNgbQgEgIADgJIAGgRQASgFATADQATAEAOAMIAQAQQAIALAGAFIAAgCQADAQAMARQAJAMATAVQAOASANAeQANAggBAUQgRgSgfgmg");
	this.shape.setTransform(0.0182,10.7029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,0,19,21.4);


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


(lib.Path_0 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgCgSIAKACQgDAegMAEg");
	this.shape.setTransform(0.75,1.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,1.5,3.7), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgCgRIAKABQgDAegMAEg");
	this.shape.setTransform(0.775,1.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1.6,3.7), null);


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


(lib.yjryieue = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AACAaQgXgEgOgVIgJgSQAmgUAcAUQAQAKAHANQgBAHgFAGQgJAJgPAAIgNgCg");
	this.shape.setTransform(-0.0142,0.0122,2.039,2.039);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(46).to({_off:true},1).wait(10).to({_off:false},0).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.2,-5.6,18.4,11.3);


(lib.yjeytikei7iu = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-5.6,-5.7,0.2319,0.2319);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.6,-5.7,11.399999999999999,11.4);


(lib.gjydrjyjeu = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#171714").s().p("AAIgJQgcAGgOACQgKACgFgBIgEgBQAHABACgEQgGgDAAgDIABgDQAGAHAFgEQgHAAgBgGIABgFIAGAHQALAFAZgFQAbgGASAUQAJAKADAMQgUgegagBg");
	this.shape.setTransform(-0.0003,0.0027,2.039,2.039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AARAOQg4gOgggBQgRADgOgHQgJgGgBgGQAUAMAGgFQgIgCgIgPIABgKQAOAWAKAAQgOgIgCgLIABgKQAFAMAKAJQAKAKAhADQAhADAuAOQAwAOAUAYQgngRg5gOg");
	this.shape_1.setTransform(-0.175,0.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AAFAuQg5gZgVgeQgKAAgMgFQgMgGgDgSQARAWANgBQgQgEgEgLQgEgMABgEQAOAbAOgBQgOgIgEgKQgEgLAEgEQAFAMAKALQAJAKAeAbQAdAbAuAJQAvAIAcgPQgcAWggAAQgWAAgYgKg");
	this.shape_2.setTransform(-0.025,1.1712);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AACA8QgzgRgcg0QgGgGgFgDIgMgJQgIgHgBgTQAMAVAKADIgIgJQgFgGABgHQAAgIACgGQACAZAQALIgGgGIgDgJQgBgFAAgJQABgIACgCIACAQQABAJAFAIIALATQAMAVALAMQAhAiArAJQAeAFATgJQASgIALgXQgJAsgvAAQgWAAgegJg");
	this.shape_3.setTransform(0.125,2.087);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},51).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(3));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CEA688").s().p("AhegQQAOgLAlgIQAggFAvARQA1AYAGAkQhagmhjgPg");
	this.shape_4.setTransform(1.65,0.8551);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CEA688").s().p("AhdgUQAJgNAogIQAggFAvARQA1AZAGAjQgXAMgaAAQg7AAhPg/g");
	this.shape_5.setTransform(1.775,1.4741);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CEA688").s().p("AANA2Qg8gNguhLQAJgNAogIQAggFAvARQA1AZAGAjQgTAogpAAQgKAAgLgDg");
	this.shape_6.setTransform(1.775,2.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},51).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.4,-4.8,22.6,13.8);


(lib.ghkftykuk = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#171714").s().p("AgtACQAfgdAcAEQAeADAKgGQAFgDAAgDQADAIgNAHQAPgCADgLQAEAKgOAJQAKAFAEgGQgFAJgRgGQgjgMgXAKQgOAGgvAmg");
	this.shape.setTransform(0.0115,0.0039,2.039,2.039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("Ag+AXQAzgUAygJQAygLAQgWQAQgVgBgHQAGAQgWAfQAagTAHgWQAHATgdAdQAQAAANgMQgJATguAKIhZAVQgpAJhmAiQAegYAzgVg");
	this.shape_1.setTransform(0.025,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#171714").s().p("AiPA5QAnAHBHgBQBGAAAighQAjggAIghQAIgigCgJQAGAQgKAtQARgYAEgbQAHAPgTApQAGgBANgXQgBAWgdAkQgcAkhHAQQgXAFgYAAQg0AAg7gWg");
	this.shape_2.setTransform(0.025,1.1361);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#171714").s().p("AhBBXQgrgLgighQAdAQAXAHQAgALAgAAQAgAAAggOQAbgLASgRQATgRAEgXQAEgXACgbQAFgTADgPQAFAXgCAJIgFAcQALgQAGgqQAEAIgCAPQgCAQgKAUQADgBAFgHIAKgUQgBAXgWAvQgVAxg+ARQgnAKgfAAQgRAAgPgDg");
	this.shape_3.setTransform(0.175,3.0728);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},51).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(3));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CEA688").s().p("AgZgcQBsgvAoAqIiGAgIhvA3QAZgnBIgrg");
	this.shape_4.setTransform(-1.9,1.297);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CEA688").s().p("Ah9AwQAPgWAYgVQAbgXAhgRQA0gbAtADQAtACAKAeQgKBLhpALIggACQgyAAg2gNg");
	this.shape_5.setTransform(-1.775,1.977);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CEA688").s().p("AgwBHQgmgJgfgSIgKgKQAQgYAYgUQAcgYAggRQAwgZAyABQAbAAAOAKQAPAKABAZQACAjgeAgQggAhgyAGIgSAAQgWAAgagFg");
	this.shape_6.setTransform(-1.7187,3.589);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},51).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.5,-6.8,29,18.9);


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
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-5.95,-2.6,0.1003,0.1003);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-5.7,-1.9,0.1003,0.1003);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CD958B").s().p("AgfAfQgfgBgIgGQgHgGAHgOIAGgJQAIgIANABQAYgBATgJQAggPArAQQgiABgVAZQgUAagfAAIAAAAg");
	this.shape.setTransform(-1.1776,-0.6977,0.6215,0.6215,20.2067);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C28B85").s().p("Ag5AhQgKgNALgOIAEgDQAHgEAQABQARABATgVQAVgWAiABQgRASgXAcQgXAdgXAGQgHACgGAAQgOAAgGgJg");
	this.shape_1.setTransform(-0.9092,0.6798,0.6215,0.6215,20.2067);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-5.95,-2.55,0.1003,0.1003);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},8).to({state:[]},1).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[]},1).to({state:[{t:this.instance_2}]},1).to({state:[]},1).wait(9));

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

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E6E6E5").s().p("AgrARQAfgMA4gjQgaAhgaANIgWAPg");
	this.shape_5.setTransform(-1.3804,-0.0934,0.6215,0.6215,20.2067);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E6E6E5").s().p("AgsAPQAfgMA6gfQgGANgwAdIgWAPg");
	this.shape_6.setTransform(-1.3651,0.0447,0.6215,0.6215,20.2067);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E6E6E5").s().p("AgvAPQAfgMBAgfQgGAIg2AiIgVAPg");
	this.shape_7.setTransform(-1.2193,0.0984,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},10).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[]},1).to({state:[{t:this.shape_5}]},4).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).wait(6));

	// Layer_3
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CD958B").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_8.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CD958B").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_9.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD958B").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_10.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CD958B").s().p("Ag6AZQgJgHAHgOIAGgJQAIgKANADIAfgFQAmgVAcAQQgHgBgTASQgeAcg3AHQgGgBgFgEg");
	this.shape_11.setTransform(-1.8984,-0.9326,0.6215,0.6215,20.2067);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CD958B").s().p("Ag/AYQgKgIAHgOIAGgJQAJgJANADIAfgFQAngQAmAKQgYAGgWAUQgWAUg2AHQgGgBgFgEg");
	this.shape_12.setTransform(-1.6061,-0.737,0.6215,0.6215,20.2067);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CD958B").s().p("Ag/AYQgJgHAHgOIAGgJQAIgKANADIAfgFQANgIAZgCQAZgCANAGQABADgRAHQgRAHgQAOQgRAQg3AGQgGgBgFgEg");
	this.shape_13.setTransform(-1.634,-0.7905,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},10).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[]},1).to({state:[{t:this.shape_11}]},4).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(6));

	// Layer_4
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_14.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_15.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_16.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C28B85").s().p("AgiAuQgMgKAIgQIACgEQAHgIAagLQAZgNAFgUQAGgVAHAPQAHAOgMAZQgMAXgXASQgOALgKAAQgFAAgFgDg");
	this.shape_17.setTransform(2.65,-2.65,0.6215,0.6215,20.2067,0,0,3.3,-7.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C28B85").s().p("AglAtQgMgKAIgQIACgEQAHgIAggJQAbgIANglQALAXgOAXQgPAYgXAQQgPAJgKAAQgGAAgFgDg");
	this.shape_18.setTransform(2.7,-2.65,0.6215,0.6215,10.7372,0,0,3.2,-7.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C28B85").s().p("AgcA2QgPgHAGgSIABgEQAFgJAZgMQAZgMgBgTIgBgaQgBgHAPAQQAPAQgKAaQgLAYgUAUQgOAOgLAAQgEAAgEgCg");
	this.shape_19.setTransform(2.6,-2.65,0.6215,0.6215,20.2067,0,0,0.5,-8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},10).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[]},1).to({state:[{t:this.shape_17}]},4).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).wait(6));

	// Layer_5
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_20.setTransform(0.65,1.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_21.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgVANIgBgBIgBgCIgBgCIABgCIgCgEIALgCIASgFIAOgHIAFgCIABAAIABADIABACQgOALgQAJIgKAEIgHgCg");
	this.shape_22.setTransform(0.6474,1.4293,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},11).to({state:[{t:this.shape_21}]},1).to({state:[]},1).to({state:[{t:this.shape_22}]},5).to({state:[{t:this.shape_21}]},1).to({state:[]},1).wait(6));

	// Layer_6
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_23.setTransform(0.55,1.0856);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_24.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#C2811E").s().p("AgVAKIAFgIIAJgIQAHgGAMACIAKADIABADIgBADIgaAIQgIAEgFAAIgEgBg");
	this.shape_25.setTransform(0.5556,1.0862,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_23}]},11).to({state:[{t:this.shape_24}]},1).to({state:[]},1).to({state:[{t:this.shape_25}]},5).to({state:[{t:this.shape_24}]},1).to({state:[]},1).wait(6));

	// Layer_7
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#C25D57").s().p("AgNATIAAAAIgBgBIgBAAIgBgFQACgBgFgJIgFgBIgBgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIAAgCIACgBIAIgGIAGgEIACAAIACgBIABAAIACAAIAAAAIACAAIACAAIACgBIABAAIAGgBIAAgBIAFAAIAAgBIADgBQACACAAAEIABgBQABgCABAAQABgBABgBQAAAAAAAAQAAAAgBABIABAEIABADIgEAJIgGAFIgHACIgDAEIgDACIAAABIgCABIgCABQgBADgFABIgEABg");
	this.shape_26.setTransform(0,-0.175);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_27.setTransform(0.2313,-0.2179);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_28.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C25D57").s().p("AgMATIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAPAIIAEAIIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgCACgFACIgEAAg");
	this.shape_29.setTransform(-0.1787,0.0295,0.9179,0.9179);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C25D57").s().p("AgPATIAAgBIgHgRIgFgBIgCgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAgBIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIADAAIABAAIAAABQgHAGAkADIgMAVQgCACgYAEIgEAAg");
	this.shape_30.setTransform(0.0966,0.0524,0.9179,0.9179);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#C25D57").s().p("AgKAXIgBAAQAAgVgMgFIgGgBIgBgCQAAgBAAAAQgBAAAAAAQAAAAABgBQAAAAAAAAIAAgCIACgCIAJgGIAHgEIACAAIACgBIACAAQACADASACQATACgCANIgJASIgZAIIgFABg");
	this.shape_31.setTransform(0.1972,0.5343,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_26}]},10).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[]},1).to({state:[{t:this.shape_29}]},4).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-2.8,9.7,7.8);


(lib.ClipGroup_44 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(1.05,0,0.1137,0.1137);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_44, new cjs.Rectangle(1.1,0,5,5.1), null);


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

	// Layer_3
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(3.05,0,0.148,0.148);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(3.1,0,6.5,6.7), null);


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
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(7.35,0.5,0.145,0.145);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0, new cjs.Rectangle(7.4,0.5,7.199999999999999,7.4), null);


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
	this.instance_2.setTransform(-23.8,11.2,2.0646,2.0646,0,0,0,8.5,4.9);

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
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(34.4,-1.05,2.023,2.023,0,0,0,5.5,4.4);

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


(lib.hyjkyukyuk = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjydrjyjeu("synched",0);
	this.instance.setTransform(-25.5,0.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Layer_3
	this.instance_1 = new lib.ghkftykuk("synched",0);
	this.instance_1.setTransform(22.1,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AhDA2QgygKgdgpIgRgmQBOgpA8ApQAdATAQAcQgCAOgMANQgQASgeAAQgMAAgPgDg");
	mask.setTransform(-16.3949,3.3122);

	// _Clip_Group__44
	this.instance_2 = new lib.ClipGroup_44();
	this.instance_2.setTransform(-23.9,5.5,2.039,2.039,4.4654,0,0,3.5,2.5);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AiBAdQBKhZBXgPQBPgMAMApQAfBihuAWQgZAFgXAAQhJAAg0gyg");
	mask_1.setTransform(20.667,1.3931);

	// yjeytikei7iu
	this.instance_3 = new lib.yjeytikei7iu("synched",0);
	this.instance_3.setTransform(18.95,4.4);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

	// Layer_6
	this.instance_4 = new lib.yjryieue("synched",57);
	this.instance_4.setTransform(-23.6,3.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60));

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag/AOQAkgrArgHQAmgGAGAUQAPAvg1ALQgNADgKAAQgkAAgagZg");
	this.shape.setTransform(20.6622,1.3964,2.039,2.039);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.9,-9.3,73.5,18.9);


(lib.ftyjftyjfty = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjydrjyjeu("synched",0);
	this.instance.setTransform(-25.5,0.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Layer_3
	this.instance_1 = new lib.ghkftykuk("synched",0);
	this.instance_1.setTransform(22.1,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AhDA2QgygKgdgpIgRgmQBOgpA8ApQAdATAQAcQgCAOgMANQgQASgeAAQgMAAgPgDg");
	mask.setTransform(-16.3949,3.3122);

	// _Clip_Group__44
	this.instance_2 = new lib.ClipGroup_44();
	this.instance_2.setTransform(-24.65,4.5,2.039,2.039,4.4654,0,0,3.5,2.5);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AiBAdQBKhZBXgPQBPgMAMApQAfBihuAWQgZAFgXAAQhJAAg0gyg");
	mask_1.setTransform(20.667,1.3931);

	// yjeytikei7iu
	this.instance_3 = new lib.yjeytikei7iu("synched",0);
	this.instance_3.setTransform(18.2,3.4);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

	// Layer_6
	this.instance_4 = new lib.yjryieue("synched",57);
	this.instance_4.setTransform(-23.6,3.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60));

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag/AOQAkgrArgHQAmgGAGAUQAPAvg1ALQgNADgKAAQgkAAgagZg");
	this.shape.setTransform(20.6622,1.3964,2.039,2.039);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.9,-9.3,73.5,18.9);


(lib.fghrsdthrsdt = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjydrjyjeu("synched",0);
	this.instance.setTransform(-25.5,0.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Layer_3
	this.instance_1 = new lib.ghkftykuk("synched",0);
	this.instance_1.setTransform(22.1,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AhDA2QgygKgdgpIgRgmQBOgpA8ApQAdATAQAcQgCAOgMANQgQASgeAAQgMAAgPgDg");
	mask.setTransform(-16.3949,3.3122);

	// _Clip_Group__44
	this.instance_2 = new lib.ClipGroup_44();
	this.instance_2.setTransform(-24.95,1.4,2.039,2.039,4.4654,0,0,3.5,2.5);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AiBAdQBKhZBXgPQBPgMAMApQAfBihuAWQgZAFgXAAQhJAAg0gyg");
	mask_1.setTransform(20.667,1.3931);

	// yjeytikei7iu
	this.instance_3 = new lib.yjeytikei7iu("synched",0);
	this.instance_3.setTransform(17.9,0.3);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

	// Layer_6
	this.instance_4 = new lib.yjryieue("synched",57);
	this.instance_4.setTransform(-23.6,3.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60));

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag/AOQAkgrArgHQAmgGAGAUQAPAvg1ALQgNADgKAAQgkAAgagZg");
	this.shape.setTransform(20.6622,1.3964,2.039,2.039);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.9,-9.3,73.5,18.9);


(lib.uil7t8lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_32
	this.instance = new lib.fgryjdsrtyjrsyj("single",14);
	this.instance.setTransform(-1.15,-13.2,1.0914,1.0557,0,-4.8638,175.4845);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(153).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:16},0).wait(9).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:14},0).wait(3).to({startPosition:17},0).wait(3).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(17).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(8).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(11).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(8).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(5).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(9).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(1372).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(954).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(28).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(77).to({startPosition:13},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(902).to({startPosition:8},0).to({_off:true},1).wait(33));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4F4E4E").s().p("AgHAJIACgTIANACIgCATg");
	this.shape.setTransform(24.075,-29.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4233).to({_off:true},1).wait(33));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F4E4E").s().p("AgKATIgDgIQAAgUANgHIAOgEQgJAIgHAbQgDAGgDAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAg");
	this.shape_1.setTransform(-28.5509,-35.8242);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(4233).to({_off:true},1).wait(33));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F4E4E").s().p("AgrABQABgHgBgGIgCgFIBbAQIgDATg");
	this.shape_2.setTransform(-16.85,-35.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4233).to({_off:true},1).wait(33));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4F4E4E").s().p("AgHAJIACgTIANACIgCATg");
	this.shape_3.setTransform(-11.725,-34.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(4233).to({_off:true},1).wait(33));

	// Layer_7
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4F4E4E").s().p("AgaAGIADgSQARAOARgCQAKgBAGgEIgDASg");
	this.shape_4.setTransform(6.625,-32.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4233).to({_off:true},1).wait(33));

	// Layer_8
	this.instance_1 = new lib.Path_0();
	this.instance_1.setTransform(2.15,-32.5,1,1,0,0,0,0.8,1.9);
	this.instance_1.alpha = 0.6016;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#4F4E4E").ss(2).p("AgJA3QAdAEAYgTQAYgSADgdIACgOQABgHgFgGQgEgGgIgBIhqgNQgIgBgGAEQgFAFgBAHIgCAOQgEAdASAXQATAYAdAEg");
	this.shape_5.setTransform(-3.4194,-31.7672);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.instance_1}]}).to({state:[{t:this.shape_5},{t:this.instance_1}]},4233).to({state:[]},1).wait(33));

	// Layer_9
	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(21.9,-29.9,1,1,0,0,0,0.8,1.8);
	this.instance_2.alpha = 0.6016;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4F4E4E").ss(2).p("AgJA2QAdAEAXgSQAYgTAEgcIABgOQABgHgEgGQgFgGgHgBIhrgNQgHgBgGAEQgGAFgBAHIgBAOQgEAcASAYQATAYAdADg");
	this.shape_6.setTransform(16.3556,-29.0985);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.instance_2}]}).to({state:[{t:this.shape_6},{t:this.instance_2}]},4233).to({state:[]},1).wait(33));

	// Layer_31
	this.instance_3 = new lib.hyjkyukyuk("synched",47);
	this.instance_3.setTransform(1.95,-30.4,0.4722,0.4565,0,7.4184,-172.5771,7.4,4);

	this.instance_4 = new lib.fghrsdthrsdt("synched",23);
	this.instance_4.setTransform(1.95,-30.4,0.4722,0.4565,0,7.4184,-172.5771,7.4,4);

	this.instance_5 = new lib.ftyjftyjfty("synched",19);
	this.instance_5.setTransform(1.95,-30.4,0.4722,0.4565,0,7.4184,-172.5771,7.4,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},96).to({state:[{t:this.instance_5,p:{startPosition:19}}]},176).to({state:[{t:this.instance_5,p:{startPosition:20}}]},3961).to({state:[]},1).wait(33));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AAEBVQgxgogggOIgcghQgXgagYAMQgZAMAKgvQAFgYAKgaICoAMICaB+QgYAaghATQgiAUgcAAQgaAAgVgRg");
	this.shape_7.setTransform(5.0551,-59.3177);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(4233).to({_off:true},1).wait(33));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7EFE4").s().p("AAAAKQgEAAgDgDQgDgEABgDQAAgEAEgDQADgDADABQAFABACADQADADgBAEQAAAEgEACQgCACgDAAIgBAAg");
	this.shape_8.setTransform(-24.8661,-25.5161);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(4233).to({_off:true},1).wait(33));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF8E79").s().p("AAGAzQAYgPgegcQgEgIgEgMQgGgaAHgUIABAYQAEAcAMAOIANAaQADAZgwABQASgCAKgHg");
	this.shape_9.setTransform(7.8836,-25.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(4233).to({_off:true},1).wait(33));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AF8E79").s().p("AAJAUQgBgOgGgLQgEgRgKgTQAGACAGAIQAEAHACAHQAMAYgJAiIAAgVg");
	this.shape_10.setTransform(-24.5571,-32.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4233).to({_off:true},1).wait(33));

	// Layer_20
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CDA688").s().p("AgLBHQgkgOADg/QACg6AqgJQAPgEAKALQAKANgEAZQgEATAJgGIAJgKIgVBiIAAAAQgIACgHAAQgKAAgKgEg");
	this.shape_11.setTransform(-24.4332,-31.3509);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(4233).to({_off:true},1).wait(33));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AgYABIgWAJQgKADgFgGIARgRQAXgQAaAFQAbAEARAUQAJAKAEAKQgxghglALg");
	this.shape_12.setTransform(14.925,-37.8994);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(4233).to({_off:true},1).wait(33));

	// Layer_23
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("AAeAAQghgShHANIAYgPQAggNAeAEQAkAEARAcQAJAOABAOQgagVgTgKg");
	this.shape_13.setTransform(-1.25,-40.4457);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(4233).to({_off:true},1).wait(33));

	// Layer_24
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CDA688").s().p("AhwDvQgUgRgRgUIgMgRQgbgbgJgkQgFgVAAgqQgRAIgSgGQgigMgBhGQAAggAOgUQALgRASgCQARgDAKANQALAOgFAZQgDATAJgFQAEgDAFgGQARgxAKgXQASgpAcgTQAcgSAzgeQAdgVAEgRQgEgCgCgEQgDgHAFgDQADgDABALQABAEgBAEQAQAHAtgWQA5gbA/ATQAgAJAVAOQAIAqAXBVQANBHgdAdQgbAcgFAmQgIBDgDAIQgQA1gwA3Qg5BBg2ACIgNABQhJAAg9gxg");
	this.shape_14.setTransform(-1.6722,-29.9335);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4233).to({_off:true},1).wait(33));

	// Layer_25
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#292929").s().p("AinDYQhfg0AIhZQAMiEAfhGQAshhBdgQQC2ggBcBoQAuAzAJA6QgxCniQBXQhHAsg+AKQgxgIgvgZg");
	this.shape_15.setTransform(-3.4312,-49.6175);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(4233).to({_off:true},1).wait(33));

	// Layer_26
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#AF8E79").s().p("AAdBYQgzgSgsguQgWgYgKhdIAHgDIB6BdQBuBdhEAGIgCABQgRAAgZgJg");
	this.shape_16.setTransform(-7.9261,-9.6487);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4233).to({_off:true},1).wait(33));

	// Layer_27
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#292929").s().p("AhFDmQgVgagcg4QgQghgDgTQgCgegEggQgBgJACgOIAEgYIANhiQAEgbAGgJQAPgagCgMQgBgIAUgXQAcgfAQgNQAhgbA6gDQA2gCAmARIgnAqQgiAMgeAhQgdAggRAtQgVA2gEBHQgCA4AHBLQADAeAOArQAHAYgGAxQgwgsgOgRg");
	this.shape_17.setTransform(-15.9667,-46.7156);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(4233).to({_off:true},1).wait(33));

	// Layer_28
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#4F4E4E").s().p("AgrABQABgHgCgGIgBgFIBaAQIgCATg");
	this.shape_18.setTransform(20.4,-30.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(4233).to({_off:true},1).wait(33));

	// Layer_29
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#373432").s().p("AgYAZIgCgRIgGgNQgDgKgBgFQAAgIAEgLIAKgiQAoATAOAmQAHATgDAUQgEAWgOAOQgDAEgCgCIAAANQgggbgFgWg");
	this.shape_19.setTransform(24.2807,-47.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(4233).to({_off:true},1).wait(33));

	// Layer_30
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#292929").s().p("ABuCtQgLgOgMABQhmAGhYg0QgsgZgYghQgTgbgHgiQgFgXAEgVQAFgYAOgPQAJgKAagPIA9gjIgGgFQAQABAmgQQAggOARAIQBrAxAiAsQAdAkAMBCQAOBMgiAcQgJAHgnAqQgEAEgEAAQgFAAgFgFg");
	this.shape_20.setTransform(10.36,-53.4724);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(4233).to({_off:true},1).wait(33));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.4,-75.8,60.8,75.8);


(lib.uilt78l8t7lt78l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ghjdtjtyktyktut("single",9);
	this.instance.setTransform(-10.95,-61.7,0.4641,0.4641,0,-33.0055,146.9945,6.5,-5.5);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(48).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(565).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(23).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(5).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:11},0).wait(6).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(26).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(24).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(19).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(23).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(28).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2);
	var _tweenStr_1 = _tweenStr_0.to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(4).to({startPosition:8},0).wait(14).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(23).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(149).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(26).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(24).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(25).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(30).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3);
	var _tweenStr_2 = _tweenStr_1.to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(29).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(120).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(75).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(76).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(25).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(32).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(21).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:11},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(17).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2);
	this.timeline.addTween(_tweenStr_2.to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(11).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(5).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(55).to({startPosition:8},0).to({_off:true},1).wait(52));

	// Layer_3
	this.instance_1 = new lib.ghjkdtktuktuykut("synched",0);
	this.instance_1.setTransform(-17.95,-72.75,0.349,0.3463,0,-34.6425,146.3433,-8.2,7.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4199).to({startPosition:49},0).to({_off:true},1).wait(52));

	// Layer_1
	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(-56.35,-121.35,0.1045,0.1045);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4199).to({_off:true},1).wait(52));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.3,-121.3,112.69999999999999,121.39999999999999);


(lib.o8yy89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// io_ytyutdyu
	this.instance = new lib.ioytyutdyu("synched",0);
	this.instance.setTransform(0.25,-31.65,1,1,0,0,0,13.7,8.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({regX:13.6,regY:8.4,rotation:-1.9763,x:-3.5,y:-32.05},11).wait(70).to({startPosition:0},0).to({regX:13.7,regY:8.5,rotation:0,x:0.25,y:-31.65},11).wait(559).to({startPosition:0},0).to({regX:13.6,regY:8.4,rotation:-4.6783,x:-1.7,y:-31.3},10).wait(238).to({startPosition:0},0).to({rotation:-5.6782,x:-3.4,y:-30.7},10).wait(461).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-3.7018,x:0.2,y:-31.95},12).wait(230).to({startPosition:0},0).to({regX:13.5,regY:8.3,scaleX:1,scaleY:1,rotation:-2.2519,x:2.8,y:-32.45},10).wait(335).to({startPosition:0},0).to({regX:13.7,regY:8.5,rotation:0,x:0.25,y:-31.65},9).wait(131).to({startPosition:0},0).to({regY:8.4,rotation:-1.4838,x:-2.25,y:-30.6},10).wait(289).to({startPosition:0},0).to({regX:13.6,rotation:0,x:0.25,y:-31.4},9).wait(229).to({startPosition:0},0).to({regY:8.3,rotation:1.4524,x:-2.7,y:-30},9).wait(271).to({startPosition:0},0).to({regX:13.5,regY:8.2,rotation:0.1749,x:0.4,y:-31.1},9).wait(78).to({rotation:0.1749},0).to({regX:13.7,regY:8.5,rotation:0,x:0.25,y:-31.65},9).wait(289).to({startPosition:0},0).to({rotation:-2.1923,x:-3.65,y:-30.5},8).wait(431).to({startPosition:0},0).to({regY:8.4,rotation:-4.3844,x:-7.35,y:-29.1},9).wait(346).to({startPosition:0},0).to({regY:8.5,rotation:0,x:0.25,y:-31.65},11).wait(51));

	// uo_79_97y
	this.instance_1 = new lib.uo7997y("synched",0);
	this.instance_1.setTransform(32.75,10.3,1,1,0,0,0,39,14.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({regY:14.3,rotation:-1.9763,x:30.55,y:8.75},11).wait(70).to({startPosition:0},0).to({regY:14.4,rotation:0,x:32.75,y:10.3},11).wait(559).to({startPosition:0},0).to({rotation:-4.6783,x:34.2,y:7.95},10).wait(238).to({startPosition:0},0).to({regY:14.3,rotation:-5.6782,x:33.15,y:7.9},10).wait(461).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-3.7018,x:35.4,y:7.85},12).wait(230).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:-2.2519,x:37.05,y:8.3},10).wait(335).to({startPosition:0},0).to({regY:14.4,rotation:0,x:32.75,y:10.3},9).wait(131).to({startPosition:0},0).to({regY:14.3,rotation:-1.4838,x:31.3,y:10.5},10).wait(289).to({startPosition:0},0).to({rotation:0,x:32.8,y:10.55},9).wait(229).to({startPosition:0},0).to({rotation:1.4524,x:28.8,y:12.85},9).wait(271).to({startPosition:0},0).to({regX:38.9,rotation:0.1749,x:32.85,y:11.1},9).wait(78).to({rotation:0.1749},0).to({regX:39,regY:14.4,rotation:0,x:32.75,y:10.3},9).wait(289).to({startPosition:0},0).to({regX:39.1,rotation:-2.1923,x:30.45,y:10.15},8).wait(431).to({startPosition:0},0).to({regX:39,regY:14.3,rotation:-4.3844,x:28.3,y:10.2},9).wait(346).to({startPosition:0},0).to({regY:14.4,rotation:0,x:32.75,y:10.3},11).wait(51));

	// ui_lt78l8t7lt78l
	this.instance_2 = new lib.uilt78l8t7lt78l("synched",0);
	this.instance_2.setTransform(-23.2,-57.45,1,1,0,0,0,0,-60.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(16).to({startPosition:16},0).to({_off:true},1).wait(17).to({_off:false,startPosition:34},0).wait(11).to({startPosition:45},0).to({regX:-0.1,regY:-60.6,rotation:-1.9763,x:-27.85,y:-56.9,startPosition:56},11).wait(70).to({startPosition:126},0).to({regX:0,regY:-60.7,rotation:0,x:-23.2,y:-57.45,startPosition:137},11).wait(559).to({startPosition:696},0).to({regX:-0.1,regY:-60.6,rotation:-1.2258,x:-25.9,y:-56,startPosition:706},10).wait(238).to({startPosition:944},0).to({rotation:-2.2256,x:-28.05,y:-55,startPosition:954},10).wait(461).to({startPosition:1415},0).to({rotation:-0.2492,x:-23.55,y:-57.15,startPosition:1427},12).wait(230).to({rotation:-0.2492,startPosition:1657},0).to({rotation:1.2005,x:-20.3,y:-58.2,startPosition:1667},10).wait(335).to({startPosition:2002},0).to({regX:0,regY:-60.7,rotation:0,x:-23.2,y:-57.45,startPosition:2011},9).wait(131).to({startPosition:2142},0).to({regX:-0.1,regY:-60.6,rotation:-1.4838,x:-26.45,y:-55.7,startPosition:2152},10).wait(289).to({startPosition:2441},0).to({regY:-60.7,rotation:0,x:-23.25,y:-57.2,startPosition:2450},9).wait(229).to({startPosition:2679},0).to({regY:-60.6,rotation:-1.483,x:-26.6,y:-55.55,startPosition:2688},9).wait(271).to({startPosition:2959},0).to({rotation:0.4677,x:-22.45,y:-57.3,startPosition:2968},9).wait(78).to({startPosition:3046},0).to({regX:0,regY:-60.7,rotation:0,x:-23.2,y:-57.45,startPosition:3055},9).wait(289).to({startPosition:3344},0).to({regX:-0.1,regY:-60.6,rotation:-2.1923,x:-28.2,y:-55.35,startPosition:3352},8).wait(431).to({startPosition:3783},0).to({rotation:-4.3844,x:-32.8,y:-52.95,startPosition:3792},9).wait(346).to({startPosition:4138},0).to({regX:0,regY:-60.7,rotation:0,x:-23.2,y:-57.45,startPosition:4149},11).wait(51));

	// uil7tlt78l
	this.instance_3 = new lib.uil7tlt78l("synched",0);
	this.instance_3.setTransform(4.15,80.6,1,1,0,0,0,12.3,24.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({rotation:-1.9763,x:4.35,y:80.05},11).wait(70).to({startPosition:0},0).to({rotation:0,x:4.15,y:80.6},11).wait(559).to({startPosition:0},0).to({regX:12.2,rotation:-1.2258,x:4.4,y:81.4},10).wait(238).to({startPosition:0},0).to({startPosition:0},10).wait(461).to({startPosition:0},0).to({startPosition:0},12).wait(230).to({startPosition:0},0).to({startPosition:0},10).wait(335).to({startPosition:0},0).to({regX:12.3,rotation:0,x:4.15,y:80.6},9).wait(131).to({startPosition:0},0).to({startPosition:0},10).wait(289).to({startPosition:0},0).to({startPosition:0},9).wait(229).to({startPosition:0},0).to({startPosition:0},9).wait(271).to({startPosition:0},0).to({startPosition:0},9).wait(78).to({startPosition:0},0).to({startPosition:0},9).wait(289).to({startPosition:0},0).to({startPosition:0},8).wait(431).to({startPosition:0},0).to({startPosition:0},9).wait(346).to({startPosition:0},0).to({startPosition:0},11).wait(51));

	// uilt7tyutydu
	this.instance_4 = new lib.uilt7tyutydu("synched",0);
	this.instance_4.setTransform(17.75,66.65,1,1,0,0,0,-40.1,-33.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({regX:-40,rotation:-1.9763,x:17.5,y:65.6},11).wait(70).to({startPosition:0},0).to({regX:-40.1,rotation:0,x:17.75,y:66.65},11).wait(559).to({startPosition:0},0).to({regX:-40,rotation:-1.2258,x:17.85,y:67.1},10).wait(238).to({startPosition:0},0).to({rotation:-2.2256,x:17.8,y:67.35},10).wait(461).to({startPosition:0},0).to({regX:-39.9,regY:-33.4,rotation:-0.2492,x:18.05,y:66.75},12).wait(230).to({rotation:-0.2492},0).to({rotation:1.2005,x:18.15,y:66.7},10).wait(335).to({startPosition:0},0).to({regX:-40.1,regY:-33.5,rotation:0,x:17.75,y:66.65},9).wait(131).to({startPosition:0},0).to({regX:-40,rotation:-1.4838,x:17.85,y:67.25},10).wait(289).to({startPosition:0},0).to({regY:-33.4,rotation:0,x:17.8,y:67},9).wait(229).to({startPosition:0},0).to({regX:-39.9,rotation:-1.483,x:17.7,y:67.5},9).wait(271).to({startPosition:0},0).to({rotation:0.4677,x:17.6,y:67.15},9).wait(78).to({startPosition:0},0).to({regX:-40.1,regY:-33.5,rotation:0,x:17.75,y:66.65},9).wait(289).to({startPosition:0},0).to({regX:-40,rotation:-2.1923,x:17.6,y:67},8).wait(431).to({startPosition:0},0).to({rotation:-4.3844,y:67.55},9).wait(346).to({startPosition:0},0).to({regX:-40.1,rotation:0,x:17.75,y:66.65},11).wait(51));

	// uilt78lt78lerst
	this.instance_5 = new lib.uilt78lt78lerst("synched",0);
	this.instance_5.setTransform(-39.4,-29.95,1,1,0,0,0,6.2,5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({regX:6.1,rotation:10.231,x:-41.4,y:-28.05},11).wait(70).to({startPosition:0},0).to({regX:6.2,rotation:0,x:-39.4,y:-29.95},11).wait(559).to({startPosition:0},0).to({regX:6,regY:4.9,rotation:0.7501,x:-41.3,y:-28.15},10).wait(238).to({startPosition:0},0).to({rotation:2.7192,x:-42.85,y:-26.85},10).wait(461).to({startPosition:0},0).to({rotation:1.2128,x:-39.55,y:-29.55},12).wait(230).to({startPosition:0},0).to({regX:5.9,regY:4.8,scaleX:0.9999,scaleY:0.9999,rotation:6.8739,x:-37.05,y:-31.4},10).wait(335).to({rotation:6.8739},0).to({regX:6.2,regY:5,scaleX:1,scaleY:1,rotation:0,x:-39.4,y:-29.95},9).wait(131).to({startPosition:0},0).to({regX:6,rotation:2.9686,x:-41.35,y:-28.1},10).wait(289).to({startPosition:0},0).to({rotation:0.7467,x:-39.15,y:-29.95},9).wait(229).to({rotation:0.7467},0).to({regX:5.9,regY:4.9,rotation:-5.9664,x:-42.5,y:-28.15},9).wait(271).to({startPosition:0},0).to({regY:4.8,rotation:-4.0163,x:-39.2,y:-30.45},9).wait(78).to({startPosition:0},0).to({regX:6.2,regY:5,rotation:0,x:-39.4,y:-29.95},9).wait(289).to({startPosition:0},0).to({rotation:0.5298,x:-43.1,y:-27.3},8).wait(431).to({startPosition:0},0).to({regY:4.9,rotation:-1.6622,x:-46.6,y:-24.4},9).wait(346).to({rotation:-1.6622},0).to({regY:5,rotation:0,x:-39.4,y:-29.95},11).wait(51));

	// uilt7l78l
	this.instance_6 = new lib.uilt7l78l("synched",0);
	this.instance_6.setTransform(-18.75,34.45,1,1,0,0,0,-3.8,6.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(16).to({startPosition:0},0).to({_off:true},1).wait(17).to({_off:false},0).wait(11).to({startPosition:0},0).to({regX:-3.9,regY:6.8,rotation:10.231,x:-32.5,y:39},11).wait(70).to({startPosition:0},0).to({regX:-3.8,regY:6.7,rotation:0,x:-18.75,y:34.45},11).wait(559).to({startPosition:0},0).to({regY:6.8,rotation:69.1997,x:-21.35,y:36.6},10).wait(238).to({startPosition:0},0).to({regY:6.9,rotation:63.1937,x:-25.2,y:38.45},10).wait(461).to({startPosition:0},0).to({regX:-3.7,regY:7,scaleX:0.9999,scaleY:0.9999,rotation:46.7505,x:-20.25,y:35.35},12).wait(230).to({startPosition:0},0).to({regX:-3.6,regY:7.2,rotation:58.6173,x:-24.25},10).wait(335).to({startPosition:0},0).to({regX:-3.8,regY:6.7,scaleX:1,scaleY:1,rotation:0,x:-18.75,y:34.45},9).wait(131).to({startPosition:0},0).to({regX:-3.9,regY:6.8,rotation:58.9197,x:-23.9,y:37.25},10).wait(289).to({startPosition:0},0).to({regY:6.9,scaleX:0.9999,scaleY:0.9999,rotation:44.4875,x:-19.35,y:34.65},9).wait(229).to({startPosition:0},0).to({regX:-3.8,regY:7,rotation:27.8211,x:-15.1,y:33.9},9).wait(271).to({startPosition:0},0).to({regY:7.2,rotation:39.4778,x:-14.15,y:32.6},9).wait(78).to({startPosition:0},0).to({regY:6.7,scaleX:1,scaleY:1,rotation:0,x:-18.75,y:34.45},9).wait(289).to({startPosition:0},0).to({regX:-3.9,rotation:42.7541,x:-23.15,y:37.2},8).wait(431).to({startPosition:0},0).to({rotation:40.5611,x:-24.2,y:39.35},9).wait(346).to({startPosition:0},0).to({regX:-3.8,rotation:0,x:-18.75,y:34.45},11).wait(51));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.5,-120.1,173.9,233.1);


(lib.yuilt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// yulk6l8t68l8
	this.instance = new lib.yulk6l8t68l8("synched",0);
	this.instance.setTransform(-37.6,-60.9,1,1,0,0,0,0,1.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(94).to({startPosition:0},0).to({regX:-0.1,regY:1.3,rotation:-3.5273,y:-61.1},7).wait(51).to({startPosition:0},0).to({regY:1.2,rotation:2.2151,x:-27.6,y:-62.2},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:0,x:-31.5,y:-61.6},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:2.7402,x:-26.8,y:-62},10).wait(167).to({startPosition:0},0).to({regY:1.3,rotation:-3.5273,x:-37.6,y:-61.1},8).wait(1369).to({startPosition:0},0).to({rotation:-1.5503,x:-34.35,y:-61.8},8).wait(80).to({startPosition:0},0).wait(8).to({rotation:-3.5273,x:-37.6,y:-61.1},0).wait(941).to({startPosition:0},0).to({regY:1.2,rotation:-1.5757,x:-34.3,y:-61.75},8).wait(82).to({startPosition:0},0).to({regY:1.3,rotation:-3.5273,x:-37.6,y:-61.1},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// iult7l78l
	this.instance_1 = new lib.iult7l78l("synched",0);
	this.instance_1.setTransform(-43.95,-43.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({rotation:5.743,x:-35.6,y:-45.7},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:3.5273,x:-38.85,y:-44.8},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:6.268,x:-34.95,y:-45.6},10).wait(167).to({startPosition:0},0).to({rotation:0,x:-43.95,y:-43.95},8).wait(1369).to({startPosition:0},0).to({rotation:1.9763,x:-41.3,y:-44.85},8).wait(80).to({startPosition:0},0).wait(8).to({rotation:0,x:-43.95,y:-43.95},0).wait(941).to({startPosition:0},0).to({rotation:4.9028,x:-40.8,y:-44.7},8).wait(82).to({startPosition:0},0).to({rotation:0,x:-43.95,y:-43.95},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// yrtj56j5j56
	this.instance_2 = new lib.yrtj56j5j56("synched",0);
	this.instance_2.setTransform(-49.55,29.85,1,1,0,0,0,8.8,8.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({rotation:5.743,x:-48.6,y:27.15},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:3.5273,x:-49,y:28.45},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:8.9,rotation:6.268,x:-48.55,y:27.1},10).wait(167).to({startPosition:0},0).to({regY:8.8,rotation:0,x:-49.55,y:29.85},8).wait(1369).to({startPosition:0},0).to({rotation:1.9763,x:-49.4,y:28.65},8).wait(80).to({startPosition:0},0).wait(8).to({rotation:0,x:-49.55,y:29.85},0).wait(941).to({startPosition:0},0).to({rotation:4.9028,x:-52.7,y:28.25},8).wait(82).to({startPosition:0},0).to({rotation:0,x:-49.55,y:29.85},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// uil7t8lt78l
	this.instance_3 = new lib.uil7t8lt78l("synched",0);
	this.instance_3.setTransform(-16.45,-54.9,1,1,0,0,0,-2.9,-4.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(94).to({startPosition:94},0).to({regY:-5,rotation:-10.2449,x:-16.15,y:-57.05,startPosition:101},7).wait(51).to({startPosition:152},0).to({rotation:-4.502,x:-6.65,y:-55.95,startPosition:162},10,cjs.Ease.quadInOut).wait(153).to({startPosition:315},0).to({rotation:-6.716,x:-10.35,y:-56.15,startPosition:325},10,cjs.Ease.quadInOut).wait(153).to({startPosition:478},0).to({rotation:-3.9751,x:-5.9,y:-55.6,startPosition:488},10).wait(167).to({startPosition:655},0).to({rotation:-10.2449,x:-16.15,y:-57.05,startPosition:663},8).wait(1369).to({startPosition:2032},0).to({rotation:-8.2678,x:-13,y:-57,startPosition:2040},8).wait(80).to({startPosition:2120},0).to({rotation:-10.2449,x:-16.15,y:-57.05,startPosition:2128},8).wait(941).to({startPosition:3069},0).to({rotation:-8.2926,x:-12.95,y:-56.9,startPosition:3077},8).wait(82).to({startPosition:3159},0).to({rotation:-10.2449,x:-16.15,y:-57.05,startPosition:3167},8).wait(124).to({startPosition:3291},0).wait(39).to({startPosition:3330},0).wait(886).to({startPosition:4216},0).to({_off:true},1).wait(17));

	// ilt78lt7rtdyrty
	this.instance_4 = new lib.ilt78lt7rtdyrty("synched",0);
	this.instance_4.setTransform(-3.05,-51.6,1,1,0,0,0,-6.6,1.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(94).to({startPosition:0},0).to({regX:-6.5,regY:1.2,rotation:5.2197,x:-2.3,y:-56.25},7).wait(51).to({startPosition:0},0).to({rotation:10.9622,x:6.95,y:-53.75},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({rotation:8.7455,x:3.35,y:-54.5},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:11.4874,x:7.65,y:-53.25},10).wait(167).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:5.2197,x:-2.3,y:-56.25},8).wait(1369).to({startPosition:0},0).to({rotation:7.1951,x:0.7,y:-55.7},8).wait(80).to({startPosition:0},0).to({rotation:5.2197,x:-2.3,y:-56.25},8).wait(941).to({startPosition:0},0).to({rotation:7.1703,x:0.75,y:-55.6},8).wait(82).to({startPosition:0},0).to({rotation:5.2197,x:-2.3,y:-56.25},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// iu_79_79_7y9_
	this.instance_5 = new lib.iu79797y9("synched",0);
	this.instance_5.setTransform(-21.5,33.35,1,1,0,0,0,0,-5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({regX:-0.1,regY:-5.2,rotation:5.743,x:-21.15,y:33.55},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:-5.3,rotation:3.5273,x:-21.3,y:33.65},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:-5.2,rotation:6.268,x:-21.2,y:33.7},10).wait(167).to({startPosition:0},0).to({regX:0,regY:-5.3,rotation:0,x:-21.5,y:33.35},8).wait(1369).to({startPosition:0},0).to({regX:-0.1,regY:-5.2,rotation:1.9763,x:-21.6,y:33.2},8).wait(80).to({startPosition:0},0).to({regX:0,regY:-5.3,rotation:0,x:-21.5,y:33.35},8).wait(941).to({startPosition:0},0).to({regX:-0.1,regY:-5.2,rotation:1.9509,y:33.3},8).wait(82).to({startPosition:0},0).to({regX:0,regY:-5.3,rotation:0,y:33.35},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// yl68l6t8l
	this.instance_6 = new lib.yl68l6t8l("synched",0);
	this.instance_6.setTransform(-18.45,-119.75,1,1,0,0,0,0,4.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(94).to({startPosition:0},0).to({regX:-0.1,rotation:-11.1947,x:-29.75,y:-120.45},7).wait(51).to({startPosition:0},0).to({regY:4.8,rotation:-5.4515,x:-13.85},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:4.9,rotation:-7.6659,x:-20,y:-120.3},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:4.8,rotation:-4.9249,x:-12.5,y:-120.15},10).wait(167).to({startPosition:0},0).to({regY:4.9,rotation:-11.1947,x:-29.75,y:-120.45},8).wait(1369).to({startPosition:0},0).to({regY:4.8,rotation:-9.218,x:-24.5,y:-120.9},8).wait(80).to({startPosition:0},0).to({regY:4.9,rotation:-11.1947,x:-29.75,y:-120.45},8).wait(941).to({startPosition:0},0).to({regY:4.8,rotation:-9.2437,x:-24.45,y:-120.8},8).wait(82).to({startPosition:0},0).to({regY:4.9,rotation:-11.1947,x:-29.75,y:-120.45},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// uiol_y8ly789l
	this.instance_7 = new lib.uioly8ly789l("synched",0);
	this.instance_7.setTransform(-21.85,38.45,1,1,0,0,0,-14.2,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({startPosition:0},10).wait(167).to({startPosition:0},0).to({startPosition:0},8).wait(1369).to({startPosition:0},0).to({startPosition:0},8).wait(80).to({startPosition:0},0).to({startPosition:0},8).wait(941).to({startPosition:0},0).to({startPosition:0},8).wait(82).to({startPosition:0},0).to({startPosition:0},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// io_drtyhsrty
	this.instance_8 = new lib.iodrtyhsrty("synched",0);
	this.instance_8.setTransform(0.45,-37.65,1,1,0,0,0,7.7,6.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({regX:7.8,regY:6.8,rotation:-1.2451,x:8.35,y:-35.15},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regY:6.9,rotation:-3.4599,x:5.45,y:-35.85},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regX:7.7,regY:6.8,rotation:-10.909,x:8.25,y:-33.4},10).wait(167).to({startPosition:0},0).to({regY:6.9,rotation:0,x:0.45,y:-37.65},8).wait(1369).to({startPosition:0},0).to({regY:6.8,rotation:1.9763,x:2.85,y:-37.15},8).wait(80).to({startPosition:0},0).to({regY:6.9,rotation:0,x:0.45,y:-37.65},8).wait(941).to({startPosition:0},0).to({regY:6.8,rotation:1.9509,x:2.95,y:-37.05},8).wait(82).to({startPosition:0},0).to({regY:6.9,rotation:0,x:0.45,y:-37.65},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	// io_8y_y89_
	this.instance_9 = new lib.io8yy89("synched",0);
	this.instance_9.setTransform(18.2,27.2,1,1,0,0,0,6.2,10.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(94).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({rotation:-95.7608,x:31.3,y:23.7},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({regX:6,regY:10.3,rotation:-73.537,x:30.95,y:25.85},10,cjs.Ease.quadInOut).wait(153).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-86.9874,x:41.55,y:24.45},10).wait(167).to({startPosition:0},0).to({regX:6.2,regY:10.2,scaleX:1,scaleY:1,rotation:0,x:18.2,y:27.2},8).wait(1369).to({startPosition:0},0).to({rotation:-27.505,x:18.35,y:28.4},8).wait(80).to({startPosition:0},0).to({rotation:0,x:18.2,y:27.2},8).wait(941).to({startPosition:0},0).to({regY:10.3,rotation:-17.7913,x:18.45,y:28.5},8).wait(82).to({startPosition:0},0).to({regY:10.2,rotation:0,x:18.2,y:27.2},8).wait(124).to({startPosition:0},0).wait(39).to({startPosition:0},0).wait(886).to({startPosition:0},0).to({_off:true},1).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.4,-131.4,153.7,257.3);


(lib.iuyl78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.instance = new lib.yuilt78lt78l("synched",0);
	this.instance.setTransform(70.05,116.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4199).to({startPosition:4199},0).to({_off:true},1).wait(17));

	// Layer_15
	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(78.6,201.4,0.1095,0.1095);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4199).to({_off:true},1).wait(17));

	// Layer_9
	this.instance_2 = new lib.o8yy89("synched",34);
	this.instance_2.setTransform(451.75,17.65,1,1,14.9992);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(34).to({_off:false},0).to({rotation:0,x:371.15,startPosition:52},18,cjs.Ease.quadOut).wait(220).to({regX:0.1,scaleX:1.0478,scaleY:1.0478,rotation:21.2422,x:235.35,y:115.9,startPosition:272},0).wait(3927).to({startPosition:4199},0).to({_off:true},1).wait(17));

	// Layer_8
	this.instance_3 = new lib.oui8o8y9("synched",0);
	this.instance_3.setTransform(84,-52.4,1,1,0,0,0,-78.5,-90.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4199).to({startPosition:0},0).to({_off:true},1).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-282.5,-363.9,806.7,624);


(lib.ukl7il78tl = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.iuyl78l78l("synched",0);
	this.instance.setTransform(189.85,225.5,2.0226,2.0226,0,0,0,177.3,59.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(143).to({regY:59.4,scaleX:4.5666,scaleY:4.5666,x:620.2,y:200.9,startPosition:143},0).wait(129).to({regY:59.5,scaleX:2.0226,scaleY:2.0226,x:189.85,y:225.5,startPosition:272},0).wait(408).to({regY:59.4,scaleX:3.8242,scaleY:3.8242,x:-10.05,y:201.15,startPosition:680},0).wait(841).to({regX:177.2,scaleX:2.8286,scaleY:2.8286,x:249.8,y:129,startPosition:1521},0).wait(246).to({scaleX:4.3835,scaleY:4.3835,x:-13.95,y:193.35,startPosition:1767},0).wait(255).to({regX:177.3,regY:59.5,scaleX:2.0226,scaleY:2.0226,x:189.85,y:225.5,startPosition:2022},0).wait(121).to({regY:59.4,scaleX:3.9411,scaleY:3.9411,x:2,y:145.1,startPosition:2143},0).wait(913).to({regY:59.5,scaleX:2.0226,scaleY:2.0226,x:189.85,y:225.5,startPosition:3056},0).wait(231).to({regX:177.2,regY:59.4,scaleX:4.2569,scaleY:4.2569,x:621.65,y:225.05,startPosition:3287},0).wait(46).to({regX:177.3,regY:59.5,scaleX:2.0226,scaleY:2.0226,x:189.85,y:225.5,startPosition:3333},0).wait(131).to({regX:177.2,regY:59.4,scaleX:3.8182,scaleY:3.8182,x:13.55,y:113.1,startPosition:3464},0).wait(458).to({scaleX:2.2952,scaleY:2.2952,x:237.85,y:189.15,startPosition:3922},0).wait(274).to({startPosition:4196},0).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2028.9,-1732.1,3897.8,2849.5);


// stage content:
(lib.m3l2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,28,272,674,942,1406,1816,2236,2812,3286,3615,3922,4196];
	this.streamSoundSymbolsList[28] = [{id:"audio1",startFrame:28,endFrame:272,loop:1,offset:0}];
	this.streamSoundSymbolsList[272] = [{id:"audio2",startFrame:272,endFrame:674,loop:1,offset:0}];
	this.streamSoundSymbolsList[674] = [{id:"audio3",startFrame:674,endFrame:942,loop:1,offset:0}];
	this.streamSoundSymbolsList[942] = [{id:"audio4",startFrame:942,endFrame:1406,loop:1,offset:0}];
	this.streamSoundSymbolsList[1406] = [{id:"audio5",startFrame:1406,endFrame:1816,loop:1,offset:0}];
	this.streamSoundSymbolsList[1816] = [{id:"audio6",startFrame:1816,endFrame:2236,loop:1,offset:0}];
	this.streamSoundSymbolsList[2236] = [{id:"audio7",startFrame:2236,endFrame:2812,loop:1,offset:0}];
	this.streamSoundSymbolsList[2812] = [{id:"audio8",startFrame:2812,endFrame:3286,loop:1,offset:0}];
	this.streamSoundSymbolsList[3286] = [{id:"audio9",startFrame:3286,endFrame:3615,loop:1,offset:0}];
	this.streamSoundSymbolsList[3615] = [{id:"audio10",startFrame:3615,endFrame:3922,loop:1,offset:0}];
	this.streamSoundSymbolsList[3922] = [{id:"audio11",startFrame:3922,endFrame:4197,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		//this.gotoAndPlay("m1");
	}
	this.frame_28 = function() {
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,28,272,1);
	}
	this.frame_272 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,272,674,1);
	}
	this.frame_674 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,674,942,1);
	}
	this.frame_942 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,942,1406,1);
	}
	this.frame_1406 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,1406,1816,1);
	}
	this.frame_1816 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1816,2236,1);
	}
	this.frame_2236 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,2236,2812,1);
	}
	this.frame_2812 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,2812,3286,1);
	}
	this.frame_3286 = function() {
		var soundInstance = playSound("audio9",0);
		this.InsertIntoSoundStreamData(soundInstance,3286,3615,1);
	}
	this.frame_3615 = function() {
		var soundInstance = playSound("audio10",0);
		this.InsertIntoSoundStreamData(soundInstance,3615,3922,1);
	}
	this.frame_3922 = function() {
		var soundInstance = playSound("audio11",0);
		this.InsertIntoSoundStreamData(soundInstance,3922,4197,1);
	}
	this.frame_4196 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28).call(this.frame_28).wait(244).call(this.frame_272).wait(402).call(this.frame_674).wait(268).call(this.frame_942).wait(464).call(this.frame_1406).wait(410).call(this.frame_1816).wait(420).call(this.frame_2236).wait(576).call(this.frame_2812).wait(474).call(this.frame_3286).wait(329).call(this.frame_3615).wait(307).call(this.frame_3922).wait(274).call(this.frame_4196).wait(1));

	// Layer_1
	this.instance = new lib.ukl7il78tl("synched",0);
	this.instance.setTransform(233.55,208.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4197));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-1395.4,-1123.9,3497.9,2449.5);
// library properties:
lib.properties = {
	id: '3FC01BEEAB397745AD18E137FCE8B315',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/m3l2_atlas_1.png", id:"m3l2_atlas_1"},
		{src:"images/m3l2_atlas_2.png", id:"m3l2_atlas_2"},
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio10.mp3", id:"audio10"},
		{src:"sounds/audio11.mp3", id:"audio11"},
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
an.compositions['3FC01BEEAB397745AD18E137FCE8B315'] = {
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