const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyPaser.json());

const dbConf = require('./config/config.database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConf.url).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Error connecting to database");
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Oraganize your events." });
});

require('./app/routes/event.routes')(app);

app.listen(3000, () => {
    console.log("Event app running");
});