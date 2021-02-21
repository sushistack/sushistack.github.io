var initDimmed = function () {
  document.querySelector('#dimmed').addEventListener('click', function (e) {
    searchSwitchDown();
    burgerSwitchDown();
  });
}

var dim = function (on) {
  var dimmed = document.querySelector('#dimmed');
  if (on) dimmed.classList.add('active');
  else dimmed.classList.remove('active');
}
