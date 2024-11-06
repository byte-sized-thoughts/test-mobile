var myScroll, upper, menu, lowerNav, menuHeight, upperHeight;

function loaded () {
  var lowerHeight = $('.lower').height();

  stickyInit();

  myScroll = new IScroll('#wrapper', {
    mouseWheel: true,
    probeType: 3,
    mouseWheelSpeed: 5
  });

  function stickyInit() {
    upper = $('.upper');
    menu = $('.navbar.menu');
    lowerNav = $('.lower .navbar');
    fixedNav = $('.navbar.fixed');
    menuHeight = menu.height();
    upperHeight = upper.height() - menuHeight;
    $('.lower').css('height', upperHeight + lowerHeight + 200 + 'px');

    stickyNav();
  }

  function stickyNav() {
    if (this.y > 0) return;
    var scrollTop = Math.abs(this.y);

    var scrollRatio = scrollTop / upperHeight;
    if (scrollRatio > 1) scrollRatio = 1;

    if (scrollTop > upperHeight - menuHeight) {
      upper.addClass('crop');
      lowerNav.hide();
      fixedNav.css('display','flex');
    } else {
      upper.removeClass('crop');
      lowerNav.show();
      fixedNav.hide();
    }

    $('.bg').css('opacity', 1 - scrollRatio * 1.3); 
    $('.info').css('opacity', 1 - scrollRatio * 1.3); 
    $('.blurred').css('opacity', scrollRatio * 2); 
  }

  myScroll.on('scroll', stickyNav);
  myScroll.on('scrollEnd', stickyNav);

  $(window).resize(function(){
    myScroll.refresh();
    stickyInit();
  });

  
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);