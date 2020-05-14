var fs = require('fs');

class WordFilter {

  filterList = []
  userProps = null

  constructor(){
    //load config set parameters
    //something to import the filter list from json
    this.loadConfig()
  }
  loadConfig(){
    var config = require('./config.json');
    this.filterList = config['filterList'];
  }
  run(msgList,db){
    for(var i = 0;i<this.filterList.length;i++)
    {
      msgList[0].message = msgList[0].message.replace(new RegExp(this.filterList[i], 'gi'),"*");
      //msg = msg.replace(this.filterList[i],"*");
    }
    return {"msgList":msgList,"db":db};
  }
}

module.exports = WordFilter
