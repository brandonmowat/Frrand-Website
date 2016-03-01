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

// This is script.js
// You can write JavaScript for your site in here.
//

// testimonials list
// list of lists

// Testimonial looper
var starter;

function Feature() {

	console.log("Initailizing object");
	var content1 = ['<h2 class="">It\'s about community</h2><p class="">In an age of living online, we find it rare to have personal, physical interactions with one another. Frrand aims to change this by making it easier for people in your community to help each other in meaningful ways such as bringing you the things you need, cost free.</p>', 'https://static.pexels.com/photos/26274/pexels-photo.jpg'];
	var content2 = ['<h2 class="">It\'s about the environment</h2><p class="">With so many cars on the roads, sharing vehicles is becoming very popular but isn\'t actually reducing the number of trips. Frrand helps reduce the number of cars and total time on the road by allowing people to help run errands for you, conveniently.</p>', 'https://static.pexels.com/photos/28505/pexels-photo-28505.jpg'];	
	this.list = [content1, content2];
	this.iter = 1;
	this.len = this.list.length;
	this.interval = 12000; // in milliseconds

	this.setContent = function(content) {
		document.getElementById('feature-content').innerHTML = content;
	}
	this.setImage = function(url) {
		document.getElementById('feature-image').style.backgroundImage ="url(\""+url+"\")";
	}
};

var iterate = function() {
	var content = document.getElementById('feature-content');
	var image = document.getElementById('feature-image');
	content.style.opacity = 0;
	image.style.opacity = 0;
	setTimeout(function() {
		console.log("Setting new content..." + feature.iter);
		feature.setContent(feature.list[feature.iter][0]);
		feature.setImage(feature.list[feature.iter][1]);
		if (feature.iter === feature.len-1) {
			feature.iter = 0;
		}else {
			feature.iter++;
		}
	}, 1000);
	setTimeout(function() {
		content.style.opacity = 1;
		image.style.opacity = 1;
	},1100);

}

Feature.prototype.play = function() {
	starter = setInterval(iterate, this.interval);
}

Feature.prototype.pause = function() {
	clearInterval(starter);
}

Feature.prototype.skip = function() {
	clearInterval(starter);
	iterate();
}

// Main
var feature = new Feature();
feature.play();

// Controls
$(document).ready(function(){
	$('a#advance').click(function() {
		console.log("play");
		feature.play();
	});
	$('a#pause').click(function() {
		console.log("pause");
		feature.pause();
	});
	$('a#skip').click(function() {
		console.log("skip!");
		feature.skip();
	});
});



