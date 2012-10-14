var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var archive = require(__dirname + '/archive.js');

server.listen(process.env.PORT);

app.use("/", express.static(__dirname + '/public'));

app.get('/archive', function(req, res) {
  archive.get(function(error, data) {
    if(error === null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('msg', function (data) {
    archive.add(data, function(err) {
      if(err === null) {
        io.sockets.emit('new', data);
      } else {
        console.log(err);
        socket.emit(JSON.stringify({
          name : "SYSTEM",
          msg : "Error sending message."
        }));
      }
    });
  });
});