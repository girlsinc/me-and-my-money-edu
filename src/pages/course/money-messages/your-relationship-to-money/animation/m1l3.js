(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m1l3_atlas_1", frames: [[0,0,489,589]]}
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



(lib.Bitmap1 = function() {
	this.initialize(ss["m1l3_atlas_1"]);
	this.gotoAndStop(0);
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


(lib.yuk6rf7k6r7k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#897E7D").s().p("ABHIdQgjgEgWgeQgWgdABgnIAAAAQgXhYh1oVQgbg1AAhJIgBgHIACgBQAAgNACgRQALhXAtg5QAug5A1AHQA1AGAeBCQAeBDgLBXIgFAeIgBAMQgEB4AoD8QAXCXAgCdIAFAZIgCAAIAAASQgFAqgfAbQgZAWgfAAIgLgBg");
	this.shape.setTransform(-18.125,54.1812);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#897E7D").s().p("AksBBQAWhFgeg5IAMAMQAVAMApACQCCAKEYhUQARgKAXgDQAqgFAhAYQAgAXAFAlQAEAlgbAdQgaAegrAFIgCAAQhHALh3AOQjIAZirAPQARgXAKgjg");
	this.shape_1.setTransform(-32.8238,100.8061);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("ABWByQhjgBhVgSQgdgGgIgFQgFgEABgJQABgLA8AGQA4AGgBgCQgFgHhsgLQgggDgJgKQgFgGACgKQACgHAKgBQASgBA2AIQA2AJAMgBQAIgBgNgHQgIgEg5gLIhFgKIgYgFQgNgEgDgLQgGgXBQAQQBSARAAgDQAAgFhyglQgZgIAFgQQAFgQAeAIQCCAtAuAGQAZAEAIgKQAEgFgtgMIg7gQIgjgLQgTgHAHgKQAHgKAlADQATACASAEQCUAoAoAjQAuAngWBVQgGAWhiAAIgNAAg");
	this.shape_2.setTransform(-80.9374,99.9684);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#90BCB9").s().p("AgejlIAbgKQAbgTADgqIAAISIADAKQACAMgCAKQgHAig1AFg");
	this.shape_3.setTransform(-58.1556,106.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5A9797").s().p("AiOCuIAAm/IEdBjIAAHAg");
	this.shape_4.setTransform(-79.225,103.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#62B7BB").s().p("AioDOIAAoRIFRB1IAAISg");
	this.shape_5.setTransform(-78.125,103.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C5CDCD").s().p("AicDJIgXnfIA3goIExBrIAAISg");
	this.shape_6.setTransform(-75.45,99.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#416969").s().p("AioDPIAAoSIFRB1IAAISg");
	this.shape_7.setTransform(-72.4,96.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EDB8D5").s().p("Agij/IAfgLQAegVADgvIAAJNIAEALQADAOgDALQgIAmg8AGg");
	this.shape_8.setTransform(-44.0682,100.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CE75A7").s().p("AijDCIAAnyIFHBvIAAHyg");
	this.shape_9.setTransform(-68.325,97.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EC7CB0").s().p("AjBDmIAApOIGDCDIAAJOg");
	this.shape_10.setTransform(-67.025,97.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DAD2D7").s().p("Ai0DgIgboVIBAgtIFfB3IAAJNg");
	this.shape_11.setTransform(-63.975,93.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9D587F").s().p("AjBDmIAApOIGDCDIAAJOg");
	this.shape_12.setTransform(-60.475,89.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.9,0,101.9,136.3);


(lib.yuk6r7kr67k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#465E6D").s().p("ABLGzQhNggg9g2QhMhAgagFQgXgFgOgGQgVgKgFgLQgFgMgBgFQgBgHAFgKQAyhcATiCIAXjuQAHhMAGgeQAKg7AWgqQADgFAFgDQAFgEAEAEIABgEIAJgGQAnBQAQA3QAJAfAIAvIAQBPQAXBoBXDcQBSDQAVB3QhTgFhNggg");
	this.shape.setTransform(-0.0333,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.5,-47.2,47,94.4);


(lib.yuilt678lt678l678l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#BCB453").s().p("AiRIkQgggcgFgsIgBgTIgBAAIAEgaQAiihAZilQApkJgEh/IAAgNQgCgJgEgWQgKhcAfhGQAghGA3gHQA4gHAwA8QAwA8AMBcIACAgIABABIgBAHQABBNgdA4QhxIMgjCDIAAAAQABApgWAfQgYAgglAEIgMABQggAAgbgYg");
	this.shape.setTransform(0,57.1763);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.5,0,37.1,114.4);


(lib.uoiy79y899 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#465E6D").s().p("Ag3AJQAPh3AuhvQAIgUAMgFQAIgDAIAFQAHAFgBAGIADgNQgVCnAeClQAFAZgEAMQgDAIgOAQIhfBlQgTh2APh5g");
	this.shape.setTransform(-0.0042,24.7938);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,0,12.5,49.6);


(lib.uoy89y899 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#2E2E2E").s().p("AnqCuQgFibAoh2QAahQAmguIAQgdIBHh8IEVANQEmAEBWglIAJAQQB8COAFDMQADBmgWBKQjtCLjtBKQiVAuhnAAQjlAAgHjhg");
	this.shape.setTransform(-0.0104,0.02);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.1,-39.8,98.30000000000001,79.69999999999999);


(lib.uiolyy799 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#BCB453").s().p("Ah7ACIhjiaIgBgCQgZglAGgqQAGgqAhgWQAhgWApAKQAoALAZAlQANATAEAVQB8EcBgBiQAwAxAXgIQg/ArheBEQhniVhriig");
	this.shape.setTransform(24.4246,31.3054);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#775A45").s().p("ABaC9IgOgWIglg/Qggg1gHgGQgbgaAxBWQAeAyAFASQADALgHAEQgJAGgHgDQgNgFgQgeIgihFQgTgigGgBQgDgBAcA1QAbA4gJAGQgJAFgGgEQgHgFgSgbQgxhOgnhgQgshtAVgPQBMg2A4AeQAyAbBfCDIATAhQASAkgHAKQgHALgPgQIgYgeIgng0QgcgogEAGQgGALANAYQAZArBcBvQAUAagOALQgOALgSgWIgqgzQgngugDABQgDABAwBKQAuBJgZADIgDAAQgKAAgIgKg");
	this.shape_1.setTransform(50.5757,74.8379);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,67.3,94.7);


(lib.uily7l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#3B4C56").s().p("ABYHtQgIgCgLgLQiCiRhpieQgig1gPggQgNgfgUhDIg0i7QgbhfgIg2QgOhTAJhDQBBCMB3BpQB3BpCSAvQAtAOAagIQARgFAVgSQBAg0A0hGIAKgBQgWBUABBTIAABPQgBAtgNAfQgIATgVAjQgLAVgKAhIgSA2QgSA1gjA9QgUAjgvBIQgQAXgOAAIgDAAg");
	this.shape.setTransform(0.008,49.2908);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.4,0,68.9,98.6);


(lib.uilt79t799 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C3AAB6").s().p("AhMDFIhOhFQAWg7AShBIANg0QAKiHBEgyQAhgZAhACQB+BEgQCgQgIBQghBCIgfCLIgOAAQg/AAhQg8g");
	this.shape.setTransform(7.3849,25.7381);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AiyHNQgYgbAAgnIACgRIgCAAIAIgWQAwiSAliBQBBjhAJhuIABgLIgBgdQABhQAig5QAjg5AxAAQAxAAAjA5QAjA5AABQIgBAdIABABIgCAFQgGBCghAvQihHMgkBbIAAAAQgDAkgYAYQgYAYghAAQgiAAgZgcg");
	this.shape_1.setTransform(1.05,51.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBBF9A").s().p("AhMgjQgHibABgJIAAgDQAAgnAYgbQAZgcAhAAQAjAAAYAcQAZAbAAAnQAAAUgHASQgvEJgDB6QgCA9AIAHQgoAAghADIgYADQgDiNgJi/g");
	this.shape_2.setTransform(-11.1517,112.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBBF9A").s().p("AgODEQgKgFgBgMIABgXIADhAQACg1gCgJQgDgNgDAIQgEAKgCAyQgDAzgFAPQgDAJgHAAQgJAAgEgFQgHgKADgdQAGg0ABgQQADghgDgEQgCgCgGA0QgGA2gKAAQgJgBgDgGQgDgHABgcQABhQAThZQAVhkAXgBQBQgCAaAxQAYArAFCNIgCAhQgFAjgKAEQgKAFgDgTIgDghIgCg6QgBgpgGACQgKAFgCAYQgEArAOB9QACAcgQABQgPACgCgZIgGg5QgGg1gDAAQgDgBgBBNQgBBDgPAAIgEgCg");
	this.shape_3.setTransform(-12.8286,158.2028);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.8,0,45.7,178);


(lib.uilt7l78lt87 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#959042").s().p("AgZKtQhlgGhtgOIhYgMQgGg+APhxIAQhkQAxhagVh9QgGgngNglIgLgeQhIiCgmiXQhKkwCwhpQBDgpA2gKQAbgFANADQAoAlCJgNQBFgGA9gOQAegHA4AaQAbANAWAPQASA8BNCsQA0BggnEzQgTCYgeCGQA4DaAWB9QhrA7joAAQg4AAg+gDg");
	this.shape.setTransform(8.6,-6.3,1,1,0,0,0,8.6,62.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.2,-137.6,86.5,137.6);


(lib.uil78lt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C0A07E").s().p("Ah1B2QhcgVCnhtQBSg3BmgzIAJAGQgeB9gjAdQhDA4hKAQQgYAEgVABg");
	this.shape.setTransform(9.241,-204.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AiXBpQAYiIgJgVICJhGQCNhDAKAQIgRB7QgNB+AUAWQgwArg9AXQgkANggAAQhIAAgshIg");
	this.shape_1.setTransform(7.5,-196.5541);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("AikCsQgHggAShDQAZiPgJgXICRhJQCUhFALAQIgTCCQgOCFAWAWQgoAogyAnQhkBOg3AAQhAAAgLgzg");
	this.shape_2.setTransform(6.925,-193.1583);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#444444").s().p("AgtB9IgnmrIBUF+IBVDfg");
	this.shape_3.setTransform(-13.95,-21.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#535454").s().p("AjYEEIgBAAQgggHgUgNIAAjzIADAAIgBgBQgCgNAAgSQAAhgBJhDQBIhEBmAAQBmAABIBEQBJBDAABgIgCAcIAAADQAkC9ALALIg4AQIgDABQhwAdhgAOQhOALg7AAQgvAAgjgHg");
	this.shape_4.setTransform(29.075,0.4803);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3B289").s().p("AgcFgQgsgggOgxIgHAAQhUkpg8k1QBOARCQgVQBhgPBvgdQgEErAqEMQAHAWABAZQAAA/gxAtQgwAthGAAQg4AAgsggg");
	this.shape_5.setTransform(31.2,60.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AgaIjQgHhMgTiVQgmkpg8lpQgRgbgFgfIgBgDIABAAIgBgQQAAhAAwgtQAxgtBFAAQBEAAAwAtQAxAtAABAIAAABQAQBIAADKQgBE2g/E0IgJAUQgNAYgOAQQgZAcgcAAQgWAAgZgVg");
	this.shape_6.setTransform(38.9008,123.5314);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AiRCaQhRAAghgeQgKgMgDgQQgIggAfgUIBGgrIDriAIg2BEQgsBCAwAAQBXgaCViDIgCgEQAPACAJAYIAAgBIAAADQAJAYACAqQAAAVgBAQIAAABIh/BLQiPBQhLAQQgfAGglAAIgGgBg");
	this.shape_7.setTransform(27.5853,200.8519);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D3B289").s().p("AiVBIIBfhFQAGgBAIgOQAOgdAEhDIgHg+ICPAAQANCqAXgFIgcAPIAIAeIglAnQguArgoAYQgqAZggAAQg/AAgThjg");
	this.shape_8.setTransform(38.5,188.6307);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#535454").s().p("AlfAjIA2j2IAXAHIAACOIAuAQIAMiUIA5AAIgfCUIDHA8IBkhfIAAhxIA0AAIAABxIBuAjIAAidIAZgEIA4B+QiJEegKAHIgCAAQgcAAoOixg");
	this.shape_9.setTransform(2.025,-47.4372);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7B7272").s().p("AhdDhQgfg5AJi0QAJi3BRgnQAngUAmAQIAXARQAYAYALAnQAjB9hzDeIhZA4QgFABgDAAQgOAAgMgVg");
	this.shape_10.setTransform(29.8983,-161.2003);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#7B7272").s().p("AApDCIhbihQgMgWgEgMQgGgUAEgQQADgJAMgRIB7ixIABCpQAABogEA2QgIBYgZBCg");
	this.shape_11.setTransform(31.6355,-145.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#313131").s().p("AmPAhQgDgQADgUQAFgpAcgYIAwAPQA/AQBOAIQD5AZEshFIARArQAQAtgEATQiWAWivAMQhiAGhRAAQjNAAhbgpg");
	this.shape_12.setTransform(5.0832,-62.9816);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#4E6145").s().p("AjsJkQABh2AIiYQARkvApikQgKh9AIh+QAQj9BcgGIChgNQBAACBLAvQgRASgXAoQgvBRggB0QhoF0BJJIQg5AVhEAKQgnAGghAAQhSAAgsglg");
	this.shape_13.setTransform(4.2,-128.1311);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#7B7272").s().p("AmGJOQAKgLAVgqQAqhUA2idQgliDgbiVQg3koAyhaQBJifARg5IAvgZQA0gZAdAHIB2ATQB+ANAngiIDUBPIhVJhIgDBXQAGBoAuBUIANAcQAOAjAJAgQAbBmgsAhQiKAiikAVQh6APheAAQidAAhPgqg");
	this.shape_14.setTransform(5.9384,-126.6406);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#535454").s().p("AhJHQQhIgIixgbIijgZQgEjFAnk8QAikbATgmIDzAKQESADCjgiQAIAAAzgJQAqgHAGAGIAYCFQAbCfASCGQA4Gsg8ANIoLA6g");
	this.shape_15.setTransform(6.6159,-18.9385);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#6E6263").s().p("AA8D0IhZg4QhzjeAjh9QALgnAYgYQANgMAKgFIAYgFQAcgEAZANQBRAoAJC2QAJC1gfA4QgMAWgOAAQgDAAgFgCg");
	this.shape_16.setTransform(-11.4983,-162.6906);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#535454").s().p("AjcDuIAAgBQgdgJgUgRIAfjxIADABIAAgBQgBgKACgVQANhfBRg6QBQg6BlANQBlANA/BNQA/BNgMBeQgDATgDAIIAAADQAMDCAIAMIg5AIIgDAAQhxAPhiABIgYAAQh+AAhFgYg");
	this.shape_17.setTransform(-17.075,-13.7669);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B49675").s().p("AAAF4Qg5gHgogmQgoglgIgzIgFAAQgskpgWlDQBMAbCQgDQBhgBB0gPQgqEoAGEPQAFAYgDAYQgIA/g2AmQgsAfg1AAQgMAAgMgCg");
	this.shape_18.setTransform(-17.525,48.0612);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#B49675").s().p("AgqIjQgFhNgRiVQggkqg1lqQgRgcgEgeIgBgEIABAAIgBgQQACg/AxgsQAygsBEABQBEABAwAuQAvAugBBAIABABQAOBNgEDGQgHE2hFEyIgKAUQgMAYgPAPQgaAbgaAAQgXAAgZgVg");
	this.shape_19.setTransform(-15.2806,110.3091);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#292929").s().p("AiUCXQhRgCgggfQgJgMgEgQQgHggAfgTIBHgoIDth9Ig3BCQgtBCAwABQA3gPBhhGQBWg9ABgHIgCgEQAPADAIAYIABgBIAAACQANAngFBBIAAAAIAAABIiBBJQiRBNhLAOQgcAEghAAIgNAAg");
	this.shape_20.setTransform(-28.6566,187.4833);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#B49675").s().p("AiWBGIBhhDQAGgBAHgOQAPgdAGhCIgGg/ICQADQAICpAYgDIgcAOIAGAfIgmAmQgtAqgpAXQgpAYggAAQhAAAgShlg");
	this.shape_21.setTransform(-17.55,175.2948);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.3,-216.3,112.6,432.6);


(lib.uij797t997 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#CDE9DB").s().p("Ag3AAIATgqIBcAqIAAArg");
	this.shape.setTransform(39.025,-58.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#64927D").s().p("AiDCsQAGgvAMg5QAXhvAYgtQAZguBCAJQAhAEAcANIAAhfIAugGIAACOIhrEVg");
	this.shape_1.setTransform(-33.175,53.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#72C59B").s().p("AnIQKQhxg8AYj1QAKhdAbhhQAZhXAbgxQAohJBagFQAtgCAlANQGKkuDEpHQA9i3Aii9IAWiYQBfA0gJAoQgEAUgYAJQhMHKjfG+QhYCuhVB4QhQBwgqAPQhFAYhEFBQghCggVCcQgFAWgbAMQgPAGgUAAQgxAAhMgog");
	this.shape_2.setTransform(-0.0295,-0.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55,-107.4,110,214.8);


(lib.uil7t7t9t79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#686439").s().p("AhzgaQgbh1gLg1IAAgCQgKgqAUgjQAUgiAngIQAmgIAjAYQAhAYAKApQAFAVgDAUQAQEkA3B4QAcA8AYABQguAJhKARIhAAQQguiogqiyg");
	this.shape.setTransform(15.7583,31.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#775A45").s().p("ABRC3IgNgXIgig9Qgdg0gGgGQgagZAsBTQAbAxAFARQACAKgHAEQgJAFgHgDQgNgFgOgeIgfhDQgRghgGgCQgDgBAZA0QAaA3gKAEQgKAFgFgEQgIgGgQgbQgthLgjheQgmhpAWgNQBOguA3AgQAvAcBZCCIASAgQAPAjgHAJQgHAKgOgQIgXgeIgkg0QgagngEAFQgHALAMAXQAWAqBXBuQASAagOAKQgOAJgRgWIgngyQgmgvgDABQgCABAsBJQArBIgaABIgBAAQgMAAgHgKg");
	this.shape_1.setTransform(29.2813,77.011);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape}]},1).wait(1));

	// tal
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#775A45").s().p("AgGCOQgYgNgeguIgZgsIA+i2IA1AWQA2AeABArQABA3ggBJQgdBAgXAAQgEAAgEgCg");
	this.shape_2.setTransform(24.5314,73.4686,1,1,140.0126);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#775A45").s().p("AhACOQgRg2AWibQAEgRAGgTQAMgkAMgCQALgCAAAVQAAAMgDAZIgKBAQgHAtAHgBQAMgDAHgYQALgvALiMQAEgfARACQARADgDAbQgLB7AFACQACABgOAPQgPASAUAQQAIAGACgGQgDACABgEQAHghgEAgIgBADIAKgIQAQgPAAAIIgeD7QhXgTgTg8g");
	this.shape_3.setTransform(34.0042,75.6716,1,1,140.0126);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46.2,96.3);


(lib.tyjke56j56j6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#6E6263").s().p("AhSIaQghgMgPgiQgPgiAKglIgBAAQgEh+AGn/QgQg6AShHIAAgGIACgBQAEgQAFgNQAehTA5gtQA4guAyATQAyASAPBHQAPBIgeBSIgMAcIgDAMQgwC5gPHyIAAAZIgBAAIgFARQgPAogiATQgVAMgVAAQgOAAgPgFg");
	this.shape.setTransform(0.0041,54.2926);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,0,28.4,108.6);


(lib.ouiy89y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#DCB783").s().p("AhxMLQAFgzgElAIgGlzQgBhPgQhoQgHgtgbiKQgJg0AAhIQAAhfAnhTQAhhGBKhXIAMAIQAGADgFAGQgIAJgDAEQgCAFgMANIgOASQgQAegEALQgHAXAKASQA8BnAQB6QAGAtAHBbQAKBPAeAwQAMAUAXAaIAnAsQAwA4ADAvQACAagKAeQgFASgQAjQgGAMgLEYQgLEYgFAMQgKAUgHAGQgHAHgRAFQg2ARg1AAQgpAAgpgKg");
	this.shape.setTransform(-0.0326,78.8618);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.9,0,35.8,157.7);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9D8A93").s().p("AgTDiIhhgkQgBhAgHhDIgGg2QgniAAuhHQAXgkAfgKQCNATArCbQAVBNgHBKIAUCMQgfAQgrAAQgqAAg0gPg");
	this.shape.setTransform(14.8626,24.1252);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AAUHoQgggRgOgkIgEgQIgCAAIgBgXQgGiVgMiLQgUjpgehqIgDgLIgLgaQgdhLAMhCQANhCAugRQAugSA0ApQA1ApAdBLQAGAPADAMIABAAIAAAGQARBBgNA2QAOHVgCB0IAAAAQAJAjgNAfQgOAfgeAMQgOAFgNAAQgTAAgTgKg");
	this.shape_1.setTransform(14.0829,52.4531);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C4A082").s().p("AhIgOIhBiXIgBgDQgOgkANgiQANgjAggMQAhgNAhARQAfARAOAlQAHATAAASQAzEJApByQAUA6AKAEQgmAPgeAOIgVALQg3iEhKitg");
	this.shape_2.setTransform(25.362,113.7102);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C4A082").s().p("AA2C7QgKgBgGgLIgHgWIgUg8QgQgzgFgHQgSgZAaBQQAOAwABARQABAJgHADQgHADgGgEQgLgGgHgdQgYhhgHgDQgCgBANAyQANA1gJADQgJADgEgFQgGgGgJgaQgbhMgPhZQgQhlAVgIQBLgfApAkQAmAgA3CCIAKAgQAIAhgIAIQgIAIgJgQIgPgfIgXg0QgQgngEAEQgIAJAHAXQAMApA5BwQAMAZgOAHQgOAHgLgWIgZgzQgZgwgDABQgDAAAbBJQAYBEgUAAIgBAAg");
	this.shape_3.setTransform(41.598,156.7121);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,53.4,175.5);


(lib.oy7989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#6E6263").s().p("AiyD6QAXACAhg4QBChwAzkhQAAgVAGgTQAOgoAjgTQAkgUAjANQAjANAPAlQAPAmgOAoIgBACQgRA2goBvQg9Csg+ChQhlgqhEgZg");
	this.shape.setTransform(-17.8936,31.665);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49675").s().p("AgzCCQAbhPgCgBQgDAAgaA0IgcA4QgLAYgPgHQgPgHAMgcQA8h8ANgsQAHgZgJgJQgFgFgRArIgXA5IgQAiQgKARgJgIQgIgIAIglIAKgjQA6iOAogkQAsgoBSAhQAXAJgQBtQgOBigcBSQgKAdgGAHQgEAFgKgDQgKgDAOg6QANg3gCABQgIAEgYBqQgIAfgLAIQgGAEgIgEQgHgCAAgLQABgRAOg1QAbhagTAdQgFAIgRA4IgVBCIgHAYQgGAMgLABIgCABQgVAAAZhLg");
	this.shape_1.setTransform(-32.4069,78.8522);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,0,45,99.3);


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
	this.shape.graphics.f("#DCB783").s().p("AAAIeQiCgRg4AHQgCgZAJijQAJinAGgVQAIgaACghQABgXgBgmQgFhVAAgrQgChLAJg2QAQhkA4hXQA4hXBTg4QAOgKAKAAQAHABAFAFQAGAGgCAGIgRgEQAXA8gLBRQgFArgcBlQgUBKAIBRQAGBEAbBWIAHAfQAFAUAEAKQAIASAkDRQAlDRAIASQglAAiWgUg");
	this.shape.setTransform(0.0068,56.1738);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.7,0,37.4,112.4);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#97958A").s().p("AgfASIgPANIAAgxQAhgRAhAHQARADAKAHIgXAxQgigVgVAIg");
	this.shape.setTransform(-44.3,-171.2918);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AgFg8Qgig1gqg0IgigqQgEgCABgFQAAgKATgKQATgKAZAYQANAMAJANQBQB2AjBYQATAwAOA7QAKAigMAuQgFAXgIAQQAEh9htisg");
	this.shape_1.setTransform(32.8294,-157.6492);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AhaFuQgYgOAGgpQBGhhAriAQBYj9h8iWQgEgCgCgFQgEgJAIgLQAIgLAbgJIAbgHIAVAyQAXA9APA8QAwDAg5BoQhaCng2BtIgFAAQgKAAgKgGg");
	this.shape_2.setTransform(-18.4315,-143.9118);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E5BFA4").s().p("AggCNIh7iNQAVgVgOiEIgSh+QALgQCUBEQBJAjBHAlQgGAOANBJIAPBGQASAlgZB7QgYB5gTAAQgPAAh+iOg");
	this.shape_3.setTransform(3.9062,-179.6765);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A68697").s().p("AhEBYQgFg2ABhqIAAirICACzQAMAQADALQAFAQgHAUQgEANgNAVIheCjIAIAwQgahDgIhZg");
	this.shape_4.setTransform(-21.6731,-135.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C3AAB6").s().p("AhXJIQhUgFhZgNIhHgMQgHg6ASgvIATgjQAwhVgSh1QgGgkgLgkIgKgcIgDgrQg2hagOjEQgHhrAGh2QACgzAjgoIAAgEIAHgDIAIgHIADAEICMgsQAoAjCHgMQBCgGA7gNQAfgHA2AZQAbAMAVAOQASA5BLCiQA0BahEEfQgiCRgsB+IA3DMQhpA4jGAAQgtAAgzgEg");
	this.shape_5.setTransform(5.9061,-120.9485);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A68697").s().p("AgNBdIAHi5IAUADIgGC2g");
	this.shape_6.setTransform(-1.875,-46.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A68697").s().p("AgNBdIAHi5IAUADIgGC2g");
	this.shape_7.setTransform(-17.925,-48.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A68697").s().p("AgShWIAVAAIAQCqIgVADg");
	this.shape_8.setTransform(22.525,-46.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C3AAB6").s().p("Am2I8IAQk0IAKAAIAhkuQALkwARhlQARhfAvg4QAFgFAXAaQAaAcALgBQCNAhDfgcQBxgOBUgVQAQAiAqHEQAtHegEC/Qj+AFhkAMg");
	this.shape_9.setTransform(1.9663,-14.6337);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C3AAB6").s().p("AACDxQhZgBhpgNIgCgBIg2gHQAJgLAKiyIAAgDQgDgLgCgOQgLhXA6hGQA5hHBegMQBcgMBKA1QBLA1ALBYQACAMAAAQIAAABIACAAIAdDdQgTAQgaAIIgBAAQhAAXh2AAIgTAAg");
	this.shape_10.setTransform(-13.525,9.0225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E5BFA4").s().p("AhuE/QgxgjgJg6QgCgXAFgVQAGj3gnkSQBpAOBaABQCFACBFgZQgTEngoEUIgGAAQgHAvglAiQglAjg0AGQgLACgLAAQgxAAgogdg");
	this.shape_11.setTransform(-13.1,65.8821);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E5BFA4").s().p("Ag0HyQgOgPgMgWIgJgSQg/kagGkdQgEi6ANhCIAAgCQgBg6AsgqQAsgrA+gBQA/gBAuApQAtAoABA7IAAAOIABAAIgBADQgEAegPAYQgxFNgeESQgPCJgFBHQgXAUgUAAQgZAAgXgZg");
	this.shape_12.setTransform(-15.1471,123.1524);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DEDEDE").s().p("ABFCHQhFgNiEhHIh3hDIgBAAQgEg8AMgkIAAgCIAAAAQAIgVAOgDIgCAEQAAAFBQA6QBZBAAzANQAsgBgpg8Igzg9IDaByIBBAmQAdARgHAeQgDAPgJALQgdAchLACg");
	this.shape_13.setTransform(-2.8519,194.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E5BFA4").s().p("AgDCHQgmgVgqgnIgjgjIAGgcIgagNQAWADAIicICEgCIgGA5QAGA+ANAaQAHAMAGABIBZA+QgQBdg7AAQgdAAgmgWg");
	this.shape_14.setTransform(-13.075,182.9086);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#9D8993").s().p("AjADiIgCAAIg1gIQAGgJAMi0IAAgCIgFgaQgLhWA5hHQA7hGBcgMQBdgNBKA2QBLA1ALBXIACAdIAAABIACgBIAdDeQgRAOgcAKIgBAAQhBAYhyAAQhbAAh9gQg");
	this.shape_15.setTransform(21.85,-1.4205);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BF9F89").s().p("AhuE/QgygjgHg6QgDgWAEgVQAGj4gmkSQBqAOBZABQCFADBFgaQgTEngpEUIgFAAQgHAvglAiQglAjg0AGQgLACgLAAQgxAAgogdg");
	this.shape_16.setTransform(22.275,55.3821);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#BF9F89").s().p("Ag0HyQgOgPgMgWIgJgSQg/kagGkdQgEi4ANhEIAAgBQgBg7AsgqQAsgqA+gCQA/gBAuApQAuAoABA7IgBAOIABAAIgBAEQgEAcgPAaQgxFMgeESQgPCJgFBHQgXAUgUAAQgZAAgXgZg");
	this.shape_17.setTransform(20.2043,112.6524);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B7B8B8").s().p("ABFCHQhFgNiFhHIh3hDIAAAAQgEg8AMgkIAAgBQAIgWANgDIgBAEQAAAFBPA6QBaBAAzANQAsgBgpg8Ig0g9IDaBzIBBAlQAdARgGAeQgDAPgJALQgeAchKACg");
	this.shape_18.setTransform(32.5231,183.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BF9F89").s().p("AgDCHQgmgVgqgnIgjgjIAGgcIgagNQAWADAIicICEgCIgFA5QAFA+AOAaQAHAMAFABIBZA/QgQBcg7AAQgdAAgmgWg");
	this.shape_19.setTransform(22.275,172.4113);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#343433").s().p("AgTFLQhRgThNgdQhFgbgMgNQgWgXAZjjQAZjkAhg5QAeg0BogIQBUgHBoAXIAeBXQAkBpAaBeQBSEqguBDQgcAohTAAQhAAAhhgYg");
	this.shape_20.setTransform(-30.9268,-143.9208);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.9,-208,115.8,416);


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
	this.shape.graphics.f("#686439").s().p("AAmIdQgkgIgUgfQgWgfAFgnIgBAAQgYh6hLn7Qgag3AHhIIgBgHIACAAIAEgeQAShWA1g0QA0g0A2ALQA4ALAaBFQAbBEgSBWQgDAPgFAOIgBAMQgNB2AWD+QAMCQAWCnIAEAYIgCAAIgCASQgJAqghAXQgaASgcAAQgJAAgKgCg");
	this.shape.setTransform(15.684,54.3056);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,31.4,108.6);


(lib.io8080 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#D4AD91").s().p("AA5ByQhKgPhEg5QgWgSgVg5QgOgmgJgqIAKgGIA9AhQBJAnAzAjQCoBthdAVIgRACQgTAAgagGg");
	this.shape.setTransform(-0.0046,0.0057);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.2,-11.9,30.4,23.9);


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

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ag1AXQgHgJgBgJQALgRAVgNQApgYAyAdQgDAMgKAMQgUAbghAEIgPACQgWAAgMgOg");
	mask.setTransform(6.175,3.751);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAFQgDgBAAgEQABgHAGAAQAIAAAAAHQAAAIgIAAQgCAAgCgDg");
	this.shape.setTransform(5.1,4.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgQASQgIgIAAgKQAAgKAIgHQAHgHAJAAQALAAAHAHQAHAIAAAJQgBALgGAHQgIAHgKAAQgJAAgHgHg");
	this.shape_1.setTransform(3.45,3.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#369BBA").s().p("AgXAYQgKgKAAgOQAAgNAKgKQAKgKANAAQAOAAAJAKQALAKAAANQAAAOgLAKQgJAKgOAAQgNAAgKgKg");
	this.shape_2.setTransform(3.45,3.4);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(0.1,0.1,6.7,6.7), null);


(lib.ClipGroup_1_1 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AgTAtQhGgKACgzQAAgMARgJQASgIAZAAQBAABA0A3QghAjg0AAQgLAAgMgBg");
	mask.setTransform(8.8472,4.736);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAHQgDgCAAgEQgBgDADgDQADgDADAAQADgBACADQAEADAAADQAAADgCACQgCAEgEAAIgBAAQgCAAgDgCg");
	this.shape.setTransform(7.85,5.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgRAWQgJgIAAgLQgCgLAIgJQAGgJAMgBQAKgBAKAHQAJAIABALQABALgIAJQgHAJgLABIgDAAQgJAAgIgGg");
	this.shape_1.setTransform(5.8,3.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#369BBA").s().p("AgWAdQgMgJgCgQQgCgPAKgMQAKgMAPgCQAOgBAMAKQAMAJACAQQACAOgKANQgKAMgPABIgEABQgMAAgKgJg");
	this.shape_2.setTransform(5.8064,3.8069);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_1, new cjs.Rectangle(2.1,0.1,7.5,7.5), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAAJQgDgBgDgCQgCgDAAgDQABgDADgDQACgCADAAQADABADADQACACAAADQgBADgCADQgDACgDAAIAAAAg");
	this.shape.setTransform(3.275,6.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgCAcQgLgBgIgJQgHgKABgKQACgMAJgHQAJgHAKABQALABAIAJQAHAJgCALQgBALgJAIQgHAGgKAAIgCAAg");
	this.shape_1.setTransform(5.3,4.5688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0098BA").s().p("AgDAmQgQgCgJgNQgJgMABgOQACgPAMgKQALgKAPACQAPABAKAMQAKAMgCAPQgCAQgLAJQgLAJgNAAIgDAAg");
	this.shape_2.setTransform(5.3,4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(1.6,1,7.4,7.5), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAAQAAgGAHgBQADAAACACQADADAAACQAAADgCADQgDACgDAAQgHAAAAgIg");
	this.shape.setTransform(3.275,4.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgQASQgHgIgBgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgHgHg");
	this.shape_1.setTransform(4.925,3.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0098BA").s().p("AgWAYQgKgJAAgPQAAgNAKgKQAJgKANAAQAOAAAJAKQAKAKAAANQABAOgKAKQgKAKgOAAIAAAAQgNAAgJgKg");
	this.shape_2.setTransform(4.9262,3.3762);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_0, new cjs.Rectangle(1.6,0,6.700000000000001,6.8), null);


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

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgVAPg");
	this.shape_2.setTransform(-1.8976,-0.0427,0.6215,0.6215,20.2067);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CD958C").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
	this.shape_3.setTransform(-1.7122,-1.5494,0.6215,0.6215,20.2067);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C28B85").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAigbAfQgUAaggAQQgJAEgGAAQgJAAgFgHg");
	this.shape_4.setTransform(2.6,-2.6,0.6215,0.6215,14.995,0,0,4.6,-5.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAHQgKgJARgGQARgFAOANQgTAKgJAAQgGAAgEgDg");
	this.shape_5.setTransform(-2.4362,0.5784,0.8727,0.8727,20.2084);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C28B85").s().p("AgKAXQghgGAMgaQAKgVAcAMQAPAFANAKQgLAagZAAIgJAAg");
	this.shape_6.setTransform(-2.6464,0.4849,0.8727,0.8727,20.2084);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD958C").s().p("AgfAfQgfgBgIgGQgHgGAHgOIAGgJQAIgIANABQAYgBATgJQAggPArAQQgiABgVAZQgUAagfAAIAAAAg");
	this.shape_7.setTransform(-1.1776,-0.6977,0.6215,0.6215,20.2067);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C28B85").s().p("Ag5AhQgKgNALgOIAEgDQAHgEAQABQARABATgVQAVgWAiABQgRASgXAcQgXAdgXAGQgHACgGAAQgOAAgGgJg");
	this.shape_8.setTransform(-0.9092,0.6798,0.6215,0.6215,20.2067);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E6E6E5").s().p("AglAMQAfgMAsgZIgoAkIgVAPg");
	this.shape_9.setTransform(-1.8346,0.1461,0.6215,0.6215,20.2067);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD958C").s().p("AhCAXQgKgHAHgOIAGgJQAJgKANADQA8gTA2AJQgnAHgUAWQgSAXgzAAQgGgBgFgEg");
	this.shape_10.setTransform(-1.4186,-0.548,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C28B85").s().p("Ag2AiQgJgMALgOIADgEQAIgEAQgCQAQgCAUgWQAUgWAcALQgFABgaAhQgVAYggAQQgIAFgHAAQgIAAgGgIg");
	this.shape_11.setTransform(2.65,-2.65,0.6215,0.6215,14.995,0,0,4,-6.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E6E6E5").s().p("AgkANQAfgMAqgaQgPARgXAUIgVAPg");
	this.shape_12.setTransform(-1.8876,0.11,0.6215,0.6215,20.2067);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CD958C").s().p("Ag9AYQgKgHAHgOIAGgJQAJgKANADIAjgJQAjgLAiAQQgdgDgRAUQgWAagcABIgMAAQgRAAgEgDg");
	this.shape_13.setTransform(-1.6843,-0.7255,0.6215,0.6215,20.2067);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C28B85").s().p("AgvAhQgJgOALgNIAKgGIAIgKQgCAEAVgRQAVgRAQACQAQACAHACQgLALgTAXQgUAXgUALQgKAFgHAAQgIAAgEgGg");
	this.shape_14.setTransform(2.7,-2.6,0.6215,0.6215,8.2712,0,0,4.9,-7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},4).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).to({state:[]},1).wait(12));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_15.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_16.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_17.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E6E6E5").s().p("AgrARQAfgMA4gjQgaAhgaANIgWAPg");
	this.shape_18.setTransform(-1.3804,-0.0934,0.6215,0.6215,20.2067);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E6E6E5").s().p("AgsAPQAfgMA6gfQgGANgwAdIgWAPg");
	this.shape_19.setTransform(-1.3651,0.0447,0.6215,0.6215,20.2067);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E6E6E5").s().p("AgvAPQAfgMBAgfQgGAIg2AiIgVAPg");
	this.shape_20.setTransform(-1.2193,0.0984,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},9).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).to({state:[{t:this.shape_18}]},4).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	// Layer_3
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CD958C").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_21.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CD958C").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_22.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CD958C").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_23.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CD958C").s().p("Ag6AZQgJgHAHgOIAGgJQAIgKANADIAfgFQAmgVAcAQQgHgBgTASQgeAcg3AHQgGgBgFgEg");
	this.shape_24.setTransform(-1.8984,-0.9326,0.6215,0.6215,20.2067);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CD958C").s().p("Ag/AYQgKgIAHgOIAGgJQAJgJANADIAfgFQAngQAmAKQgYAGgWAUQgWAUg2AHQgGgBgFgEg");
	this.shape_25.setTransform(-1.6061,-0.737,0.6215,0.6215,20.2067);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CD958C").s().p("Ag/AYQgJgHAHgOIAGgJQAIgKANADIAfgFQANgIAZgCQAZgCANAGQABADgRAHQgRAHgQAOQgRAQg3AGQgGgBgFgEg");
	this.shape_26.setTransform(-1.634,-0.7905,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_21}]},9).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[]},1).to({state:[{t:this.shape_24}]},4).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	// Layer_4
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_27.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_28.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_29.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C28B85").s().p("AgiAuQgMgKAIgQIACgEQAHgIAagLQAZgNAFgUQAGgVAHAPQAHAOgMAZQgMAXgXASQgOALgKAAQgFAAgFgDg");
	this.shape_30.setTransform(2.65,-2.65,0.6215,0.6215,20.2067,0,0,3.3,-7.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#C28B85").s().p("AglAtQgMgKAIgQIACgEQAHgIAggJQAbgIANglQALAXgOAXQgPAYgXAQQgPAJgKAAQgGAAgFgDg");
	this.shape_31.setTransform(2.7,-2.65,0.6215,0.6215,10.7372,0,0,3.2,-7.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C28B85").s().p("AgcA2QgPgHAGgSIABgEQAFgJAZgMQAZgMgBgTIgBgaQgBgHAPAQQAPAQgKAaQgLAYgUAUQgOAOgLAAQgEAAgEgCg");
	this.shape_32.setTransform(2.6,-2.65,0.6215,0.6215,20.2067,0,0,0.5,-8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27}]},9).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[]},1).to({state:[{t:this.shape_30}]},4).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	// Layer_5
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_33.setTransform(0.65,1.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_34.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgSAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAGgFIAFgBIABAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABIgIAIQgGAFgJAEIgMAHIgGgCg");
	this.shape_35.setTransform(0.5718,1.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33}]},10).to({state:[{t:this.shape_34}]},1).to({state:[]},1).to({state:[{t:this.shape_35}]},5).to({state:[{t:this.shape_34}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	// Layer_6
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_36.setTransform(0.55,1.0856);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_37.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_36}]},10).to({state:[{t:this.shape_37}]},1).to({state:[]},1).to({state:[{t:this.shape_36}]},5).to({state:[{t:this.shape_37}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	// Layer_7
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C25D57").s().p("AgNATIAAAAIgBgBIgBAAIgBgFQACgBgFgJIgFgBIgBgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIAAgCIACgBIAIgGIAGgEIACAAIACgBIABAAIACAAIAAAAIACAAIACAAIACgBIABAAIAGgBIAAgBIAFAAIAAgBIADgBQACACAAAEIABgBQABgCABAAQABgBABgBQAAAAAAAAQAAAAgBABIABAEIABADIgEAJIgGAFIgHACIgDAEIgDACIAAABIgCABIgCABQgBADgFABIgEABg");
	this.shape_38.setTransform(0,-0.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_39.setTransform(0.2313,-0.2179);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_40.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#C25D57").s().p("AgMATIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAPAIIAEAIIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgCACgFACIgEAAg");
	this.shape_41.setTransform(-0.1787,0.0295,0.9179,0.9179);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C25D57").s().p("AgOARIAAAAIgGgQIgFgBIgBgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAIAAgCIACgCIAIgFIAGgFIACAAIACAAIABgBIACAAIAAAAIACABIACgBIAAABQgGAGAhADIgMATQgBACgWADIgEAAg");
	this.shape_42.setTransform(0.1,0.05);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#C25D57").s().p("AgKAXIgBAAQAAgVgMgFIgGgBIgBgCQAAgBAAAAQgBAAAAAAQAAAAABgBQAAAAAAAAIAAgCIACgCIAJgGIAHgEIACAAIACgBIACAAQACADASACQATACgCANIgJASIgZAIIgFABg");
	this.shape_43.setTransform(0.1972,0.5343,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_38}]},9).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[]},1).to({state:[{t:this.shape_41}]},4).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[]},1).to({state:[]},6).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-2.8,13.5,10.3);


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
	this.shape.graphics.f("#895B5B").s().p("AhRgKQgBgFABgBQABgCAEgBQANgDAPABQAMAAARAEIAgAFQAQABAPgEIAVgFQAPgEACgEQgRAshBALQgLACgLAAQguAAgNgng");
	this.shape.setTransform(-0.038,-5.0764,2.0882,2.0882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#92706E").s().p("AhEAlQgKgXAYgNIAHgCQANgEAcAAQAcgBAcgXQAOgMAIgMQACAtgrAdQgUAPglAOQgKAEgIAAQgRAAgHgRg");
	this.shape_1.setTransform(2.0914,-0.0274,2.0882,2.0882);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#92706E").s().p("Ah3BuQgggrAsgmQA5gCA3gVQA5gUAdguQAeguAHgbQAXBXhKBQQgjAnhHAsQgbARgVAAQgaAAgQgYg");
	this.shape_2.setTransform(16.9,-11.25,1,1,-1.7042,0,0,12.8,-13.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#895B5B").s().p("AhUgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFQARACAKgBQALAAAQgFIAXgFQgYAmhAALQgNACgKAAQgvAAgMgog");
	this.shape_3.setTransform(0.7451,-4.3977,2.0882,2.0882);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#92706E").s().p("Ah4B3QgfgqArgmQA6gCA3gVQA4gVAeguQAeguAIgtQAVBqhKBQQgiAnhIAsQgaAQgVAAQgaAAgRgYg");
	this.shape_4.setTransform(18.5,-8.05,1,1,-1.7042,0,0,12.8,-12.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#895B5B").s().p("AhXgOQgBgEABgCQABgCAEgBQAMgDAQABQALABASADIAfAFIAcADQAKABARgEQAQgFALgBQgdAjhAALQgMACgLAAQguAAgNgog");
	this.shape_5.setTransform(1.2672,-4.3716,2.0882,2.0882);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#92706E").s().p("Ah5B+QgggqAsgmQA5gCA3gVQA5gWAegtQAdguANg7QARB4hKBQQgjAnhHAsQgbAQgVAAQgZAAgRgYg");
	this.shape_6.setTransform(19.05,-5.95,1,1,-1.7042,0,0,12.6,-11.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#895B5B").s().p("AhZgOQgBgEABgCQABgCADgBQANgDAQABQALABASADIAfAFIAbAEQALACAQgFIAhgIQgiAkhAALQgMACgLAAQguAAgNgog");
	this.shape_7.setTransform(1.737,-4.3716,2.0882,2.0882);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#92706E").s().p("Ah6CHQgfgrArgmQA5gCA4gVQA4gVAegtQAegvAOhLQAPCIhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgXg");
	this.shape_8.setTransform(20.05,-4.45,1,1,-1.7042,0,0,12.6,-10.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#895B5B").s().p("AhegJQgBgEABgCQABgCADgBQAFgBAFgEQAGgEAJAAIAZgCQAQgCAOAEQANADAJABQAJABAHADIATAGIAxAOQgsARhAALQgNACgKAAQgvAAgMgog");
	this.shape_9.setTransform(2.953,-4.6034,1.8022,1.8022);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#92706E").s().p("AhRAZQgLgXAYgNIAHgDQANgDAbADQAaADAVgSQAVgRAmAKQgZAPgqAeQgTAPgnANQgKAEgIAAQgQAAgHgQg");
	this.shape_10.setTransform(4.7377,2.3149,1.8022,1.8022);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#895B5B").s().p("AhfgKQgBgEACgFQACgEALAAQAMAAAWgEQAXgEAVAFIAaAGIAMACIARAFQAMACAgAMQgtAQhAALQgMACgLAAQguAAgNgog");
	this.shape_11.setTransform(3.0987,-4.3984,1.8022,1.8022);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#92706E").s().p("AiSBWQgfgqArgmQA5gCA5gVQA3gVAeguQAeguBBAnQgkAWhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_12.setTransform(15.15,-9.6,0.8631,0.8631,-1.7041,0,0,10.2,-15.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#895B5B").s().p("AhggKQgBgFAGgHQAGgIACACQACABAZAAQAaAAAXADIAfAFIAUAGIAOAFIAnAQIhvATQgNACgKAAQgvAAgMgng");
	this.shape_13.setTransform(3.302,-4.3335,1.8022,1.8022);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#92706E").s().p("AiNBaQgfgqArgmQA5gCA5gVQA3gVAeguQAdguA4ASQgaArhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_14.setTransform(16.45,-6.85,0.8631,0.8631,-1.7041,0,0,10.7,-15.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#895B5B").s().p("AhfANQgIgYAJgKQAKgJAIABQAIABAKAAIAgABIAgAEQAMACAKADIAVAHQALAEAoASQg4AFhAALQgVADgPAAQgiAAgFgRg");
	this.shape_15.setTransform(4.4305,-4.2422,1.8022,1.8022);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#92706E").s().p("AiSBeQgfgrArgmQA5gCA/gTQA+gVAdguQAeguA1AFQgkA2hKBQQgiAnhIAsQgbAQgVAAQgZAAgRgXg");
	this.shape_16.setTransform(17,-5.15,0.8631,0.8631,-1.7041,0,0,10.2,-15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#895B5B").s().p("AhlgMQgBgEAEgFIAEgEIAegCQAfgCAcAGIAbAGIAMADIAVAFQAHACAoAPQg5AHhAALQgNACgKAAQgvAAgMgog");
	this.shape_17.setTransform(4.1982,-4.0873,1.8022,1.8022);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#92706E").s().p("AiSBmQgfgqArgmQA5gCA9gVQA7gVAeguQAdguA6gLQgkBIhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_18.setTransform(17.75,-3.8,0.8631,0.8631,-1.7041,0,0,10.2,-14.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).to({state:[{t:this.shape_10},{t:this.shape_9}]},2).to({state:[{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_18},{t:this.shape_17}]},1).wait(1));

	// Layer_2
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ah0ADQCigBBIhcQgIA+gXAaQhABLhsASQgIgwgXgog");
	this.shape_19.setTransform(5.05,-1.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ah2AJQCigBBLhTQgKAwgrArQgrAshnAQQgPgcgXgng");
	this.shape_20.setTransform(5.25,-1.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("Ah5AGQCigBBRhMQgQApgrArQgqAshoAPQgPgbgXgng");
	this.shape_21.setTransform(5.525,-1.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ah3gaQCUgBBbghQgTAKgQASQhBBLhsASQgHgwgYgng");
	this.shape_22.setTransform(5.085,1.5604,0.8631,0.8631);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AhngQQBtgBBUgTQAggLgqAiQgrAhhrAUIghg4g");
	this.shape_23.setTransform(5.1089,0.992);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("Ah7gVQB3gBBegPQA7gTgrAjQgrAhiUAhQgPgcgXgmg");
	this.shape_24.setTransform(5.4501,1.1597,0.8631,0.8631);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhxgRQBlAABXgPQA9gRgkAdQgjAciRAgIghg5g");
	this.shape_25.setTransform(6.068,1.0492);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_21}]},1).to({state:[]},1).to({state:[{t:this.shape_22}]},3).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).wait(1));

	// Layer_5
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgPQAMgOAMgKIAMASQgIAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_26.setTransform(9.75,5.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgOQAMgPAMgKIALASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_27.setTransform(9.65,6.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AhiAzIgCgMQAbgEAigNQAggNAZgSQAagSAMgPQANgOAggKIgJASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgdACQgKgFgDgLg");
	this.shape_28.setTransform(9.2817,5.0126,0.8631,0.8631);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AhbAxIgBgMQAXgDAdgLQAcgMAYgPQAagQAOgNQANgOAcgNIgUAXQgGAYgVANQgZASgZAPQgNAIgOAIQgXALgZABQgJgDgDgJg");
	this.shape_29.setTransform(9.825,5.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_26}]},3).to({state:[{t:this.shape_27}]},1).to({state:[]},1).to({state:[{t:this.shape_28}]},5).to({state:[{t:this.shape_29}]},1).wait(1));

	// Layer_4
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#BB6F6F").s().p("AhBAPQAVgfAqgMQAogMATABQATAWgWATQgqAkg2ACQgRgFgGgUg");
	this.shape_30.setTransform(8.2349,6.917);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#BB6F6F").s().p("Ag/AUQASghApgOQAngPATAAQAVAVgVAUQgoAmg2AGQgRgDgGgUg");
	this.shape_31.setTransform(9.2003,8.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#BB6F6F").s().p("AhAAUQATghApgOQAngPATAAQAVAVgWAVQgnAlg2AGQgRgEgHgTg");
	this.shape_32.setTransform(8.8003,8.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#BB6F6F").s().p("Ag4ANQASgbAkgKQAigLARACQARATgUAQQgkAfgvABQgOgEgFgRg");
	this.shape_33.setTransform(7.6031,6.016);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#BB6F6F").s().p("Ag3ARQAQgcAjgMQAigNARAAQARASgSASQghAggvAFQgPgDgGgRg");
	this.shape_34.setTransform(8.1003,7.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_30}]},2).to({state:[{t:this.shape_31,p:{scaleX:1,scaleY:1,x:9.2003,y:8.1}}]},1).to({state:[{t:this.shape_32}]},1).to({state:[]},1).to({state:[{t:this.shape_33}]},4).to({state:[{t:this.shape_31,p:{scaleX:0.8631,scaleY:0.8631,x:8.4405,y:7.0408}}]},1).to({state:[{t:this.shape_34}]},1).wait(1));

	// Layer_3
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#AF3838").s().p("Ag6BkQgFgDgDgGQgEgHgBgOQgCgOgDgJIgHgTQgDgKgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAjgRQAdgNACgHQABgGACAHQACAGgBAKQgBASgDAGIgEAMQgJAYgIASQgIAPgMATQgNATgMAKIgjAZQgTAMgXADIgFAAQgGAAgCgBg");
	this.shape_35.setTransform(8.4692,0.3906);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#AF3838").s().p("Ag7BZQgBgPgIgTQgJgTgEgBQgEgBgDgKQgDgKgHgIIgGgGQgDgFABgDQABgDAHgFIAMgHQAdgPAggMQA0gOAkgPQApgQADgDIgCAPQgBAJgRAvQgQAtgGAJQgEAGgOAKIgUAOIgjAZQgTALgXADQgJABAAACg");
	this.shape_36.setTransform(8.9525,0.8125);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#AF3838").s().p("AhABaQgBgPgIgTQgJgTgEgBQgEAAgDgKQgDgLgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAkgOIAhgNQATgHACgDQgJB4gXAHQgYAIgOAJIgUAOIgjAZQgTAMgXADQgJABAAACg");
	this.shape_37.setTransform(9.4525,0.6625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#92706E").s().p("AgFBWQgugFgUgpQgTgqATgkQASggAigOQARgFARAFQArASAQAsQASAugZAjQgVAdgjAAIgQgCgAgegGQgGAgAbALQAaAMAOgeQAMgcgTgPQgVgNgNgBIgBAAQgOAAgFAgg");
	this.shape_38.setTransform(1.1103,0.5369);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#AF3838").s().p("AgLAkQgagLAFggQAGghAPABQANABAUANQAUAPgNAcQgKAWgRAAQgFAAgIgEg");
	this.shape_39.setTransform(1.2969,0.6061);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#AF3838").s().p("AguBBQgEgCgDgGQgDgFgBgMQgCgNgCgHIgGgQQgDgIgGgHIgFgGQgDgEACgDQAAgDAGgEIAKgGQAZgNAcgKQArgMA2ASQgHASgGANQgHAOgLAQQgKAQgLAJIgfAVQgQAKgTADIgGAAIgGgBg");
	this.shape_40.setTransform(7.375,2.493);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#AF3838").s().p("AhKBFQgBgPgIgTQgJgTgEgBQgEgBgDgKQgDgJgHgIIgGgHQgDgFABgDQABgDAHgEIAMgHQAdgQAggLQA0gJAfAAQAegBAsAZQAIgXgFArQgGAqgiADQgiACgOAKIgUAOIgjAZQgTAMgXADQgJAAAAACg");
	this.shape_41.setTransform(9.5279,2.4662,0.8631,0.8631);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#AF3838").s().p("AhKA7QgBgNgIgQQgHgRgDAAQgDgBgDgIQgDgIgGgHIgFgGQgDgEABgDQABgDAGgEIAKgGQAZgNAcgKQAtgMANAGQANAHAMAEQAMAFBCgBQguAzgUAFQgVAHgMAIIgRAMIgeAVQgRAKgTADQgIABAAACg");
	this.shape_42.setTransform(10.6,2.4638);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_35}]},2).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_39},{t:this.shape_38}]},1).to({state:[]},1).to({state:[{t:this.shape_40}]},3).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-11.2,41,34.099999999999994);


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

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#523F31").s().p("AgvATIgDgCIgBgEQAGgkAqAFQAoAFAOAfQgBgCgKgDIgNgDQgJgCgLACIgTAFQgPAFgLAAIgJgBgAAzASIAAAAIAAAAg");
	this.shape.setTransform(-8.55,2.2,1.3514,1.0148,0,23.06,-168.0065,5.1,1.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AAgAUQgTgPgRABQgcABgDgFQgQgHAFgSQAEgRAVAGQBBAWAEAwQgGgHgKgJg");
	this.shape_1.setTransform(-1.9428,-0.9909,1.3804,0.9751,0,0,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#523F31").s().p("AgvATIgDgCIAAgEQAFgkArAFQAnAFAOAgQgCgEgJgCIgNgDQgJgCgLACIgSAFQgQAFgLAAIgJgBg");
	this.shape_2.setTransform(-8.3,3.1,1.3514,1.0148,0,23.06,-168.0065,5.1,1.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#916E50").s().p("AAgAPQgTgPgRABQgcABgCgEQgQgIAEgSQAFgRAUAGQBCAWADA6QgGgRgKgJg");
	this.shape_3.setTransform(-1.9083,-0.5034,1.3804,0.9751,0,0,180);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#523F31").s().p("AgvATIgDgCIAAgEQAFgkArAFQAnAFAOAfQgCgDgJgCIgNgDQgJgCgLACIgSAFQgQAFgLAAIgJgBg");
	this.shape_4.setTransform(-8.45,3.9,1.3514,1.0148,0,23.06,-168.0065,5.1,1.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#916E50").s().p("AAgAMQgTgPgRABQgcABgDgEQgQgJAFgSQAEgRAVAHQBBAVAEBCQgGgZgKgIg");
	this.shape_5.setTransform(-1.9773,-0.1378,1.3804,0.9751,0,0,180);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#523F31").s().p("AgwATIgDgCIgBgEQAGgkAqAFQAoAFARAXQgFAFgJgCIgNgDQgJgCgLACIgTAFQgPAFgLAAIgJgBg");
	this.shape_6.setTransform(-8.8,5.05,1.3514,1.0148,0,23.06,-168.0065,5.1,1.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#916E50").s().p("AAfAJQgTgPgRABQgcACgDgFQgQgIAFgSQAEgSAVAHQBBAWAGBHQgIgfgKgIg");
	this.shape_7.setTransform(-2.1153,0.106,1.3804,0.9751,0,0,180);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#523F31").s().p("AgwATIgDgCIgBgEQAFgkArAFQAnAFASARQgFAIgJgCQgKgCgGAAIgSACIgSAFQgPAFgMAAIgIgBg");
	this.shape_8.setTransform(-8.85,6.05,1.3514,1.0148,0,23.06,-168.0065,4.9,1.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#916E50").s().p("AAeAIQgTgPgRABQgcACgCgFQgQgIAEgSQAFgSAUAHQBCAVAGBKQgJghgKgIg");
	this.shape_9.setTransform(-2.1496,0.2278,1.3803,0.9751,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[]},1).to({state:[]},9).wait(8));

	// Layer_9
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAKgNIAmgHIgHAnIgzgGQgXgCgOAKQARgeAogEg");
	this.shape_10.setTransform(-2.1925,0.0248,0.9907,0.6998);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3).to({_off:false},0).wait(4).to({_off:true},1).wait(17));

	// Layer_8
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAKAHIgTgDIgHgCIgNABQgKACgBgBIAAgCQAMgOBEAHIAAAKQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABIgFAAIgEgBIgBABIgDACIgDAAIgNgBg");
	this.shape_11.setTransform(-2.25,4.4267);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(7).to({_off:false},0).to({_off:true},1).wait(17));

	// Layer_7
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#BB6F6F").s().p("AgVAHQgFgDAAgCQALgKARABQARABAGAFQAFAEgKACQgMADgMAAQgIAAgJgBg");
	this.shape_12.setTransform(-2.6944,1.9831);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BB6F6F").s().p("AgdADQALgJAVgCQAWgCAHAHQAIAEgVAFQgUAEgUgFQgJAEgCAAQgEAAAHgGg");
	this.shape_13.setTransform(-3.3961,2.5511);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#BB6F6F").s().p("AgUADQgXAGAPgJQANgIAWABQAVAAAGAHQAGAGgVACIgGAAQgSAAgPgFg");
	this.shape_14.setTransform(-3.514,3.3808);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BB6F6F").s().p("AgVAEQgWAGAOgKQAOgKAWABQAWAAAFAJQAFAHgVACIgGABQgRAAgQgGg");
	this.shape_15.setTransform(-3.3963,4.003);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},4).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).to({state:[]},9).wait(8));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#523F31").s().p("AgvATIgDgCIgBgEQAGgkAqAFQAoAFAOAfQgBgCgKgDIgNgDQgJgCgLACIgTAFQgPAFgLAAIgJgBgAAzASIAAAAIAAAAg");
	this.shape_16.setTransform(0.159,1.9529,1.3575,1.3575,0,0,180);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#916E50").s().p("AAgAUQgTgPgRABQgcABgDgFQgQgHAFgSQAEgRAVAGQBBAWAEAwQgGgHgKgJg");
	this.shape_17.setTransform(-0.317,-0.5452,1.3575,1.3575,0,0,180);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#AF3838").s().p("AgcATIgZAHQAThABZAKQgfAlAOAVQgWgRgsAGg");
	this.shape_18.setTransform(-2.85,0.9083);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AF3838").s().p("AgQgRQAcgRArAFQgjAiAOAVQgWgNgnAFIgbAOQAKghAcgQg");
	this.shape_19.setTransform(-2.875,1.0432);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#AF3838").s().p("AgQgRQAdgTAsAFQgjAiAMAVIgegBQgRAAgSACIgZAIQAKghAegRg");
	this.shape_20.setTransform(-3.05,1.2229);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#AF3838").s().p("Ag4AiQALglAdgSQAfgSAqAFQgjAiAPAjQgVgPgLAAQgRAAgPANQgGADgIAAQgHAAgIgCg");
	this.shape_21.setTransform(-3.1,1.5354);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16}]}).to({state:[]},1).to({state:[{t:this.shape_18}]},3).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[]},1).to({state:[]},9).wait(8));

	// Layer_1
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#604A3E").s().p("AADgVQAXgHATgCQAtAYhIAUIhPAQQATgiAtgRg");
	this.shape_22.setTransform(0.2786,-1.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#604A3E").s().p("AAAAcQg3gMgQguQACAFAfAJQANAFAPgCIAbgEIAZgEQAOgBALAEQAEABAAACQABACgBAEQgKAognAAQgKAAgMgDg");
	this.shape_23.setTransform(0,-2.494);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#916E50").s().p("AAZA0QghgOgSgQQgmgfACguIAUAYQAYAZAYABQAoACACAFQAVAPgIAXQgGAQgOAAQgHAAgJgEg");
	this.shape_24.setTransform(-0.8304,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22}]},1).to({state:[]},1).to({state:[{t:this.shape_24},{t:this.shape_23}]},15).to({state:[]},1).wait(7));

	// Layer_2
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#916E50").s().p("AgJAWQgNgGgGgHQgGgIgDgJQgCgKAFgFIAAAAIAGACQAIACAHgBQAHgCADgDIAAACQACAKACACQADABAGgBQAGgCADgJIACAAIANAEQAIAKgGAQQgGARgQABIgFAAQgLAAgHgEg");
	this.shape_25.setTransform(-0.6981,4.0197);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#523F31").s().p("AASAcIgCgBIADgGQADgFAAgHQAAgHgCgCIgDgCQgBgBgFAAQgFAAgGAJQgHAJABAJQgDADgHACQgIACgHgDIgGgCQgEgJADgKQADgJAOgOQAPgPAXABQAXABAAAWQABAVgKARIAAAAIgNgDg");
	this.shape_26.setTransform(-0.37,-1.0026);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#AF3838").s().p("AgJAVQgDgCgBgKIAAgCQgBgIAHgKQAGgJAFAAQAFAAABABIADADQACACAAAHQgBAHgCAEIgDAGQgDAJgGACIgFAAIgEAAg");
	this.shape_27.setTransform(0.3496,0.7365);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},9).to({state:[]},1).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-5.8,16.4,19.5);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAAHQgHAAAAgHQABgHAHAAQADABACACQACACAAACQAAAEgDACQAAAAgBABQAAAAgBAAQAAAAgBAAQgBABAAAAIgBgBg");
	this.shape.setTransform(9.4042,4.555);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#191513").s().p("AgBAXQgKAAgHgIQgHgHABgJQABgKAHgGQAIgGAKAAQAKABAHAHQAHAIgBAIQgBAKgIAHQgGAGgJAAIgCgBg");
	this.shape_1.setTransform(7.8545,3.0549);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#463A2E").s().p("AgCAfQgNAAgJgKQgKgKABgMQABgNALgJQALgIAMAAQAOABAKAKQAJAKgCAMQgBANgKAJQgJAIgNAAIgCgBg");
	this.shape_2.setTransform(7.85,3.1539);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAGQgCgCgBgDQgBgCADgDQACgDAEgBQACAAADADQADACABADQABAGgJACIgBABQgCAAgDgDg");
	this.shape.setTransform(9.1508,4.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#191513").s().p("AgQAVQgJgHgBgKQgCgKAHgJQAHgIALgCQALgBAJAGQAJAHACALQABAJgHAJQgHAJgLABIgEAAQgIAAgIgFg");
	this.shape_1.setTransform(7.05,3.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#463A2E").s().p("AgWAcQgMgJgCgOQgCgOAJgLQAJgMAQgCQAOgCANAJQAMAJACAPQACANgJALQgJAMgQACIgFAAQgMAAgKgHg");
	this.shape_2.setTransform(7.075,3.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_11copy, new cjs.Rectangle(3.3,0.1,7.6000000000000005,7.1000000000000005), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHABQgBgHAIgBQAHgBABAIQAAADgCACQgCADgDAAQgHAAgBgHg");
	this.shape.setTransform(3.2236,4.7947);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#15100F").s().p("AgPASQgHgGgBgKQgBgKAHgHQAGgIAKgBQAJAAAIAGQAIAHAAAKQABAJgHAIQgGAIgKAAIgCABQgIAAgHgHg");
	this.shape_1.setTransform(4.7795,3.2045);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#353021").s().p("AgUAZQgLgJgBgOQAAgMAIgLQAJgKAOgBQAMgBAKAJQALAJABAOQABAMgJALQgJAKgOABIgCAAQgLAAgJgIg");
	this.shape_2.setTransform(4.7786,3.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(1.5,0,6.6,6.7), null);


(lib.ClipGroup_6_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAAAJQgEgBgCgDQgCgDAAgCQACgJAHABQAEABACADQACADAAACQgCAIgHAAIAAAAg");
	this.shape_3.setTransform(4.125,5.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#15100F").s().p("AgDAbQgLgBgHgJQgGgJABgKQACgMAJgHQAJgHAKACQALABAGAJQAHAKgBAKQgCALgJAHQgHAGgJAAIgDgBg");
	this.shape_4.setTransform(6.1742,4.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#353021").s().p("AgEAlQgPgCgJgMQgJgNACgOQACgPAMgJQAMgKAOACQAPADAJAMQAJAMgCAOQgCAPgMAJQgKAIgMAAIgEAAg");
	this.shape_5.setTransform(6.1579,4.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6_1, new cjs.Rectangle(2.5,0.5,7.300000000000001,7.4), null);


(lib.ClipGroup_5 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AgEAkQgiAAgPgPQgHgIgBgHQALgRAVgNQApgYAyAdQgBAPgJANQgSAbglAAIgBAAg");
	mask.setTransform(6.175,3.6947);

	// Layer_3
	this.instance = new lib.ClipGroup_6();
	this.instance.setTransform(6.2,3.7,1,1,0,0,0,6.2,3.7);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(0,0.1,12.4,7.2), null);


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
	this.instance_1 = new lib.ClipGroup_6_1();
	this.instance_1.setTransform(29.75,1.5,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_2.setTransform(-31.1,-2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55));

	// _Clip_Group__8 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Ag/BGQhFgEgrgyIgfgvQBhhBBZArQArAWAZAhQAAATgPATQgYAfg3AAIgRgBg");
	mask_1.setTransform(-20.6726,1.8777);

	// _Clip_Group__8
	this.instance_3 = new lib.ClipGroup_8();
	this.instance_3.setTransform(-25.55,2.3,2.0882,2.0882,0,0,0,6.2,3.8);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(55));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAHAiQgfgCgWgYIgOgWQAvgfApAUQAVALAMAPQAAAJgHAJQgMAPgaAAIgJAAg");
	this.shape_1.setTransform(-28.607,1.8777,2.0882,2.0882);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(55));

	// Layer_2
	this.instance_4 = new lib.Group_1();
	this.instance_4.setTransform(-28.55,-3.75,2.3635,2.3635,0,0,0,5.2,3.6);
	this.instance_4.alpha = 0.3398;

	this.instance_5 = new lib.Group_2();
	this.instance_5.setTransform(30.95,-7.05,2.3635,2.3635,0,0,0,7.2,4);
	this.instance_5.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.6,-16.5,97.5,27.1);


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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// _Group__1
	this.instance_1 = new lib.Group_1copy2("synched",0);
	this.instance_1.setTransform(-13.95,-0.5,1,1,0,19.7336,-160.2664,8.3,4);
	this.instance_1.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_3
	this.instance_2 = new lib.fghdrjreyjwrcopy("synched",0);
	this.instance_2.setTransform(-13.95,-0.5,1,1,0,19.7336,-160.2664,8.3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ag5AoQhNgIAQg2QAHgWA3AEQA9AGA4ArQgkAhg5AAIgZgCg");
	mask.setTransform(-12.1626,3.4806);

	// _Clip_Group__11
	this.instance_3 = new lib.ClipGroup_11copy();
	this.instance_3.setTransform(-13.7,3.9,1,1,0,0,0,7,4);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#996740").s().p("AguATQgmgIgGgdIAAgEQAEAOARAJQAPAJARADQA0AFAsgQQAVgGALgJQgNANgYAJQgeAOghAAQgSAAgTgEg");
	this.shape.setTransform(-15.2,5.816);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	// Layer_6
	this.instance_4 = new lib.hjdryjryjrdjcopy("synched",0);
	this.instance_4.setTransform(-15.2,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// fjfdjdyj
	this.instance_5 = new lib.FDSGJSTJRWTJRYTJcopy2("synched",0);
	this.instance_5.setTransform(9.3,4.05,1.1415,1.1415,0,16.5756,-163.4244,6.7,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50));

	// fjfdgjdftjdfj
	this.instance_6 = new lib.fjfdgjdftjdfjcopy2("synched",0);
	this.instance_6.setTransform(15.2,1.45,1,1,0,15.7677,-164.2323,5.5,4.2);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(50));

	// Layer_8
	this.instance_7 = new lib.hjdjrrsyjsykcopy("synched",0);
	this.instance_7.setTransform(15.2,1.45,1,1,0,15.7677,-164.2323,5.5,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(50));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#996740").s().p("Ag8ALIgBgDQAKAMAaABQATABASgFQAVgGARgRIAMgRQgFAWgZANQgMAHgLADQgOACgNAAQgcAAgOgNg");
	this.shape_1.setTransform(16.225,4.5958);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(50));

	// Layer_4 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AgLAUIgIgOQAMgTAXgJQAugTAyAeIgPAVQgXAWgkACIgHAAQgeAAgMgOg");
	mask_1.setTransform(11.225,3.4358);

	// _Clip_Group__13
	this.instance_8 = new lib.ClipGroup_13copy();
	this.instance_8.setTransform(14.75,4.1,1,1,0,0,0,6.2,3.9);

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50));

	// Layer_14
	this.instance_9 = new lib.ghkmtktrykucopy("synched",0);
	this.instance_9.setTransform(15.8,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-4.8,54.1,13.3);


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
	this.instance = new lib.lktl7l75l("synched",37);
	this.instance.setTransform(-27.3,-47.4,1,1,0,0,0,-0.1,2.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(37).to({_off:false},0).wait(1143).to({mode:"single",startPosition:21},0).wait(28).to({mode:"synched",startPosition:0},0).wait(787).to({startPosition:37},0).wait(28).to({startPosition:3},0).wait(27).to({startPosition:30},0).to({_off:true},1).wait(557));

	// Layer_4
	this.instance_1 = new lib.ghkkmtyktktuktk("synched",37);
	this.instance_1.setTransform(4.65,-49.05);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(37).to({_off:false},0).wait(1143).to({mode:"single",startPosition:21},0).wait(28).to({mode:"synched",startPosition:0},0).wait(787).to({startPosition:37},0).wait(28).to({startPosition:3},0).wait(27).to({startPosition:30},0).to({_off:true},1).wait(557));

	// _Clip_Group__2_0
	this.instance_2 = new lib.ClipGroup_2_0("synched",0);
	this.instance_2.setTransform(-25.95,-45.4,1,1,0,0,0,6.2,3.6);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(37).to({_off:false},0).wait(1143).to({startPosition:0},0).wait(28).to({x:-22.05,y:-45.45},0).wait(787).to({x:-24.05,y:-46.15},0).wait(28).to({x:-25.95,y:-45.4},0).wait(27).to({startPosition:0},0).to({_off:true},1).wait(557));

	// _Clip_Group__3
	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(-113.7,-37.6,1,1,0,0,0,198.8,199);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(37).to({_off:false},0).wait(2013).to({_off:true},1).wait(557));

	// _Clip_Group__4
	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(3.3,-46.3,1,1,0,0,0,8.8,4.6);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(37).to({_off:false},0).wait(1171).to({x:9.95,y:-47.3},0).wait(787).to({x:8.1,y:-48.45},0).wait(28).to({x:3.3,y:-46.3},0).wait(27).to({_off:true},1).wait(557));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhXALQAzg4BAAAQAaAAARAIQARAJAAAMQACAzhFAKQgNABgKAAQg0AAghgjg");
	this.shape.setTransform(3.3278,-46.2649);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(37).to({_off:false},0).wait(2013).to({_off:true},1).wait(557));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.5,-236.6,397.5,397.9);


