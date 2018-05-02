const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    eventTitle: String,
    eventDescription: String,
    eventDate: Date,
    eventRegistrationStartDate: Date,
    eventRegistrationEndDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema, 'events');