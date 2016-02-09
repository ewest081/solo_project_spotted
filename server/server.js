/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Server Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var index = require('./routes/index');
var api = require('./routes/api');
var localStrategy = require('passport-local').Strategy;

var app = express();
var connectionString = 'postgres://localhost:5432/spotted_database';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              User Authentication
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    pg.connect(connectionString, function(err, client){
        var user = {};

        var query = client.query('SELECT * FROM users WHERE id = $1', [id]);

        query.on('row', function(row){
            user = row;
            done(null, user); //creates req.user
        });
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function(req, username, password, done){

    pg.connect(connectionString, function(err, client){
        var user = {};

        var query = client.query('SELECT * FROM users WHERE username = $1', [username]);

        query.on('row', function(row){
            user = row;
        });

        query.on('end', function(){
            if(user && user.password === password){
                done(null, user); //success
            } else {
                done(null, false); //fail
            }
            client.end();
        });
    });
}));

app.get('/logout', function(request, response){
  request.logout();
  response.send('/sign_in');
});

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Server Functions
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/api', api);
app.use('/', index);
app.use(express.static('server/public/'));

app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("Listening on port" + app.get('port'));
});
