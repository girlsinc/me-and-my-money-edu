(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m3l1_atlas_1", frames: [[0,64,50,50],[213,61,43,44],[94,58,63,47],[0,0,92,62],[94,0,92,56],[159,61,52,53],[188,0,58,59]]}
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



(lib.CachedBmp_18 = function() {
	this.initialize(img.CachedBmp_18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,414,1736);


(lib.CachedBmp_17 = function() {
	this.initialize(img.CachedBmp_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3002,2867);


(lib.CachedBmp_16 = function() {
	this.initialize(img.CachedBmp_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3002,2867);


(lib.CachedBmp_15 = function() {
	this.initialize(img.CachedBmp_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2410,2787);


(lib.CachedBmp_14 = function() {
	this.initialize(img.CachedBmp_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2410,2787);


(lib.CachedBmp_13 = function() {
	this.initialize(img.CachedBmp_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,965,1578);


(lib.CachedBmp_12 = function() {
	this.initialize(img.CachedBmp_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,384,1350);


(lib.CachedBmp_11 = function() {
	this.initialize(img.CachedBmp_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,441,1739);


(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,880,2970);


(lib.CachedBmp_9 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,965,1578);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,965,1578);


(lib.CachedBmp_5 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["m3l1_atlas_1"]);
	this.gotoAndStop(6);
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


(lib.yul68l68l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("AAVIbQgjgTgPgoIgGgRIgBAAIAAgNIgBgNQgHiqgNiTQgWkCggh1IgDgMQgHgOgFgPQgghTAOhJQAOhIAzgTQAzgUA5AtQA6AtAgBUIAKAeIABAAIABAGQASBIgPA8QAOImgCBgIgBAAQALAmgPAjQgPAighANQgPAFgPAAQgVAAgVgLg");
	this.shape.setTransform(0.0446,55.0356);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,0,29.9,110.1);


(lib.yuilk6l6r8l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("Aili8IgBgDQgNgpAQglQARgmAkgLQAlgMAjAVQAjAVAMApQAGATgBAWQApEnA/B0QAgA6AXgBQgrAOhGAZIg8AWQhWj1hPkKg");
	this.shape.setTransform(17.2963,32.3184);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49675").s().p("AAuDRQgLgCgGgMIgGgZIgShEQgPg5gFgIQgTgdAYBbQANA2AAASQAAALgGACQgKADgGgEQgLgIgGggIgPhJQgJglgFgDQgCgBALA4QAMA8gLACQgKADgEgGQgGgHgJgdQgZhVgLhjQgMhwAYgJQBUgdArAqQAoAmA2CSIAIAkQAHAlgJAIQgJAIgJgSQgKgZgFgJIgWg7QgPgsgFAEQgJAJAGAaQALAuA5B/QALAdgQAHQgQAHgKgaQgEgLgWgvQgYg2gEABQgCAAAZBSQAXBMgVAAIgDgBg");
	this.shape_1.setTransform(30.4531,80.901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42.9,101.9);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-29.4,0,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,0,58.8,246.6);


(lib.uilt7lt87l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#897E7D").s().p("AiFIbQgmAAgbgeQgbgfAAgrQAAgJABgJIgBgBIAIgYQA1iZAriWQBJj4ALh6IACgMQgCgPAAgQQABhZAmg/QAng/A2ABQA3AAAmA/QAnBAgBBZQAAAQgBAPIABABIgCAGQgIBJgkAzQi7INgiBSIAAAAQgEAngaAbQgaAagjAAIgBAAg");
	this.shape.setTransform(-22.6247,53.9253);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.2,0,45.2,107.9);


(lib.uilkt78lt78 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#897E7D").s().p("AhZjXIAAgDQABgrAbgeQAbgeAlAAQAnAAAaAfQAbAeAAArQAAAXgIASQg1ElAXCCQAMBBAXAHQgugBhJACIhBACQgGkjAJj2g");
	this.shape.setTransform(1.7555,32.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AgRDZQgKgGgCgNIACgZQAHiAgDgLQgIgjgGBfQgEA4gFARQgDAKgIAAQgKAAgFgGQgIgLAEggIAJhLQADglgEgEQgCgCgHA5QgHA8gLgBQgKgBgCgGQgDgJAAgeQAChYAWhiQAXhvAZAAQBZgCAdA2QAZAwAGCbIgDAlQgFAngMAEQgLAFgDgUIgDgmIgCg/QgBgugGADQgMAFgCAaQgEAvAOCLQACAfgRABQgRACgDgbIgGg/QgGg7gEAAQgCgBgCBVQgCBJgQAAIgFgBg");
	this.shape_1.setTransform(-0.2286,83.7164);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.3,0,22.6,105.6);


(lib.uil7t8lt78 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D94E4D").s().p("AhNDJIhQhGQAWg8AShCIANg1QAJiIBGg0QAigZAhABQCCBFgPCiQgIBRghBDIggCNIgPABQg/AAhTg8g");
	this.shape.setTransform(-15.8221,26.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AizHVQgZgcgBgoIABgRIgBAAIAHgVQAviPAoiJQBAjlAKhvIABgMIgCgdQgBhRAlg6QAig6AygBQAzAAAlA5QAkA6AABSIgBAdIABABIgCAFQgHBDggAwQigHNgnBiIAAAAQgDAlgYAZQgZAYggAAIgCABQgiAAgZgcg");
	this.shape_1.setTransform(-22.15,52.2002);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.7,0,42.7,101.9);


(lib.ouiy89y89 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C4A082").s().p("Ah0EZQghgOgNgjQgMgjAOglQAIgSANgPQCQjoAxhxQAPgkAEgTIABgNQA/AaAgAHQgyCHhAC2Qg0CVgDAJIgBACQgPAlghARQgTAJgSAAQgPAAgPgGg");
	this.shape.setTransform(16.8856,-28.6712);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AgrDFQhOgdgHg4QgGgyAxiHIAPgfQARgfALAAQAMAAgFATQgCAKgHAWIgUA3QgPAoAGAAQAMAAALgWQATgoAih7QAJgbAPAFQAPAFgHAYIgQA4QgOA0ADACQACABAehJQAehGAOARQAIAJgEAMIgKAVIgbA7QgWAygBAIQgCAOAGgGQAHgIAWguQAVgvALgNQAGgHAHADQAIADACAHQAEAMgPAbQgxBYADAHQABADAZguQAbgyAJAFQAIAEAAAHQAAAIgLAaQgfBKg0BOQgzBOgXAAIgEgBg");
	this.shape_1.setTransform(35.817,-71.1502);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-90.9,48.8,90.9);


(lib.jylt68l68l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,54.6,191.8);


(lib.ioy898 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-31.25,0,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,0,62.599999999999994,247);


(lib.io898 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#A94242").s().p("AAYDgIhogLQgRg+gXhBIgUg0QhHhzAchSQAIgaASgTQAJgJAHgFQCQgRBSCOQAoBHAMBJIA3CFQgyAthsAAIgKgBg");
	this.shape.setTransform(19.1911,22.4582);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("ACLHdQglgJgXggIgIgPIgCABIgGgWQgtiUgtiCQhPjgg4hhIgGgKIgRgWQgwhDgEhEQgEhEApgdQAqgdA/AbQA/AaAuBDQAIALAHANIACAAIACAGQAhA8AAA4QCIHZAXBjIAAAAQASAggFAiQgGAigbATQgVAOgYAAQgKAAgLgCg");
	this.shape_1.setTransform(24.6454,49.9919);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48.6,97.9);


(lib.ilt78lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#EBBF9A").s().p("AhNgjIgIinIAAgCQAAgoAZgcQAZgcAjAAQAjAAAZAcQAZAbABAoQAAAUgHASQgvENgCB8QgBA+AIAHQgqAAghADIgZADQgEiSgKi+g");
	this.shape.setTransform(11.5245,30.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgNDHQgKgFgBgMIAAgYIADhAQACg3gCgIQgIgegFBWQgCAzgFAPQgDAKgHAAQgKAAgEgFQgHgKADgeIAHhFQADgigEgEQgCgCgFA1QgHA3gKAAQgJgBgCgGQgEgIABgcQABhQAThbQAUhmAXAAQBSgDAcAxQAYAsAHCOIgDAjQgEAjgKAEQgLAFgDgTIgDgiIgDg6QgBgqgGACQgKAFgCAYQgDArAOCAQACAcgQACQgPABgDgZIgGg5QgHg2gDgBQgCAAgBBOQgBBDgPAAIgEgBg");
	this.shape_1.setTransform(10.2469,76.9547);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20.5,97);


(lib.il78tl7t8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-62.5,-210.8,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.5,-210.8,125,421.8);


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

	// Layer_3
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(2.1,0,0.1152,0.1152);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.1,0,5.800000000000001,5.8), null);


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

	// Layer_3
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(2.95,0,0.1152,0.1152);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(3,0,4.9,5.1), null);


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

	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-5.95,-2.65,0.0958,0.0958);

	this.instance_1 = new lib.CachedBmp_4();
	this.instance_1.setTransform(-5.95,-2.6,0.0958,0.0958);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(-5.65,-1.9,0.0958,0.0958);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[]},1).to({state:[{t:this.instance_2}]},4).to({state:[]},1).wait(12));

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
	this.shape.graphics.f("#2EA3A7").s().p("AAbAkQgIgEgHgHIgMgNQgGgGgKABIgRAEQgJACgGgHQgFgGAEgIQAHgQARgHQARgIAPAFQAPAFAOANQAOANACAOQABALgHAJQgGAGgHAAIgGgBg");
	this.shape.setTransform(5.1493,3.6865);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,10.4,7.4), null);


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
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(1.45,0,0.126,0.126);

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
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(2.5,0.45,0.126,0.126);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(2.5,0.5,7.300000000000001,7.4), null);


(lib.tyjtyjytj = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C0A07E").s().p("AA3B1QhLgRhDg7QgigegdiAIAKgGIA+AiQBHAqA0AkQCmBzheATIgOABQgUAAgcgHg");
	this.shape.setTransform(16.946,-207.3359);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(26));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AgmCnQgmgPgngdIgggaQAWgVgKiBIgPh9QALgQCMBHQBGAkBEAnQgGANAIBKIAKBJQguBGhHAAQgiAAgmgPg");
	this.shape_1.setTransform(18.575,-199.4042);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(26));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("ABVDlQg4gBhjhSIhahSQAXgWgLiIIgQiEQALgQCVBKQBJAlBIApQgGAOAJBOIAKBNQAQBEgIAhQgLAyg+AAIgEgBg");
	this.shape_2.setTransform(19.0833,-195.8974);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(26));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#444444").s().p("AgBBRIBfmBIgzGwIiICxg");
	this.shape_3.setTransform(35.9,-21.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(26));

	// Layer_6
	this.instance = new lib.uiol7l78l("synched",0);
	this.instance.setTransform(-6.1,9.7,1,1,0,0,0,4.1,36.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26));

	// Layer_7
	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(-73.5,-195.75,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(26));

	// Layer_8
	this.instance_2 = new lib.ioy898("synched",0);
	this.instance_2.setTransform(47.35,-1.95,1,1,0,0,0,5.2,37.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.5,-219.7,147.1,439.4);


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
	this.instance.setTransform(27.95,2.35,2.0047,2.0047,0,0,0,6.3,2.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgxAQIgLgMIAggXQApgTAwAZQgCAKgIAKQgRAUggABIgCAAQgfAAgSgMg");
	this.shape_16.setTransform(22.6959,2.5895,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(50));

	// _Clip_Group__1
	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(-22.75,3.5,2.0047,2.0047,0,0,0,5.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_7
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAYQgcAAgOgSIgJgRQApgWAkARQASAIALAMQgDAFgIAFQgPAKgbAAIgCAAg");
	this.shape_17.setTransform(-25.2665,3.7303,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.7,-8.6,87.1,17.2);


(lib.il78lt7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_23
	this.instance = new lib.tyutdyujyj("single",6);
	this.instance.setTransform(9.85,-19.65,1.4818,1.4333,0,-5.3412,175.0063,3,-2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(126).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(108).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(264).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(148).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(338).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:12},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(218).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(376).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(494).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(80).to({startPosition:13},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(255));

	// Layer_24
	this.instance_1 = new lib.ilt78lt78lt78("synched",0);
	this.instance_1.setTransform(13.2,-42.9,0.6148,0.6148,0,0,180,10.1,3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3174));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#796A6A").s().p("AiHARQgLgGgFgKIgCgIQAiAWA8gJQAVgCBGgTQAggIAwgEIAqgBQgsAFhDAXIg5AVQgnAIgdAAQgiAAgTgMg");
	this.shape.setTransform(14.2,-78.5399);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3174));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#796A6A").s().p("AEBBCIAEgcQgzhLiNAPQgrAEhMARQhSAQgcAEQhVAMgfgjQgSgUABgjQAAgOARgfIASgdIgEAaQgCAeAGAXQAUBIBhgeQCBgpCXAFQCkAEgJA9QgJA4gYAjIgXAZQAMghAHgig");
	this.shape_1.setTransform(23.7234,-83.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3174));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("ACoCPQgPgIgRgCIgNgBQjnAThihRQgfgagNggIgIgaQhUgIAShAQAGgUAQgYQAHgLAHgIQDVh+C+BSQBGAfA7A3QAuAtAZAsQAiA9g2BiQgRAfgYAeIgUAZQgRg9gxgXg");
	this.shape_2.setTransform(22.4157,-82.4533);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3174));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEA840").s().p("AgJALQgEgFAAgGQgBgFAFgEQAEgFAFABQAGgBAEAFQAEAEAAAFQAAAFgEAFQgEAEgGABQgFAAgEgEg");
	this.shape_3.setTransform(-21.5275,-29.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3174));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AAHAyQAagcgrgQQgGgGgFgNQgKgbAHghIAEAcQAGAfAOARIAKAGQALAIAFAJQANAbhBAVg");
	this.shape_4.setTransform(24.2289,-33.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3174));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D5AE90").s().p("AARAZQgDgSgLgPIgKgWQgGgLgJgNQANABAQAbQAVAggGAxIgFgeg");
	this.shape_5.setTransform(-22.4595,-38.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3174));

	// Layer_13
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EBBF9A").s().p("AAABlQgzgOgJhXQgDgmAQgdQAOgZAWgIQAVgIAPAOQARAPgCAjQgBAaALgJQAGgFAFgKIgLCLQgPAHgPAAQgKAAgKgDg");
	this.shape_6.setTransform(-22.3314,-37.3343);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3174));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AhWAWIAUgXQAdgYAlABQAmACAcAWQAPALAGALQhBgyg1AcIggAUQgJAFgGAAQgFAAgDgDg");
	this.shape_7.setTransform(38.95,-56.0059);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3174));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("ABLAOQgXgSgOgGQg2gahaAwIAfgVQApgWArgBQAzAAAcAgQAPAQAEARQgMgDgUgQg");
	this.shape_8.setTransform(5.175,-56.2254);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3174));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBBF9A").s().p("Ag8FlIhnhEQgtgigXgoQgVgkgGgtQgWAOgZgFQgygLgOhiQgGgrAPgeQANgaAYgGQAXgGAQAQQASARgCAkQgBAZALgJQAFgFAGgIQAPhGAKgiQARg8AjgfQAjgdBBg0QAmgjACgYQgHgCgDgFQgGgJAFgFQAGgFAEAPQABAFAAAGQAXAHA5gmQBKgvBbANQAuAHAfAQQASA4AvByQAfBegiAuQghAsgCA1IgEBqQgLBFg9BYQhDBhhBAUQgMAEgPAAQg3AAhZg0g");
	this.shape_9.setTransform(8.6104,-40.8804);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3174));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AjBFEQiLg1gGh9QgIi5AfhmQAriOB8gnQD2hNCSB+QBJA/AYBOQgmDvi3CTQg5AuhAAeIg1AWQhFgBhGgbg");
	this.shape_10.setTransform(3.7429,-65.8603);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3174));

	// Layer_21
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AgfFQQgighgwhIQgcgqgHgaQgJgogLgrQgDgNAAgUIABgiIAAiJQABglAGgOQAQgngEgRQgDgLAXgjQAdgsAYgYQApgsBPgOQBJgOA5ASIguBBQgtAXgjAyQgjAxgPBBQgTBPAIBjQAGBNAYBnQAJApAaA4QAPAgAABGQhJg1gXgVg");
	this.shape_11.setTransform(-15.4531,-60.594);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3174));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AhoD3QgMgbgTgbIgQgVQhEhPAUioQAHg1AOg4IAOgtQBVjaCWBGQBLAkA6BOIgwCeQADgwg5gkIg5gbQhHAgAJCLQAEBFASA/QAlCCg/BmQgVAggcAZIgYATQAgg8gqhYg");
	this.shape_12.setTransform(-34.8374,-60.2507);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3174));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.2,-105.1,110.4,105.1);


