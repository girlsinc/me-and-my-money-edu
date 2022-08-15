(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m3l3_atlas_1", frames: [[0,0,1098,1147]]},
		{name:"m3l3_atlas_2", frames: [[0,0,1091,1152],[1093,0,893,1395]]},
		{name:"m3l3_atlas_3", frames: [[602,0,565,1463],[1169,0,409,1498],[0,0,600,1505]]},
		{name:"m3l3_atlas_4", frames: [[0,0,552,1029],[1274,697,530,719],[1274,0,578,695],[554,0,347,1498],[0,1031,521,789],[903,1418,588,625],[903,0,369,1213]]},
		{name:"m3l3_atlas_5", frames: [[1787,405,95,456],[1563,405,222,640],[305,0,500,622],[1057,624,182,145],[685,624,184,145],[1309,0,252,1099],[807,0,500,622],[2031,0,13,18],[685,771,182,145],[871,624,184,145],[0,0,303,1152],[1976,0,53,54],[1976,108,47,48],[1884,480,74,55],[1884,405,108,73],[1976,206,45,46],[1960,531,71,49],[1884,582,77,44],[1976,301,50,37],[1960,480,73,49],[1976,340,41,41],[1976,254,44,45],[1976,56,49,50],[1994,383,40,41],[1976,158,46,46],[305,624,378,153],[1563,0,411,403]]}
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



(lib.CachedBmp_41 = function() {
	this.initialize(ss["m3l3_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(img.CachedBmp_39);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,930,2748);


(lib.CachedBmp_38 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["m3l3_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["m3l3_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["m3l3_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["m3l3_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["m3l3_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["m3l3_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(img.CachedBmp_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3506,1535);


(lib.CachedBmp_12 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["m3l3_atlas_5"]);
	this.gotoAndStop(26);
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


(lib.yiult78lt78 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-34.75,-180.25,0.1232,0.1232);

	this.instance_1 = new lib.CachedBmp_40();
	this.instance_1.setTransform(-11.6,-103.55,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.7,-180.2,69.6,180.29999999999998);


(lib.YIULT68LT867L = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-57.25,-169.3,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.2,-169.3,114.6,338.70000000000005);


(lib.YIUL68LT678L68L = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-34,-126.75,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-126.7,68,126.8);


(lib.UYILT78L78 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-25.15,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.1,0,50.400000000000006,184.6);


(lib.uoi7979 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-134.4,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.4,0,134.5,142);


(lib.UIOLT7L78TL = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#DCB783").s().p("AAAHOQhvgOgvAGQgCgXAIiKQAIiOAFgSQALgkgDhCIgFhtQgBhAAIguQAOhVAvhKQAwhKBHgwQALgJAJABQAGAAAEAFQAFAEgCAFIgOgDQAUAzgJBGQgFAjgYBXQgRA/AHBFQAFA6AXBKIAGAaQAEAQAEAJQAGAPAfCzQAgCxAGAQQgfAAiAgRg");
	this.shape.setTransform(0.0125,47.8486);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.9,0,31.9,95.7);


(lib.UIOY7Y789 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#AF8D75").s().p("ABaC2Qg8g6g3hBQhviAABg1QACg5AegSQAYgQAVARQAVASBMCCQBTCNALA3IADArQgCAPgJAAQgMAAgXgYg");
	this.shape.setTransform(13.599,20.5629);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("ABMCJIgLgRIgfguQgZgmgGgFQgTgRAnA9QAYAkAFANQADAIgEADQgGAEgFgCQgKgEgMgWIgdgyQgQgYgEgCQgCAAAXAnQAXAogGAEQgGAEgDgDQgGgEgOgUQgog4gihGQgmhOAOgLQAvglApAWQAjAUBLBgIAQAYQAPAagEAHQgEAIgLgMIgTgWIgfgmQgWgdgCAEQgEAIALASQAUAfBIBRQAPASgJAIQgIAIgOgQIggglQgfgjgCABQgCABAnA2QAlA1gRACIgBAAQgIAAgGgHg");
	this.shape_1.setTransform(30.4134,45.9547);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42.9,60.4);


(lib.UIOLT78LT78L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#292929").s().p("AAwA0QgggmgRgRIgGA0QgEAhgBATQgEgZgWgtQgTgngSgaQgGgJgMgbQgEgIADgJIAGgSQASgFATAEQATAEAPAMIAQAQQAIALAHAFIgBgFQACARAOAUIAcAhQAPASAMAfQAOAhgBAUQgSgTgfgmg");
	this.shape.setTransform(9.693,10.9111);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,19.4,21.8);


(lib.UILT78LT87L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#BE4339").s().p("AA3GmQgbgEgRgWQgQgXAAgfQgWhUhXmQQgVgoAAg6IgBgFIABgBIACgYQAIhDAkgtQAkgsApAFQAoAFAYA0QAXAzgIBEIgEAYIAAAJQgDBeAeDEQASB1AZB7IAEATIgBAAIAAAPQgFAggXAVQgUARgYAAIgJAAg");
	this.shape.setTransform(0,42.2315);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,0,27.4,84.5);


(lib.UILT78LT78L8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-54.95,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,0,110,171.9);


(lib.UILT78LT7L = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-13.6,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.6,0,27.4,78.9);


(lib.uilt78l78 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#C3AAB6").s().p("AhBCoIhCg6QATgzAPg4IAMgsQAIhyA6grQASgOAUgEQALgDAHABQBrA6gNCJQgHBDgcA5IgbB2IgMAAQg1AAhFgzg");
	this.shape.setTransform(-13.2046,21.9291);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AiXGJQgVgXAAgiIACgOIgCAAIAGgSQB7l1ANiUIACgJIgCgYQABhEAdgxQAegxAqAAQAqAAAeAxQAdAxAABEIgBAYIABABIgBAFQgHA5gbAmQiIGHggBPQgDAegTAVQgVAVgbAAQgeAAgVgYg");
	this.shape_1.setTransform(-18.6,43.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.9,0,35.9,85.5);


(lib.uilt78l8t7l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D3B289").s().p("AhdB7IgJgIQgEgKAGiVIBRg8QA1gnApAlQAiAggFAiQgDATgpAvQgVAYgUAUIgFANQgHAPgLAOQgMANgHgBIgGgFQgPAIgXgIQgIAGgIAAQgFAAgFgCg");
	this.shape.setTransform(-16.4999,28.722);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#897E7D").s().p("Ag1CNQg3g1AXhxQAUhmAogZQATgMAPAIQCVCAh0CgQgTAagbACIgEAAQgYAAgVgTg");
	this.shape_1.setTransform(-9.2858,16.0026);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.9,0,26.9,41.3);


(lib.UILT78L7T8L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#897E7D").s().p("AA2GcQgbgEgRgWQgPgWAAgeQgUhIhXmQQgUgoAAg4IgBgFIABgBIACgXQAJhCAigrQAigsApAFQAnAFAYAzQAWAygIBCIgDAXIgBAJQgDBbAeDAQARBwAZB7IAEASIgBAAIgBAOQgDAggYAUQgUASgXAAIgIgBg");
	this.shape.setTransform(0,41.2497);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.4,0,26.8,82.5);


(lib.UILT78799 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#292929").s().p("AhVBCQgChWAEg9IABgbQABgPACgKQAFgUAVglQAHgNAHgDQAPgHATASQAPAPAXApQAWApASAPIAOAGQAAAggPAdIgaAvQgMAcABAgQgfgwgEg0QgaAWgEAzIgBApQgBAZgDAQQgEAVgMARQgMASgSAHg");
	this.shape.setTransform(-0.0083,20.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,0,17.299999999999997,41.8);


(lib.UILT7L87T8L = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-15.5,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.5,0,31.1,135.5);


(lib.UIL7TL7T8L = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-21.35,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,0,42.7,184.6);


(lib.UIL7T8LT78L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("Ag+GZQgZgJgLgaQgMgaAIgcIgBAAQgChOAEmWQgMgsANg3IAAgEIABgBIAHgWQAXg/ArgiQArgjAmAOQAnAOALA2QALA2gXA/IgJAWIgCAIQgXBZgODBQgIBxgDB9IAAATIgBAAIgEANQgLAfgaAOQgQAJgQAAQgLAAgLgEg");
	this.shape.setTransform(0.0426,41.3041);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,0,21.700000000000003,82.6);


(lib.UIL7T8L78L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#DCB783").s().p("AhgKYQAFgrgEkRIgGk8QAAhDgOhZIgcicQgJgtAAg8QAAhRAihHQAcg8A/hKIAKAHQAFACgEAGIgJALQgCAEgKALQgKAMgCAEQgOAagDAJQgHATAJAPQAzBYAOBoQAFAmAGBOQAJBDAZApQAKARAUAXIAiAlQAoAwADAoQABAWgIAZQgFARgNAcQgFALgJDuQgJDvgFAKQgIARgHAFQgHAHgOADQgtAOgtAAQgjAAgjgIg");
	this.shape.setTransform(0.0368,67.198);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.2,0,30.5,134.4);


(lib.UIT7LT78L = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-32.05,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32,0,64.2,97.3);


(lib.UL7T7979 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#BE4339").s().p("Aj4gYIALAIQARAIAggBQBlgDDThXQAPgJAPgDQAggHAcAPQAbAQAGAcQAGAdgSAZQgTAZggAGIgCABQgoAKhcAVQiLAfiEAZQgPhUgMg2g");
	this.shape.setTransform(-24.8405,-3.8114);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A8845F").s().p("AhKBfQgGgBgCgHQgCgIAsgPQApgPgBgBQgFgDhRAcQgXAIgKgEQgFgDgCgHQgBgGAHgEQAMgHApgLQBFgUgagBQgHAAhgAaIgTAFQgKABgGgHQgMgPA+gOQBAgOgBgCQgBgCgtAEIgxAEQgUADgCgMQgCgNAYgEQBqgLAkgLQASgGACgJQABgFgiAGIgwAJIgcADQgQABACgJQABgJAcgKIAcgIQB1gVAoAMQAtANANBDQADAShPAkQhHAfhBAQQgTAEgIAAIgCAAg");
	this.shape_1.setTransform(-62.3254,5.7261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79,-15.2,79,30.5);


(lib.tuitd7i = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,37.4,142);


(lib.ou7979 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#EBBF9A").s().p("AhCAUIhvhaIgCgBQgZgXgEggQgEggAUgWQAVgXAgAAQAgAAAZAXQAMAKAIAQQCSC3BNBIQAnAlAJgBQgmArgPAYQhghRh+hng");
	this.shape.setTransform(20.9167,20.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("ABBCGQgLgBgRgTQg5hCgHAAQgCAAAdAiQAgAkgGAGQgFAGgGgCQgHgDgQgQQgzgvgwg/Qg1hHANgQQAtg2AvALQAqAKBeBOIAVAVQAUAWgDAJQgDAJgOgJIgYgQIgnggQgcgXgCAEQgCAKAOAPQAbAcBZA+QATAPgIALQgIALgRgNIgogdQgngbgCACQgBABAxAuQAwAsgSAHQgIADgJgGIgOgOIgognQgigggGgEQgXgLAzAzQAfAfAHANQAFAHgEAEQgFAGgFAAIgBAAg");
	this.shape_1.setTransform(49.9633,46.9838);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,65.1,60.4);


(lib.OY79Y98 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6E6263").s().p("AiHC+QARACAagrQAyhVAmjcQAAgQAFgPQALgeAagPQAbgOAbAKQAbAKALAcQAMAcgLAeIgBACQg3CnhRDUQhOgggzgTg");
	this.shape.setTransform(-13.6311,24.108);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49675").s().p("AgnBjQAVg8gCAAQgCgBgUAoQgSAkgDAHQgIASgMgFQgLgGAJgVQAuheAJgiQAGgTgHgHQgEgDgNAhIgSArIgMAZQgHAOgHgHQgGgGAGgcIAHgaQAthtAegbQAigeA+AYQARAIgMBTQgKBKgWA/QgHAVgFAGQgDADgHgCQgIgCAKgsQAKgqgCABQgFACgTBRQgGAYgIAGQgFADgGgDQgFgCAAgIQABgNALgoQAUhEgPAWQgEAFgMArIgQAyIgFATQgFAJgJABIgBAAQgQAAATg5g");
	this.shape_1.setTransform(-24.6749,59.9844);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.3,0,34.3,75.6);


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


(lib.ioy889 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-135.2,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.2,0,135.29999999999998,141.4);


(lib.IOY889 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-22.7,0,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,0,45.5,149.5);


(lib.ilt678lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#923933").s().p("AitCFQAQAGAjghQBEhCBcjAQAEgPAJgMQASgZAcgGQAdgHAWAQQAWAQAEAdQADAdgTAZIgBACIhIBnQhOBvhKBjQg/gygrgeg");
	this.shape.setTransform(-17.4041,21.3061);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#856A4F").s().p("AhRCHQgRgDAigxQAjgygCgBQgCgBgdAfIgeAiQgNAPgJgIQgJgIAOgRQBDhLASgcQAJgRgEgIQgCgEgVAbIgcAjIgRAUQgLALgEgIQgFgHANgYIAOgWQBFhZAigRQAogTAzAnQAOALggBKQgeBBgkA0QgMATgGADQgEACgGgDQgGgEAUgmQAUglgBABQgGABgmBGQgLAUgJADQgFACgGgEQgFgEADgHQADgMAWgiQAkg5gTAQQgKAIguBKIgKAQQgFAGgHAAIgDAAg");
	this.shape_1.setTransform(-36.5434,50.5563);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.4,0,48.4,64.1);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#923933").s().p("AihFqQgVgPgEgbQgEgaAOgZIAAAAQAPhBBxl9QABgsAZguIACgEIABAAIAMgTQAlg0AxgVQAwgUAgAXQAgAXgEA1QgEA1glAzIgOASIgEAHQgtBMg/CuQglBqgiBvIgFARIgBAAIgHALQgSAZgdAGQgIACgHAAQgTAAgQgLg");
	this.shape.setTransform(-18.796,37.3108);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.6,0,37.6,74.7);


(lib.ILT78L7T8L = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-36.95,-185.45,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.9,-185.4,73.9,185.4);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(1.55,0.9,0.1404,0.1404);

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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(1.6,0,0.1404,0.1404);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_0, new cjs.Rectangle(1.6,0,6.6,6.8), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgDgSIAJABQAAAegMAGg");
	this.shape.setTransform(0.65,1.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,1.3,3.8), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgDgSIAJABQAAAfgMAFg");
	this.shape.setTransform(0.65,1.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1.3,3.8), null);


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

	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-5.95,-2.6,0.0813,0.0813);

	this.instance_1 = new lib.CachedBmp_12();
	this.instance_1.setTransform(-5.65,-1.9,0.0813,0.0813);

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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-5.6,-5.7,0.2502,0.2502);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.6,-5.7,11.3,11.5);


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


(lib.fgryjdsrtyjrsyj_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-5.95,-2.6,0.1212,0.1212);

	this.instance_3 = new lib.CachedBmp_7();
	this.instance_3.setTransform(-5.65,-1.9,0.1212,0.1212);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CD958B").s().p("AgfAfQgfgBgIgGQgHgGAHgOIAGgJQAIgIANABQAYgBATgJQAggPArAQQgiABgVAZQgUAagfAAIAAAAg");
	this.shape_18.setTransform(-1.1776,-0.6977,0.6215,0.6215,20.2067);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C28B85").s().p("Ag5AhQgKgNALgOIAEgDQAHgEAQABQARABATgVQAVgWAiABQgRASgXAcQgXAdgXAGQgHACgGAAQgOAAgGgJg");
	this.shape_19.setTransform(-0.9092,0.6798,0.6215,0.6215,20.2067);

	this.instance_4 = new lib.CachedBmp_8();
	this.instance_4.setTransform(-5.95,-2.55,0.1212,0.1212);

	this.instance_5 = new lib.CachedBmp_9();
	this.instance_5.setTransform(-5.95,-2.55,0.1212,0.1212);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},8).to({state:[]},1).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[]},1).wait(9));

	// Layer_2
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_20.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_21.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_22.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E6E6E5").s().p("AgrARQAfgMA4gjQgaAhgaANIgWAPg");
	this.shape_23.setTransform(-1.3804,-0.0934,0.6215,0.6215,20.2067);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E6E6E5").s().p("AgsAPQAfgMA6gfQgGANgwAdIgWAPg");
	this.shape_24.setTransform(-1.3651,0.0447,0.6215,0.6215,20.2067);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E6E6E5").s().p("AgvAPQAfgMBAgfQgGAIg2AiIgVAPg");
	this.shape_25.setTransform(-1.2193,0.0984,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},10).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).to({state:[{t:this.shape_23}]},4).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[]},1).wait(6));

	// Layer_3
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CD958B").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_26.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CD958B").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_27.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CD958B").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_28.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CD958B").s().p("Ag6AZQgJgHAHgOIAGgJQAIgKANADIAfgFQAmgVAcAQQgHgBgTASQgeAcg3AHQgGgBgFgEg");
	this.shape_29.setTransform(-1.8984,-0.9326,0.6215,0.6215,20.2067);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CD958B").s().p("Ag/AYQgKgIAHgOIAGgJQAJgJANADIAfgFQAngQAmAKQgYAGgWAUQgWAUg2AHQgGgBgFgEg");
	this.shape_30.setTransform(-1.6061,-0.737,0.6215,0.6215,20.2067);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CD958B").s().p("Ag/AYQgJgHAHgOIAGgJQAIgKANADIAfgFQANgIAZgCQAZgCANAGQABADgRAHQgRAHgQAOQgRAQg3AGQgGgBgFgEg");
	this.shape_31.setTransform(-1.634,-0.7905,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_26}]},10).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[]},1).to({state:[{t:this.shape_29}]},4).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[]},1).wait(6));

	// Layer_4
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_32.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_33.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_34.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#C28B85").s().p("AgiAuQgMgKAIgQIACgEQAHgIAagLQAZgNAFgUQAGgVAHAPQAHAOgMAZQgMAXgXASQgOALgKAAQgFAAgFgDg");
	this.shape_35.setTransform(2.65,-2.65,0.6215,0.6215,20.2067,0,0,3.3,-7.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C28B85").s().p("AglAtQgMgKAIgQIACgEQAHgIAggJQAbgIANglQALAXgOAXQgPAYgXAQQgPAJgKAAQgGAAgFgDg");
	this.shape_36.setTransform(2.7,-2.65,0.6215,0.6215,10.7372,0,0,3.2,-7.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C28B85").s().p("AgcA2QgPgHAGgSIABgEQAFgJAZgMQAZgMgBgTIgBgaQgBgHAPAQQAPAQgKAaQgLAYgUAUQgOAOgLAAQgEAAgEgCg");
	this.shape_37.setTransform(2.6,-2.65,0.6215,0.6215,20.2067,0,0,0.5,-8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_32}]},10).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[]},1).to({state:[{t:this.shape_35}]},4).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[]},1).wait(6));

	// Layer_5
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_38.setTransform(0.65,1.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_39.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgVANIgBgBIgBgCIgBgCIABgCIgCgEIALgCIASgFIAOgHIAFgCIABAAIABADIABACQgOALgQAJIgKAEIgHgCg");
	this.shape_40.setTransform(0.6474,1.4293,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_38}]},11).to({state:[{t:this.shape_39}]},1).to({state:[]},1).to({state:[{t:this.shape_40}]},5).to({state:[{t:this.shape_39}]},1).to({state:[]},1).wait(6));

	// Layer_6
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_41.setTransform(0.55,1.0856);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_42.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#C2811E").s().p("AgVAKIAFgIIAJgIQAHgGAMACIAKADIABADIgBADIgaAIQgIAEgFAAIgEgBg");
	this.shape_43.setTransform(0.5556,1.0862,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_41}]},11).to({state:[{t:this.shape_42}]},1).to({state:[]},1).to({state:[{t:this.shape_43}]},5).to({state:[{t:this.shape_42}]},1).to({state:[]},1).wait(6));

	// Layer_7
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_44.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_45.setTransform(0.2313,-0.2179);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_46.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C25D57").s().p("AgMATIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAPAIIAEAIIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgCACgFACIgEAAg");
	this.shape_47.setTransform(-0.1787,0.0295,0.9179,0.9179);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#C25D57").s().p("AgPATIAAgBIgHgRIgFgBIgCgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAgBIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIADAAIABAAIAAABQgHAGAkADIgMAVQgCACgYAEIgEAAg");
	this.shape_48.setTransform(0.0966,0.0524,0.9179,0.9179);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#C25D57").s().p("AgKAXIgBAAQAAgVgMgFIgGgBIgBgCQAAgBAAAAQgBAAAAAAQAAAAABgBQAAAAAAAAIAAgCIACgCIAJgGIAHgEIACAAIACgBIACAAQACADASACQATACgCANIgJASIgZAIIgFABg");
	this.shape_49.setTransform(0.1972,0.5343,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_44}]},10).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[]},1).to({state:[{t:this.shape_47}]},4).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-2.8,9.7,7.8);


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
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(1.05,0,0.1227,0.1227);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_44, new cjs.Rectangle(1.1,0,5,5.1), null);


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
	this.instance.setTransform(1.5,0,0.1487,0.1487);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(1.5,0,6.6,6.7), null);


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
	this.instance.setTransform(2.5,0.45,0.1487,0.1487);

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
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(3.05,0,0.1628,0.1628);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(3.1,0,6.5,6.7), null);


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
	this.instance.setTransform(7.35,0.5,0.1595,0.1595);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0, new cjs.Rectangle(7.4,0.5,7.299999999999999,7.4), null);


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
	this.shape.graphics.f("#971B30").s().p("AgEAWQgMgWAQgXQANAcgEAMQgCAHgFAAQgCAAgEgCg");
	this.shape.setTransform(20.6727,-2.6981,0.6744,0.6744);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#604A3E").s().p("AggAhQgGgUABgSQABgSALgRQAKgRAXgBQAPAGAHASQAGASABAOQAEAigLANQgLAOgWABQgWgFgHgWgAACAVQAKAIADgNQAEgMgNgcQgPAYALAVg");
	this.shape_1.setTransform(20.2235,-2.6605,0.6744,0.6744);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#604A3E").s().p("AiVgSQAYAGAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgKAAQhvAAgnhBg");
	this.shape_2.setTransform(17.983,-5.881,0.4607,0.4607);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#AF856A").s().p("AA9BAQhLgMglgQQhUgjgDhCQASAPAbAOQA4AdAzgHQA1gGAYACQAMABACACQAVAGAIAPQAIAOgGAPQgNAfgpAAQgKAAgLgCg");
	this.shape_3.setTransform(17.4401,-3.7183,0.4607,0.4607);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#604A3E").s().p("AidgcQAoAQAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAg2hLg");
	this.shape_4.setTransform(17.6583,-5.8926,0.4607,0.4607);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AF856A").s().p("AAxBVQhHgbghgXQhKgzgEhMQAZAtAmAWQAmAVA1AEQA2AEAQAEQAQAFACACQATAKAFASQAEAPgJAOQgOAVgbAAQgQAAgWgIg");
	this.shape_5.setTransform(10.55,-7.45,0.4607,0.4607,3.7011,0,0,-13.1,-9.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AiigbQAyAPAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAhAhKg");
	this.shape_6.setTransform(17.4164,-5.8926,0.4607,0.4607);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AF856A").s().p("AAuBlQhEgRg0gmQg0glgKh0QAmBVAmAUQAlATAyAAQAyAAASAFIAXAGQANAIAFARQAFAQgNAZQgHAOgbAAQgTAAgdgHg");
	this.shape_7.setTransform(10.5,-6,0.4607,0.4607,3.7011,0,0,-12.2,-8.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AilgQQA4AEAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgKAAQhwAAhGg/g");
	this.shape_8.setTransform(17.2782,-5.8922,0.4607,0.4607);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF856A").s().p("AAyBwQhEgSg1glQg0gmgQiJQAsBrAmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_9.setTransform(10.55,-4.65,0.4607,0.4607,3.7011,0,0,-11.8,-7.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("AisgHQBFgFAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgLAAQhwAAhSg2g");
	this.shape_10.setTransform(16.9787,-5.8918,0.4607,0.4607);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AF856A").s().p("AA5B2QhEgSg1glQg0gmgeiVQA6B3AmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_11.setTransform(10.55,-3.6,0.4607,0.4607,3.7011,0,0,-11.1,-6.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},1).wait(5));

	// Layer_2
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgdAbQgpgVgNguQBAAwBngYQgKAVgFAOIgIAVIgZABQgkAAgdgOg");
	this.shape_12.setTransform(16.175,-4.2632,0.6744,0.6744);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgnAlQg5gdgSg/QBYBBCNggQgOAcgHAUIgKAcQgSACgQAAQgyAAgngTg");
	this.shape_13.setTransform(16.1559,-4.2646,0.4946,0.4946);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgZAZQgqgWgUgoQBIAqBmgXQgJAUgFAPIgIAUIgZABQgmAAgbgNg");
	this.shape_14.setTransform(15.939,-4.0777,0.6744,0.6744);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAWQgpgVgbgkQBOAmBngYQgKAVgFAOIgIAVIgZABQglAAgcgOg");
	this.shape_15.setTransform(15.7029,-3.9091,0.6744,0.6744);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},8).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(5));

	// Layer_8
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgwgDIgOgfQA9AjA/gGIAAAog");
	this.shape_16.setTransform(15.6018,1.234,0.6744,0.6744);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(11).to({_off:false},0).to({_off:true},1).wait(5));

	// Layer_5
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F7919F").s().p("AghAOIgWgmQAsgJARACQAcAEANAPQACACADAHIAEAEIgWAfg");
	this.shape_17.setTransform(16.0322,0.0351,0.4946,0.4946);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggGANABQAUADAJALIAFAHIACACIgQAXg");
	this.shape_18.setTransform(16.0401,0.8755,0.6744,0.6744);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggHANABQAUADAJALQACACACAFIADADIgQAXg");
	this.shape_19.setTransform(15.821,1.3981,0.6744,0.6744);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).wait(5));

	// Layer_4
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#971B30").s().p("AhQAqIgeh7IBHBJQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIAAgCIAOgGIACgDIAMgGIADgDIALgEIAEAAIAMgGIANgDIAEgCIBIgPIgJAgIgIBIQgCAfAKAGg");
	this.shape_20.setTransform(15.3522,-3.1743,0.4946,0.4946);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#971B30").s().p("Ag4AXIgahTIA3AuQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAgBIAKgFIACgCIAJgEIACgDIAHgDIADAAIAJgEIAKgCIACgCIA1gLIgGAXQgJAZgDAjQABAUAGAIIgMABQg8AAg4gmg");
	this.shape_21.setTransform(15.2309,-2.6458,0.6744,0.6744);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#971B30").s().p("AAHA+QgcgMgfgpIgjhMIBBAoQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABAAIAAgBIAKgEIABgDIAIgEIACgCIAIgDIAEAAIAJgFIAKgCIACgBIA1gLIgHAXQgJAZgCAiIAAAWQAAAMACAGQgTAKgTAAQgOAAgNgGg");
	this.shape_22.setTransform(14.9274,-1.7204,0.6744,0.6744);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},9).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-8.1,25,13.899999999999999);


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
	this.instance_3 = new lib.ClipGroup_3_1();
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


