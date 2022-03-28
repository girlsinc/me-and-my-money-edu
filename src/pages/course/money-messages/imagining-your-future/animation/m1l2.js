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



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1556,1552);// helper functions:

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


(lib.yukr6k6r7k6r7kr67k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B188").s().p("AhvHKQgMgRgKgbIgHgYQAOiWATirQAolUAchnQAehtBDAAQAaAAAYAQQAWAOAJATQAOAghTGfQhRGagSAaQgYAjgWAAQgTAAgRgag");
	this.shape.setTransform(-0.0087,96.81,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.2,0,56.4,193.6);


(lib.yuk67k67k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7B7272").s().p("AAUGFQgxg9gehBQgVguATixIAXinIgxAYQgSgDgTgaQgng1gHh1QgIh0AyggQAPgKAUAAQAJAAAHACQB0AqAiCHQAQBAgFB2IgTBuQgVB6gOAzQgMAuBMBOQAmAnAoAdIg4BVQgngDg5hFg");
	this.shape.setTransform(34.443,92.2648,1.9998,1.9998);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B188").s().p("AAAB9IgCgeIg3AsQgKAHgNgSQgZgigIh3QgJh3AyghQAPgJATgBQAKAAAHACQBMAjAmCJQATBDADA9IhqBJQgFgcgEgjg");
	this.shape_1.setTransform(25.3179,42.7189,1.9998,1.9998);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B188").s().p("AA6BwQgJAAgPgQQgyg2gGAAQgBAAAZAcQAcAegFAFQgFAFgEgBQgGgCgPgNQgtgngqg1Qgug6AKgOQAmgwAoAHQAkAHBTBAIASARQARATgCAHQgCAIgMgHIgVgNIgigaQgZgTgBAEQgCAIANANQAXAWBOAyQARANgHAJQgHAKgPgKIgjgYQghgVgCABQgCACAsAlQAqAkgPAGQgIADgHgEIgNgMIgjggQgdgagGgDQgWgLAvAsQAcAaAGAKQAEAGgDAEQgEAGgFAAIgBgBg");
	this.shape_2.setTransform(78.9713,189.7434,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,105.1,212.3);


(lib.uoit79t7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B13538").s().p("Ag4AkIArgjQAvglAWgLIABAKQhCAsgtApIgCgMg");
	this.shape.setTransform(40.1993,54.0977,1.9999,1.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B13538").s().p("Ag4AmQgBgDAxgkQAwgmAOgHIAEAJQhHAtgpAng");
	this.shape_1.setTransform(41.3488,59.0474,1.9999,1.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F6F7F8").s().p("AAHB6IgFgdIgxAvQgNAJgSgPQgigegSh0QgTh1A1gmQAagSAeAEQBxAgAfBlQAHAYAIA3QAHAtAKASIhyBZQgIgbgHgig");
	this.shape_2.setTransform(27.168,36.5606,1.9999,1.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBBF99").s().p("AA2DnQgqgCgvjEIgojCIBXhFIAuDnQAlDmgpAAIAAAAg");
	this.shape_3.setTransform(45.9179,85.8477,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61.1,132);


(lib.uoy89y8998 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3C1BE").s().p("AgWC3QhQiqgehTQgkhjA7hiQAZgqAggRQAjgTAeASQA2AeAtEoQAjDjAABKIhfAlIhKiag");
	this.shape.setTransform(-0.01,67.337,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,0,58.8,134.7);


(lib.uoy79y98y7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF99").s().p("AhgAcIAEgrQgQA3gIABQgJACAOg4QAPg4AWgBQAUgBA0ALIA7AMIBAA8QgkAfg8gOIg1gUQgIAygMACQgEAAgCgJQgCAQgHABQgIABgBgnIABgmQgJBMgMACIAAAAQgIAAAEgrg");
	this.shape.setTransform(-24.1241,-14.1668,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-28.3,48.2,28.3);


(lib.ult78lt78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7E7E7").s().p("AgvAcQgwgGAJgPQAHgMAqgMQAogNAlAAQAqAAAGATIgCAIQgEAKgKAHQgYARgwAAQgVAAgagDg");
	this.shape.setTransform(36.8716,132.5579,1.9999,1.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7E7E7").s().p("AgVArIAahZIARAHIgYBWg");
	this.shape_1.setTransform(-40.6453,59.9922,1.9999,1.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E7E7").s().p("AgOAuIAMhcIARAFIgLBYg");
	this.shape_2.setTransform(-27.096,63.342,1.9999,1.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7E7E7").s().p("AgMguIASADIAHBXIgSADg");
	this.shape_3.setTransform(16.3017,66.2918,1.9999,1.9999);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E7E7E7").s().p("AgUgrIASgCIAXBVIgSAGg");
	this.shape_4.setTransform(35.4007,64.8919,1.9999,1.9999);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B13538").s().p("AggApQhGgJhNgQIhAgPIAgg1QBmAqCvgJQBYgFBEgOQAGABAJAeIAHAdQgiAfhiAAQg8AAhUgMg");
	this.shape_5.setTransform(-1.5474,61.7049,1.9999,1.9999);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#343332").ss(1,0,0,4).p("ABIhSIiAAAIgEAtIA8AAQBkAAgBBKQAAApgjAaQgfAYgpAAQgsAAgWgSQgZgTAAgqIAmAAQAAATARAJQAOAHAVAAQAUAAATgMQAWgOAAgVQAAgfg+AAIhSABQAAgVAEgsQADgrAAgXIChgDg");
	this.shape_6.setTransform(-6.2613,-36.9907,1.9996,1.9996);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(3,0,0,4).p("ABIhSIiAAAIgEAtIA8AAQBkAAgBBKQAAApgjAaQgfAYgpAAQgsAAgWgSQgZgTAAgqIAmAAQAAATARAJQAOAHAVAAQAUAAATgMQAWgOAAgVQAAgfg+AAIhSABQAAgVAEgsQADgrAAgXIChgDg");
	this.shape_7.setTransform(-6.2613,-37.0109,1.9996,1.9996);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#292929").ss(2).p("ABIhSIiAAAIgEAtIA8AAQBkAAgBBKQAAApgjAaQgfAYgpAAQgsAAgWgSQgZgTAAgqIAmAAQAAATARAJQAOAHAVAAQAUAAATgMQAWgOAAgVQAAgfg+AAIhSABQAAgVAEgsQADgrAAgXIChgDg");
	this.shape_8.setTransform(-6.1738,-36.903,1.9998,1.9998);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B13538").s().p("AhKBuQgZgTABgqIAlAAQABATARAJQANAHAWAAQATAAATgMQAWgOAAgVQABgfg/AAIhSABQAAgVAEgsQAEgrgBgXIChgDIgDAtIiBAAIgEAtIA9AAQBjAAAABKQgBApgjAaQgfAYgoAAQgtAAgWgSg");
	this.shape_9.setTransform(-6.1738,-36.8827,1.9998,1.9998);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DEDEDD").s().p("AgxgSIAMi5IBWGXg");
	this.shape_10.setTransform(-8.447,101.24,1.9999,1.9999);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D6AF92").s().p("AgdgIQA5gmBHgjIAGAEQgUBWgZAVQgvAngzAKIgrADQhAgOB0hMg");
	this.shape_11.setTransform(5.5267,-123.948,1.9999,1.9999);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E7E7E7").s().p("AAcCFIg+hvQgRgdAFgSQACgGAIgMIBUh5IABBzQAABJgDAjQgGA8gRAug");
	this.shape_12.setTransform(33.8396,-43.1023,1.9999,1.9999);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EBBF99").s().p("AhxBuQgEgrARgjQAVhbgHgPIBggxQBiguAHALIgMBWQgJBXAOAPQgdAhglAhQhIBBglAAQgqAAgEgzg");
	this.shape_13.setTransform(1.2781,-109.8592,1.9999,1.9999);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F6F7F8").s().p("AjBFoIAliKQgdhVgXhiQgsjCAhg9QAyhuAMgmIAggSQAkgQAUAEIBTANQBZAIAbgXIBoAhIgXG3IgSBEQgLBPAfA5IANAYQALAfgEAoQhIAPhZAFQgjACgeAAQiCAAhGglg");
	this.shape_14.setTransform(-3.0828,-24.3429,1.9999,1.9999);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E7E7E7").s().p("AgKDFIkTgDQgPg5AChOQADiaBRhsIAGgMQA3AdC/gFQBfgCBVgHIAcB2IgBAAQAeAqAOA0QAYBUgfBPIgSApg");
	this.shape_15.setTransform(0.0112,90.7905,1.9999,1.9999);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#49302E").s().p("AgxgSIAMi5IBWGXg");
	this.shape_16.setTransform(-8.447,101.24,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.9,-142.1,119.8,284.2);


(lib.uio8y9y89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF99").s().p("AAIA0QgGgEACgKIAEgJQAAgIgQgMIgSgJIASg0QAEAUAfA6QgIAbgIAAIgDgBg");
	this.shape.setTransform(-11.7815,227.5378,1.9999,1.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF99").s().p("AgYBXQgagdgCgRQgBgOAPhHIAPhEIAQANIAcCBIgJAdQgIAdADAEQACADAPgUQARgVAJAFQAKAHgWAXQgUAVgKADIgBAAQgHAAgYgag");
	this.shape_1.setTransform(-23.3272,220.9265,1.9999,1.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B13538").s().p("Ag8gfIACgLQAnARBQA5IgCALg");
	this.shape_2.setTransform(-2.8319,60.2124,1.9999,1.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7E7E7").s().p("Ah9BpQAFgMACgLQAFhZAQgzQAchaBoglIARgBQATAAAPALQAxAhgLB4QgLB2gaAiQgNARgLgHIg1gtIgEAeQgEAjgGAbg");
	this.shape_3.setTransform(8.7711,37.4633,1.9999,1.9999);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EBBF99").s().p("AhdGBQANgxAakJIAYj/QADgkAOhbIANhUIBeAhQAEArg1EqQgKAzgxFug");
	this.shape_4.setTransform(-11.8034,132.4097,1.9999,1.9999);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBBF99").s().p("AgQAtQgTgtAKgpIAZggIAUA3QASA7gRAXQgHAKgHAAQgLAAgMgdg");
	this.shape_5.setTransform(-19.2528,213.032,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.9,0,67.8,243.6);


(lib.uilt78lt78lt78lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B188").s().p("Ah9HTQghgVAAghQABgnBhrUQAZgoAhgjQBChGAmAZQAsAdAKA7QAJA2gVA6IhWF+QhKFOgiAUQgUAMgTAAQgSAAgSgLg");
	this.shape.setTransform(-0.0062,95.4988,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.7,0,63.4,191);


(lib.uiy7998y8y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3C1BE").s().p("AhEE1QgKgcgTkPQgUkmAggRQBAgjAwAHQBNAMACB1QACBxgfDcQgQBugQBYg");
	this.shape.setTransform(0.037,66.2196,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.1,0,42.3,132.4);


(lib.oy8y89y79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF99").s().p("AiXCLIgDggQAYgOBviAIBoh/IBGBAQgGAahjBsQhoB2gsAIIgPABQgdAAgJgYg");
	this.shape.setTransform(-31.0001,32.6253,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62,0,62,65.3);


(lib.ilt68lt867l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#897E7E").s().p("ABTGjQgmgPgGgFQhkhHhDhVIgwhHQAAgQAHgPQAFgqAGgOQAHgRgFhSQgHhrADg2QALjbCSgoIAKgDQAOgBALAIQAjAcgFB1QgBAagJBOIg+A3IABCPQgDCSgSAOIBwBRQBtBXgRAdIg3BBQgDgHghgNg");
	this.shape.setTransform(-19.5652,87.6852,1.9999,1.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B188").s().p("AA7BwQgKAAgPgQQgxg2gHABQgBAAAZAcQAcAdgFAGQgEAFgFgCQgGgCgOgNQgtgngqg1Qgvg6AKgOQAmgwAoAIQAkAGBTBAIASARQARATgCAHQgCAIgMgHIgVgNIgigaQgZgTgBAEQgCAIANANQAXAXBOAyQARAMgHAKQgGAJgPgKIgkgXQghgWgCACQgBABArAlQAqAkgPAHQgHADgIgFIgMgMQg9g5gKgEQgTgJAtArQAbAZAHAKQADAGgDAEQgEAFgFAAIAAAAg");
	this.shape_1.setTransform(28.7073,182.1316,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,0,109.8,204.6);


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
	this.shape.graphics.f("#EA8F8F").s().p("AgsARQgFgCgDgEQgGgJAJgJIAGgFQAHgDALAFIAWAFQAcABAegPQgHANgQAKQgXAQgbAAQgMAAgOgDg");
	this.shape.setTransform(-11.9226,4.3041,2.1608,2.1608);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE7C7E").s().p("AguAYQgFgMANgJIAEgDQAHgBAQgBQAYgCAjgdQACAegfATQgVAPgUADIgGAAQgNAAgFgKg");
	this.shape_1.setTransform(-10.4451,7.3396,2.1608,2.1608);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhFAvIgLggIA+gJQAvgGA0guQgHAdgZAWQgsAqhBAAIgJAAg");
	this.shape_2.setTransform(-9.6,6.9844);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA8F8F").s().p("AgjAOIghgYQAnALAhgHQARgEAKgGQALgJAKADQAFABADADQANAKgGALQgCAGgGAEQgaALgYAAQgWAAgWgKg");
	this.shape_3.setTransform(-11.3543,3.9209,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CD7978").s().p("AgRAVQgqgSgEgjIAcANQAhANASgCQAegEADAFQASAHgEAQQgDAQgYABIgCAAQgYAAgbgMg");
	this.shape_4.setTransform(0.85,-0.05,1.8055,1.8055,0,-20.6748,159.3252,-6.5,-3.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhhAeIBNgLQA9gKA5hGQgYAygqAiQgqAjhLAEg");
	this.shape_5.setTransform(-7.925,5.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA8F8F").s().p("AgeAOQgagNgRgPQAxAPAhgHQARgEAKgGQALgJAKADQAFABADADQANAKgGALQgCAGgGAEQgaALgYAAQgWAAgWgKg");
	this.shape_6.setTransform(-10.4637,3.773,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD7978").s().p("AgPAcQgqgSgIgxQAWAhAPAGQAeANAagLQAUgHADAFQASAHgEAQQgDAQgYABIgCAAQgYAAgbgMg");
	this.shape_7.setTransform(2.5,1.55,1.8055,1.8055,0,-20.6748,159.3252,-6.3,-2.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhmAdIBOgPQA9gMBBg/QghAygqAhQgpAjhMAEg");
	this.shape_8.setTransform(-7.45,5.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA8F8F").s().p("AgcAOQgbgNgUgMQA0AMAigHQARgEAJgGQAMgJAKADQAFABACADQANAKgFALQgDAGgFAEQgaALgZAAQgWAAgVgKg");
	this.shape_9.setTransform(-10.1966,3.7286,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD7978").s().p("AgPAbQgqgSgIgwQAWAgAPAGQAeANAagLQAUgHADAFQASAHgEAQQgDAQgYABIgCABQgYAAgbgNg");
	this.shape_10.setTransform(3.15,-0.45,1.8055,1.8055,0,-27.9043,152.0957,-6.7,-3.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhqAeIBNgPQA9gNBLg/QgqAygqAiQgqAjhLAEg");
	this.shape_11.setTransform(-7.025,5.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EA8F8F").s().p("AgZAOIg0gZQA5AMAigHQARgEAJgGQAMgJAKADQAFABACADQANAKgFALQgDAGgFAEQgbALgYAAQgWAAgVgKg");
	this.shape_12.setTransform(-9.7067,3.6473,1.8056,1.8056,0,-9.4305,170.5695);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CD7978").s().p("AgNAhQgqgSgMg8QAaAsAPAFQAeAOAagLQAUgHADAEQASAIgEAQQgDAQgYABIgCABQgYAAgbgNg");
	this.shape_13.setTransform(4.35,1.3,1.8055,1.8055,0,-27.9043,152.0957,-6.5,-3.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).to({state:[]},1).wait(7));

	// Layer_3
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFA477").s().p("Ag1AeQgOgIANgQQAMgOAVgIIAbgLQAIgDAPgBIAYgCQAJAAgBAEQgPAxg2ALQgOADgLAAQgNAAgHgEg");
	this.shape_14.setTransform(-4.5545,11.8145,0.8209,0.8209);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2).to({_off:false},0).wait(1).to({x:-4.4045,y:13.0145},0).wait(1).to({x:-3.6045,y:15.2145},0).to({_off:true},1).wait(7));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CD573F").s().p("AhMgDICZhMIgXBpIhlA2QANgpgqgqg");
	this.shape_15.setTransform(-5.725,7.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CD573F").s().p("AhSgDICihMQANBOgtAbQgrAyg5AEQAMgpgqgqg");
	this.shape_16.setTransform(-5.1517,7.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CD573F").s().p("AhWgNICshNQAEBPggA3Qg5AWg0AZQAHg+gqgqg");
	this.shape_17.setTransform(-4.7857,8.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EA8F8F").s().p("AgMBAQgfgNAEgdQgggJgCgUQgCgZAUgQQARgPAXgBQAxgDAkAdQAIAPgJAdQgIAegeARQgWAMgNAAQgEAAgEgBgAAGgdQgPABgGAFQgGAEgBACIgBACIgBACQAOAIAFAHQAFAIAAAFIABAHQAXACAFgMQAFgMgEgKQgHgTgPAAIgCAAg");
	this.shape_18.setTransform(-9.8467,11.6229);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CD573F").s().p("AgBAaIgCgHQgBgFgFgIQgFgHgNgIIABgCIABgCQAAgCAGgFQAGgEAPgBQARgCAIAVQADAKgFAMQgEAKgTAAIgDAAg");
	this.shape_19.setTransform(-9.4872,11.2273);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},2).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},5).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-1,33,25);


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


(lib.ghjktfdykjdtyjjrjdrj = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE9F7E").s().p("AhFgmICiinIgxGAQgGAOiCANg");
	this.shape.setTransform(24.3245,114.7558,1.9999,1.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#545455").s().p("AhPAnQg7gKg7gRIgtgOIgJAAQBbhLDWApQBtAUBZAiQhXAhhsAAQg/AAhJgMg");
	this.shape_1.setTransform(3.1654,136.1487,1.9999,1.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7B7272").s().p("AgwGKIhBgRQgdgWAShEIAXg+QAfg4AEhEIgSngIBwgqQATASAVAaQAcAlAPAlQAbCBgJDuQgFCBgVDlQhIgIhPgUg");
	this.shape_2.setTransform(-29.6267,-37.7038,1.9999,1.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#897E7E").s().p("AhFGgQAyp4hKjHQATgFAmARQATAJAOAJQALAlAwBpQAsA+geDCQgQBigXBVQA5CmAGAcQghARgmAGQgXAEgjAAIgigBg");
	this.shape_3.setTransform(37.1636,-39.3197,1.9999,1.9999);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#545455").s().p("AgVgnIARgIIAbBaIgTAFg");
	this.shape_4.setTransform(42.4633,48.9416,1.9999,1.9999);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#545455").s().p("AgOgpIARgGIAMBdIgSACg");
	this.shape_5.setTransform(28.714,52.3414,1.9999,1.9999);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#545455").s().p("AgMAtIAHhaIASgBIgGBdg");
	this.shape_6.setTransform(-15.3336,55.5913,1.9999,1.9999);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#545455").s().p("AgUAqIAWhYIATACIgXBag");
	this.shape_7.setTransform(-34.6326,54.1413,1.9999,1.9999);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#313131").s().p("Aj3AYIAIgeQAJgeAGgBIAuAHQA4AIA4ADQCxAJBogsIAhA3QhmAahwAPQhWANg+AAQhiAAgjgfg");
	this.shape_8.setTransform(2.8154,50.759,1.9999,1.9999);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BE9F7E").s().p("AAwA9QgwgBgvgcQgZgPgghJIAGgFIB9AuQBzAxg3AXQgMAFgTAAIgIgBg");
	this.shape_9.setTransform(-5.1047,-139.7316,1.9999,1.9999);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D3B188").s().p("AgVBuQgagKgagSIgVgRQANgOgIhVIgMhSQAHgLBeAtQAuAXAuAYQgEAJAHAxIAHAvQgeAxgwAAQgWAAgXgJg");
	this.shape_10.setTransform(-2.4843,-130.5218,1.9999,1.9999);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#444444").s().p("AAbjNIAMC8IhNDfg");
	this.shape_11.setTransform(12.1649,90.5894,1.9999,1.9999);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#4E6146").s().p("AgtA9QgDglAAhJIAAh1IBVB6QAIAKADAJQAFARgSAfIg+BwIAFAgQgSgtgFg9g");
	this.shape_12.setTransform(-33.5039,-55.4028,1.9999,1.9999);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D3B188").s().p("AgrBhIg8g0QAOgQgJhYIgNhXQAHgLBkAuQAxAYAwAZQgGAPARBgQAMAtgFAWQgHAhgrABQglAAhDg1g");
	this.shape_13.setTransform(-1.7373,-125.9595,1.9999,1.9999);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#4E6146").s().p("AhLGRQg4gDg8gJIgwgIQgEgoALggIANgYQAgg6gMhRIgThEIgZm9IBqgjQAbAYBbgJQAsgEAogJQAUgFAkARQATAIAOAKQAMAnA9BvQAjA+goDFQgTBjgbBWQAYBYgBAjQgBARgFAAQhHAniGAAQgeAAghgCg");
	this.shape_14.setTransform(4.9737,-36.4637,1.9999,1.9999);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#545455").s().p("AAaD6IgEggQgDAGgBAYIj9gKIgrhiQgfhRAXhUQAOg1AegrIAAAAIAch4IC3AJQDBADA4gdIAGANQBSBtgLDQQgFBogWBTg");
	this.shape_15.setTransform(-0.0084,88.0895,1.9999,1.9999);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#49302E").s().p("AAljOIANC7IhjDig");
	this.shape_16.setTransform(10.015,90.8894,1.9999,1.9999);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#4E6146").s().p("Ah3AFIABgQQAmgQBdAGQAvADAnAGIAVAjg");
	this.shape_17.setTransform(-0.1844,-119.6434,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.3,-155.8,118.6,311.70000000000005);


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
p.nominalBounds = new cjs.Rectangle(-17.1,-11.2,41,35.2);


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
	this.instance_3.setTransform(28.45,-1.15,2.0439,2.0439,0,0,180,6,3.2);

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
	mask_1.setTransform(-25.5089,8.7222);

	// _Clip_Group__12
	this.instance_4 = new lib.ClipGroup_12();
	this.instance_4.setTransform(-34.3,9.15,2.852,2.852,21.0125,0,0,5.5,2.6);

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
	this.instance_1.setTransform(31.15,2.1,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-26.9,2.25,2.0882,2.0882,0,0,0,6.2,3.8);

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

	// Layer_25
	this.instance = new lib.hmjdtyktrktuk("single",0);
	this.instance.setTransform(-15.6,-26.75,0.8038,0.8038,10.2073,0,0,-0.2,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(4).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(50).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(544).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(115).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(4).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(812).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(384).to({startPosition:10},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(442).to({startPosition:1},0).to({_off:true},1).wait(20));

	// Layer_24
	this.instance_1 = new lib.hjluyglyilyitl("synched",0);
	this.instance_1.setTransform(-28.1,-62.25,0.6561,0.6662,0,-2.3037,177.6969);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3000).to({startPosition:0},0).to({_off:true},1).wait(20));

	// Layer_11
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BFA941").s().p("AAAAKQgEgBgDgDQgCgDAAgDQACgKAIABQAEABADADQADAEgBADQgBAEgDACQgCACgDAAIgBAAg");
	this.shape.setTransform(29.1671,-32.6278,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3000).to({_off:true},1).wait(20));

	// Layer_12
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F6F7F8").s().p("AAYAoQgcgYgogVQhPgsg6ANQgPAAgTADQglAFgVALIAYgNQAfgPAlgMQB0gmB1AJIBBAUQBQAjBNBMQgpAag0ALQgbAHgYAAQhDAAgngxg");
	this.shape_1.setTransform(-26.7216,-94.6451,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3000).to({_off:true},1).wait(20));

	// Layer_13
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E7E7").s().p("ADRCqQg5gDgygjIlohiQAVg8Ayg4QBkhvCSAeIAiAJQApAPAhAcQBqBagRC7QgNAEgTAAIgPAAg");
	this.shape_2.setTransform(1.525,-115.6585,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3000).to({_off:true},1).wait(20));

	// Layer_14
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D6AF92").s().p("AgUANQAGgJAOgEQARgQAGghQACAXgKARQgEAJgFADQgeAHAPAVQAHAKANAJQgqgUALgRg");
	this.shape_3.setTransform(-32.0185,-47.2461,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3000).to({_off:true},1).wait(20));

	// Layer_15
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D6AF92").s().p("AgBgSQANgRAIABIgMAPIgJAOQgIAJgEALIgGAUQAAghASgUg");
	this.shape_4.setTransform(32.2002,-44.7477,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3000).to({_off:true},1).wait(20));

	// Layer_16
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBBF99").s().p("AghBDIgKgEIAFhgIAHALQAGAIACgSQACgYANgJQAKgIAPAHQAkATgNA1QgNA7gkAFIgGAAQgJAAgJgDg");
	this.shape_5.setTransform(31.9417,-43.9683,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3000).to({_off:true},1).wait(20));

	// Layer_17
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#292929").s().p("AAsAOQgNgKgJgEQgjgUguAhIAPgOQAUgPAZgBQAaAAATARQAKAIAEAIQgDACgDAAQgEAAgGgEg");
	this.shape_6.setTransform(-48.7454,-82.1115,1.9999,1.9999);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("ABYAfQgYgXgRgLQhEgthgA8IAggbQAqgaAzADQAzACAjAlQASASAGASQgEADgFAAQgJAAgMgJg");
	this.shape_7.setTransform(-48.825,-80.2698);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("ABXAhQgXgYgQgMQg/gyhlA1IAigZQArgXAzAGQAzAHAgAnQARAUAFASQgEACgEAAQgKAAgMgLg");
	this.shape_8.setTransform(-48.85,-78.4757);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6}]}).to({state:[{t:this.shape_6}]},900).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_6}]},75).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_6}]},2019).to({state:[]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(900).to({_off:true},1).wait(2).to({_off:false,rotation:12.9422,x:-48.2823,y:-77.8181},0).wait(75).to({_off:true},1).wait(2).to({_off:false,rotation:0,x:-48.7454,y:-82.1115},0).wait(2019).to({_off:true},1).wait(20));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("Ag6AAQAVgVAiACQAeACAaARQAOAIAHAIQg8glgmAPQghAXgQADg");
	this.shape_9.setTransform(2.5518,-77.6619,1.9999,1.9999);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("Ah1gCQAqgpBFAFQA9AFA0AiQAaASAOAQQh2hMhNAdQhDAuggAGg");
	this.shape_10.setTransform(1.55,-75.8769);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("Ah0gCQArgpBEAGQA8AFA0AjQAbASAOAQQh2hNhOAcQhDAtggAGg");
	this.shape_11.setTransform(0.55,-74.0383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9}]}).to({state:[{t:this.shape_9}]},900).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},75).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},2019).to({state:[]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(900).to({_off:true},1).wait(2).to({_off:false,rotation:2.2148,x:-0.3204,y:-71.9294},0).wait(75).to({_off:true},1).wait(2).to({_off:false,rotation:0,x:2.5518,y:-77.6619},0).wait(2019).to({_off:true},1).wait(20));

	// Layer_19
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EBBF99").s().p("Ah2EWQgqgUglhHQghhCgCgxIAHhIQAEgkgSghQgTgiAeg+QAqhJASgkIA2gJQBAgBAtAoQAjAfARgCQAAgFABgDQAEgKAEAEQADAEgFAFQgDAEgEABQgBAQAXAbQAQATAsAuQAVAYAGAqQAEAYADAwIAHALQAHAHABgSQACgYAOgKQANgJAPAGQAmAQgRA8QgSBBgjADQgLABgMgGIgJgGQgIAfgRAWQgUAZgiATQgiAVgqARQg2AWgkAAQgSAAgNgGg");
	this.shape_12.setTransform(-8.5089,-56.7476,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3000).to({_off:true},1).wait(20));

	// Layer_20
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("AAAD0Qg3gZg3g6Qhvh1gEimIATgeQAZgiAjgXQBvhICgBLQBRAmAQBlQAMBHgXB+QgPBVhkAXQggAHgjAAg");
	this.shape_13.setTransform(2.7908,-87.2455,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3000).to({_off:true},1).wait(20));

	// Layer_21
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#292929").s().p("AhVDWQAWglALgaQAahEALg0QAPhCgGg4QgFgtgTglQgTgmgcgTIgagxQAogHAxAQQA0ASAYAhQANARARAiQAMAbgDAHQgEALAHAcQADAKgCAZIgNBdIgDAXQgCAOgDAIIgVA3QgHARgXAbQgnAsgaATQgRANg4AdQAHgwANgUg");
	this.shape_14.setTransform(31.4639,-78.3575,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3000).to({_off:true},1).wait(20));

	// Layer_22
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#292929").s().p("AgbDXQgjhLAlhVQATgqAIguQAThegtgcQgUADgVAKQgqATgCAhIgThwIAegaQAlgcAjgLQBsgiAmCdIAFAgQAEAnAAAkQgBB0g2AwQgWATgSAcQgjA3APAtQgYgVgRgmg");
	this.shape_15.setTransform(55.849,-71.8516,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3000).to({_off:true},1).wait(20));

	// Layer_23
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#DEDEDD").s().p("AhkAPIgDgRQAygjBTADQAqABAgAJQgLAbhLATIhHANQgmgBgJgTg");
	this.shape_16.setTransform(-60.8948,-97.5603,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3000).to({_off:true},1).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.7,-149.7,163.4,149.7);


