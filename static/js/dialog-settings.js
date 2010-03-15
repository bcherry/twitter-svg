/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (parent, window, console, $) {
	var dialogs = parent.dialogs = parent.dialogs || {},
		my = dialogs.settings = dialogs.settings || {},
		open = false;
	
	my.open = function () {
		var dialog;
		
		if (open) {
			return;
		}
		open = true;
		
		dialog = $("<div/>");
		
		dialog.dialog({
			title: "Settings",
			modal: true,
			width: 640,
			height: 480,
			close: function () {
				open = false;
			},
			buttons: {
				"Save": function () {
					parent.updateSettings(/*TODO*/);
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