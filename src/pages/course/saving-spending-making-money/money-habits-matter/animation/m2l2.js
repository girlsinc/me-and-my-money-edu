(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"m2l2_atlas_1", frames: [[0,0,341,164]]}
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
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1087,727);


(lib.Bitmap2 = function() {
	this.initialize(ss["m2l2_atlas_1"]);
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


(lib.uoi7y9y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#525252").s().p("Ahgh3IB1BIIBNCog");
	this.shape.setTransform(6.2,30.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6F6F6F").s().p("AkyBNQhKgjgpgvIgbgoIEzgFIGDhoIDMBtIgyC5QiRAPh6AAQkTAAikhOg");
	this.shape_1.setTransform(-2.8,45.8442);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6F6F6F").s().p("AgagvIAVgIIAgBrIgXAEg");
	this.shape_2.setTransform(10.1,5.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6F6F6F").s().p("AgRgyIAVgGIAOBvIgXACg");
	this.shape_3.setTransform(1.9,7.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6F6F6F").s().p("AgOA2IAHhrIAWgCIgIBvg");
	this.shape_4.setTransform(-24.35,9.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6F6F6F").s().p("AgZAxIAchnIAXABIgdBtg");
	this.shape_5.setTransform(-35.875,8.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6F6F6F").s().p("AncC6Qg8hjAfhpQASg9AqgzIAMgWIA3hfIDWAJQDhAEBCgcIAHAMQBgBtCZBvQBNA3A5AiQjWBYjoA9QjUA3iFAAQicAAguhNg");
	this.shape_6.setTransform(-0.003,28.0658);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.7,0,103.4,61.4);


(lib.uo789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7E6E6").s().p("AgYAxIAdhlIAUAIIgcBhg");
	this.shape.setTransform(-13.25,-41.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7E6E6").s().p("AgQA0IANhoIAUAFIgMBkg");
	this.shape_1.setTransform(-5.55,-39.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E6E6").s().p("AgOg0IAVACIAIBkIgVADg");
	this.shape_2.setTransform(19.125,-37.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7E6E6").s().p("AgXgxIAVgCIAaBhIgUAGg");
	this.shape_3.setTransform(29.95,-38.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#AF3537").s().p("AgkAvQhQgLhagSIhKgQIAkg9QB1AwDKgLQBmgGBPgPIADACQAMACAKBAQgmAjhyAAQhFAAhggNg");
	this.shape_4.setTransform(9.325,-40.1328);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,0,0,4).p("ABShdIiSAAIgEAyIBFABQBwAAAABUQAAAvgoAdQgkAbguAAQgyAAgZgTQgcgWAAgxIArAAQAAAWATAKQAQAIAYAAQAWAAAWgNQAZgQAAgYQAAgjhHAAIhdACQAAgZAEgxQAEgyAAgaIC3gDg");
	this.shape_5.setTransform(6.3501,-96.1134);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#292929").ss(2).p("ABShdIiSAAIgEAyIBFABQBwAAAABUQAAAvgoAdQgkAbguAAQgyAAgZgTQgcgWAAgxIArAAQAAAWATAKQAQAIAYAAQAWAAAWgNQAZgQAAgYQAAgjhHAAIhdACQAAgZAEgxQAEgyAAgaIC3gDg");
	this.shape_6.setTransform(6.3501,-96.1089);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AF3537").s().p("AhUB9QgcgVAAgxIArAAQAAAWAUAKQAPAIAYAAQAWAAAWgOQAZgQAAgXQAAgkhHAAIhdACQAAgYAEgyQAEgxAAgaIC3gDIgEAzIiSAAIgDAyIBEABQBwgBAABVQAAAvgoAdQgkAbguAAQgyAAgZgUg");
	this.shape_7.setTransform(6.3501,-96.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#343433").ss(1,0,0,4).p("ABThdIiTAAIgEAyIBFABQBxAAgBBUQAAAvgnAdQglAbguAAQgyAAgZgTQgcgWAAgxIArAAQAAAWAUAKQAPAIAYAAQAXAAAVgNQAZgQAAgYQABgjhIAAIhdACQAAgZAFgxQAEgyAAgaIC3gDg");
	this.shape_8.setTransform(6.4725,-95.8545);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E7E6E6").s().p("AAgCXIhHh9QgJgRgDgJQgFgQADgMQACgJAJgMIBgiJIABCDQAABPgEAsQgGBEgTAzg");
	this.shape_9.setTransform(29.2057,-99.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D0A988").s().p("AiBB9QgEgwAUgpQAXhogHgQIBtg4QBvg0AIAMIgOBhQgKBkAQARQghAmgqAlQhSBKgpAAQgwAAgGg6g");
	this.shape_10.setTransform(10.691,-137.3366);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F5F6F6").s().p("AjsGcIA0ihQghhhgahvQgzjdAnhFQA4h8AOgsIAkgUQApgTAXAFIBeAOQBmAKAegbIB2AmIgaHzIgUBNQgNBaAkBBIAOAbQAQAjAHArQhYAThsAIQgzAEgsAAQiPAAhLgpg");
	this.shape_11.setTransform(8.8969,-88.6291);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E7E6E6").s().p("AGZD4QjFg7lsgBQhyAAh1AFIheAGQDDjtCTjIIAHgOQA/AhDYgEQBtgCBggJIAgCIIAAABQCXFehnAAQgMAAgPgFg");
	this.shape_12.setTransform(0.0121,-25.2772);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.7,-155.6,95.5,155.6);


(lib.UO79T79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFgSQAQgGARAAIASAJQgqAFgcASQgPAJgHAIQAFgeAkgNg");
	this.shape.setTransform(9.7,192.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFgSQAQgGASAAIASAJQgrAFgcASQgPAJgHAIQAFgeAkgNg");
	this.shape_1.setTransform(5.3,190.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E2E2E").s().p("AgtHgIhFgRQg3kDAQkkQAJigAWhkIAAgBQgBg2ApgnQApgmA5gBQA7gBApAmQAqAmAAA2IAAANIAAAAIgBADQgDAZgOAZQhlEjAJD8QAEB/AZBEQgkAeg3AAQgPAAgQgCg");
	this.shape_2.setTransform(-8.554,128.1038);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgGgSQARgGASAAIARAJQgpAFgdASQgPAJgGAIQAEgeAjgNg");
	this.shape_3.setTransform(-0.15,187.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#57514C").s().p("AA/B9QhAgNh6hCIhtg/IAAAAQgEg3AMghIAAgCIAAABQAHgVANgBIgCADQACAEANAHQAWANAvANQAqAAAUgKQALgEACgFIDHBrIA8AjQAbARgGAbQgDAOgIAKQgcAZhEACg");
	this.shape_4.setTransform(3.1788,193.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AgEB2QgZgMgbgcIgWgZIAFgaIgXgNQATAEAKiQIB5gBIgGA1QAFA5AXAdQALAPAKAEQgSBhgyAAQgPAAgSgKg");
	this.shape_5.setTransform(-9.225,181.529);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2E2E2E").s().p("AhnH5QgugigGg1QgCgUAEgVQAFh1gHiIQgKjRgljHIgFgbQgKhRA3hAQA2hABXgKQBVgKBEAyQBDAzAJBQQAEAegGAcQgTFng7FqIgFAAQgHArgjAfQgiAggvAFIgTACQgvAAglgcg");
	this.shape_6.setTransform(-5.581,53.2526);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,0,53.1,206.6);


(lib.uo8y9898 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D43539").s().p("AgEDKQhogNgYgfQgegzgOhBQgbh/BGhWQAHgIAMgIQAZgRAbgCQBYgJBTCHQBUCGgKA9QgFAfgVAEIhfgFIAHALQAKASAQAiQgwAAgzgGg");
	this.shape.setTransform(18.4708,23.1219);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("ABVEaQgUgUgHgNIj6otIBEAYQBJAVATgSIBzDnQBzDtgFAfQgHAmgRAZQgRAagWABIgBABQgTAAgZgbg");
	this.shape_1.setTransform(25.2376,60.7018);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D43539").s().p("AhDCkQhQg7gFglQgCg5ASg7QAjh4BfgpIAWgFQAcgCAYAKQBMAiAICYQAICXgkAvQgRAXgUgHIhLgvIABANQAAATgCAkQgmgWgogdg");
	this.shape_2.setTransform(15.3304,21.501);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,44.6,91.6);


(lib.uo89899 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6F6263").s().p("AA9HbQgegDgTgbQgSgZAAgjQgdhwhbmxQgYguAAhBIgBgFIABgBIACgbQAKhMAngyQAngyAuAFQAtAGAbA7QAaA6gKBMIgEAbIAAAKQgEBqAiDdQAUB/AcCPIAEAWIgBAAIgBAQQgEAlgaAXQgWAUgbAAIgKgBg");
	this.shape.setTransform(-0.025,47.6024);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6F6263").s().p("AhqECQAUgDARg2QAjhtgNkBQgFgQADgUQAEglAagXQAZgXAhADQAgAEAUAeQATAdgEAlIgBACQgEAvgMBpQgSCfgWCWQhdgQg+gIg");
	this.shape_1.setTransform(4.5672,106.3269);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3B188").s().p("AgPB6QAIhJgCAAQgDAAgMAyIgMA1QgFAXgOgDQgOgDAEgbQAbh1ACgpQABgXgJgFQgEgDgHAoIgJA1IgHAgQgEARgJgGQgJgFAAghIABggQAWiFAbgmQAegsBKAMQAWAEAIBhQAHBWgIBMQgDAbgEAHQgDAFgIgBQgJAAAAg1QAAgygBACQgGAFAABfQgBAcgHAJQgFAFgIgBQgHgBgCgJQgDgQAEgwQAGhTgMAeQgEAMgHBrIgCAWQgCAMgJADIgDABQgPAAAGhBg");
	this.shape_2.setTransform(0.7133,150.4059);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.2,0,30.5,169.1);


(lib.UIOY97997 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E2E2E").s().p("Ai3HrQgognAAg2QgBgVAHgSQAShyAIiJQAOjSgPjJQgBgNAAgPQAAhSA9g6QA9g5BWAAQBXAAA9A5QA+A6gBBSQAAAegJAbQg8FqhiFZIgFAAQgMAqglAbQgmAbgwAAQg6AAgqgmg");
	this.shape.setTransform(0.9,52.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E2E2E").s().p("AgzHgIhFgSQg1kDATkkQAKiaAXhqIABgCQAAg1ApgnQApgmA5AAQA7AAApAmQApAnAAA1IgBAOIABAAIgBADQgDAbgPAWQhnEiAGD9QADB/AXBEQgjAdg3AAQgPAAgQgCg");
	this.shape_1.setTransform(-9.1257,127.9314);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgFgSQARgFARAAIASAJQgqAFgdAQQgPAJgHAIQAFgeAkgMg");
	this.shape_2.setTransform(7.425,192.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFgSQARgFARAAIASAJQgqAEgdARQgQAJgGAIQAFgeAkgMg");
	this.shape_3.setTransform(3.05,190.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFgSQARgFARAAIASAJQgqAFgdAQQgPAKgHAHQAFgeAkgMg");
	this.shape_4.setTransform(-1.525,187.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#57514C").s().p("AA9B/Qg/gOh5hDIhshAIAAgBIgBAAQgDg3AMghIAAgBIABAAQAGgTAOgDIgCADQAAAEAOAIQAWAMAvAPQAqgBAVgJQAKgEACgFIC3BlIBLAsQAbARgHAbQgDANgIAKQgcAahFAAg");
	this.shape_5.setTransform(1.734,193.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("AgFB2QgZgNgagcIgXgaIAGgZIgXgNQAUADAKiPIB6AAIgGA1QADA5AXAeQAKAPALAEQgTBggxAAQgQAAgSgKg");
	this.shape_6.setTransform(-10.55,181.3768);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.1,0,50.2,206.6);


(lib.UIOL7L7T9L7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#465E6D").s().p("AA8FeQg9gZgygtQg8g0gVgDQgTgEgLgFQgRgIgEgJIgFgNQAAgGAEgIQAohKAPhpIASi/QAGg9AFgXQAIgwASghQACgFAEgDQAEgDADADIABgDIAIgEQAdA7APAxQAHAZAGAmIANA/QASBUBGCwQBCCoARBfQhCgDg/gag");
	this.shape.setTransform(-15.3778,-6.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3B4C56").s().p("ABHGMQgHgBgIgJQhnhyhWiCQgcgpgLgbQgMgZgPg1IgqiXQgVhNgHgqQgMhDAIg2QA0BxBgBUQBgBUB1AmQAkAMAVgHQAMgEATgPQA1grAng2IAJgBQgSBDAABDIABA/QgBAkgLAZQgGAPgRAdQgJARgIAaIgOAsQgPAqgcAxQgQAdgmA5QgMASgLAAIgDAAg");
	this.shape_1.setTransform(3.3109,4.5386);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#465E6D").s().p("AgsAHQAMhgAlhZQAGgQAKgEQAGgCAGAEQAGAEgBAFIADgLQgSCHAZCEQAEAUgDAJQgCAHgMAMIhMBSQgPhfAMhhg");
	this.shape_2.setTransform(29.1526,3.2519);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.2,-44.2,68.4,88.4);


(lib.uio78999 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDA688").s().p("AALB6QhtgKgehmQgQg3AogkQAhgeA+gJQA4gIAtANQAvAMgGAYQgKAqgFBOQgDAoAAAfQgkAMgoAAIgcgCg");
	this.shape.setTransform(-4.3316,-124.7341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKALQgFgFABgGQgBgFAFgFQAFgEAFAAQAGAAAFAEQAFAFgBAFQABAGgFAFQgFAEgGAAQgFAAgFgEgAACAEQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABgAgFAEQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABgAACgDQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABgAgFgDQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABg");
	this.shape_1.setTransform(7.6,-69.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKALQgEgFAAgGQAAgFAEgFQAEgEAGAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgGAAgEgEgAABAEQAAAAAAABQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAgGAEQAAAAAAABQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABgAABgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAABAAAAgAgGgDQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAABAAAAg");
	this.shape_2.setTransform(7.425,-75.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgKALQgEgEAAgHQAAgFAEgFQAFgEAFAAQAHAAAEAEQAEAFAAAFQAAAHgEAEQgEAEgHAAQgFAAgFgEgAACAEQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAABAAAAgAgFAEQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAABAAAAgAACgDQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAgAgFgDQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAg");
	this.shape_3.setTransform(6.775,-81.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B73538").s().p("Ag6BNQgEgvAAhdIABiUIBtCbQAKAOADAKQAEAOgGARQgEAMgKASIhRCOIAHApQgWg6gHhNg");
	this.shape_4.setTransform(-24.9286,-62.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CDA688").s().p("Ah/AMQARgRgKhjIgNhfQAIgNB3A4QA6AdA5AeQgEALANA0IAPAxQAHAcgSBSQgJAqgLAjg");
	this.shape_5.setTransform(-3.752,-103.7225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D43539").s().p("AheH+QhKgEhNgKIg+gKQAEg7AQgnIAOgcQAShegOheIgShLIgNo2ICHgrQAiAeBzgKQA5gFAzgMQAagGAuAWQAXALASAMQAQAxBACNQAsBPgnD6QgTB+gcBuQAdBvgHAtQgEAWgJAAQhdAyiyAAQgkAAgngDg");
	this.shape_6.setTransform(0.3288,-51.2493);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-137.1,62.4,137.1);


(lib.UIO8Y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#686439").s().p("AAeGzQgdgGgQgZQgRgZADggQgShYg+mhQgUgsAFg6IgBgFIACgBIAEgYQAOhFAqgqQAqgqArAJQAtAJAVA3QAWA3gPBFIgGAYIgBAJQgKBfARDMQALB3ARCDIADAUIgBAAIgCAOQgHAhgbATQgUAOgXAAQgIAAgIgBg");
	this.shape.setTransform(12.5668,43.6211);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#686439").s().p("AhcgUQgVhagJgvIgBgCQgIghAQgcQARgcAfgGQAfgHAbAUQAbATAIAhQAEARgCAQQAMDqAtBhQAWAwAUABIiVAhQgkiGgiiPg");
	this.shape_1.setTransform(22.8417,97.9938);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#775A45").s().p("ABBCTIgKgSIgcgyQgYgpgEgFQgVgUAkBDQAVAnAEAOQACAIgGADQgHAEgGgCQgKgFgLgXIgZg2QgOgbgFgCQgCAAAUAqQAVAsgJADQgHAEgFgEQgGgEgMgWQglg8gchLQgehVARgKQA/glAsAZQAmAXBIBoIAOAaQAMAcgGAHQgFAIgLgMIgTgZIgdgpQgVgggDAFQgGAIAKATQASAhBGBZQAOAVgLAHQgMAIgNgSIgggoQgegmgCABQgDABAkA7QAjA5gVABIgBAAQgJAAgGgIg");
	this.shape_2.setTransform(33.7103,134.2062);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46.5,149.7);


(lib.uiy7y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AA2A8QgjgsgUgUIgIA8QgFAmAAAWQgFgdgZgzQgVgtgVgeQgDgEgSglQgEgJACgLIAIgUQAUgGAWAEQAWAFARAOIASASQAKANAHAFIAAgHQACAUAQAYIAgAmQARAVAOAjQAQAmgCAXQgUgVgkgsg");
	this.shape.setTransform(11.0584,12.4786);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.1,25);


(lib.UIT77979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E2E2E").s().p("AmKCMQgEh8AghfQAVhBAfglIAMgXIA6hkIDfAKQDsAEBEgdIAIAMQBjByAFClQACBRgSA7Qi+Bwi/A7Qh4AlhTAAQi3AAgGi0g");
	this.shape.setTransform(0.0125,0.0202);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.5,-32,79,64.1);


(lib.ui779 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#833133").s().p("AhJD1QALg9AChXQAHisgpiDIARAFQAXAFAXAAQBIgBAzg2IADCoQgBC1gTBFIAKAiQgQASgdAPQgjASgiAAQgWAAgWgHg");
	this.shape.setTransform(10.3,71.9161);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BABAB9").s().p("AACHJQANhSgKiHQgTkMhvkEQgOgUgGgYIgBgDIABAAIgCgMQgDgyAkglQAjglA2gEQA0gDAoAgQAoAhADAxIAAABQARA6AODQQAUEngiDyQgOARgWAKQgTAJgRAAQgbAAgagTg");
	this.shape_1.setTransform(4.0871,47.603);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAXAGQgbgOgngCIAQgJIAfADQAiAJAGAbQgHgHgOgHg");
	this.shape_2.setTransform(-5.4,104.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAXAFQgbgNgngBIAQgKIAfADQAiAJAGAbQgGgHgPgIg");
	this.shape_3.setTransform(-1.5,101.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAXAGQgbgOgngBIAQgKIAfADQAiAJAGAbQgHgHgOgHg");
	this.shape_4.setTransform(2.55,99.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#343332").s().p("AjEBwQgIgJgEgMQgHgZAXgRIDkiTIAMAIQATAHAmgDQArgQATgMQAMgIAAgEIgBgDQAMACAHASIABgBIAAACQANAdAAAzIAAAAQgqAfg2AiQhrBFg5AQQgaAFgfADIgRAAQgyAAgXgSg");
	this.shape_5.setTransform(-0.0157,104.4995);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#9E9E9E").s().p("AhXAkQAJgEAJgPQASgcABg0IgJgwIBvgIQASCDASgFIgVAOIAHAXQgcAsgjAVQgSALgQAAQgrAAgVhUg");
	this.shape_6.setTransform(10.575,92.7886);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.1,0,42.2,117.5);


(lib.u787997 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBBF9A").s().p("AgbD3QAHgHgCgzQgChngojhQgGgPAAgQQAAghAVgYQAVgXAcAAQAdAAAVAXQAUAYAAAhIABACIgGCLQgHCegDB6QgbgEg3AAg");
	this.shape.setTransform(-1.375,25.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBBF9A").s().p("AgEBvQgBhBgCAAQgDABgFAtIgFAwQgCAVgNgCQgNgBACgYQALhpgDgkQgCgVgIgEQgFgCgBAjIgCAxIgCAcQgDAQgJgEQgIgEgEgdIgCgdQAFh3AUgkQAWgpBEACQATAAASBVQAPBMACBCQAAAYgCAGQgCAFgIABQgJAAgFguQgFgsgBACQgFAFAKBUQADAZgGAIQgDAFgIAAQgGAAgDgIQgEgNgCgrQgEhJgHAbQgCAHACAtIADA2IABATQgBALgIAEIgEABQgMAAgBg4g");
	this.shape_1.setTransform(0.0292,64.2012);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.4,0,16.9,80.9);


(lib.p9u09009 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B53538").s().p("AggCiIAEgMIhUAhQgUADgNgbQgZg1AliWQAkiWBRgTQAogKAhAVQBWA6ALB+QAGA/gNA5QgMAlhZArIhWAkQAEglAEgTg");
	this.shape.setTransform(15.6245,21.7496);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF8D75").s().p("ABmDQQhEhCg/hKQh/iTACg8QAChBAhgVQAdgSAXATQAZAVBWCVQBeChANA/IAEAwQgCARgLAAQgNAAgbgbg");
	this.shape_1.setTransform(31.7235,96.2748);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AF8D75").s().p("AAQFOQgQgFgQghQgNgagBgNIhFpQIA2AsQA5ApAXgLIAnD6QAlD+gOAbQgRAhgVASQgSAPgQAAIgJgCg");
	this.shape_2.setTransform(19.5441,55.3043);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#AF8D75").s().p("ABXCcIgNgTIgjg0QgdgsgGgFQgWgUAsBGQAcApAFAPQAEAJgFADQgHAFgFgCQgLgFgPgZQgxhVgGgCQgCAAAaAsQAaAugHAFQgHAEgEgEQgGgEgQgWQguhBgnhPQgrhaAPgMQA2grAvAaQAoAXBWBtIASAbQARAegEAJQgFAIgMgNIgWgZIgjgsQgaghgCAFQgEAJAMAUQAXAjBSBdQARAVgJAJQgKAJgQgSIglgrQgjgngCABQgCABAsA+QAqA9gTABIgCABQgIAAgHgJg");
	this.shape_3.setTransform(50.9013,125.3019);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,65.2,141.8);


(lib.ouyt797y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFgRQAQgGAQAAIASAJQgpAFgbAQQgOAJgHAIQAEgdAjgMg");
	this.shape.setTransform(8.25,108.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFgRQAQgGAQAAIASAJQgpAFgbAQQgOAJgHAIQAFgdAigMg");
	this.shape_1.setTransform(4.025,106.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#525252").s().p("AgrHMIhCgRQg1j4APkXQAIiSAVhnIABgBQgBg0AnglQAnglA3gBQA4AAAoAkQAoAkAAA0IAAANIAAAAIgBACQgDAagOAWQhgEXAJDyQAEB5AXBBQghAdg1AAQgOAAgQgCg");
	this.shape_2.setTransform(-9.2254,46.1728);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFgRQAQgGAQAAIARAJQgoAFgbAQQgOAJgHAIQAFgdAigMg");
	this.shape_3.setTransform(-1.2,103.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D3A38").s().p("AA8B4Qg9gMh1hAIhog8QgEg1ALggIAAgBIAAAAQAHgTAMgCIgBADQAAADANAIQAWAMAtANQAogBAUgJQAJgEACgEID5CHQAaAQgGAaQgDANgIAKQgbAZhBABg");
	this.shape_4.setTransform(2.0038,108.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ADACAC").s().p("AgDBxQgYgMgagaIgWgYIAGgZIgXgNQATAEAIiJIB1gCIgFAzQAEA2AVAdQALAOAKAEQgRBdgvAAQgPAAgRgKg");
	this.shape_5.setTransform(-9.9,97.3132);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.3,0,48.7,121.3);


(lib.ouy8y9y89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AhhBLQgDhhAFhGQAAgpAEgUQAGgYAYgoQAIgPAIgDQARgJAWAVQARASAaAvQAaAuAUASIAQAGQAAAlgSAgIgdA2QgOAhACAjQgkg0gFg9QgeAZgEA6IgBAvQgBAcgEASQgFAZgMATQgPAVgUAIIgEikg");
	this.shape.setTransform(0.0054,23.8754);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.9,0,19.8,47.8);


(lib.ouy9y99 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF3537").s().p("AgmAUIhGgRIAGgaQBUAZBIgIQAkgFATgKIAAAZQgvAUg4AAQgVAAgXgEg");
	this.shape.setTransform(-13.6,29.8071);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D2C8C9").s().p("Ah+CrIAThvQgFg7ATg7QAmh6B2gHIAPAJQARAMAMATQAmA7gjBjIgGArQgGA1gCAyQgkAPguAJQgjAHgdAAQguAAgegRg");
	this.shape_1.setTransform(-12.6984,18.7772);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D0A988").s().p("AhMGDQgZgLgLgZQgLgaAIgbQAAhXASl5QgKgrAPgzIAAgEIABgBIAIgUQAZg6AtgeQAtgeAmARQAmARAJA1QAKA1gZA6IgKAUIgCAIQgbBTgUC3QgNBygHByIgBASIgBAAQgBAGgDAGQgMAcgbAMQgOAGgOAAQgNAAgNgGg");
	this.shape_2.setTransform(-12.4045,41.2801);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D0A988").s().p("Ah9C/QAJgDASgsQAjhZAvjPQAAgPAGgOQALgcAcgMQAbgMAbAMQAbALALAdQAKAcgMAcIgBABIg4B1QhBCEgvBnQgXgPg0gWg");
	this.shape_3.setTransform(-22.6977,89.3625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D0A988").s().p("AgsBcQAXg4gCAAQgCgBgVAkIgXAoQgJAQgMgGQgLgGAKgUQAxhWALgfQAGgSgGgHQgDgEgPAeIgUAoQgIARgFAHQgIAMgGgHQgGgGAHgbIAIgYQAxhkAggXQAjgbA9AdQASAIgPBPQgNBGgYA6QgIAVgFAEQgEAEgHgDQgIgDAMgpQAMgogCABQgGACgWBMQgGAXgJAEQgEADgHgDQgFgDAAgHQABgNANglQAWg/gPATQgEAFgOAoIgSAvIgGARQgFAIgJAAIAAAAQgSAAAWg2g");
	this.shape_4.setTransform(-36.7849,122.5368);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.8,0,46.8,137.2);


(lib.OUY9Y789 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BCB453").s().p("AhbgVIgdiRIgBgCQgHgjAQgeQARgeAfgHQAfgGAcAUQAaAUAIAjQAEAQgDATQAKD4ArBmQAVAzAUABQglAIg8APIg0ANQgiiNggiYg");
	this.shape.setTransform(12.4078,27.2203);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#775A45").s().p("AATCyQgJgDgEgKIgDgVIgJg7QgIgwgEgHQgNgaAMBOQAIAugCAPQgBAJgGABQgIACgFgEQgJgIgCgbIgHg+QgDgfgFgDQgCgCAFAwQAFAzgJABQgIACgDgFQgFgHgFgZQgOhJAAhTQgBheAUgFQBIgSAhAnQAdAiAhB+IAFAfQACAggIAGQgIAGgGgQQgGgWgEgIIgNgzQgJgmgFAEQgIAGADAWQAFAnAlBuQAHAZgOAFQgNAEgHgWQgCgHgOgrQgQgvgDAAQgDAAAOBGQANA/gQAAIgDAAg");
	this.shape_1.setTransform(19.8274,69.0589);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29.5,86.9);


(lib.OY89Y898 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDE9DB").s().p("AgsAAIAPgiIBKAiIAAAjg");
	this.shape.setTransform(-12.825,39.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#64927D").s().p("AhqCKQAGgmAJgtQAThaATgkQAUgkA0AGQAcADAWALIAAhMIAmgFIAAByIhXDfg");
	this.shape_1.setTransform(-70.85,129.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#72C59B").s().p("AlvM/QhbgxAUjFQAIhKAWhOQAUhGAVgnQAgg7BJgEQAkgCAeAKQE9jzCdnUQAyiSAbiYIARh6QBNApgIAgQgDAQgUAIQg9FwizFmQhGCMhFBgQg/BbgjAMQg3ATg2ECQgbCBgRB9QgEASgWAJQgMAFgPAAQgoAAg+ggg");
	this.shape_2.setTransform(-44.2425,86.3301);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88.4,0,88.4,172.7);


(lib.OY8989Y9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#959042").s().p("AgUImQhRgEhXgLIhHgKQgGgyANhaIANhRQAnhIgQhkQgFgggLgeIgJgYQg6hogeh6Qg7j0CNhVQA2ghArgIQAVgEALADQAhAdBugKQA3gFAxgLQAYgGAtAVQAWALARAMQAPAwA+CLQAqBNggD2QgPB7gYBrQAtCvASBlQhXAvi7AAQgsAAgygDg");
	this.shape.setTransform(-0.0079,-55.2879);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.7,-110.6,69.5,110.6);


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
	this.shape.graphics.f("#292929").s().p("AAAFOQhugbgtAGQgBgQAHgWIAMglQALgjgDhBQgDhIgBglQgBg9AHgtQAOhUAvhJQAvhJBFgvQANgIAHAAQAEABgHAEQgEAFAPAEIgJgCQAUAxgKBFQgEAigXBWQgRA+AGBDQAFA5AXBJIAGAaQAEAQADAJIAlBTIAlBSQgkAAh4gdg");
	this.shape.setTransform(-0.0312,36.2986);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.6,0,31.2,72.6);


(lib.o8y9y898 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AkejhIBMgxQBYgvBQgCQD9gGBMG6IiWDTg");
	this.shape.setTransform(4.025,32.421);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#292929").s().p("AhfG2QAFgogEg4QgFhRAAgQQAAhDgOhXIgciYQgIgqAAg9QAAi7BRheIABAkIgLAPQgIAPAGAVQAEANAMAWIALE/QAhBFBJAiQAQAWAnApQAnAvADAoQABAVgHAaQgGAQgNAcIgbA8QgHAQgHAGQgGAFgPAFQgsAOgsAAQgjAAgjgIg");
	this.shape_1.setTransform(-17.8125,53.7899);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,0,65.6,98.4);


(lib.IUL78LT78L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BCB453").s().p("Ah0G4QgagWgEgkIgBgPIgBAAIAEgVQAaiDAViDQAhjVgDhmIgBgKIgEgaQgJhJAZg4QAag5AsgFQAugGAmAwQAmAwAKBKIACAaIABABIgBAFQABA+gYAtQhbGogbBnIgBAAQABAhgSAZQgTAZgdAEIgKABQgaAAgVgUg");
	this.shape.setTransform(-0.025,45.9519);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,0,29.8,91.9);


(lib.it77999 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF3537").s().p("AhmAeQBYgLA+gnQAfgUAPgSIAJAaQgxA1hQAZIhHANg");
	this.shape.setTransform(-3.25,31.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5F6F6").s().p("AhEDZIgah1Qgcg4gHhDQgNiIBrg6IARACQAUAFASANQA6ArAIBxIAMAsQAPA3ASAyQgbAegnAcQhEA0g1AAIgMgBg");
	this.shape_1.setTransform(-4.6707,21.7583);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBBF9A").s().p("AA1GJQgUgVgCgeIgBAAQgfhPiHmDQgbgmgGg5IgCgEIABgBIgBgYQAAhEAegwQAdgxAqAAQAqAAAdAxQAdAwAABEIgBAYIABAJQAJBdA2C+QAgBwAoB5IAHATIgBAAIABAOQAAAhgVAYQgVAXgdAAQgbAAgVgVg");
	this.shape_2.setTransform(0.675,43.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.8,0,35.7,84.9);


(lib.ioy899 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7B7272").s().p("AiLHIQgagPgJggQgJgfAOgfIgBgBQALhcBLnLQgGgzAZg9IAAgFIACAAQAGgOAGgLQAkhDA2gfQA2ggApAXQApAXADBAQADBAgkBDIgOAXIgEAKQgpBggxDZQgfCKgWCEIgEAWIgBgBIgGAPQgSAgghAMQgNAFgOAAQgRAAgRgJg");
	this.shape.setTransform(0.0011,46.4468);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.8,0,35.7,92.9);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#545455").s().p("Ai7DkIAAAAQgcgGgRgLIAAjVIACAAIAAgBIgCgbQAAhUA/g8QA+g8BZAAQBXAAA/A8QA+A8AABUQAAAMgBAMIAAADQAfCmAJAKIgyAOQhhAZhTANQhDAKgzAAQgqAAgegHg");
	this.shape.setTransform(3.225,60.7858);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3B188").s().p("AhjD5QgzjBg0kGQBzAZEAhDQgBCXANCaQAJBrANBVQhmgBjIABg");
	this.shape_1.setTransform(4.75,104.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEE56F").s().p("ACBJFQgqiBgZgnQgIgMgGgDQh7g3h+iRQjrkMhLm1QgRgmADgrQAGhWBggbIgLBdQgFB1AeB5QBiGAGhETIAQAKQBhA+BKAuQgPA5AhBMQAbA+ApAwIjWA0QgPg5gVhAgAElGXQAJgkAbgcQDjC8giAAQgdAAjIh8gAElGXIAAAAg");
	this.shape_2.setTransform(7.3751,-36.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#545455").s().p("Ag9GuQg/gHiZgXIiMgXQgEiuAiktQAekSAQggIDHAVQDjAOCNgeQAKAAAlgSQAhgQAFAFIAZB7QAdCWATB8QA/GOg0AMInDAzg");
	this.shape_3.setTransform(-14.1159,41.4756);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#545455").s().p("Ai+DQIgBAAQgZgJgRgOIAbjTIACAAIACgcQALhUBFgyQBGgzBXALQBYAMA2BDQA3BEgLBSQgCAOgDAKIAAADQAKCqAIALIgyAHIgDAAQhiANhUABIgSABQhvAAg8gXg");
	this.shape_4.setTransform(-36.625,48.3019);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3B188").s().p("AhtEtQgJgSgHgmIgFAAQglkBgTkgQBBAYB9gCQBWgCBhgNQgkEIAGDqQAEAVgDAVQgFAmgIAQIiAAAIhJAAIg1AAg");
	this.shape_5.setTransform(-37.025,99.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BE9F7E").s().p("AgkgKQBHgwBYgtIAIAFQgbBvgdAZQg7AxhAANIg1AEQhQgTCRhfg");
	this.shape_6.setTransform(-13.9108,-119.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D3B188").s().p("AiCBcQAUh4gHgSIB2g9QB6g7AIAOIgOBsQgMBvASASQgpAng1ATQgfANgbAAQg/AAgmhAg");
	this.shape_7.setTransform(-15.425,-112.2432);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4E6146").s().p("AjMIaQABhoAHiGQAPkKAjiQQgIhuAHhvQAOjdBPgGICLgLQA3ACBBApQgPAPgUAkQgoBHgcBmQhaFGA/ICQgxASg6AIQgiAGgdAAQhHAAgmggg");
	this.shape_8.setTransform(-16,-52.1408);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7B7272").s().p("AlUIAQAJgJASglQAkhKAviKQgghzgYiCQgvkFArhOQA/iMAPgyIAogWQAtgWAaAGIBlARQBuALAhgeIC3BGIhJIWIgDBNQAFBbAoBKIAjBqQAbBwgmAeQh5ASiQAHQgzACgtAAQjQAAhagxg");
	this.shape_9.setTransform(-14.2142,-50.2834);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60,-129.6,120,259.2);


(lib.io8yly89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7B7272").s().p("AiCDzQAUgBAXg1QAuhoAPkAQgDgSAFgSQAIgkAcgUQAcgVAgAHQAgAHAQAfQARAegJAkIAAADQgIAqgYBqQgkCcgmCSQhbgYg9gNg");
	this.shape.setTransform(-13.1305,28.0375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B39575").s().p("AgcB3QAQhIgCAAQgDAAgRAwIgSA0QgIAWgNgEQgOgFAHgaQAohxAGgoQAEgWgJgHQgEgEgLAnIgOA0IgKAfQgHAQgIgGQgJgGAEghIAFggQAkiBAfgjQAigoBKATQAVAFgDBhQgCBWgQBKQgGAagEAHQgEAEgIgBQgKgBAHg0QAGgxgCABQgFADgEAgIgIBAQgDAcgJAHQgFAFgJgCQgGgCgBgJQgBgPAIgvQAOhQgNAaQgEAHgKAzIgKA7IgEAWQgDALgKACIgDABQgRAAAOhBg");
	this.shape_1.setTransform(-21.4323,71.0392);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.4,0,31.4,89.4);


(lib.io8y889 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDA688").s().p("AhDEFQghgKgDggQgCggAzirQA2i4Ang1QARgZARgLQAhgXgCBHIgMDIQgUDIgvAnQgnAigiAAQgJAAgKgDg");
	this.shape.setTransform(10.3999,-26.3401);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CDA688").s().p("AgtDDQhFgagEg3QgEgxAwiHIAOgeQARgfAKgBQAKAAgEASQgCAKgIAXQgCAJgRAuQgPAnAGAAQAKgBALgVQATgoAhh6QAJgbAOAEQAOAEgIAYIgQA3QgOA1ACABQACABAdhIQAdhGANARQAGAIgDAMIgKAVIgaA7QgWAxgBAJQgEAfAjhOQAVgvAKgMQAGgIAGACQAIAEABAGQACAMgNAaQgvBYACAIQABACAYguQAZgxAIAEQAIAEAAAHQgBAIgKAaQgfBKgxBNQgxBQgUAAIgEgBg");
	this.shape_1.setTransform(24.2595,-58.6709);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-78.2,36.2,78.2);


(lib.io8y899y8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAgPQARgCAQADIAPAMQgpgDgeAKIgYAMQALgbAkgFg");
	this.shape.setTransform(-17.775,109.1229);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAAgPQARgCAQADIAPAMQgpgDgeAKIgYAMQALgbAkgFg");
	this.shape_1.setTransform(-21.475,106.2229);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#525252").s().p("AiTG4Ig+geQgBj9BJkOQAmiLAqhjIABgBQAKgzAugcQAtgcA2ALQA3ALAgArQAfAsgKAyIgDANIABAAIgCADQgIAYgSATQiYD9goDuQgVB3AJBFQgaAOggAAQgcAAgigMg");
	this.shape_2.setTransform(-20.9802,45.2046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBgPQARgCAQADIAQANQgpgEgeAKIgYAMQALgbAjgFg");
	this.shape_3.setTransform(-25.975,102.3729);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D3A38").s().p("ABgCYIg6gRQg5gYhlhWIhZhQIAAgBIgBAAQAIg0ARgdIAAgCIABABQALgRAMAAIgCADQgBADAMAKQASAQAqAWQAnAIAVgFQAKgCADgEICmCLIAxAuQAWAUgLAYQgFAMgKAIQgTALgfAAQgUAAgagEg");
	this.shape_4.setTransform(-24.3888,108.298);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ADACAC").s().p("AgXBwQgUgQgUggIgQgcIAKgXIgUgPQASAGAliFIBzAXIgQAxQgHA2APAgQAHARAKAFQghBPgoAAQgSAAgWgSg");
	this.shape_5.setTransform(-33.65,94.8019);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.4,0,45.4,124);


(lib.io880u80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292929").s().p("AjvBfQg8j7BjhlQAygyA9AAIFfIBQhlBJhyAWQgiAHgdAAQirAAg0jVg");
	this.shape.setTransform(0.0062,-0.0335);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.2,-30.8,52.5,61.6);


(lib.ilt78l78l = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#833133").s().p("AhhDtQAPg8AIhWQASisgfiEIARAGQAVAHAXABQBGAEA2gyIgJCnQgNC0gXBDIAHAiQgRARgdANQgeANgeAAQgaAAgZgJg");
	this.shape.setTransform(12.625,72.4418);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BABAB9").s().p("AgpHHQAShRAAiHQgBkMhdkMQgNgWgDgYIgBgCIAAAAIAAgNQAAgxAmgjQAmgjA2ABQA0AAAmAjQAlAkAAAxIAAABQANA7gBDRQgBEngyDvQgPAQgXAJQgQAFgPAAQgdAAgbgWg");
	this.shape_1.setTransform(8.376,47.7441);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAYAHQgbgQgngEIAQgJIAfAGQAhALAFAbQgGgHgNgIg");
	this.shape_2.setTransform(-6.25,103.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAXAHQgagPgngFIARgJIAfAGQAhALAEAbQgGgHgOgIg");
	this.shape_3.setTransform(-2.225,101.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAXAHQgagQgngEIAQgJIAgAGQAgALAFAcQgGgIgOgIg");
	this.shape_4.setTransform(2,98.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#343332").s().p("AhyB3Qg+AAgagYQgHgJgDgNQgGgZAYgPIDuiDIALAIQATAJAmAAQAsgNAUgLQANgHAAgDIgCgDQAMACAHASIAAAAIAAABQALAegDAzIgBAAIhjA6QhwA+g6ALQgYAEgbAAIgHAAg");
	this.shape_5.setTransform(-1.0257,104.3275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#9E9E9E").s().p("AhYAdQAKgDAKgPQAVgbADg0IgFgwIBvAAQAJCEASgEIgVAMIAFAYQgfAqglATQgQAIgPAAQgtAAgRhYg");
	this.shape_6.setTransform(10.3,93.2459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,0,44.9,116.3);


(lib.iy779 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7E6E6").s().p("AijArQAMgrAog2IAXgeQgqAxgvAwQhvBzglAAQglAAgehzQgLgogEgmQgFgkAFAAIG3gsIEcAfIBdBUQAKAYgoAgQhRBBj7AtQg8AKgsAAQiIAAAehng");
	this.shape.setTransform(-41.0625,14.6363);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-82.1,0,82.1,29.3);


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
	this.shape_18.graphics.f("#E88C8D").s().p("AgMBAQgfgNAEgdQgggJgCgUQgCgZAUgQQARgPAXgBQAxgDAkAdQAIAPgJAdQgIAegeARQgWAMgNAAQgEAAgEgBgAAGgdQgPABgGAFQgGAEgBACIgBACIgBACQAOAIAFAHQAFAIAAAFIABAHQAXACAFgMQAFgMgEgKQgHgTgPAAIgCAAg");
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
	mask.graphics.p("AgXAiQhCgHAOguQACgHALgEQAMgFARAAQA6AAA1AqQgfAdgxAAIgVgCg");
	mask.setTransform(7.8033,3.5528);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAGQgCgCgBgDQgBgGAIgBQAGgBABAHQACAFgIACIgBAAQAAAAAAAAQgBAAAAAAQgBAAgBgBQAAAAgBAAg");
	this.shape.setTransform(7.256,5.0738);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgOASQgIgGgBgJQgBgIAGgIQAGgHAKgBQAJgBAHAFQAIAGACAJQABAIgGAIQgGAHgKABIgDAAQgHAAgHgEg");
	this.shape_1.setTransform(5.4671,3.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#54453B").s().p("AgTAYQgKgHgCgNQgCgLAIgKQAIgKAOgCQAMgCAKAIQALAIACAMQACAMgIAKQgJAJgNACIgEAAQgJAAgKgGg");
	this.shape_2.setTransform(5.4582,4.0414);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(2.3,1,6.3999999999999995,6.1), null);


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
	mask.graphics.p("AgvAQQgGgHAAgIQAFgHAKgHQAVgPAWAAQAYAAAZAQQgEAKgJAJQgTATgcACIgHABQgYAAgKgNg");
	mask.setTransform(5.4,2.8621);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAAQAAgCADgCQACgCACABQAAAAABAAQABAAAAAAQABAAAAABQABAAAAABQACACAAACQAAAGgHAAQgHgBABgGg");
	this.shape.setTransform(5.6241,4.695);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302E2E").s().p("AgBAUQgIAAgGgHQgGgGABgHQABgJAGgFQAHgGAIABQAJABAFAGQAGAGgBAIQAAAIgHAGQgGAEgHAAIgCAAg");
	this.shape_1.setTransform(4.3801,3.4306);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#54453B").s().p("AgBAbQgMAAgIgJQgIgJABgKQABgLAJgHQAJgIALABQAMABAIAIQAIAJgBAKQgBALgJAIQgIAGgKAAIgCAAg");
	this.shape_2.setTransform(4.375,3.5293);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(1.5,0.8,5.8,4.9), null);


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
	this.shape_22.graphics.f("#604A3E").s().p("AAAAcQg3gMgQguQACAFAfAJQANAFAPgCIAbgEIAZgEQAOgBALAEQAEABAAACQABACgBAEQgKAognAAQgKAAgMgDg");
	this.shape_22.setTransform(0,-2.494);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#916E50").s().p("AAZA0QghgOgSgQQgmgfACguIAUAYQAYAZAYABQAoACACAFQAVAPgIAXQgGAQgOAAQgHAAgJgEg");
	this.shape_23.setTransform(-0.8304,0.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgTAEIgbgSQAPAGAogFIAmgGIAAAnIgJAAQgeAAgbgQg");
	this.shape_24.setTransform(-1.0439,-0.354,1,1,10.4691);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#523F31").s().p("AALAfQg8gBgZgrQACADAQADIATACQAOABAPgEIAagLQAggNATACQADAAACACQABACAAAFQgCA0g7AAIgDAAg");
	this.shape_25.setTransform(-0.389,-2.9352,1,1,10.4691);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#916E50").s().p("AAmAtQgmgIgUgMQgsgZgJguIAaAVQAeAUAYgEQApgGAEAGQAZAJgEAaQgDAVgUAAIgMgCg");
	this.shape_26.setTransform(-1.0966,0.2233,1,1,10.4691);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgJANQgbgKgNgPQAVAEAogFIAmgGIAAAmIgSABQgXAAgSgHg");
	this.shape_27.setTransform(-1.2411,-0.3907,1,1,10.4691);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#523F31").s().p("AACAdQgggBgRgIQgSgJgJgWQACAEAQACIATACQAOACAPgFIAagKQAggNATACQADAAACACQABABAAAFQgCAwhEAAIgDAAg");
	this.shape_28.setTransform(-0.3434,-3.182,1,1,10.4691);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#916E50").s().p("AAlAxQgigCgfgSQgigTgIg6QALARAQARQAeAfAYAAQAZAAAKgBQALgCABABQAJAEACACQADAEgBAIQgCAMgHADQgEABgKAAIgLAAg");
	this.shape_29.setTransform(-1.3566,0.372,1,1,10.4691);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgLAMQgfgLgJgQQAZAHAogFIAmgGIAAAmIgQABQgZAAgWgIg");
	this.shape_30.setTransform(-1.4615,-0.436,1,1,10.4691);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#916E50").s().p("AgeAdQgfgWgJg4QALARAWAYQAXAYAYAEQAYADAMgFQAMgEAEABQAFACACADQADAEgBAHQgCAMgHADQgIADgbABIgDAAQgYAAgegVg");
	this.shape_31.setTransform(-7.45,-5.45,1,1,13.6802,0,0,-7,-4.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#916E50").s().p("AgfAeQgfgWgJg5QALARAXAaQAXAaAaAEQAcAFAJgHQAKgGAFADQAFADACADQABAEgCAGQgCAGgGADQgGACgcADIgHABQgYAAgcgUg");
	this.shape_32.setTransform(-7.55,-5.55,1,1,17.3715,0,0,-7.2,-4.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgKAMQgegLgNgSQAdAJAogFIAmgGIAAAmIgQABQgZAAgXgIg");
	this.shape_33.setTransform(-1.6336,-0.4678,1,1,10.4691);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#523F31").s().p("AAEAdQghgBgRgIQgRgJgMgNQAFgFAPACIATACQAOACAPgFIAbgKQAggNASACQADAAADACQABABAAAFQgCAwhFAAIgCAAg");
	this.shape_34.setTransform(-0.5155,-3.2138,1,1,10.4691);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#916E50").s().p("AgdAdQgjgYgIg0QAHAEAOAOQAOAPAMAQQANAQAaAFQAbAFAKgHQAJgGAGADQAFADACADQABAEgCAGQgCAGgGACQgGADgcADIgHAAQgYAAgcgTg");
	this.shape_35.setTransform(-7.7,-4.8,1,1,17.3715,0,0,-7,-4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_23},{t:this.shape_22}]},17).to({state:[]},1).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},2).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]},1).to({state:[{t:this.shape_31},{t:this.shape_28},{t:this.shape_30}]},1).to({state:[{t:this.shape_32},{t:this.shape_28},{t:this.shape_30}]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},1).wait(1));

	// Layer_4
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AACALIgLgEIgHgBIgJgDQgEgBgBgDIgBgCIABgEIABgBQABgCADgBQAfAJAZgBQgCADACACQACADgCADQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBIgCADIgCABIgEABIgNgBg");
	this.shape_36.setTransform(-1.0177,4.3728,1,1,10.4691);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AANAPQgJgBgEgCIgLgGIgHgCQgEgCgDgCQgEgCAAgEIAAgCIAAgEIABgBQACgBAEgBQAcAPAZADQgCACABADQACAEgEACQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBIgCACIgDACg");
	this.shape_37.setTransform(-1.1,4.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_36}]},23).to({state:[{t:this.shape_37}]},1).wait(1));

	// Layer_3
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#BB6F6F").s().p("AgXAEQgFgFADgIQAOgGAQAGQAQAFAGAEQACALgMACIgIAAQgRAAgPgJgAAAABIANADIAAgBIgGgHg");
	this.shape_38.setTransform(-1.225,3.537,1,1,10.4691);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#BB6F6F").s().p("AgXACQgGgGABgGQAUgDAQAFQARAFAEAHQAAAGgMABIgHABQgRAAgQgKg");
	this.shape_39.setTransform(-1.3208,3.6327,1,1,10.4691);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#BB6F6F").s().p("AARAPQgVgBgQgOIgGgHQgEgEACgDQAYAAAQAJQAPAGADAJQgBAFgKAAIgCAAg");
	this.shape_40.setTransform(-1.6205,4.0771);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_38}]},22).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).wait(1));

	// Layer_2
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#916E50").s().p("AgJAWQgNgGgGgHQgGgIgDgJQgCgKAFgFIAAAAIAGACQAIACAHgBQAHgCADgDIAAACQACAKACACQADABAGgBQAGgCADgJIACAAIANAEQAIAKgGAQQgGARgQABIgFAAQgLAAgHgEg");
	this.shape_41.setTransform(-0.6981,4.0197);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#523F31").s().p("AASAcIgCgBIADgGQADgFAAgHQAAgHgCgCIgDgCQgBgBgFAAQgFAAgGAJQgHAJABAJQgDADgHACQgIACgHgDIgGgCQgEgJADgKQADgJAOgOQAPgPAXABQAXABAAAWQABAVgKARIAAAAIgNgDg");
	this.shape_42.setTransform(-0.37,-1.0026);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#AF3838").s().p("AgJAVQgDgCgBgKIAAgCQgBgIAHgKQAGgJAFAAQAFAAABABIADADQACACAAAHQgBAHgCAEIgDAGQgDAJgGACIgFAAIgEAAg");
	this.shape_43.setTransform(0.3496,0.7365);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#AF3838").s().p("AgoAJIgMgyIBpAbQgbAYAMAgg");
	this.shape_44.setTransform(-1.7,-0.4);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#AF3838").s().p("AggAOIgWgvIBsAHQgVAcARAdQgMADgLAAQgdAAgegUg");
	this.shape_45.setTransform(-2.2441,-0.2417,1,1,10.4691);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#AF3838").s().p("AggAJIgWgvIBsAHQgRAuASAYQgwgDgngbg");
	this.shape_46.setTransform(-2.313,0.2692,1,1,10.4691);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#AF3838").s().p("AgkgBQgfgsATgHIBpAbQgbAyALAcQg1gCgYg0g");
	this.shape_47.setTransform(-2.0574,0.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]},9).to({state:[]},1).to({state:[{t:this.shape_44}]},11).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-6.7,16.4,16.3);


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
	this.shape.graphics.f("#CD958B").s().p("AgkALIgGgGQgDgFAHgHIAFgEQAHgEAHAFIATADQAWADAWgJQgIAKgOAHQgSAKgSAAQgLAAgLgDg");
	this.shape.setTransform(-1.4583,-1.2269);

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


(lib.uio797979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B73538").s().p("AgZCgIABgmIhMAvQgOAHgOgXQgagwAIiXQAHiYBEghQAhgQAgANQBlA0AmBoQAOAlACAkQACAdgGALQgVAmhMBYQgmAsghAkQgDgjABgug");
	this.shape.setTransform(14.9839,24.0963);

	this.instance = new lib.p9u09009("synched",0);
	this.instance.setTransform(12.4,5.4,1,1,0,0,0,12.4,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,65.2,143.1);


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


(lib.ClipGroup_0 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AgXAjQhCgIAOguQAFgTAwAEQA0AEAwAmQgfAcgxAAIgVgBg");
	mask.setTransform(7.8033,3.5188);

	// Layer_3
	this.instance = new lib.ClipGroup_2();
	this.instance.setTransform(8.35,3.6,1,1,0,0,0,7.8,3.6);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0, new cjs.Rectangle(0.5,0,15.2,7.1), null);


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
	this.instance_1.setTransform(30.95,2.85,2.0882,2.0882,0,0,0,8,4.2);

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
	this.instance_3.setTransform(-27,3,2.0882,2.0882,0,0,0,6.2,3.8);

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
	this.instance_3.setTransform(-13.65,4.6,1,1,0,0,0,7,4);

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
	this.instance_8.setTransform(14.75,4.75,1,1,0,0,0,6.2,3.9);

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

	// Layer_8
	this.instance = new lib.gjkfujyuli("single",0);
	this.instance.setTransform(-0.9,-27.2,0.6362,0.6362,0,-0.9098,179.0902,16.3,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2436).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(6).to({startPosition:3},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(7).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(78).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(52));

	// Layer_21
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#453B33").s().p("Ag5APIANgPQAUgRAYABQAaABASAPQAKAIAFAIQgtgYgiAMIgWAKQgGADgEAAIgFgCg");
	this.shape.setTransform(36.6416,-68.6742,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3063));

	// Layer_22
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453B33").s().p("AA5AQQgRgIgMgEQgugOg7AVIATgOQAZgQAhABQAiABAZARQAMAJAHAJIgHABQgFAAgJgDg");
	this.shape_1.setTransform(-7.9699,-69.8871,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3063));

	// Layer_19
	this.instance_1 = new lib.hkjdtykukuk("synched",0);
	this.instance_1.setTransform(5.15,-52.25,0.6815,0.6955,0,0.6788,-179.3201,11.7,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3063));

	// Layer_12
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C0A07E").s().p("AgMAAQABgcAYAKQgRADgBAPQgCARASABQgHADgEAAQgOAAACgVg");
	this.shape_2.setTransform(10.2579,-39.8502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3063));

	// Layer_13
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C0A07E").s().p("AgMARQASAAAAgQQABgPgRgFQAZgHgCAcQgBATgMAAQgEAAgIgEg");
	this.shape_3.setTransform(19.4726,-39.1227,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3063));

	// Layer_14
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453B33").s().p("AgrBmIgJgtIgDgXQgBgRAKgiQAFgSAHgHIAOgKIAhgUQAHgEADgEIAGgIQALgNAQAAIgCABQAFAMgHANQgHANgNACQAEAKgGALQgGAKgLACQABANgDAHQgFALgKgBQABAEgEAGIgHAKQgCAFgBALQgDAKgGABQAJASgPAbQgFAHgEAAIgCAAg");
	this.shape_4.setTransform(-20.7054,-73.0704,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3063));

	// Layer_15
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#453B33").s().p("Ai8BFQgTgcAVg5QAIgZAMgJQAGgFAOgGIAfgOQAUgIAKAAQALgBAUAJQAVAJAJACQAIABANgCQAOgBAGAAQAMABAIAHQAKAIgBAKQAKgLARABQARACAJANQATgOAWAJQADgGAIgCQAHgBAHADQAJAFAKARIAHABQAHAHAAALQAAAKgGAJQgIALgZANQgPAIgHAAQgPAAgEgLQgEASgOAHQgHAEgIgCQgJgBgFgGQgCAFgFABQgGAAgFgDQgEgDgHgOQgKAIgNgGQgNgFgBgMQgFAFgJAAQgKAAgGgFIgEgEIgEgDQgDAAgHADQgLAEgLgDQgMgDgHgJQgBAHgHACQgHACgFgEQAEAHgIAHQgIAGgHgFQAHALgIAOQgHAMgNAIQgLAGgHAAIgBAAQgOAAgLgPg");
	this.shape_5.setTransform(8.8064,-98.6399,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3063));

	// Layer_16
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("Aj1DbIgFgCQgHgGgDgJQgDgKADgJQACgLgBgCIgEgGIgEgFQgCgFAFgJQAEgLAAgFIgEgJQgHgQAOghQgIgFgBgMQgBgLAEgMIAHgVQAEgLgCgIIgDgQQgBgKAEgEIAFgEQADgCABgDQACgDgCgIQgEgUALgSQAMgSASgCQgCgKADgIQADgKAHgGQAOgNARAHQABgOANgIQAMgHAPABQASACAFgEQAEgCAFgFQAEgEAKgEQAlgPAVAHIAIACQAEAAAHgEQASgJAWAFQAWAFAOARQAEgJALgCQAKgCAJAGQALAJAKAaQAQgFANAOQANAOgDASQAKgGAMACQAMACAJAIQAJAIAEANQAFANgDAMQANAAALAHQALAIAEANQAFANgDAPQgDANgJAJQgBASgPAKQgQALgPgIIAAgCQgDgFgLgDQgigFgRgEQgdgHgNgRIgNgVQgPgWgfgIQgVgFgiABQglAAgUAEQgfAGgUARQgPANgSAdQg4BdgaBrQgCAMgGAAIgBAAg");
	this.shape_6.setTransform(-2.9853,-102.2674,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3063));

	// Layer_17
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C0A07E").s().p("AAOAVQgDgPgJgNQgIgTgNgUQAGABAJAJQAFAHAFAHQARAcgFApIgEgag");
	this.shape_7.setTransform(-37.1841,-51.1724,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3063));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D3B289").s().p("AALBHQgWgCgSg9QgXhOAoAAQANgBAMAOQAOAOgCATQAAAOAGABQADAAAEgDIgHBJQgHAKgLAAIgCAAg");
	this.shape_8.setTransform(-35.256,-50.1502,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3063));

	// Layer_23
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D3B289").s().p("AhMDzIg/gmQgzgrgIhEIAEgXIADhHQAKguAGgXQALgoAVgVQAdgaAFgVQACgMgGgbQgHgdAegRQAjgTAxAlQBDA1BBgUQAhgKASgVQAUBCACAsQADA5gXAiQgUAcACAmQADA7gCANQgGAsgrA3QgrA5gqAOQgIACgLAAQghAAg0gag");
	this.shape_9.setTransform(7.6437,-52.1747,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3063));

	// Layer_24
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#453B33").s().p("AiJDoQhpgngDhVQgFiPARg/QAchuBkgfQCXgvB0BrQA6A2AbA/QgXChiDBeQgpAdgvATIglANQg0gCg1gUg");
	this.shape_10.setTransform(-4.9858,-87.1284,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3063));

	// Layer_25
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BEBB89").s().p("AgpB/QgYgDgBgOQgEgrgQhHQgShUgFgeQAAgHABgBQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABIACAEQAXgJAXAOQAWAOADAXQAVgEASAQQASAPgBAWQAcgDATAUQAJAKAEAMQADANgCANQAJABAHAJQAGAIgCAKQgCAJgKAFQgKAEgJgEQADAOgNAJQgOAKgMgGQgFAQgJAGQgGADgIgCQgHgCgCgGQgHAKgUAAIgTgCg");
	this.shape_11.setTransform(35.1121,-115.8188,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3063));

	// Layer_26
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#453B33").s().p("AD5ByQgMgKgdAFQgZAEg/ACQgRABgJgBQgPgCgLgHIgPgIQgEAAgLADQgPAFgQgEIgJgEQgHgCgEAAQgJgBgOAHQgRAIgGABQgKACgPgDIgagFIgjACQgUACgLgJIgGgFIgHgEQgDgBgLABQgMABgLgFQgMgGgIgKQgHgLgDgOQgCgOAEgMQAEgMAHgIQAMgOAigSQgEgEADgHQADgGAGgDIAMgDQAHgBAEgDQAGgDAJgMQAEgEAFgBQAFgBAEAEQgBgJAHgGQAHgGAHADIAMAGQAEABAGgEIALgHQAEgBAOAAQAMABAEgFIAHgJQAGgEALAIQAMAHAGgBIAKgHQAIgEAJADQAJAEAEAJQADgMAMgGQAMgFALAEQAVAGAMAcQASgFAQASQAKAMAHAYQAKgIANAGQANAHACAOQAUAKAMAXQALAXgEAZQAIgCAHAHQAGAGABAJQACANgKAOIACADIgGACIAEgFg");
	this.shape_12.setTransform(4.957,-129.5749,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3063));

	// Layer_27
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#453B33").s().p("AAEBBQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgQACgJgFQgGgCgEgHQgDgGACgGQgDAEgGgBQgFAAgEgDQgGgFgEgMQgEgMAGgFQgGAAAAgLQABgUAPgQQAQgQAUgBQAKgBATAEQAIACAGADIAHAFQADADAEABIAHACQAGACAEAFIABABQAKAIAAAKQAAAFgEAFQgEAEgFAAQAJAHgDAOQgCAOgMAEQADAMgHAHQgEAEgGgBQgGgBgCgEQgFAGgIAFQgEADgEAAIgBAAg");
	this.shape_13.setTransform(42.55,-97.877,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3063));

	// Layer_28
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#453B33").s().p("AAXCDQgMgBgEgZQgIAAgHgIQgHgIgCgKQgJAAgIgJQgHgJABgLQgUgEgIgLQgFgIACgJQACgKAHgDQgNgSgCgNQgBgKAEgJQAEgJAHgDQgLgMAFgUQAFgTAOgFIgCgCQAFgOAaAAQASgBAJAHQAKAHABANQAGgGAJAEQAIADAEAJQAFALgDAZQAHgBAHAFQAGAEADAIQAEAJABAWIAEBJQABAZgFALQgEAKgOAMIgYAIIgIACIgBAAg");
	this.shape_14.setTransform(-41.1679,-53.4973,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3063));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.3,-152.6,112.6,152.6);


(lib.UIL78L7T8LT8L = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#343433").s().p("AANgGQgdgHgqAQQgMAGgLgIIgIgIQAFAFAQAAQgLgFgGgMIgFgLQAFAMAaAJQgKgEgGgKIgEgKIAKALQAQAJAkgGQAigHApAdQAUAPANAQQg5gigVgGg");
	this.shape.setTransform(-1.45,6.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:true},1).wait(3059));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#855154").s().p("AAGAAQgLgEghACIgfACQAOgZAkgDQARgBAOADQApALANAXQAGAMgCAJQgZgSgngLg");
	this.shape_1.setTransform(-0.425,5.4275);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3).to({_off:true},1).wait(3059));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#343433").s().p("Ag3AEQAcgUAhAGQAhAGAQgJQAHgEACgGQgDAQgPAGQAXgIAGgLQgFASgQAHQAQAAAEgFQgDAFgFAEQgKAHgMgFQgvgLgJAAQgkgBgaAZg");
	this.shape_2.setTransform(27.925,6.5125);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3).to({_off:true},1).wait(3059));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#855154").s().p("AgyAGQALgWAggJIAYgBQAbAFALAZQgsgIgOAEQgeAJgVASg");
	this.shape_3.setTransform(26.25,5.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3).to({_off:true},1).wait(3059));

	// _Clip_Group__0
	this.instance = new lib.ClipGroup_0();
	this.instance.setTransform(-0.4,8.55,1,1,0,0,0,8.1,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:true},1).wait(3059));

	// Layer_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXAjQhCgIAOguQAFgTAwAEQA0AEAwAmQgfAcgxAAIgVgBg");
	this.shape_4.setTransform(-0.6967,8.5688);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3).to({_off:true},1).wait(3059));

	// Layer_9
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3B4C56").s().p("ACsA4IgCgBIgCgBIhWgnQgkgPgRgGQgdgLgZgCQgygFgsAVIgfAQQgSAJgOACQAOgYAggPQAVgKAogLIA6gNQAfgGAaAAQBEgBAqAjQAQANAJAPQAKATgDASQgBAJgFACIgDABIAAAAg");
	this.shape_5.setTransform(18.611,-20.3264);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3).to({_off:true},1).wait(3059));

	// Layer_10
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#465E6D").s().p("AkuDNQhRhrAMhcQAMhXAUg6QARg0ATgWQAVgYAhgiQAsguAMgIQA0giBXgBQAqgBBsAMQAzAFA2AgQAnAXA1AtQAIAHADAIQADAKgHAEQAiATAZAeQAPASgCAOQAFAWgKAWQg1gWgagOIgigUQgVgLgQgFQgagIgmACQhVAFhIA1QhGAzgpBPQgoBPgGBaQgGBbAeBSQhlhHhAhWg");
	this.shape_6.setTransform(0.0265,-6.101);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3).to({_off:true},1).wait(3059));

	// Layer_11
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A1A5A8").s().p("ACaAvQiHgvkCBmQADgNAJgUQARgoAbggQBVhsCUgEIAgABQAnAFAfARQBkA2gNCaQgQgthFgYg");
	this.shape_7.setTransform(12.3998,-15.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3).to({_off:true},1).wait(3059));

	// Layer_12
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#664F3F").s().p("AAJApQAYgbgpgZQgGgFgEgJQgIgSAGgTIADAPQAFASAMAPIAIAIQAKAKAEAKQALAgg4ARg");
	this.shape_8.setTransform(16.3146,14.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3).to({_off:true},1).wait(3059));

	// Layer_13
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#8F6F50").s().p("AgoARQghgHgFgYIABgFQADAMAPAIQAMAIAPADQAtAEAlgNQATgGAJgIQgKALgVAIQgbAMgcAAQgPAAgRgDg");
	this.shape_9.setTransform(-0.7,10.5391);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3).to({_off:true},1).wait(3059));

	// Layer_14
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgXAjQhCgIAOguQAFgTAwAEQA0AEAwAmQgfAcgxAAIgVgBg");
	this.shape_10.setTransform(-0.6967,8.5688);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3).to({_off:true},1).wait(3059));

	// Layer_15
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8F6F50").s().p("AgzAKIgBgCQAJAKAVAAQARABAPgFQASgFAPgOQAHgIADgHQgEATgVALIgUAJQgMACgLAAQgZAAgLgLg");
	this.shape_11.setTransform(26.425,9.521);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3).to({_off:true},1).wait(3059));

	// _Clip_Group__1
	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(26,9,1,1,0,0,0,5.4,3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3).to({_off:true},1).wait(3059));

	// Layer_17
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgxAQIgHgPIAfgVQAngRArAaQgEAJgKAJQgUATgdACIgHAAQgZAAgLgMg");
	this.shape_12.setTransform(26.1,8.6975);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3).to({_off:true},1).wait(3059));

	// Layer_18
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#664F3F").s().p("AAUAaQgEgTgMgPIgMgWQgHgMgKgNQAOABATAcQAYAhgHAxIgFgeg");
	this.shape_13.setTransform(-21.7607,10.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(3).to({_off:true},1).wait(3059));

	// Layer_19
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#775A45").s().p("AAPBUQgfgCgYhJQgPguAJgZQAHgWAWAAQASAAARAQQARARgBAWQgBARAIAAQAFABAEgDIgJBWQgKANgOAAIgCgBg");
	this.shape_14.setTransform(-20.3403,10.9527);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(3).to({_off:true},1).wait(3059));

	// Layer_20
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#604A3E").s().p("AAAAaQgygMgOgpQADAHAbAGQAMAEAOgBIAYgEQAcgGARAFQAAAAABAAQABABAAAAQABAAAAABQAAAAAAAAQABACgBAEQgJAkgjAAQgJAAgLgCg");
	this.shape_15.setTransform(10.875,26.7231);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3).to({_off:true},1).wait(3059));

	// Layer_21
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#8F6F50").s().p("AAXAvQgegNgQgOQgigcABgqIASAWQAWAWAWABQAjACADAFQATANgIAWQgFAOgNAAQgGAAgIgEg");
	this.shape_16.setTransform(10.1297,29.0112);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3).to({_off:true},1).wait(3059));

	// Layer_22
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#453B33").s().p("AhFASIARgTQAXgTAeABQAeABAXASQALAKAFAJQg1gcgpAOIgbAMQgGADgFAAQgEAAgDgCg");
	this.shape_17.setTransform(28.1,-1.2886);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3).to({_off:true},1).wait(3059));

	// Layer_23
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#453B33").s().p("ABFATIgjgOQg4gShGAaIAWgRQAegTAoABQAoABAeAVQAQALAHAKQgDACgFAAQgHAAgJgEg");
	this.shape_18.setTransform(-1.225,-2.0264);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3).to({_off:true},1).wait(3059));

	// Layer_24
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#775A45").s().p("AhnEgIhUgtQhFgzgLhQIAGgZIAEhXQADgJAFhJQADgxAcgXQAtgmANgSQAPgWgHgZQgEgNAIgQQAJgRASgJQAvgXBCAtQBbA/BXgZQAsgMAZgYQAaBOADA1QAEBDggApQgaAiADAtQAFBGgDAQQgJA0g5BBQg7BEg4AQQgMADgPAAQgrAAhHggg");
	this.shape_19.setTransform(9.4475,9.7066);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3).to({_off:true},1).wait(3059));

	// Layer_25
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#465E6D").s().p("ABlCaQhogehPhQQhQhPgdhpQgCgIACgHQACgIAGABQACAAAFAEQAgAaAhA5QAqBMAMAQQArA5BHAiQATAJAuARIBDAZQgOAEgQAAQgaAAgggJgAC9CfIADgBIACADgAC9Cfg");
	this.shape_20.setTransform(-8.05,25.9535);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3).to({_off:true},1).wait(3059));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.3,-42.2,74.69999999999999,84.5);


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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(178).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(8).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(9).to({startPosition:0},0).wait(4).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(65).to({startPosition:17},0).wait(617).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(6).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(5).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(17).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:22},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(3).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(11).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(6).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(14).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(13).to({startPosition:21},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:22},0).wait(3).to({startPosition:20},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:24},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:20},0).wait(2).to({startPosition:22},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:17},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:23},0).wait(2).to({startPosition:21},0).wait(2).to({startPosition:20},0).wait(1414));

	// Layer_26
	this.instance_1 = new lib.gfhsrtjhqecopy("synched",14);
	this.instance_1.setTransform(25.55,-41.4,1.0458,1.0548,0.5893,0,0,9.5,3.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3063));

	// Layer_9
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3B4C56").s().p("ADXBGIgDgBIgDgCIhrgwQgqgTgXgIQglgNgfgDQg8gGg5AaIgmAUQgXALgRACQARgdAogTQAagNAygNQAygMAWgEQAngHAggBQBVgBA0ArQAUAQALAUQAMAXgDAXQgCALgGADIgDABIgBAAg");
	this.shape.setTransform(23.131,-77.8757);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3063));

	// Layer_10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#465E6D").s().p("Al4D/QhliGAPhyQAQhxAYhEQALggAIgQQAMgaAOgSQAUgXAugxQA3g5AQgKQBAgqBtgCQAyAACIAOQBAAHBDAnQAxAdBBA4QAKAIAEALQAEAMgJAFQArAXAeAmQATAWgCASQAFAcgMAbQhGgegbgPIgsgZQgZgOgUgGQgigKgtACQhrAGhaBCQhWA/gzBkQgyBigIBwQgHBxAmBmQh/hZhPhqg");
	this.shape_1.setTransform(0.004,-60.1759);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3063));

	// Layer_11
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1A5A8").s().p("ADAA6Qipg7lBB/QAQhCA1hBQBqiFC5gFIAoABQAwAGAnAVQB8BDgQDBQgUg4hVgfg");
	this.shape_2.setTransform(15.4164,-72.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3063));

	// Layer_12
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#664F3F").s().p("AALAzQAegigzggQgHgGgFgLQgLgXAIgXIAEATQAHAXAOASIALALQAMALAEANQAOAohFAWQAZgLAOgRg");
	this.shape_3.setTransform(20.2847,-34.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3063));

	// Layer_18
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#664F3F").s().p("AAYAgQgFgXgOgTQgGgKgKgRQgIgQgNgQQAKABAPAPQAJAKAIAKQAeApgJA+IgHgmg");
	this.shape_4.setTransform(-27.0712,-39.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3063));

	// Layer_19
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#775A45").s().p("AATBpQgngCgdhbQgTg6ALgfQAJgbAaAAQAYgBAUAUQAWAWgCAbQgBAVALABQAFAAAGgEIgLBsQgNAPgRAAIgDAAg");
	this.shape_5.setTransform(-25.3017,-38.9695);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3063));

	// Layer_22
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#453B33").s().p("AhWAWQAHgMAOgLQAdgYAkABQAnABAcAXQAOAMAGALQhBgjg0ASIgiAPQgIAEgGAAQgFAAgDgDg");
	this.shape_6.setTransform(34.95,-54.1933);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(3063));

	// Layer_23
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#453B33").s().p("ABVAYQgZgMgTgGQhFgWhWAhQAIgMATgLQAlgXAyABQAyACAlAaQAUANAJAOQgEACgGAAQgIAAgNgFg");
	this.shape_7.setTransform(-1.55,-55.1427);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3063));

	// Layer_24
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#775A45").s().p("AiAFnIhpg4QhWhAgNhkIgBAAIAIgfIAFhsIABAAQADgLAGhbQAEg9AigdQA4gvAQgXQASgbgIgfQgFgQALgUQALgVAWgLQA7gdBRA4QByBOBsgeQA2gPAggeQAgBhAEBCQAFBUgnAyQghAqAEA4QAFBXgDAUQgMBBhGBRQhJBUhGAVQgOAEgSAAQg3AAhYgog");
	this.shape_8.setTransform(11.7233,-40.5147);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3063));

	// Layer_25
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#465E6D").s().p("AB+DAQiBglhjhkQhkhigliCQgCgKACgJQADgKAIAAQAFABAEAEQAoAgAoBIQA0BeAQAUQA0BGBaAsQAaAMA2AUIBVAfQgRAFgVAAQggAAgogLgADsDGIAEgBIABADgADsDGg");
	this.shape_9.setTransform(-10.0444,-20.3068);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3063));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.4,-105.1,92.9,105.1);


