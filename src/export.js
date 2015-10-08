chrome.storage.local.get("entries", function(result) {
		if(result) {
			for(var i = 0; i < result.entries.length; i++) {
				delete result.entries[i].id;
			}

			var configuration = document.getElementsByClassName("configuration")[0];
			
			configuration.innerHTML = JSON.stringify(result, undefined, 4) ;
		}
	}
);