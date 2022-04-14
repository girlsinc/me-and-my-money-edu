(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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


(lib.UOI7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#292929").s().p("AA7DRQgMgTgGgZQgDgRgBgdIgBguQgFg6gdgaQgFA9gkA1QACgjgNghIgeg2QgRggAAglIAPgGQAVgSAZguQAagvARgSQAWgUARAIQAHAEAJAPQAYAqAFAWQADALABATIABAeQAEBFgCBiIgECjQgVgHgOgWg");
	this.shape.setTransform(0.0064,47.7244,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.7,0,39.5,95.5);


(lib.UK797979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C7AE8E").s().p("AhuGXIgYgxQgajvAWjrQAOiZASg3IAAgBQAFgxAogeQApgfA0AFQA1AFAiAmQAiAmgEAwIgCAMIAAAAIgBADQgGAYgPATQhIENgzDgQgYBwgLA6QgSAMgRAAQgXAAgTgZg");
	this.shape.setTransform(27.3588,98.0896,2.0038,2.0038);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BEBEBE").s().p("ABnCDIg4gJQg4gShphHIhchDIgBAAQACgyAOgcIAAgCIAAABQAJgSALAAIgCACQAAAFA9A3QBEA9AqAQQAkAEgdg2Igkg3ICrByIAzAmQAWARgIAYQgEAMgIAIQgWAQgrAAIgZgBg");
	this.shape_1.setTransform(30.1803,217.2919,2.0038,2.0038);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C7AE8E").s().p("AgNBwQgdgVgfglIgaggIAIgWIgVgNQASAFAWiAIBuAKIgKAvQgBAzAIAXQAFALAEABIBFA8QgVBGgsAAQgbAAgigZg");
	this.shape_2.setTransform(14.9919,197.3028,2.0038,2.0038);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C7AE8E").s().p("AgsGeIgdguQg1jqgFjtQgEidAMg1IAAgBQgBgwAlgjQAlgjA0gBQA1gBAmAhQAnAiAAAxIAAAMIABAAIgBACQgDAZgNAUQgpEUgZDlQgNBygEA6QgTAQgRAAQgVAAgUgUg");
	this.shape_3.setTransform(-33.531,98.6689,2.0038,2.0038);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BEBEBE").s().p("AA6BwQg6gLhvg7Ihkg3IAAAAQgEgyAKgeIAAgBQAHgSALgCIgBADQACAFBBAvQBLA1ArALQAlgBgjgyIgrgyIDuB+QAYAOgFAZQgDAMgHAJQgZAYg+ABg");
	this.shape_4.setTransform(-12.8199,216.8748,2.0038,2.0038);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C7AE8E").s().p("AgCBwQgggRgkghIgdgdIAFgXIgWgLQATADAGiCIBwgCIgGAwQAFAzAMAWQAFAKAFABIBKA0QgNBNgxAAQgZAAgfgTg");
	this.shape_5.setTransform(-30.0428,198.229,2.0038,2.0038);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4A382E").s().p("AjjB7QhegzAAhIQAAhIBegzQBfgzCEAAQCFAABfAzQBeAzAABIQAABIheAzQhfA0iFAAQiEAAhfg0g");
	this.shape_6.setTransform(-7.4582,34.8677,2.0043,2.0043);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.9,-0.1,143.7,244);


(lib.UIO7979TT9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#959042").s().p("AgUIsQhSgEhYgMIhIgKQgFgyAMhbIAOhSQAnhJgRhlQgFgggKgeIgJgZQg7hogeh7Qg8j2COhWQA3ghArgJQAWgEAKADQAiAeBugKQA4gGAxgLQAagGAsAVQAXALARAMQAPAxA/CMQAqBOggD4QgPB8gZBtQAuCwASBmQhYAvi8AAQgtAAgygCg");
	this.shape.setTransform(-9.4639,-55.1412,2.0049,2.0049);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E2E2E").s().p("AmyB+QgEh9AghfQAVhBAfgmIBHh8IDhAKQDuAEBFgeIAIANQBlBzAxDbQAYBuAEBXQjWBWjYAhQhVAMhFAAQkXAAgGjUg");
	this.shape_1.setTransform(0.0177,99.2582,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.3,-167.1,174.6,334.2);


(lib.UIO797T79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B99D71").s().p("AjEIrQgnAAgdgdQgcgcAAgoIAAuTQAAgoAcgcQAdgdAnAAIGJAAQAoAAAcAdQAcAcAAAoIAAOTQAAAogcAcQgcAdgoAAg");
	this.shape.setTransform(24.8927,-99.6573,2.0046,2.0046);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0C49C").s().p("ABIguQAAAVgSAWQgkArhZAHg");
	this.shape_1.setTransform(83.0268,2.1776,2.0046,2.0046);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E0C49C").s().p("AnPCJIAAiIIL8gBICjiIIAAB0IiECdg");
	this.shape_2.setTransform(-4.926,45.6779,2.0046,2.0046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B99D71").s().p("AnPBFIEliJIJ6AAIiVCJg");
	this.shape_3.setTransform(-4.926,32.0465,2.0046,2.0046);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E0C49C").s().p("AjEIrQgnAAgdgdQgcgcAAgoIAAuTQAAgoAcgcQAdgdAnAAIGJAAQAoAAAcAdQAcAcAAAoIAAOTQAAAogcAcQgcAdgoAAg");
	this.shape_4.setTransform(38.9251,-104.5686,2.0046,2.0046);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6F665D").s().p("AgoGJIAAsRIBRAAIAAMRg");
	this.shape_5.setTransform(-70.5774,136.7379,2.0046,2.0046);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6F665D").s().p("AgoGKIAAsSIBRAAIAAMSg");
	this.shape_6.setTransform(37.1711,129.5213,2.0046,2.0046);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#6F665D").s().p("AgpGJIAAsRIBTAAIAAMRg");
	this.shape_7.setTransform(-6.8805,73.0911,2.0046,2.0046);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F665D").s().p("AgoGJIAAsRIBRAAIAAMRg");
	this.shape_8.setTransform(68.5434,83.7156,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.9,-215.7,195.60000000000002,431.4);


(lib.UILT7LT78L87L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#E5BFA4").s().p("AAjGjQgLg5gZhwQgzjghIkNQgQgUgFgXIgBgDIABAAIgCgMQgFgwAigmQAigmA1gFQA0gFApAfQApAeAEAxIABABQARA3AOCZQAWDrgaDvIgGAQQgIATgKANQgTAZgXAAQgQAAgSgMg");
	this.shape.setTransform(-28.038,98.0501,2.0035,2.0035);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DEDEDE").s().p("AjAB1QgIgJgEgMQgIgXAWgRIAzgmICrhzIgkA3QgeA2AlgEQBCgZBohvIgBgDQALAAAJASIAAgBIAAACQAOAcACAyIgBAAIAAABQgoAgg0AiQhpBHg4ASQgZAHgfACIgbABQgqAAgVgPg");
	this.shape_1.setTransform(-30.8481,217.2073,2.0035,2.0035);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E5BFA4").s().p("AhwBEIBEg8QAFgCAFgKQAJgXgCg0IgKgvIBugKQAWCBASgGIgVANIAIAXQgoA4gvAhQgiAZgaAAQgsAAgVhFg");
	this.shape_2.setTransform(-15.6616,197.2512,2.0035,2.0035);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E5BFA4").s().p("AggGiQgEg6gNhyQgZjkgpkUQgNgVgDgYIgBgDIABAAIAAgMQABgxAmghQAmgiA1ABQA0ABAlAjQAlAjgBAxIAAABQALA6gDCYQgFDtg1DqQgLAagSATQgUAUgUAAQgSAAgTgQg");
	this.shape_3.setTransform(32.838,98.5925,2.0035,2.0035);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DEDEDE").s().p("AhyBzQg+gBgZgYQgIgJgCgMQgGgZAYgOQA3ggAPgHICohXIgrAyQgiAyAlABQBEgSB0hjIgBgDQAMADAGASIAAgBIAAACQAKAegDAxIgBAAIAAABQgsAag3AdQhwA7g6ALQgVAEgYAAIgMgBg");
	this.shape_4.setTransform(12.1255,216.8408,2.0035,2.0035);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E5BFA4").s().p("Ah0A2IBLg0QAFgBAGgKQALgWAFgzIgFgwIBvADQAHCAASgBIgWAKIAFAXQguAzgyAcQggATgYAAQgyAAgOhNg");
	this.shape_5.setTransform(29.3176,198.1272,2.0035,2.0035);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#673A2D").s().p("AjiB8QhfgzAAhJQAAhHBfgzQBeg0CEAAQCFAABfA0QBeAzAABHQAABJheAzQhfAziFAAQiEAAhegzg");
	this.shape_6.setTransform(7.2485,34.8896,2.0044,2.0044);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.3,-0.1,144.1,243.9);


(lib.UIL7T8L7T8LT78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#CBA487").s().p("AgHAKQgggPAOgKQAPgKAVAEQALACAIAEIgDAmQgTgFgPgIg");
	this.shape.setTransform(324.1762,238.7807,2.005,2.005);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E8E9E8").s().p("AgdA/IAiiBIAZAKIggB8g");
	this.shape_1.setTransform(302.7249,263.306,2.005,2.005);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8E9E8").s().p("AgSBDIAMiFIAaAGIgLB/g");
	this.shape_2.setTransform(322.4239,267.5165,2.005,2.005);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ACBCE0").s().p("AhCBNQgbggAAgtQAAgsAbggQAcggAmAAQAnAAAcAgQAbAgAAAsQAAAtgbAgQgcAggnAAQgmAAgcggg");
	this.shape_3.setTransform(411.2339,-62.1238,2.0046,2.0046);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8997C7").s().p("AhNBuQghguAAhAQAAg/AhguQAggtAtAAQAuAAAgAtQAhAuAAA/QAABAghAuQggAtguAAQgtAAgggtg");
	this.shape_4.setTransform(410.1314,-36.2639,2.0046,2.0046);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3A4892").s().p("AglCJQgQg5AAhQQAAhPAQg5QAQg4AVAAQAWAAAQA4QAQA5AABPQAABQgQA5QgQA4gWAAQgVAAgQg4g");
	this.shape_5.setTransform(427.3211,-34.0588,2.0046,2.0046);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3A4892").s().p("AhkBcQgqgmAAg2QAAg1AqgmQAqgmA6AAQA7AAAqAmQAqAmAAA1QAAA2gqAmQgqAmg7AAQg6AAgqgmg");
	this.shape_6.setTransform(416.5462,-72.7985,2.0046,2.0046);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B1D2A5").s().p("Ag3BDQgXgcAAgnQAAgmAXgcQAXgbAgAAQAgAAAYAbQAXAcAAAmQAAAngXAcQgYAbggAAQggAAgXgbg");
	this.shape_7.setTransform(274.5677,-0.5312,2.0046,2.0046);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B1D2A5").s().p("AhFBQQgeghAAgvQAAgtAegiQAdggAoAAQApAAAeAgQAdAiAAAtQAAAvgdAhQgdAggqABQgogBgdggg");
	this.shape_8.setTransform(270.408,-41.927,2.0046,2.0046);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D4A6B9").s().p("AhmBzQgrgwAAhDQAAhDArgvQArgwA7AAQA8AAArAwQArAvAABDQAABDgrAwQgrAwg8AAQg7AAgrgwg");
	this.shape_9.setTransform(258.731,-14.4134,2.0046,2.0046);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D4A6B9").s().p("AhRCXQgig/AAhYQAAhXAig+QAig/AvAAQAwAAAiA/QAiA+AABXQAABYgiA/QgiA+gwAAQgvAAgig+g");
	this.shape_10.setTransform(267.1004,-29.5985,2.0046,2.0046);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D7A6CB").s().p("AgmBNQgQggAAgtQAAgsAQggQAQggAWAAQAWAAARAgQAQAgAAAsQAAAtgQAgQgRAggWAAQgWAAgQggg");
	this.shape_11.setTransform(276.873,-420.1522,2.0046,2.0046);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D7A6CB").s().p("Ag3BHQgXgegBgpQABgpAXgdQAXgdAgAAQAhAAAXAdQAYAdgBApQABApgYAeQgXAdghAAQggAAgXgdg");
	this.shape_12.setTransform(259.7333,-369.4349,2.0046,2.0046);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B46CAB").s().p("AhgBBQgpgbAAgmQAAglApgbQAogbA4AAQA5AAApAbQAoAbAAAlQAAAmgoAbQgpAbg5AAQg4AAgogbg");
	this.shape_13.setTransform(253.4688,-366.6785,2.0046,2.0046);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#B46CAB").s().p("AggBsQgOgsAAhAQAAg+AOgtQANgtATAAQATAAAOAtQAOAtAAA+QAABAgOAsQgOAtgTAAQgTAAgNgtg");
	this.shape_14.setTransform(246.4025,-411.4321,2.0046,2.0046);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#B46CAB").s().p("AgcDCQgMhQAAhyQAAhxAMhQQAMhRAQAAQARAAAMBRQAMBQgBBxQABBygMBQQgMBRgRAAQgQAAgMhRg");
	this.shape_15.setTransform(267.5514,-389.5314,2.0046,2.0046);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#AAC7AE").s().p("AhhEXIAAotIDDAAIAAItg");
	this.shape_16.setTransform(395.3973,-229.7617,2.0046,2.0046);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#AAC7AE").s().p("AhZA/IBxiqIBCAsIhxCrg");
	this.shape_17.setTransform(393.9439,-306.2386,2.0046,2.0046);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DAB4D5").s().p("AgzAgIAAg/IBnAAIAAA/g");
	this.shape_18.setTransform(257.8791,-240.0355,2.0046,2.0046);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9F5AA2").s().p("AhJAxIAAhhICTAAIAABhg");
	this.shape_19.setTransform(249.8104,-246.5505,2.0046,2.0046);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B8D4D1").s().p("AgmCgIAAk/IBMAAIAAE/g");
	this.shape_20.setTransform(242.6939,-201.4963,2.0046,2.0046);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#B8D4D1").s().p("AguByIAAjiIBdAAIAADig");
	this.shape_21.setTransform(281.0827,-196.6851,2.0046,2.0046);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#D7B8B8").s().p("Ah/AjIAAhEID/AAIAABEg");
	this.shape_22.setTransform(264.6948,-162.506,2.0046,2.0046);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BF5555").s().p("AgsCpIAAlRIBZAAIAAFRg");
	this.shape_23.setTransform(259.3825,-202.8494,2.0046,2.0046);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#BF5555").s().p("AgzBAIAhiQIBGARIghCPg");
	this.shape_24.setTransform(275.6702,-238.8828,2.0046,2.0046);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#787670").s().p("AhiAdIAAg5IDFAAIAAA5g");
	this.shape_25.setTransform(395.1968,-158.146,2.0046,2.0046);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#C7BEB5").s().p("AgQJtIAAzaIAhAAIAATag");
	this.shape_26.setTransform(446.1647,-269.5538,2.0046,2.0046);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#47443F").s().p("AgKISIAAwjIAVAAIAAQjg");
	this.shape_27.setTransform(430.1276,-274.6155,2.0046,2.0046);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#47443F").s().p("AjHAXIAAgtIGOAAIAAAtg");
	this.shape_28.setTransform(392.3402,-376.2506,2.0046,2.0046);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#68BF74").s().p("AjHISIAAwjIGOAAIAAQjg");
	this.shape_29.setTransform(392.3402,-274.6155,2.0046,2.0046);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#86785F").s().p("AkIJtIAAzaIIRAAIAATag");
	this.shape_30.setTransform(391.9894,-269.5538,2.0046,2.0046);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#EFE354").s().p("AgOAVQgFgJAAgMQAAgLAFgJQAHgJAHAAQAIAAAHAJQAFAJAAALQAAAMgFAJQgHAJgIAAQgHAAgHgJg");
	this.shape_31.setTransform(112.4926,21.6701,2.0046,2.0046);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#EFE354").s().p("AgTDmQgIhgAAiGQAAiFAIhgQAJhgAKAAQAMAAAIBgQAJBfgBCGQABCHgJBfQgIBggMAAQgKAAgJhgg");
	this.shape_32.setTransform(136.6485,-40.3734,2.0046,2.0046);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#EFE354").s().p("AhTBkQgigqAAg6QAAg6AigpQAjgpAwAAQAxAAAjApQAiApAAA6QAAA6giAqQgjApgxAAQgwAAgjgpg");
	this.shape_33.setTransform(126.475,-127.2244,2.0046,2.0046);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#787670").s().p("AhiAdIAAg5IDFAAIAAA5g");
	this.shape_34.setTransform(122.5659,44.1221,2.0046,2.0046);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#C7BEB5").s().p("AgQJuIAAzbIAhAAIAATbg");
	this.shape_35.setTransform(173.5339,-67.3358,2.0046,2.0046);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#47443F").s().p("AgKISIAAwjIAVAAIAAQjg");
	this.shape_36.setTransform(157.4968,-72.3474,2.0046,2.0046);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#47443F").s().p("AjGAXIAAgtIGNAAIAAAtg");
	this.shape_37.setTransform(119.7093,-173.9826,2.0046,2.0046);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#CC9E5C").s().p("AjGISIAAwjIGNAAIAAQjg");
	this.shape_38.setTransform(119.7093,-72.3474,2.0046,2.0046);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#86785F").s().p("AkIJuIAAzbIIRAAIAATbg");
	this.shape_39.setTransform(119.3585,-67.3358,2.0046,2.0046);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#787670").s().p("AhZASIAAgjICzAAIAAAjg");
	this.shape_40.setTransform(268.3533,-139.152,2.0046,2.0046);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#A8B295").s().p("AgOGCIAAsDIAdAAIAAMDg");
	this.shape_41.setTransform(314.5101,-208.312,2.0046,2.0046);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#47443F").s().p("AgJErIAApVIATAAIAAJVg");
	this.shape_42.setTransform(299.9263,-207.861,2.0046,2.0046);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#47443F").s().p("Ai0ANIAAgZIFpAAIAAAZg");
	this.shape_43.setTransform(265.7473,-265.1937,2.0046,2.0046);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#786C59").s().p("Ai0ErIAApVIFpAAIAAJVg");
	this.shape_44.setTransform(265.7473,-207.861,2.0046,2.0046);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#667256").s().p("AjvGCIAAsDIHfAAIAAMDg");
	this.shape_45.setTransform(265.4466,-208.312,2.0046,2.0046);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#787670").s().p("AhtASIAAgjIDbAAIAAAjg");
	this.shape_46.setTransform(416.0952,21.9708,2.0046,2.0046);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C7BEB5").s().p("AgSGBIAAsCIAlAAIAAMCg");
	this.shape_47.setTransform(472.8765,-47.1391,2.0046,2.0046);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#47443F").s().p("AgLErIAApVIAXAAIAAJVg");
	this.shape_48.setTransform(454.935,-46.7382,2.0046,2.0046);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#47443F").s().p("AjdANIAAgZIG7AAIAAAZg");
	this.shape_49.setTransform(412.9379,-104.0207,2.0046,2.0046);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#786C59").s().p("AjdErIAApVIG7AAIAAJVg");
	this.shape_50.setTransform(412.9379,-46.7382,2.0046,2.0046);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#A3967D").s().p("AkmGBIAAsCIJNAAIAAMCg");
	this.shape_51.setTransform(412.5369,-47.1391,2.0046,2.0046);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#73C053").s().p("ACDAlQgCglghgHQgigHhsAgIhnAiIAQgXQAXgaAegSQBfg8CHAnIgUBYIABgPg");
	this.shape_52.setTransform(255.9245,-426.485,2.0046,2.0046);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#787670").s().p("AhtASIAAgjIDbAAIAAAjg");
	this.shape_53.setTransform(259.0317,-316.0614,2.0046,2.0046);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#C7BEB5").s().p("AgSGBIAAsBIAlAAIAAMBg");
	this.shape_54.setTransform(315.763,-385.1713,2.0046,2.0046);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#47443F").s().p("AgLErIAApVIAXAAIAAJVg");
	this.shape_55.setTransform(297.8716,-384.7704,2.0046,2.0046);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#47443F").s().p("AjdANIAAgZIG7AAIAAAZg");
	this.shape_56.setTransform(255.8243,-442.103,2.0046,2.0046);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#786C59").s().p("AjdErIAApVIG7AAIAAJVg");
	this.shape_57.setTransform(255.8243,-384.7704,2.0046,2.0046);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#A3967D").s().p("AkmGBIAAsBIJNAAIAAMBg");
	this.shape_58.setTransform(255.4735,-385.1713,2.0046,2.0046);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#787670").s().p("AhtASIAAgjIDbAAIAAAjg");
	this.shape_59.setTransform(265.8475,42.1174,2.0046,2.0046);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#C7BEB5").s().p("AgSGCIAAsDIAlAAIAAMDg");
	this.shape_60.setTransform(322.5286,-26.9925,2.0046,2.0046);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#47443F").s().p("AgLEqIAApTIAXAAIAAJTg");
	this.shape_61.setTransform(304.6372,-26.5916,2.0046,2.0046);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#47443F").s().p("AjdANIAAgZIG7AAIAAAZg");
	this.shape_62.setTransform(262.59,-83.8741,2.0046,2.0046);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#786C59").s().p("AjdEqIAApTIG7AAIAAJTg");
	this.shape_63.setTransform(262.59,-26.5916,2.0046,2.0046);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#A3967D").s().p("AkmGCIAAsDIJNAAIAAMDg");
	this.shape_64.setTransform(262.2391,-26.9925,2.0046,2.0046);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#73C053").s().p("ACCAlQgBglgigHQghgHhsAgIhnAiIARgXQAWgaAegSQBfg8CHAnIgUBYIAAgPg");
	this.shape_65.setTransform(91.494,-355.3203,2.0046,2.0046);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#73C053").s().p("Agih3QACAQAZAvQAfA8AIAXQAMAighAhIghAag");
	this.shape_66.setTransform(66.159,-309.6966,2.0046,2.0046);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#547EBE").s().p("AikCXQAGg0CiiXQBRhMBRhCIiVEcIAVAFQCJAmgWASQgOALg0AMQg2AOg3AEQgcADgXAAQhgAAAFgsg");
	this.shape_67.setTransform(88.3134,-295.313,2.0046,2.0046);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#B4A274").s().p("AhmC/QAagQASgVQA6hEglhdQgkgagaggQgzhAA3gcQBUgrAqgCQA8gCgGBLQgGBFAWCEQALBDAMA0Ij3AMg");
	this.shape_68.setTransform(89.4606,-310.203,2.0046,2.0046);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#787670").s().p("AhtASIAAgjIDbAAIAAAjg");
	this.shape_69.setTransform(94.5511,-244.8967,2.0046,2.0046);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#C7BEB5").s().p("AgSGCIAAsCIAlAAIAAMCg");
	this.shape_70.setTransform(151.3325,-314.0567,2.0046,2.0046);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#47443F").s().p("AgLErIAApVIAXAAIAAJVg");
	this.shape_71.setTransform(133.391,-313.6057,2.0046,2.0046);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#47443F").s().p("AjdANIAAgZIG7AAIAAAZg");
	this.shape_72.setTransform(91.3938,-370.9384,2.0046,2.0046);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#786C59").s().p("AjdErIAApVIG7AAIAAJVg");
	this.shape_73.setTransform(91.3938,-313.6057,2.0046,2.0046);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#A3967D").s().p("AkmGCIAAsCIJNAAIAAMCg");
	this.shape_74.setTransform(90.9929,-314.0567,2.0046,2.0046);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#494E4E").s().p("ApNA8IAAh3ISbAAIAAB3g");
	this.shape_75.setTransform(-240.8496,97.244,2.0045,2.0045);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#D9C18C").s().p("AgfUlMAAAgpJIA/AAMAAAApJg");
	this.shape_76.setTransform(-128.9509,-178.7194,2.0045,2.0045);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#E1DFDB").s().p("AoOANIAAgZIQdAAIAAAZg");
	this.shape_77.setTransform(-299.0289,-104.5045,2.0045,2.0045);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#E1DFDB").s().p("AsHAoIAAhPIYPAAIAABPg");
	this.shape_78.setTransform(-348.99,-56.4977,2.0045,2.0045);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#E1DFDB").s().p("ApeBtIAAjZIS9AAIAADZg");
	this.shape_79.setTransform(-315.0646,-5.1837,2.0045,2.0045);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E1DFDB").s().p("AoOAKIAAgTIQdAAIAAATg");
	this.shape_80.setTransform(-299.0289,-356.4645,2.0045,2.0045);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#E1DFDB").s().p("AoOAlIAAhJIQdAAIAABJg");
	this.shape_81.setTransform(-299.0289,-326.999,2.0045,2.0045);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#B1A79B").s().p("AmwMaIAA4zINhAAIAAYzg");
	this.shape_82.setTransform(-280.2873,-135.2227,2.0045,2.0045);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#B1A79B").s().p("AmwEoIAApPINhAAIAAJPg");
	this.shape_83.setTransform(-280.2873,-367.2886,2.0045,2.0045);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#414A4F").s().p("AnIRkMAAAgjHIORAAMAAAAjHg");
	this.shape_84.setTransform(-275.6269,-192.0992,2.0045,2.0045);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#A29A69").s().p("AnOSFMAAAgkJIOdAAMAAAAkJg");
	this.shape_85.setTransform(-266.2561,-185.4343,2.0045,2.0045);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#6F6656").s().p("AoATiMAAAgnDIQBAAMAAAAnDg");
	this.shape_86.setTransform(-238.1436,-165.2896,2.0045,2.0045);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#C9D9E1").s().p("AkAAdImEgFQgRAAgnACQgkADgUgBQjggIkRgBQijgBlKACQmtADkjgPQgNgBgJgFQgJgEAAgGQABgHAKgEQAKgEANAAQCYgGDMADQB3ACDuAHQBPABDNgFQCzgGBqAGQCQAIDTAFIFhAIICFAHQBRAEAzAAINmAIQIKAFFbgJQCggEFEgFQEbgHDDgdQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQjIAekVALInlAKQkAAGm8gCQn6gBjDACIiIABQhwAAiMgCg");
	this.shape_87.setTransform(9.6811,296.4901,2.0033,2.0033);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#C9D9E1").s().p("AkAAdImEgGQgQAAgoADQgkADgVgBQjfgIkRgBQijgBlKACQmtADkkgPQgNgBgIgFQgJgDAAgHQABgHAKgEQAKgFANABQCYgGDMADQB2ACDvAHQBPABDNgFQCzgGBqAGQCQAIDTAFIFgAIICGAHQBRAEAzAAINmAIQIMAFFZgJQCggEFEgFQEagHDEgdQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAAAAAABQgBAAAAAAQgBABgBAAQjIAekVALInlAKQj9AGm/gCQnzgBjLACIiIABQhwAAiLgCg");
	this.shape_88.setTransform(8.1569,280.2632,2.0033,2.0033);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#C9D9E1").s().p("AkAAdImFgGQgQAAgnADQgkADgVgBQjfgIkRgBQijgBlLACQmuADkigQQgNAAgIgFQgJgEAAgGQABgHAKgEQAJgFANABQCZgGDMADQB2ACDvAHQBPABDNgFQCzgGBqAGQCQAIDSAFIFhAIICFAHQBSAEAyAAINmAIQINAFFYgJQChgEFEgFQEagHDEgdQABAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQAAABABAAQAAAAAAABQgBAAAAAAQgBABgBAAQjIAekVALInmAKQj9AGm+gCQnzgBjLACIh6ABQh0AAiVgCg");
	this.shape_89.setTransform(6.653,264.0289,2.0033,2.0033);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#C9D9E1").s().p("AkAAdImEgGQgQAAgoADQgkADgUgBQjigIkPgBQi3gBk2ACQmvADkhgQQgNAAgJgFQgJgDAAgHQABgHAKgEQAKgFANABQCYgGDMADQB2ACDvAHQBPABDNgFQCzgGBqAGQCQAIDTAFIFhAIICFAHQBRAEAzAAINmAIQIMAFFZgJQCggEFEgFQEbgHDDgdQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQjIAekVALInlAKQj9AGm/gCQnzgBjLACIh7ABQhzAAiVgCg");
	this.shape_90.setTransform(5.0735,247.802,2.0033,2.0033);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#C9D9E1").s().p("AkAAdImEgGQgQAAgoADQgkADgVgBQjigIkOgBQi3gBk3ACQmuADkigQQgNAAgIgFQgJgEAAgGQABgHAKgEQAKgFANABQCYgGDMADQB2ACDvAHQBPABDNgFQCzgGBqAGQCNAIDWAFIFgAIICGAHQBRAEAzAAINmAIQIMAFFZgJQCggEFEgFQEagHDEgdQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAAAAAABQgBAAAAAAQgBABgBAAQjIAekVAKInlALQj/AGm9gCQn4gBjGACIh6ABQh0AAiVgCg");
	this.shape_91.setTransform(3.5467,231.575,2.0033,2.0033);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#C9D9E1").s().p("AkAAdImFgGQgPAAgoADQgkADgVgBQjggIkQgBQiugBlAACQmuADkigQQgNAAgIgFQgJgEAAgGQABgHAKgEQAJgFANABQCagGDLADIFlAJQBQABDMgFQCzgGBqAGQCOAIDUAFIFhAIICFAHQBSAEAyAAINmAIQINAFFYgJQChgEFEgFQEagHDEgdQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAAAABABQAAAAAAABQgBAAAAAAQgBABgBAAQjIAekVAKInmALQj/AGm8gCQn4gBjGACIh6ABQh0AAiVgCg");
	this.shape_92.setTransform(2.0219,215.3481,2.0033,2.0033);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQDJgeEVgKQCigGFDgFQD/gFG9ABQH3ABDGgCQCagCDqADIGEAGQAPAAApgDQAjgDAVABQDiAIEPABQC3ABE2gCQGvgDEhAQQANAAAJAFQAJAEAAAGQgBAHgKAEQgKAFgNgBQiYAGjMgDIllgJQhQgBjMAGQi0AFhpgGQiOgIjVgFIlhgJIiFgGQhRgEgzAAItmgIQoMgFlZAJQlDAEihAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAg");
	this.shape_93.setTransform(-10.5691,287.4223,2.0033,2.0033);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#C9D9E1").s().p("EgnAAAeQgBAAAAgBQAAAAAAgBQABAAAAAAQABgBABAAQDIgeEVgKQCigGFDgFQD/gFG9ABQH4ABDGgCQCZgCDqADIGEAGQAPAAApgDQAkgDAVABQDhAIEPABQCtABFAgCQGvgDEhAQQANAAAJAFQAJAEAAAGQgBAHgKAEQgKAFgNgBQiZAGjLgDIllgJQhQgBjMAGQizAFhqgGQiOgIjVgFIlggJIiGgGQhRgEgzAAItmgIQoMgFlZAJQlDAEihAFQkaAHjEAdQgBAAgBAAQAAAAgBAAQgBAAAAAAQAAgBAAAAg");
	this.shape_94.setTransform(-9.0833,303.6493,2.0033,2.0033);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#C9D9E1").s().p("EgnAAAeQgBAAAAgBQAAAAAAgBQABAAAAAAQABgBABAAQDIgeEVgLQCigGFDgEQD/gGG9ABQH4ACDGgDQCZgCDqAEIGFAFQAOAAApgDQAkgCAVABQDhAIEPABQCuABFAgDQGugCEiAPQANABAJAFQAIADAAAHQgBAGgKAFQgKAEgMAAQiaAGjLgEIllgIQhQgCjMAGQizAFhqgFQiOgIjUgFIlhgJIiFgGQhSgFgyAAItmgHQoNgFlZAJQlCAEiiAFQkaAHjEAdIgCAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_95.setTransform(-7.5564,319.9096,2.0033,2.0033);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQABAAAAgBQDJgeEVgLQCigGFDgEQD/gGG9ABQH3ACDGgDQCagCDqAEIGEAFQAPAAApgDQAjgCAVABQDgAIERABQCjABFKgCQGegEEyAQQANABAJAFQAJADAAAHQgBAGgKAFQgKAEgNAAQiaAGjKgEIllgIQhQgCjMAGQi0AFhpgFQiOgIjVgFIlhgJIiFgGQhSgFgyAAItmgHQoMgFlZAJQlDAEihAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_96.setTransform(-5.9615,336.1532,2.0033,2.0033);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQABAAABgBQDIgeEVgLQCigGFDgEQD/gGG9ABQH4ACDGgDQCZgCDqAEIGEAFQAPAAApgDQAkgCAVABQDfAIERABQCjABFLgCQGsgDEjAPQANABAJAFQAJADAAAHQgBAGgKAFQgKAEgNAAQiZAGjLgEIllgIQhSgCjKAGQi0AFhpgFQiQgIjTgFIlggJIiGgGQhSgFgyAAItmgHQoMgFlZAJQlCAEiiAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_97.setTransform(-4.4514,352.3802,2.0033,2.0033);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#C9D9E1").s().p("EgnAAAeQAAgBgBAAQAAAAAAgBQABAAAAAAQABAAABgBQDIgeEWgLQChgGFEgEQEBgGG7ABQH9ACDAgCQCagDDpAEIGFAFQAOAAApgDQAkgCAVABQDfAIERABQCjABFLgCQGsgDEkAPQANABAJAFQAIADAAAHQgBAGgKAFQgJAEgNAAQiZAGjMgEIllgIQhSgCjKAGQi0AFhpgFQiQgIjSgFIlhgJIiFgGQhSgFgyAAItmgHQoNgFlZAJQlCAEiiAFQkaAHjEAdQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_98.setTransform(-2.9499,368.6257,2.0033,2.0033);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#C9D9E1").s().p("EgnAAAeIgBgBIACgCQDJgeEVgKQCigGFDgFQD/gFG9ABQH3ABDGgCQCagCDqADIGEAGQAPAAApgDQAjgDAVABQDhAIEQABQCtABFAgCQGvgDEhAQQANAAAJAFQAJAEAAAGQgBAHgKAEQgKAFgNgBQiaAGjKgDIllgJQhQgBjMAGQi0AFhpgGQiOgIjVgFIlhgJIiFgGQhRgEgzAAItmgIQoMgFlZAJQlDAEihAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAg");
	this.shape_99.setTransform(-10.5858,133.9675,2.0033,2.0033);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#C9D9E1").s().p("EgnAAAeQgBAAAAgBQAAAAAAgBQABAAAAAAQABgBABAAQDIgeEVgLQCigGFDgEQD/gGG9ABQH4ACDGgDQCZgCDqAEIGEAFQAPAAApgDQAkgCAVABQDhAIEPABQCtABFAgDQGvgCEhAPQANABAJAFQAJADAAAHQgBAGgKAFQgKAEgNAAQiZAGjLgEIllgIQhQgCjMAGQizAFhqgFQiOgIjVgFIlggJIiGgGQhRgFgzAAItmgHQoMgFlZAJQlDAEihAFQkaAHjEAdIgCAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAg");
	this.shape_100.setTransform(-9.0616,150.2278,2.0033,2.0033);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQABgBABAAQDIgeEVgLQCigGFDgEQD/gGG9ABQH4ACDGgDQCZgCDqAEIGFAFQAOAAApgDQAkgCAVABQDhAIEPABQCuABFAgDQG9gCETAPQANABAJAFQAIADAAAHQgBAGgKAFQgKAEgMAAQiZAGjMgEIllgIQhSgCjKAGQi0AFhpgFQiOgIjUgFIlhgJIiFgGQhSgFgyAAItmgHQoNgFlZAJQlCAEiiAFQkaAHjEAdQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAgBAAAAg");
	this.shape_101.setTransform(-7.5564,166.4715,2.0033,2.0033);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQABAAAAgBQDJgeEVgLQCigGFDgEQD/gGG9ABQH3ACDGgDQCagCDqAEIGEAFQAPAAApgDQAjgCAVABQDgAIERABQCjABFKgCQGtgDEjAPQANABAJAFQAJADAAAHQgBAGgKAFQgKAEgNAAQiZAGjLgEIllgIQhSgCjKAGQi0AFhpgFQiQgIjTgFIlhgJIiFgGQhSgFgyAAItmgHQoMgFlZAJQlDAEihAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_102.setTransform(-5.9615,182.6984,2.0033,2.0033);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#C9D9E1").s().p("EgnAAAeQgBgBAAAAQAAAAAAgBQABAAAAAAQABAAABgBQDIgeEVgLQCigGFDgEQD/gGG9ABQH4ACDGgDQCZgCDqAEIGEAFQAPAAApgDQAkgCAVABQDfAIERABQCjABFLgCQGsgDEjAPQANABAJAFQAJADAAAHQgBAGgKAFQgKAEgNAAQiZAGjLgEIllgIQhSgCjKAGQi0AFhpgFQiQgIjTgFIlggJIiGgGQhSgFgyAAItmgHQoMgFlZAJQlCAEiiAFQkaAHjEAdQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_103.setTransform(-4.4514,198.9254,2.0033,2.0033);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#C9D9E1").s().p("EgnAAAeQAAgBgBAAQAAAAAAgBQABAAAAAAQABgBABAAQDIgeEWgLQChgGFEgEQEBgGG7ABQH9ACDAgCQCagCDpADIGFAFQAPAAAogDQAkgCAVABQDfAIERABQCjABFLgCQGsgDEkAPQANABAJAFQAIADAAAHQgBAGgKAFQgJAEgNAAQiZAGjMgEIllgIQhSgCjKAGQi0AFhpgFQiQgIjSgFIlhgJIiFgGQhSgFgyAAItmgHQoNgFlZAJQlCAEiiAFQkaAHjEAdQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_104.setTransform(-2.9499,215.1951,2.0033,2.0033);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#93A8AC").s().p("EghLAJOIAAybMBCXAAAIAASbg");
	this.shape_105.setTransform(84.7742,251.537,2.0045,2.0045);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#82ACA7").s().p("AgHDPQg0ARhEACQiKAFhXhLQhRgEg/gTQh+glBfhHQBehGBJgcQAkgNASAAIAVgjQAcgpAggcQBohZByBOIAVgSQAcgTAbgGQBXgSAxB/IAcgDQAjgDAeAEQBfAMAQBFIAdABQAiACAbAHQBWAUgTAzQgZBFgUAQQgdAWhZAAQgQAdghAOQhBAchUhHQAHAygXAhQgWAggtAAQgyAAhPgog");
	this.shape_106.setTransform(-227.0343,-328.0255,2.0045,2.0045);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#63889C").s().p("A/PHNIAAtTQBfg/CIA8QBAAdAvAnQgMgMgDgRQgIgqBFgnQBFgnBNA6QAnAcAZAlQBLhOCCAcQBBAOAyAeQAyg0B4AQQA8AIAyASQBRg6CeAAQBPAAA+ALQBkhBBQAaQAoANAUAaQBRgdA7AtQAdAXAMAdQAAgOAagTQAzgkCDgVQCEgUBcAwQAuAXAUAcQAyhbCCAaQBBANA3AfQA/g0BeAVQAwAKAjAVQBeguBmAaQAzANAhAWQBkhVCbAOQBOAHA5AYQCvgKBMAtQAmAXADAZIAAMNg");
	this.shape_107.setTransform(84.2731,369.7569,2.0045,2.0045);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#63889C").s().p("A/PHNIAAtTQBfg/CIA8QBAAdAvAnQgMgMgDgRQgIgqBFgnQBFgnBNA6QAnAcAZAlQBLhOCCAcQBBAOAyAeQAyg0B4AQQA8AIAyASQBRg7CeAAQBPABA+ALQBkhBBQAaQAoANAUAaQBRgdA7AtQAdAXAMAdQAAgOAagTQAzgkCDgVQCEgUBcAwQAuAXAUAcQAyhbCCAaQBBANA3AfQA/g0BeAUQAwALAjAVQBeguBmAaQAzANAhAWQBkhVCbAOQBOAHA5AYQCvgKBMAtQAmAXADAZIAAMNg");
	this.shape_108.setTransform(84.2731,304.111,2.0045,2.0045);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#82ACA7").s().p("A/PNqIAA5OQBfh4CIBzQBAA1AvBKQgMgWgDgfQgIhPBFhKQBFhKBNBsQAnA3AZBFQBLiUCCA2QBBAbAyA5QAyhjB4AeQA8AOAyAjQBRhvCeAAQBPAAA+AWQBkh7BQAxQAoAZAUAxQBRg3A7BWQAdArAMA2QAAgbAagjQAzhFCDgnQCEgmBcBaQAuAuAUA1QAyitCCAxQBBAYA3A7QA/hjBeAoQAwAUAjAnQBehXBmAxQAzAZAhAqQBkihCbAaQBOANA5AtQCvgTBMBXQAmArADAvIAAXJg");
	this.shape_109.setTransform(84.2731,278.1297,2.0045,2.0045);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#82ACA7").s().p("A/PNqIAA5OQBfh4CIBzQBAA1AvBKQgMgWgDgfQgIhPBFhKQBFhKBNBsQAnA3AZBFQBLiUCCA2QBBAbAyA5QAyhjB4AeQA8APAyAiQBRhvCeAAQBPAAA+AWQBkh7BQAxQAoAZAUAxQBRg3A7BWQAdArAMA3QAAgbAagjQAzhGCDgnQCEgmBcBaQAuAuAUA1QAyitCCAxQBBAYA3A7QA/hjBeAoQAwAUAjAnQBehXBmAxQAzAZAhAqQBkihCbAaQBOANA5AtQCvgTBMBXQAmArADAvIAAXJg");
	this.shape_110.setTransform(84.2731,198.9538,2.0045,2.0045);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#82ACA7").s().p("AsgaNQlxiKkdj8Qkcj8idlHQihlSAAlyQAAlxChlTQCdlGEcj8QEdj8FxiKQF+iPGiAAQGjAAF+CPQFxCKEdD8QEcD8CdFGQChFTAAFxQAAFyihFSQidFHkcD8QkdD8lxCKQl+CPmjAAQmiAAl+iPg");
	this.shape_111.setTransform(83.3711,16.715,2.0045,2.0045);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#82ACA7").s().p("EgfTAh7MAAAhD1MA+nAAAMAAABD1g");
	this.shape_112.setTransform(85.0248,18.2183,2.0045,2.0045);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-511,-462.4,1021.6,924.5999999999999);


(lib.UIL7TLT78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C4A082").s().p("Ah6DRQAJgDARgwQAihgArjbQAAgRAFgPQAMgeAbgOQAbgOAbAKQAbAKALAdQALAdgLAeIgBACIg3B+Qg+CRguBsQgXgNg0gUg");
	this.shape.setTransform(-24.7961,48.4551,2.0043,2.0043);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AgqBjQAWg8gBAAQgDgBgVAoIgVAqQgKASgLgFQgMgGAKgVQAwheALghQAFgTgHgIQgDgDgOAhIgTArIgMAZQgIANgHgGQgGgGAHgdIAIgaQAvhsAfgbQAjgeA+AaQASAIgOBTQgMBKgXA/QgIAWgEAFQgEAEgHgDQgIgCALgsQALgqgCABQgEACgIAbIgOA2QgGAYgJAGQgEADgHgDQgFgCAAgIQABgOAMgoQAXhGgRAYQgGAJgcBaIgGASQgFAJgIABIgCAAQgRAAAVg5g");
	this.shape_1.setTransform(-52.1182,120.101,2.0043,2.0043);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.9,-0.1,71.80000000000001,151.5);


(lib.UIL7T8LT78LT8L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#CDE9DB").s().p("AgtAAIAQgiIBLAiIAAAjg");
	this.shape.setTransform(63.4367,-95.6675,2.0045,2.0045);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#64927D").s().p("AhqCMQAFgnAJguQAThaAUglQAUgkA1AHQAbADAXAKIAAhMIAlgGIAABzIhXDhg");
	this.shape_1.setTransform(-54.0271,87.5941,2.0045,2.0045);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#72C59B").s().p("AlyNHQhcgxAUjHQAIhLAWhPQAUhHAWgnQAgg7BJgEQAlgCAeAKQFAj1CfnYQAyiVAbiZIASh7QBNApgHAhQgEAQgUAIQg9F0i1FpQhHCNhFBhQhBBcgiAMQg4ATg3EEQgbCDgRB+QgEASgWAJQgNAFgQAAQgoAAg9ggg");
	this.shape_2.setTransform(-0.0985,-0.1223,2.0045,2.0045);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89.5,-174.8,178.9,349.4);


(lib.UIL7T8LT8L876L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B99D71").s().p("AjEIqQgoAAgcgbQgcgdAAgoIAAuTQAAgoAcgcQAcgdAoABIGJAAQAogBAcAdQAcAdAAAnIAAOTQAAAogcAdQgcAbgoAAg");
	this.shape.setTransform(-25.0479,-99.6484,2.0046,2.0046);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0C49C").s().p("Ag1gDQgLgOgFgQIgCgMICPBbQhZgFgkgsg");
	this.shape_1.setTransform(-83.2321,2.1865,2.0046,2.0046);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E0C49C").s().p("AlMCJIiDidIAAh0ICjCIIL8ABIAACIg");
	this.shape_2.setTransform(4.7709,45.6868,2.0046,2.0046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B99D71").s().p("Ak6BFIiViJIJ6AAIElCJg");
	this.shape_3.setTransform(4.7709,32.0554,2.0046,2.0046);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E0C49C").s().p("AjEIrQgoAAgcgcQgcgdAAgoIAAuTQAAgoAcgcQAcgcAoAAIGJAAQAoAAAcAcQAcAcAAAoIAAOTQAAAogcAdQgcAcgoAAg");
	this.shape_4.setTransform(-39.0803,-104.5597,2.0046,2.0046);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6F665D").s().p("AgpGJIAAsRIBTAAIAAMRg");
	this.shape_5.setTransform(70.322,136.6967,2.0046,2.0046);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6F665D").s().p("AgpGKIAAsTIBTAAIAAMTg");
	this.shape_6.setTransform(-37.3763,129.5803,2.0046,2.0046);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#6F665D").s().p("AgoGKIAAsTIBSAAIAAMTg");
	this.shape_7.setTransform(6.6752,73.1502,2.0046,2.0046);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F665D").s().p("AgpGJIAAsRIBTAAIAAMRg");
	this.shape_8.setTransform(-68.7487,83.6744,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.8,-215.7,195.6,431.29999999999995);


(lib.UIY7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#90887E").s().p("AAhGRQgLg3gXhrQgxjWhFkBQgOgSgFgXIgCgDIABAAIgCgLQgEguAggkQAhgkAzgFQAxgFAnAdQAnAeAEAuIAAABQARAyAOCUQAUDhgZDkIgWAuQgSAYgXAAQgPAAgRgLg");
	this.shape.setTransform(-26.555,93.6636,2.0039,2.0039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BEBEBE").s().p("Ai3BvQgIgIgEgLQgIgXAWgQIDTiSIgiA1QgcAzAjgDQA+gZBkhqIgBgCQALAAAIARIAAgBIAAACQANAbACAwIAAAAIhZA/QhjBEg2ARQgYAHgeACIgYABQgpAAgUgPg");
	this.shape_1.setTransform(-29.2231,207.4836,2.0039,2.0039);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#90887E").s().p("AhrBAIBBg5QAFgBAEgKQAJgWgCgxIgKgtIBqgKQAVB6AQgEIgSAMIAHAVIgZAfQgfAjgbAUQggAYgaAAQgqAAgUhDg");
	this.shape_2.setTransform(-14.751,188.3778,2.0039,2.0039);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#90887E").s().p("AgeGPQgEg4gNhtQgYjagnkHQgMgUgDgXIgBgDIABAAIgBgLQABgvAlggQAlggAyABQAyABAjAiQAjAhgBAuIABABQAKA1gDCUQgFDigzDfIgbAsQgTAUgUAAQgQAAgSgQg");
	this.shape_3.setTransform(31.6057,94.1953,2.0039,2.0039);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BEBEBE").s().p("AhtBuQg8gBgYgXQgHgJgCgLQgFgXAXgOQAggUAUgKICvhbIgpAxQghAvAjABQBBgRBvheIgBgDQALADAGAQIAAAAIABABQAJAdgDAvIgBAAIAAABIhfA1QhqA4g4AKQgUADgWAAIgMAAg");
	this.shape_4.setTransform(11.8055,207.0818,2.0039,2.0039);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#90887E").s().p("AhvAzIBIgxQAEgBAGgJQALgVAFgxIgGguIBqACQAIB7ARgBIgVAKIAEAWQgsAwgvAbQgfASgXAAQgvAAgOhKg");
	this.shape_5.setTransform(28.2325,189.2331,2.0039,2.0039);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#676868").s().p("AjYB2QhagxAAhFQAAhEBagxQBagxB+AAQB/AABaAxQBaAxAABEQAABFhaAxQhaAxh/AAQh+AAhagxg");
	this.shape_6.setTransform(7.0338,33.3106,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.9,-0.1,137.5,233);


(lib.UI79T79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#292929").s().p("AhRDFQADgJAEgQIAGgaQAXhJAFg4QAGhDgRg+QgXhVgEgiQgJhEATgyIgOADQAUgEgEgGIgDgEQAIgBAMAIQBFAvAvBJQAuBJAOBTQAIAtgCA9QAAAkgEBIQgDA/ALAlIANAkQAHAWgCAQQgtgGhuAbQh3AdgkAAQA9iGANgeg");
	this.shape.setTransform(0.0174,72.404,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,0,62.4,144.9);


(lib.UI7TG9T79T79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#695D4F").s().p("AhuGXIgYgxQgajuAWjsQAOiaASg2IAAgBQAFgwAogfQApgfA0AFQA1AGAiAlQAiAmgFAwIgBAMIAAABIgBACQgFAWgQAVQhIENgzDgQgYBwgLA6QgSAMgQAAQgYAAgTgZg");
	this.shape.setTransform(27.2877,98.1147,2.0039,2.0039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BEBEBE").s().p("ABnCDIg5gJQg4gShohHIhdhCIAAgBQACgyANgcIABgCIAAABQAIgSAMAAIgCACQAAAFA9A3QBEA9AqAQQAkAEgdg2Igkg3IDeCYQAWARgIAYQgEAMgJAJQgVAPgqAAIgagBg");
	this.shape_1.setTransform(30.1589,217.3428,2.0039,2.0039);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#695D4F").s().p("AgNBwQgdgVgfglIgaggIAHgWIgUgNQARAFAXiAIBuAKIgKAvQgCA0AJAXQAFAKAEABIBFA8QgVBGgsAAQgbAAgigZg");
	this.shape_2.setTransform(14.9695,197.3329,2.0039,2.0039);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#695D4F").s().p("AgrGeIgeguQg1jqgFjsQgDiZALg5IAAgBQgBgxAlgjQAlgjA0gBQA1gBAmAhQAnAiABAxIgBAMIABAAIgBADQgDAXgNAVQgpEUgZDlQgNBygEA6QgTAQgRAAQgVAAgTgUg");
	this.shape_3.setTransform(-33.6093,98.6931,2.0039,2.0039);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BEBEBE").s().p("AA6BwQg6gLhvg6Ihkg4IAAgBQgEgxAKgeIAAgCIAAABQAHgTALgBIgBACQAAAGBDAvQBLA1ArALQAlgBgjgyIgrgzIC3BgIA3AeQAYAPgFAZQgDAMgHAKQgaAXg+ACg");
	this.shape_4.setTransform(-12.8479,216.9562,2.0039,2.0039);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#695D4F").s().p("AgDBwQgfgRgkghIgdgdIAFgXIgWgLQATADAGiCIBvgCIgEAwQAEAzALAWQAGAKAFABIBKA0QgNBNgyAAQgYAAgggTg");
	this.shape_5.setTransform(-30.0679,198.2592,2.0039,2.0039);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4A382E").s().p("AjiB7QhfgzAAhIQAAhHBfgzQBeg0CEAAQCFAABfA0QBeAzAABHQAABIheAzQhfA0iFAAQiEAAheg0g");
	this.shape_6.setTransform(-7.4908,34.9444,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72,0,143.8,244);


(lib.UI7TT789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C0A07E").s().p("AAuBcQg8gMg3guQgcgXgYhmIAHgEICVBVQCIBZhLARIgNAAQgQAAgVgEg");
	this.shape.setTransform(-8.9033,-174.8449,2.0048,2.0048);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AgaCFQgfgMgggWIgagUQARgRgKhmIgOhkQAIgNByA2QA4AbA3AeQgHARATBuQgkA7g6AAQgaAAgdgLg");
	this.shape_1.setTransform(-6.0395,-162.0328,2.0048,2.0048);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("Ag0B1IhJg/QARgTgLhrIgPhpQAIgOB4A5QA7AcA7AfQgIASAVB0QAOA2gFAbQgJApg0AAIAAAAQgtAAhQhAg");
	this.shape_2.setTransform(-5.1322,-156.5561,2.0048,2.0048);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#444444").s().p("AAABBIBFk2IgfFaIhqCRg");
	this.shape_3.setTransform(28.7935,122.1178,2.0048,2.0048);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#535454").s().p("AilCsQgIgGhvjnIAshnIAVAEIAAB/IBZgcIAAhcIArAAIAABcIBRBNIChgxIgah4IAvAAIAJB4IAngNIAAhzIASgGIArDHQmpCQgYAAIgBAAg");
	this.shape_4.setTransform(2.7662,80.3837,2.0043,2.0043);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7B7272").s().p("AAxDGIhIguQhei0AdhlQAJgfAUgUIASgNIATgFQAXgDAVALQBBAgAHCTQAICTgaAuQgJARgLAAQgDAAgEgBg");
	this.shape_5.setTransform(-42.5775,-104.5441,2.0043,2.0043);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7B7272").s().p("Ag1BHQgEgtABhTIAAiJIBkCPQAKANACAIQAEAOgFAQQgEAJgKASIhKCDIAGAlQgUg1gGhHg");
	this.shape_6.setTransform(-45.366,-79.4363,2.0043,2.0043);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#313131").s().p("Ag9A3QhZgGhggLIhOgLQgDgPAMgkIAOgjQD0A4DJgUQBlgKA1gWQAXATAEAiQACAQgDANQhJAhimAAQhCAAhQgFg");
	this.shape_7.setTransform(-2.2138,55.0821,2.0043,2.0043);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4E6145").s().p("AAfIKQgigGglgKIgegJQA8nbhVktQgaheglhCIghgvQA9gmAzgCQAjgBBgAMQBKAFANDNQAHBmgIBlQAhCFAOD2QAHB8AABgQgjAehDAAQgbAAgggFg");
	this.shape_8.setTransform(-0.7915,-50.8629,2.0043,2.0043);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7B7272").s().p("AgxH1QhTgLhagRIhIgQQgkgbAWhTIAdhNQAmhEAFhVIgDhGIhFnuICshBQAfAcBngKQAygFAtgLQAYgFArATQAVAKAQALQAOAuA7CCQApBIgtDwQgWB5geBqQAsCAAiBEQARAiAIAJQhAAih/AAQhNAAhigMg");
	this.shape_9.setTransform(-3.5893,-48.4816,2.0043,2.0043);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#535454").s().p("AimEXIi7hdQgxgLAbkJIAkkHQAFgFAiAGQApAHAHgBQCFAcDegCQBvgBBVgHQALAXAbB2QAeCOAQCBQALBbg4BJQg4BIhbANQiBASg3AFg");
	this.shape_10.setTransform(-0.0394,122.6249,2.0043,2.0043);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6E6263").s().p("AhLC2QgaguAIiTQAHiTBCggQAUgLAXADQALABAIAEIASANQAUAUAJAfQAdBlheC0IhIAuIgGABQgLAAgKgRg");
	this.shape_11.setTransform(24.7593,-107.0672,2.0043,2.0043);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.2,-194.2,154.4,388.29999999999995);


(lib.UI7TT7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#292929").s().p("AheBAQAOgjARgUIAfgnQAQgXACgVIAAAIQAHgFAKgNQAMgNAGgFQAQgOAWgFQAWgFAVAHIAHAUQADAKgEAJQgPAggHAKQgUAdgWAtQgYAzgFAdQgBgWgEgmIgIg7QgTATgkAsQgjAsgVAUQgBgXAQglg");
	this.shape.setTransform(0.002,24.8913,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.1,0,44.2,49.8);


(lib.UI7T7T9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#D43539").s().p("AgNCmIABgMIhQAwQgVAHgTgYQgmgxAJidQAIieBRgiQApgRAmAOQBmAqAlB8QATA+gCA7QgFAnhVA9IhUA1QgDglABgVg");
	this.shape.setTransform(1.7206,44.6928,2.0044,2.0044);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("Ah8DzIgFgxQAAhBBDizQA9inAVgZQAVgXAhAMQAnAPAQBAQAOA8hoCsQgzBWg7BPQgYAjgOAAQgKAAgFgPg");
	this.shape_1.setTransform(9.1005,202.8407,2.0044,2.0044);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CDA688").s().p("AAFFUQgZgOgYgeQgUgYgNkHIgJkBQAaAHA1g1QAZgaAWgbIAvJeQABAOgIAbQgKAlgRAIQgIADgJAAQgOAAgRgIg");
	this.shape_2.setTransform(16.5003,113.6278,2.0044,2.0044);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CDA688").s().p("AgjB8QAThLgCAAQgDAAgTAyIgVA2QgIAYgOgFQgNgFAJgbQAuh2AIgrQAFgXgIgHQgEgEgNApIgRA2IgMAgQgHARgIgGQgIgGAGgjIAGghQAsiHAgglQAjgqBHAVQAUAFgJBmQgHBagUBOQgHAbgFAHQgEAFgIgCQgJgBAJg2QAJg0gCABQgEADgHAiIgLBDQgFAdgJAIQgFAEgIgCQgGgBgBgKQAAgQALgyQAThTgPAcQgHALgXBvIgFAXQgFALgJADIgDAAQgQAAAShEg");
	this.shape_3.setTransform(-14.9501,270.3788,2.0044,2.0044);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,-0.1,70.8,309.1);


(lib.UI7T98789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#897E7D").s().p("AhwGlQgYgVgEgiIgBgPIgBAAIAEgUQAbiBASh5QAfjMgChiIAAgJIgFgZQgIhGAYg2QAYg2AqgFQAsgFAlAuQAlAuAIBGIADAZIABABIgBAFQABA8gYAqQhWGUgaBkIgBAAQABAggRAYQgSAYgdADIgJABQgZAAgVgTg");
	this.shape.setTransform(-0.0286,88.1895,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.6,0,57.2,176.4);


(lib.UI77997 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#EBBF9A").s().p("AgbDyQAHgGgBgzQgDhlgnjdQgGgOAAgRQAAggAUgXQAVgXAcAAQAdAAAVAXQAUAXAAAgIAAADIgFCIQgHCcgDB4QgbgFg3AAg");
	this.shape.setTransform(-2.9953,49.3089,2.0043,2.0043);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgEBtQgBhAgCAAQgCABgGAsIgFAvQgBAVgNgBQgNgCABgXQALhogDgjQgBgUgJgEQgEgDgBAjIgCAwIgDAcQgCAPgJgEQgIgDgEgdIgCgcQAEh1AUgkQAWgoBDACQAUAAARBTQAQBLABBBQABAYgDAGQgCAFgIAAQgIABgFgtQgFgsgCACQgEAEAKBTQADAZgGAIQgDAEgIAAQgGAAgDgHQgEgNgCgqQgEhIgHAaQgCAHACAtIADA1IABATQgBAKgIAEIgEABQgMAAgBg3g");
	this.shape_1.setTransform(-0.1809,126.2682,2.0043,2.0043);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-0.1,33.8,159.29999999999998);


(lib.UI78LT78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#897E7D").s().p("AhTgZQgKhagFgyIAAgDQgEgiASgbQASgaAfgEQAegEAYAWQAYAVAEAiQACAQgEASQgMDtAgBlQARAyASADIheANIgzAJQgViLgRiTg");
	this.shape.setTransform(20.0257,52.1215,2.0044,2.0044);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AADCsQgHgDgDgKIgCgVQgHhngDgHQgKgYAFBJQADAtgDAOQgCAIgGABQgIABgEgEQgHgIgBgaQAAhYgFgFQgCgBABAuQAAAwgJABQgIAAgCgFQgEgGgCgZQgIhGAHhQQAHhZAUgDQBGgLAcAoQAZAjAVB7IABAeQAAAegIAFQgJAFgEgQIgHgdIgIgxQgGglgEADQgJAFABAVQACAmAaBsQAEAYgNADQgOADgEgVIgMgxQgLgugCAAQgCAAAHBDQAGA8gOAAIgEgBg");
	this.shape_1.setTransform(27.3109,133.7287,2.0044,2.0044);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,45,168.5);


(lib.UY78979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#D4AD91").s().p("AgkgKQBGgtBWgrIAIAFQgaBpgdAXQg5Awg/ANIg0ADQhOgSCNhbg");
	this.shape.setTransform(4.4565,-164.3457,2.0049,2.0049);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0A988").s().p("Ah/CHQgVhmAPgfQAahwgIgSIB6g8QB8g5AJANIgPBqQgMBtASARQgyA7g2A7QhpB2gNAAIAAAAQgQAAgUhlg");
	this.shape_1.setTransform(3.1346,-141.0201,2.0044,2.0044);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDACAC").s().p("AkNgKIAEgNQCLArCzgLQBvgIBpgYIAAANQiMAiiTAAQiLAAhwgig");
	this.shape_2.setTransform(1.9157,44.7941,2.0044,2.0044);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EDACAC").s().p("AkDgLIAEgNQBbAkCTAAQBfAABngNQA8gJAPgMIAEAOQgUALg5AIQhkAOhgAAQiYAAhegkg");
	this.shape_3.setTransform(2.517,36.1252,2.0044,2.0044);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EDACAC").s().p("Ah4CXIgBgCQgTglgUhZQgRhIgFgtQgEgmANgYIAJgDIAFAEIgGAPQgGAUADAYQAEApAQBHQAUBWASAmIALAEQB7iIAsgsIAhgfQAcgcALgNQARgTAOgYIANAFQgPAagSAUQgLANgeAdIggAfQgiAhhGBPIhCBIIgDADg");
	this.shape_4.setTransform(4.2739,-107.8393,2.0044,2.0044);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C73B39").s().p("AkPgPIAEgPQBvAjCLAAQCUAACMgjQABAOgCATQhbAShyAHQgrADgmAAQimAAhZgug");
	this.shape_5.setTransform(1.5274,48.7112,2.0044,2.0044);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C73B39").s().p("AkKgBIAJgfQBeAkCXAAQBgAABlgNQA5gIAUgMIAFAcQhoAZhvAHQglACgiAAQiJAAhugig");
	this.shape_6.setTransform(2.1663,40.3706,2.0044,2.0044);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C73B39").s().p("AgDG7QiTAAhcglIAbhhQglhpgdh4Qg5jvArhLQBAiGAPgwIAUgLQAYgNAVgHQgMAYAEAmQAFAtAQBJQAVBZATAlIABACIAZAJIADgDIBBhIQBHhPAhghIAgggQAegdALgNQATgUAOgaIA8ASIABgDIAHAGIAGACIAAAEQAdAiADAqQAFBhgHBaQgLCiguBLIgCAjIgIAYQgKAdgEAfQgPBhAoBHIAFAHQAGAJAEAMQgOAMg8AIQhkAPhcAAIgGgBg");
	this.shape_7.setTransform(-0.2707,-50.4122,2.0044,2.0044);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C73B39").s().p("AhuCXQgSgmgUhXQgRhHgDgoQgEgYAHgUIAGgPIgFgEQAXgGANADIBsAQQBwAKAhgdIAtAOQgOAYgQATQgLANgcAbIghAgQgtArh6CJg");
	this.shape_8.setTransform(4.321,-109.9941,2.0044,2.0044);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C73B39").s().p("AAkCjIhPiHQgXgkAHgXQACgHALgPIBriVIAACPQABBVgFAvQgGBKgWA4g");
	this.shape_9.setTransform(46.2218,-67.1003,2.0044,2.0044);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C73B39").s().p("Ah5HWQhogHhFhOQhFhPAHhpQAFhKAwiVQAyiaAHg+QAMhxAqg2QAyhCBhAIQCLALBegWQAKABgSA1QgTA5ACADQAOAQAfAKQAjALAOAMQA4AvAHDUIAFAOIAgDtQAHBqhHBOQhHBOhpAGIi5AIQgWgDgfgCg");
	this.shape_10.setTransform(-0.0344,92.8769,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.7,-188.2,143.4,376.29999999999995);


(lib.UY79799 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#292929").s().p("AkdBwQBMm4D8AGQB/ADB0BfImmIjg");
	this.shape.setTransform(-8.2732,-33.5485,2.0044,2.0044);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#292929").s().p("Ag+GuQgOgEgHgFQgFgFgJgRIgbg8QgMgbgGgRQgIgZACgWQACgoAogvIAcgfQAQgSAKgOQBJghAhhFIALk+QAMgWAEgNQAGgUgIgPIgMgPIACgkQBQBeAAC6QAAA5gIAuQgWB1gFAiQgOBXgBBCQAAAPgFBRQgDA4AEAoQgiAIgiAAQgtAAgsgOg");
	this.shape_1.setTransform(35.3485,8.9984,2.0044,2.0044);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.6,-98.2,130.89999999999998,196.2);


(lib.OULY89Y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#A94242").s().p("Ah8C7IARh1QgGg9AShAQAkiBB2gQIAPAIQASAMAMASQAnA8ghBqIgFAtQgFA3gBA1QgkASguANQgsANgkAAQgkAAgZgOg");
	this.shape.setTransform(-0.0558,40.2049,2.0048,2.0048);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AhGGaQgagJgLgaQgLgaAIgdIgBAAQgBhhAMmGQgMgrAPg3IAAgFIABgBIAHgWQAZg+AsgiQAsgiAnAOQAmAPALA3QAKA3gYA+IgJAWIgDAIQgZBZgRDBQgKBzgGB9IAAATIgBAAIgEANQgMAegbAOQgQAIgQAAQgLAAgLgEg");
	this.shape_1.setTransform(1.263,87.3879,2.0048,2.0048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.2,0,50.3,170.5);


(lib.OUY89Y789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#292929").s().p("AguEsQhHgOhPgqIhAgnIFdn/IAlAHQArAMAfAfQBjBlg8D5QgzDVirAAQgdAAgigHg");
	this.shape.setTransform(0.0035,-0.0142,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.4,-61.5,104.8,123);


(lib.OU89978978 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#686439").s().p("AAfG3QgegGgQgaQgRgZADgfIAAAAQgQhShBmsQgVgtAGg7IgBgFIACAAIAEgZQAOhFArgrQAqgqAsAJQAtAJAVA4QAWA3gPBGQgCAMgEAMIgBAJQgLBgASDOQAKB1ASCHQACAFAAAFIABAKIgBAAIgCAPQgHAhgbATQgVAPgWAAQgIAAgIgCg");
	this.shape.setTransform(25.3581,88.2202,2.0044,2.0044);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#686439").s().p("AhdgVIgfiJIAAgDQgIghAQgcQARgcAfgHQAfgGAcATQAbAUAIAhQAFAQgDARQANDtAtBhQAWAxAUABQgmAHg8AOIg0ANQgkiGgjiTg");
	this.shape_1.setTransform(45.9597,198.1357,2.004,2.004);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#775A45").s().p("ABCCUIgLgSIgcgyQgYgpgEgGQgWgWAlBGQAWAnADAOQACAJgFADQgHAEgGgDQgLgEgLgYIgZg2QgOgcgFgBQgCgBAUAqQAVAtgIAEQgIADgFgDQgGgFgNgVQglg+gchLQgfhWASgKQA/gmAtAaQAnAXBIBpIAOAaQANAcgGAIQgGAIgLgNIgTgYIgdgqQgWgggDAEQgFAJAJATQASAhBHBaQAPAVgMAIQgMAIgNgSIgggpQgegmgDABQgCABAkA7QAjA6gVABIgBAAQgJAAgGgJg");
	this.shape_2.setTransform(68.0118,271.3807,2.004,2.004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,0,94.1,302.8);


(lib.OY8998779 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B99D71").s().p("AjEIrQgoAAgcgcQgcgdAAgoIAAuTQAAgoAcgcQAdgcAnAAIGJAAQAoAAAcAcQAcAcAAAoIAAOTQAAAogcAdQgcAcgoAAg");
	this.shape.setTransform(-25.0751,-99.6509,2.0046,2.0046);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0C49C").s().p("Ag1gDQgLgOgFgQIgCgMICPBcQhZgGgkgsg");
	this.shape_1.setTransform(-83.2092,2.1839,2.0046,2.0046);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E0C49C").s().p("AlLCJIiEidIAAh0ICjCIIL8ABIAACIg");
	this.shape_2.setTransform(4.7437,45.6843,2.0046,2.0046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B99D71").s().p("Ak6BFIiViJIJ6AAIElCJg");
	this.shape_3.setTransform(4.7437,32.0528,2.0046,2.0046);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E0C49C").s().p("AjEIrQgnAAgdgdQgcgcAAgoIAAuTQAAgoAcgcQAdgdAnAAIGJAAQAoAAAcAdQAcAcAAAoIAAOTQAAAogcAcQgcAdgoAAg");
	this.shape_4.setTransform(-39.1075,-104.5121,2.0046,2.0046);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6F665D").s().p("AgpGJIAAsRIBSAAIAAMRg");
	this.shape_5.setTransform(70.3951,136.6942,2.0046,2.0046);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6F665D").s().p("AgoGKIAAsTIBRAAIAAMTg");
	this.shape_6.setTransform(-37.3534,129.5778,2.0046,2.0046);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#6F665D").s().p("AgpGKIAAsTIBTAAIAAMTg");
	this.shape_7.setTransform(6.6982,73.1476,2.0046,2.0046);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F665D").s().p("AgpGJIAAsRIBSAAIAAMRg");
	this.shape_8.setTransform(-68.7258,83.6719,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.9,-215.7,195.7,431.29999999999995);


(lib.IULT78LTL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#BCB453").s().p("Ah1G8QgbgWgEgkIgBgQIgBAAIAFgVQAbiKAUh+QAijXgEhnIAAgKIgEgaQgKhLAag4QAag5AtgGQAugFAmAwQAnAxAJBKIACAbIACAAIgBAGQABA/gZAtQheG0gZBgIAAAAQAAAhgRAZQgUAageADIgJABQgbAAgVgUg");
	this.shape.setTransform(-46.2806,92.9154,2.0045,2.0045);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BCB453").s().p("AhXAeQhVg7gjgbIgCgCQgegUgIgiQgIghATgbQASgaAigEQAigEAeAVQAOAJALAQQCxCxBlAuQAzAXAQgNQgkAzgyBPQh8hSh/hbg");
	this.shape_1.setTransform(-24.0747,195.7916,2.0043,2.0043);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#775A45").s().p("AA1B0QhEg+gHABQgDAAAkAgQAmAjgGAHQgFAGgGgBQgIgCgUgPQg8gtg6g9QhBhEAMgSQApg/AzAGQAuAFBuBHIAZAUQAXAWgCAKQgCAJgPgHIgcgPIgtgdQghgWgBAGQgBAKARAOQAfAaBnA4QAWAOgHAMQgHANgUgMIgvgaQgrgXgCACQgCABA6AqQA5ApgTAKQgIAFgKgGIgRgNQhVhCgJgEQgcgKA/AxQAlAdAJANQAFAHgEAFQgEAHgHAAQgLAAgVgSg");
	this.shape_2.setTransform(42.1818,244.6585,2.0043,2.0043);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.4,-0.1,152.7,271.70000000000005);


(lib.IOY89Y89Y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#CDA688").s().p("AhSB3IgfgHQgCh8gQhCQgGgYAugNQAtgMA3AIQA/AJAhAeQAnAjgQA3QgeBmhsAKIgYABQgXAAgZgEg");
	this.shape.setTransform(-2.6392,-167.6864,2.0049,2.0049);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKALQgEgEAAgHQAAgFAEgFQAFgEAFAAQAHAAAEAEQAEAFAAAFQAAAHgEAEQgEAEgHAAQgFAAgFgEgAACAEQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABgAgGAEQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAACgDQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAgAgGgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABgBAAQAAABAAAAg");
	this.shape_1.setTransform(-26.4644,-58.4245,2.0049,2.0049);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKALQgEgFAAgGQAAgGAEgEQAFgEAFAAQAGAAAFAEQAEAEAAAGQAAAGgEAFQgFAEgGAAQgFAAgFgEgAABAEQAAAAAAABQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAgGAEQAAAAAAABQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAABgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAgGgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABg");
	this.shape_2.setTransform(-26.0634,-69.4512,2.0049,2.0049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgKALQgEgEAAgHQAAgFAEgEQAFgFAFAAQAHAAAEAFQAEAEAAAFQAAAHgEAEQgEAEgHAAQgFAAgFgEgAACAEQAAABAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAAAABgAgFAEQAAABAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAAAABgAACgDQAAABAAAAQAAABAAAAQABAAAAAAQABABAAAAQABAAAAgBQABAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAgBABQAAAAgBAAQAAAAAAABQAAAAAAABgAgFgDQAAABAAAAQAAABAAAAQABAAAAAAQABABAAAAQABAAAAgBQABAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAgBABQAAAAgBAAQAAAAAAABQAAAAAAABg");
	this.shape_3.setTransform(-24.8605,-80.528,2.0049,2.0049);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D43539").s().p("AgLCgIABgNIhMAvQgTAHgSgXQgjgvAIiXQAIiXBMghQAmgRAjAOQBfAoAjB3QASA8gCA4QgFAlhQA7IhOAyQgCgjABgTg");
	this.shape_4.setTransform(51.1468,-72.065,2.0049,2.0049);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B73538").s().p("AAkCqIhQiNQgWgmAGgXQACgHALgRIBtiaIAACUQABBbgEAvQgHBOgWA5g");
	this.shape_5.setTransform(38.5027,-43.7891,2.0049,2.0049);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CDA688").s().p("Ah4B9QgShSAHgcQAfhdgHgSIBzg7QB1g4AJANIgOBfQgJBiARARIjlC9QgKgjgJgpg");
	this.shape_6.setTransform(-3.8096,-125.7824,2.0049,2.0049);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D43539").s().p("Aj5HNQgKAAgEgWQgHgtAdhuQgchugTh9Qgmj5ArhOQBAiMAQgyIApgWQAugWAaAGIBrAQQByALAjgeICFArIgMIyIgSBLQgOBeASBeIAOAbQAQAoAEA6QhfASh1AGQgnACgkAAQixAAhcgxg");
	this.shape_7.setTransform(-11.9369,-21.0326,2.0049,2.0049);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F6F6F").s().p("AgaA0IAghrIAVAJIgeBmg");
	this.shape_8.setTransform(-55.2842,77.7551,2.0049,2.0049);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6F6F6F").s().p("AgRA3IAOhuIAVAGIgNBpg");
	this.shape_9.setTransform(-38.8945,81.7648,2.0049,2.0049);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#6F6F6F").s().p("AgPg3IAXACIAIBqIgXADg");
	this.shape_10.setTransform(13.4823,85.3735,2.0049,2.0049);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6F6F6F").s().p("AgZg0IAXgCIAcBnIgWAGg");
	this.shape_11.setTransform(36.4879,83.6193,2.0049,2.0049);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#525252").s().p("AgqgLIAPiKIBGErg");
	this.shape_12.setTransform(-36.3045,132.3046,2.0045,2.0045);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6F6F6F").s().p("AADEOQhxgjiJhDIhxg9QgRg4AChOQADicBghtIAHgMQBBAcDhgEQBxgCBkgHIA2BfIAMAWQAeAjAUA+QAeBagEB2QgFCsivAAQhPAAhygjg");
	this.shape_13.setTransform(-6.4219,131.0193,2.0045,2.0045);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.9,-192.3,163.7,384.6);


(lib.IOY89Y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B99D71").s().p("AjEIrQgnAAgdgdQgcgcAAgoIAAuTQAAgnAcgdQAdgdAnAAIGJAAQAoAAAcAdQAcAdAAAnIAAOTQAAAogcAcQgcAdgoAAg");
	this.shape.setTransform(24.8873,-99.6481,2.0046,2.0046);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0C49C").s().p("ABIguQAAAVgSAWQgkArhaAHg");
	this.shape_1.setTransform(83.0715,2.1868,2.0046,2.0046);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E0C49C").s().p("AnPCJIAAiIIL7gBICkiIIAAB0IiDCdg");
	this.shape_2.setTransform(-4.9315,45.6871,2.0046,2.0046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B99D71").s().p("AnPBFIEmiJIJ5AAIiVCJg");
	this.shape_3.setTransform(-4.9315,32.0557,2.0046,2.0046);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E0C49C").s().p("AjEIqQgnAAgdgcQgcgcAAgoIAAuTQAAgoAcgcQAdgcAngBIGJAAQAoABAcAcQAcAcAAAoIAAOTQAAAogcAcQgcAcgoAAg");
	this.shape_4.setTransform(38.9197,-104.5594,2.0046,2.0046);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6F665D").s().p("AgoGKIAAsTIBSAAIAAMTg");
	this.shape_5.setTransform(-70.4827,136.697,2.0046,2.0046);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6F665D").s().p("AgpGKIAAsTIBTAAIAAMTg");
	this.shape_6.setTransform(37.2157,129.5305,2.0046,2.0046);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#6F665D").s().p("AgpGJIAAsSIBTAAIAAMSg");
	this.shape_7.setTransform(-6.8359,73.1505,2.0046,2.0046);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F665D").s().p("AgpGKIAAsTIBSAAIAAMTg");
	this.shape_8.setTransform(68.538,83.6747,2.0046,2.0046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.9,-215.7,195.60000000000002,431.29999999999995);


(lib.IO8Y9Y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#6E6263").s().p("AAKGvQgcgPgMghIgEgOIgBAAIAAgUQgDiBgJh9QgPjOgYheIgDgJIgJgXQgYhDAMg6QALg6ApgPQApgPAuAlQAuAlAYBDIAHAYIACAAIAAAFQAOA6gNAvQAGGhgEBjIgBAAQAJAfgNAbQgMAcgbAJQgMAEgLAAQgRAAgRgJg");
	this.shape.setTransform(23.0481,88.1479,2.0043,2.0043);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6E6263").s().p("AhcgNIguiGIAAgCQgMggAMgfQAMgeAdgKQAcgKAdAPQAdAQALAgQAGARgBAQQApDqA2BbQAbAuASgCQgiAMg3AWIgwAUQgyiCgyiMg");
	this.shape_1.setTransform(44.8908,196.5456,2.0042,2.0042);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B49675").s().p("AAsCmQgJgBgFgKIgGgTQgbhggHgJQgQgXAWBIQAMArAAAOQABAJgGACQgHACgFgDQgJgGgGgZQgThWgHgEQgCgBALAtQALAvgIADQgIACgEgEQgEgGgIgXQgXhDgMhPQgMhZASgHQBDgbAjAhQAhAdAvB0IAIAbQAHAegHAHQgHAHgIgPQgJgTgEgIIgTguQgOgjgEAEQgHAHAGAVQAKAkAxBkQAKAXgNAGQgMAGgJgUIgWguQgVgqgDAAQgCABAWBAQAVA8gRAAIgCAAg");
	this.shape_2.setTransform(68.4619,273.2677,2.0042,2.0042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,89.1,306.6);


(lib.ILT78LT78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B73538").s().p("AguCgQhMhYgVglQgGgLACgdQACgjANglQAmhpBlgzIAUgFQAYgDAVALQBDAhAICXQAICXgbAvQgNAXgOgHIhMgvIABAmQABAtgDAkQgggkgmgsg");
	this.shape.setTransform(1.3507,48.039,2.0049,2.0049);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B53538").s().p("AgsC1QhagrgMglQgMg4AFg/QAMh+BVg6IAVgJQAbgIAYAGQBRATAlCWQAkCVgZA2QgNAagUgDIhTghIAEAMQAEAUAEAkQgpgPgsgVg");
	this.shape_1.setTransform(0.0182,45.9222,2.0048,2.0048);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AF8D75").s().p("Ag5FAQgWgSgQghQgOgbAlj9IAnj5QAWALA5gpQAdgVAZgWIhFJNQgBANgNAaQgQAhgQAFIgJABQgQAAgRgOg");
	this.shape_2.setTransform(-7.7956,112.8976,2.0048,2.0048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.1,0,62.3,179.9);


(lib.IL7L78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#D94E4D").s().p("AhDDVIgbhzQgbg3gHhCQgNiFBqg5IARACQAUAEASANQA5AqAIBwIAMArQAPA2ASAxQgbAegmAcQhEAyg0AAIgMgBg");
	this.shape.setTransform(26.0946,42.9369,2.0048,2.0048);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AA1GCQgUgUgDgdIAAAAQgihYiDlyQgagmgHg4IgBgEIABgBIgBgYQgBhDAegvQAdgwAqAAQAqAAAcAwQAdAvAABDIgBAYIABAJQAIBbA3C8QAhBzAmBxIAHASIgBAAIABAPQAAAfgVAYQgVAXgcgBQgcABgUgVg");
	this.shape_1.setTransform(36.6624,85.7212,2.0048,2.0048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70.9,167.2);


(lib.IL7T8L78TL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#AF8D75").s().p("AiZDZIAEgwQAMg/BeigQBWiVAYgUQAYgTAcASQAhAVACBBQACA7h+CTQg/BKhEBBQgaAbgOAAQgKAAgCgRg");
	this.shape.setTransform(-30.9358,46.8988,2.0048,2.0048);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("AhnCkQgTgCAqg8QAsg+gCgBQgCgBgjAnIglArQgQASgJgJQgKgJARgVQBShdAXgjQAMgTgEgKQgDgEgZAgIgjAsIgVAZQgNANgEgIQgFgJARgdIASgbQBVhtApgXQAugaA2ArQAPAMgrBZQgnBPgtBAQgQAXgGAEQgEAEgHgEQgHgFAaguQAagsgCAAQgFACgSAcIggA5QgPAZgLAEQgGACgGgEQgFgEAEgIQAFgPAbgpQAuhHgXAVQgGAFgdAsIgjA0IgNATQgGAIgJAAIgCAAg");
	this.shape_1.setTransform(-69.2559,104.8255,2.0048,2.0048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.7,0,97.7,137.7);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgEgSIAKAAIAAAlQgLgGABgfg");
	this.shape.setTransform(0.5462,1.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,1.1,3.8), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgEgSIAJAAIAAAlQgKgGABgfg");
	this.shape.setTransform(0.521,1.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1.1,3.8), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAAQAAgBACgDQABAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQAHgBAAAHQAAACgCADQAAAAgBABQAAAAgBAAQAAAAgBABQgBAAAAAAIgBAAQgFAAgBgHg");
	this.shape.setTransform(6.48,4.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgNAQQgHgGAAgJQgBgIAGgGQAGgHAJAAQAIgBAGAGQAGAGABAJQABAIgHAGQgGAHgIAAIgBAAQgHAAgGgFg");
	this.shape_1.setTransform(5.0547,2.8797);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#42523B").s().p("AgSAVQgIgHgBgMQgBgMAIgIQAIgJAMgBQALgBAIAJQAJAIAAAMQABALgIAJQgIAIgMABIgBAAQgKAAgIgIg");
	this.shape_2.setTransform(5,2.9001);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.2,0,5.7,5.6), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAAQABgFAEAAQAGAAAAAFQAAAGgGAAQgFAAAAgGg");
	this.shape.setTransform(4.2,3.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AAAATQgIgBgFgFQgFgGABgHQAAgIAFgFQAGgFAHAAQAIABAEAFQAGAGAAAHQgBAIgFAFQgGAFgHAAIAAAAg");
	this.shape_1.setTransform(5.5,2.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#42523B").s().p("AAAAZQgLAAgGgIQgIgIABgJQABgLAIgHQAHgHAJABQAKAAAIAIQAGAIAAAJQAAAKgJAIQgGAGgKAAIAAAAg");
	this.shape_2.setTransform(5.5,2.525);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(3,0,5,4.9), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAAHQgGAAAAgHQAAAAABgBQAAAAAAgBQAAAAABgBQAAgBAAAAQADgCABAAQABAAABABQAAAAABAAQAAAAABABQAAAAABABQACACgBABQAAABAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAAAABQgBAAAAAAQgBAAAAABQgBAAAAAAIgBAAg");
	this.shape.setTransform(-2.9738,2.222,2.039,2.039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AAAAVQgJgBgFgGQgGgHAAgHQABgJAGgFQAHgGAHAAQAJABAFAGQAGAGgBAIQAAAIgGAGQgGAGgIAAIAAAAg");
	this.shape_1.setTransform(-0.027,-0.1738,2.039,2.039);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#463A2E").s().p("AAAAcQgMgBgHgIQgIgJAAgKQABgMAIgIQAJgIAKABQAMABAHAIQAIAJgBAKQAAAMgJAIQgHAHgKAAIgBAAg");
	this.shape_2.setTransform(-0.019,-0.0126,2.039,2.039);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.6,-5.7,11.2,11.4);


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

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgWAPg");
	this.shape_2.setTransform(-1.9153,-0.1247,0.6215,0.6215,20.2067);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E98E8E").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
	this.shape_3.setTransform(-1.7122,-1.5494,0.6215,0.6215,20.2067);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CE7E7D").s().p("AgvAxQgKgOALgNIAKgGQAMgHAHgDQARgGAUgTQAUgVALgOQAIAigYAbQgXAcgaANQgNAHgJAAQgIAAgDgGg");
	this.shape_4.setTransform(2.7,-2.6,0.6215,0.6215,8.2712,0,0,4.8,-5.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAHQgKgJARgGQARgFAOANQgTAKgJAAQgGAAgEgDg");
	this.shape_5.setTransform(-2.4362,0.5784,0.8727,0.8727,20.2084);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CE7E7D").s().p("AgKAXQghgGAMgaQAKgVAcAMQAPAFANAKQgLAagZAAIgJAAg");
	this.shape_6.setTransform(-2.6464,0.4849,0.8727,0.8727,20.2084);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},4).to({state:[]},1).wait(12));

	// Layer_2
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_7.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_8.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_9.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7}]},10).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[]},1).wait(13));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E98E8E").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_10.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E98E8E").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_11.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E98E8E").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_12.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},10).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[]},1).wait(13));

	// Layer_4
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CE7E7D").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_13.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CE7E7D").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_14.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CE7E7D").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_15.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},10).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(13));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_16.setTransform(0.65,1.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_17.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},11).to({state:[{t:this.shape_17}]},1).to({state:[]},1).wait(13));

	// Layer_6
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_18.setTransform(0.55,1.0856);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_19.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_18}]},11).to({state:[{t:this.shape_19}]},1).to({state:[]},1).wait(13));

	// Layer_7
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_20.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_21.setTransform(0.2313,-0.2179);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_22.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},10).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-4.7,11.4,10.3);


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
	this.shape_20.graphics.f("#92706E").s().p("AgFBWQgugFgUgpQgTgqATgkQASggAigOQARgFARAFQArASAQAsQASAugZAjQgVAdgjAAIgQgCgAgegGQgGAgAbALQAaAMAOgeQAMgcgTgPQgVgNgNgBIgBAAQgOAAgFAgg");
	this.shape_20.setTransform(1.1103,0.5369);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#AF3838").s().p("AgLAkQgagLAFggQAGghAPABQANABAUANQAUAPgNAcQgKAWgRAAQgFAAgIgEg");
	this.shape_21.setTransform(1.2969,0.6061);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},2).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[]},1).wait(6));

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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#604A3E").s().p("AAAAcQg3gMgQguQACAFAfAJQANAFAPgCIAbgEIAZgEQAOgBALAEQAEABAAACQABACgBAEQgKAognAAQgKAAgMgDg");
	this.shape.setTransform(0,-2.494);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AAZA0QghgOgSgQQgmgfACguIAUAYQAYAZAYABQAoACACAFQAVAPgIAXQgGAQgOAAQgHAAgJgEg");
	this.shape_1.setTransform(-0.8304,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAEIgbgSQAPAGAogFIAmgGIAAAnIgJAAQgeAAgbgQg");
	this.shape_2.setTransform(-1.0439,-0.354,1,1,10.4691);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#523F31").s().p("AALAfQg8gBgZgrQACADAQADIATACQAOABAPgEIAagLQAggNATACQADAAACACQABACAAAFQgCA0g7AAIgDAAg");
	this.shape_3.setTransform(-0.389,-2.9352,1,1,10.4691);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#916E50").s().p("AAmAtQgmgIgUgMQgsgZgJguIAaAVQAeAUAYgEQApgGAEAGQAZAJgEAaQgDAVgUAAIgMgCg");
	this.shape_4.setTransform(-1.0966,0.2233,1,1,10.4691);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgLAMQgfgLgJgQQAZAHAogFIAmgGIAAAmIgQABQgZAAgWgIg");
	this.shape_5.setTransform(-1.4615,-0.436,1,1,10.4691);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#523F31").s().p("AACAdQgggBgRgIQgSgJgJgWQACAEAQACIATACQAOACAPgFIAagKQAggNATACQADAAACACQABABAAAFQgCAwhEAAIgDAAg");
	this.shape_6.setTransform(-0.3434,-3.182,1,1,10.4691);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#916E50").s().p("AgeAdQgfgWgJg4QALARAWAYQAXAYAYAEQAYADAMgFQAMgEAEABQAFACACADQADAEgBAHQgCAMgHADQgIADgbABIgDAAQgYAAgegVg");
	this.shape_7.setTransform(-7.45,-5.45,1,1,13.6802,0,0,-7,-4.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#916E50").s().p("AgfAeQgfgWgJg5QALARAXAaQAXAaAaAEQAcAFAJgHQAKgGAFADQAFADACADQABAEgCAGQgCAGgGADQgGACgcADIgHABQgYAAgcgUg");
	this.shape_8.setTransform(-7.55,-5.55,1,1,17.3715,0,0,-7.2,-4.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgKAMQgegLgNgSQAdAJAogFIAmgGIAAAmIgQABQgZAAgXgIg");
	this.shape_9.setTransform(-1.6336,-0.4678,1,1,10.4691);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#523F31").s().p("AAEAdQghgBgRgIQgRgJgMgNQAFgFAPACIATACQAOACAPgFIAbgKQAggNASACQADAAADACQABABAAAFQgCAwhFAAIgCAAg");
	this.shape_10.setTransform(-0.5155,-3.2138,1,1,10.4691);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#916E50").s().p("AgdAdQgjgYgIg0QAHAEAOAOQAOAPAMAQQANAQAaAFQAbAFAKgHQAJgGAGADQAFADACADQABAEgCAGQgCAGgGACQgGADgcADIgHAAQgYAAgcgTg");
	this.shape_11.setTransform(-7.7,-4.8,1,1,17.3715,0,0,-7,-4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},17).to({state:[]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},2).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	// Layer_4
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AACALIgLgEIgHgBIgJgDQgEgBgBgDIgBgCIABgEIABgBQABgCADgBQAfAJAZgBQgCADACACQACADgCADQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBIgCADIgCABIgEABIgNgBg");
	this.shape_12.setTransform(-1.0177,4.3728,1,1,10.4691);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AANAPQgJgBgEgCIgLgGIgHgCQgEgCgDgCQgEgCAAgEIAAgCIAAgEIABgBQACgBAEgBQAcAPAZADQgCACABADQACAEgEACQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBIgCACIgDACg");
	this.shape_13.setTransform(-1.1,4.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},23).to({state:[{t:this.shape_13}]},1).wait(1));

	// Layer_3
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#BB6F6F").s().p("AgXAEQgFgFADgIQAOgGAQAGQAQAFAGAEQACALgMACIgIAAQgRAAgPgJgAAAABIANADIAAgBIgGgHg");
	this.shape_14.setTransform(-1.225,3.537,1,1,10.4691);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BB6F6F").s().p("AgXACQgGgGABgGQAUgDAQAFQARAFAEAHQAAAGgMABIgHABQgRAAgQgKg");
	this.shape_15.setTransform(-1.3208,3.6327,1,1,10.4691);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BB6F6F").s().p("AARAPQgVgBgQgOIgGgHQgEgEACgDQAYAAAQAJQAPAGADAJQgBAFgKAAIgCAAg");
	this.shape_16.setTransform(-1.6205,4.0771);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},22).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).wait(1));

	// Layer_2
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#AF3838").s().p("AggAOIgWgvIBsAHQgVAcARAdQgMADgLAAQgdAAgegUg");
	this.shape_17.setTransform(-2.2441,-0.2417,1,1,10.4691);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#AF3838").s().p("AggAJIgWgvIBsAHQgRAuASAYQgwgDgngbg");
	this.shape_18.setTransform(-2.313,0.2692,1,1,10.4691);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AF3838").s().p("AgkgBQgfgsATgHIBpAbQgbAyALAcQg1gCgYg0g");
	this.shape_19.setTransform(-2.0574,0.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},22).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).wait(1));

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
	this.shape.graphics.f("#CD958B").s().p("Ag4AkQgKgHAHgOIAGgKQAJgJANADIAfgEQAjgKAcgZQgHATgRAUQgiAngyADQgGgBgFgEg");
	this.shape.setTransform(-1.6176,-1.5848,0.6215,0.6215,20.2067);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C28B85").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAhgbAgQgUAZggARQgJAEgGAAQgJAAgFgHg");
	this.shape_1.setTransform(-1.1412,-0.4458,0.6215,0.6215,20.2067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgWAPg");
	this.shape_2.setTransform(-1.9153,-0.1247,0.6215,0.6215,20.2067);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CD958B").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
	this.shape_3.setTransform(-1.7122,-1.5494,0.6215,0.6215,20.2067);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C28B85").s().p("AgvAxQgKgOALgNIAKgGQAMgHAHgDQARgGAUgTQAUgVALgOQAIAigYAbQgXAcgaANQgNAHgJAAQgIAAgDgGg");
	this.shape_4.setTransform(2.7,-2.6,0.6215,0.6215,8.2712,0,0,4.8,-5.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAHQgKgJARgGQARgFAOANQgTAKgJAAQgGAAgEgDg");
	this.shape_5.setTransform(-2.4362,0.5784,0.8727,0.8727,20.2084);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C28B85").s().p("AgKAXQghgGAMgaQAKgVAcAMQAPAFANAKQgLAagZAAIgJAAg");
	this.shape_6.setTransform(-2.6464,0.4849,0.8727,0.8727,20.2084);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},4).to({state:[]},1).wait(12));

	// Layer_2
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_7.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_8.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_9.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7}]},10).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[]},1).wait(13));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD958B").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_10.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CD958B").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_11.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CD958B").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_12.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},10).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[]},1).wait(13));

	// Layer_4
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_13.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_14.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_15.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},10).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(13));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_16.setTransform(0.65,1.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_17.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},11).to({state:[{t:this.shape_17}]},1).to({state:[]},1).wait(13));

	// Layer_6
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_18.setTransform(0.55,1.0856);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_19.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_18}]},11).to({state:[{t:this.shape_19}]},1).to({state:[]},1).wait(13));

	// Layer_7
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_20.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_21.setTransform(0.2313,-0.2179);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_22.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},10).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-4.7,11.4,10.3);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAAQAAgFAFAAQAGAAAAAFQgBAGgFAAQgFAAAAgGg");
	this.shape.setTransform(2.3,3.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AAAATQgIgBgFgFQgFgGAAgHQABgIAFgFQAGgFAHAAQAIABAEAFQAGAGAAAHQgBAIgFAFQgGAFgHAAIAAAAg");
	this.shape_1.setTransform(3.6,2.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#463A2E").s().p("AAAAZQgKAAgHgIQgHgIAAgJQABgKAIgHQAHgIAJABQAKAAAHAIQAIAIgBAJQgBALgHAHQgHAGgJAAIgBAAg");
	this.shape_2.setTransform(3.5792,2.5251);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_44, new cjs.Rectangle(1.1,0,5,5.1), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAAJQgEgBgCgDQgCgDAAgCQACgJAHABQAEABACADQACADAAACQgCAIgHAAIAAAAg");
	this.shape.setTransform(4.125,5.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#15100F").s().p("AgDAbQgLgBgHgJQgGgJABgKQACgMAJgHQAJgHAKACQALABAGAJQAHAKgBAKQgCALgJAHQgHAGgJAAIgDgBg");
	this.shape_1.setTransform(6.1742,4.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#353021").s().p("AgEAlQgPgCgJgMQgJgNACgOQACgPAMgJQAMgKAOACQAPADAJAMQAJAMgCAOQgCAPgMAJQgKAIgMAAIgEAAg");
	this.shape_2.setTransform(6.1579,4.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(2.5,0.5,7.300000000000001,7.4), null);


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
	this.shape.setTransform(-28.4427,-0.8723,2.0047,2.0047);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AAIARIgugFQgPABgEgDQgLgFgCgFQAGAFAMABQgJgGgEgHIASAJQgHgGgDgGQgEgFgCgIQAIALALAIQALAIAZABQAYABAVAFQAWAFAKAHIABABg");
	this.shape_1.setTransform(-28.568,-0.2708,2.0047,2.0047);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AghANIgZgNQgLgDAAgKQAEAKAMACQgIgIgEgKQAJAKAIAFIgJgPQgEgHABgBIAQATQAMAMAYAFQAXAEAVABIAhAAIABABQgPAJgaADQgvgFgPgJg");
	this.shape_2.setTransform(-28.5179,1.5835,2.0047,2.0047);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#343433").s().p("AgfALIgdgOQgGgEgDgKQAHAKAJACQgIgHgEgLQAJAKAIAFIgJgPIgDgHQAFAJASAPQARARAVAGQAZAHATgFIASgFIAHgDQgMASgfACIgIAAQgiAAgQgUg");
	this.shape_3.setTransform(-28.5179,2.3088,2.0047,2.0047);

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
	this.shape_9.setTransform(28.0652,-3.9294,2.0047,2.0047);

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
	this.shape_16.setTransform(22.7025,2.5929,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(50));

	// _Clip_Group__1
	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(-25.25,3.65,2.0047,2.0047,0,0,0,5.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_7
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAYQgcAAgOgSIgJgRQApgWAkARQASAIALAMQgDAFgIAFQgPAKgbAAIgCAAg");
	this.shape_17.setTransform(-25.2603,3.7337,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.7,-8.6,87.1,17.4);


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
	this.instance_2.setTransform(-26.65,3,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(18,2.85);

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
	this.instance_1.setTransform(31,0.05,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-26.95,0.2,2.0882,2.0882,0,0,0,6.2,3.8);

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
	this.instance_3.setTransform(-13.7,3.9,1,1,0,0,0,7,4);

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
	this.instance_8.setTransform(14.75,4.1,1,1,0,0,0,6.2,3.9);

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
p.nominalBounds = new cjs.Rectangle(-27.5,-4.8,54.1,13.3);


(lib.yl7y8lt78l7t8l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#1D1C1A").s().p("AA3AcQgXgcgnAAIgiAAQgMAAgGgJQgDgFAAgGQABAHAOAFQgLgNADgTQAAAMARAQQgKgLADgQQgBAFAFAHQAKANAfAGQAdAFAUAWQAKALAEALIAAAAIgIgNg");
	this.shape.setTransform(-9.4057,-56.2466,1.9612,1.9612,-17.2271);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1C1A").s().p("AAnARIgvgSQgngPgbAKIALgGQAhgMAgALQAiALASgIQAIgEACgGQgGASgQAEQAagFAHgMQgHAUgSAHIAIAAQAKAAADgEQgEAFgFAEQgGAEgGAAQgGAAgFgEg");
	this.shape_1.setTransform(33.0908,-55.6173,1.5653,1.5653,-16.9646);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1217).to({state:[]},33).wait(380));

	// Layer_21
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("Ag5APIANgPQAUgRAYABQAaABASAPQAKAIAFAIQgtgYgiAMIgWAKQgGADgEAAIgFgCg");
	this.shape_2.setTransform(36.6416,-68.6742,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1217).to({rotation:14.9989,x:37.8889,y:-71.4779},0).wait(33).to({rotation:0,x:36.6416,y:-68.6742},0).wait(380));

	// Layer_22
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AA5AQQgRgIgMgEQgugOg7AVIATgOQAZgQAhABQAiABAZARQAMAJAHAJIgHABQgFAAgJgDg");
	this.shape_3.setTransform(-7.9699,-69.8871,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1217).to({rotation:-9.4632,x:-8.7655,y:-72.3123},0).wait(33).to({rotation:0,x:-7.9699,y:-69.8871},0).wait(380));

	// Layer_8
	this.instance = new lib.gjkfujyuli("single",0);
	this.instance.setTransform(-0.9,-27.2,0.6362,0.6362,0,-0.9098,179.0902,16.3,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1042).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(92).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(27).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(132).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(34));

	// Layer_19
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(5.15,-52.25,0.6815,0.6955,0,0.6788,-179.3201,11.7,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1217).wait(33).to({_off:false,startPosition:40},0).wait(380));

	// Layer_12
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C0A07E").s().p("AgMAAQABgcAYAKQgRADgBAPQgCARASABQgHADgEAAQgOAAACgVg");
	this.shape_4.setTransform(10.2579,-39.8502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1630));

	// Layer_13
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0A07E").s().p("AgMARQASAAAAgQQABgPgRgFQAZgHgCAcQgBATgMAAQgEAAgIgEg");
	this.shape_5.setTransform(19.4726,-39.1227,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1630));

	// Layer_14
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("AgrBmIgJgtIgDgXQgBgRAKgiQAFgSAHgHIAOgKIAhgUQAHgEADgEIAGgIQALgNAQAAIgCABQAFAMgHANQgHANgNACQAEAKgGALQgGAKgLACQABANgDAHQgFALgKgBQABAEgEAGIgHAKQgCAFgBALQgDAKgGABQAJASgPAbQgFAHgEAAIgCAAg");
	this.shape_6.setTransform(-20.7054,-73.0704,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1630));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("Ai8BFQgTgcAVg5QAIgZAMgJQAGgFAOgGIAfgOQAUgIAKAAQALgBAUAJQAVAJAJACQAIABANgCQAOgBAGAAQAMABAIAHQAKAIgBAKQAKgLARABQARACAJANQATgOAWAJQADgGAIgCQAHgBAHADQAJAFAKARIAHABQAHAHAAALQAAAKgGAJQgIALgZANQgPAIgHAAQgPAAgEgLQgEASgOAHQgHAEgIgCQgJgBgFgGQgCAFgFABQgGAAgFgDQgEgDgHgOQgKAIgNgGQgNgFgBgMQgFAFgJAAQgKAAgGgFIgEgEIgEgDQgDAAgHADQgLAEgLgDQgMgDgHgJQgBAHgHACQgHACgFgEQAEAHgIAHQgIAGgHgFQAHALgIAOQgHAMgNAIQgLAGgHAAIgBAAQgOAAgLgPg");
	this.shape_7.setTransform(8.8064,-98.6399,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1630));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("Aj1DbIgFgCQgHgGgDgJQgDgKADgJQACgLgBgCIgEgGIgEgFQgCgFAFgJQAEgLAAgFIgEgJQgHgQAOghQgIgFgBgMQgBgLAEgMIAHgVQAEgLgCgIIgDgQQgBgKAEgEIAFgEQADgCABgDQACgDgCgIQgEgUALgSQAMgSASgCQgCgKADgIQADgKAHgGQAOgNARAHQABgOANgIQAMgHAPABQASACAFgEQAEgCAFgFQAEgEAKgEQAlgPAVAHIAIACQAEAAAHgEQASgJAWAFQAWAFAOARQAEgJALgCQAKgCAJAGQALAJAKAaQAQgFANAOQANAOgDASQAKgGAMACQAMACAJAIQAJAIAEANQAFANgDAMQANAAALAHQALAIAEANQAFANgDAPQgDANgJAJQgBASgPAKQgQALgPgIIAAgCQgDgFgLgDQgigFgRgEQgdgHgNgRIgNgVQgPgWgfgIQgVgFgiABQglAAgUAEQgfAGgUARQgPANgSAdQg4BdgaBrQgCAMgGAAIgBAAg");
	this.shape_8.setTransform(-2.9853,-102.2674,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1630));

	// Layer_17
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C0A07E").s().p("AAOAVQgDgPgJgNQgIgTgNgUQAGABAJAJQAFAHAFAHQARAcgFApIgEgag");
	this.shape_9.setTransform(-37.1841,-51.1724,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1630));

	// Layer_18
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D3B289").s().p("AALBHQgWgCgSg9QgXhOAoAAQANgBAMAOQAOAOgCATQAAAOAGABQADAAAEgDIgHBJQgHAKgLAAIgCAAg");
	this.shape_10.setTransform(-35.256,-50.1502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1630));

	// Layer_23
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D3B289").s().p("AhMDzIg/gmQgzgrgIhEIAEgXIADhHQAKguAGgXQALgoAVgVQAdgaAFgVQACgMgGgbQgHgdAegRQAjgTAxAlQBDA1BBgUQAhgKASgVQAUBCACAsQADA5gXAiQgUAcACAmQADA7gCANQgGAsgrA3QgrA5gqAOQgIACgLAAQghAAg0gag");
	this.shape_11.setTransform(7.6437,-52.1747,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1630));

	// Layer_24
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AiJDoQhpgngDhVQgFiPARg/QAchuBkgfQCXgvB0BrQA6A2AbA/QgXChiDBeQgpAdgvATIglANQg0gCg1gUg");
	this.shape_12.setTransform(-4.9858,-87.1284,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1630));

	// Layer_25
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BEBB89").s().p("AgpB/QgYgDgBgOQgEgrgQhHQgShUgFgeQAAgHABgBQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABIACAEQAXgJAXAOQAWAOADAXQAVgEASAQQASAPgBAWQAcgDATAUQAJAKAEAMQADANgCANQAJABAHAJQAGAIgCAKQgCAJgKAFQgKAEgJgEQADAOgNAJQgOAKgMgGQgFAQgJAGQgGADgIgCQgHgCgCgGQgHAKgUAAIgTgCg");
	this.shape_13.setTransform(35.1121,-115.8188,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1630));

	// Layer_26
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AD5ByQgMgKgdAFQgZAEg/ACQgRABgJgBQgPgCgLgHIgPgIQgEAAgLADQgPAFgQgEIgJgEQgHgCgEAAQgJgBgOAHQgRAIgGABQgKACgPgDIgagFIgjACQgUACgLgJIgGgFIgHgEQgDgBgLABQgMABgLgFQgMgGgIgKQgHgLgDgOQgCgOAEgMQAEgMAHgIQAMgOAigSQgEgEADgHQADgGAGgDIAMgDQAHgBAEgDQAGgDAJgMQAEgEAFgBQAFgBAEAEQgBgJAHgGQAHgGAHADIAMAGQAEABAGgEIALgHQAEgBAOAAQAMABAEgFIAHgJQAGgEALAIQAMAHAGgBIAKgHQAIgEAJADQAJAEAEAJQADgMAMgGQAMgFALAEQAVAGAMAcQASgFAQASQAKAMAHAYQAKgIANAGQANAHACAOQAUAKAMAXQALAXgEAZQAIgCAHAHQAGAGABAJQACANgKAOIACADIgGACIAEgFg");
	this.shape_14.setTransform(4.957,-129.5749,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1630));

	// Layer_27
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#453B33").s().p("AAEBBQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgQACgJgFQgGgCgEgHQgDgGACgGQgDAEgGgBQgFAAgEgDQgGgFgEgMQgEgMAGgFQgGAAAAgLQABgUAPgQQAQgQAUgBQAKgBATAEQAIACAGADIAHAFQADADAEABIAHACQAGACAEAFIABABQAKAIAAAKQAAAFgEAFQgEAEgFAAQAJAHgDAOQgCAOgMAEQADAMgHAHQgEAEgGgBQgGgBgCgEQgFAGgIAFQgEADgEAAIgBAAg");
	this.shape_15.setTransform(42.55,-97.877,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1630));

	// Layer_28
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#453B33").s().p("AAXCDQgMgBgEgZQgIAAgHgIQgHgIgCgKQgJAAgIgJQgHgJABgLQgUgEgIgLQgFgIACgJQACgKAHgDQgNgSgCgNQgBgKAEgJQAEgJAHgDQgLgMAFgUQAFgTAOgFIgCgCQAFgOAaAAQASgBAJAHQAKAHABANQAGgGAJAEQAIADAEAJQAFALgDAZQAHgBAHAFQAGAEADAIQAEAJABAWIAEBJQABAZgFALQgEAKgOAMIgYAIIgIACIgBAAg");
	this.shape_16.setTransform(-41.1679,-53.4973,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.3,-152.6,112.6,152.6);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#171714").s().p("AA3AcQgXgcgnAAIgiAAQgMAAgGgJQgDgFAAgGQABAHAOAFQgLgNADgTQAAAMARAQQgKgLADgQQgBAFAFAHQAKANAfAGQAdAFAUAWQAKALAEALIAAAAIgIgNg");
	this.shape.setTransform(9.1,-41.05,1.5732,1.5732,-7.4746,0,0,6,3.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#171714").s().p("AAnARIgvgSQgngPgbAKIALgGQAhgMAgALQAiALASgIQAIgEACgGQgGASgQAEQAagFAHgMQgHAUgSAHIAIAAQAKAAADgEQgEAFgFAEQgGAEgGAAQgGAAgFgEg");
	this.shape_1.setTransform(25.4,-41.45,1.182,1.182,-7.4753,0,0,-7.1,-1.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1218).to({state:[]},34).wait(1005));

	// Layer_22
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AhWAWQAHgMAOgLQAdgYAkABQAnABAcAXQAOAMAGALQhBgjg0ASIgiAPQgIAEgGAAQgFAAgDgDg");
	this.shape_2.setTransform(34.95,-54.1933);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1218).to({rotation:14.9983,x:35.9324,y:-56.37},0).wait(34).to({rotation:0,x:34.95,y:-54.1933},0).wait(377).to({_off:true},1).wait(627));

	// Layer_23
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("ABVAYQgZgMgTgGQhFgWhWAhQAIgMATgLQAlgXAyABQAyACAlAaQAUANAJAOQgEACgGAAQgIAAgNgFg");
	this.shape_3.setTransform(-1.55,-55.1427);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1218).to({rotation:-9.4997,x:-2.1778,y:-57.0189},0).wait(34).to({rotation:0,x:-1.55,y:-55.1427},0).wait(377).to({_off:true},1).wait(627));

	// Layer_28
	this.instance = new lib.ghstshqw12313copy("single",17);
	this.instance.setTransform(6.2,-22.6,1.0871,1.0871,-0.2461,0,0,-6.8,-5.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1218).to({startPosition:22},0).wait(3).to({startPosition:23},0).wait(3).to({startPosition:24},0).wait(24).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(377).to({startPosition:20},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_26
	this.instance_1 = new lib.gfhsrtjhqecopy("synched",14);
	this.instance_1.setTransform(25.55,-41.4,1.0458,1.0548,0.5893,0,0,9.5,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1218).wait(34).to({_off:false,startPosition:47},0).wait(377).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false,startPosition:2},0).to({_off:true},625).wait(1));

	// Layer_9
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3B4C56").s().p("ADXBGIgDgBIgDgCIhrgwQgqgTgXgIQglgNgfgDQg8gGg5AaIgmAUQgXALgRACQARgdAogTQAagNAygNQAygMAWgEQAngHAggBQBVgBA0ArQAUAQALAUQAMAXgDAXQgCALgGADIgDABIgBAAg");
	this.shape_4.setTransform(23.131,-77.8757);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_10
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#465E6D").s().p("Al4D/QhliGAPhyQAQhxAYhEQALggAIgQQAMgaAOgSQAUgXAugxQA3g5AQgKQBAgqBtgCQAyAACIAOQBAAHBDAnQAxAdBBA4QAKAIAEALQAEAMgJAFQArAXAeAmQATAWgCASQAFAcgMAbQhGgegbgPIgsgZQgZgOgUgGQgigKgtACQhrAGhaBCQhWA/gzBkQgyBigIBwQgHBxAmBmQh/hZhPhqg");
	this.shape_5.setTransform(0.004,-60.1759);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_11
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A1A5A8").s().p("ADAA6Qipg7lBB/QAQhCA1hBQBqiFC5gFIAoABQAwAGAnAVQB8BDgQDBQgUg4hVgfg");
	this.shape_6.setTransform(15.4164,-72.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#664F3F").s().p("AALAzQAegigzggQgHgGgFgLQgLgXAIgXIAEATQAHAXAOASIALALQAMALAEANQAOAohFAWQAZgLAOgRg");
	this.shape_7.setTransform(20.2847,-34.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#664F3F").s().p("AAYAgQgFgXgOgTQgGgKgKgRQgIgQgNgQQAKABAPAPQAJAKAIAKQAeApgJA+IgHgmg");
	this.shape_8.setTransform(-27.0712,-39.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#775A45").s().p("AATBpQgngCgdhbQgTg6ALgfQAJgbAaAAQAYgBAUAUQAWAWgCAbQgBAVALABQAFAAAGgEIgLBsQgNAPgRAAIgDAAg");
	this.shape_9.setTransform(-25.3017,-38.9695);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_24
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#775A45").s().p("AiAFnIhpg4QhWhAgNhkIgBAAIAIgfIAFhsIABAAQADgLAGhbQAEg9AigdQA4gvAQgXQASgbgIgfQgFgQALgUQALgVAWgLQA7gdBRA4QByBOBsgeQA2gPAggeQAgBhAEBCQAFBUgnAyQghAqAEA4QAFBXgDAUQgMBBhGBRQhJBUhGAVQgOAEgSAAQg3AAhYgog");
	this.shape_10.setTransform(11.7233,-40.5147);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	// Layer_25
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#465E6D").s().p("AB+DAQiBglhjhkQhkhigliCQgCgKACgJQADgKAIAAQAFABAEAEQAoAgAoBIQA0BeAQAUQA0BGBaAsQAaAMA2AUIBVAfQgRAFgVAAQggAAgogLgADsDGIAEgBIABADgADsDGg");
	this.shape_11.setTransform(-10.0444,-20.3068);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1629).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},625).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.4,-105.1,92.9,105.1);


