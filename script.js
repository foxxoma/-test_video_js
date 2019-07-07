var lat;
var lng;
let aC;
let rad;
var cornerAz;
const descriptionText = document.getElementById('description_text');
const descriptionH = document.getElementById('description_h');
const nameMo = document.getElementById('name_Mo');
navigator.geolocation.getCurrentPosition(function(position) {

        // Текущие координаты.
        lat = position.coords.latitude;
       lng = position.coords.longitude;
       

 });

var video = document.getElementById('video');
var front = false;
// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	var myConstraints = {  video: { facingMode: (front? "user" : "environment")} }; 
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia(myConstraints).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}




if ('ondeviceorientationabsolute' in window) { 
		
			window.ondeviceorientationabsolute = function(event) {
				rad = event.alpha;
				cornerAz = 360 - event.alpha;
			};
		
		} 

		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) {

       			rad = event.alpha;
       			cornerAz = 360 - event.alpha;

			};
		
		}

		else{
				alert("f2");
		}

let  MyM, MxM, f;


MyM = [m1 = [42.9391,44.59806,"m1","m1-dfdggfgfgfgfgfg"],
m2=[42.9034,43.97759,"m1","m1-dfdggfgfgfgfgfg"]];



setInterval(function() {
	for ( f = 0; f < MyM.length; f++){
	checkNavigation(MyM[f][1], MyM[f][0], lat, lng, cornerAz);
}
}, 10);
    


function checkNavigation(xM, yM, y, x, az){
	let corner1, corner2;
	let a, b, c;
	b = x;
	c = 90 - y;
	a = Math.sqrt( Math.pow(b,2) + Math.pow(c,2) );
	corner1 = Math.acos( (Math.pow(a,2) + Math.pow(c,2) - Math.pow(b,2)) / (2*a*c)) *(180/Math.PI);
	
let aM, bM, cM;


let s;

	
if (yM > y && xM > x){


aM = yM - y;
bM = xM - x;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM < y && xM > x){


bM = y - yM;
aM = xM - x;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM < y && xM < x){


aM = y - yM;
bM = x - xM;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + 90 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM > y && xM < x){


bM = yM - y;
aM = x - xM;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + 90 + 90 + corner2;

if(s > 360) 
{
	s = s - 360;
}

s = s.toFixed(0);
az = az.toFixed(0);
}

if(az == s){
descriptionH.textContent = MyM[f][2];
descriptionText.textContent = MyM[f][3];
nameMo.textContent = MyM[f][2];
}
else {
	descriptionH.textContent = '*****';
descriptionText.textContent =  '*****';
nameMo.textContent =  '*****';
}


}




































const description = document.getElementById("description");
const descriptionMenu = document.getElementById("description_menu");
let Mchek = 0;


descriptionMenu.addEventListener('click', function(e){
if (Mchek == 0){
description.style.display = "table"; Mchek = 1;
}
else {
 description.style.display = "none"; Mchek = 0;
}
 });
