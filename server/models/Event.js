const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    event: String,
    createdBy: String,
});

module.exports = mongoose.model('Event', eventSchema);
