let lat;
let lng;
let aC;
let rad;
let MXYND = JSON.parse(MXYNDjson);
let f;
let a;
let cornerAz;
let xCStart, yCStart;
let radrot;
const descriptionTextrea = document.getElementById('description_textrea');
const descriptionNameMountain = document.getElementById('description_name_mountain');
const nameMountain = document.getElementById('name_mountain');
const name = document.getElementById('name');
const description = document.getElementById("description");
const descriptionMenu = document.getElementById("description_menu");
const video = document.getElementById('video');
const rangeCanvasAngle = document.getElementById('range_canvas_angle');
const settingContent = document.getElementById('settings_content');
const settingsIcon = document.getElementById('settings_icon');
const body = document.getElementById('window');
let ctx = rangeCanvasAngle.getContext('2d');
let front = false;
let MDcheck = 0;
let MScheck = 0;
let viewingAngle = 10;

//I get latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {

	// Текущие координаты.
	lat = position.coords.latitude;
	lng = position.coords.longitude;


});



// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	var myConstraints = {
		video: {
			facingMode: (front ? "user" : "environment")
		}
	};
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia(myConstraints).then(function(stream) {
		//video.src = window.URL.createObjectURL(stream);
		video.srcObject = stream;
		video.play();
	});
}


//getting azimuth
if ('ondeviceorientationabsolute' in window) {

	window.ondeviceorientationabsolute = function(event) {
		rad = event.alpha;
		cornerAz = 360 - event.alpha;
	};

} else if ('ondeviceorientation' in window) {

	window.ondeviceorientationabsolute = function(event) {

		rad = event.alpha;
		cornerAz = 360 - event.alpha;

	};

} else {
	alert("error");
}



//I transfer all data to check function
setInterval(function() {
	for (f = 0; f < MXYND.coordinates.length; f++) {
		checkNavigation(MXYND.coordinates[f][1], MXYND.coordinates[f][0], lat, lng, cornerAz);
	}
}, 20);


//checks what mountain i look at
function checkNavigation(xM, yM, y, x, az) {
	let corner1, corner2;
	let a, b, c;
	b = x;
	c = 90 - y;
	a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));
	corner1 = Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c)) * (180 / Math.PI);

	let aM, bM, cM;
	let s;


	if (yM > y && xM > x) {


		aM = yM - y;
		bM = xM - x;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + corner2;

	} else if (yM < y && xM > x) {


		bM = y - yM;
		aM = xM - x;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + corner2;

	} else if (yM < y && xM < x) {


		aM = y - yM;
		bM = x - xM;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + 90 + corner2;

	} else if (yM > y && xM < x) {


		bM = yM - y;
		aM = x - xM;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + 90 + 90 + corner2;

		if (s > 360) {
			s = s - 360;
		}


	}


	//degree check with upside down screen 
	if (window.orientation == 90 || window.orientation == -90) {
		az = az + 90;
		if (az > 360) {
			az = az - 360;
		}
	}

	s = s.toFixed(0);
	az = az.toFixed(0);



	if (Math.abs(az - s) < viewingAngle) {
		descriptionNameMountain.textContent = MXYND.name[f];
		descriptionTextrea.textContent = MXYND.description[f];
		nameMountain.textContent = MXYND.name[f];

	}
	/*else {
		descriptionH.textContent = "*****";
		descriptionText.textContent = "*****";
		nameMo.textContent = "*****";
	}
	*/

}



//open and close description

descriptionMenu.addEventListener('click', function(e) {
	if (MDcheck == 0) {
		description.style.display = "table";
		MDcheck = 1;
	} else {
		description.style.display = "none";
		MDcheck = 0;
	}
});


//style changes when you rotate the screen
window.addEventListener("orientationchange", function() {
	if (window.orientation == 90 || window.orientation == -90) {
		name.style.height = "30%";
		name.style.top = "-15%";
	} else {
		name.style.height = "15%";
		name.style.top = "-10%";
	}
}, false);



a = 5 * Math.PI / 180;
radrot = rangeCanvasAngle.height - (rangeCanvasAngle.height / 100) * 10;

if (radrot * 2 > rangeCanvasAngle.width) {
	radrot = rangeCanvasAngle.width - (rangeCanvasAngle.width / 100) * 10;
}

xCStart = rangeCanvasAngle.width / 2;
yCStart = rangeCanvasAngle.height;

ctx.clearRect(0, 0, rangeCanvasAngle.width, rangeCanvasAngle.height);
ctx.fillStyle = 'magenta';
ctx.beginPath();
ctx.moveTo(xCStart, yCStart);
ctx.lineTo(xCStart - Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(xCStart, yCStart);
ctx.lineTo(xCStart + Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
ctx.stroke();

function CanvasRotateAngle(value) {

	viewingAngle = value;
	a = value / 2 * Math.PI / 180;
	radrot = rangeCanvasAngle.height - (rangeCanvasAngle.height / 100) * 10;

	if (radrot * 2 > rangeCanvasAngle.width) {
		radrot = rangeCanvasAngle.width - (rangeCanvasAngle.width / 100) * 10;
	}

	xCStart = rangeCanvasAngle.width / 2;
	yCStart = rangeCanvasAngle.height;

	ctx.clearRect(0, 0, rangeCanvasAngle.width, rangeCanvasAngle.height);
	ctx.fillStyle = 'magenta';
	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart - Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart + Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();
}



function rangefontSize(value) {
	body.style.fontSize = value + 'px';
	descriptionTextrea.style.fontSize = value + 'px';
	let p = name.width;

}


settingsIcon.addEventListener('click', function(e) {
	if (MScheck == 0) {
		settingContent.style.display = "block";
		MScheck = 1;
	} else {
		settingContent.style.display = "none";
		MScheck = 0;
	}
});