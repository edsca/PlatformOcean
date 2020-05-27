var fs = require('fs');

class WorkAllocation {

  constructor(){
    //load config set parameters
    this.loadConfig()
  }
  loadConfig(){
    var config = require('./config.json');
    this.jobList = config['jobList'];
    this.numberJobs = this.jobList.length;
    this.userProps = config['userProps']
  }
  run(msgList,db){
    try{

      if(msgList[0].message.startsWith("wa.")){
        var waResponse = {name:"Server",message:"",timestamp:new Date()};

        if(msgList[0].message.startsWith("wa.joblist")){
          waResponse.message = "Current Jobs:\n"+JSON.stringify(this.jobList)+"\n";

        }
        else if(msgList[0].message.startsWith("wa.take")){
          //assign a job to self
          try{
            var jobIndex = parseInt(msgList[0].message.substring(8))
            this.jobList[jobIndex].assignee = msgList[0].name;

            waResponse.message = "Current Jobs:\n"+JSON.stringify(this.jobList)+"\n";
          }catch(err){
            waResponse.message = "invalid work allocation command"
          }
        }
        else if(msgList[0].message.startsWith("wa.addjob")){
          try{
            this.numberJobs = this.numberJobs+1;
            var description = msgList[0].message.substring(9)
            this.jobList.push({description:description,assignee:"None"})

            waResponse.message = "Current Jobs:\n"+JSON.stringify(this.jobList)+"\n";
          }catch(err){
            waResponse.message = "invalid work allocation command"
          }


        }
        else if(msgList[0].message.startsWith("wa.complete")){
          try{
            var jobIndex = parseInt(msgList[0].message.substring(11));
            if(this.jobList[jobIndex].assignee==msgList[0].name){
              this.jobList.splice(jobIndex,jobIndex);
              waResponse.message = "Current Jobs:\n"+JSON.stringify(this.jobList)+"\n";


              var usr = db.getUser(msgList[0].name);
              usr.row.jobsCompleted += 1;
              db.updateUser(usr);

            }
            else{
              waResponse.message = "This job is not assigned to you"
            }
          }catch(err){
            waResponse.message = "invalid work allocation command"
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