(lib.thdtryjdjy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_14
	this.instance = new lib.IUL78LT78L("synched",0);
	this.instance.setTransform(-30.1,-119.15,1,1,-23.6925,0,0,0.8,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:0.7,regY:2.4,scaleX:0.9999,scaleY:0.9999,rotation:-10.8351,x:-30.15,y:-114.3},4).to({regY:2.5,scaleX:1,scaleY:1,rotation:2.0201,x:-30.2,y:-119.2},4).to({regY:2.4,scaleX:0.9999,scaleY:0.9999,rotation:11.6626,x:-30.15,y:-124.25},3).to({scaleX:1,scaleY:1,rotation:21.307,y:-119.25},3).to({rotation:9.3068,x:-30.2,y:-114.35},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-2.6904,x:-30.3,y:-119.35},4).to({scaleX:1,scaleY:1,rotation:-14.6915,y:-124.35},4).to({regX:0.8,regY:2.5,rotation:-23.6925,x:-30.1,y:-119.15},3).wait(1));

	// Layer_15
	this.instance_1 = new lib.OUY9Y789("synched",0);
	this.instance_1.setTransform(-6.65,-39.05,1,1,-23.6925,0,0,5.9,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:10.9,scaleX:0.9999,scaleY:0.9999,rotation:-10.8351,x:-24.7,y:-36.15},4).to({regX:5.8,scaleX:1,scaleY:1,rotation:2.0201,x:-43,y:-43.1},4).to({regX:5.7,regY:10.8,scaleX:0.9999,scaleY:0.9999,rotation:11.6626,x:-56.65,y:-49.6},3).to({regX:5.9,regY:10.9,scaleX:1,scaleY:1,rotation:21.307,x:-70.1,y:-45.95},3).to({rotation:9.3068,x:-53.2,y:-39.2},4).to({regX:5.8,regY:10.8,scaleX:0.9999,scaleY:0.9999,rotation:-2.6904,x:-36.4,y:-42.45},4).to({scaleX:1,scaleY:1,rotation:-14.6915,x:-19.45,y:-45.6},4).to({regX:5.9,regY:11,rotation:-23.6925,x:-6.65,y:-39.05},3).wait(1));

	// Layer_3
	this.instance_2 = new lib.OY89Y898("synched",0);
	this.instance_2.setTransform(22.95,-123.1,1,1,0,0,0,-6.7,9.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:-118.1},4).to({y:-123.1},4).to({y:-128.1},3).to({y:-123.1},3).to({y:-118.1},4).to({y:-123.1},4).to({y:-128.1},4).to({y:-123.1},3).wait(1));

	// Layer_5
	this.instance_3 = new lib.UIL78L7T8LT8L("synched",0);
	this.instance_3.setTransform(1.35,-140,1,1,0,0,0,1.2,39.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:-135},4).to({y:-140},4).to({y:-145},3).to({y:-140},3).to({y:-135},4).to({y:-140},4).to({y:-145},4).to({y:-140},3).wait(1));

	// Layer_6
	this.instance_4 = new lib.UO79T79("synched",0);
	this.instance_4.setTransform(21.05,-0.15,1,1,-14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-6.4273,x:22.6,y:4.05},4).to({regX:0.1,regY:-0.1,rotation:2.1408,x:24.35,y:-1.85},4).to({rotation:8.5685,x:25.5,y:-7.5},3).to({regX:0,regY:0,rotation:14.9994,x:26.55,y:-3.15},3).to({rotation:7.0005,x:25.15,y:2.65},4).to({regX:0.1,regY:-0.1,scaleX:0.9999,scaleY:0.9999,rotation:-0.9968,x:23.8,y:-1.7},4).to({scaleX:1,scaleY:1,rotation:-8.9969,x:22.25,y:-5.9},4).to({regX:0,regY:0,rotation:-14.9992,x:21.05,y:-0.15},3).wait(1));

	// Layer_7
	this.instance_5 = new lib.UIOL7L7T9L7("synched",0);
	this.instance_5.setTransform(-6.25,-135.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:-130.2},4).to({y:-135.2},4).to({y:-140.2},3).to({y:-135.2},3).to({y:-130.2},4).to({y:-135.2},4).to({y:-140.2},4).to({y:-135.2},3).wait(1));

	// Layer_10
	this.instance_6 = new lib.OY8989Y9("synched",0);
	this.instance_6.setTransform(2.35,-19.5,1,1,0,0,0,3.1,-2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-14.5},4).to({y:-19.5},4).to({y:-24.5},3).to({y:-19.5},3).to({y:-14.5},4).to({y:-19.5},4).to({y:-24.5},4).to({y:-19.5},3).wait(1));

	// Layer_11
	this.instance_7 = new lib.UIOY97997("synched",0);
	this.instance_7.setTransform(-21.45,15.15,1,1,8.1935);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regX:-0.1,regY:0.1,rotation:-0.3768,x:-21.55,y:20.25},4).to({rotation:-8.9472,x:-21.6,y:15.25},4).to({rotation:-15.3759,x:-21.5,y:10.3},3).to({rotation:-21.8051,x:-21.55,y:15.25},3).to({rotation:-13.8055,y:20.25},4).to({rotation:-5.8066,x:-21.5,y:15.3},4).to({rotation:2.1925,y:10.3},4).to({regX:0,regY:0,rotation:8.1935,x:-21.45,y:15.15},3).wait(1));

	// Layer_12
	this.instance_8 = new lib.UIT77979("synched",0);
	this.instance_8.setTransform(0.3,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:7.8},4).to({y:2.8},4).to({y:-2.2},3).to({y:2.8},3).to({y:7.8},4).to({y:2.8},4).to({y:-2.2},4).to({y:2.8},3).wait(1));

	// Layer_13
	this.instance_9 = new lib.UIO8Y89("synched",0);
	this.instance_9.setTransform(25.4,-116.7,1,1,23.9485,0,0,13.1,6.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({regY:6.2,rotation:13.9514,y:-111.8},4).to({scaleX:0.9999,scaleY:0.9999,rotation:3.9577,x:25.35,y:-116.85},4).to({scaleX:1,scaleY:1,rotation:-3.5362,x:25.4,y:-121.85},3).to({rotation:-11.0359,y:-116.8},3).to({regX:13,scaleX:0.9999,scaleY:0.9999,rotation:-1.706,x:25.3,y:-111.8},4).to({rotation:7.6204,x:25.35,y:-116.85},4).to({regX:13.1,rotation:16.9495,x:25.5,y:-121.8},4).to({regY:6.3,scaleX:1,scaleY:1,rotation:23.9485,x:25.4,y:-116.7},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89.2,-226.7,188,453.4);


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

	// Layer_24
	this.instance = new lib.hmjdtyktrktuk("single",0);
	this.instance.setTransform(-6.65,47.9,0.7051,0.7051,10.207,0,0,-0.1,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(945).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(990).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(9).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(5).to({startPosition:0},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(15).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:0},0).wait(6).to({startPosition:10},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(676));

	// Layer_23
	this.instance_1 = new lib.hjluyglyilyitl("synched",0);
	this.instance_1.setTransform(-10.65,17.25,0.7186,0.7296,10.6105,0,0,13.3,3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3063));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BEA840").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape.setTransform(35.0824,34.8452,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3063));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5F6F6").s().p("AAbAvQgegUgrgQQhUgfg4AUQgOACgSAFQgkALgUAOIAWgQQAegTAhgRQBug2B1gHIBDAKQBUAYBWBAQglAfgyATQgnAPghAAQgzAAgmgjg");
	this.shape_1.setTransform(-26.8673,-18.6572,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3063));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7E6E6").s().p("ABqCEIlwguQAMg/Aqg9QBTh8CUAJIAjAEQAqAJAlAXQB0BKAKC7QgRAIgdACIgRABQgwAAgugXg");
	this.shape_2.setTransform(-0.0456,-43.7588,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3063));

	// Layer_10
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D5AE90").s().p("AgQASIARgQQAPgSABgiQAFAXgHATQgDAIgFAEQgcAMARASQAIAKAPAGQgsgNAJgTg");
	this.shape_3.setTransform(-25.5195,28.7486,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3063));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D5AE90").s().p("AgEgRQAKgSAKgCIgLASIgGAOQgHAKgDANIgDAUQgEgiAOgVg");
	this.shape_4.setTransform(36.2567,22.7972,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3063));

	// Layer_12
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBBF9A").s().p("AgWBGIgLgDIgIhfIAIAKQAHAHgBgSQgBgYALgLQAKgKAPAGQAmANgFA3QgFA8gjAJQgFACgHAAIgLgBg");
	this.shape_5.setTransform(36.0573,23.8249,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(3063));

	// Layer_14
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#292929").s().p("AAsAOQgNgKgKgEQgjgTgtAjQAFgIAKgIQATgOAZgCQAagBAUARQAJAHAEAIQgCACgDAAQgEAAgGgDg");
	this.shape_6.setTransform(-45.2377,-0.392,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1493).to({rotation:7.9505,x:-45.7873,y:0.1939},0).wait(62).to({rotation:0,x:-45.2377,y:-0.392},0).wait(1508));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("Ag7AAQATgVAjgBQAdAAAbAPQAOAHAIAIQg9ggglARQggAZgPAEg");
	this.shape_7.setTransform(-0.481,-0.8634,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1493).to({skewX:-169.2659,skewY:10.7341,x:0.6027,y:-3.3732},0).wait(62).to({skewX:0,skewY:0,x:-0.481,y:-0.8634},0).wait(1508));

	// Layer_18
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EBBF9A").s().p("AhJEVQgtgNguhCQgqg8gIgwIgDhIQgCgkgXgeQgXgfAVhBQAfhOANgmIA0gQQA+gKAzAgQAnAaAQgFIAAgHQADgLAEAEQADADgDAGQgDAEgEABQACARAaAXQATARAxAnQAYAVAMAoQAHAYAKAvIAIAJQAIAGgBgRQgBgYAMgMQALgLAPAEQApALgJA9QgIBDgiAHQgLACgMgEIgKgEIAAAAQgEAfgOAZQgQAbgfAYQgfAZgnAWQg8AkgmAAQgKAAgIgDg");
	this.shape_8.setTransform(-4.9747,19.541,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3063));

	// Layer_19
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#292929").s().p("AhQCuQh+hjgaikQAQg1AxgsQBjhWCpAzQBVAaAeBhQAVBGgEB+QgDBWhgAlQgdAMgkAFIgdADQg5gRg/gyg");
	this.shape_9.setTransform(1.2893,-13.7068,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3063));

	// Layer_20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#292929").s().p("AgfDTQARgmAHgdQAPhGAEg1QAFhDgNg2QgKgsgYgiQgYgigfgQIghgsQAngNAzAJQA2AKAcAeQAPAPAVAfQAQAYgCAIQgDALAMAbQAEAJABAZIAABeIABAXQAAAOgCAJIgNA5QgFASgTAdQghAygXAWQgPAPgyAkQAAgwAKgWg");
	this.shape_10.setTransform(26.6149,-6.7923,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3063));

	// Layer_21
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#292929").s().p("AARDaQgshFAZhZQAMgsADguQAFhggwgVQgUAGgTAMQgmAZACAhIgjhsIAbgeQAgghAggPQBmgxA8CVIAJAfQAKAmAFAkQAPBzguA2IghA0QgcA8AWApQgbgRgXgjg");
	this.shape_11.setTransform(52.3259,-6.6126,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3063));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DDDCDC").s().p("AhfAcIgFgSQAsgoBTgJQApgEAhADQgHAehHAcIhEAXIgOABQgaAAgKgOg");
	this.shape_12.setTransform(-60.0437,-14.7608,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(3063));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.1,-73.7,159.7,147.4);


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

	// Layer_8
	this.instance = new lib.uil7tlt78l7l("synched",49);
	this.instance.setTransform(11.75,-136.9,0.8036,0.8036,-1.3014,0,0,13.8,0.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(49).to({_off:false},0).wait(132).to({startPosition:181},0).to({regX:13.9,rotation:1.1904,x:16.45,y:-136.5,startPosition:192},11).wait(126).to({rotation:1.1904,startPosition:318},0).to({regX:14,regY:0,scaleX:0.8035,scaleY:0.8035,rotation:1.4908,x:11.25,y:-136.6,startPosition:331},13).wait(57).to({startPosition:388},0).to({regX:14.1,regY:-0.1,rotation:3.6823,x:17.3,y:-136,startPosition:397},9).wait(45).to({rotation:3.6823,startPosition:442},0).to({regX:13.8,regY:0.2,scaleX:0.8036,scaleY:0.8036,rotation:-1.3014,x:11.75,y:-136.9,startPosition:451},9).wait(673).to({rotation:-1.3014,startPosition:1124},0).to({regX:13.9,regY:0.1,rotation:-3.2637,x:17.45,y:-137.1,startPosition:1135},11).wait(171).to({startPosition:1306},0).to({regX:14,scaleX:0.8035,scaleY:0.8035,rotation:0.0163,x:10.9,y:-135.85,startPosition:1318},12).wait(96).to({rotation:0.0163,startPosition:1414},0).to({regX:14.1,regY:0,rotation:-0.2579,x:21.55,y:-135.6,startPosition:1425},11).wait(96).to({startPosition:1521},0).to({regX:14.2,regY:-0.1,rotation:-2.4947,x:16.25,y:-136.55,startPosition:1531},10).wait(113).to({startPosition:1644},0).to({regX:13.8,regY:0.2,scaleX:0.8036,scaleY:0.8036,rotation:-1.3014,x:11.75,y:-136.9,startPosition:1653},9).wait(1410));

	// Layer_14
	this.instance_1 = new lib.IUL78LT78L("synched",0);
	this.instance_1.setTransform(-30.15,-119.15,1,1,0,0,0,0.8,2.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({regY:2.4,rotation:-4.7361,x:-27.2,y:-120.8},11).wait(126).to({startPosition:0},0).to({regX:0.7,regY:2.2,rotation:-0.7336,x:-31.15,y:-119.9},13).wait(57).to({startPosition:0},0).to({rotation:6.6597,x:-25,y:-120.95},9).wait(45).to({startPosition:0},0).to({regX:0.8,regY:2.5,rotation:0,x:-30.15,y:-119.15},9).wait(673).to({startPosition:0},0).to({regX:0.7,rotation:7.7124,x:-25.75,y:-119.55},11).wait(171).to({startPosition:0},0).to({regX:0.6,regY:2.4,rotation:14.2254,x:-31.1,y:-118.65},12).wait(96).to({startPosition:0},0).to({regX:0.5,rotation:2.931,x:-21.5,y:-120.55},11).wait(96).to({rotation:2.931},0).to({rotation:8.4379,x:-26.15,y:-119.85},10).wait(113).to({startPosition:0},0).to({regX:0.8,regY:2.5,rotation:0,x:-30.15,y:-119.15},9).wait(1410));

	// Layer_15
	this.instance_2 = new lib.OUY9Y789("synched",0);
	this.instance_2.setTransform(-40.85,-36.35,1,1,0,0,0,5.9,11);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({regX:6,scaleX:0.9999,scaleY:0.9999,rotation:-109.7373,x:-20.3,y:-39.75},11).wait(126).to({startPosition:0},0).to({regX:6.1,regY:10.9,rotation:-99.7866,x:-29.9,y:-38.5},13).wait(57).to({startPosition:0},0).to({regX:6.2,regY:10.8,rotation:-92.3912,x:-34.25,y:-40.2},9).wait(45).to({startPosition:0},0).to({regX:5.9,regY:11,scaleX:1,scaleY:1,rotation:0,x:-40.85,y:-36.35},9).wait(673).to({startPosition:0},0).to({regY:10.9,rotation:-92.7472,x:-37.45,y:-39.9},11).wait(171).to({startPosition:0},0).to({regX:6,rotation:-86.2334,x:-51.7,y:-40.85},12).wait(96).to({startPosition:0},0).to({regX:6.1,regY:10.8,rotation:-90.5744,x:-26.5,y:-40.2},11).wait(96).to({startPosition:0},0).to({regX:6.2,regY:10.7,scaleX:0.9999,scaleY:0.9999,rotation:-85.0662,x:-38.9,y:-40.4},10).wait(113).to({startPosition:0},0).to({regX:5.9,regY:11,scaleX:1,scaleY:1,rotation:0,x:-40.85,y:-36.35},9).wait(1410));

	// Layer_3
	this.instance_3 = new lib.OY89Y898("synched",0);
	this.instance_3.setTransform(22.95,-123.1,1,1,0,0,0,-6.7,9.2);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({rotation:2.4924,x:27,y:-122.25},11).wait(126).to({startPosition:0},0).to({rotation:0.7589,x:22.25,y:-123},13).wait(57).to({rotation:0.7589},0).to({regX:-6.6,regY:9.1,rotation:2.9511,x:27.8,y:-122},9).wait(45).to({startPosition:0},0).to({regX:-6.7,regY:9.2,rotation:0,x:22.95,y:-123.1},9).wait(673).to({startPosition:0},0).to({rotation:2.2378,x:27.5,y:-121.4},11).wait(171).to({startPosition:0},0).to({regX:-6.6,rotation:0.2868,x:22.15,y:-122.25},12).wait(96).to({rotation:0.2868},0).to({rotation:3.9917,x:31.9,y:-120.6},11).wait(96).to({startPosition:0},0).to({regX:-6.5,regY:9.1,rotation:1.7532,x:27.25,y:-122},10).wait(113).to({startPosition:0},0).to({regX:-6.7,regY:9.2,rotation:0,x:22.95,y:-123.1},9).wait(1410));

	// Layer_6
	this.instance_4 = new lib.UO79T79("synched",0);
	this.instance_4.setTransform(23.55,-0.15);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({startPosition:0},11).wait(126).to({startPosition:0},0).to({startPosition:0},13).wait(57).to({startPosition:0},0).to({startPosition:0},9).wait(45).to({startPosition:0},0).to({startPosition:0},9).wait(673).to({startPosition:0},0).to({startPosition:0},11).wait(171).to({startPosition:0},0).to({startPosition:0},12).wait(96).to({startPosition:0},0).to({startPosition:0},11).wait(96).to({startPosition:0},0).to({startPosition:0},10).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(1410));

	// Layer_7
	this.instance_5 = new lib.UIOL7L7T9L7("synched",0);
	this.instance_5.setTransform(-6.35,-145.2,1,1,0,0,0,-0.1,-10);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({rotation:2.4924,x:-1.25,y:-145.6},11).wait(126).to({startPosition:0},0).to({regY:-10.1,rotation:2.7927,x:-6.35,y:-145.75},13).wait(57).to({startPosition:0},0).to({regX:-0.2,rotation:4.9845,x:-0.05},9).wait(45).to({startPosition:0},0).to({regX:-0.1,regY:-10,rotation:0,x:-6.35,y:-145.2},9).wait(673).to({startPosition:0},0).to({rotation:-1.9614,x:-0.9,y:-144.7},11).wait(171).to({startPosition:0},0).to({regX:-0.2,rotation:1.3186,x:-7.1,y:-144.55},12).wait(96).to({rotation:1.3186},0).to({regX:-0.1,regY:-10.1,rotation:1.0431,x:3.5,y:-144.25},11).wait(96).to({startPosition:0},0).to({regX:-0.2,rotation:-1.1944,x:-2.2,y:-144.4},10).wait(113).to({startPosition:0},0).to({regX:-0.1,regY:-10,rotation:0,x:-6.35,y:-145.2},9).wait(1410));

	// Layer_10
	this.instance_6 = new lib.OY8989Y9("synched",0);
	this.instance_6.setTransform(2.35,-19.5,1,1,0,0,0,3.1,-2.8);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({rotation:2.4924,x:1.95,y:-19.65},11).wait(126).to({startPosition:0},0).to({rotation:0.7589,x:0.35,y:-19.7},13).wait(57).to({rotation:0.7589},0).to({regY:-2.9,rotation:2.9511,x:1.95,y:-19.65},9).wait(45).to({startPosition:0},0).to({regY:-2.8,rotation:0,x:2.35,y:-19.5},9).wait(673).to({startPosition:0},0).to({rotation:2.2378,x:2.95,y:-18.75},11).wait(171).to({startPosition:0},0).to({rotation:0.2868,x:1.1},12).wait(96).to({rotation:0.2868},0).to({regY:-2.9,rotation:3.9917,x:4.25,y:-18.8},11).wait(96).to({startPosition:0},0).to({rotation:1.7532,x:3.5,y:-19.05},10).wait(113).to({startPosition:0},0).to({regY:-2.8,rotation:0,x:2.35,y:-19.5},9).wait(1410));

	// Layer_11
	this.instance_7 = new lib.UIOY97997("synched",0);
	this.instance_7.setTransform(-21.45,15.15);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({startPosition:0},11).wait(126).to({startPosition:0},0).to({startPosition:0},13).wait(57).to({startPosition:0},0).to({startPosition:0},9).wait(45).to({startPosition:0},0).to({startPosition:0},9).wait(673).to({startPosition:0},0).to({startPosition:0},11).wait(171).to({startPosition:0},0).to({startPosition:0},12).wait(96).to({startPosition:0},0).to({startPosition:0},11).wait(96).to({startPosition:0},0).to({startPosition:0},10).wait(113).to({startPosition:0},0).to({startPosition:0},9).wait(1410));

	// Layer_12
	this.instance_8 = new lib.UIT77979("synched",0);
	this.instance_8.setTransform(0.3,2.8);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({rotation:2.4924,x:-1.05,y:2.5},11).wait(126).to({startPosition:0},0).to({rotation:0.7589,x:-2},13).wait(57).to({rotation:0.7589},0).to({rotation:2.9511,x:-1.25},9).wait(45).to({startPosition:0},0).to({rotation:0,x:0.3,y:2.8},9).wait(673).to({startPosition:0},0).to({rotation:2.2378,x:0,y:3.45},11).wait(171).to({startPosition:0},0).to({rotation:0.2868,x:-1.1},12).wait(96).to({rotation:0.2868},0).to({regX:-0.1,regY:0.1,rotation:3.9917,x:0.5,y:3.35},11).wait(96).to({startPosition:0},0).to({regX:0,rotation:1.7532,x:0.7,y:3.15},10).wait(113).to({startPosition:0},0).to({regY:0,rotation:0,x:0.3,y:2.8},9).wait(1410));

	// Layer_13
	this.instance_9 = new lib.UIO8Y89("synched",0);
	this.instance_9.setTransform(25.4,-116.7,1,1,0,0,0,13.1,6.3);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(49).to({_off:false},0).wait(132).to({startPosition:0},0).to({regY:6.2,rotation:5.1959,x:29.2,y:-115.85},11).wait(126).to({startPosition:0},0).to({rotation:3.4625,x:24.65,y:-116.6},13).wait(57).to({startPosition:0},0).to({regX:13.2,rotation:2.6676,x:29.95,y:-115.5},9).wait(45).to({startPosition:0},0).to({regX:13.1,regY:6.3,rotation:0,x:25.4,y:-116.7},9).wait(673).to({startPosition:0},0).to({regX:13.2,regY:6.2,rotation:9.7124,x:29.75,y:-115},11).wait(171).to({startPosition:0},0).to({rotation:3.5256,x:24.5,y:-115.9},12).wait(96).to({startPosition:0},0).to({regX:13.3,rotation:7.2304,x:34,y:-114.15},11).wait(96).to({startPosition:0},0).to({regY:6.1,scaleX:0.9999,scaleY:0.9999,rotation:0.5491,x:29.5,y:-115.6},10).wait(113).to({rotation:0.5491},0).to({regX:13.1,regY:6.3,scaleX:1,scaleY:1,rotation:0,x:25.4,y:-116.7},9).wait(1410));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.1,-221.6,127.5,443.4);


