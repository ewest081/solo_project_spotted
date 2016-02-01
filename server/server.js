/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Server Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
// var passport = require('passport');
// var session = require('express-session');
var index = require('./routes/index');
// var localStrategy = require('passport-local').Strategy;

var app = express();
var connectionString = 'postgres://localhost:5432/spotted_database';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Server Functions
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/', index);
app.use(express.static('server/public/'));

app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("Listening on port" + app.get('port'));
});
