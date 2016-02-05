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

router.get('/getUser/:username', function(request, response){
    var results = {'user': ''};

    pg.connect(connectionString, function(error, client){
      if(error) console.log(error);
      var query;
      query = client.query('SELECT * FROM users where username = $1', [request.params.username]);

      query.on('row', function(row){
        results.user = row;
      });

      query.on('end', function(){
        client.end();
        console.log(results);
        return response.json(results);
      });
    });

});


router.post('/registerUser', function(request, response){
  // console.log(request.query);

  var newUser = {username: request.query.username,
                password: request.query.password,
                first_name: request.query.first_name,
                last_name: request.query.last_name,
                email: request.query.email};

  pg.connect(connectionString, function(err, client){

      // var duplicate = client.query("SELECT username FROM users WHERE username = $1", [newUser.username]);
      // if(duplicate == newUser.username){
      //   console.log("Duplicate username");
      // }else{

      var query = client.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)', [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email]);

      query.on('end', function(){
          client.end();
          response.send('register_success');
      });

      if(err) {
          console.log(Error);
      }
    // }//here's your extra curly, idiot!
    });
});

router.post('/newEntry', function(request, response){
  // console.log(request.query);

  var newUser = {username: request.query.username,

              };

  pg.connect(connectionString, function(err, client){

      // var query = client.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)', [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email]);

      query.on('end', function(){
          client.end();
          response.send('Successful Entry Made!');
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
