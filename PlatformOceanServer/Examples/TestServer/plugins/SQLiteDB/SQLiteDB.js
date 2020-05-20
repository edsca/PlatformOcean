var fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
class SQLiteDB {

  userProps = [{"property":"uname","default_value":""}]

  constructor(){
    this.loadConfig()
    //this.db = new sqlite3.Database('./plugins/SQLiteDB/SQLiteDB.db')
    this.db = new sqlite3.Database('./plugins/SQLiteDB/SQLiteDB.db')
    this.prepareUserDB()
    this.prepareMsgDB()


  }
  loadConfig(){
    var config = require('./config.json');
  }
  prepareUserDB(){
    this.db.run('CREATE TABLE IF NOT EXISTS users(uname text,data text)')

    this.updated = "";
  }
  prepareMsgDB(){
    this.db.run('CREATE TABLE IF NOT EXISTS messages(idx integer,msg text)')

  }

  addMessage(message){
    this.db = new sqlite3.Database('./plugins/SQLiteDB/SQLiteDB.db')
    this.db.run('INSERT INTO messages (msg) VALUES (?)',JSON.stringify(message))
    console.log(this.db)

  }
  getAllMessages(){
    console.log(this.db)
    var tmp = this.db.each("SELECT msg FROM messages")
    console.log(tmp)

    this.db.close()

  }
  getMessage(i){

  }
  addUserColumn(property_list){
    this.userProps.push(property_list)

  }
  addUser(uname){

  }

  getUser(uname){

  }

  updateUser(usr){

  }
}


module.exports = SQLiteDB
