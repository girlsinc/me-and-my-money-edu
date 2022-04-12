(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m1l1_atlas_1", frames: [[0,0,56,10]]}
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



(lib.Mesh = function() {
	this.initialize(ss["m1l1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1762,1783);// helper functions:

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


(lib.yuil6t8k678k76k = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9C187").s().p("AjWBLQh3gHACgvQACguEGgNQCDgHCCADIB6ghIAJAmQAJAqgCAUQgDAWh+ARQh2APhdgEIhvABQg6AAglgBg");
	this.shape.setTransform(2.0008,-326.227,1.9933,1.9933);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D5C40").s().p("AAoBQQg0gLgwgnQgPgNgPgoQgJgagHgeIAHgEICCBLQB2BMhBAPIgMABQgOAAgSgEg");
	this.shape_1.setTransform(-6.7618,-600.8832,1.9933,1.9933);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A73A37").s().p("AAqCqIg+goQhQiaAYhWQAIgbARgRIAQgMIARgEQATgCARAJQA4AcAHB+QAGB+gWAnQgIAPgJAAIgGgBg");
	this.shape_2.setTransform(-33.0052,-536.0478,1.9933,1.9933);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#9E3635").s().p("AgtA8QgEgmABhHIAAh1IBVB7QAIAJADAJQAFARgSAfIg/BwIAFAgQgRgtgFg+g");
	this.shape_3.setTransform(-35.4012,-514.6531,1.9933,1.9933);

	this.instance = new lib.Mesh();
	this.instance.setTransform(-54.25,-410.4,1.9933,1.9933);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8E3533").s().p("AAtCUIgwiVQgRgzgKgaQgRgqgTgeQAoAkAiA7QAUAkAhBKQAGANAAAGQAAAGgDAKIgTA6IABADIgCAAg");
	this.shape_4.setTransform(31.7491,-545.9971,1.9933,1.9933);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#916E50").s().p("AgWB0QgcgKgbgUIgXgRQAPgQgJhZIgNhXQAHgLBkAvQAxAYAwAaQgEAJAHA0IAHAyQgfA0gzAAQgWAAgZgKg");
	this.shape_5.setTransform(-4.3288,-589.7869,1.9933,1.9933);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A73A37").s().p("AgqGtQhHgJhMgPIg/gOQgegXAShHIAZhCQAgg6AFhJIgemuIB0hsQAbAYBXgJQArgFAngJQAUgEAkAQQATAJAOAJQAMAoAzBvQAiA+gmDNQgTBogaBbQAmBtAdA7QAPAdAHAHQg3AdhsAAQhCAAhVgKg");
	this.shape_6.setTransform(0.2074,-488.2666,1.9933,1.9933);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E9C187").s().p("AgKAuIAFhbIAQABIgEBag");
	this.shape_7.setTransform(-8.8355,-380.4419,1.9927,1.9927);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E9C187").s().p("AgNA0IAKhnIARABIgKBmg");
	this.shape_8.setTransform(-55.1154,-383.68,1.9927,1.9927);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E9C187").s().p("AgLAuIAGhbIARABIgGBag");
	this.shape_9.setTransform(-34.6905,-382.2353,1.9927,1.9927);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DCB480").s().p("AgOgqIAQAAIANBUIgRABg");
	this.shape_10.setTransform(30.47,-380.5415,1.9927,1.9927);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DCB480").s().p("AhXh3IBTACIB6DrIjrACg");
	this.shape_11.setTransform(37.1599,-373.056,1.9921,1.9921);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DCB480").s().p("AgJAIQgug1AagFIAigKIAjB5QgcgagVgbg");
	this.shape_12.setTransform(53.2801,-388.2955,1.9921,1.9921);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E9C187").s().p("AAqDcIlzgcIgCgFIAiiZIgEgBQAEhDgGh5QgBgZAEgMQAFgNATgNQAEgDAdAEQAjAEAGgBQByARC+gCQBgAABJgEQANASAYCGQAbCVgDBeQjOAWhRAGg");
	this.shape_13.setTransform(1.7904,-360.335,1.9921,1.9921);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8E3533").s().p("AhACcQgWgnAGh+QAHh+A3gcQASgJATADQAKABAHADIAPALQASARAHAbQAZBXhRCaIg9AnIgGABQgJAAgIgPg");
	this.shape_14.setTransform(24.3974,-538.1894,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.instance},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.3,-617.6,132.6,306.6);


(lib.yiult78lt7l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D4AD91").s().p("AgkgJQBFguBWgqIAIAEQgaBpgdAYQg5Aug+AMIg0AEQhNgRCMhag");
	this.shape.setTransform(-2.089,-184.7427,1.9931,1.9931);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D0A988").s().p("Ah/CGQgUhmAPgeQAahvgIgSIB4g8QB8g5AJAOIgPBoQgMBtASARQgyA7g1A6QhpB1gNAAQgQAAgUhkg");
	this.shape_1.setTransform(-3.5227,-161.8413,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDACAC").s().p("AkLgKIAEgNQCKArCygMQBugHBogYIABANQiQAiiOAAQiKAAhvgig");
	this.shape_2.setTransform(-4.7254,21.626,1.9925,1.9925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EDACAC").s().p("AkBgLIADgNQBbAjCTABQBeAABmgNQA/gKALgLIAEANQgSALg6AJQhnAOhcAAQiVAAhfgkg");
	this.shape_3.setTransform(-4.1774,13.0582,1.9925,1.9925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EDACAC").s().p("Ah3CWIgBgDQgTgkgUhZQgRhGgFguQgEglANgYIAJgDIAFAEIgGAOQgGAVADAYQAEAoAQBGQATBXATAkIALAFQB2iDAvgwIAhggQAbgaALgNQASgTANgYIAOAFQgPAZgSAVQgMANgdAcIggAgQg1A0hzCBIgDAEg");
	this.shape_4.setTransform(-2.3812,-129.0563,1.9925,1.9925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C73B39").s().p("AkNgPIAEgOQBvAiCJAAQCPAACPgiQABANgCATQhbAShwAGQgsADgmAAQikAAhYgtg");
	this.shape_5.setTransform(-5.1114,25.4718,1.9925,1.9925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C73B39").s().p("AkIgBIAIgfQBfAkCVAAQBdAABmgNQA6gJATgMQAEAPABAOQhoAYhtAHQgnADgjAAQiGAAhsgig");
	this.shape_6.setTransform(-4.4763,17.1998,1.9925,1.9925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C73B39").s().p("AgDG5QiSgBhbgkIAahhQgkhogdh3Qg4jtAqhLQA/iFAPgwIAUgLQAZgNAUgHQgMAZAEAlQAFAtAQBIQAUBYATAlIABACIAZAKIADgEQBziBA2g2IAggfQAdgcALgOQATgVAOgZIA7ASIACgDIAHAGIAFACIAAAEQAdAfADAsQAMEyhHBzIgBAkIgJAXQgJAdgFAfQgPBgAoBHIAFAHQAGAJAEALQgLALg/AKQhiAOhcAAIgGAAg");
	this.shape_7.setTransform(-6.9045,-72.418,1.9925,1.9925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C73B39").s().p("AhtCVQgTglgThWQgQhHgEgnQgDgZAGgUIAGgOIgFgEQAWgGAPADIBqAQQBvAKAigdIAsAOQgNAXgSAUQgLANgbAaIghAgQgvAvh2CEg");
	this.shape_8.setTransform(-2.3842,-131.1982,1.9925,1.9925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C73B39").s().p("AgVByQgIhIgOgWQgKgSgEgKQgFgRAEgNQACgIAKgOIBriUIAACNQABChgqBuIgUAFQgMgXgJhIg");
	this.shape_9.setTransform(38.9938,-87.3634,1.9925,1.9925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C73B39").s().p("Aj4HiIh1gDQgDieAlmLQAkl1AMgcIClAdQC6AXB1gbQAKABAWgYQAUgVADAEQAoAuANBPQAPBSAJD8IAcD6IAIAAIAND9ImzAUQg0gGh/gEg");
	this.shape_10.setTransform(0.0061,110.1287,1.9931,1.9931);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.9,-208.4,145.9,416.6);


(lib.uoit7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A73A37").s().p("AicETQADgRAJgPQANgtAIgNQAKgTAQhWQAVhyAOg1QA9jlB5ghIAOADQAPAIAFAUQAQBAheCqIgEAdIgrC1QguC5gVAMQgYAVgbAFIgKABQgtAAgMhLg");
	this.shape.setTransform(-31.2357,69.6978,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.4,0,62.4,139.4);


(lib.uoy8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6F6F6F").s().p("AmOB7IgIg9QC/h/DwhQQCAgrBcgQIABAAQAsgRAsAUQAsAVATAvQATAugRAuQgRAtgrARIgLAEIAAABIgDAAQgXAGgXgFQkLANjIBYQg/AbgxAgQgYAPgMALQgtgYgRhCg");
	this.shape.setTransform(-81.3494,83.7798,1.9925,1.9925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKgSIgVgMQAbgGAUAZQALAMAFANIgCASQgRgggXgSg");
	this.shape_1.setTransform(-173.6544,154.2042,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKgSIgVgMQAbgGAUAZQALAMAFANIgCASQgRgggXgSg");
	this.shape_2.setTransform(-172.957,145.7361,1.9925,1.9925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgKgSIgVgLQAagHAVAZQAKAMAGANIgCASQgRgggXgSg");
	this.shape_3.setTransform(-171.7615,136.7022,1.9925,1.9925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#57514C").s().p("AgEDVQgdgOgXg3IgRg0QgLg4APh2IARhsIAAAAIAAgBIAagLQAcgKATgBIABgBIAAABQASgBAGAKIgDgBQgDACgCAOQgCAVAEArQANAiAOANQAHAHAFAAIgXDEIgJA7QgFAbgYAEg");
	this.shape_4.setTransform(-179.963,145.3039,1.9925,1.9925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AhsAjQACgYAOgeIANgaIAXgEIADgXQADARB2gmIApBhIgtAMQgsAWgSAcQgHAOAAAKQgYAEgTAAQhBAAAFg7g");
	this.shape_5.setTransform(-164.686,117.7793,1.9925,1.9925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJgUIgSgPQAbgCAQAcQAJANADAPIgEARQgMgjgVgVg");
	this.shape_6.setTransform(-196.4186,164.9665,1.9925,1.9925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJgUIgSgPQAbgCAQAcQAJANADAPIgEARQgMgjgVgVg");
	this.shape_7.setTransform(-194.4261,156.6976,1.9925,1.9925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#525252").s().p("AmeBAIABg+QDRhfD6gqQB/gVBjgCIABAAQAugLAoAcQApAbALAxQAMAxgYAqQgYAqguALIgLACIAAAAIgDAAQgXADgWgJQkKgdjUA3QhCARg1AYIgoAUQgogegHhEg");
	this.shape_8.setTransform(-93.8326,107.2073,1.9925,1.9925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIgTIgTgPQAbgCAQAbQAJANADAPIgFARQgMgjgTgUg");
	this.shape_9.setTransform(-191.4872,146.3862,1.9925,1.9925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D3A38").s().p("AgmDPQgbgTgOg6IgIg2QgBg5AhhyIAhhpIAAAAIAagGQAfgGASACIABAAQASACAFALIgDgBQgDABgEANQgGAVgDArQAIAjAMAQQAGAHAFABIg1C+IgTA5QgJAagXAAg");
	this.shape_10.setTransform(-201.0541,154.1207,1.9925,1.9925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#ADACAC").s().p("AhsAPQAGgWATgdIARgXIAXAAIAGgXQABASB7gUIAYBnIguAFQgvAOgVAZQgKAMgCAKIgMAAQhjAAAShGg");
	this.shape_11.setTransform(-182.6959,129.1902,1.9925,1.9925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6F6F6F").s().p("AgXgqIATgIIAcBhIgUAEg");
	this.shape_12.setTransform(-84.4808,10.2022,1.9932,1.9932);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6F6F6F").s().p("AgPgtIATgFIAMBkIgUABg");
	this.shape_13.setTransform(-99.2805,13.8896,1.9932,1.9932);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6F6F6F").s().p("AgNAwIAHhgIAUgCIgHBlg");
	this.shape_14.setTransform(-146.7193,17.1286,1.9932,1.9932);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#6F6F6F").s().p("AgWAsIAZhdIAUABIgZBig");
	this.shape_15.setTransform(-167.4987,15.5839,1.9932,1.9932);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#525252").s().p("AhxhSIB4AlIBrCAg");
	this.shape_16.setTransform(-80.726,44.1245,1.9933,1.9933);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#6F6F6F").s().p("AnjB1QgDhsAbhSQATg3AaghIA9hrIDCAJQDMAEA8gaIAGALQGDCggPCFQgHBDhUAjQjYBZjZAsQh4AYhXAAQjmAAgFilg");
	this.shape_17.setTransform(-100.6864,59.4258,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.6,0,218.5,196.4);


(lib.uoy79y899 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7B7272").s().p("AlXJIQhjhJAehGQAehGBVjeQBVjdAvhnQC8mjD5gfIAiAEQAoAKAbAaQBWBZhGDrQhHDshoBYQg0AtglgCIhZhIIhLDwQhWD9gwBKQgfAZgkAAQgvAAg4gqg");
	this.shape.setTransform(-42.0029,62.6098);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-84,0,84,125.3);


(lib.uoy9y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#897E7D").s().p("ACJJzIAAgCQgqgUhjk/Ihbk6IiahYQgyidgNg1Qg5juA9hJQATgWAcgDQAPgCAKADQE7AXBxG/QAaBuAfDeIAIA6QASB0ASAeIABACQAUAeAaBRIAAABQgXDNhbAAQgmAAgzglg");
	this.shape.setTransform(34.0358,66.4341);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,68.1,132.9);


(lib.uioy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C4A082").s().p("AAsDhQgbgNgNgeIgBgCIgth/Qg1iSgrhvIATgGQAagIAggOIAAAKQAEAQAMAdQApBcB4C7QAKAKAHAQQAMAegKAdQgKAdgbALQgMAGgNAAQgOAAgPgIg");
	this.shape.setTransform(-27.9198,-46.5448,1.9927,1.9927);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AgaBiQgrg/gag8QgJgVgBgHQAAgFAHgDQAHgEAXAoQAVAlAAgCQADgGgphIQgTghASgGQAFgDAFAHQAJAKASAlQAfA/gEgZQgBgKgphVQgGgLgCgGQgDgKAGgHQAMgOAZA5QAZA7ACgBQADgCgbhYQgGgTAMgEQANgEAHAWQAcBkARAgQAJARAJAAQAFABgMggIgRgtIgIgbQgDgPAJAAQAOAAAWAyQAoBtgEApQgFAug/AYIgEABQgSAAgqg/g");
	this.shape_1.setTransform(-59.404,-115.1701,1.9927,1.9927);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.5,-147.2,80.4,147.1);


(lib.uioy79y978 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B73538").s().p("AgXCRIABgjIhFArQgNAHgMgWQgYgqAHiJQAHiKA9geQATgKAWACQAMACAHADQBbAvAjBfQAMAhACAgQACAbgGAJQgTAjhFBPQgiAogeAhQgDggABgpg");
	this.shape.setTransform(26.9636,43.4614,1.9932,1.9932);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B53538").s().p("AgRCUIACgLIhIAmQgRAGgPgXQgdguAQiKQARiMBHgaQAjgNAfAPQBUArAYBxQAMA3gFA1QgHAihLAxQgmAYgkASQAAghACgSg");
	this.shape_1.setTransform(30.3707,41.9363,1.9928,1.9928);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AF8D75").s().p("ABvCzQhEg0hBg8QiDh2gFg2QgFg7AcgXQAXgSAXAOQAYAPBfB9QBnCGASA3IAJArQAAARgMAAQgMAAgZgTg");
	this.shape_2.setTransform(75.056,171.1255,1.9928,1.9928);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#AF8D75").s().p("AA4EnQgQgCgSgcQgPgXgCgLIh/oNIA2AhQA5AfASgNIA/DdQA9DhgJAZQgLAggSASQgQARgQAAIgFAAg");
	this.shape_3.setTransform(42.5145,101.7646,1.9928,1.9928);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#AF8D75").s().p("ABgCFIgOgQQhDhOgHgFQgVgPAvA5QAdAiAHANQAEAIgEADQgFAFgGgBQgKgDgQgVQg2hHgFgBQgCAAAcAlQAcAngGAFQgFAEgFgDQgGgDgQgSQgwg1gshDQgxhMANgNQAsgsAsASQAoAQBYBZIATAXQATAYgDAIQgDAIgNgKIgWgVIglgjQgagbgCAFQgDAIAOARQAZAdBUBKQASASgIAJQgIAJgQgPIgmgiQgkgfgCABQgCABAuAzQAuAxgSAEIgEABQgGAAgGgGg");
	this.shape_4.setTransform(115.0798,219.126,1.9928,1.9928);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,143.4,246.8);


(lib.uioy9y98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#916E50").s().p("ABIB3QhHhKgcgUQgQgMgIAEQgFACAaAXIAiAgIATATQAKAMgIAEQgIAEgXgPIgXgQQhVhNgOglQgRgqAtgyQANgOBJAmQBAAjAzApQASAOADAGQACAEgEAFQgFAHglgXQgkgYAAACQABAHBEArQAUANADAKQABAGgFAFQgDAFgIgDQgMgFghgZQg4goAPAUQAHAJBJA2IAPAMQAHAHgCAIQgEASgwgmQgwgogBACQgCACAeAgQAbAdAGAEQAOAOgJAJQgEAEgEAAQgIAAgKgKg");
	this.shape.setTransform(46.8072,104.0777,1.9932,1.9932,-14.9989);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8E3533").s().p("AAWEWQgDgDgEgXIgMghQgTgYgFgWQgIgjhHlYQgEgRACgRQgDgJAFgIQAKgSArgCQArgDATAjQAKASABASIAqCwQApC3gJAjIgEAKQAKAsgCAIQAAACgGAEIgBAEQgBACgFgBQgOAHgTAGQgTAGgHgBIgDgBQgEADgCAAIgBAAg");
	this.shape_1.setTransform(20.8096,55.4603,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape,p:{rotation:-14.9989,skewX:0,skewY:0,x:46.8072,y:104.0777}}]}).to({state:[{t:this.shape_1},{t:this.shape,p:{rotation:0,skewX:-45.0003,skewY:134.9997,x:28.771,y:118.7239}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,77.2,150.9);


(lib.uily79lt789l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDA688").s().p("AAKBvQhjgJgahdQgPgyAkggQAegbA4gIQAygIApALQArAMgGAWQgOA8gCBwQgiALgkAAIgYgBg");
	this.shape.setTransform(6.103,-101.4875,1.9932,1.9932);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKQgEgEAAgGQAAgFAEgEQAEgEAFAAQAGAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgGAAQgFAAgEgEgAACAEQAAAAAAABQAAAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABgAgFAEQAAAAAAABQAAAAABAAQAAAAAAABQABAAAAAAQABAAABAAQAAgBAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBQgBAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABgAACgDQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAQABAAAAAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAgAgFgDQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAABAAAAg");
	this.shape_1.setTransform(27.6579,-2.5791,1.9932,1.9932);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAKQgEgFAAgFQAAgFAEgEQAEgEAFAAQAGAAAEAEQAEAEAAAFQAAAFgEAFQgEAEgGAAQgFAAgEgEgAABAEQAAAAAAABQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAABgAgFAEQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAgBAAQAAABAAABgAABgDQAAABAAAAQABABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAgAgFgDQAAABAAAAQABABAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAgBAAQAAABAAAAg");
	this.shape_2.setTransform(27.3091,-12.5951,1.9932,1.9932);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAKQgEgEAAgGQAAgFAEgEQAEgEAFAAQAGAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgGAAQgFAAgEgEgAABAEQAAAAAAABQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAgFAEQAAAAAAABQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABgAABgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAgAgFgDQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAAAQAAABAAAAg");
	this.shape_3.setTransform(26.2128,-22.6111,1.9932,1.9932);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D43539").s().p("Ag9CVQhIg1gFgiQgCg0AQg2QAghsBXglIAUgFQAZgCAWAKQBFAeAHCKQAHCIggArQgQAVgSgGIhEgrIABAMQAAARgCAhQgjgUgkgag");
	this.shape_4.setTransform(-42.55,-14.8721,1.9932,1.9932);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B73538").s().p("Ag0BGQgEgqAAhUIABiHIBiCMQAKAOACAIQAEANgFAQQgEAKgJARIhJCAIAGAlQgUg0gGhGg");
	this.shape_5.setTransform(-31.0983,10.626,1.9932,1.9932);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CDA688").s().p("AhzALQAQgPgJhaIgNhWQAIgMBrAzQA1AaA0AbQgHARAcBVQAHAZgRBLQgIAlgJAgg");
	this.shape_6.setTransform(7.2111,-63.5505,1.9932,1.9932);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D43539").s().p("AhVHPQhDgEhGgJIg4gJQAEg2AOgjIANgZQAQhWgNhVIgQhEIgMoAIB6gnQAfAbBpgJQAzgFAugKQAYgGAqAUQAVAKAQAKQAOAtA6CAQAoBIgjDiQgRBygaBjQAbBlgHApQgDAUgJAAQhUAsigAAQghAAgkgBg");
	this.shape_7.setTransform(14.5609,31.2421,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-123.8,140.5,247.6);


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
	this.shape.graphics.f("#C3AAB6").s().p("AipC0QgYgJgOgLIAZi3IACABIAAgBQgBgLACgMQAKhJA9gsQA+gsBNAKQBOAKAwA7QAxA6gKBHIgEAVIAAACQAICTAIAJIgtAHIgCAAQhoANhNAAQheAAg3gUg");
	this.shape.setTransform(9.0111,39.4156,1.9925,1.9925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5BFA4").s().p("AAAEeQgrgGgfgcQgfgdgGgnIgEAAQgijhgQj1QA6AUBugBQBMgCBXgLQgfDeAEDQQAEATgDARQgGAwgpAdQgiAYgpAAIgSgBg");
	this.shape_1.setTransform(8.3137,132.9288,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E5BFA4").s().p("AgfGfQgFg6gMhxQgZjigpkTQgNgUgDgYIgBgDIABAAIAAgMQABgwAlgiQAmghA1ABQA0ABAlAjQAkAigBAxIABABQALA5gECYQgFDrg1DoIgcAtQgUAUgUAAQgSAAgSgQg");
	this.shape_2.setTransform(11.5266,226.8261,1.9921,1.9921);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DEDEDE").s().p("AhxByQg+gBgZgXQgIgKgCgMQgFgYAYgPIDsh9IgrAzQgiAxAkABQBEgSB0hiIgCgDQAMACAGASIABAAIAAABQAKAegEAxIAAAAIAAABIhjA3QhvA6g6ALQgVAEgXAAIgMgBg");
	this.shape_3.setTransform(-8.9222,343.6052,1.9921,1.9921);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E5BFA4").s().p("AhzA2IBKg0QAFgBAGgKQALgWAEgyIgEgwIBuADQAHCAASgCIgWAKIAFAXQgtAzgyAcQggASgYAAQgxAAgOhMg");
	this.shape_4.setTransform(8.1057,325.1531,1.9921,1.9921);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.1,-0.3,101.6,366.8);


(lib.uily7l7t8l78t = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D4AD91").s().p("AAsBXQg5gMgzgrQgRgNgQgsQgKgdgHggIAHgEICNBRQB/BThGAQIgOABQgOAAgTgEg");
	this.shape.setTransform(-4.5402,-139.0784,1.9931,1.9931);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5BFA4").s().p("AgYBrIhehrQARgQgLhkIgOhgQAIgMBxA0QA3AaA2AdQgHAQAXBmQAOAdgSBdQgTBcgOAAQgMAAhfhsg");
	this.shape_1.setTransform(-3.7268,-118.2359,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A68697").s().p("AgzBDQgEgqABhPIAAiCIBhCHQAJANACAIQAEANgFAPQgEAJgJAQIhHB8IAFAkQgTgygGhEg");
	this.shape_2.setTransform(-42.3963,-51.2135,1.9925,1.9925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C3AAB6").s().p("AhCG7QhAgDhDgKIg2gJQgFgtANgjIAPgbQAkhAgNhZIgVhMIgCggQgphEgKiVQgGhOAEhdQADgoAagdIAAgDIAFgCIAGgFIACADIBqgiQAfAbBmgJQAygFAtgKQAXgFApATQAVAJAQAKQAOAsA5B7QAnBEg0DaQgZBtgiBgIAqCbQhQAqiUAAQgjAAgogDg");
	this.shape_3.setTransform(-0.6792,-29.4532,1.9925,1.9925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A68697").s().p("AgjA9IA4iAIAPAIIg4B/g");
	this.shape_4.setTransform(-6.6204,72.991,1.9931,1.9931);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A68697").s().p("AgmA8IA/h+IAOAJIg9B8g");
	this.shape_5.setTransform(-37.0156,67.1611,1.9931,1.9931);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A68697").s().p("Agig5IAQgFIA0B2IgPAHg");
	this.shape_6.setTransform(34.9365,69.802,1.9931,1.9931);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C3AAB6").s().p("AkQDHQgbgmgOgxIgJgqQASitAWhRQAWhBAKgwQABgFATAUQAVAWAJAAQBqAZCqgWQBVgLBAgQQAYA4AfB+QAtC4gDCIQj3BAhLALQgiAGggAAQiHAAhHhkg");
	this.shape_7.setTransform(-0.0245,101.1628,1.9931,1.9931);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.3,-161,128.6,321.8);


(lib.uilt7l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#916E50").s().p("AAWH4QghgPgHgiQgJgphOr7QAOgvAVgqQArhWAnATQAtAWAWA6QAUA2gFBAIAKGaQAJFmgZAbQgUAVgXAAQgLAAgMgFg");
	this.shape.setTransform(0.0216,101.5034,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.1,0,42.3,203);


(lib.uil7y7yy98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C0A07E").s().p("AgtC8Ig1mUICsCwIAYEAQiJgNgGgPg");
	this.shape.setTransform(-27.5234,109.3409,1.9933,1.9933);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#535454").s().p("AkIATIA9gUQBMgYBHgNQDigrBgBPIgJAAQhIAbhkARQhMAMhDAAQhyAAhcgjg");
	this.shape_1.setTransform(-1.1371,148.6099,1.9932,1.9932);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7B7272").s().p("AiHBEQgKj7AdiIQAQgoAdgmQAWgdAUgRIB2AsIgTH5QAFBJAgA6IAZBCQASBHgeAXQgbAJgqAKQhTAUhMAIQgWjugFiKg");
	this.shape_2.setTransform(33.4065,-34.0637,1.9932,1.9932);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#897E7D").s().p("AgYG0QgngHgjgSQAGgdA9ivQgZhagQhnQgfjMAthCQAzhvALgnIAjgTQAogRAUAEQhNDSA0KbIgiABQgmAAgagEg");
	this.shape_3.setTransform(-36.8656,-35.7266,1.9932,1.9932);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#535454").s().p("AgXAuIAchfIATAIIgaBbg");
	this.shape_4.setTransform(-42.4467,56.9769,1.9932,1.9932);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#535454").s().p("AgPAxIANhiIASAFIgMBeg");
	this.shape_5.setTransform(-27.9459,60.5647,1.9932,1.9932);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#535454").s().p("AgNgxIATACIAHBfIgTACg");
	this.shape_6.setTransform(18.2969,63.9033,1.9932,1.9932);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#535454").s().p("AgVguIAUgCIAYBbIgUAGg");
	this.shape_7.setTransform(38.6278,62.4582,1.9932,1.9932);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#313131").s().p("AgiAtQhKgLhUgSIhEgPIAig5QBuAtC7gJQBegFBIgOQAHABAJAgIAIAfQgkAghnAAQhBAAhbgMg");
	this.shape_8.setTransform(-0.7384,58.9439,1.9932,1.9932);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C0A07E").s().p("AgagpICCgpIAGADQgGAegKAbQgPAogPANQgwAng0AKIgrAEQhQhUCFgpg");
	this.shape_9.setTransform(6.614,-142.7443,1.9932,1.9932);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D3B289").s().p("AhqBKQARhggHgPIBhgxQBkgvAHALIgNBXQgJBZAPAPQgiAfgsAQQgZAJgWAAQgzAAgfgzg");
	this.shape_10.setTransform(4.8426,-131.5204,1.9932,1.9932);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#444444").s().p("AgogSIANjGIBEGxg");
	this.shape_11.setTransform(-10.555,100.778,1.9932,1.9932);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#4E6145").s().p("AAdCOIhCh2QgSggAFgTQACgGAJgOIBbiAIAAB7QAABMgEAoQgGBAgSAwg");
	this.shape_12.setTransform(37.4557,-52.6007,1.9932,1.9932);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D3B289").s().p("Ah0B6QgEgXAMgvQAShmgHgPIBng0QBogxAIALIgNBcQgLBeAQAQIhAA3QhGA4gnAAQgtgBgIgjg");
	this.shape_13.setTransform(4.0725,-126.7654,1.9932,1.9932);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#4E6145").s().p("AjLGAQgFAAgBgSQgBglAZhdQgchbgVhoQgpjQAkhBQBAh1ANgpIAjgTQAmgSAVAFIBZAOQBgAJAcgZIBwAlIgbHVIgTBIQgNBVAiA9IANAaQAMAigEAqQhNAPhgAGQgjACgfAAQiNAAhMgpg");
	this.shape_14.setTransform(-3.003,-32.7681,1.9932,1.9932);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#535454").s().p("Ak2BLQgMjbBXhzIAGgMQA7AeDMgDQBmgCBbgIIAdB+IAAABQAgAsAPA4QAYBaghBVIgtBnIkKAKQgDgZgCgGIgEAhIj/AJQgXhWgGhvg");
	this.shape_15.setTransform(2.2255,98.137,1.9932,1.9932);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4A302E").s().p("AgzgUIANjFIBaGzg");
	this.shape_16.setTransform(-8.3127,101.077,1.9932,1.9932);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#8E3533").s().p("AhngNIBbgJQBigGAoAQIAAARIj7AUg");
	this.shape_17.setTransform(2.4009,-120.0813,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-159.4,124.69999999999999,318.9);


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
	this.shape.graphics.f("#8E3533").s().p("ABVFfQgRgEgSgLIgQgMQgUgMgri6IgtjTQhbirARhAQAFgUAPgHIAPgDQB4AiA5DmQAOA1ATByQAPBXAKATQAIAPALArQAJAQACARQgNBKgsgBIgKAAg");
	this.shape.setTransform(30.3061,70.0548,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,60.6,140.1);


(lib.uil7yl78l78tl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(-881,-891);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-881,-891,1762,1783);


(lib.uil7tl78tl87l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A94242").s().p("AgtCqQhdgNgkgrIA+hkQATg6AqgzQBShoBzAhIALANQAMARAEAWQALBGhIBTIgXAnQgaAxgWAwIgTAAQgfAAgkgFg");
	this.shape.setTransform(-36.8248,34.8986,1.993,1.993);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AjTFjQgUgSgBgcQgBgdASgXQAbhJCfl1QAHgvAfgrIACgFIABAAIAPgRQAugxA1gQQA2gPAeAcQAfAcgLA2QgKA2gtAxIgRARIgFAHQg3BJhXCsQgzBogyBwIgHARIgBgBIgJALQgWAYgeADIgIABQgZAAgTgRg");
	this.shape_1.setTransform(-46.4849,77.6079,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.9,0,92.9,151.8);


(lib.uil7t8lt78l_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AA2HrQgkgVhOlgIhbmTQgWg9AKg4QAKg+AugfQApgbBFBKQAjAlAbArQBmL6AAAqQABAjgjAVQgSAMgUAAQgUAAgVgNg");
	this.shape.setTransform(-0.0467,100.3692,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.3,0,66.6,200.8);


(lib.uil7l7t8l7t8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AAxA3QghgogRgSIgHA2QgEAigBAUQgEgagWgvQgUgogTgbQgFgHgOgfQgEgIADgJIAGgTQATgFAUAEQAUAEAPANIAQARQAJALAHAFIAAgFQACARAOAVIAdAjQAPATANAfQAOAigBAVQgTgTgggng");
	this.shape.setTransform(19.9507,22.5169,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,39.9,45.1);


(lib.uiy7y8989 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AggBYQgjg+gVg6QgHgVABgGQAAgFAHgDQAHgDASAnQARAlABgCQABgEgKgXIgVgxQgPghARgEQAGgCAEAGQAIALANAlQAYA9gBgYQgBgMgfhQQgFgMgBgFQgCgKAGgGQAMgMATA4QATA5ACgBQACgCgRhUQgEgTAMgCQALgDAGAVQATBhANAfQAHARAJABQAEABgIgfIgMgsQgFgRgBgJQgCgOAJABQAOABAQAxQAdBqgIAmQgJAqg+ASIgCAAQgSAAgjhBg");
	this.shape.setTransform(-56.9235,-93.5053,1.9022,1.9022);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7B7272").s().p("AglBjQgog5gjhLQgehEAAgSQABgbAcgVQAXgSATgFQATgEA9BpQA+BpA7BXIANAcQgdA8gnAAQgwAAhAhcg");
	this.shape_1.setTransform(-28.5219,-41.5184,1.9931,1.9931);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,-122.6,75,119.1);


(lib.uilt778l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AAAGbQhigNgqAGQgCgUAHh7QAHh/AEgQQAKgegCg8QgEhBAAghQgBg4AGgpQANhMAqhCQArhCA+grQALgHAIAAQAFAAAEAEQAEAFgCAEIgNgCQASAtgIA9QgEAhgVBMQgPA5AFA+QAFAzAVBBIAFAXQADAPAEAIQAGAOAbCeQAcCfAGANQgcAAhygPg");
	this.shape.setTransform(0.0081,84.9127,1.9931,1.9931);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.2,0,56.5,169.8);


(lib.ouy89y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AjYBWQg2jjBZhcQAdgcAngMQATgFAOAAIE+HRQhcBChnAUQgfAGgaAAQicAAgujBg");
	this.shape.setTransform(0.0179,-0.0459,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.3,-55.7,94.69999999999999,111.4);


(lib.ou8y9y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AAAEuQhkgYgpAFQgBgOAHgUQAIgWADgLQAKghgCg7IgFhhQgBg4AHgpQANhMAqhCQArhDA+gqQALgHAHAAIgCAFQgDAEAPADIgLgCQASAugIA9QgEAfgVBOQgPA5AFA8QAFA0AUBCIAGAXQADAPADAIQAMAcA4B6QghAAhtgbg");
	this.shape.setTransform(-0.0125,65.5988,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.3,0,56.6,131.2);


(lib.ol9789t789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9D8993").s().p("AipC1IAAgBQgXgHgPgNIAZi2IACAAIAAgBIABgXQAJhIA+gsQA/gsBMAKQBOAKAxA6QAwA6gKBIQgBALgDAJIAAADQAKCUAFAIIgsAGIgCAAQhXALhKABIgTAAQhhAAg1gSg");
	this.shape.setTransform(9.0327,39.3448,1.9925,1.9925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BF9F89").s().p("AAAEeQgsgFgfgdQgegdgGgmIgEAAQgjjmgPjxQA6AVBugCQBNgBBWgMQggDhAFDOQAEARgDATQgGAwgqAdQghAXgpAAIgSgBg");
	this.shape_1.setTransform(8.3852,132.894,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#BF9F89").s().p("AggGfQgEg6gMhxQgZjigpkTQgNgVgDgXIgBgDIABAAIgBgMQABgwAmgiQAnghA0ABQA0ABAkAjQAlAigBAxIAAABQAMA1gECbQgFDrg1DpIgHAPQgKASgMAMQgTAUgVAAQgRAAgTgQg");
	this.shape_2.setTransform(11.607,226.8445,1.9921,1.9921);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B7B8B8").s().p("AhxByQg+gBgZgXQgIgKgCgMQgGgYAYgPIDsh9IgqAzQgiAxAkABQBEgSB0hiIgCgDQALACAHASIABAAIAAABQAKAegEAxIAAABIhjA3QhvA6g6ALQgUAEgYAAIgMgBg");
	this.shape_3.setTransform(-8.8816,343.6235,1.9921,1.9921);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BF9F89").s().p("AhzA1IBLgzQAFgBAFgKQALgWAFgyIgFgwIBuACQAHCAASgBIgWAKIAFAXQgtAzgyAcQggASgYAAQgxAAgOhNg");
	this.shape_4.setTransform(8.0893,325.1441,1.9921,1.9921);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.1,-0.3,101.5,366.90000000000003);


(lib.oy89tyu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9D8A93").s().p("AgOCsIhKgcQgBgxgFgzIgEgpQgehhAjg2QALgRAQgKIAOgHQBrAOAgB2QAQA6gFA4IAPBrQgXAMghAAQggAAgngLg");
	this.shape.setTransform(22.5354,36.4884,1.993,1.993);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AAPFzQgYgNgKgcIgEgMIgBAAIAAgRQgRlegkh+IgCgIIgIgUQgWg5AJgyQAKgyAjgNQAjgNAnAfQAoAfAWA5IAHAUIABABIAAAEQANAxgKApQALFtgCBPQAHAagKAYQgLAYgWAIQgLAEgKAAQgOAAgPgHg");
	this.shape_1.setTransform(21.3012,79.305,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45.1,154.7);


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
	this.shape.graphics.f("#C4A082").s().p("Ag3gKIgxhzIgBgCQgKgcAKgaQAKgaAYgJQAZgKAYANQAYANALAcQAFANAAAPQAnDJAfBXQAPAsAIADQgeALgWALIgQAIQgqhlg4iCg");
	this.shape.setTransform(22.0174,43.8817,1.9926,1.9926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C4A082").s().p("AApCOQgIgBgEgIIgGgRQgZhRgGgIQgFgJAAAGQAAAJALAkQALAkABAMQAAAIgFACQgFACgFgCQgIgGgFgVQgThKgFgDQgCgBAKAnQAKAogHADQgGABgDgDQgFgFgHgTQgUg6gLhDQgNhNAQgGQA5gYAfAcQAcAYArBjQARAugKAJQgGAGgHgNIgLgXIgRgnQgNgegDAEQgGAGAFASQAKAeArBVQAJAUgLAFQgKAGgIgRIgUgnQgTgkgCAAQgCABAUA2QATA0gPAAIgBAAg");
	this.shape_1.setTransform(46.557,108.8673,1.9926,1.9926);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,-0.1,64.6,137.4);


(lib.oy8989y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D94E4D").s().p("AhDDUIgahzQgbg3gHhBQgNiEBpg5IARACQAUAFASANQA5ApAIBvIALArQAPA1ASAyQgaAdgmAcQhDAyg1AAIgMgBg");
	this.shape.setTransform(-12.5493,42.0856,1.9925,1.9925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AA1GAQgUgUgCgeIgBAAQgkhZiAltQgagkgHg6IgCgEIABAAIgBgYQAAhCAegwQAdgvApAAQAqAAAcAvQAdAwAABCIgBAYIABAIQAJBbA1C6QAhB1AmBuIAHASIgBABIABANQAAAggVAXQgUAXgdAAQgbAAgUgUg");
	this.shape_1.setTransform(-2.0456,84.3084,1.9925,1.9925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBBF9A").s().p("AgbDxQAHgHgBgyQgDhlgnjaQgGgPAAgQQAAghAVgWQAUgXAcAAQAdAAAUAXQAVAXAAAgIAAACIgGCIQgHCagDB3QgagEg3AAg");
	this.shape_2.setTransform(18.1071,183.8516,1.9921,1.9921);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBBF9A").s().p("AgEBsQgBg/gCAAQgDABgFAsIgFAvQgCAUgMgBQgNgCABgXQALhngDgjQgBgUgJgEQgEgCgBAiIgCAvIgDAcQgCAQgJgEQgIgEgEgcIgCgcQAFh0AUgkQAWgoBCACQATAAARBTQAQBJABBCQABAXgDAGQgCAFgHABQgJAAgFgtQgFgrgBACQgFAFAKBSQADAYgGAIQgDAFgIAAQgGAAgCgIQgEgNgDgqQgEhFgGAYQgCAHACAsIADA1IAAATQgBAKgIAEIgDABQgMAAgBg3g");
	this.shape_3.setTransform(20.8546,259.8321,1.9921,1.9921);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.2,-0.2,75.80000000000001,292.59999999999997);


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
	this.shape.graphics.f("#D3B289").s().p("AAfHZQgTgchVmvQhYm2AQghQAJgUAXgPQAZgRAbAAQBHgBAgBzQAeBtApFnQAVC0APCeIgIAZQgKAdgNASQgSAbgUAAQgXAAgaglg");
	this.shape.setTransform(-0.017,101.6898,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.6,0,59.2,203.4);


(lib.oy79y7979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DE7739").s().p("AgtAEQAMgPAmgIQAUgDASAAIADAWQgVAAgiALIggANg");
	this.shape.setTransform(-2.5242,198.64,1.9933,1.9933);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453B33").s().p("AhLHxQgdgFgSggQgNgZgBglQAAgQAFgJQACgFADgDQgFgKgEgXQgGglgCgUQgCggAGgZQAHgdAVgVQglhGAlhYQgugngOhCQgLg1AJhMQAHg6AEgRQAIgoARgdQArhLADgDQAcgnAngJQAbgHAjAIQAYAFAmAOQAbALANAMIANAGIAZADIgDBjQgDAhgJAfQgdBghQAcIgXCmIBNBeIgGApQgKAsgTASQARAqAFAcQAGAngKAfQgIAWgQASQgBAQgLASQgQAcgaATQgZAUgeAHQgMACgKAAIgLgBg");
	this.shape_1.setTransform(-0.0278,99.3205,1.9933,1.9933);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgZBgQgPgFgTgWQgWgagGgZIBih0QAQgEASAIQAQAIAKAPQAQAYABArQABAigKAUQgLAUgYAOQgaAQgWAAQgLAAgKgEg");
	this.shape_2.setTransform(3.9626,119.7291,1.9933,1.9933);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AgZD1QAfgdAVgnQAVgmAGgsQgPAggKAQQgPAZgRAQQgVASgaAGQgcAHgXgMQAxgZAfg2QAbgxAGg9QAGgygKg/QgGgngRhKIBZglQAPBJAGAuQAIBBgCA3QgDCGg+BdQgMASgQAJQgJAGgJAAQgIAAgHgFg");
	this.shape_3.setTransform(-13.015,220.307,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,0,71,270.1);


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


(lib.iul78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D43539").s().p("AhBCbQhOg3gFgkQgCg2ASg3QAihyBcgmIAWgFQAbgCAXAKQBKAgAHCPQAICPgiAsQgSAWgSgHIhKgsIABAMQABASgDAiQglgVgmgbg");
	this.shape.setTransform(-1.8514,40.265,1.9929,1.9929);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("ABBDLQg1hIgvhPQheicANg2QAOg7AjgNQAfgMATAWQASAWA5CYQA8CjABA8IgFAtQgFANgJAAQgNAAgWggg");
	this.shape_1.setTransform(-8.4999,183.2963,1.9929,1.9929);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CDA688").s().p("AgvE6QgPgIgKghQgHgZABgNIAronIAqAxQAxAwAXgHIgIDqQgMDvgSAWQgWAcgXAMQgPAIgNAAQgIAAgHgDg");
	this.shape_2.setTransform(-15.2719,102.5787,1.9929,1.9929);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CDA688").s().p("AAgCvQgJgDgEgKIgEgVIgNg5QgLgvgDgHQgOgaARBNQAJAtAAAPQAAAIgFACQgHACgFgEQgIgIgFgaQgOhagGgFQgBgBAHAvQAIAygIABQgHABgDgFQgFgGgGgYQgShIgHhRQgIhdASgFQBAgSAhAmQAdAhAnB7QAPA6gLAKQgHAFgGgPIgLgdIgQgyQgMglgDAEQgIAGAFAVQAIAmApBsQAIAZgMAEQgMAFgHgWIgTgxQgSgugDABQgCAAASBEQAQA+gPAAIgCAAg");
	this.shape_3.setTransform(13.2536,244.4158,1.9929,1.9929);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.1,-0.1,64.1,279.40000000000003);


(lib.iul78l7t8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AhYBEQgChXAEhAQAAglAEgSQAFgVAVglQAJgOAGgDQAQgIATATQAQAQAYArQAXApASARIAPAFQAAAigQAdIgbAxQgMAdABAhQgfgugGg5QgbAXgEA0IgBArQAAAagEAQQgEAWgMASQgNATgSAHIgEiVg");
	this.shape.setTransform(0.0148,43.1808,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.9,0,35.8,86.4);


(lib.iul7t8l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("AgugVIgVh7IAAgCQgEgdAQgYQAPgXAagDQAZgEAWATQAVASAEAdQABAQgDANQgJDMAKBcQAFAuAHAFQgfAEgZAFIgRAFQgRhrgZiNg");
	this.shape.setTransform(-6.0806,44.985,1.9927,1.9927);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AAECUQgHgDgCgJIgCgRQgHhZgDgGQgIgYAEBCQADAmgCANQgBAHgGABQgHAAgDgDQgGgHgBgWIgBg0QgBgagDgCQgCgBABAnQABAqgIAAQgHABgCgEQgDgGgCgVQgHg8AFhEQAGhNARgDQA7gKAZAiQAWAeASBpQAGAxgLAHQgHAFgFgOIgFgZIgIgqQgFgggEADQgHAEABATQACAgAXBdQADAVgLACQgLADgEgTIgLgqQgKgngCAAQgBAAAGA6QAGAzgNAAIgCAAg");
	this.shape_1.setTransform(4.4092,114.2088,1.9927,1.9927);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.8,-0.2,39.400000000000006,144);


(lib.iul7l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("Ah1HjQgNgSgKgdIgIgZQAPieAVi0QAplmAehtQAghzBHAAQAbAAAZARQAXAPAKAUQAPAhhYG2QhVGvgTAcQgZAlgYAAQgUAAgSgbg");
	this.shape.setTransform(-24.0437,105.16,1.9928,1.9928);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AAWH4QghgPgHgiQgJgphOr7QAOgvAVgqQArhWAnATQAtAWAWA6QAUA2gFBAIAKGaQAJFmgZAbQgUAVgXAAQgLAAgMgFg");
	this.shape_1.setTransform(32.4591,101.2728,1.9928,1.9928);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C4A082").s().p("AhIgpICriuIg0GTQgHAPiJANg");
	this.shape_2.setTransform(8.6565,50.3127,1.9928,1.9928);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.7,-0.2,107.30000000000001,207.1);


(lib.iop80089uu09 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3B289").s().p("AhnhOICigVQAdB0AQAoIigArIgviyg");
	this.shape.setTransform(32.1875,101.6875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#897E7D").s().p("AiIA+IhMlVQgEj+DQBWQARAcAHAhQCxKSAQBDQAJAqgOA9IgkAFIijAVIgKACQgug1hVljg");
	this.shape_1.setTransform(21.2714,46.9693);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B289").s().p("AA3B5Qg7hOgZgXQgOgMgJADQgEABAWAZIAeAiIAPAVQAIAMgIADQgIADgUgRIgUgSQhJhSgKglQgLgqAwgrQAOgNBCAtQA5AoAtAtQAPAOACAGQACAFgFAFQgFAGghgaQgggaAAACQAAAEAUASIApAgQAcAXgOAMQgEAEgGgEQgLgGgdgbQgygtANAVQAFAKBAA7IANANQAGAHgDAIQgGARgpgqQgqgrgBACQgBACAZAhIAbAkQAMAPgKAHQgDADgEAAQgHAAgKgMg");
	this.shape_2.setTransform(50.3142,121.3071,1.9932,1.9932);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,74.8,147.8);


(lib.ilt7878l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AhWJPQAFgmgDjzIgFkaQgBg7gMhQIgZiKQgIgmAAg4QAAhIAeg/QAZg1A4hCIAJAGQAEACgEAFIgHAKIgLANIgLAOIgPAfQgFARAHAOQAuBOAMBcQAEAiAGBGQAIA8AWAkQAJAQASAUIAeAhQAjArADAjQABATgHAXQgFAPgLAZQgEAJgJDVQgIDUgEAJQgGAOgHAGQgFAFgOAEQgoAMgoAAQgfAAgggHg");
	this.shape.setTransform(-0.0212,119.2617,1.9931,1.9931);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.1,0,54.2,238.5);


(lib.ilt678lt768l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A73A37").s().p("AgeEVQgQABgTgCQgUgCgGgEIgDgDQgGACgBgCQgBgDAFgXIACgjQgIggAEgVQAGgjBLlXQADgRAJgPQAAgJAHgGQAQgMApAPQAoAQAEAnQACAUgGARIggCyQglC4gWAdIgIAHQgHAtgGAGQgBACgHACIgCADIgBAAIgFgCg");
	this.shape.setTransform(-20.4371,55.5324,1.9933,1.9933);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#916E50").s().p("AhhB+QgJgJAPgOQA+hAgCgEQgBgBgwAnQgwAmgEgSQgCgIAHgHIAPgMQBMg5AEgGQAQgVg5AqQghAYgMAFQgHADgEgFQgFgGABgFQADgKAUgNQBEgrABgGQAAgCgkAXQglAXgFgGQgEgGACgEQADgGASgOQAzgpBAgiQBJgnANAOQAtAygRAqQgOAkhVBOQgpAigNgHQgIgEAKgLIAUgUIAhgfQAagYgFgCQgIgEgQAMQgcAUhHBKQgKAKgIAAQgEAAgEgDg");
	this.shape_1.setTransform(-49.494,125.3722,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,0,76.2,151.1);


(lib.ilt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#916E50").s().p("Ah1HjQgMgSgLgdIgIgZQAPieAVi0QAplmAehtQAghzBHAAQAbAAAZARQAXAPAKAUQAPAhhXG2QhVGvgUAcQgZAlgYAAQgTAAgTgbg");
	this.shape.setTransform(0.0069,101.6915,1.9933,1.9933);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.7,0,59.4,203.4);


(lib.il87lt78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3AAB6").s().p("AgqChIhBgsQAKgvAHgzIAFgoQgGhmAvgtQAOgOASgGQAJgDAFgBQBmAnAEB6QACA8gSA2IgKBrQgMADgMAAQgrAAg5ggg");
	this.shape.setTransform(3.3459,38.4191,1.993,1.993);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AhdFrQgVgSgEgeIgBgMIgBAAIACgJQAAgFACgDQBAlTgFiIIAAgJIgEgUQgIg+AVgtQAVgvAkgFQAlgFAgAoQAgAnAIA8IACAWIABABIgBAEQABAygTAmQhLFogTBKIgBAAQABAbgOAVQgPAVgZADIgIABQgVAAgSgQg");
	this.shape_1.setTransform(-0.8095,79.5357,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,0,49.8,155);


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
	mask.graphics.p("AgwAQQgKgGgCgGQAMgNAUgKQApgTAwAZQgCAKgJAJQgRAVggABIgBAAQgfAAgRgMg");
	mask.setTransform(6.1,2.7658);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAAQAAgGAGAAQAHgBAAAHQAAACgCADQAAAAgBABQAAAAgBAAQAAABgBAAQgBAAAAAAQgGAAgBgHg");
	this.shape.setTransform(6.43,3.9691);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgNAQQgGgGgBgJQAAgIAGgGQAFgHAJAAQAIgBAGAGQAGAGABAJQABAIgGAGQgGAHgJAAIgBAAQgHAAgGgFg");
	this.shape_1.setTransform(5.0302,2.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#42523B").s().p("AgSAVQgJgIAAgMQgBgLAIgJQAIgIAMgBQAKAAAJAIQAJAIAAAMQABAKgIAJQgIAJgMABIgBAAQgKAAgIgIg");
	this.shape_2.setTransform(4.975,2.875);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.2,0,5.6,5.6), null);


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

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AAAAYQgcAAgOgSQgIgIgCgJQApgWAkARQASAIAKAMQgCAFgIAFQgPAKgaAAIgCAAg");
	mask.setTransform(5.3,2.4226);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAAQAAAAAAgBQABAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAABABQAAAAABAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAAAQAAAGgGAAQgGgBABgFg");
	this.shape.setTransform(4.1746,3.495);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AAAATQgHgBgFgFQgGgGABgHQAAgIAGgFQAFgFAHAAQAHABAFAFQAGAGgBAHQAAAIgGAFQgFAFgHAAIAAAAg");
	this.shape_1.setTransform(5.475,2.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#42523B").s().p("AAAAZQgKgBgHgHQgHgIAAgJQABgLAHgHQAIgHAJABQAKABAHAHQAHAIAAAJQgBALgIAGQgGAHgJAAIgBAAg");
	this.shape_2.setTransform(5.475,2.5042);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0, new cjs.Rectangle(3,0,5,4.9), null);


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

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgWAPg");
	this.shape_2.setTransform(-1.9153,-0.1247,0.6215,0.6215,20.2067);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CD958C").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},3).to({state:[]},1).wait(15));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7}]},9).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CD958C").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_10.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CD958C").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_11.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CD958C").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_12.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},9).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[]},1).to({state:[]},13).wait(3));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},9).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_5
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_16.setTransform(0.65,1.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_17.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},10).to({state:[{t:this.shape_17}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_6
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_18.setTransform(0.55,1.0856);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_19.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_18}]},10).to({state:[{t:this.shape_19}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	// Layer_7
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C25D57").s().p("AgNATIAAAAIgBgBIgBAAIgBgFQACgBgFgJIgFgBIgBgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIAAgCIACgBIAIgGIAGgEIACAAIACgBIABAAIACAAIAAAAIACAAIACAAIACgBIABAAIAGgBIAAgBIAFAAIAAgBIADgBQACACAAAEIABgBQABgCABAAQABgBABgBQAAAAAAAAQAAAAgBABIABAEIABADIgEAJIgGAFIgHACIgDAEIgDACIAAABIgCABIgCABQgBADgFABIgEABg");
	this.shape_20.setTransform(0,-0.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_21.setTransform(0.2313,-0.2179);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_22.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},9).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).to({state:[]},13).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-2.8,13.5,10.3);


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


(lib.fgryjdsrtyjrsyjcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgVAPg");
	this.shape.setTransform(-1.8976,-0.0427,0.6215,0.6215,20.2067);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E98E8E").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
	this.shape_1.setTransform(-1.7122,-1.5494,0.6215,0.6215,20.2067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CE7E7D").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAigbAfQgUAaggAQQgJAEgGAAQgJAAgFgHg");
	this.shape_2.setTransform(2.6,-2.6,0.6215,0.6215,14.995,0,0,4.6,-5.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},7).to({state:[]},1).wait(18));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-4.7,11.4,10.3);


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
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CD958B").s().p("Ag4AkQgKgHAHgOIAGgKQAJgJANADIAfgEQAjgKAcgZQgHATgRAUQgiAngyADQgGgBgFgEg");
	this.shape_23.setTransform(-1.6176,-1.5848,0.6215,0.6215,20.2067);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C28B85").s().p("AgvAxQgKgNALgOIAEgDQAHgFARgGQARgGAagdQAOgOAKgOQAMAhgbAgQgUAZggARQgJAEgGAAQgJAAgFgHg");
	this.shape_24.setTransform(-1.1412,-0.4458,0.6215,0.6215,20.2067);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E6E6E5").s().p("AgjAPQAfgMAogfQgNAXgXATIgWAPg");
	this.shape_25.setTransform(-1.9153,-0.1247,0.6215,0.6215,20.2067);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CD958B").s().p("Ag4AlQgKgIAHgOIAGgKQAJgJANAEIAfgFQAjgKAcgaQgHAUgRAUQgiAngyADQgGgBgFgDg");
	this.shape_26.setTransform(-1.7122,-1.5494,0.6215,0.6215,20.2067);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C28B85").s().p("AgvAxQgKgOALgNIAKgGQAMgHAHgDQARgGAUgTQAUgVALgOQAIAigYAbQgXAcgaANQgNAHgJAAQgIAAgDgGg");
	this.shape_27.setTransform(2.7,-2.6,0.6215,0.6215,8.2712,0,0,4.8,-5.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAHQgKgJARgGQARgFAOANQgTAKgJAAQgGAAgEgDg");
	this.shape_28.setTransform(-2.4362,0.5784,0.8727,0.8727,20.2084);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C28B85").s().p("AgKAXQghgGAMgaQAKgVAcAMQAPAFANAKQgLAagZAAIgJAAg");
	this.shape_29.setTransform(-2.6464,0.4849,0.8727,0.8727,20.2084);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_24},{t:this.shape_23}]},6).to({state:[]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},1).to({state:[]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},4).to({state:[]},1).wait(12));

	// Layer_2
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#E6E6E5").s().p("AgrATQAfgMA4gnQgaAkgaAOIgVAPg");
	this.shape_30.setTransform(-1.3774,-0.1916,0.6215,0.6215,20.2067);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E6E6E5").s().p("AguAWQAfgMA+gtQgJAbgxAdIgVAPg");
	this.shape_31.setTransform(-1.1327,-0.3167,0.6215,0.6215,20.2067);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E6E6E5").s().p("AgwAXQAggMBAgvQgHAXg2AjIgVAOg");
	this.shape_32.setTransform(-1.0199,-0.3083,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_30}]},10).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[]},1).wait(13));

	// Layer_3
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#CD958B").s().p("Ag5AkQgKgHAIgOIAFgKQAJgIANACIAfgEQAjgKAcgZQAHARgeAcQgfAeg2AHQgGgBgFgFg");
	this.shape_33.setTransform(-1.6969,-1.6171,0.6215,0.6215,20.2067);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#CD958B").s().p("Ag6AkQgKgHAHgOIAGgKQAJgIANACIAfgEQAjgKAcgZQANAPghAeQgiAeg2AHQgGgBgFgFg");
	this.shape_34.setTransform(-1.6279,-1.5917,0.6215,0.6215,20.2067);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CD958B").s().p("Ag7AkQgJgHAHgOIAGgKQAIgIANACIAfgEQAjgKAcgZQAHANgDAGQgCAHgcAYQgbAZg3AHQgGgBgFgFg");
	this.shape_35.setTransform(-1.6078,-1.5843,0.6215,0.6215,20.2067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33}]},10).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[]},1).wait(13));

	// Layer_4
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C28B85").s().p("AgkA9QgNgKAIgRIACgDQAIgIAagNQAZgLAIgZQAIgZgDgMQAVAjgRAfQgRAggVARQgPAMgKAAQgGAAgEgDg");
	this.shape_36.setTransform(2.65,-2.6,0.6215,0.6215,20.2067,0,0,3.1,-6.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C28B85").s().p("AgmA9QgMgKAIgRIACgDQAHgJAegIQAegKAEgZQADgbgDgPQAaArgSAdQgSAdgXAQQgPAKgKAAQgGAAgFgDg");
	this.shape_37.setTransform(2.65,-2.6,0.6215,0.6215,10.7372,0,0,3.1,-6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C28B85").s().p("AgaBFQgPgHAGgTIABgDQAFgJAZgNQAZgNgBgRQAAgTgCgIQgBgJgIgVQAlArgLAeQgKAfgTAVQgOAOgLAAQgEAAgDgBg");
	this.shape_38.setTransform(2.6,-2.6,0.6215,0.6215,20.2067,0,0,0.7,-6.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_36}]},10).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[]},1).wait(13));

	// Layer_5
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgTAMIgCgBIgBgCIAAgCIAAgCIgBgDIAJgCIARgFQAHgCAHgFIAEgBIABAAIABACIABADQgNAKgPAIIgJAEIgGgCg");
	this.shape_39.setTransform(0.65,1.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgUANIgBgBIgBgCIAAgCIAAgCIgBgDIALgDQAIgBAJgEQAKgDADgDIAGgDIAAABQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQgJALgRAIIgJAEIgIgCg");
	this.shape_40.setTransform(0.9687,1.8423,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_39}]},11).to({state:[{t:this.shape_40}]},1).to({state:[]},1).wait(13));

	// Layer_6
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#C2811E").s().p("AgUAJIAGgHIAIgHQAGgFALABIAJADIABADIgBACIgYAIQgHADgEAAIgFgBg");
	this.shape_41.setTransform(0.55,1.0856);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C2811E").s().p("AgTAKQAGgKAGgFQAHgGAKACQAHAAACACQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAACIgNAFIgLAGQgGADgEAAIgFgBg");
	this.shape_42.setTransform(0.8157,1.1965,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_41}]},11).to({state:[{t:this.shape_42}]},1).to({state:[]},1).wait(13));

	// Layer_7
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#C25D57").s().p("AgOAVIAAgBIgCgBIAAAAIgBgFQACgBgGgKIgFgBIgCgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgCIADgCIAJgGIAGgFIADAAIABgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAAAIAGAAIAAgBIADgBQACACAAADIABgBQACgBAAgBQABgBABgBQAAAAAAAAQAAABAAABIABADIABAEIgFAKIgGAFIgIACQgCABgBADIgDADIgBABIgCACIgCABQgBACgGACIgEAAg");
	this.shape_43.setTransform(0.0048,-0.1541,0.9179,0.9179);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#C25D57").s().p("AgPAUIAAAAIgGgQIgFgBIgCgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBIABgCIAJgFIAGgFIACAAIABAAIACgBIACAAIAAAAIACABIACgBIABAAIACAAIAGgCIAAAAIAFAAIAAgBIADgBQACACAAADIABgBQAIgHgCADIACAGIABAHIgOAUQgBACgXADIgDAAg");
	this.shape_44.setTransform(0.2313,-0.2179);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#C25D57").s().p("AgKAbIgBgBQAAgVgMgFIgGgBIgBgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQABgBAAAAIAAgBIACgCIAJgGIAHgFIACAAIACgBIACAAIABAAIABAAIACAAIACAAIACgBIACAAIAGgBIAAgBIAFAAIABgBIACgBQADACAAAEIABgBIAHgGQgBACACAOIABAKIgJASIgZAJIgFABg");
	this.shape_45.setTransform(0.2037,0.2406,0.9179,0.9179);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_43}]},10).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-4.7,11.4,10.3);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHACQgBgGAHgCQACgBADABQADACAAADQABACgBADQgCADgDABIgCAAQgFAAgCgGg");
	this.shape_1.setTransform(8.2568,4.1932);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0F0503").s().p("AgLAVQgJgFgCgJQgDgKAFgIQAFgJAKgDQAJgCAIAFQAJAFACAKQADAJgFAIQgFAKgKACIgGAAQgFAAgGgDg");
	this.shape_2.setTransform(6.3,3.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4E3424").s().p("AgPAcQgMgGgDgOQgEgMAHgMQAHgLANgEQAMgEALAHQAMAIADAMQAEANgHAMQgGALgNAEIgJABQgHAAgIgFg");
	this.shape_3.setTransform(6.325,3.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(3.1,0,6.5,6.6), null);


(lib.ClipGroup_1_0_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHACQgCgHAIgDQACgBADACQAEACAAAEQABACgBADQgCAEgEAAIgCABQgFAAgCgHg");
	this.shape_3.setTransform(13.1325,5.3617);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0F0503").s().p("AgMAYQgKgGgDgLQgDgKAGgJQAFgLALgDQAKgCAKAFQAJAGADALQADAKgFAKQgGAJgLAEIgHAAQgGAAgGgDg");
	this.shape_4.setTransform(10.95,4.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4E3424").s().p("AgRAgQgNgIgEgPQgEgNAHgNQAIgOAPgEQANgDANAHQANAIAEAPQAEANgIAOQgHANgOAEIgKABQgIAAgJgFg");
	this.shape_5.setTransform(11,4.236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_0_1, new cjs.Rectangle(7.4,0.6,7.299999999999999,7.4), null);


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

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#604A3E").s().p("AiigPQAyADAwAGQAwAFA2gRQA4gRAfgJQAfgIAFANQAGARgJALQgIAYgnARQglAQgyACIgKAAQhwAAhAg/g");
	this.shape_12.setTransform(11.7558,-4.0424,0.9515,0.6832);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#AF856A").s().p("AA+A4QhDgLg0gYQg0gYgpg3QAsALAbAOQA4AdAzgHQA1gGAYACQAMABACACQAVAGAIAPQAIAOgNAWQgJAOghAAQgRAAgWgDg");
	this.shape_13.setTransform(10.5182,-1.0062,0.9515,0.6832);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},4).wait(1));

	// Layer_2
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdAbQgpgVgNguQBAAwBngYQgKAVgFAOIgIAVIgZABQgkAAgdgOg");
	this.shape_14.setTransform(14.05,-1.5765);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgnAlQg5gdgSg/QBYBBCNggQgOAcgHAUIgKAcQgSACgQAAQgyAAgngTg");
	this.shape_15.setTransform(14.0455,-1.5716,0.7334,0.7334);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgZAZQgqgWgUgoQBIAqBmgXQgJAUgFAPIgIAUIgZABQgmAAgbgNg");
	this.shape_16.setTransform(13.7,-1.3015);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgWAWQgpgVgbgkQBOAmBngYQgKAVgFAOIgIAVIgZABQglAAgcgOg");
	this.shape_17.setTransform(13.35,-1.0515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},8).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).wait(5));

	// Layer_8
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgwgDIgOgfQA9AjA/gGIAAAog");
	this.shape_18.setTransform(13.2,6.575);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(11).to({_off:false},0).to({_off:true},1).wait(5));

	// Layer_5
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F7919F").s().p("AghAOIgWgmQAsgJARACQAcAEANAPQACACADAHIAEAEIgWAfg");
	this.shape_19.setTransform(13.8622,4.8042,0.7334,0.7334);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggGANABQAUADAJALIAFAHIACACIgQAXg");
	this.shape_20.setTransform(13.85,6.0433);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F7919F").s().p("AgYAKIgQgbQAggHANABQAUADAJALQACACACAFIADADIgQAXg");
	this.shape_21.setTransform(13.525,6.8183);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19}]},9).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[]},1).wait(5));

	// Layer_4
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#971B30").s().p("AhQAqIgeh7IBHBJQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIAAgCIAOgGIACgDIAMgGIADgDIALgEIAEAAIAMgGIANgDIAEgCIBIgPIgJAgIgIBIQgCAfAKAGg");
	this.shape_22.setTransform(12.8538,0.0451,0.7334,0.7334);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#971B30").s().p("Ag4AXIgahTIA3AuQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAgBIAKgFIACgCIAJgEIACgDIAHgDIADAAIAJgEIAKgCIACgCIA1gLIgGAXQgJAZgDAjQABAUAGAIIgMABQg8AAg4gmg");
	this.shape_23.setTransform(12.65,0.8218);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#971B30").s().p("AAHA+QgcgMgfgpIgjhMIBBAoQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABAAIAAgBIAKgEIABgDIAIgEIACgCIAIgDIAEAAIAJgFIAKgCIACgBIA1gLIgHAXQgJAZgCAiIAAAWQAAAMACAGQgTAKgTAAQgOAAgNgGg");
	this.shape_24.setTransform(12.2,2.194);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22}]},9).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[]},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.8,-7.5,32.699999999999996,21.9);


