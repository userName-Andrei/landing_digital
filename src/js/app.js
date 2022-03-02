import burgerMenu from './modules/burger-menu.js';
import {modal} from './modules/modal.js';
import form from './modules/form.js';
import slider from './modules/slider.js';
import shiftMenu from './modules/shift-menu.js';
import isWebp from './modules/isWebp.js';

window.addEventListener('DOMContentLoaded', () => {
    burgerMenu({btnOpen:'.burger-btn_open', burgerMenu:'.burger-menu', btnClose: '.burger-btn_close'});
    modal({modalSelector:'.modal', triggerSelector:'.modal-open'});
    form({forms: 'form[name="order"]', choose: '[data-offer]'});
    slider({slideSelector: '.slider__item', containerSelector: '.slider-container',dotWrap: '.slider__dots', dotSelector: '.dot'});
    shiftMenu({triggerSelector:'.shift-trigger', elementsSelector:'.shift-element'});
    isWebp();
});
