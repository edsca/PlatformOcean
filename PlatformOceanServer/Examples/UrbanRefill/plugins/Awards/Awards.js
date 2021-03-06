var fs = require('fs')

class Awards {

  userProps = [{"property":"awards","default_value":[]}]

  constructor(){

    this.loadConfig()
  }

  loadConfig(){
    var config = require('./config.json');
    this.awards = config['awards'];

  }

  run(msgList,db){
    //if the database is updated by an action
    try{


      if(db.updated!=""){
        var usr = db.getUser(db.updated)


        for(var i=0;i<this.awards.length;i++){
          for(var j=0;j<this.awards[i].levels.length;j++){
            if(usr.row[this.awards[i].type]==this.awards[i].levels[j].requirement){
              var awardName = this.awards[i].type+":"+this.awards[i].levels[j].awardName
              usr.row.awards.push(awardName)
              console.log(usr.row)
            }
          }

        }

      }
    }catch(err){console.log(err)}
    return {"msgList":msgList,"db":db};;
  }
}

module.exports = Awards
