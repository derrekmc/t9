# t9
t9 API that translates your phones t9 input to a text message.

npm install t9-rest-api


Basic usuage via express

app.js

var express = require('express');
var bodyParser = require('body-parser');

// include t9 npm here.
var t9 = require('t9-rest-api');

var app = express();
    app.use(bodyParser.json());

    // t9 API endpoint specified here.
    app.use('/api/wordCombinations', t9);

module.exports = app;
