var mergeButtons = document.getElementsByClassName('btn btn-danger js-merge-branch-action');

if(mergeButtons.length == 1) {
	var mergeButton = mergeButtons[0];
	mergeButton.disabled = true;
}