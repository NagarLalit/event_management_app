module.exports = (app) => {
    const event = require('../controllers/event.controller');

    // Add an event
    app.post('/events',event.create);

    // Get all the events
    app.get('/events',event.findAllEvents);

    // Get an event
    app.get('/events/:eventId',event.findOneEvent);

    // Update an event
    app.put('/events/:eventId',event.update);

    // Delete an event
    app.delete('/events/:eventId',event.delete);
};