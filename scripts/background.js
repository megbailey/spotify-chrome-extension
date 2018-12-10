var prevBtn = document.querySelector('previous');
var playBtn = document.querySelector('play-pause');
var nextBtn = document.querySelector('next');
var loginBtin = document.querySelector('login');

var pinTab = document.querySelector('.pin-tab');

pinTab.addEventListener('click', (e) => {
  chrome.tabs.create({
    "url": "https://open.spotify.com",
    "pinned": true
  },
  function(tab) {
    tab.highlighted = true;
    tab.active = true;
  });
});

chrome.tabs.query({url: '*://*.spotify.com/*'}, function(tabs) {
  document.querySelector('.track-info').textContent = (tabs[0].title).replace(/·/g, "\n");

  function onUpdated(tabId, changeInfo, tabInfo) {
    if (tabInfo.audible === true || tabInfo.audible === false) {
      document.querySelector('.track-info').textContent = (tabInfo.title).replace(/·/g, "\n");
    }
  }

  chrome.tabs.onUpdated.addListener(onUpdated);

  previous.addEventListener('click', function() {
    chrome.tabs.executeScript(
      tabs[0].id,
      {function () {
		document.querySelector('.spoticon-skip-forward-16').click()
	  	}}
    );
  });

  play-pause.addEventListener('click', function() {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: '/controllers/playBtn.js'}
    );
  });

  pauseBtn.addEventListener('click', function() {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: '/controllers/pauseBtn.js'}
    );
  });

  next.addEventListener('click', function() {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: '/controllers/nextBtn.js'}
    );
  });
});







/*
var playPause = document.getElementById('play-pause');
var previous = document.getElementById('previous');
var next = document.getElementById('next');
var login = document.getElementById('login-button');

var Chrome = {
	executeScript: function (options, callback) {
		var tab = options.tab
		var code = options.code
		chrome.tabs.executeScript(tab.id, {
	 		code: code
	  	}, callback)
	}
}
	
var Spotify = {
	click: function (options, callback) {
		var tab = options.tab;
		var query = options.query;
		var code = 'document.querySelector(\'' + query + '\').click()';
		Chrome.executeScript ({
			tab: tab,
			code: code 
		}, callback)
	},

	play: function (tab, callback) {
		Spotify.click({
			tab: tab,
			query: '.nowPlayingBar-container .player-controls button[class^="control-button     spoticon-play"]'
		}, callback)
	}
}


playPause.onclick = function(callback) {
	var currentState = spotifyApi.getMyCurrentPlaybackstate();
	if (currentState == play) { 
		spotifyApi.play(callback); // calls main.js method;
		chrome.contextMenus.update(spotifyApi.getMyCurrentPlayingTrack(), callback);
	}
	else {
		spotifyApi.pause(callback);
	}
};


function togglePlayPause () {
	var result= spotifyApi.getMyCurrentPlaybackState();	
	var state = result.is_playing;
	var playPauseButton = document.getElementById('play-pause');
	var playPauseClassName = 'glyphicon glyphicon-play';
	switch (state) {
		case 'playing':
			playPauseClassName = 'glyphicon glyphicon-pause';
			playPauseButton.removeAttribute('disabled', true);
			break;
		case 'paused':
			playPauseButton.removeAttribute('disabled', true);
			break;
		case 'disabled':
			playPauseButton.setAttribute('disabled', true);
	}
	playPauseButton.getElementsByTagName('span')[0].className = playPauseClassName;
}



previous.onclick = function (callback) {
	spotifyApi.skipToPrevious(callback);
	chrome.contextMenus.update(spotifyApi.getMyCurrentPlayingTrack(), callback);
};

next.onclick = function (callback) {
	spotifyApi.skipToNext(callback);
	chrome.contextMenus.update(spotifyApi.getMyCurrentPlayingTrack(), callback);
};

login.onclick = function () {
	authentication();
};

*/