const burgerMenu = ({btnOpen, burgerMenu, btnClose}) => {
    let openBtn = document.querySelector(btnOpen),
        menu = document.querySelector(burgerMenu),
        close = document.querySelector(btnClose);

    openBtn.addEventListener('click', (e) => {
        menu.style.right = 0;
    });

    close.addEventListener('click', (e) => {
        menu.style.right = `-${getComputedStyle(menu).width}`;
    });
};

export default burgerMenu;