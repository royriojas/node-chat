var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(80);

app.use("/", express.static(__dirname + '/public'));