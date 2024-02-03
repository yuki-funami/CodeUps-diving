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
    slidesPerView: 'auto',
    speed: 2000,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
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
  # category
  ==========================*/
  $('.js-category').on('click', function () {
    const category = $(this).data('category');
    
    $('.campaign-card').hide();
    $('.js-category').removeClass('is-current');
    $(this).addClass('is-current');

    if (category === 'all') {
      $('.campaign-card').fadeIn();
    } else {
      $('.campaign-card').filter('[data-category="' + category + '"]').fadeIn();
    }
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

  /*==========================
  # form
  ==========================*/
  // Contactページのみで機能させたいので、HTMLの<script>に記述したい
  // $(function () {
  //   $(window).on('beforeunload', function (e) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   });
  //   $('button[type=submit]').on('click', function () {
  //     $(window).off('beforeunload');
  //   });
  // });

  $(document).ready(function () {
    $('.contact-form__error').hide();
    $.validator.addMethod(
      'telNumber',
      function (value, element) {
        return this.optional(element) || /[\d\-]$/.test(value);
      },
      '※半角数字で入力してください。'
    );

    $('.js-form').validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        tel: {
          required: true,
          telNumber: true,
        },
        kind: {
          required: true,
          minlength: 1,
        },
        contents: {
          required: true,
        },
        'inquiries[]': {
          required: true,
        },
        'privacy-policy[]': {
          required: true,
        },
      },
      messages: {
        name: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        email: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
          email: '※有効なメールアドレスを入力してください。',
        },
        tel: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        contents: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        'inquiries[]': {
          required: '※必須項目が選択されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>選択してください。',
        },
        'privacy-policy[]': {
          required: '※個人情報の取り扱いについて同意が必要です。',
        },
      },
      errorElement: 'span',
      errorPlacement: function (error, element) { // error: 挿入対象要素, element: validation対象のinput要素
        $('.js-error').html(error);
        element.addClass('is-invalid');
        $('.contact-form__error').show();
      },
    });

    $('.js-form').submit(function () {
      if (!$('.js-form').valid()) {
        return false; //フォーム送信を停止
      } else {
        window.location.href = 'page-contact-thanks.html';
      }
    });
  });

});


/* JavaScriptで記載 */
/*==========================
# accordion
==========================*/
document.addEventListener('DOMContentLoaded', function () {
  setUpAccordion();
});

/*
ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
*/

function setUpAccordion() {
  const details = document.querySelectorAll('.js-details');
  const RUNNING_VALUE = 'running'; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値

  details.forEach(function (element) {
    const summary = element.querySelector('.js-summary');
    const answer = element.querySelector('.js-answer');

    summary.addEventListener('click', function (e) {
      // デフォルトの挙動を無効化
      e.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理

        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle('is-opened');
        // アニメーションを実行
        const closingAnim = answer.animate(closingAnimKeyframes(answer), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = function () {
          // open属性を取り除く
          element.removeAttribute('open');
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = '';
        };
      } else {
        // アコーディオンを開くときの処理

        // open属性を付与
        element.setAttribute('open', 'true');
        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle('is-opened');
        // アニメーションを実行
        const openingAnim = answer.animate(openingAnimKeyframes(answer), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = function () {
          element.dataset.animStatus = '';
        };
      }
    });
  });
}

/*
アニメーションの時間とイージング
*/
const animTiming = {
  duration: 250,
  easing: 'ease-out',
};

/*
アコーディオンを閉じるときのキーフレーム
*/
function closingAnimKeyframes(answer) {
  return [
    {
      height: answer.offsetHeight + 'px', // height: 'auto'だとうまく計算されないため要素の高さを指定する
      opacity: 1,
    },
    {
      height: 0,
      opacity: 0,
    },
  ]
}

/*
アコーディオンを開くときのキーフレーム
*/
function openingAnimKeyframes(answer) {
  return [
    {
      height: 0,
      opacity: 0,
    },
    {
      height: answer.offsetHeight + 'px',
      opacity: 1,
    },
  ];
}


/*==========================
# form
==========================*/
// const form = document.querySelector('.js-form');
// const inputElms = form.querySelectorAll('input');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     inputElms.forEach(function (input) {
//       const errorMessage = input.nextElementSibling;
//       input.classList.remove('is-error');
//       errorMessage.textContent = '';
//     });
//     const isValid = form.checkValidity(); // バリデーション実行
//     if (isValid) {
//       alert('submit!');
//     }
//   }, { passive: false }
// );
// inputElms.forEach(function (input) {
//   input.addEventListener('invalid', function (e) {
//     const currentTarget = e.currentTarget;
//     currentTarget.classList.add('is-error');
//     const errorMessage = currentTarget.nextElementSibling;
//     errorMessage.textContent = currentTarget.validationMessage;
//   });
// });