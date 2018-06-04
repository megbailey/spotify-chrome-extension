'use strict';

chrome.runtime.onInstalled.addListener(function() {
  	chrome.contextMenus.create({
		"title": "Play/Pause Spotify",
	  	"contexts":["all"],
	  	"id": "context" + "all"
	});
});

chrome.contextMenus.onClicked.addListener(function(/*info, tab*/){
	handlePlayOrPauseClick(); // calls main.js method;
});

chrome.runtime.onMessage.addListener(callback);