(lib.uio89ty8yt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_42
	this.instance = new lib.uoit79t7979("synched",0);
	this.instance.setTransform(34.7,-67.85,1,1,0,0,0,18.7,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({startPosition:0},0).to({regX:18.8,rotation:-1.9509,x:28.55,y:-69.65},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({regX:18.7,rotation:0,x:34.7,y:-67.85},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({regX:18.8,regY:4.1,rotation:-1.4838,x:29.8,y:-68.75},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:18.7,regY:4.2,rotation:0,x:34.7,y:-67.85},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({regX:18.8,regY:4.1,rotation:5.4901,x:25.85,y:-71.95},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({regX:18.7,regY:4.2,rotation:0,x:34.7,y:-67.85},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({regX:18.8,rotation:-1.9509,x:27.9,y:-68.8},8).wait(31).to({startPosition:0},0).to({regX:18.7,rotation:0,x:34.7,y:-67.85},10).wait(802).to({startPosition:0},0).to({regY:4,rotation:-0.9932,x:17.85,y:-71.4},12).wait(39).to({startPosition:0},0).to({rotation:-2.4557,x:20.45,y:-70.9},10).wait(94).to({startPosition:0},0).to({regX:18.8,rotation:-5.4235,x:26.85,y:-69.7},11).wait(85).to({startPosition:0},0).to({regX:18.7,regY:4.2,rotation:0,x:34.7,y:-67.85},9).wait(384).to({startPosition:0},0).to({regX:18.8,regY:4.1,rotation:6.0245,x:28.6,y:-70.15},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({regX:18.9,rotation:4.0373,x:34.75,y:-68.9},10).wait(56).to({startPosition:0},0).to({regX:18.7,regY:4.2,rotation:0,x:34.7,y:-67.85},9).wait(442));

	// Layer_35
	this.instance_1 = new lib.oy8y89y79("synched",0);
	this.instance_1.setTransform(70.25,49.65,1,1,0,0,0,-6.5,9.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20).to({startPosition:0},0).to({rotation:-1.9509,x:68,y:46.55},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({rotation:0,x:70.25,y:49.65},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({regX:-6.4,rotation:-1.4838,x:68.4,y:47.8},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:-6.5,rotation:0,x:70.25,y:49.65},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({regX:-6.4,rotation:5.4901,x:50,y:48.4},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({regX:-6.5,rotation:0,x:70.25,y:49.65},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({rotation:-1.9509,x:67.35,y:47.4},8).wait(31).to({startPosition:0},0).to({rotation:0,x:70.25,y:49.65},10).wait(802).to({startPosition:0},0).to({regY:9.9,rotation:5.2275,x:55.95,y:45.9},12).wait(39).to({startPosition:0},0).to({regX:-6.4,regY:9.8,rotation:3.7631,x:61.55,y:45.35},10).wait(94).to({startPosition:0},0).to({rotation:0.7939,x:73.8,y:44.15},11).wait(85).to({rotation:0.7939},0).to({regX:-6.5,rotation:0,x:70.25,y:49.65},9).wait(384).to({startPosition:0},0).to({regX:-6.4,rotation:17.2687,x:51,y:50.35},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({regX:-6.2,rotation:7.548,x:60.8,y:50.3},10).wait(56).to({startPosition:0},0).to({regX:-6.5,rotation:0,x:70.25,y:49.65},9).wait(442));

	// Layer_34
	this.instance_2 = new lib.uoy89y8998("synched",0);
	this.instance_2.setTransform(-46.6,108.95,1,1,0,0,0,-11.9,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({startPosition:0},8).wait(31).to({startPosition:0},0).to({startPosition:0},10).wait(802).to({startPosition:0},0).to({startPosition:0},12).wait(39).to({startPosition:0},0).to({startPosition:0},10).wait(94).to({startPosition:0},0).to({startPosition:0},11).wait(85).to({startPosition:0},0).to({startPosition:0},9).wait(384).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({startPosition:0},10).wait(56).to({startPosition:0},0).to({startPosition:0},9).wait(442));

	// Layer_9
	this.instance_3 = new lib.yilt78lt78l("synched",0);
	this.instance_3.setTransform(12.85,-100.65,1,1,0,0,0,5.9,-13.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20).to({startPosition:20},0).to({regX:6,regY:-14.1,rotation:-2.2667,x:5.6,y:-101.85,startPosition:31},11,cjs.Ease.quadInOut).wait(71).to({startPosition:102},0).to({regX:5.9,regY:-13.9,rotation:0,x:12.85,y:-100.65,startPosition:111},9,cjs.Ease.quadInOut).wait(40).to({startPosition:151},0).to({regX:6,rotation:0.7536,x:7.15,y:-100.9,startPosition:163},12,cjs.Ease.quadInOut).wait(17).to({startPosition:180},0).to({regX:5.9,rotation:0,x:12.85,y:-100.65,startPosition:191},11,cjs.Ease.quadInOut).wait(535).to({startPosition:726},0).to({regY:-14,rotation:0.209,x:-0.6,y:-101.95,startPosition:736},10,cjs.Ease.quadInOut).wait(38).to({startPosition:774},0).to({regY:-13.9,rotation:0,x:12.85,y:-100.65,startPosition:786},12,cjs.Ease.quadInOut).wait(111).to({startPosition:897},0).to({regY:-14,rotation:2.7445,x:4.9,y:-100.9,startPosition:905},8).wait(31).to({startPosition:936},0).to({regY:-13.9,rotation:0,x:12.85,y:-100.65,startPosition:946},10).wait(802).to({startPosition:1748},0).to({rotation:-6.7177,x:-7.25,y:-101.05,startPosition:1760},12).wait(39).to({startPosition:1799},0).to({regX:5.8,regY:-14,rotation:-8.894,x:-4.1,y:-101.1,startPosition:1809},10).wait(94).to({startPosition:1903},0).to({regX:5.9,regY:-14.1,scaleX:0.9999,scaleY:0.9999,rotation:-9.6587,x:3.65,y:-100.85,startPosition:1914},11).wait(85).to({startPosition:1999},0).to({regY:-13.9,scaleX:1,scaleY:1,rotation:0,x:12.85,y:-100.65,startPosition:2008},9).wait(384).to({startPosition:2392},0).to({regY:-14,rotation:0.7711,x:5.25,y:-101.3,startPosition:2401},9,cjs.Ease.quadInOut).wait(83).to({startPosition:2484},0).to({regX:6,regY:-14.1,rotation:-0.9775,x:12.2,y:-100.85,startPosition:2494},10).wait(56).to({rotation:-0.9775,startPosition:2550},0).to({regX:5.9,regY:-13.9,rotation:0,x:12.85,y:-100.65,startPosition:2559},9).wait(442));

	// Layer_31
	this.instance_4 = new lib.uoy79y98y7("synched",0);
	this.instance_4.setTransform(24.05,102.15,1,1,0,0,0,-6.4,-12.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(20).to({startPosition:0},0).to({regX:-6.3,regY:-12.3,rotation:-1.9509,x:23.7,y:100.75},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({regX:-6.4,regY:-12.5,rotation:0,x:24.05,y:102.15},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({regY:-12.4,rotation:5.4901,x:-1.05,y:96.35},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({regY:-12.5,rotation:0,x:24.05,y:102.15},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({regX:-6.3,regY:-12.3,rotation:-1.9509,x:23.05,y:101.6},8).wait(31).to({startPosition:0},0).to({regX:-6.4,regY:-12.5,rotation:0,x:24.05,y:102.15},10).wait(802).to({startPosition:0},0).to({regX:-6.2,regY:-12.4,rotation:5.2275,x:5.35,y:94},12).wait(39).to({startPosition:0},0).to({regY:-12.3,rotation:3.7631,x:12.1,y:94.85},10).wait(94).to({startPosition:0},0).to({regX:-6,rotation:0.7939,x:27.15,y:96.15},11).wait(85).to({rotation:0.7939},0).to({regX:-6.4,regY:-12.5,rotation:0,x:24.05,y:102.15},9).wait(384).to({startPosition:0},0).to({regX:-6.3,regY:-12.3,rotation:17.2687,x:-8.75,y:86.95},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({rotation:7.548,x:7.95,y:96.4},10).wait(56).to({startPosition:0},0).to({regX:-6.4,regY:-12.5,rotation:0,x:24.05,y:102.15},9).wait(442));

	// Layer_32
	this.instance_5 = new lib.uiy7998y8y9("synched",0);
	this.instance_5.setTransform(20.1,101.6,1,1,0,0,0,6,-2.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(20).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({startPosition:0},8).wait(31).to({startPosition:0},0).to({startPosition:0},10).wait(802).to({startPosition:0},0).to({startPosition:0},12).wait(39).to({startPosition:0},0).to({startPosition:0},10).wait(94).to({startPosition:0},0).to({startPosition:0},11).wait(85).to({startPosition:0},0).to({startPosition:0},9).wait(384).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({startPosition:0},10).wait(56).to({startPosition:0},0).to({startPosition:0},9).wait(442));

	// Layer_33
	this.instance_6 = new lib.ult78lt78l78l("synched",0);
	this.instance_6.setTransform(-15.1,101.45,1,1,0,0,0,-11,76.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(20).to({startPosition:0},0).to({regX:-11.1,rotation:-1.9509,x:-15.6,y:101.25},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({regX:-11,rotation:0,x:-15.1,y:101.45},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({regX:-11.1,regY:76.3,rotation:-1.4838,x:-15.7,y:101.9},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:-11,regY:76.2,rotation:0,x:-15.1,y:101.45},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({rotation:-3.4817,x:-16.3,y:101.55},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({rotation:0,x:-15.1,y:101.45},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({regX:-11.1,rotation:-1.9509,x:-16.25,y:102.1},8).wait(31).to({startPosition:0},0).to({regX:-11,rotation:0,x:-15.1,y:101.45},10).wait(802).to({startPosition:0},0).to({regX:-11.1,rotation:-4.9852,x:-17.6,y:102.7},12).wait(39).to({startPosition:0},0).to({regX:-11.2,rotation:-4.2099,x:-17.2,y:102.5},10).wait(94).to({startPosition:0},0).to({rotation:-2.2334,x:-16.5,y:102.25},11).wait(85).to({startPosition:0},0).to({regX:-11,rotation:0,x:-15.1,y:101.45},9).wait(384).to({startPosition:0},0).to({regX:-11.1,rotation:-1.9509,x:-15.9,y:101.7},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({regX:-11.2,regY:76.3,rotation:-0.2465,x:-15,y:101.55},10).wait(56).to({rotation:-0.2465},0).to({regX:-11,regY:76.2,rotation:0,x:-15.1,y:101.45},9).wait(442));

	// Layer_2
	this.instance_7 = new lib.uio8y9y89y89("synched",0);
	this.instance_7.setTransform(-43.75,-65.35,1,1,0,0,0,11,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20).to({startPosition:0},0).to({rotation:-1.9509,x:-49.8,y:-64.4},11,cjs.Ease.quadInOut).wait(71).to({startPosition:0},0).to({rotation:0,x:-43.75,y:-65.35},9,cjs.Ease.quadInOut).wait(40).to({startPosition:0},0).to({regX:10.9,rotation:-1.4838,x:-48.7,y:-64.15},12,cjs.Ease.quadInOut).wait(17).to({startPosition:0},0).to({regX:11,rotation:0,x:-43.75,y:-65.35},11,cjs.Ease.quadInOut).wait(535).to({startPosition:0},0).to({rotation:-3.4817,x:-55,y:-63.1},10,cjs.Ease.quadInOut).wait(38).to({startPosition:0},0).to({rotation:0,x:-43.75,y:-65.35},12,cjs.Ease.quadInOut).wait(111).to({startPosition:0},0).to({rotation:-1.9509,x:-50.45,y:-63.55},8).wait(31).to({startPosition:0},0).to({rotation:0,x:-43.75,y:-65.35},10).wait(802).to({startPosition:0},0).to({regX:10.9,rotation:-4.9852,x:-60.65,y:-60.95},12).wait(39).to({startPosition:0},0).to({regX:10.8,rotation:-4.2099,x:-58.1,y:-61.65},10).wait(94).to({startPosition:0},0).to({rotation:-2.2334,x:-51.65,y:-63.2},11).wait(85).to({startPosition:0},0).to({regX:11,rotation:0,x:-43.75,y:-65.35},9).wait(384).to({startPosition:0},0).to({rotation:-1.9509,x:-50.1,y:-63.95},9,cjs.Ease.quadInOut).wait(83).to({startPosition:0},0).to({regX:10.9,rotation:-0.2465,x:-44.3,y:-65.1},10).wait(56).to({rotation:-0.2465},0).to({regX:11,rotation:0,x:-43.75,y:-65.35},9).wait(442));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-237.7,192.7,474.1);


(lib.uilglt78lt78l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.gjkfujyulicopy("single",0);
	this.instance.setTransform(10.15,-21.05,0.6471,0.6471,0,-9.6673,170.3327,18.8,-4.8);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(115).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(58).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(12).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(76).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(69).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(5).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2);
	var _tweenStr_1 = _tweenStr_0.to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(13).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(12).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({regX:0,regY:0,x:22.65,y:-20.05,startPosition:1},0).wait(2).to({startPosition:5},0).wait(5).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(4).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(271).to({regX:18.8,regY:-4.8,x:10.15,y:-21.05,startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(20).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(19).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(188).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2);
	this.timeline.addTween(_tweenStr_1.to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(112));

	// Layer_2
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(11.75,-52.65,0.6991,0.6991,0,-9.5135,170.4865,13.8,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3009));

	// Layer_39
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE9F7E").s().p("AgMACQgDgbAZAGQgRAFABAPQACAQASgBQgIAFgGAAQgKAAgCgTg");
	this.shape.setTransform(20.084,-40.612,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3009));

	// Layer_40
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BE9F7E").s().p("AgJATQASgEgCgPQgCgPgSgCQAYgLADAcQACAVgPAAQgEAAgGgCg");
	this.shape_1.setTransform(29.2951,-41.4112,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3009));

	// Layer_41
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgTBsIgYhAQgDgSAEgiQADgUAFgHQAEgGAHgGIAdgZIAJgJIAEgJQAIgPAQgCIgBABQAHALgFAOQgFAOgNAEQAGAJgEAMQgFALgKAEQADANgBAGQgDALgKABQABAFgDAGIgEALQgBAFAAAKQAAAKgHADQAMARgKAcQgDAJgGAAIAAAAg");
	this.shape_2.setTransform(-17.9879,-69.0426,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3009));

	// Layer_42
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AiuBRQgYgZAMg6QAFgaAJgLQAFgHAMgHIAcgTQARgLALgCQALgCAVAFQAWAGAJgBQAIAAANgEQAOgDAFgBQAMgBAJAGQAKAFABAKQAJgMARgBQARgCAKAMQAHgIALgDQAKgEALADQACgHAIgCQAHgDAHACQAJADAMAPIAHABQAJAFABALQACAKgEAKQgGAMgWARQgOAJgGABQgGACgGgCQgGgCgCgEQgCARgMAJQgGAFgJAAQgIAAgGgFQgBAFgGACQgFACgFgDQgGgDgIgMQgIAJgOgDQgNgDgEgMQgFAHgIACQgJABgHgFQgGgEgDAAQgDgBgGAFQgKAGgMgBQgLgBgJgIQAAAHgGADQgHAEgFgEQAEAGgGAIQgHAIgHgEQAIAKgGAOQgEANgMAKQgIAHgIACIgGABQgLAAgLgLg");
	this.shape_3.setTransform(8.8547,-96.0873,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3009));

	// Layer_43
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AjQDrQgIgEgEgJQgEgIAAgKIABgHQAAgEgCgCIgEgFIgFgFQgDgEADgKQADgLgCgFIgFgIQgKgPAJgiQgJgEgDgMQgDgKACgMIADgVQACgNgDgJIgFgOQgDgIADgFQAHgGABgEQABgEgDgHQgHgTAIgTQAIgUARgFQgGgTALgQQAFgGAJgDQAIgDAIACQgBgOALgLQALgJAOgBQASgBAFgEQACgCAFgHQAEgFAJgFQARgKAJgDQAPgGAOABIAIABIAKgFQARgNAVACQAXABARAPQACgKAKgEQAJgDAKAEQAIAEAHAJIAMARQAOgGAPALQAPAMAAARQAJgHAMAAQAMgBAKAHQAKAGAHAMQAGAMAAAMQAMgCAMAGQAMAGAHALQAGAMAAAOQgBAPgHAKQACASgOANQgNANgQgGIAAgBQgEgFgLgBQgiABgRgBQgegCgQgQIgQgSQgSgTgfgCQgVgCgiAGQgkAHgTAHQgdALgRAUQgNAPgMAfQgnBigIBvQgBANgGABIgFgCg");
	this.shape_4.setTransform(-3.9937,-97.6596,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3009));

	// Layer_44
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BE9F7E").s().p("AASASQgFgOgLgLQgLgSgQgRQAKAAARATQAXAZABApIgIgZg");
	this.shape_5.setTransform(-29.9323,-43.8977,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3009));

	// Layer_45
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B188").s().p("AgZANQgjhIAmgHQAOgDAOALQAPAMACATQABAOAGgBQADAAADgDIAGBHQgGANgLABIgCAAQgXAAgZg3g");
	this.shape_6.setTransform(-28.0604,-43.2503,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3009));

	// Layer_48
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("Ag3AXQADgJAHgKQAOgTAYgGQAYgFAWALQALAFAGAGQgwgMgeAUQgIAFgLAJQgGAGgFAAIgDgBg");
	this.shape_7.setTransform(39.414,-73.6837,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3009));

	// Layer_49
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("Ag8AEQAVgTAigFQAfgGAdANQAOAHAHAHQgGAEgOgDQgSgDgNgCQgwgGg0AgQAEgJALgKg");
	this.shape_8.setTransform(-2.9837,-68.5086,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3009));

	// Layer_50
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B188").s().p("AgdD8IhEgbQg5ghgThBIABgWIgJhIQABguACgXQAEgpASgYQAYgfABgUQAAgNgKgZQgMgbAbgVQAfgZA2AcQBKApA8gfQAegPAPgYQAeA+AJArQAMA2gRAlQgOAgAIAkQAOA5AAANQAAAsggA9QghA+gnAVQgOAHgVAAQgdAAgpgNg");
	this.shape_9.setTransform(14.2619,-52.9735,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3009));

	// Layer_51
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AhYD2QhtgVgRhSQgdiMAGg/QAJhwBdgvQCMhICDBWQBCArAlA6QADCghwBxQg4A5g5AYQgSADgTAAQghAAgjgHg");
	this.shape_10.setTransform(-4.9634,-85.0219,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3009));

	// Layer_52
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BDBA88").s().p("AgpBsQgLgpgbhDQgghOgJgeQgCgFABgDQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIADADQAUgMAZAKQAYAKAHAWQAUgIATANQAVAMACAVQANgEANADQANADALAIQAKAIAGAMQAGAMgBAMQAJgBAIAIQAIAHgBAJQgBAKgJAGQgIAGgJgCQAEANgLALQgLAMgOgEQgCAQgIAHQgFAFgHgBQgIAAgDgGQgKAPghAAIgDAAQgWAAgDgMg");
	this.shape_11.setTransform(31.0356,-119.3901,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3009));

	// Layer_53
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AimB+IgGgEIgHgDQgEgBgKADQgMADgMgDQgMgEgKgJQgUgVAEgbQACgLAFgLQALgSAdgUQgEgEACgHQACgHAFgDIAKgFQAIgDADgCQADgDADgGIAFgJQAEgEAFgCQAFgCAEADQgDgIAGgHQAGgIAIACIAGADIAGABQAFAAAFgFIAJgIQAEgCAOgCQALgBAEgGIAFgJQAFgFAMAFQAOAGAFgDIAJgIQAHgGAKACQAIACAGAIQABgMALgIQAKgHAMACQAUADASAZQAQgHASAOQAMAKALAWQAJgJAOAEQAOAFAEANQAWAHAOAVQAPAUAAAZQAIgEAHAGQAIAFADAJQADAMgHAQIACACIgFADIADgFQgNgIgcAKQgcAJg5ALQgQADgKAAQgPABgLgFQgNgFgDAAQgDAAgEACIgIAEQgOAHgPgCIgWgCQgIABgNAJQgOAKgGADQgJADgQgBIgbAAIghAIQgJACgHAAQgJAAgHgDg");
	this.shape_12.setTransform(1.4093,-129.8689,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3009));

	// Layer_54
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AANA9QgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgPAEgJgDQgGgCgEgFQgEgGAAgGQgDAEgFABQgFAAgEgCQgGgDgGgMQgHgMAFgFQgDAAgCgDQgCgDgBgEQgCgTANgSQAMgSAUgFQAJgCATABQAKAAAFACIAHAEIAIACIAHABQAGABAFAEIABACQALAFACAJQABAGgDAFQgDAFgGAAQAKAHAAANQAAAOgLAGQAFAMgGAHQgDAEgGABQgFAAgDgEQgGAJgGAFQgEADgEAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_13.setTransform(42.1613,-104.6218,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3009));

	// Layer_55
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AAVBmQgJABgIgGQgHgGgDgKQgKACgIgIQgJgHgBgLQgVgBgJgKQgGgGAAgKQAAgKAHgEQgQgQgEgMQgCgJACgJQACgKAHgEQgNgLACgTQABgUAOgHIgDgBQACgPAagFQASgEAKAFQALAGADAMQAEgGAJACQAJACAFAHQAHALABAYQAHgCAHAEQAGADAFAHQAGAKAEAUIAQBGQAGAZgDALQgCAJgMAQIgXAMQgFADgDAAIgBAAQgLAAgIgXg");
	this.shape_14.setTransform(-33.5922,-45.7731,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3009));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-155.7,111.1,155.7);


(lib.jiyu9y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ilt68lt867l("synched",0);
	this.instance.setTransform(-62.25,15.35,1,1,0,0,0,-17.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(113).to({startPosition:0},0).to({rotation:-0.7668,x:-56.05,y:14.4},8).wait(20).to({startPosition:0},0).to({rotation:0,x:-62.25,y:15.35},10).wait(46).to({startPosition:0},0).to({rotation:1.2311,x:-50.15,y:14.15},12).wait(110).to({startPosition:0},0).to({regY:0.3,x:-56.45,y:15.1},14).wait(121).to({startPosition:0},0).to({regY:0.4,scaleX:0.9999,scaleY:0.9999,rotation:3.97,x:-63.1,y:15.9},12).wait(78).to({startPosition:0},0).to({regX:-17.3,rotation:2.4165,x:-54.45,y:14.85},12,cjs.Ease.quadInOut).wait(107).to({startPosition:0},0).to({regX:-17.4,rotation:5.3457,x:-50.1,y:14.55},13,cjs.Ease.quadInOut).wait(37).to({startPosition:0},0).to({regX:-17.2,regY:0.2,scaleX:1,scaleY:1,rotation:0,x:-62.25,y:15.35},12,cjs.Ease.quadInOut).wait(66).to({startPosition:0},0).to({regY:0.3,rotation:4.1652,x:-54.35,y:14.5},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regY:0.2,rotation:0,x:-62.25,y:15.35},11,cjs.Ease.quadInOut).wait(60).to({startPosition:0},0).to({rotation:1.7234,x:-59.65,y:14.85},8).wait(85).to({startPosition:0},0).to({regY:0.4,rotation:3.9514,x:-67.65,y:17.3},10).wait(121).to({rotation:3.9514},0).to({rotation:5.6844,x:-61.4,y:16.35},10).wait(210).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:4.5003,x:-66,y:17.15},11).wait(214).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:6.4758,x:-58.5,y:15.35},10,cjs.Ease.quadInOut).wait(100).to({startPosition:0},0).to({regY:0.2,rotation:0,x:-62.25},10).wait(272).to({startPosition:0},0).to({rotation:3.4633,x:-57.7,y:14.95},8).wait(134).to({startPosition:0},0).to({regY:0.4,rotation:4.7414,x:-64.35,y:16.15},9).wait(74).to({startPosition:0},0).to({regX:-17.3,regY:0.5,rotation:9.149,x:-58.2,y:15.55},9).wait(75).to({startPosition:0},0).to({regX:-17.4,scaleX:0.9999,scaleY:0.9999,rotation:4.3864,x:-63.15,y:16.55},9).wait(40).to({startPosition:0},0).to({regX:-17.2,regY:0.2,scaleX:1,scaleY:1,rotation:0,x:-62.25,y:15.35},8).wait(185).to({startPosition:0},0).to({rotation:3.4081,x:-56.05,y:14.75},9,cjs.Ease.quadInOut).wait(191).to({startPosition:0},0).to({regX:-17.3,regY:0.4,rotation:4.6124,x:-60.8,y:15.8},12,cjs.Ease.quadInOut).wait(62).to({startPosition:0},0).to({regY:0.5,rotation:-1.0728,x:-66.4,y:17.05},10).wait(43).to({startPosition:0},0).to({regX:-17.2,regY:0.2,rotation:0,x:-62.25,y:15.35},9).wait(122).to({startPosition:0},0).to({_off:true},1).wait(43));

	// _Clip_Group__2
	this.instance_1 = new lib.uilglt78lt78l("synched",0);
	this.instance_1.setTransform(-40.55,-12.1,1,1,0,0,0,-8.9,-12.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(113).to({startPosition:113},0).to({regX:-9,regY:-12.2,rotation:4.4449,x:-33.6,y:-12.5,startPosition:121},8).wait(20).to({startPosition:141},0).to({regX:-8.9,regY:-12.1,rotation:0,x:-40.55,y:-12.1,startPosition:151},10).wait(46).to({startPosition:197},0).to({regX:-9.1,regY:-12.2,rotation:-0.5491,x:-27.1,y:-12.15,startPosition:209},12).wait(110).to({startPosition:319},0).to({regX:-9.2,rotation:0.4511,x:-34.3,y:-11.95,startPosition:333},14).wait(121).to({rotation:0.4511,startPosition:454},0).to({regY:-12.1,rotation:4.2215,x:-41.7,y:-11.9,startPosition:466},12).wait(78).to({startPosition:544},0).to({scaleX:0.9999,scaleY:0.9999,rotation:5.2217,x:-31.85,y:-12.05,startPosition:556},12,cjs.Ease.quadInOut).wait(107).to({startPosition:663},0).to({rotation:4.7426,x:-26.9,y:-11.95,startPosition:676},13,cjs.Ease.quadInOut).wait(37).to({startPosition:713},0).to({regX:-8.9,scaleX:1,scaleY:1,rotation:0,x:-40.55,y:-12.1,startPosition:725},12,cjs.Ease.quadInOut).wait(66).to({startPosition:791},0).to({regX:-9,rotation:0.7309,x:-31.7,y:-12.2,startPosition:800},9,cjs.Ease.quadInOut).wait(81).to({startPosition:881},0).to({regX:-8.9,rotation:0,x:-40.55,y:-12.1,startPosition:892},11,cjs.Ease.quadInOut).wait(60).to({startPosition:952},0).to({regX:-9,regY:-12.2,rotation:-1.6963,x:-37.65,y:-12.35,startPosition:960},8).wait(85).to({startPosition:1045},0).to({rotation:2.3026,x:-46.7,y:-10.9,startPosition:1055},10).wait(121).to({startPosition:1176},0).to({regY:-12.1,rotation:6.2724,x:-39.65,y:-11.25,startPosition:1186},10).wait(210).to({startPosition:1396},0).to({regX:-9.1,rotation:2.1189,x:-44.9,y:-10.9,startPosition:1407},11).wait(214).to({startPosition:1621},0).to({scaleX:0.9999,scaleY:0.9999,rotation:1.902,x:-36.5,y:-12.05,startPosition:1631},10,cjs.Ease.quadInOut).wait(100).to({startPosition:1731},0).to({regX:-8.9,scaleX:1,scaleY:1,rotation:0,x:-40.55,y:-12.1,startPosition:1741},10).wait(272).to({startPosition:2013},0).to({regX:-9,rotation:-0.2238,x:-35.5,y:-12.05,startPosition:2021},8).wait(134).to({startPosition:2155},0).to({regX:-9.1,regY:-12,rotation:1.7891,x:-43,y:-11.75,startPosition:2164},9).wait(74).to({rotation:1.7891,startPosition:2238},0).to({rotation:1.0413,x:-35.9,y:-11.8,startPosition:2247},9).wait(75).to({startPosition:2322},0).to({regX:-9.2,rotation:3.2279,x:-41.45,y:-11.35,startPosition:2331},9).wait(40).to({startPosition:2371},0).to({regX:-8.9,regY:-12.1,rotation:0,x:-40.55,y:-12.1,startPosition:2379},8).wait(185).to({startPosition:2564},0).to({regX:-9,rotation:0.4782,x:-33.7,y:-12.15,startPosition:2573},9,cjs.Ease.quadInOut).wait(191).to({startPosition:2764},0).to({regX:-9.1,rotation:2.44,x:-39,y:-11.85,startPosition:2776},12,cjs.Ease.quadInOut).wait(62).to({startPosition:2838},0).to({regX:-9.2,regY:-12,scaleX:0.9999,scaleY:0.9999,rotation:3.6939,x:-45.45,y:-11.1,startPosition:2848},10).wait(43).to({startPosition:2891},0).to({regX:-8.9,regY:-12.1,scaleX:1,scaleY:1,rotation:0,x:-40.55,y:-12.1,startPosition:2900},9).wait(122).to({startPosition:13},0).to({_off:true},1).wait(43));

	// Layer_2
	this.instance_2 = new lib.yukr6k6r7k6r7kr67k("synched",0);
	this.instance_2.setTransform(-13.2,207.45,1,1,0,0,0,14.4,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(113).to({startPosition:0},0).to({startPosition:0},8).wait(20).to({startPosition:0},0).to({startPosition:0},10).wait(46).to({startPosition:0},0).to({startPosition:0},12).wait(110).to({startPosition:0},0).to({startPosition:0},14).wait(121).to({startPosition:0},0).to({startPosition:0},12).wait(78).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(107).to({startPosition:0},0).to({startPosition:0},13,cjs.Ease.quadInOut).wait(37).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(66).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(60).to({startPosition:0},0).to({startPosition:0},8).wait(85).to({startPosition:0},0).to({startPosition:0},10).wait(121).to({startPosition:0},0).to({startPosition:0},10).wait(210).to({startPosition:0},0).to({startPosition:0},11).wait(214).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(100).to({startPosition:0},0).to({startPosition:0},10).wait(272).to({startPosition:0},0).to({startPosition:0},8).wait(134).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},9).wait(75).to({startPosition:0},0).to({startPosition:0},9).wait(40).to({startPosition:0},0).to({startPosition:0},8).wait(185).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(191).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(62).to({startPosition:0},0).to({startPosition:0},10).wait(43).to({startPosition:0},0).to({startPosition:0},9).wait(122).to({startPosition:0},0).to({_off:true},1).wait(43));

	// Layer_3
	this.instance_3 = new lib.uilt78lt78lt78lt78l("synched",0);
	this.instance_3.setTransform(37.6,199.5,1,1,0,0,0,16.4,5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(113).to({startPosition:0},0).to({startPosition:0},8).wait(20).to({startPosition:0},0).to({startPosition:0},10).wait(46).to({startPosition:0},0).to({startPosition:0},12).wait(110).to({startPosition:0},0).to({startPosition:0},14).wait(121).to({startPosition:0},0).to({startPosition:0},12).wait(78).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(107).to({startPosition:0},0).to({startPosition:0},13,cjs.Ease.quadInOut).wait(37).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(66).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({startPosition:0},11,cjs.Ease.quadInOut).wait(60).to({startPosition:0},0).to({startPosition:0},8).wait(85).to({startPosition:0},0).to({startPosition:0},10).wait(121).to({startPosition:0},0).to({startPosition:0},10).wait(210).to({startPosition:0},0).to({startPosition:0},11).wait(214).to({startPosition:0},0).to({startPosition:0},10,cjs.Ease.quadInOut).wait(100).to({startPosition:0},0).to({startPosition:0},10).wait(272).to({startPosition:0},0).to({startPosition:0},8).wait(134).to({startPosition:0},0).to({startPosition:0},9).wait(74).to({startPosition:0},0).to({startPosition:0},9).wait(75).to({startPosition:0},0).to({startPosition:0},9).wait(40).to({startPosition:0},0).to({startPosition:0},8).wait(185).to({startPosition:0},0).to({startPosition:0},9,cjs.Ease.quadInOut).wait(191).to({startPosition:0},0).to({startPosition:0},12,cjs.Ease.quadInOut).wait(62).to({startPosition:0},0).to({startPosition:0},10).wait(43).to({startPosition:0},0).to({startPosition:0},9).wait(122).to({startPosition:0},0).to({_off:true},1).wait(43));

	// Layer_4
	this.instance_4 = new lib.ghjktfdykjdtyjjrjdrj("synched",0);
	this.instance_4.setTransform(-19.4,220,1,1,0,0,0,1.4,89.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(113).to({startPosition:0},0).to({regX:1.3,rotation:1.7042,y:220.2},8).wait(20).to({startPosition:0},0).to({regX:1.4,rotation:0,y:220},10).wait(46).to({startPosition:0},0).to({regX:1.3,rotation:3.1823,x:-18.8,y:220.8},12).wait(110).to({startPosition:0},0).to({regX:1.2,regY:89.2,rotation:1.4777,x:-19.05,y:220.75},14).wait(121).to({startPosition:0},0).to({rotation:-0.2264,x:-19.55,y:220.25},12).wait(78).to({rotation:-0.2264},0).to({rotation:2.2248,y:220.9},12,cjs.Ease.quadInOut).wait(107).to({startPosition:0},0).to({rotation:3.4503,y:221.2},13,cjs.Ease.quadInOut).wait(37).to({startPosition:0},0).to({regX:1.4,regY:89.1,rotation:0,x:-19.4,y:220},12,cjs.Ease.quadInOut).wait(66).to({startPosition:0},0).to({regX:1.3,regY:89.2,rotation:2.2151,x:-19.55,y:220.65},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regX:1.4,regY:89.1,rotation:0,x:-19.4,y:220},11,cjs.Ease.quadInOut).wait(60).to({startPosition:0},0).to({regY:89.2,rotation:0.7746,x:-19.55,y:220.2},8).wait(85).to({startPosition:0},0).to({regX:1.3,rotation:-1.4628,x:-19.6,y:220.75},10).wait(121).to({startPosition:0},0).to({regX:1.2,rotation:0.2702,x:-19.65,y:221.15},10).wait(210).to({startPosition:0},0).to({rotation:-0.9137,x:-20.05,y:221.05},11).wait(214).to({startPosition:0},0).to({rotation:1.0623,x:-19.6,y:220.65},10,cjs.Ease.quadInOut).wait(100).to({startPosition:0},0).to({regX:1.4,regY:89.1,rotation:0,x:-19.4,y:220},10).wait(272).to({startPosition:0},0).to({regX:1.3,regY:89.2,rotation:1.2258,x:-19.3,y:220.6},8).wait(134).to({startPosition:0},0).to({regX:1.2,rotation:-0.5071,x:-19.75,y:220.3},9).wait(74).to({rotation:-0.5071},0).to({rotation:1.197,x:-19.55,y:220.85},9).wait(75).to({startPosition:0},0).to({rotation:-0.0691,x:-19.95,y:220.9},9).wait(40).to({rotation:-0.0691},0).to({regX:1.4,regY:89.1,rotation:0,x:-19.4,y:220},8).wait(185).to({startPosition:0},0).to({regX:1.3,rotation:1.7042,x:-19.45,y:220.55},9,cjs.Ease.quadInOut).wait(191).to({startPosition:0},0).to({regX:1.2,regY:89.2,rotation:0.438,x:-19.6,y:220.65},12,cjs.Ease.quadInOut).wait(62).to({rotation:0.438},0).to({rotation:-1.0116,x:-20.05,y:220.8},10).wait(43).to({startPosition:0},0).to({regX:1.4,regY:89.1,rotation:0,x:-19.4,y:220},9).wait(122).to({startPosition:0},0).to({_off:true},1).wait(43));

	// Layer_53
	this.instance_5 = new lib.yuk67k67k("synched",0);
	this.instance_5.setTransform(11.65,13.1,1,1,0,0,0,16.9,3.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(113).to({startPosition:0},0).to({regX:17,regY:3.4,rotation:2.9292,x:18,y:14.4},8).wait(20).to({startPosition:0},0).to({regX:16.9,regY:3.3,rotation:0,x:11.65,y:13.1},10).wait(46).to({startPosition:0},0).to({regX:17.1,regY:3.5,rotation:5.6748,x:23.85,y:16.15},12).wait(110).to({startPosition:0},0).to({regX:17.2,rotation:2.0183,x:17.7,y:14.8},14).wait(121).to({startPosition:0},0).to({regY:3.6,scaleX:0.9999,scaleY:0.9999,rotation:-2.427,x:11.1,y:13.35},12).wait(78).to({rotation:-2.427},0).to({rotation:1.7271,x:19.85,y:15.5},12,cjs.Ease.quadInOut).wait(107).to({rotation:1.7271},0).to({regY:3.7,rotation:1.0012,x:24.2,y:16.85},13,cjs.Ease.quadInOut).wait(37).to({startPosition:0},0).to({regX:16.9,regY:3.3,scaleX:1,scaleY:1,rotation:0,x:11.65,y:13.1},12,cjs.Ease.quadInOut).wait(66).to({startPosition:0},0).to({regX:17.1,regY:3.4,rotation:0.2133,x:19.7,y:15.05},9,cjs.Ease.quadInOut).wait(81).to({startPosition:0},0).to({regX:16.9,regY:3.3,rotation:0,x:11.65,y:13.1},11,cjs.Ease.quadInOut).wait(60).to({startPosition:0},0).to({regY:3.4,rotation:-9.2214,x:14.35,y:13.7},8).wait(85).to({startPosition:0},0).to({regX:16.8,scaleX:0.9999,scaleY:0.9999,rotation:-13.1914,x:6.3,y:13.1},10).wait(121).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:-5.5088,x:12.65,y:14.45},10).wait(210).to({startPosition:0},0).to({regY:3.5,scaleX:0.9999,scaleY:0.9999,rotation:-2.7,x:8.1,y:13.75},11).wait(214).to({startPosition:0},0).to({rotation:-0.7231,x:15.65,y:14.5},10,cjs.Ease.quadInOut).wait(100).to({rotation:-0.7231},0).to({regX:16.9,regY:3.3,scaleX:1,scaleY:1,rotation:0,x:11.65,y:13.1},10).wait(272).to({startPosition:0},0).to({regY:3.4,rotation:-1.225,x:16.3,y:14.4},8).wait(134).to({startPosition:0},0).to({rotation:-4.9083,x:9.8,y:13.1},9).wait(74).to({startPosition:0},0).to({regY:3.5,scaleX:0.9999,scaleY:0.9999,rotation:-5.6951,x:16.15,y:14.7},9).wait(75).to({startPosition:0},0).to({regX:16.8,regY:3.6,rotation:-5.0102,x:11.15,y:14.2},9).wait(40).to({startPosition:0},0).to({regX:16.9,regY:3.3,scaleX:1,scaleY:1,rotation:0,x:11.65,y:13.1},8).wait(185).to({startPosition:0},0).to({regX:17,regY:3.4,x:17.9,y:14.75},9,cjs.Ease.quadInOut).wait(191).to({startPosition:0},0).to({regX:16.9,rotation:-3.7568,x:13.25,y:14},12,cjs.Ease.quadInOut).wait(62).to({startPosition:0},0).to({regY:3.5,rotation:-3.502,x:7.65,y:13.4},10).wait(43).to({startPosition:0},0).to({regY:3.3,rotation:0,x:11.65,y:13.1},9).wait(122).to({startPosition:0},0).to({_off:true},1).wait(43));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.5,-156.3,252.1,551);


