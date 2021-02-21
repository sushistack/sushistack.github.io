var initJsfiddle = function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadJsfiddle(entry.target.getAttribute('data-src'), entry.target);
      }
    });
  });
  var jsfiddleContainer = document.querySelectorAll('.jsfiddle-container');
  if (jsfiddleContainer) {
    jsfiddleContainer.forEach(function (entry) {
      observer.observe(entry)
    });
  }
}

var loadJsfiddle = function (src, parent) {
  loadScript(
    { src: src },
    parent,
    function () {
      parent.querySelector('.jsfiddle-container .tbl-loading-spinner').classList.add('tbl-loading-hidden');
    }
  )
}