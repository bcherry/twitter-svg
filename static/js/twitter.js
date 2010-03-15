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
				img: tweet.user.profile_image_url,
				timeAgo: ~~((new Date().getTime() - Date.parse(tweet.created_at)) / 1000)
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
	
	// Offline override
	my.getMock = function (callback) {
		var data = [],
			i;
		
		for (i = 0; i < 20; i += 1) {
			data.push({
				id: ~~(Math.random() * 1000000000),
				user: {
					name: "someuser",
					profile_image_url: "/static/img/twitter_profile.png"
				},
				text: "lorem ipsum dolor sit amet in one hundred forty characters or less",
				timeAgo: 123
			});
		}
		
		function success(data) {
			if (callback) {
				callback(transform(data))
			}
		}
		
		setTimeout(function () {
			success(data);
		}, 2000);
	};
	
//	my.get = my.getMock;
	
	return parent;
}(app || {}, window, window.console, jQuery));