(lib.yukyuk = function(mode,startPosition,loop,reversed) {
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
	this.instance_1.setTransform(29.2,5.95,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-26.65,6.1,2.0882,2.0882,0,0,0,6.2,3.8);

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


(lib.yukifytukfuyk = function(mode,startPosition,loop,reversed) {
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
	this.instance_2.setTransform(-23.8,4.85,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(20.3,4.5);

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


(lib.tyiktriruiu = function(mode,startPosition,loop,reversed) {
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
	this.instance_2.setTransform(-20.05,4.45,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(25,2.85);

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
	this.instance_2.setTransform(-26.1,4.15,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(18.95,2.55);

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
	this.instance_1.setTransform(29.65,2.1,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-26.2,2.25,2.0882,2.0882,0,0,0,6.2,3.8);

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


(lib.ghktfkfutkfuk = function(mode,startPosition,loop,reversed) {
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
	this.instance_2.setTransform(-23.8,5,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(18.75,5.15);

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
	this.instance_2.setTransform(-25.15,-44.75,1,1,0,0,0,6.2,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(4.55,-45.55,1,1,0,0,0,8.8,4.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


(lib.UIT7LT78L_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjkfujyulicopy("single",0);
	this.instance.setTransform(0.9,-15.45,0.3677,0.3677,-2.0381,0,0,17,-11);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(1).to({startPosition:0},0).to({_off:true},1).wait(67).to({_off:false},0).wait(1403).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(5).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(81).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(15).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(21).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(25).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(14).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(106).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2);
	var _tweenStr_1 = _tweenStr_0.to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(23).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(24).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(55).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:5},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(18).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(16).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2);
	var _tweenStr_2 = _tweenStr_1.to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(136).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(28).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(7).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(43).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2);
	this.timeline.addTween(_tweenStr_2.to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(80));

	// Layer_2
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(-2.95,-30.25,0.3968,0.3968,-1.4674,0,0,12.1,4.4);

	this.instance_2 = new lib.yukyuk("synched",9);
	this.instance_2.setTransform(-2.95,-30.25,0.3968,0.3968,-1.4674,0,0,12.1,4.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{startPosition:0}}]}).to({state:[{t:this.instance_1,p:{startPosition:1}}]},1).to({state:[]},1).to({state:[{t:this.instance_1,p:{startPosition:14}}]},67).to({state:[{t:this.instance_2}]},2470).to({state:[{t:this.instance_1,p:{startPosition:0}}]},87).wait(2548));

	// Layer_1
	this.instance_3 = new lib.CachedBmp_35();
	this.instance_3.setTransform(-32.65,-88.5,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({_off:true},1).wait(67).to({_off:false},0).wait(5105));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.6,-88.5,65.30000000000001,88.6);


(lib.uiol7tl7t8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.fgryjdsrtyjrsyj("single",8);
	this.instance.setTransform(-0.8,-18.55,1.5151,1.4652,0,-5.6143,174.6988,2.5,-2.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).wait(8).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(379).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(13).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(160).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(17).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(11).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(10).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2058).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(1953).to({startPosition:8},0).to({_off:true},1).wait(1).to({_off:false},0).wait(15));

	// Layer_4
	this.instance_1 = new lib.dfggdfgzrs("synched",19);
	this.instance_1.setTransform(4.6,-36.8,0.8775,0.8775,0,0.1763,-179.8237,-5.2,-45.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).wait(5106).to({startPosition:25},0).to({_off:true},1).wait(1).to({_off:false,startPosition:27},0).wait(15));

	// Layer_3
	this.instance_2 = new lib.CachedBmp_34();
	this.instance_2.setTransform(-35.55,-85.55,0.1232,0.1232);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(69).to({_off:false},0).wait(5106).to({_off:true},1).wait(1).to({_off:false},0).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,-85.5,71.2,85.6);


(lib.UILT7L87L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.fgryjdsrtyjrsyj_1("single",14);
	this.instance.setTransform(-1.95,-14.75,1.0163,0.9831,0,-11.3071,169.0411,2.8,-2.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).wait(98).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:19},0).wait(4).to({startPosition:17},0).wait(3).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(3).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(5).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:15},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(12).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:17},0).wait(3).to({startPosition:16},0).wait(5).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:16},0).wait(192).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:18},0).wait(3).to({startPosition:19},0).wait(4).to({startPosition:14},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:15},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:15},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(1311).to({startPosition:13},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(450).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2525));

	// Layer_3
	this.instance_1 = new lib.CachedBmp_30();
	this.instance_1.setTransform(25.1,-33.05,0.1232,0.1232);

	this.instance_2 = new lib.Path_0();
	this.instance_2.setTransform(3.15,-33.3,0.9999,0.9999,0,0,0,0.7,1.9);
	this.instance_2.alpha = 0.6016;

	this.instance_3 = new lib.CachedBmp_43();
	this.instance_3.setTransform(-15.3,-38.3,0.1232,0.1232);

	this.instance_4 = new lib.Path();
	this.instance_4.setTransform(23.5,-32.05,0.9999,0.9999,0,0,0,0.7,1.9);
	this.instance_4.alpha = 0.6016;

	this.instance_5 = new lib.CachedBmp_42();
	this.instance_5.setTransform(9.55,-37.05,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},69).wait(5107));

	// Layer_2
	this.instance_6 = new lib.tyiktriruiu("synched",26);
	this.instance_6.setTransform(2.95,-31,0.4926,0.4762,0,2.9202,-177.0756,7.5,4.1);

	this.instance_7 = new lib.hyjkyukyuk("synched",47);
	this.instance_7.setTransform(2.95,-31,0.4926,0.4762,0,2.9202,-177.0756,7.5,4.1);

	this.instance_8 = new lib.yukifytukfuyk("synched",38);
	this.instance_8.setTransform(2.95,-31,0.4926,0.4762,0,2.9202,-177.0756,7.5,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},69).to({state:[{t:this.instance_7}]},1101).to({state:[{t:this.instance_8}]},1371).to({state:[{t:this.instance_7}]},82).wait(2553));

	// Layer_1
	this.instance_9 = new lib.CachedBmp_31();
	this.instance_9.setTransform(-30.75,-76.65,0.1232,0.1232);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(69).to({_off:false},0).wait(5107));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.7,-76.6,62.900000000000006,76.6);


