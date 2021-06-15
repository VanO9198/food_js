import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData(dbUrl, json)
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
        openModal('.modal', timer);

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
            closeModal('.modal');
        }, 4000);

    }
}

export default forms;