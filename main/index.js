const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'mywebpage/pages'));

app.use(express.static('mywebpage/pages'));

require('./mywebpage/route')(app);

app.listen(3000, function () 
{
    console.log('Hello :3000');
});