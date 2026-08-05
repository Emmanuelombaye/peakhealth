( function( $ ) {

	var dtBlogPosts = function($scope, $) {

		var swiperPost = [];
		var swiperPostOptions = [];
		var swiperIterator = 1;

		$scope.find('.dt-sc-posts-list-wrapper.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

			swiperPostOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = $swiperItem.attr('data-carouseleffect');

			var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);

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
				swiperPostOptions[swiperUniqueId]['carouselthumbnailposition'] = 'vertical';
			} else {
				swiperPostOptions[swiperUniqueId]['carouselthumbnailposition'] = 'horizontal';
			}

			var scrollbar_class = '';
			var	scrollbar_hide = true;
			var carouselscrollbar = ($swiperItem.attr('data-carouselscrollbar') == 'true') ? true : false;
			if(carouselscrollbar) {
				scrollbar_class = $swiperItem.find('.dt-sc-products-scrollbar');
				scrollbar_hide = false;
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
					var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 3; var breakpoint_slides_3 = 3; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				} else if(slidesperview >= 4) {
					var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 4; var breakpoint_slides_3 = 3; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
				}	
				
			}

			// Generate swiper
			swiperPost[swiperUniqueId] = new Swiper($swiperItem, {
				init: true,
				initialSlide: 0,
				simulateTouch: true,
				roundLengths: true,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: true,
				grabCursor: true,

				slidesPerView: slidesperview,
				loop:loopmode,
				mousewheel: mousewheelcontrol,
				direction: 'horizontal',

				updateOnWindowResize: true,

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
					1681: {
						slidesPerView: breakpoint_slides_1,
					},
					1441: {
						slidesPerView: breakpoint_slides_2,
					},										
					1281: {
						slidesPerView: breakpoint_slides_3,
					},	            
					1025: {
						slidesPerView: breakpoint_slides_3,
					},
					768: {
						slidesPerView: breakpoint_slides_4,
					},
					319: {
						slidesPerView: breakpoint_slides_5,
					},
				},

			});

			// Arrow pagination
			var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

			if(arrowpagination) {

				$swiperItem.find('.dt-sc-products-arrow-pagination .dt-sc-products-arrow-prev').on('click', function(e) {			    	
					var swiperUniqueId = $swiperItem.attr('id');
					swiperPost[swiperUniqueId].slidePrev();
					if(swiperPostOptions[swiperUniqueId]['autoplay_enable']) {
						swiperPost[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();		
				});

				$swiperItem.find('.dt-sc-products-arrow-pagination .dt-sc-products-arrow-next').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperPost[swiperUniqueId].slideNext();
					if(swiperPostOptions[swiperUniqueId]['autoplay_enable']) {
						swiperPost[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});	

			}

			swiperIterator++;
		});

		$scope.find('.dt-sc-posts-list-wrapper').each(function() {

            var $page = 1;
            var $T = $(this);
            var $data = "", $content = $T.find('.tpl-blog-holder');

            // When load more button click...
            $('.dt-sc-posts-list-wrapper').on( "click", ".loadmore-elementor-btn.more-items", function() {

              var $this = $(this);
              var $count = $this.attr('data-count'), $cats = $this.attr('data-cats'), $style = $this.attr('data-style'),
              $layout = $this.attr('data-layout'), $column = $this.attr('data-column'), $list_type = $this.attr('data-listtype'),
              $hover = $this.attr('data-hover'), $overlay = $this.attr('data-overlay'), $align = $this.attr('data-align'),
              $mpages = $this.attr('data-maxpage'), $pos = $this.attr('data-pos'), $eheight = $this.attr('data-eheight'),
              $meta = $this.attr('data-meta'), $blogpostloadmore_nonce = $this.attr('data-blogpostloadmore-nonce'),
              $settings = $this.attr('data-settings');

              if( $meta != '' ) {
                  $meta = JSON.parse( $meta );
              }

              $content.addClass('loading');

              if( $this.hasClass('more-items') ) {
                $page++;
              }

              $.ajax({
                 type : "post",
                 dataType : "html",
                 url : dttheme_urls.ajaxurl,
                 data : { action: "blog_elementor_sc_load_more_post", count: $count, cats: $cats, pos: $pos, style: $style, layout: $layout, column: $column, pageNumber: $page, listtype: $list_type, hover: $hover, overlay: $overlay, align: $align, meta: $meta, blogpostloadmore_nonce: $blogpostloadmore_nonce, settings: $settings },
                 cache: true,
                 success: function (data) {
                    var $res = data.split('#####$$$$$');
                    if ( $res.length > 0 ) {

                        $content.append($res[0]);
                        $T.find('.loadmore-elementor-btn').attr('data-pos', $res[1]);

                        var newbx = $content.find('ul.entry-gallery-post-slider');
                        if( newbx !== null ) {
                            newbx.bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true});
                        }

                        if( $eheight == null || $eheight == false ) {
                            $content.css({overflow:'hidden'}).isotope( 'reloadItems' ).isotope();
                            $(window).trigger( 'resize' );
                        }

                        if( parseInt( $page ) >= parseInt( $mpages ) ) {
                            $T.find('.loadmore-elementor-btn').removeClass('more-items').html('All Posts Loaded');
                        } else {
                            $T.find('.loadmore-elementor-btn').addClass('more-items');
                        }
                    }
                    $content.removeClass('loading');
                 },
                 error: function (jqXHR, textStatus, errorThrown) {
                    $content.html('No More Posts Found');
                 }
              });
              return false;
            });

            // WHen window scroll...
            $(window).scroll(function(){
                var $c = $T.find('.infinite-elementor-btn.more-items');

                var ST = $(window).scrollTop();
                var DH = $(document).height();
                var WH = $(window).height();

                if( ( parseInt(ST) == parseInt(DH) - parseInt(WH) ) && $c.length > 0 ){

                    var $count = $c.attr('data-count'), $cats = $c.attr('data-cats'), $style = $c.attr('data-style'), $layout = $c.attr('data-layout'),
                    $column = $c.attr('data-column'), $list_type = $c.attr('data-listtype'), $hover = $c.attr('data-hover'),
                    $overlay = $c.attr('data-overlay'), $align = $c.attr('data-align'), $mpages = $c.attr('data-maxpage'),
                    $pos = $c.attr('data-pos'), $eheight = $c.attr('data-eheight'), $meta = $c.attr('data-meta'),
                    $blogpostloadmore_nonce = $c.attr('data-blogpostloadmore-nonce'), $settings = $c.attr('data-settings');

                    if( $meta != '' ) {
                        $meta = JSON.parse( $meta );
                    }

                    $content.addClass('loading');

                    $page++;

                    $.ajax({
                       type : "post",
                       dataType : "html",
                       url : dttheme_urls.ajaxurl,
                       data : { action: "blog_elementor_sc_load_more_post", count: $count, cats: $cats, pos: $pos, style: $style, layout: $layout, column: $column, pageNumber: $page, listtype: $list_type, hover: $hover, overlay: $overlay, align: $align, meta: $meta, blogpostloadmore_nonce: $blogpostloadmore_nonce, settings: $settings },
                       cache: true,
                       success: function (data) {
                          var $res = data.split('#####$$$$$');
                          if ( $res.length > 0 ) {
        
                              $content.append($res[0]);
                              $T.find('.infinite-elementor-btn').attr('data-pos', $res[1]);

                              var newbx = $content.find('ul.entry-gallery-post-slider');
                              if( newbx !== null ) {
                                  newbx.bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true});
                              }

                              if( $eheight == null || $eheight == false ) {
                                  $content.css({overflow:'hidden'}).isotope( 'reloadItems' ).isotope();
                                  $(window).trigger( 'resize' );
                              }
        
                              if( parseInt( $page ) >= parseInt( $mpages ) ) {
                                  $c.removeClass('more-items');
                              }
                          }
                          $content.removeClass('loading');
                       },
                       error: function (jqXHR, textStatus, errorThrown) {
                          $content.html('No More Posts Found');
                       }
                    });
                    return false;
                }
            });            
		});
	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-blog-posts.default', dtBlogPosts);
    });	

} )( jQuery );