(lib.IO8YY89Y89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.yl7y8lt78l7t8l("synched",0);
	this.instance.setTransform(-17.05,-70.35,0.6625,0.6625,0,0,180,10.5,-0.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2436).to({startPosition:2436},0).to({regX:10.6,regY:-0.9,skewX:-2.7038,skewY:177.2962,x:-28.4,y:-69.65,startPosition:2451},15).wait(104).to({startPosition:2555},0).to({regY:-1,skewX:-1.477,skewY:178.523,x:-23.25,y:-69.95,startPosition:2567},12).wait(113).to({startPosition:2680},0).to({regX:10.7,skewX:-0.4566,skewY:179.5434,x:-31.6,y:-68.85,startPosition:2691},11).wait(89).to({skewX:-0.4566,startPosition:2780},0).to({scaleX:0.6624,scaleY:0.6624,skewX:1.0268,skewY:181.0268,x:-25.55,y:-69.25,startPosition:2792},12).wait(54).to({skewX:1.0268,startPosition:2846},0).to({regX:10.5,regY:-0.8,scaleX:0.6625,scaleY:0.6625,skewX:0,skewY:180,x:-17.05,y:-70.35,startPosition:2853},7).wait(73).to({startPosition:2926},0).to({regX:10.6,regY:-1,skewX:-7.1597,skewY:172.8403,x:-24.3,y:-69.5,startPosition:2934},8).wait(68).to({startPosition:3002},0).to({regX:10.5,regY:-0.8,skewX:0,skewY:180,x:-17.05,y:-70.35,startPosition:3011},9).wait(52));

	// uo__89_89_9_
	this.instance_1 = new lib.uo89899("synched",0);
	this.instance_1.setTransform(22.4,-56.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2436).to({startPosition:0},0).to({rotation:-5.1959,x:11.65,y:-58.1},15).wait(104).to({startPosition:0},0).to({regX:0.1,regY:-0.1,rotation:-5.9453,x:16.55,y:-57.6},12).wait(113).to({startPosition:0},0).to({regX:0.2,rotation:-9.5992,x:8.8,y:-57.85},11).wait(89).to({startPosition:0},0).to({regX:0.3,rotation:-11.5838,x:14.6,y:-57.2},12).wait(54).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:22.4,y:-56.95},7).wait(73).to({startPosition:0},0).to({rotation:-8.4145,x:15.55,y:-57.2},8).wait(68).to({startPosition:0},0).to({rotation:0,x:22.4,y:-56.95},9).wait(52));

	// io_y8_89_
	this.instance_2 = new lib.ioy889("synched",0);
	this.instance_2.setTransform(-11.65,72.6,1,1,0,0,0,-19.9,30.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2436).to({startPosition:0},0).to({rotation:-2.7042,x:-16.25,y:72.85},15).wait(104).to({startPosition:0},0).to({rotation:-1.4777,x:-14.2,y:72.75},12).wait(113).to({startPosition:0},0).to({regX:-19.8,rotation:-3.4283,x:-17.5,y:73.5},11).wait(89).to({startPosition:0},0).to({regY:30.5,rotation:-1.9439,x:-15.15,y:73.45},12).wait(54).to({startPosition:0},0).to({regX:-19.9,regY:30.4,rotation:0,x:-11.65,y:72.6},7).wait(73).to({startPosition:0},0).to({rotation:-1.7042,x:-14.6,y:73.25},8).wait(68).to({startPosition:0},0).to({rotation:0,x:-11.65,y:72.6},9).wait(52));

	// io_y89_9_
	this.instance_3 = new lib.ioy899("synched",0);
	this.instance_3.setTransform(-36.4,-56,1,1,0,0,0,-1.9,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2436).to({startPosition:0},0).to({regX:-2,rotation:-2.7042,x:-47.05,y:-54.4},15).wait(104).to({startPosition:0},0).to({regX:-2.1,regY:8.1,rotation:-4.2187,x:-42.65,y:-55.15},12).wait(113).to({startPosition:0},0).to({rotation:-1.2241,x:-50.65,y:-54.15},11).wait(89).to({startPosition:0},0).to({regX:-2.2,regY:8,rotation:-4.2171,x:-45,y:-55.1},12).wait(54).to({startPosition:0},0).to({regX:-1.9,regY:8.2,rotation:0,x:-36.4,y:-56},7).wait(73).to({startPosition:0},0).to({regX:-2,rotation:7.7902,x:-43.2,y:-54.55},8).wait(68).to({startPosition:0},0).to({regX:-1.9,rotation:0,x:-36.4,y:-56},9).wait(52));

	// io_8y_ly89_
	this.instance_4 = new lib.io8yly89("synched",0);
	this.instance_4.setTransform(-45.3,18.8,1,1,0,0,0,-8.5,7.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2436).to({startPosition:0},0).to({regX:-8.4,regY:7,rotation:109.8086,x:-52.3,y:20.75},15).wait(104).to({startPosition:0},0).to({regX:-8.2,rotation:101.0712,x:-45.9,y:20.25},12).wait(113).to({startPosition:0},0).to({regY:7.1,scaleX:0.9999,scaleY:0.9999,rotation:98.8431,x:-57.85,y:20.9},11).wait(89).to({startPosition:0},0).to({regX:-8.1,regY:7.2,rotation:87.3962,x:-48.35,y:20.35},12).wait(54).to({startPosition:0},0).to({regX:-8.5,regY:7.1,scaleX:1,scaleY:1,rotation:0,x:-45.3,y:18.8},7).wait(73).to({startPosition:0},0).to({regX:-8.4,rotation:97.7902,x:-62.1,y:18.4},8).wait(68).to({startPosition:0},0).to({regX:-8.5,rotation:0,x:-45.3,y:18.8},9).wait(52));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.3,-170.8,211.60000000000002,345);


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

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(69).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(12).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(6).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(299).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(18).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:11},0).wait(3).to({startPosition:12},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(16).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(17).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(109).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(560).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(25).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(9).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(14).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(410).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:13},0).wait(2);
	this.timeline.addTween(_tweenStr_0.to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(453).to({startPosition:13},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(3).to({startPosition:10},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:10},0).wait(2).to({startPosition:8},0).wait(143).to({startPosition:8},0).to({_off:true},1).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape.setTransform(-50.6918,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3062).to({_off:true},1).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F4E4E").s().p("AAAAPQgDgbgIgJIANAFQANAJgDATQgCAFgCADQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBAAQgCAAgDgHg");
	this.shape_1.setTransform(53.3586,-62.8899,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(3062).to({_off:true},1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEIgCANIhZAHg");
	this.shape_2.setTransform(30.4992,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3062).to({_off:true},1).wait(1));

	// Layer_5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4F4E4E").s().p("AgGAKIAAgTIANAAIAAATg");
	this.shape_3.setTransform(20.048,-64.0203,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(3062).to({_off:true},1).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4F4E4E").s().p("AgZAJIAAgSIAOAIQASADATgLIAAASg");
	this.shape_4.setTransform(-15.9993,-65.3268,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3062).to({_off:true},1).wait(1));

	// Layer_7
	this.instance_1 = new lib.Path_0();
	this.instance_1.setTransform(-7.65,-64.15,1.9345,1.9345,0,0,0,1.2,2.2);
	this.instance_1.alpha = 0.6016;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgeAAgUgWQgWgVAAgdIAAgPQAAgHAFgFQAFgGAIAAIBtAAQAIAAAFAGQAFAFAAAHIAAAPQAAAdgVAVQgVAWgfAAg");
	this.shape_5.setTransform(3.4218,-60.6286,1.9345,1.9345);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.instance_1}]}).to({state:[{t:this.shape_5},{t:this.instance_1}]},3062).to({state:[]},1).wait(1));

	// Layer_8
	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(-46.65,-64.05,1.9345,1.9345,0,0,0,1.2,2);
	this.instance_2.alpha = 0.6016;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4F4E4E").ss(2).p("AAAA1QgdAAgWgWQgVgVAAgeIAAgOQAAgHAFgFQAGgGAHAAIBtAAQAHAAAGAGQAFAFAAAHIAAAOQAAAegVAVQgWAWgeAAg");
	this.shape_6.setTransform(-35.704,-60.2417,1.9345,1.9345);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.instance_2}]}).to({state:[{t:this.shape_6},{t:this.instance_2}]},3062).to({state:[]},1).wait(1));

	// Layer_31
	this.instance_3 = new lib.tyiktriruiu("synched",0);
	this.instance_3.setTransform(-7.4,-59.3,0.9299,0.899,0.0515,0,0,7.8,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(938).to({startPosition:0},0).wait(2124).to({startPosition:24},0).to({_off:true},1).wait(1));

	// Layer_15
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#292929").s().p("Ah7BCQgTgOgTgVIgOgRICrhsICrAKIAJA0QADAwgXgQQgWgNgbAWQgZAcgIACQgVAHgkATIgfASQgSAMgVAAQggAAgmgdg");
	this.shape_7.setTransform(-6.471,-116.4751,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(3062).to({_off:true},1).wait(1));

	// Layer_16
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7EFE4").s().p("AgHAHQgCgDAAgEQAAgDACgDQADgDAEgBQAEABAEADQACADAAADQAAAEgCADQgEAEgEAAQgEAAgDgEg");
	this.shape_8.setTransform(43.515,-43.65,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(3062).to({_off:true},1).wait(1));

	// Layer_18
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AF8E79").s().p("AgVAeIARgZQAOgNAHgbIAEgYQAFAWgKAYQgFANgGAHQghAYAWARQAKAJARADQgwgFAGgZg");
	this.shape_9.setTransform(-21.2596,-51.4885,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(3062).to({_off:true},1).wait(1));

	// Layer_19
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AF8E79").s().p("AgEgTQALgTAKgBQgHAKgEAIIgHAQQgIAKgCANIgEAWQgEgjAPgYg");
	this.shape_10.setTransform(44.7209,-56.4238,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(3062).to({_off:true},1).wait(1));

	// Layer_20
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CDA688").s().p("AgYBKIgLgDIgJhkIAJAKQAIAHgCgTQgBgaAMgLQALgKAPAGQApAOgFA6QgFBAgmAKQgFACgHAAIgNgCg");
	this.shape_11.setTransform(44.5353,-55.3947,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(3062).to({_off:true},1).wait(1));

	// Layer_22
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#292929").s().p("AAwASIgVgLQgkgQg1AbIAPgSQAUgSAbgBQAcgBAUATQALAIAEAKQgDADgEAAQgEAAgEgCg");
	this.shape_12.setTransform(-40.5308,-80.0868,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1489).to({rotation:-17.698,x:-42.2736,y:-83.6077},0).wait(51).to({rotation:0,x:-40.5308,y:-80.0868},0).wait(1522).to({_off:true},1).wait(1));

	// Layer_23
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#292929").s().p("Ag/AAQAUgaAlABQAfAAAeASQAPAHAIAJQhGgVgjANQgfAVgTAFg");
	this.shape_13.setTransform(7.0806,-80.7134,1.9354,1.9354);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#292929").s().p("Ah7AAQAngyBIAAQA8AAA6AjQAdAPAPASQiHgqhFAaQg7ApgkAIg");
	this.shape_14.setTransform(7.1,-80.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13}]}).to({state:[{t:this.shape_14}]},899).to({state:[{t:this.shape_13}]},590).to({state:[{t:this.shape_13}]},51).to({state:[{t:this.shape_13}]},1522).to({state:[]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_13).to({_off:true},899).wait(590).to({_off:false,rotation:-7.461,x:6.2595,y:-77.1127},0).wait(51).to({rotation:0,x:7.0806,y:-80.7134},0).wait(1522).to({_off:true},1).wait(1));

	// Layer_24
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CDA688").s().p("AhOEmQg2gJgxhIQgqg+gJg3QgBgHAAhGQAAgngYgfQgZghAWhGQAihTANgpIA4gRQBCgKA2AiQAqAcAQgFIABgIQADgLADADQAEAEgEAGQgCAEgFACQACARAcAZQAUASA0ApQAaAXANArQAHAYALAzIAJAJQAIAHgBgSQgCgaANgNQAMgLARAEQAqALgIBBQgKBIgkAIQgMACgMgEIgLgFQgFApgIAWQgOAjgeAXQgUAagkAWQg3Aig7AAQgUAAgUgEg");
	this.shape_15.setTransform(0.8639,-59.8614,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(3062).to({_off:true},1).wait(1));

	// Layer_25
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#292929").s().p("AhVC5QiGhqgciuIAPgiQAVgoAigdQBphcCzA3QBbAcAgBnQAXBKgFCHQgEBbhlAnQggANglAFIggADQg8gShDg1g");
	this.shape_16.setTransform(7.5073,-95.304,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(3062).to({_off:true},1).wait(1));

	// Layer_26
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#AF8E79").s().p("AgfgIQA8goBLgmIAHAFQgWBbgaAWQgxApg3AKIgtAEQhDgQB6hPg");
	this.shape_17.setTransform(6.7922,-16.7476,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(3062).to({_off:true},1).wait(1));

	// Layer_27
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#292929").s().p("AghDhQASgqAHgdQAlihgZhkQgLgvgZgkQgagkghgRIgigvQApgNA2AKQA5AKAeAgQASASAVAfQARAagCAIQgEALANAdQAEAKABAbQABAYAABMIAAAYQABAPgDAJIgNA9QgGATgUAfQgiA1gZAXQgQAQg1AnQgBgzALgXg");
	this.shape_18.setTransform(34.4749,-87.9723,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(3062).to({_off:true},1).wait(1));

	// Layer_28
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#4F4E4E").s().p("AgugHIBdgEIgCAEQgCAGAAAHIhZAHg");
	this.shape_19.setTransform(-43.1437,-64.4558,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(3062).to({_off:true},1).wait(1));

	// Layer_29
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#373432").s().p("AgUA7QgDACgDgFQgMgPAAgWQgBgVAJgTQATgkArgNIAGAjQACANgBAGQgCAKgLARIgFARQgEANgOAMQgHAIgSALg");
	this.shape_20.setTransform(-46.556,-99.0031,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(3062).to({_off:true},1).wait(1));

	// Layer_30
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#292929").s().p("AiUCmQgkgxgGgGQgfggAYhLQAVhAAhghQAngnByglQATgGAfASQAjAWAQAAIgGAFIA5ArQAYARAIAMQAYAjgQAyQgLAhgYAaQgaAcgxAWQhfAphmgUQgLgCgOAMQgFAEgEAAQgFAAgEgFg");
	this.shape_21.setTransform(-18.5959,-108.2377,1.9354,1.9354);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(3062).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-145.7,117.9,145.7);


