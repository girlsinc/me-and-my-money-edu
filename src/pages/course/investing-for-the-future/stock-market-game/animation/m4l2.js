(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m4l2_atlas_1", frames: [[273,277,60,63],[0,336,59,63],[415,128,413,62],[335,277,60,63],[415,0,417,62],[955,106,13,20],[167,287,60,63],[933,322,60,63],[415,64,417,62],[970,106,13,20],[762,330,60,63],[61,336,59,63],[0,151,413,62],[985,106,12,21],[0,0,413,149],[933,258,61,62],[397,340,54,55],[273,215,81,60],[834,106,119,80],[824,330,71,53],[167,215,104,70],[589,336,59,60],[453,340,51,52],[356,215,57,58],[933,188,67,68],[650,336,59,60],[506,340,50,50],[415,192,172,146],[589,192,171,142],[762,192,169,136],[0,215,165,119],[834,0,163,104]]},
		{name:"m4l2_atlas_2", frames: [[419,743,413,149],[0,797,417,149],[326,592,417,149],[326,0,428,294],[326,296,428,294],[0,0,324,397],[0,399,324,396]]},
		{name:"m4l2_atlas_3", frames: [[0,379,485,299],[487,379,485,299],[0,0,437,377],[439,0,437,377],[0,680,424,309],[426,680,424,309]]},
		{name:"m4l2_atlas_4", frames: [[0,0,850,917]]},
		{name:"m4l2_atlas_5", frames: [[0,0,850,917]]},
		{name:"m4l2_atlas_6", frames: [[0,0,791,988]]}
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



(lib.CachedBmp_183 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_182 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_181 = function() {
	this.initialize(img.CachedBmp_181);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,995,2356);


(lib.CachedBmp_180 = function() {
	this.initialize(img.CachedBmp_180);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,996,2355);


(lib.CachedBmp_179 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_178 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_177 = function() {
	this.initialize(ss["m4l2_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_176 = function() {
	this.initialize(img.CachedBmp_176);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3930,1353);


(lib.CachedBmp_175 = function() {
	this.initialize(img.CachedBmp_175);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,995,2355);


(lib.CachedBmp_191 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_173 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_172 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_190 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_169 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_189 = function() {
	this.initialize(ss["m4l2_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_167 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_188 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_164 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_163 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_162 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_161 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_187 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_159 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_158 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_186 = function() {
	this.initialize(ss["m4l2_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_185 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_170 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_184 = function() {
	this.initialize(ss["m4l2_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(img.CachedBmp_148);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,818,1005);


(lib.CachedBmp_147 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(img.CachedBmp_146);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,893,2264);


(lib.CachedBmp_145 = function() {
	this.initialize(img.CachedBmp_145);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,881,2282);


(lib.CachedBmp_144 = function() {
	this.initialize(img.CachedBmp_144);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5168,4678);


(lib.CachedBmp_143 = function() {
	this.initialize(img.CachedBmp_143);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,881,2281);


(lib.CachedBmp_142 = function() {
	this.initialize(img.CachedBmp_142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,996,2356);


(lib.CachedBmp_141 = function() {
	this.initialize(img.CachedBmp_141);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,818,1005);


(lib.CachedBmp_140 = function() {
	this.initialize(ss["m4l2_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(img.CachedBmp_139);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,881,2281);


(lib.CachedBmp_138 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_137 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["m4l2_atlas_1"]);
	this.gotoAndStop(31);
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


(lib.yjr5j5re6j = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_177();
	this.instance.setTransform(-77.4,-0.05,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.4,0,154.7,193.2);


(lib.yj56j5e6j = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_176();
	this.instance.setTransform(-384.3,-132.45,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-384.3,-132.4,768.4000000000001,264.5);


(lib.uilt76l8t7 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#323A4F").s().p("Ah0GaQgZgNgIgcQgIgcALgcIAAAAQAIhaA6mUQgHgvAVg1IABgFIABAAQAFgNAFgJQAgg9AwgeQAwgdAmATQAlATAEA5QAEA5gfA9IgMAVIgDAJQgkBXgnDDQgXBygTCAIgDATIgBAAIgGANQgPAdgeAMQgNAFgNAAQgPAAgOgHg");
	this.shape.setTransform(0.0131,82.7508,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.4,0,60.9,165.5);


(lib.uil7tlt78 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_148();
	this.instance.setTransform(0,-0.05,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,196.5);


(lib.uil7ty8lt7l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#DCB783").s().p("AhbJyQAFgpgEkBIgFkrQAAg/gOhUQgDgYgXh6QgIgsAAg4QAAhMAfhDQAbg5A8hFIAJAGQAFACgEAGIgJAKQgCAEgJALIgLAOQgOAZgCAIQgGASAIAOQAwBUAMBhQAFAkAGBKQAJA/AXAnQAKAQATAVIAfAkQAmAsADAmQABAVgHAYQgFAQgNAbQgEAJgJDhQgJDhgEAKQgHAPgHAGQgGAFgNAEQgrAOgqAAQgiAAghgIg");
	this.shape.setTransform(-41.3144,125.7502,1.9834,1.9834);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DCB783").s().p("AAAG0QhogOgtAGQgBgVAHiCQAHiGAFgRQAKghgCg/IgFhoQgBg7AHgsQANhQAthGQAthGBDguQAMgIAHABQAGAAAEAEQAEAFgBAFIgOgDQATAvgJBCQgEAggWBUQgQA7AFBCQAFA3AWBEIAGAZQADAQAEAIQAGAPAeCnQAdCoAGAPQgeAAh4gQg");
	this.shape_1.setTransform(40.151,145.3774,1.9834,1.9834);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.9,0,139.9,251.5);


(lib.uiy7989 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#916E50").s().p("AAiBGIgYgcQgSAAgWgEQgtgIgRgVQgXgbgEgLQgGgQANgPIA+gTQA+gTAHACQANADAeAfQAlAnAOAnQAOAngRgSIgUgaIATAcQASAegIAIQgIAIgWgeIgVgeQAiA6gHAHQgHAHgthBIAVAgQATAggMABIAAAAQgNAAgYgbg");
	this.shape.setTransform(64.4908,120.4666,1.983,1.983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A73A37").s().p("AhmE4Qg1g9BHknQAch1AihYQAhhcAVgGQAigLAiETQAQCIAKCLIgTBsQghAZgrAOQgdAJgYAAQgwAAgggkg");
	this.shape_1.setTransform(24.8852,68.9723,1.983,1.983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,88.6,139.9);


(lib.oiuy789y8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_147();
	this.instance.setTransform(-63.45,0,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.4,0,63.3,77.6);


(lib.oy89y89y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_146();
	this.instance.setTransform(-87.3,-221.35,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.3,-221.3,174.6,442.6);


(lib.oy8989 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_145();
	this.instance.setTransform(-86.15,-223.15,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.1,-223.1,172.2,446.2);


(lib.o78989 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#9D8A93").s().p("AALC4IhUgOQgLgzgQg1IgNgrQg0hhAahAQAIgVAPgOQAHgIAGgDQB2gIA7B3QAeA7AGA7IAnBuQglAehJAAIgcgBg");
	this.shape.setTransform(29.4321,36.6265,1.983,1.983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("ABbGHQgdgIgRgbIgHgMIgBAAIgEgSQgbhvghh2Qg2i4gphRIgEgIIgNgTQgjg4gBg3QAAg3AigWQAjgVAyAYQAxAYAjA4IALAVIACAAIABAEQAYAygCAtQBZGIAOBNIgBABQAOAagGAbQgGAcgXAOQgQAJgRAAQgKAAgLgDg");
	this.shape_1.setTransform(35.9766,81.5319,1.983,1.983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70.8,159.7);


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


(lib.iul7t8lt87l87tl = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_144();
	this.instance.setTransform(-505.4,-457.4,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-505.4,-457.4,1010.5,914.7);


(lib.iopu800u9 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#8E3533").s().p("AAPG5QgSgHgTgTIgQgRQgVgUgIjpIgCkHQhDjiAjhJQALgWAUgFQAKgCAIACQCIBGAMEhQADBDgECNQgEBrAIAZQAGAUADA2QAHAVgBAVQgeBLgtAAQgLAAgNgFg");
	this.shape.setTransform(22.6198,88.5075,1.9834,1.9834);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45.3,177);


(lib.iodrtyh = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_143();
	this.instance.setTransform(-86,-223,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-223,172.3,446);


(lib.ioy8989yy89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_142();
	this.instance.setTransform(-97.4,-230.4,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.4,-230.4,194.8,460.70000000000005);


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
	this.instance = new lib.CachedBmp_141();
	this.instance.setTransform(0,-0.05,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,196.5);


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
	this.shape.graphics.f("#A94242").s().p("AALC4IhUgOQgLgzgQg1IgNgrQg0hgAahBQAIgVAPgOIANgLQB2gHA7B2QAeA7AGA8IAnBuQglAdhIAAIgdgBg");
	this.shape.setTransform(29.4493,36.6134,1.983,1.983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("ABcGHQgdgIgSgbIgGgNIgBABIgFgTQgahvghh1Qg2i4gqhRIgDgIIgOgTQgjg5gBg2QAAg4AjgVQAjgWAxAZQAyAYAiA4QAGAIAGAMIABAAIABAFQAZAygDAtQBYGBAPBUIAAAAQANAbgGAbQgGAbgXAOQgQAKgRAAQgKAAgKgDg");
	this.shape_1.setTransform(35.9442,81.5658,1.983,1.983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,70.8,159.9);


(lib.io8y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_140();
	this.instance.setTransform(-63.4,-0.05,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.4,0,63.4,77.4);


(lib.io8uy89y = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_139();
	this.instance.setTransform(-86,-223,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-223,172.3,446);


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
	this.instance = new lib.CachedBmp_138();
	this.instance.setTransform(1.55,0.9,0.1224,0.1224);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(1.6,0.9,7.4,7.6), null);


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
	this.instance = new lib.CachedBmp_137();
	this.instance.setTransform(1.55,0,0.1224,0.1224);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_0, new cjs.Rectangle(1.6,0,6.6,6.8), null);


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
	this.shape.graphics.f("#F2F0F3").s().p("AhIARQgTgqAYgXQAVgUAwAAQAVAAAVAEQATAEAFADQAUAPgKAuQgOA6g3AHIgLAAQgvAAgXg0g");
	this.shape.setTransform(8.1685,6.9423);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_0, new cjs.Rectangle(0.1,0,16.2,13.9), null);


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
	this.shape.graphics.f("#F2F0F3").s().p("AgHBFQg3gHgPg6QgLgtAVgQQAFgEATgDQAVgEAVAAQAvAAAXAUQAKALACANQADARgLAYQgXA0guAAIgLAAg");
	this.shape.setTransform(8.192,6.9423);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,16.4,13.9), null);


(lib.Path_1_0_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_1.graphics.f("#F2F0F3").s().p("AgOBGQg3gIgKg+QgJguAdgRQAMgGASgBQAUgBAWAGQAVAGATAJQASAIAEAFQAQAUgWApQgKASgPAMQgUARgaAAIgMgBg");
	this.shape_1.setTransform(8.2027,7.1012);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_0_1, new cjs.Rectangle(0,0.1,16.4,14.1), null);


(lib.Path_1_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_1.graphics.f("#F2F0F3").s().p("AgdBDQgggNgMgdQgHgSAAgUQAAgvAZgKQAGgCATABQAVABAUAGQAwAMAPAZQAIANgBANQgCAQgRAWQgdAjghAAQgOAAgPgFg");
	this.shape_1.setTransform(8.0793,7.2428);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,16.2,14.5), null);


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

	this.instance = new lib.CachedBmp_135();
	this.instance.setTransform(-5.95,-2.6,0.0744,0.0744);

	this.instance_1 = new lib.CachedBmp_136();
	this.instance_1.setTransform(-5.65,-1.9,0.0744,0.0744);

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

	this.instance = new lib.CachedBmp_133();
	this.instance.setTransform(-5.95,-2.6,0.0852,0.0852);

	this.instance_1 = new lib.CachedBmp_134();
	this.instance_1.setTransform(-5.65,-1.9,0.0852,0.0852);

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
	this.shape_5.graphics.f("#7B5944").s().p("AiEhGIENg4QgJBCASAsIikAwQg5AvgEAwQhfg0AqiRg");
	this.shape_5.setTransform(-6.3329,-1.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7B5944").s().p("AiCg/IEShHIgDCXIiDAxIhXBFQhfg0AqiSg");
	this.shape_6.setTransform(-6.5079,-2.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7B5944").s().p("AiDhKIEUgxIgFCaQgOA9hNARIh/APQhfg0AqiSg");
	this.shape_7.setTransform(-6.4079,-1.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#7B5944").s().p("Ag6CAQh5hKAqiSIEPgtQAdB9gdAYQgNA9g9AtQgfAUgiAAQgZAAgcgKg");
	this.shape_8.setTransform(-5.8442,0.306);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7B5944").s().p("AiShLIENgvQBHCQhEAIQgOA9hNARIh/APQhfg0ApiSg");
	this.shape_9.setTransform(-4.9902,-1.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7B5944").s().p("AiLhGIELg4QAuB7gqANIiCAwIhXBFQhfg0ApiRg");
	this.shape_10.setTransform(-5.6891,-1.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#7B5944").s().p("AiGhKIEPgxQARBEgKAkIikAvQg5AwgEAwQhfg0AqiSg");
	this.shape_11.setTransform(-6.1465,-1.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5}]}).to({state:[{t:this.shape_6}]},34).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.9,-16.1,36.599999999999994,30.900000000000002);


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
	this.shape_4.graphics.f("#7B5944").s().p("AiFAvIhOiEQCVgdCLAdQB6AyANCIQiiiRi3Bbg");
	this.shape_4.setTransform(-0.575,-4.2327);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7B5944").s().p("AAfAzQhlAsg/gwIhOiEQCVgdCLAdQB6AyANCIQhlg3hQAFg");
	this.shape_5.setTransform(-0.575,-4.2327);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7B5944").s().p("AAYB1Qhegpg/gRIhOijQCVgeCLAeQB6AyANCIQhOAmhHAAQgUAAgTgDg");
	this.shape_6.setTransform(-0.575,-2.314);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7B5944").s().p("AiJBRIhKjWQCVgdCLAdQB6AyANCIQgbBEilAcQhUgIhJg8g");
	this.shape_7.setTransform(-0.575,0.5673);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},34).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.7,-14.3,42.4,31.1);


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
	this.instance = new lib.CachedBmp_132();
	this.instance.setTransform(3.05,0,0.1109,0.1109);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3copy2, new cjs.Rectangle(3.1,0,6.5,6.7), null);


(lib.ClipGroup_3copy = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_131();
	this.instance.setTransform(3.05,0,0.1276,0.1276);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3copy, new cjs.Rectangle(3.1,0,6.5,6.7), null);


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
	this.instance = new lib.CachedBmp_130();
	this.instance.setTransform(2.1,0,0.1009,0.1009);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.1,0,5.800000000000001,5.6), null);


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
	this.instance = new lib.CachedBmp_129();
	this.instance.setTransform(7.35,0.5,0.1086,0.1086);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0copy2, new cjs.Rectangle(7.4,0.5,7.299999999999999,7.4), null);


(lib.ClipGroup_1_0copy = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_128();
	this.instance.setTransform(7.35,0.5,0.124,0.124);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0copy, new cjs.Rectangle(7.4,0.5,7.299999999999999,7.5), null);


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
	this.instance = new lib.CachedBmp_127();
	this.instance.setTransform(2.95,0,0.1009,0.1009);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(3,0,5,4.9), null);


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
	this.instance = new lib.CachedBmp_122();
	this.instance.setTransform(3.75,-6.9,0.1342,0.1342);

	this.instance_1 = new lib.CachedBmp_123();
	this.instance_1.setTransform(3.4,-7,0.1342,0.1342);

	this.instance_2 = new lib.CachedBmp_124();
	this.instance_2.setTransform(2.85,-7.05,0.1342,0.1342);

	this.instance_3 = new lib.CachedBmp_125();
	this.instance_3.setTransform(2.6,-7,0.1342,0.1342);

	this.instance_4 = new lib.CachedBmp_126();
	this.instance_4.setTransform(2.45,-7,0.1342,0.1342);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AgMA6QgVgIgDgXQgCgWADgRQAFgSANgPQAOgPAWADQAOAJADATQADATgBANQgCAjgNALQgKAJgQAAIgJAAgAAAAVQAIAJAGgMQAGgLgIgeQgTAVAHAXg");
	this.shape.setTransform(18.2479,0.631);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#971B30").s().p("AgHAVQgHgXATgVQAIAegGALQgDAGgEAAQgDAAgEgDg");
	this.shape_1.setTransform(18.9013,0.6476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgdAbQgpgVgNguQBAAwBngYQgKAVgFAOIgIAVIgZABQgkAAgdgOg");
	this.shape_2.setTransform(14.05,-1.5765);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgfATQgogUgMgmQBAAvBngXQgKAUgFAPIgIAVQg2gBgmgVg");
	this.shape_3.setTransform(14.05,-1.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhKAMQgagjAHgoQAQAgASAPQASAPAcANQAcANAGAEQAGAEAAAIQAAAHgMALQgKALgFAEQgwgZgaglgAA5AHIAAgBIgDAAQgrgDgggQQgngVgMgnQBAAxBngYQgKAVgFAPIgIATIgPAAg");
	this.shape_4.setTransform(12.9508,1.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggHANABQAUADAJALIAFAHIACACIgQAYg");
	this.shape_5.setTransform(13.85,4.8183);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F7919F").s().p("AgbAEIgLgdQAhgBAMADQAUAGAIANIACAHIACADIgTAUg");
	this.shape_6.setTransform(13.4,5.6375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7919F").s().p("AgcABIgHgeQAhAEAMAFQASAJAGANIABAIIABADIgWARg");
	this.shape_7.setTransform(12.55,5.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// Layer_4
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#971B30").s().p("Ag2AhIgehkIA8A/QAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAIABgBIAJgFIACgCIAJgEIABgDIAIgDIAEAAIAIgEIAKgCIADgCIA0gLIgGAXQgMAZgFAdQgGAdAJADg");
	this.shape_8.setTransform(12.425,-0.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#971B30").s().p("Ag2AeIgehkIA8BAQAAAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAIABgBIAJgEIACgDIAJgEIABgCIAIgDIAEAAIAIgFIAKgCIADgBIA0gLIgGAXQgOAZgHAdQgHAdAIAIg");
	this.shape_9.setTransform(12.425,0.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#971B30").s().p("Ag2AbIgehkIA8BAQAAAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAIABgBIAJgEIACgDIAJgEIABgCIAIgDIAEAAIAIgFIAKgCIADgBIA0gLIgGAXQgSAagLAfQgMAgANAIg");
	this.shape_10.setTransform(12.425,0.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.5,-7,23.2,19.6);


(lib.y798y9 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#323A4F").s().p("AA9DsQgdgNgOgeIgBgCQhYi2hUjCIAugTIBVglIgFAMQgEASAIAfQAYBjCCC8QAMANAHAOQANAegJAeQgJAegbAMQgNAGgOAAQgOAAgOgGg");
	this.shape.setTransform(-30.997,-48.1731,1.9831,1.9831);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7B5944").s().p("AgYBlQgug/geg8QgKgWAAgHQgBgFAHgEQAIgEAYAoQAXAlAAgCQADgGgthIQgNgVACgLQABgFAHgEQAGgCAFAGQAKAKAUAmQAhA/gEgZQgBgHgVgpIgZgwIgJgRQgEgKAGgHQAMgPAbA6QAdA7ABgBQAEgDgfhYQgHgUAMgEQANgFAIAWQAhBmATAhQAKARAJAAQAFAAgOggIgTguIgJgbQgEgPAJgBQAPAAAYAzQAuBugDAqQgDAvhAAbIgEABQgTAAgtg/g");
	this.shape_1.setTransform(-64.3128,-116.1094,1.9831,1.9831);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.4,-148.6,86.30000000000001,148.5);


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
p.nominalBounds = new cjs.Rectangle(-42.7,-8.6,87.1,17.4);


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
	this.instance.setTransform(32.35,-2.1,1,1,15.1875);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_4
	this.instance_1 = new lib.fghndfgmjdhj("synched",0);
	this.instance_1.setTransform(-29.3,3.45,0.972,0.9999,0,-1.225,-2.4536,-0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AjRgiQAGg4BngGQBzgGB2BfQhEBmiMACIgEAAQiNAAALiDg");
	mask.setTransform(-21.0351,8.974);

	// _Clip_Group__1_0
	this.instance_2 = new lib.ClipGroup_1_0copy();
	this.instance_2.setTransform(-23.3,9,1.8118,1.8639,0,-1.2248,-2.4544,10.6,4.3);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// Layer_9 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AgTAmIgbggQAbgnAogXQBTgxBiA6IgTA7QgRA5hHAJIgVACQg5AAgkgqg");
	mask_1.setTransform(20.2215,3.676);

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3copy();
	this.instance_3.setTransform(29.95,3.6,1.8123,1.8123,15.1872,0,0,5.5,4.3);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoAhIgPgNQAIgVAQgRQAggiA3APIgBAgQgFAfgfAMQgNAEgLAAQgSAAgRgJg");
	this.shape.setTransform(27.5625,3.2569,2.023,2.023,15.1875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	// Layer_7
	this.instance_4 = new lib.fgyjrtyj5sewkjew4("synched",0);
	this.instance_4.setTransform(-25.9,9.95,0.972,0.9999,0,-1.225,-2.4536,-0.2,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.5,-15.9,99.2,36.1);


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
	this.instance_2.setTransform(-26.6,-45.9,1,1,0,0,0,6.2,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(5.2,-46.6,1,1,0,0,0,8.8,4.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


(lib.yult678lt78l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(3.1,-191.65,1.2302,1.2302,0.3255,0,0,6,-5.2);

	this.instance_1 = new lib.CachedBmp_182();
	this.instance_1.setTransform(-25.55,-235.55,0.1955,0.1955);

	this.instance_2 = new lib.CachedBmp_183();
	this.instance_2.setTransform(-25.55,-235.55,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},672).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},1099).to({state:[{t:this.instance}]},56).to({state:[{t:this.instance_2}]},1284).wait(63));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(672).to({startPosition:6},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(10).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(17).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).to({_off:true},1099).wait(56).to({_off:false},0).to({_off:true},1284).wait(63));

	// Layer_2
	this.instance_3 = new lib.ghjkdtktuktuykutcopy("synched",0);
	this.instance_3.setTransform(14.95,-227.85,0.8717,0.8649,0,11.7084,10.7169,-7.9,7.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},2029).wait(56).to({_off:false,startPosition:35},0).to({_off:true},1284).wait(63));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DE7739").s().p("Ag3AFQAOgSAvgJQAZgFAVgBIADAcQgYAAgqAOIgnAPg");
	this.shape.setTransform(-54.8436,-86.6277,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3432));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#604A3E").s().p("AAXAjQgEgZgPgVIgPgeQgIgQgMgSQAKABAOAPQAKALAGAMQAeAtgJBDQgEgbgDgOg");
	this.shape_1.setTransform(-52.8005,-227.0437,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3432));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#916E50").s().p("AARBzQg4gPgdhjQgShAAQgfQAOgaAiAEQAeAEAZAZQAcAbgCAfQgCAWALABQAFAAAFgEIgKB3QgPAIgRAAQgJAAgKgCg");
	this.shape_2.setTransform(-52.9376,-227.3624,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3432));

	// Layer_9
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AhcJeQgRgEgQgMQgOgMgKgSQgQgfAAgsQAAgUAFgLIAGgJQgFgMgFgdQgIgtgCgYQgDgnAHgeQAJgkAZgaQgshUAthsQg4gwgRhQQgOhBALhcQAIhFAFgXQAKgwAVgkQA1hcADgDQAigwAvgKQAigIAqAIQAeAHAuASQAhAMAQAQIAPAHIAfADIgEB5QgDApgLAlQgkB1hhAiIgcDKIBeBzIgHAxQgMA2gXAXQATAxAGAkQAIAvgMAmQgJAagVAXQAAASgNAXQgUAiggAYQgfAXglAJQgOADgMAAIgOgBg");
	this.shape_3.setTransform(-51.7781,-207.0377,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3432));

	// Layer_10
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AgfB1QgUgIgWgZQgbgggHgeIB4iNQAUgGAVAKQAUAKAMASQATAcACA2QABApgNAZQgMAXgeASQggAUgaAAQgNAAgNgFg");
	this.shape_4.setTransform(-46.9034,-182.2606,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3432));

	// Layer_11
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("AgcCGQgYgHgaggQgZggAKAJIAPAQIAQgPIAYARQAaAQALgDQAZgMAWggQAsg/gWhpQACgKADgIQAGgPAHAOQADADAEAfQAGAogDAlQgLBzhdAkQgEACgEAAQgFAAgHgCg");
	this.shape_5.setTransform(-18.7776,-281.3864,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3432));

	// Layer_12
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("ABeD6IAuguQBDgtgFhKQgCgYgJgXIgIgTQgOgphNgKIhLgCQgvAXhUglQgxgVgsggIgEgCQgogYgKgiIgBgeQAPgNAtgSQAXgJATgGQBfgdBVAmQArATAYAZQB6A3AnB8QATA9gFAzQgRBmhNAeQgYAKgbABg");
	this.shape_6.setTransform(42.7048,-285.2918,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3432));

	// Layer_13
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D342E").s().p("AgJCBQASg6gYhBIgcgyQACgUgRgqIgSgnIBXgDQArAMAQBWQAHAqgBAnIhBB2g");
	this.shape_7.setTransform(76.8576,-272.5103,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3432));

	// Layer_14
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("AhBgJQAahyBwATIgEAHIACAjQAAAngIAeQgbBlhoAAQgKg9ANg4g");
	this.shape_8.setTransform(-18.6833,-286.8101,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3432));

	// Layer_17
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("AgMAdQgLgLABgSQABgSAMgKQAMgLAUAIQgfAEgCAbQgCAcAgAEQgJADgIAAQgJAAgGgGg");
	this.shape_9.setTransform(15.0582,-209.5908,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3432));

	// Layer_18
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("AgWAeQAgAAABgcQABgbgegIQATgGAMANQALAMgBASQgBASgMAJQgGAFgHAAQgJAAgKgGg");
	this.shape_10.setTransform(33.6687,-208.4769,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3432));

	// Layer_19
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#604A3E").s().p("AhJAcQAGgPAMgOQAYgeAfACQAhABAYAcQAMAPAFAOQg3grgtAWQgLAGgRAMQgHAEgFAAQgEAAgDgCg");
	this.shape_11.setTransform(56.3686,-255.2063,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2029).to({regX:7,regY:1.9,scaleX:1.9832,scaleY:1.9832,rotation:12.2235,x:70.3,y:-251.4},0).wait(56).to({regX:0,regY:0,scaleX:1.9833,scaleY:1.9833,rotation:0,x:56.3686,y:-255.2063},0).wait(1284).to({regX:7,regY:2.1,rotation:18.7462,x:70.25,y:-251.05},0).wait(63));

	// Layer_20
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#604A3E").s().p("ABIAcQgWgOgOgHQg8gahKAnQAIgOAQgMQAfgbArABQAqABAgAfQARAQAHAPQgDACgEAAQgIAAgLgFg");
	this.shape_12.setTransform(-1.6918,-257.5811,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2029).to({regX:-9.2,regY:1.1,rotation:-12.4366,x:-19.95,y:-255.3},0).wait(56).to({regX:0,regY:0,rotation:0,x:-1.6918,y:-257.5811},0).wait(1284).to({regX:-9.9,regY:1.6,rotation:-13.9456,x:-21.35,y:-254.3},0).wait(63));

	// Layer_23
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#916E50").s().p("AhEJlIithgQiPhtgUirQgtAag5gOQhwgdg5jGQgliAAhg9QAcg0BCAJQA+AIAyAyQA3A2gEA8QgDAsAVACQAJAAALgIQAah2ARg6QAehkA8g0QBPhFAMgyQAIgfgRhDQgIgdAQgiQATgjAlgSQBggyCGBeQC9CFCzgyQBZgZA0g1QA1CnAHBvQAICPhABWQg3BIAGBfQAJCWgGAiQgSBuh0CLQh5CPhzAiQgYAIgfAAQhbAAiQhDg");
	this.shape_13.setTransform(1.1537,-229.2522);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3432));

	// Layer_24
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("AA1AUQhbhAhigUIAAgQQBnAUBfBCQAvAhAcAeIgLALQgbgdgugfg");
	this.shape_14.setTransform(-45.1256,-254.165,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3432));

	// Layer_25
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("AA4ASQhfhChngRIABgPQBqARBkBEQAxAiAdAgIgMAKQgbgegwghg");
	this.shape_15.setTransform(-43.7373,-263.0401,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3432));

	// Layer_26
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("AA4ARQhfhBhogRIADgQQBqARBjBFQAyAiAcAfIgLALQgcgegwgig");
	this.shape_16.setTransform(-43.0431,-271.3203,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3432));

	// Layer_27
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("AA2ATQhchBhkgSIADgPQBnASBgBCQAwAiAbAfIgLALQgbgegvggg");
	this.shape_17.setTransform(-42.5969,-280.1459,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3432));

	// Layer_28
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("AA7AQQhlhEhsgOIAFgPQBvAOBnBGQA0AkAeAgIgMALQgdgggzgig");
	this.shape_18.setTransform(-39.1262,-285.4512,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3432));

	// Layer_29
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D342E").s().p("AA/ANQhshHhzgJIAGgPQB1AKBuBJQA3AlAhAjIgLAKQghgig2gkg");
	this.shape_19.setTransform(-35.4075,-290.6077,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3432));

	// Layer_30
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("ABDAKQhzhKh5gDIAIgQQB7AGB0BMQA6AlAiAlIgMALQgiglg5glg");
	this.shape_20.setTransform(-31.4905,-295.665,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3432));

	// Layer_31
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3D342E").s().p("ABGAHQh4hLh/ABIALgQQB/ACB4BOQA9AmAkAmIgMALQgjgng9gmg");
	this.shape_21.setTransform(-27.3257,-300.6232,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(3432));

	// Layer_32
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#453B33").s().p("Ai/EnQiTgygEhrQgHi3AXhPQAniMCLgoQDUg8CiCJQBRBEAmBRQgiDMi2B3QhbA8hTASQhJgDhJgZg");
	this.shape_22.setTransform(-3.7902,-274.8439,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(3432));

	// Layer_33
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3D342E").s().p("AgvBsQgYgrgCg+QgDg8AUgtQAUgtAegBQAegBAYArQAXAqADA+QADA8gUAtQgUAtgfABIgBAAQgdAAgXgpg");
	this.shape_23.setTransform(66.4337,-267.5548,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(3432));

	// Layer_34
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#7D5C40").s().p("AAxBiQhAgNg6gwQgTgPgSgyQgMghgHgjIAIgFIA1AcQA+AhArAeQCQBehPASIgOAAQgRAAgWgEg");
	this.shape_24.setTransform(-2.3811,-175.7316,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(3432));

	// Layer_35
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#453B33").s().p("AgfErQAngjAZgwQAZgvAHg1QgSAngLATQgTAfgVATQgZAXggAHQgjAIgbgPQA8geAlhCQAig8AHhKQAGg9gLhNQgIgxgUhYIBsgtQASBUAHA8QAKBQgBBCQgECkhMBxQgPAWgUALQgLAHgLAAQgJAAgJgFg");
	this.shape_25.setTransform(-67.5172,-60.3594,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(3432));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.8,-338.9,189.7,338.9);


(lib.yulkyl68l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// yult678lt78l
	this.instance = new lib.yult678lt78l("synched",0);
	this.instance.setTransform(4.1,-143.75,1,1,0,0,0,0,-169.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3432));

	// ui_y7989_
	this.instance_1 = new lib.uiy7989("synched",0);
	this.instance_1.setTransform(-38.5,-93.95,1,1,0,0,0,35,4.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3432));

	// o_y89_y89_y89_
	this.instance_2 = new lib.oy89y89y89("synched",0);
	this.instance_2.setTransform(25.3,54.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3432));

	// io_y8989y_y89_
	this.instance_3 = new lib.ioy8989yy89("synched",0);
	this.instance_3.setTransform(-15.3,82.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3432));

	// iop_u800u9_
	this.instance_4 = new lib.iopu800u9("synched",0);
	this.instance_4.setTransform(44.85,-115.35,1,1,0,0,0,6.4,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3432));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.7,-313.2,225.3,626.2);


(lib.yuilt678l8t7l = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(15.9,-32.35,2.2958,2.2207,0,-5.3406,175.0066,2.8,-2.8);

	this.instance_1 = new lib.CachedBmp_178();
	this.instance_1.setTransform(-9.05,-95.55,0.1955,0.1955);

	this.instance_2 = new lib.CachedBmp_179();
	this.instance_2.setTransform(-9.05,-95.55,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1346).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},630).to({state:[{t:this.instance}]},47).to({state:[{t:this.instance}]},1001).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},65).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_2}]},18).wait(72));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1346).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).to({_off:true},630).wait(47).to({_off:false},0).wait(1001).to({startPosition:13},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(8).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(11).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(65).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).to({_off:true},18).wait(72));

	// ilt78lt78lt78
	this.instance_3 = new lib.ilt78lt78lt78("synched",0);
	this.instance_3.setTransform(20.7,-68.65,0.9671,0.9671,0,0,180,10.5,3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},2027).wait(47).to({_off:false,startPosition:24},0).to({_off:true},1286).wait(72));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#796A6A").s().p("AhtANQgJgFgEgIIgCgGQAcARAxgGQATgDA2gOQAogLA7ABQglAEg2ASIguARQgfAGgXAAQgcAAgPgKg");
	this.shape.setTransform(23.0113,-126.0281,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3432));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#796A6A").s().p("ADQA2IADgWQgpg9hyALQgjAEg9ANQhDANgXADQhtAOAChOQAAgLAPgZIAOgXIgDAUQgCAZAFASQAQA6BOgYQBpggB6AEQCEAEgHAyQgHAtgUAdIgTAUQAKgbAGgcg");
	this.shape_1.setTransform(38.3187,-134.0986,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3432));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("ACHBzIglgJQi6APhPhCQgYgVgLgaIgGgVQhFgHAQg0QAFgQAMgTQAGgJAGgGQCthlCZBDQBuAxAzBeQAbAwgsBQIgyBFQgNgxgogUg");
	this.shape_2.setTransform(36.1908,-132.1689,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3432));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEA840").s().p("AgHAIQgEgDAAgFQAAgEAEgDQADgEAEAAQAFAAADAEQAEADAAAEQAAAFgEADQgDAEgFAAQgEAAgDgEg");
	this.shape_3.setTransform(-34.8999,-47.0334,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3432));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AAGApQAVgWgjgOQgFgFgEgKQgIgWAGgbIADAXQAFAZALANIAVATQAKAWg0ARg");
	this.shape_4.setTransform(38.5781,-54.4706,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3432));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D5AE90").s().p("AAOAVQgDgPgIgMQgIgTgNgSQALABANAVQAQAbgFAmIgDgXg");
	this.shape_5.setTransform(-36.3216,-61.5608,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3432));

	// Layer_13
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EBBF9A").s().p("AAABSQgqgMgGhGQgDgfANgXQAMgUASgHQARgGAMALQAOAMgCAdQgBAVAJgHQAEgEAFgIIgKBwQgMAFgNAAQgIAAgHgCg");
	this.shape_6.setTransform(-36.0803,-60.3464,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3432));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AhFARIAQgSQAXgTAeABQAeABAXASQAMAJAFAJQg1gpgpAWIgbARQgGAEgFAAQgEAAgDgDg");
	this.shape_7.setTransform(62.4782,-89.7115,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).to({_off:true},2027).wait(47).to({_off:false},0).to({_off:true},1286).wait(72));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("AA9ALQgTgOgLgGQgsgUhIAmIAZgRQAhgSAjAAQAoAAAXAaQAMANADAOQgJgDgQgNg");
	this.shape_8.setTransform(8.236,-90.2685,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).to({_off:true},2027).wait(47).to({_off:false},0).to({_off:true},1286).wait(72));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBBF9A").s().p("AgzEgIhSg4QglgbgTghQgQgdgFglQgSAMgUgFQgpgJgKhPQgFgiANgZQAKgVAUgFQASgFANANQAPAPgCAcQgBAVAJgIQAEgDAFgHQAMg5AJgbQAOgwAdgZQAcgYA0gpQAfgcACgUQgFgBgDgFQgFgGAFgFQAEgEADANIABAIQASAHAvgfQA8gmBKALQAlAGAZANQAOAtAmBdQAYBMgbAlQgbAkgCAqIgEBWQgJA4gyBHQg3BOg0AQQgKADgMAAQgsAAhJgrg");
	this.shape_9.setTransform(13.6753,-65.5834,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3432));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AieEFQhxgrgDhmQgGiWAZhSQAkhyBlgfQDHg9B1BmQA7AzATBAQggDBiVB2QhKA7hDAUQg3gCg5gWg");
	this.shape_10.setTransform(6.1048,-105.8627,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3432));

	// Layer_21
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AgbEPQgcgagmg7QgXgjgGgUIgPhEQgDgKABgQIABgcQgBhUABgaQACgeAEgMQAOgfgEgNQgCgJATgdQAXgjAUgUQAhgjBAgLQA8gLAuAPIgmA0QglASgcApQgdAogMA0QgQBAAGBQQAFA+ASBUQAHAhAVAtQAMAbAAA4Qg7grgSgSg");
	this.shape_11.setTransform(-24.6436,-97.4985,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3432));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AhVDIIgng9Qg2hBARiIQAGgrAMgsIALglQBGiwB5A6QA8AdAvBAIgoB/QADgngugdIgugWQg5AZAGBxQADA4AOAzQAeBqg0BRQgbApggAUQAagwghhHg");
	this.shape_12.setTransform(-55.7989,-97.3249,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3432));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88.7,-168.6,177.5,168.6);


