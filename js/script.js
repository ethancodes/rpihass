
var this_viewport = '';
var last_viewport = '';

$(document).ready(function() {

	kickViewports();

	window.onresize = function(e) {
		kickViewports();		
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
	
	
	// svg curves, if your browser supports that
	if ($('html').hasClass('svg') && $('body').hasClass('home')) {
		
		var curve = '<div style="height:50px;width:100%;background-color:#D1D2D4;" >';
		curve += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 50" preserveAspectRatio="none" width="100%" height="100%">';
		curve += '<path id="quadcurveABC" d="M 5 0 q 300 50 595 0" stroke-width="0" fill="#E5E5E5" />';
		curve += '</svg>';
		curve += '</div>';
		
		$('.dark-gray-section.concave').before(curve);

		curve = '<div style="height:50px;width:100%;background-color:#D1D2D4;" >';
		curve += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 50" preserveAspectRatio="none" width="100%" height="100%">';
		curve += '<path id="quadcurveABC" d="M 5 50 q 300 -50 595 0" stroke-width="0" fill="black" />';
		curve += '</svg>';
		curve += '</div>';
		
		$('.black-section.convex').before(curve);

		
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


function kickViewports() {
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
	
	if (this_viewport == 'l') {
		resizeHeader();
		placeContact();
	}
}


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
	$("header").css("height", "auto");
	homeMediaSmall();
}


/*
 * Stuff to do when you switch from small to large.
 */
function viewportLarge() {

//	alert('switching to large');
	$("#main-nav li:not(.active) ul").hide();
	$(".menu-action").remove();
	resizeHeader();
	homeMediaLarge();
}


/*
 * Resize the height of the header around the menu.
 */
function resizeHeader() {
	var mh = $("#main-nav ul:eq(0) li.first ul").outerHeight();
	var hh = parseInt($('header').css('min-height'));
	if (hh > 0) { } else { hh = 250; }
//	window.document.title = mh.toString();
//	window.document.title = hh.toString();
	var diff = mh - hh;
//	window.document.title = diff.toString();
	if (diff > 0) {
		$("header").css('height', mh.toString() + "px");
	}
}


/*
 * Try to place the "contact" link appropriately.
 * Can't believe how ridiculously complicated this is.
 */
function placeContact() {
	var mntop = $("#main-nav").position().top;
	var mnh = $("#main-nav ul:eq(0)").outerHeight();
	$("#contact").css("top", (mntop + mnh + 10).toString() + "px");
}


/*
 * Set up the slideshow. Apparently only for small.
 */
function homeMediaSmall() {
	if (!$("body").hasClass("home")) return false;
	$(document).ready(function() {	
		$('#carousel').responsiveSlides({
			auto: false,
			pager: true,
			/*
			nav: true,
			prevText: "&lt;",
			nextText: "&gt;"
			*/
		});
				
	});
}


/*
 * Gallery, for large.
 */
function homeMediaLarge() {
	if (!$("body").hasClass("home")) return false;
	$(document).ready(function() {	
		
		$('#carousel .overlay-video').each(function() {
			$(this).parent().css('position', 'relative').css('display', 'block');
			$(this).before('<span class="go-overlay-media go-overlay-video"></span>');
		});
		$('#carousel .overlay-audio').each(function() {
			$(this).parent().css('position', 'relative').css('display', 'block');
			$(this).before('<span class="go-overlay-media go-overlay-audio"></span>');
		});
		
	});
}

