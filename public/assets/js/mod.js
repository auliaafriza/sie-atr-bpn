// // js animasi slide-in
// (function($) {

//     $.fn.visible = function(partial) {
    
//     var $t            = $(this),
//         $w            = $(window),
//         viewTop       = $w.scrollTop(),
//         viewBottom    = viewTop + $w.height(),
//         _top          = $t.offset().top + (window.innerHeight / 4),
//         _bottom       = _top + $t.height(),
//         compareTop    = partial === true ? _bottom : _top,
//         compareBottom = partial === true ? _top : _bottom;

//         return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

//     };
        
// })(jQuery);

// var win = $(window);

// // class yang ditambahkan animasi slide in
// var allMods = $(".animated-up,.animated-down");

// // set visible
// allMods.each(function(i, el) {
// var el = $(el);
// if (el.visible(true)) {
//     el.addClass("come-in"); 
// }
// });

// win.scroll(function(event) {

// allMods.each(function(i, el) {
//     var el = $(el);
//     if (el.visible(true)) {
//     el.addClass("come-in");
//     }
// });

// });
// // end js animasi slide-in

// wow = new WOW(
//     {
//     animateClass: 'animated',
//     offset:       100,
//     callback:     function(box) {
//         console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
//     }
//     }
// );
// wow.init();