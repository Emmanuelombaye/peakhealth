( function( $ ) {

	var dtShopProductSingleSummary = function($scope, $){

    var currentWidth = window.innerWidth || document.documentElement.clientWidth;

    // Sticky Content
    if( currentWidth > 991 ) {
        $('.dt-sc-sticky-content').each( function (e) {
            stickyContent($(this), $);
        });
    }


  };

  function stickyContent($stickyContent, $) {

      var $sticky = $stickyContent;
      var $stickyH = $sticky.outerHeight();
      var $stickyParentContainer = $stickyContent.parents('.elementor-row');
      var $stickyParentContainerOffset = $stickyParentContainer.offset();
      var $stickyContainer =  $stickyContent.parents('.elementor-column');
      var $stickyContainerWidth =  $stickyContainer.width();
      var $start = $stickyParentContainerOffset.top;
      var $limit = $start + $stickyParentContainer.outerHeight();

      $(window).scroll(function() {
          if ($(window).scrollTop() > $start - 10 && $(window).scrollTop() <= $limit - $stickyH - 10) {
              $sticky.css({
              'position':'fixed',
              'width':$stickyContainerWidth,
              'top': 10});
          }
          else if ($(window).scrollTop() > $limit - $stickyH - 10) {
              $sticky.css({
                      'position': 'absolute',
                      'top'     : 'auto',
                      'bottom'  : 0
                  });
          }
          else {
              $sticky.css('position', 'static');
          }
      });

  }

  $(window).on('elementor/frontend/init', function(){
    elementorFrontend.hooks.addAction('frontend/element_ready/dt-shop-product-single-summary.default', dtShopProductSingleSummary);
  });

} )( jQuery );