(lib.ukr6k67k = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ghjdtjtyktyktut("single",0);
	this.instance.setTransform(-2.35,-29.25,1.4567,1.4567,0,-0.3247,179.6753,6,-5.2);

	this.instance_1 = new lib.CachedBmp_186();
	this.instance_1.setTransform(-24.35,-79.2,0.1955,0.1955);

	this.instance_2 = new lib.CachedBmp_156();
	this.instance_2.setTransform(-13.95,-74.65,0.1955,0.1955);

	this.instance_3 = new lib.Path_1_0_1();
	this.instance_3.setTransform(-0.55,-63.75,1.9643,1.9643,-14.5793,0,0,9.3,8);
	this.instance_3.alpha = 0.5;

	this.instance_4 = new lib.CachedBmp_155();
	this.instance_4.setTransform(-56.95,-74.5,0.1955,0.1955);

	this.instance_5 = new lib.Path_1_1();
	this.instance_5.setTransform(-43.4,-64.55,1.9643,1.9643,-14.5793,0,0,9.2,7.7);
	this.instance_5.alpha = 0.5;

	this.instance_6 = new lib.CachedBmp_185();
	this.instance_6.setTransform(-62.35,-77.45,0.1955,0.1955);

	this.instance_7 = new lib.CachedBmp_170();
	this.instance_7.setTransform(-27.5,-69.35,0.1955,0.1955);

	this.instance_8 = new lib.CachedBmp_152();
	this.instance_8.setTransform(-62.3,-77.45,0.1955,0.1955);

	this.instance_9 = new lib.CachedBmp_184();
	this.instance_9.setTransform(-83.2,-179.65,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},14).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},21).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},294).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},170).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},18).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},15).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},164).to({state:[{t:this.instance}]},42).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[]},301).wait(159));
	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(14).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(21).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(294).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2);
	var _tweenStr_1 = _tweenStr_0.to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(170).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(18).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).to({_off:true},164).wait(42).to({_off:false},0).wait(1).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2);
	this.timeline.addTween(_tweenStr_1.to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).to({_off:true},301).wait(159));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#444444").s().p("AgHAHQAAgOgHgIIAOABQAPAFAAAUQgEADgEACIgDAAQgGAAgFgJg");
	this.shape.setTransform(55.9767,-76.3012,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#444444").s().p("Ag6gBIB1gbIgIAHQgJALgGALIheAcg");
	this.shape_1.setTransform(30.6403,-72.4288,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_7
	this.instance_10 = new lib.CachedBmp_162();
	this.instance_10.setTransform(-13.55,-72.55,0.1955,0.1955);

	this.instance_11 = new lib.Path_1_0();
	this.instance_11.setTransform(3,-58.75,1.9811,1.9811,0,0,0,9.5,7.7);
	this.instance_11.alpha = 0.5;

	this.instance_12 = new lib.CachedBmp_161();
	this.instance_12.setTransform(-56.95,-72.55,0.1955,0.1955);

	this.instance_13 = new lib.Path_1();
	this.instance_13.setTransform(-41.1,-58.75,1.9811,1.9811,0,0,0,9.1,7.7);
	this.instance_13.alpha = 0.5;

	this.instance_14 = new lib.CachedBmp_187();
	this.instance_14.setTransform(-62.05,-75.25,0.1955,0.1955);

	this.instance_15 = new lib.CachedBmp_159();
	this.instance_15.setTransform(-26.9,-67.05,0.1955,0.1955);

	this.instance_16 = new lib.CachedBmp_158();
	this.instance_16.setTransform(-61.75,-75.1,0.1955,0.1955);

	this.instance_17 = new lib.CachedBmp_167();
	this.instance_17.setTransform(-13.7,-72.6,0.1955,0.1955);

	this.instance_18 = new lib.CachedBmp_167();
	this.instance_18.setTransform(-57.1,-72.6,0.1955,0.1955);

	this.instance_19 = new lib.CachedBmp_188();
	this.instance_19.setTransform(-62.15,-75.3,0.1955,0.1955);

	this.instance_20 = new lib.CachedBmp_164();
	this.instance_20.setTransform(-26.95,-67.1,0.1955,0.1955);

	this.instance_21 = new lib.CachedBmp_163();
	this.instance_21.setTransform(-61.8,-75.15,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13,p:{regX:9.1,regY:7.7,scaleX:1.9811,scaleY:1.9811,x:-41.1,y:-58.75}},{t:this.instance_12},{t:this.instance_11,p:{regY:7.7,scaleX:1.9811,scaleY:1.9811,x:3,y:-58.75}},{t:this.instance_10}]}).to({state:[]},2029).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_13,p:{regX:9.2,regY:7.9,scaleX:1.9808,scaleY:1.9808,x:-44.45,y:-63}},{t:this.instance_18},{t:this.instance_11,p:{regY:7.9,scaleX:1.9808,scaleY:1.9808,x:-1.2,y:-63}},{t:this.instance_17}]},42).to({state:[]},1286).wait(159));

	// ghjkdtktuktuykut
	this.instance_22 = new lib.ghjkdtktuktuykut("synched",0);
	this.instance_22.setTransform(-13.65,-63.95,0.8457,0.8391,0,-11.7084,169.2821,-8,7.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).to({_off:true},2029).wait(42).to({_off:false,startPosition:21},0).to({_off:true},1286).wait(159));

	// Layer_9
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#604A3E").s().p("AgFgZQAPgZAMgBQgIAMgGAMQgGAMgEAHQgJAPgEARIgEAcQgGguAUgfg");
	this.shape_2.setTransform(44.9305,-61.3727,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_10
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7B5944").s().p("AgkBpIgIgEIgKhrIAKAEQAJgBgBgUQgCgbATgaQASgXAVgFQAXgFAIAWQAKAbgRA6QgaBZghAQQgHADgGAAIgIgBg");
	this.shape_3.setTransform(43.7198,-60.4588,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3A3633").s().p("Ah8DAQgUgBgXgUQgtgngPhbQgIgaAPgjQAchIBugxIAQgNQAUgQAYgKQBMgjBWAbIAmANQAoAQANAMIgBAbQgIAeglAWIgDACQgpAdgqASQhMAggqgTQgUgFgaAEQg0AGgbAhIgPApQgHAtAkAYIAKA7g");
	this.shape_4.setTransform(-38.032,-116.6047,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3A3633").s().p("Ag3AGQgIgbAAgjIACgfIgDgHQBlgRAWBnQAMAzgJA2QhdAAgYhbg");
	this.shape_5.setTransform(16.1089,-113.2726,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_14
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AgQAdQAgAAAAgdQgBgdgjACQASgHALAKQAKAJABAPQABAOgJAJQgHAIgKAAIgLgCg");
	this.shape_6.setTransform(-12.7318,-45.6014,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#604A3E").s().p("AgJAZQgKgHgBgPQAAgNAJgKQALgLARACQgiAJAEAaQADAbAfgGQgIADgHAAQgIAAgHgFg");
	this.shape_7.setTransform(-31.7325,-44.5799,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3A3633").s().p("AAxAXIgagXQgngcgyA6IAQgdQAVgdAdgCQAdgBAVAfQAMAOAEAQQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgGAAgIgIg");
	this.shape_8.setTransform(-51.3135,-85.7671,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3A3633").s().p("AhYAiIAWgiQAdghAmgBQAngBAcAeQAOAOAHAPQhHg6gzAhQgiAkgPAAIgGgBg");
	this.shape_9.setTransform(0.8434,-88.2612,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_22
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7B5944").s().p("AioJaQitg9hTh2Qg3hPgWh+QgFgeAJiFQAFhXgxhBQg6hMAIiBQAFhkAwiWIAiAbQArAcAyAOQChAvCph4QB4hVBXAsQBMAogSBBQgRA9AHAcQAMAsBHA+QA2AvAbBaQAPA0AXBqIASAGQATgBgDgoQgDg1AmgzQAlguAqgKQAugLARAsQATA2giByQgzCyhEAgQgVAKgVgGIgQgIQgMBfgTA1QggBZg/AxQhHAohaAhQh2AshTAAQgqAAghgLg");
	this.shape_10.setTransform(-4.7576,-61.3645);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_23
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3A3633").s().p("AhzDcQijhrgei4IAagsQAjgzAugmQCRh7C+A2QB9AjAjB+QAUBHgGClQgDBgiEAtQgpAOgxAHIgpAEQhLgQhSg2g");
	this.shape_11.setTransform(2.716,-102.5206,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_24
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AgFCGQgbgBgSgoQgSgoACg3QADg3AVgnQAVgmAbABQAbABASAoQASAogDA3QgCA3gVAnQgVAlgZAAIgCAAg");
	this.shape_12.setTransform(-58.6413,-106.0432,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_25
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("AiHCQQg5g8AAhUQAAhTA5g8QA4g7BPAAQBQAAA4A7QA5A8AABTQAABUg5A8Qg4A7hQAAQhPAAg4g7g");
	this.shape_13.setTransform(45.514,-140.5501,1.9832,1.9832);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).to({_off:true},2029).wait(42).to({_off:false},0).to({_off:true},1286).wait(159));

	// Layer_26
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#444444").s().p("Ag6AAIB1gcIgIAIQgJAKgGALIheAcg");
	this.shape_14.setTransform(-50.8673,-72.3296,1.9832,1.9832);

	this.instance_23 = new lib.CachedBmp_191();
	this.instance_23.setTransform(-24.35,-79.2,0.1955,0.1955);

	this.instance_24 = new lib.CachedBmp_173();
	this.instance_24.setTransform(-13.95,-74.65,0.1955,0.1955);

	this.instance_25 = new lib.Path_1_0_1();
	this.instance_25.setTransform(-0.45,-63.85,1.9644,1.9644,-14.5791,0,0,9.2,7.9);
	this.instance_25.alpha = 0.5;

	this.instance_26 = new lib.CachedBmp_172();
	this.instance_26.setTransform(-56.95,-74.5,0.1955,0.1955);

	this.instance_27 = new lib.Path_1_1();
	this.instance_27.setTransform(-43.3,-64.4,1.9644,1.9644,-14.5791,0,0,9.1,7.7);
	this.instance_27.alpha = 0.5;

	this.instance_28 = new lib.CachedBmp_190();
	this.instance_28.setTransform(-62.35,-77.45,0.1955,0.1955);

	this.instance_29 = new lib.CachedBmp_170();
	this.instance_29.setTransform(-27.5,-69.35,0.1955,0.1955);

	this.instance_30 = new lib.CachedBmp_169();
	this.instance_30.setTransform(-62.3,-77.45,0.1955,0.1955);

	this.instance_31 = new lib.CachedBmp_189();
	this.instance_31.setTransform(-83.2,-179.65,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14}]}).to({state:[]},2029).to({state:[{t:this.shape_14}]},42).to({state:[{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23}]},1286).wait(159));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.8,-180.8,167.6,180.8);


(lib.uioy79y8 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.3,-34.3,2.6264,2.5399,0,-5.6147,174.6991,2.4,-3);

	this.instance_1 = new lib.CachedBmp_149();
	this.instance_1.setTransform(-26.45,-78.4,0.1955,0.1955);

	this.instance_2 = new lib.CachedBmp_150();
	this.instance_2.setTransform(-26.45,-78.4,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1412).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},431).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance}]},57).to({state:[{t:this.instance}]},1096).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_2}]},145).wait(184));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1412).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(431).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:12},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).to({_off:true},5).wait(57).to({_off:false},0).wait(1096).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).to({_off:true},145).wait(184));

	// dfggdfgzrs
	this.instance_3 = new lib.dfggdfgzrs("synched",37);
	this.instance_3.setTransform(8.45,-67.8,1.5979,1.5979,0,0.1756,-179.8244,-5.3,-45.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},2022).wait(57).to({_off:false,startPosition:16},0).to({_off:true},1277).wait(184));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AitBhQgegJg0gCIAYiXIBZg1IFVAAIAMAMQANARAKAXQAgBIgPBrQgzAFhPAAIgTABQiRAAiCgWg");
	this.shape.setTransform(15.7713,-112.516,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3540));

	// Layer_10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4AD91").s().p("AAIA1QAYgTgkgaQgHgIgFgOQgLgcAFgYIAEAbQAIAeAQAPIASAbQAIAbg2AHg");
	this.shape_1.setTransform(24.1288,-58.3321,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3540));

	// Layer_11
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4AD91").s().p("AAKAUQgDgOgIgMQgEgIgBgKQgBgKgGgJQAFAAAEAJIAFANQARAagFAnIgDgYg");
	this.shape_2.setTransform(-49.669,-63.8853,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3540));

	// Layer_12
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E5BFA4").s().p("AAABSQgjgMgGhGQgGhAAngQQAOgHALAMQALAMgBAcQgCAVAJgHQAFgEAEgIIgKBwQgKAFgKAAQgHAAgGgCg");
	this.shape_3.setTransform(-49.0677,-62.6642,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3540));

	// Layer_13
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DCB783").s().p("AgcAGIgYAMQgLAEgGgGIASgUQAXgUAeADQAeACAWAVQALALAFAKQg5ghgpAQg");
	this.shape_4.setTransform(45.7131,-88.9621,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3540));

	// Layer_14
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DCB783").s().p("AA7AQQgTgLgKgDQgogLhLAdIAXgUQAfgWAjgDQAogDAZAbQANANAEAOQgLgBgQgJg");
	this.shape_5.setTransform(-7.6371,-90.4905,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3540));

	// Layer_15
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5BFA4").s().p("AhXEnQgVgQgQgWIgMgSQgigZgSgvQgMgfgGguIgIAIQgPAKgRgFQgigMgLhOQgFgjAMgXQALgUATgFQASgEANANQAOAPgCAcQgCAhAJgcQAMg4AIgcQAOgvAdgZQAbgYA1gpQAegbACgUQgFgBgDgFQgEgHAEgEQAEgDAEAMQABAEgBAEQATAGAugeQA7gmBJALQAlAGAZANQAPAtAlBcQAYBMgcAlQgaAiABAqQAABKgBAKQgIAsg2BSQgeAtgZAZQghAhgfAFQgWAEgUAAQhAAAg0gog");
	this.shape_6.setTransform(0.2923,-66.486,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3540));

	// Layer_16
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DCB783").s().p("AicD6QhwgsgEhkQgGiRAZhLQAjhoBlgeQDGg9B0BbQA6AuATA6QgfDAiUB1QguAkgzAZIgrARQg3gBg4gWg");
	this.shape_7.setTransform(-8.4792,-105.9466,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3540));

	// Layer_17
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DCB783").s().p("AgbELQgbgagmg6QgXgigFgVIgPhDQgDgLAAgQIABgbIgBhjQgBgWAEgJQAOgfABgNQABgJAPgdQAHgNAjglQAkglA9gVQA/gWAqANIgmA0QgkASgcAoQgdAogMA0QgQA/AGBQQAFA9ASBTQAIAhAUAuQAMAaAAA3Qg7gqgSgSg");
	this.shape_8.setTransform(-39.0279,-91.889,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3540));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373432").s().p("AgCA7QgPgNgFgPIgGgTIgHgOQgGgJgBgHQgBgGACgPIAHgnQAwAPAUAoQAKAVgBAWQgBAZgNARQgDAEgDgBIADAOQgUgMgIgIg");
	this.shape_9.setTransform(52.6797,-112.0293,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3540));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DCB783").s().p("ACQCvQgPgOgMADQhxAVhpgtQg1gWgeghQgagcgMglQgIgZACgXQABgbAOgTQAIgMAbgVIA+gvIgGgFQAOAAArgOQAhgKAWAHQAaAJA/AOQA3APAYAZQAlAkAXBJQAaBRgiAjQgMANgiAwQgFAHgFAAQgFAAgFgFg");
	this.shape_10.setTransform(21.1234,-120.5308,1.9833,1.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3540));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.7,-160.1,133.4,160.1);


