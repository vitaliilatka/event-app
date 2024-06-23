const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

// Регистрация на мероприятие
router.post('/register', async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        let event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }

        event.participants.push(userId);
        await event.save();

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
