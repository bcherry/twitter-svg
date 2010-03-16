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
			type,
			rows = 0,
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
		
		dialog.append($("<p/>").text("Note that if you select \"home\" timeline you will probably get prompted by your browser to enter your Twitter username/password.  Don't worry, this isn't stored (or even seen) by this application."));
		
		dialog.append(
			$("<h2/>").text("I want to send tweets!"),
			$("<p/>").text("Too bad, that isn't supported yet :(")
		);
		
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
						interval: +interval.val(),
						type: type.val()
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