const slider = ({slideSelector, containerSelector, dotWrap, dotSelector}) => {
    let slides = document.querySelectorAll(slideSelector),
        currentSlide = 0,
        isPaused = false;

    function dotsCreate(dotsWrap, dotSelector) {
        let dotWrap = document.querySelector(dotsWrap);
        slides.forEach((item, i) => {
            let dot = document.createElement('span');
            dot.classList.add(dotSelector.slice(1));

            if(i == currentSlide) {
                dot.classList.add('active');
            }

            dotWrap.append(dot);
        });
    }

    function dotsAddEvent(dotSelector) {
        let dots = document.querySelectorAll(dotSelector);

        dots.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                if(e.target == item){
                    currentSlide = i;
                    dotActive(dotSelector, currentSlide);
                    showSlide(i);
                }
            });
            item.addEventListener('mouseover', () => {
                isPaused = true;
            });
            item.addEventListener('mouseout', () => {
                isPaused = false;
            });
        });
    }

    function dotActive(dotSelector, num) {
        let dots = document.querySelectorAll(dotSelector);

        dots.forEach((item,i) => {
            item.classList.remove('active');
            if(i == num){
                item.classList.add('active');
            }
        });
    }

    function containerAddEvent(containerSelector) {
        let container = document.querySelector(containerSelector);
        container.addEventListener('mouseover', () => {
            isPaused = true;
        });
        container.addEventListener('mouseout', () => {
            isPaused = false;
        });
    }

    function nextSlide() {
        if(currentSlide + 1 < slides.length) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        dotActive(dotSelector, currentSlide);
        showSlide(currentSlide);
    }

    function showSlide(num) {
        if(num < slides.length){
            slides.forEach((item, i) => {
                if(i == num) {
                    slides.forEach(elem => {
                        if(elem.classList.contains('active')) {
                            elem.classList.remove('active');
                        };
                    });
                    item.classList.add('active');
                }
            });
        }
    }

    dotsCreate(dotWrap,dotSelector);
    dotsAddEvent(dotSelector);
    containerAddEvent(containerSelector);
    showSlide(currentSlide);
    
    let timerInterval = window.setInterval(() => {
        if(!isPaused) {
            nextSlide();
        }
    }, 3000);
};

export default slider;