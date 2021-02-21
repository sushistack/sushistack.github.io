var isLoadedKakaoSDK = false;
document.querySelector('.at-expanding-share-button-toggle-bg').addEventListener('click', function (e) {
  var shareBox = document.querySelector('#at-expanding-share-button');
  if (shareBox.classList.contains('at-expanding-share-button-show-icons')) {
    shareBox.classList.remove('at-expanding-share-button-show-icons');
  } else {
    shareBox.classList.add('at-expanding-share-button-show-icons');
  }
  if (!isLoadedKakaoSDK) {
    loadKakaoSDK(false);
  }
});

document.querySelector('.at-share-btn.at-svc-kakaotalk').addEventListener('click', function () {
  shareKakao();
});

var shareKakao = function () {
  if (isLoadedKakaoSDK) {
    Kakao.Link.sendCustom({
      templateId: 40938,
      templateArgs: {
        title: kakaoTitle,
        description: kakaoDescription,
        path: kakaoPath
      }
    });
  }
};

document.querySelector('.at-share-btn.at-svc-link').addEventListener('click', function () {
  var input = document.getElementById('copy-target-input');
  input.value = siteUrl + '/' + kakaoPath;
  input.hidden = false;
  input.select();
  document.execCommand('copy');
  input.hidden = true;
  var toast = document.querySelector('.toast-alert');
  toast.classList.remove('active');
  void toast.offsetWidth;
  toast.classList.add('active');
}, false);

var loadKakaoSDK = function (isRunImmediately) {
  var script = document.createElement('script');
    script.setAttribute('src', '/assets/js/kakao.min.js');
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', function(e) {
      Kakao.init('b3e8b778ac4ed3528ccece2376e83799');
      isLoadedKakaoSDK = true;
      if (isRunImmediately) {
        shareKakao();
      }
    });
    document.head.appendChild(script);
};

