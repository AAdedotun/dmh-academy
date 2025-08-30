document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const overlay = document.getElementById('carouselOverlay');

    // slide metadata array
    const carouselData = [
        {
            ratingHTML: '★ ★ ★ ★ ☆',
            description: '“Their codes transformed our brand.”',
            name: 'Adedotun Awolaja',
            job: 'Front End Dev.'
        },
        {
            ratingHTML: '★ ★ ★ ★ ★',
            description: '“A breath of fresh air in UX/UI.”',
            name: 'Owen Harrhy',
            job: 'Product Designer'
        },
        {
            ratingHTML: '★ ★ ★ ☆ ☆',
            description: '“Fast, reliable, top-notch service.”',
            name: 'Joshua Oluwagbemiga',
            job: 'Graphics Designer'
        }
    ];

    let idx = 0;

    // function to render overlay from data[idx]
    function renderOverlay(n) {
        const data = carouselData[n];
        overlay.innerHTML = `
        <div class="flex items-center space-x-1 text-yellow-400">
          ${data.ratingHTML
                .split(' ')
                .map(s => `<span class="bg-yellow-400">${s}</span>`)
                .join('')}
        </div>
        <p class="text-sm font-[figtree]">${data.description}</p>
        <p class="font-bold font-[Marcellus]">${data.name}</p>
        <p class="text-xs uppercase tracking-wide font-[playfair]">- ${data.job}</p>
      `;
    }

    // function to show slide n and update overlay
    function show(n) {
        slides.forEach((slide, i) => {
            if (i === n) {
                slide.classList.remove('hidden', 'opacity-0');
            } else {
                slide.classList.add('opacity-0');
                setTimeout(() => slide.classList.add('hidden'), 1000);
            }
        });
        renderOverlay(n);
    }

    // initial paint
    renderOverlay(0);

    // auto-advance every 5s
    setInterval(() => {
        idx = (idx + 1) % slides.length;
        show(idx);
    }, 5000);
});