(lib.uilt678t78l7t8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjkfujyuli("single",0);
	this.instance.setTransform(0.85,38.2,0.4764,0.4072,0,4.2245,-0.8479,16.7,-11.2);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(370).to({startPosition:5},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(16).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(51).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(6).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(33).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(67).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(4).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(15).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(4).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(158).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(415));

	// Layer_31
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(-3.2,17.45,0.5058,0.4984,0,0,0,13.1,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2081));

	// Layer_14
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AgQAbQAbgDgCgYQgBgXgbgDQARgHALAKQAKAIABAPQABAQgJAJQgGAFgIAAQgGAAgIgDg");
	this.shape.setTransform(-7.77,27.7794);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2081));

	// Layer_15
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0A07E").s().p("AgIAaQgJgHgBgQQgBgPAJgKQAKgLARAFQgaAHABAXQABAYAbAAQgJAEgHAAQgGAAgGgEg");
	this.shape_1.setTransform(-14.805,28.2783);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(2081));

	// Layer_16
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AAxCMQgWgnANgbQgLgCgDgPQgBgPgDgIIgKgOQgGgJABgHQgHABgGgFQgGgDgDgHQgEgKABgUQgQgDgJgPQgJgQAGgPQgTgCgLgUQgLgTAIgSIgCgCQAYAAAOATIAKANQADAEAMAHIAxAeQANAHAHAHQAKALAIAbQAPAxgBAbIgFAhIgNBDIgDAAQgHAAgGgLg");
	this.shape_2.setTransform(15.8052,2.4452);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2081));

	// Layer_17
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("ADwB8QgLAAgPgKQgTgMgKgRQgMgTAJgRQgKAHgLgJQgLgKAFgLQgHAHgLgEQgKgDgCgKQgKAOgSAEQgRAFgPgHQgKgFgFABQgEABgIAJQgJAIgOAAQgNAAgJgIQgCARgTAIQgTAIgOgLQgIATgJAHQgHAEgIgBQgJgBgDgHQgHAJgMACQgNACgKgGQgUgKgHgbQgCAIgJAFQgIAEgJAAQgMgBgUgLQgkgTgMgRQgJgNAAgOQAAgRAKgKIALgCQANgYAOgIQAKgFALACQAMACAFAJQAOgGARACQARACAMAKQAMgTAZgDQAZgCAQAQQgBgPAOgLQAMgKARgBQAKgBAUACQAVACAKgCQAOgBAggOQAcgNARAAQARABAbAMIAuAUQAUAJAJAHQAQANAOAmQAOAlACAbQADAlgRAZQgOAXgWAAIgCgBg");
	this.shape_3.setTransform(-6.6525,-17.0489);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2081));

	// Layer_18
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AFdExQgnihhRiGQgagqgXgUQgdgZgugJQgegGg2gBQg0gBgfAIQgtAMgWAgQgMAVgHAKQgUAZgrALQgyAHgZAFQgQAEgFAJIAAACQgVAMgXgPQgXgQgCgaQgNgNgFgVQgEgVAHgTQAHgTAQgMQAQgLATAAQgEgSAHgTQAGgTANgMQANgLASgDQASgDAPAIQgFgZAUgVQATgVAXAHIANgdQAJgPAKgHQAMgJAQACQAPADAGAOQAVgZAggIQAhgIAbAOQALAGAFAAQAEAAAIgDQATgGAYAFQAQADAbALQAOAEAHAHIAMALQAHAEAKAAIASgCQAVgCASALQAUAMABAVQAMgFAMADQANACAKAJQAJAIAFAOQAEANgCAOQAaAEARAaQARAbgGAdQgCAOACADQABAEAFADIAHAFQAHAHgCANIgFAYQgCANAGARIAKAfQAGARgCAPQgCASgLAIQAKAXACAOQAFAVgHAPIgGANQgBAHAIAQQAGANgDAIQgBADgFAFQgFAFgBADQgBAEAEAQQADAOgEAOQgFAOgKAIQgEADgEAAIAAAAQgIAAgFgSg");
	this.shape_4.setTransform(2.3023,-19.7948);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2081));

	// Layer_19
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0A07E").s().p("AgIghQAGgKAJgKQANgOAJgBQgLAQgIAPIgNAbQgNATgEAXIgGAlQgIg8Aagqg");
	this.shape_5.setTransform(28.4072,19.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(2081));

	// Layer_20
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AglBiIgIgIIgJhsIAJADQAKAAgCgVQgBgbATgWQASgUAVABQAXAAAIAbQAKAfgRA6QgaBaghADIgDAAQgJAAgKgHg");
	this.shape_6.setTransform(26.8602,19.9049);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(2081));

	// Layer_23
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("AA/AVQgSgKgOgFQgzgRhBAiIAUgXQAbgWAmgCQAlgBAcAYQAPALAGAMQgDADgFAAQgGAAgJgEg");
	this.shape_7.setTransform(-27.9,5.8067);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2081));

	// Layer_24
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("AhyAbIAcgbQAlgaAygBQAxgBAlAXQATAKAIAMQhWghhFAWIgrASQgMAEgIAAQgGAAgEgBg");
	this.shape_8.setTransform(6.1,4.8823);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2081));

	// Layer_25
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B289").s().p("AgoGJQg+gUhAhUQg+hRgKhAQgDgVAEhWQAEg4gdgqQgjgyAFhUQADhCAdhhIAUARQAZATAeAKQBgAeBjhOQBIg4A0AdQAUALAKAVQAJATgEARQgKAoAEASQAHAdAqAoQAgAfAQA7QAJAhAOBFIAFBpIAGAiQgLBkhMA/QgpAeg0AaQhNAogwAAQgQAAgNgFg");
	this.shape_9.setTransform(-5.801,18.3711);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2081));

	// Layer_26
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AiIEdQjBiLgjjtIAfg5QAphCA2gyQCrifDgBGQCUAuAqCiQAXBdgHDUQgEB8ibA6QgxASg6AKIgwAFQhYgVhhhFg");
	this.shape_10.setTransform(3.8053,-8.2699);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2081));

	// Layer_27
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BEBB89").s().p("AgHCwQgDAJgKADQgLADgJgFQgMgIgJgZQgTAJgTgOQgTgOADgUQgNAGgOgHQgOgHgEgOQgDgOAJgMQAKgNAOgBQgEgTAFgTQAGgTANgOQANgOATgHQATgHATACQgCggAbgXQAagXAfAGQAFgjAhgUQAigUAhAMIAEgFQAAgBAAgBQABAAAAgBQAAAAABgBQABAAABAAQADAAACACQADAEgBAIQgHAugbB7QgXBqgGA/QgCATgjAGQgQACgMAAQgdAAgMgOg");
	this.shape_11.setTransform(-26.7578,-30.1524);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2081));

	// Layer_28
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AlxCtIADgEQgPgUACgVQABgNAKgKQALgKALADQgGgkARgjQAQgiAfgPQACgUAUgKQATgJAPALQAKgjAQgSQAKgMANgFQAOgFAMADQASgpAfgKQARgFARAIQARAIAFARQAFgNAOgFQAOgFALAHIAIAFIAHAEQAJADASgMQARgLAIAHQAEADAGAJQAHAHARgBQAVgBAGADIAQAJQAJAGAGgBQAGgBALgIQALgEAKAJQALAJgCANQAGgGAIACQAHABAGAGIALAMQAGAIAFADQAGADALACIAQAFQAJADAFAKQAEAJgFAHQAZANALAIQAUAMALAPQALAMAFARQAGATgDAUQgDAVgLAPQgLAQgSAIQgRAIgSgCIgKgBQgHAAgEABQgEACgFAEIgJAIQgQANgfgDIgzgEQgIAAgeAHQgXAGgPgDQgJgCgYgMQgUgKgOABQgGAAgKADIgPAGQgWAGgWgHQgRgFgHABQgFABgQAKQgQAKgWADQgNABgbAAIhAgCQgkgDgdgEQgWgEgMABQgRACgJAJIAFAHg");
	this.shape_12.setTransform(-3.7591,-40.637);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2081));

	// Layer_29
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AgRBcQgMgHgJgKQgDAGgIACQgJABgFgGQgLgJAEgSQgRgHgDgUQgEgUANgMQgIABgGgHQgGgHAAgIQAAgOAQgMIABgCQAFgIAJgCIALgCQAIgDAMgLQAHgEAPgDQAbgGAPABQAeACAXAXQAXAYABAeQAAAQgJAAQAIAHgGATQgFARgJAHQgGAEgHABQgIAAgFgEQADAIgFAKQgFAIgJAFQgNAHgYgDQABADgCADQgCADgDABIgDAAQgEAAgGgEg");
	this.shape_13.setTransform(-32.4519,-16.4731);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(2081));

	// Layer_30
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AguC+IgkgMQgWgUgFgMQgHgRACglIAFhsQACghAGgNQAFgLAJgGQAKgIAKACQgFgkAIgSQAFgMAMgFQANgGAJAJQADgUAOgKQALgJAeAAQAmAAAHAWIgEACQAWAIAHAcQAHAdgQATQALAEAGANQAGANgCAOQgDATgTAcQALAEACAPQADAOgIALQgKARgfAGQACAQgLANQgLAOgOAAQgCAPgLALQgKALgNABQgFAkgSACIgBAAQgFAAgHgDg");
	this.shape_14.setTransform(31.4556,17.3786);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2081));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.9,-58.2,85.9,116.4);


