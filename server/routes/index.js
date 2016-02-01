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

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Exports
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
module.exports = router;
