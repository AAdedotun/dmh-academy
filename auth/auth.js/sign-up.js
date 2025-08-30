document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const popup = document.getElementById('signupSuccess');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all details');
            return;
        }

        try {
            const res = await fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);

                // show overlay
                popup.classList.remove('hidden');
                popup.classList.add('flex');

                // give the browser a paint cycle
                await new Promise(r => requestAnimationFrame(r));

                // redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = '../dashboard-pages/dashboard.html';
                }, 2000);

            } else {
                alert('Signup failed: ' + (data.error || 'Unknown error'));
            }

        } catch (err) {
            console.error(err);
            alert('Network error, try again.');
        }
    });
});