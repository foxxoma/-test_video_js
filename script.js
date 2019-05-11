const canv = document.getElementById('canvas'),
ctx = canv.getContext('2d');

const P = document.getElementById('p');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const video = document.getElementById("video"),
localmediaStream =null,
onCameraFail = function(e) {
	 console.log('Camera did not work.', e); // Исключение на случай, если камера не работает
     
};


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, onCameraFail);

cameraInterval = setInterval(function(){ snapshot();}, 1);
function snapshot(){
       if(localMediaStream){
              ctx.drawImage(video, 0, 0);
        }
}






  		if ('ondeviceorientationabsolute' in window) { 

		
		window.ondeviceorientationabsolute = function(event) { 

		P.textContent = event.alpha;
		} 
	}
		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) { 

		P.textContent = event.alpha;

		}
	}

		else{
		P.textContent = "f2";
		}
    