(lib.uil7tlt78l7l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_28
	this.instance = new lib.ghstshqw12313copy("single",17);
	this.instance.setTransform(6.2,-22.6,1.0871,1.0871,-0.2461,0,0,-6.8,-5.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(77).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(119).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(147).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(53).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(109).to({startPosition:1},0).wait(79).to({startPosition:0},0).wait(552).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(8).to({startPosition:5},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:0},0).wait(5).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(13).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(230).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(115).to({startPosition:3},0).to({_off:true},1).wait(24));

	// Layer_26
	this.instance_1 = new lib.gfhsrtjhqecopy("synched",0);
	this.instance_1.setTransform(25.55,-41.4,1.0458,1.0548,0.5893,0,0,9.5,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1869).to({startPosition:19},0).to({_off:true},1).wait(24));

	// Layer_9
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3B4C56").s().p("ADXBGIgDgBIgDgCIhrgwQgqgTgXgIQglgNgfgDQg8gGg5AaIgmAUQgXALgRACQARgdAogTQAagNAygNQAygMAWgEQAngHAggBQBVgBA0ArQAUAQALAUQAMAXgDAXQgCALgGADIgDABIgBAAg");
	this.shape.setTransform(23.131,-77.8757);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1869).to({_off:true},1).wait(24));

	// Layer_10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#465E6D").s().p("Al4D/QhliGAPhyQAQhxAYhEQALggAIgQQAMgaAOgSQAUgXAugxQA3g5AQgKQBAgqBtgCQAyAACIAOQBAAHBDAnQAxAdBBA4QAKAIAEALQAEAMgJAFQArAXAeAmQATAWgCASQAFAcgMAbQhGgegbgPIgsgZQgZgOgUgGQgigKgtACQhrAGhaBCQhWA/gzBkQgyBigIBwQgHBxAmBmQh/hZhPhqg");
	this.shape_1.setTransform(0.004,-60.1759);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1869).to({_off:true},1).wait(24));

	// Layer_11
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1A5A8").s().p("ADAA6Qipg7lBB/QAQhCA1hBQBqiFC5gFIAoABQAwAGAnAVQB8BDgQDBQgUg4hVgfg");
	this.shape_2.setTransform(15.4164,-72.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1869).to({_off:true},1).wait(24));

	// Layer_12
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#664F3F").s().p("AALAzQAegigzggQgHgGgFgLQgLgXAIgXIAEATQAHAXAOASIALALQAMALAEANQAOAohFAWQAZgLAOgRg");
	this.shape_3.setTransform(20.2847,-34.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1869).to({_off:true},1).wait(24));

	// Layer_18
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#664F3F").s().p("AAYAgQgFgXgOgTQgGgKgKgRQgIgQgNgQQAKABAPAPQAJAKAIAKQAeApgJA+IgHgmg");
	this.shape_4.setTransform(-27.0712,-39.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1869).to({_off:true},1).wait(24));

	// Layer_19
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#775A45").s().p("AATBpQgngCgdhbQgTg6ALgfQAJgbAaAAQAYgBAUAUQAWAWgCAbQgBAVALABQAFAAAGgEIgLBsQgNAPgRAAIgDAAg");
	this.shape_5.setTransform(-25.3017,-38.9695);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1869).to({_off:true},1).wait(24));

	// Layer_22
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("AhWAWQAHgMAOgLQAdgYAkABQAnABAcAXQAOAMAGALQhBgjg0ASIgiAPQgIAEgGAAQgFAAgDgDg");
	this.shape_6.setTransform(34.95,-54.1933);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(77).to({skewX:180,y:-54.2067},0).wait(1792).to({_off:true},1).wait(24));

	// Layer_23
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("ABVAYQgZgMgTgGQhFgWhWAhQAIgMATgLQAlgXAyABQAyACAlAaQAUANAJAOQgEACgGAAQgIAAgNgFg");
	this.shape_7.setTransform(-1.55,-55.1427);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(77).to({skewX:180,y:-55.1573},0).wait(1792).to({_off:true},1).wait(24));

	// Layer_24
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#775A45").s().p("AiAFnIhpg4QhWhAgNhkIgBAAIAIgfIAFhsIABAAQADgLAGhbQAEg9AigdQA4gvAQgXQASgbgIgfQgFgQALgUQALgVAWgLQA7gdBRA4QByBOBsgeQA2gPAggeQAgBhAEBCQAFBUgnAyQghAqAEA4QAFBXgDAUQgMBBhGBRQhJBUhGAVQgOAEgSAAQg3AAhYgog");
	this.shape_8.setTransform(11.7233,-40.5147);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1869).to({_off:true},1).wait(24));

	// Layer_25
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#465E6D").s().p("AB+DAQiBglhjhkQhkhigliCQgCgKACgJQADgKAIAAQAFABAEAEQAoAgAoBIQA0BeAQAUQA0BGBaAsQAaAMA2AUIBVAfQgRAFgVAAQggAAgogLgADsDGIAEgBIABADgADsDGg");
	this.shape_9.setTransform(-10.0444,-20.3068);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1869).to({_off:true},1).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.4,-105.1,92.9,105.1);


