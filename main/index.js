const express = require('express');
const app = express();
const path = require('path');
const moment = require("moment-timezone");
const session = require('express-session');

// Setup session middleware first
app.use(session({
    secret: 'a-cicak-aranyosak',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Setup view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'mywebpage/pages'));
app.use(express.static('mywebpage/pages'));

// Setup body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Now, define your routes
require('./mywebpage/route')(app);

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Oh oh.. Something went wrong.');
});

app.listen(3000, function () {
    console.log('Hello :3000');
});
