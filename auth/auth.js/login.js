document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const popup = document.getElementById('successPopup');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);

                // show the overlay
                popup.classList.remove('hidden');
                popup.classList.add('flex');

                // ive the browser one paint to apply the flex layout
                await new Promise(r => requestAnimationFrame(r));

                // redirect after 2s
                setTimeout(() => {
                    window.location.href = '../dashboard-pages/dashboard.html';
                }, 2000);

            } else {
                alert('Login failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error, try again.');
        }
    });
});