(lib.uil6t8l678l8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.fgryjdsrtyjrsyj("single",6);
	this.instance.setTransform(-1.3,-21.55,1.785,1.7261,0,-5.6148,174.6988,2.6,-2.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(15).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(86).to({startPosition:12},0).wait(8).to({startPosition:14},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:14},0).wait(3).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:15},0).wait(6).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(1779));

	// Layer_20
	this.instance_1 = new lib.dfggdfgzrs("synched",37);
	this.instance_1.setTransform(5.45,-42.85,1,1,0,0.1766,-179.8234,-5.3,-45.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2014));

	// _Clip_Group__5
	this.instance_2 = new lib.ClipGroup_5();
	this.instance_2.setTransform(26.2,-43,1,1,0,0,0,6.2,3.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2014));

	// _Clip_Group__1_1
	this.instance_3 = new lib.ClipGroup_1_1();
	this.instance_3.setTransform(-3.35,-43.9,1,1,0,0,0,8.8,4.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2014));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AjYB5QglgMhAgCIAdi8IBuhCIGpAAIAPAPQARAVAMAdQAoBagTCEQg/AHhiAAIgUABQi3AAikgbg");
	this.shape.setTransform(9.9695,-70.5962);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2014));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("Ag3gCQAagbAjAKQAjAJAPgHQAIgDAAgFIABAHQgBAHgKABIAFABQAFAAAFgGIABAEQAAAFgJADIADADQAEADAGgCQgBADgEACQgIAEgNgFQglgNgUgCQgigDgeAng");
	this.shape_1.setTransform(27.4,-45.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(2014));

	// Layer_6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AANgKQgggIgxATQgNAGgMgHIgHgJQAGAFAUgGQgLgHgDgJIAAgJQAFAPAUABQgLgFgDgIIAAgHIAHAJQAOAHAngHQAngHArAlQAWATAOAVQg7grgdgHg");
	this.shape_2.setTransform(-4.5875,-46.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2014));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEAkQgiAAgPgPIgIgPIAIgKQALgMANgIQApgYAyAdQgBAPgJANQgSAbglAAIgBAAg");
	this.shape_3.setTransform(26.175,-43.0053);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2014));

	// Layer_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAtQhGgKACgzQAAgMARgJQASgIAZAAQBAABA0A3QghAjg0AAQgLAAgMgBg");
	this.shape_4.setTransform(-3.3028,-43.864);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2014));

	// Layer_10
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D4AD91").s().p("AAKBCQAegYguggQgIgKgHgSQgNgiAGgeIAFAhQAKAmAUATIAKAKQAKAMADALQAJAihDAIg");
	this.shape_5.setTransform(15.185,-36.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(2014));

	// Layer_11
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D4AD91").s().p("AAMAaQgEgSgJgQQgGgKgBgMQgBgNgIgLQAHAAAFALIAHARQAVAggGAxIgFgdg");
	this.shape_6.setTransform(-31.1083,-40.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(2014));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E5BFA4").s().p("AAABlQgsgOgIhXQgEgmAOgdQAMgZATgIQATgIANAOQAOAPgCAjQgCAbALgKQAGgEAGgKIgNCLQgMAGgNAAQgIAAgIgDg");
	this.shape_7.setTransform(-30.735,-39.3305);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2014));

	// Layer_13
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DCB783").s().p("AgjAHIgeAPQgNAGgIgIIAWgZQAdgZAlADQAmAEAbAZQAOAOAGAMQhIgogyATg");
	this.shape_8.setTransform(28.725,-55.8215);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2014));

	// Layer_14
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#DCB783").s().p("ABJATQgXgMgNgEQgygOhdAkIAdgZQAmgcArgDQAzgEAfAiQAQAQAFASQgOgDgUgLg");
	this.shape_9.setTransform(-4.725,-56.7711);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2014));

	// Layer_15
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E5BFA4").s().p("AhsFwQgagVgVgaIgPgXQgqgggWg6QgPgngIg5IgKAKQgSANgWgHQgqgOgNhiQgGgrAPgdQANgaAXgFQAXgFAQAQQARATgCAjQgBAZAFgGQACgEADgJQAPhGAKgiQARg7AkgfQAigeBCgzQAmgiACgYQgGgCgEgGQgFgIAFgFQAFgFAEAPQACAFgBAGQAXAHA6gmQBKgvBbAOQAtAHAfARQASA4AuByQAfBfgiAtQghArABA1QAABcgCAMQgIA0hFBpQglA4gfAfQgpAognAHQgbAFgZAAQhQAAhAgxg");
	this.shape_10.setTransform(0.2104,-41.7149);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2014));

	// Layer_16
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DCB783").s().p("AjDE3QiLg1gFh+QgGi0AfheQAriAB9gnQD2hLCSByQBIA5AXBIQgnDui3CSQg6AthAAfIg1AVQhFgChGgbg");
	this.shape_11.setTransform(-5.2563,-66.504);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2014));

	// Layer_17
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DCB783").s().p("AgiFNQgigggvhJQgcgqgHgaQgIgogLgsQgDgNAAgUIABgiIgCh8QAAgaAFgMQARgnACgQQABgLASgjQAJgSAsgtQAtgvBLgaQBPgbA0ARIgvBBQgtAWgjAyQgjAxgQBBQgUBOAIBkQAGBMAWBoQAKApAZA4QAPAgAABGQhJg1gXgWg");
	this.shape_12.setTransform(-24.425,-57.6629);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2014));

	// Layer_18
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#373432").s().p("AgEBJQgSgQgGgTIgHgXIgKgSQgGgMgCgIQgBgIADgSIAIgwQAbAIAWASQAXASANAYQANAagBAcQgCAegQAXQgEAFgDgBIADAQQgZgOgLgLg");
	this.shape_13.setTransform(33.1036,-70.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(2014));

	// Layer_19
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#DCB783").s().p("AC0DaQgTgRgPADQhEANhHgIQhFgIhAgbQhBgcgmgoQgggjgPguQgKgeACgeQACghARgYQAMgRAfgYIBOg7IgIgFQASgBA1gRQApgNAcAJQAgALBOASQBEATAfAeQAuAuAdBZQAgBmgqAsQgLALgvBBQgGAHgHAAQgFAAgGgFg");
	this.shape_14.setTransform(13.2875,-75.6322);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2014));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.8,-100.5,83.69999999999999,100.5);


