// credit too http://kennethjorgensen.com/blog/2014/canvas-trees

// I know this code is messy and needs cleanup....

Snake = function (canvas, width, height) {
	this.setCanvas(canvas);
	this.x = width / 2;
	this.y = height;
	this.canvasWidth = width;
	this.canvasHeight = height;
	this.radius = 10;
	this.speed = height / (225);
	this.angle = Math.PI/2;
	this.fillStyle = "#1FCC99";
	this.shadowColor = "#1FCC99";
	this.shadowBlur = 2;
	this.generation = 0;
	this.lifespan = 0;
	this.totalDistance = 0;
	this.distance = 0;
	this.shouldAddwords = true;
};

Snake.prototype = {
	setCanvas: function (canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	},

	next: function() {
		this.draw();
		this.iterate();
		this.randomize();
// 		this.limitSpeed();
// 		this.reset(context);
		this.split();
		this.lifespan++;
		this.die();
	},

	draw: function() {
		var context = this.context;
		context.save();
		context.fillStyle = this.fillStyle;
		context.shadowColor = this.shadowColor;
		context.shadowBlur = this.shadowBlur;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
		context.restore();
	},

	iterate: function() {
		var lastX = this.x;
		var lastY = this.y;
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * -Math.sin(this.angle);
		this.radius *= (0.99 - this.generation/250); // minus 0.004 per generation
		var deltaDistance = Math.sqrt(Math.abs(lastX-this.x) + Math.abs(lastY-this.y));
		this.distance += deltaDistance;
		this.totalDistance += deltaDistance;
		if (this.speed > this.radius*2)
			this.speed = this.radius*2;
	},

	randomize: function() {
		this.angle += Math.random()/5 - 1/5/2;
	},

	split: function() {
		// Calculate split chance
		var splitChance = 0;
		// Trunk
		var splitChance = 0;
		// Trunk
		if (this.generation == 0) {
			splitChance = (this.distance-this.canvasHeight/5)/100;
		}
		// Branch
		else if (this.generation < 3) {
			splitChance = (this.distance-this.canvasHeight/10)/100;
		} else if (this.generation < 6) {
			splitChance = (this.distance-this.canvasHeight/15)/100;
		}

		// Split if we are allowed
		if (Math.random() < splitChance) {
			var n = 2+Math.round(Math.random()*2);
			for (var i=0 ; i<n ; i++) {
				var snake = new Snake(this.canvas, this.canvasWidth, this.canvasHeight);
				snake.x = this.x;
				snake.y = this.y;
				snake.angle = this.angle;
				snake.speed = this.speed;
				snake.radius = this.radius * 0.9;
				snake.generation = this.generation + 1;
				snake.fillStyle = this.fillStyle;
				snake.shadowColor = this.shadowColor;
				snake.shadowBlur = this.shadowBlur;
				snake.totalDistance = this.totalDistance;
				this.collection.add(snake);
			}
			this.collection.remove(this);
		}
	},

	die: function() {
		if (this.radius < 0.2) {
			this.collection.remove(this);
			if (this.collection.shouldAddwords) {
				this.collection.shouldAddwords = false;
				this.collection.writeSlogan();
			}
			// console.log(this.distance);
		}
	}
}

SnakeCollection = function(canvas, width, height) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.shouldAddwords = true;
	this.alpha = 0.1; // for making text fade in
	this.canvasWidth = width;
	this.canvasHeight = height;

	this.snakes = [];
}

SnakeCollection.prototype = {
	next: function() {
		n = this.snakes.length;
		for (var s in this.snakes) {
			var snake = this.snakes[s];
			if (this.snakes[s])
				this.snakes[s].next();
		}
	},

	add: function(snake) {
		this.snakes.push(snake);
		snake.collection = this;
	},

	remove: function(snake) {
		for (var s in this.snakes)
			if (this.snakes[s] === snake)
				this.snakes.splice(s, 1);
	},

	writeSlogan: function () {
		this.intervalID = window.setInterval(this.fadeIn.bind(this), 5);
	},

	fadeIn: function () {
		if (this.alpha <= 1) {
			// clear over old text with white font
			this.context.font = '2em' + ' Lato';
			this.context.fillStyle = 'white';
			this.context.textAlign = 'center';
			this.context.fillText('cultivate your data', this.canvasWidth / 2, this.canvasHeight / 15);
			this.context.save(); // save context so that opacity change doesn't affect tree

			// white new text
			this.context.globalAlpha = this.alpha;
			this.context.fillStyle = 'black';
			this.context.fillText('cultivate your data', this.canvasWidth / 2, this.canvasHeight / 15);
			this.context.restore(); // restore context for drawing tree
			this.alpha += 0.01;
		} else {
			window.clearInterval(this.intervalID);
		}
	},
}

function randHex() {
	var num = Math.round(Math.random() * 255).toString(16);
	if (num.length == 1)
		num = "0"+num;
	return num;
}

module.exports = function() {
	// Convenience
	var canvas = document.getElementById('canvastree');
	var context = canvas.getContext("2d");

	// make canvas hi-res
	var PIXEL_RATIO = (function () {
		var ctx = document.createElement("canvas").getContext("2d"),
	    dpr = window.devicePixelRatio || 1,
	    bsr = ctx.webkitBackingStorePixelRatio ||
	          ctx.mozBackingStorePixelRatio ||
	          ctx.msBackingStorePixelRatio ||
	          ctx.oBackingStorePixelRatio ||
	          ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	})();

	var CANVAS_WIDTH = 400 * 2;
	var CANVAS_HEIGHT = 299 * 2;

	canvas.width = CANVAS_WIDTH * PIXEL_RATIO;
	canvas.height = CANVAS_HEIGHT * PIXEL_RATIO;
	canvas.style.width = CANVAS_WIDTH + "px";
	canvas.style.height = CANVAS_HEIGHT + "px";
	canvas.getContext("2d").setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);

	// Dimensions
	// var width = canvas.width();
	// var height = canvas.height();


	// Set actual canvas size to match css
	// canvas.attr("width", width);
	// canvas.attr("height", height);


	// Information
	// jQuery("#info").html("Size: "+canvas.width+"x"+canvas.height);

	// Frame rate
	var frame = 0;

	// Snakes
	var n = 2+Math.random()*3;
	var initialRadius = CANVAS_WIDTH / 30;
	snakes = new SnakeCollection(canvas, CANVAS_WIDTH, CANVAS_HEIGHT);
	for (var i=0 ; i<n ; i++) {
		var snake = new Snake(canvas, CANVAS_WIDTH, CANVAS_HEIGHT);
		snake.x = CANVAS_WIDTH / 2 - initialRadius + i*initialRadius*2/n;
		snake.radius = initialRadius;
		snakes.add(snake);
	}

	// Frame drawer
	var interval = setInterval(function() {
		snakes.next();

		frame++;
	}, 0);
};
