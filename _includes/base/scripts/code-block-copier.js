
var initCodeBlockCopier = function () {
  copiers = document.querySelectorAll('.copy-code-btn')
  for (var i = 0; i < copiers.length; i += 1) {
    copiers[i].addEventListener('click', function (e) {
      var button = e.target;
      var aux = document.createElement("textarea");
      aux.innerHTML = e.target.parentElement.querySelector('pre.highlight').innerText;
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      button.innerText = 'Copied';
      setTimeout(function () { button.innerText = 'Copy' }, 2000)
    }, false)
  } 
}
