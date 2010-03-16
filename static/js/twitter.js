/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false, jQuery: false, app: true */
"use strict";

var app = (function (parent, window, console, $) {
	var my = parent.twitter = parent.twitter || {},
		settings = parent.settings = parent.settings || {};
	
	my.processedTweets = {};
	
	function transformTweet(tweet) {
		return {
			id: tweet.id,
			name: tweet.user.name,
			text: tweet.text,
			img: tweet.user.profile_image_url,
			timeAgo: ~~((new Date().getTime() - Date.parse(tweet.created_at)) / 1000)
		};
	}
	
	function transform(data) {
		var i,
			l,
			tweet,
			newTweet,
			newData = [];
		
		for (i = 0, l = data.length; i < l; i += 1) {
			tweet = data[i];
			
			if (!my.processedTweets[tweet.id]) {
				newTweet = my.processedTweets[tweet.id] = transformTweet(tweet);
				newData.push(newTweet);
			}
		}
		
		return newData;
	}
	
	my.send = function (status, callback) {
		var url = "/updateStatus";
		
		function success(data) {
			var tweet;
			
			if (data) {
				tweet = transformTweet(data);
				if (!my.processedTweets[tweet.id]) {
					my.processedTweets[tweet.id] = tweet;
					if (callback) {
						callback(tweet);
						return;
					}
				}
			}
			
			if (callback) {
				callback();
			}
		}
		
		$.ajax({
			url: url,
			data: {
				status: status.slice(0, 140),
				username: settings.username,
				password: settings.password
			},
			dataType: "jsonp",
			success: success
		});
	};
	
	my.get = function (callback) {
		var url,
			ajax;
		
		if (settings.type === "public") {
			url = "http://api.twitter.com/1/statuses/public_timeline.json";
		} else {
			url = "/homeTimeline";
		}
		
		function success(data) {
			if (callback) {
				callback(transform(data));
			}
		}
		
		ajax = {
			url: url,
			dataType: "jsonp",
			success: success
		};
		
		if (settings.type === "home") {
			ajax.data = {
				username: settings.username,
				password: settings.password
			};
		}
		
		$.ajax(ajax);
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
				callback(transform(data));
			}
		}
		
		setTimeout(function () {
			success(data);
		}, 2000);
	};
	
//	my.get = my.getMock;
	
	return parent;
}(app || {}, window, window.console, jQuery));
