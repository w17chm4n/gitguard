var mergeButtons = document.getElementsByClassName('btn btn-danger merge-branch-action js-details-target');

if(mergeButtons.length == 1) {
	var mergeButton = mergeButtons[0];
	mergeButton.disabled = true;
}