(lib.fghrthth = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C0A07E").s().p("AA3B1QhLgRhDg7QgigegdiAIAKgGIA+AiQBHAqA0AkQCmBzheATIgOABQgUAAgcgHg");
	this.shape.setTransform(16.946,-207.3359);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(22).to({_off:true},1).wait(3));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AgmCnQgmgPgngdIgggaQAWgVgKiBIgPh9QALgQCMBHQBGAkBEAnQgGANAIBKIAKBJQguBGhHAAQgiAAgmgPg");
	this.shape_1.setTransform(18.575,-199.4042);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(22).to({_off:true},1).wait(3));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("ABVDlQg4gBhjhSIhahSQAXgWgLiIIgQiEQALgQCVBKQBJAlBIApQgGAOAJBOIAKBNQAQBEgIAhQgLAyg+AAIgEgBg");
	this.shape_2.setTransform(19.0833,-195.8974);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(22).to({_off:true},1).wait(3));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#444444").s().p("AgBBRIBfmBIgzGwIiICxg");
	this.shape_3.setTransform(35.9,-21.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(22).to({_off:true},1).wait(3));

	// Layer_6
	this.instance = new lib.uiol7l78l("synched",0);
	this.instance.setTransform(-4.65,9.4,1,1,-14.7055,0,0,4,36.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:10.4583,x:-6.15,y:9.75},12).to({regY:36.5,rotation:-8.8967,x:-5.05,y:9.45},10).to({_off:true},1).wait(3));

	// Layer_7
	this.instance_1 = new lib.CachedBmp_6();
	this.instance_1.setTransform(-73.5,-195.75,0.142,0.142);

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(-73.5,-195.75,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},10).to({state:[]},1).wait(3));

	// Layer_8
	this.instance_3 = new lib.ioy898("synched",0);
	this.instance_3.setTransform(42.4,8.8,1,1,12.4771,0,0,5.3,37.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:5.2,rotation:-8.9946,x:45.45,y:1.5},12).to({regY:37.7,rotation:7.5212,x:43,y:7.05},10).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.1,-219.7,181.1,441.79999999999995);


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
	this.instance_1.setTransform(30,0.7,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-26.9,0.35,2.0882,2.0882,0,0,0,6.2,3.8);

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
	this.instance_4 = new lib.Group_1();
	this.instance_4.setTransform(-26.05,-4.25,2.3635,2.3635,0,0,0,5.2,3.6);
	this.instance_4.alpha = 0.3398;

	this.instance_5 = new lib.Group_2();
	this.instance_5.setTransform(30.95,-7.05,2.3635,2.3635,0,0,0,7.2,4);
	this.instance_5.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.1,-16.5,95,27.1);


