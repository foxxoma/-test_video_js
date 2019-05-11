if(navigator.webkitGetUserMedia!=null) { 
  var options = { 
    video:true, 
    audio:true 
  }; 
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;
  // запрашиваем доступ к веб-камере
  navigator.webkitGetUserMedia(options, 
    function(stream) { 
      // получаем тег video
      var video = document.querySelector('video'); 
      // включаем поток в магический URL
      video.src = window.webkitURL.createObjectURL(stream); 
    }, 
    function(e) { 
     alert("error happened"); 
    } 
  ); 
}