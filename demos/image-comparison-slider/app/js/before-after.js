(function($) {
	function drags(dragElement, resizeElement, container) {

		// Initialize the dragging event on mousedown on the handle
		dragElement.on('mousedown.my-events touchstart.my-events', function(e) {
			console.log("I clicked on a drag element");
			
			resizeElement.addClass('resizable');
			if( $(this).hasClass('handle__left') ) {
				console.log("I am dragging left");
				$(this).addClass('draggable');
			}
			else if( $(this).hasClass('handle__right') ) {
				console.log("I am dragging right");
				$(this).addClass('draggable');
			}
			// // create separate selectors for left and right handles
			// if(dragElement.hasClass('handle__left') ) {
			// 	dragElement.addClass('draggable__left'),
			// 	resizeElement.addClass('resizable__left')
			// 	// console.log("I am left dragging");
			// }
			// if(dragElement.hasClass('handle__right') ) {
			// 	dragElement.addClass('draggable__right'),
			// 	resizeElement.addClass('resizable__right')
			// 	// console.log("I am right dragging");
			// }

			// Check if it's a mouse or touch even and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
			console.log(startX);
			// Get the initial position
			var dragWidth = dragElement.outerWidth(),
				posXHandleLeft = $('.handle__left').offset().left + dragWidth - startX,
				posXHandleRight = $('.handle__right').offset().left + dragWidth - startX,
				containerOffset = container.offset().left,
				containerWidth = container.outerWidth();

				console.log( $('.handle__left').offset().left );
				console.log(posXHandleLeft);
				console.log(posXHandleRight);

			// Set limits for left handle
			minLeftHandleLeft = containerOffset + 10;
			maxLeftHandleLeft = containerOffset + containerWidth - posXHandleRight - dragWidth - 10;
			console.log(minLeftHandleLeft);
			console.log(maxLeftHandleLeft);
			// Set limits for right handle
			if( posXHandleLeft < 0 ) {
				minLeftHandleRight = containerOffset + ( posXHandleLeft * -1 ) + 10;
			}
			else {
				minLeftHandleRight = containerOffset + posXHandleLeft + 10;
			}
			maxLeftHandleRight = containerOffset + containerWidth - dragWidth - 10;
			console.log(minLeftHandleRight);
			console.log(maxLeftHandleRight);

			// Calculate the dragging distance on mousemove or touchmove events
			dragElement.parents().on('mousemove.my-events touchmove.my-events', function(e) {

				// Check if it's a mouse or touch event and pass along the correct value
				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
					leftValueHandleLeft = moveX + posXHandleLeft - dragWidth;
					leftValueHandleRight = moveX + posXHandleRight - dragWidth;
					// console.log(leftValueHandleLeft);
					// console.log(leftValueHandleRight);

				// Prevent left and right handles from going out of bounds
				if( dragElement.hasClass('draggable__left') ) {
					if( leftValueHandleLeft < minLeftHandleLeft ) {
						leftValueHandleLeft = minLeftHandleLeft;
					}
					else if( leftValueHandleLeft > maxLeftHandleLeft ) {
						leftValueHandleLeft = maxLeftHandleLeft;
					}
				}
				if( dragElement.hasClass('draggable__right') ) {
					if( leftValueHandleRight < minLeftHandleRight ) {
						leftValueHandleRight = minLeftHandleRight;
					}
					else if( leftValueHandleRight > maxLeftHandleRight ) {
						leftValueHandleRight = maxLeftHandleRight;
					}
				}

				// adjust right side of image
				var variableX = posXHandleLeft;
				// console.log(variableX);
				$('.image-wrapper').css('margin-left', variableX);
				$('.image-wrapper > img').css('margin-left', variableX);

				// Translate the handle's left value to the masked div's width
				widthValue = (leftValueHandleLeft + dragWidth/2 - containerOffset)*100/containerWidth+'%';

				// Set the new values for the slider and the handle
				$('.draggable').css('left', widthValue);
				$('.resizable').css("width", widthValue);
				console.log("I resized layer width");
				if( $('.handle__left').hasClass('draggable') ) {
					console.log("hi left");
					$('.handle__left').css('left', leftValueHandleLeft);
					console.log("I should change the left handle position");
				}
				else if( $('.handle__right').hasClass('draggable') ) {
					console.log("hi right");
					$('.handle__right').css('left', leftValueHandleRight);	
					console.log("I should change the right handle position");	
				}

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