(lib.yukk6r7k = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjkfujyulicopy("single",0);
	this.instance.setTransform(-2.35,-20.95,0.4841,0.4841,0,-0.2023,179.7977,17.4,-12);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(25).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).to({_off:true},1).wait(9).to({_off:false},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(73).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(7).to({startPosition:5},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(243).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(23).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(160).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(64).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(18).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:1},0).wait(179).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(79).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(78).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(19).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(37).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(104).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(206).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(28).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(70));

	// Layer_30
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(2.95,-41.4,0.5397,0.5397,0,2.1145,-177.8855,13.2,2.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(67).to({startPosition:12},0).to({_off:true},1).wait(9).to({_off:false,startPosition:22},0).wait(3097));

	// Layer_13
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AgMAYQgJgJACgPQABgQAKgIQALgKARAIQgaADgDAXQgCAYAbAEQgIADgGAAQgIAAgGgHg");
	this.shape.setTransform(7.1643,-30.8378);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_14
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0A07E").s().p("AgTAaQAbABACgZQABgXgagHQASgFAKALQAIALgBAPQgBAQgKAHQgGAEgFAAQgIAAgJgFg");
	this.shape_1.setTransform(14.2303,-30.1555);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_15
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AhGCXIgLhEQgEgXAAgLQgBgbARgyQAIgaAKgLQAFgFAQgKIAzgcIAPgLIAKgNQAQgTAYABIgDACQAIASgLATQgLATgUACQAFAQgJAPQgKAQgQADQABATgFAKQgDAIgGADQgGAFgHgBQABAHgHAJIgKAOQgDAHgCAQQgEAPgLACQANAcgYAnQgGAKgHAAIgDAAg");
	this.shape_2.setTransform(-16.0637,-57.1073);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_16
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AkLB2QgKgGgHgLQgQgZAEgmQADgbAPgmQAPglARgNQAKgIATgIIAvgTQAfgMAPAAQARAAAdAOQAfAPAOACQAMACAUgCQAVgCAJABQARACANALQAOALgCAPQAQgQAaADQAZADAMAUQANgJARgCQARgCAPAHQAFgJAMgCQALgCAKAGQANAHAOAaIAKACQALAKgBAQQAAAQgKANQgMASglASQgWAKgLABQgKAAgHgFQgJgFgCgIQgIAbgUAKQgLAFgMgCQgNgCgHgJQgDAHgJABQgJAAgGgEQgKgHgHgTQgOALgUgJQgTgJgCgSQgIAJgOgBQgOAAgJgJQgJgJgDgBQgEgBgLAFQgQAGgRgFQgSgFgKgOQgCAKgLADQgKADgHgHQAFAMgMAJQgMAKgKgIQAJARgMAUQgLARgUAMQgPAIgLABIgCAAQgKAAgKgHg");
	this.shape_3.setTransform(7.0611,-76.8233);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_17
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("Al1FDQgDAAgEgDQgKgIgEgPQgFgOAEgOIADgKQACgGgCgEQgBgEgEgFQgFgFgBgDQgDgIAHgOQAHgPgBgHIgFgOQgGgQAEgVQAEgPAKgWQgLgIgCgSQgBgQAGgRIAMgfQAGgRgCgOQgDgQgBgIQgCgNAHgHIAIgFQAEgDACgEQACgEgCgNQgFgdASgbQASgbAagDQgCgOAFgOQAFgNAKgJQAKgJANgCQANgCALAGQACgVAUgMQATgLAWADIASACQAKAAAHgEQAFgDAIgIQAHgGAOgFQAcgKAQgCQAYgFATAHIANADQAFAAAKgFQAdgOAhAJQAgAIAVAbQAGgOAQgDQAQgCAMAJQARANAOAoQAXgGAUAVQATAWgGAaQAQgIASADQASADANANQAOAMAGATQAGATgEATQASAAAQAMQAQANAHATQAGATgEAWQgFAUgOANQgCAbgYAPQgYAPgWgMIAAgCQgEgKgRgEQgzgIgYgHQgrgLgUgbIgSgfQgWgigugNQgfgIg0gBQg4AAgeAFQgvAIgeAZQgYATgbAqQhWCIgsChQgEASgJAAIgBAAg");
	this.shape_4.setTransform(-2.153,-79.7885);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_18
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0A07E").s().p("AAUAgQgEgWgMgUQgFgKgIgSQgHgPgLgRQAPACAVAiQAaArgKA+IgFgng");
	this.shape_5.setTransform(-29.3461,-40.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_19
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AANBrQgigEgYhcQgQg7ALggQAJgaAYAAQAVAAASAVQATAWgDAcQgCAUAKABQAFABAFgEIgNBtQgLAPgPAAIgEAAg");
	this.shape_6.setTransform(-27.758,-39.6895);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_22
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("AgeAGIghAOQgQAGgIgFIAWgXQAegYAkACQAnACAcAYQANAMAHAMQhBglg1ARg");
	this.shape_7.setTransform(28.05,-52.6077);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_23
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("ABWAZQgagNgSgGQhFgYhYAfIAcgWQAmgWAyACQAyACAmAcQATAOAIAOQgDABgFAAQgJAAgNgFg");
	this.shape_8.setTransform(-6.425,-54.3096);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_24
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B289").s().p("Ah8FqIhdg8QhLhCgKhmIAIggIAIhrQAPhGAKgiQASg8AhgeQAsgnAIgeQAEgSgJgpQgDgRAJgUQALgUAUgLQA1gcBIA6QBjBRBigcQAxgNAdgfQAaBkACBCQADBVgkAyQgfArACA4QADBagEATQgLBBhCBRQhDBTg/ATQgMAEgPAAQgyAAhPgrg");
	this.shape_9.setTransform(5.4081,-40.5431);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_25
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AjWFXQidg+gBh/QgCjXAbhdQAuikCXgrQDlhCCqCmQBVBTAnBfQgqDxjHCHQhkBEhaAUQhOgGhOggg");
	this.shape_10.setTransform(-3.732,-67.8286);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_26
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BEBB89").s().p("AhDC/QgkgHgCgUQgFg/gUhsQgYh9gGgwQgBgIADgEQACgCADAAQAEABAAADIAEAGQAigMAiAWQAhAVAEAjQAggGAZAZQAbAYgDAgQAUgCATAIQATAHANAPQANAPAFATQAFAUgEATQAOABAJANQAKANgEAOQgEAOgPAHQgPAHgNgHQADAVgUAOQgUANgSgJQgJAZgNAHQgKAFgKgDQgLgDgCgJQgLAMgVABIgGABQgNAAgTgEg");
	this.shape_11.setTransform(27.97,-89.3951);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_27
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AFzCvQgKgJgQgCQgNgCgWADQgsAGhYAAQgaAAgOgCQgWgDgQgLIgKgHQgGgEgFgBQgFgBgTAFQgXAHgWgHIgPgGQgKgEgHAAQgNgBgVAKQgZALgJACQgPACgYgGQgegIgIAAIg0ADQgfABgQgNIgJgIQgFgFgEgBQgFgCgQABQgTACgRgJQgRgJgLgQQgLgQgDgVQgDgVAHgTQAGgPALgNQAMgPAUgNQAMgHAZgMQgFgHAFgKQAFgKAJgDQAEgCANgCQALgCAGgDQAFgEAHgHIAKgMQAHgFAHgCQAJgBAFAGQgBgNALgJQAKgJALAFIAJAFQAFADADABQAHABAJgGIAQgJQAHgCAVACQARABAHgIIAFgGQADgEADgCQAIgGARALQASAMAJgCQAFgBAKgIQAMgGAOAFQAOAFAFAOQAFgSASgIQASgHARAGQAeALASApQANgDAOAGQANAGAJAMQAPASAKAkQAQgLATALQATAKACAUQAfAQAQAjQAQAkgHAlQAMgDAKAKQAKAKABAOQABAVgPAUIADAEIgJADIAGgHg");
	this.shape_12.setTransform(4.5326,-99.8333);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_28
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AADBhQgDgBgCgDQgCgDABgDQgZADgNgIQgJgFgEgJQgFgJADgJQgFAFgIgBQgIgBgGgFQgIgGgGgTQgGgSAKgHQgKgBABgQQACgfAYgXQAXgXAfgBQARAAAaAGQAOADAHAFIAKAIQAGAFAEABIAMADQAIACAGAIIABACQAOANABAOQAAAIgGAHQgHAHgHgBQANAMgFAUQgEAUgRAHQADATgLAJQgGAFgIgBQgJgBgDgHQgJALgMAGQgHAEgFAAIgBgBg");
	this.shape_13.setTransform(33.3455,-75.1427);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	// Layer_29
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AAeDEQgSgCgFgkQgNgCgKgLQgKgMgCgPQgPgBgKgNQgLgOACgRQgdgFgMgTQgHgLADgPQADgPALgDQgTgbgCgVQgCgPAGgNQAGgNAMgEQgQgUAIgcQAIgdAWgHIgEgDQAIgVAnAAQAPABAHABQALACAIAGQAPALABAUQAKgIANAFQAMAGAFANQAHARgFAlQAKgBAKAHQAJAHAEAMQAGAOABAhIADBtQABAlgIASQgGANgWATIglALQgGADgFAAIgCgBg");
	this.shape_14.setTransform(-32.4844,-42.3875);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(67).to({_off:true},1).wait(9).to({_off:false},0).wait(3097));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-118,88.1,118);