(lib.yuilt76lt78lt78l = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#343433").s().p("AA4AQQgcgVglAIQghANgBgEQgLADgIgIIgFgHQAEADAMABQgIgFgFgMIgCgKQADALAUALQgIgFgDgKIgCgJIAHALQANALAegDQAegCAZAQQANAJAGAJIgMgKg");
	this.shape.setTransform(-28.0299,-0.8274,1.993,1.993);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("ABVAkQgugIguADQgvADgcgDQgagDgQgRIgKgOQAHAIAWALQgOgUgJgYIgFgVQAHAWAYAaQgGgIgEgWIgDgPIAWAhQASAiA8gJQA7gIAoAOQAnAOAMASQgFgGgtgIg");
	this.shape_1.setTransform(-28,-0.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AgDA3QgtgHgegVQgegUgQgQIgKgLIAdAQQgNgVgJgWQAIAGARATQgGgIgEgXIgDgDIAXAVQARAmA4AOQA4APArgHQAqgHANALQgEALgtALQgbAGgcAAQgRAAgRgCg");
	this.shape_2.setTransform(-28.025,1.5197);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#343433").s().p("AgdArQg6gegMgJQgLgHgPgRIgJgMIAZATIgbgqIAjAeIgOgiIAQAUQAZAgAtAaQAsAbAvgKQAwgKAagMQAJAMg7AYQgaAKgZAAQghAAgfgRg");
	this.shape_3.setTransform(-28.0657,3.0075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(29));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#343433").s().p("Ag+APQAcgTAjADQAjACAPgLQAHgGABgHQgBATgPAIQAXgMAEgNQgCAVgPALQAQgBADgHQgCAGgEAEQgKAKgMgEIgygHQgqgFgXARg");
	this.shape_4.setTransform(27.1275,-3.8169,1.993,1.993);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#343433").s().p("AhcAeQBAgVA4gFQA5gEAXgUQAWgVgBgSQAIAogfAVQAZgEAWgjQAEAcglAaQAegKAGgNQgEALgIAJQgUATgegBQhTgFhGAQQhHAQgaABg");
	this.shape_5.setTransform(25.85,-2.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#343433").s().p("AicA0IBBgHQBLgIA3gUQA4gTASgYQATgXgDgSQAIAogeAcQAYgLAWgjQAEAcglAfQAegOAGgOQgEAMgIAIQgUATg1ATQg1AShIAFIgcABQgzAAgXgQg");
	this.shape_6.setTransform(25.85,-1.7109);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#343433").s().p("Ag3BNQhEgBghgvIBEAXQBmAOAtgrQAtgrANgaQAMgbAAgDQAHAZgaAlQAVgUAVgjQAEAcgkAmQAYgRANgFQAAAIgRAPQgSAOg3AhQg1AghAAAIgFAAg");
	this.shape_7.setTransform(25.8884,0.6275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},15).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).wait(29));

	// Layer_6
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EBBF9A").s().p("AiMgdIEZgTIgSA6QhogMiLAzg");
	this.shape_8.setTransform(22.225,-1.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBBF9A").s().p("Ah4AvIgUhOIEZgTIgSA6QgtAbhKAGQgZAKgqAAQgZAAgggEg");
	this.shape_9.setTransform(22.225,-1.1433);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EBBF9A").s().p("Ah4AfIgUhPIEZgTIgOBCQgZAqheAaIgJABQgtAAhKglg");
	this.shape_10.setTransform(22.225,0.5227);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},15).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_8}]},1).to({state:[]},1).wait(29));

	// _Clip_Group__2
	this.instance = new lib.ClipGroup_2();
	this.instance.setTransform(22.1,2.95,1.993,1.993,0,0,0,6.2,3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_5
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgxAQIgLgMIAhgXQAogTAwAZQgCAKgJAJQgRAVgfABIgCAAQgfAAgSgMg");
	this.shape_11.setTransform(22.3692,2.5424,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(50));

	// Layer_4
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EBBF9A").s().p("AhcAHIgHgjICxAAIAWA5QhLgih1AMg");
	this.shape_12.setTransform(-24.95,1.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EBBF9A").s().p("AhrACIAMgkICxAAIAZA+QgfAHggAAQhIAAhPghg");
	this.shape_13.setTransform(-25.3,1.6059);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EBBF9A").s().p("AhrgGIAMglICxAAIAZA+QgwAZgtAAQg/AAg6gyg");
	this.shape_14.setTransform(-25.3,2.5347);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},15).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_13}]},2).to({state:[{t:this.shape_12}]},1).to({state:[]},1).wait(29));

	// _Clip_Group__1_0
	this.instance_1 = new lib.ClipGroup_1_0();
	this.instance_1.setTransform(-25.35,3.95,1.993,1.993,0,0,0,5.4,2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_7
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAAAYQgcAAgOgSIgKgRQApgWAkARQASAIAKAMQgCAFgIAFQgPAKgaAAIgCAAg");
	this.shape_15.setTransform(-25.0652,3.6521,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-8.5,83.30000000000001,17.6);


(lib.uil7tlt78l7t8l = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.fgryjdsrtyjrsyjcopy("single",7);
	this.instance.setTransform(-112.95,-26.35,2.4372,2.3574,0,5.3418,4.9941);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59).to({startPosition:7},0).to({_off:true},1).wait(2345));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#796A6A").s().p("AAMARQgSgJgcgIQg2gSgkgEIAiABQAnACAaAHQA4AOASADQAxAGAcgRQAAALgPAIQgQAKgcAAQgXAAgggGg");
	this.shape.setTransform(-113.0307,-127.4422,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(59).to({_off:true},1).wait(2345));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#796A6A").s().p("AjTBaQgUgegHgtQgIgxCFgEQB6gFBqAgQBPAYAQg6QAFgTgCgYIgDgVIAPAXQAOAaAAALQAABOhsgOQh7gag/gHQhzgLgqA9IAEAWQAFAdAKAbQgIgFgKgPg");
	this.shape_1.setTransform(-128.4721,-135.6604,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(59).to({_off:true},1).wait(2345));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#292929").s().p("AjvB0QgshQAbgxQA0hfBugxQCahECvBmIALAPQANATAFAQQAPA1hEAHQgCAjgoAhQhQBDi7gPQgRAAgUAJQgoAUgOAxQgbgegXgng");
	this.shape_2.setTransform(-126.3749,-133.6953,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(59).to({_off:true},1).wait(2345));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEA840").s().p("AgHAIQgEgDAAgFQAAgEAEgDQADgEAEAAQAFAAADAEQAEADAAAEQAAAFgEADQgDAEgFAAQgEAAgDgEg");
	this.shape_3.setTransform(-54.4851,-47.6178,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(59).to({_off:true},1).wait(2345));

	// Layer_7
	this.instance_1 = new lib.yuilt76lt78lt78l("synched",0);
	this.instance_1.setTransform(-121.05,-72.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(59).to({startPosition:9},0).to({_off:true},1).wait(2345));

	// Layer_12
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AgUAVIAUgTQASgWACgnQAFAbgIAVQgEALgFAEQgiAPAVAVQAKALARAJQg0gQAKgXg");
	this.shape_4.setTransform(-128.7481,-55.0419,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(59).to({_off:true},1).wait(2345));

	// Layer_13
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D5AE90").s().p("AgFgVQAOgWAKgBIgMAVIgJARQgIAMgDAPIgEAYQgEgoAQgag");
	this.shape_5.setTransform(-53.0864,-62.2667,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(59).to({_off:true},1).wait(2345));

	// Layer_14
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EBBF9A").s().p("AgaBTIgNgDIgKhxIAJAMQAJAHgBgVQgCgdAOgMQAMgMARAHQATAGALAVQANAXgDAfQgGBHgqAMQgGACgHAAIgOgCg");
	this.shape_6.setTransform(-53.3329,-61.0671,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(59).to({_off:true},1).wait(2345));

	// Layer_16
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("AA0AQQgQgMgKgFQgrgWg1ApIARgSQAXgSAegBQAfgCAXAUQAMAIAFAKQgDADgEAAQgFAAgHgEg");
	this.shape_7.setTransform(-152.9414,-90.7114,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(59).to({_off:true},1).wait(2345));

	// Layer_17
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#292929").s().p("AhHAAQAXgaApAAQAkAAAgASQARAIAJAJQhJgmgsAUQgMAGgTAOQgQAOgJACg");
	this.shape_8.setTransform(-98.0829,-91.3153,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(59).to({_off:true},1).wait(2345));

	// Layer_20
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBBF9A").s().p("AhXFKQg1gQg3hOQgyhIgKg5IgEhVQgCgrgagkQgcglAYhNQAmhdAPguIARgHQAWgIAXgEQBKgLA9AmQAuAeATgFQAAgFABgEQADgMAEAEQAFAEgFAHQgDAEgFACQACATAfAcQAXAUA6AuQAdAZAOAxQAJAbAMA5IAJALQAKAHgCgVQgCgcAPgPQANgNATAFQATAFALAWQANAYgFAjQgLBPgoAJQgNADgOgFIgMgFQgFAlgQAdQgTAhglAcQglAeguAaQhIArgtAAQgMAAgKgDg");
	this.shape_9.setTransform(-103.6141,-66.3101,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(59).to({_off:true},1).wait(2345));

	// Layer_21
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AhfDPQiWh2ggjDIARgmQAYgtAlggQB3hnDIA9QBmAfAjBzQAZBTgFCXQgEBmhxAsQgkAOgqAGIgjAEQhDgVhLg7g");
	this.shape_10.setTransform(-95.9428,-107.0595,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(59).to({_off:true},1).wait(2345));

	// Layer_22
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AglD7QAVguAHghQAThUAFg/QAGhQgRhAQgMg1gdgoQgcgpglgSIgmg1QAugPA8ALQBAAMAiAjQASASAZAlQATAcgCAKQgEANAOAgQAFALABAeQABAYgBBXIABAcQABAQgDALIgPBEQgGAVgXAjQgnA7gbAaQgTASg7ArQAAg5AMgag");
	this.shape_11.setTransform(-64.8418,-98.6307,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(59).to({_off:true},1).wait(2345));

	// Layer_23
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AAUEEQg0hTAehqQAOgzADg4QAHhyg6gZQgXAHgXAPQguAdACAnIgoiAIAfgkQAngnAmgSQB6g6BGCxIALAkQAMAuAGArQARCIg2BBIgnA+QghBHAaAxQghgUgbgpg");
	this.shape_12.setTransform(-33.3835,-98.3721,1.993,1.993);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(59).to({_off:true},1).wait(2345));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-179.5,-170.6,179.5,170.6);


