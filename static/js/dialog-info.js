/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false, jQuery: false, app: true */
"use strict";

var app = (function (parent, window, console, $) {
	var dialogs = parent.dialogs = parent.dialogs || {},
		my = dialogs.info = dialogs.info || {},
		open = false;

	my.open = function () {
		var dialog;
		
		if (open) {
			return;
		}
		
		open = true;
		
		dialog = $("<div/>").addClass("dialog");
		
		dialog.append(
			$("<h2/>").text("What's this all about?"),
			$("<p/>").text("This is a simple Twitter API client, showing what's possible using SVG."),
			$("<h2/>").text("How do I use it?"),
			$("<p/>").text("There's some buttons over on the right.  Pretty self-explanatory.  Press the \"Play\" one to make it go."),
			$("<h2/>").text("Who made it?"),
			$("<p/>").html("This was made by <a href=\"http://www.adequatelygood.com/\" target=\"_blank\">Ben Cherry</a>, who has <a href=\"http://twitter.com/bcherry\" target=\"_blank\">a Twitter</a>.  But he'd also like to give credit to the creators of <a href=\"http://raphaeljs.com\" target=\"_blank\">Raphaël</a>, <a href=\"http://labjs.com\" target=\"_blank\">LABjs</a>, <a href=\"http://jquery.com\" target=\"_blank\">jQuery</a>, <a href=\"http://jqueryui.com\" target=\"_blank\">jQuery UI</a>, and, of couse, <a href=\"http://twitter.com\" target=\"_blank\">Twitter</a>."),
			$("<h2/>").text("Why is it so broken?"),
			$("<p/>").text("Because he wrote it in just a few days, when he had time.  Thus, it currrently is deficient in the following ways:"),
			$("<ul/>").append(
				$("<li/>").text("Foreign languages don't display well, especially Japanese"),
				$("<li/>").text("OAuth isn't supported, though it probably should be."),
				$("<li/>").text("It has little to no fault tolerance or error handling."),
				$("<li/>").html("It <em>should</em> work in all browsers like Firefox, Chrome, Safari, Internet Explorer, and Opera, but it might not.")
			)
		);
		
		dialog.dialog({
			title: "About Twitter/SVG",
			modal: true,
			width: 640,
			height: 590,
			close: function () {
				open = false;
			},
			buttons: {
				"Ok!": function () {
					dialog.dialog("close");
				}
			}
		});
	};
	
	return parent;
}(app || {}, window, window.console, jQuery));
