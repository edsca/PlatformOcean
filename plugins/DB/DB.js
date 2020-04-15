class DB{
  //storing all users and message logs in memory instead of database software

  constructor(){
    this.loadConfig()
    this.loadUsers()
  }
  loadConfig(){
    var config = require('./config.json');
  }
  loadUsers(){
    var table = require('./DB.json');
    this.users = table["users"];
    this.messages = table["messages"];
  }
  addUser(uname){
    this.users.push({"name":uname});
  }
  addMessage(message){
    this.messages.push(message);
  }
}

module.exports = DB
