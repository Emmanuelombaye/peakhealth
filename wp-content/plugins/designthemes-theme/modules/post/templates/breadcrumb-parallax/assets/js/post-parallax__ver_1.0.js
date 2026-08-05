(function ($) {
    "use strict";
	$(document).ready(function () {
	    if($(".dt-parallax-bg").length) {
	        $('.dt-parallax-bg').each(function(){
	            $(this).find('.main-title-section-bg').css('background-position', '50% 0px');
	            $(this).find('.main-title-section-bg').on('inview', function (event, visible) {
	                if(visible === true) {
	                    $(this).parallax("50%", 0.3);
	                }
	            });
	        });
	    }
    });
})(jQuery);