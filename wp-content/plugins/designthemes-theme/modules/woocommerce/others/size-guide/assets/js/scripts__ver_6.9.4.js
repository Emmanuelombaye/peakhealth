var dtSizeGuideInit = function() {

    // Product Size Guide

        jQuery( 'body' ).delegate( '.wcsg_btn_wrapper .dt-wcsg-button', 'click', function(e) {

            var this_item = jQuery(this);
            var product_id = this_item.attr('data-product_id');
            var sizeguide_nonce = this_item.attr('data-sizeguide-nonce');

            // ajax call
            jQuery.ajax({
                type: "POST",
                url: dtshopObjects.ajaxurl,
                data:
                {
                    action: 'dtshop_size_guide_popup',
                    product_id: product_id,
                    sizeguide_nonce: sizeguide_nonce
                },
                beforeSend: function(){
                    this_item.parents('.wcsg_btn_wrapper').append( '<div class="dt-sc-product-loader"><i class="fa fa-spinner fa-spin"></i></div>' );

                },
                success: function (response) {
                    jQuery('body').append(response);
                    sizeGuideCarousel();
                },
                complete: function(){
                    this_item.parents('.wcsg_btn_wrapper').find('.dt-sc-product-loader').remove();
                }
            });

            e.preventDefault();

        });

    // Product Size Guide Close

        jQuery( 'body' ).delegate( '.dt-sc-size-guide-popup-close', 'click', function(e) {

            var this_item = jQuery(this);
            this_item.parents('.dt-sc-size-guide-popup-holder').remove();

            e.preventDefault();

        });


    // Carousel

        function sizeGuideCarousel() {

            var swiperProduct = [];
            var swiperIterator = 1;

            jQuery('.dt-sc-size-guide-popup-container.swiper-container').each(function() {

                var $swiperItem = jQuery(this);
                var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

                $swiperItem.attr('id', swiperUniqueId);

                // Generate swiper
                swiperProduct[swiperUniqueId] = new Swiper($swiperItem, {

                    initialSlide: 0,
                    simulateTouch: true,
                    roundLengths: true,
                    grabCursor: true,

                    slidesPerView: 1,
                    mousewheel: true,
                    direction: 'horizontal',

                    pagination: {
                        el: $swiperItem.find('.dt-sc-products-bullet-pagination'),
                        type: 'bullets',
                        clickable: true
                    },

                });

                swiperIterator++;

            });

        }

};


jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof dtshopObjects !== 'undefined' ) {
        if(dtshopObjects.product_template == 'woo-default') {
            dtSizeGuideInit();
        }
    }

});


( function( $ ) {

	var dtShopSizeGuideJs = function($scope, $){
        dtSizeGuideInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-summary.default', dtShopSizeGuideJs);
	});

} )( jQuery );