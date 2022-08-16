(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m4l3_part1_atlas_1", frames: [[0,0,360,858]]},
		{name:"m4l3_part1_atlas_2", frames: [[0,0,869,247]]},
		{name:"m4l3_part1_atlas_3", frames: [[0,0,257,814],[845,0,132,113],[845,115,128,103],[0,816,121,95],[709,522,114,83],[123,816,109,67],[293,876,56,57],[406,876,46,47],[234,876,57,57],[573,864,63,64],[351,876,53,54],[638,864,61,62],[709,613,134,335],[259,0,584,259],[259,261,577,259],[259,522,155,352],[838,261,156,350],[416,522,155,352],[573,522,134,340],[845,613,117,287]]}
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



(lib.CachedBmp_49 = function() {
	this.initialize(ss["m4l3_part1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,522,1906);


(lib.CachedBmp_46 = function() {
	this.initialize(ss["m4l3_part1_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(img.CachedBmp_44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,552,1917);


(lib.CachedBmp_43 = function() {
	this.initialize(img.CachedBmp_43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,442,1905);


(lib.CachedBmp_41 = function() {
	this.initialize(img.CachedBmp_41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,403,1532);


(lib.CachedBmp_40 = function() {
	this.initialize(img.CachedBmp_40);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,1926);


(lib.CachedBmp_39 = function() {
	this.initialize(img.CachedBmp_39);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,442,1905);


(lib.CachedBmp_37 = function() {
	this.initialize(img.CachedBmp_37);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,520,1905);


(lib.CachedBmp_11 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1084,839);


(lib.Bitmap10 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap6 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap8 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap9 = function() {
	this.initialize(ss["m4l3_part1_atlas_3"]);
	this.gotoAndStop(19);
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


(lib.yulkt76l87l876l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#923933").s().p("AAIFoQgXgNgKgbIgDgMIgBAAIAAgRQgChogIhsQgMirgVhPIgCgIIgIgTQgUg4AKgwQAKgxAigMQAigNAmAfQAnAfAUA4IAGATIABABIAAAEQAMAygLAmQAEFqgCBFIgBAAQAHAZgKAXQgLAXgWAIQgJAEgKAAQgOAAgPgIg");
	this.shape.setTransform(-0.0402,74.6292,2.0291,2.0291);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.5,0,39,149.3);


(lib.uoi8y9y8998 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap10();
	this.instance.setTransform(-67,-335);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67,-335,134,335);


(lib.uk67kr67k = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(0,0,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63,150);


(lib.uiot79t79 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-45.7,-0.05,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.7,0,91.30000000000001,333.2);


(lib.uil78l78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#EBBF9A").s().p("AhKDLQAHgEAHgtQANhYABjHQgDgMACgQQAGgcAVgRQAUgQAZAEQAZAEAPAYQAOAXgFAcIgBACIgaB2QgfCKgTBlQgXgIgwgJg");
	this.shape.setTransform(6.5689,44.5068,2.0288,2.0288);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgQBdQAJg4gCAAQgCAAgLAmIgMApQgEARgLgDQgLgDAEgUQAahZADgfQACgSgHgFQgDgCgHAeIgJApIgGAYQgFANgHgFQgHgEACgaIACgZQAXhlAWgcQAaggA5AMQARAEACBLQACBCgJA6QgDAVgEAFQgCAEgHgBQgHgBACgoQADgmgCABQgEADgFBKQgBAVgHAHQgDADgHgBQgFgBgBgHQgBgMAEglQAIg+gKAVQgDAFgLBWIgCARQgBAJgIACIgCAAQgNAAAIgyg");
	this.shape_1.setTransform(-6.6913,112.4016,2.0288,2.0288);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.9,-0.1,43.7,141.6);


(lib.uil7tl7t8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-151.95,-21.65,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151.9,-21.6,151.9,43.2);


(lib.uiy89y889 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-22.5,0,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,0,45,142.3);


(lib.uiy8989 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("Ag3FsQgXgIgKgXQgKgXAHgZIgBAAQgChFAElqQgLgnAMgxIAAgEIABAAIAGgUQAVg4AmgfQAmgfAiANQAiAMAKAxQAKAwgUA4IgIATIgCAIQgVBPgMCrQgHBqgDBqIAAARIgBAAIgEAMQgJAbgXANQgPAIgOAAQgKAAgJgEg");
	this.shape.setTransform(-0.0113,74.6203,2.0291,2.0291);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.5,0,39.1,149.3);


(lib.uiy7y79 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D0A988").s().p("AhsCmQAHgDAQgmQAfhNAoi1QAAgOAGgLQAJgZAYgJQAYgLAYALQAXAJAJAZQAJAZgKAYIgBABIgxBmQg5B3goBVQgUgMgtgUg");
	this.shape.setTransform(-22.2463,40.1391,2.0284,2.0284);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0A988").s().p("AgmBRQAUgxgCgBQgCAAgSAfIgUAiQgIAPgKgFQgKgGAJgRQArhKAJgcQAFgPgFgHQgDgDgNAaIgRAjIgLAUQgHALgGgGQgFgFAGgXIAIgVQAqhYAcgUQAegXA2AZQAPAHgNBFQgMA9gUAzQgIARgEAEQgDADgGgCQgHgDAKgkQAKgigBABQgEABgHAWIgNAtQgGATgHAEQgEACgGgCQgEgCAAgHQABgLALghQAUg3gOARQgHAIgYBIIgFAPQgFAHgHAAIgBAAQgPAAATgug");
	this.shape_1.setTransform(-47.1446,98.62,2.0284,2.0284);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.8,-0.1,64.8,124.5);


(lib.uil7tyt797 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-48.35,-0.05,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,0,96.5,335.1);


(lib.ui797t9 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-38.8,-0.05,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.8,0,77.3,333);


(lib.ui7yt9y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap8();
	this.instance.setTransform(-67,-170);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67,-170,134,340);


(lib.ui7t7 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-35.25,0,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.2,0,70.4,267.9);


(lib.op8y9y8989 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-38.6,-0.1,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.6,-0.1,77,336.8);


(lib.oiuy8989 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-38.7,-0.05,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.7,0,77.30000000000001,333);


(lib.oiu8y9y89 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#923933").s().p("Ahzh6IgBgCQgJgbAKgZQAKgaAYgIQAYgJAYANQAYANAJAbQAEAOAAAOQAiDDAtBMQAXAmAPgBIhzAsQhCirg3ilg");
	this.shape.setTransform(24.5451,43.3565,2.0284,2.0284);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#856A4F").s().p("AAkCLQgHgBgEgIIgFgRIgOgtQgLglgDgFQgOgTASA8QAKAjAAAMQABAHgFACQgFADgEgDQgIgFgFgVIgMgxQgGgYgEgCQgBgBAJAmQAJAngHACQgGACgDgEQgFgEgGgUQgTg3gKhCQgKhKAPgHQA3gWAeAbQAbAZAoBgQAQAtgKAJQgGAFgGgMIgLgWIgQgmQgMgegDAEQgGAGAFARQAJAeAoBTQAJATgLAFQgKAFgIgRIgSgmQgSgjgCAAQgCABATA1QARAzgOAAIgCAAg");
	this.shape_1.setTransform(44.5171,108.2193,2.0284,2.0284);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,62,136.5);


(lib.o89y89y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap9();
	this.instance.setTransform(-59,-143);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-143,117,287);


(lib.o8y080 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#897E7D").s().p("AAwFvQgYgDgPgUQgOgUABgbQgWhShJlSQgTgkABgyIgBgEIABAAIACgVQAHg7AfgnQAegmAlAEQAjAFAUAtQAUAtgHA7IgDAUIAAAIQgDBSAaCqQAQBnAWBqIADAQIgBAAIAAANQgEAcgUASQgRAPgVAAIgIAAg");
	this.shape.setTransform(0.0039,74.5098,2.0292,2.0292);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.2,0,48.4,149.1);


(lib.iult7l8t7l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-45.55,-0.05,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.5,0,90.9,333);


(lib.iul7l87tl7t8 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#BE4339").s().p("AhdFgQgUgSgEgdIAAgMIgBAAIADgRQBClLgFiBIAAgIIgDgVQgHg7AUgsQAUgtAjgFQAlgEAeAmQAfAnAHA7IACAUIABABIgBAEQABAygTAkQhPFrgQA5IAAAAQABAbgOAUQgPAUgYADIgHAAQgVAAgSgPg");
	this.shape.setTransform(0.003,74.5162,2.0292,2.0292);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.2,0,48.4,149.1);


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
	this.shape.graphics.f("#BE4339").s().p("AhLAOQg8g8gWgXIgBgBQgVgVgCgbQgCgbASgSQASgSAbABQAbACAVAUQALALAFAMQByChBKAxQAlAYANgIQgiAjgyA3QhWhQhXhXg");
	this.shape.setTransform(36.9194,36.6579,2.0288,2.0288);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A8845F").s().p("AAaBiQgtg6gGAAQgBAAAYAeQAYAfgFAFQgFAFgFgCQgFgCgOgPQgpgqglg3Qgqg/ALgMQAogsAoALQAjAKBMBGIARATQAQATgDAIQgDAHgLgIIgUgOIgfgdQgXgVgCAEQgCAIALAOQAWAYBIA4QAQAOgHAJQgHAJgOgMIghgaQgggYgBABQgCABAoAoQAnAogQAFQgHACgHgFIgMgNQg4g9gIgFQgUgMAqAvQAZAbAGALQADAGgEAEQgDAEgEAAQgKAAgPgSg");
	this.shape_1.setTransform(82.2037,84.1567,2.0288,2.0288);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,107.4,107.7);


(lib.io8y0y80 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("Ah4CqQAQABAWgmQAthMAijDQAAgNAEgPQAKgbAXgNQAYgNAYAJQAYAJAKAZQALAZgKAbIgBACIgmBvQgqB2gpBsQhFgcgugRg");
	this.shape.setTransform(-24.8143,43.381,2.0284,2.0284);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49675").s().p("AgiBZQASg2gCAAQgCgBgRAkIgTAmQgIAQgKgFQgKgFAIgTQAphTAIgeQAFgRgGgGQgDgEgMAeIgPAmIgLAXQgHAMgGgGQgGgFAGgaIAHgXQAnhgAbgYQAegcA3AWQAQAGgLBLQgJBBgTA5QgHATgEAFQgDADgGgCQgHgCAJgnQAJgmgCABQgDACgHAYIgMAxQgFAVgHAFQgEADgGgDQgEgBAAgHQAAgNAKgjQALgkAAgIQAAgFgGAIQgEAFgKAmIgOAtIgFAQQgEAIgIABIgBAAQgOAAARgyg");
	this.shape_1.setTransform(-44.7708,108.191,2.0284,2.0284);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.1,-0.1,62,136.4);


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
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-23.75,0,0.2175,0.2175);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(-23.8,0,0.2175,0.2175);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(-23.8,-1,0.2175,0.2175);

	this.instance_3 = new lib.CachedBmp_10();
	this.instance_3.setTransform(-23.8,-0.65,0.2175,0.2175);

	this.instance_4 = new lib.CachedBmp_11();
	this.instance_4.setTransform(-23.8,-0.9,0.2175,0.2175);

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
p.nominalBounds = new cjs.Rectangle(-23.8,-1,28.700000000000003,24.7);


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
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(3.3,0,0.092,0.092);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_12, new cjs.Rectangle(3.3,0,5.2,5.3), null);


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
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(2.05,0.45,0.1284,0.1284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_10, new cjs.Rectangle(2.1,0.5,5.9,6), null);


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
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(1.45,0,0.1162,0.1162);

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
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(2.5,0.45,0.1162,0.1162);

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
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(3.05,0,0.1223,0.1223);

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
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(7.35,0.5,0.1198,0.1198);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0copy2, new cjs.Rectangle(7.4,0.5,7.299999999999999,7.5), null);


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
	this.instance_3 = new lib.ClipGroup_3copy2();
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
	this.instance_4 = new lib.fgyjrtyj5sewkjew4copy("synched",0);
	this.instance_4.setTransform(-24.9,8.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-24.5,100.3,43.7);


(lib.yuil7t8lt78l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-7.15,-28.75,0.8038,0.8038,2.0584,0,0,-0.2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(609).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(570).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(1506));

	// hjluyglyilyitl
	this.instance_1 = new lib.hjluyglyilyitl("synched",0);
	this.instance_1.setTransform(-24.55,-62.1,0.6561,0.6662,0,-10.4505,169.5501);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3360));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BEA840").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape.setTransform(36.7566,-40.7066,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3360));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5F6F6").s().p("AAbAvQgegUgrgQQhUgfg4AUQgOACgSAGQgkAKgUAOIAWgQQAegTAhgRQBug2B1gHIBDALQBUAXBWBAQglAfgyATQgnAPgiAAQgyAAgmgjg");
	this.shape_1.setTransform(-27.6639,-97.0253,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3360));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E6E6").s().p("ABqCFIlwgvQAMg/Aqg9QBTh8CUAJIAjAEQAqAJAlAXQB0BKAKC7QgRAIgdACIgRABQgwAAgugWg");
	this.shape_2.setTransform(-0.0696,-123.1094,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3360));

	// Layer_11
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D5AE90").s().p("AgQASIARgQQAPgTABghQAFAXgHATQgDAIgFAEQgdALASATQAIAKAPAGQgtgOAKgSg");
	this.shape_3.setTransform(-26.7894,-47.0979,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3360));

	// Layer_12
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AgEgSQAKgSAKgBIgLARIgGAPQgHAKgDAMIgDAVQgEgjAOgVg");
	this.shape_4.setTransform(37.9877,-53.2356,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3360));

	// Layer_13
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBBF9A").s().p("AgWBGIgLgDIgIhfIAIAKQAHAHgBgSQgBgYALgLQAKgKAPAGQAmANgFA3QgFA8gjAJQgFACgHAAIgLgBg");
	this.shape_5.setTransform(37.7787,-52.2597,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3360));

	// Layer_15
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#292929").s().p("AAsAOQgNgKgKgEQgjgTgtAjQAFgIAKgIQATgOAZgCQAagBAUARQAJAHAEAIQgCACgDAAQgEAAgGgDg");
	this.shape_6.setTransform(-47.4466,-77.6473,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3360));

	// Layer_16
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("Ag7AAQATgWAjAAQAdABAbAPQAOAGAIAHQg9gfglARQggAagPADg");
	this.shape_7.setTransform(-0.5261,-78.1415,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3360));

	// Layer_19
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EBBF9A").s().p("AhJEVQgtgNguhCQgqg8gIgwIgDhIQgCgjgXgeQgXggAVhBQAfhOANgmIA0gQQA+gKAzAgQAnAaAQgFIAAgHQADgLAEAEQADADgDAGQgDAEgEABQACARAaAXQATARAxAnQAYAVAMAoQAHAYAKAvIAIAJQAIAGgBgRQgBgYAMgMQALgLAPAEQApALgJA9QgIBDgiAHQgLACgMgDIgKgFIAAAAQgEAfgOAZQgQAbgfAYQgfAZgnAWQg8AkgmAAQgKAAgIgDg");
	this.shape_8.setTransform(-5.237,-56.7507,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3360));

	// Layer_20
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("AhQCuQh+hjgaikQAQg1AxgsQBjhWCpAzQBVAaAeBhQAVBGgEB+QgDBWhgAlQgdAMgkAFIgdADQg5gRg/gyg");
	this.shape_9.setTransform(1.3298,-91.6058,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3360));

	// Layer_21
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AgfDTQARgmAHgdQAPhGAEg1QAFhDgNg2QgKgsgYgiQgYgigfgQIghgsQAngNAzAJQA2AKAcAeQAPAPAVAfQAQAYgCAIQgDALAMAbQAEAJABAZIAABeIABAXQAAAOgCAJIgNA5QgFASgTAdQghAygXAWQgPAPgyAkQAAgwAKgWg");
	this.shape_10.setTransform(27.8797,-84.3571,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3360));

	// Layer_22
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AARDbQgshGAZhZQAMgrADgvQAFhggwgVQgUAGgTAMQgmAZACAhIgjhsIAbgeQAgghAggPQBmgxA8CVIAJAfQAKAmAFAkQAPBzguA2IghA0QgcA8AWApQgbgRgXgig");
	this.shape_11.setTransform(54.8337,-84.1686,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3360));

	// Layer_23
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DDDCDC").s().p("AhfAcIgFgSQAsgoBTgJQApgEAhADQgHAehHAcIhEAXIgOABQgaAAgKgOg");
	this.shape_12.setTransform(-62.9684,-92.7108,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.4,-154.5,166.8,154.5);


(lib.yuil6t78lt768l7t8l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-8.95,-26.2,1.1631,1.1631,0.3247,0,0,6,-5.4);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(236).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(24).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(200).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(9).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(20).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(10).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(5).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(15).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(590).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(15).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(1310));

	// ghjkdtktuktuykut_copy
	this.instance_1 = new lib.ghjkdtktuktuykutcopy("synched",0);
	this.instance_1.setTransform(3.05,-55.2,0.7068,0.7013,0,11.7068,10.7163,-7.9,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3360));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AATAcQgEgUgLgRIgMgYQgHgNgJgOQAIABALAMQAHAJAGAJQAXAjgHA3IgFghg");
	this.shape.setTransform(-52.4584,-53.7842,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3360));

	// Layer_6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8F6F50").s().p("AANBcQgsgMgXhPQgPgzANgZQALgVAbAEQAYADAVAUQAVAVgBAZQgBASAIAAQAEABAFgEIgJBfQgMAHgNAAQgHAAgJgCg");
	this.shape_1.setTransform(-52.5423,-54.0194,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3360));

	// Layer_7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgWBrQgUgGgUgZQgUgaAIAIIAMANIANgNQAiAcAOgEQAUgJASgaQAjgygRhUIADgOQAFgMAGALQACAEAEAXQAEAggDAeQgIBbhKAdIgGABIgKgBg");
	this.shape_2.setTransform(-24.6083,-98.2825,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3360));

	// Layer_8
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("ABLDIIAlglQA2gkgFg7QgBgTgHgTIgHgPQgLghg+gIIg7gBQgmAShDgdQglgQgmgaIgCgCQghgTgHgcIgBgXQALgLAkgOIAigMQBMgXBEAeQAiAPATAUQBiAsAfBjQAPAxgEApQgNBRg+AYQgTAIgWABg");
	this.shape_3.setTransform(25.6971,-101.3871,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3360));

	// Layer_9
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D342E").s().p("AgHBnQAOgvgTgzIgWgpQABgPgNgiIgOgfIBEgDQAjAKAMBFQAHAigBAfIg0Bfg");
	this.shape_4.setTransform(53.6782,-90.9655,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3360));

	// Layer_10
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("Ag0gHQAVhbBaAPIgDAGIABAbQAAAggGAYQgWBRhTAAQgIgxAKgtg");
	this.shape_5.setTransform(-24.5586,-102.6944,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3360));

	// Layer_12
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AgKAXQgIgIABgPQAAgOAKgIQAJgJAQAHQgYADgCAVQgBAWAYADQgHADgGAAQgHAAgFgFg");
	this.shape_6.setTransform(3.0808,-39.5306,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3360));

	// Layer_13
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#604A3E").s().p("AgRAYQAZAAABgWQABgWgYgGQAPgFAKALQAIAJgBAOQgBAPgJAHQgFADgFAAQgHAAgIgEg");
	this.shape_7.setTransform(18.3125,-38.5905,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3360));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("Ag6AWQAEgMAKgLQATgXAZABQAaABATAWQAKAMAEALQgsgigjARIgXAPQgFADgFAAQgDAAgCgCg");
	this.shape_8.setTransform(36.8748,-76.8505,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3360));

	// Layer_17
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("AA7AWQgTgLgMgFQgvgVg7AfQAGgLAMgKQAagWAiABQAiACAaAYQANANAGAMQgDACgDAAQgGAAgIgFg");
	this.shape_9.setTransform(-10.6543,-78.8007,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3360));

	// Layer_21
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8F6F50").s().p("AgaD3IhGgnQg5gsgJhEQgSAKgXgGQgtgLgXhQQgPgzANgYQALgVAbADQAZADAUAVQAWAVgBAZQgBARAIAAQAEABAEgEQALgvAHgXQAMgpAYgVQAggbAFgVQADgMgHgbQgIgeAigRQAngUA1AmQBMA2BIgVQAkgKAVgVQAWBDACAtQADA6gaAiQgWAeADAlQAEA9gDANQgHAtgvA4QgxA5guAOQgKADgMAAQglAAg5gbg");
	this.shape_10.setTransform(-8.3439,-55.6477,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3360));

	// Layer_22
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D342E").s().p("AAqAPQhHgyhQgPIAAgOQBTAQBLA1QAmAbAXAYIgJAJQgWgYglgag");
	this.shape_11.setTransform(-46.1617,-76.0017,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3360));

	// Layer_23
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D342E").s().p("AAtAOQhNg0hSgNIABgNQBWAOBOA2QApAcAWAZIgJAIQgWgYgmgbg");
	this.shape_12.setTransform(-45.0457,-83.2553,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3360));

	// Layer_24
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D342E").s().p("AAtAOQhMg0hTgNIABgNQBWAOBPA2QAoAcAXAZIgJAIQgXgYgmgbg");
	this.shape_13.setTransform(-44.437,-90.0524,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3360));

	// Layer_25
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("AArAPQhKg0hQgOIADgMQBTAPBMA1QAmAbAXAYIgKAIQgVgXgmgag");
	this.shape_14.setTransform(-44.082,-97.2554,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3360));

	// Layer_26
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("AAvANQhQg2hXgLIAEgNQBZAMBSA4QApAcAYAaIgJAJQgXgagpgbg");
	this.shape_15.setTransform(-41.1907,-101.6177,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3360));

	// Layer_27
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("AAyAKQhWg4hcgHIAFgNQBeAIBYA6QAsAeAaAcIgKAJQgZgcgsgdg");
	this.shape_16.setTransform(-38.1979,-105.7771,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3360));

	// Layer_28
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("AA2AIQhcg7hhgCIAGgNQBjAFBcA8QAvAdAbAeIgJAJQgcgdgtgeg");
	this.shape_17.setTransform(-35.0022,-109.8858,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3360));

	// Layer_29
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("AA4AGQhgg8hlABIAIgNQBmABBgA/QAxAeAcAfIgJAIQgcgfgxgeg");
	this.shape_18.setTransform(-31.6037,-113.9946,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3360));

	// Layer_30
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#453B33").s().p("AiZDsQh1gogDhWQgGiSASg/QAghwBvggQCpgwCBBtQBBA3AeBAQgaCkiSBfQhJAwhCAPQg6gDg7gUg");
	this.shape_19.setTransform(-12.3574,-92.8816,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3360));

	// Layer_31
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("AglBWQgTgigCgxQgCgxAQgjQAPgkAZgBQAXgBATAiQATAiACAxQADAxgQAkQgQAjgZABIgBAAQgXAAgSghg");
	this.shape_20.setTransform(45.1039,-86.9582,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-145.3,136.8,145.3);


