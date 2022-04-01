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


(lib.yul68l6rtl68 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AA0C3QgLgRgFgVQgDgQAAgZIgCgoQgDgzgagWQgFA1gfAuQACgfgMgdIgaguQgPgcAAghIAOgFQASgQAWgoQAWgpAPgPQATgSAPAHQAHAEAHAMQAUAhAGAXQACALABAPIABAbQAEA9gCBVIgECOQgSgHgMgSg");
	this.shape.setTransform(-0.0039,40.2428,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,0,33.4,80.5);


(lib.yiulr678lr678l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("AhKDLQAHgEAHgtQANhYABjHQgDgMACgQQAGgcAVgRQAUgRAZAFQAZAEAPAYQAOAXgFAcIgBACIgaB2QgfCKgTBlQgXgIgwgJg");
	this.shape.setTransform(-14.5236,42.5323,1.9354,1.9354);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgQBdQAJg4gCAAQgCAAgLAmIgMAoQgEASgLgDQgLgDAEgUQAahZAEgfQABgSgHgFQgDgCgHAeIgJApIgGAYQgFANgHgFQgGgEABgaIACgZQAXhlAWgcQAaggA5AMQARAEACBLQACBCgJA6QgDAVgEAFQgCAEgHgBQgHgBACgoQADgmgCABQgEADgFBKQgBAVgGAHQgEADgHgBQgFgBgBgHQgBgMAEglQAIg+gKAVQgDAFgLBWIgCARQgBAJgIACIgCAAQgNAAAIgyg");
	this.shape_1.setTransform(-27.1601,107.3451,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,0,41.7,135.1);


(lib.uoly89789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF3537").s().p("AhZAaQBNgJA2giQAcgSAMgPIAIAWQgrAvhFAVIg+ALg");
	this.shape.setTransform(24.4837,53.1699,1.9357,1.9357);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5F6F6").s().p("Ag7C9IgXhmQgYgxgGg6QgLh2BcgzIAPACQASAEAPAMQAzAlAHBiIAKAmQANAwAQAsQgXAagiAZQg8AtguAAIgKgBg");
	this.shape_1.setTransform(22.0863,36.6732,1.9357,1.9357);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBBF9A").s().p("AAvFWQgSgRgDgbIAAAAQgchKh1lMQgXgggFgyIgBgEIABgBIgBgVQgBg7AagqQAagqAlgBQAkABAYAqQAaAqAAA7IgBAVIABAIQAHBSAwClQAdBnAiBjIAFAQIAAAAIAAANQAAAdgSAUQgRAVgagBQgYABgRgTg");
	this.shape_2.setTransform(31.1134,73.2525,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,60.1,143.1);


(lib.ukl7il78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDA688").s().p("AhIBoIgbgGQgChsgOg6QgFgVApgLQAngLAwAHQA3AIAdAaQAiAfgOAwQgaBZhfAJIgUABQgVAAgWgEg");
	this.shape.setTransform(5.6348,-292.3125,1.9355,1.9355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgIAJQgEgEgBgFQABgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEAEgGAAQgFAAgDgEgAABADQAAABABAAQAAABAAAAQAAAAABABQAAAAAAAAQABAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAAAAAAAQgBAAAAAAQAAABAAAAQgBABAAAAgAgFADQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAAAAAAAQgBABAAAAQAAABAAAAgAABgDQAAABABAAQAAABAAAAQAAAAABABQAAAAAAAAQABAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAgBQgBAAgBAAQAAAAAAAAQgBABAAAAQAAAAAAAAQgBABAAAAgAgFgDQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAgBAAQAAABAAAAQgBAAAAAAQAAABAAAAg");
	this.shape_1.setTransform(-14.4975,-200.0091,1.9355,1.9355);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAJQgEgDAAgGQAAgEAEgEQADgEAFAAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAQgEAAgEgEgAABADQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQAAAAgBAAQAAABAAAAgAgFADQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAAAQAAABAAAAgAABgCQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAAAABgAgFgCQAAAAAAABQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABg");
	this.shape_2.setTransform(-14.1588,-209.3962,1.9355,1.9355);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgEQAEgDAFAAQAFAAAEADQAEAEAAAFQAAAFgEAEQgEAEgFAAQgFAAgEgEgAABADQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAABgBAAQAAABAAAAgAgFADQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAABAAAAgAABgDQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQAAAAgBAAQAAABAAAAgAgFgDQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAAAQAAABAAAAg");
	this.shape_3.setTransform(-13.0943,-218.6866,1.9355,1.9355);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D43539").s().p("AgKCLIABgLIhCApQgRAGgPgUQgfgpAGiDQAHiFBDgdQAhgOAfAMQBTAjAfBoQAPA0gCAyQgEAghGAzIhEAsQgCgfABgRg");
	this.shape_4.setTransform(51.0286,-211.5673,1.9355,1.9355);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B73538").s().p("AAgCVIhGh8QgUghAGgUQACgIAJgMIBfiIIAACBQABBQgEAqQgGBEgTAyg");
	this.shape_5.setTransform(40.3109,-187.6704,1.9355,1.9355);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CDA688").s().p("AhpBtQgPhHAGgZQAbhSgHgPIBlgzQBngxAHALIgMBTQgJBWAPAPIjHClQgJgfgIgkg");
	this.shape_6.setTransform(4.6469,-256.9304,1.9355,1.9355);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D43539").s().p("AjaGTQgIAAgDgUQgHgmAahhQgZhggQhtQgijaAmhEQA4h7ANgrIAkgUQApgTAWAFIBeAPQBkAJAegaIB1AlIgLHsIgPBCQgNBRAPBSIANAYQAOAjADAzQhTAQhmAFQgjACgfAAQiaAAhRgrg");
	this.shape_7.setTransform(-2.2261,-168.4836,1.9355,1.9355);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6F6F6F").s().p("AgWAtIAbhdIASAIIgZBag");
	this.shape_8.setTransform(-38.8362,-85.0897,1.9355,1.9355);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6F6F6F").s().p("AgPAwIAMhhIATAGIgLBcg");
	this.shape_9.setTransform(-24.9975,-81.7026,1.9355,1.9355);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#6F6F6F").s().p("AgNgwIATABIAIBeIgUACg");
	this.shape_10.setTransform(19.2283,-78.6058,1.9355,1.9355);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6F6F6F").s().p("AgWguIAVgBIAXBaIgTAFg");
	this.shape_11.setTransform(38.6316,-80.1058,1.9355,1.9355);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#525252").s().p("AgkgKIANh4IA9EFg");
	this.shape_12.setTransform(-22.7783,-38.9717,1.9354,1.9354);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6F6F6F").s().p("AgBGjQgfgXgKgjIgEAAQhUkngxkmQgHgXAAgZQAAhEAzgwQAzgwBJAAQBHAAAzAwQAzAwAABEQAAAMgBAMQgMCoALCuQAHByAPBfQAFARAAAQQAAAtgiAhQgiAfgxAAQgoAAgfgWg");
	this.shape_13.setTransform(35.9216,64.9948,1.935,1.935);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6F6F6F").s().p("Ag6F5QAUg5ADhpQAFjThWjxQgMgSgEgXIAAgDIAAAAIAAgLQAAgtAiggQAiggAxAAQAvAAAjAgQAiAgAAAtIAAABQATBSAJCHQAQDzgsDYQgZAKggAFQgPACgNAAQgtAAgdgZg");
	this.shape_14.setTransform(51.9327,185.9107,1.9346,1.9346);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAVAHQgYgOgjgEIAPgIIAdAEQAeAKADAZQgGgGgMgHg");
	this.shape_15.setTransform(25.1607,289.9455,1.9346,1.9346);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAVAGQgYgOgjgDIAOgJIAdAGQAeAJAEAaQgGgHgMgIg");
	this.shape_16.setTransform(32.3188,286.3664,1.9346,1.9346);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAVAGQgYgOgjgEIAPgHIAcAEQAeAKAEAZQgFgGgNgIg");
	this.shape_17.setTransform(39.6704,282.1586,1.9346,1.9346);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#57514C").s().p("Ai3BYQgHgJgCgLQgGgXAWgOQAxgfAOgFICYhUIALAIQARAHAiAAQAogMASgKQAMgHAAgDIgBgCQALABAFARIABAAIAAABQAKAbgDAuQgoAagyAcQhlA5g1ALQgYADgcAAQg5AAgYgVg");
	this.shape_18.setTransform(34.4075,291.6867,1.9346,1.9346);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CCCCCC").s().p("AhQAbQAJgEAJgMQATgZADgvIgGgsIBmAAQAIB2ARgCIgUAKIAFAWQgcAmghARQgPAIgNAAQgpAAgQhPg");
	this.shape_19.setTransform(54.2285,272.1263,1.9346,1.9346);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#6F6F6F").s().p("AADDsQhjgfh4g7Ihjg0QgPgyAChDQADiKBUhfIAGgKQA5AZDFgEQBjgBBXgHIA6BmQAZAfASA2QAaBPgDBnQgFCXiZAAQhFAAhjgfg");
	this.shape_20.setTransform(2.4461,-40.0051,1.9354,1.9354);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAVAGQgYgOgjgEIAPgIIAcAFQAeALAEAZQgGgHgMgIg");
	this.shape_21.setTransform(-51.0154,265.9077,1.9346,1.9346);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAVAGQgYgOgjgEIAPgIIAdAFQAeALADAZQgFgHgNgIg");
	this.shape_22.setTransform(-43.9057,262.4254,1.9346,1.9346);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#525252").s().p("Ag/F5QAVg5ADhpQAIjThUjyQgNgVgCgVIgBgCIABAAIgBgLQABgtAjggQAigfAxAAQAvABAjAgQAiAggBAtIAAABQATBaAHB/QANDzguDYQgZAKghAEQgNACgMAAQguAAgegZg");
	this.shape_23.setTransform(-21.6054,161.5452,1.9346,1.9346);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAVAGQgYgOgjgEIAPgIIAcAGQAeAKAEAZQgGgHgMgIg");
	this.shape_24.setTransform(-35.1515,257.6372,1.9346,1.9346);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#3D3A38").s().p("AhoBsQg5gBgXgWQgHgIgCgLQgFgXAWgOIDYh2IAKAIQASAHAiABQAogMASgKQALgGABgDIgBgDQAKACAGARIABgBIAAACQAJAbgDAuIAAAAQgoAZgzAcQhlA3g1AKQgVAEgZAAIgHAAg");
	this.shape_25.setTransform(-40.4916,267.1706,1.9346,1.9346);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#ADACAC").s().p("AhQAaQAJgDAJgNQATgZADgvIgEgsIBlABQAIB3AQgDIgTALIAEAWQgdAmghAQQgPAJgNAAQgpAAgPhRg");
	this.shape_26.setTransform(-20.4966,247.6809,1.9346,1.9346);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#525252").s().p("AABG7QgngFgdgaQgdgagGgkIgEABQgykwgPkpQgFgZADgYQAIhDA4gqQA4gqBHAIQBIAJAuA1QAtA1gIBEQAAAKgEANQgfClgICvQgGBvAEBkQADAPgBASQgFAtgmAcQgfAXgnAAIgQgBg");
	this.shape_27.setTransform(-26.2328,40.9645,1.935,1.935);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.1,-313.1,156,626.1);


(lib.uipl7t8l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF8D75").s().p("AiGC+IADgqQALg3BSiMQBLiCAWgSQAUgQAZAPQAdATACA4QACA1hvB/IhyB6QgXAXgMAAQgJAAgCgOg");
	this.shape.setTransform(-26.11,39.5355,1.9352,1.9352);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("AhZCPQgRgBAlg1QAmg1gCgBQgCgBgeAiIghAlQgNAQgJgIQgIgIAPgSQBHhRAUgfQALgRgEgIQgCgEgWAcIgeAmIgTAWQgLAMgEgIQgEgHAPgaIAPgXQBLhgAjgUQApgWAvAlQANALgmBOQghBEgoA5QgOAUgGAEQgDACgGgDQgGgEAXgoQAWgngCABQgEABgsBKQgMAWgKAEQgFACgFgEQgFgDADgIQAFgNAYgkQAng9gTASQgIAHg1BRIgLAQQgHAHgHAAIgBAAg");
	this.shape_1.setTransform(-58.4347,88.4042,1.9352,1.9352);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-82.4,0,82.4,116.1);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE4339").s().p("AhdFgQgUgSgEgdIAAgMIgBAAIADgRQAWhqAQhnQAaiqgDhRIAAgIIgDgVQgHg7AUgsQAUgtAjgFQAlgEAeAmQAfAnAHA7IACAUIABABIgBAEQABAygTAkQhJFSgWBSQABAbgOAUQgPAUgYADIgHAAQgVAAgSgPg");
	this.shape.setTransform(-23.071,71.0719,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.1,0,46.1,142.2);


(lib.uiolt797979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DB7639").s().p("AgsAEQALgPAmgHQAUgDARgBIACAWQgTAAgiALIgeAMg");
	this.shape.setTransform(-9.5643,185.1763,1.9355,1.9355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453B33").s().p("AgYBeQgRgHgRgUQgWgagFgYIBghwQAPgFASAIQAPAIAKAPQAPAWACArQAAAigKASQgJASgYAQQgaAQgUAAQgLAAgKgEg");
	this.shape_1.setTransform(3.7905,113.2884,1.9355,1.9355);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgZDvQAfgcAUgmQAUgmAGgqQgOAegKAQQgPAZgQAPQgUASgaAGQgbAGgWgLQAwgZAdg0QAbgwAGg7QAFgxgKg9QgFgmgRhJIBXgjQAOBGAGAtQAIBAgBA1QgFCEg7BZQgMASgQAJQgJAFgIAAQgIAAgHgEg");
	this.shape_2.setTransform(-12.2522,208.4518,1.9355,1.9355);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AhJHlQgegGgQgfQgNgZAAgjQgBgOAFgLIAFgHQgEgKgEgXQgHgkgBgTQgCgfAFgYQAIgeAUgUQgkhDAkhWQgtgngNg/QgMg0AJhKIALhJQAIgnARgdIAshMQAcgmAlgIQAbgHAiAHQAYAFAkAPQAbAJANANIAMAGIAZACIgEBhQgDAhgIAdQgcBehOAbIgXCiIBMBbIgGAoQgKArgTASQAQAnAFAdQAHAmgLAeQgGAWgRARQAAAOgLATQgQAbgZATQgZATgdAHQgMADgKAAIgKgBg");
	this.shape_3.setTransform(-0.0273,93.992,1.9355,1.9355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.6,0,67.2,255.6);


(lib.uio79t79t79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDA688").s().p("AhtDVIgFgrQABg6A7icQA2iSASgVQASgVAeALQAiAOANA4QAMA0hbCWIhhCQQgVAfgNAAQgIAAgEgNg");
	this.shape.setTransform(-22.1956,43.6324,1.9357,1.9357);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("AggBsQAShBgCAAQgDgBgRAsIgSAvQgIAVgLgFQgMgEAIgXQAphoAHgkQAFgVgHgGQgEgEgLAkIgPAwIgLAbQgHAPgGgFQgHgGAFgeIAGgdQAmh2AdggQAfgkA9ASQASAFgIBZQgHBOgSBEQgHAYgEAGQgDAEgHgBQgIgBAJgwQAHgtgBABQgGAEgOBXQgFAZgIAHQgEAEgHgCQgFgBAAgJQAAgOAJgrQAQhIgNAXQgFALgVBgIgFAUQgEAKgIACIgCABQgPAAAQg8g");
	this.shape_1.setTransform(-42.7103,100.6162,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.2,0,60.2,133.1);


(lib.uil7t8t78l8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AgoEGQg+gMhFglIg4giIExm+IAgAFQAmALAbAcQBWBXg0DaQgtC6iUAAQgaAAgegGg");
	this.shape.setTransform(13.9204,-34.6763,1.9355,1.9355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#292929").s().p("AhHCsQAEgHADgPIAFgWQAUhAAEgxQAGg7gPg1QgUhLgEgeQgIg8ARgrIgKACQAPgDgDgFIgDgEQAHAAALAHQA8ApApBAQAoA/AMBIQAHAogBA1QgBAggDA/QgCA6AJAdIALAgQAGATgBAOQgngFhhAYQhoAZgfAAQA1h1ALgbg");
	this.shape_1.setTransform(-35.3977,32.4343,1.9355,1.9355);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("Aj5BiQBCmADdAFQBvADBlBSIlxHeg");
	this.shape_2.setTransform(-0.3352,-39.0206,1.9351,1.9351);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#292929").s().p("Ag2F4QgMgDgGgGQgGgFgGgOIgYg0QgLgZgFgOQgHgWACgSQACgjAjgpIAYgbQAPgRAIgLQBAgeAcg7IAKkXQALgTADgLQAFgSgHgNIgKgNIABgfQBHBRAACjQAAA0gHAmIgYCEQgMBMgBA6IgEBUQgDAxAEAjQgfAHgeAAQgmAAgngMg");
	this.shape_3.setTransform(36.4543,-3.045,1.9351,1.9351);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.7,-93.6,123.5,187.2);


(lib.uil7t8lt78lt7l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B73538").s().p("AgpCMQhChNgSghQgFgJABgZQACgfAMghQAhhaBYguIARgEQAWgCASAJQA6AdAHCEQAHCDgXAqQgLAUgNgGIhCgpIABAhQAAAogCAfQgcgggigmg");
	this.shape.setTransform(0.0302,0.0173,1.9355,1.9355);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.1,-40.5,50.3,81.1);


(lib.uil7t8lt78l7l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#897E7D").s().p("AhdFgQgUgSgEgdIAAgMIgBAAIADgQQAWhqAQhnQAaiqgDhSIAAgIIgDgUQgHg8AUgsQAUgtAkgFQAkgEAfAmQAeAnAIA7IABAVIABAAIgBAEQABAygTAkQhJFSgWBSQABAbgOAUQgPAUgYADIgHAAQgVAAgSgPg");
	this.shape.setTransform(-23.0961,71.088,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.2,0,46.2,142.2);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DBB381").s().p("AhViqIBQACIB4FRIjlADg");
	this.shape.setTransform(30.5485,-33.0904,1.9357,1.9357);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E8BF85").s().p("AiOCQIgogLQAGgGAaiCIAAgCIgBgSQAAhBAxguQAxguBFAAQBFAAAxAuQAxAuAABBQAAALgCAJIAAABIACAAIAACkQgOAJgVAFIgBAAQgZAFgiAAQhXAAiPglg");
	this.shape_1.setTransform(-38.2028,3.134,1.9353,1.9353);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8A6945").s().p("Ah/DlQgigeAAgrQAAgPAGgRQAci0gDjLQDIA0BcgUQgqDQg5DKIgDAAQgKAigeAVQgeAWgmAAQguAAghgfg");
	this.shape_2.setTransform(-40.9607,81.558,1.9353,1.9353);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8A6945").s().p("AgxFuIgZgpQgqjQgBjSQAAiIALgyIAAgBQAAgrAhgeQAhgfAtAAQAvAAAhAfQAhAeAAArIgBALIABAAIgBACQgDAVgMATQgoDzgaDKQgNBlgFA0QgQAOgPAAQgTAAgRgTg");
	this.shape_3.setTransform(-51.1131,164.2383,1.9349,1.9349);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#292929").s().p("AAxBlQgygKhhg2IhWgzIAAgBIgBAAQgCgsAJgaIAAgBIABAAQAGgQAKgCIgCADQACAGA4AqQBBAwAlAKQAgAAgdgsIgkguIDOBzQAVAOgFAVQgDALgHAIQgWAVg3AAg");
	this.shape_4.setTransform(-36.2683,265.5463,1.9349,1.9349);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8A6945").s().p("AgEBjQgbgQgfgeIgZgaIAFgVIgTgJQAQADAIhzIBhAAIgFAqQADAtAKAUQAFAJAEABIBBAvQgNBDgrAAQgVAAgdgRg");
	this.shape_5.setTransform(-50.5326,249.5672,1.9349,1.9349);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A63A36").s().p("AApClIg8gmQhOiWAYhUQAHgbARgQIAPgLIAQgEQATgCARAIQA3AbAGB7QAGB6gVAnQgJAPgJAAIgFgCg");
	this.shape_6.setTransform(-39.2164,-208.7653,1.9355,1.9355);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#9C3635").s().p("AgsA7QgDgkAAhHIAAhyIBUB4QAIALACAHQAFARgSAdIg9BuIAFAfQgRgsgFg8g");
	this.shape_7.setTransform(-41.5149,-188.5253,1.9355,1.9355);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#7D5C40").s().p("AAnBOQgzgKgugnQgagVgThVIAGgEIB/BJQBzBKhAAPIgMABQgNAAgRgEg");
	this.shape_8.setTransform(-14.4201,-270.1221,1.9355,1.9355);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#8C3432").s().p("AgzAgQhJgLhRgQIhBgNQgDgMALgOIALgMQDLAuCogQQBVgIAsgSQATAQADAbQABAOgCALQguAVhbAAQhMAAhsgPg");
	this.shape_9.setTransform(-6.6712,-80.7306,1.9355,1.9355);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8A6945").s().p("AgWBwQgagJgbgTIgWgRQAOgPgJhXIgMhUQAHgLBhAuQAvAXAvAZQgGAOARBeQgeAygyAAQgWAAgZgKg");
	this.shape_10.setTransform(-12.0578,-259.605,1.9355,1.9355);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A63A36").s().p("AgpGiQhFgJhLgPIg8gNQgegXAShEIAYhBQAgg5AEhGIgdmjIBxhqQAaAXBWgJQApgEAmgJQATgEAkAQQASAJAOAJQALAmAyBsQAhA9glDIQgSBlgZBZQAlBqAcA5QAOAdAHAHQg2AchqAAQhAAAhSgKg");
	this.shape_11.setTransform(-7.7824,-163.5711,1.9355,1.9355);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E8BF85").s().p("AAuE7IlhgoQgpgJAmkhIAvkhQADgEAdAFQAiAGAGAAQBvAXC5gCQBdgBBHgGQANAaAYDAQAaDVgDCGQjIAghPAJg");
	this.shape_12.setTransform(-8.6552,-22.3423,1.9355,1.9355);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#8C3432").s().p("Ag+CYQgWgnAHh6QAGh7A2gbQARgIATACQAKABAGADIAPALQARAQAIAbQAXBUhOCWIg8AmIgFACQgJAAgIgPg");
	this.shape_13.setTransform(15.0808,-210.7975,1.9355,1.9355);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#AB8F67").s().p("AiOCnIgBgBIgngFQAGgHAHiEIAAgCIgDgTQgJg/Arg0QArg0BEgJQBEgJA3AnQA3AnAIBBQACALgBAJIAAABIACAAIAVCjQgMAKgVAIIAAAAQgxARhUAAQhDAAhcgLg");
	this.shape_14.setTransform(22.3247,-15.5004,1.9353,1.9353);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#795D47").s().p("AhRDrQglgagFgqQgCgRADgQQAFi0gdjLQBNAKBDABQBhACA0gTQgPDegdDGIgEAAQgGAigbAZQgbAagmAFIgQABQgkAAgegVg");
	this.shape_15.setTransform(22.9537,65.4584,1.9353,1.9353);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#795D47").s().p("AgmFvIgagpQgujPgFjSQgDiHAKgzIAAgBQgBgrAggfQAhgfAtgBQAvgBAiAeQAhAeABArIgBALIABAAIgBACQgCAVgMATQgkD0gWDKQgKBlgEA0QgRAPgPAAQgSAAgRgSg");
	this.shape_16.setTransform(19.974,146.925,1.9349,1.9349);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#292929").s().p("AAzBkQgzgKhig0IhXgxIAAgBQgEgsAJgaIAAgBQAGgQAKgCIgBADQACAFA5ApQBBAvAmAKQAggBgegsIglgtICgBUIAwAcQAVANgFAVQgCALgHAIQgWAVg2ABg");
	this.shape_17.setTransform(37.5028,248.0353,1.9349,1.9349);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#795D47").s().p("AgCBkQgcgQgfgdIgZgZIAEgVIgTgJQAQABAGhyIBhgCIgEArQAEAtAKATQAFAJAEABIBBAuQgMBEgrAAQgWAAgbgQg");
	this.shape_18.setTransform(22.8977,232.0941,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.9,-285.9,147.7,571.8);


(lib.uil7t9t799 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0A988").s().p("AhsCmQAHgCAQgnQAfhNAoi0QAAgMAGgOQAJgYAYgKQAYgLAYAKQAXAKAJAZQAJAZgKAYIgBACIgxBlQg4BzgpBZQgUgMgtgUg");
	this.shape.setTransform(-21.189,38.3671,1.9351,1.9351);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0A988").s().p("AgmBQQAUgwgCgBQgCAAgSAfIgUAiQgIAPgKgFQgKgGAJgRQArhLAJgbQAFgPgFgHQgDgDgNAaIgRAjIgLAUQgHALgGgGQgFgFAGgXIAIgVQAqhYAcgUQAegXA2AZQAPAHgNBFQgMA9gUAzQgHARgFAEQgDADgGgCQgHgDAKgkQAKgigBAAQgEACgHAWIgNAtQgGATgHAEQgDACgHgCQgEgCAAgHQABgLALghQAUg3gOARQgHAIgYBIIgFAPQgFAHgHAAIAAAAQgQAAATgvg");
	this.shape_1.setTransform(-44.9419,94.2413,1.9351,1.9351);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.8,0,61.8,118.9);


(lib.ui79878989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D43539").s().p("AATCzQgzgNhQhxQhQhwAlhDQAMgWAWgOQALgHAIgDQBdgaBcBBQAvAhAfApQARAegaBXQgMAsgRAmQgWgYgKgOIgGgKIgdBNQgHAMgQAAQgGAAgIgCg");
	this.shape.setTransform(32.4341,34.939,1.9357,1.9357);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("AByDxQgagFiXiuIiSirQAVgJAIhAIAEg/IFpGFQAIAJAKAYQAMAegHAPQgJARgaAFQgLACgLAAQgRAAgUgFg");
	this.shape_1.setTransform(83.2709,66.2288,1.9357,1.9357);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124,113.9);


(lib.ut79t79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#923933").s().p("AAIFoQgWgNgKgbIgEgMIgBAAIAAgRQgChogIhsQgMisgVhPIgCgHIgIgTQgUg4AKgwQAKgxAigMQAigNAmAfQAnAfAUA4IAGATIABABIAAAEQAMAwgLAoQAEFqgCBFIgBAAQAHAZgKAXQgLAXgWAIQgKAEgKAAQgOAAgOgIg");
	this.shape.setTransform(-0.0116,71.1528,1.9355,1.9355);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,0,37.3,142.3);


(lib.ouiy7897y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE4339").s().p("AidhFIgBgBQgVgVgCgbQgCgbASgSQASgSAbABQAbACAVAUQAKAJAGANQByChBKAyQAlAYANgIQgiAjgyA3QiHh+h4h8g");
	this.shape.setTransform(35.2541,34.976,1.9354,1.9354);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A8845F").s().p("AAaBiQgtg6gGAAQgBAAAYAeQAYAfgFAFQgFAEgFgBQgFgDgOgOQgpgqglg3Qgqg/ALgMQAogsAoALQAjAKBMBGIARATQAQATgDAIQgDAHgLgIIgUgOIgfgdQgXgVgCAEQgCAIALANQAWAZBIA4QAQAOgHAJQgHAJgOgMIghgaQgggYgBABQgCABAoAoQAnAogQAFQgHACgHgFIgMgNQg8hAgEgCQgUgMAqAvQAZAbAGALQADAGgEAEQgDAEgEAAQgKAAgPgSg");
	this.shape_1.setTransform(78.452,80.2866,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,102.5,102.8);


(lib.o8yt98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AhTA4QANgeAPgSIAbgiQAPgVABgSIAAAHQAGgFAJgKIAPgQQAPgNATgEQATgEASAGIAGARQADAKgEAHIgIATQgGALgEAHQgSAZgTAnQgWAtgEAZQAAgTgEghIgHg0QgRARgfAnQgfAmgSASQgBgUANghg");
	this.shape.setTransform(-18.6211,21.0327,1.9355,1.9355);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.2,0,37.2,42.1);


(lib.o7y9y789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AAxBLQg6gGhAgTQhIgVAAgRQADg6AlgRQAhgPBoAEIAZAEQAZAFACAIQADAIgOABIgZAAIgqgBQgegCABAEQADAIASADQAeAFBdgDQAVAAAAAMQABALgTAAIgqABQgnACgBACQAAACA4AEQA3AFgIAOQgEAHgJAAIgRgCQhVgLgHACQgYADA/AJQAlAFALAFQAHACgBAFQAAAHgEADQgIAEgVgEQhJgOgEADQgCABAmAIQAoAIgBAHQgBAGgEACIgKABIgRgBg");
	this.shape.setTransform(105.4373,26.5409,1.9354,1.9354);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0CDC5").s().p("AheBdQgLgCgGgJQgHgJACgLQACgLAIgHIC1iDQAJgGALACQALABAGAJQAHAJgCALQgCALgJAHIi0CDQgHAFgJAAIgEAAg");
	this.shape_1.setTransform(122.1351,17.9433,1.9354,1.9354);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#897E7D").s().p("AiUAvIgCAAQgcgCgTgUQgTgTACgYQACgaAVgQQAWgQAdACQAOABANAGQDAAxBXgJQAsgFAGgPQgEAwgDBKQi+gKingSg");
	this.shape_2.setTransform(41.684,18.9562,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,144.9,41.2);


(lib.lylt678l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AAnBNQgygKgugmQgOgMgPgnQgJgZgGgcIAGgEIB9BHQBwBKg+AOIgLAAQgNAAgRgDg");
	this.shape.setTransform(-11.9554,-267.9176,1.9357,1.9357);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B289").s().p("AgVBvQgbgKgagTIgVgQQAOgPgKhVIgLhTQAHgLBfAtQAuAXAvAYQgEAJAGAxIAIAxQgeAxgxAAQgWAAgXgJg");
	this.shape_1.setTransform(-9.587,-257.5239,1.9357,1.9357);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("AgsBiIg9g1QAPgPgKhaIgMhYQAHgLBkAvQAyAYAwAaQgDAJAHA1IAIAyQALAtgEAWQgIAigrAAQglAAhEg1g");
	this.shape_2.setTransform(-8.8838,-253.1019,1.9357,1.9357);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#444444").s().p("AAAA2IA6kCIgbEhIhYB4g");
	this.shape_3.setTransform(18.4802,-28.4592,1.9357,1.9357);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#535454").s().p("AgBCtQhCgJhLgUIgBAAIgngLQAIgHAYiAIgBgVQAAhBAxguQAxguBEAAQBGAAAxAuQAxAuAABBQAAAKgBALIAAAAIABAAIAACkQgMAJgXAFQgZAFggAAQgoAAg0gIg");
	this.shape_4.setTransform(-38.0627,0.6855,1.9353,1.9353);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3B289").s().p("AiADmQghgfAAgrQAAgQAGgQQAbivgBjQQBLAUBBAJQBhAPA2gMQgrDUg4DHIgEgBQgKAigdAVQgeAWgmAAQgvAAghgeg");
	this.shape_5.setTransform(-40.8205,79.1697,1.9353,1.9353);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B289").s().p("AgxFuIgZgpQgqjQgBjSQAAiIALgyIAAgBQAAgrAhgeQAhgfAtAAQAvAAAhAfQAhAeAAArIgBALIABAAIgBADQgDAVgMASQgoD0gaDJQgNBlgFA0QgRAOgPAAQgSAAgRgTg");
	this.shape_6.setTransform(-51.0749,161.8085,1.9349,1.9349);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AAxBlQgygKhhg2IhXgzQgCgtAJgaIAAgBIAAAAQAGgQAKgCIgBADQAAAEA6AsQBBAvAlALQAgAAgdgtIglgtIDOBzQAVAOgFAVQgCALgHAIQgWAVg3gBg");
	this.shape_7.setTransform(-36.2323,263.1545,1.9349,1.9349);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D3B289").s().p("AgEBjQgbgQgfgeIgZgaIAFgUIgTgKQAQADAIhzIBhAAIgFAqQADAuAKATQAFAJAEABIBBAvQgNBDgrAAQgVAAgdgRg");
	this.shape_8.setTransform(-50.5428,247.1755,1.9349,1.9349);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#535454").s().p("AiKCPQgHgEhdjBIAmhWIARADIAABqIBLgXIAAhNIAjAAIAABNIBEBAICGgpIgVhkIAnAAIAIBkIAfgLIAAhgIAQgFIAkCnIi6A9QixA7gMAAIgBgBg");
	this.shape_9.setTransform(-2.5493,-62.1445,1.9353,1.9353);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7B7272").s().p("AApClIg8gmQhOiWAXhUQAIgaARgRQAIgIAHgDIAQgEQATgCARAIQA2AbAGB8QAHB6gWAmQgIAPgJAAIgFgCg");
	this.shape_10.setTransform(-39.1205,-211.2413,1.9353,1.9353);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#7B7272").s().p("AgsA7QgDglAAhFIAAhzIBUB3QAHALADAHQAFASgSAeIg9BtIAFAfQgRgsgFg8g");
	this.shape_11.setTransform(-41.3973,-190.9545,1.9353,1.9353);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#313131").s().p("AgzAuIjbgXQgDgNALgeIALgdQDMAuCogRQBUgIAsgSQATARADAcQACANgCALQg+AbiJAAQg4AAhDgEg");
	this.shape_12.setTransform(-6.5651,-82.5324,1.9353,1.9353);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#4E6145").s().p("AAaG0IhUgVQAxmMhGj7QgWhPgfg3IgbgnQAyggArgBQAegBBQAJQA9AFAMCrQAFBVgHBVQAcBvALDNQAGBnAABQQgdAZg3AAQgXAAgbgEg");
	this.shape_13.setTransform(-5.4523,-167.9292,1.9353,1.9353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#7B7272").s().p("AgpGiQhFgJhLgPIg9gNQgdgXAShEIAYhBQAgg5AEhGIgDg7Ig5mcICPg2QAbAXBVgIQAqgEAlgJQAUgFAkAQQASAJANAJQAMAmAxBsQAiA9glDIQgTBlgZBZQAlBqAdA5QAOAdAHAHQg2AchqAAQhAAAhSgKg");
	this.shape_14.setTransform(-7.6606,-166.0091,1.9353,1.9353);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#535454").s().p("AAvE7IlignQgpgKAmkhIAvkgQAEgFAcAGQAjAGAFgBQBvAYC5gCQBegBBHgGQAMAaAYC/QAaDWgDCFQjIAghPAJg");
	this.shape_15.setTransform(-8.5817,-24.8085,1.9353,1.9353);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#6E6263").s().p("Ag/CYQgVgmAGh6QAHh7A2gbQAagOAaALIAPAMQARAQAHAaQAYBVhOCWIg8AmIgFABQgJAAgJgPg");
	this.shape_16.setTransform(15.1694,-213.3273,1.9353,1.9353);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#535454").s().p("AABCyQhBgBhNgKIgCAAIgngGQAHgJAGiCIABgCIgEgTQgIg/Aqg0QArg0BEgJQBEgJA3AnQA3AnAIBBIABAVIAAAAIACAAIAVCjQgNALgUAHQgvARhXAAIgPAAg");
	this.shape_17.setTransform(22.4649,-17.9897,1.9353,1.9353);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B49675").s().p("AhQDrQglgagGgrQgCgQADgQQAFi0gdjMQBOAKBCABQBhACA0gSQgPDegdDFIgEAAQgGAjgaAZQgcAagmAFIgQABQgkAAgdgVg");
	this.shape_18.setTransform(23.0455,63.0701,1.9353,1.9353);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#B49675").s().p("AgmFvIgagpQgujPgFjSQgDiHAKgzIAAgBQAAgqAgggQAggfAugBQAuAAAiAdQAhAeABArIAAALIAAAAIgBACQgCAVgLATQgkD1gWDJQgLBlgEA0QgRAPgPAAQgSAAgRgSg");
	this.shape_19.setTransform(19.9638,144.4872,1.9349,1.9349);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#292929").s().p("AAzBjQgzgJhhg1IhYgxIAAAAQgEgsAJgaIAAgCIABABQAFgQAKgCIgBACQAAAEA7AqQBBAwAmAJQAgAAgegsIglgtIDQBvQAVANgEAWQgDALgGAIQgWAVg3ABg");
	this.shape_20.setTransform(37.525,245.6919,1.9349,1.9349);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#B49675").s().p("AgCBkQgbgQgggdIgZgZIADgVIgSgJQAPACAHhzIBhgCIgFArQAFAtAKATQAEAJAFABIBBAuQgMBEgrAAQgVAAgcgQg");
	this.shape_21.setTransform(22.9358,229.654,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.9,-283.5,147.7,566.9);


(lib.jlt678lt78l78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6E6263").s().p("AAIFoQgXgNgKgbIgDgMIgBAAIAAgRQgKlRghh9IgCgIQgFgLgDgIQgUg4AKgwQAKgxAigMQAigNAmAfQAmAfAUA4IAHAUIABAAIAAAEQAMAxgLAnQAEFqgDBFQAHAZgLAXQgKAXgWAIQgKAEgJAAQgPAAgOgIg");
	this.shape.setTransform(0.0211,71.1673,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,0,37.3,142.4);


(lib.iop8y8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0CDC5").s().p("AgRBTQgIgIAAgKIAAiBQAAgKAIgIQAHgHAKAAQAKAAAIAHQAHAIAAAKIAACBQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape.setTransform(160.2112,-82.0596,1.9353,1.9353);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0CDC5").s().p("AgSCDQgIgHAAgMIAAjfQAAgLAIgIQAIgIAKAAQALAAAIAIQAIAIAAALIAADfQAAALgIAIQgIAIgLAAQgKAAgIgIg");
	this.shape_1.setTransform(139.6966,-84.9142,1.9353,1.9353);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C34172").s().p("AhvAiQgDgNAQgJQAJgEAJgCIAbgFQAegDANgBQAMAAAJgLIAKgUQADgIAZgIIAYgGIAnASQgdAIgQAQIgSAXQgIAKgOAEQgOAFgiAEQgcADgIALIgCALg");
	this.shape_2.setTransform(-13.1585,-71.6087,1.9353,1.9353);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJQAJgEAJgCIAcgFQAegDANgBQAMAAAIgLIAKgUQADgIAZgIIAYgGIAnASQgdAIgQAPIgSAYQgIAKgOAEQgOAEgiAEQgcAEgIALIgCALg");
	this.shape_3.setTransform(12.5816,-66.7703,1.9353,1.9353);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8A3042").s().p("AhuAiQgEgNARgJQAIgEAJgCIAcgFQAegDANgBQAMAAAIgLIAKgUQADgIAZgIIAYgGIAnASQgdAIgQAPIgSAYQgIAKgOAEQgOAEgiAEQgcAEgIALIgCALg");
	this.shape_4.setTransform(2.3727,-67.1574,1.9353,1.9353);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FBE295").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAIgJARgCIAggGQAQgCAPAFQAPAFAFALIAcA8QAEAKgJAJQgJAKgRACIgfAFIgKAAQgLAAgKgDg");
	this.shape_5.setTransform(11.8184,-100.2035,1.9353,1.9353);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CD9B3C").s().p("AgeA9QgPgGgFgKIgfhFQgFgKAJgJQAJgIARgDIAzgIQAQgCAPAEQAPAGAFAKIAfBFQAFAJgJAKQgJAIgRADIgzAIIgKABQgLAAgKgDg");
	this.shape_6.setTransform(14.4311,-100.1067,1.9353,1.9353);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E4BE4D").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAJgJARgDIAfgEQAQgDAPAFQAPAFAFAKIAcA9QAEAKgJAJQgIAJgRACIggAGIgKAAQgLAAgKgDg");
	this.shape_7.setTransform(-6.0836,-99.5261,1.9353,1.9353);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E0A93B").s().p("AgeA9QgPgGgFgKIgfhFQgFgJAJgJQAJgKARgCIAzgIQAQgCAPAEQAPAFAFALIAfBFQAFAJgJAKQgJAIgRADIgzAIIgKABQgLAAgKgDg");
	this.shape_8.setTransform(-3.4709,-99.4293,1.9353,1.9353);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FBE295").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAJgJARgDIAfgFQAQgCAPAFQAPAFAFAKIAcA9QAEAKgJAJQgIAJgRADIggAFIgKABQgLAAgKgEg");
	this.shape_9.setTransform(-22.6308,-98.8003,1.9353,1.9353);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD9B3C").s().p("AgeA8QgPgEgFgKIgfhFQgFgKAJgJQAJgKARgCIAzgIQAQgCAPAEQAPAFAFALIAfBEQAFAKgJAKQgJAIgRADIgzAIIgKABQgLAAgKgEg");
	this.shape_10.setTransform(-20.0181,-98.752,1.9353,1.9353);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQAAAFgIAEQgGADgHAAIgCAAg");
	this.shape_11.setTransform(85.566,-91.6395,1.9353,1.9353);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAFgBAFIgCAIQgBAGgHADQgFADgHAAIgDAAg");
	this.shape_12.setTransform(57.8411,-105.5586,1.9353,1.9353);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FEDF8E").s().p("AgCARQgJAAgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQAAAFgIAEQgFADgHAAIgDgBg");
	this.shape_13.setTransform(57.2132,-92.2531,1.9353,1.9353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQAAAFgIAEQgGADgHAAIgCAAg");
	this.shape_14.setTransform(80.3406,-101.2195,1.9353,1.9353);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_15.setTransform(101.3272,-105.187,1.9353,1.9353);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FEDF8E").s().p("AgHAQQgHgCgEgFIgFgJQgDgEAFgFQAEgFAIgCQAJgCAIADQAHACADAFIAGAIQADAFgEAFQgFAFgJACIgGAAQgEAAgGgBg");
	this.shape_16.setTransform(73.7979,-93.2194,1.9353,1.9353);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FEDF8E").s().p("AgCAYQgHgBgEgGIgPgYQgCgGAEgEQAEgFAIgCQAJgCAIADQAHACADAFIAQAZQACAFgEAFQgEAEgJACIgHABIgJgCg");
	this.shape_17.setTransform(93.0547,-98.752,1.9353,1.9353);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FEDF8E").s().p("AgSAYQgIgCgDgFQgDgFADgFIAUgYQAEgFAHgCQAJgBAIACQAIACADAFQAEAFgEAFIgUAYQgDAFgIACIgIABIgJgCg");
	this.shape_18.setTransform(69.8062,-104.6793,1.9353,1.9353);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FBB988").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_19.setTransform(71.582,-74.392,1.9349,1.9349);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#86C54D").s().p("AgfAQQgNgGAAgKQAAgIANgHQAOgHARAAQATAAANAHQAOAHAAAIQAAAKgOAGQgNAHgTAAQgSAAgNgHg");
	this.shape_20.setTransform(72.3076,-73.5213,1.9349,1.9349);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FBB988").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAGADABAEQgBAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_21.setTransform(102.6851,-69.5549,1.9349,1.9349);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_22.setTransform(103.4107,-68.6842,1.9349,1.9349);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FBB988").s().p("AgPAIQgGgDgBgFQABgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_23.setTransform(96.1066,-76.1334,1.9349,1.9349);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgIANgHQANgHASAAQATAAANAHQANAHAAAIQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_24.setTransform(96.8321,-75.2627,1.9349,1.9349);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFDF87").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_25.setTransform(56.2965,-69.5549,1.9349,1.9349);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#ED7937").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgOAHgSAAQgSAAgNgHg");
	this.shape_26.setTransform(57.0221,-68.6842,1.9349,1.9349);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFDF87").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAHADAAAEQAAAFgHADQgHADgJAAQgJAAgGgDg");
	this.shape_27.setTransform(85.0778,-70.9093,1.9349,1.9349);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#ED7937").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgHASAAQATAAANAHQAOAHAAAIQAAAKgOAGQgNAHgTgBQgSABgNgHg");
	this.shape_28.setTransform(85.8517,-69.9902,1.9349,1.9349);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F4D582").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAHADAAAEQAAAFgHADQgHADgJAAQgJAAgGgDg");
	this.shape_29.setTransform(83.3364,-62.1056,1.9349,1.9349);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQAOAGAAAJQAAAJgOAHQgOAHgSAAQgRAAgOgHg");
	this.shape_30.setTransform(84.1103,-61.2349,1.9349,1.9349);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F4D582").s().p("AgPAIQgGgDgBgFQABgEAGgDQAHgDAIAAQAKAAAGADQAGADAAAEQAAAFgGADQgGADgKAAQgIAAgHgDg");
	this.shape_31.setTransform(93.8814,-63.46,1.9349,1.9349);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgHASAAQATAAANAHQANAHAAAIQAAAKgNAGQgNAHgTAAQgSAAgNgHg");
	this.shape_32.setTransform(94.607,-62.5893,1.9349,1.9349);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_33.setTransform(101.425,-72.8667,1.9353,1.9353);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQAOAGAAAJQAAAJgOAHQgNAHgTAAQgSAAgNgHg");
	this.shape_34.setTransform(102.1508,-72.0441,1.9353,1.9353);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_35.setTransform(55.4605,-63.2867,1.9353,1.9353);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQAOgHARAAQATAAAOAHQAMAHABAIQgBAKgMAGQgOAHgTAAQgSAAgNgHg");
	this.shape_36.setTransform(56.1863,-62.4158,1.9353,1.9353);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F4D582").s().p("AgPAIQgGgEAAgEQAAgEAGgDQAHgEAIABQAJgBAHAEQAGADAAAEQAAAEgGAEQgHAEgJgBQgIABgHgEg");
	this.shape_37.setTransform(84.6843,-76.3987,1.9353,1.9353);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGABAJQgBAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_38.setTransform(85.41,-75.5278,1.9353,1.9353);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F4D582").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAHADAAAEQAAAFgHADQgHADgJAAQgJAAgGgDg");
	this.shape_39.setTransform(71.1852,-66.7703,1.9353,1.9353);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#D26D3A").s().p("AgfAQQgOgGAAgKQAAgIAOgHQAOgHARAAQASAAAOAHQAOAHAAAIQAAAKgOAGQgNAHgTAAQgSAAgNgHg");
	this.shape_40.setTransform(71.9594,-65.8994,1.9353,1.9353);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F4D582").s().p("AgPAIQgGgEAAgEQAAgEAGgDQAHgEAIABQAJgBAHAEQAGADAAAEQAAAEgGAEQgHAEgJgBQgIABgHgEg");
	this.shape_41.setTransform(59.428,-75.5278,1.9353,1.9353);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQAOAGAAAJQAAAJgOAHQgNAHgTAAQgSAAgNgHg");
	this.shape_42.setTransform(60.1537,-74.6569,1.9353,1.9353);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#888781").s().p("AiEBEQgcAAgUgUQgUgUAAgcQAAgbAUgUQAUgTAcAAIEKAAQAcAAATATQAUAUAAAbQAAAcgUAUQgTAUgcAAg");
	this.shape_43.setTransform(-2.1645,-98.4616,1.9353,1.9353);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#666561").s().p("AiIBPQghAAgXgXQgXgXAAghQAAgfAXgYQAXgXAhAAIERAAQAhAAAXAXQAXAYAAAfQAAAhgXAXQgXAXghAAg");
	this.shape_44.setTransform(0.7869,-100.6873,1.9353,1.9353);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#B84438").s().p("AhjBDQgcAAgUgTQgUgUAAgcQAAgbAUgUQAUgUAcAAIDHAAQAcAAAUAUQAUAUAAAbQAAAcgUAUQgUATgcAAg");
	this.shape_45.setTransform(79.2653,-98.752,1.9353,1.9353);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#666561").s().p("AhkBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIDJAAQAhAAAXAXQAYAXAAAgQAAAhgYAXQgXAXghAAg");
	this.shape_46.setTransform(81.7329,-101.026,1.9353,1.9353);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#888781").s().p("AiDA8QgYAAgSgSQgRgRAAgZQAAgYARgRQASgSAYAAIEGAAQAZAAASASQARARAAAYQAAAZgRARQgSASgZAAg");
	this.shape_47.setTransform(-1.8742,-67.109,1.9353,1.9353);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#666561").s().p("AiGBGQgdAAgVgUQgVgVABgdQgBgcAVgVQAVgUAdAAIENAAQAdAAAVAUQAUAVABAcQgBAdgUAVQgVAUgdAAg");
	this.shape_48.setTransform(0.9321,-69.0927,1.9353,1.9353);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#888781").s().p("AhrA8QgYAAgSgSQgSgRAAgZQAAgYASgRQARgSAZAAIDXAAQAZAAARASQASARAAAYQAAAZgSARQgRASgZAAg");
	this.shape_49.setTransform(79.2653,-67.109,1.9353,1.9353);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#666561").s().p("AhtBGQgdAAgVgUQgUgVAAgdQAAgcAUgVQAVgUAdAAIDbAAQAeAAAUAUQAUAVABAcQgBAdgUAVQgUAUgeAAg");
	this.shape_50.setTransform(81.7329,-69.0927,1.9353,1.9353);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#D0CDC5").s().p("AkKCyQhJAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BJAAIIVAAQBJAAA0A0QA0A0AABJQAABKg0A0Qg0A0hJAAg");
	this.shape_51.setTransform(37.6553,-86.2206,1.9353,1.9353);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#6B6A65").s().p("AkKCyQhJAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BJAAIIVAAQBJAAA0A0QA0A0AABJQAABKg0A0Qg0A0hJAAg");
	this.shape_52.setTransform(37.6553,-82.7369,1.9353,1.9353);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F9FAFA").s().p("AkKCyQhJAAg0g0Qg0g1AAhJQAAhJA0g0QA0g0BJAAIIVAAQBJAAA0A0QA0A0AABJQAABJg0A1Qg0A0hJAAg");
	this.shape_53.setTransform(37.6553,-88.1559,1.9353,1.9353);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#D0CDC5").s().p("AgRBTQgIgIAAgLIAAiAQAAgLAIgHQAIgIAJAAQALAAAHAIQAIAHAAALIAACAQAAALgIAIQgHAIgLgBQgJABgIgIg");
	this.shape_54.setTransform(-43.0487,-82.9789,1.9353,1.9353);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#C34172").s().p("AhuAiQgEgNARgJIARgGIAcgFQAegDANgBQAMAAAIgLIAKgVQADgHAZgIIAYgGIAnASQgdAIgQAPQgJAJgJAPQgIAJgOAFQgOAEgiAEQgcAEgIALQgEAGACAFg");
	this.shape_55.setTransform(-216.4185,-72.4796,1.9353,1.9353);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIARgGIAcgFQAegEANAAQANAAAHgLIAKgVQAEgHAZgIIAYgGIAnATQgdAHgQAPIgSAYQgIAJgPAFQgNAEgiAFQgdADgIALQgDAGABAFg");
	this.shape_56.setTransform(-190.6299,-67.6896,1.9353,1.9353);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIASgHIAbgEQAegDANgBQANgBAHgKIAKgUQAEgJAZgHIAYgGIAnASQgdAIgQAPQgJAKgJAOQgIAJgPAFQgNAEgiAEQgdAEgIALQgDAGABAFg");
	this.shape_57.setTransform(-200.8873,-68.0767,1.9353,1.9353);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FBE295").s().p("AgWA3QgQgFgEgKIgcg9QgEgKAJgJQAIgJASgDIAegFQAQgCAQAFQAPAFAFAKIAbA9QAFAKgJAJQgJAJgQADIggAFIgKABQgLAAgKgEg");
	this.shape_58.setTransform(-191.4416,-101.1227,1.9353,1.9353);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CD9B3C").s().p("AgeA9QgPgGgFgKIgfhFQgFgKAJgJQAJgJARgCIAzgIQAQgDAPAFQAPAGAFAKIAfBEQAFAKgJAKQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_59.setTransform(-188.8772,-101.026,1.9353,1.9353);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#E4BE4D").s().p("AgWA3QgPgFgEgKIgcg9QgFgKAJgJQAIgJARgDIAggFQAQgCAPAFQAPAFAEAKIAcA9QAFAKgJAJQgIAJgSADIgfAFIgKABQgLAAgKgEg");
	this.shape_60.setTransform(-209.3435,-100.4454,1.9353,1.9353);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#E0A93B").s().p("AgeA9QgPgFgFgLIgfhEQgFgKAJgKQAJgIARgDIAzgIQAQgCAPAFQAQAFAEAKIAfBEQAFAKgJAJQgJAKgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_61.setTransform(-206.7792,-100.397,1.9353,1.9353);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FBE295").s().p("AgWA3QgPgFgEgKIgcg9QgFgKAJgJQAIgJARgDIAggEQAQgDAPAFQAPAFAFAKIAbA9QAFAKgJAJQgIAJgRADIgfAFIgLAAQgLAAgKgDg");
	this.shape_62.setTransform(-225.8908,-99.7478,1.9353,1.9353);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#CD9B3C").s().p("AgeA9QgPgGgFgKIgfhEQgFgKAJgJQAJgKARgCIAzgIQAQgDAPAFQAQAGAEAKIAfBEQAFAKgJAKQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_63.setTransform(-223.3264,-99.6712,1.9353,1.9353);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FEDF8E").s().p("AgCARQgJAAgGgEQgGgEABgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgGAAIgDgBg");
	this.shape_64.setTransform(-117.6575,-92.5434,1.9353,1.9353);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_65.setTransform(-145.4189,-106.445,1.9353,1.9353);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgGIACgIQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_66.setTransform(-146.0479,-93.1878,1.9353,1.9353);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAFgBAFIgCAIQgBAGgHADQgGADgHAAIgCAAg");
	this.shape_67.setTransform(-122.8829,-102.1872,1.9353,1.9353);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FEDF8E").s().p("AgCARQgJAAgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQAAAFgIAEQgFADgHAAIgDgBg");
	this.shape_68.setTransform(-101.9692,-106.0908,1.9353,1.9353);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FEDF8E").s().p("AgGAQQgIgCgDgFIgGgJQgCgEAEgFQAEgFAIgCQAJgCAHADQAIACADAFIAFAIQADAGgEAEQgEAFgIACIgIABIgIgCg");
	this.shape_69.setTransform(-129.4791,-94.1555,1.9353,1.9353);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FEDF8E").s().p("AgCAYQgIgCgDgFIgOgZQgDgFAEgEQAEgFAJgCQAIgCAIADQAIACADAFIAOAZQADAFgEAFQgEAEgJACIgGABQgFAAgFgCg");
	this.shape_70.setTransform(-110.2053,-99.6712,1.9353,1.9353);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FEDF8E").s().p("AgSAYQgIgCgDgFQgDgFAEgFIATgYQAEgFAHgCQAJgBAIACQAIACADAFQAEAFgEAFIgTAYQgEAFgIABIgIABIgJgBg");
	this.shape_71.setTransform(-133.4926,-105.5879,1.9353,1.9353);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FBB988").s().p("AgPAIQgGgDgBgFQABgEAGgDQAHgDAIAAQAKAAAGADQAGADAAAEQAAAFgGADQgGAEgKAAQgIAAgHgEg");
	this.shape_72.setTransform(-131.6283,-75.3111,1.9349,1.9349);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAGgTABQgSgBgNgGg");
	this.shape_73.setTransform(-130.9027,-74.4404,1.9349,1.9349);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FBB988").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAHADAAAEQAAAFgHADQgHADgJAAQgJAAgGgDg");
	this.shape_74.setTransform(-100.5735,-70.5223,1.9349,1.9349);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#86C54D").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASABQATgBANAHQAOAGAAAJQAAAJgOAHQgNAHgTAAQgSAAgNgHg");
	this.shape_75.setTransform(-99.7996,-69.6032,1.9349,1.9349);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FBB988").s().p("AgPAIQgGgEAAgEQAAgEAGgDQAHgDAIgBQAJABAHADQAGADAAAEQAAAEgGAEQgHAEgJAAQgIAAgHgEg");
	this.shape_76.setTransform(-107.1037,-77.0525,1.9349,1.9349);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgGASAAQATAAANAGQAOAGAAAJQAAAJgOAHQgNAGgTABQgSgBgNgGg");
	this.shape_77.setTransform(-106.3782,-76.1818,1.9349,1.9349);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFDF87").s().p("AgPAIQgHgDAAgFQAAgEAHgDQAHgDAIAAQAKAAAGADQAHADgBAEQABAFgHADQgGADgKAAQgIAAgHgDg");
	this.shape_78.setTransform(-146.9138,-70.5223,1.9349,1.9349);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#ED7937").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_79.setTransform(-146.1882,-69.6032,1.9349,1.9349);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFDF87").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_80.setTransform(-118.1325,-71.78,1.9349,1.9349);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#ED7937").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgGASAAQATAAANAGQANAGAAAJQAAAJgNAHQgNAGgTABQgSgBgNgGg");
	this.shape_81.setTransform(-117.407,-70.9576,1.9349,1.9349);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_82.setTransform(-119.8739,-63.073,1.9349,1.9349);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#D26D3A").s().p("AgfAQQgOgGAAgKQAAgIAOgHQAOgHARAAQASAAAOAHQANAHAAAIQAAAKgNAGQgNAHgTAAQgSAAgNgHg");
	this.shape_83.setTransform(-119.1483,-62.2023,1.9349,1.9349);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgEAIABQAJgBAHAEQAGADAAAEQAAAFgGADQgHAEgJgBQgIABgHgEg");
	this.shape_84.setTransform(-109.3288,-64.3791,1.9349,1.9349);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQAOAGgBAJQABAJgOAHQgNAHgTAAQgSAAgNgHg");
	this.shape_85.setTransform(-108.6033,-63.5084,1.9349,1.9349);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#F4D582").s().p("AgPAIQgGgDgBgFQABgEAGgDQAHgDAIAAQAKAAAGADQAGADAAAEQAAAFgGADQgGADgKAAQgIAAgHgDg");
	this.shape_86.setTransform(-101.8349,-73.8343,1.9353,1.9353);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgHASAAQATAAANAHQANAHAAAIQAAAKgNAGQgNAHgTAAQgSAAgNgHg");
	this.shape_87.setTransform(-101.1092,-72.9634,1.9353,1.9353);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#F4D582").s().p("AgPAIQgHgDAAgFQAAgEAHgDQAHgEAIABQAKgBAGAEQAHADgBAEQABAFgHADQgGAEgKgBQgIABgHgEg");
	this.shape_88.setTransform(-147.7995,-64.206,1.9353,1.9353);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#D26D3A").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_89.setTransform(-147.0253,-63.3351,1.9353,1.9353);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#F4D582").s().p("AgPAIQgGgDgBgFQABgEAGgDQAGgDAJAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_90.setTransform(-118.5757,-77.318,1.9353,1.9353);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#D26D3A").s().p("AgfAQQgOgHABgJQgBgJAOgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgOAHgSAAQgSAAgNgHg");
	this.shape_91.setTransform(-117.8016,-76.4471,1.9353,1.9353);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#F4D582").s().p("AgPAIQgGgEAAgEQAAgEAGgDQAHgEAIABQAJgBAHAEQAGADAAAEQAAAEgGAEQgHAEgJgBQgIABgHgEg");
	this.shape_92.setTransform(-132.0748,-67.6896,1.9353,1.9353);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#D26D3A").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_93.setTransform(-131.349,-66.8187,1.9353,1.9353);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#F4D582").s().p("AgPAIQgGgDgBgFQABgEAGgDQAGgDAJAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_94.setTransform(-143.832,-76.4471,1.9353,1.9353);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#D26D3A").s().p("AggAQQgNgHAAgJQAAgJANgGQAOgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgOAHgSAAQgSAAgOgHg");
	this.shape_95.setTransform(-143.0579,-75.5762,1.9353,1.9353);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#888781").s().p("AiEBEQgcgBgUgTQgUgUAAgcQAAgbAUgUQAUgUAcABIEJAAQAcgBAUAUQAUAUAAAbQAAAcgUAUQgUATgcABg");
	this.shape_96.setTransform(-205.4245,-99.3326,1.9353,1.9353);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#666561").s().p("AiIBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIERAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAg");
	this.shape_97.setTransform(-202.4247,-101.6066,1.9353,1.9353);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#B84438").s().p("AhjBEQgcAAgUgUQgUgUABgcQgBgbAUgUQAUgUAcAAIDHAAQAcAAAUAUQAUAUgBAbQABAcgUAUQgUAUgcAAg");
	this.shape_98.setTransform(-123.9947,-99.6712,1.9353,1.9353);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#666561").s().p("AhkBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIDJAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAg");
	this.shape_99.setTransform(-121.5271,-101.8969,1.9353,1.9353);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#888781").s().p("AiCA8QgYAAgTgRQgRgSAAgZQAAgXARgTQATgRAYAAIEFAAQAZAAASARQARATAAAXQAAAZgRASQgSARgZAAg");
	this.shape_100.setTransform(-205.1826,-68.0767,1.9353,1.9353);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#666561").s().p("AiHBGQgcAAgVgUQgUgVAAgdQAAgcAUgVQAVgUAcAAIEPAAQAcAAAVAUQAUAVAAAcQAAAdgUAVQgVAUgcAAg");
	this.shape_101.setTransform(-202.3763,-70.0604,1.9353,1.9353);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#888781").s().p("AhqA8QgZAAgSgRQgRgSAAgZQAAgYARgSQASgRAZAAIDVAAQAZAAASARQARATAAAXQAAAZgRASQgSARgZAAg");
	this.shape_102.setTransform(-123.9947,-68.0767,1.9353,1.9353);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#666561").s().p("AhtBGQgdAAgVgUQgUgVAAgdQAAgcAUgVQAVgUAdAAIDbAAQAdAAAVAUQAUAVAAAcQAAAdgUAVQgVAUgdAAg");
	this.shape_103.setTransform(-121.5271,-70.0604,1.9353,1.9353);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#D0CDC5").s().p("AkJCyQhKAAg0g0Qg0g1AAhJQAAhJA0g0QA0g0BKAAIIUAAQBJAAA0A0QA0A0AABJQAABJg0A1Qg0A0hJAAg");
	this.shape_104.setTransform(-165.6531,-87.0915,1.9353,1.9353);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#6B6A65").s().p("AkJCxQhKAAg0g0Qg0g0AAhJQAAhJA0g0QA0gzBKAAIIUAAQBJAAA0AzQA0A0AABJQAABJg0A0Qg0A0hJAAg");
	this.shape_105.setTransform(-165.6531,-83.6562,1.9353,1.9353);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#F9FAFA").s().p("AkJCyQhKAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BKAAIIUAAQBJAAA0A0QA0A0AABJQAABKg0A0Qg0A0hJAAg");
	this.shape_106.setTransform(-165.6531,-89.1236,1.9353,1.9353);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#D8743A").s().p("A0dD0QguAAgighQghghgBgvIAAkFQABguAhgiQAighAuAAMAo7AAAQAvAAAhAhQAiAigBAuIAAEFQABAvgiAhQghAhgvAAg");
	this.shape_107.setTransform(-0.2502,-76.4237,1.9349,1.9349);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#DFB154").s().p("A0dD0QguAAgighQghgigBguIAAkFQABgvAhghQAighAuAAMAo7AAAQAvAAAhAhQAiAhgBAvIAAEFQABAugiAiQghAhgvAAg");
	this.shape_108.setTransform(-0.2502,-58.6228,1.9349,1.9349);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_109.setTransform(-71.4053,23.4643,1.9349,1.9349);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_110.setTransform(-19.8409,23.4643,1.9349,1.9349);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_111.setTransform(42.0752,23.4643,1.9349,1.9349);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_112.setTransform(105.2488,23.4643,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-275.6,-123.6,550.9000000000001,247);


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
	this.shape.graphics.f("#923933").s().p("Ahzh6IgBgCQgJgbAKgZQAKgaAYgIQAYgJAYANQAYANAJAbQAEAOAAAOQAiDDAtBMQAXAmAPgBIhzAsQhCirg3ilg");
	this.shape.setTransform(23.4413,41.4272,1.9351,1.9351);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#856A4F").s().p("AAkCLQgHgBgEgIIgFgRIgOgtQgLglgDgFQgOgTASA8QAKAjABAMQAAAHgFACQgFACgEgCQgIgFgFgWIgMgwQgGgYgEgCQgBgBAJAmQAJAngHACQgGACgDgEQgFgEgGgUQgTg4gKhBQgKhLAPgGQA3gWAeAbQAbAZAoBgQAQAtgKAJQgGAFgGgMIgLgWIgQgnQgMgdgDADQgFAHAEAQQAJAfAoBTQAJATgLAFQgKAFgIgRIgSgmQgSgjgCAAQgCABATA1QARAzgOAAIgCAAg");
	this.shape_1.setTransform(42.4952,103.3081,1.9351,1.9351);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,59.1,130.2);


(lib.ilt786l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7E6E6").s().p("AgVArIAahYIARAHIgYBUg");
	this.shape.setTransform(-30.5408,-74.6356,1.9354,1.9354);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7E6E6").s().p("AgOAtIAMhaIARAEIgLBXg");
	this.shape_1.setTransform(-17.5739,-71.4422,1.9354,1.9354);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E6E6").s().p("AgMgtIASACIAHBXIgSACg");
	this.shape_2.setTransform(24.0364,-68.5876,1.9354,1.9354);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7E6E6").s().p("AgUgrIASgBIAXBUIgSAGg");
	this.shape_3.setTransform(42.2772,-69.9423,1.9354,1.9354);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#AF3537").s().p("AggApQhFgJhOgQIhBgOIAgg1QBlAqCwgKQBZgFBFgNIADACQAGABAHAdIAGAbQgiAehiAAQg9AAhUgLg");
	this.shape_4.setTransform(7.5375,-73.0493,1.9354,1.9354);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,0,0,4).p("ABIhRIh/AAIgEAsIA7AAQBjAAgBBKQAAAogiAaQggAXgoAAQgrAAgWgRQgZgTAAgqIAmAAQAAATARAJQANAHAVAAQATAAATgMQAWgOAAgUQABgfg+AAIhRABQAAgVADgrQAEgrAAgXICfgCg");
	this.shape_5.setTransform(2.5058,-167.3642,1.9354,1.9354);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#292929").ss(2).p("ABIhRIh/AAIgEAsIA7AAQBjAAgBBKQAAAogiAaQggAXgoAAQgrAAgWgRQgZgTAAgqIAmAAQAAATARAJQANAHAVAAQATAAATgMQAWgOAAgUQABgfg+AAIhRABQAAgVADgrQAEgrAAgXICfgCg");
	this.shape_6.setTransform(2.5058,-167.356,1.9354,1.9354);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AF3537").s().p("AhJBtQgZgTAAgqIAmAAQAAATARAJQANAHAVAAQATAAATgMQAXgOAAgUQAAgfg+AAIhRABQAAgVADgrQAEgrAAgXICfgCIgDAsIh/AAIgEAsIA7AAQBjAAgBBKQAAAogiAaQggAXgoAAQgrAAgWgRg");
	this.shape_7.setTransform(2.5058,-167.3395,1.9354,1.9354);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#343433").ss(1,0,0,4).p("ABIhRIh/AAIgDAsIA7AAQBiAAAABKQAAAogjAaQgfAXgoAAQgsAAgWgRQgYgTAAgqIAlAAQAAATARAJQAOAHAVAAQATAAATgMQAWgOAAgUQAAgfg+AAIhRACQAAgWAEgrQAEgrAAgWICfgDg");
	this.shape_8.setTransform(2.6935,-166.9623,1.9354,1.9354);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E7E6E6").s().p("AAcCEIg9huQgSgdAFgRQACgHAIgLIBUh4IAAByQAABGgDAlQgFA7gRAtg");
	this.shape_9.setTransform(40.967,-172.9521,1.9354,1.9354);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D0A988").s().p("AhwBtQgEgqASgkQAUhagGgOIBegwQBhguAHALIgMBUQgJBXAOAPQgdAggkAhQhIBBgkAAQgqAAgEgzg");
	this.shape_10.setTransform(9.8363,-236.7826,1.9354,1.9354);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F5F6F6").s().p("AjNFnIAsiNQgchUgXhhQgsi/Aig9QAxhsAMgmIAfgSQAkgQAUAEIBSANQBYAIAagXIBnAhIgWGyIgSBDQgLBOAfA5IANAXQAOAfAFAmQhMAQheAHQgsADgmAAQh9AAhBgjg");
	this.shape_11.setTransform(6.7652,-154.7796,1.9354,1.9354);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E7E6E6").s().p("AiPDoQg4gPgsgbIghgZQgOg5AChOQADicBQhtIAGgMQA3AcC8gEQBfgCBTgHIAcB3QAXAhALBRQAPBogfBSQiZA9iAAAQhEAAg+gQg");
	this.shape_12.setTransform(8.7981,-42.4966,1.9354,1.9354);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E7E6E6").s().p("AAnGoQgmgCgcgXQgdgYgIgiIgDABQhAkhgfkaQgGgXACgYQADhBA0grQAzgrBFAEQBFAEAuAxQAvAwgEBBQgBALgCAMQgVCgABCnQABBsAJBeQAFAPgBARQgDArgjAcQgfAagqAAIgIAAg");
	this.shape_13.setTransform(33.0859,28.3607,1.9354,1.9354);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#AF3537").s().p("Ag/DWQAJg1ADhMQAFiWgkhxIA3AIQA/gBAsgvIADCSQgBCegRA7IAJAeQgPAQgYANQgeAPgeAAQgTAAgTgFg");
	this.shape_14.setTransform(56.0679,190.7555,1.935,1.935);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E7E6E6").s().p("AACGOQALhIgJh1QgQjphhjiQgNgSgEgVIgBgCIABAAQgCgFAAgGQgCgrAeggQAfghAvgDQAtgDAjAdQAjAcADArIAAABQAOAvANC4QAREAgdDTQgMAPgUAJQgQAHgQAAQgXAAgWgQg");
	this.shape_15.setTransform(45.6281,149.8108,1.935,1.935);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAUAFQgXgLgigCIANgJIAcADQAdAIAFAXQgFgFgNgHg");
	this.shape_16.setTransform(29.6554,244.8519,1.935,1.935);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAUAFQgXgMgigBIANgIIAcACQAdAIAFAYQgFgHgNgGg");
	this.shape_17.setTransform(36.2344,240.9819,1.935,1.935);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAUAFQgXgMgigBIANgJIAcAEQAdAHAFAXQgFgFgNgHg");
	this.shape_18.setTransform(43.0068,236.5314,1.935,1.935);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#57514C").s().p("AiqBhQgHgIgEgKQgGgWAUgOIDGiBIALAHQARAGAhgCQAlgOARgLQAKgGAAgDIgBgDQAKABAHAQIAAgBIAAABQALAaABAsIgBAAIAAABIhTA4QhdA8gxAOQgXAFgbACIgOAAQgsAAgUgQg");
	this.shape_19.setTransform(38.6952,245.6654,1.935,1.935);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CCCCCC").s().p("AhMAfQAIgDAIgNQAQgZABgtIgIgqIBhgGQAPBxAQgEIgSAMIAGAUIgQAWQgVAXgSAMQgPAJgOAAQgmAAgThJg");
	this.shape_20.setTransform(56.5033,225.9437,1.935,1.935);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E7E6E6").s().p("Ag+GmQgmgIgZgcQgZgbgCgjIgEAAQgUkgANkjQgDgYAFgWQAOhAA5gjQA6giBDAOQBEAOAmA3QAmA4gNA/QgCALgEALQgtCbgYClQgQBpgFBgQACAQgEARQgIAqgnAXQgaAQgfAAQgNAAgNgDg");
	this.shape_21.setTransform(-15.0461,15.6236,1.9354,1.9354);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#AF3537").s().p("AhUDOQANg0AHhLQAPiVgahzIAOAFQATAGAUABQA8ADAwgsIgICSQgMCdgVA6IAHAeQgPAPgZALQgaAMgaAAQgWAAgWgJg");
	this.shape_22.setTransform(-15.2845,179.3822,1.935,1.935);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E7E6E6").s().p("AgjGMQAQhHgBh1QAAjqhSjpQgLgTgDgUIgBgDIABAAIgBgLQABgrAhgeQAhgeAuAAQAuABAhAeQAhAfgBArIAAABQALAzAAC2QgBEBgsDPQgNAOgUAIQgOAGgNAAQgZAAgXgUg");
	this.shape_23.setTransform(-22.4902,137.7769,1.935,1.935);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAVAGQgXgNgjgEIAPgIIAbAFQAdAKAEAYQgGgHgLgHg");
	this.shape_24.setTransform(-47.115,231.3554,1.935,1.935);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAUAGQgXgNghgEIAOgIIAbAFQAdAKADAYQgFgHgMgHg");
	this.shape_25.setTransform(-40.2942,227.9691,1.935,1.935);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAUAGQgXgNghgEIAOgHIAbAEQAdAKADAXQgFgGgMgHg");
	this.shape_26.setTransform(-33.2315,223.9541,1.935,1.935);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#57514C").s().p("AhjBoQg3gBgWgUQgGgIgDgLQgFgWAVgNIDPhyIAKAHQARAHAhABQAlgLASgKQALgGAAgDIgBgDQAKACAGAQIAAgBIAAACQAKAagDAsIgBAAIhWAzQhhA1gzAKQgUAEgYAAIgGAAg");
	this.shape_27.setTransform(-38.2858,233.0538,1.935,1.935);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CCCCCC").s().p("AhNAZQAJgDAJgMQASgYADgtIgFgqIBhAAQAIByAQgCIgTAKIAEAVQgbAkggAQQgOAIgNAAQgnAAgPhNg");
	this.shape_28.setTransform(-19.2029,214.4129,1.935,1.935);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.4,-267.6,148.7,535.2);


(lib.il78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0CDC5").s().p("AgRBTQgIgIAAgKIAAiBQAAgKAIgIQAHgHAKAAQAKAAAIAHQAHAIAAAKIAACBQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape.setTransform(71.9448,-82.1997,1.9353,1.9353);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0CDC5").s().p("AgSCDQgIgIAAgLIAAjfQAAgLAIgIQAIgIAKAAQALAAAIAIQAIAIAAALIAADfQAAALgIAIQgIAIgLAAQgKAAgIgIg");
	this.shape_1.setTransform(51.3818,-85.0543,1.9353,1.9353);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C34172").s().p("AhvAiQgDgNAQgJIARgGIAcgFQAegDANgBQANAAAHgLIAKgVQAEgHAZgIIAYgGIAnASQgdAIgQAPQgJAJgKAPQgHAKgPAEQgOAEghAEQgdAEgIALQgDAGABAFg");
	this.shape_2.setTransform(-101.4249,-71.7488,1.9353,1.9353);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIARgGIAcgFQAegDANgBQANAAAHgLIAKgVQAEgHAZgIIAYgGIAnASQgdAIgQAPIgSAYQgIAJgPAFQgNAEgiAEQgdAEgIALQgDAGABAFg");
	this.shape_3.setTransform(-75.6847,-66.9104,1.9353,1.9353);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIASgGIAbgFQAegDANAAQAMgBAIgLIALgUQADgIAZgIIAYgGIAnATQgdAHgQAPIgSAYQgIAKgPAEQgNAEgiAEQgdAEgIALQgDAGABAFg");
	this.shape_4.setTransform(-85.9421,-67.3459,1.9353,1.9353);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FBE295").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAJgJAQgDIAggFQAPgCAQAFQAPAFAFAKIAcA9QAEAKgJAJQgIAJgSACIgfAGIgKAAQgLAAgKgDg");
	this.shape_5.setTransform(-76.4964,-100.3435,1.9353,1.9353);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CD9B3C").s().p("AgeA9QgPgGgFgKIgfhEQgFgKAJgJQAJgKARgCIAzgIQAQgDAPAFQAPAGAFAKIAfBFQAFAKgJAJQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_6.setTransform(-73.932,-100.2952,1.9353,1.9353);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E4BE4D").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAIgJASgDIAfgFQAQgCAPAFQAPAFAFAKIAcA9QAEAKgJAJQgJAJgQADIggAFIgKABQgLAAgKgEg");
	this.shape_7.setTransform(-94.3984,-99.7146,1.9353,1.9353);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E0A93B").s().p("AgeA9QgPgGgFgKIgfhFQgFgJAJgKQAJgJARgCIAzgIQAQgDAPAFQAQAGAEAKIAgBEQAEAKgJAKQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_8.setTransform(-91.8069,-99.6178,1.9353,1.9353);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FBE295").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAIgJASgDIAfgEQAQgDAPAFQAPAFAFAKIAbA9QAFAKgJAJQgJAJgQACIggAGIgKAAQgLAAgKgDg");
	this.shape_9.setTransform(-110.9456,-98.9888,1.9353,1.9353);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD9B3C").s().p("AgeA9QgQgGgEgKIgfhEQgFgKAJgJQAJgJARgDIAzgIQAQgDAPAFQAPAGAFAKIAfBFQAFAKgJAJQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_10.setTransform(-108.2845,-98.9203,1.9353,1.9353);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgFABgFIACgIQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_11.setTransform(-2.7123,-91.7796,1.9353,1.9353);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgGIACgIQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_12.setTransform(-30.4737,-105.7141,1.9353,1.9353);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_13.setTransform(-31.0651,-92.457,1.9353,1.9353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FEDF8E").s().p("AgCARQgJAAgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgGAAIgDgBg");
	this.shape_14.setTransform(-7.9269,-101.3925,1.9353,1.9353);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQAAAFgIAEQgGADgHAAIgCAAg");
	this.shape_15.setTransform(12.976,-105.3271,1.9353,1.9353);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FEDF8E").s().p("AgGAQQgIgCgDgGIgFgIQgDgFAEgEQAEgFAIgCQAJgBAHACQAJACACAGIAGAIQACAEgEAGQgEAEgIACIgHABQgEAAgFgCg");
	this.shape_16.setTransform(-14.4998,-93.3763,1.9353,1.9353);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FEDF8E").s().p("AgCAZQgIgDgDgFIgOgZQgDgFAEgEQAEgFAJgCQAIgCAIADQAIACADAFIAOAZQADAFgEAFQgEAFgJABIgHABIgJgBg");
	this.shape_17.setTransform(4.7399,-98.9088,1.9353,1.9353);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FEDF8E").s().p("AgSAYQgIgCgEgFQgDgFAEgFIAUgYQAEgFAHgCQAJgBAIACQAIACADAFQADAFgEAFIgSAYQgEAFgIACIgIABIgJgCg");
	this.shape_18.setTransform(-18.5327,-104.8194,1.9353,1.9353);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FBB988").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAKAAAGADQAGADABAEQgBAFgGADQgGADgKAAQgIAAgHgDg");
	this.shape_19.setTransform(-16.5646,-74.5313,1.9349,1.9349);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#86C54D").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgGASAAQATAAANAGQAOAHAAAIQAAAKgOAGQgNAGgTABQgSgBgNgGg");
	this.shape_20.setTransform(-15.7907,-73.709,1.9349,1.9349);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FBB988").s().p("AgPAIQgHgEAAgEQAAgEAHgDQAHgDAIAAQAKAAAGADQAGADAAAEQAAAEgGAEQgGADgKAAQgIAAgHgDg");
	this.shape_21.setTransform(14.4901,-69.7425,1.9349,1.9349);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#86C54D").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_22.setTransform(15.2641,-68.8718,1.9349,1.9349);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FBB988").s().p("AgPAIQgGgDAAgFQAAgDAGgEQAHgDAIgBQAJABAHADQAGAEAAADQAAAFgGADQgHAEgJAAQgIAAgHgEg");
	this.shape_23.setTransform(7.9599,-76.3211,1.9349,1.9349);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#86C54D").s().p("AgfAQQgOgGAAgKQAAgIAOgHQANgGASAAQATAAANAGQANAHAAAIQAAAKgNAGQgNAGgTABQgSgBgNgGg");
	this.shape_24.setTransform(8.6855,-75.4504,1.9349,1.9349);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFDF87").s().p("AgPAIQgGgEgBgEQABgEAGgDQAGgDAJAAQAJAAAHADQAGADAAAEQAAAEgGAEQgHADgJAAQgIAAgHgDg");
	this.shape_25.setTransform(-31.8501,-69.7425,1.9349,1.9349);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#ED7937").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_26.setTransform(-31.1245,-68.8718,1.9349,1.9349);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFDF87").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_27.setTransform(-3.0688,-71.0486,1.9349,1.9349);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#ED7937").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgOAHgSAAQgSAAgNgHg");
	this.shape_28.setTransform(-2.3433,-70.1779,1.9349,1.9349);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgEAIABQAJgBAHAEQAGADAAAEQAAAFgGADQgHAEgJgBQgIABgHgEg");
	this.shape_29.setTransform(-4.8102,-62.2932,1.9349,1.9349);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#D26D3A").s().p("AgfAQQgOgGAAgKQAAgIAOgHQANgHASAAQATAAANAHQANAHAAAIQAAAKgNAGQgNAHgTgBQgSABgNgHg");
	this.shape_30.setTransform(-4.0847,-61.4225,1.9349,1.9349);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_31.setTransform(5.7348,-63.5993,1.9349,1.9349);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQAOAGAAAJQAAAJgOAHQgOAHgSAAQgRAAgOgHg");
	this.shape_32.setTransform(6.4604,-62.7286,1.9349,1.9349);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAKAAAGADQAGADABAEQgBAFgGADQgGADgKAAQgIAAgHgDg");
	this.shape_33.setTransform(13.1103,-73.1035,1.9353,1.9353);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_34.setTransform(13.836,-72.1842,1.9353,1.9353);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_35.setTransform(-32.8543,-63.4268,1.9353,1.9353);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgRAAgOgHg");
	this.shape_36.setTransform(-32.0801,-62.5559,1.9353,1.9353);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAGgDAJAAQAJAAAHADQAGADABAEQgBAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_37.setTransform(-3.6305,-76.5872,1.9353,1.9353);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQAOgHARAAQATAAANAHQAOAHAAAIQAAAKgOAGQgNAHgTAAQgSAAgNgHg");
	this.shape_38.setTransform(-2.8564,-75.7162,1.9353,1.9353);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgEAIABQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_39.setTransform(-17.1296,-66.9588,1.9353,1.9353);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBAOAHQANAGgBAJQABAJgNAHQgOAHgTAAQgSAAgNgHg");
	this.shape_40.setTransform(-16.4038,-66.0879,1.9353,1.9353);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAGgDAJAAQAJAAAHADQAGADABAEQgBAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_41.setTransform(-28.8868,-75.7162,1.9353,1.9353);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQAOgHARAAQATAAANAHQAOAHAAAIQAAAKgOAGQgNAHgTAAQgSAAgNgHg");
	this.shape_42.setTransform(-28.1127,-74.8453,1.9353,1.9353);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#888781").s().p("AiFBEQgcAAgTgUQgUgUAAgcQAAgbAUgUQATgUAcAAIEKAAQAcAAAUAUQAUAUAAAbQAAAcgUAUQgUAUgcAAg");
	this.shape_43.setTransform(-90.4309,-98.6017,1.9353,1.9353);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#666561").s().p("AiIBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIERAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAg");
	this.shape_44.setTransform(-87.4795,-100.8758,1.9353,1.9353);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#B84438").s().p("AhjBDQgcABgUgVQgTgTAAgcQAAgbATgUQAUgTAcgBIDHAAQAcABAUATQAUAUAAAbQAAAcgUATQgUAVgcgBg");
	this.shape_45.setTransform(-9.0495,-98.892,1.9353,1.9353);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#666561").s().p("AhkBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIDJAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAg");
	this.shape_46.setTransform(-6.5819,-101.1661,1.9353,1.9353);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#888781").s().p("AiCA8QgZAAgRgRQgSgSAAgZQAAgXASgTQARgRAZAAIEFAAQAZAAARARQASATAAAXQAAAZgSASQgRARgZAAg");
	this.shape_47.setTransform(-90.2374,-67.3459,1.9353,1.9353);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#666561").s().p("AiGBGQgdAAgVgUQgUgVgBgdQABgcAUgVQAVgUAdAAIENAAQAeAAAUAUQAVAVgBAcQABAdgVAVQgUAUgeAAg");
	this.shape_48.setTransform(-87.4311,-69.3296,1.9353,1.9353);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#888781").s().p("AhrA8QgZAAgRgRQgRgSAAgZQAAgYARgSQARgRAZAAIDWAAQAaAAARARQASATAAAXQAAAZgSASQgRARgaAAg");
	this.shape_49.setTransform(-9.0495,-67.3459,1.9353,1.9353);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#666561").s().p("AhtBGQgdAAgVgUQgUgVAAgdQAAgcAUgVQAVgUAdAAIDbAAQAdAAAVAUQAUAVAAAcQAAAdgUAVQgVAUgdAAg");
	this.shape_50.setTransform(-6.5819,-69.3296,1.9353,1.9353);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#D0CDC5").s().p("AkJCyQhKAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BKAAIIUAAQBJAAA1A0QA0A0AABJQAABKg0A0Qg1A0hJAAg");
	this.shape_51.setTransform(-50.6595,-86.3607,1.9353,1.9353);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#6B6A65").s().p("AkJCyQhKAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BKAAIIUAAQBJAAA1A0QA0A0AABJQAABKg0A0Qg1A0hJAAg");
	this.shape_52.setTransform(-50.6595,-82.877,1.9353,1.9353);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F9FAFA").s().p("AkJCyQhKAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BKAAIIUAAQBJAAA1A0QA0A0AABJQAABKg0A0Qg1A0hJAAg");
	this.shape_53.setTransform(-50.6595,-88.3928,1.9353,1.9353);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#D0CDC5").s().p("AgRBTQgHgIAAgKIAAiBQAAgKAHgIQAIgHAJAAQALAAAHAHQAIAIAAAKIAACBQAAAKgIAIQgHAHgLAAQgJAAgIgHg");
	this.shape_54.setTransform(273.4146,-82.0061,1.9353,1.9353);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#D0CDC5").s().p("AgSCDQgIgHAAgMIAAjfQAAgLAIgIQAIgIAKAAQALAAAIAIQAIAIAAALIAADfQAAALgIAIQgIAIgLAAQgKAAgIgIg");
	this.shape_55.setTransform(252.8516,-84.8608,1.9353,1.9353);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#C34172").s().p("AhvAiQgDgNAQgJIASgGIAbgFQAegDANgBQAMAAAIgLIAKgUQAEgIAZgIIAYgGIAnASQgdAIgQAPIgSAYQgIAKgPAEQgNAEgiAEQgdAEgIALQgDAGABAFg");
	this.shape_56.setTransform(100.0449,-71.5552,1.9353,1.9353);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIASgGIAbgFQAegDANgBQANAAAIgLQADgEAHgRQADgHAZgIIAYgGIAnASQgdAIgQAPIgSAYQgIAKgPAEQgNAEgiAEQgcAEgIALQgEAGACAFg");
	this.shape_57.setTransform(125.785,-66.7169,1.9353,1.9353);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#8A3042").s().p("AhvAiQgDgNAQgJIASgGIAcgFQAegDANgBQAMAAAIgLIAKgVQADgHAZgIIAYgGIAnASQgdAIgQAPQgJAJgJAPQgIAKgOAEQgOAEgiAEQgcAEgIALQgEAGACAFg");
	this.shape_58.setTransform(115.5277,-67.1039,1.9353,1.9353);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FBE295").s().p("AgWA3QgPgFgEgKIgcg9QgFgKAJgJQAIgJARgCIAggGQAQgCAPAFQAQAFAEAKIAbA9QAFAKgJAJQgJAJgRACIgeAFIgLABQgLAAgKgDg");
	this.shape_59.setTransform(124.9734,-100.15,1.9353,1.9353);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#CD9B3C").s().p("AgeA9QgQgGgEgKIgghFQgEgJAJgKQAJgIARgDIAzgIQAQgDAPAFQAPAGAFAJIAfBGQAFAJgJAKQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_60.setTransform(127.6122,-100.0532,1.9353,1.9353);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#E4BE4D").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAIgJARgDIAggFQAQgCAPAFQAPAFAFAKIAcA9QAEAKgJAJQgIAJgSACIgfAGIgKAAQgLAAgKgDg");
	this.shape_61.setTransform(107.1198,-99.4726,1.9353,1.9353);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#E0A93B").s().p("AgeA9QgPgGgFgKIgfhEQgFgKAJgJQAJgKARgCIAzgIQAQgDAPAFQAPAGAFAKIAfBFQAFAKgJAJQgJAJgRACIgzAIIgKABQgLAAgKgDg");
	this.shape_62.setTransform(109.7325,-99.4243,1.9353,1.9353);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FBE295").s().p("AgWA3QgPgFgFgKIgcg9QgEgKAJgJQAJgJARgCIAfgGQAQgCAPAFQAPAFAFAKIAcA9QAEAKgJAJQgJAKgRACIgfAFIgKAAQgLAAgKgDg");
	this.shape_63.setTransform(90.5726,-98.7953,1.9353,1.9353);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#CD9B3C").s().p("AgeA9QgPgGgFgKIgfhFQgFgKAJgJQAJgIARgDIAzgIQAQgCAPAEQAPAGAFAKIAfBFQAFAJgJAKQgJAIgRADIgzAIIgKABQgLAAgKgDg");
	this.shape_64.setTransform(93.1853,-98.6985,1.9353,1.9353);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgGIACgIQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQgBAGgHADQgGADgHAAIgCAAg");
	this.shape_65.setTransform(198.7684,-91.5861,1.9353,1.9353);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQAAAFgIAEQgGADgHAAIgCAAg");
	this.shape_66.setTransform(170.9972,-105.5206,1.9353,1.9353);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgFgEAAgFIACgJQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAGIgCAIQgBAGgHADQgGADgGAAIgDAAg");
	this.shape_67.setTransform(170.4155,-92.248,1.9353,1.9353);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FEDF8E").s().p("AgCARQgJAAgGgEQgFgEAAgGIACgIQABgGAHgDQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQAAAFgIAEQgFADgHAAIgDgBg");
	this.shape_68.setTransform(193.544,-101.199,1.9353,1.9353);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FEDF8E").s().p("AgCASQgJgBgGgEQgGgEABgGIACgIQABgFAHgEQAHgDAIAAQAJABAGAEQAGAEgBAFIgCAJQgBAFgHAEQgGADgHAAIgCAAg");
	this.shape_69.setTransform(214.4931,-105.1335,1.9353,1.9353);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FEDF8E").s().p("AgGAQQgJgCgCgFIgGgJQgCgFADgEQAFgFAJgCQAIgCAIADQAIADADAFIAEAIQAEAEgFAGQgEAEgIACIgHABQgEAAgFgCg");
	this.shape_70.setTransform(187.0013,-93.1828,1.9353,1.9353);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FEDF8E").s().p("AgBAZQgJgDgCgFIgPgZQgDgFAEgEQAEgFAJgCQAIgCAIADQAIACADAFIAOAZQADAFgEAFQgEAFgIABIgIABIgIgBg");
	this.shape_71.setTransform(206.241,-98.7153,1.9353,1.9353);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FEDF8E").s().p("AgSAYQgIgCgDgFQgDgFADgFIATgYQAEgFAIgCQAJgBAIACQAIACADAFQAEAFgEAFIgUAYQgDAFgIACIgIABIgJgCg");
	this.shape_72.setTransform(183.0095,-104.6259,1.9353,1.9353);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FBB988").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_73.setTransform(184.9043,-74.3378,1.9349,1.9349);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#86C54D").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASAAQATAAANAHQAOAGAAAJQAAAJgOAHQgOAHgSAAQgRAAgOgHg");
	this.shape_74.setTransform(185.6299,-73.4671,1.9349,1.9349);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FBB988").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_75.setTransform(215.9591,-69.5007,1.9349,1.9349);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgGASAAQATAAANAGQAOAGAAAJQAAAJgOAHQgNAGgTABQgSgBgNgGg");
	this.shape_76.setTransform(216.6846,-68.6783,1.9349,1.9349);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FBB988").s().p("AgPAIQgHgDABgFQgBgEAHgDQAGgDAJAAQAJAAAHADQAHADAAAEQAAAFgHADQgHADgJAAQgJAAgGgDg");
	this.shape_77.setTransform(209.4289,-76.0792,1.9349,1.9349);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#86C54D").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_78.setTransform(210.1544,-75.2085,1.9349,1.9349);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFDF87").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAGgDAJAAQAJAAAHADQAGADABAEQgBAFgGADQgHADgJAAQgJAAgGgDg");
	this.shape_79.setTransform(169.5704,-69.5007,1.9349,1.9349);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#ED7937").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgGASAAQATAAANAGQAOAGAAAJQAAAJgOAHQgNAGgTABQgSgBgNgGg");
	this.shape_80.setTransform(170.3444,-68.6783,1.9349,1.9349);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFDF87").s().p("AgPAIQgHgDAAgFQAAgEAHgDQAHgDAIAAQAKAAAGADQAHADgBAEQABAFgHADQgGADgKAAQgIAAgHgDg");
	this.shape_81.setTransform(198.4001,-70.8551,1.9349,1.9349);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#ED7937").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgHASAAQATAAANAHQANAHAAAIQAAAKgNAGQgNAHgTAAQgSAAgNgHg");
	this.shape_82.setTransform(199.1256,-69.9844,1.9349,1.9349);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#F4D582").s().p("AgPAIQgHgDAAgFQAAgEAHgDQAHgEAIABQAKgBAGAEQAHADgBAEQABAFgHADQgGAEgKgBQgIABgHgEg");
	this.shape_83.setTransform(196.6587,-62.0998,1.9349,1.9349);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_84.setTransform(197.3843,-61.2291,1.9349,1.9349);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_85.setTransform(207.1554,-63.4058,1.9349,1.9349);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQANgHASAAQATAAANAHQANAHAAAIQAAAKgNAGQgNAHgTAAQgSAAgNgHg");
	this.shape_86.setTransform(207.9293,-62.5351,1.9349,1.9349);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#F4D582").s().p("AgPAIQgHgEABgEQgBgEAHgDQAGgDAJgBQAJABAHADQAHADAAAEQAAAEgHAEQgHAEgJAAQgIAAgHgEg");
	this.shape_87.setTransform(214.58,-72.8616,1.9353,1.9353);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#D26D3A").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgGASAAQATAAANAGQAOAGAAAJQAAAJgOAHQgNAGgTABQgSgBgNgGg");
	this.shape_88.setTransform(215.3542,-71.9907,1.9353,1.9353);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_89.setTransform(168.6639,-63.2332,1.9353,1.9353);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#D26D3A").s().p("AgfAQQgNgGAAgKQAAgIANgHQAOgHARAAQASAAAOAHQAOAHAAAIQAAAKgOAGQgNAHgTAAQgSAAgNgHg");
	this.shape_90.setTransform(169.3897,-62.3623,1.9353,1.9353);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_91.setTransform(197.8877,-76.3936,1.9353,1.9353);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#D26D3A").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgHASABQATgBANAHQANAGAAAJQAAAJgNAHQgNAGgTABQgSgBgNgGg");
	this.shape_92.setTransform(198.6134,-75.4743,1.9353,1.9353);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#F4D582").s().p("AgPAIQgGgDgBgFQABgEAGgDQAHgDAIAAQAKAAAGADQAGADAAAEQAAAFgGADQgGADgKAAQgIAAgHgDg");
	this.shape_93.setTransform(184.3886,-66.7169,1.9353,1.9353);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#D26D3A").s().p("AgfAQQgNgHAAgJQAAgJANgGQANgHASAAQATAAANAHQANAGAAAJQAAAJgNAHQgNAHgTAAQgSAAgNgHg");
	this.shape_94.setTransform(185.1144,-65.846,1.9353,1.9353);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#F4D582").s().p("AgPAIQgGgDAAgFQAAgEAGgDQAHgDAIAAQAJAAAHADQAGADAAAEQAAAFgGADQgHADgJAAQgIAAgHgDg");
	this.shape_95.setTransform(172.6314,-75.5227,1.9353,1.9353);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#D26D3A").s().p("AgfAQQgOgHAAgJQAAgJAOgGQANgGASAAQATAAANAGQANAGAAAJQAAAJgNAHQgNAGgTABQgSgBgNgGg");
	this.shape_96.setTransform(173.3571,-74.6034,1.9353,1.9353);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#888781").s().p("AiEBDQgdABgTgUQgUgUAAgcQAAgbAUgUQATgUAdAAIEJAAQAdAAATAUQAUAUAAAbQAAAcgUAUQgTAUgdgBg");
	this.shape_97.setTransform(111.0389,-98.4082,1.9353,1.9353);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#666561").s().p("AiIBPQghAAgXgXQgXgXAAghQAAggAXgXQAXgXAhAAIERAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAg");
	this.shape_98.setTransform(113.9903,-100.6339,1.9353,1.9353);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#B84438").s().p("AhjBDQgcAAgUgTQgTgUgBgcQABgbATgUQAUgTAcgBIDHAAQAcABAUATQATAUAAAbQAAAcgTAUQgUATgcAAg");
	this.shape_99.setTransform(192.4203,-98.6985,1.9353,1.9353);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#666561").s().p("AhlBPQggAAgXgXQgYgXAAghQAAggAYgXQAXgXAgAAIDKAAQAhAAAYAXQAWAXAAAgQAAAhgWAXQgYAXghAAg");
	this.shape_100.setTransform(194.9363,-100.9725,1.9353,1.9353);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#888781").s().p("AiCA8QgZAAgSgSQgRgRAAgZQAAgYARgRQASgSAZAAIEFAAQAaAAAQASQASARAAAYQAAAZgSARQgQASgaAAg");
	this.shape_101.setTransform(111.2324,-67.1039,1.9353,1.9353);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#666561").s().p("AiGBGQgeAAgUgUQgVgVAAgdQAAgcAVgVQAVgUAdAAIENAAQAeAAAUAUQAVAVAAAcQAAAdgVAVQgUAUgeAAg");
	this.shape_102.setTransform(114.0871,-69.1361,1.9353,1.9353);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#888781").s().p("AhqA8QgaAAgRgSQgSgRAAgZQAAgYASgRQARgSAaAAIDWAAQAZAAARASQARARAAAYQAAAZgRARQgRASgZAAg");
	this.shape_103.setTransform(192.4203,-67.1039,1.9353,1.9353);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#666561").s().p("AhtBGQgeAAgUgUQgVgVAAgdQAAgcAVgVQAVgUAdAAIDbAAQAdAAAVAUQAUAVAAAcQAAAdgUAVQgVAUgdAAg");
	this.shape_104.setTransform(194.9363,-69.1361,1.9353,1.9353);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#D0CDC5").s().p("AkKCyQhJAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BJAAIIUAAQBKAAA0A0QA0A0AABJQAABKg0A0Qg0A0hKAAg");
	this.shape_105.setTransform(150.8587,-86.1671,1.9353,1.9353);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#6B6A65").s().p("AkKCyQhJAAg0g0Qg0g0AAhKQAAhJA0g0QA0g0BJAAIIUAAQBKAAA0A0QA0A0AABJQAABKg0A0Qg0A0hKAAg");
	this.shape_106.setTransform(150.8587,-82.6835,1.9353,1.9353);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#F9FAFA").s().p("AkKCxQhJAAg0g0Qg0gzAAhKQAAhJA0gzQA0g0BJAAIIUAAQBKAAA0A0QA0AzAABJQAABKg0AzQg0A0hKAAg");
	this.shape_107.setTransform(150.8587,-88.1509,1.9353,1.9353);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#D8743A").s().p("A0dD0QgvAAghgiQgiggAAgwIAAkEQAAguAigiQAhghAvAAMAo7AAAQAvAAAhAhQAiAiAAAuIAAEEQAAAwgiAgQghAigvAAg");
	this.shape_108.setTransform(-2.9721,-76.4178,1.9349,1.9349);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#DFB154").s().p("A0dD0QgvAAghgiQgighAAguIAAkEQAAgwAiggQAhgiAvAAMAo7AAAQAvAAAhAiQAiAgAAAwIAAEEQAAAugiAhQghAigvAAg");
	this.shape_109.setTransform(-2.9721,-58.617,1.9349,1.9349);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_110.setTransform(-74.1755,23.4217,1.9349,1.9349);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_111.setTransform(-22.6111,23.4217,1.9349,1.9349);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_112.setTransform(39.3049,23.4217,1.9349,1.9349);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#A86B54").s().p("Ag4IEIAgwHIAxAAIAgQHg");
	this.shape_113.setTransform(102.5754,23.4217,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-278.4,-123.6,556.8,246.89999999999998);


(lib.il7t8lt78l8t7l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF3537").s().p("AghASIg+gPIAGgXQBKAWA+gHQAggEAQgJIAAAWQgoARgwAAQgTAAgVgDg");
	this.shape.setTransform(-1.4931,50.161,1.9355,1.9355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D2C8C9").s().p("AhuCVIARhhQgEgzAQg0QAhhpBngGIANAHQAPALALAQQAgA0geBWIgFAlQgGAugBAsQgfANgoAHQgfAGgaAAQgnAAgbgOg");
	this.shape_1.setTransform(-0.0028,31.6171,1.9355,1.9355);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D0A988").s().p("AhDFRQgWgKgJgWQgKgWAIgXQgBgwAQlkQgJgmANgsIABgEIABAAIAHgSQAWgzAngaQAmgZAhAOQAiAOAIAvQAIAugWAyIgIASIgCAHQgYBIgRCgQgLBggGBmIgBAQIgBgBIgEALQgKAZgXAKQgMAFgMAAQgMAAgMgFg");
	this.shape_2.setTransform(0.5449,69.4768,1.9355,1.9355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.4,0,42.9,135.7);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E88C8D").s().p("AgsARQgFgCgDgEQgGgJAJgJIAGgFQAHgDALAFIAWAFQAcABAegPQgHANgQAKQgXAQgbAAQgMAAgOgDg");
	this.shape.setTransform(-11.9226,4.3041,2.1608,2.1608);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CD7E7E").s().p("AguAYQgFgMANgJIAEgDQAHgBAQgBQAYgCAjgdQACAegfATQgVAPgUADIgGAAQgNAAgFgKg");
	this.shape_1.setTransform(-10.4451,7.3396,2.1608,2.1608);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhFAvIgLggIA+gJQAvgGA0guQgHAdgZAWQgsAqhBAAIgJAAg");
	this.shape_2.setTransform(-9.6,6.9844);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E88C8D").s().p("AgjAOIghgYQAnALAhgHQARgEAKgGQALgJAKADQAFABADADQANAKgGALQgCAGgGAEQgaALgYAAQgWAAgWgKg");
	this.shape_3.setTransform(-11.3543,3.9209,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CD7978").s().p("AgRAVQgqgSgEgjIAcANQAhANASgCQAegEADAFQASAHgEAQQgDAQgYABIgCAAQgYAAgbgMg");
	this.shape_4.setTransform(0.85,-0.05,1.8055,1.8055,0,-20.6748,159.3252,-6.5,-3.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhhAeIBNgLQA9gKA5hGQgYAygqAiQgqAjhLAEg");
	this.shape_5.setTransform(-7.925,5.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E88C8D").s().p("AgeAOQgagNgRgPQAxAPAhgHQARgEAKgGQALgJAKADQAFABADADQANAKgGALQgCAGgGAEQgaALgYAAQgWAAgWgKg");
	this.shape_6.setTransform(-10.4637,3.773,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD7978").s().p("AgPAcQgqgSgIgxQAWAhAPAGQAeANAagLQAUgHADAFQASAHgEAQQgDAQgYABIgCAAQgYAAgbgMg");
	this.shape_7.setTransform(2.5,1.55,1.8055,1.8055,0,-20.6748,159.3252,-6.3,-2.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhmAdIBOgPQA9gMBBg/QghAygqAhQgpAjhMAEg");
	this.shape_8.setTransform(-7.45,5.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E88C8D").s().p("AgcAOQgbgNgUgMQA0AMAigHQARgEAJgGQAMgJAKADQAFABACADQANAKgFALQgDAGgFAEQgaALgZAAQgWAAgVgKg");
	this.shape_9.setTransform(-10.1966,3.7286,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD7978").s().p("AgPAbQgqgSgIgwQAWAgAPAGQAeANAagLQAUgHADAFQASAHgEAQQgDAQgYABIgCABQgYAAgbgNg");
	this.shape_10.setTransform(3.15,-0.45,1.8055,1.8055,0,-27.9043,152.0957,-6.7,-3.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhqAeIBNgPQA9gNBLg/QgqAygqAiQgqAjhLAEg");
	this.shape_11.setTransform(-7.025,5.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E88C8D").s().p("AgZAOIg0gZQA5AMAigHQARgEAJgGQAMgJAKADQAFABACADQANAKgFALQgDAGgFAEQgbALgYAAQgWAAgVgKg");
	this.shape_12.setTransform(-9.7067,3.6473,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CD7978").s().p("AgNAhQgqgSgMg8QAaAsAPAFQAeAOAagLQAUgHADAEQASAIgEAQQgDAQgYABIgCABQgYAAgbgNg");
	this.shape_13.setTransform(4.35,1.3,1.8055,1.8055,0,-27.9043,152.0957,-6.5,-3.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E88C8D").s().p("AgvAPQgFgDgDgEQgGgIAIgKIAGgEQAIgEAKAGQAHADATgBQAagIAkAbIgUgBQgKAAgNACIgYAFQgLACgJAAQgKAAgJgCg");
	this.shape_14.setTransform(-11.1123,4.8247,2.1608,2.1608);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CD7E7E").s().p("AgyALQgFgLANgJIAEgCQAQgIAUgBQAUgCAiAIQgKABgbARQgVAOgUADIgFABQgOAAgFgLg");
	this.shape_15.setTransform(-9.6479,9.9948,2.1608,2.1608);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).to({state:[]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},6).wait(1));

	// Layer_3
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFA477").s().p("Ag1AeQgOgIANgQQAMgOAVgIIAbgLQAIgDAPgBIAYgCQAJAAgBAEQgPAxg2ALQgOADgLAAQgNAAgHgEg");
	this.shape_16.setTransform(-4.5545,11.8145,0.8209,0.8209);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(2).to({_off:false},0).wait(1).to({x:-4.4045,y:13.0145},0).wait(1).to({x:-3.6045,y:15.2145},0).to({_off:true},1).wait(7));

	// Layer_2
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CD573F").s().p("AhMgDICZhMIgXBpIhlA2QANgpgqgqg");
	this.shape_17.setTransform(-5.725,7.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CD573F").s().p("AhSgDICihMQANBOgtAbQgrAyg5AEQAMgpgqgqg");
	this.shape_18.setTransform(-5.1517,7.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CD573F").s().p("AhWgNICshNQAEBPggA3Qg5AWg0AZQAHg+gqgqg");
	this.shape_19.setTransform(-4.7857,8.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E88C8D").s().p("AgMBAQgfgNAEgdQgggJgCgUQgCgZAUgQQARgPAXgBQAxgDAkAdQAIAPgJAdQgIAegeARQgWAMgNAAQgEAAgEgBgAAGgdQgPABgGAFQgGAEgBACIgBACIgBACQAOAIAFAHQAFAIAAAFIABAHQAXACAFgMQAFgMgEgKQgHgTgPAAIgCAAg");
	this.shape_20.setTransform(-9.8467,11.6229);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CD573F").s().p("AgBAaIgCgHQgBgFgFgIQgFgHgNgIIABgCIABgCQAAgCAGgFQAGgEAPgBQARgCAIAVQADAKgFAMQgEAKgTAAIgDAAg");
	this.shape_21.setTransform(-9.4872,11.2273);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},2).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},5).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-1,33,25);


(lib.hjylky6k67k67k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6E6263").s().p("AhNgLQgbhOgLghIAAgCQgKgbAKgZQAKgZAYgJQAYgJAYANQAXANAKAbQAFAOgBAOQAiDDAtBMQAXAmAPgBIhzAtQgphtgqh1g");
	this.shape.setTransform(23.4327,41.454,1.935,1.935);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B49675").s().p("AAlCLQgIgBgEgIIgFgQIgOgtQgLgmgDgFQgNgTASA8QAJAkABAMQAAAHgFABQgFADgEgDQgIgFgFgVQgQhIgGgDQgBgBAJAmQAJAngHACQgGACgDgDQgFgFgGgTQgTg5gKhBQgKhLAPgGQA4gWAdAcQAbAYAoBgQAQAtgKAJQgGAFgGgMIgLgWIgQgmQgLgdgEADQgGAGAFARQAJAeApBTQAIATgLAFQgKAFgIgRIgSgmQgSgjgCABQgCAAATA1QARAzgOAAIgBAAg");
	this.shape_1.setTransform(42.4727,103.2741,1.935,1.935);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,59.1,130.1);


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
	this.shape_5.graphics.f("#8A6945").s().p("Aibg8IFEhNIguCEIijAvQg6AwgDAwQhgg0AqiSg");
	this.shape_5.setTransform(-4.0579,-2.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8A6945").s().p("Aibg8IFEhNIg1CdIiBAxIhYBFQhgg0AqiSg");
	this.shape_6.setTransform(-4.0579,-2.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8A6945").s().p("Aibg8IFEhNIg0C2QgOA9hNARIh/APQhgg0AqiSg");
	this.shape_7.setTransform(-4.0579,-2.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8A6945").s().p("AhNCQQh5hKAqiSIFEhNIg0C1QgOA9g8AtQgfAUgjAAQgZAAgcgKg");
	this.shape_8.setTransform(-3.9584,-1.294);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5}]}).to({state:[{t:this.shape_6}]},34).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.9,-16.7,36.599999999999994,31.5);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#76CBC4").s().p("A9TFjQAGhkAoiKQBRkVCujCMA16AATIAAKyg");
	this.shape_1.setTransform(187.55,35.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,375.1,71), null);


(lib.Group_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34365E").s().p("Ak5ULQgHgHgEgJQgHgUATgOIA0gnIB4hNIAJAEQgLgNgFgQIAHgKQgalfgNjSIgNixIgMihIgBABQgBAEACAeIACAjIABAMQgBAHgHADQgPAFgBgpQgBgqgBAAQgCABgFAdIgEAfQgCANgLAAQgLgBABgPQAJhFgCgYQgCgNgHgDQgEgBgBAXIgCAgIgCASQgCAKgIgCQgHgCgDgTIgCgTQACgrAFgWQAFgbAMgNIgJgBQgDgFACg2IACg+IgEkhQACgdgEgMQgZhfAVhyQAbiPBdgrIAMgDQAPgDANABIABAAIATgFQAXgEAQABIAFgbQgQgEgOgJQgPgMgQgVQgggrgCgxIACgxQABgagNgUIgFADIAEgGQgOgVABgcQACgUALgmIACgaIALgbQARggAXgYQBJhNBvAjQBKAXAWBIQANAtgDBiQAAAIgCALQAHASgLAgQgTA8gagLIgBADQAAAIgDANIgBABQAAARgMAZQgNA/AFAdIABgBIAEAEIAHAFIAAABIBDAGIAAABQAGAAADACQB2AmATCBQAKBDgNBeIgHAxQgHAsAAALIgHAfIgED9IgBBDQgBA7gDAFIgCAAQAKAXAHAmQAHAjABAdQAAAPgCAEQgCADgGABQgHAAgEgeQgFgdgBABQgEAEAJA2QADAZgQAAQgFAAgCgFQgDgJgCgcQgCgbgDgGQgCgEgCAHQgCAFAEBAIABANQgBAGgHADQgOAGgBgqQgBgqgBAAIgDAIIAUFJIAVJAQAJAagDArIAAAAIAAAAIhOAzQhYA1guALQgVAEgZAAQgwgBgUgTQgGgIgDgLQgEgVATgNIA1gjIBPgsIgBAAIAEgBIAogXIgCgIIgOABQgalCgnkDQgQhpgOhzIgOh4QAAgDgDgEIABADIgCgDQgFgGgEANIAGFRIAEI+QAIAXACAfIgBAAIAAAAIhLA4QhVA8gvAOQgVAGgZADIgWABQgjAAgRgNg");
	this.shape.setTransform(94.7713,130.3838);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_4, new cjs.Rectangle(62.1,0,65.4,260.8), null);


(lib.Group_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34365E").s().p("ADTRlIgpgHQgpgNhLgzIhBgwIAAgBIgBAAQACgaAGgUIAEnwIAGkjQgEgMgFAGIgBACIABgCIgDAGIgMBoQgNBhgNBcQgiDggXEWIgMAAIgDAHIAkATIADACIAAAAIBzBEQARALgEASQgCAJgGAHQgRARgqAAIgogDQgpgJhNguIhEgsIgBAAQgCgmAIgWIASnyIASkcIgDgGQgBAAgBAkQAAAkgNgFQgGgCgBgGIABgLQADg2gBgFQgFgRgDArQgCAXgDAIQgCAEgEAAQgOAAADgVQAIgvgEgDQgBgBgDAZQgEAagGgBQgGAAgCgDQgCgDABgNQABgZAFgfQAHghAIgTIgBAAQgDgFgBgyIAAg6IgEjaIgGgcQAAgJgGglIgHgrQgLhRAJg7QARhvBnghIAIgBIAAgBIA6gGQAFgCAFgGIABABQAEgVgLg7QgFgLgDgNIgDgMIAAAAIgDgTIgBgDQgWAKgRgzQgKgeAHgOIgCgQQgDhVAMgnQATg+BBgUQBhgeBABCQAgAhANAnIABAWQAKAiABARQACAYgNASIADAFIgEgCQgMARACAWIABAqQgCArgbAlQgOATgOAKQgLAHgPAEIAEAXQAXgBAdAIQATgCAQAGQBSAmAXB7QATBjgWBRQgDAMABAYIgED5IADA2QABAvgCAEIgIABQAKAMAFAWQAEAUACAlQgBAfgKADQgHACgCgJIgCgQIgBgbQgBgUgDABQgHADgBALQgCAVAIA7QABANgKABQgKAAgBgLIgEgbQgEgZgCgBQgBAAgBAlQgBAjgNgFQgGgCAAgGIAAgLQAEg3gBgEIgBgBQgFBYgRDMQgICCgMClIgOC9IAGAJQgEANgKANIAIgEIBpBCIAuAiQAQAMgGARQgDAIgGAGQgQALgdAAIgUgBg");
	this.shape.setTransform(28.5843,112.6345);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_3, new cjs.Rectangle(0,0,57.2,225.3), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFABQgBgFAGgBQAFgBABAGQABACgCACQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgBAAQgEAAgBgFg");
	this.shape.setTransform(4.7491,3.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgKAQQgHgFgBgIQgBgHAEgHQAGgGAHgBQAHgBAGAFQAHAEABAIQABAHgEAHQgGAGgIABIgCAAQgGAAgEgDg");
	this.shape_1.setTransform(5.9,2.5258);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#214522").s().p("AgPAVQgIgHgCgLQgBgKAHgIQAGgJALgBQAJgBAJAGQAIAHACAKQABAKgHAJQgGAJgLABIgDAAQgIAAgHgFg");
	this.shape_2.setTransform(5.9,2.6074);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDAGQgCgCgBgDQgBgBACgDQABgCADgBQAGgBACAGQABAHgHABIgBAAIgDgBg");
	this.shape.setTransform(6.7504,4.36);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgLATQgHgFgCgJQgCgIAEgIQAFgIAJgCQAIgCAIAFQAHAFACAJQADAIgFAIQgFAIgJACIgFAAQgFAAgGgDg");
	this.shape_1.setTransform(5.0859,3.4728);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#214522").s().p("AgPAZQgKgGgDgNQgDgLAHgKQAGgLAMgDQALgCALAHQAKAGADANQACALgGAKQgGAKgMAEIgHAAQgHAAgIgFg");
	this.shape_2.setTransform(5.0144,3.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_10, new cjs.Rectangle(2.1,0.5,5.9,6), null);


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
	this.shape.graphics.f("#3DA8AB").s().p("AApAZIgSgMQgQgIgPgBQgTgBgFAMQgJASgNgJQgNgKAMgQQAKgQAQgJQASgJARAFQAQAFARAPQASAPAEAPQACAHgEgBIACAJQgJgCgLgHg");
	this.shape.setTransform(6.1199,3.3742);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,12.3,6.8), null);


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
	this.shape.graphics.f("#3DA8AB").s().p("AgpAOQACgNAJgLQAJgNALgFQAMgGAPAEQAPAEAIANQAEAGgDAGQgEAGgIgBIgPgBQgIABgFAFQgCAFgDgBQgDAAgFADQgGADgPAMIgEABQgGAAACgSg");
	this.shape.setTransform(4.2071,3.2321);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,8.5,6.5), null);


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
	this.shape.graphics.f("#7D624D").s().p("AggC0QgngDgrgcQgkgWgQgWQgPgVAbgRQAQgKA4gUIANgFQAZgJBCgLQAwgIAVgEQAmgJAXgNQAXgOgFgLQgFgMgdgJQgYgJgagDQgWgCgYAWQgOAMgTAcIgBACQgOAUg0ANQg1ANgmgIQgUgEgSgMQgMgHgTgRQgbgYgLABQgDAAgEACQgGAFAIAbQAFALACAMQABAJANAIQAHAEATAIQASAGAHAFQAMAGACAJQAEAMgFAEQgGAFgoAAQgvAAgmABQgsACgTgSQgagXAVg0QAKgZAQgWIAHgOQALgZALgNQATgZAdgLQAjgOAgAJQAUAFAqAZIATALQAbAOAWgBQAUgCAWgOQAOgJAZgXQAXgTAxgMQAagGAvgGIAQgCQAKgDARAHQAUAHAPAMQARANAFAPIAIAWQAGANABAIQADAOgCAVQgBAPAKAGQAGAEAXAEQAXAFAMAEQAVAGAPALQAWAQgNAMQgOANgyABQgtAAglgIQgpgKgtANQgqALgTAWQgSAUggATQgnAWghADQgeADgVgPQgagRAIgSQAJgSApgPQAqgPBCgKQBZgNAlgUQAkgTAFgmQADgTgRgKQgggUhnAGQgPABgPALQgLAIgRASQgZAZgQALQgcATghAFQgfAFgfgLQgTgIghgUQgegTgOgFQgVgHgSAIQgiAQADAdQABAQAQAbIAFAKQADAHA1AJIASADQAFABgBADQAAADgGABQgHACgVABQg9ADgVgTQgOgMgIgqQgEgSANgWQAMgXAagTQAoggApgCQAPgBATAIQALAFAWAOQAZAPAOAHQAXAJAUAAQAggCAhgcQAwgpAigOQAUgIAegDQATgBAPgEQAOgEAPAEQAhAKAcAxIgBgDQgGgLgDgMQgEgNgPgMQgOgLgRgGQgOgEgEABIgSACQgsAFgZAGQgvALgVASQgbAZgPAJQgZAPgXACQgcACgegRIgSgLQgqgYgRgFQgbgHgeAMQgaALgSAXQgKAMgLAYIgIAPQgRAWgKAeQgPAsAUATQAQAOAlgBQAngCAvAAQAjAAACgBQACgCgDgJQgCgGgKgGIgWgJQgVgIgIgFQgPgJgCgNIgGgWIgGgWQAAgKAFgFQAGgFAKgBQAMAAAMAHQAJAFAQAPQASAQAKAHQASAKAQAEQAkAHAxgNQAvgLAMgRIABgCQAVgfAPgNQAbgXAcADQAcADAbAKQAgALAGAOQAHAQgcAQQgZAOgnAJQgWAFgxAIQg7AJgdALIgNAEQg2ATgPAKQgWAOAMAQQAPAVAiAVQApAaAjADQAgADAYgSQAZgRAOgSQAIgLAIgSQAHgPAFgGQAJgKAPgFQAYgHAkAAQAWAAAuAFIAmADIgBAHIgngDQgtgEgUAAQgigBgWAHQgMAEgHAIQgEAFgHAOQgJASgIAMQgPAUgZARQgZASgfAAgADahbQAVAOgDAVQgGAqgnAUQgnAWhdANQg+AKgnAOQgoANgIAQQgGAOAVAOQASAMAYgCQAfgDAkgWQAegSAQgSQAVgYAtgMQAxgNAuAKQAiAIArgBQAsAAALgKQAIgHgQgMQgOgKgTgGQgLgEgVgEQgagFgIgFQgOgIABgTQACgWgDgOIgJABQgHgOgLgQQgWgfgWgGQgKgDgJADQgNAEgZACQgcACgSAIQgfANgvAoQgkAeglACQgYABgZgLQgPgGgcgRIgegRQgPgIgMABQgjACgmAdQgYATgMAVQgMAUADASQAIAnAMALQASAPA2gDIAGAAQg3gIgFgMIgFgJQgRgegBgRQgCggAmgRQAYgMAbAKQAQAFAfAUQAfATARAHQAdALAagFQAegFAagRQAQgLAXgYQAUgUALgIQARgMATgBQAdgCATAAQBEAAAcARg");
	this.shape.setTransform(38.7381,18.0653);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,77.5,36.2), null);


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
	this.shape_4.graphics.f("#8A6945").s().p("AiFAvIhOiEQCVgdCLAdQB6AyANCIQiiiRi3Bbg");
	this.shape_4.setTransform(-0.575,-4.2327);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8A6945").s().p("AAfAzQhlAsg/gwIhOiEQCVgdCLAdQB6AyANCIQhlg3hQAFg");
	this.shape_5.setTransform(-0.575,-4.2327);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8A6945").s().p("AAYB1Qhegpg/gRIhOijQCVgeCLAeQB6AyANCIQhOAmhHAAQgUAAgTgDg");
	this.shape_6.setTransform(-0.575,-2.314);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8A6945").s().p("AiJBRIhKjWQCVgdCLAdQB6AyANCIQgbBEilAcQhUgIhJg8g");
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

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#895B5B").s().p("AhfgKQgBgEACgFQACgEALAAQAMAAAWgEQAXgEAVAFIAaAGIAMACIARAFQAMACAgAMQgtAQhAALQgMACgLAAQguAAgNgog");
	this.shape_9.setTransform(3.0987,-4.3984,1.8022,1.8022);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#92706E").s().p("AiSBWQgfgqArgmQA5gCA5gVQA3gVAeguQAeguBBAnQgkAWhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_10.setTransform(15.15,-9.6,0.8631,0.8631,-1.7041,0,0,10.2,-15.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#895B5B").s().p("AhggKQgBgFAGgHQAGgIACACQACABAZAAQAaAAAXADIAfAFIAUAGIAOAFIAnAQIhvATQgNACgKAAQgvAAgMgng");
	this.shape_11.setTransform(3.302,-4.3335,1.8022,1.8022);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#92706E").s().p("AiNBaQgfgqArgmQA5gCA5gVQA3gVAeguQAdguA4ASQgaArhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_12.setTransform(16.45,-6.85,0.8631,0.8631,-1.7041,0,0,10.7,-15.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#895B5B").s().p("AhfANQgIgYAJgKQAKgJAIABQAIABAKAAIAgABIAgAEQAMACAKADIAVAHQALAEAoASQg4AFhAALQgVADgPAAQgiAAgFgRg");
	this.shape_13.setTransform(4.4305,-4.2422,1.8022,1.8022);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#92706E").s().p("AiSBeQgfgrArgmQA5gCA/gTQA+gVAdguQAeguA1AFQgkA2hKBQQgiAnhIAsQgbAQgVAAQgZAAgRgXg");
	this.shape_14.setTransform(17,-5.15,0.8631,0.8631,-1.7041,0,0,10.2,-15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#895B5B").s().p("AhlgMQgBgEAEgFIAEgEIAegCQAfgCAcAGIAbAGIAMADIAVAFQAHACAoAPQg5AHhAALQgNACgKAAQgvAAgMgog");
	this.shape_15.setTransform(4.1982,-4.0873,1.8022,1.8022);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#92706E").s().p("AiSBmQgfgqArgmQA5gCA9gVQA7gVAeguQAdguA6gLQgkBIhKBQQgiAnhIAsQgbAQgVAAQgZAAgRgYg");
	this.shape_16.setTransform(17.75,-3.8,0.8631,0.8631,-1.7041,0,0,10.2,-14.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).to({state:[{t:this.shape_10},{t:this.shape_9}]},3).to({state:[{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_16},{t:this.shape_15}]},1).wait(1));

	// Layer_2
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ah0ADQCigBBIhcQgIA+gXAaQhABLhsASQgIgwgXgog");
	this.shape_17.setTransform(5.05,-1.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ah2AJQCigBBLhTQgKAwgrArQgrAshnAQQgPgcgXgng");
	this.shape_18.setTransform(5.25,-1.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ah5AGQCigBBRhMQgQApgrArQgqAshoAPQgPgbgXgng");
	this.shape_19.setTransform(5.525,-1.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ah3gaQCUgBBbghQgTAKgQASQhBBLhsASQgHgwgYgng");
	this.shape_20.setTransform(5.085,1.5604,0.8631,0.8631);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AhngQQBtgBBUgTQAggLgqAiQgrAhhrAUIghg4g");
	this.shape_21.setTransform(5.1089,0.992);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ah7gVQB3gBBegPQA7gTgrAjQgrAhiUAhQgPgcgXgmg");
	this.shape_22.setTransform(5.4501,1.1597,0.8631,0.8631);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AhxgRQBlAABXgPQA9gRgkAdQgjAciRAgIghg5g");
	this.shape_23.setTransform(6.068,1.0492);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).to({state:[{t:this.shape_20}]},3).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).wait(1));

	// Layer_5
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgPQAMgOAMgKIAMASQgIAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_24.setTransform(9.75,5.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AheAzIgCgMQAcgEAhgNQAhgNAYgSQAagSANgOQAMgPAMgKIALASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgcACQgLgFgDgLg");
	this.shape_25.setTransform(9.65,6.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AhiAzIgCgMQAbgEAigNQAggNAZgSQAagSAMgPQANgOAggKIgJASQgHAcgYARQgdATgfASQgNAKgRAHQgbAOgdACQgKgFgDgLg");
	this.shape_26.setTransform(9.2817,5.0126,0.8631,0.8631);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AhbAxIgBgMQAXgDAdgLQAcgMAYgPQAagQAOgNQANgOAcgNIgUAXQgGAYgVANQgZASgZAPQgNAIgOAIQgXALgZABQgJgDgDgJg");
	this.shape_27.setTransform(9.825,5.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_24}]},3).to({state:[{t:this.shape_25}]},1).to({state:[]},1).to({state:[{t:this.shape_26}]},5).to({state:[{t:this.shape_27}]},1).wait(1));

	// Layer_4
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#BB6F6F").s().p("AhBAPQAVgfAqgMQAogMATABQATAWgWATQgqAkg2ACQgRgFgGgUg");
	this.shape_28.setTransform(8.2349,6.917);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#BB6F6F").s().p("Ag/AUQASghApgOQAngPATAAQAVAVgVAUQgoAmg2AGQgRgDgGgUg");
	this.shape_29.setTransform(9.2003,8.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#BB6F6F").s().p("AhAAUQATghApgOQAngPATAAQAVAVgWAVQgnAlg2AGQgRgEgHgTg");
	this.shape_30.setTransform(8.8003,8.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#BB6F6F").s().p("Ag4ANQASgbAkgKQAigLARACQARATgUAQQgkAfgvABQgOgEgFgRg");
	this.shape_31.setTransform(7.6031,6.016);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#BB6F6F").s().p("Ag3ARQAQgcAjgMQAigNARAAQARASgSASQghAggvAFQgPgDgGgRg");
	this.shape_32.setTransform(8.1003,7.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_28}]},2).to({state:[{t:this.shape_29,p:{scaleX:1,scaleY:1,x:9.2003,y:8.1}}]},1).to({state:[{t:this.shape_30}]},1).to({state:[]},1).to({state:[{t:this.shape_31}]},4).to({state:[{t:this.shape_29,p:{scaleX:0.8631,scaleY:0.8631,x:8.4405,y:7.0408}}]},1).to({state:[{t:this.shape_32}]},1).wait(1));

	// Layer_3
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#AF3838").s().p("Ag6BkQgFgDgDgGQgEgHgBgOQgCgOgDgJIgHgTQgDgKgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAjgRQAdgNACgHQABgGACAHQACAGgBAKQgBASgDAGIgEAMQgJAYgIASQgIAPgMATQgNATgMAKIgjAZQgTAMgXADIgFAAQgGAAgCgBg");
	this.shape_33.setTransform(8.4692,0.3906);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#AF3838").s().p("Ag7BZQgBgPgIgTQgJgTgEgBQgEgBgDgKQgDgKgHgIIgGgGQgDgFABgDQABgDAHgFIAMgHQAdgPAggMQA0gOAkgPQApgQADgDIgCAPQgBAJgRAvQgQAtgGAJQgEAGgOAKIgUAOIgjAZQgTALgXADQgJABAAACg");
	this.shape_34.setTransform(8.9525,0.8125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#AF3838").s().p("AhABaQgBgPgIgTQgJgTgEgBQgEAAgDgKQgDgLgHgIIgGgHQgDgDABgEQABgDAHgEIAMgHQAdgQAggLQA0gPAkgOIAhgNQATgHACgDQgJB4gXAHQgYAIgOAJIgUAOIgjAZQgTAMgXADQgJABAAACg");
	this.shape_35.setTransform(9.4525,0.6625);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#92706E").s().p("AgFBWQgugFgUgpQgTgqATgkQASggAigOQARgFARAFQArASAQAsQASAugZAjQgVAdgjAAIgQgCgAgegGQgGAgAbALQAaAMAOgeQAMgcgTgPQgVgNgNgBIgBAAQgOAAgFAgg");
	this.shape_36.setTransform(1.1103,0.5369);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#AF3838").s().p("AgLAkQgagLAFggQAGghAPABQANABAUANQAUAPgNAcQgKAWgRAAQgFAAgIgEg");
	this.shape_37.setTransform(1.2969,0.6061);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#AF3838").s().p("AguBBQgEgCgDgGQgDgFgBgMQgCgNgCgHIgGgQQgDgIgGgHIgFgGQgDgEACgDQAAgDAGgEIAKgGQAZgNAcgKQArgMA2ASQgHASgGANQgHAOgLAQQgKAQgLAJIgfAVQgQAKgTADIgGAAIgGgBg");
	this.shape_38.setTransform(7.375,2.493);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#AF3838").s().p("AhKBFQgBgPgIgTQgJgTgEgBQgEgBgDgKQgDgJgHgIIgGgHQgDgFABgDQABgDAHgEIAMgHQAdgQAggLQA0gJAfAAQAegBAsAZQAIgXgFArQgGAqgiADQgiACgOAKIgUAOIgjAZQgTAMgXADQgJAAAAACg");
	this.shape_39.setTransform(9.5279,2.4662,0.8631,0.8631);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#AF3838").s().p("AhKA7QgBgNgIgQQgHgRgDAAQgDgBgDgIQgDgIgGgHIgFgGQgDgEABgDQABgDAGgEIAKgGQAZgNAcgKQAtgMANAGQANAHAMAEQAMAFBCgBQguAzgUAFQgVAHgMAIIgRAMIgeAVQgRAKgTADQgIABAAACg");
	this.shape_40.setTransform(10.6,2.4638);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33}]},2).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_37},{t:this.shape_36}]},1).to({state:[]},1).to({state:[{t:this.shape_38}]},3).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-11.2,41,34.099999999999994);


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

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD958B").s().p("AgfAfQgfgBgIgGQgHgGAHgOIAGgJQAIgIANABQAYgBATgJQAggPArAQQgiABgVAZQgUAagfAAIAAAAg");
	this.shape_7.setTransform(-1.1776,-0.6977,0.6215,0.6215,20.2067);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C28B85").s().p("Ag5AhQgKgNALgOIAEgDQAHgEAQABQARABATgVQAVgWAiABQgRASgXAcQgXAdgXAGQgHACgGAAQgOAAgGgJg");
	this.shape_8.setTransform(-0.9092,0.6798,0.6215,0.6215,20.2067);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E6E6E5").s().p("AglAMQAfgMAsgZIgoAkIgVAPg");
	this.shape_9.setTransform(-1.8346,0.1461,0.6215,0.6215,20.2067);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD958B").s().p("AhCAXQgKgHAHgOIAGgJQAJgKANADQA8gTA2AJQgnAHgUAWQgSAXgzAAQgGgBgFgEg");
	this.shape_10.setTransform(-1.4186,-0.548,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C28B85").s().p("Ag2AiQgJgMALgOIADgEQAIgEAQgCQAQgCAUgWQAUgWAcALQgFABgaAhQgVAYggAQQgIAFgHAAQgIAAgGgIg");
	this.shape_11.setTransform(2.65,-2.65,0.6215,0.6215,14.995,0,0,4,-6.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E6E6E5").s().p("AgkANQAfgMAqgaQgPARgXAUIgVAPg");
	this.shape_12.setTransform(-1.8876,0.11,0.6215,0.6215,20.2067);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CD958B").s().p("Ag9AYQgKgHAHgOIAGgJQAJgKANADIAjgJQAjgLAiAQQgdgDgRAUQgWAagcABIgMAAQgRAAgEgDg");
	this.shape_13.setTransform(-1.6843,-0.7255,0.6215,0.6215,20.2067);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C28B85").s().p("AgvAhQgJgOALgNIAKgGIAIgKQgCAEAVgRQAVgRAQACQAQACAHACQgLALgTAXQgUAXgUALQgKAFgHAAQgIAAgEgGg");
	this.shape_14.setTransform(2.7,-2.6,0.6215,0.6215,8.2712,0,0,4.9,-7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CD958B").s().p("AhRAtQgQgDgEgFQgXgMAFgUQgBgHALgKQBJgvBVAUQArAKAdAUQg/gGg7AWQgdAMgRANQgPAOgNAAIgGgBg");
	this.shape_15.setTransform(1.1,-0.8,0.386,0.386,-11.4445,0,0,10.7,-1.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C28B85").s().p("AA6AbQhCgMgdAIQgcAJgPABQgHAAgCgCQgdgHAAgZQABgbAkgHQA9gLA1AOQBEARASA4QgcgIghgGg");
	this.shape_16.setTransform(-3.0126,-2.2308,0.386,0.386);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CD958B").s().p("AgnAZQgLgDAAgJQgBgDADgGQAbgbAmgBIASgBQAKAAAGACQgbAIgXAQQgLAIgGAIQgGAJgHAAIgDAAQgFAAgCgBg");
	this.shape_17.setTransform(1.65,0.6,0.8669,0.8669,0,0,0,4.8,-2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C28B85").s().p("AA2APQhCgMgdAIQgcAJgPABQgHAAgCgCQgdgHAAgZQABgbAkgHQA9gLA1AOQBEARAaBQQgkggghgGg");
	this.shape_18.setTransform(-2.8582,-1.7677,0.386,0.386);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CD958B").s().p("AgnAZQgLgDAAgJQgCgDAEgGQAbgbAmgBIASgBIARAAQgdAKgXAQQgLAIgFAIQgGAJgHAAIgEAAQgEAAgCgBg");
	this.shape_19.setTransform(1.7,1.25,0.8669,0.8669,0,0,0,4.8,-1.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C28B85").s().p("AA1AJQhCgLgdAHQgcAJgPABQgHAAgCgCQgegHABgZQABgbAkgHQA9gLA1AOQBEARAcBcQgmgsghgGg");
	this.shape_20.setTransform(-2.8099,-1.5265,0.386,0.386);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C28B85").s().p("AA1ADQhBgLgdAIQgdAJgOAAQgIAAgBgBQgegIABgZQABgbAkgGQA9gMA0AOQBFASAbBmQglg3gigGg");
	this.shape_21.setTransform(-2.8292,-1.3238,0.386,0.386);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},4).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).to({state:[]},1).to({state:[{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_20},{t:this.shape_19,p:{regY:-1.9,y:1.25}}]},1).to({state:[{t:this.shape_21},{t:this.shape_19,p:{regY:-1.8,y:1.75}}]},1).to({state:[]},1).wait(1));

	// Layer_2
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_22.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_23.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_24.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E6E6E5").s().p("AgrARQAfgMA4gjQgaAhgaANIgWAPg");
	this.shape_25.setTransform(-1.3804,-0.0934,0.6215,0.6215,20.2067);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E6E6E5").s().p("AgsAPQAfgMA6gfQgGANgwAdIgWAPg");
	this.shape_26.setTransform(-1.3651,0.0447,0.6215,0.6215,20.2067);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#E6E6E5").s().p("AgvAPQAfgMBAgfQgGAIg2AiIgVAPg");
	this.shape_27.setTransform(-1.2193,0.0984,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22}]},10).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[]},1).to({state:[{t:this.shape_25}]},4).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[]},1).wait(6));

	// Layer_3
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CD958B").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_28.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CD958B").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_29.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CD958B").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_30.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CD958B").s().p("Ag6AZQgJgHAHgOIAGgJQAIgKANADIAfgFQAmgVAcAQQgHgBgTASQgeAcg3AHQgGgBgFgEg");
	this.shape_31.setTransform(-1.8984,-0.9326,0.6215,0.6215,20.2067);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CD958B").s().p("Ag/AYQgKgIAHgOIAGgJQAJgJANADIAfgFQAngQAmAKQgYAGgWAUQgWAUg2AHQgGgBgFgEg");
	this.shape_32.setTransform(-1.6061,-0.737,0.6215,0.6215,20.2067);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#CD958B").s().p("Ag/AYQgJgHAHgOIAGgJQAIgKANADIAfgFQANgIAZgCQAZgCANAGQABADgRAHQgRAHgQAOQgRAQg3AGQgGgBgFgEg");
	this.shape_33.setTransform(-1.634,-0.7905,0.6215,0.6215,20.2067);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgmAFIgEgMIAbgDQAdgCAdALQgpADgSAHQgHACgFAAQgIAAgCgGg");
	this.shape_34.setTransform(-2.4328,-0.6786,0.8669,0.8669);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgmAGIgEgMIAbgEQAmgEAUAOQgpADgSAGQgHADgFAAQgIAAgCgGg");
	this.shape_35.setTransform(-2.4328,-0.7205,0.8669,0.8669);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AglAGIgEgMIAbgEQAjgEAUAOQgoAEgPAFQgIADgFAAQgIAAgCgGg");
	this.shape_36.setTransform(-2.5628,-0.7083,0.8669,0.8669);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_28}]},10).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[]},1).to({state:[{t:this.shape_31}]},4).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[]},1).wait(1));

	// Layer_4
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_37.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_38.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_39.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#C28B85").s().p("AgiAuQgMgKAIgQIACgEQAHgIAagLQAZgNAFgUQAGgVAHAPQAHAOgMAZQgMAXgXASQgOALgKAAQgFAAgFgDg");
	this.shape_40.setTransform(2.65,-2.65,0.6215,0.6215,20.2067,0,0,3.3,-7.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#C28B85").s().p("AglAtQgMgKAIgQIACgEQAHgIAggJQAbgIANglQALAXgOAXQgPAYgXAQQgPAJgKAAQgGAAgFgDg");
	this.shape_41.setTransform(2.7,-2.65,0.6215,0.6215,10.7372,0,0,3.2,-7.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C28B85").s().p("AgcA2QgPgHAGgSIABgEQAFgJAZgMQAZgMgBgTIgBgaQgBgHAPAQQAPAQgKAaQgLAYgUAUQgOAOgLAAQgEAAgEgCg");
	this.shape_42.setTransform(2.6,-2.65,0.6215,0.6215,20.2067,0,0,0.5,-8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_37}]},10).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[]},1).to({state:[{t:this.shape_40}]},4).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[]},1).wait(6));

	// Layer_5
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_43.setTransform(0.65,1.45);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_44.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVANIgBgBIgBgCIgBgCIABgCIgCgEIALgCIASgFIAOgHIAFgCIABAAIABADIABACQgOALgQAJIgKAEIgHgCg");
	this.shape_45.setTransform(0.6474,1.4293,0.9179,0.9179);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgjAAQAhgQAmAKQgOABgMAFQgMADgJgBIgJAEQgHAEgFABg");
	this.shape_46.setTransform(-2.0223,1.8836,0.9444,0.9444);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_43}]},11).to({state:[{t:this.shape_44}]},1).to({state:[]},1).to({state:[{t:this.shape_45}]},5).to({state:[{t:this.shape_44}]},1).to({state:[]},1).to({state:[{t:this.shape_46}]},4).to({state:[]},1).wait(1));

	// Layer_6
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_47.setTransform(0.55,1.0856);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_48.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#C2811E").s().p("AgVAKIAFgIIAJgIQAHgGAMACIAKADIABADIgBADIgaAIQgIAEgFAAIgEgBg");
	this.shape_49.setTransform(0.5556,1.0862,0.9179,0.9179);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#C2811E").s().p("AgXAGIAIgGIAKgGQAJgEAKAEQAKAEAAACIgBACIgCADIgbADIgIABQgGAAgDgDg");
	this.shape_50.setTransform(-2.215,0.5271,0.8669,0.8669);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#C2811E").s().p("AgVAGIAHgGIAKgFQAIgEAJAEQAJADAAACIgBACIgBADIgZACIgIABQgGAAgCgCg");
	this.shape_51.setTransform(-2.1875,1.135,0.9444,0.9444);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_47}]},11).to({state:[{t:this.shape_48}]},1).to({state:[]},1).to({state:[{t:this.shape_49}]},5).to({state:[{t:this.shape_48}]},1).to({state:[]},1).to({state:[{t:this.shape_50}]},2).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_51}]},1).to({state:[]},1).wait(1));

	// Layer_7
	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_52.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_53.setTransform(0.2313,-0.2179);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_54.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#C25D57").s().p("AgMATIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAPAIIAEAIIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgCACgFACIgEAAg");
	this.shape_55.setTransform(-0.1787,0.0295,0.9179,0.9179);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#C25D57").s().p("AgPATIAAgBIgHgRIgFgBIgCgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAgBIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIADAAIABAAIAAABQgHAGAkADIgMAVQgCACgYAEIgEAAg");
	this.shape_56.setTransform(0.0966,0.0524,0.9179,0.9179);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#C25D57").s().p("AgKAXIgBAAQAAgVgMgFIgGgBIgBgCQAAgBAAAAQgBAAAAAAQAAAAABgBQAAAAAAAAIAAgCIACgCIAJgGIAHgEIACAAIACgBIACAAQACADASACQATACgCANIgJASIgZAIIgFABg");
	this.shape_57.setTransform(0.1972,0.5343,0.9179,0.9179);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#C25D57").s().p("AglgIIgGgCIgBgCQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIABgCIADgBQADgCAHgBIAHgEIADACIACgCIACAAIABABIABAAQAAAAAAABQABAAAAAAQAAAAABAAQAAAAAAAAIADABIABAAIACAAIAGAAIAAgBIAFACIABgBIACAAQACACgBADIACgBQALgFgDADQATAJAHAMQgCACgLABIghAIIgOAFIgOAFIgEACQAGgSgKgPg");
	this.shape_58.setTransform(-2.0644,0.0404,0.8669,0.8669);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#C25D57").s().p("AgigHIgFgDIgBgBQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIABgBIACgCQADgBAHgCIAGgCIADABIABgBIACAAIACAAIAAAAIACABIADAAIABAAIACAAIAFAAIAFABIABgBIACAAQACADgBADIABgBQAKgFgDACQAQAFAIAUQgFADgKAAIgbACIgMAEIgOAFIgDACQAFgRgJgNg");
	this.shape_59.setTransform(-2.0459,0.0111,0.9444,0.9444);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#C25D57").s().p("AgdAHQgBgKgFgHIgFgDIAAgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAIAAgBIACgCQADgCAHgBIAGgDIADABIABgBIADAAIABABIABAAIABABIADAAIACAAIABAAIAGAAIAEABIABgBIACAAQACACgBAEIABgBQALgFgEACQAPAEALAaQgEABgNABIgaAFIgMAFIgOADIgDACQADgJgCgKg");
	this.shape_60.setTransform(-1.975,0.318,0.9444,0.9444);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#C28B85").s().p("AgMAYQgJgGABgLIABgRQABgGACgEQACgEAIgCQAGgDAIAEQAIAEADAKQACAIAAAHIAAAKIgBADIgFAFQgCADgJACIgEABQgGAAgGgEgAgBgLQgEAAgBAHQgCAGADADQACADACAAIABgBQACgBABgEQABgCgBgGQgBgGgCAAIgBABg");
	this.shape_61.setTransform(-4.8298,-1.884);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#C25D57").s().p("AgDAHQgDgDACgFQABgHADgBQAEgCABAHQABAFgBAEQgBADgCABIgCABQgBAAgCgDg");
	this.shape_62.setTransform(-5.0318,-2.1222);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_52}]},10).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[]},1).to({state:[{t:this.shape_55}]},4).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[]},1).to({state:[{t:this.shape_58}]},2).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_62},{t:this.shape_61}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-4.7,11.4,10.3);


