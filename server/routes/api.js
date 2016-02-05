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
        // console.log(results);
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

  var newEntry = {user_id: request.query.user_id,
                username: request.query.username,
                date_submitted: request.query.date_submitted,
                category: request.query.category,
                common_name: request.query.common_name,
                scientific_name: request.query.scientific_name,
                location_country: request.query.location_country,
                location_state: request.query.location_state,
                location_county: request.query.location_county,
                year_spotted: request.query.year_spotted,
                month_spotted: request.query.month_spotted,
                day_spotted: request.query.day_spotted,
                is_group: request.query.group,
                number_in_group: request.query.number_in_group,
                individual_sex: request.query.sex,
                individual_age: request.query.age,
                individual_description: request.query.individual_description,
                sunny: request.query.sunny,
                overcast: request.query.overcast,
                raining: request.query.raining,
                snowing: request.query.snowing,
                foggy: request.query.foggy,
                windy: request.query.windy,
                other_weather: request.query.other_weather,
                temperature: request.query.temperature,
                additional_notes: request.query.additional_notes
              };

  pg.connect(connectionString, function(err, client){

      var query = client.query('INSERT INTO entries (user_id, username, date_submitted, category, common_name, scientific_name, location_country, location_state, location_county, year_spotted, month_spotted, day_spotted, is_group, number_in_group, individual_sex, individual_age, individual_description, sunny, overcast, raining, snowing, foggy, windy,other_weather, temperature, additional_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)', [newEntry.user_id, newEntry.username, newEntry.date_submitted, newEntry.category, newEntry.common_name, newEntry.scientific_name, newEntry.location_country, newEntry.location_state, newEntry.location_county, newEntry.year_spotted, newEntry.month_spotted, newEntry.day_spotted, newEntry.is_group, newEntry.number_in_group, newEntry.individual_sex, newEntry.individual_age, newEntry.individual_description, newEntry.sunny, newEntry.overcast, newEntry.raining, newEntry.snowing, newEntry.foggy, newEntry.windy, newEntry.other_weather, newEntry.temperature, newEntry.additional_notes]);

      console.log(query);

      query.on('end', function(){
          client.end();
          return response.send('Successful Entry Made?');
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