(lib.UIY78979 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// u_78_79_97
	this.instance = new lib.u787997("synched",0);
	this.instance.setTransform(61.2,2.55,1,1,0,0,0,5.5,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(945).to({startPosition:0},0).to({rotation:78.9984,x:45.7,y:10.9},8).wait(56).to({startPosition:0},0).to({rotation:0,x:61.2,y:2.55},7).wait(979).to({startPosition:0},0).to({regX:5.6,rotation:115.9144,x:40.85,y:14.55},10).wait(137).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:115.1975,x:45.65,y:11.95},12).wait(119).to({startPosition:0},0).to({regX:5.8,regY:7,rotation:99.0328,x:53,y:8.45},11).wait(99).to({startPosition:0},0).to({regX:5.5,regY:7.2,scaleX:1,scaleY:1,rotation:0,x:61.2,y:2.55},10).wait(49).to({startPosition:0},0).to({rotation:1.4759,x:55.55},5).wait(431).to({rotation:0,x:61.2},0).wait(54).to({rotation:1.2661,x:55.55,y:2.25},0).wait(131));

	// ui_7_79
	this.instance_1 = new lib.ui779("synched",0);
	this.instance_1.setTransform(-2.5,52.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(945).to({startPosition:0},0).to({startPosition:0},8).wait(56).to({startPosition:0},0).to({startPosition:0},7).wait(979).to({startPosition:0},0).to({startPosition:0},10).wait(137).to({startPosition:0},0).to({startPosition:0},12).wait(119).to({startPosition:0},0).to({startPosition:0},11).wait(99).to({startPosition:0},0).to({startPosition:0},10).wait(49).to({startPosition:0},0).to({startPosition:0},5).wait(431).to({startPosition:0},0).wait(54).to({startPosition:0},0).wait(131));

	// ilt78l78l
	this.instance_2 = new lib.ilt78l78l("synched",0);
	this.instance_2.setTransform(-38.9,62.2,1,1,0,0,0,8.3,16.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(945).to({startPosition:0},0).to({startPosition:0},8).wait(56).to({startPosition:0},0).to({startPosition:0},7).wait(979).to({startPosition:0},0).to({startPosition:0},10).wait(137).to({startPosition:0},0).to({startPosition:0},12).wait(119).to({startPosition:0},0).to({startPosition:0},11).wait(99).to({startPosition:0},0).to({startPosition:0},10).wait(49).to({startPosition:0},0).to({startPosition:0},5).wait(431).to({startPosition:0},0).wait(54).to({startPosition:0},0).wait(131));

	// i_y7_79_
	this.instance_3 = new lib.iy779("synched",0);
	this.instance_3.setTransform(38.45,40.9,1,1,0,0,0,-7.2,1.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(945).to({startPosition:0},0).to({startPosition:0},8).wait(56).to({startPosition:0},0).to({startPosition:0},7).wait(979).to({startPosition:0},0).to({startPosition:0},10).wait(137).to({startPosition:0},0).to({startPosition:0},12).wait(119).to({startPosition:0},0).to({startPosition:0},11).wait(99).to({startPosition:0},0).to({startPosition:0},10).wait(49).to({startPosition:0},0).to({startPosition:0},5).wait(431).to({startPosition:0},0).wait(54).to({startPosition:0},0).wait(131));

	// Layer_2
	this.instance_4 = new lib.oy8y89("synched",0);
	this.instance_4.setTransform(19.35,-94.95,0.5907,0.5907,14.9976,0,0,13.1,54);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(945).to({startPosition:945},0).to({regX:13.2,regY:53.9,rotation:7.7795,x:14.4,y:-94.5,startPosition:953},8).wait(56).to({startPosition:1009},0).to({regX:13.1,regY:54,rotation:14.9976,x:19.35,y:-94.95,startPosition:1016},7).wait(979).to({startPosition:1995},0).to({regX:13.2,regY:53.9,rotation:10.7068,x:25.05,y:-93.95,startPosition:2005},10).wait(137).to({startPosition:2142},0).to({regY:53.7,rotation:1.4877,x:18,y:-94.85,startPosition:2154},12).wait(119).to({rotation:1.4877,startPosition:2273},0).to({regX:13.3,rotation:3.5176,x:12.95,y:-95.2,startPosition:2284},11).wait(99).to({startPosition:2383},0).to({regX:13.1,regY:54,rotation:14.9976,x:19.35,y:-94.95,startPosition:2393},10).wait(49).to({regX:13,rotation:0,skewX:-18.6882,skewY:161.3118,x:6.7,y:-89.65,startPosition:2442},0).to({regY:53.9,skewX:-20.6635,skewY:159.3365,x:2.25,y:-91.9,startPosition:2447},5).wait(431).to({regX:13.1,regY:54,rotation:14.9976,skewX:0,skewY:0,x:19.35,y:-94.95,startPosition:2878},0).wait(54).to({regY:53.8,rotation:0,skewX:-17.9744,skewY:162.0256,x:-1.2,y:-92.05,startPosition:2932},0).wait(3).to({startPosition:2935},0).wait(128));

	// it7_79_9_9
	this.instance_5 = new lib.it77999("synched",0);
	this.instance_5.setTransform(35.6,-61.9,1,1,0,0,0,-7.7,12.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(945).to({startPosition:0},0).to({regX:-7.6,regY:12.3,rotation:3.9978,x:31.05,y:-62.25},8).wait(56).to({startPosition:0},0).to({regX:-7.7,regY:12.4,rotation:0,x:35.6,y:-61.9},7).wait(979).to({startPosition:0},0).to({regY:12.3,rotation:10.9139,x:38.15,y:-59.45},10).wait(137).to({startPosition:0},0).to({regX:-7.5,rotation:2.9888,x:32.9,y:-60.9},12).wait(119).to({rotation:2.9888},0).to({regX:-7.4,rotation:-5.1987,x:29.9,y:-62},11).wait(99).to({rotation:-5.1987},0).to({regX:-7.7,regY:12.4,rotation:0,x:35.6,y:-61.9},10).wait(49).to({startPosition:0},0).to({regX:-7.6,regY:12.3,rotation:1.4759,x:31.75,y:-62.6},5).wait(431).to({regX:-7.7,regY:12.4,rotation:0,x:35.6,y:-61.9},0).wait(54).to({regX:-7.6,regY:12.3,rotation:1.2661,x:31.5,y:-62.85},0).wait(131));

	// uo__789__
	this.instance_6 = new lib.uo789("synched",0);
	this.instance_6.setTransform(12.85,40.4,1,1,0,0,0,12.9,-15.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(945).to({startPosition:0},0).to({regX:13,rotation:-1.9763,x:12.6,y:40.95},8).wait(56).to({startPosition:0},0).to({regX:12.9,rotation:0,x:12.85,y:40.4},7).wait(979).to({startPosition:0},0).to({rotation:2.1923,x:13.35,y:41},10).wait(137).to({startPosition:0},0).to({rotation:-0.5298,x:12.7,y:40.6},12).wait(119).to({rotation:-0.5298},0).to({rotation:-2.4802,x:12.3,y:40.3},11).wait(99).to({startPosition:0},0).to({rotation:0,x:12.85,y:40.4},10).wait(49).to({startPosition:0},0).to({regX:13,rotation:-1.9763,x:13,y:40.1},5).wait(431).to({regX:12.9,rotation:0,x:12.85,y:40.4},0).wait(54).to({regX:13,rotation:-2.2151,x:12.95,y:40.1},0).wait(131));

	// ou_y9y9_9_
	this.instance_7 = new lib.ouy9y99("synched",0);
	this.instance_7.setTransform(-13.6,-70.75,1,1,0,0,0,-12.6,5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(945).to({startPosition:0},0).to({regX:-12.7,regY:5.2,rotation:-3.4598,x:-17.9,y:-69.25},8).wait(56).to({startPosition:0},0).to({regX:-12.6,regY:5.3,rotation:0,x:-13.6,y:-70.75},7).wait(979).to({startPosition:0},0).to({regY:5.2,rotation:-0.2588,x:-8.95,y:-71.1},10).wait(137).to({startPosition:0},0).to({rotation:1.2538,x:-14.8,y:-70.25},12).wait(119).to({startPosition:0},0).to({regX:-12.7,regY:5.1,rotation:-1.1813,x:-19.1,y:-69.55},11).wait(99).to({rotation:-1.1813},0).to({regX:-12.6,regY:5.3,rotation:0,x:-13.6,y:-70.75},10).wait(49).to({startPosition:0},0).to({regX:-12.7,rotation:-4.7169,x:-17.45,y:-70},5).wait(431).to({regX:-12.6,rotation:0,x:-13.6,y:-70.75},0).wait(54).to({regX:-12.7,regY:5.2,rotation:-5.6826,x:-17.95,y:-70.05},0).wait(131));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.6,-171,140.6,341.4);


