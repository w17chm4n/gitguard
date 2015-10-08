var mergeButtons = document.getElementsByClassName('btn btn-primary merge-branch-action js-details-target');

mergeButtons = mergeButtons.length == 0 ? document.getElementsByClassName('btn merge-branch-action js-details-target') : mergeButtons;

if(mergeButtons && mergeButtons.length == 1) {
	var mergeButton = mergeButtons[0];

	var verified = document.getElementsByClassName('verified');
	if(verified && verified.length == 1) {
		verified = verified[0];
		mergeButton.removeChild(verified);
	}

	if(mergeButton.className.indexOf('btn-danger') < 0) {
		if(mergeButton.className.indexOf('btn-primary') > - 1) {
			mergeButton.className = mergeButton.className.replace('btn-primary', 'btn-danger');
		} else {
			mergeButton.className += ' btn-danger';
		}
		mergeButton.className += ' tooltipped tooltipped-s';
		mergeButton.setAttribute('aria-label','How about we DON\'T MERGE to RED master, huh mate ?');
	}
}
