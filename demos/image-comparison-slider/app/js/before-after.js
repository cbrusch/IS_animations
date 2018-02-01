(function($) {
	function drags(dragElement, resizeElement, container) {

		// Initialize the dragging event on mousedown on the handle
		dragElement.on('mousedown.my-events touchstart.my-events', function(e) {
			
			dragElement.addClass('draggable');
			resizeElement.addClass('resizable');

			// Check if it's a mouse or touch even and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			// Get the initial position for the base image container
			var dragWidth = dragElement.outerWidth(),
				posX = dragElement.offset().left + dragWidth - startX,
				containerOffset = container.offset().left,
				containerWidth = container.outerWidth();

			// Set limits for left handle
			minLeft = containerOffset + 10;
			maxLeft = containerOffset + containerWidth - dragWidth - 10;

			// Calculate the dragging distance on mousemove or touchmove events
			dragElement.parents().on('mousemove.my-events touchmove.my-events', function(e) {

				// Check if it's a mouse or touch event and pass along the correct value
				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
				console.log(moveX);
				leftValue = moveX + posX - dragWidth;
				console.log(leftValue);
				// Prevent going out of bounds
				if( leftValue < minLeft ) {
					leftValue = minLeft;
				}
				else if( leftValue > maxLeft ) {
					leftValue = maxLeft;
				}

				// Translate the handle's left value to the masked div's width
				widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

				// Set the new values for the slider and the handle
				$('.draggable').css('left', widthValue);
				$('.resizable').css("width", widthValue);

			//Bind the mouseup events to stop dragging
			}).on('mouseup.my-events touchend.my-events touchcancel.my-events', function() {
				dragElement.removeClass('draggable');
				resizeElement.removeClass('resizable');
				//Unbind all events for performance
				$(this).off('.my-events');
			});
			e.preventDefault();
		});
	}

	// Define plugin
	$.fn.beforeAfter = function() {
		var mySlider = this;

		// Adjust the slider
		var width = mySlider.width()+'px';
		mySlider.find('.resize img').css('width', width);
		// Bind dragging events
		drags(mySlider.find('.handle'), mySlider.find('.resize'), mySlider);

		// Update sliders on resize
		$(window).resize(function() {
			var width = mySlider.width()+'px';
			mySlider.find('.resize img').css('width', width);
		});
	}
}(jQuery));