(lib.yul6rt8l86trl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// io__8_y89_
	this.instance = new lib.io8y89("synched",0);
	this.instance.setTransform(84.75,13.1,1,1,0,0,0,-8.5,16.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

	// io_y89_y89_
	this.instance_1 = new lib.ioy89y89("synched",0);
	this.instance_1.setTransform(-59.85,-112.4,1,1,0,0,0,25.8,9.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

	// yuilt678l8t7l
	this.instance_2 = new lib.yuilt678l8t7l("synched",0);
	this.instance_2.setTransform(-6.85,-164.5,1,1,0,0,0,-10.1,-25.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3431).to({startPosition:3431},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(1));

	// io__8u_y89_y_
	this.instance_3 = new lib.io8uy89y("synched",0);
	this.instance_3.setTransform(25.7,47.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

	// io__8y_8y9_
	this.instance_4 = new lib.io8y8y9("synched",0);
	this.instance_4.setTransform(39.2,-121.3,1,1,0,0,0,15.3,1.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

	// Layer_22
	this.instance_5 = new lib.CachedBmp_181();
	this.instance_5.setTransform(-111.9,-153.1,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3431).to({_off:true},1).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-111.9,-307.5,223.9,615.1);


(lib.yul6rt8l6tr8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ukr6k67k("synched",0);
	this.instance.setTransform(39.25,-156.4,1,1,0,0,0,27.5,-24.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3431).to({startPosition:3431},0).to({_off:true},1).wait(1).to({_off:false,startPosition:3433},0).wait(84));

	// Layer_8
	this.instance_1 = new lib.yjr5j5re6j("synched",0);
	this.instance_1.setTransform(68.95,-101.15,1,1,0,0,0,42.9,11.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(84));

	// Layer_7
	this.instance_2 = new lib.y798y9("synched",0);
	this.instance_2.setTransform(-55.6,28.05,1,1,-94.0477,0,0,-11.2,-12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(84));

	// Layer_9
	this.instance_3 = new lib.oy8989("synched",0);
	this.instance_3.setTransform(8.4,70.3,1,1,0,0,0,11,17.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(84));

	// Layer_6
	this.instance_4 = new lib.uilt76l8t7("synched",0);
	this.instance_4.setTransform(-40.7,-111.3,1,1,0,0,0,1.1,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(84));

	// Layer_11
	this.instance_5 = new lib.CachedBmp_180();
	this.instance_5.setTransform(-59.8,-147.75,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3431).to({_off:true},1).wait(1).to({_off:false},0).wait(84));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-312.9,322.1,625.5999999999999);


(lib.ukr67kr67k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uio_y79_y8_
	this.instance = new lib.uioy79y8("synched",0);
	this.instance.setTransform(0.2,-159,1,1,0,0,0,-16.6,-14);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3431).to({startPosition:3431},0).to({_off:true},1).wait(1).to({_off:false,startPosition:3433},0).wait(121));

	// uil_7tlt78
	this.instance_1 = new lib.uil7tlt78("synched",0);
	this.instance_1.setTransform(-56.2,-107.25,1,1,0,0,0,29.4,16.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	// oiu_y789_y8_
	this.instance_2 = new lib.oiuy789y8("synched",0);
	this.instance_2.setTransform(81.45,8.95,1,1,0,0,0,-11.9,14.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	// iodrtyh
	this.instance_3 = new lib.iodrtyh("synched",0);
	this.instance_3.setTransform(-4.05,98.9,1,1,0,0,0,-29.8,54);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	// o_789_89_
	this.instance_4 = new lib.o78989("synched",0);
	this.instance_4.setTransform(43.85,-117.25,1,1,0,0,0,19.9,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	// uil7ty8lt7l
	this.instance_5 = new lib.uil7ty8lt7l("synched",0);
	this.instance_5.setTransform(3.6,-253.85,1,1,0,0,0,-8.8,34.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3431).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	// Layer_14
	this.instance_6 = new lib.CachedBmp_175();
	this.instance_6.setTransform(-111.85,-155.5,0.1955,0.1955);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(3431).to({_off:true},1).wait(1).to({_off:false},0).wait(121));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-111.8,-305.1,223.8,610.1);


(lib.iult7l87l8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.instance = new lib.yj56j5e6j("synched",0);
	this.instance.setTransform(0,348.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3432));

	// Layer_6
	this.instance_1 = new lib.yul6rt8l6tr8l("synched",0);
	this.instance_1.setTransform(243.55,178.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3432));

	// Layer_7
	this.instance_2 = new lib.yulkyl68l("synched",0);
	this.instance_2.setTransform(-299.15,191.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3432));

	// Layer_8
	this.instance_3 = new lib.yul6rt8l86trl("synched",0);
	this.instance_3.setTransform(-140,192.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3432));

	// Layer_9
	this.instance_4 = new lib.ukr67kr67k("synched",0);
	this.instance_4.setTransform(7.8,198.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3432));

	// Layer_10
	this.instance_5 = new lib.iul7t8lt87l87tl("synched",0);
	this.instance_5.setTransform(-86.9,15.65,1,1,0,0,0,-0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3432));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-592.2,-441.7,1010.5,946.3);


