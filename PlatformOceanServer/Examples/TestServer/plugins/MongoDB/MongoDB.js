var fs = require('fs')
const mongodb = require('mongodb');
var Sync = require('sync');

class MongoDB {

  userProps = [{"property":"uname","default_value":""}]
  async = true

  constructor(){
    this.loadConfig()

    this.MongoClient = mongodb.MongoClient;
    this.MongoClient.connect(this.url, function(err,db){
      console.log("we connected");
      db.close();
    })
  }
  loadConfig(){
    var config = require('./config.json');
    this.url = config['url'];

  }
  prepareUserDB(){
    this.backupUser = []
    console.log(this.userProps)
    this.MongoClient.connect(this.url, function(err,db) {
      if (err) throw err;
      var ourDB = db.db("platformOceanDB");
      ourDB.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User database created");
        db.close();
      });
    })
  }
  prepareMsgDB(){
    this.backupMsg = []
    this.MongoClient.connect(this.url, function(err,db) {
      if (err) throw err;
      var ourDB = db.db("platformOceanDB");
      ourDB.createCollection("messages", function(err, res) {
        if(err) throw err;
        console.log("message database created");
        db.close();
      });
    })
  }

  addMessage(message){
    this.MongoClient.connect(this.url, function(err,db) {
      console.log(message)
      if(err) throw err;
      var ourDB = db.db("platformOceanDB");
      ourDB.collection('messages').insertOne(message)
      db.close()
    })
  }
  async getAllMessages(){
    let db = await this.MongoClient.connect(this.url);
    var ourDB = db.db("platformOceanDB");
    let data = await ourDB.collection('messages').find({},{ name:1,message:1,timestamp:1, _id: 0}).toArray();
    await db.close()
    return data

  }
  getMessage(i){

  }
  addUserColumn(property_list){
    this.userProps = this.userProps.concat(property_list)
    console.log(this.userProps)
  }
  async addUser(uname){
    console.log(uname)
    var user = {}
    //is this already in the database
    for(var i = 0;i<this.userProps.length;i++){
      user[this.userProps[i].property]=this.userProps[i].default_value
    }
    user.uname=uname;

    this.MongoClient.connect(this.url, function(err,db) {
      console.log(user)
      if(err) throw err;
      var ourDB = db.db("platformOceanDB");
      ourDB.collection('users').insertOne(user)
      db.close()
    })
  }

  async getUser(uname){
    let db = await this.MongoClient.connect(this.url);
    var ourDB = db.db("platformOceanDB");
    let data = await ourDB.collection('users').findOne({name:{$eq:uname}},{});
    await db.close()
    return data
  }

  updateUser(usr){

  }
}


module.exports = MongoDB