(lib.uyf7ddk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ilt78lt78l
	this.instance = new lib.ilt78lt78l("synched",0);
	this.instance.setTransform(-70.6,-43.6,1,1,0,0,0,10.2,7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(125).to({startPosition:0},0).to({rotation:3.9776,x:-68.2,y:-46.4},9).wait(30).to({startPosition:0},0).to({rotation:0,x:-70.6,y:-43.6},9,cjs.Ease.quadInOut).wait(99).to({startPosition:0},0).to({rotation:2.44,x:-67.25,y:-45.35},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regY:6.7,scaleX:0.9999,scaleY:0.9999,rotation:-55.9666,x:-57.4,y:-35.4},11,cjs.Ease.quadInOut).wait(72).to({startPosition:0},0).to({regY:7,scaleX:1,scaleY:1,rotation:0,x:-70.6,y:-43.6},11,cjs.Ease.quadInOut).wait(251).to({startPosition:0},0).to({rotation:4.9414,x:-68.8,y:-47.1},10,cjs.Ease.quadInOut).wait(52).to({startPosition:0},0).to({rotation:2.4899,x:-74.25,y:-44.75},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({rotation:0,x:-70.6,y:-43.6},11,cjs.Ease.quadInOut).wait(133).to({startPosition:0},0).to({regY:6.9,rotation:-27.7366,x:-59.65,y:-43.7},11,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({regY:7,rotation:0,x:-70.6,y:-43.6},10,cjs.Ease.quadInOut).wait(329).to({startPosition:0},0).to({rotation:3.664,x:-66.9,y:-46.2},9,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({regX:10.1,rotation:8.109,x:-69.3,y:-49.2},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:10.2,rotation:0,x:-70.6,y:-43.6},11,cjs.Ease.quadInOut).wait(216).to({startPosition:0},0).to({regX:10.3,regY:6.9,rotation:-50.1877,x:-48.95,y:-40.25},10,cjs.Ease.quadInOut).wait(31).to({startPosition:0},0).to({regX:10.2,regY:7,rotation:0,x:-70.6,y:-43.6},12,cjs.Ease.quadInOut).wait(364).to({startPosition:0},0).to({rotation:4.7239,x:-69.2,y:-47},8,cjs.Ease.quadInOut).wait(21).to({startPosition:0},0).to({rotation:0,x:-70.6,y:-43.6},8,cjs.Ease.quadInOut).wait(488).to({startPosition:0},0).to({rotation:6.7035,x:-72.1,y:-48.4},11,cjs.Ease.quadInOut).wait(57).to({startPosition:0},0).to({rotation:0,x:-70.6,y:-43.6},10,cjs.Ease.quadInOut).wait(58).to({startPosition:0},0).to({rotation:4.4273,x:-68.85,y:-46.85},11,cjs.Ease.quadInOut).wait(61).to({startPosition:0},0).to({rotation:-1.3203,x:-68.9,y:-42.75},12,cjs.Ease.quadInOut).wait(75).to({rotation:-1.3203},0).to({rotation:0,x:-70.6,y:-43.6},13,cjs.Ease.quadInOut).wait(253));

	// uil7t8lt78
	this.instance_1 = new lib.uil7t8lt78("synched",0);
	this.instance_1.setTransform(-46.35,-126.75,1,1,0,0,0,-11.5,7.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(125).to({startPosition:0},0).to({regX:-11.6,rotation:3.9776,x:-38.3,y:-127.65},9).wait(30).to({startPosition:0},0).to({regX:-11.5,rotation:0,x:-46.35,y:-126.75},9,cjs.Ease.quadInOut).wait(99).to({startPosition:0},0).to({regX:-11.6,regY:7.4,rotation:2.44,x:-39.6,y:-127.5},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regX:-11.8,regY:7.3,rotation:-12.735,x:-53.05,y:-125.35},11,cjs.Ease.quadInOut).wait(72).to({startPosition:0},0).to({regX:-11.5,regY:7.5,rotation:0,x:-46.35,y:-126.75},11,cjs.Ease.quadInOut).wait(251).to({startPosition:0},0).to({rotation:4.9414,x:-37.45,y:-127.9},10,cjs.Ease.quadInOut).wait(52).to({startPosition:0},0).to({rotation:2.4899,x:-46.45,y:-126.8},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({rotation:0,x:-46.35,y:-126.75},11,cjs.Ease.quadInOut).wait(133).to({startPosition:0},0).to({regY:7.4,rotation:-2.2484,x:-38.7,y:-127.8},11,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({regY:7.5,rotation:0,x:-46.35,y:-126.75},10,cjs.Ease.quadInOut).wait(329).to({startPosition:0},0).to({regX:-11.6,rotation:3.664,x:-37.55,y:-127.65},9,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({rotation:8.109,x:-33.6,y:-128.15},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:-11.5,rotation:0,x:-46.35,y:-126.75},11,cjs.Ease.quadInOut).wait(216).to({startPosition:0},0).to({regX:-11.6,rotation:-10.727,x:-40.75,y:-126.35},10,cjs.Ease.quadInOut).wait(31).to({startPosition:0},0).to({regX:-11.5,rotation:0,x:-46.35,y:-126.75},12,cjs.Ease.quadInOut).wait(364).to({startPosition:0},0).to({rotation:4.7239,x:-38.1,y:-127.95},8,cjs.Ease.quadInOut).wait(21).to({startPosition:0},0).to({rotation:0,x:-46.35,y:-126.75},8,cjs.Ease.quadInOut).wait(488).to({startPosition:0},0).to({regX:-11.6,rotation:6.7035,x:-38.4,y:-128.15},11,cjs.Ease.quadInOut).wait(57).to({startPosition:0},0).to({regX:-11.5,rotation:0,x:-46.35,y:-126.75},10,cjs.Ease.quadInOut).wait(58).to({startPosition:0},0).to({regX:-11.6,rotation:4.4273,x:-38.3,y:-127.9},11,cjs.Ease.quadInOut).wait(61).to({startPosition:0},0).to({regX:-11.7,rotation:-1.3203,x:-46.75,y:-126.5},12,cjs.Ease.quadInOut).wait(75).to({rotation:-1.3203},0).to({regX:-11.5,rotation:0,x:-46.35,y:-126.75},13,cjs.Ease.quadInOut).wait(253));

	// il78lt7
	this.instance_2 = new lib.il78lt7("synched",0);
	this.instance_2.setTransform(-20.4,-162.65,1,1,0,0,0,-3.9,-15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(125).to({startPosition:125},0).to({regY:-15.8,rotation:-2.4969,x:-11,y:-162.7,startPosition:134},9).wait(30).to({startPosition:164},0).to({regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:173},9,cjs.Ease.quadInOut).wait(99).to({startPosition:272},0).to({regX:-4,regY:-15.8,rotation:1.7331,x:-12.5,startPosition:282},10,cjs.Ease.quadInOut).wait(82).to({startPosition:364},0).to({rotation:-1.72,x:-28.4,y:-162.15,startPosition:375},11,cjs.Ease.quadInOut).wait(72).to({startPosition:447},0).to({regX:-3.9,regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:458},11,cjs.Ease.quadInOut).wait(251).to({startPosition:709},0).to({regY:-15.8,rotation:2.2378,x:-9.9,y:-162.75,startPosition:719},10,cjs.Ease.quadInOut).wait(52).to({startPosition:771},0).to({regX:-4,rotation:-0.2133,x:-20.45,y:-162.85,startPosition:780},9,cjs.Ease.quadInOut).wait(40).to({rotation:-0.2133,startPosition:820},0).to({regX:-3.9,regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:831},11,cjs.Ease.quadInOut).wait(133).to({startPosition:964},0).to({regY:-15.8,rotation:1.9509,x:-11.15,y:-162.85,startPosition:975},11,cjs.Ease.quadInOut).wait(8).to({startPosition:983},0).to({regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:993},10,cjs.Ease.quadInOut).wait(329).to({startPosition:1322},0).to({regY:-15.8,rotation:2.2151,x:-10.15,y:-162.75,startPosition:1331},9,cjs.Ease.quadInOut).wait(53).to({startPosition:1384},0).to({rotation:3.1638,x:-5.75,y:-162.65,startPosition:1394},10,cjs.Ease.quadInOut).wait(50).to({startPosition:1444},0).to({regY:-15.7,rotation:0,x:-20.4,startPosition:1455},11,cjs.Ease.quadInOut).wait(216).to({startPosition:1671},0).to({regY:-15.8,rotation:1.4838,x:-13.5,y:-162.75,startPosition:1681},10,cjs.Ease.quadInOut).wait(31).to({startPosition:1712},0).to({regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:1724},12,cjs.Ease.quadInOut).wait(364).to({startPosition:2088},0).to({regY:-15.8,rotation:2.0016,x:-11,y:-162.9,startPosition:2096},8,cjs.Ease.quadInOut).wait(21).to({startPosition:2117},0).to({regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:2125},8,cjs.Ease.quadInOut).wait(488).to({startPosition:2613},0).to({regY:-15.8,rotation:2.2378,x:-10.15,y:-162.6,startPosition:2624},11,cjs.Ease.quadInOut).wait(57).to({startPosition:2681},0).to({regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:2691},10,cjs.Ease.quadInOut).wait(58).to({startPosition:2749},0).to({regY:-15.8,rotation:1.9763,x:-11.05,y:-162.95,startPosition:2760},11,cjs.Ease.quadInOut).wait(61).to({startPosition:2821},0).to({regX:-4,rotation:-0.0254,x:-20.55,y:-162.7,startPosition:2833},12,cjs.Ease.quadInOut).wait(75).to({rotation:-0.0254,startPosition:2908},0).to({regX:-3.9,regY:-15.7,rotation:0,x:-20.4,y:-162.65,startPosition:2921},13,cjs.Ease.quadInOut).wait(253));

	// il_78tl7t8l
	this.instance_3 = new lib.il78tl7t8l("synched",0);
	this.instance_3.setTransform(-18.7,41.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(125).to({startPosition:0},0).to({regX:-0.1,rotation:2.0016,x:-16.5,y:41.15},9).wait(30).to({startPosition:0},0).to({regX:0,rotation:0,x:-18.7,y:41.2},9,cjs.Ease.quadInOut).wait(99).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:1.7331,x:-17,y:41.3},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({rotation:-1.72,x:-20.65,y:41.6},11,cjs.Ease.quadInOut).wait(72).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.7,y:41.2},11,cjs.Ease.quadInOut).wait(251).to({startPosition:0},0).to({regX:-0.1,rotation:2.2378,x:-16.25,y:41.05},10,cjs.Ease.quadInOut).wait(52).to({startPosition:0},0).to({rotation:-0.2133,x:-18,y:41},9,cjs.Ease.quadInOut).wait(40).to({rotation:-0.2133},0).to({regX:0,rotation:0,x:-18.7,y:41.2},11,cjs.Ease.quadInOut).wait(133).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:1.9509,x:-16.5,y:41.1},11,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.7,y:41.2},10,cjs.Ease.quadInOut).wait(329).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:2.2151,x:-16.4,y:41.15},9,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({rotation:3.1638,x:-15.35,y:41.05},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.7,y:41.2},11,cjs.Ease.quadInOut).wait(216).to({startPosition:0},0).to({rotation:1.4838,x:-17.1,y:41.15},10,cjs.Ease.quadInOut).wait(31).to({startPosition:0},0).to({rotation:0,x:-18.7,y:41.2},12,cjs.Ease.quadInOut).wait(364).to({startPosition:0},0).to({regX:-0.1,rotation:2.0016,x:-16.5,y:40.95},8,cjs.Ease.quadInOut).wait(21).to({startPosition:0},0).to({regX:0,rotation:0,x:-18.7,y:41.2},8,cjs.Ease.quadInOut).wait(488).to({startPosition:0},0).to({regX:-0.1,rotation:2.2378,x:-16.5},11,cjs.Ease.quadInOut).wait(57).to({startPosition:0},0).to({regX:0,rotation:0,x:-18.7},10,cjs.Ease.quadInOut).wait(58).to({startPosition:0},0).to({rotation:1.9763,x:-16.4,y:40.9},11,cjs.Ease.quadInOut).wait(61).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:-0.0254,x:-18.8,y:41.2},12,cjs.Ease.quadInOut).wait(75).to({rotation:-0.0254},0).to({regX:0,regY:0,rotation:0,x:-18.7},13,cjs.Ease.quadInOut).wait(253));

	// io_8_98
	this.instance_4 = new lib.io898("synched",0);
	this.instance_4.setTransform(21.15,-128.85,1,1,16.4907,0,0,22.5,9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(125).to({startPosition:0},0).to({regX:22.6,regY:8.9,rotation:15.5063,x:29.65,y:-127.6},9).wait(30).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},9,cjs.Ease.quadInOut).wait(99).to({startPosition:0},0).to({regX:22.6,rotation:13.0018,x:27.95,y:-128},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regY:8.8,rotation:13.2805,x:13.95,y:-129.85},11,cjs.Ease.quadInOut).wait(72).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},11,cjs.Ease.quadInOut).wait(251).to({startPosition:0},0).to({regX:22.6,rotation:7.0135,x:30.55,y:-128.05},10,cjs.Ease.quadInOut).wait(52).to({rotation:7.0135},0).to({regX:22.4,scaleX:0.9999,scaleY:0.9999,rotation:2.6107,x:21.65,y:-130.05},9,cjs.Ease.quadInOut).wait(40).to({rotation:2.6107},0).to({regX:22.5,scaleX:1,scaleY:1,rotation:16.4907,x:21.15,y:-128.85},11,cjs.Ease.quadInOut).wait(133).to({startPosition:0},0).to({regX:22.6,regY:8.8,rotation:22.3817,x:28.75,y:-127.3},11,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},10,cjs.Ease.quadInOut).wait(329).to({startPosition:0},0).to({regX:22.6,rotation:12.7562,x:30.15,y:-127.4},9,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({regY:8.8,rotation:9.7508,x:33.3,y:-127.1},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},11,cjs.Ease.quadInOut).wait(216).to({startPosition:0},0).to({regX:22.6,regY:8.9,rotation:23.6987,x:27.05,y:-127.25},10,cjs.Ease.quadInOut).wait(31).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},12,cjs.Ease.quadInOut).wait(364).to({startPosition:0},0).to({regX:22.6,rotation:8.0083,x:29.15,y:-128.8},8,cjs.Ease.quadInOut).wait(21).to({startPosition:0},0).to({regX:22.5,rotation:16.4907,x:21.15,y:-128.85},8,cjs.Ease.quadInOut).wait(488).to({startPosition:0},0).to({regX:22.6,rotation:10.5047,x:28.85,y:-128.1},11,cjs.Ease.quadInOut).wait(57).to({startPosition:0},0).to({regX:22.5,rotation:16.4907,x:21.15,y:-128.85},10,cjs.Ease.quadInOut).wait(58).to({startPosition:0},0).to({regX:22.6,regY:8.9,rotation:12.5248,x:29.15,y:-128.65},11,cjs.Ease.quadInOut).wait(61).to({startPosition:0},0).to({rotation:13.99,x:21.8,y:-129.7},12,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regX:22.5,regY:9,rotation:16.4907,x:21.15,y:-128.85},13,cjs.Ease.quadInOut).wait(253));

	// oui_y89_y89
	this.instance_5 = new lib.ouiy89y89("synched",0);
	this.instance_5.setTransform(16,-46.7,1,1,136.4913,0,0,6.8,-8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(125).to({startPosition:0},0).to({regX:6.7,scaleX:0.9999,scaleY:0.9999,rotation:99.7821,x:25.85,y:-45.45},9).wait(30).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},9,cjs.Ease.quadInOut).wait(99).to({startPosition:0},0).to({regX:6.7,scaleX:0.9999,scaleY:0.9999,rotation:112.5363,x:27.75,y:-45.75},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regX:6.5,rotation:133.0057,x:13.2,y:-47.55},11,cjs.Ease.quadInOut).wait(72).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},11,cjs.Ease.quadInOut).wait(251).to({startPosition:0},0).to({regX:6.7,scaleX:0.9999,scaleY:0.9999,rotation:110.7714,x:38.9,y:-46.3},10,cjs.Ease.quadInOut).wait(52).to({startPosition:0},0).to({regX:6.6,rotation:84.419,x:36.35,y:-49.2},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},11,cjs.Ease.quadInOut).wait(133).to({startPosition:0},0).to({regX:6.7,scaleX:0.9999,scaleY:0.9999,rotation:142.3824,x:15.1,y:-46},11,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},10,cjs.Ease.quadInOut).wait(329).to({startPosition:0},0).to({regX:6.7,rotation:120.2798,x:30.35,y:-45.2},9,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({regX:6.6,regY:-8.1,scaleX:0.9999,scaleY:0.9999,rotation:112.5801,x:37.8,y:-45},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:6.8,regY:-8.2,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},11,cjs.Ease.quadInOut).wait(216).to({startPosition:0},0).to({regX:6.7,scaleX:0.9999,scaleY:0.9999,rotation:143.7003,x:11.55,y:-46.45},10,cjs.Ease.quadInOut).wait(31).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},12,cjs.Ease.quadInOut).wait(364).to({startPosition:0},0).to({regX:6.6,scaleX:0.9999,scaleY:0.9999,rotation:118.0378,x:36.15,y:-47},8,cjs.Ease.quadInOut).wait(21).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},8,cjs.Ease.quadInOut).wait(488).to({startPosition:0},0).to({regX:6.6,scaleX:0.9999,scaleY:0.9999,rotation:113.3089,x:32.4,y:-46.05},11,cjs.Ease.quadInOut).wait(57).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},10,cjs.Ease.quadInOut).wait(58).to({startPosition:0},0).to({regX:6.7,regY:-8.1,scaleX:0.9999,scaleY:0.9999,rotation:120.281,x:29.6,y:-46.4},11,cjs.Ease.quadInOut).wait(61).to({startPosition:0},0).to({regX:6.6,regY:-8.2,rotation:121.7468,x:20.25,y:-47.55},12,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regX:6.8,scaleX:1,scaleY:1,rotation:136.4913,x:16,y:-46.7},13,cjs.Ease.quadInOut).wait(253));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.5,-252.9,213.2,508);


