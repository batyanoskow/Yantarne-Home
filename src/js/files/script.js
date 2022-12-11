// Подключение функционала "Чертогов Фрилансера"
import { bodyUnlock, isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("load", function(event) {
    function getData(){
        setInterval( async function(){
            await fetch("https://complex.in.ua/status-json.xsl?mount=/yantarne").then((res) =>{
                return res.json();
            }).then((data) => {
             
                let songNameField = document.querySelector(".music-header__text");
               songNameField.innerText = data.icestats.source.title;
        
            })
        },4000)
    }  
    function vizualizer(){
        let  audio = new Audio("https://complex.in.ua/yantarne");
        audio.crossOrigin = "anonymous";
        audio.volume = 1;
        let buttonPlay = document.querySelector(".music-header__button");
        buttonPlay.addEventListener("click", function (e) {   
            buttonPlay.classList.toggle("_active");
            let buttonPlayImg = document.querySelector(".music-header__button picture  source");
                    if (buttonPlay.classList.contains("_active")) {
                        context.resume();
                        audio.play();
                        buttonPlayImg.setAttribute("srcset", "img/icon-pause.webp");
                    } else {
                        audio.pause();
                        buttonPlayImg.setAttribute("srcset", "img/icon-play.webp");
                    }
        });  
        let context = new(window.AudioContext || window.webkitAudioContext)();
        var src = context.createMediaElementSource(audio);
        
    
        var analyser = context.createAnalyser();
        let canvas = document.getElementById("myCanvas");
       
        var ctx = canvas.getContext("2d");
    
        src.connect(analyser);
        analyser.connect(context.destination);
       
      
        analyser.fftSize = 512;
        ctx.lineWidth = 5;
        var bufferLength = analyser.frequencyBinCount;
       
    
        var dataArray = new Uint8Array(bufferLength);
    
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height ;
    
        var barWidth = (WIDTH / bufferLength);
        var barHeight = HEIGHT;
    
        function renderFrame() {
         
          analyser.getByteFrequencyData(dataArray);
          
          var x = 0;
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          for (var i = 0; i < bufferLength; i++) {
          
            barHeight = dataArray[i] / 10;
            
            ctx.fillStyle = "white";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 3;
            if(i === 75){
            
              ctx.fillStyle = "rgba(0,0,0,0)";
              ctx.fillRect(x, HEIGHT - barHeight, barWidth * 10 , barHeight);
              ctx.font = "20px Montserrat";
              ctx.fillStyle = "white";
              ctx.fillText("88.9", 425,28);
              x += barWidth + 80
            }
          }
          requestAnimationFrame(renderFrame);
        }
        renderFrame();

       
    }
    vizualizer();
    getData();
  
  });
