document.addEventListener('DOMContentLoaded', function() {
  var prevScrollpos = window.pageYOffset;
  var topbar = document.querySelector('.top-bar');

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      // При прокручуванні вгору
      topbar.classList.remove('top-bar-hidden');
      topbar.classList.add('top-bar-visible');
    } else {
      // При прокручуванні вниз
      topbar.classList.remove('top-bar-visible');
      topbar.classList.add('top-bar-hidden');
    }

    prevScrollpos = currentScrollPos;
  }
});
