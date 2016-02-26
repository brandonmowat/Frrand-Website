// This is script.js
// You can write JavaScript for your site in here.
//

$(document).ready(function() {

	// Main code
	var scrollToggle = 0;
	fadeOnScroll();
	smartNavbar();
	loadcontent("nav.html", ".Nav", function(){
		toggleNav();
	});
	loadcontent("footer.html", "footer", function(){});

	//loadScreenStart();

	// Smart navbar
	// - hides when scrolling down
	// - appears when scrolling up
	function smartNavbar () {
		var lastScrollTop = 0;
		var scrollDirectionCounter = 0;
		window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
			var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
			if (st > lastScrollTop && scrollDirectionCounter < 0) {
				scrollDirectionCounter = 0;
			} else if (st < lastScrollTop && scrollDirectionCounter > 0) {
				scrollDirectionCounter = 0;
			}
			if (st > lastScrollTop) {
				scrollDirectionCounter++;
			} else {
				scrollDirectionCounter--
			}
			if (st >= 40) {
				if (st <= 100) {
					$('nav').addClass('hidden');
					$('nav').removeClass('visible');
					$('nav').removeClass('card');
				}
				else {
					$('nav').addClass('visible');
					$('nav').addClass('card');
					$('nav').removeClass('hidden');
					$('nav').addClass('detached');
				}
				if (st >= 250) {
					$('nav').addClass('detached');
				} else if (st >= 250 && st > lastScrollTop ) {
					$('nav').removeClass('detached');
				}
				if (st > lastScrollTop && Math.abs(scrollDirectionCounter) > 10){
					$('nav').removeClass('visible');
				} else if (st < lastScrollTop && Math.abs(scrollDirectionCounter) > 10) {
					$('nav').addClass('visible');
				}
			} else {
				$('nav').removeClass('hidden');
				$('nav').addClass('visible');
			}
			if (st <= 0) {
				$('nav').removeClass('detached');
			};
			console.log(scrollDirectionCounter);
			lastScrollTop = st;
		}, false);
	}

	function toggleNav() {
		$('nav a.main-nav-trigger').click(function(){
			$('.nav-drawer').toggleClass("open");
			$('nav').toggleClass("open");
			$('nav').addClass('detached');
			$('nav').addClass('visible');
			$('body').toggleClass("open");
		});
	}

	// initiates and plays the load screen
	function loadScreenStart() {
		loadcontent("content/loading.html", function(){});
	}

	// Load contents of file into a specific location asyncronously
	// run func when task is completed
	function loadcontent(file, location, func) {
		console.log(file)
		$(location).load("/content/"+file, func);
	}

	function display(type, message) {
		$('body').prepend("<p class='text-center display"+ type +"'>"+ message +"</p>");
	}

	function fadeOnScroll () {
		$("header h1.title").addClass("animated fadeInUp");
		$(window).scroll(function() {
			$('.fadeScroll').each(function(index){
				var top = $(window).scrollTop();
				var imagePos = $(this).offset().top;

				if (imagePos < top+500) {
					$(this).addClass("animated fadeInUp");
				}
			});
		});
	}

});