(lib.UIL78LT78L = function(mode,startPosition,loop,reversed) {
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#343433").s().p("AA3AcQgXgcgnAAIgiAAQgMAAgGgJQgDgFAAgGQABAHAOAFQgLgNADgTQAAAMARAQQgKgLADgQQgBAFAFAHQAKANAfAGQAdAFAUAWQAKALAEALIAAAAIgIgNg");
	this.shape.setTransform(-60.9939,-73.3354,2.0116,2.0116,-15.228);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AAnARIgvgSQgngPgbAKIALgGQAhgMAgALQAiALASgIQAIgEACgGQgGASgQAEQAagFAHgMQgHAUgSAHIAIAAQAKAAADgEQgEAFgFAEQgGAEgGAAQgGAAgFgEg");
	this.shape_1.setTransform(-3.9911,-75.4057,2.0116,2.0116,-15.228);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1219).to({state:[]},33).wait(378));

	// Layer_7
	this.instance = new lib.ilt78lt78lt78("synched",0);
	this.instance.setTransform(-31.85,-73.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1219).wait(33).to({_off:false,startPosition:2},0).wait(378));

	// Layer_16
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("AA0AQQgPgMgMgEQgqgXg1AqIARgTQAXgSAegBQAfgCAXAUQALAJAGAKQgDACgEAAQgFAAgHgEg");
	this.shape_2.setTransform(-64.0265,-91.9166,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1219).to({rotation:-14.9985,x:-65.5546,y:-95.4134},0).wait(33).to({rotation:0,x:-64.0265,y:-91.9166},0).wait(378));

	// Layer_17
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#292929").s().p("AhIAAQAYgaApAAQAjAAAiASQAQAIAKAJQhKgmgsAUQgMAGgTAOQgQAOgKACg");
	this.shape_3.setTransform(-8.4959,-92.5145,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1219).to({rotation:10.4726,x:-9.1751,y:-95.8105},0).wait(33).to({rotation:0,x:-8.4959,y:-92.5145},0).wait(378));

	// Layer_24
	this.instance_1 = new lib.tyutdyujyj("single",6);
	this.instance_1.setTransform(-15.7,-32.4,2.4063,2.3275,0,5.3418,4.9942,3,-2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1217).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(32).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(167).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(99));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#796A6A").s().p("AAMARQgTgJgbgIQg3gSgkgEIAiABQAoACAZAHQA5AOASADQAxAGAcgRQAAALgPAIQgQAKgcAAQgXAAgggGg");
	this.shape_4.setTransform(-23.5814,-129.1036,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1630));

	// Layer_4
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#796A6A").s().p("AjUBaQgUgdgIguQgIgyCHgEQB7gEBqAhQBQAXAQg6QAFgTgCgZIgDgVIAOAXQAPAaAAALQAABPhtgOQh8gag/gHQh0gMgqA+IAEAXQAFAdALAbQgJgGgKgPg");
	this.shape_5.setTransform(-39.3133,-137.4201,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1630));

	// Layer_5
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#292929").s().p("AjwB0QgthQAcgxQAzhgBwgxQCbhECvBmIAMAPQANATAFARQAPA0hFAIQgCAjgoAhQhQBDi9gOQgRgBgUAKQgpATgNAzQgcgegWgpg");
	this.shape_6.setTransform(-37.1237,-135.3673,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1630));

	// Layer_6
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BEA840").s().p("AgHAIQgEgDAAgFQAAgEAEgDQADgEAEAAQAFAAADAEQAEADAAAEQAAAFgEADQgDAEgFAAQgEAAgDgEg");
	this.shape_7.setTransform(35.6579,-48.2103,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1630));

	// Layer_12
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D5AE90").s().p("AgUAVIAVgSQALgOAGgaIADgWQAFAbgIAVQgEALgFAEQgjAOAVAXQAKALASAIQg1gQAKgXg");
	this.shape_8.setTransform(-39.5739,-55.7781,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1630));

	// Layer_13
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D5AE90").s().p("AgFgVQAOgWAKgBIgMAUIgJASQgIAMgDAPIgEAYQgFgnARgbg");
	this.shape_9.setTransform(37.0476,-63.1454,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1630));

	// Layer_14
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EBBF9A").s().p("AgbBUIgMgEIgKhyIAJAMQAJAIgBgWQgCgdAOgMQAMgMARAHQATAHALAUQAOAYgDAfQgGBHgrAMQgGACgIAAIgOgBg");
	this.shape_10.setTransform(36.8653,-61.8887,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1630));

	// Layer_20
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EBBF9A").s().p("AhYFMQg1gQg4hPQgyhIgKg5IgDhXQgCgrgbgkQgdglAZhOQAmhdAPguIASgIQAWgIAXgDQBLgMA8AnQAvAeATgGIABgIQADgNAEAEQAFAEgFAHQgDAFgFABQACAUAfAcQAXAVA7AuQAdAZAOAwQAJAcAMA6IAKAKQAJAHgBgUQgCgdAPgPQANgNATAFQATAGALAVQANAZgFAjQgLBPgpAJQgNADgOgFIgMgFQgFAmgQAdQgTAhglAcQglAegvAbQhIArgtAAQgNAAgKgDg");
	this.shape_11.setTransform(-14.0884,-67.1624,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1630));

	// Layer_21
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AhgDRQiWh4ggjDIARgnQAYgtAlggQB3hoDKA+QBmAfAkB0QAZBTgFCYQgEBnhyAsQgkAOgqAGIgkAEQhEgVhLg7g");
	this.shape_12.setTransform(-6.2932,-108.4175,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1630));

	// Layer_22
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("AglD9QAUguAIgiQAThUAFhAQAGhRgRhAQgMg1gdgpQgdgpglgSIgmg1QAugPA9ALQBBALAiAkQATAVAYAiQATAdgCAJQgEAOAOAgQAFALABAeQABAYgBBYIABAcQABARgDAKIgPBFQgGAVgXAjQgnA8gcAaQgTATg7AqQgBg5ANgag");
	this.shape_13.setTransform(25.1403,-99.8972,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1630));

	// Layer_23
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#292929").s().p("AAVEFQg1hTAehqQAOg0ADg5QAHhyg6gaQgYAHgXAPQguAeADAnIgpiAIAfgkQAngoAngSQB6g7BHCzIALAkQANAuAFArQASCKg3BBIgnA+QghBIAaAxQghgUgbgqg");
	this.shape_14.setTransform(57.049,-99.6753,2.0047,2.0047);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91,-172.8,181.9,172.8);


