// var paths = [];
// var painting = false;
// var next = 0;
// var current;
// var previous;

// function setup() {
// 	createCanvas(windowWidth/2, windowHeight/2);
// 	current = createVector(0, 0);
// 	previous = createVector(0, 0);
// }

// function draw() {
// 	background(200);
// 	if (millis() > next && painting) {
// 		//get mouse position
// 		current.x = mouseX;
// 		current.y = mouseY;

// 		//add new particle
// 		paths[paths.length - 1].add(current);

// 		//schedule next particle
// 		next = millis() + random(100);

// 		//store mouse values
// 		previous.x = current.x;
// 		previous.y = current.y;
// 	}
// 		console.log(current.x, current.y);
// 	//draw all paths
// 	for(var i = 0; i < paths.length; i++) {
// 		paths[i].update();
// 		paths[i].display();
// 	}

// 	//start
// 	function mousePressed() {
// 		next = 0;
// 		painting = true;
// 		previous.x = mouseX;
// 		previous.y = mouseY;
// 		paths.push(new Path());
// 	}

// 	//stop
// 	function mouseReleased() {
// 		painting = false;
// 	}

// 	//make a path out of a list of particles
// 	function Path() {
// 		this.particles = [];
// 	}

// 	//add a new particle with a position
// 	Path.prototype.add = function(position) {
// 		this.particles.push(new Particle(position));
// 	}

// 	//display path
// 	Path.prototype.update = function() {
// 		//loop through backward
// 		for( var i = this.particles.length - 1; i >= 0; i-- ) {
// 			//decide if we should remove it
// 			if( this.particles[i].lifespan <= 0 ) {
// 				this.particles.splice(i, 1);
// 			}
// 			//or if we should display it
// 			else {
// 				this.particles[i].display( this.particles[i + 1] );
// 			}
// 		}
// 	}

// 	//figure out the particles along the path
// 	function Particle(position) {
// 		this.position = createVector(position.x, position.y);
// 		this.lifespan = 255;
// 	}

// 	Particle.prototype.update = function() {
// 		//fade out
// 		this.lifespan--;
// 	}

// 	//draw particles and connect them with a line
// 	//draw a line to another
// 	Particle.prototype.display = function(other) {
// 		stroke(0, this.lifespan);
// 		fill(0, this.lifespan/2);
// 		ellipse(this.position.x, this.position.y, 8, 8);
// 		//if we need to draw another line
// 		if( other ) {
// 			line(this.position.x, this.position.y, other.position.x, other.position.y);
// 		}
// 	}
// }



/************ with message **********/

// All the paths
var paths = [];
var messages = ["What is so interesting over there?","Do you think they know each other?","They also appear in the 1757 painting. I wonder why."];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var bg;

function setup() {
  createCanvas(1600, 600);
  bg = loadImage("assets/mn.jpg");
  current = createVector(0,0);
  previous = createVector(0,0);
};

function draw() {
  background(bg);
  
  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position      
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);
    
    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop + alert
function mouseReleased() {
	var randomMessage = messages[Math.floor(Math.random() * messages.length)];
  	painting = false;
  	alert(randomMessage);
}

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {  
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}  

// Display plath
Path.prototype.display = function() {
  
  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}  

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);    
  ellipse(this.position.x,this.position.y, 8, 8);    
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}




/*********** with pattern **********/



// // All the paths
// var paths = [];
// // Are we painting?
// var painting = false;
// // How long until the next circle
// var next = 0;
// // Where are we now and where were we?
// var current;
// var previous;
// var bg;

// function setup() {
//   createCanvas(1600, 600);
//   bg = loadImage("assets/mn.jpg");
//   current = createVector(0,0);
//   previous = createVector(0,0);

//   var button = createButton("reset");
//   button.mousePressed(resetSketch);

// };


// //reset sketch
// function resetSketch() {
//   	alert("Do you think they all appear to be looking at the same thing?");
// 	Particle.prototype.update = function() {
// 		this.lifespan = 0;
// 	}
// }

// function draw() {
//   background(bg);
  
//   // If it's time for a new point
//   if (millis() > next && painting) {

//     // Grab mouse position      
//     current.x = mouseX;
//     current.y = mouseY;

//     // New particle's force is based on mouse movement
//     var force = p5.Vector.sub(current, previous);
//     force.mult(0.05);

//     // Add new particle
//     paths[paths.length - 1].add(current, force);
    
//     // Schedule next circle
//     next = millis() + random(100);

//     // Store mouse values
//     previous.x = current.x;
//     previous.y = current.y;
//   }

//   // Draw all paths
//   for( var i = 0; i < paths.length; i++) {
//     paths[i].update();
//     paths[i].display();
//   }
// }

// // Start it up
// function mousePressed() {
//   next = 0;
//   painting = true;
//   previous.x = mouseX;
//   previous.y = mouseY;
//   paths.push(new Path());
// }

// // Stop + alert
// function mouseReleased() {
//   painting = false;
// }

// // A Path is a list of particles
// function Path() {
//   this.particles = [];
//   this.hue = random(100);
// }

// Path.prototype.add = function(position, force) {
//   // Add a new particle with a position, force, and hue
//   this.particles.push(new Particle(position, force, this.hue));
// }

// // Display plath
// Path.prototype.update = function() {  
//   for (var i = 0; i < this.particles.length; i++) {
//     this.particles[i].update();
//   }
// }  

// // Display plath
// Path.prototype.display = function() {
  
//   // Loop through backwards
//   for (var i = this.particles.length - 1; i >= 0; i--) {
//     // If we shold remove it
//     if (this.particles[i].lifespan <= 0) {
//       this.particles.splice(i, 1);
//     // Otherwise, display it
//     } else {
//       this.particles[i].display(this.particles[i+1]);
//     }
//   }

// }  

// // Particles along the path
// function Particle(position, force, hue) {
//   this.position = createVector(position.x, position.y);
//   this.velocity = createVector(force.x, force.y);
//   this.drag = 0.95;
//   this.lifespan = 255;
// }

// Particle.prototype.update = function() {
//   // Move it
//   this.position.add(this.velocity);
//   // Slow it down
//   this.velocity.mult(this.drag);
//   // // Fade it out
//   // this.lifespan--;
// }

// // Draw particle and connect it with a line
// // Draw a line to another
// Particle.prototype.display = function(other) {
//   stroke(0, this.lifespan);
//   fill(0, this.lifespan/2);    
//   ellipse(this.position.x,this.position.y, 8, 8);    
//   // If we need to draw a line
//   if (other) {
//     line(this.position.x, this.position.y, other.position.x, other.position.y);
//   }

// }

/* test */








