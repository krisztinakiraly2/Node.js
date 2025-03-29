const express = require('express');
const app = express();
const path = require('path');
const moment = require("moment-timezone");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'mywebpage/pages'));

app.use(express.static('mywebpage/pages'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./mywebpage/route')(app);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Oh oh.. Something went wrong.');
});

app.listen(3000, function () {
    console.log('Hello :3000');
});