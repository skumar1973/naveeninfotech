    // window.addEventListener("load", function() {
    //   // Hide the loader GIF
    //   var loader = document.getElementById("loader");
    //   loader.style.display = "none";
    // });



$(window).on('load', function() {
  $('#onloadweb').modal('show');
});

$("#blogs-slider").owlCarousel({
  loop: true,
  margin: 10,
  dots: false,
  autoplay: true,
  nav: true,
  mouseDrag: true,
  navText: [
    '<i class="bx bx-left-arrow-alt" ></i>',
    '<i class="bx bx-right-arrow-alt"></i>',
  ],
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 3,
    },
  },
});

/**/



$("#partner-slider").owlCarousel({
  loop: false,
  margin: 10,
  dots: false,
  autoplay: true,
  nav: true,
  mouseDrag: true,
  navText: [
    '<i class="bx bx-left-arrow-alt" ></i>',
    '<i class="bx bx-right-arrow-alt"></i>',
  ],
  autoplay: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 6,
    },
  },
});

/**/




$("#similar-slider").owlCarousel({
  loop: false,
  margin: 10,
  dots: false,
  autoplay: true,
  nav: true,
  mouseDrag: true,
  navText: [
    '<i class="bx bx-left-arrow-alt" ></i>',
    '<i class="bx bx-right-arrow-alt"></i>',
  ],
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 3,
    },
  },
});

/**/

$("#location-slider").owlCarousel({
  loop: false,
  margin: 5,
  dots: false,
  autoplay: true,
  nav: true,
  mouseDrag: true,
  navText: [
    '<i class="bx bx-left-arrow-alt" ></i>',
    '<i class="bx bx-right-arrow-alt"></i>',
  ],

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 4,
    },
  },
});

/**/



jQuery(document).ready(function ($) {

  $('.thumb-img a').on("click", function(e){
      e.preventDefault();
      $('.thumb-previewer img').attr("src", $(this).attr("href"));
  });

});

// contact us page js
$(document).ready(function() {
  $('.toggle').click(function() {
    $('.sidebar-contact').toggleClass('active')
    $('.toggle').toggleClass('active')
  })
})
// end