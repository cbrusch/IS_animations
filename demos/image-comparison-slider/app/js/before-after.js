(function($) {
	function drags(dragElement, resizeElement, container) {

		// Initialize the dragging event on mousedown on the handle
		dragElement.on('mousedown.my-events touchstart.my-events', function(e) {
			
			dragElement.addClass('draggable');
			resizeElement.addClass('resizable');
			// create separate selectors for left and right handles
			if(dragElement.hasClass('handle__left') ) {
				dragElement.addClass('draggable__left'),
				resizeElement.addClass('resizable__left')
			}
			else if(dragElement.hasClass('handle__right') ) {
				dragElement.addClass('draggable__right'),
				resizeElement.addClass('resizable__right')
			}

			// Check if it's a mouse or touch even and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			// Get the initial position
			var dragWidth = dragElement.outerWidth(),
				posXHandleLeft = $('.draggable__left').offset().left + dragWidth - startX,
				posXHandleRight = $('.draggable__right').offset().left + dragWidth - startX,
				containerOffset = container.offset().left,
				containerWidth = container.outerWidth();

			// Set limits for left handle
			minLeftHandleLeft = containerOffset + 10;
			maxLeftHandleLeft = containerOffset + containerWidth - posXHandleRight - dragWidth - 10;
			// Set limits for right handle
			minLeftHandleRight = containerOffset + posXHandleLeft + 10;
			maxLeftHandleRight = containerOffset + containerWidth - dragWidth - 10;

			// Calculate the dragging distance on mousemove or touchmove events
			dragElement.parents().on('mousemove.my-events touchmove.my-events', function(e) {

				// Check if it's a mouse or touch event and pass along the correct value
				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
					leftValue = moveX + posX - dragWidth;

				// Prevent left and right handles from going out of bounds
				if( dragElement.hasClass('draggable__left') ) {
					if( leftValue < minLeftHandleLeft ) {
						leftValue = minLeftHandleLeft;
					}
					else if( leftValue > maxLeftHandleLeft ) {
						leftValue = maxLeftHandleLeft;
					}
				}
				else if( dragElement.hasClass('draggable__right') ) {
					if( leftValue < minLeftHandleRight ) {
						leftValue = minLeftHandleRight;
					}
					else if( leftValue > maxLeftHandleRight ) {
						leftValue = maxLeftHandleRight;
					}
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





