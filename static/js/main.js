/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (my, window, console, $) {
	
	function run() {
		function callback(data) {
			var i = 0,
				l = data.length,
				tweet;
			
			setTimeout(function repeat() {
				tweet = data[i];
				my.graphics.draw(tweet);
				
				i += 1;
				if (i < l) {
					setTimeout(repeat, 0);
				}
			}, 0);
		}
		
		my.twitter.get(callback);
	}
	
	my.init = function () {
		$(function () {
			my.graphics.init();
//			setInterval(run, 1000);
			run();
		});
	};
	
	return my;
}(app || {}, window, window.console, jQuery));