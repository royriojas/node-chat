var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(process.env.PORT);

app.use("/", express.static(__dirname + '/public'));