(lib.i8y989 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.iult7l87l8("synched",0);
	this.instance.setTransform(0.15,0.1,1.012,1.012,0,0,0,-86.8,31.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(82).to({regX:-86.9,scaleX:2.2394,scaleY:2.2394,x:-566.45,y:20.35,startPosition:82},0).wait(497).to({regX:-86.8,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:579},0).wait(91).to({regY:31.4,scaleX:2.1967,scaleY:2.1967,x:375.75,y:-26.05,startPosition:670},0).wait(263).to({regY:31.5,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:933},0).wait(123).to({regX:-86.7,regY:31.4,scaleX:2.557,scaleY:2.557,x:-684.5,y:80.8,startPosition:1056},0).wait(277).to({regY:31.5,scaleX:1.9647,scaleY:1.9647,x:156.35,y:83.9,startPosition:1333},0).wait(77).to({regX:-86.8,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:1410},0).wait(75).to({regX:-86.7,scaleX:2.3904,scaleY:2.3904,x:-589.1,y:17.45,startPosition:1485},0).wait(394).to({regY:31.4,scaleX:2.16,scaleY:2.16,x:-141.25,y:34.6,startPosition:1879},0).wait(140).to({regX:-86.8,regY:31.5,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:2019},0).wait(60).to({regX:-86.9,regY:31.4,scaleX:2.1905,scaleY:2.1905,x:-534.7,y:11.5,startPosition:2079},0).wait(701).to({regX:-86.8,regY:31.5,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:2780},0).wait(292).to({regX:-86.7,regY:31.4,scaleX:2.1722,scaleY:2.1722,x:162.1,y:95.25,startPosition:3072},0).wait(97).to({regX:-86.8,regY:31.5,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:3169},0).wait(59).to({regY:31.4,scaleX:2.133,scaleY:2.133,x:133.05,y:43.3,startPosition:3228},0).wait(119).to({regY:31.5,scaleX:1.012,scaleY:1.012,x:0.15,y:0.1,startPosition:3347},0).wait(85));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1977,-1129,3462.2,2419.7);


