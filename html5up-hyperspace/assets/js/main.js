/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});


		// Text shuffle "Who am I"

		const words = [
			"💡 I Am An Innovator",
			"🎨 I Love To Create",
			"💻 I am a Full Stack Software Engineer",
			"💻 I am a Full Stack AI and Web3 Engineer",
			"🧩 I am a  Problem Solver",
			"📂 I Organize with Passion",
			"📂 I learn with Passion",
			" I am a  Mother",
			"I am a Mother",
			" I am a  Builder",
			"🧘🏾‍♀️ I am a  Healer",
			"🧘🏾‍♀️ I am a Healer",
			" I am a  Hobby Enthusiast",
			"I am a Hobby Enthusiast",
			" I am a Commit Philosopher",
			"🌿♻️ I'm Deeply Committed to Sustainability",
			"💡 I Am An Architech",
			"🎨 I love all things design",
			"Community is Everything",
			"Autonomy is Key; Web3 is the Future",
			"I am Curious",
		];

		const typingSpeed = 70;
		const deletingSpeed = 40;
		const holdAfterTyping = 1400;
		const holdAfterDeleting = 600;

		let index = 0;
		let charIndex = 0;
		const textElement = document.querySelector(".text-container");
		let wordCharacters = words.map((word) => Array.from(word));

		function shuffleWords(array) {
			for (let i = array.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			wordCharacters = array.map((word) => Array.from(word));

			return array;
		}

		function typeText() {
			if (!textElement)
				return;

			if (charIndex < words[index].length) {
				charIndex += 1;
				textElement.textContent = wordCharacters[index]
					.slice(0, charIndex)
					.join('');
				setTimeout(typeText, typingSpeed);
			} else {
				setTimeout(deleteText, holdAfterTyping);
			}
		}

		function deleteText() {
			if (!textElement)
				return;

			if (charIndex > 0) {
				charIndex -= 1;
				textElement.textContent = wordCharacters[index]
					.slice(0, charIndex)
					.join('');
				setTimeout(deleteText, deletingSpeed);
			} else {
				index = (index + 1) % words.length;
				if (index === 0)
					shuffleWords(words);
				setTimeout(typeText, holdAfterDeleting);
			}
		}

		if (textElement) {
			textElement.textContent = "";
			shuffleWords(words);
			typeText();
		}

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

	// Image gallery popup.
		(function() {
			var $imagePopup = $('.image-popup-overlay');

			if ($imagePopup.length == 0)
				return;

			var $popupImg = $imagePopup.find('img'),
				$popupCaption = $imagePopup.find('.image-popup-caption'),
				$popupClose = $imagePopup.find('.image-popup-close');

			var showImagePopup = function(src, alt, caption) {
				if (!src)
					return;

				$popupImg.attr('src', src).attr('alt', alt || '');
				$popupCaption.text(caption || alt || '');
				$imagePopup
					.addClass('active')
					.attr('aria-hidden', 'false');
			};

			var hideImagePopup = function() {
				$imagePopup
					.removeClass('active')
					.attr('aria-hidden', 'true');
			};

			$('.spotlights > section > .image')
				.on('click', function(event) {
					event.preventDefault();

					var $img = $(this).find('img'),
						caption = $(this).closest('.inner').find('h2').text().trim();

					showImagePopup($img.attr('src'), $img.attr('alt'), caption);
				});

			$popupClose.on('click', function() {
				hideImagePopup();
			});

			$imagePopup.on('click', function(event) {
				if (event.target === this)
					hideImagePopup();
			});

			$window.on('keydown', function(event) {
				if (event.key === 'Escape')
					hideImagePopup();
			});
		})();

})(jQuery);
