var dtCountDownTimerInit = function() {

    jQuery('.dtshop-downcount').each(function() {
        var el = jQuery(this);
        el.downCount({
            date    : el.attr('data-date'),
            offset  : el.attr('data-offset')
        });
    });

};


jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof dtshopObjects !== 'undefined' ) {
        if(dtshopObjects.enable_countdown_scripts) {
            dtCountDownTimerInit();
        }
    }


});


( function( $ ) {

	var dtShopCountDownTimerJs = function($scope, $){
        dtCountDownTimerInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-summary.default', dtShopCountDownTimerJs);
	});

} )( jQuery );