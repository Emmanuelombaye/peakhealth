var dtBuyNowInit = function() {

    var $warp_fragment_refresh = {
        url: wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ),
        type: 'POST',
        success: function( data ) {

            if ( data && data.fragments ) {

                jQuery.each( data.fragments, function( key, value ) {
                    jQuery( key ).replaceWith( value );
                });

                jQuery( document.body ).trigger( 'wc_fragments_refreshed' );
                jQuery( document.body ).trigger( 'added_to_cart' );

            }

        }
    };

    jQuery('.quick_buy_now_button').on('click', function (e) {

        var this_item = jQuery(this);

        if(this_item.parents('.product').hasClass('product-type-external')) {
            return;
        }

        e.preventDefault();

        var product_url = window.location,
            form = jQuery('form.cart');

        this_item.addClass( 'loading' );

        var simple_addtocart = '';
        if(form.parents('.product').hasClass('product-type-simple')) {
            simple_addtocart = '&add-to-cart='+form.find('.single_add_to_cart_button').attr('value');
        }

        jQuery.post(product_url, form.serialize() + simple_addtocart + '&_wp_http_referer=' + product_url, function (result)

        {

            var cart_dropdown = jQuery('.widget_shopping_cart', result)
            jQuery('.widget_shopping_cart').replaceWith(cart_dropdown); // update dropdown cart
            jQuery.ajax($warp_fragment_refresh); // update fragments

            this_item.removeClass( 'loading' );

            window.location = wc_add_to_cart_params.cart_url;

        });

    });


};


jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof dtshopObjects !== 'undefined' ) {
        if(dtshopObjects.enable_buy_now_scripts) {
            dtBuyNowInit();
        }
    }


});


( function( $ ) {

	var dtShopBuyNowJs = function($scope, $){
        dtBuyNowInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-summary.default', dtShopBuyNowJs);
	});

} )( jQuery );