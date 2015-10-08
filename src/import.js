function importConfiguration() {
	var configuration = document.getElementsByClassName("configuration")[0].value;
	try {
		configuration = JSON.parse(configuration);
	} catch(err) {
		alert('Invalid JSON format.');
	}

	for(var i = 0; i < configuration.entries; i++) {
		configuration.entries.id = generateUUID();
	}

	chrome.storage.local.set(configuration);	
	
	self.close();
}

setTimeout(function() {
	document.getElementsByClassName("ok")[0].addEventListener("click", importConfiguration);
});

