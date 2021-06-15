function timer(id, deadline) {
     //Timer
     
     function timeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor((t / (1000 * 60 * 60 * 24))),
             hours = Math.floor((t / (1000 * 60 * 60) % 24)),
             minutes = Math.floor((t / (1000 * 60) % 60)),
             seconds = Math.floor((t / (1000) % 60));
 
         return {
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds,
             'remaining': t
         };
 
     }
 
     function addZero(num) {
         if (num >= 0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }
 
     function setTimer(selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             interval = setInterval(updateTimer, 1000);
 
         updateTimer();
 
         function updateTimer() {
             const timeRem = timeRemaining(endtime);
 
             days.innerHTML = addZero(timeRem.days);
             hours.innerHTML = addZero(timeRem.hours);
             minutes.innerHTML = addZero(timeRem.minutes);
             seconds.innerHTML = addZero(timeRem.seconds);
 
             if (timeRem.remaining <= 0) {
                 days.innerHTML = 0;
                 hours.innerHTML = 0;
                 minutes.innerHTML = 0;
                 seconds.innerHTML = 0;
                 clearInterval(interval);
             }
         }
     }
 
     setTimer(id, deadline);
}

export default timer;