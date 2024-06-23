// src/components/EventPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
    const [eventId, setEventId] = useState('');
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleRegisterForEvent = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/events/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user._id, eventId })
        });

        const data = await res.json();

        if (res.status === 200) {
            setEventId('');
            setError('');
            console.log('Registered for event:', data);
        } else {
            setError(data.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <form onSubmit={handleRegisterForEvent}>
                <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="Event ID" />
                <button type="submit">Register for Event</button>
            </form>
            {error && <p>{error}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default EventPage;