(lib.ui789ty9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_6
	this.instance = new lib.uilt678t78l7t8("synched",0);
	this.instance.setTransform(18.35,-160.9,1,1,0,0,0,15.6,45.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(345).to({startPosition:345},0).to({y:-156.7,startPosition:348},3).to({y:-160.9,startPosition:352},4).to({y:-165.1,startPosition:355},3).to({y:-160.9,startPosition:358},3).to({y:-156.7,startPosition:361},3).to({y:-160.9,startPosition:364},3).to({y:-165.1,startPosition:366},2).to({y:-160.9,startPosition:369},3).wait(2).to({startPosition:371},0).to({rotation:2.272,x:11.15,y:-161.5,startPosition:381},10).wait(83).to({startPosition:464},0).to({rotation:0,x:18.35,y:-160.9,startPosition:473},9).wait(51).to({startPosition:524},0).to({regX:15.5,regY:45.1,rotation:-6.4088,x:3.45,y:-159,startPosition:533},9).wait(21).to({startPosition:554},0).to({regX:15.6,regY:45.2,rotation:0,x:18.35,y:-160.9,startPosition:563},9).wait(28).to({startPosition:591},0).to({rotation:1.2451,x:14.55,y:-161.15,startPosition:599},8).wait(81).to({startPosition:680},0).to({rotation:0,x:18.35,y:-160.9,startPosition:689},9).wait(62).to({startPosition:751},0).to({rotation:0.2413,x:9.35,y:-161.35,startPosition:759},8).wait(121).to({startPosition:880},0).to({regX:15.7,regY:45.1,rotation:2.1915,x:16.85,y:-160.85,startPosition:889},9).wait(167).to({startPosition:1056},0).to({rotation:0,x:10.75,y:-161.1,startPosition:1066},10).wait(120).to({startPosition:1186},0).to({regX:15.6,rotation:-0.4844,x:13.9,y:-160.95,startPosition:1196},10).wait(97).to({startPosition:1293},0).to({regY:45.2,rotation:0,x:18.35,y:-160.9,startPosition:1303},10).wait(158).to({startPosition:1461},0).to({rotation:0.7274,x:12.65,y:-161.35,startPosition:1468},7).wait(96).to({startPosition:1564},0).to({regX:15.7,regY:45.1,rotation:0.2159,x:18,y:-161.1,startPosition:1573},9,cjs.Ease.quadInOut).wait(81).to({rotation:0.2159,startPosition:1654},0).to({regX:15.6,regY:45.2,rotation:0,x:18.35,y:-160.9,startPosition:1663},9).wait(194).to({startPosition:1857},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1859},0).wait(254));

	// Layer_2
	this.instance_1 = new lib.yuk6rf7k6r7k("synched",0);
	this.instance_1.setTransform(38.85,-128.25,1,1,0,0,0,-19.9,5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(345).to({startPosition:0},0).to({y:-124.05},3).to({y:-128.25},4).to({y:-132.45},3).to({y:-128.25},3).to({y:-124.05},3).to({y:-128.25},3).to({y:-132.45},2).to({y:-128.25},3).wait(2).to({startPosition:0},0).to({regX:-19.8,rotation:-2.2151,x:32.85,y:-129.6},10).wait(83).to({startPosition:0},0).to({regX:-19.9,rotation:0,x:38.85,y:-128.25},9).wait(51).to({startPosition:0},0).to({regX:-19.7,regY:5.2,scaleX:0.9999,scaleY:0.9999,rotation:-13.1261,x:27.5,y:-128.85},9).wait(21).to({startPosition:0},0).to({regX:-19.9,regY:5.3,scaleX:1,scaleY:1,rotation:0,x:38.85,y:-128.25},9).wait(28).to({startPosition:0},0).to({regX:-19.8,rotation:-1.2258,x:35.75,y:-129},8).wait(81).to({startPosition:0},0).to({regX:-19.9,rotation:0,x:38.85,y:-128.25},9).wait(62).to({startPosition:0},0).to({regY:5.2,rotation:-6.965,x:31.45,y:-129.9},8).wait(121).to({startPosition:0},0).to({regX:-19.8,rotation:-2.7753,x:37.75,y:-128.55},9).wait(167).to({rotation:-2.7753},0).to({regX:-19.7,rotation:-9.4433,x:33,y:-129.6},10).wait(120).to({startPosition:0},0).to({regY:5.1,scaleX:0.9999,scaleY:0.9999,rotation:-12.4345,x:35.55,y:-129.1},10).wait(97).to({startPosition:0},0).to({regX:-19.9,regY:5.3,scaleX:1,scaleY:1,rotation:0,x:38.85,y:-128.25},10).wait(158).to({startPosition:0},0).to({regX:-19.8,regY:5.2,rotation:-1.9763,x:34.3,y:-129.5},7).wait(96).to({startPosition:0},0).to({rotation:-0.2719,x:38.6,y:-128.5},9,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2719},0).to({regX:-19.9,regY:5.3,rotation:0,x:38.85,y:-128.25},9).wait(194).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(254));

	// Layer_8
	this.instance_2 = new lib.uil78lt78lt78l("synched",0);
	this.instance_2.setTransform(-1.05,48.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(345).to({startPosition:0},0).to({y:52.25},3).to({y:48.05},4).to({y:43.85},3).to({y:48.05},3).to({y:52.25},3).to({y:48.05},3).to({y:43.85},2).to({y:48.05},3).wait(2).to({startPosition:0},0).to({rotation:-2.2151,x:-0.2,y:48.1},10).wait(83).to({startPosition:0},0).to({rotation:0,x:-1.05,y:48.05},9).wait(51).to({startPosition:0},0).to({regX:0.1,regY:0.1,rotation:-6.4088,x:7.55,y:50.85},9).wait(21).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-1.05,y:48.05},9).wait(28).to({startPosition:0},0).to({rotation:-1.2258,x:-0.4,y:48.1},8).wait(81).to({startPosition:0},0).to({rotation:0,x:-1.05,y:48.05},9).wait(62).to({startPosition:0},0).to({rotation:-2.9861,x:0.8,y:48.3},8).wait(121).to({startPosition:0},0).to({regY:0.1,rotation:-1.0352,x:1.05,y:48.5},9).wait(167).to({startPosition:0},0).to({rotation:-3.2269,x:3,y:48.65},10).wait(120).to({rotation:-3.2269},0).to({rotation:-2.2265,x:2.45,y:48.6},10).wait(97).to({startPosition:0},0).to({regY:0,rotation:0,x:-1.05,y:48.05},10).wait(158).to({startPosition:0},0).to({rotation:-1.9763,x:0.4,y:48.1},7).wait(96).to({startPosition:0},0).to({rotation:-0.2719,x:-0.5,y:47.95},9,cjs.Ease.quadInOut).wait(81).to({rotation:-0.2719},0).to({rotation:0,x:-1.05,y:48.05},9).wait(194).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(254));

	// Layer_16
	this.instance_3 = new lib.tyjke56j56j6("synched",0);
	this.instance_3.setTransform(-19.5,-134.3,1,1,0,0,0,-1.4,5.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(345).to({startPosition:0},0).to({regX:-1.5,rotation:-5.418,x:-19.8,y:-130.4},3).to({regX:-1.6,rotation:-12.6425,x:-20.05,y:-135.1},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-18.0603,x:-20.15,y:-139.5},3).to({regX:-1.4,scaleX:1,scaleY:1,rotation:-23.481,x:-20.2,y:-135.8},3).to({regX:-1.5,rotation:-17.0768,x:-20.15,y:-131.2},3).to({rotation:-10.6721,x:-19.9,y:-134.9},3).to({rotation:-6.4045,x:-19.75,y:-138.9},2).to({regX:-1.4,rotation:0,x:-19.5,y:-134.3},3).wait(2).to({startPosition:0},0).to({regX:-1.5,regY:5.4,rotation:3.7586,x:-25.2,y:-133.15},10).wait(83).to({startPosition:0},0).to({regX:-1.4,regY:5.5,rotation:0,x:-19.5,y:-134.3},9).wait(51).to({startPosition:0},0).to({regX:-1.7,scaleX:0.9999,scaleY:0.9999,rotation:50.5674,x:-26.55,y:-128.2},9).wait(21).to({startPosition:0},0).to({regX:-1.4,scaleX:1,scaleY:1,rotation:0,x:-19.5,y:-134.3},9).wait(28).to({startPosition:0},0).to({regX:-1.6,rotation:1.2661,x:-22.8,y:-133.7},8).wait(81).to({startPosition:0},0).to({regX:-1.4,rotation:0,x:-19.5,y:-134.3},9).wait(62).to({startPosition:0},0).to({rotation:4.2564,x:-26.7,y:-132.15},8).wait(121).to({startPosition:0},0).to({regX:-1.5,rotation:4.231,x:-20.55,y:-133},9).wait(167).to({startPosition:0},0).to({regX:-1.6,rotation:6.261,x:-25.35,y:-131.75},10).wait(120).to({startPosition:0},0).to({regX:-1.7,regY:5.4,rotation:8.9933,x:-22.8,y:-132.3},10).wait(97).to({startPosition:0},0).to({regX:-1.4,regY:5.5,rotation:0,x:-19.5,y:-134.3},10).wait(158).to({startPosition:0},0).to({regX:-1.5,rotation:4.245,x:-24.3,y:-133.25},7).wait(96).to({startPosition:0},0).to({regX:-1.6,rotation:3.756,x:-19.95,y:-134.05},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regX:-1.4,rotation:0,x:-19.5,y:-134.3},9).wait(194).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(254));

	// Layer_17
	this.instance_4 = new lib.oy7989("synched",0);
	this.instance_4.setTransform(-24.95,-42.7,1,1,0,0,0,-11.3,7.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(345).to({startPosition:0},0).to({regX:-11.4,rotation:-5.418,x:-16.7,y:-40.1},3).to({regX:-11.3,rotation:-12.6425,x:-5.45,y:-46.45},4).to({regY:7.7,scaleX:0.9999,scaleY:0.9999,rotation:-18.0603,x:2.9,y:-52.3},3).to({regY:7.8,scaleX:1,scaleY:1,rotation:-23.481,x:11.3,y:-49.6},3).to({regX:-11.2,rotation:-17.0768,x:1.55,y:-43.5},3).to({regY:7.7,rotation:-10.6721,x:-8.35,y:-45.95},3).to({regX:-11.3,rotation:-6.4045,x:-15.15,y:-48.9},2).to({regY:7.8,rotation:0,x:-24.95,y:-42.7},3).wait(2).to({startPosition:0},0).to({regX:-11.5,scaleX:0.9999,scaleY:0.9999,rotation:50.4635,x:-36.6,y:-42.05},10).wait(83).to({startPosition:0},0).to({regX:-11.3,scaleX:1,scaleY:1,rotation:0,x:-24.95,y:-42.7},9).wait(51).to({startPosition:0},0).to({regX:-11.6,scaleX:0.9999,scaleY:0.9999,rotation:50.5674,x:-100.6,y:-74.3},9).wait(21).to({startPosition:0},0).to({regX:-11.3,scaleX:1,scaleY:1,rotation:0,x:-24.95,y:-42.7},9).wait(28).to({startPosition:0},0).to({regX:-11.5,rotation:73.2214,x:-30.2,y:-42.3},8).wait(81).to({startPosition:0},0).to({regX:-11.3,rotation:0,x:-24.95,y:-42.7},9).wait(62).to({startPosition:0},0).to({regY:7.9,rotation:93.9549,x:-39,y:-41.2},8).wait(121).to({startPosition:0},0).to({regX:-11.4,regY:8,rotation:89.4308,x:-32.7,y:-42.15},9).wait(167).to({startPosition:0},0).to({rotation:91.4611,x:-40.65,y:-41.4},10).wait(120).to({startPosition:0},0).to({regX:-11.5,regY:8.1,scaleX:0.9999,scaleY:0.9999,rotation:94.1936,x:-42.4,y:-42.8},10).wait(97).to({startPosition:0},0).to({regX:-11.3,regY:7.8,scaleX:1,scaleY:1,rotation:0,x:-24.95,y:-42.7},10).wait(158).to({startPosition:0},0).to({regX:-11.5,regY:7.9,rotation:89.193,x:-36.55,y:-42.45},7).wait(96).to({startPosition:0},0).to({regX:-11.6,rotation:88.705,x:-31.35,y:-43.15},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regX:-11.3,regY:7.8,rotation:0,x:-24.95,y:-42.7},9).wait(194).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(254));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-189.3,-268.5,273.6,537.1);


