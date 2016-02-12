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


router.post('/deleteEntry/:id', function(request, response){

    pg.connect(connectionString, function(error, client){
      if(error) console.log(error);
      var query;
      query = client.query('DELETE FROM entries WHERE id = $1', [request.params.id]);

      query.on('end', function(){
        client.end();
        response.send('delete_success');
      });
    });

});


router.get('/getSimpleList', function(request, response){
    var results = [];
    // console.log(request.query);

    pg.connect(connectionString, function(error, client){
      if(error) console.log(error);
      var query;
      query = client.query('SELECT * FROM entries WHERE user_id = $1 EXCEPT SELECT * FROM entries WHERE category != $2 ORDER BY common_name', [request.query.user_id, request.query.category]);

      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
        client.end();
        // console.log(results);
        return response.json(results);
      });
    });
});

router.get('/allUsers', function(request, response){
  var results = [];

  pg.connect(connectionString, function(error, client){
    if (error) console.log(error);
    var query;
    query = client.query('SELECT username FROM users');

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      client.end();
      // console.log(results);
      return response.json(results);
    });
  });

});

router.get('/getTableData', function(request, response){
    var results = [];
    // console.log(request.query);

    pg.connect(connectionString, function(error, client){
      if(error) console.log(error);
      var query;
      query = client.query('SELECT * FROM entries WHERE user_id = $1 ORDER BY id', [request.query.user_id]);

      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
        client.end();
        // console.log(results);
        return response.json(results);
      });
    });
});

router.get('/getComplexList', function(request, response){
    var results = [];
    // console.log(request.query);
    var search = {user_id: request.query.user_id,
                  category: request.query.category,
                  start_date: request.query.start_date,
                  end_date: request.query.end_date,
                  name_search: request.query.name_search,
                  location_search: request.query.location_search,
                  global_search: request.query.global_search
    };

    pg.connect(connectionString, function(error, client){
      if(error) console.log(error);

      var globalString = '';
      var nullDate = '';
      var query;

      if(search.global_search === false){
          globalString = 'user_id = ' + search.user_id + ' AND ';
      }

      if(search.start_date === 0 && search.end_date === 9999){
        nullDate = 'OR year_spotted IS NULL ';
      }

      query = client.query('SELECT * FROM entries WHERE ' + globalString + '(year_spotted BETWEEN $1 AND $2 ' + nullDate + ') AND (common_name LIKE $3 OR scientific_name LIKE $3) AND (location_country LIKE $4 OR location_state LIKE $4 OR location_county LIKE $4) EXCEPT SELECT * FROM entries WHERE category != $5 ORDER by common_name', [search.start_date, search.end_date, search.name_search, search.location_search, search.category]);


      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
        client.end();
        // console.log(results);
        return response.json(results);
      });
    });
});

