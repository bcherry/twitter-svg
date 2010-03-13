/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (parent, global, console, Raphael, $) {
	var my = parent.graphics = parent.graphics || {},
		canvas,
		next_x = 10,
		next_y = 10,
		baseWidth = 300,
		baseHeight = 140,
		window = $(global); // is this bad?  Probably, but whatever.
	
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
		next_x += increment(baseWidth);
		
		if (next_x + baseWidth > window.width()) {
			next_x = increment(baseWidth) - baseWidth;
			next_y += increment(baseHeight);
			
			if (next_y + baseHeight > window.height()) {
				next_y = increment(baseHeight) - baseHeight;
			}
		}
	}
	
	// Adds a graphical element
	// elem is assumed to have the following structure:
	// elem = {
	//     name: String,
	//     text: String,
	//     img: String
	// }
	my.draw = function (elem) {
		var shape = canvas.rect(next_x, next_y, baseWidth, baseHeight, 2),
			rotation = Math.random() * 60 - 30;
		
		// Apply graphical transformations
		shape.attr({
			rotation: rotation,
			fill: "#fff"
		});
		
		shift();
		
		return shape;
	};
	
	return parent;
}(app || {}, window, window.console, Raphael, jQuery));