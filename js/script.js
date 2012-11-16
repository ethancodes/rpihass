$(document).ready(function() {

	/*
	 * SET UP THE MENU
	 */
	 
	$("#main-nav ul li").each(function() {
		// do i have a submenu?
		var submenu = $(this).children("ul").length;
		if (submenu > 0) {
		
			// okay let's add some fancy blah blah blah
			if ($(this).hasClass('active')) {
				$(this).children('a').after('<a class="menu-action menu-open" href="#">&mdash;</a>');
			} else {
				$(this).children('a').after('<a class="menu-action" href="#">+</a>');
			}
		
		}
	});
	
	$(".menu-action").on('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass("menu-open")) {
			// currently open, close
			$(this).siblings("ul").slideUp();
			$(this).html("+");
			$(this).removeClass("menu-open");
		} else {
			// currently closed, open
			$(this).siblings("ul").slideDown();
			$(this).html("-");
			$(this).addClass("menu-open");
		}
	});

});