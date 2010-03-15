/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, strict: true, newcap: false, immed: true, browser: true */
/*globals window: false */
"use strict";

var app = (function (parent, window, console, $) {
	var dialogs = parent.dialogs = parent.dialogs || {},
		my = dialogs.settings = dialogs.settings || {},
		open = false;
	
	my.open = function () {
		var dialog,
			interval,
			settings = parent.settings || {};
		
		if (open) {
			return;
		}
		open = true;
		
		dialog = $("<div/>");
		
		interval = $("<input/>").attr({
			type: "text"
		});
		
		interval.val(settings.interval);
		
		dialog.append(interval);
				
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
					parent.updateSettings({
						interval: +interval.val()
					});
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