document.addEventListener("DOMContentLoaded", function () {
	// Define the mobile breakpoint
	const isMobile = window.matchMedia(
		"only screen and (max-width: 768px)"
	).matches;

	if (isMobile) {
		// Identify the target element to scroll to (the venue box)
		const venueBox = document.querySelector(".venue_txt_box");

		if (venueBox) {
			// Wait for the requested 10 seconds before starting the scroll animation
			setTimeout(() => {
				// Calculate the final target position
				// We'll scroll to 100px above the venue box
				const finalTargetPosition = venueBox.offsetTop - 100;

				// Start the custom slow scroll animation
				animateScroll(finalTargetPosition, 4000); // 4000ms = 4 seconds duration
			}, 1000); // 10-second delay before starting the scroll
		}
	}
});

/**
 * Custom function to animate the scroll very slowly.
 * @param {number} targetY - The final vertical position to scroll to.
 * @param {number} duration - The total duration of the scroll in milliseconds.
 */
function animateScroll(targetY, duration) {
	const startY = window.scrollY; // Current scroll position
	const distanceY = targetY - startY; // Total distance to move
	const startTime = performance.now(); // Start time of the animation

	// Animation loop function
	function step(currentTime) {
		const timeElapsed = currentTime - startTime;
		// Calculate the progress of the animation (0 to 1)
		const progress = Math.min(1, timeElapsed / duration);

		// Easing function (in-out quad) for a smooth start and end
		const easeProgress =
			progress < 0.5
				? 2 * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 2) / 2;

		// Calculate the new scroll position
		const newScrollY = startY + distanceY * easeProgress;

		window.scrollTo(0, newScrollY);

		// Continue the loop if the animation is not finished
		if (timeElapsed < duration) {
			window.requestAnimationFrame(step);
		}
	}

	// Start the animation loop
	window.requestAnimationFrame(step);
}
