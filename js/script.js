
var this_viewport = '';
var last_viewport = '';

$(document).ready(function() {

	kickViewports();

	window.onresize = function(e) {
		kickViewports();		
	}
	
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
	
	
	/**
	 * meant to handle div.collapsible
	 * will can contain any number of paragraphs (or whatever)
	 * will create a "preview" and a MORE link and hide everything that isn't the preview
	 * clicking on the MORE link will review the hidden text
	 *
	 * first paragraph will be the preview
	 */
	$(".collapsible").each(function() {
	
		$(".collapsible p:eq(0)").append('<span class="collapsible-more-wrapper"> ... <a href="#" class="collapsible-more">MORE</a></span>');
	
		$(".collapsible p:gt(0)").wrapAll('<div class="collapsible-wrapper"></div>');
		$(".collapsible-wrapper p:last-child").append('<span class="collapsible-more-wrapper"> ... <a href="#" class="collapsible-more">LESS</a></span>');
		$(".collapsible-wrapper").hide();		

		$(".collapsible-more").on("click", function(e) {
			e.preventDefault();
			var t = $(this).html();
			if (t == "MORE") {
				$(this).parent().parent().siblings(".collapsible-wrapper").slideDown();
				$(this).parent().hide();
			} else {
				$(this).parent().parent().parent().siblings("p").children(".collapsible-more-wrapper").show();
				$(this).parent().parent().parent().slideUp();
			}
		});
	
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
	var diff = mh - hh;
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
 * Set up the slideshow for small.
 */
function homeMediaSmall() {
	if (!$("body").hasClass("home")) return false;
	$(document).ready(function() {	
		$('#carousel').responsiveSlides({
			auto: false,
			pager: true,
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