(lib.UIT7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.instance = new lib.UIL78LT78L("synched",0);
	this.instance.setTransform(4.9,-181.3,1,1,0,0,0,6.4,-20.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1216).to({startPosition:1216},0).to({regX:6.5,rotation:8.1548,x:16.55,y:-180.65,startPosition:1227},11).wait(21).to({startPosition:1248},0).to({regX:6.4,rotation:0,x:4.9,y:-181.3,startPosition:1258},10).wait(160).to({startPosition:1418},0).to({rotation:3.5028,x:-7.75,y:-181.4,startPosition:1429},11).wait(97).to({startPosition:1526},0).to({rotation:0,x:4.9,y:-181.3,startPosition:1535},9).wait(95));

	// Layer_9
	this.instance_1 = new lib.UILT7LT78L87L("synched",0);
	this.instance_1.setTransform(-17.85,128.55,1,1,0,0,0,3.8,39.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1216).to({startPosition:0},0).to({startPosition:0},11).wait(21).to({startPosition:0},0).to({startPosition:0},10).wait(160).to({startPosition:0},0).to({startPosition:0},11).wait(97).to({startPosition:0},0).to({startPosition:0},9).wait(95));

	// Layer_18
	this.instance_2 = new lib.IL7L78L("synched",0);
	this.instance_2.setTransform(48.35,-126.5,1,1,0,0,0,18.7,13.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1216).to({startPosition:0},0).to({regY:13.8,rotation:-1.2372,x:57.8,y:-124.25},11).wait(21).to({startPosition:0},0).to({regY:13.9,rotation:0,x:48.35,y:-126.5},10).wait(160).to({startPosition:0},0).to({regY:13.8,rotation:19.0073,x:37.95,y:-128.6},11).wait(97).to({startPosition:0},0).to({regY:13.9,rotation:0,x:48.35,y:-126.5},9).wait(95));

	// Layer_20
	this.instance_3 = new lib.UI77997("synched",0);
	this.instance_3.setTransform(88.3,4.35,1,1,0,0,0,-1.4,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1216).to({startPosition:0},0).to({regX:-1.2,regY:7.3,rotation:-1.2372,x:100.75,y:5.65},11).wait(21).to({startPosition:0},0).to({regX:-1.4,regY:7.4,rotation:0,x:88.3,y:4.35},10).wait(160).to({startPosition:0},0).to({regX:-1.3,regY:7.2,scaleX:0.9999,scaleY:0.9999,rotation:119.78,x:28.1,y:21.35},11).wait(97).to({startPosition:0},0).to({regX:-1.4,regY:7.4,scaleX:1,scaleY:1,rotation:0,x:88.3,y:4.35},9).wait(95));

	// Layer_11
	this.instance_4 = new lib.UY78979("synched",0);
	this.instance_4.setTransform(-5.95,59.4,1,1,0,0,0,2.5,69.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1216).to({startPosition:0},0).to({regY:69.6,rotation:2.2151,x:-3.6,y:59.35},11).wait(21).to({startPosition:0},0).to({regY:69.7,rotation:0,x:-5.95,y:59.4},10).wait(160).to({startPosition:0},0).to({regY:69.6,rotation:-2.4714,x:-8.25,y:59.45},11).wait(97).to({startPosition:0},0).to({regY:69.7,rotation:0,x:-5.95,y:59.4},9).wait(95));

	// Layer_15
	this.instance_5 = new lib.OULY89Y89("synched",0);
	this.instance_5.setTransform(-55.45,-139.9,1,1,0,0,0,-4,9.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1216).to({startPosition:0},0).to({regY:9,rotation:4.7072,x:-45.45,y:-141.75},11).wait(21).to({startPosition:0},0).to({regY:9.1,rotation:0,x:-55.45,y:-139.9},10).wait(160).to({startPosition:0},0).to({rotation:-2.4714,x:-66.3,y:-137.45},11).wait(97).to({startPosition:0},0).to({rotation:0,x:-55.45,y:-139.9},9).wait(95));

	// Layer_17
	this.instance_6 = new lib.UIL7TLT78L("synched",0);
	this.instance_6.setTransform(-58.55,-6,1,1,0,0,0,-14,2.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1216).to({startPosition:0},0).to({rotation:4.7072,x:-59.45,y:-8.45},11).wait(21).to({startPosition:0},0).to({rotation:0,x:-58.55,y:-6},10).wait(160).to({startPosition:0},0).to({rotation:-2.4714,x:-63.65,y:-3.55},11).wait(97).to({startPosition:0},0).to({rotation:0,x:-58.55,y:-6},9).wait(95));

	// Layer_6
	this.instance_7 = new lib.IOY89Y89("synched",0);
	this.instance_7.setTransform(18.45,78.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1216).to({startPosition:0},0).to({startPosition:0},11).wait(31).to({startPosition:0},0).wait(372));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128,-337.1,249.6,670);


