var savedFileEntry;
var importWindowId;

function addEntry() {
	var pullUrl = document.getElementsByClassName("pullUrl")[0].value;
	var jobsUrl = document.getElementsByClassName("pullArea")[0].value;
	if(pullUrl && jobsUrl) {
		jobsUrl = jobsUrl.split("\n");

		chrome.storage.local.get("entries", function(result) {
			var entry = {
				id: generateUUID(),
				url : pullUrl,
				jobs: jobsUrl
			}
			if(!result.entries) {
				result.entries = [entry];
			} else {
				result.entries.push(entry);
			}

			chrome.storage.local.set(result);
		});

		location.reload();
	}
}

function removeEntry(id) {
	chrome.storage.local.get("entries", function(result) {
		if(result.entries) {
			var idx = -1;

			for(var i = 0; i < result.entries.length; i++) {
				var entry = result.entries[i];
				if(entry.id === id) {
					idx = i;
					break;
				}
			}

			if(idx > -1) {
				result.entries.splice(idx, 1);
			}

			chrome.storage.local.set(result);
		}

		location.reload();
	});
}

function createEntryElement(entry) {
	var entryElement = document.createElement("div");
	entryElement.className = "entry";

	var headerUrl = document.createElement("h2");
	headerUrl.className = "headerUrl";
	headerUrl.innerHTML = "GitHub pull url";

	entryElement.appendChild(headerUrl);

	var url = document.createElement("div");
	url.className = "url";
	url.innerHTML = entry.url;

	entryElement.appendChild(url);

	var headerJob = document.createElement("h2");
	headerJob.className = "headerJob";
	headerJob.innerHTML = "Jenkins Jobs to check";

	entryElement.appendChild(headerJob);

	for(var i = 0; i < entry.jobs.length; i++) {
		var job = document.createElement("div");
		job.className = "job";
		job.innerHTML = entry.jobs[i];

		entryElement.appendChild(job);
	}

	var footer = document.createElement("div");
	footer.className = "entryFooter";
	
	var button = document.createElement("button");
	button.className = "remove";
	button.innerHTML = "Remove";
	button.addEventListener("click", function() {removeEntry(entry.id)});

	footer.appendChild(button);

	entryElement.appendChild(footer);

	return entryElement;
}

function exportConfiguration() {
	var width = 600;
	var height = 500;
	chrome.windows.create({
		url: chrome.extension.getURL('export.html'),
		type: 'popup',
		width: width,
		height: height,
		left: (screen.width / 2) - (width / 2),
		top: (screen.height / 2) - (height / 2),
	})
}

function importConfiguration() {
	var width = 600;
	var height = 500;
	chrome.windows.create({
		url: chrome.extension.getURL('import.html'),
		type: 'popup',
		width: width,
		height: height,
		left: (screen.width / 2) - (width / 2),
		top: (screen.height / 2) - (height / 2),
	}, function(window) {
		importWindowId = window.id;
	});
}

function load() {
	chrome.storage.local.get("entries", function(result) {
		if(result.entries) {
			var panel = document.getElementsByClassName("entries");
			if(panel.length == 1) {
				panel = panel[0];
				for(var i = 0; i < result.entries.length; i++) {
					var entry = result.entries[i];
					var element = createEntryElement(entry);
					panel.appendChild(element, panel.lastChild);
				}
			}
		}
	});
}

window.addEventListener("load", load);

chrome.windows.onRemoved.addListener(function(windowId) {
	if(windowId === importWindowId) {
		location.reload();
	}
});

setTimeout(function() {
	document.getElementsByClassName("add")[0].addEventListener("click", addEntry);
	document.getElementsByClassName("import")[0].addEventListener("click", importConfiguration);
	document.getElementsByClassName("export")[0].addEventListener("click", exportConfiguration);
}, 1);
