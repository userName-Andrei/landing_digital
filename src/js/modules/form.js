import request from './services/request.js';
import {modalShow, modalHide} from './modal.js';

const form = ({forms, choose}) => {
    let formItems = document.querySelectorAll(forms),
        chooseItems = document.querySelectorAll(choose),
        hiddenInputs = document.querySelectorAll('input[name="offer"]'),
        message = {
            loading: 'img/icons/spinner.svg',
            success: "Ваш заказ успешно оформлен! Спасибо что выбрали именно нас.",
            failure: "Что-то пошло не так..."
        };

    function addOfferToInput(offer) {
        hiddenInputs.forEach(item => {
            if(item.value.indexOf(offer) === -1) {
                item.value += offer + ' ';
            } else {
                item.value = item.value.split(' ').filter(elem => elem != offer).join(' ');
            }
        });
    }

    function showThxModal(message, success) {
        let modalDilog = document.querySelector('.modal__dialog'),
            modalThx = document.createElement('div');

        modalDilog.classList.add('hide');

        modalThx.classList.add('modal__dialog');
        modalThx.innerHTML = `
                <div class="modal__content">
                    <div data-modal-close="" class="modal__close">×</div>
                    <div class="modal__thanks">
                        ${success ? `<div class="modal__img"><img src="img/icons/success.png"></div>
                        <div class="modal__title bold">Успешно оформлено!</div>` : ''}
                        <div style="text-align:center; line-height:1.5">${message}</div>
                    </div>
                </div>
        `;
        document.querySelector('.modal').append(modalThx);
        
        modalShow('.modal');

        setTimeout(() => {
			modalThx.remove();
			modalDilog.classList.remove('hide');
			modalDilog.classList.add('show');
			modalHide('.modal');
		}, 5000);
    }

    function bindForm(form) {
        let formData = new FormData(form),
                json = JSON.stringify(Object.fromEntries(formData.entries())),
                statusMessage = document.createElement('img'),
                spinner = document.createElement('div');

            statusMessage.src = message.loading;
            spinner.classList.add('spinner');
            spinner.append(statusMessage);
            document.body.append(spinner);

            request({
                url:'http://localhost:3000/orders',
                body: json,
                method: 'POST'
            })
                .then(response => {
                    spinner.remove();
                    showThxModal(message.success, true);
                })
                .catch(() => {
                    spinner.remove();
                    showThxModal(message.failure, false);
                })
                .finally(() => {
                    form.reset();
                });
    }

    function addChooseItemEvent() {
        chooseItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    if(!item.classList.contains('active')) {
                        document.querySelectorAll(`[data-offer="${item.dataset.offer}"]`).forEach(elem => elem.classList.add('active'));
                        addOfferToInput(item.dataset.offer);
                    } else {
                        document.querySelectorAll(`[data-offer="${item.dataset.offer}"]`).forEach(elem => elem.classList.remove('active'));
                        addOfferToInput(item.dataset.offer);
                    }
                }
            });
        });
    }

    //submit form
    addChooseItemEvent();
    formItems.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            bindForm(item);
        });
    });

    
};

export default form;