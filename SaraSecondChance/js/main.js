/* event date countdown */
var countDownDate = new Date("Aug 21, 2020 16:00:00").getTime();

var x = setInterval(function() {

var now = new Date().getTime();
    
var distance = countDownDate - now;
    
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
if (distance < 0) {
  clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);;

/* slideshow */
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const slidesLength = slides.length;
var counter = 0;
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');

const dots = Array.from(dotsNav.children);

const slideWidth= slides[0].getBoundingClientRect().width;

const totalWidth = slideWidth * (slidesLength -1) + 'px'; 

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
    slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide'); 
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

prevButton.addEventListener('click', e => {
    counter --;
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    if ((counter) == -1) {
        const lastSlide = slides[slidesLength - 1];
        const lastDot = dots[slidesLength - 1];
        counter = slidesLength - 1;
        track.style.transform = 'translateX(-' + totalWidth + ')'; 
        currentSlide.classList.remove('current-slide'); 
        lastSlide.classList.add('current-slide'); 
        currentDot.classList.remove('current-slide');
        lastDot.classList.add('current-slide');
        slideResize();

    } else {
        // not for first slide //
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
});

nextButton.addEventListener('click', e => {  
    counter ++; 
    const currentSlide = track.querySelector('.current-slide'); 
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling;

    if ((counter) == slidesLength) {
        const firstSlide = slides[0];
        const firstDot = dots[0];
        counter = 0;
        track.style.transform = 'translateX(-' + 0 + 'px' + ')'; 
        currentSlide.classList.remove('current-slide'); // 
        firstSlide.classList.add('current-slide'); 
        currentDot.classList.remove('current-slide');
        firstDot.classList.add('current-slide');

    } else {
        // not the last slide //
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
})

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button'); 
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot  = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    counter = targetIndex;
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})

// window is resize //
window.addEventListener('resize', slideResize);

function slideResize(){
    var newSlideWidth = slides[0].getBoundingClientRect().width; 
    var totalWidth = slideWidth * (slidesLength - 1) + 'px'; 
    const setSlidePosition = (slide, index) => { 
        slide.style.left = newSlideWidth * index + 'px';  
    }
    
    slides.forEach(setSlidePosition); 
    
    const currentSlide = track.querySelector('.current-slide');
    var currentIndex = slides.indexOf(currentSlide);
    var currentTrackPos = newSlideWidth * currentIndex + 'px';
    track.style.transform = 'translateX(-' + currentTrackPos + ')';
}    