(lib.jktyfrukt67k = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.uil7tlt78l7t8l("synched",0);
	this.instance.setTransform(63.5,-279.6,1,1,0,0,0,-63.2,-41);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:0.1958,x:64.4,y:-279.45,startPosition:18},18).to({_off:true},1).wait(41));

	// Layer_6
	this.instance_1 = new lib.oy8989y89("synched",0);
	this.instance_1.setTransform(92.1,-210.5,1,1,0,0,0,-13.6,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:-13.5,rotation:0.1958,x:92.8,y:-210.2},18).to({_off:true},1).wait(41));

	// Layer_7
	this.instance_2 = new lib.yiult78lt7l7t8l("synched",0);
	this.instance_2.setTransform(26.45,-25.5,1,1,0,0,0,-10.2,42.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:-10.1,rotation:0.1958,x:26.6,y:-25.45},18).to({_off:true},1).wait(41));

	// Layer_10
	this.instance_3 = new lib.uilt78lt78l("synched",0);
	this.instance_3.setTransform(53.05,41.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({startPosition:0},18).to({_off:true},1).wait(41));

	// Layer_11
	this.instance_4 = new lib.ol9789t789("synched",0);
	this.instance_4.setTransform(4.3,62.8,1,1,0,0,0,10.1,38.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({startPosition:0},18).to({_off:true},1).wait(41));

	// Layer_13
	this.instance_5 = new lib.uil7tl78tl87l("synched",0);
	this.instance_5.setTransform(-26.75,-216.65,1,1,0,0,0,-34.7,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:-34.6,rotation:-3.9864,x:-26.05,y:-215.9},18).to({_off:true},1).wait(41));

	// Layer_15
	this.instance_6 = new lib.uioy89y89("synched",0);
	this.instance_6.setTransform(-75.1,-81.05,1,1,0,0,0,-11.5,-6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regX:-11.6,rotation:4.8546,x:-65.05,y:-77.6},18).to({_off:true},1).wait(41));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.1,-409.2,287.4,817.5);


