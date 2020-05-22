fs = require('fs');
var parser = require('xml2json');

class PluginManager  {
  //import list of plug in functions from plugins.xml
  chatPluginList = []
  database = []
  constructor(){
    var data = fs.readFileSync('./plugins/plugins.xml','utf8');
    this.json = JSON.parse(parser.toJson(data, {reversible: true}));
    this.loadChatPlugins()
    this.loadDB()
  }

  loadChatPlugins(){

    var plugins = this.json['plugin_list']['chat_plugins']['plugin']

    for(var i=0;i<plugins.length;i++){
      var plugin = plugins[i]
      if(plugin.active['$t']=='yes'){

        var pluginloc = './plugins/'+plugin.id['$t']+'/'+plugin.id['$t']+'.js'
        var plg = require(pluginloc)
        this.chatPluginList.push(new plg())

      }
    }

  //console.log(this.chatPluginList)

  }
  loadDB(){
    var db = this.json['plugin_list']['database']['plugin']
    var dbloc = './plugins/'+db.id['$t']+'/'+db.id['$t']+'.js'
    var database = require(dbloc)
    this.database = new database()
    for(var i=0;i<this.chatPluginList.length;i++){

      if(this.chatPluginList[i].userProps!=null) this.database.addUserColumn(this.chatPluginList[i].userProps)
    }

  }

  runChatPlugins(msg){
    var msgList = [msg]
    for(var i = 0;i<this.chatPluginList.length;i++)
    {
      var state = this.chatPluginList[i].run(msgList,this.database)
      msgList = state.msgList
      this.database = state.db
    }
    return msgList
  }
}

module.exports = PluginManager;