(lib.lt78i78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// yuilt678lt678l678l
	this.instance = new lib.yuilt678lt678l678l("synched",0);
	this.instance.setTransform(-34.35,-143.6,1,1,16.4697,0,0,1.9,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:0,x:-36.65,y:-145.15},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({rotation:18.1433,x:-28.4,y:-146.4},7).wait(51).to({startPosition:0},0).to({rotation:0,x:-36.65,y:-145.15},7).wait(106).to({startPosition:0},0).to({regX:1.8,rotation:23.1599,x:-29.1,y:-147.95},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:6.1,rotation:19.4193,x:-20.85,y:-150},11).wait(33).to({startPosition:0},0).to({regX:1.9,regY:6.2,rotation:0,x:-36.65,y:-145.15},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:1.8,rotation:2.0016,x:-31.05,y:-146.15},11).wait(81).to({startPosition:0},0).to({regX:1.9,rotation:0,x:-36.65,y:-145.15},12).wait(68).to({startPosition:0},0).to({rotation:2.7042,x:-29.2,y:-147.25},7).wait(10).to({startPosition:0},0).to({rotation:0,x:-36.65,y:-145.15},9).wait(101).to({startPosition:0},0).to({rotation:9.4172,x:-25.5,y:-146.85},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({rotation:0,x:-36.65,y:-145.15},11).wait(557).to({startPosition:0},0).to({rotation:2.9861,x:-28.85,y:-147},12).wait(68).to({startPosition:0},0).to({rotation:3.4765,x:-39.65,y:-143.55},13).wait(30).to({startPosition:0},0).to({rotation:0,x:-36.65,y:-145.15},12).wait(222).to({startPosition:0},0).to({regX:1.8,rotation:6.9517,x:-28.9,y:-147.3},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uio_ly_y79_9_
	this.instance_1 = new lib.uiolyy799("synched",0);
	this.instance_1.setTransform(-72.95,-51.35,1,1,33.4175,0,0,10.6,9.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:10.7,regY:9.1,rotation:0,x:-47.45,y:-45.85},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({regX:10.6,regY:9.2,rotation:169.9432,x:-70.45,y:-56.55},7).wait(51).to({startPosition:0},0).to({regX:10.7,regY:9.1,rotation:0,x:-47.45,y:-45.85},7).wait(106).to({startPosition:0},0).to({regX:10.6,rotation:169.7067,x:-78.1,y:-61},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regX:10.7,regY:9.2,rotation:173.9578,x:-64.15,y:-59.95},11).wait(33).to({startPosition:0},0).to({regY:9.1,rotation:0,x:-47.45,y:-45.85},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:10.6,rotation:2.0016,x:-45.3,y:-47.25},11).wait(81).to({startPosition:0},0).to({regX:10.7,rotation:0,x:-47.45,y:-45.85},12).wait(68).to({startPosition:0},0).to({regX:10.6,rotation:2.7042,x:-44.75,y:-48.55},7).wait(10).to({startPosition:0},0).to({regX:10.7,rotation:0,x:-47.45,y:-45.85},9).wait(101).to({startPosition:0},0).to({regX:10.6,rotation:9.4172,x:-52.5,y:-50.6},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({regX:10.7,rotation:0,x:-47.45,y:-45.85},11).wait(557).to({startPosition:0},0).to({rotation:2.9861,x:-44.8,y:-48.4},12).wait(68).to({startPosition:0},0).to({regX:10.6,regY:9,rotation:3.4765,x:-56.5,y:-45.15},13).wait(30).to({startPosition:0},0).to({regX:10.7,regY:9.1,rotation:0,x:-47.45,y:-45.85},12).wait(222).to({startPosition:0},0).to({regX:10.6,rotation:6.9517,x:-51.65,y:-50},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uij_79_7t9_97
	this.instance_2 = new lib.uij797t997("synched",0);
	this.instance_2.setTransform(-18.1,-54.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:-57.2},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:1.4497,x:-16.4,y:-57.7},7).wait(51).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.1,y:-57.2},7).wait(106).to({startPosition:0},0).to({regX:-0.1,rotation:1.7042,x:-16.3,y:-57.6},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:-0.1,rotation:4.9449,x:-12.3,y:-58.75},11).wait(33).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.1,y:-57.2},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:2.0016,x:-15.6,y:-57.65},11).wait(81).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.1,y:-57.2},12).wait(68).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:2.7042,x:-14.9,y:-58.6},7).wait(10).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-18.1,y:-57.2},9).wait(101).to({startPosition:0},0).to({rotation:3.7182,x:-12.5,y:-57.55},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({rotation:0,x:-18.1,y:-57.2},11).wait(557).to({startPosition:0},0).to({regX:-0.1,rotation:2.9861,x:-15,y:-58.2},12).wait(68).to({startPosition:0},0).to({rotation:-0.7458,x:-20.15,y:-56.3},13).wait(30).to({startPosition:0},0).to({regX:0,rotation:0,x:-18.1,y:-57.2},12).wait(222).to({startPosition:0},0).to({regX:-0.1,rotation:2.9861,x:-15.05,y:-58.3},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uil_7tlt78l7l
	this.instance_3 = new lib.uil7tlt78l7l("synched",0);
	this.instance_3.setTransform(2.1,-170.45,1,1,0,0,0,1.9,-2.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:-172.9,startPosition:11},11,cjs.Ease.quadOut).wait(64).to({startPosition:75},0).to({rotation:-1.4856,x:6.8,y:-173.1,startPosition:82},7).wait(51).to({startPosition:133},0).to({rotation:0,x:2.1,y:-172.9,startPosition:140},7).wait(106).to({startPosition:246},0).to({regX:2,rotation:-1.5232,x:7.45,y:-172.7,startPosition:255},9,cjs.Ease.quadInOut).wait(35).to({startPosition:290},0).to({regX:2.1,regY:-2.3,rotation:-0.967,x:17.95,y:-172.5,startPosition:301},11).wait(33).to({startPosition:334},0).to({regX:1.9,regY:-2.2,rotation:0,x:2.1,y:-172.9,startPosition:344},10,cjs.Ease.quadInOut).wait(50).to({startPosition:394},0).to({rotation:15.4422,x:7.95,y:-169.6,startPosition:405},11).wait(81).to({startPosition:486},0).to({rotation:0,x:2.1,y:-172.9,startPosition:498},12).wait(68).to({startPosition:566},0).to({regX:2,rotation:-0.2815,x:10.85,y:-173.3,startPosition:573},7).wait(10).to({startPosition:583},0).to({regX:1.9,rotation:0,x:2.1,y:-172.9,startPosition:592},9).wait(101).to({startPosition:693},0).to({rotation:3.7182,x:15.15,y:-171.7,startPosition:708},15,cjs.Ease.quadInOut).wait(43).to({startPosition:751},0).to({rotation:0,x:2.1,y:-172.9,startPosition:762},11).wait(557).to({startPosition:1319},0).to({regX:2,rotation:2.9861,x:11.3,y:-172.7,startPosition:1331},12).wait(68).to({startPosition:1399},0).to({regX:1.9,regY:-2.3,rotation:-4.4361,x:-2.4,y:-172.6,startPosition:1412},13).wait(30).to({startPosition:1442},0).to({regY:-2.2,rotation:0,x:2.1,y:-172.9,startPosition:1454},12).wait(222).to({startPosition:1676},0).to({regX:2,rotation:13.4353,x:15.1,y:-169.9,startPosition:1690},14).wait(167).to({startPosition:1857},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1859},0).wait(11));

	// yuk6r7kr67k
	this.instance_4 = new lib.yuk6r7kr67k("synched",0);
	this.instance_4.setTransform(-26.85,-173.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({y:-175.95},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-1.4856,x:-22.25,y:-175.5},7).wait(51).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},7).wait(106).to({startPosition:0},0).to({rotation:-1.5232,x:-21.6,y:-175},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regX:-0.1,regY:-0.2,rotation:-0.967,x:-11.15,y:-175.1},11).wait(33).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:15.4422,x:-19.15,y:-180.4},11).wait(81).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},12).wait(68).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-0.2815,x:-18.25,y:-176.3},7).wait(10).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},9).wait(101).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:3.7182,x:-13.6,y:-176.7},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},11).wait(557).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:2.9861,x:-17.55,y:-177.35},12).wait(68).to({startPosition:0},0).to({rotation:-4.4361,x:-31.5,y:-173.4},13).wait(30).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-26.85,y:-175.95},12).wait(222).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:13.4353,x:-12.4,y:-179.65},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uil_y7l7t8l
	this.instance_5 = new lib.uily7l7t8l("synched",0);
	this.instance_5.setTransform(-0.15,-179.15,1,1,0,0,0,3.5,30.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:-181.6},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({rotation:-1.4856,x:4.35,y:-181.75},7).wait(51).to({startPosition:0},0).to({rotation:0,x:-0.15,y:-181.6},7).wait(106).to({startPosition:0},0).to({regX:3.6,rotation:-1.5232,x:5,y:-181.35},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:30.1,rotation:-0.967,x:15.45,y:-181.15},11).wait(33).to({startPosition:0},0).to({regX:3.5,regY:30.2,rotation:0,x:-0.15,y:-181.6},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:3.6,regY:30.1,rotation:15.4422,x:8.15,y:-178.7},11).wait(81).to({startPosition:0},0).to({regX:3.5,regY:30.2,rotation:0,x:-0.15,y:-181.6},12).wait(68).to({startPosition:0},0).to({regX:3.6,rotation:-0.2815,x:8.5,y:-181.95},7).wait(10).to({startPosition:0},0).to({regX:3.5,rotation:0,x:-0.15,y:-181.6},9).wait(101).to({startPosition:0},0).to({regX:3.6,rotation:3.7182,x:13.55,y:-180.45},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({regX:3.5,rotation:0,x:-0.15,y:-181.6},11).wait(557).to({startPosition:0},0).to({regX:3.6,rotation:2.9861,x:9.55,y:-181.5},12).wait(68).to({startPosition:0},0).to({regX:3.5,rotation:-4.4361,x:-5.3,y:-181},13).wait(30).to({startPosition:0},0).to({rotation:0,x:-0.15,y:-181.6},12).wait(222).to({startPosition:0},0).to({regX:3.6,rotation:13.4353,x:14.95,y:-178.85},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uoi_y79y89_9_
	this.instance_6 = new lib.uoiy79y899("synched",0);
	this.instance_6.setTransform(28.5,-186.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-188.95},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({rotation:1.4497,x:33.55,y:-188.15},7).wait(51).to({startPosition:0},0).to({rotation:0,x:28.5,y:-188.95},7).wait(106).to({startPosition:0},0).to({rotation:-1.5232,x:33.35,y:-189.45},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-0.967,x:44,y:-188.95},11).wait(33).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:28.5},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({rotation:15.4422,x:37.6,y:-178.05},11).wait(81).to({startPosition:0},0).to({rotation:0,x:28.5,y:-188.95},12).wait(68).to({startPosition:0},0).to({rotation:-0.2815,x:37.05,y:-189.45},7).wait(10).to({startPosition:0},0).to({rotation:0,x:28.5,y:-188.95},9).wait(101).to({startPosition:0},0).to({rotation:3.7182,x:42.5,y:-186},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({rotation:0,x:28.5,y:-188.95},11).wait(557).to({startPosition:0},0).to({rotation:2.9861,x:38.45,y:-187.35},12).wait(68).to({startPosition:0},0).to({rotation:-4.4361,x:22.65,y:-190.6},13).wait(30).to({startPosition:0},0).to({rotation:0,x:28.5,y:-188.95},12).wait(222).to({startPosition:0},0).to({rotation:13.4353,x:44.45,y:-179.35},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// Layer_23
	this.instance_7 = new lib.uilt7l78lt87("synched",0);
	this.instance_7.setTransform(5.15,-22.25,1,1,0,0,0,6.1,-4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({y:-24.7},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({regX:6,rotation:1.4497,x:6,y:-24.55},7).wait(51).to({startPosition:0},0).to({regX:6.1,rotation:0,x:5.15,y:-24.7},7).wait(106).to({startPosition:0},0).to({rotation:1.7042,x:6.05,y:-24.4},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:-4.1,rotation:4.9449,x:8.15,y:-24.35},11).wait(33).to({startPosition:0},0).to({regY:-4,rotation:0,x:5.15,y:-24.7},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({rotation:2.0016,x:6.55,y:-24.3},11).wait(81).to({startPosition:0},0).to({rotation:0,x:5.15,y:-24.7},12).wait(68).to({startPosition:0},0).to({rotation:2.7042,x:6.85,y:-24.95},7).wait(10).to({startPosition:0},0).to({rotation:0,x:5.15,y:-24.7},9).wait(101).to({startPosition:0},0).to({regX:6.2,rotation:3.7182,x:8.65,y:-23.6},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({regX:6.1,rotation:0,x:5.15,y:-24.7},11).wait(557).to({startPosition:0},0).to({regX:6.2,rotation:2.9861,x:6.65,y:-24.55},12).wait(68).to({startPosition:0},0).to({rotation:-0.7458,x:3.65,y:-24.1},13).wait(30).to({startPosition:0},0).to({regX:6.1,rotation:0,x:5.15,y:-24.7},12).wait(222).to({startPosition:0},0).to({regX:6.2,rotation:2.9861,x:6.6,y:-24.65},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// uo_y89_y89_9_
	this.instance_8 = new lib.uoy89y899("synched",0);
	this.instance_8.setTransform(0.4,5.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:3.5},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({rotation:1.4497,x:0.6},7).wait(51).to({startPosition:0},0).to({rotation:0,x:0.4},7).wait(106).to({startPosition:0},0).to({rotation:1.7042,y:3.6},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regX:0.1,rotation:4.9449,x:0.95,y:3.3},11).wait(33).to({startPosition:0},0).to({regX:0,rotation:0,x:0.4,y:3.5},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({rotation:2.0016,x:0.8,y:3.7},11).wait(81).to({startPosition:0},0).to({rotation:0,x:0.4,y:3.5},12).wait(68).to({startPosition:0},0).to({rotation:2.7042,x:0.75,y:2.95},7).wait(10).to({startPosition:0},0).to({rotation:0,x:0.4,y:3.5},9).wait(101).to({startPosition:0},0).to({rotation:3.7182,x:2,y:4.2},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({rotation:0,x:0.4,y:3.5},11).wait(557).to({startPosition:0},0).to({rotation:2.9861,x:0.35,y:3.35},12).wait(68).to({startPosition:0},0).to({rotation:-0.7458,x:-0.8,y:4.1},13).wait(30).to({startPosition:0},0).to({rotation:0,x:0.4,y:3.5},12).wait(222).to({startPosition:0},0).to({rotation:2.9861,x:0.3,y:3.25},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// io_y8_y89_
	this.instance_9 = new lib.ioy8y89("synched",0);
	this.instance_9.setTransform(26.75,-146.6,1,1,-6.7017,0,0,11.8,3.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({regX:11.7,rotation:0,x:26.95,y:-149.15},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({regX:11.8,rotation:-13.6864,x:29.4,y:-147.1},7).wait(51).to({startPosition:0},0).to({regX:11.7,rotation:0,x:26.95,y:-149.15},7).wait(106).to({startPosition:0},0).to({regX:11.8,regY:3.8,rotation:-1.5389,x:31.1,y:-147.6},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regX:12,regY:3.7,rotation:3.6527,x:40.45,y:-146.15},11).wait(33).to({rotation:3.6527},0).to({regX:11.7,regY:3.9,rotation:0,x:26.95,y:-149.15},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({regX:11.8,rotation:2.0016,x:32.75,y:-147.9},11).wait(81).to({startPosition:0},0).to({regX:11.7,rotation:0,x:26.95,y:-149.15},12).wait(68).to({startPosition:0},0).to({rotation:2.7042,x:34.5,y:-148.25},7).wait(10).to({startPosition:0},0).to({rotation:0,x:26.95,y:-149.15},9).wait(101).to({startPosition:0},0).to({regX:11.8,rotation:-0.988,x:37.85,y:-145.95},15,cjs.Ease.quadInOut).wait(43).to({startPosition:0},0).to({regX:11.7,rotation:0,x:26.95,y:-149.15},11).wait(557).to({startPosition:0},0).to({regX:11.8,regY:3.8,rotation:1.2529,x:34.65,y:-147.45},12).wait(68).to({startPosition:0},0).to({rotation:-8.9525,x:23.1,y:-148.5},13).wait(30).to({startPosition:0},0).to({regX:11.7,regY:3.9,rotation:0,x:26.95,y:-149.15},12).wait(222).to({startPosition:0},0).to({regY:3.8,rotation:0.0341,x:34.6,y:-147.65},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	// Layer_3
	this.instance_10 = new lib.uil7t7t9t79("single",0);
	this.instance_10.setTransform(49.5,-57.5,1,1,-22.6552,0,0,12.8,5.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({rotation:0,x:40.75,y:-57.85},11,cjs.Ease.quadOut).wait(64).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-128.9673,x:57.45},7).wait(51).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:0,x:40.75},7).wait(106).to({startPosition:0},0).to({rotation:-10.2907,x:47.35,y:-56.65},9,cjs.Ease.quadInOut).wait(35).to({startPosition:0},0).to({regY:5.1,scaleX:0.9999,scaleY:0.9999,rotation:-5.0962,x:48.2,y:-54.05},11).wait(33).to({startPosition:0},0).to({regY:5.2,scaleX:1,scaleY:1,rotation:0,x:40.75,y:-57.85},10,cjs.Ease.quadInOut).wait(50).to({startPosition:0},0).to({rotation:2.0016,x:43.25,y:-56.15},11).wait(81).to({startPosition:0},0).to({rotation:0,x:40.75,y:-57.85},12).wait(68).to({startPosition:0},0).to({rotation:2.7042,x:43.95,y:-56.4},7).wait(10).to({startPosition:0},0).to({rotation:0,x:40.75,y:-57.85},9).wait(101).to({startPosition:0},0).to({rotation:-138.7955,x:42.3,y:-49.8,startPosition:1},15,cjs.Ease.quadInOut).wait(43).to({startPosition:1},0).to({rotation:0,x:40.75,y:-57.85,startPosition:0},11).wait(557).to({startPosition:0},0).to({rotation:-36.2404,x:46.35,y:-55.75},12).wait(68).to({startPosition:0},0).to({regX:12.9,rotation:-46.4462,x:50.95,y:-60.4},13).wait(30).to({startPosition:0},0).to({regX:12.8,rotation:0,x:40.75,y:-57.85},12).wait(222).to({startPosition:0},0).to({rotation:0.0341,x:48.3,y:-56.3},14).wait(167).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-169.1,-276.2,314.4,328.9);


(lib.dfhgergerg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_8
	this.instance = new lib.uil6t8l678l8l("single",0);
	this.instance.setTransform(4.2,-145.95,1,1,0,0,0,1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-143.5},4).to({y:-145.95},4).to({y:-148.4},3).to({y:-145.95},3).to({y:-143.5},4).to({y:-145.95},4).to({y:-148.4},4).to({y:-145.95},3).wait(1));

	// Layer_7
	this.instance_1 = new lib.uilt79t799("synched",0);
	this.instance_1.setTransform(-43.45,-134.85,1,1,3.2856,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-2.7822,x:-43.4,y:-132.45},4).to({rotation:-8.8497,y:-134.9},4).to({regX:0,rotation:-13.4022,x:-43.3,y:-137.35},3).to({regX:-0.1,rotation:-17.9544,x:-43.45,y:-134.85},3).to({regY:-0.2,scaleX:0.9999,scaleY:0.9999,rotation:-12.2914,y:-132.45},4).to({scaleX:1,scaleY:1,rotation:-6.628,y:-134.95},4).to({regX:-0.2,regY:-0.3,rotation:-0.9627,x:-43.5,y:-137.35},4).to({regX:-0.1,regY:-0.1,rotation:3.2856,x:-43.45,y:-134.85},3).wait(1));

	// Layer_9
	this.instance_2 = new lib.io8080("synched",0);
	this.instance_2.setTransform(-0.5,-155.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:-152.85},4).to({y:-155.3},4).to({y:-157.75},3).to({y:-155.3},3).to({y:-152.85},4).to({y:-155.3},4).to({y:-157.75},4).to({y:-155.3},3).wait(1));

	// Layer_10
	this.instance_3 = new lib.ioy8989("synched",0);
	this.instance_3.setTransform(-3.75,38.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:40.9},4).to({y:38.45},4).to({y:36},3).to({y:38.45},3).to({y:40.9},4).to({y:38.45},4).to({y:36},4).to({y:38.45},3).wait(1));

	// Layer_17
	this.instance_4 = new lib.ouiy89y9("synched",0);
	this.instance_4.setTransform(-25.4,-235.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({y:-233.3},4).to({y:-235.75},4).to({y:-238.2},3).to({y:-235.75},3).to({y:-233.3},4).to({y:-235.75},4).to({y:-238.2},4).to({y:-235.75},3).wait(1));

	// Layer_18
	this.instance_5 = new lib.oy8989("synched",0);
	this.instance_5.setTransform(24.75,-135.6,0.9999,0.9999,-6.2514,0,0,12,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({rotation:0.0979,x:24.8,y:-133.2},4).to({rotation:6.4505,y:-135.7},4).to({regY:4.3,rotation:11.2141,y:-138.15},3).to({regY:4.4,scaleX:1,scaleY:1,rotation:15.9815,x:24.7,y:-135.55},3).to({rotation:10.0537,x:24.65,y:-133.15},4).to({regY:4.3,rotation:4.1251,x:24.75,y:-135.75},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-1.8023,y:-138.2},4).to({regY:4.4,rotation:-6.2514,y:-135.6},3).wait(1));

	// Layer_19
	this.instance_6 = new lib.ioy89y89("synched",0);
	this.instance_6.setTransform(28.45,-190.65,1,1,0,0,0,2.8,10.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-188.2},4).to({y:-190.65},4).to({y:-193.1},3).to({y:-190.65},3).to({y:-188.2},4).to({y:-190.65},4).to({y:-193.1},4).to({y:-190.65},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.7,-248.9,159.2,497.8);