(lib.ilt78lt78l8tl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ou8y9y89("synched",0);
	this.instance.setTransform(39,-16.65,1,1,0,0,0,1,14.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AkDjMQAcgXAogVQBRgrBIgCQDlgGBFGRIiIDAg");
	this.shape.setTransform(0.1255,-41.931,1.9928,1.9928);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#292929").s().p("AhWGMQAEgkgDgzIgFhXQAAg9gMhPIgZiJQgIgnAAg3QAAipBJhVIACAgIgLAOQgHANAFATQAEAMALAUIAKEhQAfA/BBAeQAPAVAiAlQAkApADAlQABAUgHAXQgFAPgLAZIgZA3QgIAPgFAEQgGAFgNAEQgoANgoAAQgfAAgggIg");
	this.shape_1.setTransform(-39.3061,-3.3953,1.9928,1.9928);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.4,-100.4,132.7,200.8);


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
	this.instance_2 = new lib.ClipGroup_1_0_1();
	this.instance_2.setTransform(-26.75,8.2,2.0646,2.0646,0,0,0,8.5,4.9);

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
	this.instance_3.setTransform(34.4,-2.3,2.023,2.023,0,0,0,5.5,4.4);

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
	this.instance_2.setTransform(-26.65,3.6,2.039,2.039,4.4654,0,0,3.5,2.5);

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
	this.instance_3.setTransform(18,4.5);

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

	// Layer_32
	this.instance = new lib.ghjdtjtyktyktut("single",16);
	this.instance.setTransform(-3.8,42.95,1.0235,1.0235,10.0575,0,0,6,-5.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(117).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(73).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(16).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(5).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(14).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(24).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(209).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:9},0).wait(5).to({startPosition:8},0).wait(558).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(924));

	// Layer_31
	this.instance_1 = new lib.ghjkdtktuktuykut("synched",0);
	this.instance_1.setTransform(2.75,17.15,0.6716,0.6664,0,13.1605,12.17,-7.9,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2405));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#604A3E").s().p("AATAcQgEgUgLgRIgMgXQgHgNgJgPQAIABALAMQAHAJAGAJQAXAkgHA2IgFghg");
	this.shape_2.setTransform(-50.0511,18.0249,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2405));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#916E50").s().p("AANBcQgsgMgXhPQgPgzANgZQALgVAbAEQAYADAVAUQAVAVgBAZQgBASAIAAQAEABAFgEIgJBfQgMAHgNAAQgHAAgJgCg");
	this.shape_3.setTransform(-50.1311,17.8006,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2405));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AgWBrQgUgGgUgZQgUgaAIAIIAMANIANgNQAiAcAOgEQAUgJASgaQAjgygRhUIADgOQAFgMAGAKQADAGADAWQAEAggDAdQgIBchKAdIgGACIgKgCg");
	this.shape_4.setTransform(-23.4852,-24.4348,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2405));

	// Layer_7
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("ABLDIIAlglQA2gkgFg7QgBgTgHgTIgHgPQgLghg+gIIg7gBQgmAShDgdQglgQgmgaIgCgCQghgTgHgcIgBgXQALgLAkgOIAigMQBMgYBEAfQAiAPATAUQBiAsAfBjQAPAxgEApQgNBRg+AYQgTAIgWABg");
	this.shape_5.setTransform(24.5004,-27.4311,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(2405));

	// Layer_8
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D342E").s().p("AgHBoQAOgwgTgzIgWgpQABgPgNghIgOggIBEgDQAjALAMBEQAHAigBAfIg0Bfg");
	this.shape_6.setTransform(51.1911,-17.4901,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(2405));

	// Layer_9
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("Ag0gHQAVhbBaAPIgDAGIABAbQAAAggGAYQgWBRhTAAQgIgxAKgtg");
	this.shape_7.setTransform(-23.4378,-28.6297,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2405));

	// Layer_11
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#604A3E").s().p("AgKAXQgIgIABgPQAAgOAKgIQAJgJAQAGQgYAEgCAVQgBAWAYADQgHADgGAAQgHAAgFgFg");
	this.shape_8.setTransform(2.927,31.5965,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2405));

	// Layer_12
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#604A3E").s().p("AgRAYQAZAAABgWQABgWgYgGQAPgFAKALQAIAJgBAOQgBAOgJAHQgFAEgFAAQgHAAgIgEg");
	this.shape_9.setTransform(17.4563,32.4696,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2405));

	// Layer_15
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#604A3E").s().p("Ag6AWQAEgMAKgLQATgXAZABQAaABATAWQAKAMAEALQgsgigjARIgXAPQgFADgFAAQgDAAgCgCg");
	this.shape_10.setTransform(35.1626,-3.9777,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2405));

	// Layer_16
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#604A3E").s().p("AA7AWQgTgLgMgFQgvgVg7AfQAGgLAMgKQAagWAiABQAiABAaAZQANAMAGANQgDACgDAAQgGAAgIgFg");
	this.shape_11.setTransform(-10.1748,-5.8566,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2405));

	// Layer_20
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#916E50").s().p("AgaD3IhGgnQg5gsgJhEQgSAKgXgGQgtgLgXhQQgPgzANgYQALgVAbADQAZADAUAUQAWAWgBAYQgBARAIABQAEAAAEgDIAAAAQALgvAHgXQAMgpAYgVQAggbAFgVQADgMgHgbQgIgeAigRQAngUA1AmQBMA2BIgVQAkgKAVgVQAWBDACAtQADA6gaAiQgWAeADAlQAEA9gDANQgHAtgvA4QgxA5guAOQgKADgMAAQglAAg5gbg");
	this.shape_12.setTransform(-7.9708,16.2474,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2405));

	// Layer_21
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D342E").s().p("AAqAPQhHgyhQgPIAAgOQBTAQBLA1QAmAbAXAYIgJAJQgWgYglgag");
	this.shape_13.setTransform(-44.0447,-3.168,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(2405));

	// Layer_22
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D342E").s().p("AAtAOQhMg0hTgNIABgNQBWAOBOA2QApAbAWAZIgJAJQgVgYgngbg");
	this.shape_14.setTransform(-42.9802,-10.0871,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2405));

	// Layer_23
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D342E").s().p("AAtAOQhMg0hTgNIABgNQBWAOBPA2QAoAbAXAZIgJAJQgXgYgmgbg");
	this.shape_15.setTransform(-42.3996,-16.5708,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(2405));

	// Layer_24
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D342E").s().p("AArAPQhKg0hQgOIADgMQBTAPBMA1QAmAbAXAYIgKAIQgVgXgmgag");
	this.shape_16.setTransform(-42.0609,-23.49,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(2405));

	// Layer_25
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D342E").s().p("AAvANQhQg2hXgLIAEgNQBZAMBSA4QApAcAYAaIgJAJQgXgagpgbg");
	this.shape_17.setTransform(-39.3029,-27.6027,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(2405));

	// Layer_26
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D342E").s().p("AAyAKQhWg4hcgHIAFgNQBeAIBYA6QAsAeAaAcIgKAJQgZgcgsgdg");
	this.shape_18.setTransform(-36.4482,-31.5704,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(2405));

	// Layer_27
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D342E").s().p("AA2AIQhcg7hhgDIAGgMQBjAEBcA9QAvAeAbAdIgJAJQgcgdgtgeg");
	this.shape_19.setTransform(-33.3999,-35.4896,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(2405));

	// Layer_28
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D342E").s().p("AA4AGQhgg9hlABIAIgMQBmABBgA/QAxAeAcAfIgJAIQgcgfgxgeg");
	this.shape_20.setTransform(-30.158,-39.4088,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(2405));

	// Layer_29
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#453B33").s().p("AiZDsQh1gogDhWQgGiSASg/QAghwBvggQCpgwCBBtQBBA3AeBAQgaCkiSBfQhJAwhCAPQg6gDg7gUg");
	this.shape_21.setTransform(-11.7993,-19.2695,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(2405));

	// Layer_30
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#3D342E").s().p("AglBWQgTgigCgxQgCgxAQgkQAPgjAZgBQAXgBATAiQATAiACAxQADAxgQAkQgQAjgZABIgBAAQgXAAgSghg");
	this.shape_22.setTransform(43.0122,-13.6193,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(2405));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.2,-69.3,130.4,138.6);


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


