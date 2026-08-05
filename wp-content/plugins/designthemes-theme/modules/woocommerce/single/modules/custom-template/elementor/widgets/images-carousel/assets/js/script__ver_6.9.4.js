( function( $ ) {

	var dtShopProductSingleImagesCarousel = function($scope, $){

        var swiperGallery = [];
		var swiperGalleryOptions = [];
		var swiperIterator = 1;

		$scope.find('.dt-sc-product-image-gallery-container.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

			swiperGalleryOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = $swiperItem.attr('data-carouseleffect');

			var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
			var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;
			var verticaldirection = ($swiperItem.attr('data-carouselverticaldirection') == 'true') ? true : false;
			var direction = 'horizontal';
			if(verticaldirection) {
				direction = 'vertical';
			}

			var pagination_class = '';
			var pagination_type = '';

			var carouselbulletpagination = ($swiperItem.attr('data-carouselbulletpagination') == 'true') ? true : false;
			if(carouselbulletpagination) {
				var pagination_class = $swiperItem.find('.dt-sc-product-image-gallery-bullet-pagination');
				var pagination_type = 'bullets';
			}

			var thumbnailpagination = ($swiperItem.attr('data-carouselthumbnailpagination') == 'true') ? true : false;
			if(thumbnailpagination) {
				swiperGalleryOptions[swiperUniqueId]['thumbnailpagination'] = true;
				loopmode = false;
			} else {
				swiperGalleryOptions[swiperUniqueId]['thumbnailpagination'] = false;
			}

			var carouselautoheight = false;
			var carouselthumbnailposition = ($swiperItem.attr('data-carouselthumbnailposition') != '') ? $swiperItem.attr('data-carouselthumbnailposition') : false;
			if(carouselthumbnailposition) {
				swiperGalleryOptions[swiperUniqueId]['carouselthumbnailposition'] = 'vertical';
				carouselautoheight = true;
			} else {
				swiperGalleryOptions[swiperUniqueId]['carouselthumbnailposition'] = 'horizontal';
			}

			var carouselslidesperviewthumbnail = parseInt($swiperItem.attr('data-carouselslidesperviewthumbnail'), 10);
			swiperGalleryOptions[swiperUniqueId]['carouselslidesperviewthumbnail'] = carouselslidesperviewthumbnail;

			var scrollbar_class = '';
			var	scrollbar_hide = true;
			var carouselscrollbar = ($swiperItem.attr('data-carouselscrollbar') == 'true') ? true : false;
			if(carouselscrollbar) {
				scrollbar_class = $swiperItem.find('.dt-sc-product-image-gallery-scrollbar');
				scrollbar_hide = false;
			}

			var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
			if(spacebetween) {
				spacebetween = spacebetween;
			} else {
				spacebetween = 0;
			}

			if($swiperItem.parents('section').hasClass('page-with-sidebar')) {

				if(slidesperview == 1) {
					var breakpoint_slides_1 = breakpoint_slides_2 = breakpoint_slides_3 = breakpoint_slides_4 = breakpoint_slides_5 = 1;
				} else if(slidesperview == 2) {
					var breakpoint_slides_1 = 2; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1; var breakpoint_slides_5 = 1;
				} else if(slidesperview >= 3) {
					var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1; var breakpoint_slides_5 = 1;
				}

			} else {

				if(slidesperview == 1) {
					var breakpoint_slides_1 = breakpoint_slides_2 = breakpoint_slides_3 = breakpoint_slides_4 = breakpoint_slides_5 = 1;
				} else if(slidesperview == 2) {
					var breakpoint_slides_1 = 2; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				} else if(slidesperview == 3) {
					var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 3; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				} else if(slidesperview >= 4) {
					var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 3; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				}

			}

			// Generate swiper
			swiperGallery[swiperUniqueId] = new Swiper($swiperItem, {

				initialSlide: 0,
				simulateTouch: true,
				roundLengths: true,
				spaceBetween: spacebetween,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: carouselautoheight,
				grabCursor: true,

				slidesPerView: slidesperview,
				loop:loopmode,
				mousewheel: mousewheelcontrol,
				direction: direction,

				pagination: {
					el: pagination_class,
					type: pagination_type,
					clickable: true
				},

				scrollbar: {
					el: scrollbar_class,
					hide: scrollbar_hide,
					draggable: true,
				},

				effect: effect,

				breakpoints: {
					0: {
						slidesPerView: breakpoint_slides_5,
					},
					480: {
						slidesPerView: breakpoint_slides_5,
					},
					768: {
						slidesPerView: breakpoint_slides_4,
					},
					1025: {
						slidesPerView: breakpoint_slides_3,
					},
					1281: {
						slidesPerView: breakpoint_slides_2,
					},
					1441: {
						slidesPerView: breakpoint_slides_1,
					}
				},

				on: {
					resize: function () {
						if(carouselthumbnailposition) {
							// Update vertical thumbnail pagination height on resize
							$swiperItem.parents('.dt-sc-product-image-gallery-holder').find('.dt-sc-product-image-gallery-thumb-container').height($swiperItem.parents('.dt-sc-product-image-gallery-holder').find('.dt-sc-product-image-gallery').height());
						}
					},
				},

			});


			// Arrow pagination
			var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

			if(arrowpagination) {

				$swiperItem.find('.dt-sc-product-image-gallery-arrow-pagination .dt-sc-product-image-gallery-arrow-prev').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperGallery[swiperUniqueId].slidePrev();
					if(swiperGalleryOptions[swiperUniqueId]['autoplay_enable']) {
						swiperGallery[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

				$swiperItem.find('.dt-sc-product-image-gallery-arrow-pagination .dt-sc-product-image-gallery-arrow-next').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperGallery[swiperUniqueId].slideNext();
					if(swiperGalleryOptions[swiperUniqueId]['autoplay_enable']) {
						swiperGallery[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

			}

			swiperIterator++;

		});

		// Generate gallery thumb pagination

		for(i = 1; i < swiperIterator; i++) {
			if(swiperGalleryOptions['swiperuniqueid-'+i]['thumbnailpagination']) {

				var swiperUniqueId = 'swiperuniqueid-'+i;

				if(swiperGalleryOptions[swiperUniqueId]['carouselthumbnailposition'] == 'vertical') {
					jQuery('#'+swiperUniqueId).parents('.dt-sc-product-image-gallery-holder').find('.dt-sc-product-image-gallery-thumb-container').height(jQuery('#'+swiperUniqueId).parents('.dt-sc-product-image-gallery-holder').find('.dt-sc-product-image-gallery').height());
				}

				var $swiper_gallerythumb_item = jQuery('#'+swiperUniqueId).parents('.dt-sc-product-image-gallery-holder').find('.dt-sc-product-image-gallery-thumb-container');

				var swiperGalleryThumbs = new Swiper($swiper_gallerythumb_item, {
					direction: swiperGalleryOptions[swiperUniqueId]['carouselthumbnailposition'],
					initialSlide: 0,
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: swiperGalleryOptions[swiperUniqueId]['carouselslidesperviewthumbnail'],
					touchRatio: 0.2,
					slideToClickedSlide: true
				});

				swiperGallery[swiperUniqueId].controller.control = swiperGalleryThumbs;
				swiperGalleryThumbs.controller.control = swiperGallery[swiperUniqueId];

				jQuery(window).trigger('resize');

			}
		}

		// Image gallery thumb image enlarger

		$('body').on('click', '.dt-sc-product-image-gallery-thumb-enlarger', function (e) {

			var pswpElement = document.querySelectorAll('.pswp')[0];

			// collect all images
			var items = [];
			var image_gallery = $(this).parents('.dt-sc-product-image-gallery-container').find('.dt-sc-product-image');

			if ( image_gallery.length ) {

				image_gallery.each( function( i, el ) {

					var image_tag = $(el).find( 'img' );

					if ( image_tag.length ) {

						var large_image_src = image_tag.attr( 'data-large_image' ),
							large_image_w   = image_tag.attr( 'data-large_image_width' ),
							large_image_h   = image_tag.attr( 'data-large_image_height' ),
							item            = {
								src  : large_image_src,
								w    : large_image_w,
								h    : large_image_h,
								title: image_tag.attr( 'data-caption' ) ? image_tag.attr( 'data-caption' ) : image_tag.attr( 'title' )
							};
						items.push( item );

					}

				} );

			}

			var index = $(this).parents('.dt-sc-product-image-gallery-container').find('.swiper-slide.swiper-slide-active').index();

			// define options (if needed)
			var options = {
				// optionName: 'option value'
				// for example:
				index: index // start at first slide
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();

			e.preventDefault();

		});

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-images-carousel.default', dtShopProductSingleImagesCarousel);
    });

} )( jQuery );