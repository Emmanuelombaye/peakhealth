( function( $ ) {

	var dtShopProducts = function($scope, $){

		var swiperProduct = [];
		var swiperProductOptions = [];
		var swiperIterator = 1;

		$scope.find('.dt-sc-products-container.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

			swiperProductOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = $swiperItem.attr('data-carouseleffect');
			var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
			if(effect == 'fade') {
				slidesperview = 1;
			}

			var slidespercolumn = 1;
			var carouselslidespercolumn = parseInt($swiperItem.attr('data-carouselslidespercolumn'), 10);
			if(effect == 'multirow') {
				slidespercolumn = carouselslidespercolumn;
			}

			var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;

			var pagination_class = '';
			var pagination_type = '';

			var carouselbulletpagination = ($swiperItem.attr('data-carouselbulletpagination') == 'true') ? true : false;
			if(carouselbulletpagination) {
				var pagination_class = $swiperItem.find('.dt-sc-products-bullet-pagination');
				var pagination_type = 'bullets';
			}

			var carouselthumbnailposition = ($swiperItem.attr('data-carouselthumbnailposition') != '') ? $swiperItem.attr('data-carouselthumbnailposition') : false;
			if(carouselthumbnailposition) {
				swiperProductOptions[swiperUniqueId]['carouselthumbnailposition'] = 'vertical';
			} else {
				swiperProductOptions[swiperUniqueId]['carouselthumbnailposition'] = 'horizontal';
			}

			var scrollbar_class = '';
			var	scrollbar_hide = true;
			var carouselscrollbar = ($swiperItem.attr('data-carouselscrollbar') == 'true') ? true : false;
			if(carouselscrollbar) {
				scrollbar_class = $swiperItem.find('.dt-sc-products-scrollbar');
				scrollbar_hide = false;
			}

			var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
			if(spacebetween) {
				spacebetween = spacebetween;
			} else {
				spacebetween = 0;
			}

			var autoheight = true;
			if(effect == 'multirow') {
				autoheight = false;
				loopmode = false;
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
				} else if(slidesperview == 4) {
					var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 4; var breakpoint_slides_3 = 3; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				} else if(slidesperview == 5) {
					var breakpoint_slides_1 = 5; var breakpoint_slides_2 = 4; var breakpoint_slides_3 = 3; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				} else if(slidesperview >= 6) {
					var breakpoint_slides_1 = 6; var breakpoint_slides_2 = 4; var breakpoint_slides_3 = 3; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				}

			}

			// Generate swiper
			swiperProduct[swiperUniqueId] = new Swiper($swiperItem, {

				initialSlide: 0,
				simulateTouch: true,
				roundLengths: true,
				//spaceBetween: spacebetween,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: autoheight,
				grabCursor: true,

				slidesPerView: slidesperview,
				slidesPerColumn: slidespercolumn,
				slidesPerColumnFill: 'row',
				loop:loopmode,
				mousewheel: mousewheelcontrol,
				direction: 'horizontal',

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

			});

			// Arrow pagination
			var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

			if(arrowpagination) {

				$swiperItem.find('.dt-sc-products-arrow-pagination .dt-sc-products-arrow-prev').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperProduct[swiperUniqueId].slidePrev();
					if(swiperProductOptions[swiperUniqueId]['autoplay_enable']) {
						swiperProduct[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

				$swiperItem.find('.dt-sc-products-arrow-pagination .dt-sc-products-arrow-next').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperProduct[swiperUniqueId].slideNext();
					if(swiperProductOptions[swiperUniqueId]['autoplay_enable']) {
						swiperProduct[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

			}

			swiperIterator++;

		});


		// Product Shortcode - Ajax Pagination

		jQuery( 'body' ).delegate( '.dt-sc-product-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			// Pagination Data
			if(this_item.parent().hasClass('prev-post')) {
				var current_page = parseInt(this_item.attr('data-currentpage'), 10)-1;
			} else if(this_item.parent().hasClass('next-post')) {
				var current_page = parseInt(this_item.attr('data-currentpage'), 10)+1;
			} else {
				var current_page = this_item.text();
			}

			var post_per_page = this_item.parents('.dt-sc-product-pagination').attr('data-postperpage');

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call = this_item.parents('.dt-sc-product-pagination').attr('data-functioncall');
			var output_div = this_item.parents('.dt-sc-product-pagination').attr('data-outputdiv');

			var shortcodeattrs = this_item.parents('.dt-sc-product-pagination').attr('data-shortcodeattrs');

			var productpagination_nonce = this_item.parents('.dt-sc-product-pagination').attr('data-productpagination-nonce');


			// Ajax call
			jQuery.ajax({
				type: "POST",
				url: dtshopScObjects.ajaxurl,
				data:
				{
					action: function_call,
					current_page: current_page,
					offset: offset,
					post_per_page: post_per_page,
					function_call: function_call,
					output_div: output_div,
					shortcodeattrs: shortcodeattrs,
					productpagination_nonce: productpagination_nonce
				},
				beforeSend: function(){
					this_item.parents('.'+output_div).prepend( '<div class="dt-sc-product-loader"><i class="fa fa-spinner fa-spin"></i></div>' );
				},
				success: function (response) {
					this_item.parents('.'+output_div).replaceWith(response);
					jQuery(window).trigger('resize');
				},
				complete: function(){
					this_item.parents('.'+output_div+' .dt-sc-product-loader').remove();
				}
			});

			e.preventDefault();

		});



	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-products.default', dtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/tabs.default', dtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/jet-tabs.default', dtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/text-editor.default', dtShopProducts);
    });

} )( jQuery );