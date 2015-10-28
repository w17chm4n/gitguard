var xmlHttp = new XMLHttpRequest();

function httpGetAsync(url) {
	xmlHttp.open('GET', url, false);
	xmlHttp.send();
	return JSON.parse(xmlHttp.responseText);
}

function isSuccess(response) {
	return response.result === 'SUCCESS';
}

function isBranchRed(jobs) {
	for (var i = 0; i < jobs.length; i++) {		
		var response = httpGetAsync(jobs[i] + '/lastCompletedBuild/api/json?pretty=true&tree=result');
		if(!isSuccess(response)) {
			return true;
		}
	};
	return false;
}

function shouldDisable(entry) {
	return entry.disable && entry.disable;
}

function handleRedMaster(tabId, entry) {
	chrome.tabs.executeScript(tabId, {file: "decorator.js"});
	chrome.tabs.executeScript(tabId, {file: entry.disable ? "disabler.js" : "enabler.js"});
}

function handleGreenMaster(tabId) {
	chrome.tabs.executeScript(tabId, {file: "undecorator.js"});
	chrome.tabs.executeScript(tabId, {file: "enabler.js"});
}

function guard(url, tabId) {
	chrome.storage.local.get("entries", function(result) {
		if(result.entries) {
			for(var i = 0; i < result.entries.length; i++) {
				var entry = result.entries[i];
				var pullRegexp = new RegExp('^' + entry.url + '/\\d+$');
				if(pullRegexp.test(url)) {
					chrome.tabs.insertCSS(tabId, {file: "gitguard.css"});
					if(isBranchRed(entry.jobs)) {
						handleRedMaster(tabId, entry);
					} else {
						handleGreenMaster(tabId);
					}
				}
			}
		}
	});
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		if (tab && 'url' in tab && tab.url) {
			guard(tab.url, activeInfo.tabId);
		}
	})
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab && 'url' in tab && tab.url && tab.status === 'complete') {
		setTimeout(function() { 
			guard(tab.url, tabId);
		}, 500);
	}
});