router.get('/getKeyword', function(request, response){
  var results = [];
  // console.log(request.query);

  pg.connect(connectionString, function(error, client){
    if(error) console.log(error);
    var query;
    var globalString = '';

    if(request.query.global_search === false){
        globalString = 'user_id = ' + request.query.user_id + ' AND ';
    }

    query = client.query('SELECT * FROM entries WHERE ' + globalString + 'username LIKE $1 OR common_name LIKE $1 OR scientific_name LIKE $1 OR location_country LIKE $1 OR location_state LIKE $1 OR location_county LIKE $1 OR time_spotted LIKE $1 OR individual_sex LIKE $1 OR individual_age LIKE $1 OR individual_description LIKE $1 OR additional_notes LIKE $1 ORDER BY common_name', [request.query.keyword]);

    query.on('row', function(row){
      results.push(row);
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

      var query = client.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)', [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email]);

      query.on('end', function(){
          client.end();
          response.send('register_success');
      });

      if(err) {
          console.log(error);
          response.send('error');
      }
    });
});


router.post('/registerUpdate', function(request, response){
  // console.log(request.query);

  var updateUser = {id: request.query.id,
                username: request.query.username,
                password: request.query.password,
                first_name: request.query.first_name,
                last_name: request.query.last_name,
                email: request.query.email};

  pg.connect(connectionString, function(err, client){

      var query = client.query('UPDATE users SET username=$1, password=$2, first_name=$3, last_name=$4, email=$5 WHERE id=$6', [updateUser.username, updateUser.password, updateUser.first_name, updateUser.last_name, updateUser.email, updateUser.id]);

      query.on('end', function(){
          client.end();
          response.send('profile_update_success');
      });

      if(err) {
          console.log(Error);
      }
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
                time_spotted: request.query.time_spotted,
                is_group: request.query.group,
                number_in_group: request.query.number_in_group,
                individual_sex: request.query.individual_sex,
                individual_age: request.query.individual_age,
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

      var query = client.query('INSERT INTO entries (user_id, username, date_submitted, category, common_name, scientific_name, location_country, location_state, location_county, year_spotted, month_spotted, day_spotted, time_spotted, is_group, number_in_group, individual_sex, individual_age, individual_description, sunny, overcast, raining, snowing, foggy, windy,other_weather, temperature, additional_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)', [newEntry.user_id, newEntry.username, newEntry.date_submitted, newEntry.category, newEntry.common_name, newEntry.scientific_name, newEntry.location_country, newEntry.location_state, newEntry.location_county, newEntry.year_spotted, newEntry.month_spotted, newEntry.day_spotted, newEntry.time_spotted, newEntry.is_group, newEntry.number_in_group, newEntry.individual_sex, newEntry.individual_age, newEntry.individual_description, newEntry.sunny, newEntry.overcast, newEntry.raining, newEntry.snowing, newEntry.foggy, newEntry.windy, newEntry.other_weather, newEntry.temperature, newEntry.additional_notes]);

      query.on('end', function(){
          client.end();
          return response.send('entry_success');
      });

      if(err) {
          console.log(Error);
      }
    });
});

router.post('/updateEntry', function(request, response){

  var newEntry = {user_id: request.query.user_id,
                username: request.query.username,
                date_updated: request.query.date_submitted,
                category: request.query.category,
                common_name: request.query.common_name,
                scientific_name: request.query.scientific_name,
                location_country: request.query.location_country,
                location_state: request.query.location_state,
                location_county: request.query.location_county,
                year_spotted: request.query.year_spotted,
                month_spotted: request.query.month_spotted,
                day_spotted: request.query.day_spotted,
                time_spotted: request.query.time_spotted,
                is_group: request.query.group,
                number_in_group: request.query.number_in_group,
                individual_sex: request.query.individual_sex,
                individual_age: request.query.individual_age,
                individual_description: request.query.individual_description,
                sunny: request.query.sunny,
                overcast: request.query.overcast,
                raining: request.query.raining,
                snowing: request.query.snowing,
                foggy: request.query.foggy,
                windy: request.query.windy,
                other_weather: request.query.other_weather,
                temperature: request.query.temperature,
                additional_notes: request.query.additional_notes,
                id: request.query.id
              };

  pg.connect(connectionString, function(err, client){

      var query = client.query('UPDATE entries SET user_id=$1, username=$2, date_updated=$3, category=$4, common_name=$5, scientific_name=$6, location_country=$7, location_state=$8, location_county=$9, year_spotted=$10, month_spotted=$11, day_spotted=$12, time_spotted=$13, is_group=$14, number_in_group=$15, individual_sex=$16, individual_age=$17, individual_description=$18, sunny=$19, overcast=$20, raining=$21, snowing=$22, foggy=$23, windy=$24, other_weather=$25, temperature=$26, additional_notes=$27 WHERE id = $28', [newEntry.user_id, newEntry.username, newEntry.date_updated, newEntry.category, newEntry.common_name, newEntry.scientific_name, newEntry.location_country, newEntry.location_state, newEntry.location_county, newEntry.year_spotted, newEntry.month_spotted, newEntry.day_spotted, newEntry.time_spotted, newEntry.is_group, newEntry.number_in_group, newEntry.individual_sex, newEntry.individual_age, newEntry.individual_description, newEntry.sunny, newEntry.overcast, newEntry.raining, newEntry.snowing, newEntry.foggy, newEntry.windy, newEntry.other_weather, newEntry.temperature, newEntry.additional_notes, newEntry.id]);

      query.on('end', function(){
          client.end();
          return response.send('update_success');
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