(lib.uoy89y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.oy89y89_1("synched",0);
	this.instance.setTransform(4.75,-223.5,1.058,1.058,0,0,0,-7,67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({startPosition:18},0).to({rotation:-1.4496,x:-1.4,y:-223.4,startPosition:26},8).wait(36).to({startPosition:62},0).to({rotation:0,x:4.75,y:-223.5,startPosition:71},9).wait(110).to({startPosition:181},0).to({regX:-6.9,scaleX:1.0579,scaleY:1.0579,rotation:0.519,x:1.65,y:-223,startPosition:190},9).wait(27).to({startPosition:217},0).to({regX:-7,scaleX:1.058,scaleY:1.058,rotation:0,x:4.75,y:-223.5,startPosition:226},9).wait(68).to({startPosition:294},0).to({rotation:-1.553,x:13.9,y:-224.5,startPosition:303},9).wait(70).to({startPosition:373},0).to({regY:66.9,scaleX:1.0579,scaleY:1.0579,rotation:-2.5527,x:9.65,y:-224.7,startPosition:384},11).wait(131).to({startPosition:515},0).to({rotation:-1.0686,x:15.75,y:-224.3,startPosition:526},11).wait(93).to({startPosition:619},0).to({regY:67,scaleX:1.058,scaleY:1.058,rotation:0,x:4.75,y:-223.5,startPosition:631},12).wait(209).to({startPosition:840},0).to({scaleX:1.0579,scaleY:1.0579,rotation:-12.2104,x:5.65,y:-224.15,startPosition:851},11).wait(34).to({startPosition:885},0).to({scaleX:1.058,scaleY:1.058,rotation:0,x:4.75,y:-223.5,startPosition:894},9).wait(552).to({startPosition:1446},0).to({rotation:-0.7066,x:2.15,y:-223.45,startPosition:1454},8).wait(29).to({startPosition:1483},0).to({rotation:0,x:4.75,y:-223.5,startPosition:1490},7).wait(915));

	// uil_t7l7t8l
	this.instance_1 = new lib.uilt7l7t8l("synched",0);
	this.instance_1.setTransform(61.3,-11.9,1,1,0,0,0,1.2,12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(18).to({startPosition:0},0).to({startPosition:0},8).wait(36).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},9).wait(27).to({startPosition:0},0).to({startPosition:0},9).wait(68).to({startPosition:0},0).to({startPosition:0},9).wait(70).to({startPosition:0},0).to({startPosition:0},11).wait(131).to({startPosition:0},0).to({startPosition:0},11).wait(93).to({startPosition:0},0).to({startPosition:0},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({startPosition:0},8).wait(29).to({startPosition:0},0).to({startPosition:0},7).wait(915));

	// ilt78l
	this.instance_2 = new lib.ilt78l("synched",0);
	this.instance_2.setTransform(22.7,-13.6,1,1,0,0,0,19.1,6.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(18).to({startPosition:0},0).to({startPosition:0},8).wait(36).to({startPosition:0},0).to({startPosition:0},9).wait(110).to({startPosition:0},0).to({startPosition:0},9).wait(27).to({startPosition:0},0).to({startPosition:0},9).wait(68).to({startPosition:0},0).to({startPosition:0},9).wait(70).to({startPosition:0},0).to({startPosition:0},11).wait(131).to({startPosition:0},0).to({startPosition:0},11).wait(93).to({startPosition:0},0).to({startPosition:0},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({startPosition:0},8).wait(29).to({startPosition:0},0).to({startPosition:0},7).wait(915));

	// Layer_2
	this.instance_3 = new lib.uoit7979("synched",0);
	this.instance_3.setTransform(-27.05,-195.3,1,1,0,0,0,-13.3,10.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18).to({startPosition:0},0).to({rotation:-1.9509,x:-34.75,y:-197.15},8).wait(36).to({startPosition:0},0).to({rotation:0,x:-27.05,y:-195.3},9).wait(110).to({startPosition:0},0).to({rotation:0.3165},9).wait(27).to({startPosition:0},0).to({rotation:0},9).wait(68).to({startPosition:0},0).to({rotation:0.4468,x:-25,y:-194.45},9).wait(70).to({startPosition:0},0).to({regX:-13.4,rotation:-0.5534,x:-29.1,y:-195.6},11).wait(131).to({startPosition:0},0).to({rotation:0.4468,x:-25.2,y:-194.3},11).wait(93).to({startPosition:0},0).to({regX:-13.3,rotation:0,x:-27.05,y:-195.3},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({rotation:-1.0002,x:-30.95,y:-196.3},8).wait(29).to({startPosition:0},0).to({rotation:0,x:-27.05,y:-195.3},7).wait(915));

	// Layer_3
	this.instance_4 = new lib.ilt678lt768l("synched",0);
	this.instance_4.setTransform(-68.1,-71.25,1,1,0,0,0,-14.6,13.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(18).to({startPosition:0},0).to({rotation:-1.9509,x:-71.55,y:-71.75},8).wait(36).to({startPosition:0},0).to({rotation:0,x:-68.1,y:-71.25},9).wait(110).to({startPosition:0},0).to({startPosition:0},9).wait(27).to({startPosition:0},0).to({startPosition:0},9).wait(68).to({startPosition:0},0).to({rotation:0.4468,x:-67,y:-70.7},9).wait(70).to({startPosition:0},0).to({regX:-14.7,rotation:-0.5534,x:-68.95,y:-71.15},11).wait(131).to({startPosition:0},0).to({regY:13.1,rotation:0.4468,x:-67.2,y:-70.65},11).wait(93).to({startPosition:0},0).to({regX:-14.6,regY:13.2,rotation:0,x:-68.1,y:-71.25},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({rotation:-1.0002,x:-69.85,y:-71.6},8).wait(29).to({startPosition:0},0).to({rotation:0,x:-68.1,y:-71.25},7).wait(915));

	// Layer_4
	this.instance_5 = new lib.uioy9y98("single",0);
	this.instance_5.setTransform(67.25,-70.35,1,1,0,0,0,11.9,11.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(18).to({startPosition:0},0).to({regX:11.8,regY:11.7,rotation:-152.4449,x:78.95,y:-76.5,startPosition:1},8).wait(36).to({startPosition:1},0).to({regX:11.9,regY:11.6,rotation:0,x:67.25,y:-70.35,startPosition:0},9).wait(110).to({startPosition:0},0).to({regX:11.8,regY:11.7,scaleX:0.9999,scaleY:0.9999,rotation:-149.9541,x:88.6,y:-79.65,startPosition:1},9).wait(27).to({startPosition:1},0).to({regX:11.9,regY:11.6,scaleX:1,scaleY:1,rotation:0,x:67.25,y:-70.35,startPosition:0},9).wait(68).to({startPosition:0},0).to({regX:11.8,regY:11.7,rotation:-150.5357,x:79.4,y:-77.65,startPosition:1},9).wait(70).to({startPosition:1},0).to({regX:11.7,regY:11.8,scaleX:0.9999,scaleY:0.9999,rotation:-147.5705,x:79.9,y:-79.75},11).wait(131).to({startPosition:1},0).to({rotation:-143.082,x:84.95,y:-78.55},11).wait(93).to({startPosition:1},0).to({regX:11.9,regY:11.6,scaleX:1,scaleY:1,rotation:0,x:67.25,y:-70.35,startPosition:0},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({regX:12,regY:11.8,rotation:-150.2068,x:95.55,y:-83.95,startPosition:1},8).wait(29).to({startPosition:1},0).to({regX:11.9,regY:11.6,rotation:0,x:67.25,y:-70.35,startPosition:0},7).wait(915));

	// Layer_6
	this.instance_6 = new lib.yuil6t8k678k76k("synched",0);
	this.instance_6.setTransform(6.75,58.95,1,1,0,0,0,0,-308.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(18).to({startPosition:0},0).to({rotation:-1.4497,x:7.8,y:58.9},8).wait(36).to({startPosition:0},0).to({rotation:0,x:6.75,y:58.95},9).wait(110).to({startPosition:0},0).to({regX:0.1,rotation:-0.7073,x:7.5,y:58.8},9).wait(27).to({startPosition:0},0).to({regX:0,rotation:0,x:6.75,y:58.95},9).wait(68).to({startPosition:0},0).to({rotation:2.1923,x:4.3,y:59.15},9).wait(70).to({startPosition:0},0).to({rotation:1.1917,x:5.05,y:59.1},11).wait(131).to({startPosition:0},0).to({regX:-0.1,regY:-308.7,rotation:2.6754,x:3.75,y:59.3},11).wait(93).to({startPosition:0},0).to({regX:0,regY:-308.8,rotation:0,x:6.75,y:58.95},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({regX:0.1,rotation:-0.7073,x:7.75,y:58.85},8).wait(29).to({startPosition:0},0).to({regX:0,rotation:0,x:6.75,y:58.95},7).wait(915));

	// Layer_50
	this.instance_7 = new lib.uil7t8lt78l("synched",0);
	this.instance_7.setTransform(33.45,-197.9,1,1,0,0,0,13.5,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(18).to({startPosition:0},0).to({rotation:-8.1671,x:27.25,y:-197.95},8).wait(36).to({startPosition:0},0).to({rotation:0,x:33.45,y:-197.9},9).wait(110).to({startPosition:0},0).to({rotation:-11.4308,x:30.15,y:-198.05},9).wait(27).to({startPosition:0},0).to({rotation:0,x:33.45,y:-197.9},9).wait(68).to({startPosition:0},0).to({regX:13.6,rotation:-2.2728,x:40.7,y:-196.4},9).wait(70).to({startPosition:0},0).to({rotation:-4.2722,x:36.9,y:-197},11).wait(131).to({startPosition:0},0).to({rotation:-4.2372,x:42.05,y:-195.75},11).wait(93).to({startPosition:0},0).to({regX:13.5,rotation:0,x:33.45,y:-197.9},12).wait(209).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},9).wait(552).to({startPosition:0},0).to({rotation:-14.7038,x:30.45,y:-198.6},8).wait(29).to({startPosition:0},0).to({rotation:0,x:33.45,y:-197.9},7).wait(915));

	// Layer_51
	this.instance_8 = new lib.oy79y7979("synched",0);
	this.instance_8.setTransform(-37.95,-342.2,1,1,0,0,0,2.8,16.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(18).to({startPosition:0},0).to({rotation:-1.4497,x:-47.05,y:-340.95},8).wait(36).to({startPosition:0},0).to({rotation:0,x:-37.95,y:-342.2},9).wait(110).to({startPosition:0},0).to({rotation:0.5185,x:-39.95,y:-342.05},9).wait(27).to({startPosition:0},0).to({rotation:0,x:-37.95,y:-342.2},9).wait(68).to({startPosition:0},0).to({rotation:-1.5529,x:-31.9,y:-342},9).wait(70).to({startPosition:0},0).to({rotation:-2.5529,x:-38.15,y:-341.25},11).wait(131).to({startPosition:0},0).to({regX:2.7,regY:16,rotation:-1.0684,x:-29.05,y:-342.2},11).wait(93).to({startPosition:0},0).to({regX:2.8,regY:16.1,rotation:0,x:-37.95},12).wait(209).to({startPosition:0},0).to({rotation:-12.2115,x:-61.2,y:-331.1},11).wait(34).to({startPosition:0},0).to({rotation:0,x:-37.95,y:-342.2},9).wait(552).to({startPosition:0},0).to({rotation:-0.7073,x:-41.95,y:-341.65},8).wait(29).to({startPosition:0},0).to({rotation:0,x:-37.95,y:-342.2},7).wait(915));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.7,-368.5,352.79999999999995,551.4);


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
	this.instance.setTransform(10.85,-15.45,0.6471,0.6471,0,-9.666,170.334,18.8,-4.8);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(839).to({startPosition:2},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(8).to({startPosition:1},0).wait(18).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(4).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(14).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:1},0).wait(303).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(11).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(8).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(16).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(17).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(23).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(20).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(43));

	// Layer_2
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(12.45,-47.05,0.6991,0.6991,0,-9.5135,170.4865,13.8,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2405));

	// Layer_39
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BE9F7E").s().p("AgMACQgDgbAZAGQgRAFABAPQACAQASgBQgIAFgGAAQgKAAgCgTg");
	this.shape.setTransform(20.7791,-35.0187,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2405));

	// Layer_40
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BE9F7E").s().p("AgJATQASgEgCgPQgCgPgSgCQAYgLADAcQACAVgPAAQgEAAgGgCg");
	this.shape_1.setTransform(29.99,-35.8178,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(2405));

	// Layer_41
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453B33").s().p("AgTBsIgYhAQgDgSAEgiQADgUAFgHQAEgGAHgGIAdgZIAJgJIAEgJQAIgPAQgCIgBABQAHALgFAOQgFAOgNAEQAGAJgEAMQgFALgKAEQADANgBAGQgDALgKABQABAFgDAGIgEALQgBAFAAAKQAAAKgHADQAMARgKAcQgDAJgGAAIAAAAg");
	this.shape_2.setTransform(-17.2926,-63.449,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2405));

	// Layer_42
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453B33").s().p("AiuBRQgYgZAMg6QAFgaAJgLQAFgHAMgHIAcgTQARgLALgCQALgCAVAFQAWAGAJgBQAIAAANgEQAOgDAFgBQAMgBAJAGQAKAFABAKQAJgMARgBQARgCAKAMQAHgIALgDQAKgEALADQACgHAIgCQAHgDAHACQAJADAMAPIAHABQAJAFABALQACAKgEAKQgGAMgWARQgOAJgGABQgGACgGgCQgGgCgCgEQgCARgMAJQgGAFgJAAQgIAAgGgFQgBAFgGACQgFACgFgDQgGgDgIgMQgIAJgOgDQgNgDgEgMQgFAHgIACQgJABgHgFQgGgEgDAAQgDgBgGAFQgKAGgMgBQgLgBgJgIQAAAHgGADQgHAEgFgEQAEAGgGAIQgHAIgHgEQAIAKgGAOQgEANgMAKQgIAHgIACIgGABQgLAAgLgLg");
	this.shape_3.setTransform(9.5498,-90.4935,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2405));

	// Layer_43
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AjQDrQgIgEgEgJQgEgIAAgKIABgHQAAgEgCgCIgEgFIgFgFQgDgEADgKQADgLgCgFIgFgIQgKgPAJgiQgJgEgDgMQgDgKACgMIADgVQACgNgDgJIgFgOQgDgIADgFQAHgGABgEQABgEgDgHQgHgTAIgTQAIgUARgFQgGgTALgQQAFgGAJgDQAIgDAIACQgBgOALgLQALgJAOgBQASgBAFgEQACgCAFgHQAEgFAJgFQARgKAJgDQAPgGAOABIAIABIAKgFQARgNAVACQAXABARAPQACgKAKgEQAJgDAKAEQAIAEAHAJIAMARQAOgGAPALQAPAMAAARQAJgHAMAAQAMgBAKAHQAKAGAHAMQAGAMAAAMQAMgCAMAGQAMAGAHALQAGAMAAAOQgBAPgHAKQACASgOANQgNANgQgGIAAgBQgEgFgLgBQgiABgRgBQgegCgQgQIgQgSQgSgTgfgCQgVgCgiAGQgkAHgTAHQgdALgRAUQgNAPgMAfQgnBigIBvQgBANgGABIgFgCg");
	this.shape_4.setTransform(-3.2985,-92.0659,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2405));

	// Layer_44
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BE9F7E").s().p("AASASQgFgOgLgLQgLgSgQgRQAKAAARATQAXAZABApIgIgZg");
	this.shape_5.setTransform(-29.2369,-38.3043,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(2405));

	// Layer_45
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3B188").s().p("AgZANQgjhIAmgHQAOgDAOALQAPAMACATQABAOAGgBQADAAADgDIAGBHQgGANgLABIgCAAQgXAAgZg3g");
	this.shape_6.setTransform(-27.3651,-37.6569,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(2405));

	// Layer_48
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("Ag3AXQADgJAHgKQAOgTAYgGQAYgFAWALQALAFAGAGQgwgMgeAUQgIAFgLAJQgGAGgFAAIgDgBg");
	this.shape_7.setTransform(40.1089,-68.0901,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2405));

	// Layer_49
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#453B33").s().p("Ag8AEQAVgTAigFQAfgGAdANQAOAHAHAHQgGAEgOgDQgSgDgNgCQgwgGg0AgQAEgJALgKg");
	this.shape_8.setTransform(-2.2885,-62.9151,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2405));

	// Layer_50
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B188").s().p("AgdD8IhEgbQg5ghgThBIABgWIgJhIQABguACgXQAEgpASgYQAYgfABgUQAAgNgKgZQgMgbAbgVQAfgZA2AcQBKApA8gfQAegPAPgYQAeA+AJArQAMA2gRAlQgOAgAIAkQAOA5AAANQAAAsggA9QghA+gnAVQgOAHgVAAQgdAAgpgNg");
	this.shape_9.setTransform(14.957,-47.38,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2405));

	// Layer_51
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AhYD2QhtgVgRhSQgdiMAGg/QAJhwBdgvQCMhICDBWQBCArAlA6QADCghwBxQg4A5g5AYQgSADgTAAQghAAgjgHg");
	this.shape_10.setTransform(-4.2682,-79.4283,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2405));

	// Layer_52
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BDBA88").s().p("AgpBsQgLgpgbhDQgghOgJgeQgCgFABgDQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIADADQAUgMAZAKQAYAKAHAWQAUgIATANQAVAMACAVQANgEANADQANADALAIQAKAIAGAMQAGAMgBAMQAJgBAIAIQAIAHgBAJQgBAKgJAGQgIAGgJgCQAEANgLALQgLAMgOgEQgCAQgIAHQgFAFgHgBQgIAAgDgGQgKAPghAAIgDAAQgWAAgDgMg");
	this.shape_11.setTransform(31.7305,-113.7961,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2405));

	// Layer_53
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AimB+IgGgEIgHgDQgEgBgKADQgMADgMgDQgMgEgKgJQgUgVAEgbQACgLAFgLQALgSAdgUQgEgEACgHQACgHAFgDIAKgFQAIgDADgCQADgDADgGIAFgJQAEgEAFgCQAFgCAEADQgDgIAGgHQAGgIAIACIAGADIAGABQAFAAAFgFIAJgIQAEgCAOgCQALgBAEgGIAFgJQAFgFAMAFQAOAGAFgDIAJgIQAHgGAKACQAIACAGAIQABgMALgIQAKgHAMACQAUADASAZQAQgHASAOQAMAKALAWQAJgJAOAEQAOAFAEANQAWAHAOAVQAPAUAAAZQAIgEAHAGQAIAFADAJQADAMgHAQIACACIgFADIADgFQgNgIgcAKQgcAJg5ALQgQADgKAAQgPABgLgFQgNgFgDAAQgDAAgEACIgIAEQgOAHgPgCIgWgCQgIABgNAJQgOAKgGADQgJADgQgBIgbAAIghAIQgJACgHAAQgJAAgHgDg");
	this.shape_12.setTransform(2.1045,-124.2749,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2405));

	// Layer_54
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AANA9QgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgPAEgJgDQgGgCgEgFQgEgGAAgGQgDAEgFABQgFAAgEgCQgGgDgGgMQgHgMAFgFQgDAAgCgDQgCgDgBgEQgCgTANgSQAMgSAUgFQAJgCATABQAKAAAFACIAHAEIAIACIAHABQAGABAFAEIABACQALAFACAJQABAGgDAFQgDAFgGAAQAKAHAAANQAAAOgLAGQAFAMgGAHQgDAEgGABQgFAAgDgEQgGAJgGAFQgEADgEAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_13.setTransform(42.8562,-99.0279,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(2405));

	// Layer_55
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AAVBmQgJABgIgGQgHgGgDgKQgKACgIgIQgJgHgBgLQgVgBgJgKQgGgGAAgKQAAgKAHgEQgQgQgEgMQgCgJACgJQACgKAHgEQgNgLACgTQABgUAOgHIgDgBQACgPAagFQASgEAKAFQALAGADAMQAEgGAJACQAJACAFAHQAHALABAYQAHgCAHAEQAGADAFAHQAGAKAEAUIAQBGQAGAZgDALQgCAJgMAQIgXAMQgFADgDAAIgBAAQgLAAgIgXg");
	this.shape_14.setTransform(-32.8968,-40.1797,1.9999,1.9999);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2405));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.8,-150.1,111.1,155.7);


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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(86).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(4).to({startPosition:10},0).wait(4).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(508).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(8).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(5).to({startPosition:9},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(6).to({startPosition:9},0).wait(5).to({startPosition:8},0).wait(7).to({startPosition:9},0).wait(3).to({startPosition:9},0).wait(4).to({startPosition:10},0).wait(3).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(9).to({startPosition:8},0).wait(350).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(7).to({startPosition:6},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(4).to({startPosition:9},0).wait(3).to({startPosition:8},0).wait(22).to({startPosition:12},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:9},0).wait(3).to({startPosition:10},0).wait(5).to({startPosition:9},0).wait(4).to({startPosition:8},0).wait(986));

	// Layer_20
	this.instance_1 = new lib.dfggdfgzrs("synched",37);
	this.instance_1.setTransform(5.45,-42.85,1,1,0,0.1766,-179.8234,-5.3,-45.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2405));

	// _Clip_Group__5
	this.instance_2 = new lib.ClipGroup_5();
	this.instance_2.setTransform(26.2,-43,1,1,0,0,0,6.2,3.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2405));

	// _Clip_Group__1_1
	this.instance_3 = new lib.ClipGroup_1_1();
	this.instance_3.setTransform(-3.35,-43.9,1,1,0,0,0,8.8,4.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2405));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DCB783").s().p("AjYB5QglgMhAgCIAdi8IBuhCIGpAAIAPAPQARAVAMAdQAoBagTCEQg/AHhiAAIgUABQi3AAikgbg");
	this.shape.setTransform(9.9695,-70.5962);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2405));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#343433").s().p("Ag3gCQAagbAjAKQAjAJAPgHQAIgDAAgFIABAHQgBAHgKABIAFABQAFAAAFgGIABAEQAAAFgJADIADADQAEADAGgCQgBADgEACQgIAEgNgFQglgNgUgCQgigDgeAng");
	this.shape_1.setTransform(27.4,-45.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(2405));

	// Layer_6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("AANgKQgggIgxATQgNAGgMgHIgHgJQAGAFAUgGQgLgHgDgJIAAgJQAFAPAUABQgLgFgDgIIAAgHIAHAJQAOAHAngHQAngHArAlQAWATAOAVQg7grgdgHg");
	this.shape_2.setTransform(-4.5875,-46.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2405));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEAkQgiAAgPgPIgIgPIAIgKQALgMANgIQApgYAyAdQgBAPgJANQgSAbglAAIgBAAg");
	this.shape_3.setTransform(26.175,-43.0053);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2405));

	// Layer_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAtQhGgKACgzQAAgMARgJQASgIAZAAQBAABA0A3QghAjg0AAQgLAAgMgBg");
	this.shape_4.setTransform(-3.3028,-43.864);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2405));

	// Layer_10
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D4AD91").s().p("AAKBCQAegYguggQgIgKgHgSQgNgiAGgeIAFAhQAKAmAUATIAKAKQAKAMADALQAJAihDAIg");
	this.shape_5.setTransform(15.185,-36.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(2405));

	// Layer_11
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D4AD91").s().p("AAMAaQgEgSgJgQQgGgKgBgMQgBgNgIgLQAHAAAFALIAHARQAVAggGAxIgFgdg");
	this.shape_6.setTransform(-31.1083,-40.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(2405));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E5BFA4").s().p("AAABlQgsgOgIhXQgEgmAOgdQAMgZATgIQATgIANAOQAOAPgCAjQgCAbALgKQAGgEAGgKIgNCLQgMAGgNAAQgIAAgIgDg");
	this.shape_7.setTransform(-30.735,-39.3305);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2405));

	// Layer_13
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DCB783").s().p("AgjAHIgeAPQgNAGgIgIIAWgZQAdgZAlADQAmAEAbAZQAOAOAGAMQhIgogyATg");
	this.shape_8.setTransform(28.725,-55.8215);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2405));

	// Layer_14
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#DCB783").s().p("ABJATQgXgMgNgEQgygOhdAkIAdgZQAmgcArgDQAzgEAfAiQAQAQAFASQgOgDgUgLg");
	this.shape_9.setTransform(-4.725,-56.7711);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2405));

	// Layer_15
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E5BFA4").s().p("AhsFwQgagVgVgaIgPgXQgqgggWg6QgPgngIg5IgKAKQgSANgWgHQgqgOgNhiQgGgrAPgdQANgaAXgFQAXgFAQAQQARATgCAjQgBAZAFgGQACgEADgJQAPhGAKgiQARg7AkgfQAigeBCgzQAmgiACgYQgGgCgEgGQgFgIAFgFQAFgFAEAPQACAFgBAGQAXAHA6gmQBKgvBbAOQAtAHAfARQASA4AuByQAfBfgiAtQghArABA1QAABcgCAMQgIA0hFBpQglA4gfAfQgpAognAHQgbAFgZAAQhQAAhAgxg");
	this.shape_10.setTransform(0.2104,-41.7149);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2405));

	// Layer_16
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DCB783").s().p("AjDE3QiLg1gFh+QgGi0AfheQAriAB9gnQD2hLCSByQBIA5AXBIQgnDui3CSQg6AthAAfIg1AVQhFgChGgbg");
	this.shape_11.setTransform(-5.2563,-66.504);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2405));

	// Layer_17
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DCB783").s().p("AgiFNQgigggvhJQgcgqgHgaQgIgogLgsQgDgNAAgUIABgiIgCh8QAAgaAFgMQARgnACgQQABgLASgjQAJgSAsgtQAtgvBLgaQBPgbA0ARIgvBBQgtAWgjAyQgjAxgQBBQgUBOAIBkQAGBMAWBoQAKApAZA4QAPAgAABGQhJg1gXgWg");
	this.shape_12.setTransform(-24.425,-57.6629);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(2405));

	// Layer_18
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#373432").s().p("AgEBJQgSgQgGgTIgHgXIgKgSQgGgMgCgIQgBgIADgSIAIgwQAbAIAWASQAXASANAYQANAagBAcQgCAegQAXQgEAFgDgBIADAQQgZgOgLgLg");
	this.shape_13.setTransform(33.1036,-70.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(2405));

	// Layer_19
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#DCB783").s().p("AC0DaQgTgRgPADQhEANhHgIQhFgIhAgbQhBgcgmgoQgggjgPguQgKgeACgeQACghARgYQAMgRAfgYIBOg7IgIgFQASgBA1gRQApgNAcAJQAgALBOASQBEATAfAeQAuAuAdBZQAgBmgqAsQgLALgvBBQgGAHgHAAQgFAAgGgFg");
	this.shape_14.setTransform(13.2875,-75.6322);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2405));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.8,-100.5,83.69999999999999,100.5);


