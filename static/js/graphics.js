/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (parent, global, console, Raphael, $) {
	var my = parent.graphics = parent.graphics || {},
		canvas,
		next_x = 10,
		next_y = 10,
		baseWidth = 400,
		baseHeight = 68,
		rowSpacing = 10,
		rotationDegrees = 30,
		direction = 1,
		window = $(global); // is this bad?  Probably, but whatever.
	
	my.drawToolbar = function() {
		var info,
			play,
			pause,
			settings,
			x = $(window).width() - 40,
			w = 32,
			h = 32;
		
		info = canvas.image("/static/img/info.png", x, 8, w, h);
		play = canvas.image("/static/img/play.png", x, 48, w, h);
		pause = canvas.image("/static/img/pause.png", x, 48, w, h);
		settings = canvas.image("/static/img/settings.png", x, 88, w, h);
		
		pause.hide();
		
		return {
			info: $(info.node),
			play: $(play.node),
			pause: $(pause.node),
			settings: $(settings.node)
		};
	};
	
	// Sets up the canvas (must be called first)
	my.init = function () {
		canvas = Raphael(0, 0, window.width(), window.height());
		canvas.rect(0, 0, window.width(), window.height()).attr({
			fill: "#ccc",
			"stroke-width": 0	
		});
	};
	
	function increment(amount, variance) {
		variance = variance != null ? variance / 100 : 0.2;
		
		return amount + Math.random() * (amount * variance) - (amount * variance) / 2;
	}
	
	function shift() {
		next_x += direction * increment(baseWidth);
		
		if (direction > 0) {
			if (next_x + baseWidth > (window.width() - 100) + 20) {
				next_x -= increment(baseWidth);
				next_y += baseHeight + rowSpacing;
				
				direction = -1;
			
				if (next_y + baseHeight > window.height()) {
					next_y = 10;
					next_x = increment(baseWidth) - baseWidth;
					direction = 1;
				}
			}
		} else {
			if (next_x < -20) {
				next_x = increment(baseWidth) - baseWidth;
				next_y += baseHeight + rowSpacing;
				
				direction = 1;
			
				if (next_y + baseHeight > window.height()) {
					next_y = 10;
					next_x = increment(baseWidth) - baseWidth;
				}
			}
		}
	}
	
	function wordBreak(word, maxLength) {
		var pieces = Math.ceil(word.length / maxLength),
			length = word.length / pieces,
			broken = [],
			i;
		
		for (i = 0; i < pieces; i += 1) {
			broken.push(word.slice(i * length, (i + 1) * length));
		}
		
		return broken;
	}
	
	function insertMany(list, index, items) {
		items.unshift(0);
		items.unshift(index);
		list.splice.apply(list, items);
	}
	
	function lineBreaks(string) {
		var words = string.split("\n").join("").split(" "),
			i,
			l,
			lines = [],
			line = [],
			charCount = 0,
			word,
			length,
			broken,
			breakAt = 50;
		
		for (i = 0, l = words.length; i < l; i += 1) {
			word = words[i];
			length = word.length;
			
			if (length > breakAt) {
				broken = wordBreak(word, breakAt);
				word = broken[0];
				insertMany(words, i + 1, broken.slice(1));
				length = word.length;
				l = words.length;
			}
			
			if (charCount + length > breakAt) {
				lines.push(line.join(" "));
				line = [];
				charCount = 0;
			}
			line.push(word);
			charCount += length;
		}
		
		lines.push(line.join(" "));
		
		return lines.join("\n");
	}
	
	// Adds a graphical element
	// tweet is assumed to have the following structure:
	// tweet = {
	//     id: Number,
	//     name: String,
	//     text: String,
	//     img: String,
	//     timeAgo: Number (seconds)
	// }
	my.draw = function (tweet) {
		var rect = canvas.rect(next_x, next_y, baseWidth, baseHeight, 2),
			img = canvas.image(tweet.img, next_x + 2, next_y + baseHeight - 50, 48, 48),
			name = canvas.text(next_x + 2, next_y + 8, tweet.name + " - " + tweet.timeAgo + " seconds ago"),
			text = canvas.text(next_x + 52, next_y + 34, lineBreaks(tweet.text)),
			rotation = Math.random() * rotationDegrees - rotationDegrees / 2,
			
			set,
			
			bbox = rect.getBBox();
		
		set = canvas.set(rect, img, name, text)
		
		// Apply graphical transformations
		rect.attr({
			fill: "#fff"
		});
		
		name.attr({
			"text-anchor": "start",
			"font-size": "12px",
			"font-weight": "bold",
			"font-family": "\"Helvetica Neue\", Arial, Helvetica, sans-serif"
		});
		
		text.attr({
			"text-anchor": "start",
			"font-size": "12px",
			"font-family": "\"Helvetica Neue\", Arial, Helvetica, sans-serif"
		});
		
		set.rotate(rotation, next_x + bbox.width / 2, next_y + bbox.height / 2);
		
		shift();
		
		return set;
	};
	
	return parent;
}(app || {}, window, window.console, Raphael, jQuery));