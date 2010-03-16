/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false, jQuery: false, app: true */
"use strict";

var app = (function (parent, window, console, $) {
	var dialogs = parent.dialogs = parent.dialogs || {},
		my = dialogs.settings = dialogs.settings || {},
		open = false;
	
	my.open = function () {
		var dialog,
			interval,
			type,
			rows = 0,
			tweet,
			username,
			password,
			settings = parent.settings || {};
				
		if (open) {
			return;
		}
		open = true;
		
		dialog = $("<div/>").addClass("dialog");
		
		dialog.append($("<h2/>").text("I want to get tweets!"));
		
		dialog.appendFormRow = function (text, input) {
			var name = "row_" + rows;
			rows += 1;
			input.attr({
				name: name
			});
			dialog.append(
				$("<div/>").addClass("formRow").append(
					$("<label/>").attr({
						"for": name
					}).text(text),
					input
				)
			);
		};
		
		interval = $("<input/>").attr({
			type: "text"
		});
		
		interval.val(settings.interval);
		
		dialog.appendFormRow("Polling Interval (ms)", interval);
		
		type = $("<select/>").append(
			$("<option/>").text("public"),
			$("<option/>").text("home")
		);
		
		type.val(settings.type);
		
		dialog.appendFormRow("Timeline Type", type);
		
		dialog.append($("<p/>").text("Note that if you select the \"home\" timeline you'll need to enter your Twitter username/password below.  Don't worry, you won't update your status unless you type in the big box."));
		
		tweet = $("<textarea/>");
		
		dialog.append(
			$("<h2/>").text("I want to send tweets!"),
			tweet
		);
		
		username = $("<input/>").attr({
			type: "text"
		});
		username.val(settings.username || "");
		
		dialog.appendFormRow("Twitter Username", username);
		
		password = $("<input/>").attr({
			type: "password"
		});
		password.val(settings.password || "");
		
		dialog.appendFormRow("Twitter Password", password);
		
		dialog.append(
			$("<p/>").text("To send a tweet, you will need to provide your credentials. Once you've entered everything in the big box above (140 characters or less!) and added your credentials, press \"Save\" and watch it go."),
			$("<p/>").text("If you do choose to provide your credentials, they will be stored in JavaScript during this session, and not stored on the server.  But, they will also be passed in plaintext to my server and then in a simple base64-encoded form to Twitter, so if you're paranoid stick to the public timeline.")
		);
		
		dialog.dialog({
			title: "Settings",
			modal: true,
			width: 640,
			height: 680,
			close: function () {
				open = false;
			},
			buttons: {
				"Save": function () {
					parent.updateSettings({
						interval: +interval.val(),
						type: type.val(),
						username: username.val(),
						password: password.val()
					});
					
					if (tweet.val()) {
						parent.twitter.send(tweet.val(), function (tweet) {
							if (tweet) {
								parent.graphics.draw(tweet);
							}
						});
					}
					
					dialog.dialog("close");
				},
				"Cancel": function () {
					dialog.dialog("close");
				}
			}
		});
	};
	
	return parent;
}(app || {}, window, window.console, jQuery));