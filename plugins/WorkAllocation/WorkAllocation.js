var fs = require('fs');

class WorkAllocation {

  jobList = []
  numberJobs = 0
  userProps = {"property":"jobsCompleted","default_value":0}


  constructor(){
    //load config set parameters
    this.loadConfig()
  }
  loadConfig(){
    var config = require('./config.json');
    this.jobList = config['jobList'];
    this.numberJobs = this.jobList.length;
  }
  run(msg,db){
    try{
      if(msg.message.startsWith("wa.")){
        if(msg.message.startsWith("wa.joblist")){
          msg.message = "\n"+JSON.stringify(this.jobList)+"\n";
          msg.name = "Server";
        }
        else if(msg.message.startsWith("wa.take")){
          //assign a job to self
          var jobIndex = parseInt(msg.message.substring(8))
          this.jobList[jobIndex].assignee = msg.name;

          msg.message = "\n"+JSON.stringify(this.jobList)+"\n";
          msg.name = "Server";
        }
        else if(msg.message.startsWith("wa.addjob")){
          this.numberJobs = this.numberJobs+1;
          var description = msg.message.substring(9)
          this.jobList.push({description:description,assignee:"None"})

          msg.message = "\n"+JSON.stringify(this.jobList)+"\n";
          msg.name = "Server";
        }
        else if(msg.message.startsWith("wa.complete")){
          var jobIndex = parseInt(msg.message.substring(11));
          if(this.jobList[jobIndex].assignee==msg.name){
            this.jobList.splice(jobIndex,jobIndex);
            msg.message = "\n"+JSON.stringify(this.jobList)+"\n";

            var usr = db.getUser(msg.name);
            usr.row.jobsCompleted += 1;
            db.updateUser(usr);

          }
          else{
            msg.message = "This job is not assigned to you"
          }


        }
        else{
          msg.message = "invalid work allocation command"
        }
        msg.name = "Server";
      }
    }
    catch(err){}

    return msg;
  }
}

module.exports = WorkAllocation
