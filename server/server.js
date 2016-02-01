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

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Listening on port", port);
});