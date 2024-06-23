document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const eventForm = document.getElementById('eventForm');
    const participantList = document.getElementById('participantList');

    let token = null;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        alert(data.message);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            token = data.token;
            document.getElementById('auth').style.display = 'none';
            eventForm.style.display = 'block';
            fetchEvents();
        } else {
            alert(data.message);
        }
    });

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const event = document.getElementById('event').value;

        const response = await fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ name, event }),
        });

        const data = await response.json();
        alert(data.message);
        fetchEvents();
    });

    async function fetchEvents() {
        const response = await fetch('http://localhost:5000/events', {
            headers: { 'Authorization': token },
        });

        const events = await response.json();
        participantList.innerHTML = '';
        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.textContent = `${event.name} записался на ${event.event}`;
            participantList.appendChild(listItem);
        });
    }
});