(lib.tkt5k5d6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uilt7lt87l
	this.instance = new lib.uilt7lt87l("synched",0);
	this.instance.setTransform(-13.2,-129.9,1,1,14.9983,0,0,-8,6.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-7.9,rotation:4.0304,x:-13,y:-123.25},3).to({regX:-8,scaleX:0.9999,scaleY:0.9999,rotation:-6.9346,x:-13.05,y:-131.9},3).to({regX:-7.9,rotation:-17.9063,x:-12.8,y:-140.45},3).to({regX:-8,scaleX:1,scaleY:1,rotation:-25.2199,x:-12.85,y:-133.4},2).to({rotation:-15.1657,x:-12.8,y:-124.95},3).to({rotation:-5.1119,y:-131.75},3).to({regY:6.4,rotation:4.9407,x:-13,y:-138.55},3).to({regY:6.5,rotation:14.9983,x:-13.2,y:-129.9},3).to({regX:-7.8,rotation:10.6772,x:0.25,y:-131.2},8,cjs.Ease.quadOut).wait(37).to({startPosition:0},0).to({rotation:4.202,x:-25.8,y:-128.8},12,cjs.Ease.quadInOut).wait(23).to({startPosition:0},0).to({regX:-7.9,rotation:0,x:-13.1,y:-129.95},11,cjs.Ease.quadInOut).wait(7).to({startPosition:0},0).wait(57).to({startPosition:0},0).to({rotation:2.2151,x:-5.2,y:-130.55},9).wait(49).to({startPosition:0},0).to({rotation:0,x:-13.1,y:-129.95},8).wait(228).to({startPosition:0},0).to({rotation:9.6699,x:-3.7,y:-131.4},10).wait(88).to({startPosition:0},0).to({rotation:1.7253,x:-13.7,y:-130.55},10,cjs.Ease.quadInOut).wait(44).to({rotation:1.7253},0).to({regY:6.4,scaleX:0.9999,scaleY:0.9999,rotation:5.4007,x:-4.8,y:-131.3},9,cjs.Ease.quadInOut).wait(25).to({startPosition:0},0).to({regY:6.5,scaleX:1,scaleY:1,rotation:0,x:-13.1,y:-129.95},10).wait(174).to({startPosition:0},0).to({regX:-7.8,rotation:7.4488,x:11},8).wait(85).to({startPosition:0},0).to({regX:-7.9,rotation:0,x:-13.1},8).wait(56).to({startPosition:0},0).to({rotation:-9.9858,x:-1.85,y:-132.5},10,cjs.Ease.quadInOut).wait(102).to({startPosition:0},0).to({rotation:-8.9577,x:-13.9,y:-131.45},11,cjs.Ease.quadInOut).wait(56).to({startPosition:0},0).to({regX:-8,rotation:-0.9775,x:-20.45,y:-129.9},11,cjs.Ease.quadInOut).wait(103).to({startPosition:0},0).to({regX:-7.9,rotation:0,x:-13.1,y:-129.95},10,cjs.Ease.quadInOut).wait(167).to({startPosition:0},0).to({regX:-7.8,rotation:3.9706,x:-5.9,y:-130.25},10,cjs.Ease.quadInOut).wait(101).to({startPosition:0},0).to({regX:-7.9,regY:6.4,rotation:0.049,x:-16.5,y:-129.6},11,cjs.Ease.quadInOut).wait(53).to({rotation:0.049},0).to({regY:6.5,rotation:0,x:-13.1,y:-129.95},10,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({rotation:0.2894,x:-4.1,y:-131},9).wait(86).to({startPosition:0},0).to({regX:-8,regY:6.4,rotation:-16.4428,x:-12.2,y:-132.35},11,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regY:6.3,rotation:-8.7199,x:-21.25,y:-131.2},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regX:-8.1,regY:6.2,scaleX:0.9999,scaleY:0.9999,rotation:-1.2626,x:-13.1,y:-131.35},12).wait(48).to({startPosition:0},0).to({regX:-7.9,regY:6.5,scaleX:1,scaleY:1,rotation:0,y:-129.95},10).wait(65).to({startPosition:0},0).to({rotation:1.4497,x:-7.6,y:-130.25},11,cjs.Ease.quadInOut).wait(131).to({startPosition:0},0).to({regX:-8,rotation:-3.4818,x:-20.25,y:-128.65},12,cjs.Ease.quadInOut).wait(134).to({startPosition:0},0).to({regY:6.4,rotation:-2.4908,x:-7.5,y:-130.4},12,cjs.Ease.quadInOut).wait(92).to({startPosition:0},0).to({rotation:-4.4924,x:-15.45,y:-129.5},12,cjs.Ease.quadInOut).wait(46).to({startPosition:0},0).to({regX:-7.9,regY:6.5,rotation:0,x:-13.1,y:-129.95},11,cjs.Ease.quadInOut).wait(96).to({startPosition:0},0).to({rotation:-17.5397,x:-5.15,y:-133.2},10,cjs.Ease.quadInOut).wait(19).to({startPosition:0},0).to({rotation:0,x:-13.1,y:-129.95},9,cjs.Ease.quadInOut).wait(193).to({startPosition:0},0).to({rotation:-8.2395,x:-5,y:-131.85},9,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regX:-8,scaleX:0.9999,scaleY:0.9999,rotation:-6.211,x:-12,y:-131.15},13,cjs.Ease.quadInOut).wait(78).to({startPosition:0},0).to({regX:-7.9,scaleX:1,scaleY:1,rotation:0,x:-13.1,y:-129.95},10,cjs.Ease.quadInOut).wait(60));

	// uilkt78lt78
	this.instance_1 = new lib.uilkt78lt78("synched",0);
	this.instance_1.setTransform(-66.25,-49.45,1,1,14.9983,0,0,-0.1,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:4.0304,x:-48.5,y:-38.6},3).to({regY:9.9,scaleX:0.9999,scaleY:0.9999,rotation:-6.9346,x:-30.85,y:-43.05},3).to({rotation:-17.9063,x:-13.2,y:-47.55},3).to({regY:10,scaleX:1,scaleY:1,rotation:-25.2199,x:-1.4,y:-37.6},2).to({rotation:-15.1657,x:-17.55,y:-32.95},3).to({rotation:-5.1119,x:-33.8,y:-43.6},3).to({regX:-0.2,regY:9.9,rotation:4.9407,x:-50.15,y:-54.3},3).to({regX:-0.1,regY:10,rotation:14.9983,x:-66.25,y:-49.45},3).to({rotation:10.6772,x:-46.75,y:-46.9},8,cjs.Ease.quadOut).wait(37).to({startPosition:0},0).to({regY:9.9,rotation:4.202,x:-62.95,y:-39.9},12,cjs.Ease.quadInOut).wait(23).to({startPosition:0},0).to({regY:10,rotation:0,x:-43.65,y:-38.4},11,cjs.Ease.quadInOut).wait(7).to({startPosition:0},0).wait(57).to({startPosition:0},0).to({rotation:2.2151,x:-39.2,y:-40.25},9).wait(49).to({startPosition:0},0).to({rotation:0,x:-43.65,y:-38.4},8).wait(228).to({startPosition:0},0).to({regY:9.9,rotation:9.6699,x:-49.05,y:-46.35},10).wait(88).to({startPosition:0},0).to({regX:-0.2,regY:9.8,rotation:1.7253,x:-47,y:-40.2},10,cjs.Ease.quadInOut).wait(44).to({rotation:1.7253},0).to({scaleX:0.9999,scaleY:0.9999,rotation:5.4007,x:-43.75,y:-43.1},9,cjs.Ease.quadInOut).wait(25).to({startPosition:0},0).to({regX:-0.1,regY:10,scaleX:1,scaleY:1,rotation:0,x:-43.65,y:-38.4},10).wait(174).to({startPosition:0},0).to({regY:9.9,rotation:7.4488,x:-31.15,y:-43.25},8).wait(85).to({startPosition:0},0).to({regY:10,rotation:0,x:-43.65,y:-38.4},8,cjs.Ease.quadInOut).wait(56).to({startPosition:0},0).to({regY:9.8,rotation:-100.1353,x:-10.45,y:-34.15},10,cjs.Ease.quadInOut).wait(102).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-99.107,x:-24.2,y:-33.3},11,cjs.Ease.quadInOut).wait(56).to({startPosition:0},0).to({regX:0,rotation:-91.1263,x:-44.25,y:-34.25},11,cjs.Ease.quadInOut).wait(103).to({startPosition:0},0).to({regX:-0.1,regY:10,scaleX:1,scaleY:1,rotation:0,x:-43.65,y:-38.4},10,cjs.Ease.quadInOut).wait(167).to({startPosition:0},0).to({rotation:3.9706,x:-42.7,y:-41},10,cjs.Ease.quadInOut).wait(101).to({startPosition:0},0).to({regY:9.8,rotation:0.049,x:-47.05,y:-38.15},11,cjs.Ease.quadInOut).wait(53).to({rotation:0.049},0).to({regY:10,rotation:0,x:-43.65,y:-38.4},10,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regY:9.9,rotation:-46.1747,x:-34.25,y:-34.55},9).wait(86).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-84.6273,x:-13.25,y:-31.25},11,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regX:0,regY:9.8,rotation:-76.9049,x:-35.9},10,cjs.Ease.quadInOut).wait(82).to({startPosition:0},0).to({regX:0.1,rotation:-69.4502,x:-40.45,y:-34.15},12).wait(48).to({startPosition:0},0).to({regX:-0.1,regY:10,scaleX:1,scaleY:1,rotation:0,x:-43.65,y:-38.4},10).wait(65).to({startPosition:0},0).to({rotation:1.4497,x:-40.45,y:-39.5},11,cjs.Ease.quadInOut).wait(131).to({startPosition:0},0).to({regX:-0.2,regY:9.9,rotation:-3.4818,x:-45.15,y:-35.5},12,cjs.Ease.quadInOut).wait(134).to({startPosition:0},0).to({regY:9.8,rotation:-2.4908,x:-33.95,y:-37.7},12,cjs.Ease.quadInOut).wait(92).to({startPosition:0},0).to({rotation:-4.4924,x:-38.65,y:-36},12,cjs.Ease.quadInOut).wait(46).to({startPosition:0},0).to({regX:-0.1,regY:10,rotation:0,x:-43.65,y:-38.4},11,cjs.Ease.quadInOut).wait(96).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-59.2859,x:-6.55,y:-36.8},10,cjs.Ease.quadInOut).wait(19).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:0,x:-43.65,y:-38.4},9,cjs.Ease.quadInOut).wait(193).to({startPosition:0},0).to({rotation:-61.2229,x:-20.15,y:-34.75},9,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regY:9.9,scaleX:0.9999,scaleY:0.9999,rotation:-78.9082,x:-30.55},13,cjs.Ease.quadInOut).wait(78).to({startPosition:0},0).to({regY:10,scaleX:1,scaleY:1,rotation:0,x:-43.65,y:-38.4},10,cjs.Ease.quadInOut).wait(60));

	// yukk6r7k
	this.instance_2 = new lib.yukk6r7k("synched",0);
	this.instance_2.setTransform(4.05,-160.15,1,1,0,0,0,-14.8,-10.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:-152.5,startPosition:3},3).to({y:-160.15,startPosition:6},3).to({y:-167.8,startPosition:9},3).to({y:-160.15,startPosition:11},2).to({y:-152.5,startPosition:14},3).to({y:-160.15,startPosition:17},3).to({y:-167.8,startPosition:20},3).to({y:-160.15,startPosition:23},3).to({rotation:3.7323,x:19.5,y:-160.45,startPosition:31},8,cjs.Ease.quadOut).wait(37).to({startPosition:77},0).to({regX:-14.7,rotation:-2.7419,x:-9.9,y:-160.05,startPosition:89},12,cjs.Ease.quadInOut).wait(23).to({startPosition:112},0).to({regX:-14.8,rotation:0,x:4.05,y:-160.15,startPosition:114},11,cjs.Ease.quadInOut).wait(7).to({startPosition:121},0).wait(57).to({startPosition:178},0).to({regX:-14.7,rotation:2.2151,x:13.2,y:-160.1,startPosition:187},9).wait(49).to({startPosition:236},0).to({regX:-14.8,rotation:0,x:4.05,y:-160.15,startPosition:244},8).wait(228).to({startPosition:472},0).to({rotation:3.2277,x:14.5,y:-160.85,startPosition:482},10).wait(88).to({startPosition:570},0).to({regX:-14.7,rotation:0.2579,x:3,y:-160.8,startPosition:580},10,cjs.Ease.quadInOut).wait(44).to({rotation:0.2579,startPosition:624},0).to({regY:-10.2,rotation:2.4496,x:12.9,y:-161.05,startPosition:633},9,cjs.Ease.quadInOut).wait(25).to({startPosition:658},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:668},10).wait(174).to({startPosition:842},0).to({regX:-14.7,regY:-10,rotation:5.9998,x:31.25,y:-158.3,startPosition:850},8).wait(85).to({startPosition:935},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:943},8,cjs.Ease.quadInOut).wait(56).to({startPosition:999},0).to({regX:-14.7,rotation:3.0027,x:17.3,y:-159.95,startPosition:1009},10,cjs.Ease.quadInOut).wait(102).to({startPosition:1111},0).to({regY:-10.2,rotation:0.0507,x:4.05,y:-160.1,startPosition:1122},11,cjs.Ease.quadInOut).wait(56).to({rotation:0.0507,startPosition:1178},0).to({rotation:-1.4322,x:-2.55,y:-159.85,startPosition:1189},11,cjs.Ease.quadInOut).wait(103).to({startPosition:1292},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:1302},10,cjs.Ease.quadInOut).wait(167).to({startPosition:1469},0).to({regX:-14.7,rotation:1.7331,x:12.15,startPosition:1479},10,cjs.Ease.quadInOut).wait(101).to({startPosition:1580},0).to({rotation:-0.7379,x:0.15,y:-159.95,startPosition:1591},11,cjs.Ease.quadInOut).wait(53).to({startPosition:1644},0).to({regX:-14.8,rotation:0,x:4.05,y:-160.15,startPosition:1654},10,cjs.Ease.quadInOut).wait(77).to({startPosition:1731},0).to({rotation:2.741,x:15.1,y:-160.35,startPosition:1740},9).wait(86).to({startPosition:1826},0).to({regX:-14.7,rotation:0.5027,x:6.35,y:-160.15,startPosition:1837},11,cjs.Ease.quadInOut).wait(75).to({rotation:0.5027,startPosition:1912},0).to({regY:-10.2,rotation:-1.7349,x:-4.1,y:-159.85,startPosition:1922},10,cjs.Ease.quadInOut).wait(82).to({startPosition:2004},0).to({regX:-14.6,rotation:0.48,x:5.75,startPosition:2016},12).wait(48).to({startPosition:2064},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:2074},10).wait(65).to({startPosition:2139},0).to({regX:-14.7,rotation:1.4497,x:10.35,y:-160,startPosition:2150},11,cjs.Ease.quadInOut).wait(131).to({startPosition:2281},0).to({regX:-14.6,regY:-10.2,rotation:-3.7534,x:-3.95,y:-159.35,startPosition:2293},12,cjs.Ease.quadInOut).wait(134).to({startPosition:2427},0).to({rotation:-0.5255,x:10.45,y:-159.75,startPosition:2439},12,cjs.Ease.quadInOut).wait(92).to({rotation:-0.5255,startPosition:2531},0).to({rotation:-2.5267,x:1.45,y:-159.5,startPosition:2543},12,cjs.Ease.quadInOut).wait(46).to({startPosition:2589},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:2600},11,cjs.Ease.quadInOut).wait(96).to({startPosition:2696},0).to({rotation:2.4513,x:14.75,y:-160.25,startPosition:2706},10,cjs.Ease.quadInOut).wait(19).to({startPosition:2725},0).to({rotation:0,x:4.05,y:-160.15,startPosition:2734},9,cjs.Ease.quadInOut).wait(193).to({startPosition:2927},0).to({regX:-14.7,rotation:1.9509,x:13,startPosition:2936},9,cjs.Ease.quadInOut).wait(77).to({startPosition:3013},0).to({regY:-10.2,rotation:0.2465,x:5.35,y:-160.05,startPosition:3026},13,cjs.Ease.quadInOut).wait(78).to({rotation:0.2465,startPosition:3104},0).to({regX:-14.8,regY:-10.1,rotation:0,x:4.05,y:-160.15,startPosition:3114},10,cjs.Ease.quadInOut).wait(60));

	// yilt78l7t8l
	this.instance_3 = new lib.fghrthth("synched",0);
	this.instance_3.setTransform(-4.9,48.35);

	this.instance_4 = new lib.tyjtyjytj("synched",5);
	this.instance_4.setTransform(-4.9,48.35);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:56,startPosition:3},3).to({y:48.35,startPosition:6},3).to({y:40.7,startPosition:9},3).to({y:48.35,startPosition:11},2).to({y:56,startPosition:14},3).to({y:48.35,startPosition:17},3).to({y:40.7,startPosition:20},3).to({_off:true,y:48.35,startPosition:5},3).wait(3151));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(20).to({_off:false},3).to({regX:-0.1,regY:0.1,rotation:3.7323,x:-3.05,y:47.1,startPosition:13},8,cjs.Ease.quadOut).wait(37).to({startPosition:7},0).to({rotation:-2.7419,x:-8.9,y:48.65,startPosition:19},12,cjs.Ease.quadInOut).wait(23).to({startPosition:16},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:18},11,cjs.Ease.quadInOut).wait(7).to({startPosition:25},0).wait(57).to({startPosition:4},0).to({rotation:2.2151,x:-3.85,y:47.85,startPosition:13},9).wait(49).to({startPosition:10},0).to({rotation:0,x:-4.9,y:48.35,startPosition:18},8).wait(228).to({startPosition:12},0).to({rotation:3.2277,x:-6.1,y:46.8,startPosition:22},10).wait(88).to({startPosition:6},0).to({regX:-0.1,rotation:0.2579,x:-7,y:47.55,startPosition:16},10,cjs.Ease.quadInOut).wait(44).to({rotation:0.2579,startPosition:8},0).to({rotation:2.4496,x:-5.05,y:46.9,startPosition:17},9,cjs.Ease.quadInOut).wait(25).to({startPosition:16},0).to({regX:0,rotation:0,x:-4.9,y:48.35,startPosition:0},10).wait(174).to({startPosition:18},0).to({rotation:5.9998,x:0.45,y:48,startPosition:0},8).wait(85).to({startPosition:7},0).to({rotation:0,x:-4.9,y:48.35,startPosition:15},8,cjs.Ease.quadInOut).wait(56).to({startPosition:19},0).to({regX:-0.1,regY:0.1,rotation:3.0027,x:-2.7,y:47.85,startPosition:3},10,cjs.Ease.quadInOut).wait(102).to({startPosition:1},0).to({rotation:0.0507,x:-5.15,y:48.5,startPosition:12},11,cjs.Ease.quadInOut).wait(56).to({rotation:0.0507,startPosition:16},0).to({regX:-0.2,rotation:-1.4322,x:-6.4,y:48.9,startPosition:1},11,cjs.Ease.quadInOut).wait(103).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:10},10,cjs.Ease.quadInOut).wait(167).to({startPosition:21},0).to({rotation:1.7331,x:-3.15,y:47.95,startPosition:5},10,cjs.Ease.quadInOut).wait(101).to({startPosition:2},0).to({regX:-0.1,regY:0.1,rotation:-0.7379,x:-6.2,y:48.65,startPosition:13},11,cjs.Ease.quadInOut).wait(53).to({startPosition:14},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:24},10,cjs.Ease.quadInOut).wait(77).to({startPosition:23},0).to({rotation:2.741,x:-3.8,y:47.45,startPosition:6},9).wait(86).to({startPosition:14},0).to({regX:-0.1,rotation:0.5027,x:-4.55,y:48.2,startPosition:25},11,cjs.Ease.quadInOut).wait(75).to({rotation:0.5027,startPosition:22},0).to({regY:0.1,rotation:-1.7349,x:-6.8,y:48.9,startPosition:6},10,cjs.Ease.quadInOut).wait(82).to({startPosition:10},0).to({rotation:0.48,x:-5.05,y:48.6,startPosition:22},12).wait(48).to({startPosition:18},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:2},10).wait(65).to({startPosition:15},0).to({rotation:1.4497,x:-3.9,y:48.15,startPosition:0},11,cjs.Ease.quadInOut).wait(131).to({startPosition:1},0).to({regX:-0.1,rotation:-1.7777,x:-6.55,y:49.35,startPosition:13},12,cjs.Ease.quadInOut).wait(134).to({rotation:-1.7777,startPosition:17},0).to({rotation:1.4497,x:-3.8,y:48.4,startPosition:3},12,cjs.Ease.quadInOut).wait(92).to({rotation:1.4497,startPosition:17},0).to({regY:0.1,rotation:-0.5517,x:-5.5,y:49.05,startPosition:3},12,cjs.Ease.quadInOut).wait(46).to({rotation:-0.5517,startPosition:23},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:8},11,cjs.Ease.quadInOut).wait(96).to({startPosition:0},0).to({rotation:2.4513,x:-3.1,y:47.65,startPosition:10},10,cjs.Ease.quadInOut).wait(19).to({startPosition:3},0).to({rotation:0,x:-4.9,y:48.35,startPosition:12},9,cjs.Ease.quadInOut).wait(193).to({startPosition:23},0).to({regX:-0.1,rotation:1.9509,x:-3.15,y:47.9,startPosition:6},9,cjs.Ease.quadInOut).wait(77).to({startPosition:5},0).to({regY:0.1,rotation:0.2465,x:-4.55,y:48.5,startPosition:18},13,cjs.Ease.quadInOut).wait(78).to({rotation:0.2465},0).to({regX:0,regY:0,rotation:0,x:-4.9,y:48.35,startPosition:2},10,cjs.Ease.quadInOut).wait(60));

	// jylt68l68l
	this.instance_5 = new lib.jylt68l68l("synched",0);
	this.instance_5.setTransform(43.95,-129.6,1,1,-14.9983,0,0,20.2,12.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regY:12.3,rotation:-5.947,y:-122.05},3).to({rotation:3.1027,y:-129.7},3).to({regY:12.2,rotation:12.1555,y:-137.45},3).to({regY:12.3,rotation:18.1917,x:44,y:-129.7},2).to({regY:12.2,rotation:9.8937,y:-122.2},3).to({rotation:1.5984,x:44.05,y:-129.85},3).to({rotation:-6.6975,x:44,y:-137.4},3).to({regY:12.4,rotation:-14.9983,x:43.95,y:-129.6},3).to({regY:12.3,rotation:-22.7579,x:57.35,y:-127.35},8,cjs.Ease.quadOut).wait(37).to({startPosition:0},0).to({regX:20.4,regY:12.2,rotation:-19.2957,x:31.55,y:-131.6},12,cjs.Ease.quadInOut).wait(23).to({startPosition:0},0).to({regX:20.2,regY:12.4,rotation:0,x:44,y:-129.6},11,cjs.Ease.quadInOut).to({_off:true},7).wait(3053));

	// Layer_3
	this.instance_6 = new lib.yul68l68l("synched",0);
	this.instance_6.setTransform(38.75,-142);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(121).to({_off:false},0).wait(57).to({startPosition:0},0).to({rotation:-4.2432,x:44.95,y:-139.65},9).wait(49).to({startPosition:0},0).to({rotation:0,x:38.75,y:-142},8).wait(228).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-8.7372,x:44.65,y:-138.75},10).wait(88).to({startPosition:0},0).to({rotation:-6.5038,x:35.85,y:-141.55},10,cjs.Ease.quadInOut).wait(44).to({startPosition:0},0).to({regX:0.2,rotation:-9.2473,x:43.2,y:-139.65},9,cjs.Ease.quadInOut).wait(25).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.75,y:-142},10,cjs.Ease.quadInOut).wait(174).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-4.1977,x:61,y:-135.8},8).wait(85).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.75,y:-142},8,cjs.Ease.quadInOut).wait(56).to({startPosition:0},0).to({regX:0.1,rotation:5.4541,x:51.85,y:-140.1},10,cjs.Ease.quadInOut).wait(102).to({startPosition:0},0).to({rotation:-2.4426,x:38.65,y:-141.4},11,cjs.Ease.quadInOut).wait(56).to({rotation:-2.4426},0).to({regX:0.2,rotation:-5.63,x:32.05,y:-141.9},11,cjs.Ease.quadInOut).wait(103).to({startPosition:0},0).to({regX:0,rotation:0,x:38.75,y:-142},10,cjs.Ease.quadInOut).wait(167).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:0.0289,x:45.75,y:-140.95},10,cjs.Ease.quadInOut).wait(101).to({startPosition:0},0).to({rotation:1.0536,x:35.7,y:-142.9},11,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.75,y:-142},10,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:3.9663,x:49.45,y:-140.9},9).wait(86).to({startPosition:0},0).to({rotation:5.4454,x:42.65,y:-142.7},11,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regX:0.2,rotation:-1.5092,x:31.3,y:-143.3},10,cjs.Ease.quadInOut).wait(82).to({rotation:-1.5092},0).to({regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:2.6563,x:41.05,y:-142.25},12).wait(48).to({startPosition:0},0).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:38.75,y:-142},10).wait(65).to({startPosition:0},0).to({regX:0.1,rotation:-15.5241,x:39.35,y:-137.9},11,cjs.Ease.quadInOut).wait(131).to({startPosition:0},0).to({regX:0.2,regY:-0.1,rotation:-13.5589,x:27.4,y:-140.05},12,cjs.Ease.quadInOut).wait(134).to({startPosition:0},0).to({regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-3.6134,x:42.5,y:-139.7},12,cjs.Ease.quadInOut).wait(92).to({rotation:-3.6134},0).to({regX:0.4,regY:-0.2,rotation:-1.8959,x:35.45,y:-141.5},12,cjs.Ease.quadInOut).wait(46).to({startPosition:0},0).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:38.75,y:-142},11,cjs.Ease.quadInOut).wait(96).to({startPosition:0},0).to({rotation:8.3987,x:51.3,y:-141.45},10,cjs.Ease.quadInOut).wait(19).to({startPosition:0},0).to({rotation:0,x:38.75,y:-142},9,cjs.Ease.quadInOut).wait(193).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:9.1728,x:50.65,y:-141.15},9,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regX:0.2,rotation:2.7192,x:42.65,y:-141.9},13,cjs.Ease.quadInOut).wait(78).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.75,y:-142},10,cjs.Ease.quadInOut).wait(60));

	// Layer_4
	this.instance_7 = new lib.yuilk6l6r8l("synched",0);
	this.instance_7.setTransform(45.2,-36,1,1,0,0,0,9.7,16.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(121).to({_off:false},0).wait(57).to({startPosition:0},0).to({regX:9.8,regY:16,rotation:-50.7361,x:65.9,y:-34.55},9).wait(49).to({startPosition:0},0).to({regX:9.7,regY:16.1,rotation:0,x:45.2,y:-36},8).wait(228).to({startPosition:0},0).to({regX:9.8,regY:16,rotation:-23.2249,x:67.15,y:-35},10).wait(88).to({startPosition:0},0).to({regY:15.9,rotation:-20.9916,x:54.3,y:-37.1},10,cjs.Ease.quadInOut).wait(44).to({startPosition:0},0).to({regX:9.9,scaleX:0.9999,scaleY:0.9999,rotation:-23.7369,x:66.6,y:-36.25},9,cjs.Ease.quadInOut).wait(25).to({startPosition:0},0).to({regX:9.7,regY:16.1,scaleX:1,scaleY:1,rotation:0,x:45.2,y:-36},10,cjs.Ease.quadInOut).wait(174).to({startPosition:0},0).to({regX:9.8,regY:15.9,rotation:-18.8895,x:75.15,y:-30.65},8).wait(85).to({startPosition:0},0).to({regX:9.7,regY:16.1,rotation:0,x:45.2,y:-36},8,cjs.Ease.quadInOut).wait(56).to({startPosition:0},0).to({regY:16,rotation:5.4541,x:48.15,y:-34.1},10,cjs.Ease.quadInOut).wait(102).to({startPosition:0},0).to({regX:9.8,rotation:-2.4426,x:49.65,y:-35.85},11,cjs.Ease.quadInOut).wait(56).to({rotation:-2.4426},0).to({regY:15.8,rotation:-5.63,x:48.75,y:-37.3},11,cjs.Ease.quadInOut).wait(103).to({startPosition:0},0).to({regX:9.7,regY:16.1,rotation:0,x:45.2,y:-36},10,cjs.Ease.quadInOut).wait(167).to({startPosition:0},0).to({regX:9.8,regY:16,rotation:-38.417,x:52.2,y:-34.95},10,cjs.Ease.quadInOut).wait(101).to({startPosition:0},0).to({regX:9.9,regY:16.1,rotation:-37.392,x:40.35,y:-36.8},11,cjs.Ease.quadInOut).wait(53).to({startPosition:0},0).to({regX:9.7,rotation:0,x:45.2,y:-36},10,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regY:16,rotation:3.9663,x:48.55,y:-34.75},9).wait(86).to({startPosition:0},0).to({rotation:5.4454,x:39,y:-36.55},11,cjs.Ease.quadInOut).wait(75).to({startPosition:0},0).to({regX:9.8,rotation:-1.5092,x:40.5,y:-37.45},10,cjs.Ease.quadInOut).wait(82).to({rotation:-1.5092},0).to({regY:15.8,scaleX:0.9999,scaleY:0.9999,rotation:2.6563,x:42.4,y:-36.2},12).wait(48).to({startPosition:0},0).to({regX:9.7,regY:16.1,scaleX:1,scaleY:1,rotation:0,x:45.2,y:-36},10).wait(65).to({startPosition:0},0).to({regY:16,rotation:-84.7538,x:78.95,y:-39.9},11,cjs.Ease.quadInOut).wait(131).to({startPosition:0},0).to({regX:9.8,scaleX:0.9999,scaleY:0.9999,rotation:-82.7904,x:63.55,y:-40.7},12,cjs.Ease.quadInOut).wait(134).to({startPosition:0},0).to({regX:9.9,regY:16.1,rotation:-57.3477,x:61.05,y:-35.7},12,cjs.Ease.quadInOut).wait(92).to({startPosition:0},0).to({regX:10,regY:16,scaleX:0.9998,scaleY:0.9998,rotation:-35.9388,x:50.85,y:-37.05},12,cjs.Ease.quadInOut).wait(46).to({startPosition:0},0).to({regX:9.7,regY:16.1,scaleX:1,scaleY:1,rotation:0,x:45.2,y:-36},11,cjs.Ease.quadInOut).wait(96).to({startPosition:0},0).to({rotation:8.3987,x:42.2,y:-35.6},10,cjs.Ease.quadInOut).wait(19).to({startPosition:0},0).to({rotation:0,x:45.2,y:-36},9,cjs.Ease.quadInOut).wait(193).to({startPosition:0},0).to({regY:16,rotation:9.1728,x:40.1,y:-35.5},9,cjs.Ease.quadInOut).wait(77).to({startPosition:0},0).to({regY:15.9,rotation:2.7192,x:43.95,y:-35.85},13,cjs.Ease.quadInOut).wait(78).to({startPosition:0},0).to({regY:16.1,rotation:0,x:45.2,y:-36},10,cjs.Ease.quadInOut).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.9,-275.7,265.70000000000005,553.7);


