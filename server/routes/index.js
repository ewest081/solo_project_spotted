/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Index Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var express = require('express');
var path = require('path');

var router = express.Router();

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