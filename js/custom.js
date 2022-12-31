// lazyload
const observer = lozad('.lozad', {
	loaded: function(el) {
        // Custom implementation on a loaded element
        el.classList.add('loaded');
        console.log('loading element');
    }
});

$(document).ready(function() {

	/* scroll navbar */
	if ( $(window).scrollTop() > 50 ) {
		$(".navbar").addClass("scroll");
	} else {
		$(".navbar").removeClass("scroll");
	}
	$(window).on("scroll", function() {
		var scrollTop = $(this).scrollTop();
		
		if ( scrollTop > 50 ) {
			$(".navbar").addClass("scroll");
		} else {
			$(".navbar").removeClass("scroll");
		}
	});
	
	/* Dropdown navbar 
	$(".dropdown-toggle").dropdown(); */

	/* slick slide news */
	$(".slick-news").slick({
		dots: true,
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		customPaging : function(slider, i){
			var thumb = $(slider.$slides[i]).data();
			return '<a class="dot">'+(i+1)+'</a>';
		},
		responsive: [
		  {
			breakpoint: 1200,
			settings: {	
			  infinite: false,
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  infinite: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }
		]
	});

	/* slick slide potensi desa */
	$(".slick-pd").slick({
		dots: true,
		autoplay: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
	  
});
function switchStyle() {
	if (document.getElementById("styleSwitch").checked) {
	  document.getElementById("gallery").classList.add("custom");
	  document.getElementById("exampleModal").classList.add("custom");
	} else {
	  document.getElementById("gallery").classList.remove("custom");
	  document.getElementById("exampleModal").classList.remove("custom");
	}
}



