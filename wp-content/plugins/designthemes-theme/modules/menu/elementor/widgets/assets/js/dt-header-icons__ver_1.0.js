// Search js
(function ($) {

    var dtHeaderIconsWidgetHandler = function($scope, $){

        $search = $scope.find("div.search-overlay");
        if( $search.length ) {
            $form = $search.find(".dt-sc-search-form-container").clone();
            $search.find(".dt-sc-search-form-container").remove();
            $form.appendTo( $("body") );

            $search.find("a.dt-sc-search-icon").on("click",function(e){
                $('.dt-sc-search-form-container').toggleClass('show');
            });
        }

        $('.dt-sc-search-form-close').on('click', function(e){
            $('.dt-sc-search-form-container').toggleClass('show');
        });

        $scope.find('.dt-sc-search-icon').on('click', function(e) {
            $(this).parents('.dt-sc-search-menu-icon').find('.dt-sc-search-form-container').toggleClass('show');
        });

        $scope.find('.dt-sc-shop-menu-cart-icon').on('click', function(e) {

            if($('.dt-sc-shop-cart-widget').hasClass('activate-sidebar-widget')) {

                $('.dt-sc-shop-cart-widget').addClass('dt-sc-shop-cart-widget-active');
                $('.dt-sc-shop-cart-widget-overlay').addClass('dt-sc-shop-cart-widget-active');

                // Nice scroll script

                var winHeight = $(window).height();
                var headerHeight = $('.dt-sc-shop-cart-widget-header').height();
                var footerHeight = $('.woocommerce-mini-cart-footer').height();

                var height = parseInt((winHeight-headerHeight-footerHeight), 10);

                $('.dt-sc-shop-cart-widget-content').height(height).niceScroll({ cursorcolor:"#000", cursorwidth: "5px", background:"rgba(20,20,20,0.3)", cursorborder:"none" });

                e.preventDefault();
            }

        });

        // Wishlist count update
        $(document).on( 'added_to_wishlist removed_from_wishlist', function(){
            console.log('ddddd');
            var html = $('.dt-sc-wishlist-count');
            $.ajax({
                url: yith_wcwl_l10n.ajax_url,
                data: {
                    action: 'yith_wcwl_update_wishlist_count'
                },
                dataType: 'json',
                success: function( data ){
                    html.html( data.count );
                }
            })
        } );
    };

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/dt-header-icons.default', dtHeaderIconsWidgetHandler);

    });

})(jQuery);