// stage content:
(lib.m4l2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,314,664,1056,1410,1878,2508,2943,3431];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:314,loop:1,offset:0}];
	this.streamSoundSymbolsList[314] = [{id:"audio2",startFrame:314,endFrame:664,loop:1,offset:0}];
	this.streamSoundSymbolsList[664] = [{id:"audio3",startFrame:664,endFrame:1056,loop:1,offset:0}];
	this.streamSoundSymbolsList[1056] = [{id:"audio4",startFrame:1056,endFrame:1410,loop:1,offset:0}];
	this.streamSoundSymbolsList[1410] = [{id:"audio5",startFrame:1410,endFrame:1878,loop:1,offset:0}];
	this.streamSoundSymbolsList[1878] = [{id:"audio6",startFrame:1878,endFrame:2508,loop:1,offset:0}];
	this.streamSoundSymbolsList[2508] = [{id:"audio7",startFrame:2508,endFrame:2943,loop:1,offset:0}];
	this.streamSoundSymbolsList[2943] = [{id:"audio8",startFrame:2943,endFrame:3432,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,314,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_314 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,314,664,1);
	}
	this.frame_664 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,664,1056,1);
	}
	this.frame_1056 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,1056,1410,1);
	}
	this.frame_1410 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,1410,1878,1);
	}
	this.frame_1878 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1878,2508,1);
	}
	this.frame_2508 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,2508,2943,1);
	}
	this.frame_2943 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,2943,3432,1);
	}
	this.frame_3431 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(314).call(this.frame_314).wait(350).call(this.frame_664).wait(392).call(this.frame_1056).wait(354).call(this.frame_1410).wait(468).call(this.frame_1878).wait(630).call(this.frame_2508).wait(435).call(this.frame_2943).wait(488).call(this.frame_3431).wait(1));

	// Layer_2
	this.instance = new lib.i8y989("synched",0);
	this.instance.setTransform(370.9,431.1,1,1,0,0,0,53.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3432));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-1260,-298,3062.2,2019.8);
