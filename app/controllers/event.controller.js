const Event = require("../models/event.model");

// Create an event
exports.create = (req, res) => {
    if (!req.body.eventDescription) {
        res.status(400).send({
            message: "Event description cannot be empty"
        });
    }

    if (!req.body.eventDate) {
        res.status(400).send({
            message: "Event date cannot be empty"
        });
    }

    if (!req.body.eventRegistrationStartDate) {
        res.status(400).send({
            message: "Event registration start date cannot be empty"
        });
    }

    if (!req.body.eventRegistrationEndDate) {
        res.status(400).send({
            message: "Event registration end date cannot be empty"
        });
    }

    const event = new Event({
        eventTitle: req.body.eventTitle || "Untitled event",
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventRegistrationStartDate: req.body.eventRegistrationStartDate,
        eventRegistrationEndDate: req.body.eventRegistrationEndDate
    });

    event.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unable to save event due to some error"
        });
    });
};

// Get all events
exports.findAllEvents = (req, res) => {
    Event.find().then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unable to fetch events"
        })
    });
};

// Get an event
exports.findOneEvent = (req, res) => {
    Event.findById(req.params.eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                })
            }
            res.send(event);
        }).catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Error fetching event with id " + req.params.eventId
            });
        });
};

// Update an event
exports.update = (req, res) => {
    if (!req.body.eventDescription) {
        res.status(400).send({
            message: "Event description cannot be empty"
        });
    }

    if (!req.body.eventDate) {
        res.status(400).send({
            message: "Event date cannot be empty"
        });
    }

    if (!req.body.eventRegistrationStartDate) {
        res.status(400).send({
            message: "Event registration start date cannot be empty"
        });
    }

    if (!req.body.eventRegistrationEndDate) {
        res.status(400).send({
            message: "Event registration end date cannot be empty"
        });
    }

    Event.findByIdAndUpdate(req.params.eventId, {
        eventTitle: req.body.eventTitle || "Untitled event",
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventRegistrationStartDate: req.body.eventRegistrationStartDate,
        eventRegistrationEndDate: req.body.eventRegistrationEndDate
    }, {
        new: true
    }).then(event => {
        if (!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if (err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            })
        }
        return res.status(500).send({
            message: "Error updating event with id " + req.params.eventId
        });
    });
};

// Delete an event
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            res.send({ message: "Event deleted successfully" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Could not delete event with id " + req.params.eventId
            });
        });
};