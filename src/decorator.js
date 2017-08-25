var branchAction = document.getElementsByClassName('branch-action branch-action-state-clean')[0];

if (typeof branchAction != 'undefined') {
	var buttonGroups = [].slice.call(branchAction.getElementsByClassName('BtnGroup'), 0);
	buttonGroups.forEach((buttonGroup) => {
		var buttons = [].slice.call(buttonGroup.getElementsByTagName('button'), 0);
		buttons.forEach((button) => {
			button.className = button.className.replace('btn-primary', 'btn-danger');
			if(button.type === 'submit') {
				var verified = button.getElementsByClassName('verified');
				if (verified && verified.length == 1) {
					verified = verified[0];
					button.removeChild(verified);
				}
				if (button.className.indexOf('tooltipped') === -1) {
					button.className += ' tooltipped tooltipped-s';
					button.setAttribute('aria-label','How about we DON\'T MERGE to RED master, huh mate ?');
				}
			}
		});
	});
}
