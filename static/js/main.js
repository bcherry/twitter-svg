/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false, jQuery: false, app: true */
"use strict";

var app = (function (my, window, console, $) {
	var toolbar,
		interval,
		settings = my.settings = my.settings || {};
	
	function run() {
		function callback(data) {
			var i = 0,
				l = data.length,
				tweet;
			
			setTimeout(function repeat() {
				if (i < l) {
					tweet = data[i];
					my.graphics.draw(tweet);
					i += 1;
					setTimeout(repeat, 0);
				} else {
					toolbar.loading.hide();
				}
			}, 0);
		}
		
		my.twitter.get(callback);
		
		toolbar.loading.show();
	}
	
	my.play = function () {
		if (!interval) {
			run();
			interval = setInterval(run, my.settings.interval);
		}
	};
	
	my.pause = function () {
		clearInterval(interval);
		interval = undefined;
	};
	
	function bindToolbar() {
		toolbar.info.bind("click", my.dialogs.info.open);
		toolbar.settings.bind("click", my.dialogs.settings.open);
		toolbar.play.bind("click", function () {
			my.play();
			toolbar.play.hide();
			toolbar.pause.show();
		});
		toolbar.pause.bind("click", function () {
			my.pause();
			toolbar.pause.hide();
			toolbar.play.show();
			toolbar.loading.hide();
		});
	}
	
	my.init = function () {
		$(function () {
			my.graphics.init();
			
			toolbar = my.graphics.drawToolbar();
			bindToolbar();
			
			my.updateSettings({
				interval: 15000,
				type: "public"
			});
			
		});
	};
	
	my.updateSettings = function (settings) {
		var key;
		
		for (key in settings) {
			if (settings.hasOwnProperty(key)) {
				my.settings[key] = settings[key];
			}
		}
		if (interval) {
			my.pause();
			my.play();
		}
	};
	
	return my;
}(app || {}, window, window.console, jQuery));