(lib.uy98989 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.uio89ty8yt("synched",0);
	this.instance.setTransform(173,188.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(110).to({scaleX:2.0508,scaleY:2.0508,x:314.2,y:251.85,startPosition:110},0).wait(82).to({scaleX:1,scaleY:1,x:173,y:188.35,startPosition:192},0).wait(699).to({scaleX:1.7705,scaleY:1.7705,x:281.85,y:200.05,startPosition:891},0).wait(60).to({x:393.35,y:203.45,startPosition:951},0).wait(794).to({x:203.35,startPosition:1745},0).wait(265).to({scaleX:1,scaleY:1,x:173,y:188.35,startPosition:2010},0).wait(935).to({startPosition:2945},0).to({_off:true},1).wait(1).to({_off:false,startPosition:2947},0).wait(76));

	// Layer_6
	this.instance_1 = new lib.jiyu9y89("synched",0);
	this.instance_1.setTransform(-54.2,104.25,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(110).to({scaleX:2.0508,scaleY:2.0508,x:-151.65,y:79.35,startPosition:110},0).wait(82).to({scaleX:1,scaleY:1,x:-54.2,y:104.25,startPosition:192},0).wait(699).to({scaleX:1.7705,scaleY:1.7705,x:-120.35,y:51.15,startPosition:891},0).wait(60).to({x:-8.85,y:54.55,startPosition:951},0).wait(794).to({x:-198.85,startPosition:1745},0).wait(265).to({scaleX:1,scaleY:1,x:-54.2,y:104.25,startPosition:2010},0).wait(935).to({startPosition:2945},0).to({_off:true},1).wait(1).to({_off:false,startPosition:2947},0).wait(76));

	// Layer_7
	this.instance_2 = new lib.Bitmap1();
	this.instance_2.setTransform(-720,-809);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(110).to({scaleX:2.0508,scaleY:2.0508,x:-1517,y:-1793},0).wait(82).to({scaleX:1,scaleY:1,x:-720,y:-809},0).wait(699).to({scaleX:1.7705,scaleY:1.7705,x:-1299,y:-1566},0).wait(60).to({x:-1188,y:-1563},0).wait(794).to({x:-1378},0).wait(265).to({scaleX:1,scaleY:1,x:-720,y:-809},0).wait(935).to({_off:true},1).wait(1).to({_off:false},0).wait(76));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1517,-1793,3191,3182.8);


