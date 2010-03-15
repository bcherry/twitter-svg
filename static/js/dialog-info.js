/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
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
		
		dialog = $("<div/>");
		
		dialog.append("This is just a simple demo of what's possible with SVG, using the Twitter REST API.");
		
		dialog.dialog({
			title: "About Twitter/SVG",
			modal: true,
			width: 640,
			height: 480,
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
