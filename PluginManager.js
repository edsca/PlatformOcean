fs = require('fs');
var parser = require('xml2json');

class PluginManager  {
  //import list of plug in functions from plugins.xml
  chatPluginList = []
  database = []
  constructor(){
    this.loadPlugins()
  }

  loadPlugins(){
    var data = fs.readFileSync('./plugins/plugins.xml','utf8');
    this.json = JSON.parse(parser.toJson(data, {reversible: true}));
    var plugins = this.json['plugin_list']['plugin']


    for(var i=0;i<plugins.length;i++){
      var plugin = plugins[i]
      if(plugin.active){
        var pluginloc = './plugins/'+plugin.id['$t']+'/'+plugin.id['$t']+'.js'
        var plg = require(pluginloc)
        if(plugin.type['$t']=="chat"){

          this.chatPluginList.push(new plg())}

        else if(plugin.type['$t']=="database"){this.database = new plg()}
      }
    }

    console.log(this.chatPluginList)
    console.log(this.database)
  }

  runChatPlugins(msg){
    for(var i = 0;i<this.chatPluginList.length;i++)
    {
      console.log(this.chatPluginList[i])
      msg = this.chatPluginList[i].run(msg)
    }
    return msg
  }
}

module.exports = PluginManager;
