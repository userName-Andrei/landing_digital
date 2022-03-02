const shiftMenu = ({triggerSelector, elementsSelector}) => {
    let btns = document.querySelectorAll(triggerSelector),
        elements = document.querySelectorAll(elementsSelector);

    function triggerAddEvent() {
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(e.target) {
                    window.scrollTo({
                        top: e.target.dataset.heightLabel,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function addElementOffset() {
        btns.forEach((btn,i) => {
            elements.forEach((elem,o) => {
                if(i == o) {
                    btn.setAttribute('data-height-label', elem.getBoundingClientRect().top + window.pageYOffset);
                }
            });
        });
    }

    addElementOffset();
    triggerAddEvent();
}

export default shiftMenu;