(lib.ioy79y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_31
	this.instance = new lib.gjkfujyulicopy("single",1);
	this.instance.setTransform(2.6,-29.4,0.6461,0.6461,0.2016,0,0,17.4,-12);

	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(-4.55,-56.7,0.7203,0.7203,-2.1136,0,0,13.2,2.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{startPosition:0}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{startPosition:28}},{t:this.instance}]},28).to({state:[{t:this.instance_1,p:{startPosition:30}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:32}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:34}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:36}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:38}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:40}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:42}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:44}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:46}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:48}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:50}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:53}},{t:this.instance}]},3).to({state:[{t:this.instance_1,p:{startPosition:0}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:2}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:4}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:6}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:8}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:10}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:12}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:14}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:16}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:18}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:20}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:22}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:32}},{t:this.instance}]},10).to({state:[{t:this.instance_1,p:{startPosition:34}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:36}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:38}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:40}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:42}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:46}},{t:this.instance}]},4).to({state:[{t:this.instance_1,p:{startPosition:48}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:50}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:52}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:54}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:1}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:3}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:5}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:7}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:9}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:11}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:13}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:15}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:17}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:19}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:21}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:23}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:25}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:27}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:29}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:31}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:33}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:35}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:49}},{t:this.instance}]},14).to({state:[{t:this.instance_1,p:{startPosition:51}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:53}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:0}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:2}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:4}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:6}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:8}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:10}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:12}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:14}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:16}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:18}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:20}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:22}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:24}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:26}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:29}},{t:this.instance}]},3).to({state:[{t:this.instance_1,p:{startPosition:31}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:33}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:35}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:37}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:39}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:41}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:43}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:45}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:47}},{t:this.instance}]},2).to({state:[{t:this.instance_1,p:{startPosition:53}},{t:this.instance}]},1876).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},26).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},26).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},22).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).wait(18));
	
	var _tweenStr_1 = cjs.Tween.get(this.instance).wait(28).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(1876).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(26).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(26).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2);
	this.timeline.addTween(_tweenStr_1.to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(22).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(18));

	// hkjdtykukuk
	this.instance_2 = new lib.hkjdtykukuk("synched",0);
	this.instance_2.setTransform(-4.55,-56.7,0.7203,0.7203,-2.1136,0,0,13.2,2.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2090).to({_off:false},0).wait(1270));

	// Layer_14
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AgKATQARgCgBgRQgBgPgSgCQAYgLACAcQACAVgOAAQgEAAgHgCg");
	this.shape.setTransform(-10.7697,-41.7964,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3360));

	// Layer_15
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0A07E").s().p("AgMACQgCgcAZAHQgRAFAAAPQABAQASAAQgIAEgFAAQgLAAgBgTg");
	this.shape_1.setTransform(-20.3854,-41.0105,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3360));

	// Layer_16
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AAhBfQgOgbAIgSQgHgBgCgKQgBgLgCgFIgHgKQgEgFABgFQgKABgFgLQgCgFAAgPQgKgCgGgKQgGgLADgKQgNgCgHgNQgHgNAFgMIgCgBQARAAAKANIAGAIQAEAEAGAEIAhAUQAKAGAEAEQAHAHAFASQAKAjgBAQIgDAXIgJAtIgCAAQgFAAgEgHg");
	this.shape_2.setTransform(21.6461,-76.6216,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3360));

	// Layer_17
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("ACiBUQgHAAgKgGQgNgIgHgMQgIgNAGgMQgGAFgIgGQgIgHAEgHQgFAEgHgCQgIgCgBgHQgGAJgMADQgMADgKgEQgGgDgEAAQgCABgGAGQgHAFgJABQgJAAgFgGQgCAMgNAFQgNAGgJgIQgGAOgGADQgEADgGAAQgGgBgCgFQgFAGgIABQgIACgIgEQgOgHgEgSQgEALgPAAQgHAAgPgIQgZgNgHgLQgGgJAAgJQAAgMAHgGIAHgCQAKgRAJgFQAGgDAIABQAIACADAGQAKgEALABQALACAJAGQAIgNARgCQARgBALALQgBgKAJgIQAJgHALgBQAHAAANABQAOACAHgBQAKgBAVgKQATgJAMABQALAAATAIIAfAOQAMAFAHAGQAMAJAJAZQAVA4gUAdQgKAPgPAAIgBAAg");
	this.shape_3.setTransform(-9.1974,-103.4282,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3360));

	// Layer_18
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("ADtDPQgahtg4hbQgSgdgPgNQgUgRgfgGQgUgEglgBQgiAAgVAFQgfAIgPAWQgIAOgFAHQgNARgdAHIgzAIQgLADgDAGIAAACQgPAHgPgKQgQgKgBgSQgJgJgDgOQgDgOAFgNQAEgNALgIQALgIANABQgCgNAEgNQAEgMAJgIQAJgIAMgCQAMgCALAFQgEgRANgOQANgOAQAFQALgcALgHQAIgGAKACQALACAEAJQAOgRAWgFQAWgGASAKQAHAEAEAAQADAAAFgCQANgEAQADQAKACATAHQAKAEAEAEIAJAHQAGAEARgCQAPgBAMAHQAOAIAAAOQAIgDAIACQAJABAGAGQAPAMgEAWQASACAMASQALASgEAUQgBAJABACQACAEAHAFQAEAEgBAJIgDAQQgBAJAEALIAHAVQADAMgBAKQgBANgIAFQAPAggIARIgEAJQAAAFAEAKQAFAKgCAFQgBACgDADIgEAGQgBAEADAJQACAJgDAKQgDAKgHAFIgFACQgGAAgDgMg");
	this.shape_4.setTransform(3.1061,-107.1824,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3360));

	// Layer_19
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0A07E").s().p("AgFgWQANgXAMgBQgIALgFAKIgJASQgIANgDAPIgEAaQgGgoASgdg");
	this.shape_5.setTransform(38.9802,-53.666,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3360));

	// Layer_20
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AgZBCIgFgFIgHhJIAHADQAGgBgBgOQgBgTANgOQAMgOAOABQAnABgWBNQgSA+gWABIgCAAQgGAAgHgFg");
	this.shape_6.setTransform(36.9716,-52.5984,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3360));

	// Layer_23
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("AArAOQgNgHgJgDQgjgLgrAXIANgQQATgPAZgBQAZAAATAQQAKAHAEAIIgFACQgEAAgGgDg");
	this.shape_7.setTransform(-38.429,-72.001,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3360));

	// Layer_24
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("AhNASIATgSQAagRAhgBQAhgBAZAQQANAHAFAIQg5gWgvAOIgeAMQgIADgFAAIgHgBg");
	this.shape_8.setTransform(8.2886,-73.2854,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3360));

	// Layer_25
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B289").s().p("AgbELQgqgOgrg5Qgrg3gGgsQgCgNADg7QACglgTgdQgYgiADg5QACgsAUhCIANAMQASANAUAGQBBAUBDg1QAxglAjATQAeARgHAdQgGAbACAMQAFAVAdAbQAVAUALAoQAGAXAKAuIADBHIAEAXQgIBEgzArQgbAUgjASQg1AaggAAQgLAAgJgCg");
	this.shape_9.setTransform(-8.0793,-54.7168,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3360));

	// Layer_26
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AhcDBQiChegYigIAVgnQAcgtAkghQB0hsCYAvQBjAfAdBuQAQA/gFCPQgDBVhpAnQghAMgnAGIghAEQg7gOhCgvg");
	this.shape_10.setTransform(5.163,-91.3555,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3360));

	// Layer_27
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BEBB89").s().p("AgFB3QgCAGgHACQgHACgGgDQgJgGgFgQQgNAGgNgKQgNgJACgOQgIAEgKgEQgKgFgCgJQgCgKAGgIQAGgJAKAAQgGgdATgUQAJgJANgFQANgFANACQgBgWASgPQARgQAVAEQADgXAXgOQAXgNAWAIIADgEQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABgBQAAAAABAAQABAAAAABQAAAAABAAQAAABAAAAQACADgBAEQgEAhgSBTQgQBHgEAqQgBAOgZADIgSACQgUAAgIgKg");
	this.shape_11.setTransform(-36.8227,-121.4352,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3360));

	// Layer_28
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("Aj6B2IACgDQgKgNACgPQABgJAGgGQAHgHAIACQgEgZALgXQAMgXAUgKQACgOANgHQANgGAKAIQAIgYAKgMQAPgSASAFQANgcAUgGQALgEAMAFQAMAGADAMQAEgJAJgEQAJgDAIAFIAKAGQAGABAMgHQAMgHAFAEIAHAIQAFAFALgBQAOAAAEABIALAHQAGAEAEgBQAFgBAHgFQAHgDAHAGQAHAGgBAJQAIgIALAKIAHAIQAEAFADACQAEADAIABIALADQAGADADAGQADAHgEAEQAiARAMAPQAIAKADAKQAEANgCANQgCAOgIALQgIALgLAFQgMAGgMgCQgLgBgDABIgGAEIgHAGQgKAIgVgCIgjgCIgaAFQgPADgKgCQgGgBgRgIQgOgHgIABIgVAGQgQAEgPgFQgLgDgEAAQgEABgLAHQgKAHgPACQgKABgRgBQg3gBghgFQgegFgLALIAEAEg");
	this.shape_12.setTransform(-5.2531,-135.8589,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3360));

	// Layer_29
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AgLA/QgIgFgGgHQgCAEgGABQgFABgEgEQgHgGACgNQgMgEgCgOQgDgOAJgHQgFAAgEgEQgEgFAAgFQABgJAJgIIABgCQAEgFAGgCIAHgCQAGgBAIgIQAEgCALgCQASgEAKAAQAUABAQAQQAPAQABAUQAAALgGAAQAGAFgEAMQgEAMgGAFQgEADgFAAQgFABgEgEQACAGgDAHQgEAGgGACQgJAFgQgCQACAGgGABIgBAAQgEAAgDgCg");
	this.shape_13.setTransform(-44.6738,-102.6127,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3360));

	// Layer_30
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AgfCBIgYgIQgOgNgEgKQgGgMACgYIAEhJQABgUAEgLQAJgSAOACQgDgYAFgMQAEgIAIgEQAJgEAGAGQABgNAKgHQAHgGAUAAQAbAAAEAPIgCABQAOAGAFATQAFATgLANQAIADAEAJQADAJgBAJQgCANgNATQAIACABAKQACAKgFAHQgHAMgVAEQABALgHAJQgHAJgKAAQgBAKgIAHQgHAIgIABQgEAYgMABIgBABIgIgCg");
	this.shape_14.setTransform(43.128,-56.0907,2.029,2.029);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-160,118,160);


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

	// o_8y0_80_
	this.instance = new lib.o8y080("synched",0);
	this.instance.setTransform(224.75,-6.4,1,1,0,0,0,0,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// uil7tl7t8
	this.instance_1 = new lib.uil7tl7t8("synched",0);
	this.instance_1.setTransform(241.95,120.55,1,1,0,0,0,-7,-7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// Layer_51
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#606163").p("AfQfQMg+fAAAMAAAg+fMA+fAAAg");
	this.shape.setTransform(-76.2629,-124.1862,2.0295,2.0295);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3360));

	// uil_78l78l
	this.instance_2 = new lib.uil78l78l("synched",0);
	this.instance_2.setTransform(-214.55,104.75,1,1,0,0,180,8,10.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(209).to({skewY:0,x:-49.35},0).wait(1863).to({skewY:180,x:-214.55},0).wait(1288));

	// uk67kr67k
	this.instance_3 = new lib.uk67kr67k("synched",0);
	this.instance_3.setTransform(-179.7,-13,1,1,0,0,180,14.5,16);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(209).to({skewY:0,x:-84.2},0).wait(1863).to({skewY:180,x:-179.7},0).wait(1288));

	// iu_l7l_87tl7t8
	this.instance_4 = new lib.iul7l87tl7t8("synched",0);
	this.instance_4.setTransform(-375.9,-21.25,1,1,0,0,0,14,12.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// io_8y_y89_
	this.instance_5 = new lib.io8yy89("synched",0);
	this.instance_5.setTransform(-405.2,100.65,1,1,0,0,0,10.7,13.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// uilt7lt78lt
	this.instance_6 = new lib.Bitmap3();
	this.instance_6.setTransform(-585,149);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(3360));

	// Layer_57
	this.instance_7 = new lib.Bitmap4();
	this.instance_7.setTransform(6,152);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(3360));

	// io_y7_9y89_
	this.instance_8 = new lib.ioy79y89("synched",0);
	this.instance_8.setTransform(191.9,-50.15,1,1,0,0,0,19.2,-13.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(209).to({startPosition:209},0).wait(1863).to({startPosition:2072},0).wait(1288));

	// uoi_8y9_y89_98_
	this.instance_9 = new lib.uoi8y9y8998("synched",0);
	this.instance_9.setTransform(162,209.55,1,1,0,0,0,-14.5,-60.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// Layer_61
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#444444").s().p("AgeBVIgakhIA4ECIA6CXg");
	this.shape_1.setTransform(148.303,202.753,2.0292,2.0292);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3360));

	// ui_79_7t9_
	this.instance_10 = new lib.Bitmap7();
	this.instance_10.setTransform(90,178);

	this.instance_11 = new lib.ui797t9("synched",0);
	this.instance_11.setTransform(206.9,215,1,1,0,0,0,0.8,18.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_11}]},209).to({state:[{t:this.instance_11}]},1863).wait(1288));

	// uio_t79_t79
	this.instance_12 = new lib.uiot79t79("synched",0);
	this.instance_12.setTransform(144.35,222.5,1,1,0,0,0,8.8,44.8);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(209).to({_off:false},0).wait(1863).to({startPosition:0},0).wait(1288));

	// ui_y89_89_
	this.instance_13 = new lib.uiy8989("synched",0);
	this.instance_13.setTransform(138,-14.9,1,1,0,0,0,-6,10.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// io_8y0_y80_
	this.instance_14 = new lib.io8y0y80("synched",0);
	this.instance_14.setTransform(133,109.1,1,1,0,0,0,-17.1,11.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// Layer_66
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DBB381").s().p("AhVirIBQADIB4FRIjlADg");
	this.shape_2.setTransform(-300.6113,178.5038,2.0292,2.0292);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3360));

	// yuil6t78lt768l7t8l
	this.instance_15 = new lib.yuil6t78lt768l7t8l("synched",0);
	this.instance_15.setTransform(-339.75,-59,1,1,0,0,0,-7,-3.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(209).to({startPosition:209},0).wait(1863).to({startPosition:2072},0).wait(1288));

	// oiu_y89_89
	this.instance_16 = new lib.Bitmap5();
	this.instance_16.setTransform(-410,161);

	this.instance_17 = new lib.oiuy8989("synched",0);
	this.instance_17.setTransform(-358.4,179.35,1,1,0,0,0,13,-0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16}]}).to({state:[{t:this.instance_17}]},209).to({state:[{t:this.instance_17}]},1863).wait(1288));

	// ui_7yt9_y89_
	this.instance_18 = new lib.ui7yt9y89("synched",0);
	this.instance_18.setTransform(-349.7,182.55,1,1,0,0,0,-8,99);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// iu_lt7l8t7l
	this.instance_19 = new lib.iult7l8t7l("synched",0);
	this.instance_19.setTransform(-315.9,188.55,1,1,0,0,0,-15.1,27.7);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(209).to({_off:false},0).wait(1863).to({startPosition:0},0).wait(1288));

	// yulkt76l87l876l
	this.instance_20 = new lib.yulkt76l87l876l("synched",0);
	this.instance_20.setTransform(-311.2,-32.75,1,1,0,0,0,-2,9.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// oiu_8y9_y89_
	this.instance_21 = new lib.oiu8y9y89("synched",0);
	this.instance_21.setTransform(-294.45,87.5,1,1,0,0,0,20.9,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// ui_7_t7_
	this.instance_22 = new lib.ui7t7("synched",0);
	this.instance_22.setTransform(-360.75,-185.2,1,1,0,0,0,19.9,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(209).to({startPosition:0},0).wait(1863).to({startPosition:0},0).wait(1288));

	// yuil7t8lt78l
	this.instance_23 = new lib.yuil7t8lt78l("synched",0);
	this.instance_23.setTransform(-155.35,-69.75,1,1,0,0,180,18.9,-24.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(209).to({skewY:0,x:-108.55,startPosition:209},0).wait(1863).to({skewY:180,x:-155.35,startPosition:2072},0).wait(1288));

	// o_89y_89_y89_
	this.instance_24 = new lib.o89y89y89("synched",0);
	this.instance_24.setTransform(-128.75,178.75,1,1,0,0,180,-9.1,110);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(209).to({skewY:0,x:-135.15},0).wait(1863).to({skewY:180,x:-128.75},0).wait(1288));

	// op_8y9_y89_89
	this.instance_25 = new lib.Bitmap6();
	this.instance_25.setTransform(-206,136);

	this.instance_26 = new lib.op8y9y8989("synched",0);
	this.instance_26.setTransform(-100,205.2,1,1,0,0,0,-4,55.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_25}]}).to({state:[{t:this.instance_26,p:{skewY:0,x:-100}}]},209).to({state:[{t:this.instance_26,p:{skewY:180,x:-163.9}}]},1863).wait(1288));

	// ui_l7ty_t7_97
	this.instance_27 = new lib.uil7tyt797("synched",0);
	this.instance_27.setTransform(-154,182.9,1,1,0,0,0,11,46.6);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(209).to({_off:false},0).wait(1863).to({skewY:180,x:-109.9},0).wait(1288));

	// ui_y89_y8_89
	this.instance_28 = new lib.uiy89y889("synched",0);
	this.instance_28.setTransform(-101.9,-29.95,1,1,0,0,180,6,2.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(209).to({skewY:0,x:-162},0).wait(1863).to({skewY:180,x:-101.9},0).wait(1288));

	// ui_y7_y79_
	this.instance_29 = new lib.uiy7y79("synched",0);
	this.instance_29.setTransform(-87.95,97.65,1,1,0,0,180,-12.4,12.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(209).to({skewY:0,x:-175.95},0).wait(1863).to({skewY:180,x:-87.95},0).wait(1288));

	// Layer_14
	this.instance_30 = new lib.Bitmap1();
	this.instance_30.setTransform(-570,-541);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-585,-541,1168,1071);