(lib.IUL7TLT8L86L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.instance = new lib.uil7tlt78l7l("synched",0);
	this.instance.setTransform(27.55,37.75,1.628,1.628,-0.3539,0,0,14.3,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1630));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#465E6D").s().p("AA9FhQg+gagygsQg9g0gVgEQgTgDgLgGQgRgHgEgKQgFgJAAgEQgBgGAEgIQAohLAQhpIASjBQAGg7AFgbQAJgwARgiQACgFAEgCQAFgDADADIABgDIAHgFQAfA+AOAwQALAqAPBVQATBUBHCzQBCCoARBhQhDgDg/gbg");
	this.shape.setTransform(-40.7686,30.1461,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1630));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3B4C56").s().p("ABHGQQgGgBgJgKQhph0hViCQgdgrgLgZQgMgbgPg1IgqiYQgWhOgHgqQgLhEAIg2QA0BxBhBWQBgBVB2AmQAlAMAWgHQALgEATgPQA2gsAog2IAIgBQgRBDAABEIABBAQgCAkgKAZQgHAQgRAdQgJARgIAaIgOAsQgPAsgcAxQgTAggkA2QgMATgMAAIgDAAg");
	this.shape_1.setTransform(-2.9498,52.0257,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1630));

	// Layer_6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#465E6D").s().p("AgsAHQAMhhAlhZQAHgRAJgEQAGgCAHAEQAGAEgBAFIADgLQgSCJAZCEQADAWgCAIQgDAIgLAMIhNBSQgPhgAMhig");
	this.shape_2.setTransform(49.3353,49.4034,2.0049,2.0049);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.9,-132.3,158.10000000000002,264.6);


