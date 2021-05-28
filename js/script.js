window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.style.display ='none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].style.display ='block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    //Timer

    const deadline = '2021-6-5';

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

    function addZero (num) {
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
                clearInterval(interval);
            } 
        }
    }

    setTimer('.timer', deadline);

});