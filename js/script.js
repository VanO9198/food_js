'use strict';

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener('DOMContentLoaded', function () {

    $('.sidepanel').hide();
    $('.header__logo').click(() => {
        for (let i = 0; i < 20; i++) {
            $('.header__logo').fadeOut(1000).fadeIn(1000);
            console.log(i);
        }
    });
    const pepper = $('.pepper img');
    pepper.click(() => pepper.hide(5000));

    const call = $('.call');
    call.click(() => {
        call.html(`
            <div class="subtitle">Или позвоните Ивану</div>
            <a href="#" class="link">+38 067 400 82 00</a>
            <a href="#" class="link">+38 093 609 06 48</a>
        `);
    });

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2021-6-25';

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

    setTimer('.timer', deadline);

    //modal window

    const btnsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal');

    for (let button of btnsModal) {
        button.addEventListener('click', openModal);
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
        window.removeEventListener('scroll', showModalScroll);
    }


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    let modalTimer = setTimeout(openModal, 500000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
        }
    }

    window.addEventListener('scroll', showModalScroll);

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
        item.addEventListener('click', (event) => {
            const target = event.target;
            if (event && target.classList.contains('calculating__choose-item')) {
                deactivate(gender);
                activate(gender, i);

                switch (target.textContent) {
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
        item.addEventListener('click', (event) => {
            const target = event.target;
            if (event && target.classList.contains('calculating__choose-item')) {
                deactivate(activity);
                activate(activity, i);

                switch (target.textContent) {
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

    paramWeight.addEventListener('input', (event) => {
        const target = event.target;
        calculateInfo.weight = target.value;
        calcCalories();
        calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    });

    paramHeight.addEventListener('input', (event) => {
        const target = event.target;
        calculateInfo.height = target.value;
        calcCalories();
        calcResult.innerHTML = `<span>${caloriesTotal}</span> ккал`;
    });

    paramAge.addEventListener('input', (event) => {
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

        caloriesTotal = Math.floor((e + (g * a) + (f * b) - (h * c)) * d);
    }
    //offer slider 104

    let prevSlideCount = document.querySelector('.offer__slider-prev'),
        nextSlideCount = document.querySelector('.offer__slider-next'),
        currentSlideCount = document.querySelector('#current'),
        totalSlideCount = document.querySelector('#total'),
        offerSlide = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;
    let slidesTotal = offerSlide.length;


    if (offerSlide.length < 10) {
        totalSlideCount.innerText = `0${slidesTotal}`;
        currentSlideCount.textContent = `0${slideIndex}`;
    } else {
        totalSlideCount.innerText = slidesTotal;
        currentSlideCount.textContent = slideIndex;
    }

    slidesField.style.width = 100 * offerSlide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    offerSlide.forEach(slide => {
        slide.style.width = width;
    });

    nextSlideCount.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length -2) * (offerSlide.length - 1))) { 
            offset = 0;
        } else {
            offset += +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == offerSlide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (offerSlide.length < 10) {
            currentSlideCount.textContent = `0${slideIndex}`;
        } else {
            currentSlideCount.textContent = slideIndex;
        }
    });

    prevSlideCount.addEventListener('click', () => {
        if (offset == 0) { 
            offset = +width.slice(0, width.length -2) * (offerSlide.length - 1)
        } else {
            offset -= +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = offerSlide.length;
        } else {
            slideIndex--;
        }

        if (offerSlide.length < 10) {
            currentSlideCount.textContent = `0${slideIndex}`;
        } else {
            currentSlideCount.textContent = slideIndex;
        }
    });

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

    getData('http://localhost:3000/menu')
        .then(data=>data.forEach((obj) => {
            new Menu(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container')
                .render();
        }));

    //Forms

    const forms = document.querySelectorAll('form');

    const statusMessage = {
        loading: 'img/form/spinner.svg',
        success: 'Thanx, we will call you',
        failed: "Something's gone wrong"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    async function postData(url, body) {
        let response = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
               'Content-type': 'application/json'
            }                    
        });
        return await response.json();
    };

    async function getData(url) {
        let res = await fetch(url);
        if (!res.ok) {
            console.log(new Error('что то пошло не так'));
        } else {
            return await res.json();
        }
    }



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
            
            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);

    }
});