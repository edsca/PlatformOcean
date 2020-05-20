#Plug-ins
Platform Ocean servers are customisable with plug-ins.
These plug-ins come in 2 forms at the moment.
1. ChatPlugins: These extend the I/O functionality of the server by parsing, interpreting and acting on messages sent between clients and servers.
  - Format is given in [TemplateChat](TemplateChat)
2. DatabasePlugins: These modify the way that the server handles the storage of data.
  - Format is given in [TemplateDB](TemplateDB)

## Plug-in format
Plug-ins consist of 2 files:
1. `<plugin_name>/<plugin_name>.js` handles the logic driving the plug-in.
2. `<plugin_name>/config.json` contains whatever user-defined meta data or customisable parameters is needed for this plug-in to behave. As an example, the [WorkAllocation](WorkAllocation) Plug-in currently tracks a property called `jobsCompleted`. This can be changed in `config.json` to track anything without effecting the internal workings.