(lib.hktyktyktdy = function(mode,startPosition,loop,reversed) {
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AA3AcQgXgcgnAAIgiAAQgMAAgGgJQgDgFAAgGQABAHAOAFQgLgNADgTQAAAMARAQQgKgLADgQQgBAFAFAHQAKANAfAGQAdAFAUAWQAKALAEALIAAAAIgIgNg");
	this.shape.setTransform(-38.4934,-65.3361,1.5654,1.5654,-7.4758);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#292929").s().p("AAnARIgvgSQgngPgbAKIALgGQAhgMAgALQAiALASgIQAIgEACgGQgGASgQAEQAagFAHgMQgHAUgSAHIAIAAQAKAAADgEQgEAFgFAEQgGAEgGAAQgGAAgFgEg");
	this.shape_1.setTransform(5.6753,-60.9491,1.5654,1.5654,-7.4758);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1218).to({state:[]},37).wait(375));

	// Layer_31
	this.instance = new lib.tyiktriruiu("synched",0);
	this.instance.setTransform(-7.4,-59.3,0.9299,0.899,0.0515,0,0,7.8,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1218).wait(37).to({_off:false,startPosition:17},0).wait(375));

	// Layer_22
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("AAwASIgVgLQgkgQg1AbIAPgSQAUgSAbgBQAcgBAUATQALAIAEAKQgDADgEAAQgEAAgEgCg");
	this.shape_2.setTransform(-40.5308,-80.0868,1.9354,1.9354);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#292929").s().p("AAwASIgigUQgVgNg3AhIAPgSQAUgSAbgBQAcgBAUATQALAIAEAKQgDADgEAAQgEAAgEgCg");
	this.shape_3.setTransform(-41.9779,-83.0722,1.9354,1.9354,-14.9989);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3,p:{rotation:-14.9989,x:-41.9779,y:-83.0722}}]},1218).to({state:[{t:this.shape_3,p:{rotation:0,x:-40.5308,y:-80.0868}}]},37).wait(375));

	// Layer_23
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#292929").s().p("Ag/AAQAUgaAlABQAfAAAeASQAPAHAIAJQhGgVgjANQgfAVgTAFg");
	this.shape_4.setTransform(7.0806,-80.7134,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1218).to({rotation:8.9552,x:8.1371,y:-83.0159},0).wait(37).to({rotation:0,x:7.0806,y:-80.7134},0).wait(375));

	// Layer_32
	this.instance_1 = new lib.fgryjdsrtyjrsyj("single",6);
	this.instance_1.setTransform(0.9,-29.55,2.2899,2.2149,0,5.3419,4.9942,2.8,-2.8);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance_1).wait(23).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(23).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(12).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(20).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(17).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(5).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(22).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(108).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:11},0).wait(15).to({startPosition:12},0).wait(9).to({startPosition:11},0).wait(13).to({startPosition:8},0).wait(375));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape_5.setTransform(-50.6918,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1630));

	// Layer_3
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4F4E4E").s().p("AAAAPQgDgbgIgJIANAFQANAJgDATQgCAFgCADQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBAAQgCAAgDgHg");
	this.shape_6.setTransform(53.3586,-62.8899,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1630));

	// Layer_4
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEIgCANIhZAHg");
	this.shape_7.setTransform(30.4992,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1630));

	// Layer_5
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape_8.setTransform(20.048,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1630));

	// Layer_6
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#4F4E4E").s().p("AgZAJIAAgSIAOAIQASADATgLIAAASg");
	this.shape_9.setTransform(-15.9993,-65.3268,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1630));

	// Layer_7
	this.instance_2 = new lib.Path_0();
	this.instance_2.setTransform(-7.65,-64.15,1.9346,1.9346,0,0,0,1.2,2.2);
	this.instance_2.alpha = 0.6016;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgeAAgUgWQgWgVAAgdIAAgPQAAgHAFgFQAFgGAIAAIBtAAQAIAAAFAGQAFAFAAAHIAAAPQAAAdgVAVQgVAWgfAAg");
	this.shape_10.setTransform(3.45,-60.6158,1.9346,1.9346);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.instance_2}]}).wait(1630));

	// Layer_8
	this.instance_3 = new lib.Path();
	this.instance_3.setTransform(-46.65,-64.05,1.9346,1.9346,0,0,0,1.2,2);
	this.instance_3.alpha = 0.6016;

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgdAAgWgWQgVgVAAgeIAAgOQAAgHAFgFQAGgGAHAAIBtAAQAHAAAGAGQAFAFAAAHIAAAOQAAAegVAVQgWAWgeAAg");
	this.shape_11.setTransform(-35.677,-60.2289,1.9346,1.9346);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.instance_3}]}).wait(1630));

	// Layer_15
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("Ah7BCQgTgOgTgVIgOgRICrhsICrAKIAJA0QADAwgXgQQgWgNgbAWQgZAcgIACQgVAHgkATIgfASQgSAMgVAAQggAAgmgdg");
	this.shape_12.setTransform(-6.471,-116.4751,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1630));

	// Layer_16
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7EFE4").s().p("AgHAHQgCgDAAgEQAAgDACgDQADgDAEgBQAEABAEADQACADAAADQAAAEgCADQgEAEgEAAQgEAAgDgEg");
	this.shape_13.setTransform(43.515,-43.65,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1630));

	// Layer_18
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#AF8E79").s().p("AgVAeIARgZQAOgNAHgbIAEgYQAFAWgKAYQgFANgGAHQghAYAWARQAKAJARADQgwgFAGgZg");
	this.shape_14.setTransform(-21.2596,-51.4885,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1630));

	// Layer_19
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#AF8E79").s().p("AgEgTQALgTAKgBQgHAKgEAIIgHAQQgIAKgCANIgEAWQgEgjAPgYg");
	this.shape_15.setTransform(44.7209,-56.4238,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1630));

	// Layer_20
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CDA688").s().p("AgYBKIgLgDIgJhkIAJAKQAIAHgCgTQgBgaAMgLQALgKAPAGQApAOgFA6QgFBAgmAKQgFACgHAAIgNgCg");
	this.shape_16.setTransform(44.5353,-55.3947,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1630));

	// Layer_24
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CDA688").s().p("AhOEmQg2gJgxhIQgqg+gJg3QgBgHAAhGQAAgngYgfQgZghAWhGQAihTANgpIA4gRQBCgKA2AiQAqAcAQgFIABgIQADgLADADQAEAEgEAGQgCAEgFACQACARAcAZQAUASA0ApQAaAXANArQAHAYALAzIAJAJQAIAHgBgSQgCgaANgNQAMgLARAEQAqALgIBBQgKBIgkAIQgMACgMgEIgLgFQgFApgIAWQgOAjgeAXQgUAagkAWQg3Aig7AAQgUAAgUgEg");
	this.shape_17.setTransform(0.8639,-59.8614,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1630));

	// Layer_25
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#292929").s().p("AhVC5QiGhqgciuIAPgiQAVgoAigdQBphcCzA3QBbAcAgBnQAXBKgFCHQgEBbhlAnQggANglAFIggADQg8gShDg1g");
	this.shape_18.setTransform(7.5073,-95.304,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1630));

	// Layer_26
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AF8E79").s().p("AgfgIQA8goBLgmIAHAFQgWBbgaAWQgxApg3AKIgtAEQhDgQB6hPg");
	this.shape_19.setTransform(6.7922,-16.7476,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(1630));

	// Layer_27
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#292929").s().p("AghDhQASgqAHgdQAlihgZhkQgLgvgZgkQgagkghgRIgigvQApgNA2AKQA5AKAeAgQASASAVAfQARAagCAIQgEALANAdQAEAKABAbQABAYAABMIAAAYQABAPgDAJIgNA9QgGATgUAfQgiA1gZAXQgQAQg1AnQgBgzALgXg");
	this.shape_20.setTransform(34.4749,-87.9723,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(1630));

	// Layer_28
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEQgCAGAAAHIhZAHg");
	this.shape_21.setTransform(-43.1437,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(1630));

	// Layer_29
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#373432").s().p("AgUA7QgDACgDgFQgMgPAAgWQgBgVAJgTQATgkArgNIAGAjQACANgBAGQgCAKgLARIgFARQgEANgOAMQgHAIgSALg");
	this.shape_22.setTransform(-46.556,-99.0031,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(1630));

	// Layer_30
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#292929").s().p("AiUCmQgkgxgGgGQgfggAYhLQAVhAAhghQAngnByglQATgGAfASQAjAWAQAAIgGAFIA5ArQAYARAIAMQAYAjgQAyQgLAhgYAaQgaAcgxAWQhfAphmgUQgLgCgOAMQgFAEgEAAQgFAAgEgFg");
	this.shape_23.setTransform(-18.5959,-108.2377,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-145.7,117.9,145.7);