// library properties:
lib.properties = {
	id: '6F53CC10F2C81940927BA93AF8372292',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_181.png", id:"CachedBmp_181"},
		{src:"images/CachedBmp_180.png", id:"CachedBmp_180"},
		{src:"images/CachedBmp_176.png", id:"CachedBmp_176"},
		{src:"images/CachedBmp_175.png", id:"CachedBmp_175"},
		{src:"images/CachedBmp_148.png", id:"CachedBmp_148"},
		{src:"images/CachedBmp_146.png", id:"CachedBmp_146"},
		{src:"images/CachedBmp_145.png", id:"CachedBmp_145"},
		{src:"images/CachedBmp_144.png", id:"CachedBmp_144"},
		{src:"images/CachedBmp_143.png", id:"CachedBmp_143"},
		{src:"images/CachedBmp_142.png", id:"CachedBmp_142"},
		{src:"images/CachedBmp_141.png", id:"CachedBmp_141"},
		{src:"images/CachedBmp_139.png", id:"CachedBmp_139"},
		{src:"images/m4l2_atlas_1.png", id:"m4l2_atlas_1"},
		{src:"images/m4l2_atlas_2.png", id:"m4l2_atlas_2"},
		{src:"images/m4l2_atlas_3.png", id:"m4l2_atlas_3"},
		{src:"images/m4l2_atlas_4.png", id:"m4l2_atlas_4"},
		{src:"images/m4l2_atlas_5.png", id:"m4l2_atlas_5"},
		{src:"images/m4l2_atlas_6.png", id:"m4l2_atlas_6"},
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio2.mp3", id:"audio2"},
		{src:"sounds/audio3.mp3", id:"audio3"},
		{src:"sounds/audio4.mp3", id:"audio4"},
		{src:"sounds/audio5.mp3", id:"audio5"},
		{src:"sounds/audio6.mp3", id:"audio6"},
		{src:"sounds/audio7.mp3", id:"audio7"},
		{src:"sounds/audio8.mp3", id:"audio8"}
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