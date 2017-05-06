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

/* Switching between login and sign up tabs */
$(document).ready(function(){
	$(document).on('click','.signup-tab',function(e){
		e.preventDefault();
	    $('#signup-taba').tab('show');
	});	
	
	$(document).on('click','.signin-tab',function(e){
	   	e.preventDefault();
	    $('#signin-taba').tab('show');
	});
	    	
	$(document).on('click','.forgetpass-tab',function(e){
	 	e.preventDefault();
	   	$('#forgetpass-taba').tab('show');
	});
});	

/* Slick Carousel for Rules */
$(document).ready(function(){
    $('.your-class').slick({
        
     });
 });
