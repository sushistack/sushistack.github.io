window.addEventListener('DOMContentLoaded', function () {
  initToc();
  initComment();
  initTreeAction();
  initNavMenuAction();
  initSearch();
  initDimmed();
  initJsfiddle();
  initCodeBlockCopier();
});

{% include base/scripts/toc-active.js %}
{% include base/scripts/load-comment.js %}
{% include base/scripts/tree-action.js %}
{% include base/scripts/nav-menu.js %}
{% include base/scripts/image-lazy-load.min.js %}
{% include base/scripts/search.js %}
{% include base/scripts/dimmed.js %}
{% include base/scripts/jsfiddle.js %}
{% include base/scripts/code-block-copier.js %}
