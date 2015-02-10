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

	if( $('.portfolio-ajax').length ) {
		$('.portfolio-ajax a').on('click', function(e) {
			$.ajax({
			  url: $(this).attr('href'),
			  cache: false,
			  success: function(html) {
			    $('body').append('<div class="portfolio-content">' + html + '</div>');

				$('.porftolio-post-close').on('click', function() {
					$('body').removeClass('portfolio-ajax-active');
				});

			    $('portfolio-content').imagesLoaded(function() {
					$('body').addClass('portfolio-ajax-active');
			    });
			    
			  }
			});

			e.preventDefault(); 
			return false;
		});
	}

	/*-----------------------------------------------------------------------------------*/
	/*	04. VIDEOS (for background video, either from YouTube or using the video element)
	/*-----------------------------------------------------------------------------------*/

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
	/*	06. INSTAGRAM
	/*-----------------------------------------------------------------------------------*/

	$('.instagram').on('didLoadInstagram', function(event, response) {
		var instagram = {};
		var $url = 'https://api.instagram.com/v1/users/' + response.data[0].id.split('_')[1] + '/?access_token=1554589859.71ed503.20f8b92a2d31453a97db5384e33ce3f9';

		$.ajax({
			method : "GET",
			url : $url,
			dataType : "jsonp",
			jsonp : "callback",
			success : function(dataSuccess) {
				instagram.authorPhoto = dataSuccess.data.profile_picture;
				instagram.followers = dataSuccess.data.counts.followed_by;
				instagram.photos = dataSuccess.data.counts.media;
				instagram.username = dataSuccess.data.username;
				instagram.full_name = dataSuccess.data.full_name;

				var data = response.data;
				var tagNames = [];
				var tagNums = [];
				var tags = [];
				instagram.target = event.currentTarget.id;
				instagram.likes = 0;

				for(var i=0; i<data.length; i++) {
					instagram.likes += data[i].likes.count;

					/* Get tag names and how many are there */
					for(var j=0; j<data[i].tags.length; j++) {
						if(tagNames.indexOf(data[i].tags[j]) === -1) {
							tagNames.push(data[i].tags[j]);
							tagNums.push(1);
						} else {
							tagNums[tagNames.indexOf(data[i].tags[j])]++;
						}
					}
				};

				/* Sort tags array */
				for (var i = 0; i < tagNames.length; i++) { tags.push({ 'name': tagNames[i], 'value': tagNums[i] }); }
				tags.sort(function(a, b) { return b.value - a.value; });

				/* Add instagram photos */

				for(var i=0; i<12; i++) {
					$("#" + instagram.target + ' .instagram-images').append('<li style="background-image: url(' + data[i].images.low_resolution.url + ')"></li>');
				}

				/* Add Instagram User Information */
				$("#" + instagram.target + ' .instagram-author-photo').append('<img src="' + instagram.authorPhoto + '" alt="' + instagram.full_name + '" />');
				for(var i=0; i<4; i++) {
					$("#" + instagram.target + ' .instagram-tags').append('<a href="http://www.enjoygram.com/tag/' + tags[i].name + '" target="_blank">#' + tags[i].name + '</a> ');
				}
				$("#" + instagram.target + ' .instagram-author-tag').append('<a href="http://instagram.com/' + instagram.username + '" target="_blank">#' + instagram.username + '</a>');
				$("#" + instagram.target + ' .num-photos span').html(instagram.photos);
				$("#" + instagram.target + ' .num-followers span').html(instagram.followers);
				$("#" + instagram.target + ' .num-likes span').html(instagram.likes);
				$("#" + instagram.target + ' .instagram-follow').attr('href', 'http://instagram.com/' + instagram.username);
			}
		});
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