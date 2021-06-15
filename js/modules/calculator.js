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

export default calculator;