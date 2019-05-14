
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
