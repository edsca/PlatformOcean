var fs = require('fs');

class Approve {

  approvedUsers = []
  userProps = [{"property":"approved","default_value":false}]
  first_run = true;
  number_matched = 0
  constructor(){
    //load config set parameters
    this.loadConfig()
  }

  loadConfig(){
    var config = require('./config.json');
    this.approvedUsers = config['approvedUsers'];
  }

  run(msgList,db){
    console.log("running approval")
    if(this.first_run){
      console.log("first run")
      this.checkUsersForApproval(msgList,db)
    }
    try{
      if(msgList[0].message.startsWith("ap.")){
        if(msgList[0].message.startsWith("ap.approve")){
          var usr = db.getUser(msgList[0].message.substring(11))
          if(usr!=undefined){
            usr.row.approved=true
          }else{
            console.log("this user doesnt exist")
          }
        }
      }
    }catch(err){console.log(err)}
    //
    try{
      var usr = db.getUser(msgList[0].name)
      if(usr.row.approved){
        return {"msgList":msgList,"db":db};
      }else{
        return{"msgList":{},"db":db}
      }
    }catch(err){console.log(err)}
      return {"msgList":msgList,"db":db};
  }

//stinky code
  checkUsersForApproval(msgList,db){
    try{
      console.log("assigning known approved Users")
      for(var i=0;i<this.approvedUsers.length;i++){
        var usr = db.getUser(this.approvedUsers[i])
        if(usr!=undefined){
          usr.row.approved=true
          db.updateUser(usr)
          this.number_matched++
          if(this.number_matched==this.approvedUsers.length){
              //once all admins are in dont bother continuing to check
            this.first_run=false
            console.log("we've found all the approved users")
          }
        }
      }
    }catch(err){console.log(err)}
  }
}

module.exports = Approve
