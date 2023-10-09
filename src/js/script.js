
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // hamburger
  // $('.js-hamburger').on('click', function () {
  //   $(this).toggleClass('is-open');
  //   $('.js-sp-nav').toggleClass('is-open');
  //   $('.js-header__logo').toggleClass('is-open');
  //   $('html').toggleClass('is-fixed');
  // });

  // 2nd
  $('.js-hamburger').on('click', function () {
    if($('.js-hamburger').hasClass('is-open')) {
      $('.js-hamburger').removeClass('is-open');
      $('.js-sp-nav').fadeOut(250);
    } else {
      $('.js-hamburger').addClass('is-open');
      $('.js-sp-nav').fadeIn(250);
    }
    // $('html').toggleClass('is-fixed');
  });

});
