
var this_viewport = '';
var last_viewport = '';

$(document).ready(function() {

	var viewport = $(window).width();
	if (viewport < 570) {
		this_viewport = 's';
	} else {
		this_viewport = 'l';
	}
	if (this_viewport != last_viewport) last_viewport = this_viewport;

	window.onresize = function(e) {
		var viewport = $(window).width();
		if (viewport < 570) {
			this_viewport = 's';
		} else {
			this_viewport = 'l';
		}
		if (this_viewport != last_viewport) {
			last_viewport = this_viewport;
			
			if (this_viewport == "s") {
				viewportSmall();
			} else if (this_viewport == "l") {
				viewportLarge();
			}
		}
		
	}
	
	setUpMenuNav();	
	
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
	
	/*
	// skew things, if your browser supports that
	if ($('html').hasClass('csstransforms')) {		
		$(".media-gallery-slider").each(function() {
			var id = $(this).attr('id');
			$(this).children().each(function() {
				$(this).wrap('<div class="outerShell"><div class="innerShell"></div></div>');
			});
			window.onresize = function(e) {
				doSlider(id);
			}			
			doSlider(id);
		});
		
	}
	*/
	
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
	
	

});


// figure out how big the images are
// figure out the dimensions of innerShell
// figure out how far to space them apart
function doSlider(slider_id) {

	if (slider_id != "") slider_id = "#" + slider_id;

	var cw = $("header").outerWidth();
	var iw = 570 * 0.4;
	var ih = iw * 1.06667;
	var id = iw * 0.73334;
	var ic = 0;
	var imgh = 0;
	var imgw = 0;
	$(slider_id + " .innerShell").each(function() {
		$(this).css('width', iw.toString() + "px").css('height', ih.toString() + "px");
		ic++;
		imgh = $("img", this).height();
		imgw = $("img", this).width();
	});
	var displace = 0;
	$(slider_id + " .outerShell").each(function() {
		$(this).css('left', displace.toString() + "px");
		displace += id;
	});
	
	var middle = cw / 2;
	var half = (ic * id) / 2;
	
	$(slider_id)
		.addClass('slider-go')
		.css('height', imgh.toString() + "px")
		.css('width', (ic * id).toString() + "px")
		.css('margin-left', ((half - middle) * -1).toString() + "px");
}


/*
 * SET UP THE MENU
 */
function setUpMenuNav() {

	$(".menu-action").remove();

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
}


/*
 * Stuff to do when you switch from large to small.
 */
function viewportSmall() {
	setUpMenuNav();
}


/*
 * Stuff to do when you switch from small to large.
 */
function viewportLarge() {

//	alert('switching to large');
	$("#main-nav li:not(.active) ul").hide();
	$(".menu-action").remove();

}


