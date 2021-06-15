'use strict';
import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import cards from './modules/cards';
import modal from './modules/modal';
import forms from './modules/forms';
import calculator from './modules/calculator';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {
    // const tabs = require('./modules/tabs'),
    //       timer = require('./modules/timer'),
    //       slider = require('./modules/slider'),
    //       cards = require('./modules/cards'),
    //       modal = require('./modules/modal'),
    //       forms = require('./modules/forms'),
    //       calculator = require('./modules/calculator');

    let modalTimer = setTimeout(() => openModal('.modal', modalTimer), 500000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-7-29');
    slider({
        prevSlide: '.offer__slider-prev', 
        nextSlide: '.offer__slider-next', 
        currentSlide: '#current', 
        totalSlides: '#total', 
        slide: '.offer__slide', 
        container: '.offer__slider', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner' 
    });
    cards('http://localhost:3000/menu');
    modal('[data-modal]', '.modal', modalTimer);
    forms('http://localhost:3000/requests', 'form', modalTimer);
    calculator();
   
}); 