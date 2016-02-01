/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Server Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');

var index = require('./routes/index');
var app = express();


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