(lib.Group_2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#2EA3A7").s().p("AhEAmQgDgCABgCQACgSATgVQARgUASgJQATgJAXAIQAVAHAPASQAQARgTAPQgTAOgNgUQgXgggZAUIgVATQgNAMgKAFIgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBg");
	this.shape_1.setTransform(7.1371,4.0261);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2_1, new cjs.Rectangle(0,0,14.3,8.1), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHACQgBgGAHgCQACgBADABQADACAAADQABACgBADQgCADgDABIgCAAQgFAAgCgGg");
	this.shape.setTransform(8.2568,4.1932);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgLAVQgJgFgCgJQgDgKAFgIQAFgJAKgDQAJgCAIAFQAJAFACAKQADAJgFAIQgFAKgKACIgGAAQgFAAgGgDg");
	this.shape_1.setTransform(6.3,3.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4E3424").s().p("AgPAcQgMgGgDgOQgEgMAHgMQAHgLANgEQAMgEALAHQAMAIADAMQAEANgHAMQgGALgNAEIgJABQgHAAgIgFg");
	this.shape_2.setTransform(6.325,3.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(3.1,0,6.5,6.6), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHACQgCgHAIgDQACgBADACQAEACAAAEQABACgBADQgCAEgEAAIgCABQgFAAgCgHg");
	this.shape.setTransform(13.1325,5.3617);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0F0503").s().p("AgMAYQgKgGgDgLQgDgKAGgJQAFgLALgDQAKgCAKAFQAJAGADALQADAKgFAKQgGAJgLAEIgHAAQgGAAgGgDg");
	this.shape_1.setTransform(10.95,4.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4E3424").s().p("AgRAgQgNgIgEgPQgEgNAHgNQAIgOAPgEQANgDANAHQANAIAEAPQAEANgIAOQgHANgOAEIgKABQgIAAgJgFg");
	this.shape_2.setTransform(11,4.236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0, new cjs.Rectangle(7.4,0.6,7.299999999999999,7.4), null);


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
	this.shape.graphics.f("#AF856A").s().p("AgfAQIgggMIAzgSQA0gRAOAMQARANgKAMQgKANgaAFIgMABQgRAAgbgJg");
	this.shape.setTransform(6.6,2.95,1.4836,1.4836,10.9793,0,0,-6.4,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#604A3E").s().p("AgLgQQA4ggAXAcQABALgKAGQgIAFgUADQgUACgoAMIgmAPQAcgiAcgQg");
	this.shape_1.setTransform(16.5853,-2.2944,1.4836,1.4836);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AF856A").s().p("AgcAQIgmgNIA4gRQA1gRAOAMQAQANgKAMQgJANgaAFIgMABQgRAAgbgJg");
	this.shape_2.setTransform(6.65,5.15,1.4836,1.4836,10.9793,0,0,-6.1,0.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#604A3E").s().p("AgJgWQA4ggAXAcQABAKgKAHQgIAFgVABQgVABgoASIgoAYQAgguAcgQg");
	this.shape_3.setTransform(16.2885,-1.3671,1.4836,1.4836);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#AF856A").s().p("AgaAQQgVgGgVgOQAfAAAdgKQA1gRAOAMQAQANgKAMQgJANgaAFIgMABQgSAAgagJg");
	this.shape_4.setTransform(6.65,9.15,1.4836,1.4836,10.9793,0,0,-5.9,0.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#604A3E").s().p("AgIgfQA4ggAXAcQABAKgKAHQgIAFgVABQgVABgoASQgYASgSAZQAihBAcgQg");
	this.shape_5.setTransform(16.1402,0.0052,1.4836,1.4836);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#604A3E").s().p("AggAhQgGgUABgSQABgSALgRQAKgRAXgBQAPAGAHASQAGASABAOQAEAigLANQgLAOgWABQgWgFgHgWgAACAVQAKAIADgNQAEgMgNgcQgPAYALAVg");
	this.shape_6.setTransform(20.0532,0.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#971B30").s().p("AgEAWQgMgWAQgXQANAcgEAMQgCAHgFAAQgCAAgEgCg");
	this.shape_7.setTransform(20.7194,0.7442);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AiVgSQAYAGAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgKAAQhvAAgnhBg");
	this.shape_8.setTransform(16.7311,-4.0094,0.6832,0.6832);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF856A").s().p("AA9BAQhLgMglgQQhUgjgDhCQASAPAbAOQA4AdAzgHQA1gGAYACQAMABACACQAVAGAIAPQAIAOgGAPQgNAfgpAAQgKAAgLgCg");
	this.shape_9.setTransform(15.926,-0.8023,0.6832,0.6832);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("AidgcQAoAQAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAg2hLg");
	this.shape_10.setTransform(16.289,-4.0391,0.6832,0.6832);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AF856A").s().p("AAxBVQhHgbghgXQhKgzgEhMQAZAtAmAWQAmAVA1AEQA2AEAQAEQAQAFACACQATAKAFASQAEAPgJAOQgOAVgbAAQgQAAgWgIg");
	this.shape_11.setTransform(5.6,-6.25,0.6832,0.6832,3.7034,0,0,-13.3,-9.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#604A3E").s().p("AiigbQAyAPAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgJAAQhxAAhAhKg");
	this.shape_12.setTransform(15.9303,-4.0391,0.6832,0.6832);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#AF856A").s().p("AAuBlQhEgRg0gmQg0glgKh0QAmBVAmAUQAlATAyAAQAyAAASAFIAXAGQANAIAFARQAFAQgNAZQgHAOgbAAQgTAAgdgHg");
	this.shape_13.setTransform(5.55,-4.1,0.6832,0.6832,3.7034,0,0,-12.4,-8.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#604A3E").s().p("AilgQQA4AEAgADQBAAHAlgMQBNgZAMgCQAugMAFAOQAGARgJAKQgIAZgnARQglAQgyABIgKAAQhwAAhGg/g");
	this.shape_14.setTransform(15.7254,-4.0384,0.6832,0.6832);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#AF856A").s().p("AAyBwQhEgSg1glQg0gmgQiJQAsBrAmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_15.setTransform(5.55,-2.05,0.6832,0.6832,3.7034,0,0,-12,-7.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#604A3E").s().p("AisgHQBFgFAhADQBAAHAkgMQBOgZAMgCQAtgMAFAOQAGARgIAKQgIAZgnARQgmAQgyABIgLAAQhwAAhSg2g");
	this.shape_16.setTransform(15.2813,-4.0378,0.6832,0.6832);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#AF856A").s().p("AA5B2QhEgSg1glQg0gmgeiVQA6B3AmASQAmAUAxAAQAyABASAEIAYAHQAMAIAFAQQAFARgNAYQgHAPgbAAQgTAAgcgHg");
	this.shape_17.setTransform(5.6,-0.55,0.6832,0.6832,3.7034,0,0,-11.3,-6.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#604A3E").s().p("AiigPQAyADAwAGQAwAFA2gRQA4gRAfgJQAfgIAFANQAGARgJALQgIAYgnARQglAQgyACIgKAAQhwAAhAg/g");
	this.shape_18.setTransform(11.7558,-4.0424,0.9515,0.6832);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AF856A").s().p("AA+A4QhDgLg0gYQg0gYgpg3QAsALAbAOQA4AdAzgHQA1gGAYACQAMABACACQAVAGAIAPQAIAOgNAWQgJAOghAAQgRAAgWgDg");
	this.shape_19.setTransform(10.5182,-1.0062,0.9515,0.6832);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},4).wait(1));

	// Layer_2
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AhCAMICugzQgUAugBAeIjCADg");
	this.shape_20.setTransform(14.4122,-0.2482,0.7334,0.7334);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AhGAGICugyQgTAugCARQhdgJhdAjg");
	this.shape_21.setTransform(14.6689,0.1551,0.7334,0.7334);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ag3AFIB/gkQgOAhgCANQhEgHg7AYg");
	this.shape_22.setTransform(15.125,0.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdAbQgpgVgNguQBAAwBngYQgKAVgFAOIgIAVIgZABQgkAAgdgOg");
	this.shape_23.setTransform(14.05,-1.5765);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgnAlQg5gdgSg/QBYBBCNggQgOAcgHAUIgKAcQgSACgQAAQgyAAgngTg");
	this.shape_24.setTransform(14.0455,-1.5716,0.7334,0.7334);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgZAZQgqgWgUgoQBIAqBmgXQgJAUgFAPIgIAUIgZABQgmAAgbgNg");
	this.shape_25.setTransform(13.7,-1.3015);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgWAWQgpgVgbgkQBOAmBngYQgKAVgFAOIgIAVIgZABQglAAgcgOg");
	this.shape_26.setTransform(13.35,-1.0515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).to({state:[{t:this.shape_23}]},3).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[]},1).wait(5));

	// Layer_6
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AhAgBQBBgMBAgGIAAAgIhmAGg");
	this.shape_27.setTransform(14.375,8.25);
	this.shape_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(4).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_8
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgwgDIgOgfQA9AjA/gGIAAAog");
	this.shape_28.setTransform(13.2,6.575);
	this.shape_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(11).to({_off:false},0).to({_off:true},1).wait(5));

	// Layer_5
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F7919F").s().p("AgdAdIghghQBcgvAhAtIgRAjg");
	this.shape_29.setTransform(14.7056,4.5512,0.7334,0.7334);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F7919F").s().p("AgUAWIgYgYQAUgOAUgDQAUgDALAEQAKAFADADIAFAFIgKAbg");
	this.shape_30.setTransform(14.6,8.24);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F7919F").s().p("AghAOIgWgmQAsgJARACQAcAEANAPQACACADAHIAEAEIgWAfg");
	this.shape_31.setTransform(13.8622,4.8042,0.7334,0.7334);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggGANABQAUADAJALIAFAHIACACIgQAXg");
	this.shape_32.setTransform(13.85,6.0433);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggHANABQAUADAJALQACACACAFIADADIgQAXg");
	this.shape_33.setTransform(13.525,6.8183);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_29}]},2).to({state:[]},1).to({state:[{t:this.shape_30}]},1).to({state:[]},1).to({state:[{t:this.shape_31}]},4).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[]},1).wait(5));

	// Layer_4
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#971B30").s().p("AhlAiQBAhICLgQQgMAogDATQgDAcAKAWg");
	this.shape_34.setTransform(13.1838,2.0802,0.7334,0.7334);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#971B30").s().p("AhNAoIAVgkIAFAEIAAgIIAIgMQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAIAAgBIAKgFIACgCIAKgFIACgCIAJgEIAEAAIAIgEIALgCIADgCIA4gMIgHAZQgHBDARAMIggABQg8AAg/gNg");
	this.shape_35.setTransform(13.125,3.4471);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#971B30").s().p("AhQAqIgeh7IBHBJQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIAAgCIAOgGIACgDIAMgGIADgDIALgEIAEAAIAMgGIANgDIAEgCIBIgPIgJAgIgIBIQgCAfAKAGg");
	this.shape_36.setTransform(12.8538,0.0451,0.7334,0.7334);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#971B30").s().p("Ag4AXIgahTIA3AuQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAgBIAKgFIACgCIAJgEIACgDIAHgDIADAAIAJgEIAKgCIACgCIA1gLIgGAXQgJAZgDAjQABAUAGAIIgMABQg8AAg4gmg");
	this.shape_37.setTransform(12.65,0.8218);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#971B30").s().p("AAHA+QgcgMgfgpIgjhMIBBAoQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABAAIAAgBIAKgEIABgDIAIgEIACgCIAIgDIAEAAIAJgFIAKgCIACgBIA1gLIgHAXQgJAZgCAiIAAAWQAAAMACAGQgTAKgTAAQgOAAgNgGg");
	this.shape_38.setTransform(12.2,2.194);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_34}]},2).to({state:[]},1).to({state:[{t:this.shape_35}]},1).to({state:[]},1).to({state:[{t:this.shape_36}]},4).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[]},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.8,-7.5,32.699999999999996,21.9);


