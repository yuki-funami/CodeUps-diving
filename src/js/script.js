jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  /*==========================
  # loading-animation
  ==========================*/
  $(window).on('load', function () {
    let title = $('.loader__title-wrap');
    let mv = $('.loader__image');

    title.fadeIn(1000);
    title.delay(800).fadeOut(1000);
    mv.delay(2800).fadeIn('fast');
    title.delay(2800).queue(function () {
      $(this).addClass('is-loaded').dequeue();
    });
    title.fadeIn(1000);
    $('.js-loader').delay(9000).fadeOut(1000);
    
    setTimeout(function () {
      title.fadeOut(1000);
      mv.fadeOut(1000);
      $('.js-loader').fadeOut(1000);
    },
    12000
    );
  });

  /*==========================
  # hamburger
  ==========================*/
  $('.js-hamburger').on('click', function () {
    let scrollPosition = window.scrollY || window.pageYOffset;
    $('body').toggleClass('is-fixed');
    $('.js-header').toggleClass('is-open');
    if ($('body').hasClass('is-fixed')) {
      $('body').css('top', '-' + scrollPosition + 'px');
    } else {
      let scrollPos = parseInt($('body').css('top'));
      $('body').css('top', '');
      window.scrollTo(0, -scrollPos);
    }
    return false;
  });

  // spナビメニューをクリックでページ遷移
  $('a').on('click', function () {
    if ($('body').hasClass('is-fixed')) {
      $('body').css('top', '');
      $('body').removeClass('is-fixed');
      $('.js-header').removeClass('is-open');
    }
    return false;
  });

  // spからpcに画面幅が切り替わった際に、sp-navを閉じる
  $(window).resize(function () {
    let windowWidth = $(window).width();
    let pointWidth = 767;
    if (pointWidth < windowWidth) {
      $('body').removeClass('is-fixed');
      $('.js-header').removeClass('is-open');
    }
    return false;
  });

  /*==========================
  # swiper
  ==========================*/
  // mv
  new Swiper('.js-mv-swiper', {
    loop: true,
    loopedSlides: 3,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 2000,
    autoplay: {
      delay: 12000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
  });

  // campaign
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

  /*==========================
  # to-top
  ==========================*/
  // ページトップボタン
  const toTop = $('.js-to-top');
  const mvHeight = $('.js-mv').innerHeight();
  toTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > mvHeight) {
      toTop.fadeIn();
    } else {
      toTop.fadeOut();
    }
  });
  toTop.click(function () {
    $('body, html').animate(
      {
        scrollTop: 0,
      },
      'fast'
    );
    return false;
  });
  // フッター手前でストップ
  $(window).on('scroll', function () {
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = $(".footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
      toTop.addClass('is-active');
    } else {
      toTop.removeClass('is-active');
    }
    return false;
  });

  /*==========================
  # color-box
  ==========================*/
  //.js-color-boxの付いた全ての要素に対して下記の処理を行う
  $('.js-color-box').each(function () {
    $(this).append('<div class="color"></div>');
    const color = $(this).find($('.color'));
    const image = $(this).find('img');
    let speed = 700;
    let counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          'width': '100%'
        },
        speed,
        function () {
          image.css('opacity', '1');
          $(this).css({
            'left': '0' ,
            'right': 'auto'
          });
          $(this).animate({
              'width': '0%'
            },
            speed
          );
        });
        counter = 1;
      }
    });
  });

  /*==========================
  # smooth scroll
  ==========================*/
  $('a[href^="#"]').on('click', function () {
    const id = $(this).attr('href');
    let position = 0;
    let speed = 350;

    if (id != '#') {
      position = $(id).offset().top;
    }
    $('html, body').animate(
      {
        scrollTop: position,
      },
      speed
    );
    return false;
  });

  /*==========================
  # modal
  ==========================*/
  const modalBackground = $('.modal-background');
  // モーダル表示
  $('.js-modal picture img').on('click', function () {
    // 画像の HTML(<img>タグ全体)を、modal__background内にコピー
    modalBackground.html($(this).prop('outerHTML'));
    modalBackground.fadeIn(200);
    $('html, body').css('overflow', 'hidden');
    return false;
  });

  // モーダル非表示
  modalBackground.on('click', function () {
    modalBackground.fadeOut(200);
    $('html, body').removeAttr('style');
    return false;
  });

  /*==========================
  # tab
  ==========================*/
  $('.js-tab').on('click', function () {
    // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
    const index = $(this).index();

    $('.js-tab').removeClass('is-current');
    $(this).addClass('is-current');
    $('page-information-card').removeClass('is-current');
    // コンテンツを非表示にして、クリックしたタブのインデックス番号と同じコンテンツを表示
    $('.page-information-card').hide().eq(index).fadeIn(300);
    return false;
  });


});