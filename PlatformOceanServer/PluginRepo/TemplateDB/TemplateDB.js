class TemplateDB{
  //storing all users and message logs in memory instead of database software


  constructor(){
    this.loadConfig()
    this.prepareUserDB()
    this.prepareMsgDB()
  }
  loadConfig(){
    var config = require('./config.json');
    this.uname = config['uname'];
  }
  prepareUserDB(){
    // set up a table to contain users
    this.updated = "";
  }
  prepareMsgDB(){
    // set up a table to contain messages
  }

  addMessage(message){
    // add a message (in its incoming format) to the message table
    // messages shall be indexed by an integer id.
  }
  getAllMessages(){
    // return a javascript list containing message objects
  }
  getMessage(i){
    // get message in table indexed by value i
  }

  addUserColumn(property_list){
    this.userProps = this.userProps.concat(property_list)
    //updates the definition of a user.
  }
  addUser(uname){
    // add a user with the name uname
    // users take the form of a json object using the properties in this.userProps
    // initialise with default values of each userProp
  }
  getUser(uname){
    // get user with specified uname
    // return as json object {index: i,row:<relevant_user_object>}
  }

  updateUser(usr){
    // takes in user object in form returned by getUser
    // updates this users row in the database.
  }
}

module.exports = TemplateDB
