var express = require('express');
var http = require('http');
var socketio = require('socket.io');


var app = express();
var server = http.Server(app);
var websocket = socketio(server);

var previous_messages = []


server.listen(3000, function(){
  console.log('listening on *:3000');
});

websocket.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('JOINED', function(msg){
    console.log('JOINED:' + msg);

    //send the new person previous messages
    for(var i = 0; i<previous_messages.length;i++){
      socket.emit('chat message',previous_messages[i])
    }

    socket.emit('chat message',msg+", welcome to the chat") //send to newly connected guy
    socket.broadcast.emit('chat message',msg+" has joined") //send to everyone else
  });
  socket.on("MSSG1",function(msg){
    //print out
    console.log(msg);

    //save to log of previous messages
    previous_messages = [previous_messages, msg];
    //send to the other connected clients
    socket.emit('chat message',msg);
    socket.broadcast.emit('chat message',msg);
  })
});