(lib.uilt7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_8
	this.instance = new lib.uil6t8l678l8l("synched",0);
	this.instance.setTransform(4.2,-145.95,1,1,0,0,0,1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(344).to({startPosition:344},0).to({_off:true},1).wait(1741));

	// Layer_7
	this.instance_1 = new lib.uilt79t799("synched",0);
	this.instance_1.setTransform(-43.35,-134.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	// Layer_9
	this.instance_2 = new lib.io8080("synched",0);
	this.instance_2.setTransform(-0.5,-155.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	// Layer_10
	this.instance_3 = new lib.ioy8989("synched",0);
	this.instance_3.setTransform(-3.75,38.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	// Layer_17
	this.instance_4 = new lib.ouiy89y9("synched",0);
	this.instance_4.setTransform(-25.4,-235.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	// Layer_18
	this.instance_5 = new lib.oy8989("synched",0);
	this.instance_5.setTransform(24.6,-135.45,1,1,0,0,0,11.8,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	// Layer_19
	this.instance_6 = new lib.ioy89y89("synched",0);
	this.instance_6.setTransform(28.45,-190.65,1,1,0,0,0,2.8,10.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(344).to({startPosition:0},0).to({_off:true},1).wait(1741));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.2,-246.4,132.4,492.9);


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

	// lt78i78l78l
	this.instance = new lib.lt78i78l78l("synched",0);
	this.instance.setTransform(136.1,425.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:158.15,startPosition:11},11).wait(1847));

	// ui_789_ty9
	this.instance_1 = new lib.ui789ty9("synched",0);
	this.instance_1.setTransform(417.5,422.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(345).to({startPosition:345},0).to({x:338.3,startPosition:373},28).wait(1485));

	// uil_t79_79_
	this.instance_2 = new lib.uilt7979("synched",0);
	this.instance_2.setTransform(293.65,411.8);

	this.instance_3 = new lib.dfhgergerg("synched",0);
	this.instance_3.setTransform(293.65,411.8);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{skewY:0,startPosition:0}}]}).to({state:[{t:this.instance_2,p:{skewY:180,startPosition:14}}]},14).to({state:[{t:this.instance_3}]},331).to({state:[{t:this.instance_3}]},87).to({state:[]},1).wait(1425));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(345).to({_off:false},0).to({x:648.9,startPosition:27},87).to({_off:true},1).wait(1425));

	// Layer_3
	this.instance_4 = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1858));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,0,735,691.2);


