(function (){

    "use strict"; 

    // main function 
    window.onload = function(){
        let clock = buildTheClock();
        attachDate();
        playAudio(); 

        setInterval(moveHands, 1000); 

        let audioButton = document.getElementById("audio"); 
        audioButton.addEventListener("click", function(){ 
            let time = getTime();
            speak("It is " + time[0] + " " + time[1]); 
        });
        

        let backgroundButton = document.getElementById("aesthetics"); 
        backgroundButton.addEventListener("click", function(){
            // toggle the style for the clock 
            if(backgroundButton.value === "Roman"){ 
                backgroundButton.value = "Numeral"; 

                clock.style.background = "url(\"imgs/numeral.png\")";  
                clock.style.backgroundSize = 100 + "%";
                clock.style.border = "none"; 

            }else{ 
                backgroundButton.value = "Roman"
                clock.style.background = "url(\"imgs/roman.png\")";  
                clock.style.backgroundSize = 100 + "%";
                clock.style.border = 1 + "px dashed black";
            }
        });

        let playButton = document.getElementById("music"); 
        playButton.addEventListener("click", function(){ 
            // option to turn off/on 
            if(playButton.value === "Play"){ 
                playButton.value = "Stop";
                playAudio(); 
            }else{ 
                playButton.value = "Play"; 
                stopAudio(); 
            }
        });
    }

    // other functions! 

    function playAudio(){ 
        // play the audio! 
        let record = document.getElementById("noon"); 
        record.loop = true; 
        record.volume = .2; 
        record.play(); 
    }

    function stopAudio(){ 
        // stop the audio! 
        let record = document.getElementById("noon"); 
        record.pause(); 
    }

    function speak(message) {
        // for the voice! 
        let msg = new SpeechSynthesisUtterance(message)
        let voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]
        window.speechSynthesis.speak(msg)
      }

    function buildTheClock(){ 
        // build the clock! 
        let container = document.getElementById("clock"); 
        let circle = document.createElement("div"); 
        circle.id = "circle"; 

        let clockFace = document.createElement("div"); 
        clockFace.id = "clockFace"; 

        let hourHand = document.createElement("div"); 
        let minuteHand = document.createElement("div"); 
        let secondHand = document.createElement("div"); 

        hourHand.className = "hand hour"; 
        minuteHand.className = "hand minute"; 
        secondHand.className = "hand second"; 

        container.appendChild(circle).appendChild(clockFace)
        clockFace.appendChild(hourHand); 
        clockFace.appendChild(minuteHand); 
        clockFace.appendChild(secondHand); 

        return circle
    }

    function moveHands(){ 
        // move the hands in real time 
        let time = getTime(); 

        let hourHand = document.querySelector('.hour'); 
        let minuteHand = document.querySelector('.minute');
        let secondHand = document.querySelector('.second');

        let allTheHands = document.querySelectorAll('.hand'); 

        let hoursPosition = ((time[0]/12) * 360) + 90; 
        let minutesPosition = ((time[1]/60) * 360 ) + 90; 
        // let hoursPosition = 90; 
        // let minutesPosition = 90; 
        let secondsPosition = ((time[2]/60) * 360) + 90; 
        
        hourHand.style.transform = 'rotate('+ hoursPosition + "deg)";
        minuteHand.style.transform = 'rotate('+ minutesPosition + "deg)";
        secondHand.style.transform = 'rotate('+ secondsPosition + "deg)";
        

        // to get rid of that weird morph that happens when the seconds reaches the top again 
        if(secondsPosition === 90) {
            // we reset the transitions! 
            allTheHands.forEach(hand => hand.style.transition = 'none');
          } else {
            allTheHands.forEach(hand => hand.style.transition = '');
          }

        if(hoursPosition === 90 && minutesPosition === 90){ 
            let highNoonTune = document.getElementById("high-noon"); 
            highNoonTune.play(); 
        }

    }

    function attachDate(){ 
        let time = new Date(); 
        let month = time.getMonth(); 
        let year = time.getFullYear(); 
        let day = time.getDay(); 

        let date = document.getElementById("date");  
        date.id = "header";
        let months = [
                        "January", "February", "March", 
                        "April", "May", "June", "July", 
                        "August", "September", "October", 
                        "November", "December"
                    ]; 
        let paragraph = document.createElement("h2"); 
        let fullDate = document.createTextNode("{ " + String(months[month]) + " " + String(day) + ", " + String(year) + " }"); 

        date.appendChild(paragraph).appendChild(fullDate); 
        
        
    }

    function getTime(){ 
        // general time getter 
        let time = new Date(); // initialize the date 

        let seconds = time.getSeconds(); 
        let minutes = time.getMinutes(); 
        let hours = time.getHours();

        return [hours, minutes, seconds]
    }

})(); 