(lib.ilt78lt8l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// iul7t8l78l
	this.instance = new lib.iul7t8l78l("synched",0);
	this.instance.setTransform(-77.05,29.45,1,1,0,0,0,-6,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(83).to({startPosition:0},0).to({regX:-6.1,rotation:-119.3532,x:-74.1,y:37.6},10).wait(53).to({startPosition:0},0).to({regX:-6,rotation:0,x:-77.05,y:29.45},9).wait(494).to({startPosition:0},0).to({rotation:-140.4965,x:-70.85,y:38.95},10).wait(78).to({startPosition:0},0).to({regY:4.1,scaleX:0.9999,scaleY:0.9999,rotation:-125.8107,x:-87,y:39.65},13).wait(72).to({startPosition:0},0).to({regY:4.2,scaleX:1,scaleY:1,rotation:0,x:-77.05,y:29.45},12).wait(7).to({startPosition:0},0).to({regX:-6.1,rotation:-101.7842,x:-83.15,y:38.45},11).wait(34).to({startPosition:0},0).to({regX:-6,rotation:0,x:-77.05,y:29.45},10).wait(344).to({startPosition:0},0).to({regX:-6.2,rotation:-90.5552,x:-83.55,y:37.25},11).wait(59).to({startPosition:0},0).to({regY:4.1,rotation:-99.1332,x:-75.6,y:39.6},10).wait(92).to({startPosition:0},0).to({regX:-6,regY:4.2,rotation:0,x:-77.05,y:29.45},10).wait(983));

	// il87lt78l
	this.instance_1 = new lib.il87lt78l("synched",0);
	this.instance_1.setTransform(-54.35,-95.4,1,1,0,0,0,11.5,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(83).to({startPosition:0},0).to({regX:11.4,rotation:1.4497,x:-49.3,y:-96.4},10).wait(53).to({startPosition:0},0).to({regX:11.5,rotation:0,x:-54.35,y:-95.4},9).wait(494).to({startPosition:0},0).to({regX:11.4,regY:7.1,rotation:-1.985,x:-49.35,y:-97.9},10).wait(78).to({startPosition:0},0).to({regX:11.3,regY:7,rotation:1.7349,x:-56.65,y:-95.55},13).wait(72).to({rotation:1.7349},0).to({regX:11.5,regY:7.2,rotation:0,x:-54.35,y:-95.4},12).wait(7).to({startPosition:0},0).to({regX:11.4,rotation:1.2258,x:-49.9,y:-96.2},11).wait(34).to({startPosition:0},0).to({regX:11.5,rotation:0,x:-54.35,y:-95.4},10).wait(344).to({startPosition:0},0).to({regX:11.4,rotation:1.2258,x:-49.9,y:-96},11).wait(59).to({startPosition:0},0).to({regX:11.3,rotation:-4.1574,x:-54.7,y:-96.1},10).wait(92).to({rotation:-4.1574},0).to({regX:11.5,rotation:0,x:-54.35,y:-95.4},10).wait(983));

	// Layer_2
	this.instance_2 = new lib.uil6t8l678l8l("synched",0);
	this.instance_2.setTransform(12.05,-119.45,1.5105,1.5105,0,0,0,11.2,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(83).to({startPosition:83},0).to({rotation:1.4495,x:17.75,y:-118.75,startPosition:93},10).wait(53).to({startPosition:146},0).to({rotation:0,x:12.05,y:-119.45,startPosition:155},9).wait(494).to({startPosition:649},0).to({regX:11.3,rotation:-0.4821,x:18.95,y:-120.9,startPosition:659},10).wait(78).to({startPosition:737},0).to({rotation:-2.7197,x:9.55,y:-121.35,startPosition:750},13).wait(72).to({startPosition:822},0).to({regX:11.2,rotation:0,x:12.05,y:-119.45,startPosition:834},12).wait(7).to({startPosition:841},0).to({regX:11.3,rotation:-0.7762,x:17.65,y:-120.25,startPosition:852},11).wait(34).to({startPosition:886},0).to({regX:11.2,rotation:0,x:12.05,y:-119.45,startPosition:896},10).wait(344).to({startPosition:1240},0).to({rotation:-0.5076,x:17.6,y:-119.9,startPosition:1251},11).wait(59).to({startPosition:1310},0).to({rotation:-2.9167,x:12.95,y:-121.35,startPosition:1320},10).wait(92).to({startPosition:1412},0).to({rotation:0,x:12.05,y:-119.45,startPosition:1422},10).wait(983));

	// iul7l78l
	this.instance_3 = new lib.iul7l78l("synched",0);
	this.instance_3.setTransform(0.7,167.3,1,1,0,0,0,0,103.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(83).to({startPosition:0},0).to({startPosition:0},10).wait(53).to({startPosition:0},0).to({startPosition:0},9).wait(494).to({startPosition:0},0).to({startPosition:0},10).wait(78).to({startPosition:0},0).to({startPosition:0},13).wait(72).to({startPosition:0},0).to({startPosition:0},12).wait(7).to({startPosition:0},0).to({startPosition:0},11).wait(34).to({startPosition:0},0).to({startPosition:0},10).wait(344).to({startPosition:0},0).to({startPosition:0},11).wait(59).to({startPosition:0},0).to({startPosition:0},10).wait(92).to({startPosition:0},0).to({startPosition:0},10).wait(983));

	// uil_y7l7t8l78t
	this.instance_4 = new lib.uily7l7t8l78t("synched",0);
	this.instance_4.setTransform(-2.85,120.8,1,1,0,0,0,3,115);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(83).to({startPosition:0},0).to({rotation:1.4497,x:-3.15,y:121},10).wait(53).to({startPosition:0},0).to({rotation:0,x:-2.85,y:120.8},9).wait(494).to({startPosition:0},0).to({rotation:1.7331,x:-3.95,y:120.55},10).wait(78).to({startPosition:0},0).to({rotation:-0.5045,x:-3.9,y:120.7},13).wait(72).to({startPosition:0},0).to({rotation:0,x:-2.85,y:120.8},12).wait(7).to({startPosition:0},0).to({rotation:1.2258,x:-2.95,y:120.95},11).wait(34).to({startPosition:0},0).to({rotation:0,x:-2.85,y:120.8},10).wait(344).to({startPosition:0},0).to({rotation:1.2258,x:-2.95,y:121.15},11).wait(59).to({startPosition:0},0).to({rotation:0.042,x:-3,y:121},10).wait(92).to({rotation:0.042},0).to({rotation:0,x:-2.85,y:120.8},10).wait(983));

	// ilt7878l
	this.instance_5 = new lib.ilt7878l("synched",0);
	this.instance_5.setTransform(-50.05,-248.8,1,1,0,0,0,-2,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(83).to({startPosition:0},0).to({regX:-2.1,rotation:1.4497,x:-41.1,y:-249.65},10).wait(53).to({startPosition:0},0).to({regX:-2,rotation:0,x:-50.05,y:-248.8},9).wait(494).to({startPosition:0},0).to({regX:-2.1,regY:6.1,rotation:-0.4817,x:-44.4,y:-249.8},10).wait(78).to({startPosition:0},0).to({rotation:-2.7192,x:-58.8,y:-247.7},13).wait(72).to({startPosition:0},0).to({regX:-2,regY:6.2,rotation:0,x:-50.05,y:-248.8},12).wait(7).to({startPosition:0},0).to({regX:-2.1,regY:6.1,rotation:-0.7755,x:-46.35},11).wait(34).to({startPosition:0},0).to({regX:-2,regY:6.2,rotation:0,x:-50.05},10).wait(344).to({startPosition:0},0).to({regX:-2.1,rotation:-0.5071,x:-45.7,y:-248.7},11).wait(59).to({startPosition:0},0).to({regX:-2.2,regY:6,rotation:-2.9152,x:-55.85,y:-247.55},10).wait(92).to({startPosition:0},0).to({regX:-2,regY:6.2,rotation:0,x:-50.05,y:-248.8},10).wait(983));

	// o_y89tyu
	this.instance_6 = new lib.oy89tyu("synched",0);
	this.instance_6.setTransform(37.2,-102.05,1,1,0,0,0,27.5,8.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(83).to({startPosition:0},0).to({regX:27.6,rotation:1.4497,x:42.55,y:-100.75},10).wait(53).to({startPosition:0},0).to({regX:27.5,rotation:0,x:37.2,y:-102.05},9).wait(494).to({startPosition:0},0).to({regX:27.6,rotation:1.7331,x:42.9,y:-100.95},10).wait(78).to({startPosition:0},0).to({regY:8.2,rotation:-0.5045,x:34.15,y:-102.3},13).wait(72).to({startPosition:0},0).to({regX:27.5,regY:8.1,rotation:0,x:37.2,y:-102.05},12).wait(7).to({startPosition:0},0).to({regX:27.6,rotation:1.2258,x:41.95,y:-100.9},11).wait(34).to({startPosition:0},0).to({regX:27.5,rotation:0,x:37.2,y:-102.05},10).wait(344).to({startPosition:0},0).to({regX:27.6,rotation:-0.7248,x:41.85,y:-100.9},11).wait(59).to({startPosition:0},0).to({regY:8,rotation:-0.4581,x:37.25,y:-101.8},10).wait(92).to({startPosition:0},0).to({regX:27.5,regY:8.1,rotation:0,x:37.2,y:-102.05},10).wait(983));

	// o_y89_y89_
	this.instance_7 = new lib.oy89y89("synched",0);
	this.instance_7.setTransform(41.25,34.55,1,1,0,0,0,15.3,16.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(83).to({startPosition:0},0).to({regX:15.5,rotation:1.4497,x:43.2,y:35.9},10).wait(53).to({startPosition:0},0).to({regX:15.3,rotation:0,x:41.25,y:34.55},9).wait(494).to({startPosition:0},0).to({rotation:1.7331,x:42.75,y:35.65},10).wait(78).to({startPosition:0},0).to({startPosition:0},13).wait(72).to({startPosition:0},0).to({rotation:0,x:41.25,y:34.55},12).wait(7).to({startPosition:0},0).to({rotation:1.2258,x:42.95,y:35.75},11).wait(34).to({startPosition:0},0).to({rotation:0,x:41.25,y:34.55},10).wait(344).to({startPosition:0},0).to({regX:15.4,regY:17,rotation:-0.7248,x:47.6,y:35.65},11).wait(59).to({startPosition:0},0).to({regX:15.5,regY:17.1,rotation:-0.4581,x:42.45,y:34.85},10).wait(92).to({startPosition:0},0).to({regX:15.3,regY:16.9,rotation:0,x:41.25,y:34.55},10).wait(983));

	// ui_lt7_78l
	this.instance_8 = new lib.uilt778l("synched",0);
	this.instance_8.setTransform(33.65,-197.3,1,1,0,0,0,4.5,4.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(83).to({startPosition:0},0).to({rotation:1.4497,x:41.35,y:-196.05},10).wait(53).to({startPosition:0},0).to({rotation:0,x:33.65,y:-197.3},9).wait(494).to({startPosition:0},0).to({rotation:-0.4817,x:39.7,y:-198.95},10).wait(78).to({startPosition:0},0).to({regX:4.6,regY:4.6,rotation:-2.7192,x:27.25,y:-200.25},13).wait(72).to({startPosition:0},0).to({regX:4.5,regY:4.7,rotation:0,x:33.65,y:-197.3},12).wait(7).to({startPosition:0},0).to({regY:4.6,rotation:-0.7755,x:38.05,y:-198.45},11).wait(34).to({startPosition:0},0).to({regY:4.7,rotation:0,x:33.65,y:-197.3},10).wait(344).to({startPosition:0},0).to({rotation:-0.5071,x:38.5,y:-197.9},11).wait(59).to({startPosition:0},0).to({regY:4.6,rotation:-2.9152,x:30.45,y:-200.3},10).wait(92).to({startPosition:0},0).to({regY:4.7,rotation:0,x:33.65,y:-197.3},10).wait(983));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.8,-272.4,194.8,543.0999999999999);


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
	this.instance = new lib.fgryjdsrtyjrsyj_1("single",6);
	this.instance.setTransform(0.9,-29.55,2.2899,2.2149,0,5.3419,4.9942,2.8,-2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(238).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(6).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(569).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(5).to({startPosition:8},0).wait(1515).to({startPosition:8},0).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape.setTransform(-50.6918,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F4E4E").s().p("AAAAPQgDgbgIgJIANAFQANAJgDATQgCAFgCADQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBAAQgCAAgDgHg");
	this.shape_1.setTransform(53.3586,-62.8899,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEIgCANIhZAHg");
	this.shape_2.setTransform(30.4992,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape_3.setTransform(20.048,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4F4E4E").s().p("AgZAJIAAgSIAOAIQASADATgLIAAASg");
	this.shape_4.setTransform(-15.9993,-65.3268,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_7
	this.instance_1 = new lib.Path_0();
	this.instance_1.setTransform(-7.65,-64.15,1.9345,1.9345,0,0,0,1.2,2.2);
	this.instance_1.alpha = 0.6016;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgeAAgUgWQgWgVAAgdIAAgPQAAgHAFgFQAFgGAIAAIBtAAQAIAAAFAGQAFAFAAAHIAAAPQAAAdgVAVQgVAWgfAAg");
	this.shape_5.setTransform(3.4006,-60.6382,1.9345,1.9345);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.instance_1}]}).to({state:[{t:this.shape_5},{t:this.instance_1}]},2404).to({state:[]},1).to({state:[{t:this.shape_5},{t:this.instance_1}]},1).wait(1331));

	// Layer_8
	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(-46.65,-64.05,1.9345,1.9345,0,0,0,1.2,2);
	this.instance_2.alpha = 0.6016;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgdAAgWgWQgVgVAAgeIAAgOQAAgHAFgFQAGgGAHAAIBtAAQAHAAAGAGQAFAFAAAHIAAAOQAAAegVAVQgWAWgeAAg");
	this.shape_6.setTransform(-35.7243,-60.2513,1.9345,1.9345);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.instance_2}]}).to({state:[{t:this.shape_6},{t:this.instance_2}]},2404).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.instance_2}]},1).wait(1331));

	// Layer_31
	this.instance_3 = new lib.tyiktriruiu("synched",0);
	this.instance_3.setTransform(-7.4,-59.3,0.9299,0.899,0.0515,0,0,7.8,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2404).to({startPosition:4},0).to({_off:true},1).wait(1).to({_off:false,startPosition:6},0).wait(1331));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("Ah7BCQgTgOgTgVIgOgRICrhsICrAKIAJA0QADAwgXgQQgWgNgbAWQgZAcgIACQgVAHgkATIgfASQgSAMgVAAQggAAgmgdg");
	this.shape_7.setTransform(-6.471,-116.4751,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7EFE4").s().p("AgHAHQgCgDAAgEQAAgDACgDQADgDAEgBQAEABAEADQACADAAADQAAAEgCADQgEAEgEAAQgEAAgDgEg");
	this.shape_8.setTransform(43.515,-43.65,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF8E79").s().p("AgVAeIARgZQAOgNAHgbIAEgYQAFAWgKAYQgFANgGAHQghAYAWARQAKAJARADQgwgFAGgZg");
	this.shape_9.setTransform(-21.2596,-51.4885,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AF8E79").s().p("AgEgTQALgTAKgBQgHAKgEAIIgHAQQgIAKgCANIgEAWQgEgjAPgYg");
	this.shape_10.setTransform(44.7209,-56.4238,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_20
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CDA688").s().p("AgYBKIgLgDIgJhkIAJAKQAIAHgCgTQgBgaAMgLQALgKAPAGQApAOgFA6QgFBAgmAKQgFACgHAAIgNgCg");
	this.shape_11.setTransform(44.5353,-55.3947,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AAwASIgVgLQgkgQg1AbIAPgSQAUgSAbgBQAcgBAUATQALAIAEAKQgDADgEAAQgEAAgEgCg");
	this.shape_12.setTransform(-40.5308,-80.0868,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1489).to({rotation:-17.698,x:-42.2736,y:-83.6077},0).wait(51).to({rotation:0,x:-40.5308,y:-80.0868},0).wait(864).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_23
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("Ag/AAQAUgaAlABQAfAAAeASQAPAHAIAJQhGgVgjANQgfAVgTAFg");
	this.shape_13.setTransform(7.0806,-80.7134,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1489).to({rotation:-7.461,x:6.2595,y:-77.1127},0).wait(51).to({rotation:0,x:7.0806,y:-80.7134},0).wait(864).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_24
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CDA688").s().p("AhOEmQg2gJgxhIQgqg+gJg3QgBgHAAhGQAAgngYgfQgZghAWhGQAihTANgpIA4gRQBCgKA2AiQAqAcAQgFIABgIQADgLADADQAEAEgEAGQgCAEgFACQACARAcAZQAUASA0ApQAaAXANArQAHAYALAzIAJAJQAIAHgBgSQgCgaANgNQAMgLARAEQAqALgIBBQgKBIgkAIQgMACgMgEIgLgFQgFApgIAWQgOAjgeAXQgUAagkAWQg3Aig7AAQgUAAgUgEg");
	this.shape_14.setTransform(0.8639,-59.8614,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_25
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#292929").s().p("AhVC5QiGhqgciuIAPgiQAVgoAigdQBphcCzA3QBbAcAgBnQAXBKgFCHQgEBbhlAnQggANglAFIggADQg8gShDg1g");
	this.shape_15.setTransform(7.5073,-95.304,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_26
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#AF8E79").s().p("AgfgIQA8goBLgmIAHAFQgWBbgaAWQgxApg3AKIgtAEQhDgQB6hPg");
	this.shape_16.setTransform(6.7922,-16.7476,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_27
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#292929").s().p("AghDhQASgqAHgdQAlihgZhkQgLgvgZgkQgagkghgRIgigvQApgNA2AKQA5AKAeAgQASASAVAfQARAagCAIQgEALANAdQAEAKABAbQABAYAABMIAAAYQABAPgDAJIgNA9QgGATgUAfQgiA1gZAXQgQAQg1AnQgBgzALgXg");
	this.shape_17.setTransform(34.4749,-87.9723,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_28
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEQgCAGAAAHIhZAHg");
	this.shape_18.setTransform(-43.1437,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_29
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#373432").s().p("AgUA7QgDACgDgFQgMgPAAgWQgBgVAJgTQATgkArgNIAGAjQACANgBAGQgCAKgLARIgFARQgEANgOAMQgHAIgSALg");
	this.shape_19.setTransform(-46.556,-99.0031,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	// Layer_30
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#292929").s().p("AiUCmQgkgxgGgGQgfggAYhLQAVhAAhghQAngnByglQATgGAfASQAjAWAQAAIgGAFIA5ArQAYARAIAMQAYAjgQAyQgLAhgYAaQgaAcgxAWQhfAphmgUQgLgCgOAMQgFAEgEAAQgFAAgEgFg");
	this.shape_20.setTransform(-18.5959,-108.2377,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(2404).to({_off:true},1).wait(1).to({_off:false},0).wait(1331));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-145.7,117.9,145.7);


(lib.uiltg768lt7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uil_glt78lt78l
	this.instance = new lib.uilglt78lt78l("synched",0);
	this.instance.setTransform(10.9,-31.55,1.0591,1.0591,0,-9.5273,170.4727,-9.1,-12.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(840).to({startPosition:840},0).to({skewX:3.4122,skewY:183.4122,x:17.4,y:-22.85,startPosition:851},11).wait(31).to({skewX:3.4122,startPosition:882},0).to({skewX:-9.5273,skewY:170.4727,x:10.9,y:-31.55,startPosition:892},10).wait(16).to({startPosition:908},0).to({regX:-9,skewX:-7.5731,skewY:172.4269,x:3.85,y:-31.7,startPosition:916},8).wait(169).to({startPosition:1085},0).to({regX:-9.1,regY:-12.3,skewX:-9.5743,skewY:170.4257,x:8.4,y:-31.45,startPosition:1097},12).wait(108).to({startPosition:1205},0).to({regY:-12.2,skewX:-9.5273,skewY:170.4727,x:10.9,y:-31.55,startPosition:1215},10).wait(286).to({startPosition:1501},0).to({skewX:-12.4864,skewY:167.5136,x:5.4,y:-32,startPosition:1512},11).wait(147).to({startPosition:1659},0).to({regY:-12.3,skewX:-9.2229,skewY:170.7771,x:-2.65,y:-32.4,startPosition:1673},14).wait(157).to({startPosition:1830},0).to({regX:-9,regY:-12.4,scaleX:1.059,scaleY:1.059,skewX:-14.2208,skewY:165.7792,x:4,y:-32.15,startPosition:1841},11).wait(189).to({startPosition:2030},0).to({regX:-9.1,regY:-12.5,skewX:-8.5014,skewY:171.4986,x:10.8,y:-31.6,startPosition:2042},12).wait(106).to({startPosition:2148},0).to({skewX:-13.679,skewY:166.321,x:2.05,y:-32,startPosition:2161},13).wait(126).to({startPosition:2287},0).to({regY:-12.6,skewX:-7.7738,skewY:172.2262,x:8.5,y:-31.95,startPosition:2299},12).wait(69).to({startPosition:2368},0).to({regY:-12.2,scaleX:1.0591,scaleY:1.0591,skewX:-9.5273,skewY:170.4727,x:10.9,y:-31.55,startPosition:2379},11).wait(26));

	// o_y89_89_
	this.instance_1 = new lib.oy8989("synched",0);
	this.instance_1.setTransform(-15.5,198.5,1,1,0,0,0,-7.3,12.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(840).to({startPosition:0},0).to({startPosition:0},11).wait(31).to({startPosition:0},0).to({startPosition:0},10).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(169).to({startPosition:0},0).to({startPosition:0},12).wait(108).to({startPosition:0},0).to({startPosition:0},10).wait(286).to({startPosition:0},0).to({startPosition:0},11).wait(147).to({startPosition:0},0).to({startPosition:0},14).wait(157).to({startPosition:0},0).to({startPosition:0},11).wait(189).to({startPosition:0},0).to({startPosition:0},12).wait(106).to({startPosition:0},0).to({startPosition:0},13).wait(126).to({startPosition:0},0).to({startPosition:0},12).wait(69).to({startPosition:0},0).to({startPosition:0},11).wait(26));

	// uil7t8lt78l
	this.instance_2 = new lib.uil7t8lt78l_1("synched",0);
	this.instance_2.setTransform(-84.6,193.3,1,1,0,0,0,-25.1,14.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(840).to({startPosition:0},0).to({startPosition:0},11).wait(31).to({startPosition:0},0).to({startPosition:0},10).wait(16).to({startPosition:0},0).to({startPosition:0},8).wait(169).to({startPosition:0},0).to({startPosition:0},12).wait(108).to({startPosition:0},0).to({startPosition:0},10).wait(286).to({startPosition:0},0).to({startPosition:0},11).wait(147).to({startPosition:0},0).to({startPosition:0},14).wait(157).to({startPosition:0},0).to({startPosition:0},11).wait(189).to({startPosition:0},0).to({startPosition:0},12).wait(106).to({startPosition:0},0).to({startPosition:0},13).wait(126).to({startPosition:0},0).to({startPosition:0},12).wait(69).to({startPosition:0},0).to({startPosition:0},11).wait(26));

	// uil_7y_7yy98_
	this.instance_3 = new lib.uil7y7yy98("synched",0);
	this.instance_3.setTransform(-25.65,212.4,1,1,0,0,0,-12.2,88.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(840).to({startPosition:0},0).to({regY:88.8,rotation:1.4838,x:-25.1,y:212.15},11).wait(31).to({startPosition:0},0).to({regY:88.7,rotation:0,x:-25.65,y:212.4},10).wait(16).to({startPosition:0},0).to({rotation:-1.4838,x:-26.3,y:213},8).wait(169).to({startPosition:0},0).to({rotation:-0.5342,x:-25.85,y:212.85},12).wait(108).to({startPosition:0},0).to({rotation:0,x:-25.65,y:212.4},10).wait(286).to({startPosition:0},0).to({rotation:-1.2258,x:-26,y:212.65},11).wait(147).to({startPosition:0},0).to({rotation:-2.9292,x:-26.75,y:213.1},14).wait(157).to({startPosition:0},0).to({rotation:-1.4453,x:-26.4,y:212.75},11).wait(189).to({startPosition:0},0).to({regY:88.8,rotation:0.0376,x:-26,y:212.55},12).wait(106).to({rotation:0.0376},0).to({regY:88.9,rotation:-1.9125,x:-26.45,y:213.25},13).wait(126).to({startPosition:0},0).to({rotation:-0.4625,x:-26.15,y:212.55},12).wait(69).to({rotation:-0.4625},0).to({regY:88.7,rotation:0,x:-25.65,y:212.4},11).wait(26));

	// uo_y9_y89_
	this.instance_4 = new lib.uoy9y89("synched",0);
	this.instance_4.setTransform(33.35,23.25,1,1,0,0,0,17.1,14);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(840).to({startPosition:0},0).to({rotation:1.4838,x:38.75,y:24.5},11).wait(31).to({startPosition:0},0).to({rotation:0,x:33.35,y:23.25},10).wait(16).to({startPosition:0},0).to({regX:17.2,regY:14.1,rotation:-1.4838,x:27.8,y:22.5},8).wait(169).to({startPosition:0},0).to({rotation:-0.5342,x:31.4,y:23.25},12).wait(108).to({startPosition:0},0).to({regX:17.1,regY:14,rotation:0,x:33.35},10).wait(286).to({startPosition:0},0).to({regX:17.2,rotation:-1.2258,x:29,y:22.3},11).wait(147).to({startPosition:0},0).to({regY:14.1,rotation:-2.9292,x:22.55,y:21.3},14).wait(157).to({startPosition:0},0).to({rotation:-1.4453,x:27.8,y:22.3},11).wait(189).to({startPosition:0},0).to({rotation:0.0376,x:33.1,y:23.45},12).wait(106).to({rotation:0.0376},0).to({rotation:-1.9125,x:26.15,y:22.25},13).wait(126).to({startPosition:0},0).to({regX:17.3,rotation:-0.4625,x:31.3,y:22.9},12).wait(69).to({rotation:-0.4625},0).to({regX:17.1,regY:14,rotation:0,x:33.35,y:23.25},11).wait(26));

	// iop_80_089u_u09_
	this.instance_5 = new lib.iop80089uu09("synched",0);
	this.instance_5.setTransform(79.7,132.1,1,1,0,0,0,15.7,12.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(840).to({startPosition:0},0).to({rotation:1.4838,x:82.2,y:134.5},11).wait(31).to({startPosition:0},0).to({rotation:0,x:79.7,y:132.1},10).wait(16).to({startPosition:0},0).to({rotation:-1.4838,x:76.9,y:130.05},8).wait(169).to({startPosition:0},0).to({rotation:-0.5342,x:78.6,y:131.55},12).wait(108).to({startPosition:0},0).to({rotation:0,x:79.7,y:132.1},10).wait(286).to({startPosition:0},0).to({rotation:-1.2258,x:77.55,y:130.1},11).wait(147).to({startPosition:0},0).to({rotation:-2.9292,x:74.3,y:127.55},14).wait(157).to({startPosition:0},0).to({regX:15.8,rotation:-1.4453,x:76.85,y:129.85},11).wait(189).to({startPosition:0},0).to({rotation:0.0376,x:79.35,y:132.2},12).wait(106).to({rotation:0.0376},0).to({rotation:-1.9125,x:76.05,y:129.3},13).wait(126).to({startPosition:0},0).to({startPosition:0},12).wait(69).to({startPosition:0},0).to({regX:15.7,rotation:0,x:79.7,y:132.1},11).wait(26));

	// ui_y7_y89_89_
	this.instance_6 = new lib.uiy7y8989("synched",0);
	this.instance_6.setTransform(-63.8,122.2,0.9999,0.9999,-133.5297,0,0,-13.2,-6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(840).to({startPosition:0},0).to({regY:-6.4,rotation:-132.046,x:-61.05,y:121.05},11).wait(31).to({startPosition:0},0).to({regY:-6.2,rotation:-133.5297,x:-63.8,y:122.2},10).wait(16).to({startPosition:0},0).to({regX:-13.3,rotation:-27.283,x:-79,y:129.55},8).wait(169).to({startPosition:0},0).to({regX:-13.4,rotation:3.0653,x:-103.7,y:118.55},12).wait(108).to({rotation:3.0653},0).to({regX:-13.2,rotation:-133.5297,x:-63.8,y:122.2},10).wait(286).to({startPosition:0},0).to({regX:-13.3,rotation:-9.0044,x:-85.4,y:131.2},11).wait(147).to({rotation:-9.0044},0).to({regX:-13.4,rotation:-17.1953,x:-80.5,y:134.7},14).wait(157).to({startPosition:0},0).to({regX:-13.5,regY:-6,rotation:-3.2467,x:-88.6,y:130.75},11).wait(189).to({rotation:-3.2467},0).to({scaleX:0.9998,scaleY:0.9998,rotation:-5.2249,x:-93.35,y:126.35},12).wait(106).to({startPosition:0},0).to({regX:-13.6,regY:-5.8,rotation:-4.7063,x:-87.5,y:132.1},13).wait(126).to({startPosition:0},0).to({regX:-13.7,regY:-5.7,rotation:-10.1725,x:-81.05,y:131},12).wait(69).to({startPosition:0},0).to({regX:-13.2,regY:-6.2,scaleX:0.9999,scaleY:0.9999,rotation:-133.5297,x:-63.8,y:122.2},11).wait(26));

	// uo_y79_y89_9
	this.instance_7 = new lib.uoy79y899("synched",0);
	this.instance_7.setTransform(-52.6,24.2,1,1,-13.2459,0,0,-31.8,18.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(840).to({startPosition:0},0).to({regX:-31.9,rotation:-11.7629,x:-47.3,y:23.25},11).wait(31).to({startPosition:0},0).to({regX:-31.8,rotation:-13.2459,x:-52.6,y:24.2},10).wait(16).to({startPosition:0},0).to({regX:-31.9,rotation:-8.756,x:-60.4,y:24.6},8).wait(169).to({startPosition:0},0).to({regY:18.5,rotation:6.1495,x:-58.6,y:22.05},12).wait(108).to({startPosition:0},0).to({regX:-31.8,regY:18.4,rotation:-13.2459,x:-52.6,y:24.2},10).wait(286).to({rotation:-13.2459},0).to({regX:-31.9,regY:18.5,rotation:-7.0296,x:-59.15,y:24.55},11).wait(147).to({startPosition:0},0).to({regY:18.6,scaleX:0.9999,scaleY:0.9999,rotation:-12.4787,x:-64.4,y:26.1},14).wait(157).to({startPosition:0},0).to({rotation:-6.0186,x:-60.25,y:24.55},11).wait(189).to({startPosition:0},0).to({regX:-32,regY:18.7,rotation:-0.7887,x:-55.65,y:23.25},12).wait(106).to({rotation:-0.7887},0).to({rotation:-7.2168,x:-61.45,y:25.3},13).wait(126).to({rotation:-7.2168},0).to({regX:-32.1,regY:18.8,rotation:-7.7168,x:-56,y:24},12).wait(69).to({startPosition:0},0).to({regX:-31.8,regY:18.4,scaleX:1,scaleY:1,rotation:-13.2459,x:-52.6,y:24.2},11).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-211.1,-173.9,350.5,563.6);


(lib.uil7t8l8t7 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-16.65,-112.3,1.0751,1.0751,0,0,180,-13.2,-3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(238).to({startPosition:238},0).to({skewX:-1.4835,skewY:178.5165,x:-21.95,y:-112.5,startPosition:249},11).wait(22).to({startPosition:271},0).to({skewX:0,skewY:180,x:-16.65,y:-112.3,startPosition:283},12).wait(555).to({startPosition:838},0).to({regX:-13.1,scaleX:1.075,scaleY:1.075,skewX:-11.9661,skewY:168.0339,x:-20.55,y:-119.65,startPosition:848},10).wait(35).to({startPosition:883},0).to({regX:-13.2,scaleX:1.0751,scaleY:1.0751,skewX:0,skewY:180,x:-16.65,y:-112.3,startPosition:893},10).wait(1512));

	// iul78l78l
	this.instance_1 = new lib.iul78l78l("synched",0);
	this.instance_1.setTransform(-92.7,-87.05,1,1,0,0,0,-2.1,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-97.3,y:-85.3},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-92.7,y:-87.05},12).wait(555).to({startPosition:0},0).to({rotation:-1.4838,x:-98.55,y:-85.25},10).wait(35).to({startPosition:0},0).to({rotation:0,x:-92.7,y:-87.05},10).wait(1512));

	// uo_y89_89_
	this.instance_2 = new lib.uoy8989("synched",0);
	this.instance_2.setTransform(-24.35,78.2,1,1,0,0,0,-117.4,9.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-24.75,y:78.1},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-24.35,y:78.2},12).wait(555).to({startPosition:0},0).to({rotation:-1.4838,x:-26,y:78.15},10).wait(35).to({startPosition:0},0).to({rotation:0,x:-24.35,y:78.2},10).wait(1512));

	// iul78l7t8
	this.instance_3 = new lib.iul78l7t8("synched",0);
	this.instance_3.setTransform(-81,-128.35,1,1,0,0,0,-2,1.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-86.65,y:-126.9},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-81,y:-128.35},12).wait(555).to({startPosition:0},0).to({rotation:-10.2043,x:-91.35,y:-122.6},10).wait(35).to({startPosition:0},0).to({rotation:0,x:-81,y:-128.35},10).wait(1512));

	// uily79lt789l
	this.instance_4 = new lib.uily79lt789l("synched",0);
	this.instance_4.setTransform(-38.2,71.2,1,1,0,0,0,7,113);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-38.7,y:71.45},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-38.2,y:71.2},12).wait(555).to({startPosition:0},0).to({rotation:-1.4838,x:-39.95,y:71.5},10).wait(35).to({startPosition:0},0).to({rotation:0,x:-38.2,y:71.2},10).wait(1512));

	// ou_y89_y89_
	this.instance_5 = new lib.ouy89y89("synched",0);
	this.instance_5.setTransform(-53.65,-198);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-61.15,y:-197.2},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-53.65,y:-198},12).wait(555).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-11.9665,x:-74.55,y:-195.95},10).wait(35).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-53.65,y:-198},10).wait(1512));

	// uil7l7t8l7t8l
	this.instance_6 = new lib.uil7l7t8l7t8l("synched",0);
	this.instance_6.setTransform(-1.6,-103.2,1,1,0,0,0,10.8,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-6.65,y:-103.8},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-1.6,y:-103.2},12).wait(555).to({startPosition:0},0).to({regY:7.3,rotation:-4.9844,x:-3.9,y:-114.05},10).wait(35).to({startPosition:0},0).to({regY:7.4,rotation:0,x:-1.6,y:-103.2},10).wait(1512));

	// uio_y79_y978_
	this.instance_7 = new lib.uioy79y978("synched",0);
	this.instance_7.setTransform(8.25,-72.7,1,1,0,0,0,26.4,22.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(238).to({startPosition:0},0).to({regY:22.5,rotation:-1.4838,x:4,y:-73.65},11).wait(22).to({startPosition:0},0).to({regY:22.6,rotation:0,x:8.25,y:-72.7},12).wait(555).to({startPosition:0},0).to({regY:22.5,rotation:-1.4838,x:2.75,y:-73.6},10).wait(35).to({startPosition:0},0).to({regY:22.6,rotation:0,x:8.25,y:-72.7},10).wait(1512));

	// ilt78lt78l8tl
	this.instance_8 = new lib.ilt78lt78l8tl("synched",0);
	this.instance_8.setTransform(-45.95,-240.6,1,1,0,0,0,-7.2,-79.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(238).to({startPosition:0},0).to({rotation:-1.4838,x:-54.55,y:-239.95},11).wait(22).to({startPosition:0},0).to({rotation:0,x:-45.95,y:-240.6},12).wait(555).to({startPosition:0},0).to({regY:-79.8,rotation:-11.9665,x:-75.8,y:-239.2},10).wait(35).to({startPosition:0},0).to({regY:-79.7,rotation:0,x:-45.95,y:-240.6},10).wait(1512));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126.7,-266.2,253.3,533.3);


