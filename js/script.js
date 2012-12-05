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
			$(this).html("&mdash;");
			$(this).addClass("menu-open");
		}
	});
	
	
	// circle things, if your browser supports that
	if ($('html').hasClass('borderradius')) {
		
		// so far this works for img and div, haven't tried anything else.
		$('.circle').each(function() {

			var h = $(this).outerHeight();
			var w = $(this).outerWidth();			
			var m = Math.min(h, w);
			var css = 'overflow: hidden; ';
			css += 'width: ' + m.toString() + 'px; ';
			css += 'height: ' + m.toString() + 'px; ';
			css += '-moz-border-radius: ' + (m / 2).toString() + 'px; ';
			css += '-webkit-border-radius: ' + (m / 2).toString() + 'px; ';
			css += 'border-radius: ' + (m / 2).toString() + 'px; ';			
			var offset = (w / 2) - (m / 2);
			
			// if there's a link in here, let's mangle that
			$(this).children('a').each(function() {
				var t = $(this).html().split(" ");
				$(this).parent().addClass('link-words-' + t.length.toString());
				$(this).html(t.join("<br />"));
			});
			
			$(this).css('max-width', w.toString() + 'px').css('margin-left', '-' + offset.toString() + 'px');
			$(this).wrap('<div class="circle-wrapper" style="' + css + '"></div>');
		
		});

	}
	
	// skew things, if your browser supports that
	if ($('html').hasClass('csstransforms')) {
		$('.skew').each(function() {
			$('img', this).wrap('<span class="backskew"></span>');
			$(this).addClass('skew-go');
		});
		$('.rotate').each(function() {
//			$(this).addClass('rotate-go');
		});
	}
	
	// magically center things
	$('.jscenter').each(function() {
		var child_width = 0;
		$(this).children().each(function() {
			child_width += $(this).width();
		});
		if (child_width > 0) {
			$(this).css('width', child_width.toString() + "px").css('margin', '0 auto');
		}
		
	});
	
	
	// media gallery slider on home page
	$('.media-gallery-slider').each(function() {
	
		$(this).children().wrapAll('<div class="media-gallery-slider-wrapper"></div>');
	
//		$(this).addClass('media-gallery-slider-go');
	
	});
	
	
	
	

});


