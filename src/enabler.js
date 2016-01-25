var mergeButtons = document.getElementsByClassName('btn btn-primary js-merge-branch-action');

if(mergeButtons.length != 1) {
	mergeButtons = document.getElementsByClassName('btn btn-danger js-merge-branch-action');
}

if (mergeButtons.length == 1) {
	var mergeButton = mergeButtons[0];
	mergeButton.disabled = false;
}