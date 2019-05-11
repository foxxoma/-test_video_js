
navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
window.URL.createObjectURL = (window.URL.createObjectURL ||
                          window.URL.webkitCreateObjectURL ||
                          window.URL.mozCreateObjectURL ||
                          window.URL.msCreateObjectURL);
  
 
navigator.getUserMedia({ video : true },   
//---
function ()
{
  var video = document.getElementById('video');
  video.src = window.URL.createObjectURL(stream);
}, 
function()
{
  alert("No access to the camera!")
});