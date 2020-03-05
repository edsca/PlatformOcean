var fs = require('fs');

class WordFilter {

  filterList = []

  constructor(){
    //load config set parameters
    //something to import the filter list from json
    this.loadConfig()
  }
  loadConfig(){
    var config = require('./config.json');
    this.filterList = config['filterList'];
  }
  run(msg){
    for(var i = 0;i<this.filterList.length;i++)
    {
      msg = msg.split(this.filterList[i]).join("*");
      //msg = msg.replace(this.filterList[i],"*");
    }
    return msg;
  }
}

module.exports = WordFilter
