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
  run(msgList,db){
    try{

      if(msgList[0].message.startsWith("wa.")){
        var waResponse = {name:"Server",message:"",timestamp:new Date()};

        if(msgList[0].message.startsWith("wa.joblist")){
          waResponse.message = "\n"+JSON.stringify(this.jobList)+"\n";

        }
        else if(msgList[0].message.startsWith("wa.take")){
          //assign a job to self
          var jobIndex = parseInt(msgList[0].message.substring(8))
          this.jobList[jobIndex].assignee = msgList[0].name;

          waResponse.message = "\n"+JSON.stringify(this.jobList)+"\n";

        }
        else if(msgList[0].message.startsWith("wa.addjob")){
          this.numberJobs = this.numberJobs+1;
          var description = msgList[0].message.substring(9)
          this.jobList.push({description:description,assignee:"None"})

          waResponse.message = "\n"+JSON.stringify(this.jobList)+"\n";

        }
        else if(msgList[0].message.startsWith("wa.complete")){
          var jobIndex = parseInt(msgList[0].message.substring(11));
          if(this.jobList[jobIndex].assignee==msgList[0].name){
            this.jobList.splice(jobIndex,jobIndex);
            waResponse.message = "\n"+JSON.stringify(this.jobList)+"\n";


            var usr = db.getUser(msgList[0].name);
            usr.row.jobsCompleted += 1;
            db.updateUser(usr);

          }
          else{
            waResponse.message = "This job is not assigned to you"
          }


        }
        else{
          waResponse.message = "invalid work allocation command"
        }
      waResponse.name = "Server";

      msgList.push(waResponse);
      }
    }
    catch(err){console.log(err)}
    return {"msgList":msgList,"db":db};;
  }
}

module.exports = WorkAllocation