// stage content:
(lib.m1l3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,205,361,518,718,1098,1394,1673,1857];
	this.streamSoundSymbolsList[0] = [{id:"Audio1",startFrame:0,endFrame:205,loop:1,offset:0}];
	this.streamSoundSymbolsList[205] = [{id:"Audio2",startFrame:205,endFrame:361,loop:1,offset:0}];
	this.streamSoundSymbolsList[361] = [{id:"Audio3",startFrame:361,endFrame:518,loop:1,offset:0}];
	this.streamSoundSymbolsList[518] = [{id:"Audio4",startFrame:518,endFrame:718,loop:1,offset:0}];
	this.streamSoundSymbolsList[718] = [{id:"Audio5",startFrame:718,endFrame:1098,loop:1,offset:0}];
	this.streamSoundSymbolsList[1098] = [{id:"Audio6",startFrame:1098,endFrame:1394,loop:1,offset:0}];
	this.streamSoundSymbolsList[1394] = [{id:"Audio7",startFrame:1394,endFrame:1673,loop:1,offset:0}];
	this.streamSoundSymbolsList[1673] = [{id:"Audio8",startFrame:1673,endFrame:1757,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,205,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_205 = function() {
		var soundInstance = playSound("Audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,205,361,1);
	}
	this.frame_361 = function() {
		var soundInstance = playSound("Audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,361,518,1);
	}
	this.frame_518 = function() {
		var soundInstance = playSound("Audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,518,718,1);
	}
	this.frame_718 = function() {
		var soundInstance = playSound("Audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,718,1098,1);
	}
	this.frame_1098 = function() {
		var soundInstance = playSound("Audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1098,1394,1);
	}
	this.frame_1394 = function() {
		var soundInstance = playSound("Audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,1394,1673,1);
	}
	this.frame_1673 = function() {
		var soundInstance = playSound("Audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,1673,1757,1);
	}
	this.frame_1857 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(205).call(this.frame_205).wait(156).call(this.frame_361).wait(157).call(this.frame_518).wait(200).call(this.frame_718).wait(380).call(this.frame_1098).wait(296).call(this.frame_1394).wait(279).call(this.frame_1673).wait(184).call(this.frame_1857).wait(1));

	// tal
	this.instance = new lib.ClipGroup("synched",0);
	this.instance.setTransform(346.15,656.05,2.0251,2.0251,0,0,0,244.5,350.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1858));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(228.8,346.1,1088.4,999.6999999999999);
// library properties:
lib.properties = {
	id: '1163EC6AA8104A49BCA181E33ACCBFB2',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/m1l3_atlas_1.png", id:"m1l3_atlas_1"},
		{src:"sounds/Audio1.mp3", id:"Audio1"},
		{src:"sounds/Audio2.mp3", id:"Audio2"},
		{src:"sounds/Audio3.mp3", id:"Audio3"},
		{src:"sounds/Audio4.mp3", id:"Audio4"},
		{src:"sounds/Audio5.mp3", id:"Audio5"},
		{src:"sounds/Audio6.mp3", id:"Audio6"},
		{src:"sounds/Audio7.mp3", id:"Audio7"},
		{src:"sounds/Audio8.mp3", id:"Audio8"}
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
an.compositions['1163EC6AA8104A49BCA181E33ACCBFB2'] = {
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