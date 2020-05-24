var fs = require('fs');

class ObjectTracking {


  constructor(){
    //load config set parameters
    this.loadConfig()
  }

  loadConfig(){
    var config = require('./config.json');
    this.states = config['states'];
    this.admins = config['admins']
    this.userProps = config['userProps']

  }

  run(msgList,db){
    try{
      if(msgList[0].message.startsWith("ot.")){
        if(msgList[0].message.startsWith("ot.initobject")){
          var objName = msgList[0].name+":"+msgList[0].message.substring(14)
          console.log("initialised object ")
          var obj =
            {"objName":objName,
            "state":this.states[0]
            }
          console.log(obj)
          var usr = db.getUser(msgList[0].name);
          usr.row.objects.push(obj);
          db.updateUser(usr);
        }
        else if(msgList[0].message.startsWith("ot.advance")){
          var objName = msgList[0].name+":"+msgList[0].message.substring(11)
          console.log(objName)
          var usr = db.getUser(msgList[0].name)
          // if object referenced exists in the users file
          for(var i = 0;i<usr.row.objects.length;i++){
            if(usr.row.objects[i].objName==objName){
              //are we permitted to make this state change
              if(usr.row.objects[i].state.stateEffector=="self"){
                for(var j=0;j<this.states.length;j++){
                  if(this.states[j].stateName==usr.row.objects[i].state.nextState){
                    if(usr.row.objects[i].state.final){
                      usr.row[this.userProps[1].property]+=1
                    }
                    usr.row.objects[i].state=this.states[j]

                    console.log(usr.row.objects[i])
                    db.updateUser(usr);
                    console.log(usr.row)
                    break
                  }
                }
              }
              break
            }
          }
        }
        else if(msgList[0].message.startsWith("ot.adminvance")){
          //comes in format ot.adminvance Name:Object
          console.log('ADMINVANCE')
          //only do this function if the person calling it is an admin
          if(this.admins.indexOf(msgList[0].name)>=0){
            var objName = msgList[0].message.substring(14)
            var uname = objName.split(":")[0]

            //go into the relevant persons file to change advance state
            var usr = db.getUser(uname);
            for(var i = 0;i<usr.row.objects.length;i++){
              if(usr.row.objects[i].objName==objName){
                console.log("made it here")
                //are we, as an admin, permitted to make this state change
                if(usr.row.objects[i].state.stateEffector=="admin"){
                  for(var j=0;j<this.states.length;j++){
                    if(this.states[j].stateName==usr.row.objects[i].state.nextState){
                      if(usr.row.objects[i].state.final){
                        usr.row[this.userProps[1].property]+=1
                      }
                      usr.row.objects[i].state=this.states[j]
                      console.log("this is broken")
                      db.updateUser(usr);
                      console.log(usr.row)
                      break
                    }
                  }
                }
                break
              }
            }
          }
          else{
            console.log("this person has not got permissions to do this")
          }

         }
      }
    }catch(err){console.log(err)}
    return {"msgList":msgList,"db":db};;
  }
}

module.exports = ObjectTracking
