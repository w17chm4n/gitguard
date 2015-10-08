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

function guard(url, tabId) {
	chrome.storage.local.get("entries", function(result) {
		if(result.entries) {
			for(var i = 0; i < result.entries.length; i++) {
				var entry = result.entries[i];
				var pullRegexp = new RegExp('^' + entry.url + '/\\d+$');
				if(pullRegexp.test(url)) {
					chrome.tabs.insertCSS(tabId, {file: "gitguard.css"});
					chrome.tabs.executeScript(tabId, {file: isBranchRed(entry.jobs) ? "decorator.js" : "undecorator.js"});
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
	if(changeInfo && 'url' in changeInfo && changeInfo.url) {
		setTimeout(function() { 
			guard(changeInfo.url, tabId);
		}, 500);
	}
});
