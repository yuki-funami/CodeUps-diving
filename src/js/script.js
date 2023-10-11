
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // hamburger
  $('.js-hamburger').on('click', function () {
    $('.js-header').toggleClass('is-open');
    // $('html').toggleClass('is-fixed');
  });
  $('.js-background').on('click', function() {
    $('.js-header').removeClass('is-open');
  });


});
