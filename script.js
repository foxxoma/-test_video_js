
//const P = document.getElementById('p');

//canv.width = window.innerWidth;
//canv.height = window.innerHeight;




if(navigator.webkitGetUserMedia!=null) { 
  var options = { 
    video:true, 
    audio:true 
  }; 
  
  // запрашиваем доступ к веб-камере
  navigator.webkitGetUserMedia(options, 
    function(stream) { 
      // получаем тег video
      var video = document.querySelector('video'); 
      // включаем поток в магический URL
      video.src = window.webkitURL.createObjectURL(stream); 
    }, 
    function(e) { 
      console.log("error happened"); 
    } 
  ); 
}

/*
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
    


*/