(lib.uio7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tkt5k5d6
	this.instance = new lib.tkt5k5d6("synched",0);
	this.instance.setTransform(-243.15,20.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-84.75,startPosition:23},23).wait(3151));

	// uyf7ddk
	this.instance_1 = new lib.uyf7ddk("synched",0);
	this.instance_1.setTransform(93.3,13.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(23).to({startPosition:23},0).wait(3151));

	// Layer_5
	this.instance_2 = new lib.CachedBmp_14();
	this.instance_2.setTransform(-115.7,-198.05,0.142,0.142);

	this.instance_3 = new lib.CachedBmp_15();
	this.instance_3.setTransform(-115.7,-198.05,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},23).wait(3151));

	// Layer_6
	this.instance_4 = new lib.CachedBmp_16();
	this.instance_4.setTransform(-226.5,-288.1,0.142,0.142);

	this.instance_5 = new lib.CachedBmp_17();
	this.instance_5.setTransform(-226.5,-288.1,0.142,0.142);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},23).wait(3151));

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#606163").p("AfQfQMg+fAAAMAAAg+fMA+fAAAg");
	this.shape.setTransform(-6.3,-81.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3174));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-342,-288.1,568.6,586.3);


(lib.yjt5j56rj = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.uio7979("synched",0);
	this.instance.setTransform(4.4,83.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(174).to({scaleX:1.792,scaleY:1.792,x:112.35,y:297.65,startPosition:174},0).wait(89).to({x:-118.9,startPosition:263},0).wait(199).to({scaleX:1,scaleY:1,x:4.4,y:83.75,startPosition:462},0).wait(2711).to({startPosition:3173},0).to({_off:true},1).wait(85));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-524.7,-218.6,1043.1,1032.8);


