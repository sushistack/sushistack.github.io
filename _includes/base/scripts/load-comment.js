var initComment = function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadComment(entry.target);
      }
    });
  });

  var mObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        if (mutation.addedNodes[0].className === 'utterances') {
          mObserver.disconnect();
          mObserver.observe(
            mutation.addedNodes[0], { attributes : true, attributeFilter : ['style'] }
          );
        }
      }
      if (mutation.type === 'attributes' && mutation.target.className === 'utterances') {
        mObserver.disconnect();
        document.querySelector('.comment .tbl-loading-spinner').classList.add('tbl-loading-hidden');
      }
    });
  });

  var comment = document.querySelector('.comment');
  if (comment) {
    observer.observe(comment);
    mObserver.observe(
      comment,
      {
        attributes: false,
        childList: true,
        characterData: false
      }
    );
  }
}

var loadComment = function (parent) {
  loadScript(
    {
      src: 'https://utteranc.es/client.js',
      repo: 'sushistack/utterance.deeplify',
      theme: 'github-light',
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
      async: 'true'
    },
    parent,
    null
  );
}

var loadScript = function (attributes, parent, callback) {
  var script = document.createElement('script');
  if (!attributes.src) {
    return console.log('there is no script source path');
  }

  for (key in attributes) {
    script.setAttribute(key, attributes[key]);
  }

  if (!parent) {
    parent = document.body
  }

  parent.appendChild(script);

  if (callback) {
    script.onload = callback;
  }
}