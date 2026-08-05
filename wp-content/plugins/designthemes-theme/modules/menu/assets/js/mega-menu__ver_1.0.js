jQuery.noConflict();
jQuery(document).ready(function($) {
    "use strict";

    // Sticky Row
    if( $("#header-wrapper .sticky-header").length > 0 ) {
        var $sticky_header_cloned = $('.sticky-header').clone();
        $sticky_header_cloned.removeClass('sticky-header').addClass('sticky-header-active');
        $( $sticky_header_cloned ).insertAfter( $('.sticky-header') );

        $sticky_header_cloned.find('.wdt-header-icons-list-item.search-item.search-overlay').each(function() {
            var $searchContainer = $(this).find('.wdt-search-form-container');  
            if ($searchContainer.length) {
                $searchContainer.remove(); 
            }
        });

        $('body').css('--sticky-header-height', $('.sticky-header-active').outerHeight() + 'px');
        
/*        var $window = $(window),
        lastScrollTop = 0, st;
        $( window ).on( 'scroll', function(){
            st = $(this).scrollTop();

            if(0 < st) {
                $("#header-wrapper .sticky-header-active").addClass('dt-header-top');
            } else {
                $("#header-wrapper .sticky-header-active").removeClass('dt-header-top');
            }

            if ( st < lastScrollTop || $window.width() < 992){
                if(0 === st) {
                    $("#header-wrapper .sticky-header-active").removeClass('dt-header-scroll');
                } else {
                    $("#header-wrapper .sticky-header-active").removeClass('dt-header-scroll');
                    var $sticky_header_top = Math.round($('.sticky-header').offset().top);
                    var $sticky_header_height = Math.round($('.sticky-header').height());
                    var $initiate_scroll_position = parseInt($sticky_header_top, 10) + parseInt($sticky_header_height, 10);
                    if(parseInt($initiate_scroll_position, 10) <= parseInt(st, 10)) {
                        $("#header-wrapper .sticky-header-active").addClass('dt-header-scroll');
                        window.dispatchEvent(new Event('resize'));
                    }
                }
            } else {
                $("#header-wrapper .sticky-header-active").removeClass('dt-header-scroll');
            }
            lastScrollTop = st;

            var $sticky_header_top = Math.round($('.sticky-header').offset().top);
            var $sticky_header_active_top = Math.round($('.sticky-header-active').offset().top);

            if(parseInt($sticky_header_active_top, 10) <= parseInt($sticky_header_top, 10)) {
                $("#header-wrapper .sticky-header-active").hide();
            } else {
                $("#header-wrapper .sticky-header-active").show();
            }

        }).trigger('scroll'); */


        var position = $(window).scrollTop(); 

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if(scroll > position) {
                $("#header-wrapper .sticky-header-active").addClass('dt-header-top');
                $("#header-wrapper .sticky-header-active").addClass('dt-header-scroll');

                $("#header-wrapper .sticky-header-active").show();
            } else {
                 $("#header-wrapper .sticky-header-active").removeClass('dt-header-top');
                 $("#header-wrapper .sticky-header-active").removeClass('dt-header-scroll');
            }
            position = scroll;
        });
    }

    // Mega Menu
    function megaMenu() {

        var $header = 0;
        if( $("#header .container").length ) {
            $header = $("#header .container").offset().left;
        }
        $("li.has-mega-menu").each(function(){
            var $parent      = $(this),
                $parent_left = $parent.offset().left,
                $sub_menu    = $parent.children("ul.sub-menu"),
                $section     = $sub_menu.find('section');

            if( $section.hasClass('elementor-section-stretched') ) {
            	setTimeout(function() {
           			$sub_menu.css('left', - ( $parent_left ) );

            		var pad = $sub_menu.css('padding-left');
            		$section.css('left', - ( parseInt(pad) ) );

                    var windowWidth = $(window).width();
                    $sub_menu.css('width', parseInt( windowWidth ) );
            	}, 100);
            } else {
                $sub_menu.css('left', ( $header - $parent_left ) );
            }                
        });
    }    
    megaMenu();

    $(window).on("resize", function() {
        megaMenu();
    });
});