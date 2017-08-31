(function($) {
	function drags(dragElement, resizeElement, container) {

		// Initialize the dragging event on mousedown on the handle
		dragElement.on('mousedown.my-events touchstart.my-events', function(e) {
			
			dragElement.addClass('draggable');
			resizeElement.addClass('resizable');

			// Check if it's a mouse or touch even and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			// Get the initial position
			var dragWidth = dragElement.outerWidth(),
				posX = dragElement.offset().left + dragWidth - startX,
				containerOffset = container.offset().left,
				containerWidth = container.outerWidth();

			// Set limits for left handle
			minLeftHandleLeft = containerOffset + 10;
			maxLeftHandleLeft = containerOffset + containerWidth - dragWidth - 10;
			// Set limits for right handle
			minLeftHandleRight = containerOffset + 10;
			maxLeftHandleRight = containerOffset + containerWidth - dragWidth - 10;

			// Calculate the dragging distance on mousemove or touchmove events
			dragElement.parents().on('mousemove.my-events touchmove.my-events', function(e) {

				// Check if it's a mouse or touch event and pass along the correct value
				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
					leftValue = moveX + posX - dragWidth;

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




// (function($) {
//   function drags(dragElement, resizeElement, container) {
    
//     // Initialize the dragging event on mousedown.
//     dragElement.on('mousedown.ba-events touchstart.ba-events', function(e) {
      
//       dragElement.addClass('ba-draggable');
//       resizeElement.addClass('ba-resizable');
      
//       // Check if it's a mouse or touch event and pass along the correct value
//       var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
      
//       // Get the initial position
//       var dragWidth = dragElement.outerWidth(),
//           posX = dragElement.offset().left + dragWidth - startX,
//           containerOffset = container.offset().left,
//           containerWidth = container.outerWidth();
   
//       // Set limits
//       minLeft = containerOffset + 10;
//       maxLeft = containerOffset + containerWidth - dragWidth - 10;
      
//       // Calculate the dragging distance on mousemove.
//       dragElement.parents().on("mousemove.ba-events touchmove.ba-events", function(e) {
        
//         // Check if it's a mouse or touch event and pass along the correct value
//         var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
//         leftValue = moveX + posX - dragWidth;
        
//         // Prevent going off limits
//         if ( leftValue < minLeft) {
//           leftValue = minLeft;
//         } else if (leftValue > maxLeft) {
//           leftValue = maxLeft;
//         }
        
//         // Translate the handle's left value to masked divs width.
//         widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
//         // Set the new values for the slider and the handle. 
//         $('.ba-draggable').css('left', widthValue);
//         $('.ba-resizable').css('width', widthValue);
//       // Bind mouseup events to stop dragging.
//       }).on('mouseup.ba-events touchend.ba-events touchcancel.ba-events', function(){
//         dragElement.removeClass('ba-draggable');
//         resizeElement.removeClass('ba-resizable');
//         // Unbind all events for performance
//         $(this).off('.ba-events'); 
//       });
//       e.preventDefault();
//     });
//   }

//   // Define plugin
//   $.fn.beforeAfter = function() {
//     var cur = this;
//     // Adjust the slider
//     var width = cur.width()+'px';
//     cur.find('.resize img').css('width', width);
//     // Bind dragging events
//     drags(cur.find('.handle'), cur.find('.resize'), cur);

//     // Update sliders on resize. 
//     // Because we all do this: i.imgur.com/YkbaV.gif
//     $(window).resize(function(){
//       var width = cur.width()+'px';
//       cur.find('.resize img').css('width', width);
//     });
//   }
// }(jQuery));





