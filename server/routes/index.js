/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');

var router = express.Router();
var connectionString = 'postgres://localhost:5432/spotted_database';

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Routes
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/fail', function(request, response){
    response.send('fail');
});

router.get('/success', function(request, response){
    response.send('success');
});

router.get('/getUser', function(request, response){
    console.log('Yahtzee!', request.user);
    console.log('Authorized:', request.isAuthenticated());
    response.send(request.user);
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail'
}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Exports
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
module.exports = router;
