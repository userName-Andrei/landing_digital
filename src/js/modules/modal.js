let burgerMenuWidth = getComputedStyle(document.querySelector('.burger-menu')).width;

const modalShow = (modalSelector) => {
    let modal = document.querySelector(modalSelector);

    let ident = window.innerWidth - document.documentElement.clientWidth;
	document.body.style.overflow = 'hidden';
	document.body.style.paddingRight = ident + 'px';
    document.querySelector('.navigation').style.paddingRight = ident + 'px';

    modal.classList.add('show');

    if(modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    } 
};

const modalHide = (modalSelector) => {
    let modal = document.querySelector(modalSelector);

    document.body.style.overflow = '';
	document.body.style.paddingRight = 0 + 'px';
    document.querySelector('.navigation').style.paddingRight = 0 + 'px';
    
    if(modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.classList.add('hide');
    } 
};

const modal = ({triggerSelector, modalSelector}) => {
    let modalItem = document.querySelector(modalSelector),
        btnOpen = document.querySelectorAll(triggerSelector);

    btnOpen.forEach(item => item.addEventListener('click', () => modalShow(modalSelector)));

    modalItem.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal__close') || e.target === modalItem) {
            modalHide(modalSelector);
        }
    });

};

export {modal, modalShow, modalHide};