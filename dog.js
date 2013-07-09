
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

Image.prototype.setX = function setX (x) {
	this.X = x;
}
Image.prototype.setY = function setY (y) {
	this.Y = y;
}

function clear () {
	ctx.clearRect (0, 0, canvas.width, canvas.height);
}

function rnd(min, max) {
	 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDog() {
	var dog = new Image;
	dog.width = rnd(80,100);
	dog.height = rnd(80,100);
	dog.X = rnd(30,500);
	dog.Y = rnd(30,500);
	dog.src = 'dog.png';
	return dog;
}

var dogs = new Array();

function createDog() {
	for (var i=0; i<10; i++) {
		dogs[i] = generateDog();
		dogs[i].X = rnd(0,600);
		dogs[i].Y = rnd(0,700);
		ctx.drawImage(dogs[i], dogs[i].X ,dogs[i].Y, dogs[i].width, dogs[i].height);
	}
}

function startMove() {
	clear();
	for(var i = 0; i<dogs.length; i++) {
		 move(dogs[i]);		
	}
}

function move(dog) {

	dog.X = rnd(dog.X-5, dog.X+5);
	dog.Y = rnd(dog.Y-5, dog.Y+5);
	ctx.drawImage(dog, dog.X , dog.Y, dog.width, dog.height);
}

window.onload = function() { 
  createDog();
  moveTimer();
}

function moveTimer() {
	 var timer = setInterval((function(){startMove()}),rnd(200,1500))
}

function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }

canvas.addEventListener('click', function(e) {
   var dog = generateDog();
   var pos = getMousePos(canvas, e);
   pos.x = pos.x - dog.width/2
   pos.y = pos.y - dog.height/2
   addDog(pos,dog);
}, false);

function addDog(pos, dog) {
    clear();
	dog.X = pos.x;
	dog.Y = pos.y;
	dogs[dogs.length] = dog;

for(var i = 0; i<dogs.length; i++)
	ctx.drawImage(dogs[i], dogs[i].X ,dogs[i].Y, dogs[i].width, dogs[i].height);
}