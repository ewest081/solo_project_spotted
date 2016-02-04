//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              API Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');
var path = require('path');
var pg = require('pg');

var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spotted_database';

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              API Routes
//[][][][][][][][][][][][][][][][][][][][][][][][][][]

router.post('/registerUser', function(request, response){
  // console.log(request.query);

  var newUser = {username: request.query.username,
                password: request.query.password,
                first_name: request.query.first_name,
                last_name: request.query.last_name,
                email: request.query.email};

  pg.connect(connectionString, function(err, client){

      var query = client.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)', [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email]);

      query.on('end', function(){
          client.end();
          response.send('register_success');
      });

      if(err) {
          console.log(Error);
      }
    });
});

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Exports
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
module.exports = router;
