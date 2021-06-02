window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
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

    const btnsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');
        
    

    const openModal = () => {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    };

    for (let button of btnsModal) {
        button.addEventListener('click', openModal);
               
    }
        

    const closeModal = () => {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display === 'block') {
            closeModal();
        }
    });

    let modalTimer = setTimeout(openModal, 500000);
    

    const contactFromModal = {
        name: [],
        phone: []
    };

    const addCallRequest = () => {
        const addForm = document.querySelector('form.modal__form'),
            inputName = addForm.querySelector('[name="name"]'),
            inputPhone = addForm.querySelector('[name="phone"]');
        
        addForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let nameCont = inputName.value,
                phoneCont = inputPhone.value;
            
            if (nameCont && phoneCont) {
                contactFromModal.name.push(nameCont);
                contactFromModal.phone.push(phoneCont);
                closeModal();
            }

        alert(`${contactFromModal.name[0]}, мы с Вами свяжемся.`);

        });
        
    };

    addCallRequest();

    

    //calculator

    const genderChoice = document.querySelector('#gender'),
          gender = genderChoice.querySelectorAll('.calculating__choose-item'),
          activityChoice = document.querySelector('.calculating__choose_big'),
          activity = activityChoice.querySelectorAll('.calculating__choose-item'),
          calcResult = document.querySelector('.calculating__result span'),
          calculateInfo = {
              gender: 0,
              height: 0,
              heightRatio: 0,
              weight: 0,
              weightRatio: 0,
              age: 0,
              ageRatio: 0,
              activityClass: 0
          };
    
   
    function deactivate(type) {
        type.forEach((item) => {
            item.classList.remove('calculating__choose-item_active');            
        });
    }

    function activate(type, i = 0) {
        type[i].classList.add('calculating__choose-item_active');        
    }

    deactivate(gender);
    deactivate(activity);
    // activate(gender);
    // activate(activity);

    gender.forEach((item, i) => {
        item.addEventListener('click', (event)  => {
            const target = event.target;
            if (event && target.classList.contains('calculating__choose-item')) {
                deactivate(gender);
                activate(gender, i);
                
                switch(target.textContent) {
                    case 'Женщина': 
                        calculateInfo.gender = 655.1;
                        calculateInfo.heightRatio = 1.85;
                        calculateInfo.weightRatio = 9.563;
                        calculateInfo.ageRatio = 4.676;
                        break;
                        
                    case 'Мужчина': 
                        calculateInfo.gender = 66.5;
                        calculateInfo.heightRatio = 5.003;
                        calculateInfo.weightRatio = 13.75;
                        calculateInfo.ageRatio = 6.775;
                        break;                    
                }
                calcCalories();
                calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;            
            }
        });
    });

    activity.forEach((item, i) => {
        item.addEventListener('click', (event)  => {
            const target = event.target;
            if (event && target.classList.contains('calculating__choose-item')) {
                deactivate(activity);
                activate(activity, i);

                switch(target.textContent) {
                    case 'Низкая активность': 
                        calculateInfo.activityClass = 1.2;
                        break;
                    case 'Невысокая активность': 
                        calculateInfo.activityClass = 1.375;
                        break;
                    case 'Умеренная активность': 
                        calculateInfo.activityClass = 1.55;
                        break;
                    case 'Высокая активность': 
                        calculateInfo.activityClass = 1.7;
                        break; 
                }
                calcCalories();
                calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
            }
        });
    });

    const paramsBlock = document.querySelector('.calculating__choose_medium'),
        paramHeight = paramsBlock.querySelector('#height'),
        paramWeight = paramsBlock.querySelector('#weight'),
        paramAge = paramsBlock.querySelector('#age');
    
    paramWeight.addEventListener('change', (event) => {
        const target = event.target;
        calculateInfo.weight = target.value;
        calcCalories();
        calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    });  
    
    paramHeight.addEventListener('change', (event) => {
        const target = event.target;
        calculateInfo.height = target.value;
        calcCalories();
        calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    });

    paramAge.addEventListener('change', (event) => {
        const target = event.target;
        calculateInfo.age = target.value;
        calcCalories();
        calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    });

    let caloriesTotal = 0;

    function calcCalories() {
        let a = calculateInfo.weight,
            b = calculateInfo.height,
            c = calculateInfo.age,
            d = calculateInfo.activityClass,
            e = calculateInfo.gender,
            f = calculateInfo.heightRatio,
            g = calculateInfo.weightRatio,
            h = calculateInfo.ageRatio;

            caloriesTotal = Math.floor((e + (g * a) + (f * b) - (h * c))*d);
    }
    //offer slider 104

    let prevSlideCount = document.querySelector('.offer__slider-prev'),
        nextSlideCount = document.querySelector('.offer__slider-next'),
        currentSlideCount = document.querySelector('#current'),
        totalSlideCount = document.querySelector('#total'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        offerSlide = slideWrapper.querySelectorAll('.offer__slide');

    function hideOfferSlide() {
        offerSlide.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }
    hideOfferSlide();

    function showOfferSlide(i = 2) {            
            offerSlide[i].classList.add('show');
            offerSlide[i].classList.remove('hide');           
    }
    showOfferSlide();

    prevSlideCount.addEventListener('click', () => {
        let index = +currentSlideCount.textContent;            
        if (index >= 2) {                
                hideOfferSlide();
                showOfferSlide(+currentSlideCount.textContent-2);
                currentSlideCount.innerHTML = `<span id="current">0${index-1}</span>`;                
        } else {                
                hideOfferSlide();
                showOfferSlide(+totalSlideCount.textContent-1);
                currentSlideCount.innerHTML = 
                    `<span id="current">0${+totalSlideCount.textContent}</span>`;              
        }
        
    });

    nextSlideCount.addEventListener('click', () => {
        let index = +currentSlideCount.textContent;            
        if (index <= +totalSlideCount.textContent-1) {                
                hideOfferSlide();
                showOfferSlide(+currentSlideCount.textContent);
                currentSlideCount.innerHTML = `<span id="current">0${index+1}</span>`;                
        } else {                
                hideOfferSlide();
                showOfferSlide(+totalSlideCount.textContent-4);
                currentSlideCount.innerHTML = 
                    `<span id="current">0${+totalSlideCount.textContent-3}</span>`;              
        }
        
    });

    // call request from page 223


    const addOrderRequest = () => {
        const callRequest = document.querySelector('.order'),
        nameFromForm = callRequest.querySelector('[name="name"]'),
        phoneFromForm = callRequest.querySelector('[name="phone"]'),
        orderForm = callRequest.querySelector('.order__form');
        
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let nameCont = nameFromForm.value,
                phoneCont = phoneFromForm.value;
            
            if (nameCont && phoneCont) {
                contactFromModal.name.push(nameCont);
                contactFromModal.phone.push(phoneCont);                
            }

            alert(`${contactFromModal.name[0]}, мы с Вами свяжемся.`);
            

        });
        
    };

    addOrderRequest();

});

