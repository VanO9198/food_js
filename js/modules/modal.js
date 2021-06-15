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

export default modal;
export {closeModal};
export {openModal};
