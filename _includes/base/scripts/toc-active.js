var initToc = function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(() => activateHeading());
  });

  var activateHeading = function () {
    var lastActive = document.querySelector(`.toc-entry a.active`);
    var headings = document.querySelectorAll(selector)

    var hRect, curActive, changed = true;
    var shRect = document.querySelector('header.page-header').getBoundingClientRect();
    for (var i = headings.length - 1; i > -1; i -= 1) {
      hRect = headings[i].getBoundingClientRect();
      shHeight = Math.floor(shRect.top) + Math.floor(shRect.height) + 20;
      if (hRect.top <= shHeight) {
        curActive = document.querySelector(`.toc-entry a[href="#${headings[i].id}"]`);
        curActive.classList.add('active');
        changed = curActive !== lastActive
        break;
      }
    }
    if (changed && lastActive) {
      lastActive.classList.remove('active')
    }
  }

  var cb = '.content-body';
  var selector = `${cb} h1, ${cb} h2, ${cb} h3, ${cb} h4, ${cb} h5, ${cb} h6`;
  document.querySelectorAll(selector).forEach(function (entry) {
      observer.observe(entry);
  });
}
