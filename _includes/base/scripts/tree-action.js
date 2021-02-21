var initTreeAction = function () {
  var treeNodes = document.querySelectorAll('.sidebar-content .primary-category-wrap-inner,.sidebar-content .expand-button');
  treeNodes.forEach(t => t.addEventListener('click', function (e) {
    let child;
    if(e.target.classList.contains('expand-button')) {
      switchExpand(e.target.firstElementChild, 'expanded');
      child = e.target.parentElement.nextElementSibling;
    }
    if (e.target.classList.contains('primary-category-link')) {
      switchExpand(e.target.parentElement.parentElement.nextElementSibling.firstElementChild, 'expanded');
      child = e.target.parentElement.parentElement.parentElement.nextElementSibling;
    }

    switchExpand(child, 'expanded');
  }));
  
  var expandAll = document.querySelector('.sidebar-header>.expand-button');
  expandAll.addEventListener('click', function (e) {
    var isExpanded = e.target.classList.contains('expanded');
    var selector = '.sidebar-content .expand-icon,.sidebar-content .secondary-categories,.sidebar-content .category-posts'
    document.querySelectorAll(selector).forEach(t => {
      switchExpandAll(t, isExpanded);
    });
    switchExpandAll(e.target, isExpanded);
    e.target.querySelector('.expand-all-text').textContent = isExpanded ? 'Expand All' : 'Collapse All'
  });
}

var switchExpandAll = function (node, isExpanded) {
  if (node && isExpanded) {
    node.classList.remove('expanded');
  } else {
    node.classList.add('expanded');
  }
}

var switchExpand = function (node, className) {
  if (node && node.classList.contains(className)) {
    node.classList.remove(className)
  } else {
    node.classList.add(className)
  }
}