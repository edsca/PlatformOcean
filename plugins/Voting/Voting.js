class Voting {
  constructor(){
    //load config set parameters
    //something to import the filter list from json
    this.loadConfig()
  }
  loadConfig(){
    var config = require('./config.json');
    //this.filterList = config['filterList'];
  }
  run(msg){
    return msg;
  }

}



module.exports = Voting