(lib.gfyjfjcf = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ilt78lt78l("synched",0);
	this.instance.setTransform(-0.1,-0.35,1,1,0,0,0,-0.1,-0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-585,-541,1168,1071);


(lib.uilkt78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// frame
	this.instance = new lib.gfyjfjcf("synched",0);
	this.instance.setTransform(87.7,134.4,1,1,0,0,0,-0.1,-0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(153).to({regX:0,regY:-0.2,scaleX:1.9962,scaleY:1.9962,x:-202.45,y:117.65,startPosition:153},0).wait(56).to({regX:0.1,scaleX:2.1352,scaleY:2.1352,x:615.95,y:199.75,startPosition:209},0).wait(393).to({regY:-0.1,scaleX:2.8596,scaleY:2.8596,x:357.7,y:248.65,startPosition:602},0).wait(179).to({regX:0,regY:-0.2,scaleX:1.6117,scaleY:1.6117,x:335.9,y:100.55,startPosition:781},0).wait(440).to({regX:0.1,regY:-0.1,scaleX:2.6912,scaleY:2.6912,x:864.3,y:244.65,startPosition:1221},0).wait(102).to({regX:0,regY:-0.2,scaleX:2.0269,scaleY:2.0269,x:255.85,y:192.5,startPosition:1323},0).wait(229).to({regY:-0.4,scaleX:1.9182,scaleY:1.9182,x:453.9,y:175.9,startPosition:1552},0).wait(520).to({regX:-0.1,regY:-0.3,scaleX:1,scaleY:1,x:87.7,y:134.4,startPosition:2072},0).wait(199).to({regX:0,regY:-0.2,scaleX:1.8744,scaleY:1.8744,x:-278.35,y:79,startPosition:2271},0).wait(1089));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1374.8,-1298.2,3807.8,3061.5);


// stage content:
(lib.m4l3_part1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,502,1329,2072,2945,3359];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:502,loop:1,offset:0}];
	this.streamSoundSymbolsList[502] = [{id:"audio2",startFrame:502,endFrame:1329,loop:1,offset:0}];
	this.streamSoundSymbolsList[1329] = [{id:"audio3",startFrame:1329,endFrame:2072,loop:1,offset:0}];
	this.streamSoundSymbolsList[2072] = [{id:"audio4",startFrame:2072,endFrame:2945,loop:1,offset:0}];
	this.streamSoundSymbolsList[2945] = [{id:"audio5",startFrame:2945,endFrame:3360,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,502,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_502 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,502,1329,1);
	}
	this.frame_1329 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,1329,2072,1);
	}
	this.frame_2072 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,2072,2945,1);
	}
	this.frame_2945 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,2945,3360,1);
	}
	this.frame_3359 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(502).call(this.frame_502).wait(827).call(this.frame_1329).wait(743).call(this.frame_2072).wait(873).call(this.frame_2945).wait(414).call(this.frame_3359).wait(1));

	// Layer_4
	this.instance = new lib.uilkt78l78l("synched",0);
	this.instance.setTransform(389.75,390.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3360));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-585.1,-508.1,3407.7999999999997,2661.5);
// library properties:
lib.properties = {
	id: '6F53CC10F2C81940927BA93AF8372292',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_48.png", id:"CachedBmp_48"},
		{src:"images/CachedBmp_44.png", id:"CachedBmp_44"},
		{src:"images/CachedBmp_43.png", id:"CachedBmp_43"},
		{src:"images/CachedBmp_41.png", id:"CachedBmp_41"},
		{src:"images/CachedBmp_40.png", id:"CachedBmp_40"},
		{src:"images/CachedBmp_39.png", id:"CachedBmp_39"},
		{src:"images/CachedBmp_37.png", id:"CachedBmp_37"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/m4l3_part1_atlas_1.png", id:"m4l3_part1_atlas_1"},
		{src:"images/m4l3_part1_atlas_2.png", id:"m4l3_part1_atlas_2"},
		{src:"images/m4l3_part1_atlas_3.png", id:"m4l3_part1_atlas_3"},
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