(lib._7I9L78LT78L = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.hktyktyktdy("synched",0);
	this.instance.setTransform(-3.55,-160.7,1.1838,1.1838,0,0,0,-14.5,-2.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({startPosition:23},0).to({rotation:-2.2376,x:-14.6,y:-159.8,startPosition:34},11).wait(222).to({startPosition:256},0).to({regY:-2.5,rotation:-4.9597,x:-26.9,y:-158.2,startPosition:269},13).wait(116).to({startPosition:385},0).to({rotation:-2.2369,x:-13.95,y:-159.75,startPosition:396},11).wait(175).to({startPosition:571},0).to({rotation:0.4852,x:0,y:-160.3,startPosition:583},12).wait(218).to({rotation:0.4852,startPosition:801},0).to({regX:-14.4,scaleX:1.1837,scaleY:1.1837,rotation:-2.9527,x:-15.6,y:-158.65,startPosition:813},12).wait(181).to({startPosition:994},0).to({regX:-14.5,regY:-2.4,scaleX:1.1838,scaleY:1.1838,rotation:0,x:-3.55,y:-160.7,startPosition:1005},11).wait(129).to({startPosition:1134},0).to({regY:-2.5,scaleX:1.1837,scaleY:1.1837,rotation:-3.4674,x:-18.8,y:-158.5,startPosition:1144},10).wait(62).to({startPosition:1206},0).to({regY:-2.4,scaleX:1.1838,scaleY:1.1838,rotation:0,x:-3.55,y:-160.7,startPosition:1214},8).wait(4).to({startPosition:1218},0).to({regY:-2.5,rotation:9.9329,x:3.85,y:-168.5,startPosition:1227},9).wait(19).to({startPosition:1246},0).to({regY:-2.4,rotation:0,x:-3.55,y:-160.7,startPosition:1255},9).wait(375));

	// UI_7T_T7_
	this.instance_1 = new lib.UI7TT7("synched",0);
	this.instance_1.setTransform(-18.4,-155.2,1,1,0,0,0,10.2,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:-29.2,y:-153.7},11).wait(222).to({startPosition:0},0).to({regY:4.1,rotation:-4.9598,x:-41.2,y:-151.45},13).wait(116).to({startPosition:0},0).to({regY:4,rotation:-2.237,x:-28.5,y:-153.75},11).wait(175).to({startPosition:0},0).to({rotation:0.4852,x:-14.8,y:-155},12).wait(218).to({rotation:0.4852},0).to({rotation:-2.952,x:-30.05,y:-152.55},12).wait(181).to({startPosition:0},0).to({regY:4.2,rotation:0,x:-18.4,y:-155.2},11).wait(129).to({startPosition:0},0).to({rotation:-3.4677,x:-33.2,y:-152},10).wait(62).to({startPosition:0},0).to({rotation:0,x:-18.4,y:-155.2},8).wait(4).to({startPosition:0},0).to({rotation:9.9326,x:-11.65,y:-165.6},9).wait(19).to({startPosition:0},0).to({rotation:0,x:-18.4,y:-155.2},9).wait(375));

	// UI_Y79_79_
	this.instance_2 = new lib.UIY7979("synched",0);
	this.instance_2.setTransform(-14.95,124.7,1,1,0,0,0,3.8,27.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(23).to({startPosition:0},0).to({startPosition:0},11).wait(222).to({startPosition:0},0).to({startPosition:0},13).wait(116).to({startPosition:0},0).to({startPosition:0},11).wait(175).to({startPosition:0},0).to({startPosition:0},12).wait(218).to({startPosition:0},0).to({startPosition:0},12).wait(181).to({startPosition:0},0).to({startPosition:0},11).wait(129).to({startPosition:0},0).to({startPosition:0},10).wait(62).to({startPosition:0},0).to({startPosition:0},8).wait(4).to({startPosition:0},0).to({startPosition:0},9).wait(19).to({startPosition:0},0).to({startPosition:0},9).wait(375));

	// UOI_79_79_
	this.instance_3 = new lib.UOI7979("synched",0);
	this.instance_3.setTransform(73.55,-181.1,1,1,0,0,0,6.5,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:61.65,y:-183.15},11).wait(222).to({startPosition:0},0).to({rotation:-4.9598,x:48.15,y:-185.1},13).wait(116).to({startPosition:0},0).to({rotation:-2.237,x:62.25,y:-183.05},11).wait(175).to({startPosition:0},0).to({regX:6.6,rotation:0.4852,x:77.3,y:-179.95},12).wait(218).to({rotation:0.4852},0).to({regY:-0.2,rotation:-2.952,x:60.3,y:-183.05},12).wait(181).to({startPosition:0},0).to({regX:6.5,regY:-0.1,rotation:0,x:73.55,y:-181.1},11).wait(129).to({startPosition:0},0).to({rotation:-3.4677,x:56.95,y:-183.45},10).wait(62).to({startPosition:0},0).to({rotation:0,x:73.55,y:-181.1},8).wait(4).to({startPosition:0},0).to({rotation:9.9326,x:83.3,y:-175.25},9).wait(19).to({startPosition:0},0).to({rotation:0,x:73.55,y:-181.1},9).wait(375));

	// UI_7T_7T9_
	this.instance_4 = new lib.UI7T7T9("synched",0);
	this.instance_4.setTransform(85,-137.65,1,1,0,0,0,5.1,0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(23).to({startPosition:0},0).to({regX:5.2,regY:0.8,rotation:-5.4813,x:74.9,y:-140.3},11).wait(222).to({startPosition:0},0).to({rotation:-12.4499,x:63.35,y:-142.9},13).wait(116).to({startPosition:0},0).to({rotation:-5.2488,x:75.45,y:-140.2},11).wait(175).to({startPosition:0},0).to({regX:5.4,regY:0.7,scaleX:0.9999,scaleY:0.9999,rotation:-8.7307,x:88.5,y:-136.6},12).wait(218).to({startPosition:0},0).to({rotation:-9.1813,x:74.05,y:-140.35},12).wait(181).to({startPosition:0},0).to({regX:5.1,regY:0.9,scaleX:1,scaleY:1,rotation:0,x:85,y:-137.65},11).wait(129).to({startPosition:0},0).to({regX:5.2,regY:0.8,rotation:-6.6797,x:71.1,y:-140.85},10).wait(62).to({startPosition:0},0).to({regX:5.1,regY:0.9,rotation:0,x:85,y:-137.65},8).wait(4).to({startPosition:0},0).to({regX:5.2,rotation:1.9763,x:93.7,y:-135.05},9).wait(19).to({startPosition:0},0).to({regX:5.1,rotation:0,x:85,y:-137.65},9).wait(375));

	// IO_Y89_Y89_Y89_
	this.instance_5 = new lib.IOY89Y89Y89("synched",0);
	this.instance_5.setTransform(25.5,-27.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:19.6,y:-28.1},11).wait(222).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-4.9598,x:13.55,y:-28.3},13).wait(116).to({startPosition:0},0).to({rotation:-2.237,x:20.25,y:-28.05},11).wait(175).to({startPosition:0},0).to({rotation:0.4852,x:27.9,y:-27.15},12).wait(218).to({rotation:0.4852},0).to({rotation:-2.952,x:20.15,y:-27.45},12).wait(181).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:25.5,y:-27.8},11).wait(129).to({startPosition:0},0).to({rotation:-3.4677,x:18.25,y:-27.5},10).wait(62).to({startPosition:0},0).to({rotation:0,x:25.5,y:-27.8},8).wait(4).to({startPosition:0},0).to({rotation:1.9763,x:30.35,y:-27.35},9).wait(19).to({startPosition:0},0).to({rotation:0,x:25.5,y:-27.8},9).wait(375));

	// OU_Y89_Y789_
	this.instance_6 = new lib.OUY89Y789("synched",0);
	this.instance_6.setTransform(38.95,-256);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:24.15,y:-256.65},11).wait(222).to({startPosition:0},0).to({rotation:-4.9598,x:7.15,y:-256.75},13).wait(116).to({startPosition:0},0).to({rotation:-2.237,x:24.7,y:-256.55},11).wait(175).to({startPosition:0},0).to({rotation:0.4852,x:43.2,y:-255.15},12).wait(218).to({rotation:0.4852},0).to({regX:0.1,regY:-0.1,rotation:-2.952,x:21.85,y:-256.05},12).wait(181).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.95,y:-256},11).wait(129).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-3.4677,x:17.95,y:-256.2},10).wait(62).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.95,y:-256},8).wait(4).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:9.9326,x:62.05,y:-255.05},9).wait(19).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:38.95,y:-256},9).wait(375));

	// ILT78LT78L
	this.instance_7 = new lib.ILT78LT78L("synched",0);
	this.instance_7.setTransform(-30.1,-128.65,1,1,0,0,0,1.3,13.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(23).to({startPosition:0},0).to({regX:1.2,regY:13.7,rotation:7.7628,x:-39.9,y:-126.85},11).wait(222).to({startPosition:0},0).to({rotation:13.0286,x:-50.65,y:-124},13).wait(116).to({startPosition:0},0).to({regX:1.1,rotation:8.0243,x:-39.35,y:-126.7},11).wait(175).to({startPosition:0},0).to({regY:13.6,rotation:5.4964,x:-26.9,y:-128.6},12).wait(218).to({startPosition:0},0).to({regX:1,regY:13.5,scaleX:0.9999,scaleY:0.9999,rotation:11.5097,x:-37.35,y:-125.45},12).wait(181).to({startPosition:0},0).to({regX:1.3,regY:13.8,scaleX:1,scaleY:1,rotation:0,x:-30.1,y:-128.65},11).wait(129).to({startPosition:0},0).to({regX:1.2,regY:13.7,rotation:11.5308,x:-43.45,y:-124.9},10).wait(62).to({startPosition:0},0).to({regX:1.3,regY:13.8,rotation:0,x:-30.1,y:-128.65},8).wait(4).to({startPosition:0},0).to({regX:1.2,regY:13.7,rotation:1.9763,x:-21.75,y:-130.1},9).wait(19).to({startPosition:0},0).to({regX:1.3,regY:13.8,rotation:0,x:-30.1,y:-128.65},9).wait(375));

	// UI_79_T79_
	this.instance_8 = new lib.UI79T79("synched",0);
	this.instance_8.setTransform(-15.55,-237.25,1,1,0,0,0,3.9,11.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:-29.55,y:-235.8},11).wait(222).to({startPosition:0},0).to({rotation:-4.9598,x:-45.45,y:-233.4},13).wait(116).to({startPosition:0},0).to({rotation:-2.237,x:-28.9,y:-235.7},11).wait(175).to({startPosition:0},0).to({regY:11.6,rotation:0.4852,x:-11.3,y:-237},12).wait(218).to({rotation:0.4852},0).to({regX:3.8,rotation:-2.952,x:-31.6,y:-234.55},12).wait(181).to({startPosition:0},0).to({regX:3.9,regY:11.7,rotation:0,x:-15.55,y:-237.25},11).wait(129).to({startPosition:0},0).to({rotation:-3.4677,x:-35.35,y:-234.1},10).wait(62).to({startPosition:0},0).to({rotation:0,x:-15.55,y:-237.25},8).wait(4).to({startPosition:0},0).to({rotation:9.9326,x:5.25,y:-245.95},9).wait(19).to({startPosition:0},0).to({rotation:0,x:-15.55,y:-237.25},9).wait(375));

	// U_Y79_79_9
	this.instance_9 = new lib.UY79799("synched",0);
	this.instance_9.setTransform(30.35,-227.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(23).to({startPosition:0},0).to({regY:-0.1,rotation:-2.2378,x:16.65,y:-228.05},11).wait(222).to({startPosition:0},0).to({rotation:-4.9598,x:1.05,y:-227.8},13).wait(116).to({startPosition:0},0).to({regY:-0.2,rotation:-2.237,x:17.25,y:-228},11).wait(175).to({startPosition:0},0).to({regX:0.1,rotation:0.4852,x:34.5,y:-227},12).wait(218).to({rotation:0.4852},0).to({rotation:-2.952,x:14.75,y:-227.35},12).wait(181).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:30.35,y:-227.6},11).wait(129).to({startPosition:0},0).to({regY:-0.1,rotation:-3.4677,x:11,y:-227.35},10).wait(62).to({startPosition:0},0).to({regY:0,rotation:0,x:30.35,y:-227.6},8).wait(4).to({startPosition:0},0).to({regY:-0.1,rotation:9.9326,x:48.75,y:-228.6},9).wait(19).to({startPosition:0},0).to({regY:0,rotation:0,x:30.35,y:-227.6},9).wait(375));

	// IL7T8L78TL
	this.instance_10 = new lib.IL7T8L78TL("synched",0);
	this.instance_10.setTransform(-49.1,27.7,1,1,0,0,0,-16.6,22.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(23).to({startPosition:0},0).to({regX:-16.4,rotation:109.7823,x:-87.75,y:18.8},11).wait(222).to({startPosition:0},0).to({rotation:106.3202,x:-111.6,y:16.5},13).wait(116).to({startPosition:0},0).to({regX:-16.3,regY:22.5,scaleX:0.9999,scaleY:0.9999,rotation:116.3148,x:-87.8,y:18.6},11).wait(175).to({startPosition:0},0).to({regX:-16.1,regY:22.6,rotation:98.7867,x:-69.15,y:18.8},12).wait(218).to({startPosition:0},0).to({rotation:119.7991,x:-94.7,y:16.6},12).wait(181).to({startPosition:0},0).to({regX:-16.6,regY:22.4,scaleX:1,scaleY:1,rotation:0,x:-49.1,y:27.7},11).wait(129).to({startPosition:0},0).to({rotation:111.7819,x:-93.25,y:24.4},10).wait(62).to({startPosition:0},0).to({rotation:0,x:-49.1,y:27.7},8).wait(4).to({startPosition:0},0).to({rotation:1.9763,x:-46.05,y:25.55},9).wait(19).to({startPosition:0},0).to({rotation:0,x:-49.1,y:27.7},9).wait(375));

	// UIO_79_7T_79
	this.instance_11 = new lib.UIO797T79("synched",0);
	this.instance_11.setTransform(32.3,114);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(23).to({startPosition:0},0).to({rotation:-2.2378,x:31.95,y:113.3},11).wait(222).to({startPosition:0},0).to({startPosition:0},13).to({rotation:0,x:32.3,y:114},736).wait(625));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.5,-331.8,354.7,663.8);


