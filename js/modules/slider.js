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

export default slider;