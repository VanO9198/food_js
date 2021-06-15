/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
     //calculator

    
     const result = document.querySelector('.calculating__result span');
    
     let sex, height, weight, age, ratio;
 
     if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex = 'female';
         localStorage.setItem('sex', 'female');
     }
 
     if (localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
     } else {
         ratio = 1.375;
         localStorage.setItem('ratio', 1.375);
     }
 
     function calcTotal() {
         if (!sex || !height || !weight || !age || !ratio) {
             result.textContent = '____';
             return;
         }
         if (sex === 'female') {
             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
     }
 
     calcTotal();
 
     function initLocalSettings(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
 
         elements.forEach(elem => {
             elem.classList.remove(activeClass);
             if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                 elem.classList.add(activeClass);
             }
             if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                 elem.classList.add(activeClass);
             }
         });
     }
 
     initLocalSettings('#gender div', 'calculating__choose-item_active');
     initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function getStaticInformation(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
 
         elements.forEach(elem => {
             elem.addEventListener('click', (e) => {
                 if (e.target.getAttribute('data-ratio')) {
                     ratio = +e.target.getAttribute('data-ratio');
                     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                 } else {
                     sex = e.target.getAttribute('id');
                     localStorage.setItem('sex', e.target.getAttribute('id'));
                 }
     
                 elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                 });
     
                 e.target.classList.add(activeClass);
     
                 calcTotal();
             });
         });
     }
 
     getStaticInformation('#gender div', 'calculating__choose-item_active');
     getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function getDynamicInformation(selector) {
         const input = document.querySelector(selector);
 
         input.addEventListener('input', () => {
             if (input.value.match(/\D/g)) {
                 input.style.border = "2px solid red";
             } else {
                 input.style.border = 'none';
             }
             switch(input.getAttribute('id')) {
                 case "height":
                     height = +input.value;
                     break;
                 case "weight":
                     weight = +input.value;
                     break;
                 case "age":
                     age = +input.value;
                     break;
             }
 
             calcTotal();
         });
     }
 
     getDynamicInformation('#height');
     getDynamicInformation('#weight');
     getDynamicInformation('#age');

      // const genderChoice = document.querySelector('#gender'),
    //     gender = genderChoice.querySelectorAll('.calculating__choose-item'),
    //     activityChoice = document.querySelector('.calculating__choose_big'),
    //     activity = activityChoice.querySelectorAll('.calculating__choose-item'),
    //     calcResult = document.querySelector('.calculating__result span'),
    //     calculateInfo = {
    //         gender: 0,
    //         height: 0,
    //         heightRatio: 0,
    //         weight: 0,
    //         weightRatio: 0,
    //         age: 0,
    //         ageRatio: 0,
    //         activityClass: 0
    //     };

    // function deactivate(type) {
    //     type.forEach((item) => {
    //         item.classList.remove('calculating__choose-item_active');
    //     });
    // }

    // function activate(type, i = 0) {
    //     type[i].classList.add('calculating__choose-item_active');
    // }
    // calcResult.innerHTML = `<span>_____</span> ккал`;
    // deactivate(gender);
    // deactivate(activity);
    // // activate(gender);
    // // activate(activity);

    // gender.forEach((item, i) => {
    //     item.addEventListener('click', (event) => {
    //         const target = event.target;
    //         if (event && target.classList.contains('calculating__choose-item')) {
    //             deactivate(gender);
    //             activate(gender, i);

    //             switch (target.textContent) {
    //                 case 'Женщина':
    //                     calculateInfo.gender = 447.6;
    //                     calculateInfo.heightRatio = 3.1;
    //                     calculateInfo.weightRatio = 9.2;
    //                     calculateInfo.ageRatio = 4.3;
    //                     break;

    //                 case 'Мужчина':
    //                     calculateInfo.gender = 88.36;
    //                     calculateInfo.heightRatio = 4.8;
    //                     calculateInfo.weightRatio = 13.4;
    //                     calculateInfo.ageRatio = 5.7;
    //                     break;
    //             }
    //             calcCalories();
    //             calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    //         }
    //     });
    // });

    // activity.forEach((item, i) => {
    //     item.addEventListener('click', (event) => {
    //         const target = event.target;
    //         if (event && target.classList.contains('calculating__choose-item')) {
    //             deactivate(activity);
    //             activate(activity, i);

    //             switch (target.textContent) {
    //                 case 'Низкая активность':
    //                     calculateInfo.activityClass = 1.2;
    //                     break;
    //                 case 'Невысокая активность':
    //                     calculateInfo.activityClass = 1.375;
    //                     break;
    //                 case 'Умеренная активность':
    //                     calculateInfo.activityClass = 1.55;
    //                     break;
    //                 case 'Высокая активность':
    //                     calculateInfo.activityClass = 1.7;
    //                     break;
    //             }
    //             calcCalories();
    //             calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    //         }
    //     });
    // });

    // const paramsBlock = document.querySelector('.calculating__choose_medium'),
    //     paramHeight = paramsBlock.querySelector('#height'),
    //     paramWeight = paramsBlock.querySelector('#weight'),
    //     paramAge = paramsBlock.querySelector('#age');

    // paramWeight.addEventListener('input', (event) => {
    //     const target = event.target;
    //     calculateInfo.weight = target.value;
    //     calcCalories();
    //     calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    // });

    // paramHeight.addEventListener('input', (event) => {
    //     const target = event.target;
    //     calculateInfo.height = target.value;
    //     calcCalories();
    //     calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    // });

    // paramAge.addEventListener('input', (event) => {
    //     const target = event.target;
    //     calculateInfo.age = target.value;
    //     calcCalories();
    //     calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    // });

    // let caloriesTotal = 0;

    // function calcCalories() {
    //     let a = calculateInfo.weight,
    //         b = calculateInfo.height,
    //         c = calculateInfo.age,
    //         d = calculateInfo.activityClass,
    //         e = calculateInfo.gender,
    //         f = calculateInfo.heightRatio,
    //         g = calculateInfo.weightRatio,
    //         h = calculateInfo.ageRatio;

    //     if (!a || !b || !c || !d || !e || !f || !g || !h) {
    //         calcResult.innerHTML = `<span>_____</span> ккал`;
    //     } else {
    //         caloriesTotal = Math.floor((e + (g * a) + (f * b) - (h * c)) * d);
    //     }

    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(dbUrl) {
     // menu rendering

     class Menu {
        constructor(imageSrc, alt, subTitle, description, priceTotal, parentSelector, ...classes) {
            this.imageSrc = imageSrc;
            this.alt = alt;
            this.subTitle = subTitle;
            this.description = description;
            this.classes = classes;
            this.priceTotal = priceTotal;
            this.exchangeRate = 27;
            this.parent = document.querySelector(parentSelector);
            this.priceTotal *= this.exchangeRate;
        }

        render() {
            const element = document.createElement('div');
            this.defaultClass = 'menu__item';

            if (this.classes.length === 0) {
                element.classList.add(this.defaultClass);
            } else {
                this.classes.forEach(className => element.classList.add(className));
                element.classList.add(this.defaultClass);
            }

            element.innerHTML = `                
                <img src=${this.imageSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subTitle}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.priceTotal}</span> грн/день</div>
                </div>                
           `;
            this.parent.append(element);
        }
    }
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)(dbUrl)
        .then(data=>data.forEach((obj) => {
            new Menu(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container')
                .render();
        }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(dbUrl, formSelector, timer) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const statusMessage = {
        loading: 'img/form/spinner.svg',
        success: 'Thanx, we will call you',
        failed: "Something's gone wrong"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusElement = document.createElement('img');
            statusElement.src = statusMessage.loading;
            statusElement.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
            form.insertAdjacentElement('afterend', statusElement);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');
            // при использовании связки XMLHttpRequest + FormData, заголовки 
            // устанавливать не нужно, они устанавливаются автоматически

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(dbUrl, json)
                .then(data => {
                    console.log(data);
                    thanksMessageModal(statusMessage.success);
                    statusElement.remove();
                })
                .catch(() => {
                    thanksMessageModal(statusMessage.failed);
                })
                .finally(() => {
                    form.reset();
                });

            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         // console.log(request.response);
            //         thanksMessageModal(statusMessage.success);
            //         form.reset();
            //         statusElement.remove();
            //     } else {
            //         thanksMessageModal(statusMessage.failed);

            //     }
            // });
        });
    }

    function thanksMessageModal(message) {
        const thanksArea = document.querySelector('.modal__dialog');
        thanksArea.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', timer);

        const thanksElement = document.createElement('div');
        thanksElement.classList.add('modal__dialog');
        thanksElement.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>            
             </div>
         `;

        document.querySelector('.modal').append(thanksElement);

        setTimeout(() => {
            thanksElement.remove();
            thanksArea.classList.add('show');
            thanksArea.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, timer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (timer) {
        clearInterval(timer);
    }
}

function modal(btnsSelector, modalSelector, timer) {

    const btnsModal = document.querySelectorAll(btnsSelector),
        modalWindow = document.querySelector(modalSelector);

    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, timer));
    }); 

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modalSelector, timer);
            window.removeEventListener('scroll', showModalScroll);
        }
    }
    window.addEventListener('scroll', showModalScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({prevSlide, nextSlide, currentSlide, totalSlides, slide, container, wrapper, field}) {
    //offer slider 104

    let prevSlideCount = document.querySelector(prevSlide),
        nextSlideCount = document.querySelector(nextSlide),
        currentSlideCount = document.querySelector(currentSlide),
        totalSlideCount = document.querySelector(totalSlides),
        offerSlide = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;
    let slidesTotal = offerSlide.length;


    if (offerSlide.length < 10) {
        totalSlideCount.innerText = `0${slidesTotal}`;
    } else {
        totalSlideCount.innerText = slidesTotal;
    }
    displayCurrentSlideNum();
    slidesField.style.width = 100 * offerSlide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    offerSlide.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    let indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    
    slider.append(indicators);
   
    for (let i = 0; i < offerSlide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    nextSlideCount.addEventListener('click', () => {
        if (offset == onlyDigits(width) * (offerSlide.length - 1)) { 
            offset = 0;
        } else {
            offset += onlyDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == offerSlide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        displayCurrentSlideNum();
        activateSliderIndicator(0.4);

    });

    prevSlideCount.addEventListener('click', () => {
        if (offset == 0) { 
            offset = onlyDigits(width) * (offerSlide.length - 1);
        } else {
            offset -= onlyDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = offerSlide.length;
        } else {
            slideIndex--;
        }

        displayCurrentSlideNum();
        activateSliderIndicator(0.4);

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = onlyDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            displayCurrentSlideNum();
            activateSliderIndicator(0.4);
        });
    });

    function displayCurrentSlideNum() {
        if (offerSlide.length < 10) {
            currentSlideCount.textContent = `0${slideIndex}`;
        } else {
            currentSlideCount.textContent = slideIndex;
        }
    }

    function activateSliderIndicator(opacityNotActive) {
        dots.forEach(dot => dot.style.opacity = opacityNotActive);
        dots[slideIndex - 1].style.opacity = 1;
    }

    function onlyDigits(string) {
        return +string.replace(/\D/g, '');
    }

    // let slidesTotal = offerSlide.length;

    // if (offerSlide.length < 10) {
    //     totalSlideCount.innerText = `0${slidesTotal}`;
    // } else {
    //     totalSlideCount.innerText = `${slidesTotal}`;
    // }

    

    // function showOfferSlide(i) {
    //     if (i > slidesTotal) {
    //         slideIndex = 1;
    //     }
    //     if (i < 1) {
    //         slideIndex = slidesTotal;
    //     }

    //     offerSlide.forEach((item) => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });
    //     offerSlide[slideIndex - 1].classList.add('show', 'fade');
    //     offerSlide[slideIndex - 1].classList.remove('hide');

    //     if (slidesTotal < 10) {
    //         currentSlideCount.textContent = `0${slideIndex}`;
    //     } else {
    //         currentSlideCount.textContent = `${slideIndex}`;
    //     }
    // }

    // showOfferSlide(slideIndex);

    // function moveSlide(i) {
    //     showOfferSlide(slideIndex += i);
    // }

    // nextSlideCount.addEventListener('click', () => {
    //     moveSlide(1);
    // });

    // prevSlideCount.addEventListener('click', () => {
    //     moveSlide(-1);
    // });

   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(tabsSelector, contentSelector, parentSelector, activeClass) {
    // Tabs

    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(contentSelector),
        tabsParent = document.querySelector(parentSelector);

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs); //ES6
//module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
async function postData(url, body) {
    let response = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await response.json();
}

async function getData(url) {
    let res = await fetch(url);
    if (!res.ok) {
        console.log(new Error('что то пошло не так'));
    } else {
        return await res.json();
    }
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");










window.addEventListener('DOMContentLoaded', function () {
    // const tabs = require('./modules/tabs'),
    //       timer = require('./modules/timer'),
    //       slider = require('./modules/slider'),
    //       cards = require('./modules/cards'),
    //       modal = require('./modules/modal'),
    //       forms = require('./modules/forms'),
    //       calculator = require('./modules/calculator');

    let modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimer), 500000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-7-29');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)({
        prevSlide: '.offer__slider-prev', 
        nextSlide: '.offer__slider-next', 
        currentSlide: '#current', 
        totalSlides: '#total', 
        slide: '.offer__slide', 
        container: '.offer__slider', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner' 
    });
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)('http://localhost:3000/menu');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]', '.modal', modalTimer);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('http://localhost:3000/requests', 'form', modalTimer);
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__.default)();
   
}); 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map