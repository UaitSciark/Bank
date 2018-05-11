var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Bank');
var index = require('./routes/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', index);


var port = 3001;
app.listen(port, ()=>
{console.log("Server starts at port:", port)})
module.exports = app;
