var initNavMenuAction = function () {
  document.querySelector('.burger-button').addEventListener('click', function (e) {
    var sidebar = document.querySelector('.sidebar-wrap');
    switchExpand(e.target, 'active');
    switchExpand(sidebar, 'active');
    if (e.target.classList.contains('active')) {
      searchSwitchDown();
      dim(true);
    } else {
      dim(false);
    }
  });
}

var burgerSwitchDown = function () {
  dim(false);
  document.querySelector('.burger-button').classList.remove('active');
  document.querySelector('.sidebar-wrap').classList.remove('active');
}