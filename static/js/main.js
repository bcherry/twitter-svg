/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (my, window, console, $) {
	
	function run() {
		function callback(data) {
			var i,
				l,
				tweet;
			
			for (i = 0, l = data.length; i < l; i += 1) {
				tweet = data[i];
				my.graphics.draw(tweet);
			}
		}
		
		my.twitter.get(callback);
	}
	
	my.init = function () {
		$(function () {
			my.graphics.init();
			run();
		});
	};
	
	return my;
}(app || {}, window, window.console, jQuery));