// stage content:
(lib.m3l1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,121,260,462,698,961,1279,1601,2082,2454,2736,2974,3173];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:121,loop:1,offset:0}];
	this.streamSoundSymbolsList[121] = [{id:"audio2",startFrame:121,endFrame:260,loop:1,offset:0}];
	this.streamSoundSymbolsList[260] = [{id:"audio3",startFrame:260,endFrame:462,loop:1,offset:0}];
	this.streamSoundSymbolsList[462] = [{id:"audio4",startFrame:462,endFrame:698,loop:1,offset:0}];
	this.streamSoundSymbolsList[698] = [{id:"audio5",startFrame:698,endFrame:961,loop:1,offset:0}];
	this.streamSoundSymbolsList[961] = [{id:"audio6",startFrame:961,endFrame:1279,loop:1,offset:0}];
	this.streamSoundSymbolsList[1279] = [{id:"audio7",startFrame:1279,endFrame:1601,loop:1,offset:0}];
	this.streamSoundSymbolsList[1601] = [{id:"audio8",startFrame:1601,endFrame:2082,loop:1,offset:0}];
	this.streamSoundSymbolsList[2082] = [{id:"audio9",startFrame:2082,endFrame:2454,loop:1,offset:0}];
	this.streamSoundSymbolsList[2454] = [{id:"audio10",startFrame:2454,endFrame:2736,loop:1,offset:0}];
	this.streamSoundSymbolsList[2736] = [{id:"audio11",startFrame:2736,endFrame:2974,loop:1,offset:0}];
	this.streamSoundSymbolsList[2974] = [{id:"audio12",startFrame:2974,endFrame:3174,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,121,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_121 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,121,260,1);
	}
	this.frame_260 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,260,462,1);
	}
	this.frame_462 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,462,698,1);
	}
	this.frame_698 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,698,961,1);
	}
	this.frame_961 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,961,1279,1);
	}
	this.frame_1279 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,1279,1601,1);
	}
	this.frame_1601 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,1601,2082,1);
	}
	this.frame_2082 = function() {
		var soundInstance = playSound("audio9",0);
		this.InsertIntoSoundStreamData(soundInstance,2082,2454,1);
	}
	this.frame_2454 = function() {
		var soundInstance = playSound("audio10",0);
		this.InsertIntoSoundStreamData(soundInstance,2454,2736,1);
	}
	this.frame_2736 = function() {
		var soundInstance = playSound("audio11",0);
		this.InsertIntoSoundStreamData(soundInstance,2736,2974,1);
	}
	this.frame_2974 = function() {
		var soundInstance = playSound("audio12",0);
		this.InsertIntoSoundStreamData(soundInstance,2974,3174,1);
	}
	this.frame_3173 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(121).call(this.frame_121).wait(139).call(this.frame_260).wait(202).call(this.frame_462).wait(236).call(this.frame_698).wait(263).call(this.frame_961).wait(318).call(this.frame_1279).wait(322).call(this.frame_1601).wait(481).call(this.frame_2082).wait(372).call(this.frame_2454).wait(282).call(this.frame_2736).wait(238).call(this.frame_2974).wait(199).call(this.frame_3173).wait(1));

	// Layer_6
	this.instance = new lib.yjt5j56rj("synched",0);
	this.instance.setTransform(408.85,564.8,1.9645,1.9645,0,0,0,4.5,83.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3174));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-231,370.5,1649.3,1629);
// library properties:
lib.properties = {
	id: '05E79C8D9732B946A18A04FA8701B150',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_18.png", id:"CachedBmp_18"},
		{src:"images/CachedBmp_17.png", id:"CachedBmp_17"},
		{src:"images/CachedBmp_16.png", id:"CachedBmp_16"},
		{src:"images/CachedBmp_15.png", id:"CachedBmp_15"},
		{src:"images/CachedBmp_14.png", id:"CachedBmp_14"},
		{src:"images/CachedBmp_13.png", id:"CachedBmp_13"},
		{src:"images/CachedBmp_12.png", id:"CachedBmp_12"},
		{src:"images/CachedBmp_11.png", id:"CachedBmp_11"},
		{src:"images/CachedBmp_10.png", id:"CachedBmp_10"},
		{src:"images/CachedBmp_7.png", id:"CachedBmp_7"},
		{src:"images/CachedBmp_6.png", id:"CachedBmp_6"},
		{src:"images/m3l1_atlas_1.png", id:"m3l1_atlas_1"},
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
an.compositions['05E79C8D9732B946A18A04FA8701B150'] = {
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