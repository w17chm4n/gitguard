var branchAction = document.getElementsByClassName('branch-action branch-action-state-clean')[0];

if (typeof branchAction != 'undefined') {
	var buttonGroups = [].slice.call(branchAction.getElementsByClassName('BtnGroup'), 0);
	buttonGroups.forEach((buttonGroup) => {
		var buttons = [].slice.call(buttonGroup.getElementsByTagName('button'), 0);
		buttons.forEach((button) => {
			button.disabled = false;
		});
	});
}
