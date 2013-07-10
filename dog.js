
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

Image.prototype.setX = function setX (x) {
	this.X = x;
}
Image.prototype.setY = function setY (y) {
	this.Y = y;
}

var dogs = new Array();

function clear () {
	ctx.clearRect (0, 0, canvas.width, canvas.height);
}

function killAllDogs() {
    dogs = [];
}

function rnd(min, max) {
	 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDog() {
	var dog = new Image();
	dog.width = rnd(80,100)
	dog.height = rnd(80,100)
	dog.setX(rnd(30,500));
	dog.setY(rnd(30,500));
	dog.src = 'dog.png';
    return dog;
}

function createDog() {
    for (var i=0; i<10; i++) {
    var dog = generateDog();
    dogs[i] = dog;
    dogs[i].X = rnd(0,600);
    dogs[i].Y = rnd(0,700);
    drawDog(dog);
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
    addDog(e);
}, false);

canvas.addEventListener('mousemove', function(e) {
    if (e.which === 1) {
        addDog(e);
    }
    	
}, false);


document.getElementById('clear').addEventListener('click', function() {
	clear();
    killAllDogs();
}, false);

function addDog(e) {
    var pos = getMousePos(canvas, e);
    var dog = generateDog();
    dog.onload = function() {
       	dog.src = getNewImageSrc(dog);
        dog.X = pos.x - dog.width/2
        dog.Y = pos.y - dog.height/2
        dogs[dogs.length] = dog;
        drawDog(dog);
    }
}

function setRandomColor(imageData) {
    var r = rnd(100,255);
    for(var i = 0; i < imageData.length; i += 4) {
        var brightness = 0.34 * imageData[i] + 0.5 * imageData[i + 1] + 0.16 * imageData[i + 2];
        // red
        if(imageData[i] > 200)
        imageData[i] = r;
        // green
        if(imageData[i+1] > 100 & imageData[i+1] < 150)
           imageData[i+1] = r;
        else
            imageData[i + 1] = brightness;
        // blue
        if(imageData[i+2] > 100)
            imageData[i + 2] = r;
        else
            imageData[i + 2] = brightness;
    }
    return imageData;
}

function getNewImageSrc(img) {
	var canv = document.createElement("canvas");  
	canv.width = img.width;  
	canv.height = img.height;  
	var ct = canv.getContext("2d");  
	ct.drawImage(img,0,0,img.width,img.height);
	var imageData = ct.getImageData(0, 0, img.width, img.height);
	imageData.data = setRandomColor(imageData.data);
	ct.clearRect(0,0,canv.width, canv.height);
	ct.putImageData(imageData,0,0);
	var dataURL = canv.toDataURL('image/  png'); 
    ct.clearRect(0,0,canv.width, canv.height);
	return dataURL;
}

function drawDog(dog) {
    dog.onload = function() {
        ctx.drawImage(dog, dog.X, dog.Y, dog.width, dog.height);
    }
}

window.onload = function() { 
    createDog();
    moveTimer();
}