(lib.YUKLR67KR67K = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.yl7y8lt78l7t8l("synched",0);
	this.instance.setTransform(-9.45,-171.5,1.2411,1.2411,0,0,0,-14.1,-3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1041).to({startPosition:1041},0).to({rotation:-0.503,x:0.3,y:-171.65,startPosition:1050},9).wait(71).to({startPosition:1121},0).to({rotation:0,x:-9.45,y:-171.5,startPosition:1130},9).wait(86).to({startPosition:1216},0).to({rotation:-10.3922,x:-16.65,y:-170.8,startPosition:1224},8).wait(20).to({startPosition:1244},0).to({rotation:0,x:-9.45,y:-171.5,startPosition:1252},8).wait(14).to({startPosition:1266},0).to({rotation:-1.5027,x:-1.6,y:-171.6,startPosition:1277},11).wait(67).to({startPosition:1344},0).to({regY:-3.6,rotation:0.7249,x:-8.05,y:-171.35,startPosition:1355},11).wait(49).to({rotation:0.7249,startPosition:1404},0).to({regY:-3.5,rotation:0,x:-9.45,y:-171.5,startPosition:1414},10).wait(126).to({startPosition:1540},0).to({rotation:-2.2533,x:3,y:-172.15,startPosition:1549},9).wait(44).to({startPosition:1593},0).to({rotation:0,x:-9.45,y:-171.5,startPosition:1601},8).wait(29));

	// UI_7T98_789_
	this.instance_1 = new lib.UI7T98789("synched",0);
	this.instance_1.setTransform(-53.95,-145.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1041).to({startPosition:0},0).to({rotation:-27.76,x:-57,y:-147.8},9).wait(71).to({startPosition:0},0).to({rotation:0,x:-53.95,y:-145.8},9).wait(86).to({startPosition:0},0).to({rotation:-1.4497,x:-60.4,y:-143.95},8).wait(20).to({startPosition:0},0).to({rotation:0,x:-53.95,y:-145.8},8).wait(14).to({startPosition:0},0).to({rotation:-5.5314,x:-48.1,y:-146.2},11).wait(67).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-4.0163,x:-53.7,y:-145.25},11).wait(49).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-53.95,y:-145.8},10).wait(126).to({startPosition:0},0).to({regY:-0.1,rotation:-12.276,x:-44.95,y:-146.55},9).wait(44).to({startPosition:0},0).to({regY:0,rotation:0,x:-53.95,y:-145.8},8).wait(29));

	// UI78LT78L
	this.instance_2 = new lib.UI78LT78L("synched",0);
	this.instance_2.setTransform(-73.25,20.65,1,1,0,0,0,9.3,17.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1041).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-132.7602,x:15.2,y:-0.8},9).wait(71).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:0,x:-73.25,y:20.65},9).wait(86).to({startPosition:0},0).to({regX:9.2,regY:17.5,rotation:-1.4497,x:-75.55,y:22.95},8).wait(20).to({startPosition:0},0).to({regX:9.3,regY:17.4,rotation:0,x:-73.25,y:20.65},8).wait(14).to({startPosition:0},0).to({regY:17.3,rotation:-110.5314,x:-41.2,y:20.5},11).wait(67).to({startPosition:0},0).to({regY:17.2,scaleX:0.9999,scaleY:0.9999,rotation:-109.0156,x:-51.2,y:21.6},11).wait(49).to({startPosition:0},0).to({regY:17.4,scaleX:1,scaleY:1,rotation:0,x:-73.25,y:20.65},10).wait(126).to({startPosition:0},0).to({rotation:-117.2775,x:-17,y:17.35},9).wait(44).to({startPosition:0},0).to({rotation:0,x:-73.25,y:20.65},8).wait(29));

	// UK_79_79_79
	this.instance_3 = new lib.UK797979("synched",0);
	this.instance_3.setTransform(25.95,134.9,1,1,0,0,0,-4.1,22.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1041).to({startPosition:0},0).to({startPosition:0},9).wait(71).to({startPosition:0},0).to({startPosition:0},9).wait(86).to({startPosition:0},0).to({startPosition:0},8).wait(20).to({startPosition:0},0).to({startPosition:0},8).wait(14).to({startPosition:0},0).to({startPosition:0},11).wait(67).to({startPosition:0},0).to({startPosition:0},11).wait(49).to({startPosition:0},0).to({startPosition:0},10).wait(126).to({startPosition:0},0).to({startPosition:0},9).wait(44).to({startPosition:0},0).to({startPosition:0},8).wait(29));

	// UI_7T_T789_
	this.instance_4 = new lib.UI7TT789("synched",0);
	this.instance_4.setTransform(8.05,-5.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1041).to({startPosition:0},0).to({rotation:2.2378,x:11.35,y:-5.5},9).wait(71).to({startPosition:0},0).to({rotation:0,x:8.05,y:-5.95},9).wait(86).to({startPosition:0},0).to({rotation:-1.4497,x:5.05,y:-5.75},8).wait(20).to({startPosition:0},0).to({rotation:0,x:8.05,y:-5.95},8).wait(14).to({startPosition:0},0).to({rotation:1.4497,x:11.75,y:-5.65},11).wait(67).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:0.2238,x:8.95,y:-5.75},11).wait(49).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:8.05,y:-5.95},10).wait(126).to({startPosition:0},0).to({rotation:2.7226,x:12.7,y:-6},9).wait(44).to({startPosition:0},0).to({rotation:0,x:8.05,y:-5.95},8).wait(29));

	// IO_8Y9_Y9_
	this.instance_5 = new lib.IO8Y9Y9("synched",0);
	this.instance_5.setTransform(46.2,-135.9,1,1,0,0,0,27.4,17.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1041).to({startPosition:0},0).to({rotation:4.9598,x:54.5,y:-133.85},9).wait(71).to({startPosition:0},0).to({rotation:0,x:46.2,y:-135.9},9).wait(86).to({startPosition:0},0).to({rotation:-1.4497,x:39.95,y:-136.6},8).wait(20).to({startPosition:0},0).to({rotation:0,x:46.2,y:-135.9},8).wait(14).to({startPosition:0},0).to({rotation:3.664,x:53.2,y:-134.65},11).wait(67).to({startPosition:0},0).to({rotation:-0.285,x:47.5,y:-135.45},11).wait(49).to({rotation:-0.285},0).to({rotation:0,x:46.2,y:-135.9},10).wait(126).to({startPosition:0},0).to({rotation:4.1722,x:57,y:-133.95},9).wait(44).to({startPosition:0},0).to({rotation:0,x:46.2,y:-135.9},8).wait(29));

	// UIL7T8LT8L876L
	this.instance_6 = new lib.UIL7T8LT8L876L("synched",0);
	this.instance_6.setTransform(-10.15,104.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1130).to({startPosition:0},0).wait(500));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-108,-360,246.2,715.9);