(lib.uilt768lt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.uil7t8lt78lt7l("synched",0);
	this.instance.setTransform(1.15,40.55);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B53538").s().p("AgnCeQhOgmgKggQgLgxAFg3QAJhuBLgyIATgIQAXgHAVAFQBHAQAgCDQAgCDgWAuQgMAYgRgDIhJgdIADALQAEARAEAfQgkgMgngTg");
	this.shape.setTransform(0.018,38.6955,1.9352,1.9352);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("AgyEYQgTgQgOgdQgMgXAgjeIAijZQAUAJAxgkQAagRAVgUIg7IDQgCAMgLAWQgOAdgOAEIgHABQgOAAgQgMg");
	this.shape_1.setTransform(-6.6527,95.2101,1.9352,1.9352);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.2,0,52.5,151.8);


(lib.oi8908080 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE4339").s().p("AD3HxQgqgCgggfQgGgGgGgJIgBABIgMgXQhOiYhMiHQiEjmhRhgIgHgKIgYgVQhBhAgThJQgShKAngoQAngoBKARQBKARBBBAIAWAXIACAAIADAGQAvA7ALA+QDxHlAxBvIAAABQAaAfABAmQAAAngZAaQgaAagmAAIgFAAg");
	this.shape.setTransform(34.0779,49.6782);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F68A35").s().p("Ah8BlQgXgKgNgPQgNgRACgPQACgQAXgKQAOgFAkgGQAngHAQgGQATgJA8gJQBDgIAagNQAcgNACgaIgEgYIALgCIAFAbQgCAcghAQQgaANhIAKQg3AHgTAJQgQAGgrAIQghAFgMAFQgUAHgCANQgBANAKAOQAMAPAVAJQAsASA6gSIAFAGQggAKgcAAQgdAAgYgKg");
	this.shape_1.setTransform(136.9871,27.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F68A35").s().p("AjIAKIAJgFQAtAfAjAHQAUAEAagEIAQgCQAIAAAfgcQAbgXAMgJQAZgSAWgHQAmgLAuAEQAYACARAFIgFAHQgPgEgWgDQgrgEgjALQgfAKgyAsQgTARgJAGQgMAIgJAAIgNACQgQADgNAAQgwAAg9grg");
	this.shape_2.setTransform(133.125,15.4117);

	this.instance = new lib.Group_2();
	this.instance.setTransform(133.85,22.9,1,1,0,0,0,38.8,18.1);
	this.instance.alpha = 0.7383;

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1E58A").s().p("AgrC3Qg1gRhZg5Qg4gjgoAQQgcALgmgGQgmgHgVgVQg5g3ByhPIAHgQQAJgSAMgPQAogwA9AHQBaAKApABQA+ABAugNQBfgcAQgCQBCgLAjAaQASAOAgAyQAXAkAlAGQAYAEAXAUQAYAUAJAXQAXA+hOARQg6AMhYgSQhGgPgXAVQgNALgOAcQgSAigIAKQgXAegpAAQgXAAgegJg");
	this.shape_3.setTransform(133.1999,23.6142);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E2DED8").s().p("AlYBQQiOghAAgvQAAguCOghQCPghDJAAQDKAACOAhQCPAhAAAuQAAAviPAhQiPAhjJAAQjJAAiPghg");
	this.shape_4.setTransform(133.375,31.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#928980").s().p("AlYBQQiOghAAgvQAAguCOghQCPghDJAAQDKAACPAhQCOAhAAAuQAAAviOAhQiPAhjKAAQjJAAiPghg");
	this.shape_5.setTransform(133.8,36.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BE4339").s().p("AjvELQgdgaAAgqQAAgqAdghQAOgQATgLQDvi9BGh1QAig6gNgUQA4AyBZBIQhzCJiACOQhRBagpArIgCACQgdAigpAFIgNAAQgiAAgYgVg");
	this.shape_6.setTransform(74.225,70.1903);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A8845F").s().p("AhbB1QhzAAgGgaQgVhZAwgnQArgkCbgmIAmgFQAngDAHAKQAHALgTAHIglALIg/APQguALAEAGQAIAKAbgDQAvgGCJgrQAegIAFARQAGARgbAHIg+AUQg6ASAAAEQAAADBWgQQBUgQgHAYQgDAMgNAEIgaAEQh/ARgNAHQghAPBggOQA5gIASACQALACACAHQACALgFAFQgKALghACIhMAHQgnAEgDAFQgCADA7gFQA+gFABALQACAKgGAEQgIAFgfAFQhXAQhjAAIgGAAg");
	this.shape_7.setTransform(111.4312,41.3661);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,182.5,99.4);


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
	this.instance.setTransform(-32.25,6.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_10
	this.instance_1 = new lib.bhmjhjmdhjktdykdyk("synched",0);
	this.instance_1.setTransform(-29.1,4.55);

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
	this.instance_3.setTransform(22.65,-0.25,2.0946,2.0946,0,0,180,6,3.2);

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
	mask_1.graphics.p("AilA3IgcgjQBUhBBYAWQArALAbAXQgCANgPAPQgfAdg/AKQgOACgNAAQgsAAgggZg");
	mask_1.setTransform(-19.3792,8.0428);

	// _Clip_Group__12
	this.instance_4 = new lib.ClipGroup_12();
	this.instance_4.setTransform(-25.5,10.25,2.1607,2.1607,-3.7389,0,0,5.6,2.6);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhcAeIgdgiQBVhCBXAVQArAMAbAYQgBANgPAOQggAdhAAKQgNACgOAAQgrAAgfgZg");
	this.shape_1.setTransform(-26.6,10.5785);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.7,-19.5,93.7,35.6);


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
	this.instance_2.setTransform(-23.8,13.3,2.0646,2.0646,0,0,0,8.5,4.9);

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
	this.instance_3.setTransform(34.3,1.6,2.023,2.023,0,0,0,5.5,4.4);

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

	// Layer_28
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#542A44").s().p("Aj7UwQgmgIhJgoIhAgnIAAAAQgCghAHgUIAAgBIAAABQAEgLAHgCQAEgOACgSIgVgGQgdiSAIikQAFhfAPhKIAAgHQAAgNAEgKQAdjEgOjIQgCgIAAgJQAAgeAQgbQgJgVgBgeQgDhKATg4QANgmASgXIAIgNIAVgmQhoAIgcgVQgggaACgbQACgWATgFIAFgBIAWkZQgXgVgCgPQgBggAJgjQAThHAxgfIALgKIACgvQAAgXACgKIgBgXQAAgpgJg3IgRhfQgFgbAAgmQAAh0Ayg6IAAACQALgLAFgDQAMgRAKgKQAVgWApgIQAlgHAeAIQA1gFAoARIAJABQBRAaAcAcQAYAXAOAvQARA2gWAXIgPASIABAOIAEAGIgEgCQgBAPgJALQAEAEAAAGIAAAEIAIABIAAAOIgIAAQAAAZgUAOQABAXgDAPQgGAngdAsQAAAsATA7IAEARIAEAHQAMACAJAGQA1AkAHBPQAEAogIAjQgGAQgfAUQAcCsADBHQAUAFAcAIIFvAAIgiBXQALAEgCAGQgDAGgMgBIgEAKQAYAHgGAHQgEAFgHgBIgOgDIgagGIgdAAIALADQAeAHAJAEQAGADgBADQgCAMgbgIQg6gRgEACQgCABAfAJQAgAJgBAFQgBAFgEAAQgFABgRgDQg2gLg7gYIjsACQAlA/gCBQQgBAogJAcIAEATQACASgEAQQgLDZgjDWIgBAAQgCANgIAMQg7CuAGCXQACBLAPApQgKAIgKAEQADAdAMAPIBTAuIABAAIALAFIgBAAIA9AjQAPAKgDAQQgCAIgFAGQgQAQgpAAIgmgCQglgIhJgnIhBgmIAAgBIAAAAQgCghAGgTIAAgBIABAAQAEgLAGgCQAEgNACgSIgVgHQgfiPAHiiQADhdAOhOQgBgLADgKQAGiFgTiXQgiDLg5DLIgCAAQgDALgFAIQg+CuAECWQACBMAOAoQgHAHgNAFQADAcAMARIBaAxIgBAAIBBAmQAQAKgEARQgCAIgFAGQgQAPgpAAgAl0jjIAxAEIACgDQALg6gJg7IgLgvIAAgKQgMgkgDgqIgKgGQAAARgBAQIgBAAQgGCbgJBFg");
	this.shape.setTransform(281.4411,267.0669);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(503));

	// Layer_29
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#542A44").s().p("AAmHVQglgIhEgmIg+gmIAAAAQgCggAHgSIAAgBIAAABQADgKAHgDQAGgUADgvIABAAQgciIgDiKQgChaAIg7IAAgEQAAgLADgKIABgCQATiFgBiPQCOAnBCgPQggCfgmCHIgDAAQgDAJgEAIQglDlgTCiIABAAIgEAeQACAgAHAOQAEAHADAAIAIAHIgJgKICTBUQAPAJgDAQQgCAHgFAGQgQAPgnAAg");
	this.shape_1.setTransform(198.1371,345.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(503));

	// Layer_30
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#542A44").s().p("ACzTfQglgHhGglIg+gkIAAAAIgBAAQgCggAGgTIAAgBIABABQADgKAHgDQAFgUACgwIABAAQggiRgEiTQgCheAGgtIABgOQAChWgJhpIgcgDQhBAMiGgjIgPgBQgEgBgCgDIgNgEQACgCAEgRQgGguAOhzQABgiAGgUIAAgCIgFABQgMhUgKhXQgIg+gBgWIAAgBQgBgFABgJIgBAAIADgMQAPhKAMhLQATh7gCg6IAAgGIgDgOQgEgiAJgdQAIgcASgMIgBgJIBPgdIAAgBQARgLAPgGQABghgJg4QgOgTgGgZIAAABIgSAFQgDACgDgBQgIAAgDgSQgHAAgFgGQgFgFgBgHQgHAAgFgHQgFgGAAgIQgPgDgFgIQgDgGABgHQABgHAGgCQgKgNgBgKQgBgGADgHQACgGAFgCIAAgBQgHgLAEgNIgBgBQgBgDADgHQAEgIgBgDIgDgGQgFgNAKgXQgLgHAHgVIAFgPQADgJgBgGIgDgLQgBgHADgDIAHgGIAAgIQgDgNAHgNQAHgMALgDIAFgMQABgIAGgFQAFgFAGAAIAPgJIADgDQgCgEADgEQACgEAEgBIAIgDIAIgCQAEgDAGgIQAIgHAFAFQAAgGAFgFQAFgEAFACIAIAFQAGABAJgIQADgBAKAAQAJAAADgDIAFgGQAEgDAIAFQAJAGADgBQADgBAFgEQAFgEAHADQAHACACAHQADgJAIgEQAJgDAIACQAOAFAJAUQAOgDAKAMQAHAIAGASQAHgGAJAFQAKAFABAJQAOAHAIAQQAIAQgCARIACADQAFAAAEAEQAEAFABAGQAAAHgEAIQAFADADAFQACAFgBAFIgBAEIAAADQAAAEgCADQgDAEgEgBQAGAGgCAKQgCAKgIADQACAKgFAEQgDACgEAAQgEgBgBgDQgDADgHAFQAHAlgFAcQAGAFADAFIgLgFQgCAMgJANIgCADQAGgCABgEQgCAJgIAEQANgGADgGQgDALgIAFIAEgBQAFAAABgCQgFALgKgFIgDgBQgGAPACAYQADAegCAPQgFAegdAmQgdAogeALIAFAiQANACARAIQAWAEAUAVQAUAVAMAfIAEAOIABABIAAADQAJAigIAcQACEAgBA2IABANIABAGQAYCNAgA1QARAcALgBIgaAJQARAGAPAXQAMAUAUAvQALAhgHAGQgEAEgFgJIgHgQIgMgcQgIgVgCADQgFAEAEAMQAGAWAdA8QAGAOgHADQgIAEgFgMIgNgbQgNgagCABQgBAAANAmQANAmgLgCQgGAAgDgGIgDgMQgTg7gCgEQgKgPANAtQAIAZAAAJQAAAFgDABQgIADgFgKIAHAyQgFAEgGADQABAegBAgIgRADQgJB2gTB+IgDAAQgBAMgIAOQggDagRCsIABAAIgDAfQADAgAHAOQADAHADAAIAJAGIgJgKICVBRQAQAJgEAQQgBAIgFAGQgQAOgnABg");
	this.shape_2.setTransform(211.4207,261.5479);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(503));

	// Layer_31
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#542A44").s().p("AAmHVQglgIhEgmIg+glQgCggAHgTIAAgBQAEgKAGgCQAGgUADgwQgbiHgDiKQgChZAIg8IgBgEQAAgJAEgNIAAgCQAUh+gBiUQCOAlBCgOQgfCbgoCLIgCAAQgCAIgGAJQgkDfgTCnIgDAgQACAfAHAOQADAHADABIAJAFIgJgJICTBUQAPAJgDAPQgCAIgFAGQgQAOgnAAg");
	this.shape_3.setTransform(77.7206,348.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(503));

	// Layer_32
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#542A44").s().p("AC2TIQglgHhGglIg/gkIABAAIgBAAQgCggAGgTIAAAAQAEgLAHgCQAFgUACgwQggiRgDiTQgCheAGgtIAAgEIABgKQABhhgIheIgcgEQhBANiHgjIgOgBQgDgBgDgDIgNgEQABgBAFgSQgHgrAPh2QABglAGgRIAAgCIgFAAQgMhRgKhZIgKhUIAAgBIAAgOIAVhuQgLgBgIgEQALgGALgJQAZiUgDhAQgIgHgGgKQgJgSAAgZQAAgMADgGIAEgFQgEgIgDgQQgJg1AGgaQAGgVAOgOQgagxAag9Qg5gzAOhxQAFgpACgMQAGgcAMgUIAgg3QAUgbAagGIAJgBQAVgQAdgIQBPgWBDAaQAvgJAqAVQAVALAMAMQBGAfAWBHQALAkgDAdQgHAtgdAVQgTAOgaACIgGAAIgEADQAHAAADgDQgEALgLgDIgBAAQgFAOADAYQADAcgDAPQgFAggiAoQgjAqghAKIgKABIAGAlQAOgCAYAMQAWAEAUAVQAUAVAMAfIAEAOIABABIAAADQAIAigHAcQACEAgBA2IgBAAQACAGAAAHIAAAGQAZCNAgA1QAQAcALgBIgZAJQARAGAPAXQAMAUATAvQAMAhgHAGQgEAEgFgJIgIgQQgSgygEADQgEAFAEAMQAGAWAdA8QAGAOgIADQgHAEgFgMIgOgbQgMgagCABQgBAAANAmQANAmgMgCQgFAAgDgGIgEgMQgSg7gDgEQgJgNANArQAIAZAAAJQAAAFgDABQgIADgFgKIAHAyIgLAHIAAA+IgRACQgLCEgRBxIgDAAQgCAMgHAOQggDagRCsIABAAIgDAfQADAgAHAOQADAHADAAIAIAGIgJgKICWBRQAQAJgEAQQgBAHgFAGQgQAPgnABgAhvq7IAHARQAEgKgBgUQgEAIgGAFg");
	this.shape_4.setTransform(90.7131,266.6781);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(503));

	// Layer_33
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#542A44").s().p("Ag3S8IgkgFQgkgKhDgrIg7gpQAAggAIgSIAAgBIAAAAQADgGADgDIAAAAIAGgVQgMgrAAhxIABhpIAGAFQADhQAJhNQAGg3AEgOIAAgBQABgMAFgMQAQi0gYi7IgCgQQgCgPAEgQQAAgpAKgoQAJghAJgOIAAAAIAQhGQAFgbAKgWIAJgRQAWgogIg4IgNgwIAAgMIgIgbIgHgBQhCC5gLAdIgBAAQAAAHgDAGIgBAGQgiDBAJAqQAPALAGAbQAFAXACA0QAAAigJAEQgFACgCgJIgBgSIgBgeQgBgXgDABQgFADgBANQgCAXAHBCQABAPgIAAQgJABgBgNIgDgeQgDgcgCAAQgBAAgBAoQAAAogLgGQgFgCAAgHIAAgMQAEg6gCgIQgEgPgDAsQgBAbgDAIQgBAFgEAAQgMAAADgYQAGg0gDgDQgBgBgDAbQgDAdgFgBQgFAAgBgDQgCgEABgPQAAgjAIgrQAIguALgOIgGimIgEhSIAAgCIACgNIADgMQAviJAXhnIgPgPIAJgbIAAgBIAGgPIANgzQAFhHAlgaQALgJANgDIALgBIABABIAAgCIBKgYQANgOgPhlQgPgTgFgYIgJgIQgYAKgNgaQgIgMgCgXIgBgOQgHgMgDgMIgIglQgCgGABgKIAAgRIAAglIgFgCQACglAIgfQgdATAFBBQACAhAIAcQASBAggAyQgQAZgUAMQAQgegUgrIgXglQghgnAKhTIAShLQAahBAmgMQAegKAjAXQAggsA0gSQAagJATAAQBigFA7BNQAhAqANA3QAsAQAmAYQANAHALAKQABAHgEAGQgJAMgbgDQglgKgegPQALAeACATQAGAGADAFIgJgHQABAVgKANIgHAKQAJgFACgGQgBALgIAGQAIgBACgDQgEAMgLgEQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQgGAOAAAXQAAAdgCANQgFAigeArQghAvggAKQgIACgIgBIAHAiIAAABQAPgBAaAOQBKAEAYBMQAMAlgDAlIAGAhIgBABIAGAjQgIAFgIACQAICnAAAuIgBAAQADAHAAAGIAAAFQAoCwAYAiQASADAPAVQAOASAVArQAMAegGAGQgEAEgFgHIgIgPIgNgZQgJgTgCACQgEAFAEALQAHAUAfA2QAGAMgHAEQgHAEgGgLIgOgYQgOgXgBABQgBAAAOAjQAOAigLgBQgGAAgDgFIgEgLQgTg0gEgFQgJgMAOAoQAIAXABAIQAAAFgDABQgLAFgGgWQgOgvgDgBQgBgBAHAZQAHAagFACQgEABgCgCQgDgDgGgMQgMgfgJgnQgJgrAEgQIgzhqIglhNIAGAVQAOAVALAZIAAAAQAfBIgEBaQAHDBgNDLIgBAAIgBAFIABAAIgBABQgCAPgIAOQgjBkgPBsIAFgCQgRBIAGBcQAEA4ALAzICUBSQAPAKgEAPQgBAIgFAGQgQAOgnABIgkgDQglgHhGgmIg+glIAAAAQgCggAHgTIAAAAQACgHAEgDIAAgBIAEgVQgOgqgJhwIgFhpIAEAEQgChJADhHQACgyADgbIAAgNQgFhogVhyQgXCcgdCDIgDAAQgDAQgNAQQgpBhgVBlIAGgCQgWBHAABdQAAA3AHA0IBRAzIAAAAIA8ApQANAKgFAPQgCAIgFAFQgOAMgfAAIgKAAgAB4inIgDgsIgGARIAJAbg");
	this.shape_5.setTransform(155.9562,274.5696);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(503));

	// Layer_34
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#542A44").s().p("Ah2U4QgmgIhKgpIhBgnIAAgBQgCghAHgUIAAgBIAAAAQAEgLAHgCQAEgMACgTQgNgDgIgEQgeiTAJimQAFhfAPhMIgBgHQAAgMAEgMQAfjCgPjOIgBgRQAAgfAPgaQgJgWgBgeQgDhLATg4QANgnATgXIAagtQAAgdAEgdIgyALQgIAFgHAAQgYADgRgUQgHgJgDgKIgCgTIgBAAIADgNQAxj4gDhlIAAgGIgDgPQgDgeAGgbQAGgaAOgQIgDgBQgLgCgHgDQgKgFgCgFIgDgIQgBgEADgFQAYgtAJg/IALhzIAEgoQgkg3AHgwQAHg2AMgjQAKgfAMgOQA0g6AOgJQAfgUA1gBQAagBBAAHQAfAEAgATQAYAOAgAbQAEAEACAFQACAGgEACQAUALAQATQAIALAAAIIAAABQACAOgGAMIAAAAIgCACIgDABIgCgBQAIAcgDAjQgBAjgQAUIgDAEQAHgDABgEQgCAJgJAEQAOgFAEgHQgDALgKAFQAJAAADgDQgGALgMgEIgDgBQgGAOACAZQADAdgCAPQgFAagYAgQgHBIANBGQACAKAAAFQAYAIAMAgQALAhgIAnIgEAOIAAAGQgJBJATCuIACgBQAPgEADAIQACAIgNAEIgHADIABAKQAfgGgCALQgCAGgGACIgNACIgGABIABAJQAKAAABAEIAAAGQgBAEgHADIABAPIAEAKQACALgBAJQAHCOAbA6QANAeAMAAIgLACQAVAPAmA3IAIAQQAIARgEAFQgDAEgHgHIgLgPIgSgZQgMgUgCADQgEAFAGALQALAVAqA2QAJAMgHAFQgHAFgIgLIgTgZQgSgWgCAAQgBABAVAjQAVAjgMAAQgGABgEgGIgGgKQgbgzgHgIQgNgLAWAoQANAXACAJQABAFgDACQgFACgDgBQgGgDgHgOQgXgxgEgBIALAZQANAagFADQgFACgDgCQgDgDgIgNIgTgjIACAMQACASgDARQgLDXgkDcIgBAAQgDAMgHANQg9CwAFCZQADBMAPApQgJAIgLAEQADAcAMARIBWAuIAAAAIALAFIgBABIA+AjQAQAKgEAQQgCAIgFAGQgRAQgpABIgmgDQgngIhJgnIhBgnIAAAAIAAAAQgCgiAGgTIAAgCIABABQAEgLAGgCQACgKADgWIgUgGQgfiRAGikQAEhdAOhQQgBgLADgLQAGiFgTiZQgkDRg5DJIgBAAQgDAKgGAJQg+CwAECYQACBNAOApQgJAHgLAEQADAeAMAQICcBYQAQAKgEARQgCAIgFAGQgRAPgpAAgAjPkWIAigEQAMgzgVg8IgZBzg");
	this.shape_6.setTransform(32.3343,273.2233);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(503));

	// _Path_
	this.instance = new lib.Path_1();
	this.instance.setTransform(304.7,201.15,1,1,0,0,0,187.6,35.5);
	this.instance.alpha = 0.3906;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(503));

	// Layer_7
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D0EDF6").s().p("Ai8GEQAHh7AsieQBZk9CyixIA8AqQgTAVgbAkQg3BJguBSQiSEFgBEEg");
	this.shape_7.setTransform(130.2,197.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(503));

	// Layer_8
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D0EDF6").s().p("Ag6JyIAAzjIB1AAIAATjg");
	this.shape_8.setTransform(391.275,315.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(503));

	// Layer_9
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D0EDF6").s().p("Ag6JyIAAzjIB1AAIAATjg");
	this.shape_9.setTransform(272.175,315.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(503));

	// Layer_10
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D0EDF6").s().p("Ag6JyIAAzjIB1AAIAATjg");
	this.shape_10.setTransform(149.125,315.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(503));

	// Layer_11
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D0EDF6").s().p("A7xAqIAAhTMA3jAAAIAABTg");
	this.shape_11.setTransform(296.525,222.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(503));

	// Layer_12
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D0EDF6").s().p("EglKABJIAAiRMBKVAAAIAACRg");
	this.shape_12.setTransform(264,260.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(503));

	// Layer_13
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#60A8DC").s().p("AgvFuIAArbIBfAAIAALbg");
	this.shape_13.setTransform(497.025,304.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#60A8DC").s().p("AgvFuIAArbIBgAAIAALbg");
	this.shape_14.setTransform(379.2,304.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#305992").s().p("AgbCiIAAlDIA3AAIAAFDg");
	this.shape_15.setTransform(290.325,297.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#305992").s().p("AgbCiIAAlDIA3AAIAAFDg");
	this.shape_16.setTransform(409.05,296.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#5085C4").s().p("AhOnBICdijIAAQmIidCjg");
	this.shape_17.setTransform(527.3,297.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#305992").s().p("AosGiIAAtDIRYAAIAANDgAn4FuIPwAAIAArbIvwAAg");
	this.shape_18.setTransform(333.65,304.175);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#305992").s().p("AosGiIAAtDIRZAAIAANDgAn4FuIPwAAIAArbIvwAAg");
	this.shape_19.setTransform(451.45,304.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#4263AC").s().p("Ay5IUIAAwnMAlzAAAIAAQng");
	this.shape_20.setTransform(398.425,306.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#53555B").s().p("A0IIUIAAwnMAoRAAAIAAQng");
	this.shape_21.setTransform(406.275,289.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]}).wait(503));

	// Layer_14
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#60A8DC").s().p("AgvFuIAArbIBgAAIAALbg");
	this.shape_22.setTransform(256.25,304.175);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#60A8DC").s().p("AgvFuIAArbIBfAAIAALbg");
	this.shape_23.setTransform(138.425,304.175);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#305992").s().p("AgbCiIAAlDIA3AAIAAFDg");
	this.shape_24.setTransform(49.55,297.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#305992").s().p("AgbCiIAAlDIA3AAIAAFDg");
	this.shape_25.setTransform(168.3,296.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#5085C4").s().p("AhOnBICdijIAAQmIidCjg");
	this.shape_26.setTransform(286.525,297.975);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#305992").s().p("AorGiIAAtDIRXAAIAANDgAn3FuIPvAAIAArbIvvAAg");
	this.shape_27.setTransform(92.85,304.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#305992").s().p("AorGiIAAtDIRXAAIAANDgAn3FuIPwAAIAArbIvwAAg");
	this.shape_28.setTransform(210.65,304.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#4263AC").s().p("Ay5IUIAAwnMAlzAAAIAAQng");
	this.shape_29.setTransform(157.625,306.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#535763").s().p("A0IIUIAAwnMAoRAAAIAAQng");
	this.shape_30.setTransform(165.5,289.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]}).wait(503));

	// Layer_15
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#474A4B").s().p("EghGADsIAAnXMBCNAAAIAAHXg");
	this.shape_31.setTransform(242.975,353.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_31).wait(503));

	// Layer_16
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#697071").s().p("EghGADsIAAnXMBCNAAAIAAHXg");
	this.shape_32.setTransform(242.975,376.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(503));

	// Layer_17
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#D0EDF6").s().p("EglKABJIAAiRMBKVAAAIAACRg");
	this.shape_33.setTransform(264,353.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(503));

	// _Group__3
	this.instance_1 = new lib.Group_3();
	this.instance_1.setTransform(401.8,267.55,1,1,0,0,0,28.6,112.6);
	this.instance_1.alpha = 0.5391;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(503));

	// _Group__4
	this.instance_2 = new lib.Group_4();
	this.instance_2.setTransform(321.15,267.5,1,1,0,0,0,94.8,130.3);
	this.instance_2.alpha = 0.5117;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(503));

	// Layer_20
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#D0EDF6").s().p("A7yArIAAhVMA3kAAAIAABVg");
	this.shape_34.setTransform(321.1,163.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_34).wait(503));

	// Layer_21
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#DEEFE2").s().p("AjmAfIAAg8IHNAAIAAA8g");
	this.shape_35.setTransform(71.85,154.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#DEEFE2").s().p("AjmAeIAAg8IHNAAIAAA8g");
	this.shape_36.setTransform(71.85,229.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#63C190").s().p("AhlARIAAgiIDLAAIAAAig");
	this.shape_37.setTransform(75.775,285.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#63C190").s().p("AhlARIAAgiIDLAAIAAAig");
	this.shape_38.setTransform(76.975,210.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#9BD3B1").s().p("AmCAxIBnhiIKeAAIhnBig");
	this.shape_39.setTransform(75.775,135.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#63C190").s().p("AkHFfIAAq9IIPAAIAAK9gAjmE+IHNAAIAAp7InNAAg");
	this.shape_40.setTransform(71.85,258.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#63C190").s().p("AkHFfIAAq9IIPAAIAAK9gAjmE+IHNAAIAAp7InNAAg");
	this.shape_41.setTransform(71.85,183.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#79C694").s().p("AlPL8IAA33IKfAAIAAX3g");
	this.shape_42.setTransform(70.625,217.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#6DC6AF").s().p("AlPMtIAA5aIKfAAIAAZag");
	this.shape_43.setTransform(80.925,212.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]}).wait(503));

	// Layer_22
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#DEEFE2").s().p("AgkEYIAAovIBJAAIAAIvg");
	this.shape_44.setTransform(205.6,95.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#DEEFE2").s().p("AgkEYIAAovIBJAAIAAIvg");
	this.shape_45.setTransform(115.5,95.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#63C190").s().p("AgVB8IAAj3IAqAAIAAD3g");
	this.shape_46.setTransform(47.5,100.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#63C190").s().p("AgUB8IAAj3IApAAIAAD3g");
	this.shape_47.setTransform(138.325,101.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#9BD3B1").s().p("Ag7FYIAAssIB3B9IAAMsg");
	this.shape_48.setTransform(228.775,100.175);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#63C190").s().p("AmpFAIAAp/INTAAIAAJ/gAmBEYIMDAAIAAovIsDAAg");
	this.shape_49.setTransform(80.625,95.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#63C190").s().p("AmoFAIAAp/INRAAIAAJ/gAmBEYIMDAAIAAovIsDAAg");
	this.shape_50.setTransform(170.75,95.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#79C694").s().p("AudGXIAAstIc7AAIAAMtg");
	this.shape_51.setTransform(130.175,93.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#6DC6AF").s().p("AvZGXIAAstIezAAIAAMtg");
	this.shape_52.setTransform(136.2,106.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]}).wait(503));

	// Layer_23
	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#B7DEC0").s().p("AgeDzIAAnlIA+AAIAAHlg");
	this.shape_53.setTransform(360.75,90.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#B7DEC0").s().p("AgeDzIAAnlIA9AAIAAHlg");
	this.shape_54.setTransform(284,90.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#4FAE80").s().p("AgRBrIAAjVIAjAAIAADVg");
	this.shape_55.setTransform(226.125,94.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#4FAE80").s().p("AgRBsIAAjWIAjAAIAADWg");
	this.shape_56.setTransform(303.475,96.05);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#99D2AC").s().p("AgyErIAArBIBlBsIAALBg");
	this.shape_57.setTransform(380.475,94.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#4FAE80").s().p("AlpEVIAAopILTAAIAAIpgAlHDzIKPAAIAAnlIqPAAg");
	this.shape_58.setTransform(254.35,90.675);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#4FAE80").s().p("AlqEVIAAopILVAAIAAIpgAlHDzIKQAAIAAnlIqQAAg");
	this.shape_59.setTransform(331.05,90.675);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#70C38C").s().p("AsTFhIAArBIYnAAIAALBg");
	this.shape_60.setTransform(296.525,89.375);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#48BD9E").s().p("AtHFhIAArBIaPAAIAALBg");
	this.shape_61.setTransform(301.65,100.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53}]}).wait(503));

	// Layer_24
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#5A5948").s().p("A5vAnIAAhNMAzfAAAIAABNg");
	this.shape_62.setTransform(244.5,12.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_62).wait(503));

	// Layer_25
	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#CFC49A").s().p("EggJABOIAAibMBATAAAIAACbg");
	this.shape_63.setTransform(249.075,53.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_63).wait(503));

	// Layer_26
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FCFDF8").s().p("A2nBOIjIibMAzfAAAIjICbg");
	this.shape_64.setTransform(244.5,24.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_64).wait(503));

	// Layer_27
	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#DAD3BF").s().p("EggMAFeIAFq7MBAUAAAIgFK7g");
	this.shape_65.setTransform(249.325,18.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_65).wait(503));

	// Layer_4
	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFE4A8").s().p("EggJAfQMAAAg+fMBATAAAMAAAA+fg");
	this.shape_66.setTransform(249.075,189.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_66).wait(503));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.5,-16.7,534.7,423.8);


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
	mask_1.graphics.p("AhaAdQBJhZBYgPQBOgMANAoQAeBihtAXQgaAFgXAAQhIAAg0gyg");
	mask_1.setTransform(16.8196,1.3964);

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
	this.instance_4 = new lib.Group_1_1();
	this.instance_4.setTransform(-26.05,-4.25,2.3635,2.3635,0,0,0,5.2,3.6);
	this.instance_4.alpha = 0.3398;

	this.instance_5 = new lib.Group_2_1();
	this.instance_5.setTransform(30.95,-7.05,2.3635,2.3635,0,0,0,7.2,4);
	this.instance_5.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.1,-16.5,95,27.1);


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

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#343433").s().p("AAIgGQgVgDgdASQgJAGgIgGIgHgGQAEAEAMgCQgPgFgFgPQAFAJAUAFQgMgEgFgMQACAEAGACQANAGAagJQAYgJAhAUQARAJAMAMQgvgWgQgCg");
	this.shape.setTransform(-8.6515,-58.1353,1.9745,1.9745,8.7711);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AgpAIQASgTAYABQAaACAKgJQAGgFAAgFQAAAOgLAGQARgJACgKQgBAQgLAJQAMgCACgFQgBAFgEADQgGAHgJgEQglgDgGAAQgaACgQAag");
	this.shape_1.setTransform(34.5353,-56.8911,1.9745,1.9745,8.7711);

	this.instance = new lib.Group();
	this.instance.setTransform(32.1,-59.75,1.9745,1.9745,8.7711,0,0,4.3,3.2);
	this.instance.alpha = 0.3398;

	this.instance_1 = new lib.Group_1();
	this.instance_1.setTransform(-7.5,-62.4,1.9745,1.9745,8.7711,0,0,6,3.2);
	this.instance_1.alpha = 0.3398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_1},{t:this.shape}]},897).to({state:[]},31).wait(2929));

	// Layer_8
	this.instance_2 = new lib.gjkfujyuli("single",0);
	this.instance_2.setTransform(-0.9,-27.2,0.6362,0.6362,0,-0.9098,179.0902,16.3,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(490).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(238).to({startPosition:2},0).wait(31).to({startPosition:1},0).wait(563).to({startPosition:10},0).wait(6).to({startPosition:11},0).wait(8).to({startPosition:10},0).wait(4).to({startPosition:9},0).wait(7).to({startPosition:8},0).wait(826).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(714).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(11).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(46).to({startPosition:1},0).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_19
	this.instance_3 = new lib.hkjdtykukuk("synched",0);
	this.instance_3.setTransform(5.15,-52.25,0.6815,0.6955,0,0.6788,-179.3201,11.7,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},897).wait(31).to({_off:false,startPosition:11},0).wait(2808).to({startPosition:14},0).to({_off:true},1).wait(1).to({_off:false,startPosition:16},0).wait(119));

	// Layer_12
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C0A07E").s().p("AgMAAQABgcAYAKQgRADgBAPQgCARASABQgHADgEAAQgOAAACgVg");
	this.shape_2.setTransform(10.2579,-39.8502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_13
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C0A07E").s().p("AgMARQASAAAAgQQABgPgRgFQAZgHgCAcQgBATgMAAQgEAAgIgEg");
	this.shape_3.setTransform(19.4726,-39.1227,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_14
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AgrBmIgJgtIgDgXQgBgRAKgiQAFgSAHgHIAOgKIAhgUQAHgEADgEIAGgIQALgNAQAAIgCABQAFAMgHANQgHANgNACQAEAKgGALQgGAKgLACQABANgDAHQgFALgKgBQABAEgEAGIgHAKQgCAFgBALQgDAKgGABQAJASgPAbQgFAHgEAAIgCAAg");
	this.shape_4.setTransform(-20.7054,-73.0704,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_15
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("Ai8BFQgTgcAVg5QAIgZAMgJQAGgFAOgGIAfgOQAUgIAKAAQALgBAUAJQAVAJAJACQAIABANgCQAOgBAGAAQAMABAIAHQAKAIgBAKQAKgLARABQARACAJANQATgOAWAJQADgGAIgCQAHgBAHADQAJAFAKARIAHABQAHAHAAALQAAAKgGAJQgIALgZANQgPAIgHAAQgPAAgEgLQgEASgOAHQgHAEgIgCQgJgBgFgGQgCAFgFABQgGAAgFgDQgEgDgHgOQgKAIgNgGQgNgFgBgMQgFAFgJAAQgKAAgGgFIgEgEIgEgDQgDAAgHADQgLAEgLgDQgMgDgHgJQgBAHgHACQgHACgFgEQAEAHgIAHQgIAGgHgFQAHALgIAOQgHAMgNAIQgLAGgHAAIgBAAQgOAAgLgPg");
	this.shape_5.setTransform(8.8064,-98.6399,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_16
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("Aj1DbIgFgCQgHgGgDgJQgDgKADgJQACgLgBgCIgEgGIgEgFQgCgFAFgJQAEgLAAgFIgEgJQgHgQAOghQgIgFgBgMQgBgLAEgMIAHgVQAEgLgCgIIgDgQQgBgKAEgEIAFgEQADgCABgDQACgDgCgIQgEgUALgSQAMgSASgCQgCgKADgIQADgKAHgGQAOgNARAHQABgOANgIQAMgHAPABQASACAFgEQAEgCAFgFQAEgEAKgEQAlgPAVAHIAIACQAEAAAHgEQASgJAWAFQAWAFAOARQAEgJALgCQAKgCAJAGQALAJAKAaQAQgFANAOQANAOgDASQAKgGAMACQAMACAJAIQAJAIAEANQAFANgDAMQANAAALAHQALAIAEANQAFANgDAPQgDANgJAJQgBASgPAKQgQALgPgIIAAgCQgDgFgLgDQgigFgRgEQgdgHgNgRIgNgVQgPgWgfgIQgVgFgiABQglAAgUAEQgfAGgUARQgPANgSAdQg4BdgaBrQgCAMgGAAIgBAAg");
	this.shape_6.setTransform(-2.9853,-102.2674,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_17
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C0A07E").s().p("AAOAVQgDgPgJgNQgIgTgNgUQAGABAJAJQAFAHAFAHQARAcgFApIgEgag");
	this.shape_7.setTransform(-37.1841,-51.1724,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D3B289").s().p("AALBHQgWgCgSg9QgXhOAoAAQANgBAMAOQAOAOgCATQAAAOAGABQADAAAEgDIgHBJQgHAKgLAAIgCAAg");
	this.shape_8.setTransform(-35.256,-50.1502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_21
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#453B33").s().p("Ag5APIANgPQAUgRAYABQAaABASAPQAKAIAFAIQgtgYgiAMIgWAKQgGADgEAAIgFgCg");
	this.shape_9.setTransform(36.6416,-68.6742,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1491).to({skewX:180,x:34.8916,y:-66.3258},0).wait(25).to({skewX:0,x:36.6416,y:-68.6742},0).wait(2220).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_22
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AA5AQQgRgIgMgEQgugOg7AVIATgOQAZgQAhABQAiABAZARQAMAJAHAJIgHABQgFAAgJgDg");
	this.shape_10.setTransform(-7.9699,-69.8871,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1491).to({rotation:-6.7472,x:-8.4953,y:-71.6483},0).wait(25).to({rotation:0,x:-7.9699,y:-69.8871},0).wait(2220).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_23
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D3B289").s().p("AhMDzIg/gmQgzgrgIhEIAEgXIADhHQAKguAGgXQALgoAVgVQAdgaAFgVQACgMgGgbQgHgdAegRQAjgTAxAlQBDA1BBgUQAhgKASgVQAUBCACAsQADA5gXAiQgUAcACAmQADA7gCANQgGAsgrA3QgrA5gqAOQgIACgLAAQghAAg0gag");
	this.shape_11.setTransform(7.6437,-52.1747,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_24
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AiJDoQhpgngDhVQgFiPARg/QAchuBkgfQCXgvB0BrQA6A2AbA/QgXChiDBeQgpAdgvATIglANQg0gCg1gUg");
	this.shape_12.setTransform(-4.9858,-87.1284,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_25
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BEBB89").s().p("AgpB/QgYgDgBgOQgEgrgQhHQgShUgFgeQAAgHABgBQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABIACAEQAXgJAXAOQAWAOADAXQAVgEASAQQASAPgBAWQAcgDATAUQAJAKAEAMQADANgCANQAJABAHAJQAGAIgCAKQgCAJgKAFQgKAEgJgEQADAOgNAJQgOAKgMgGQgFAQgJAGQgGADgIgCQgHgCgCgGQgHAKgUAAIgTgCg");
	this.shape_13.setTransform(35.1121,-115.8188,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_26
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AD5ByQgMgKgdAFQgZAEg/ACQgRABgJgBQgPgCgLgHIgPgIQgEAAgLADQgPAFgQgEIgJgEQgHgCgEAAQgJgBgOAHQgRAIgGABQgKACgPgDIgagFIgjACQgUACgLgJIgGgFIgHgEQgDgBgLABQgMABgLgFQgMgGgIgKQgHgLgDgOQgCgOAEgMQAEgMAHgIQAMgOAigSQgEgEADgHQADgGAGgDIAMgDQAHgBAEgDQAGgDAJgMQAEgEAFgBQAFgBAEAEQgBgJAHgGQAHgGAHADIAMAGQAEABAGgEIALgHQAEgBAOAAQAMABAEgFIAHgJQAGgEALAIQAMAHAGgBIAKgHQAIgEAJADQAJAEAEAJQADgMAMgGQAMgFALAEQAVAGAMAcQASgFAQASQAKAMAHAYQAKgIANAGQANAHACAOQAUAKAMAXQALAXgEAZQAIgCAHAHQAGAGABAJQACANgKAOIACADIgGACIAEgFg");
	this.shape_14.setTransform(4.957,-129.5749,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_27
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#453B33").s().p("AAEBBQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgQACgJgFQgGgCgEgHQgDgGACgGQgDAEgGgBQgFAAgEgDQgGgFgEgMQgEgMAGgFQgGAAAAgLQABgUAPgQQAQgQAUgBQAKgBATAEQAIACAGADIAHAFQADADAEABIAHACQAGACAEAFIABABQAKAIAAAKQAAAFgEAFQgEAEgFAAQAJAHgDAOQgCAOgMAEQADAMgHAHQgEAEgGgBQgGgBgCgEQgFAGgIAFQgEADgEAAIgBAAg");
	this.shape_15.setTransform(42.55,-97.877,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	// Layer_28
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#453B33").s().p("AAXCDQgMgBgEgZQgIAAgHgIQgHgIgCgKQgJAAgIgJQgHgJABgLQgUgEgIgLQgFgIACgJQACgKAHgDQgNgSgCgNQgBgKAEgJQAEgJAHgDQgLgMAFgUQAFgTAOgFIgCgCQAFgOAaAAQASgBAJAHQAKAHABANQAGgGAJAEQAIADAEAJQAFALgDAZQAHgBAHAFQAGAEADAIQAEAJABAWIAEBJQABAZgFALQgEAKgOAMIgYAIIgIACIgBAAg");
	this.shape_16.setTransform(-41.1679,-53.4973,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(119));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.3,-152.6,112.6,152.6);


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

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#343433").s().p("AgpAMQAQgWAZgBQAZgBAKgKQAFgFAAgEQABANgKAIQAQgLABgKQABAQgKAJQALgCACgFQgBAEgDAEQgGAHgJgCQgkAAgIAAQgaAFgOAbg");
	this.shape.setTransform(32.0398,12.9904,1.9087,1.9087,4.9447);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AAIgFQgWgCgdATQgIAGgJgFIgHgGQAEADALgCQgOgFgGgOQAGAIAUAEQgNgDgFgNQACAFAHACQANAGAagLQAZgKAiAUQASAJALALQgvgUgRgCg");
	this.shape_1.setTransform(-10.3664,12.3735,1.9087,1.9087,4.9447);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},895).to({state:[]},40).wait(2802));

	// Layer_32
	this.instance = new lib.ghjdtjtyktyktut("single",16);
	this.instance.setTransform(-3.8,42.95,1.0235,1.0235,10.0575,0,0,6,-5.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(114).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(732).to({startPosition:8},0).wait(40).to({startPosition:8},0).wait(559).to({startPosition:2},0).wait(6).to({startPosition:4},0).wait(13).to({startPosition:4},0).wait(8).to({startPosition:2},0).wait(8).to({startPosition:1},0).wait(6).to({startPosition:8},0).wait(687).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(10).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(528).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(21).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(6).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(6).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(173).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(15).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(5).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(224));

	// Layer_31
	this.instance_1 = new lib.ghjkdtktuktuykut("synched",0);
	this.instance_1.setTransform(2.75,17.15,0.6716,0.6664,0,13.1605,12.17,-7.9,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},895).wait(40).to({_off:false,startPosition:35},0).wait(559).to({startPosition:44},0).wait(41).to({startPosition:35},0).wait(2202));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#604A3E").s().p("AATAcQgEgUgLgRIgMgXQgHgNgJgPQAIABALAMQAHAJAGAJQAXAkgHA2IgFghg");
	this.shape_2.setTransform(-50.0511,18.0249,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3737));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8A6945").s().p("AANBcQgsgMgXhPQgPgzANgZQALgVAbAEQAYADAVAUQAVAVgBAZQgBASAIAAQAEABAFgEIgJBfQgMAHgNAAQgHAAgJgCg");
	this.shape_3.setTransform(-50.1311,17.8006,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3737));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AgWBrQgUgGgUgZQgUgaAIAIIAMANIANgNQAiAcAOgEQAUgJASgaQAjgygRhUIADgOQAFgMAGAKQADAGADAWQAEAggDAdQgIBchKAdIgGACIgKgCg");
	this.shape_4.setTransform(-23.4852,-24.4348,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3737));

	// Layer_7
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("ABLDIIAlglQA2gkgFg7QgBgTgHgTIgHgPQgLghg+gIIg7gBQgmAShDgdQglgQgmgaIgCgCQghgTgHgcIgBgXQALgLAkgOIAigMQBMgYBEAfQAiAPATAUQBiAsAfBjQAPAxgEApQgNBRg+AYQgTAIgWABg");
	this.shape_5.setTransform(24.5004,-27.4311,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3737));

	// Layer_8
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D342E").s().p("AgHBoQAOgwgTgzIgWgpQABgPgNghIgOggIBEgDQAjALAMBEQAHAigBAfIg0Bfg");
	this.shape_6.setTransform(51.1911,-17.4901,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3737));

	// Layer_9
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("Ag0gHQAVhbBaAPIgDAGIABAbQAAAggGAYQgWBRhTAAQgIgxAKgtg");
	this.shape_7.setTransform(-23.4378,-28.6297,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3737));

	// Layer_11
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AgKAXQgIgIABgPQAAgOAKgIQAJgJAQAGQgYAEgCAVQgBAWAYADQgHADgGAAQgHAAgFgFg");
	this.shape_8.setTransform(2.927,31.5965,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3737));

	// Layer_12
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("AgRAYQAZAAABgWQABgWgYgGQAPgFAKALQAIAJgBAOQgBAOgJAHQgFAEgFAAQgHAAgIgEg");
	this.shape_9.setTransform(17.4563,32.4696,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3737));

	// Layer_15
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("Ag6AWQAEgMAKgLQATgXAZABQAaABATAWQAKAMAEALQgsgigjARIgXAPQgFADgFAAQgDAAgCgCg");
	this.shape_10.setTransform(35.1626,-3.9777,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1494).to({skewX:-174.0174,skewY:5.9826,x:34.8422,y:-4.8636},0).wait(41).to({skewX:0,skewY:0,x:35.1626,y:-3.9777},0).wait(2202));

	// Layer_16
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#604A3E").s().p("AA7AWQgTgLgMgFQgvgVg7AfQAGgLAMgKQAagWAiABQAiABAaAZQANAMAGANQgDACgDAAQgGAAgIgFg");
	this.shape_11.setTransform(-10.1748,-5.8566,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1494).to({skewX:-174.0174,skewY:5.9826,x:-10.4436,y:-7.7202},0).wait(41).to({skewX:0,skewY:0,x:-10.1748,y:-5.8566},0).wait(2202));

	// Layer_20
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#8A6945").s().p("AgaD3IhGgnQg5gsgJhEQgSAKgXgGQgtgLgXhQQgPgzANgYQALgVAbADQAZADAUAUQAWAWgBAYQgBARAIABQAEAAAEgDIAAAAQALgvAHgXQAMgpAYgVQAggbAFgVQADgMgHgbQgIgeAigRQAngUA1AmQBMA2BIgVQAkgKAVgVQAWBDACAtQADA6gaAiQgWAeADAlQAEA9gDANQgHAtgvA4QgxA5guAOQgKADgMAAQglAAg5gbg");
	this.shape_12.setTransform(-7.9708,16.2474,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3737));

	// Layer_21
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D342E").s().p("AAqAPQhHgyhQgPIAAgOQBTAQBLA1QAmAbAXAYIgJAJQgWgYglgag");
	this.shape_13.setTransform(-44.0447,-3.168,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3737));

	// Layer_22
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("AAtAOQhMg0hTgNIABgNQBWAOBOA2QApAbAWAZIgJAJQgVgYgngbg");
	this.shape_14.setTransform(-42.9802,-10.0871,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3737));

	// Layer_23
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("AAtAOQhMg0hTgNIABgNQBWAOBPA2QAoAbAXAZIgJAJQgXgYgmgbg");
	this.shape_15.setTransform(-42.3996,-16.5708,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3737));

	// Layer_24
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("AArAPQhKg0hQgOIADgMQBTAPBMA1QAmAbAXAYIgKAIQgVgXgmgag");
	this.shape_16.setTransform(-42.0609,-23.49,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3737));

	// Layer_25
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("AAvANQhQg2hXgLIAEgNQBZAMBSA4QApAcAYAaIgJAJQgXgagpgbg");
	this.shape_17.setTransform(-39.3029,-27.6027,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3737));

	// Layer_26
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("AAyAKQhWg4hcgHIAFgNQBeAIBYA6QAsAeAaAcIgKAJQgZgcgsgdg");
	this.shape_18.setTransform(-36.4482,-31.5704,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3737));

	// Layer_27
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D342E").s().p("AA2AIQhcg7hhgDIAGgMQBjAEBcA9QAvAeAbAdIgJAJQgcgdgtgeg");
	this.shape_19.setTransform(-33.3999,-35.4896,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3737));

	// Layer_28
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("AA4AGQhgg9hlABIAIgMQBmABBgA/QAxAeAcAfIgJAIQgcgfgxgeg");
	this.shape_20.setTransform(-30.158,-39.4088,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3737));

	// Layer_29
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#453B33").s().p("AiZDsQh1gogDhWQgGiSASg/QAghwBvggQCpgwCBBtQBBA3AeBAQgaCkiSBfQhJAwhCAPQg6gDg7gUg");
	this.shape_21.setTransform(-11.7993,-19.2695,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(3737));

	// Layer_30
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#3D342E").s().p("AglBWQgTgigCgxQgCgxAQgkQAPgjAZgBQAXgBATAiQATAiACAxQADAxgQAkQgQAjgZABIgBAAQgXAAgSghg");
	this.shape_22.setTransform(43.0122,-13.6193,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(3737));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.2,-69.3,130.4,138.6);


