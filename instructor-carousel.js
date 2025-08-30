// Javascript Toggle & Smooth Scroll
const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    btn.classList.toggle('hidden', window.scrollY < 300);
});
btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
);


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


// What We Say
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
    const visible = getVisibleCount();
    // clamp index so we don't blank out at end
    index = Math.min(Math.max(index, 0), totalCards - visible);
    const shift = (100 / visible) * index;
    track.style.transform = `translateX(-${shift}%)`;

    // enable/disable buttons
    prev.disabled = index === 0;
    next.disabled = index >= totalCards - visible;
}

prev.addEventListener('click', () => { index--; updateSlider(); });
next.addEventListener('click', () => { index++; updateSlider(); });
window.addEventListener('resize', updateSlider);

// initialize
updateSlider();

