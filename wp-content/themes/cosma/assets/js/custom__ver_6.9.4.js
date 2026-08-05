jQuery.noConflict();
jQuery(document).ready(function($){
    "use strict";
    /**
     * Mobile Menu
     */
        $("div.dt-header-menu").each(function() {
            var d = $(this).data('menu'),
                c = $(this).find('ul[data-menu="'+d+'"]').clone(),
                m = $('body').find('.mobile-menu[data-menu="'+d+'"]');

            $('[data-animation]', c ).each(function(ix, ele ){
                var $classes = $(ele).attr("class"),
                    $animation = $(ele).attr("data-animation");

                $classes = $classes.replace($animation, '');
                $(ele).attr("class", $classes);
            });

            c.prependTo(m);
            m.appendTo( $("body") );
            $('<div class="mobile-menu-overlay"></div>').appendTo( $("body") );
        });

        // Opening Mobile Nav
        $('.menu-trigger').on('click', function( event ){
            $('.mobile-menu').toggleClass('nav-is-visible');
            $('.mobile-menu-overlay').toggleClass('is-visible');
            $('body').toggleClass('nav-is-visible');
        });

        // Closing Mobile Nav
        function closeMobNav() {
            $('body').removeClass('nav-is-visible');
            $('.mobile-menu-overlay').removeClass('is-visible');
            $('.mobile-menu').removeClass('nav-is-visible');
            $('.menu-item-has-children a').removeClass('selected');        
            $('.menu-item-has-children ul.sub-menu').addClass('is-hidden');            
        }

        $('li.close-nav').on('click', function(event) {
            closeMobNav();
        });

        $('.mobile-menu-overlay').on('click', function(event) {
            closeMobNav();
        });        

        // Sub Menu in Mobile Menu
        $('.menu-item-has-children > a, .page_item_has_children > a').on('click', function(event) {
            if ( $('body').hasClass('nav-is-visible') ) {
                event.preventDefault();
                var a = $(this).clone();
                $(this).next('.sub-menu').find('.see-all').html(a);
            }

            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                selected.addClass('selected').next('ul.sub-menu').removeClass('is-hidden');
            } else {
                selected.removeClass('selected').next('ul.sub-menu').addClass('is-hidden');
            }
        });

        // Go Back in Mobile Menu
        $('.go-back').on('click', function() {
            $(this).parent('ul:not(.menu)').addClass('is-hidden');
        });

        // For Video Post
        if( $("div.dt-video-wrap").length ) {
           $("div.dt-video-wrap").fitVids();
        }

        // Smart Resize
        $(window).on("resize", function() {
            // Blog Isotope
            if( $(".apply-isotope").length ) {
                $(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
            }
        });

        if( $('.single .entry-thumb.single-preview-img a.mag-pop, a.lightbox-preview-img').length ) {
            $('.single .entry-thumb.single-preview-img a.mag-pop, a.lightbox-preview-img').magnificPopup({
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                  verticalFit: true,
                  titleSrc: function(item) {
                    return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">image source</a>';
                  }
                },
                zoom: {
                  enabled: true,
                  duration: 300, // don't foget to change the duration also in CSS
                  opener: function(element) {
                    return element.find('img');
                  }
                }
            });
        }

        $("select").each(function() {
            $(this).select2();
        });
});

/* Live Search*/
jQuery('body').delegate('.text_input', 'keypress', function (e) {
    if (jQuery('.text_input').is(":focus")) {
        var this_item = jQuery(this),
            search_val = this_item.val(),
            security = jQuery('#search_security_nonce').val(); // get nonce value

        if (search_val == "") {
            jQuery('.quick_search_results').html("").removeClass('active');
        } else {
            jQuery.ajax({
                type: "POST",
                url: cosma_urls.ajaxurl,
                data: {
                    action: 'cosma_search_data_fetch',
                    search_val: search_val,
                    ajax_call: true,
                    function_call: 'cosma_search_data_fetch',
                    security: security // pass the form nonce
                },
                success: function (data) {
                    jQuery('.quick_search_results').addClass('active').html(data);
                }
            });
        }
    }
});

(function ($) {
    $(window).on('load', function() {

        // Gallery Post Slider
        if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
            $("ul.entry-gallery-post-slider").bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true });
        }

        // Blog Isotope
        if( $(".apply-isotope").length ) {
            $(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
        }

        // Blog Equal Height
        if( $('.tpl-blog-holder.apply-equal-height').length ) {
            $(".tpl-blog-holder.apply-equal-height article").matchHeight({ property:"min-height" });
        }
    });
})(jQuery);