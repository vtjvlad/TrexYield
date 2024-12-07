     const form = document.getElementById('registerForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://165.154.244.219/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                } else {
                    alert(`Ошибка: ${result.message}`);
                }
            } catch (err) {
                alert('Ошибка подключения к серверу');
                console.error(err);
            }
        });