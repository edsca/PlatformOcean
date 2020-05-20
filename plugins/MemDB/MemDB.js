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
    this.updated = "";
  }
  prepareMsgDB(){
    this.messages = [];
  }

  addMessage(message){
    this.messages.push(message);
  }
  getAllMessages(){
    return this.messages;
  }
  getMessage(i){
    return this.messages[i];
  }

  addUserColumn(property_list){
    this.userProps = this.userProps.concat(property_list)
  }
  addUser(uname){
    console.log(uname)
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
  getUser(uname){

    for(var i = 0;i<this.users.length;i++){
      console.log(this.users[i].uname)
      if(this.users[i].uname==uname){

        return {index: i,row:this.users[i]}; //return object,index
      }
    }
  }

  updateUser(usr){
    this.updated = usr.row.uname;
    this.users[usr.index] = usr.row;
    console.log('test')
  }
}

module.exports = MemDB