(lib.IT7T79T79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// uo_8y9_89_8
	this.instance = new lib.uo8y9898("synched",0);
	this.instance.setTransform(-63.45,-68.8,1,1,17.2151,0,0,5.9,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(63).to({startPosition:0},0).to({rotation:16.2943,x:-66.2,y:-67.15},9).wait(41).to({startPosition:0},0).to({regX:5.8,regY:12.7,rotation:22.2623,x:-63.6,y:-68.85},12).wait(42).to({startPosition:0},0).to({regX:5.9,regY:12.8,rotation:21.9855,x:-66.2,y:-67.2},8).wait(291).to({startPosition:0},0).to({regX:5.8,rotation:15.5899,x:-68.8,y:-64.95},11).wait(122).to({startPosition:0},0).to({regY:12.7,scaleX:0.9999,scaleY:0.9999,rotation:22.8001,x:-65.2,y:-67.9},10).wait(129).to({startPosition:0},0).to({regX:5.7,rotation:21.0432,x:-60.35,y:-70.85},10).wait(108).to({startPosition:0},0).to({rotation:28.242,x:-56,y:-72.8},10).wait(56).to({startPosition:0},0).to({regX:5.9,regY:12.8,scaleX:1,scaleY:1,rotation:21.9855,x:-66.2,y:-67.2},9).wait(15).to({startPosition:0},0).to({rotation:17.2151,x:-63.45,y:-68.8},9).wait(70).to({startPosition:0},0).to({rotation:10.9481,x:-59.3,y:-70.8},9).wait(73).to({startPosition:0},0).to({rotation:17.2151,x:-63.45,y:-68.8},10).wait(12).to({startPosition:0},0).to({regX:5.8,rotation:19.9718,x:-66.85,y:-67.1},9).wait(531).to({startPosition:0},0).to({regX:5.7,rotation:16.4633,x:-60.95,y:-68},9).wait(96).to({startPosition:0},0).to({regY:12.7,scaleX:0.9999,scaleY:0.9999,rotation:22.6535,x:-57.6,y:-69.95},9).wait(134).to({startPosition:0},0).to({regY:12.8,rotation:23.4122,x:-61.8,y:-68},10).wait(53).to({startPosition:0},0).to({regX:5.8,scaleX:1,scaleY:1,rotation:23.9245,x:-61.65,y:-69.95},9).wait(407).to({startPosition:0},0).to({regX:5.7,rotation:27.1371,x:-56.75,y:-72.05},7).wait(11).to({startPosition:0},0).to({regX:5.8,rotation:23.9245,x:-61.65,y:-69.95},7).wait(445).to({startPosition:0},0).to({regY:12.7,rotation:13.5248,x:-65.1,y:-67.05},7).wait(39).to({startPosition:0},0).to({regY:12.8,rotation:23.9245,x:-61.65,y:-69.95},9).wait(142));

	// io_8_y8_89
	this.instance_1 = new lib.io8y889("synched",0);
	this.instance_1.setTransform(-52.5,6.45,1,1,122.2146,0,0,7.5,-9.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(63).to({startPosition:0},0).to({regY:-9.6,scaleX:0.9999,scaleY:0.9999,rotation:31.2945,x:-54.15,y:7.9},9).wait(41).to({startPosition:0},0).to({regY:-9.5,rotation:43.2451,x:-59.45,y:7.2},12).wait(42).to({startPosition:0},0).to({regY:-9.6,scaleX:1,scaleY:1,rotation:126.9858,x:-61.6,y:8.75},8).wait(291).to({rotation:126.9858},0).to({scaleX:0.9999,scaleY:0.9999,rotation:45.5923,x:-55.8,y:9.9},11).wait(122).to({rotation:45.5923},0).to({regY:-9.5,rotation:45.3073,x:-61.8,y:8.1},10).wait(129).to({startPosition:0},0).to({regX:7.6,regY:-9.3,rotation:43.5506,x:-54.55,y:5.15},10).wait(108).to({startPosition:0},0).to({regX:7.5,regY:-9.2,scaleX:0.9998,scaleY:0.9998,rotation:57.9586,x:-59.8,y:3.15},10).wait(56).to({startPosition:0},0).to({regY:-9.6,scaleX:1,scaleY:1,rotation:126.9858,x:-61.6,y:8.75},9).wait(15).to({rotation:126.9858},0).to({regY:-9.7,rotation:122.2146,x:-52.5,y:6.45},9).wait(70).to({startPosition:0},0).to({regX:7.6,regY:-9.6,scaleX:0.9999,scaleY:0.9999,rotation:48.722,x:-40.25,y:2.9},9).wait(73).to({rotation:48.722},0).to({regX:7.5,regY:-9.7,scaleX:1,scaleY:1,rotation:122.2146,x:-52.5,y:6.45},10).wait(12).to({rotation:122.2146},0).to({rotation:124.972,x:-59.45,y:8.6},9).wait(531).to({startPosition:0},0).to({regX:7.7,regY:-9.6,scaleX:0.9999,scaleY:0.9999,rotation:46.4654,x:-48.9,y:7.4},9).wait(96).to({startPosition:0},0).to({regY:-9.5,rotation:43.9377,x:-53.85,y:6.3},9).wait(134).to({startPosition:0},0).to({regY:-9.3,scaleX:0.9998,scaleY:0.9998,rotation:59.6962,x:-59.15,y:8.2},10).wait(53).to({startPosition:0},0).to({regX:7.5,regY:-9.7,scaleX:1,scaleY:1,rotation:128.9257,x:-59.45,y:6.15},9).wait(407).to({startPosition:0},0).to({regY:-9.6,scaleX:0.9999,scaleY:0.9999,rotation:132.1376,x:-58.85,y:4},7).wait(11).to({startPosition:0},0).to({regY:-9.7,scaleX:1,scaleY:1,rotation:128.9257,x:-59.45,y:6.15},7).wait(445).to({startPosition:0},0).to({regY:-9.6,scaleX:0.9999,scaleY:0.9999,rotation:43.5284,x:-49.45,y:7.4},7).wait(39).to({rotation:43.5284},0).to({regY:-9.7,scaleX:1,scaleY:1,rotation:128.9257,x:-59.45,y:6.15},9).wait(142));

	// io_8y_899_y8
	this.instance_2 = new lib.io8y899y8("synched",0);
	this.instance_2.setTransform(2.2,62.95,1,1,0,0,0,-12.6,12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(63).to({startPosition:0},0).to({startPosition:0},9).wait(41).to({startPosition:0},0).to({startPosition:0},12).wait(42).to({startPosition:0},0).to({startPosition:0},8).wait(291).to({startPosition:0},0).to({startPosition:0},11).wait(122).to({startPosition:0},0).to({startPosition:0},10).wait(129).to({startPosition:0},0).to({startPosition:0},10).wait(108).to({startPosition:0},0).to({startPosition:0},10).wait(56).to({startPosition:0},0).to({startPosition:0},9).wait(15).to({startPosition:0},0).to({startPosition:0},9).wait(70).to({startPosition:0},0).to({startPosition:0},9).wait(73).to({startPosition:0},0).to({startPosition:0},10).wait(12).to({startPosition:0},0).to({startPosition:0},9).wait(531).to({startPosition:0},0).to({startPosition:0},9).wait(96).to({startPosition:0},0).to({startPosition:0},9).wait(134).to({startPosition:0},0).to({startPosition:0},10).wait(53).to({startPosition:0},0).to({startPosition:0},9).wait(407).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(445).to({startPosition:0},0).to({startPosition:0},7).wait(39).to({startPosition:0},0).to({startPosition:0},9).wait(142));

	// ou_yt79_7y9_
	this.instance_3 = new lib.ouyt797y9("synched",0);
	this.instance_3.setTransform(42.75,41.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(63).to({startPosition:0},0).to({startPosition:0},9).wait(41).to({startPosition:0},0).to({startPosition:0},12).wait(42).to({startPosition:0},0).to({startPosition:0},8).wait(291).to({startPosition:0},0).to({startPosition:0},11).wait(122).to({startPosition:0},0).to({startPosition:0},10).wait(129).to({startPosition:0},0).to({startPosition:0},10).wait(108).to({startPosition:0},0).to({startPosition:0},10).wait(56).to({startPosition:0},0).to({startPosition:0},9).wait(15).to({startPosition:0},0).to({startPosition:0},9).wait(70).to({startPosition:0},0).to({startPosition:0},9).wait(73).to({startPosition:0},0).to({startPosition:0},10).wait(12).to({startPosition:0},0).to({startPosition:0},9).wait(531).to({startPosition:0},0).to({startPosition:0},9).wait(96).to({startPosition:0},0).to({startPosition:0},9).wait(134).to({startPosition:0},0).to({startPosition:0},10).wait(53).to({startPosition:0},0).to({startPosition:0},9).wait(407).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(445).to({startPosition:0},0).to({startPosition:0},7).wait(39).to({startPosition:0},0).to({startPosition:0},9).wait(142));

	// uoi_7y9_y9_
	this.instance_4 = new lib.uoi7y9y9("synched",0);
	this.instance_4.setTransform(-16.9,21.1,1,1,0,0,0,-8.3,10.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(63).to({startPosition:0},0).to({startPosition:0},9).wait(41).to({startPosition:0},0).to({startPosition:0},12).wait(42).to({startPosition:0},0).to({startPosition:0},8).wait(291).to({startPosition:0},0).to({startPosition:0},11).wait(122).to({startPosition:0},0).to({startPosition:0},10).wait(129).to({startPosition:0},0).to({startPosition:0},10).wait(108).to({startPosition:0},0).to({startPosition:0},10).wait(56).to({startPosition:0},0).to({startPosition:0},9).wait(15).to({startPosition:0},0).to({startPosition:0},9).wait(70).to({startPosition:0},0).to({startPosition:0},9).wait(73).to({startPosition:0},0).to({startPosition:0},10).wait(12).to({startPosition:0},0).to({startPosition:0},9).wait(531).to({startPosition:0},0).to({startPosition:0},9).wait(96).to({startPosition:0},0).to({startPosition:0},9).wait(134).to({startPosition:0},0).to({startPosition:0},10).wait(53).to({startPosition:0},0).to({startPosition:0},9).wait(407).to({startPosition:0},0).to({startPosition:0},7).wait(11).to({startPosition:0},0).to({startPosition:0},7).wait(445).to({startPosition:0},0).to({startPosition:0},7).wait(39).to({startPosition:0},0).to({startPosition:0},9).wait(142));

	// ou_y_8y9_y89_
	this.instance_5 = new lib.ouy8y9y89("synched",0);
	this.instance_5.setTransform(-50.2,-94.75,1,1,0,0,0,-3.2,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(63).to({startPosition:0},0).to({regY:4.3,rotation:-14.7091,x:-56.35,y:-90.85},9).wait(41).to({startPosition:0},0).to({regX:-3.1,regY:4.2,rotation:-12.7327,x:-52.8,y:-92.15},12).wait(42).to({startPosition:0},0).to({regX:-3.2,regY:4.3,rotation:-14.7091,x:-56.35,y:-90.85},8).wait(291).to({startPosition:0},0).to({regY:4.2,rotation:-16.66,x:-59.8,y:-89.65},11).wait(122).to({startPosition:0},0).to({rotation:-13.937,x:-54.9,y:-91.3},10).wait(129).to({startPosition:0},0).to({regX:-3.3,regY:4.1,scaleX:0.9999,scaleY:0.9999,rotation:-15.4597,x:-47.9,y:-92.1},10).wait(108).to({startPosition:0},0).to({regX:-3.4,regY:4,scaleX:1,scaleY:1,rotation:-12.7369,x:-42.55,y:-93.5},10).wait(56).to({startPosition:0},0).to({regX:-3.2,regY:4.3,rotation:-14.7091,x:-56.35,y:-90.85},9).wait(15).to({startPosition:0},0).to({regY:4.4,rotation:0,x:-50.2,y:-94.75},9).wait(70).to({startPosition:0},0).to({regY:4.2,rotation:-2.2326,x:-44.45,y:-95.1},9).wait(73).to({startPosition:0},0).to({regY:4.4,rotation:0,x:-50.2,y:-94.75},10).wait(12).to({startPosition:0},0).to({regY:4.3,rotation:-17.2364,x:-57.2,y:-90.3},9).wait(531).to({startPosition:0},0).to({regY:4.2,rotation:-6.0878,x:-51.15,y:-94.5},9).wait(96).to({startPosition:0},0).to({rotation:-3.6158,x:-46.25,y:-95.65},9).wait(134).to({startPosition:0},0).to({regX:-3.3,scaleX:0.9999,scaleY:0.9999,rotation:-6.3386,x:-51.8,y:-94.3},10).wait(53).to({startPosition:0},0).to({regX:-3.2,scaleX:1,scaleY:1,rotation:-6.0878,x:-51.15,y:-94.5},9).wait(407).to({startPosition:0},0).to({rotation:-2.875,x:-44.8,y:-96},7).wait(11).to({startPosition:0},0).to({rotation:-6.0878,x:-51.15,y:-94.5},7).wait(445).to({startPosition:0},0).to({rotation:-8.519,x:-55.9,y:-93.15},7).wait(39).to({startPosition:0},0).to({rotation:-6.0878,x:-51.15,y:-94.5},9).wait(142));

	// Layer_2
	this.instance_6 = new lib.hktyktyktdy("synched",0);
	this.instance_6.setTransform(-37.15,-99.15,0.5887,0.5887,0,0,180,29.2,-19.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(63).to({startPosition:63},0).to({regX:29.4,scaleX:0.5886,scaleY:0.5886,skewX:-14.7092,skewY:165.2908,x:-41,y:-98.45,startPosition:72},9).wait(41).to({startPosition:113},0).to({regY:-20,skewX:-12.7321,skewY:167.2679,x:-37.35,y:-99.2,startPosition:125},12).wait(42).to({startPosition:167},0).to({regY:-19.9,skewX:-14.7092,skewY:165.2908,x:-41,y:-98.45,startPosition:175},8).wait(291).to({startPosition:466},0).to({skewX:-16.6597,skewY:163.3403,x:-44.75,y:-97.65,startPosition:477},11).wait(122).to({startPosition:599},0).to({regY:-20.1,skewX:-13.9368,skewY:166.0632,x:-39.5,y:-98.8,startPosition:609},10).wait(129).to({startPosition:738},0).to({regY:-20.3,skewX:-15.4561,skewY:164.5439,x:-32.6,y:-100,startPosition:748},10).wait(108).to({startPosition:856},0).to({regY:-20.4,skewX:-12.7349,skewY:167.2651,x:-26.85,y:-100.6,startPosition:866},10).wait(56).to({startPosition:922},0).to({regY:-19.9,skewX:-14.7092,skewY:165.2908,x:-41,y:-98.45,startPosition:931},9).wait(15).to({startPosition:946},0).to({regX:29.2,scaleX:0.5887,scaleY:0.5887,skewX:0,skewY:180,x:-37.15,y:-99.15,startPosition:955},9).wait(70).to({startPosition:1025},0).to({regX:29.3,regY:-20,skewX:-2.2329,skewY:177.7671,x:-31.6,y:-99.85,startPosition:1034},9).wait(73).to({startPosition:1107},0).to({regX:29.2,regY:-19.9,skewX:0,skewY:180,x:-37.15,y:-99.15,startPosition:1117},10).wait(12).to({startPosition:1129},0).to({scaleX:0.5886,scaleY:0.5886,skewX:-17.2367,skewY:162.7633,x:-41.7,y:-98.45,startPosition:1138},9).wait(531).to({startPosition:1669},0).to({regX:29.3,skewX:-6.0878,skewY:173.9122,x:-34.5,y:-99.45,startPosition:1678},9).wait(96).to({startPosition:1774},0).to({regY:-20,skewX:-3.6162,skewY:176.3838,x:-29.4,y:-99.95,startPosition:1783},9).wait(134).to({startPosition:1917},0).to({skewX:-6.3376,skewY:173.6624,x:-35.05,y:-99.4,startPosition:1927},10).wait(53).to({startPosition:1980},0).to({regY:-19.9,skewX:-6.0878,skewY:173.9122,x:-34.5,y:-99.45,startPosition:1989},9).wait(407).to({startPosition:2396},0).to({regX:29.2,regY:-20,skewX:-2.8753,skewY:177.1247,x:-27.85,y:-100.05,startPosition:2403},7).wait(11).to({startPosition:2414},0).to({regX:29.3,regY:-19.9,skewX:-6.0878,skewY:173.9122,x:-34.5,y:-99.45,startPosition:2421},7).wait(445).to({startPosition:2866},0).to({regY:-20,skewX:-8.5187,skewY:171.4813,x:-39.45,y:-98.8,startPosition:2873},7).wait(39).to({startPosition:2912},0).to({regY:-19.9,skewX:-6.0878,skewY:173.9122,x:-34.5,y:-99.45,startPosition:2921},9).wait(142));

	// uio_789_9_9
	this.instance_7 = new lib.uio78999("synched",0);
	this.instance_7.setTransform(-20.55,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(63).to({startPosition:0},0).to({rotation:-1.9763,x:-20.3},9).wait(41).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:0,x:-20.75},12).wait(42).to({startPosition:0},0).to({regX:0,regY:0,rotation:-1.9763,x:-20.3},8).wait(291).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:-3.9268,x:-20.15,y:18.35},11).wait(122).to({startPosition:0},0).to({rotation:-1.204,x:-20.4},10).wait(129).to({rotation:-1.204},0).to({regY:0.2,rotation:2.5135,x:-21.05,y:18.2},10).wait(108).to({rotation:2.5135},0).to({regX:-0.2,rotation:5.2356,x:-21,y:18},10).wait(56).to({startPosition:0},0).to({regX:0,regY:0,rotation:-1.9763,x:-20.3,y:18.3},9).wait(15).to({rotation:-1.9763},0).to({rotation:0,x:-20.55},9).wait(70).to({startPosition:0},0).to({rotation:2.7226},9).wait(73).to({startPosition:0},0).to({rotation:0},10).wait(12).to({startPosition:0},0).to({rotation:-2.2378,y:18.2},9).wait(531).to({startPosition:0},0).to({regX:-0.1,regY:0.1,rotation:1.7156,x:-21.45,y:18.4},9).wait(96).to({rotation:1.7156},0).to({rotation:4.1863},9).wait(134).to({startPosition:0},0).to({regY:0.2,rotation:1.4629,x:-21.5,y:18.5},10).wait(53).to({rotation:1.4629},0).to({regY:0.1,rotation:1.7156,x:-21.45,y:18.4},9).wait(407).to({startPosition:0},0).to({rotation:4.9274},7).wait(11).to({startPosition:0},0).to({rotation:1.7156},7).wait(445).to({rotation:1.7156},0).to({rotation:-0.7152},7).wait(39).to({rotation:-0.7152},0).to({rotation:1.7156},9).wait(142));

	// io_8_80_u8_0
	this.instance_8 = new lib.io880u80("synched",0);
	this.instance_8.setTransform(-32.95,-136.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(63).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-14.7091,x:-46.55,y:-135.9},9).wait(41).to({startPosition:0},0).to({rotation:-12.7327,x:-41.5,y:-136.8},12).wait(42).to({startPosition:0},0).to({rotation:-14.7091,x:-46.55,y:-135.9},8).wait(291).to({startPosition:0},0).to({rotation:-16.66,x:-51.5,y:-134.9},11).wait(122).to({startPosition:0},0).to({regY:-0.2,rotation:-13.937,x:-44.45,y:-136.3},10).wait(129).to({startPosition:0},0).to({regX:-0.2,scaleX:0.9999,scaleY:0.9999,rotation:-15.4597,x:-38.6,y:-137.25},10).wait(108).to({startPosition:0},0).to({regY:-0.3,scaleX:1,scaleY:1,rotation:-12.7369,x:-31.05,y:-138.15},10).wait(56).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-14.7091,x:-46.55,y:-135.9},9).wait(15).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-32.95,y:-136.75},9).wait(70).to({startPosition:0},0).to({regY:-0.1,rotation:-2.2326,x:-28.85,y:-137.65},9).wait(73).to({startPosition:0},0).to({regY:0,rotation:0,x:-32.95,y:-136.75},10).wait(12).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-17.2364,x:-49,y:-135.65},9).wait(531).to({startPosition:0},0).to({regY:-0.2,rotation:-6.0878,x:-34.3,y:-137.45},9).wait(96).to({startPosition:0},0).to({rotation:-3.6158,x:-27.55,y:-137.8},9).wait(134).to({startPosition:0},0).to({regY:-0.3,scaleX:0.9999,scaleY:0.9999,rotation:-6.3386,x:-35.05,y:-137.35},10).wait(53).to({startPosition:0},0).to({regY:-0.2,scaleX:1,scaleY:1,rotation:-6.0878,x:-34.3,y:-137.45},9).wait(407).to({startPosition:0},0).to({rotation:-2.875,x:-25.6,y:-137.9},7).wait(11).to({startPosition:0},0).to({rotation:-6.0878,x:-34.3,y:-137.45},7).wait(445).to({startPosition:0},0).to({regY:-0.3,rotation:-8.519,x:-40.9,y:-136.8},7).wait(39).to({startPosition:0},0).to({regY:-0.2,rotation:-6.0878,x:-34.3,y:-137.45},9).wait(142));

	// ui_y7_y9_
	this.instance_9 = new lib.uiy7y9("synched",0);
	this.instance_9.setTransform(-10.15,-88.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(63).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,rotation:-3.7612,x:-19.55,y:-94.95},9).wait(41).to({startPosition:0},0).to({rotation:-1.7847,x:-16,y:-94.9},12).wait(42).to({startPosition:0},0).to({rotation:-3.7612,x:-19.55,y:-94.95},8).wait(291).to({startPosition:0},0).to({regY:-0.2,rotation:-5.7116,x:-23.15,y:-95},11).wait(122).to({startPosition:0},0).to({rotation:-2.9888,x:-18.05,y:-94.95},10).wait(129).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-4.5108,x:-11,y:-96.7},10).wait(108).to({startPosition:0},0).to({rotation:-1.7874,x:-5.45,y:-96.25},10).wait(56).to({rotation:-1.7874},0).to({regY:-0.1,scaleX:1,scaleY:1,rotation:-3.7612,x:-19.55,y:-94.95},9).wait(15).to({startPosition:0},0).to({regX:0,regY:0,rotation:0,x:-10.15,y:-88.35},9).wait(70).to({startPosition:0},0).to({rotation:2.7226,x:-5.1,y:-87.7},9).wait(73).to({startPosition:0},0).to({rotation:0,x:-10.15,y:-88.35},10).wait(12).to({startPosition:0},0).to({rotation:-8.5315,x:-19.5,y:-95.75},9).wait(531).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-13.15,y:-92.55},9).wait(96).to({rotation:2.6169},0).to({regX:-0.1,regY:-0.1,scaleX:1,scaleY:1,rotation:5.0881,x:-8.45,y:-92.15},9).wait(134).to({startPosition:0},0).to({rotation:2.3648,x:-13.75,y:-92.55},10).wait(53).to({startPosition:0},0).to({regX:0,regY:0,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-13.15},9).wait(407).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,scaleX:1,scaleY:1,rotation:5.8286,x:-7.05,y:-91.95},7).wait(11).to({startPosition:0},0).to({regX:0,regY:0,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-13.15,y:-92.55},7).wait(445).to({startPosition:0},0).to({regX:-0.1,regY:-0.1,scaleX:1,scaleY:1,rotation:0.1854,x:-17.95,y:-92.85},7).wait(39).to({startPosition:0},0).to({regX:0,regY:0,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-13.15,y:-92.55},9).wait(142));

	// o_y89_89_
	this.instance_10 = new lib.oy8989("synched",0);
	this.instance_10.setTransform(-3.75,-126.65,1,1,0,0,0,-0.1,6.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(63).to({startPosition:0},0).to({regY:6.5,rotation:-3.7612,x:-15.55,y:-133.6},9).wait(41).to({startPosition:0},0).to({rotation:-1.7847,x:-10.7,y:-133.4},12).wait(42).to({startPosition:0},0).to({rotation:-3.7612,x:-15.55,y:-133.6},8).wait(291).to({startPosition:0},0).to({rotation:-5.7116,x:-20.5,y:-133.7},11).wait(122).to({startPosition:0},0).to({rotation:-2.9888,x:-13.55,y:-133.45},10).wait(129).to({startPosition:0},0).to({regX:-0.2,scaleX:0.9999,scaleY:0.9999,rotation:-4.5108,x:-7.65,y:-135.3},10).wait(108).to({startPosition:0},0).to({rotation:-1.7874,x:-0.25,y:-134.65},10).wait(56).to({rotation:-1.7874},0).to({regX:-0.1,scaleX:1,scaleY:1,rotation:-3.7612,x:-15.55,y:-133.6},9).wait(15).to({startPosition:0},0).to({regY:6.6,rotation:0,x:-3.75,y:-126.65},9).wait(70).to({startPosition:0},0).to({regX:0,regY:6.5,rotation:-2.2326,x:0.75,y:-128.7},9).wait(73).to({startPosition:0},0).to({regX:-0.1,regY:6.6,rotation:0,x:-3.75,y:-126.65},10).wait(12).to({startPosition:0},0).to({regY:6.5,rotation:-8.5315,x:-18.85,y:-134.65},9).wait(531).to({startPosition:0},0).to({regY:6.4,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-4.95,y:-130.65},9).wait(96).to({rotation:2.6169},0).to({scaleX:1,scaleY:1,rotation:5.0881,x:1.45,y:-129.8},9).wait(134).to({startPosition:0},0).to({rotation:2.3648,x:-5.65,y:-130.6},10).wait(53).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-4.95,y:-130.65},9).wait(407).to({startPosition:0},0).to({scaleX:1,scaleY:1,rotation:5.8286,x:3.3,y:-129.45},7).wait(11).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-4.95,y:-130.65},7).wait(445).to({startPosition:0},0).to({regX:-0.2,scaleX:1,scaleY:1,rotation:0.1854,x:-11.35,y:-131.15},7).wait(39).to({startPosition:0},0).to({regX:-0.1,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:-4.95,y:-130.65},9).wait(142));

	// o_8y9_y8_98
	this.instance_11 = new lib.o8y9y898("synched",0);
	this.instance_11.setTransform(-28.7,-122.55,1,1,0,0,0,-0.1,49.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(63).to({startPosition:0},0).to({regY:49,rotation:-7.9623,x:-38.7,y:-123.4},9).wait(41).to({startPosition:0},0).to({rotation:-5.9858,x:-34.15,y:-124},12).wait(42).to({startPosition:0},0).to({rotation:-7.9623,x:-38.7,y:-123.4},8).wait(291).to({startPosition:0},0).to({rotation:-9.9131,x:-43.25,y:-122.75},11).wait(122).to({startPosition:0},0).to({rotation:-7.1898,x:-36.8,y:-123.65},10).wait(129).to({startPosition:0},0).to({regX:-0.2,regY:48.9,rotation:-8.712,x:-30.65,y:-124.9},10).wait(108).to({startPosition:0},0).to({rotation:-5.9877,x:-23.7,y:-125.4},10).wait(56).to({startPosition:0},0).to({regX:-0.1,regY:49,rotation:-7.9623,x:-38.7,y:-123.4},9).wait(15).to({startPosition:0},0).to({regY:49.2,rotation:0,x:-28.7,y:-122.55},9).wait(70).to({startPosition:0},0).to({rotation:-2.2326,x:-24.05,y:-123.55},9).wait(73).to({startPosition:0},0).to({rotation:0,x:-28.7,y:-122.55},10).wait(12).to({startPosition:0},0).to({regX:0,regY:49.1,rotation:-17.2364,x:-40.55,y:-123.4},9).wait(531).to({startPosition:0},0).to({regX:-0.1,rotation:-6.0878,x:-28.55,y:-123.75},9).wait(96).to({startPosition:0},0).to({rotation:-3.6158,x:-22.4,y:-123.85},9).wait(134).to({startPosition:0},0).to({regY:49,scaleX:0.9999,scaleY:0.9999,rotation:-6.3386,x:-29.2,y:-123.65},10).wait(53).to({startPosition:0},0).to({regY:49.1,scaleX:1,scaleY:1,rotation:-6.0878,x:-28.55,y:-123.75},9).wait(407).to({startPosition:0},0).to({rotation:-2.875,x:-20.6,y:-123.85},7).wait(11).to({startPosition:0},0).to({rotation:-6.0878,x:-28.55,y:-123.75},7).wait(445).to({startPosition:0},0).to({rotation:-8.519,x:-34.55,y:-123.25},7).wait(39).to({startPosition:0},0).to({rotation:-6.0878,x:-28.55,y:-123.75},9).wait(142));

	// uio_79_79_79_
	this.instance_12 = new lib.uio797979("synched",0);
	this.instance_12.setTransform(2.45,-74.1,1,1,0,0,0,15.8,5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(63).to({startPosition:0},0).to({regY:5.7,rotation:-4.4686,x:-0.45,y:-74.85},9).wait(41).to({startPosition:0},0).to({rotation:-2.4916,x:2.4,y:-74.15},12).wait(42).to({startPosition:0},0).to({rotation:-4.4686,x:-0.45,y:-74.85},8).wait(291).to({startPosition:0},0).to({regX:15.7,rotation:-3.7149,x:-3.45,y:-75.4},11).wait(122).to({startPosition:0},0).to({regY:5.6,rotation:-0.9915,x:0.75,y:-74.55},10).wait(129).to({rotation:-0.9915},0).to({rotation:2.7262,x:6.1,y:-73.2},10).wait(108).to({rotation:2.7262},0).to({regY:5.7,scaleX:0.9999,scaleY:0.9999,rotation:5.4482,x:10.5,y:-71.9},10).wait(56).to({startPosition:0},0).to({regX:15.8,scaleX:1,scaleY:1,rotation:-4.4686,x:-0.45,y:-74.85},9).wait(15).to({startPosition:0},0).to({regY:5.8,rotation:0,x:2.45,y:-74.1},9).wait(70).to({startPosition:0},0).to({regY:5.7,rotation:7.9632,x:6.85,y:-72.95},9).wait(73).to({startPosition:0},0).to({regY:5.8,rotation:0,x:2.45,y:-74.1},10).wait(12).to({startPosition:0},0).to({rotation:-2.2378,x:-1.15,y:-74.95},9).wait(531).to({startPosition:0},0).to({rotation:-2.98,x:4.45,y:-73.2},9).wait(96).to({startPosition:0},0).to({regY:5.7,rotation:-0.508,x:8.35,y:-72.1},9).wait(134).to({startPosition:0},0).to({rotation:-7.4765,x:3.95,y:-73.35},10).wait(53).to({startPosition:0},0).to({regY:5.8,rotation:1.7156,x:4.45,y:-73.25},9).wait(407).to({rotation:1.7156},0).to({regY:5.7,rotation:4.9274,x:9.5,y:-71.7},7).wait(11).to({startPosition:0},0).to({regY:5.8,rotation:1.7156,x:4.45,y:-73.25},7).wait(445).to({rotation:1.7156},0).to({rotation:3.7622,x:0.5,y:-74.2},7).wait(39).to({startPosition:0},0).to({rotation:1.7156,x:4.45,y:-73.25},9).wait(142));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-176.2,150.5,350.29999999999995);


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

	// Layer_5
	this.instance = new lib.IT7T79T79("synched",0);
	this.instance.setTransform(583.55,612.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3063));

	// Layer_6
	this.instance_1 = new lib.UIY78979("synched",0);
	this.instance_1.setTransform(722.05,617.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3063));

	// Layer_7
	this.instance_2 = new lib.Bitmap2();
	this.instance_2.setTransform(481,596);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3063));

	// Layer_8
	this.instance_3 = new lib.thdtryjdjy("synched",0);
	this.instance_3.setTransform(431.5,588.35);

	this.instance_4 = new lib.IOY89Y89Y89("synched",49);
	this.instance_4.setTransform(646.5,588.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_3}]},48).to({state:[{t:this.instance_4}]},1).wait(3014));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:646.5,startPosition:18},48).to({_off:true},1).wait(3014));

	// IO_8Y_Y89_Y89_
	this.instance_5 = new lib.IO8YY89Y89("synched",0);
	this.instance_5.setTransform(826.8,538.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3063));

	// Layer_13
	this.instance_6 = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(3063));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1087,815);


