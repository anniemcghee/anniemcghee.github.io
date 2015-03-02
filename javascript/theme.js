"use strict";

jQuery(function($) {
	/*-----------------------------------------------------------------------------------*/
	/*	01. PARALLAX
	/*-----------------------------------------------------------------------------------*/

	$('.parallax').each(function(index, el) {
		$(el).parallax("50%", 0.6);
	});

	/*-----------------------------------------------------------------------------------*/
	/*	02. HEADER NAVIGATION
	/*-----------------------------------------------------------------------------------*/

	// Open/Close navigation

	$('.nav-toggle').on('click', function() {
		$('body').toggleClass('nav-open');
	});

	// Close navigation on clicking on a menu link

	$('.nav-menu a').on('click', function() {
		$('body').removeClass('nav-open');
	});

	// Scrolling menu change

	if( $('.nav-sticky').length ) {
		$(window).scroll(function() {
			if ($(window).scrollTop() >= 80) {
				$('body').addClass('nav-scroll-active');
			} else {
				$('body').removeClass('nav-scroll-active');
			}
		});
	}

	// Add scroll animation on anchor links

	$('.nav-menu a[href*=#]:not([href=#])').click(function() {
	  if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
	      || location.hostname === this.hostname) {
	    var target = $(this.hash);
	    var href = $.attr(this, 'href');
	    var mobile = 0;

	    if( $(window).width() < 992 ) {
	    	mobile = -75;
	    }
	    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	    if (target.length) {
	      $('html,body').animate({
	        scrollTop: target.offset().top + mobile
	      }, 1000, function () {
	          window.location.hash = href;
	      });
	      return false;
	    }
	  }
	});

	/*-----------------------------------------------------------------------------------*/
	/*	03. PORTFOLIO
	/*-----------------------------------------------------------------------------------*/

	if( $('.portfolio').length ) {
		var layoutMode = 'masonry';
		if( $('.portfolio-4-columns').length ) {
			layoutMode = 'fitRows';
		}
		var $portfolio = $('.portfolio').imagesLoaded( function() {
			$portfolio.isotope({
				itemSelector: '.portfolio-item',
				layoutMode: layoutMode
			}).isotope('layout');
		});

		$('.filter').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$portfolio.isotope({ filter: filterValue });

			$('.filter .selected').removeClass('selected');
			$(this).addClass('selected');
		});
	}

	$(".player").mb_YTPlayer();

	$(".video video").prop("volume", 0);

	/*-----------------------------------------------------------------------------------*/
	/*	05. SLICK CAROUSEL (testimonials, projects)
	/*-----------------------------------------------------------------------------------*/

	$('.projects').slick();
	$('.testimonials').slick({
		dots: true,
		fade: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000
	});



	/*-----------------------------------------------------------------------------------*/
	/*	07. BLOG MASONRY
	/*-----------------------------------------------------------------------------------*/

	if( $('.blog-masonry').length ) {
		var $portfolio = $('.blog-masonry').imagesLoaded( function() {
			$portfolio.isotope({
				itemSelector: '.blog-masonry > div',
				layoutMode: 'masonry'
			});
		});
	}

	/*-----------------------------------------------------------------------------------*/
	/*	08. Preloader
	/*-----------------------------------------------------------------------------------*/

	$('.site').imagesLoaded( function() {
		loadSite();
	});

	setTimeout(loadSite, 10000);

	function loadSite() {
		$('body').addClass('site-loaded');
		$('.preloader').fadeOut(1000);
	}

	/*-----------------------------------------------------------------------------------*/
	/*	09. FORMS
	/*-----------------------------------------------------------------------------------*/

	var formElement = $('form[data-form="contact-form"]');

	if( formElement.length ) {
		formElement.validate({
			 submitHandler: function(form) {
			 	$('#contact-form-message').remove();

		        try {
					$.ajax({
						type: 'POST',
						url: 'http://zmthemes.com/dropout-html/php/mail.php',
						data: {
							form : formElement.serialize(),
						}
					}).success(function(msg) {
						formElement.append('<label id="contact-form-message" class="success">' + msg + '</label>');
					});
		        } catch(e) { console.log(e); }

				return false;
			 }
		});
	}

	$('form[data-form="submit"] input').keypress(function (e) {
		if (e.which == 13) {
			$(this).parent().submit();
			e.preventDefault();
			return false;
		}
	});

	if( $('.animate').length ) {
		$('.animate').waypoint(function() {
			var el = $(this);
			el.addClass('animated');

			if( el.hasClass('counter') ) {
				el.find('span').each(function () {
				    $(this).prop('Counter',0).animate({
				        Counter: $(this).attr('data-val')
				    }, {
				        duration: 3000,
				        easing: 'swing',
				        step: function (now) {
				            $(this).text(Math.ceil(now));
				        }
				    });
				});
			}
		}, { offset: 'bottom-in-view', triggerOnce: true });
	}

	/*-----------------------------------------------------------------------------------*/
	/*	10. IE9 Placeholders
	/*-----------------------------------------------------------------------------------*/
	$.support.placeholder = ('placeholder' in document.createElement('input'))
	if (!$.support.placeholder) {
		$("[placeholder]").focus(function () {
			if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
		}).blur(function () {
			if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
		}).blur();

		$("[placeholder]").parents("form").submit(function () {
			$(this).find('[placeholder]').each(function() {
				if ($(this).val() == $(this).attr("placeholder")) {
					$(this).val("");
				}
			});
		});
	}
});

/*-----------------------------------------------------------------------------------*/
/*	11. GOOGLE MAPS
/*-----------------------------------------------------------------------------------*/

function map(element, location, zoom) {
	jQuery(element).gmap3({
		map: {
			options: {
				zoom: zoom,
				scrollwheel: false
			}
		},
		getlatlng:{
			address: location,
			callback: function(results) {
			if ( !results ) { return; }
			jQuery(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
			jQuery(this).gmap3({
				marker: {
					latLng:results[0].geometry.location,
				}
			});
			}
		}
	});
}