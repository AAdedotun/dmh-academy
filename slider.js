const track = document.getElementById('track');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;
const totalCards = track.children.length;

function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function updateSlider() {
    const visible = getVisibleCount();// wrap-around logic
    if (index < 0) {
        index = totalCards - visible;
    } else if (index > totalCards - visible) {
        index = 0;
    }

    // shift track
    const shift = (100 / visible) * index;
    track.style.transform = `translateX(-${shift}%)`;
}

prev.addEventListener('click', () => {
    index--;
    updateSlider();
});

next.addEventListener('click', () => {
    index++;
    updateSlider();
});

window.addEventListener('resize', updateSlider);


// initialize
updateSlider();



// Instructor Carousel
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const cards = slider.querySelectorAll(".card");
    let index = 0;
    let intervalId = null;

    function slideTo(i) {
        const cardWidth = cards[0].getBoundingClientRect().width;
        slider.style.transform = `translateX(-${i * cardWidth}px)`;
    }

    function startAutoSlide() {
        // guard against double intervals
        if (intervalId) return;
        intervalId = setInterval(() => {
            index = (index + 1) % cards.length;
            slideTo(index);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
        intervalId = null;
        index = 0;
        slider.style.transform = "translateX(0)";
    }

    function updateSliderBehavior() {
        if (window.innerWidth >= 1024) {
            // laptop and above → static
            stopAutoSlide();
        } else {
            // tablet/mobile → looping
            startAutoSlide();
        }
    }

    // on load
    updateSliderBehavior();

    // on resize
    window.addEventListener("resize", () => {
        // reset any running interval before re-calculating
        stopAutoSlide();
        updateSliderBehavior();
    });
});