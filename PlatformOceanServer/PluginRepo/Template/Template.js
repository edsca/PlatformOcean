var fs = require('fs');

class Template {

  constructor(){

  }

  loadConfig(){

  }

  run(msgList,db){
    return {"msgList":msgList,"db":db};;
  }
}

module.exports = Template