// stage content:
(lib.m2l2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,49,383,731,1021,1303,1581,1993,2425,2776,3062];
	this.streamSoundSymbolsList[49] = [{id:"audio1",startFrame:49,endFrame:383,loop:1,offset:0}];
	this.streamSoundSymbolsList[383] = [{id:"audio2",startFrame:383,endFrame:731,loop:1,offset:0}];
	this.streamSoundSymbolsList[731] = [{id:"audio3",startFrame:731,endFrame:1021,loop:1,offset:0}];
	this.streamSoundSymbolsList[1021] = [{id:"audio4",startFrame:1021,endFrame:1303,loop:1,offset:0}];
	this.streamSoundSymbolsList[1303] = [{id:"audio5",startFrame:1303,endFrame:1581,loop:1,offset:0}];
	this.streamSoundSymbolsList[1581] = [{id:"audio6",startFrame:1581,endFrame:1993,loop:1,offset:0}];
	this.streamSoundSymbolsList[1993] = [{id:"audio7",startFrame:1993,endFrame:2425,loop:1,offset:0}];
	this.streamSoundSymbolsList[2425] = [{id:"audio8",startFrame:2425,endFrame:2776,loop:1,offset:0}];
	this.streamSoundSymbolsList[2776] = [{id:"audio9",startFrame:2776,endFrame:3063,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		//this.gotoAndPlay("m1");
	}
	this.frame_49 = function() {
		var soundInstance = playSound("audio1",0);
		this.InsertIntoSoundStreamData(soundInstance,49,383,1);
	}
	this.frame_383 = function() {
		var soundInstance = playSound("audio2",0);
		this.InsertIntoSoundStreamData(soundInstance,383,731,1);
	}
	this.frame_731 = function() {
		var soundInstance = playSound("audio3",0);
		this.InsertIntoSoundStreamData(soundInstance,731,1021,1);
	}
	this.frame_1021 = function() {
		var soundInstance = playSound("audio4",0);
		this.InsertIntoSoundStreamData(soundInstance,1021,1303,1);
	}
	this.frame_1303 = function() {
		var soundInstance = playSound("audio5",0);
		this.InsertIntoSoundStreamData(soundInstance,1303,1581,1);
	}
	this.frame_1581 = function() {
		var soundInstance = playSound("audio6",0);
		this.InsertIntoSoundStreamData(soundInstance,1581,1993,1);
	}
	this.frame_1993 = function() {
		var soundInstance = playSound("audio7",0);
		this.InsertIntoSoundStreamData(soundInstance,1993,2425,1);
	}
	this.frame_2425 = function() {
		var soundInstance = playSound("audio8",0);
		this.InsertIntoSoundStreamData(soundInstance,2425,2776,1);
	}
	this.frame_2776 = function() {
		var soundInstance = playSound("audio9",0);
		this.InsertIntoSoundStreamData(soundInstance,2776,3063,1);
	}
	this.frame_3062 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(334).call(this.frame_383).wait(348).call(this.frame_731).wait(290).call(this.frame_1021).wait(282).call(this.frame_1303).wait(278).call(this.frame_1581).wait(412).call(this.frame_1993).wait(432).call(this.frame_2425).wait(351).call(this.frame_2776).wait(286).call(this.frame_3062).wait(1));

	// _Clip_Group_
	this.instance = new lib.ClipGroup("synched",0);
	this.instance.setTransform(206.3,190.4,2.0085,2.0085,0,0,0,543.4,405.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3063));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-485.1,-223.2,1783.1999999999998,1236.8);
// library properties:
lib.properties = {
	id: '85BEB3849B29B243BB5FDF107B98B81A',
	width: 800,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/m2l2_atlas_1.png", id:"m2l2_atlas_1"},
		{src:"sounds/audio1.mp3", id:"audio1"},
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
an.compositions['85BEB3849B29B243BB5FDF107B98B81A'] = {
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