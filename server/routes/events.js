const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, async (req, res) => {
    const { name, event } = req.body;
    const newEvent = new Event({ name, event, createdBy: req.user.username });
    await newEvent.save();

    res.json({ message: 'Event created successfully' });
});

router.get('/', authenticate, async (req, res) => {
    const events = await Event.find({ createdBy: req.user.username });
    res.json(events);
});

module.exports = router;
