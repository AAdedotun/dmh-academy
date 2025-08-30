// Mobile menu toggling
const menuBtn = document.getElementById("mobile-menu-btn");
const closeBtn = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");

function openMenu() {
    mobileMenu.classList.replace("offcanvas-hidden", "offcanvas-shown");
    overlay.classList.remove("hidden");
}
function closeMenu() {
    mobileMenu.classList.replace("offcanvas-shown", "offcanvas-hidden");
    overlay.classList.add("hidden");
}

menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Explore dropdown toggling
const exploreBtn = document.getElementById("explore-btn");
const exploreDropdown = document.getElementById("explore-dropdown");

document.addEventListener("click", (e) => {
    if (exploreBtn.contains(e.target)) {
        exploreDropdown.classList.toggle("hidden");
    } else if (!exploreDropdown.contains(e.target)) {
        exploreDropdown.classList.add("hidden");
    }
});

// Top Categories Carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const pagiNation = document.getElementById('carousel-pagination');
    let slidesToShow = 2;
    let pageCount = 0;
    let currentPage = 0;
    let autoPlayId;

    function calculateSettings() {
        const w = window.innerWidth;
        if (w < 640) {
            slidesToShow = 1;
        } else if (w < 1024) {
            slidesToShow = 3;
        } else {
            slidesToShow = 4;
        }
        pageCount = Math.ceil(slides.length / slidesToShow);
        buildPagination();
        goToPage(0);
    }

    function buildPagination() {
        pagiNation.innerHTML = '';
        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'h-3 w-3 rounded-full bg-gray-300';
            dot.addEventListener('click', () => {
                goToPage(i);
                resetAutoplay();
            });
            pagiNation.append(dot);
        }
    }

    function updatePagination() {
        Array.from(pagiNation.children).forEach((dot, idx) => {
            dot.classList.toggle('bg-[#140342]', idx === currentPage);
            dot.classList.toggle('bg-gray-300', idx !== currentPage);
        });
    }

    function goToPage(page) {
        currentPage = (page + pageCount) % pageCount;
        const slideWidth = slides[0].offsetWidth;
        const offset = currentPage * slidesToShow * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
        updatePagination();
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function resetAutoplay() {
        clearInterval(autoPlayId);
        autoPlayId = setInterval(nextPage, 3000);
    }

    window.addEventListener('resize', calculateSettings);

    // Init
    calculateSettings();
    resetAutoplay();
});

// Js for Tabs || Our Most Popular Courses

const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".course-card");

tabs.forEach((tab) => {
    // This updates the tab styles
    tab.classList.replace("bg-purple-600", "bg-white");
    tab.classList.replace("text-white", "text-gray-700");
    tab.classList.replace("border-transparent", "border-gray-200");
    tab.classList.replace("aria-selected", "false");
});

tab.classList.replace("bg-white", "bg-purple-600");
tab.classList.replace("text-gray-700", "text-white");
tab.setAttribute("aria-selected", "true");

// This filter cards
const filter = tab.dataset.tab;
cards.forEach((card) => {
    if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
    } else {
        card.classList.add("hidden");
    };
});