// stage content:
(lib.m1l2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,192,366,692,948,1172,1441,1900,2274,2514,2761,2945];
	this.streamSoundSymbolsList[0] = [{id:"audio1",startFrame:0,endFrame:192,loop:1,offset:0}];
	this.streamSoundSymbolsList[192] = [{id:"audio2",startFrame:192,endFrame:366,loop:1,offset:0}];
	this.streamSoundSymbolsList[366] = [{id:"audio3",startFrame:366,endFrame:692,loop:1,offset:0}];
	this.streamSoundSymbolsList[692] = [{id:"audio4",startFrame:692,endFrame:948,loop:1,offset:0}];
	this.streamSoundSymbolsList[948] = [{id:"audio5",startFrame:948,endFrame:1172,loop:1,offset:0}];
	this.streamSoundSymbolsList[1172] = [{id:"audio6",startFrame:1172,endFrame:1441,loop:1,offset:0}];
	this.streamSoundSymbolsList[1441] = [{id:"audio7",startFrame:1441,endFrame:1900,loop:1,offset:0}];
	this.streamSoundSymbolsList[1900] = [{id:"audio8",startFrame:1900,endFrame:2274,loop:1,offset:0}];
	this.streamSoundSymbolsList[2274] = [{id:"audio9",startFrame:2274,endFrame:2514,loop:1,offset:0}];
	this.streamSoundSymbolsList[2514] = [{id:"audio10",startFrame:2514,endFrame:2761,loop:1,offset:0}];
	this.streamSoundSymbolsList[2761] = [{id:"audio11",startFrame:2761,endFrame:2946,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,192,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_192 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,192,366,1);
	}
	this.frame_366 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,366,692,1);
	}
	this.frame_692 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,692,948,1);
	}
	this.frame_948 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,948,1172,1);
	}
	this.frame_1172 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1172,1441,1);
	}
	this.frame_1441 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,1441,1900,1);
	}
	this.frame_1900 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,1900,2274,1);
	}
	this.frame_2274 = function() {
		var soundInstance = playSound("audio9",0);
		this.InsertIntoSoundStreamData(soundInstance,2274,2514,1);
	}
	this.frame_2514 = function() {
		var soundInstance = playSound("audio10",0);
		this.InsertIntoSoundStreamData(soundInstance,2514,2761,1);
	}
	this.frame_2761 = function() {
		var soundInstance = playSound("audio11",0);
		this.InsertIntoSoundStreamData(soundInstance,2761,2946,1);
	}
	this.frame_2945 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(192).call(this.frame_192).wait(174).call(this.frame_366).wait(326).call(this.frame_692).wait(256).call(this.frame_948).wait(224).call(this.frame_1172).wait(269).call(this.frame_1441).wait(459).call(this.frame_1900).wait(374).call(this.frame_2274).wait(240).call(this.frame_2514).wait(247).call(this.frame_2761).wait(184).call(this.frame_2945).wait(1));

	// Layer_3
	this.instance = new lib.uy98989("synched",0);
	this.instance.setTransform(458.2,366.7,1,1,0,0,0,58.2,-33.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2946));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-717,-993,2791,2782.8);
// library properties:
lib.properties = {
	id: '638B95A6DB07944F929B6468659DDD15',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap1.png", id:"Bitmap1"},
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
an.compositions['638B95A6DB07944F929B6468659DDD15'] = {
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