(lib.oy8y89 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#343433").s().p("AAsAbQgQgZgggDIgdgCQgKAAgEgJQgCgEAAgFQAAAGALAFQgIgMAEgQQgBALANAOQgIgKAEgOQgBAFAEAGQAHANAYAFQAZAHAPATQAIALACAJIAAABQgCgGgEgGg");
	this.shape.setTransform(-42.6875,13.9654,2.0058,2.0058,-19.2606);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("AAeAQIgmgSQgfgPgWAFIAIgDQAdgJAaAMQAbAMAPgFQAHgDACgEQgGANgOADQAWgEAHgIQgHAQgQAEIAHABQAIABADgDQgDAEgFACQgFADgEAAQgFAAgFgEg");
	this.shape_1.setTransform(5.2656,13.0916,2.0058,2.0058,-19.2606);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},900).to({state:[]},31).wait(2832));

	// Layer_24
	this.instance = new lib.hmjdtyktrktuk("single",0);
	this.instance.setTransform(-6.65,47.9,0.7051,0.7051,10.207,0,0,-0.1,0.5);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(676).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(164).to({startPosition:10},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:1},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(29).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(52).to({startPosition:11},0).wait(62).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(211).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:10},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(1629).to({startPosition:1},0).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_23
	this.instance_1 = new lib.hjluyglyilyitl("synched",0);
	this.instance_1.setTransform(-10.65,17.25,0.7186,0.7296,10.6105,0,0,13.3,3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},900).wait(31).to({_off:false,startPosition:31},0).wait(2805).to({startPosition:36},0).to({_off:true},1).wait(1).to({_off:false,startPosition:38},0).wait(25));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#BEA840").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_2.setTransform(35.0824,34.8452,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F5F6F6").s().p("AAbAvQgegUgrgQQhUgfg4AUQgOACgSAFQgkALgUAOIAWgQQAegTAhgRQBug2B1gHIBDAKQBUAYBWBAQglAfgyATQgnAPghAAQgzAAgmgjg");
	this.shape_3.setTransform(-26.8673,-18.6572,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_4
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E7E6E6").s().p("ABqCEIlwguQAMg/Aqg9QBTh8CUAJIAjAEQAqAJAlAXQB0BKAKC7QgRAIgdACIgRABQgwAAgugXg");
	this.shape_4.setTransform(-0.0456,-43.7588,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_10
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D5AE90").s().p("AgQASIARgQQAPgSABgiQAFAXgHATQgDAIgFAEQgcAMARASQAIAKAPAGQgsgNAJgTg");
	this.shape_5.setTransform(-25.5195,28.7486,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_11
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D5AE90").s().p("AgEgRQAKgSAKgCIgLASIgGAOQgHAKgDANIgDAUQgEgiAOgVg");
	this.shape_6.setTransform(36.2567,22.7972,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EBBF9A").s().p("AgWBGIgLgDIgIhfIAIAKQAHAHgBgSQgBgYALgLQAKgKAPAGQAmANgFA3QgFA8gjAJQgFACgHAAIgLgBg");
	this.shape_7.setTransform(36.0573,23.8249,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_14
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("AAsAOQgNgKgKgEQgjgTgtAjQAFgIAKgIQATgOAZgCQAagBAUARQAJAHAEAIQgCACgDAAQgEAAgGgDg");
	this.shape_8.setTransform(-45.2377,-0.392,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1493).to({rotation:7.9505,x:-45.7873,y:0.1939},0).wait(62).to({rotation:0,x:-45.2377,y:-0.392},0).wait(2181).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_15
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("Ag7AAQATgVAjgBQAdAAAbAPQAOAHAIAIQg9ggglARQggAZgPAEg");
	this.shape_9.setTransform(-0.481,-0.8634,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1493).to({skewX:-169.2659,skewY:10.7341,x:0.6027,y:-3.3732},0).wait(62).to({skewX:0,skewY:0,x:-0.481,y:-0.8634},0).wait(2181).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_18
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EBBF9A").s().p("AhJEVQgtgNguhCQgqg8gIgwIgDhIQgCgkgXgeQgXgfAVhBQAfhOANgmIA0gQQA+gKAzAgQAnAaAQgFIAAgHQADgLAEAEQADADgDAGQgDAEgEABQACARAaAXQATARAxAnQAYAVAMAoQAHAYAKAvIAIAJQAIAGgBgRQgBgYAMgMQALgLAPAEQApALgJA9QgIBDgiAHQgLACgMgEIgKgEIAAAAQgEAfgOAZQgQAbgfAYQgfAZgnAWQg8AkgmAAQgKAAgIgDg");
	this.shape_10.setTransform(-4.9747,19.541,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_19
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AhQCuQh+hjgaikQAQg1AxgsQBjhWCpAzQBVAaAeBhQAVBGgEB+QgDBWhgAlQgdAMgkAFIgdADQg5gRg/gyg");
	this.shape_11.setTransform(1.2893,-13.7068,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_20
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AgfDTQARgmAHgdQAPhGAEg1QAFhDgNg2QgKgsgYgiQgYgigfgQIghgsQAngNAzAJQA2AKAcAeQAPAPAVAfQAQAYgCAIQgDALAMAbQAEAJABAZIAABeIABAXQAAAOgCAJIgNA5QgFASgTAdQghAygXAWQgPAPgyAkQAAgwAKgWg");
	this.shape_12.setTransform(26.6149,-6.7923,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_21
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("AARDaQgshFAZhZQAMgsADguQAFhggwgVQgUAGgTAMQgmAZACAhIgjhsIAbgeQAgghAggPQBmgxA8CVIAJAfQAKAmAFAkQAPBzguA2IghA0QgcA8AWApQgbgRgXgjg");
	this.shape_13.setTransform(52.3259,-6.6126,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	// Layer_22
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#DDDCDC").s().p("AhfAcIgFgSQAsgoBTgJQApgEAhADQgHAehHAcIhEAXIgOABQgaAAgKgOg");
	this.shape_14.setTransform(-60.0437,-14.7608,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3736).to({_off:true},1).wait(1).to({_off:false},0).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.1,-73.7,159.7,147.4);


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

	// Layer_32
	this.instance = new lib.fgryjdsrtyjrsyj("single",6);
	this.instance.setTransform(0.9,-29.55,2.2899,2.2149,0,5.3419,4.9942,2.8,-2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:17},0).wait(3).to({startPosition:16},0).wait(5).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(9).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(112).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(3).to({startPosition:18},0).wait(3).to({startPosition:17},0).wait(4).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:25},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:25},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(13).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:25},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(11).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(5).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(6).to({startPosition:13},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(322).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:14},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(6).to({startPosition:11},0).wait(39).to({startPosition:16},0).wait(552).to({startPosition:22},0).wait(2).to({startPosition:22},0).wait(3).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(3).to({startPosition:23},0).wait(3).to({startPosition:22},0).wait(12).to({startPosition:21},0).wait(25).to({startPosition:6},0).wait(232).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(185).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(1034).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(8).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(4).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(3).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:17},0).wait(3).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(4).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:16},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:13},0).wait(6).to({startPosition:17},0).wait(4).to({startPosition:15},0).wait(3).to({startPosition:14},0).wait(385));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape.setTransform(-50.6918,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3737));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F4E4E").s().p("AAAAPQgDgbgIgJIANAFQANAJgDATQgCAFgCADQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBAAQgCAAgDgHg");
	this.shape_1.setTransform(53.3586,-62.8899,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3737));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEIgCANIhZAHg");
	this.shape_2.setTransform(30.4992,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3737));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape_3.setTransform(20.048,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3737));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4F4E4E").s().p("AgZAJIAAgSIAOAIQASADATgLIAAASg");
	this.shape_4.setTransform(-15.9993,-65.3268,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3737));

	// Layer_7
	this.instance_1 = new lib.Path_0();
	this.instance_1.setTransform(-7.6,-64.15,1.9349,1.9349,0,0,0,1.2,2.2);
	this.instance_1.alpha = 0.6016;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgeAAgUgWQgWgVAAgdIAAgPQAAgHAFgFQAFgGAIAAIBtAAQAIAAAFAGQAFAFAAAHIAAAPQAAAdgVAVQgVAWgfAAg");
	this.shape_5.setTransform(3.6055,-60.5454,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.instance_1}]}).wait(3737));

	// Layer_8
	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(-46.65,-64.05,1.9349,1.9349,0,0,0,1.2,2);
	this.instance_2.alpha = 0.6016;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgdAAgWgWQgVgVAAgeIAAgOQAAgHAFgFQAGgGAHAAIBtAAQAHAAAGAGQAFAFAAAHIAAAOQAAAegVAVQgWAWgeAAg");
	this.shape_6.setTransform(-35.5283,-60.1584,1.9349,1.9349);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.instance_2}]}).wait(3737));

	// Layer_31
	this.instance_3 = new lib.tyiktriruiu("synched",0);
	this.instance_3.setTransform(-7.4,-59.3,0.9299,0.899,0.0515,0,0,7.8,4.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#343433").s().p("AAIgJIgpAIQgQAEgDgFQAHACACgEQgKgEAEgFQAGAHAFgEQgKgBADgJQABADAFADQALAFAZgFQAagGASAUQAJAKADALQgUgdgZgBg");
	this.shape_7.setTransform(-38.0772,-62.0878,1.8353,1.8353);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#343433").s().p("AgsACQAegcAcADQAdADAKgGQAFgDAAgDQADAIgMAHQANgBAEgLQADAKgNAIQAKAFADgGQgBACgDACQgGADgLgEQgigMgXALQgOAGgtAlg");
	this.shape_8.setTransform(6.025,-62.3906,1.8353,1.8353,9.9711);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3,p:{mode:"synched",startPosition:0}}]}).to({state:[{t:this.instance_3,p:{mode:"single",startPosition:46}}]},886).to({state:[{t:this.shape_8},{t:this.shape_7}]},13).to({state:[{t:this.instance_3,p:{mode:"synched",startPosition:0}}]},39).wait(2799));

	// Layer_15
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("Ah7BCQgTgOgTgVIgOgRICrhsICrAKIAJA0QADAwgXgQQgWgNgbAWQgZAcgIACQgVAHgkATIgfASQgSAMgVAAQggAAgmgdg");
	this.shape_9.setTransform(-6.471,-116.4751,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3737));

	// Layer_16
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7EFE4").s().p("AgHAHQgCgDAAgEQAAgDACgDQADgDAEgBQAEABAEADQACADAAADQAAAEgCADQgEAEgEAAQgEAAgDgEg");
	this.shape_10.setTransform(43.515,-43.65,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3737));

	// Layer_18
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AF8E79").s().p("AgVAeIARgZQAOgNAHgbIAEgYQAFAWgKAYQgFANgGAHQghAYAWARQAKAJARADQgwgFAGgZg");
	this.shape_11.setTransform(-21.2596,-51.4885,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3737));

	// Layer_19
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#AF8E79").s().p("AgEgTQALgTAKgBQgHAKgEAIIgHAQQgIAKgCANIgEAWQgEgjAPgYg");
	this.shape_12.setTransform(44.7209,-56.4238,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3737));

	// Layer_20
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CDA688").s().p("AgYBKIgLgDIgJhkIAJAKQAIAHgCgTQgBgaAMgLQALgKAPAGQApAOgFA6QgFBAgmAKQgFACgHAAIgNgCg");
	this.shape_13.setTransform(44.5353,-55.3947,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3737));

	// Layer_22
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#292929").s().p("AAwASIgVgLQgkgQg1AbIAPgSQAUgSAbgBQAcgBAUATQALAIAEAKQgDADgEAAQgEAAgEgCg");
	this.shape_14.setTransform(-40.5308,-80.0868,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1489).to({rotation:-17.698,x:-42.2736,y:-83.6077},0).wait(51).to({rotation:0,x:-40.5308,y:-80.0868},0).wait(2197));

	// Layer_23
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#292929").s().p("Ag/AAQAUgaAlABQAfAAAeASQAPAHAIAJQhGgVgjANQgfAVgTAFg");
	this.shape_15.setTransform(7.0806,-80.7134,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1489).to({rotation:-7.461,x:6.2595,y:-77.1127},0).wait(51).to({rotation:0,x:7.0806,y:-80.7134},0).wait(2197));

	// Layer_24
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CDA688").s().p("AhOEmQg2gJgxhIQgqg+gJg3QgBgHAAhGQAAgngYgfQgZghAWhGQAihTANgpIA4gRQBCgKA2AiQAqAcAQgFIABgIQADgLADADQAEAEgEAGQgCAEgFACQACARAcAZQAUASA0ApQAaAXANArQAHAYALAzIAJAJQAIAHgBgSQgCgaANgNQAMgLARAEQAqALgIBBQgKBIgkAIQgMACgMgEIgLgFQgFApgIAWQgOAjgeAXQgUAagkAWQg3Aig7AAQgUAAgUgEg");
	this.shape_16.setTransform(0.8639,-59.8614,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3737));

	// Layer_25
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#292929").s().p("AhVC5QiGhqgciuIAPgiQAVgoAigdQBphcCzA3QBbAcAgBnQAXBKgFCHQgEBbhlAnQggANglAFIggADQg8gShDg1g");
	this.shape_17.setTransform(7.5073,-95.304,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3737));

	// Layer_26
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#AF8E79").s().p("AgfgIQA8goBLgmIAHAFQgWBbgaAWQgxApg3AKIgtAEQhDgQB6hPg");
	this.shape_18.setTransform(6.7922,-16.7476,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3737));

	// Layer_27
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#292929").s().p("AghDhQASgqAHgdQAlihgZhkQgLgvgZgkQgagkghgRIgigvQApgNA2AKQA5AKAeAgQASASAVAfQARAagCAIQgEALANAdQAEAKABAbQABAYAABMIAAAYQABAPgDAJIgNA9QgGATgUAfQgiA1gZAXQgQAQg1AnQgBgzALgXg");
	this.shape_19.setTransform(34.4749,-87.9723,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3737));

	// Layer_28
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEQgCAGAAAHIhZAHg");
	this.shape_20.setTransform(-43.1437,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3737));

	// Layer_29
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#373432").s().p("AgUA7QgDACgDgFQgMgPAAgWQgBgVAJgTQATgkArgNIAGAjQACANgBAGQgCAKgLARIgFARQgEANgOAMQgHAIgSALg");
	this.shape_21.setTransform(-46.556,-99.0031,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(3737));

	// Layer_30
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#292929").s().p("AiUCmQgkgxgGgGQgfggAYhLQAVhAAhghQAngnByglQATgGAfASQAjAWAQAAIgGAFIA5ArQAYARAIAMQAYAjgQAyQgLAhgYAaQgaAcgxAWQhfAphmgUQgLgCgOAMQgFAEgEAAQgFAAgEgFg");
	this.shape_22.setTransform(-18.5959,-108.2377,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(3737));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-145.7,117.9,145.7);


