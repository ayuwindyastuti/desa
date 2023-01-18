

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