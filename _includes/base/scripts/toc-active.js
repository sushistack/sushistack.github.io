var initToc = function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      var cur = document.querySelector(`.toc-entry a[href="#${entry.target.id}"`)
      if (cur) {
        if (entry.intersectionRatio > 0) {
          cur.classList.add('active');
        } else {
          cur.classList.remove('active');
        }
      }
    });
  });

  var cb = '.content-body';
  var selector = `${cb} h1, ${cb} h2, ${cb} h3, ${cb} h4, ${cb} h5, ${cb} h6`;
  document.querySelectorAll(selector).forEach(function (entry) {
      observer.observe(entry);
  });
}
