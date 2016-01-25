var mergeButtons = document.getElementsByClassName('btn btn-danger js-merge-branch-action');
var mergeButton;

if(mergeButtons.length == 1) {
	mergeButton = mergeButtons[0];
	mergeButton.className = mergeButton.className.replace('btn-danger', 'btn-primary');
	mergeButton.className = mergeButton.className.replace(' tooltipped tooltipped-s', '');
	mergeButton.removeAttribute('aria-label');
} else {
	mergeButtons = document.getElementsByClassName('btn btn-primary js-merge-branch-action');
	if(mergeButtons.length == 1) {
		mergeButton = mergeButtons[0];
	}
}

if(mergeButton) {
	var verified = document.getElementsByClassName('verified');
	if(verified.length == 0) {
		verified = document.createElement("div");
		verified.className = 'verified';
		verified.innerHTML = 'Verified by GitGuard';

		mergeButton.appendChild(verified);
	}
}
