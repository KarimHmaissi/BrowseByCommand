import '../img/icon-128.png';
import '../img/icon-34.png';

import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.min.css';
import '../css/main.css';

import $ from './libs/jquery';
import * as commandEngine from './commandEngine';

$(function () {
	console.log('Main page running');
	var $command = $('#command');
	var timeout;

	chrome.commands.onCommand.addListener(function(command) {
		console.log('Command:', command);
		if(command === 'focus') {
			$('#command').focus();
		}
	});

	$command.focus();

	chrome.commands.onCommand.addListener(function(command) {
		console.log('Command:', command);
		if(command === 'focus') {
			$('#command').focus();
		}
	});

	$command.on("change keyup paste", function(){
		var $this = $(this);
		if($this.val() === "") return;

		clearTimeout(timeout);
		timeout = setTimeout(function() {
			commandEngine.processCommandChange($this.val());
		}, 300);
	});

	$command.keypress(function (e) {
		var $this = $(this);
		if($this.val() === "") return;

		if (e.which == 13) {
			commandEngine.processCommand($(this).val());
			return false;    //<---- Add this line
		}
	});

});
