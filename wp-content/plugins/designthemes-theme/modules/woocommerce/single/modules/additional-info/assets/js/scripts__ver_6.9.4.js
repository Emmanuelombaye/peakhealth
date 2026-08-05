var dtAdditionalInfoInit = function() {

    // End of Day

    if (jQuery('.product-additional-info .offer-end-of-day')[0]) {
        var timezone = jQuery('.offer-end-of-day').data('timezone');
        var day = new Date();
        var utc = day.getTime() + (day.getTimezoneOffset() * 60000);
        let d = new Date(utc + (3600000 * timezone)),
            duration = 60 * (60 - d.getMinutes());
        let timer = duration, minutes;
        let hours = (23 - d.getHours());
        hours = hours < 10 ? '0' + hours : hours;
        let label_h = jQuery('.product-additional-info .offer-end-of-day').data('hours');
        let label_m = jQuery('.product-additional-info .offer-end-of-day').data('minutes');
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            jQuery('.product-additional-info .offer-end-of-day').text(hours + ' ' + label_h + ' ' + minutes + ' ' + label_m);
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }


    // RealTime Visitors

    function pickRandomNumber(visitorsItem) {
        var min = visitorsItem.data('min-visitors');
        var max = visitorsItem.data('max-visitors');

        var randomNumber =  parseInt(Math.random() * (max - min) + min);
        visitorsItem.html(randomNumber);
    }
    var visitorsItem = jQuery('#ai-visitors-count');
    if (visitorsItem.length) {
        setInterval(function() {
            pickRandomNumber(visitorsItem);
        }, 6000);
    }

};


jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof dtshopObjects !== 'undefined' ) {
        if(dtshopObjects.enable_additional_info_scripts) {
            dtAdditionalInfoInit();
        }
    }


});


( function( $ ) {

	var dtShopAdditionalInfoJs = function($scope, $){
        dtAdditionalInfoInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-summary.default', dtShopAdditionalInfoJs);
	});

} )( jQuery );