var branchAction = document.getElementsByClassName('branch-action branch-action-state-clean')[0];

if (typeof branchAction != 'undefined') {
	var buttonGroups = [].slice.call(branchAction.getElementsByClassName('BtnGroup'), 0);
	buttonGroups.forEach((buttonGroup) => {
		var buttons = [].slice.call(buttonGroup.getElementsByTagName('button'), 0);
		buttons.forEach((button) => {
			button.className = button.className.replace('btn-danger', 'btn-primary');
			if(button.type === 'submit') {
				button.className = button.className.replace(' tooltipped tooltipped-s', '')
				button.removeAttribute('aria-label');``
				var verified = button.getElementsByClassName('verified');
				if(verified.length == 0) {
					verified = document.createElement("div");
					verified.className = 'verified';
					verified.textContent = '( Verified )';
				} else {
					verified = verified[0];
				}
				button.appendChild(verified);
			}
		});
	});
}
