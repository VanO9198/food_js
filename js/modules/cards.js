import {getData} from '../services/services';

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
    
    getData(dbUrl)
        .then(data=>data.forEach((obj) => {
            new Menu(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container')
                .render();
        }));
}

export default cards;