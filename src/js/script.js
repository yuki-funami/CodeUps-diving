
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // hamburger
  $('.js-hamburger').on('click', function () {
    $('.js-header').toggleClass('is-open');
    // $('html').toggleClass('is-fixed');
  });
  $('.js-background').on('click', function() {
    $('.js-header').removeClass('is-open');
  });

  // swiper
  new Swiper('.js-mv-swiper', {
    loop: true,
    loopedSlides: 3,
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
  });

  new Swiper('.js-campaign-swiper', {
    loop: true,
    loopedSlides: 4,
    speed: 500,
    spaceBetween: 24,
    width: 280,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
    navigation: {
      prevEl: '.js-campaign-button-prev',
      nextEl: '.js-campaign-button-next',
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
        width: 333,
      },
    },
  });

});