(lib.tyujdytuyrudyu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.fgryjdsrtyjrsyj_1("single",14);
	this.instance.setTransform(-1.95,-14.75,1.0163,0.9831,0,-11.3071,169.0411,2.8,-2.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(68).to({startPosition:14},0).to({_off:true},1).wait(5107));

	// Layer_3
	this.instance_1 = new lib.CachedBmp_30();
	this.instance_1.setTransform(25.1,-33.05,0.1232,0.1232);

	this.instance_2 = new lib.Path_0();
	this.instance_2.setTransform(3.15,-33.3,0.9999,0.9999,0,0,0,0.7,1.9);
	this.instance_2.alpha = 0.6016;

	this.instance_3 = new lib.CachedBmp_29();
	this.instance_3.setTransform(-15.3,-38.3,0.1232,0.1232);

	this.instance_4 = new lib.Path();
	this.instance_4.setTransform(23.5,-32.05,0.9999,0.9999,0,0,0,0.7,1.9);
	this.instance_4.alpha = 0.6016;

	this.instance_5 = new lib.CachedBmp_28();
	this.instance_5.setTransform(9.55,-37.05,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},68).to({state:[]},1).to({state:[]},5076).wait(31));

	// Layer_2
	this.instance_6 = new lib.ghktfkfutkfuk("synched",17);
	this.instance_6.setTransform(2.95,-31,0.4926,0.4762,0,2.9202,-177.0756,7.5,4.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(68).to({startPosition:25},0).to({_off:true},1).wait(5107));

	// Layer_1
	this.instance_7 = new lib.CachedBmp_24();
	this.instance_7.setTransform(-30.75,-76.65,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(68).to({_off:true},1).wait(5107));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.7,-76.6,62.900000000000006,76.6);


