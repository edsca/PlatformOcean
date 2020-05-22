var fs = require('fs');

class Profile {

  privilegedUsers = []
  userProps = [{}]
  constructor(){
    //load config set parameters
    this.loadConfig()
  }

  loadConfig(){
    var config = require('./config.json');
    this.userProps = config['userProps'];
  }

  run(msgList,db){
    try{
      if(msgList[0].message.startsWith("pr.")){
        for(var i=0;i<this.userProps.length;i++){

          if(msgList[0].message.startsWith("pr."+this.userProps[i].property)){
            var usr = db.getUser(msgList[0].name);
            console.log(msgList[0].message.substring(this.userProps[i].property.length+4))
            usr.row[this.userProps[i].property]=msgList[0].message.substring(this.userProps[i].property.length+4)
            db.updateUser(usr)
            
            break
          }
        }
      }
    }catch(err){
      console.log(err)
    }

    return {"msgList":msgList,"db":db};
  }
}

module.exports = Profile
