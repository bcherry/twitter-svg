/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (parent, window, console, $) {
	var my = parent.twitter = parent.twitter || {};
	
	function transform(data) {
		var i,
			l,
			tweet,
			newData = [];
		
		for (i = 0, l = data.length; i < l; i += 1) {
			tweet = data[i];
			newData.push({
				id: tweet.id,
				name: tweet.user.name,
				text: tweet.text,
				img: tweet.user.profile_image_url
			});
		}
		
		return newData;
	}
	
	my.get = function (callback) {
		var url = "http://api.twitter.com/1/statuses/public_timeline.json";
		
		function success(data) {
			if (callback) {
				callback(transform(data));
			}
		}
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: success
		});
	};
	
	return parent;
}(app || {}, window, window.console, jQuery));