(lib.TKT7K756K = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ghjdtjtyktyktut("single",7);
	this.instance.setTransform(5.1,-15.05,0.7414,0.7414,0,-10.2421,169.7579,6.7,-5.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).wait(1089).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(1).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2577).to({startPosition:6},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(5).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(1043).to({startPosition:8},0).to({_off:true},1).wait(1));

	// Layer_2
	this.instance_1 = new lib.ghjkdtktuktuykut("synched",19);
	this.instance_1.setTransform(-1.45,-29.4,0.3743,0.3714,0,-12.1221,168.866,-8.2,6.6);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).wait(5106).to({startPosition:25},0).to({_off:true},1).wait(1));

	// Layer_1
	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(-36.2,-76.95,0.1232,0.1232);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(69).to({_off:false},0).wait(5106).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.2,-76.9,72.5,77);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// UILT78LT87L
	this.instance = new lib.UILT78LT87L("synched",0);
	this.instance.setTransform(442.2,236.35,1,1,3.4677);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).to({rotation:0,x:402.35,y:243.6},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// U_L7_T79_79
	this.instance_1 = new lib.UL7T7979("synched",0);
	this.instance_1.setTransform(444.7,315.7,1,1,3.4677,0,0,-7.3,-7.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).to({regX:-7.4,regY:-7.3,rotation:0,x:409.55,y:322.55},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AinH1IAHgjIAfgeQgHj1gikhQgFgaghgJQiWADjzAaIj0syIabAAIAAXdQrFFYkIABQklAAD9mng");
	var mask_graphics_2614 = new cjs.Graphics().p("AinH1IAHgjIAfgeQgHj1gikhQgFgaghgJQiWADjzAaIj0syIabAAIAAXdQrFFYkIABQklAAD9mng");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:269.075,y:287.6999}).wait(2614).to({graphics:mask_graphics_2614,x:269.075,y:287.6999}).wait(2562));

	// uilt78l8t7l
	this.instance_2 = new lib.uilt78l8t7l("synched",0);
	this.instance_2.setTransform(351.25,284.2,1,1,2.9861,0,0,-5.1,8.5);
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(69).to({_off:false},0).to({regY:8.4,rotation:0,x:318.1,y:304.95},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).to({regX:-5,regY:8.5,rotation:29.7826,x:260.45,y:300.95},9).wait(74).to({startPosition:0},0).to({regX:-5.1,regY:8.4,rotation:0,x:318.1,y:304.95},9,cjs.Ease.quadInOut).wait(2553));

	// UILT78L7T8L
	this.instance_3 = new lib.UILT78L7T8L("synched",0);
	this.instance_3.setTransform(345.85,215.4,1,1,2.9861);
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(69).to({_off:false},0).to({rotation:0,x:309.1,y:236.65},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).to({regX:0.1,rotation:29.7826,x:286.55,y:237.1},9).wait(74).to({startPosition:0},0).to({regX:0,rotation:0,x:309.1,y:236.65},9,cjs.Ease.quadInOut).wait(2553));

	// ou_79_79_
	this.instance_4 = new lib.ou7979("synched",0);
	this.instance_4.setTransform(-32,306.05,1,1,-4.466,0,0,7.9,8.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(69).to({_off:false},0).to({rotation:0,x:17.9,y:310.95},7).wait(11).to({startPosition:0},0).to({rotation:-59.1848,x:28.35,y:311.2},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({rotation:0,x:17.9,y:310.95},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({regX:8,regY:8.2,rotation:-55.1554,x:28.95,y:311.15},11).wait(65).to({startPosition:0},0).to({regX:7.9,regY:8.3,scaleX:0.9999,scaleY:0.9999,rotation:-53.6535,x:23.9,y:312},11).wait(66).to({startPosition:0},0).to({regY:8.1,scaleX:1,scaleY:1,rotation:0,x:17.9,y:310.95},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({regX:8,regY:8.2,rotation:-43.7697,x:18.4,y:313.05},10).wait(95).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-34.2992,x:22.4,y:315.5},11).wait(109).to({startPosition:0},0).to({regY:8.3,rotation:-52.2797,x:28.95,y:314.7},11).wait(64).to({startPosition:0},0).to({regX:7.9,regY:8.1,scaleX:1,scaleY:1,rotation:0,x:17.9,y:310.95},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UIT7LT78L
	this.instance_5 = new lib.UIT7LT78L_1("synched",69);
	this.instance_5.setTransform(306.65,198.4,1,1,2.9861,0,0,-8.1,-5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(69).to({_off:false},0).to({rotation:0,x:269.1,y:221.7,startPosition:76},7).wait(11).to({startPosition:87},0).to({startPosition:99},12,cjs.Ease.quadInOut).wait(35).to({startPosition:134},0).to({startPosition:145},11,cjs.Ease.quadInOut).wait(17).to({startPosition:162},0).wait(11).to({startPosition:173},0).wait(93).to({startPosition:266},0).wait(12).to({startPosition:278},0).wait(81).to({startPosition:359},0).wait(11).to({startPosition:370},0).wait(111).to({startPosition:481},0).wait(11).to({startPosition:492},0).wait(13).to({startPosition:505},0).wait(11).to({startPosition:516},0).wait(65).to({startPosition:581},0).wait(11).to({startPosition:592},0).wait(66).to({startPosition:658},0).wait(10).to({startPosition:668},0).wait(11).to({startPosition:679},0).wait(11).to({startPosition:690},0).wait(70).to({startPosition:760},0).wait(11).to({startPosition:771},0).wait(36).to({startPosition:807},0).wait(10).to({startPosition:817},0).wait(10).to({startPosition:827},0).wait(10).to({startPosition:837},0).wait(95).to({startPosition:932},0).wait(11).to({startPosition:943},0).wait(109).to({startPosition:1052},0).wait(11).to({startPosition:1063},0).wait(64).to({startPosition:1127},0).wait(10).to({startPosition:1137},0).wait(14).to({startPosition:1151},0).wait(1380).to({startPosition:2531},0).to({rotation:-4.9449,x:247.5,y:221.5,startPosition:2540},9).wait(74).to({startPosition:2614},0).to({rotation:0,x:269.1,y:221.7,startPosition:2623},9,cjs.Ease.quadInOut).wait(2553));

	// Bitmap_2
	this.instance_6 = new lib.Bitmap2();
	this.instance_6.setTransform(30,274);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(5176));

	// ILT78L7T8L
	this.instance_7 = new lib.ILT78L7T8L("synched",0);
	this.instance_7.setTransform(308.4,362.45,1,1,2.9861,0,0,0,-11.3);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(69).to({_off:false},0).to({regY:-11.4,rotation:0,x:279.35,y:385.35},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).to({rotation:-4.9449,x:271.8,y:383.65},9).wait(74).to({startPosition:0},0).to({rotation:0,x:279.35,y:385.35},9,cjs.Ease.quadInOut).wait(2553));

	// UIL7TL7T8L
	this.instance_8 = new lib.UIL7TL7T8L("synched",0);
	this.instance_8.setTransform(331.1,370.25,1,1,2.9861,0,0,6.7,36.2);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(69).to({_off:false},0).to({regX:6.6,rotation:0,x:302.35,y:392.05},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UYILT78L78
	this.instance_9 = new lib.UYILT78L78("synched",0);
	this.instance_9.setTransform(291.95,366.6,1,1,2.9861,0,0,6.5,45);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(69).to({_off:false},0).to({rotation:0,x:263.15,y:390.4},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({regY:45.1,rotation:-4.9449,x:256.15,y:390.2},0).wait(74).to({startPosition:0},0).wait(9).to({regY:45,rotation:0,x:263.15,y:390.4},0).wait(2553));

	// UIL7T8LT78L
	this.instance_10 = new lib.UIL7T8LT78L("synched",0);
	this.instance_10.setTransform(298.2,212.65,1,1,2.9861,0,0,0.1,3.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(69).to({_off:false},0).to({regX:0,regY:3.4,rotation:0,x:261.3,y:236.3},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).to({rotation:-4.9449,x:241,y:236.75},9).wait(74).to({startPosition:0},0).to({rotation:0,x:261.3,y:236.3},9,cjs.Ease.quadInOut).wait(2553));

	// O_Y79_Y98_
	this.instance_11 = new lib.OY79Y98("synched",0);
	this.instance_11.setTransform(288.65,279.6,1,1,2.9861,0,0,-9.4,2.9);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(69).to({_off:false},0).to({regX:-9.5,rotation:0,x:255.25,y:303.75},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).to({regX:-9.4,rotation:-4.9449,x:240.85,y:304.45},9).wait(74).to({startPosition:0},0).to({regX:-9.5,rotation:0,x:255.25,y:303.75},9,cjs.Ease.quadInOut).wait(2553));

	// uilt78l78
	this.instance_12 = new lib.uilt78l78("synched",0);
	this.instance_12.setTransform(-18,235.85,1,1,-4.466,0,0,-7.5,7.3);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(69).to({_off:false},0).to({regY:7.2,rotation:0,x:37.5,y:242},7).wait(11).to({startPosition:0},0).to({regY:7.3,rotation:-3.4633,x:41.6,y:240.45},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:7.2,rotation:0,x:37.5,y:242},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({regX:-7.4,rotation:-5.7097,x:40.3,y:240.7},11).wait(65).to({startPosition:0},0).to({rotation:-4.2065,x:37.1,y:241.85},11).wait(66).to({startPosition:0},0).to({regX:-7.5,rotation:0,x:37.5,y:242},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({rotation:1.1838,x:39.8,y:241.45},10).wait(95).to({startPosition:0},0).to({regX:-7.4,regY:7.3,rotation:-5.0371,x:36.1,y:242.05},11).wait(109).to({startPosition:0},0).to({regY:7.4,rotation:-7.2851,x:39.7,y:240.85},11).wait(64).to({startPosition:0},0).to({regX:-7.5,regY:7.2,rotation:0,x:37.5,y:242},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// uiol_7tl7t8l
	this.instance_13 = new lib.uiol7tl7t8l("synched",69);
	this.instance_13.setTransform(8.35,216.85,1,1,-4.466);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(69).to({_off:false},0).to({rotation:0,x:65.2,y:225.25,startPosition:76},7).wait(11).to({startPosition:87},0).to({regX:0.1,regY:0.1,rotation:-1.2101,x:70.45,y:224.45,startPosition:99},12,cjs.Ease.quadInOut).wait(35).to({startPosition:134},0).to({regX:0,regY:0,rotation:0,x:65.2,y:225.25,startPosition:145},11,cjs.Ease.quadInOut).wait(17).to({startPosition:162},0).wait(11).to({startPosition:173},0).wait(93).to({startPosition:266},0).wait(12).to({startPosition:278},0).wait(81).to({startPosition:359},0).wait(11).to({startPosition:370},0).wait(111).to({startPosition:481},0).wait(11).to({startPosition:492},0).wait(13).to({startPosition:505},0).to({rotation:1.4838,x:68.2,y:225.05,startPosition:516},11).wait(65).to({startPosition:581},0).to({regX:0.1,rotation:0,x:64.8,y:225.25,startPosition:592},11).wait(66).to({startPosition:658},0).to({regX:0,x:65.2,startPosition:668},10).wait(11).to({startPosition:679},0).wait(11).to({startPosition:690},0).wait(70).to({startPosition:760},0).wait(11).to({startPosition:771},0).wait(36).to({startPosition:807},0).wait(10).to({startPosition:817},0).wait(10).to({startPosition:827},0).to({rotation:1.1838,x:67.85,startPosition:837},10).wait(95).to({startPosition:932},0).to({regX:0.1,regY:0.1,rotation:-0.2999,x:64.05,y:225.6,startPosition:943},11).wait(109).to({rotation:-0.2999,startPosition:1052},0).to({rotation:1.65,x:68.55,y:225.75,startPosition:1063},11).wait(64).to({startPosition:1127},0).to({regX:0,regY:0,rotation:0,x:65.2,y:225.25,startPosition:1137},10).wait(14).to({startPosition:1151},0).wait(1380).to({startPosition:2531},0).wait(9).to({startPosition:2540},0).wait(74).to({startPosition:2614},0).wait(9).to({startPosition:2623},0).wait(2553));

	// YIULT68LT867L
	this.instance_14 = new lib.YIULT68LT867L("synched",0);
	this.instance_14.setTransform(38.4,364.2,1,1,-4.466);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(69).to({_off:false},0).to({rotation:0,x:83.65,y:374.5},7).wait(11).to({startPosition:0},0).to({rotation:2.0016,x:83,y:374.95},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({rotation:0,x:83.65,y:374.5},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({rotation:1.4838,x:82.8,y:374.7},11).wait(65).to({startPosition:0},0).to({rotation:0,x:83.15,y:374.45},11).wait(66).to({startPosition:0},0).to({x:83.65,y:374.5},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({rotation:1.1838,x:83.2,y:374.85},10).wait(95).to({startPosition:0},0).to({rotation:-0.2999,x:83.15,y:374.65},11).wait(109).to({rotation:-0.2999},0).to({regX:0.1,regY:0.1,rotation:1.65,x:82.65,y:375.5},11).wait(64).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:83.65,y:374.5},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// TKT7K756K
	this.instance_15 = new lib.TKT7K756K("synched",69);
	this.instance_15.setTransform(425.1,213.3,1,1,3.4677,0,0,8.1,-5.9);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(69).to({_off:false},0).to({rotation:0,x:383.85,y:221.6,startPosition:76},7).wait(11).to({startPosition:87},0).to({startPosition:99},12,cjs.Ease.quadInOut).wait(35).to({startPosition:134},0).to({startPosition:145},11,cjs.Ease.quadInOut).wait(17).to({startPosition:162},0).wait(11).to({startPosition:173},0).wait(93).to({startPosition:266},0).wait(12).to({startPosition:278},0).wait(81).to({startPosition:359},0).wait(11).to({startPosition:370},0).wait(111).to({startPosition:481},0).wait(11).to({startPosition:492},0).wait(13).to({startPosition:505},0).wait(11).to({startPosition:516},0).wait(65).to({startPosition:581},0).wait(11).to({startPosition:592},0).wait(66).to({startPosition:658},0).wait(10).to({startPosition:668},0).wait(11).to({startPosition:679},0).wait(11).to({startPosition:690},0).wait(70).to({startPosition:760},0).wait(11).to({startPosition:771},0).wait(36).to({startPosition:807},0).wait(10).to({startPosition:817},0).wait(10).to({startPosition:827},0).wait(10).to({startPosition:837},0).wait(95).to({startPosition:932},0).wait(11).to({startPosition:943},0).wait(109).to({startPosition:1052},0).wait(11).to({startPosition:1063},0).wait(64).to({startPosition:1127},0).wait(10).to({startPosition:1137},0).wait(14).to({startPosition:1151},0).wait(1380).to({startPosition:2531},0).wait(9).to({startPosition:2540},0).wait(74).to({startPosition:2614},0).wait(9).to({startPosition:2623},0).wait(2553));

	// UIL7T8L78L
	this.instance_16 = new lib.UIL7T8L78L("synched",0);
	this.instance_16.setTransform(-21.95,142.5,1,1,-4.466);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(69).to({_off:false},0).to({rotation:0,x:40.75,y:148.75},7).wait(11).to({startPosition:0},0).to({rotation:-1.2101,x:44.3,y:148.4},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({rotation:0,x:40.75,y:148.75},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({rotation:1.4838,x:45.75,y:147.95},11).wait(65).to({startPosition:0},0).to({regX:0.1,rotation:0,x:40.35,y:148.75},11).wait(66).to({startPosition:0},0).to({regX:0,x:40.75},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({rotation:1.1838,x:45,y:148.3},10).wait(95).to({startPosition:0},0).to({regX:0.1,regY:0.1,rotation:-0.2999,x:39.2,y:149.25},11).wait(109).to({rotation:-0.2999},0).to({rotation:1.65,x:46.3,y:148.6},11).wait(64).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:40.75,y:148.75},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// IO_Y8_89
	this.instance_17 = new lib.IOY889("synched",0);
	this.instance_17.setTransform(31.85,232.35,1,1,-4.466,0,0,-8.7,12.1);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(69).to({_off:false},0).to({regX:-8.8,rotation:0,x:87.3,y:242.5},7).wait(11).to({startPosition:0},0).to({rotation:2.0016,x:91.25,y:243.2},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({rotation:0,x:87.3,y:242.5},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({rotation:3.2164,x:89.85,y:242.85},11).wait(65).to({startPosition:0},0).to({rotation:-0.2439,x:86.8,y:242.45},11).wait(66).to({startPosition:0},0).to({rotation:0,x:87.3,y:242.5},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(117).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({regX:-8.7,regY:12.2,rotation:2.4093,x:89.7,y:243.1},10).wait(95).to({startPosition:0},0).to({rotation:3.417,x:86.2,y:242.8},11).wait(109).to({startPosition:0},0).to({rotation:5.3672,x:90.15,y:243.7},11).wait(64).to({startPosition:0},0).to({regX:-8.8,regY:12.1,rotation:0,x:87.3,y:242.5},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UIOL_T7L78TL
	this.instance_18 = new lib.UIOLT7L78TL("synched",0);
	this.instance_18.setTransform(24.45,177.4,1,1,-4.466,0,0,0,8.6);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(69).to({_off:false},0).to({regY:8.5,rotation:0,x:84.3,y:187.1},7).wait(11).to({startPosition:0},0).to({regY:8.6,rotation:-1.2101,x:88.65,y:185.9},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:8.5,rotation:0,x:84.3,y:187.1},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).to({regY:8.6,rotation:1.4838,x:88.3,y:187.5},11).wait(65).to({startPosition:0},0).to({rotation:0,x:83.8,y:187.15},11).wait(66).to({startPosition:0},0).to({regY:8.5,x:84.3,y:187.1},10).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).to({regX:0.1,rotation:1.1838,x:87.8,y:187.55},10).wait(95).to({startPosition:0},0).to({regY:8.6,rotation:-0.2999,x:82.95,y:187.4},11).wait(109).to({rotation:-0.2999},0).to({rotation:1.65,x:88.75,y:188.25},11).wait(64).to({startPosition:0},0).to({regX:0,regY:8.5,rotation:0,x:84.3,y:187.1},10).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UIL_T78_79_9
	this.instance_19 = new lib.UILT78799("synched",0);
	this.instance_19.setTransform(138.6,205.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(10).to({startPosition:0},0).to({regX:0.1,regY:0.1,rotation:-2.2606,x:145.7,y:206.05},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:138.6,y:205.45},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:1.9763,x:143.35,y:204.9},11).wait(93).to({startPosition:0},0).to({rotation:-0.2159,x:138.45,y:206},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({regX:0.1,regY:0.1,rotation:-0.9539,x:142.75,y:205.75},11).wait(111).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:138.6,y:205.45},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({rotation:1.0002,x:141,y:205},11).wait(70).to({startPosition:0},0).to({rotation:-0.2256,x:138.25,y:205.35},11).wait(36).to({rotation:-0.2256},0).to({rotation:0,x:138.6,y:205.45},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UILT7L87L
	this.instance_20 = new lib.tyujdytuyrudyu("synched",0);
	this.instance_20.setTransform(152.8,212.1,1,1,0,0,0,-9.1,-5.9);

	this.instance_21 = new lib.UILT7L87L("synched",69);
	this.instance_21.setTransform(152.8,212.1,1,1,0,0,0,-9.1,-5.9);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(10).to({startPosition:10},0).to({rotation:-2.2606,x:160.05,y:212.05,startPosition:26},16,cjs.Ease.quadInOut).wait(17).to({startPosition:43},0).to({rotation:0,x:152.8,y:212.1,startPosition:57},14).to({_off:true},12).wait(5107));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(69).to({_off:false},0).to({startPosition:76},7).wait(11).to({startPosition:87},0).to({startPosition:99},12,cjs.Ease.quadInOut).wait(35).to({startPosition:134},0).to({startPosition:145},11,cjs.Ease.quadInOut).wait(17).to({startPosition:162},0).to({rotation:1.9763,x:157.3,y:212.05,startPosition:173},11).wait(93).to({startPosition:266},0).to({rotation:-0.2159,x:152.7,y:212.6,startPosition:278},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159,startPosition:359},0).to({regX:-9,regY:-5.8,rotation:-0.9539,x:157.05,y:212.15,startPosition:370},11).wait(111).to({startPosition:481},0).to({regX:-9.1,regY:-5.9,rotation:0,x:152.8,y:212.1,startPosition:492},11).wait(13).to({startPosition:505},0).wait(11).to({startPosition:516},0).wait(65).to({startPosition:581},0).wait(11).to({startPosition:592},0).wait(66).to({startPosition:658},0).wait(10).to({startPosition:668},0).wait(11).to({startPosition:679},0).to({rotation:1.0002,x:155.1,y:211.9,startPosition:690},11).wait(70).to({startPosition:760},0).to({regY:-5.8,rotation:-0.2256,x:152.5,y:212.05,startPosition:771},11).wait(36).to({rotation:-0.2256,startPosition:807},0).to({regY:-5.9,rotation:0,x:152.8,y:212.1,startPosition:817},10).wait(10).to({startPosition:827},0).wait(10).to({startPosition:837},0).wait(95).to({startPosition:932},0).wait(11).to({startPosition:943},0).wait(109).to({startPosition:1052},0).wait(11).to({startPosition:1063},0).wait(64).to({startPosition:1127},0).wait(10).to({startPosition:1137},0).wait(14).to({startPosition:1151},0).wait(1380).to({startPosition:2531},0).wait(9).to({startPosition:2540},0).wait(74).to({startPosition:2614},0).wait(9).to({startPosition:2623},0).wait(2553));

	// UIO_LT78LT78L
	this.instance_22 = new lib.UIOLT78LT78L("synched",0);
	this.instance_22.setTransform(174.95,215.4,1,1,0,0,0,4.1,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(10).to({startPosition:0},0).to({regX:4.2,rotation:-2.2606,x:182.45,y:214.5},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:4.1,rotation:0,x:174.95,y:215.4},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:1.9763,x:179.35,y:216.1},11).wait(93).to({startPosition:0},0).to({regY:0.6,rotation:-0.2159,x:174.85,y:215.9},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({regX:4,rotation:1.517,x:178.75,y:216.2},11).wait(111).to({startPosition:0},0).to({regX:4.1,regY:0.5,rotation:0,x:174.95,y:215.4},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regY:0.6,rotation:1.0002,x:177.2,y:215.65},11).wait(70).to({startPosition:0},0).to({rotation:-0.2256,x:174.65,y:215.25},11).wait(36).to({rotation:-0.2256},0).to({regY:0.5,rotation:0,x:174.95,y:215.4},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UIL_T7L87T8L
	this.instance_23 = new lib.UILT7L87T8L("synched",0);
	this.instance_23.setTransform(127.95,226.6,1,1,0,0,0,-5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(10).to({startPosition:0},0).to({regY:2.6,rotation:3.4379,x:134.4,y:225.15},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regY:2.5,rotation:0,x:127.95,y:226.6},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:-4.9,rotation:1.9763,x:132.05,y:225.7},11).wait(93).to({startPosition:0},0).to({regY:2.6,rotation:-0.2159,x:127.95,y:227.25},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({regX:-4.8,rotation:1.517,x:131.7,y:226.15},11).wait(111).to({startPosition:0},0).to({regX:-5,regY:2.5,rotation:0,x:127.95,y:226.6},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regX:-4.9,regY:2.6,rotation:1.0002,x:130.1,y:226.05},11).wait(70).to({startPosition:0},0).to({regY:2.5,rotation:-4.1661,x:127.8,y:226.6},11).wait(36).to({startPosition:0},0).to({regX:-5,rotation:0,x:127.95},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// YIUL68LT678L68L
	this.instance_24 = new lib.YIUL68LT678L68L("synched",0);
	this.instance_24.setTransform(165.35,300.8,1,1,0,0,0,10.4,-14.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(10).to({startPosition:0},0).to({rotation:3.4379,x:167.3,y:301.35},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:0,x:165.35,y:300.8},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:10.5,rotation:1.9763,x:166.9,y:301.1},11).wait(93).to({startPosition:0},0).to({rotation:-0.2159,x:165.65,y:301.25},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({regX:10.6,rotation:1.517,x:167.15},11).wait(111).to({startPosition:0},0).to({regX:10.4,rotation:0,x:165.35,y:300.8},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({rotation:1.0002,x:166.1,y:300.85},11).wait(70).to({startPosition:0},0).to({regX:10.5,rotation:-0.2256,x:165.45,y:300.65},11).wait(36).to({rotation:-0.2256},0).to({regX:10.4,rotation:0,x:165.35,y:300.8},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UILT78LT7L
	this.instance_25 = new lib.UILT78LT7L("synched",0);
	this.instance_25.setTransform(180,222.15,1,1,0,0,0,-1.7,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(10).to({startPosition:0},0).to({regX:-1.6,regY:-0.1,rotation:3.4379,x:186.7,y:223.8},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:-1.7,regY:-0.2,rotation:0,x:180,y:222.15},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:1.9763,x:184.15,y:223},11).wait(93).to({startPosition:0},0).to({regX:-1.6,regY:-0.1,rotation:-4.9537,x:179.3,y:223.05},12,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({rotation:-0.0079,x:183.35,y:223.2},11).wait(111).to({rotation:-0.0079},0).to({regX:-1.7,regY:-0.2,rotation:0,x:180,y:222.15},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regY:-0.1,rotation:-5.2284,x:181.45,y:222.65},11).wait(70).to({startPosition:0},0).to({rotation:-3.4669,x:179.35,y:222},11).wait(36).to({startPosition:0},0).to({regY:-0.2,rotation:0,x:180,y:222.15},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UIO_Y7_Y789_
	this.instance_26 = new lib.UIOY7Y789("synched",0);
	this.instance_26.setTransform(184.8,294.75,1,1,0,0,0,2.6,7.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(10).to({startPosition:0},0).to({regX:2.5,rotation:3.4379,x:187,y:296.5},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:2.6,rotation:0,x:184.8,y:294.75},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:-100.3002,x:186.6,y:295.75},11).wait(93).to({startPosition:0},0).to({rotation:-99.2723,x:190.35,y:294.95},12,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regY:7.8,scaleX:0.9999,scaleY:0.9999,rotation:-88.3866,x:188.3,y:295.75},11).wait(111).to({startPosition:0},0).to({regY:7.6,scaleX:1,scaleY:1,rotation:0,x:184.8,y:294.75},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regX:2.5,regY:7.7,rotation:-103.7746,x:196.15,y:291.3},11).wait(70).to({startPosition:0},0).to({regX:2.4,regY:7.8,rotation:-93.785,x:192.05,y:291.2},11).wait(36).to({startPosition:0},0).to({regX:2.6,regY:7.6,rotation:0,x:184.8,y:294.75},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UILT78LT78L8
	this.instance_27 = new lib.UILT78LT78L8("synched",0);
	this.instance_27.setTransform(154.95,315,1,1,0,0,0,-26.5,11.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(10).to({startPosition:0},0).to({regY:11.8,rotation:3.4379,x:156.05},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regY:11.7,rotation:0,x:154.95},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:-26.4,rotation:1.9763,x:156,y:314.95},11).wait(93).to({startPosition:0},0).to({regY:11.8,rotation:-0.2159,x:155.35,y:315.55},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({rotation:1.517,x:156.3,y:315.25},11).wait(111).to({startPosition:0},0).to({regX:-26.5,regY:11.7,rotation:0,x:154.95,y:315},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regX:-26.4,rotation:1.0002,x:155.55,y:314.85},11).wait(70).to({startPosition:0},0).to({regY:11.8,rotation:-0.2256,x:155.15,y:314.95},11).wait(36).to({rotation:-0.2256},0).to({regX:-26.5,regY:11.7,rotation:0,x:154.95,y:315},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// UI_T7LT78L
	this.instance_28 = new lib.UIT7LT78L("synched",0);
	this.instance_28.setTransform(158.1,159.75,1,1,0,0,0,0,17.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(10).to({startPosition:0},0).to({rotation:-2.2606,x:163.3,y:159.55},16,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:0,x:158.1,y:159.75},14).wait(12).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({rotation:1.9763,x:164.45,y:159.9},11).wait(93).to({startPosition:0},0).to({regX:0.1,regY:17.9,rotation:-0.2159,x:157.9,y:160.3},12,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2159},0).to({rotation:-0.9539,x:161.5,y:159.7},11).wait(111).to({startPosition:0},0).to({regX:0,regY:17.8,rotation:0,x:158.1,y:159.75},11).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).to({regX:0.1,regY:17.9,rotation:1.0002,x:161.4},11).wait(70).to({startPosition:0},0).to({rotation:-0.2256,x:157.6,y:159.7},11).wait(36).to({rotation:-0.2256},0).to({regX:0,regY:17.8,rotation:0,x:158.1,y:159.75},10).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// yiult78lt78
	this.instance_29 = new lib.yiult78lt78("synched",0);
	this.instance_29.setTransform(409.25,334.85,1,1,3.4677,0,0,-4.4,-47.4);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(69).to({_off:false},0).to({rotation:0,x:375.45,y:343.85},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// uoi_79_79_
	this.instance_30 = new lib.uoi7979("synched",0);
	this.instance_30.setTransform(363.8,390.75,1,1,3.4677,0,0,-67.2,71);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(69).to({_off:false},0).to({rotation:0,x:333.45,y:402.45},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// tuitd7i
	this.instance_31 = new lib.tuitd7i("synched",0);
	this.instance_31.setTransform(438.95,164.35,1,1,3.4677,0,0,12.3,16.4);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(69).to({_off:false},0).to({regY:16.3,rotation:0,x:394.75,y:171.85},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// io_y8_89_
	this.instance_32 = new lib.ioy889("synched",0);
	this.instance_32.setTransform(399.15,333.9,1,1,3.4677,0,0,-15.8,13.6);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(69).to({_off:false},0).to({regX:-16,regY:13.5,rotation:0,x:365.05,y:343.45},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// ilt78lt78
	this.instance_33 = new lib.ilt78lt78("synched",0);
	this.instance_33.setTransform(398.05,236.5,1,1,3.4677,0,0,-16.8,10.8);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(69).to({_off:false},0).to({rotation:0,x:358.25,y:246.35},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// ilt678lt78l
	this.instance_34 = new lib.ilt678lt78l("synched",0);
	this.instance_34.setTransform(375.35,294.2,1,1,0,0,0,-9.4,7);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(69).to({_off:false},0).to({x:341.7,y:303.5},7).wait(11).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(93).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(81).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(111).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(65).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(66).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(70).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(36).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(95).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(109).to({startPosition:0},0).wait(11).to({startPosition:0},0).wait(64).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(1380).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(74).to({startPosition:0},0).wait(9).to({startPosition:0},0).wait(2553));

	// Layer_110
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#463335").s().p("AgdBQIAAifIA7AAIgFCfg");
	this.shape.setTransform(335.775,395.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#463335").s().p("AgdBhIAAirIA7gWIgFDBg");
	this.shape_1.setTransform(335.825,394.025);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(57).to({_off:true},12).wait(5107));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(69).to({_off:false},0).wait(5107));

	// Layer_111
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#463335").s().p("AgwC0IADloIBXAGIAHFjg");
	this.shape_2.setTransform(409.5,352.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#463335").s().p("AguCAIAPkzIBOA3IgIExg");
	this.shape_3.setTransform(404.575,354);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#463335").s().p("AgwBNIAbkBIBGBqIgXD/g");
	this.shape_4.setTransform(399.95,355.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#463335").s().p("AgyAZIAojNIA9CbIgmDNg");
	this.shape_5.setTransform(395.325,356.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#463335").s().p("Ag0gYIA0ibIA1DMIg1Ccg");
	this.shape_6.setTransform(390.725,357.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#463335").s().p("Ag2hMIBAhnIAtD+IhDBpg");
	this.shape_7.setTransform(386.1,359.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#463335").s().p("Ag3h/IBLg1IAkExIhRA3g");
	this.shape_8.setTransform(381.475,360.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#463335").s().p("Ag5izIBXAAIAcFiIhfAFg");
	this.shape_9.setTransform(376.8375,361.925);
	this.shape_9._off = true;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#463335").s().p("Ag5izIBXAAIAcFiIhgAFg");
	this.shape_10.setTransform(376.85,361.925);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},69).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},35).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},17).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},93).to({state:[{t:this.shape_9}]},12).to({state:[{t:this.shape_9}]},81).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},111).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},13).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},65).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},66).to({state:[{t:this.shape_9}]},10).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},70).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},36).to({state:[{t:this.shape_9}]},10).to({state:[{t:this.shape_9}]},10).to({state:[{t:this.shape_9}]},10).to({state:[{t:this.shape_9}]},95).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},109).to({state:[{t:this.shape_9}]},11).to({state:[{t:this.shape_9}]},64).to({state:[{t:this.shape_9}]},10).to({state:[{t:this.shape_9}]},14).to({state:[{t:this.shape_9}]},1380).to({state:[{t:this.shape_9}]},9).to({state:[{t:this.shape_9}]},74).to({state:[{t:this.shape_9}]},9).wait(2553));
	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(76).to({_off:false},0).wait(11).to({_off:true},1).wait(11).to({_off:false},0).wait(5077));
	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(88).to({_off:false},0).wait(10).to({_off:true},1).wait(5077));

	// Layer_2
	this.instance_35 = new lib.CachedBmp_13();
	this.instance_35.setTransform(0,222.2,0.1232,0.1232);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(5176));

	// Bitmap_1
	this.instance_36 = new lib.Bitmap3();
	this.instance_36.setTransform(11,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(5176));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.9,8,505.79999999999995,538.3);


