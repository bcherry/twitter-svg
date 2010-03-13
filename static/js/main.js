/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (my, window, console, $) {
	
	my.init = function () {
		$(function () {
			my.graphics.init();
		});
	};
	
	return my;
}(app || {}, window, window.console, jQuery));