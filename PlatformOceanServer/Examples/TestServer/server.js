var express = require('express');
var http = require('http');
var socketio = require('socket.io');


const Pm = require('./PluginManager');
const pm = new Pm();


var app = express();
var server = http.Server(app);
var websocket = socketio(server);

var config = require('./about.json');




server.listen(3000,"0.0.0.0", function(){
  console.log('listening on *:3000');
});

websocket.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('JOINED', function(name){
    console.log('JOINED:' + name);
    pm.database.addUser(name);
    //send the new person previous messages
    if(pm.database.async){
      pm.database.getAllMessages().then(data=>{
        for(var i = 0; i<data.length;i++){
          socket.emit('serverToClient',data[i])
        }
      })
    }
    else{
      var msgs = pm.database.getAllMessages()
      console.log(msgs)
      for(var i = 0; i<msgs.length;i++){
        socket.emit('serverToClient',msgs[i])
      }
    }

    socket.emit('config', config)
    socket.emit('serverToClient',    {name:'Server',message:name+", welcome to the chat",timestamp:new Date()}) //send to newly connected guy
    socket.broadcast.emit('serverToClient',    {name:'Server',message:name+", has joined",timestamp:new Date()}) //send to everyone else
  });
  socket.on("clientToServer",function(msg){

    //run any plugin functiolnality on tihs message
    msgList = pm.runChatPlugins(msg)
    try{
      uname  = msgList[0].name
      var usr = pm.database.getUser(msgList[0].name);
      console.log(usr.row)
      socket.emit('userUpdate',usr.row)
    }catch(err){console.log(err)}

    console.log(msgList)

    for(var i = 0;i<msgList.length;i++){
      //save to log of previous messages
      pm.database.addMessage(msgList[i]);
      //send to the other connected clients
      socket.emit('serverToClient',msgList[i]);
      socket.broadcast.emit('serverToClient',msgList[i]);
    }

  })
});