(lib.uo8u98y98y9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ilt78lt8l("synched",0);
	this.instance.setTransform(-90.65,190.75,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({regY:0,scaleX:1.5417,scaleY:1.5417,x:53.25,y:216.25,startPosition:19},0).wait(155).to({regY:-0.1,scaleX:1,scaleY:1,x:-19.2,y:180.9,startPosition:174},0).wait(1272).to({regX:0,regY:0,scaleX:1.3537,scaleY:1.3537,x:29.5,y:177.35,startPosition:1446},0).wait(958).to({startPosition:2404},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(34));

	// Layer_4
	this.instance_1 = new lib.uoy89y89("synched",0);
	this.instance_1.setTransform(-298.65,290.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({regX:-0.1,regY:-0.1,scaleX:1.5417,scaleY:1.5417,x:-267.6,y:370.2,startPosition:19},0).wait(155).to({regX:0,regY:0,scaleX:1,scaleY:1,x:-227.2,y:280.95,startPosition:174},0).wait(1272).to({scaleX:1.3537,scaleY:1.3537,x:-252.15,y:312.65,startPosition:1446},0).wait(958).to({startPosition:2404},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(34));

	// jktyfrukt67k
	this.instance_2 = new lib.jktyfrukt67k("synched",0);
	this.instance_2.setTransform(264.75,154.3,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},19).wait(2421));

	// Layer_6
	this.instance_3 = new lib.uil7t8l8t7("synched",0);
	this.instance_3.setTransform(-159.1,72.8,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({scaleX:1.5417,scaleY:1.5417,x:-52.3,y:34.25,startPosition:19},0).wait(155).to({scaleX:1,scaleY:1,x:-87.65,y:62.95,startPosition:174},0).wait(1272).to({scaleX:1.3537,scaleY:1.3537,x:-63.25,y:17.55,startPosition:1446},0).wait(958).to({startPosition:2404},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(34));

	// Layer_10
	this.instance_4 = new lib.uiltg768lt7("synched",0);
	this.instance_4.setTransform(101.35,96.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(19).to({scaleX:1.5417,scaleY:1.5417,x:349.2,y:70.25,startPosition:19},0).wait(155).to({scaleX:1,scaleY:1,x:172.8,y:86.3,startPosition:174},0).wait(1272).to({scaleX:1.3537,scaleY:1.3537,x:289.25,y:49.15,startPosition:1446},0).wait(958).to({startPosition:2404},0).to({_off:true},1).wait(1).to({_off:false,startPosition:1},0).wait(34));

	// Layer_13
	this.instance_5 = new lib.uil7yl78l78tl("synched",0);
	this.instance_5.setTransform(162.3,-147.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(19).to({scaleX:1.5417,scaleY:1.5417,x:443.15,y:-305.65},0).wait(155).to({scaleX:1,scaleY:1,x:233.75,y:-157.6},0).wait(1272).to({scaleX:1.3537,scaleY:1.3537,x:371.75,y:-280.9},0).wait(958).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-915.1,-1679.3,2716.5,2748.8999999999996);


// stage content:
(lib.m1l1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,174,366,566,838,1019,1225,1351,1654,1827,2029,2148,2286,2404];
	this.streamSoundSymbolsList[0] = [{id:"audiocut1",startFrame:0,endFrame:174,loop:1,offset:0}];
	this.streamSoundSymbolsList[174] = [{id:"audiocut2",startFrame:174,endFrame:366,loop:1,offset:0}];
	this.streamSoundSymbolsList[366] = [{id:"audiocut3",startFrame:366,endFrame:566,loop:1,offset:0}];
	this.streamSoundSymbolsList[566] = [{id:"audiocut4",startFrame:566,endFrame:838,loop:1,offset:0}];
	this.streamSoundSymbolsList[838] = [{id:"audiocut5",startFrame:838,endFrame:1019,loop:1,offset:0}];
	this.streamSoundSymbolsList[1019] = [{id:"audiocut6",startFrame:1019,endFrame:1225,loop:1,offset:0}];
	this.streamSoundSymbolsList[1225] = [{id:"audiocut7",startFrame:1225,endFrame:1351,loop:1,offset:0}];
	this.streamSoundSymbolsList[1351] = [{id:"audiocut8",startFrame:1351,endFrame:1654,loop:1,offset:0}];
	this.streamSoundSymbolsList[1654] = [{id:"audiocut9",startFrame:1654,endFrame:1827,loop:1,offset:0}];
	this.streamSoundSymbolsList[1827] = [{id:"audiocut10",startFrame:1827,endFrame:2029,loop:1,offset:0}];
	this.streamSoundSymbolsList[2029] = [{id:"audiocut11",startFrame:2029,endFrame:2148,loop:1,offset:0}];
	this.streamSoundSymbolsList[2148] = [{id:"audiocut12",startFrame:2148,endFrame:2286,loop:1,offset:0}];
	this.streamSoundSymbolsList[2286] = [{id:"audiocut13",startFrame:2286,endFrame:2405,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("audiocut1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,174,1);
		//this.gotoAndPlay("m1");
	}
	this.frame_174 = function() {
		var soundInstance = playSound("audiocut2",0);
		this.InsertIntoSoundStreamData(soundInstance,174,366,1);
	}
	this.frame_366 = function() {
		var soundInstance = playSound("audiocut3",0);
		this.InsertIntoSoundStreamData(soundInstance,366,566,1);
	}
	this.frame_566 = function() {
		var soundInstance = playSound("audiocut4",0);
		this.InsertIntoSoundStreamData(soundInstance,566,838,1);
	}
	this.frame_838 = function() {
		var soundInstance = playSound("audiocut5",0);
		this.InsertIntoSoundStreamData(soundInstance,838,1019,1);
	}
	this.frame_1019 = function() {
		var soundInstance = playSound("audiocut6",0);
		this.InsertIntoSoundStreamData(soundInstance,1019,1225,1);
	}
	this.frame_1225 = function() {
		var soundInstance = playSound("audiocut7",0);
		this.InsertIntoSoundStreamData(soundInstance,1225,1351,1);
	}
	this.frame_1351 = function() {
		var soundInstance = playSound("audiocut8",0);
		this.InsertIntoSoundStreamData(soundInstance,1351,1654,1);
	}
	this.frame_1654 = function() {
		var soundInstance = playSound("audiocut9",0);
		this.InsertIntoSoundStreamData(soundInstance,1654,1827,1);
	}
	this.frame_1827 = function() {
		var soundInstance = playSound("audiocut10",0);
		this.InsertIntoSoundStreamData(soundInstance,1827,2029,1);
	}
	this.frame_2029 = function() {
		var soundInstance = playSound("audiocut11",0);
		this.InsertIntoSoundStreamData(soundInstance,2029,2148,1);
	}
	this.frame_2148 = function() {
		var soundInstance = playSound("audiocut12",0);
		this.InsertIntoSoundStreamData(soundInstance,2148,2286,1);
	}
	this.frame_2286 = function() {
		var soundInstance = playSound("audiocut13",0);
		this.InsertIntoSoundStreamData(soundInstance,2286,2405,1);
	}
	this.frame_2404 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(174).call(this.frame_174).wait(192).call(this.frame_366).wait(200).call(this.frame_566).wait(272).call(this.frame_838).wait(181).call(this.frame_1019).wait(206).call(this.frame_1225).wait(126).call(this.frame_1351).wait(303).call(this.frame_1654).wait(173).call(this.frame_1827).wait(202).call(this.frame_2029).wait(119).call(this.frame_2148).wait(138).call(this.frame_2286).wait(118).call(this.frame_2404).wait(1));

	// Layer_4
	this.instance = new lib.uo8u98y98y9("synched",0);
	this.instance.setTransform(561.25,254,1,1,0,0,0,162.3,-147.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2405));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-116.1,-877.5,2316.5,2348.9);
// library properties:
lib.properties = {
	id: '4ED0DA6321935945901B9E722BAF61D7',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/m1l1_atlas_1.png", id:"m1l1_atlas_1"},
		{src:"sounds/audiocut1.mp3", id:"audiocut1"},
		{src:"sounds/audiocut10.mp3", id:"audiocut10"},
		{src:"sounds/audiocut11.mp3", id:"audiocut11"},
		{src:"sounds/audiocut12.mp3", id:"audiocut12"},
		{src:"sounds/audiocut13.mp3", id:"audiocut13"},
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
an.compositions['4ED0DA6321935945901B9E722BAF61D7'] = {
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