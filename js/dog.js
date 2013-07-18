var dogs = [new Image];
var ctx;
var canvas;

Image.prototype.setX = function setX (x) {
    this.X = x;
}
Image.prototype.setY = function setY (y) {
    this.Y = y;
}

contentLoaded(window, 
    function () {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.addEventListener('click', function(e) {
         addDog(e);
    }, false);

    document.getElementById('clear').addEventListener('click', function() {
    	clear();
        killAllDogs();
    }, false);

    createDog();
});

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
    dog.src = 'img/dog.png';
    return dog;
}

function createDog() {
    for (var i=0; i<10; i++) {
    var dog = generateDog();
    dog.X = rnd(0,600);
    dog.Y = rnd(0,700);
    dogs[i] = dog;
    }
    moveTimer();
}

function moveTimer() {
     var timer = setInterval(function() {setTimeout(startMove(), rnd(10,50)) },50);
}

function startMove() {
    clear();
    var randomDogIndex = function () {
       return rnd(0, dogs.length-1);
    }

    var start = randomDogIndex();
    var end = randomDogIndex();
    if(end>start){
        start = Math.abs(start - end);
    }

   for (var i = start; i<end; i++) {
        move(i);
   }
   redrawDogs();
}

function move(i) {
    dogs[i].X = rnd(dogs[i].X-5, dogs[i].X+5);
    dogs[i].Y = rnd(dogs[i].Y-5, dogs[i].Y+5);
}

function redrawDogs() {
    for(var i = 0; i<dogs.length; i++) {
      ctx.drawImage(dogs[i], dogs[i].X, dogs[i].Y, dogs[i].width, dogs[i].height);
    }
}

function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
      }

function addDog(e) {
    var pos = getMousePos(canvas, e);
    var dog = generateDog();
     	dog.src = getNewImageSrc(dog);
        dog.X = pos.x - dog.width/2
        dog.Y = pos.y - dog.height/2
        var i = dogs.length
        dogs[i] = dog;
        ctx.drawImage(dogs[i], dogs[i].X, dogs[i].Y, dogs[i].width, dogs[i].height);
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
    if(rnd(0,1)) {
        ct.translate(img.width, 0);
        ct.scale(-1,1);
    }
    ct.drawImage(img,0,0,img.width,img.height);
	var imageData = ct.getImageData(0, 0, img.width, img.height);
	imageData.data = setRandomColor(imageData.data);
	ct.clearRect(0,0,canv.width, canv.height);
    ct.putImageData(imageData,0,0);
	var dataURL = canv.toDataURL('image/  png'); 
    ct.clearRect(0,0,canv.width, canv.height);
	return dataURL;
}