(lib.uiolt7l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tekst
	this.instance = new lib.ClipGroup("synched",0);
	this.instance.setTransform(154.25,162.35,3.2422,3.2422,0,0,0,216,271.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:69},0).wait(96).to({regX:215.9,scaleX:3.7725,scaleY:3.7725,x:167.95,y:205.95,startPosition:165},0).wait(332).to({regX:216,scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:497},0).wait(178).to({regY:271.8,scaleX:4.0014,scaleY:4.0014,x:216.6,y:237,startPosition:675},0).wait(146).to({scaleX:3.5224,scaleY:3.5224,x:331.85,y:103.05,startPosition:821},0).wait(326).to({scaleX:4.0571,scaleY:4.0571,x:-380.2,y:230.65,startPosition:1147},0).wait(316).to({scaleX:3.5205,scaleY:3.5205,x:-147.75,y:105.05,startPosition:1463},0).wait(358).to({regY:271.9,scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:1821},0).wait(298).to({regY:271.8,scaleX:3.7791,scaleY:3.7791,x:61.7,y:192.95,startPosition:2119},0).wait(59).to({regY:271.9,scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:2178},0).wait(349).to({regY:271.8,scaleX:3.5807,scaleY:3.5807,x:59.6,y:153.15,startPosition:2527},0).wait(85).to({regY:271.9,scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:2612},0).wait(59).to({regY:271.8,scaleX:3.4695,scaleY:3.4695,x:17.7,y:151.1,startPosition:2671},0).wait(521).to({regY:271.9,scaleX:3.2588,scaleY:3.2588,x:283.6,y:71.8,startPosition:3192},0).wait(46).to({scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:3238},0).wait(282).to({regX:215.9,regY:271.8,scaleX:3.5967,scaleY:3.5967,x:22.35,y:167.9,startPosition:3520},0).wait(492).to({regX:216.1,scaleX:3.9299,scaleY:3.9299,x:-356.7,y:146.9,startPosition:4012},0).wait(124).to({regX:216,scaleX:3.2551,scaleY:3.2551,x:-7.4,y:148.95,startPosition:4136},0).wait(426).to({regY:271.9,scaleX:2.0087,scaleY:2.0087,x:30.2,y:128.1,startPosition:4562},0).wait(605).to({startPosition:5167},0).to({_off:true},1).wait(8));

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#606163").p("AfQfQMg+fAAAMAAAg+fMA+fAAAg");
	this.shape.setTransform(30.4866,-14.2093,2.0087,2.0087);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5167).to({_off:true},1).wait(8));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ADfJ6QgSgPgTglIh8jeQgbgugGgaQgHgngHgTQgFgOgKgTQgNgUgGgMQgMgWgZhGIjVoEQgihTgBgsQAAgqATgUQALgNARgEQASgEAOAJQARALADAfQACARABAkQACARAMAfIEpLPQAOAmANAZQATAoAUAiIBxDMQAQAeABARQACANgGAMQgGAOgNAEQgIADgJAAQgVAAgVgSg");
	this.shape_1.setTransform(-33.525,29.8813);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(5167).to({_off:true},1).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1256.5,-889.8,2349.3,2224.1);


