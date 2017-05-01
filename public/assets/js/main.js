/**********************************/
/* Styling for Sidebar Navigation */
/**********************************/
$(document).ready( () => {
	let trigger = $('.hamburger');
	let overlay = $('.overlay');
	let isClosed = false;

	/* Expands Sidebar */
	trigger.click( () => {
		hamburgerOpen();
	});

	function hamburgerOpen() {
		if(isClosed) {
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;

		} else {
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}
	}

	$('[data-toggle="offcanvas"]').click( () => {
		$('#wrapper').toggleClass('toggled');
	});

});