(lib.yiult78lt78l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.oi8908080("synched",0);
	this.instance.setTransform(-396.7,-194.6,1.1903,1.1903,0,0,0,5.3,5.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(101).to({_off:false},0).to({_off:true},82).wait(3554));

	// yul68l6rtl68
	this.instance_1 = new lib.yul68l6rtl68("synched",0);
	this.instance_1.setTransform(362.15,-221.4,1,1,0,0,0,1.2,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25).to({startPosition:0},0).to({regX:1.3,rotation:2.4951,x:356.8,y:-220.9},8).wait(38).to({startPosition:0},0).to({regX:1.2,rotation:0,x:362.15,y:-221.4},8).wait(106).to({startPosition:0},0).to({rotation:1.2258,x:367,y:-220.05},10).wait(125).to({startPosition:0},0).to({regY:7.9,rotation:-3.9304,x:359.75,y:-222.6},11).wait(130).to({startPosition:0},0).to({regY:8,rotation:0,x:362.15,y:-221.4},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regY:7.9,rotation:-2.2378,x:351.45,y:-223.35},8).wait(93).to({startPosition:0},0).to({regY:8,rotation:0,x:362.15,y:-221.4},8).to({regY:7.9,rotation:-6.1967,x:349.55,y:-224.7},8).to({regY:8,rotation:0,x:362.15,y:-221.4},8).to({regY:7.9,rotation:-5.4225,x:353.3,y:-223.85},8).to({regY:8,rotation:0,x:362.15,y:-221.4},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({regY:7.9,rotation:-2.2151,x:352.1,y:-223.05},7).wait(97).to({startPosition:0},0).to({rotation:-3.1954,x:362.65,y:-222.25},7).wait(60).to({startPosition:0},0).to({regY:8,rotation:0,x:362.15,y:-221.4},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regY:7.9,rotation:-4.6931,x:355.05,y:-223.5},7).wait(51).to({startPosition:0},0).to({regY:8,rotation:0,x:362.15,y:-221.4},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({regY:7.9,rotation:-3.664,x:351.6,y:-223.2},8).wait(118).to({startPosition:0},0).to({regY:8,rotation:0,x:362.15,y:-221.4},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// ui_798_7_8989_
	this.instance_2 = new lib.ui79878989("synched",0);
	this.instance_2.setTransform(359.95,-169.95,1,1,0,0,0,20.9,18.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(25).to({startPosition:0},0).to({rotation:-1.0002,x:355.85,y:-170.75},8).wait(38).to({startPosition:0},0).to({rotation:0,x:359.95,y:-169.95},8).wait(106).to({startPosition:0},0).to({rotation:1.2258,x:363.65,y:-168.7},10).wait(125).to({startPosition:0},0).to({regX:21.1,rotation:2.7489,x:356.85,y:-170.4},11).wait(130).to({startPosition:0},0).to({regX:20.9,rotation:0,x:359.95,y:-169.95},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regX:21,rotation:-0.2868,x:350.65,y:-172.05},8).wait(93).to({startPosition:0},0).to({regX:20.9,rotation:0,x:359.95,y:-169.95},8).to({rotation:-2.4916,x:349.1,y:-171.7},8).to({rotation:0,x:359.95,y:-169.95},8).to({rotation:-1.7042,x:352.35,y:-170.9},8).to({rotation:0,x:359.95,y:-169.95},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({rotation:-2.2151,x:351.9,y:-171.45},7).wait(97).to({startPosition:0},0).to({regX:21,rotation:0,x:360.1,y:-169.75},7).wait(60).to({startPosition:0},0).to({regX:20.9,x:359.95,y:-169.95},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regX:21,rotation:0.765,x:353.45,y:-170.95},7).wait(51).to({startPosition:0},0).to({regX:20.9,rotation:0,x:359.95,y:-169.95},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({rotation:-2.2151,x:351.05,y:-171.1},8).wait(118).to({startPosition:0},0).to({rotation:0,x:359.95,y:-169.95},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// o_y89_y89_
	this.instance_3 = new lib.oy89y89("synched",0);
	this.instance_3.setTransform(-343.75,-227.85,1,1,0,0,0,-7,67);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(25).to({startPosition:25},0).to({startPosition:33},8).wait(38).to({startPosition:71},0).to({startPosition:79},8).wait(106).to({startPosition:185},0).to({startPosition:195},10).wait(125).to({startPosition:320},0).to({startPosition:331},11).wait(130).to({startPosition:461},0).to({startPosition:473},12).wait(16).to({startPosition:489},0).to({startPosition:497},8).wait(66).to({startPosition:563},0).to({startPosition:575},12).wait(81).to({startPosition:656},0).to({startPosition:664},8).wait(12).to({startPosition:676},0).to({startPosition:684},8).wait(81).to({startPosition:765},0).to({startPosition:774},9).wait(13).to({startPosition:787},0).to({startPosition:795},8).wait(93).to({startPosition:888},0).to({rotation:-9.2142,x:-346.85,y:-231.25,startPosition:896},8).to({rotation:0,x:-343.75,y:-227.85,startPosition:904},8).to({regX:-7.2,regY:66.8,rotation:-5.9243,x:-346.05,y:-229.55,startPosition:912},8).to({regX:-7,regY:67,rotation:0,x:-343.75,y:-227.85,startPosition:920},8).to({regX:-7.1,regY:66.9,rotation:-5.2048,x:-347.3,y:-229.5,startPosition:928},8).to({regX:-7,regY:67,rotation:0,x:-343.75,y:-227.85,startPosition:935},7).wait(142).to({startPosition:1077},0).to({startPosition:1086},9).wait(110).to({startPosition:1196},0).to({startPosition:1206},10).wait(159).to({startPosition:1365},0).to({startPosition:1374},9).wait(74).to({startPosition:1448},0).to({startPosition:1456},8).wait(99).to({startPosition:1555},0).to({startPosition:1561},6).wait(125).to({startPosition:1686},0).to({startPosition:1693},7).wait(52).to({startPosition:1745},0).to({startPosition:1751},6).wait(21).to({startPosition:1772},0).to({startPosition:1779},7).wait(97).to({startPosition:1876},0).to({startPosition:1883},7).wait(60).to({startPosition:1943},0).to({startPosition:1950},7).wait(11).to({startPosition:1961},0).to({startPosition:1968},7).wait(132).to({startPosition:2100},0).to({startPosition:2109},9).wait(34).to({startPosition:2143},0).to({startPosition:2150},7).wait(51).to({startPosition:2201},0).to({startPosition:2208},7).wait(15).to({startPosition:2223},0).to({regY:66.9,rotation:-1.0116,x:-338.35,y:-229.25,startPosition:2230},7).wait(91).to({startPosition:2321},0).to({regY:67,rotation:0,x:-343.75,y:-227.85,startPosition:2328},7).wait(15).to({startPosition:2343},0).to({startPosition:2350},7).wait(103).to({startPosition:2453},0).to({startPosition:2464},11).wait(186).to({startPosition:2650},0).to({startPosition:2666},16).wait(108).to({startPosition:2774},0).to({startPosition:2786},12).wait(35).to({startPosition:2821},0).to({startPosition:2829},8).wait(21).to({startPosition:2850},0).to({regX:-7.1,regY:66.8,rotation:-1.2905,x:-338,y:-228.95,startPosition:2861},11).wait(94).to({startPosition:2955},0).to({regX:-7.2,rotation:-6.4572,x:-345.65,y:-230.35,startPosition:2964},9).wait(129).to({startPosition:3093},0).to({regY:66.7,rotation:-5.0689,x:-337.15,y:-230.7,startPosition:3105},12).wait(88).to({startPosition:3193},0).to({regX:-7,regY:67,rotation:0,x:-343.75,y:-227.85,startPosition:3202},9).wait(17).to({startPosition:3219},0).to({startPosition:3227},8).wait(118).to({startPosition:3345},0).to({startPosition:3353},8).wait(22).to({startPosition:3375},0).to({regY:66.8,rotation:-0.7362,x:-333.2,y:-228.9,startPosition:3382},7).wait(126).to({startPosition:3508},0).to({regY:67,rotation:0,x:-343.75,y:-227.85,startPosition:3514},6).wait(20).to({startPosition:3534},0).to({startPosition:3543},9).wait(113).to({startPosition:3656},0).to({startPosition:3665},9).wait(26).to({startPosition:3691},0).to({startPosition:3700},9).wait(37));

	// uio_79_t79_t79_
	this.instance_4 = new lib.uio79t79t79("synched",0);
	this.instance_4.setTransform(450.5,-82.8,1,1,0,0,0,-11.3,16.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(25).to({startPosition:0},0).to({regX:-11.2,rotation:-1.0002,x:448,y:-85.2},8).wait(38).to({startPosition:0},0).to({regX:-11.3,rotation:0,x:450.5,y:-82.8},8).wait(106).to({startPosition:0},0).to({rotation:1.2258,x:452.35,y:-79.6},10).wait(125).to({startPosition:0},0).to({regX:-11.2,rotation:2.7489,x:443.05,y:-78.95},11).wait(130).to({startPosition:0},0).to({regX:-11.3,rotation:0,x:450.5,y:-82.8},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({rotation:-0.2868,x:441.6,y:-85.4},8).wait(93).to({startPosition:0},0).to({rotation:0,x:450.5,y:-82.8},8).to({regX:-11.2,rotation:-2.4916,x:443.45,y:-88.55},8).to({regX:-11.3,rotation:0,x:450.5,y:-82.8},8).to({regX:-11.2,rotation:-1.7042,x:445.5,y:-86.5},8).to({regX:-11.3,rotation:0,x:450.5,y:-82.8},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({rotation:-2.2151,x:445.75,y:-87.85},7).wait(97).to({startPosition:0},0).to({rotation:0,x:450.55,y:-82.6},7).wait(60).to({startPosition:0},0).to({x:450.5,y:-82.8},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({rotation:0.765,x:442.75,y:-82.6},7).wait(51).to({startPosition:0},0).to({rotation:0,x:450.5,y:-82.8},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({rotation:-2.2151,x:444.9,y:-87.5},8).wait(118).to({startPosition:0},0).to({rotation:0,x:450.5,y:-82.8},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// uil7t8lt78l7l
	this.instance_5 = new lib.uil7t8lt78l7l("synched",0);
	this.instance_5.setTransform(91.6,-182.2,1,1,0,0,0,-19.4,6.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({regY:6.6,rotation:3.9347,x:98.35,y:-183.1},8).wait(66).to({startPosition:0},0).to({regY:6.5,rotation:-0.2798,x:90.05,y:-181.55},12).wait(81).to({rotation:-0.2798},0).to({regY:6.7,rotation:0,x:91.6,y:-182.2},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({startPosition:0},8).to({regY:6.8,rotation:-0.9495,x:88.2,y:-181.25},8).to({regY:6.7,rotation:0,x:91.6,y:-182.2},8).to({rotation:1.0002,x:94.55,y:-183.05},8).to({rotation:0,x:91.6,y:-182.2},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:1.4838,x:97.55,y:-182.8},7).wait(103).to({startPosition:0},0).to({rotation:0.2579,x:93.05,y:-182.05},11).wait(186).to({startPosition:0},0).to({regY:6.5,rotation:-0.0289,x:100.4,y:-183.6},16).wait(108).to({rotation:-0.0289},0).to({regX:-19.2,scaleX:0.9999,scaleY:0.9999,rotation:2.6991,x:96,y:-182.4},12).wait(35).to({startPosition:0},0).to({regX:-19.4,regY:6.7,scaleX:1,scaleY:1,rotation:0,x:91.6,y:-182.2},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({skewY:180,x:191.2},0).to({regX:-19.5,regY:6.6,skewX:-5.7027,skewY:174.2973,x:187.7,y:-183.5},9).wait(113).to({startPosition:0},0).to({regX:-19.6,regY:6.5,skewX:-6.6314,skewY:173.3686,x:182.25,y:-184.85},9).wait(26).to({startPosition:0},0).to({regX:-19.7,skewX:-4.6766,skewY:175.3234,x:188.35,y:-183.5},9).wait(37));

	// o_7y9_y789_
	this.instance_6 = new lib.o7y9y789("synched",0);
	this.instance_6.setTransform(77.65,-56.4,1,1,0,0,0,7.7,19.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({regY:19.7,rotation:3.9347,x:75.8,y:-58.55},8).wait(66).to({startPosition:0},0).to({regX:7.8,rotation:-4.996,x:76.7,y:-55.65},12).wait(81).to({startPosition:0},0).to({regX:7.7,regY:19.8,rotation:0,x:77.65,y:-56.4},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({startPosition:0},8).to({rotation:-0.9495,x:76.35,y:-55.3},8).to({rotation:0,x:77.65,y:-56.4},8).to({rotation:1.0002,x:78.4,y:-57.5},8).to({rotation:0,x:77.65,y:-56.4},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:30.4517,x:72.6,y:-54.35},7).wait(103).to({startPosition:0},0).to({regY:19.7,rotation:29.2248,x:70.95,y:-53.15},11).wait(186).to({startPosition:0},0).to({regY:19.6,scaleX:0.9999,scaleY:0.9999,rotation:28.9376,x:78.95,y:-54.45},16).wait(108).to({startPosition:0},0).to({regY:19.5,rotation:31.6663,x:68.3,y:-54.5},12).wait(35).to({startPosition:0},0).to({regY:19.8,scaleX:1,scaleY:1,rotation:0,x:77.65,y:-56.4},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({skewY:180,x:205.15},0).to({regX:7.5,skewX:-5.7027,skewY:174.2973,x:214.2,y:-59.6},9).wait(113).to({startPosition:0},0).to({regY:19.7,skewX:-6.6314,skewY:173.3686,x:210.65,y:-61.45},9).wait(26).to({startPosition:0},0).to({regX:7.4,skewX:-4.6766,skewY:175.3234,x:212.45,y:-59.2},9).wait(37));

	// uo_ly89_789_
	this.instance_7 = new lib.uoly89789("synched",0);
	this.instance_7.setTransform(-100,-183.1,1,1,0,0,0,13.5,17.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(676).to({skewY:180,x:-190.4},0).to({skewX:1.7042,skewY:181.7042,x:-185.9,y:-184.25},8).wait(81).to({startPosition:0},0).to({skewX:0,skewY:180,x:-190.4,y:-183.1},9).wait(114).to({startPosition:0},0).to({regY:17.2,skewX:-1.0002,skewY:178.9998,x:-193.85,y:-182.45},8).to({skewX:-0.2929,skewY:179.7071,x:-191.5,y:-182.95},8).to({skewX:-1.9491,skewY:178.0509,x:-196.1,y:-181.8},8).to({skewX:-0.2929,skewY:179.7071,x:-191.05,y:-182.9},8).to({regY:17.3,skewX:0,skewY:180,x:-190.4,y:-183.1},8).to({regY:17.2,skewX:3.1341,skewY:183.1341,x:-187.35,y:-184.2},7).wait(142).to({startPosition:0},0).to({regX:13.6,skewX:-1.5573,skewY:178.4427,x:-193.9,y:-182.5},9).wait(110).to({skewX:-1.5573},0).to({regX:13.7,regY:17.1,skewX:-2.5468,skewY:177.4532,x:-188,y:-183.8},10).wait(159).to({startPosition:0},0).to({regX:13.8,scaleX:0.9999,scaleY:0.9999,skewX:-2.7368,skewY:177.2632,x:-195.9,y:-182.15},9).wait(74).to({startPosition:0},0).to({regX:13.5,regY:17.3,scaleX:1,scaleY:1,skewX:0,skewY:180,x:-190.4,y:-183.1},8).wait(99).to({startPosition:0},0).to({regX:13.4,skewX:2.9581,skewY:182.9581,x:-184.95,y:-184.35},6).wait(125).to({startPosition:0},0).to({regY:17.2,skewX:1.957,skewY:181.957,x:-179.4,y:-186.55},7).wait(52).to({startPosition:0},0).to({regX:13.5,regY:17.3,skewX:0,skewY:180,x:-190.4,y:-183.1},6).wait(210).to({startPosition:0},0).to({regY:17.2,skewX:3.721,skewY:183.721,x:-184.75,y:-184.05},7).wait(132).to({startPosition:0},0).to({regY:17.3,skewX:0,skewY:180,x:-190.4,y:-183.1},9).wait(114).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(522).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(173).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(223));

	// yiulr678lr678l
	this.instance_8 = new lib.yiulr678lr678l("synched",0);
	this.instance_8.setTransform(-68.15,-69.95,1,1,0,0,0,-14.9,13.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(676).to({skewY:180,x:-222.25},0).to({skewX:1.7042,skewY:181.7042,x:-221.1,y:-72.1},8).wait(81).to({startPosition:0},0).to({skewX:0,skewY:180,x:-222.25,y:-69.95},9).wait(114).to({startPosition:0},0).to({skewX:-1.0002,skewY:178.9998,x:-223.7,y:-68.65},8).to({skewX:-0.2929,skewY:179.7071,x:-222.8,y:-69.5},8).to({regY:13.2,skewX:-1.9491,skewY:178.0509,x:-224.1,y:-67.6},8).to({regY:13.3,skewX:-0.2929,skewY:179.7071,x:-222.35,y:-69.45},8).to({skewX:0,skewY:180,x:-222.25,y:-69.95},8).to({regY:13.2,skewX:3.1341,skewY:183.1341,x:-225.25,y:-72.9},7).wait(142).to({startPosition:0},0).to({regX:-14.8,skewX:-1.5573,skewY:178.4427,x:-222.65,y:-68.5},9).wait(110).to({skewX:-1.5573},0).to({skewX:-2.5468,skewY:177.4532,x:-214.65,y:-69.25},10).wait(159).to({startPosition:0},0).to({regY:13.1,scaleX:0.9999,scaleY:0.9999,skewX:-2.7368,skewY:177.2632,x:-222.1,y:-67.6},9).wait(74).to({startPosition:0},0).to({regX:-14.9,regY:13.3,scaleX:1,scaleY:1,skewX:0,skewY:180,x:-222.25,y:-69.95},8).wait(99).to({startPosition:0},0).to({regX:-14.8,skewX:2.9581,skewY:182.9581,x:-222.75,y:-73},6).wait(125).to({startPosition:0},0).to({skewX:1.957,skewY:181.957,x:-215.2,y:-74.5},7).wait(52).to({startPosition:0},0).to({regX:-14.9,skewX:0,skewY:180,x:-222.25,y:-69.95},6).wait(210).to({startPosition:0},0).to({regX:-14.8,skewX:3.721,skewY:183.721,x:-224,y:-73.1},7).wait(132).to({startPosition:0},0).to({regX:-14.9,skewX:0,skewY:180,x:-222.25,y:-69.95},9).wait(114).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(522).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(173).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(223));

	// uio_t79_t79_
	this.instance_9 = new lib.uiot79t79("synched",0);
	this.instance_9.setTransform(-388.3,-191.85,1,1,0,0,0,-20.1,13.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).to({_off:true},22).wait(84).to({_off:false},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({regY:13,rotation:-1.2258,x:-391.75,y:-191},8).to({regY:13.1,rotation:0,x:-388.3,y:-191.85},8).to({regX:-20.2,rotation:-0.9495,x:-391.2,y:-191},8).to({regX:-20.1,rotation:0,x:-388.3,y:-191.85},8).to({regY:13,rotation:-1.2258,x:-391.9,y:-190.85},8).to({regY:13.1,rotation:0,x:-388.3,y:-191.85},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({regX:-20.2,rotation:7.1984,x:-384.9,y:-192.8},7).wait(91).to({startPosition:0},0).to({regX:-20.1,rotation:0,x:-388.3,y:-191.85},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({regX:-20.2,regY:13,rotation:3.9207,x:-384.15,y:-192.95},11).wait(94).to({startPosition:0},0).to({rotation:4.1968,x:-391.6,y:-190.85},9).wait(129).to({startPosition:0},0).to({regX:-20.3,rotation:5.8996,x:-384.55,y:-192.35},12).wait(88).to({startPosition:0},0).to({regX:-20.1,regY:13.1,rotation:0,x:-388.3,y:-191.85},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({rotation:8.4268,x:-381.55,y:-192.55},7).wait(126).to({startPosition:0},0).to({rotation:0,x:-388.3,y:-191.85},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// oui_y789_7y9_
	this.instance_10 = new lib.ouiy7897y9("synched",0);
	this.instance_10.setTransform(-408.1,-75.7,1,1,0,0,0,10.2,12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(25).to({startPosition:0},0).to({startPosition:0},8).to({_off:true},68).wait(84).to({_off:false},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({rotation:-1.2258,x:-409.05,y:-74.35},8).to({rotation:0,x:-408.1,y:-75.7},8).to({rotation:-0.9495,x:-409,y:-74.55},8).to({rotation:0,x:-408.1,y:-75.7},8).to({rotation:-1.2258,x:-409.2,y:-74.2},8).to({rotation:0,x:-408.1,y:-75.7},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:7.1984,x:-412.75,y:-81.05},7).wait(91).to({startPosition:0},0).to({rotation:0,x:-408.1,y:-75.7},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({regX:10.1,rotation:3.9207,x:-405.55,y:-79.75},11).wait(94).to({startPosition:0},0).to({regY:12.2,rotation:4.1968,x:-413.6,y:-77.85},9).wait(129).to({startPosition:0},0).to({rotation:5.8996,x:-409.75,y:-80.05},12).wait(88).to({startPosition:0},0).to({regX:10.2,regY:12.3,rotation:0,x:-408.1,y:-75.7},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({regX:10.1,rotation:8.4268,x:-416.25,y:-81.25},7).wait(126).to({startPosition:0},0).to({regX:10.2,rotation:0,x:-408.1,y:-75.7},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// il78lt78l
	this.instance_11 = new lib.il78lt78l("synched",0);
	this.instance_11.setTransform(-298.5,93);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(46).to({startPosition:0},0).to({startPosition:0},695).wait(114).to({startPosition:0},0).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).wait(2809));

	// hktyktyktdy
	this.instance_12 = new lib.hktyktyktdy("synched",0);
	this.instance_12.setTransform(318,-217.75,1,1,0,0,0,2.3,-7.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(25).to({startPosition:25},0).to({regX:2.4,rotation:2.4951,x:312.55,y:-219.2,startPosition:33},8).wait(38).to({startPosition:71},0).to({regX:2.3,rotation:0,x:318,y:-217.75,startPosition:79},8).wait(106).to({startPosition:185},0).to({regX:2.4,regY:-7.9,rotation:1.2258,x:322.85,y:-217.45,startPosition:195},10).wait(125).to({startPosition:320},0).to({rotation:-3.9304,x:316.05,y:-215.95,startPosition:331},11).wait(130).to({startPosition:461},0).to({regX:2.3,regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:473},12).wait(16).to({startPosition:489},0).to({startPosition:497},8).wait(66).to({startPosition:563},0).to({startPosition:575},12).wait(81).to({startPosition:656},0).to({startPosition:664},8).wait(12).to({startPosition:676},0).to({startPosition:684},8).wait(81).to({startPosition:765},0).to({startPosition:774},9).wait(13).to({startPosition:787},0).to({rotation:-2.2378,x:307.5,y:-217.9,startPosition:795},8).wait(93).to({startPosition:888},0).to({rotation:0,x:318,y:-217.75,startPosition:896},8).to({regX:2.4,regY:-7.9,rotation:-6.1967,x:306.15,y:-216.3,startPosition:904},8).to({regX:2.3,regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:912},8).to({regY:-7.9,rotation:-5.4225,x:309.7,y:-216,startPosition:920},8).to({regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:928},8).to({startPosition:935},7).wait(142).to({startPosition:1077},0).to({startPosition:1086},9).wait(110).to({startPosition:1196},0).to({startPosition:1206},10).wait(159).to({startPosition:1365},0).to({startPosition:1374},9).wait(74).to({startPosition:1448},0).to({startPosition:1456},8).wait(99).to({startPosition:1555},0).to({startPosition:1561},6).wait(125).to({startPosition:1686},0).to({startPosition:1693},7).wait(52).to({startPosition:1745},0).to({startPosition:1751},6).wait(21).to({startPosition:1772},0).to({regX:2.4,regY:-7.9,rotation:-2.2151,x:308.2,y:-217.7,startPosition:1779},7).wait(97).to({startPosition:1876},0).to({regY:-8,rotation:-3.1954,x:318.8,y:-216.3,startPosition:1883},7).wait(60).to({startPosition:1943},0).to({regX:2.3,regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:1950},7).wait(11).to({startPosition:1961},0).to({startPosition:1968},7).wait(132).to({startPosition:2100},0).to({startPosition:2109},9).wait(34).to({startPosition:2143},0).to({regX:2.4,regY:-7.9,rotation:-4.6931,x:311.4,y:-216.2,startPosition:2150},7).wait(51).to({startPosition:2201},0).to({regX:2.3,regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:2208},7).wait(15).to({startPosition:2223},0).to({startPosition:2230},7).wait(91).to({startPosition:2321},0).to({startPosition:2328},7).wait(15).to({startPosition:2343},0).to({startPosition:2350},7).wait(103).to({startPosition:2453},0).to({startPosition:2464},11).wait(186).to({startPosition:2650},0).to({startPosition:2666},16).wait(108).to({startPosition:2774},0).to({startPosition:2786},12).wait(35).to({startPosition:2821},0).to({startPosition:2829},8).wait(21).to({startPosition:2850},0).to({startPosition:2861},11).wait(94).to({startPosition:2955},0).to({startPosition:2964},9).wait(129).to({startPosition:3093},0).to({startPosition:3105},12).wait(88).to({startPosition:3193},0).to({startPosition:3202},9).wait(17).to({startPosition:3219},0).to({regX:2.4,regY:-7.9,rotation:-3.664,x:307.85,y:-216.75,startPosition:3227},8).wait(118).to({startPosition:3345},0).to({regX:2.3,regY:-7.8,rotation:0,x:318,y:-217.75,startPosition:3353},8).wait(22).to({startPosition:3375},0).to({startPosition:3382},7).wait(126).to({startPosition:3508},0).to({startPosition:3514},6).wait(20).to({startPosition:3534},0).to({startPosition:3543},9).wait(113).to({startPosition:3656},0).to({startPosition:3665},9).wait(26).to({startPosition:3691},0).to({startPosition:3700},9).wait(37));

	// o_8yt9_8_
	this.instance_13 = new lib.o8yt98("synched",0);
	this.instance_13.setTransform(297.65,-204.95,1,1,0,0,0,-1.1,6.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(25).to({startPosition:0},0).to({regY:6.2,rotation:2.4951,x:291.6,y:-207.35},8).wait(38).to({startPosition:0},0).to({regY:6.3,rotation:0,x:297.65,y:-204.95},8).wait(106).to({startPosition:0},0).to({regX:-1,regY:6.2,rotation:1.2258,x:302.25,y:-205.1},10).wait(125).to({startPosition:0},0).to({rotation:-0.4782,x:294.95,y:-204.5},11).wait(130).to({rotation:-0.4782},0).to({regX:-1.1,regY:6.3,rotation:0,x:297.65,y:-204.95},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({rotation:-2.2378,x:287.65,y:-204.3},8).wait(93).to({startPosition:0},0).to({rotation:0,x:297.65,y:-204.95},8).to({regX:-1,regY:6.2,rotation:-6.1967,x:287.3,y:-201.35},8).to({regX:-1.1,regY:6.3,rotation:0,x:297.65,y:-204.95},8).to({regY:6.2,rotation:-1.7042,x:289,y:-204.15},8).to({regY:6.3,rotation:0,x:297.65,y:-204.95},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({regX:-1,regY:6.2,rotation:-2.2151,x:288.4,y:-204.1},7).wait(97).to({startPosition:0},0).to({rotation:0,x:297.8,y:-204.85},7).wait(60).to({startPosition:0},0).to({regX:-1.1,regY:6.3,x:297.65,y:-204.95},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regX:-1,regY:6.2,rotation:-4.6931,x:292.2,y:-201.75},7).wait(51).to({startPosition:0},0).to({regX:-1.1,regY:6.3,rotation:0,x:297.65,y:-204.95},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({regX:-1,regY:6.2,rotation:-3.664,x:288.35,y:-202.65},8).wait(118).to({startPosition:0},0).to({regX:-1.1,regY:6.3,rotation:0,x:297.65,y:-204.95},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// yl7y8lt78l7t8l
	this.instance_14 = new lib.yl7y8lt78l7t8l("synched",0);
	this.instance_14.setTransform(121.95,-220.65,1,1,0,0,0,-15.5,-12.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(25).to({startPosition:25},0).to({startPosition:33},8).wait(38).to({startPosition:71},0).to({startPosition:79},8).wait(106).to({startPosition:185},0).to({startPosition:195},10).wait(125).to({startPosition:320},0).to({startPosition:331},11).wait(130).to({startPosition:461},0).to({startPosition:473},12).wait(16).to({startPosition:489},0).to({regY:-13,rotation:1.4838,x:129.75,y:-220.95,startPosition:497},8).wait(66).to({startPosition:563},0).to({rotation:-0.4922,x:120.2,y:-220.3,startPosition:575},12).wait(81).to({rotation:-0.4922,startPosition:656},0).to({regY:-12.9,rotation:0,x:121.95,y:-220.65,startPosition:664},8).wait(12).to({startPosition:676},0).to({startPosition:684},8).wait(81).to({startPosition:765},0).to({startPosition:774},9).wait(13).to({startPosition:787},0).to({startPosition:795},8).wait(93).to({startPosition:888},0).to({startPosition:896},8).to({regX:-15.3,rotation:-8.1787,x:118.1,y:-220.25,startPosition:904},8).to({regX:-15.5,rotation:0,x:121.95,y:-220.65,startPosition:912},8).to({regX:-15.4,rotation:2.4496,x:125.7,y:-221,startPosition:920},8).to({regX:-15.5,rotation:0,x:121.95,y:-220.65,startPosition:928},8).to({startPosition:935},7).wait(142).to({startPosition:1077},0).to({startPosition:1086},9).wait(110).to({startPosition:1196},0).to({startPosition:1206},10).wait(159).to({startPosition:1365},0).to({startPosition:1374},9).wait(74).to({startPosition:1448},0).to({startPosition:1456},8).wait(99).to({startPosition:1555},0).to({startPosition:1561},6).wait(125).to({startPosition:1686},0).to({startPosition:1693},7).wait(52).to({startPosition:1745},0).to({startPosition:1751},6).wait(21).to({startPosition:1772},0).to({startPosition:1779},7).wait(97).to({startPosition:1876},0).to({startPosition:1883},7).wait(60).to({startPosition:1943},0).to({startPosition:1950},7).wait(11).to({startPosition:1961},0).to({startPosition:1968},7).wait(132).to({startPosition:2100},0).to({startPosition:2109},9).wait(34).to({startPosition:2143},0).to({startPosition:2150},7).wait(51).to({startPosition:2201},0).to({startPosition:2208},7).wait(15).to({startPosition:2223},0).to({startPosition:2230},7).wait(91).to({startPosition:2321},0).to({startPosition:2328},7).wait(15).to({startPosition:2343},0).to({regX:-15.4,regY:-13,rotation:-1.0081,x:128.95,y:-220.6,startPosition:2350},7).wait(103).to({startPosition:2453},0).to({regY:-13.1,rotation:-4.9556,x:123.7,y:-220.5,startPosition:2464},11).wait(186).to({startPosition:2650},0).to({regX:-15.3,scaleX:0.9999,scaleY:0.9999,rotation:-0.0184,x:132.55,y:-220.55,startPosition:2666},16).wait(108).to({rotation:-0.0184,startPosition:2774},0).to({regX:-15.2,regY:-13.2,rotation:-4.2233,x:127,y:-220.25,startPosition:2786},12).wait(35).to({startPosition:2821},0).to({regX:-15.5,regY:-12.9,scaleX:1,scaleY:1,rotation:0,x:121.95,y:-220.65,startPosition:2829},8).wait(21).to({startPosition:2850},0).to({startPosition:2861},11).wait(94).to({startPosition:2955},0).to({startPosition:2964},9).wait(129).to({startPosition:3093},0).to({startPosition:3105},12).wait(88).to({startPosition:3193},0).to({startPosition:3202},9).wait(17).to({startPosition:3219},0).to({startPosition:3227},8).wait(118).to({startPosition:3345},0).to({startPosition:3353},8).wait(22).to({startPosition:3375},0).to({startPosition:3382},7).wait(126).to({startPosition:3508},0).to({startPosition:3514},6).wait(20).to({skewY:180,x:160.85,startPosition:3534},0).to({regY:-13,skewX:1.225,skewY:181.225,x:156.45,y:-221.1,startPosition:3543},9).wait(113).to({startPosition:3656},0).to({regX:-15.6,skewX:2.0131,skewY:182.0131,x:149.9,y:-221.45,startPosition:3665},9).wait(26).to({startPosition:3691},0).to({regX:-15.7,regY:-13.1,skewX:2.0157,skewY:182.0157,x:157.15,y:-221.3,startPosition:3700},9).wait(37));

	// uil7t8lt78l
	this.instance_15 = new lib.uil7t8lt78l("synched",0);
	this.instance_15.setTransform(-336.65,30.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({rotation:-1.2258,x:-335.35,y:30.3},8).to({rotation:0,x:-336.65,y:30.6},8).to({regX:-0.1,regY:0.1,rotation:-0.9495,x:-335.85},8).to({regX:0,regY:0,rotation:0,x:-336.65},8).to({rotation:-1.2258,x:-335.5,y:30.45},8).to({rotation:0,x:-336.65,y:30.6},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:1.2258,x:-337.8},7).wait(91).to({startPosition:0},0).to({rotation:0,x:-336.65},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({rotation:1.4497,x:-338.05,y:30.9},11).wait(94).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:-0.765,x:-336.9,y:30.95},9).wait(129).to({rotation:-0.765},0).to({rotation:0.939,x:-336.35,y:30.9},12).wait(88).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-336.65,y:30.6},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:2.2151,x:-337.75,y:31.3},7).wait(126).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-336.65,y:30.6},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// o_y8_y89__
	this.instance_16 = new lib.oy8y89("synched",0);
	this.instance_16.setTransform(-123.85,-242.3,1,1,0,0,0,17.1,47.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(676).to({skewY:180,x:-166.55,startPosition:676},0).to({regX:17.2,skewX:-0.4879,skewY:179.5121,x:-160.4,y:-242.75,startPosition:684},8).wait(81).to({startPosition:765},0).to({regX:17.1,skewX:0,skewY:180,x:-166.55,y:-242.3,startPosition:774},9).wait(114).to({startPosition:888},0).to({regX:17.2,skewX:-13.4569,skewY:166.5431,x:-171.15,y:-241.95,startPosition:896},8).to({skewX:-12.7497,skewY:167.2503,x:-168.05,y:-242.1,startPosition:904},8).to({skewX:-17.3757,skewY:162.6243,x:-174.35,y:-241.65,startPosition:912},8).to({skewX:-12.7497,skewY:167.2503,x:-167.6,y:-242.05,startPosition:920},8).to({regX:17.1,skewX:0,skewY:180,x:-166.55,y:-242.3,startPosition:928},8).to({skewX:1.1838,skewY:181.1838,x:-162.3,y:-242.7,startPosition:935},7).wait(142).to({startPosition:1077},0).to({regX:17.2,skewX:-4.2345,skewY:175.7655,x:-171.35,y:-242,startPosition:1086},9).wait(110).to({startPosition:1196},0).to({regY:47.4,skewX:-5.9383,skewY:174.0617,x:-163.7,y:-242.5,startPosition:1206},10).wait(159).to({startPosition:1365},0).to({regX:17.4,scaleX:0.9999,scaleY:0.9999,skewX:-1.902,skewY:178.098,x:-174,y:-241.95,startPosition:1374},9).wait(74).to({skewX:-1.902,startPosition:1448},0).to({regX:17.1,regY:47.5,scaleX:1,scaleY:1,skewX:0,skewY:180,x:-166.55,y:-242.3,startPosition:1456},8).wait(99).to({startPosition:1555},0).to({regX:17.2,regY:47.4,skewX:-3.5072,skewY:176.4928,x:-159.35,y:-242.9,startPosition:1561},6).wait(125).to({startPosition:1686},0).to({skewX:-5.5217,skewY:174.4783,x:-151.6,y:-243.15,startPosition:1693},7).wait(52).to({startPosition:1745},0).to({regX:17.1,regY:47.5,skewX:0,skewY:180,x:-166.55,y:-242.3,startPosition:1751},6).wait(210).to({startPosition:1961},0).to({regX:17.2,skewX:-3.4712,skewY:176.5288,x:-159.1,y:-242.5,startPosition:1968},7).wait(132).to({startPosition:2100},0).to({regX:17.1,skewX:0,skewY:180,x:-166.55,y:-242.3,startPosition:2109},9).wait(114).to({startPosition:2223},0).to({startPosition:2230},7).wait(91).to({startPosition:2321},0).to({startPosition:2328},7).wait(522).to({startPosition:2850},0).to({startPosition:2861},11).wait(94).to({startPosition:2955},0).to({startPosition:2964},9).wait(129).to({startPosition:3093},0).to({startPosition:3105},12).wait(88).to({startPosition:3193},0).to({startPosition:3202},9).wait(173).to({startPosition:3375},0).to({startPosition:3382},7).wait(126).to({startPosition:3508},0).to({startPosition:3514},6).wait(223));

	// ilt786l78l
	this.instance_17 = new lib.ilt786l78l("synched",0);
	this.instance_17.setTransform(-148.45,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(676).to({skewY:180,x:-141.95},0).to({skewX:1.7042,skewY:181.7042,x:-143.6,y:23.95},8).wait(81).to({startPosition:0},0).to({skewX:0,skewY:180,x:-141.95,y:23.8},9).wait(114).to({startPosition:0},0).to({skewX:-1.0002,skewY:178.9998,x:-141.8,y:23.6},8).to({regX:0.1,regY:0.1,skewX:-0.2929,skewY:179.7071,x:-142.1,y:23.8},8).to({skewX:-1.9491,skewY:178.0509,x:-140.75,y:23.4},8).to({skewX:-0.2929,skewY:179.7071,x:-141.65,y:23.85},8).to({regX:0,regY:0,skewX:0,skewY:180,x:-141.95,y:23.8},8).to({skewX:1.1838,skewY:181.1838,x:-143.2},7).wait(142).to({startPosition:0},0).to({skewX:-0.7668,skewY:179.2332,x:-143.15,y:23.75},9).wait(110).to({skewX:-0.7668},0).to({skewX:0.9661,skewY:180.9661,x:-143.55,y:24},10).wait(159).to({skewX:0.9661},0).to({skewX:-1.2258,skewY:178.7742,x:-143.45,y:23.55},9).wait(74).to({startPosition:0},0).to({skewX:0,skewY:180,x:-141.95,y:23.8},8).wait(99).to({startPosition:0},0).to({skewX:1.7331,skewY:181.7331,x:-142.75,y:23.85},6).wait(125).to({startPosition:0},0).to({regX:-0.1,regY:0.1,skewX:3.6832,skewY:183.6832,x:-143.95,y:24.05},7).wait(52).to({startPosition:0},0).to({regX:0,regY:0,skewX:0,skewY:180,x:-141.95,y:23.8},6).wait(210).to({startPosition:0},0).to({skewX:1.4838,skewY:181.4838,x:-141.35,y:24.15},7).wait(132).to({startPosition:0},0).to({skewX:0,skewY:180,x:-141.95,y:23.8},9).wait(114).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(522).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(173).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(223));

	// il7t8lt78l8t7l
	this.instance_18 = new lib.il7t8lt78l8t7l("synched",0);
	this.instance_18.setTransform(-178.95,-189.05,1,1,0,0,0,0.7,14.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(676).to({skewY:180,x:-111.45},0).to({skewX:-21.2411,skewY:158.7589,x:-105.2,y:-190},8).wait(81).to({startPosition:0},0).to({skewX:0,skewY:180,x:-111.45,y:-189.05},9).wait(114).to({startPosition:0},0).to({skewX:-1.0002,skewY:178.9998,x:-115,y:-189.7},8).to({regY:14.2,skewX:-0.2929,skewY:179.7071,x:-112.6,y:-189.25},8).to({regX:0.8,regY:14.3,skewX:-1.9491,skewY:178.0509,x:-117.5,y:-190.3},8).to({regX:0.7,regY:14.2,skewX:-0.2929,skewY:179.7071,x:-112.15,y:-189.2},8).to({regY:14.3,skewX:0,skewY:180,x:-111.45,y:-189.05},8).to({regX:0.8,regY:14.2,skewX:-11.0272,skewY:168.9728,x:-106.1,y:-189.3},7).wait(142).to({startPosition:0},0).to({skewX:-7.4931,skewY:172.5069,x:-114.15,y:-189.8},9).wait(110).to({startPosition:0},0).to({regX:0.9,skewX:-1.3168,skewY:178.6832,x:-108.45,y:-188.3},10).wait(159).to({skewX:-1.3168},0).to({skewX:6.7303,skewY:186.7303,x:-117.2,y:-189.65},9).wait(74).to({skewX:6.7303},0).to({regX:0.7,regY:14.3,skewX:0,skewY:180,x:-111.45,y:-189.05},8).wait(99).to({startPosition:0},0).to({regX:0.8,skewX:-11.7297,skewY:168.2703,x:-104.7,y:-188.55},6).wait(125).to({startPosition:0},0).to({regX:1,regY:14.2,skewX:-5.542,skewY:174.458,x:-99.25,y:-186.65},7).wait(52).to({startPosition:0},0).to({regX:0.7,regY:14.3,skewX:0,skewY:180,x:-111.45,y:-189.05},6).wait(210).to({startPosition:0},0).to({regY:14.2,skewX:-9.4997,skewY:170.5003,x:-103.35,y:-188.6},7).wait(132).to({startPosition:0},0).to({regY:14.3,skewX:0,skewY:180,x:-111.45,y:-189.05},9).wait(114).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(522).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(173).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(223));

	// ui_l7t9_t79_9_
	this.instance_19 = new lib.uil7t9t799("synched",0);
	this.instance_19.setTransform(-185.75,-78.75,1,1,0,0,0,-10.4,12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(676).to({skewY:180,x:-104.65},0).to({regX:-10.6,regY:12.7,scaleX:0.9999,scaleY:0.9999,skewX:-144.5074,skewY:35.4926,x:-54.9,y:-91.1},8).wait(81).to({skewY:35.4926},0).to({regX:-10.4,regY:12.6,scaleX:1,scaleY:1,skewX:0,skewY:180,x:-104.65,y:-78.75},9).wait(114).to({startPosition:0},0).to({regX:-10.3,skewX:-1.0002,skewY:178.9998,x:-106.4,y:-79.55},8).to({regY:12.5,skewX:-0.2929,skewY:179.7071,x:-105.35,y:-79},8).to({skewX:-1.9491,skewY:178.0509,x:-107,y:-80.45},8).to({skewX:-0.2929,skewY:179.7071,x:-104.9,y:-78.95},8).to({regX:-10.4,regY:12.6,skewX:0,skewY:180,x:-104.65,y:-78.75},8).to({skewX:-90.7545,skewY:89.2455,x:-78.15,y:-82.4},7).wait(142).to({startPosition:0},0).to({regY:12.5,scaleX:0.9999,scaleY:0.9999,skewX:-87.2221,skewY:92.7779,x:-92.9,y:-81.4},9).wait(110).to({startPosition:0},0).to({regX:-10.5,regY:12.3,skewX:-81.0462,skewY:98.9538,x:-99.1,y:-78.3},10).wait(159).to({startPosition:0},0).to({skewX:-72.9986,skewY:107.0014,x:-123.35,y:-79.45},9).wait(74).to({startPosition:0},0).to({regX:-10.4,regY:12.6,scaleX:1,scaleY:1,skewX:0,skewY:180,x:-104.65,y:-78.75},8).wait(99).to({startPosition:0},0).to({regY:12.5,skewX:-110.7483,skewY:69.2517,x:-75.7,y:-82},6).wait(125).to({startPosition:0},0).to({regX:-10.5,regY:12.4,skewX:-104.5615,skewY:75.4385,x:-81.8,y:-77.6},7).wait(52).to({startPosition:0},0).to({regX:-10.4,regY:12.6,skewX:0,skewY:180,x:-104.65,y:-78.75},6).wait(210).to({startPosition:0},0).to({regY:12.5,skewX:-82.9528,skewY:97.0472,x:-78.5,y:-80.85},7).wait(132).to({startPosition:0},0).to({regY:12.6,skewX:0,skewY:180,x:-104.65,y:-78.75},9).wait(114).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(522).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(173).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(223));

	// uio_lt79_79_79_
	this.instance_20 = new lib.uiolt797979("synched",0);
	this.instance_20.setTransform(-376.55,-343.65,1,1,0,0,0,5.9,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({rotation:-9.2142,x:-397.75,y:-340.3},8).to({rotation:0,x:-376.55,y:-343.65},8).to({regY:11.4,rotation:-5.9243,x:-390.45,y:-341.3},8).to({regY:11.5,rotation:0,x:-376.55,y:-343.65},8).to({rotation:-5.2048,x:-390.35,y:-341.75},8).to({rotation:0,x:-376.55,y:-343.65},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:-1.0116,x:-373.2,y:-344.35},7).wait(91).to({startPosition:0},0).to({rotation:0,x:-376.55,y:-343.65},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({regX:5.8,regY:11.4,rotation:-1.2905,x:-373.35,y:-343.95},11).wait(94).to({startPosition:0},0).to({regX:5.7,regY:11.3,rotation:-6.4572,x:-391.25,y:-341.7},9).wait(129).to({startPosition:0},0).to({regX:5.6,regY:11.2,rotation:-5.0689,x:-380.1,y:-343.2},12).wait(88).to({startPosition:0},0).to({regX:5.9,regY:11.5,rotation:0,x:-376.55,y:-343.65},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({rotation:-0.7362,x:-367.4,y:-344.15},7).wait(126).to({startPosition:0},0).to({rotation:0,x:-376.55,y:-343.65},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// iop__8_y8_
	this.instance_21 = new lib.iop8y8("synched",0);
	this.instance_21.setTransform(301.15,96.05,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).to({startPosition:0},774).wait(114).to({startPosition:0},0).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).to({startPosition:0},8).wait(2809));

	// ukl_7il78l78l
	this.instance_22 = new lib.ukl7il78l78l("synched",0);
	this.instance_22.setTransform(317.9,50.5,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(25).to({startPosition:0},0).to({regX:0,regY:0,rotation:-1.0002,x:317.75,y:50.4},8).wait(38).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:0,x:317.9,y:50.5},8).wait(106).to({startPosition:0},0).to({regX:0,regY:0,rotation:1.2258,x:317,y:50.85},10).wait(125).to({startPosition:0},0).to({rotation:-0.4782,x:317.3,y:50.9},11).wait(130).to({rotation:-0.4782},0).to({regX:-0.1,regY:-0.1,rotation:0,x:317.9,y:50.5},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regY:0,rotation:-2.2378,x:317.85,y:50.2},8).wait(93).to({startPosition:0},0).to({regY:-0.1,rotation:0,x:317.9,y:50.5},8).to({regX:0,regY:0,rotation:-2.4916,x:316.8,y:50.35},8).to({regX:-0.1,regY:-0.1,rotation:0,x:317.9,y:50.5},8).to({regY:0,rotation:-1.7042,x:316.85,y:50.7},8).to({regY:-0.1,rotation:0,x:317.9,y:50.5},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({rotation:-2.2151,x:318.4,y:50.4},7).wait(97).to({startPosition:0},0).to({rotation:0,x:317.95,y:50.6},7).wait(60).to({startPosition:0},0).to({x:317.9,y:50.5},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regX:0,regY:0,rotation:-1.4497,x:317.6,y:50.65},7).wait(51).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:0,x:317.9,y:50.5},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({rotation:-2.2151,x:317.55,y:50.75},8).wait(118).to({startPosition:0},0).to({rotation:0,x:317.9,y:50.5},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// uil7t8lt78lt7l
	this.instance_23 = new lib.uilt768lt78lt78l("synched",0);
	this.instance_23.setTransform(274.35,-184.8,1,1,0,0,0,-3.4,12.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(25).to({startPosition:0},0).to({rotation:3.4537,x:269.95,y:-184.1},8).wait(38).to({startPosition:0},0).to({rotation:0,x:274.35,y:-184.8},8).wait(106).to({startPosition:0},0).to({rotation:11.9503,x:279.4,y:-185.7},10).wait(125).to({startPosition:0},0).to({regX:-3.2,regY:12,rotation:18.6929,x:272.85,y:-185.1},11).wait(130).to({startPosition:0},0).to({regX:-3.4,regY:12.1,rotation:0,x:274.35,y:-184.8},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regX:-3.3,rotation:-2.2378,x:265.2,y:-183.2},8).wait(93).to({startPosition:0},0).to({regX:-3.4,rotation:0,x:274.35,y:-184.8},8).to({regX:-3.3,rotation:-2.4916,x:263.05,y:-182.8},8).to({regX:-3.4,rotation:0,x:274.35,y:-184.8},8).to({rotation:-1.7042,x:266.3,y:-183.25},8).to({rotation:0,x:274.35,y:-184.8},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({rotation:-2.2151,x:265.75,y:-182.95},7).wait(97).to({startPosition:0},0).to({rotation:0,x:274.35,y:-184.6},7).wait(60).to({startPosition:0},0).to({y:-184.8},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regY:12,rotation:6.4869,x:268.2,y:-184.35},7).wait(51).to({startPosition:0},0).to({regY:12.1,rotation:0,x:274.35,y:-184.8},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({rotation:-2.2151,x:264.9,y:-182.6},8).wait(118).to({startPosition:0},0).to({rotation:0,x:274.35,y:-184.8},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// uipl_7t8l78l
	this.instance_24 = new lib.uipl7t8l78l("synched",0);
	this.instance_24.setTransform(264.15,-53.5,1,1,0,0,0,-12.6,18.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(25).to({startPosition:0},0).to({regY:18.5,scaleX:0.9999,scaleY:0.9999,rotation:119.6555,x:249.7,y:-62.5},8).wait(38).to({startPosition:0},0).to({regY:18.7,scaleX:1,scaleY:1,rotation:0,x:264.15,y:-53.5},8).wait(106).to({startPosition:0},0).to({regX:-12.7,regY:18.6,rotation:126.0094,x:235.05,y:-69.2},10).wait(125).to({startPosition:0},0).to({regX:-12.8,scaleX:0.9999,scaleY:0.9999,rotation:139.962,x:215.05,y:-74.6},11).wait(130).to({startPosition:0},0).to({regX:-12.6,regY:18.7,scaleX:1,scaleY:1,rotation:0,x:264.15,y:-53.5},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regX:-12.7,rotation:110.2777,x:260.1,y:-51.8},8).wait(93).to({startPosition:0},0).to({regX:-12.6,rotation:0,x:264.15,y:-53.5},8).to({regX:-12.5,regY:18.6,rotation:-2.4916,x:258.55,y:-51.3},8).to({regX:-12.6,regY:18.7,rotation:0,x:264.15,y:-53.5},8).to({regX:-12.5,regY:18.6,rotation:-1.7042,x:260.1,y:-51.8},8).to({regX:-12.6,regY:18.7,rotation:0,x:264.15,y:-53.5},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({regY:18.6,rotation:104.0541,x:260.7,y:-51.4},7).wait(97).to({startPosition:0},0).to({rotation:106.2688,x:264.25,y:-53.35},7).wait(60).to({startPosition:0},0).to({regY:18.7,rotation:0,x:264.15,y:-53.5},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regY:18.6,rotation:122.4914,x:242.9,y:-62.75},7).wait(51).to({startPosition:0},0).to({regY:18.7,rotation:0,x:264.15,y:-53.5},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({regX:-12.5,rotation:1.4838,x:266.75,y:-49.65},7).wait(103).to({startPosition:0},0).to({regY:18.6,rotation:0.2579,x:265.1,y:-52.65},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({regX:-12.6,regY:18.7,rotation:0,x:264.15,y:-53.5},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({regX:-12.5,rotation:98.5923,x:259.8,y:-51.05},8).wait(118).to({startPosition:0},0).to({regX:-12.6,rotation:0,x:264.15,y:-53.5},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// yl68tl867lt68
	this.instance_25 = new lib.lylt678l7t8l("synched",0);
	this.instance_25.setTransform(142.35,49.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({rotation:1.4838,x:143.15,y:49.3},8).wait(66).to({startPosition:0},0).to({rotation:-0.4922,x:142.9,y:49.25},12).wait(81).to({rotation:-0.4922},0).to({rotation:0,x:142.35,y:49.1},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({startPosition:0},8).to({rotation:-0.9495,x:142.75,y:49.05},8).to({rotation:0,x:142.35,y:49.1},8).to({rotation:1.0002,x:141.25,y:49.05},8).to({rotation:0,x:142.35,y:49.1},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:1.4838,x:142.25,y:49.7},7).wait(103).to({startPosition:0},0).to({rotation:0.2579,x:142.75,y:49.4},11).wait(186).to({startPosition:0},0).to({rotation:2.2081,x:142.3,y:49.85},16).wait(108).to({startPosition:0},0).to({regX:0.1,regY:0.1,rotation:0.7239,x:143.7,y:49.95},12).wait(35).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:142.35,y:49.1},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({skewY:180,x:140.45},0).to({skewX:-1.2258,skewY:178.7742,x:141.8,y:49.05},9).wait(113).to({startPosition:0},0).to({skewX:-2.9292,skewY:177.0708,x:143.2,y:49},9).wait(26).to({startPosition:0},0).to({regX:-0.1,regY:0.1,skewX:-0.974,skewY:179.026,x:141.3,y:48.85},9).wait(37));

	// jlt678lt78l78
	this.instance_26 = new lib.jlt678lt78l78("synched",0);
	this.instance_26.setTransform(164,-186.8,1,1,0,0,0,-0.8,10.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({rotation:-44.2186,x:166.15,y:-185.85},8).wait(66).to({startPosition:0},0).to({regX:-0.7,rotation:-43.2254,x:157.8,y:-187.1},12).wait(81).to({startPosition:0},0).to({regX:-0.8,rotation:0,x:164,y:-186.8},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({startPosition:0},8).to({regY:10.4,rotation:-0.9495,x:160.5,y:-187.05},8).to({regY:10.3,rotation:0,x:164,y:-186.8},8).to({rotation:1.0002,x:167,y:-186.35},8).to({rotation:0,x:164,y:-186.8},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:-13.708,x:169.7,y:-184},7).wait(103).to({startPosition:0},0).to({rotation:-6.4626,x:164.5,y:-185.2},11).wait(186).to({startPosition:0},0).to({regY:10.2,rotation:0.4546,x:172.1,y:-184.6},16).wait(108).to({rotation:0.4546},0).to({regX:-0.7,scaleX:0.9999,scaleY:0.9999,rotation:-4.0147,x:167.45,y:-185.05},12).wait(35).to({startPosition:0},0).to({regX:-0.8,regY:10.3,scaleX:1,scaleY:1,rotation:0,x:164,y:-186.8},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({skewY:180,x:118.8},0).to({regY:10.2,skewX:3.0089,skewY:183.0089,x:114.6,y:-186.15},9).wait(113).to({startPosition:0},0).to({regX:-0.9,skewX:-1.1874,skewY:178.8126,x:108.8,y:-185.55},9).wait(26).to({skewX:-1.1874},0).to({regX:-1,skewX:-5.2225,skewY:174.7775,x:114.1,y:-187.95},9).wait(37));

	// hjylky6k67k67k
	this.instance_27 = new lib.hjylky6k67k67k("synched",0);
	this.instance_27.setTransform(170.45,-74.1,1,1,0,0,0,11.6,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({regX:11.7,regY:5.9,rotation:-64.6984,x:249.35,y:-109.75},8).wait(66).to({startPosition:0},0).to({regY:5.8,rotation:-63.7051,x:239.55,y:-109.55},12).wait(81).to({startPosition:0},0).to({regX:11.6,regY:6,rotation:0,x:170.45,y:-74.1},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({startPosition:0},8).to({rotation:-0.9495,x:168.85,y:-74.55},8).to({rotation:0,x:170.45,y:-74.1},8).to({regY:5.9,rotation:1.0002,x:171.5,y:-73.7},8).to({regY:6,rotation:0,x:170.45,y:-74.1},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({rotation:-146.2212,x:206.05,y:-62.3},7).wait(103).to({startPosition:0},0).to({regX:11.7,scaleX:0.9999,scaleY:0.9999,rotation:-133.735,x:185.15,y:-59.9},11).wait(186).to({startPosition:0},0).to({regX:11.8,regY:6.2,rotation:-126.8181,x:177.6,y:-57.8},16).wait(108).to({startPosition:0},0).to({regY:6.3,rotation:-135.2795,x:182.75,y:-59.1},12).wait(35).to({startPosition:0},0).to({regX:11.6,regY:6,scaleX:1,scaleY:1,rotation:0,x:170.45,y:-74.1},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({skewY:180,x:112.35},0).to({regY:5.8,skewX:105.5623,skewY:285.5623,x:99.75,y:-69.7},9).wait(113).to({startPosition:0},0).to({skewX:101.3651,skewY:281.3651,x:102.45,y:-68.35},9).wait(26).to({startPosition:0},0).to({regY:5.6,scaleX:0.9999,scaleY:0.9999,skewX:3.3034,skewY:183.3034,x:115.9,y:-70.55},9).wait(37));

	// uil7t8t78l8
	this.instance_28 = new lib.uil7t8t78l8("synched",0);
	this.instance_28.setTransform(332.65,-344.35,1,1,0,0,0,9.4,-86.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(25).to({startPosition:0},0).to({regX:9.5,rotation:2.4951,x:332.7,y:-345.05},8).wait(38).to({startPosition:0},0).to({regX:9.4,rotation:0,x:332.65,y:-344.35},8).wait(106).to({startPosition:0},0).to({rotation:1.2258,x:340.1,y:-343.65},10).wait(125).to({startPosition:0},0).to({regX:9.5,regY:-86.3,rotation:-3.9304,x:321.95,y:-343.3},11).wait(130).to({startPosition:0},0).to({regX:9.4,regY:-86.2,rotation:0,x:332.65,y:-344.35},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({regX:9.5,regY:-86.3,rotation:-2.2378,x:317.3,y:-345.05},8).wait(93).to({startPosition:0},0).to({regX:9.4,regY:-86.2,rotation:0,x:332.65,y:-344.35},8).to({regY:-86.3,rotation:-6.1967,x:306.95,y:-343.7},8).to({regY:-86.2,rotation:0,x:332.65,y:-344.35},8).to({regX:9.5,regY:-86.3,rotation:-5.4225,x:312.4,y:-343.45},8).to({regX:9.4,regY:-86.2,rotation:0,x:332.65,y:-344.35},8).to({startPosition:0},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({regX:9.5,rotation:-2.2151,x:317.95,y:-344.7},7).wait(97).to({startPosition:0},0).to({rotation:-3.1954,x:326.4,y:-343.35},7).wait(60).to({startPosition:0},0).to({regX:9.4,rotation:0,x:332.65,y:-344.35},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({regX:9.5,regY:-86.3,rotation:-4.6931,x:315.65,y:-343.6},7).wait(51).to({startPosition:0},0).to({regX:9.4,regY:-86.2,rotation:0,x:332.65,y:-344.35},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(91).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({startPosition:0},11).wait(94).to({startPosition:0},0).to({startPosition:0},9).wait(129).to({startPosition:0},0).to({startPosition:0},12).wait(88).to({startPosition:0},0).to({startPosition:0},9).wait(17).to({startPosition:0},0).to({regX:9.5,rotation:-3.664,x:314.4,y:-343.9},8).wait(118).to({startPosition:0},0).to({regX:9.4,rotation:0,x:332.65,y:-344.35},8).wait(22).to({startPosition:0},0).to({startPosition:0},7).wait(126).to({startPosition:0},0).to({startPosition:0},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// u_t79_t79_
	this.instance_29 = new lib.ut79t79("synched",0);
	this.instance_29.setTransform(-313,-207.35,1,1,0,0,0,1.3,5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({regX:1.2,rotation:-1.2258,x:-316.9,y:-208.05},8).to({regX:1.3,rotation:0,x:-313,y:-207.35},8).to({regX:1.2,rotation:-0.9495,x:-316.15,y:-207.75},8).to({regX:1.3,rotation:0,x:-313,y:-207.35},8).to({regX:1.2,rotation:-1.2258,x:-317.05,y:-207.9},8).to({regX:1.3,rotation:0,x:-313,y:-207.35},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({regX:1.2,regY:5.7,rotation:-9.2285,x:-309.45,y:-206.85},7).wait(91).to({startPosition:0},0).to({regX:1.3,regY:5.8,rotation:0,x:-313,y:-207.35},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({regY:5.7,rotation:-13.7735,x:-308,y:-206.35},11).wait(94).to({startPosition:0},0).to({regX:1.2,rotation:-11.0119,x:-315.85,y:-207.75},9).wait(129).to({startPosition:0},0).to({rotation:-5.1075,x:-307.75,y:-207.3},12).wait(88).to({startPosition:0},0).to({regX:1.3,regY:5.8,rotation:0,x:-313,y:-207.35},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({rotation:-7.7698,x:-306.5,y:-207.05},7).wait(126).to({startPosition:0},0).to({rotation:0,x:-313,y:-207.35},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	// io_8y9_y89_
	this.instance_30 = new lib.io8y9y89("synched",0);
	this.instance_30.setTransform(-305.85,-83.95,1,1,0,0,0,14.3,12.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(25).to({startPosition:0},0).to({startPosition:0},8).wait(38).to({startPosition:0},0).to({startPosition:0},8).wait(106).to({startPosition:0},0).to({startPosition:0},10).wait(125).to({startPosition:0},0).to({startPosition:0},11).wait(130).to({startPosition:0},0).to({startPosition:0},12).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(66).to({startPosition:0},0).to({startPosition:0},12).wait(81).to({startPosition:0},0).to({startPosition:0},8).wait(12).to({startPosition:0},0).to({startPosition:0},8).wait(81).to({startPosition:0},0).to({startPosition:0},9).wait(13).to({startPosition:0},0).to({startPosition:0},8).wait(93).to({startPosition:0},0).to({regY:12.1,rotation:-2.2256,x:-308.65,y:-82.1},8).to({regY:12.2,rotation:0,x:-305.85,y:-83.95},8).to({rotation:-0.9495,x:-306.85,y:-84.5},8).to({rotation:0,x:-305.85,y:-83.95},8).to({rotation:-1.2258,x:-307.15,y:-84.65},8).to({rotation:0,x:-305.85,y:-83.95},7).wait(142).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},10).wait(159).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},8).wait(99).to({startPosition:0},0).to({startPosition:0},6).wait(125).to({startPosition:0},0).to({startPosition:0},7).wait(52).to({startPosition:0},0).to({startPosition:0},6).wait(21).to({startPosition:0},0).to({startPosition:0},7).wait(97).to({startPosition:0},0).to({startPosition:0},7).wait(60).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(132).to({startPosition:0},0).to({startPosition:0},9).wait(34).to({startPosition:0},0).to({startPosition:0},7).wait(51).to({startPosition:0},0).to({startPosition:0},7).wait(15).to({startPosition:0},0).to({regY:12.1,rotation:-136.5148,x:-282.4,y:-86.3},7).wait(91).to({startPosition:0},0).to({regY:12.2,rotation:0,x:-305.85,y:-83.95},7).wait(15).to({startPosition:0},0).to({startPosition:0},7).wait(103).to({startPosition:0},0).to({startPosition:0},11).wait(186).to({startPosition:0},0).to({startPosition:0},16).wait(108).to({startPosition:0},0).to({startPosition:0},12).wait(35).to({startPosition:0},0).to({startPosition:0},8).wait(21).to({startPosition:0},0).to({regX:14.4,rotation:-146.8148,x:-271.6,y:-88.15},11).wait(94).to({startPosition:0},0).to({regX:14.5,scaleX:0.9999,scaleY:0.9999,rotation:-133.3484,x:-285.3,y:-88},9).wait(129).to({startPosition:0},0).to({rotation:-130.673,x:-289.65,y:-85.05},12).wait(88).to({startPosition:0},0).to({regX:14.3,scaleX:1,scaleY:1,rotation:0,x:-305.85,y:-83.95},9).wait(17).to({startPosition:0},0).to({startPosition:0},8).wait(118).to({startPosition:0},0).to({startPosition:0},8).wait(22).to({startPosition:0},0).to({regX:14.6,scaleX:0.9999,scaleY:0.9999,rotation:-138.8111,x:-282.85,y:-85.8},7).wait(126).to({startPosition:0},0).to({regX:14.3,scaleX:1,scaleY:1,rotation:0,x:-305.85,y:-83.95},6).wait(20).to({startPosition:0},0).to({startPosition:0},9).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(26).to({startPosition:0},0).to({startPosition:0},9).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-576.9,-366.2,1153.4,730.3);


(lib.ipou88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// yiult78lt78l
	this.instance = new lib.yiult78lt78l("synched",0);
	this.instance.setTransform(3.25,301.3,1,1,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26).to({scaleX:1.6818,scaleY:1.6818,x:-259.4,y:236.2,startPosition:26},0).wait(75).to({x:291,y:256.2,startPosition:101},0).wait(82).to({x:-263.7,y:247.6,startPosition:183},0).wait(486).to({x:291.05,y:250.45,startPosition:669},0).wait(111).to({x:-260.8,y:218.95,startPosition:780},0).wait(117).to({scaleX:1,scaleY:1,x:3.25,y:301.3,startPosition:897},0).wait(39).to({scaleX:1.9275,scaleY:1.9275,x:392.8,y:410.9,startPosition:936},0).wait(558).to({scaleX:1,scaleY:1,x:3.25,y:301.3,startPosition:1494},0).wait(61).to({scaleX:1.941,scaleY:1.941,x:396.35,y:395.2,startPosition:1555},0).wait(211).to({x:-360.65,y:362.75,startPosition:1766},0).wait(192).to({x:414.4,y:355.55,startPosition:1958},0).wait(184).to({x:-357,y:305.1,startPosition:2142},0).wait(74).to({x:414.45,y:341.15,startPosition:2216},0).wait(118).to({x:-353.35,y:330.35,startPosition:2334},0).wait(501).to({x:403.65,y:352,startPosition:2835},0).wait(380).to({x:-360.6,y:344.8,startPosition:3215},0).wait(145).to({x:421.65,y:334,startPosition:3360},0).wait(170).to({scaleX:1,scaleY:1,x:3.25,y:301.3,startPosition:3530},0).wait(203).to({startPosition:3733},0).to({_off:true},1).wait(3));

	// _Clip_Group_
	this.instance_1 = new lib.ClipGroup("synched",0);
	this.instance_1.setTransform(34.65,18.65,1.9359,1.9359,0,0,0,267.2,203.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(26).to({scaleX:3.2557,scaleY:3.2557,x:-206.5,y:-239.15,startPosition:26},0).wait(75).to({x:343.9,y:-219.15,startPosition:101},0).wait(82).to({x:-210.8,y:-227.75,startPosition:183},0).wait(486).to({x:343.95,y:-224.9,startPosition:166},0).wait(111).to({x:-207.9,y:-256.4,startPosition:277},0).wait(117).to({scaleX:1.9359,scaleY:1.9359,x:34.65,y:18.65,startPosition:394},0).wait(39).to({scaleX:3.7313,scaleY:3.7313,x:453.4,y:-133.85,startPosition:433},0).wait(558).to({scaleX:1.9359,scaleY:1.9359,x:34.65,y:18.65,startPosition:488},0).wait(61).to({scaleX:3.7575,scaleY:3.7575,x:457.35,y:-153.4,startPosition:46},0).wait(211).to({x:-299.65,y:-185.85,startPosition:257},0).wait(192).to({x:475.4,y:-193.05,startPosition:449},0).wait(184).to({x:-296,y:-243.5,startPosition:130},0).wait(74).to({x:475.45,y:-207.45,startPosition:204},0).wait(118).to({x:-292.35,y:-218.25,startPosition:322},0).wait(501).to({x:464.65,y:-196.6,startPosition:320},0).wait(380).to({x:-299.6,y:-203.8,startPosition:197},0).wait(145).to({x:482.65,y:-214.6,startPosition:342},0).wait(170).to({scaleX:1.9359,scaleY:1.9359,x:34.65,y:18.65,startPosition:9},0).wait(203).to({startPosition:212},0).to({_off:true},1).wait(3));

	// Layer_20
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#606163").p("AfQfQMg+fAAAMAAAg+fMA+fAAAg");
	this.shape.setTransform(9.8924,12.4139,1.9359,1.9359);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(26).to({scaleX:3.2557,scaleY:3.2557,x:-248.1729,y:-249.6411},0).wait(75).to({x:302.2271,y:-229.6411},0).wait(82).to({x:-252.4729,y:-238.2411},0).wait(486).to({x:302.2771,y:-235.3911},0).wait(111).to({x:-249.5729,y:-266.8911},0).wait(117).to({scaleX:1.9359,scaleY:1.9359,x:9.8924,y:12.4139},0).wait(39).to({scaleX:3.7313,scaleY:3.7313,x:405.638,y:-145.8267},0).wait(558).to({scaleX:1.9359,scaleY:1.9359,x:9.8924,y:12.4139},0).wait(61).to({scaleX:3.7575,scaleY:3.7575,x:409.2622,y:-165.4915},0).wait(211).to({x:-347.7378,y:-197.9415},0).wait(192).to({x:427.3122,y:-205.1415},0).wait(184).to({x:-344.0878,y:-255.5915},0).wait(74).to({x:427.3622,y:-219.5415},0).wait(118).to({x:-340.4378,y:-230.3415},0).wait(501).to({x:416.5622,y:-208.6915},0).wait(380).to({x:-347.6878,y:-215.8915},0).wait(145).to({x:434.5622,y:-226.6915},0).wait(170).to({scaleX:1.9359,scaleY:1.9359,x:9.8924,y:12.4139},0).wait(203).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1480.4,-1070.9,3021.1000000000004,2182.8);


// stage content:
(lib.m2l4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,183,379,673,1068,1256,1472,1766,1958,2216,2744,3214,3733];
	this.streamSoundSymbolsList[0] = [{id:"audiocut1",startFrame:0,endFrame:183,loop:1,offset:0}];
	this.streamSoundSymbolsList[183] = [{id:"audiocut2",startFrame:183,endFrame:379,loop:1,offset:0}];
	this.streamSoundSymbolsList[379] = [{id:"audiocut3",startFrame:379,endFrame:673,loop:1,offset:0}];
	this.streamSoundSymbolsList[673] = [{id:"audiocut4",startFrame:673,endFrame:1068,loop:1,offset:0}];
	this.streamSoundSymbolsList[1068] = [{id:"audiocut5",startFrame:1068,endFrame:1256,loop:1,offset:0}];
	this.streamSoundSymbolsList[1256] = [{id:"audiocut6",startFrame:1256,endFrame:1472,loop:1,offset:0}];
	this.streamSoundSymbolsList[1472] = [{id:"audiocut7",startFrame:1472,endFrame:1766,loop:1,offset:0}];
	this.streamSoundSymbolsList[1766] = [{id:"audiocut8",startFrame:1766,endFrame:1958,loop:1,offset:0}];
	this.streamSoundSymbolsList[1958] = [{id:"audiocut9",startFrame:1958,endFrame:2216,loop:1,offset:0}];
	this.streamSoundSymbolsList[2216] = [{id:"audiocut10",startFrame:2216,endFrame:2744,loop:1,offset:0}];
	this.streamSoundSymbolsList[2744] = [{id:"audiocut11",startFrame:2744,endFrame:3214,loop:1,offset:0}];
	this.streamSoundSymbolsList[3214] = [{id:"audiocut12",startFrame:3214,endFrame:3734,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audiocut1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,183,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_183 = function() {
		var soundInstance = playSound("audiocut2",0);
		this.InsertIntoSoundStreamData(soundInstance,183,379,1);
	}
	this.frame_379 = function() {
		var soundInstance = playSound("audiocut3",0);
		this.InsertIntoSoundStreamData(soundInstance,379,673,1);
	}
	this.frame_673 = function() {
		var soundInstance = playSound("audiocut4",0);
		this.InsertIntoSoundStreamData(soundInstance,673,1068,1);
	}
	this.frame_1068 = function() {
		var soundInstance = playSound("audiocut5",0);
		this.InsertIntoSoundStreamData(soundInstance,1068,1256,1);
	}
	this.frame_1256 = function() {
		var soundInstance = playSound("audiocut6",0);
		this.InsertIntoSoundStreamData(soundInstance,1256,1472,1);
	}
	this.frame_1472 = function() {
		var soundInstance = playSound("audiocut7",0);
		this.InsertIntoSoundStreamData(soundInstance,1472,1766,1);
	}
	this.frame_1766 = function() {
		var soundInstance = playSound("audiocut8",0);
		this.InsertIntoSoundStreamData(soundInstance,1766,1958,1);
	}
	this.frame_1958 = function() {
		var soundInstance = playSound("audiocut9",0);
		this.InsertIntoSoundStreamData(soundInstance,1958,2216,1);
	}
	this.frame_2216 = function() {
		var soundInstance = playSound("audiocut10",0);
		this.InsertIntoSoundStreamData(soundInstance,2216,2744,1);
	}
	this.frame_2744 = function() {
		var soundInstance = playSound("audiocut11",0);
		this.InsertIntoSoundStreamData(soundInstance,2744,3214,1);
	}
	this.frame_3214 = function() {
		var soundInstance = playSound("audiocut12",0);
		this.InsertIntoSoundStreamData(soundInstance,3214,3734,1);
	}
	this.frame_3733 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(183).call(this.frame_183).wait(196).call(this.frame_379).wait(294).call(this.frame_673).wait(395).call(this.frame_1068).wait(188).call(this.frame_1256).wait(216).call(this.frame_1472).wait(294).call(this.frame_1766).wait(192).call(this.frame_1958).wait(258).call(this.frame_2216).wait(528).call(this.frame_2744).wait(470).call(this.frame_3214).wait(519).call(this.frame_3733).wait(1));

	// tal
	this.instance = new lib.ipou88("synched",0);
	this.instance.setTransform(403.4,533.05,1,1,0,0,0,3.2,132.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3734));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-680.2,-270.7,2621.1000000000004,1782.7);
// library properties:
lib.properties = {
	id: 'EECE8C272624E84AA3158D35CA0F324A',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/audiocut1.mp3", id:"audiocut1"},
		{src:"sounds/audiocut10.mp3", id:"audiocut10"},
		{src:"sounds/audiocut11.mp3", id:"audiocut11"},
		{src:"sounds/audiocut12.mp3", id:"audiocut12"},
		{src:"sounds/audiocut2.mp3", id:"audiocut2"},
		{src:"sounds/audiocut3.mp3", id:"audiocut3"},
		{src:"sounds/audiocut4.mp3", id:"audiocut4"},
		{src:"sounds/audiocut5.mp3", id:"audiocut5"},
		{src:"sounds/audiocut6.mp3", id:"audiocut6"},
		{src:"sounds/audiocut7.mp3", id:"audiocut7"},
		{src:"sounds/audiocut8.mp3", id:"audiocut8"},
		{src:"sounds/audiocut9.mp3", id:"audiocut9"}
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
an.compositions['EECE8C272624E84AA3158D35CA0F324A'] = {
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