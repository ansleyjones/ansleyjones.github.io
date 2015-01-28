$(document).ready(function(){
  $('.your-class').slick({
    dots: true,
    arrows: false,
    draggable: false
  });

  	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var $siteNav = $('.site-nav');
	var navbarHeight = $siteNav.outerHeight();

	$(window).scroll(function(event){
	    didScroll = true;
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 150);

	$('.menu-toggle').click(function(e){
		$(this).closest('.site-nav').addClass('nav-up');
	});
	function hasScrolled() {
		
	    var st = $(this).scrollTop();
	    if ($(window).scrollTop() <= 100) {
			$siteNav.addClass('nav-up').removeClass('nav-down');
		}
		if ($(window).scrollTop() < 200) {
			$siteNav.addClass('hide-nav');
		}
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;
	    
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (st > lastScrollTop && st > navbarHeight){
	        // Scroll Down
	        $siteNav.removeClass('nav-down').removeClass('hide-nav').addClass('nav-up');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height() && $(window).scrollTop() > 120) {
	            $siteNav.removeClass('nav-up').addClass('nav-down');
	        }
	    }
	    
	    lastScrollTop = st;
	};



	/// == SMOOTH SCROLL FUNCTION == ///
	function filterPath(string) {
	  return string
	    .replace(/^\//,'')
	    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
	    .replace(/\/$/,'');
	  }
	  var locationPath = filterPath(location.pathname);
	  var scrollElem = scrollableElement('html', 'body');
	 
	  $('a[href*=#]').each(function() {
	    var thisPath = filterPath(this.pathname) || locationPath;
	    if (  locationPath == thisPath
	    && (location.hostname == this.hostname || !this.hostname)
	    && this.hash.replace(/#/,'') ) {
	      var $target = $(this.hash), target = this.hash;
	      if (target) {
	        var targetOffset = $target.offset().top;
	        $(this).click(function(event) {
	          event.preventDefault();
	          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
	            location.hash = target;
	          });
	        });
	      }
	    }
	  });
	 
	  // use the first element that is "scrollable"
	  function scrollableElement(els) {
	    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	      var el = arguments[i],
	          $scrollElement = $(el);
	      if ($scrollElement.scrollTop()> 0) {
	        return el;
	      } else {
	        $scrollElement.scrollTop(1);
	        var isScrollable = $scrollElement.scrollTop()> 0;
	        $scrollElement.scrollTop(0);
	        if (isScrollable) {
	          return el;
	        }
	      }
	    }
	    return [];
	  }

});