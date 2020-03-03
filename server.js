var express = require('express');
var http = require('http');
var socketio = require('socket.io');

//const PluginManager = new require('./plugins/PluginManager')();


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
  socket.on('JOINED', function(name){
    console.log('JOINED:' + name);

    //send the new person previous messages
    for(var i = 0; i<previous_messages.length;i++){
      socket.emit('chat message',previous_messages[i])
    }

    socket.emit('chat message',    {name:'Server',message:name+", welcome to the chat",timestamp:new Date()}) //send to newly connected guy
    socket.broadcast.emit('chat message',    {name:'Server',message:name+", has joined",timestamp:new Date()}) //send to everyone else
  });
  socket.on("MSSG1",function(msg){
    //print out
    console.log(msg);

    //run any plugin functiolnality on tihs message
    //msg.message = PluginManager.runChatPlugins(msg.message)

    //save to log of previous messages
    previous_messages.push(msg);
    console.log(previous_messages)
    //send to the other connected clients
    socket.emit('chat message',msg);
    socket.broadcast.emit('chat message',msg);
  })
});