(lib.UI79T79_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// UI_7TG9_T79_T79_
	this.instance = new lib.UI7TG9T79T79("synched",0);
	this.instance.setTransform(36.65,119.6,1,1,0,0,0,-1.2,15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1216).to({startPosition:0},0).to({startPosition:0},8).wait(26).to({startPosition:0},0).to({startPosition:0},8).wait(372));

	// IULT78LTL
	this.instance_1 = new lib.IULT78LTL("synched",0);
	this.instance_1.setTransform(-54.05,-129.4,1,1,0,0,0,-37.5,17.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1216).to({startPosition:0},0).to({regY:17,rotation:1.2809,x:-63.35,y:-127},8).wait(26).to({startPosition:0},0).to({regY:17.1,rotation:0,x:-54.05,y:-129.4},8).wait(372));

	// UIL7T8LT78LT8L
	this.instance_2 = new lib.UIL7T8LT78LT8L("synched",0);
	this.instance_2.setTransform(-29.5,6.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1216).to({startPosition:0},0).to({rotation:-2.4513,x:-32.95,y:8},8).wait(26).to({startPosition:0},0).to({rotation:0,x:-29.5,y:6.65},8).wait(372));

	// IUL7TLT8L86L
	this.instance_3 = new lib.IUL7TLT8L86L("synched",0);
	this.instance_3.setTransform(-0.45,-166.35,1,1,0,0,0,2.6,50.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1216).to({startPosition:1216},0).to({regY:50.2,rotation:-11.913,x:-11.35,y:-166.3,startPosition:1224},8).wait(26).to({startPosition:1250},0).to({regY:50.4,rotation:0,x:-0.45,y:-166.35,startPosition:1258},8).wait(372));

	// UIO_79_79T_T9_
	this.instance_4 = new lib.UIO7979TT9("synched",0);
	this.instance_4.setTransform(10.5,120.15,1,1,0,0,0,2.6,111);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1216).to({startPosition:0},0).to({rotation:-2.4513,x:11.8,y:119.7},8).wait(26).to({startPosition:0},0).to({rotation:0,x:10.5,y:120.15},8).wait(372));

	// OU_89_978_978
	this.instance_5 = new lib.OU89978978("synched",0);
	this.instance_5.setTransform(51.2,-156.5,1,1,0,0,0,26.4,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1216).to({startPosition:0},0).to({rotation:-5.933,x:40.65,y:-158.45},8).wait(26).to({startPosition:0},0).to({rotation:0,x:51.2,y:-156.5},8).wait(372));

	// O_Y89_987_79_
	this.instance_6 = new lib.OY8998779("synched",0);
	this.instance_6.setTransform(-2.8,111.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1216).to({startPosition:0},0).to({startPosition:0},8).wait(34).to({startPosition:0},0).wait(372));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-119,-349.1,258.1,697.7);


(lib.l898989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#606163").p("AfQfQMg+fAAAMAAAg+fMA+fAAAg");
	this.shape.setTransform(1.3868,0.034,2.005,2.005);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1630));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49158").s().p("AhBAZQgcgLAAgOQAAgOAcgKQAbgKAmAAQAnAAAcAKQAbAKAAAOQAAAOgbALQgcAKgnAAQgmAAgbgKg");
	this.shape_1.setTransform(230.3898,241.379,2.0045,2.0045);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgXC/Ig0gIIgrlXIATgKQAZgLAbgFQBWgSBQAsIgtFXQgcAJgmAAQgOAAgRgBg");
	this.shape_2.setTransform(230.7406,266.041,2.0045,2.0045);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B49158").s().p("AhCAZQgbgLAAgOQAAgNAbgLQAcgKAmAAQAnAAAcAKQAbALAAANQAAAOgbALQgcAKgnAAQgmAAgcgKg");
	this.shape_3.setTransform(100.1002,234.5138,2.0045,2.0045);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXC/IgzgIIgslXIATgKQAZgLAbgFQBWgSBQAsIguFXQgbAJgmAAQgOAAgRgBg");
	this.shape_4.setTransform(100.4009,259.2259,2.0045,2.0045);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B49158").s().p("AhBAZQgcgLAAgOQAAgNAcgLQAbgKAmAAQAnAAAcAKQAbALAAANQAAAOgbALQgcAKgnAAQgmAAgbgKg");
	this.shape_5.setTransform(-83.5079,234.5138,2.0045,2.0045);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgXC/IgzgIIgslXIATgKQAZgLAbgFQBWgSBQAsIgtFXQgcAJgmAAQgOAAgRgBg");
	this.shape_6.setTransform(-83.1571,259.2259,2.0045,2.0045);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B49158").s().p("AhCAZQgbgLAAgOQAAgNAbgLQAcgKAmAAQAnAAAcAKQAbALAAANQAAAOgbALQgcAKgnAAQgmAAgcgKg");
	this.shape_7.setTransform(-228.1294,234.5138,2.0045,2.0045);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgXC/Ig0gIIgrlXIATgKQAZgLAbgFQBWgSBQAsIguFXQgbAJgmAAQgOAAgRgBg");
	this.shape_8.setTransform(-227.7786,259.2259,2.0045,2.0045);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BD9C6C").s().p("A30DAQgvAAghgiQgiggAAgwIAAicQAAguAigiQAhghAvAAMAvpAAAQAvAAAhAhQAiAiAAAuIAACcQAAAwgiAgQghAigvAAg");
	this.shape_9.setTransform(-4.5324,310.6831,2.0045,2.0045);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CABF8E").s().p("A30DAQgvAAghgiQgighAAgvIAAicQAAguAigiQAhghAvAAMAvpAAAQAvAAAhAhQAiAiAAAuIAACcQAAAvgiAhQghAigvAAg");
	this.shape_10.setTransform(-4.5324,333.2332,2.0045,2.0045);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6F665D").s().p("AhBJSIAlyjIA5AAIAlSjg");
	this.shape_11.setTransform(-89.4712,429.0462,2.0045,2.0045);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6F665D").s().p("AhBJSIAlyjIA5AAIAlSjg");
	this.shape_12.setTransform(-27.9344,429.0462,2.0045,2.0045);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6F665D").s().p("AhBJSIAlyjIA5AAIAlSjg");
	this.shape_13.setTransform(45.9298,429.0462,2.0045,2.0045);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6F665D").s().p("AhBJSIAlyjIA5AAIAlSjg");
	this.shape_14.setTransform(121.2973,429.0462,2.0045,2.0045);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1630));

	// Layer_6
	this.instance = new lib.YUKLR67KR67K("synched",0);
	this.instance.setTransform(-301.15,221.25,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1630));

	// Layer_8
	this.instance_1 = new lib.UIT7979("synched",0);
	this.instance_1.setTransform(286.05,225.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1630));

	// Layer_9
	this.instance_2 = new lib._7I9L78LT78L("synched",0);
	this.instance_2.setTransform(80.25,208.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1630));

	// Layer_7
	this.instance_3 = new lib.UI79T79_1("synched",0);
	this.instance_3.setTransform(-125.05,213.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1630));

	// Layer_10
	this.instance_4 = new lib.UIL7T8L7T8LT78L("synched",0);
	this.instance_4.setTransform(-86.45,15.8,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-597.3,-446.5,1021.5,1023.8);


// stage content:
(lib.m2l3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,247,512,793,1036,1261,1629];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:247,loop:1,offset:0}];
	this.streamSoundSymbolsList[247] = [{id:"audio2",startFrame:247,endFrame:512,loop:1,offset:0}];
	this.streamSoundSymbolsList[512] = [{id:"audio3",startFrame:512,endFrame:793,loop:1,offset:0}];
	this.streamSoundSymbolsList[793] = [{id:"audio4",startFrame:793,endFrame:1036,loop:1,offset:0}];
	this.streamSoundSymbolsList[1036] = [{id:"audio5",startFrame:1036,endFrame:1261,loop:1,offset:0}];
	this.streamSoundSymbolsList[1261] = [{id:"audio6",startFrame:1261,endFrame:1630,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,247,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_247 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,247,512,1);
	}
	this.frame_512 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,512,793,1);
	}
	this.frame_793 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,793,1036,1);
	}
	this.frame_1036 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,1036,1261,1);
	}
	this.frame_1261 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1261,1630,1);
	}
	this.frame_1629 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(247).call(this.frame_247).wait(265).call(this.frame_512).wait(281).call(this.frame_793).wait(243).call(this.frame_1036).wait(225).call(this.frame_1261).wait(368).call(this.frame_1629).wait(1));

	// Layer_4
	this.instance = new lib.l898989("synched",0);
	this.instance.setTransform(311.7,468.1,1,1,0,0,0,-87.8,65.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1630));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(202.2,356,621.5,623.8);
// library properties:
lib.properties = {
	id: 'F4D7641CAE203343805D7643A8DF8461',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/audio1.mp3", id:"audio1"},
		{src:"sounds/audio2.mp3", id:"audio2"},
		{src:"sounds/audio3.mp3", id:"audio3"},
		{src:"sounds/audio4.mp3", id:"audio4"},
		{src:"sounds/audio5.mp3", id:"audio5"},
		{src:"sounds/audio6.mp3", id:"audio6"}
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
an.compositions['F4D7641CAE203343805D7643A8DF8461'] = {
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