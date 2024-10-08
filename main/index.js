const express = require('express');
const app = express();

app.use(express.static('mywebpage'));
app.listen(3000, function () 
{
    console.log('Hello :3000');
});