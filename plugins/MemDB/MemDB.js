class MemDB{
  //storing all users and message logs in memory instead of database software

  userProps = [{"property":"uname","default_value":""}]

  constructor(){
    this.loadConfig()
    this.prepareUserDB()
    this.prepareMsgDB()
  }
  loadConfig(){
    var config = require('./config.json');
  }
  prepareUserDB(){
    this.users = [];
  }
  prepareMsgDB(){
    this.messages = [];
  }
  addUserColumn(property_list){
    this.userProps.push(property_list)
  }
  addUser(uname){
    var user = {}
    //is this already in the database
    for(var i = 0;i<this.users.length;i++){
      if(uname==this.users[i].uname){
        console.log(this)
        return
      }
    }
    for(var i = 0;i<this.userProps.length;i++){
      user[this.userProps[i].property]=this.userProps[i].default_value
    }
    user.uname=uname;
    this.users.push(user);
  }
  addMessage(message){
    this.messages.push(message);
  }

  getUser(uname){
    console.log(this.users.length)
    for(var i = 0;i<this.users.length;i++){
      console.log(this.users[i].uname)
      if(this.users[i].uname==uname){

        return {index: i,row:this.users[i]}; //return object,index
      }
    }
  }

  updateUser(usr){
    this.users[usr.index] = usr.row;
    console.log('test')
  }
}

module.exports = MemDB
