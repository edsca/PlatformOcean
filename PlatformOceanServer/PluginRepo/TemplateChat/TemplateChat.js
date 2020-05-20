var fs = require('fs');

class TemplateChat {

  // space for assigning values

  constructor(){
    // load config set parameters
    this.loadConfig()

  }

  loadConfig(){
    var config = require('./config.json');
    // assign values from customisable properties
  }

  run(msgList,db){
    // logic goes here
    // msgList[0] should always index the original senders message.
    // if new messages are required to be sent, push them onto msgList
    return {"msgList":msgList,"db":db};;
  }
}

module.exports = TemplateChat
