
// back to top
	function toTop() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	}

	var mybutton = document.getElementById("back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        // mybutton.style.display = "block";
        $('.back-to-top').css({
        	'opacity': '1',
        	'tranform': 'translateY(50px)'
        });
      } else {
        // mybutton.style.display = "none";
        $('.back-to-top').css({
        	'opacity': '0',
        	'tranform': 'translateY(50px)'
        });
      }
    }
// end back to top

// floating widget
	jQuery(function($){
		$(window).scroll(function(){
			var header = $('.header-navbar').outerHeight(),
					topContent = $('.top-content').outerHeight(),
					allTopHeigh = header+topContent,
					scroll = $(window).scrollTop();

			if (scroll >= allTopHeigh) {
				$('.setting-widget').css({
					'opacity':'.7'
				});
			} 

			else {
				$('.setting-widget:not(:hover)').css({
					'opacity':'0'
				});
			}
		});
	});

	function exportOpen() {
		$(".setting-widget-close").toggleClass('setting-widget-open');
		$('.export-option-close').toggleClass('export-option-open');
	}
// end floating widget