// stage content:
(lib.m3l3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,60,675,1248,1978,2824,3743,4604,5167];
	this.streamSoundSymbolsList[60] = [{id:"audio1",startFrame:60,endFrame:675,loop:1,offset:0}];
	this.streamSoundSymbolsList[675] = [{id:"audio2",startFrame:675,endFrame:1248,loop:1,offset:0}];
	this.streamSoundSymbolsList[1248] = [{id:"audio3",startFrame:1248,endFrame:1978,loop:1,offset:0}];
	this.streamSoundSymbolsList[1978] = [{id:"audio4",startFrame:1978,endFrame:2824,loop:1,offset:0}];
	this.streamSoundSymbolsList[2824] = [{id:"audio5",startFrame:2824,endFrame:3743,loop:1,offset:0}];
	this.streamSoundSymbolsList[3743] = [{id:"audio6",startFrame:3743,endFrame:4604,loop:1,offset:0}];
	this.streamSoundSymbolsList[4604] = [{id:"audio7",startFrame:4604,endFrame:5168,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		//this.gotoAndPlay("m1");
	}
	this.frame_60 = function() {
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,60,675,1);
	}
	this.frame_675 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,675,1248,1);
	}
	this.frame_1248 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,1248,1978,1);
	}
	this.frame_1978 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,1978,2824,1);
	}
	this.frame_2824 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,2824,3743,1);
	}
	this.frame_3743 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,3743,4604,1);
	}
	this.frame_4604 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,4604,5168,1);
	}
	this.frame_5167 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(60).call(this.frame_60).wait(615).call(this.frame_675).wait(573).call(this.frame_1248).wait(730).call(this.frame_1978).wait(846).call(this.frame_2824).wait(919).call(this.frame_3743).wait(861).call(this.frame_4604).wait(563).call(this.frame_5167).wait(1));

	// Layer_1
	this.instance = new lib.uiolt7l7t8l("synched",0);
	this.instance.setTransform(370.6,412.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(5168));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-485.9,-77.6,1949.3000000000002,1824.1);
// library properties:
lib.properties = {
	id: '3FC01BEEAB397745AD18E137FCE8B315',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_39.png", id:"CachedBmp_39"},
		{src:"images/CachedBmp_13.png", id:"CachedBmp_13"},
		{src:"images/m3l3_atlas_1.png", id:"m3l3_atlas_1"},
		{src:"images/m3l3_atlas_2.png", id:"m3l3_atlas_2"},
		{src:"images/m3l3_atlas_3.png", id:"m3l3_atlas_3"},
		{src:"images/m3l3_atlas_4.png", id:"m3l3_atlas_4"},
		{src:"images/m3l3_atlas_5.png", id:"m3l3_atlas_5"},
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio2.mp3", id:"audio2"},
		{src:"sounds/audio3.mp3", id:"audio3"},
		{src:"sounds/audio4.mp3", id:"audio4"},
		{src:"sounds/audio5.mp3", id:"audio5"},
		{src:"sounds/audio6.mp3", id:"audio6"},
		{src:"sounds/audio7.mp3", id:"audio7"}
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