# Server
The server-side of Platform Ocean controls the overall functionality of the platform.

This system consists of three layers:
  1. Core: Handles the In/Out functionality and any other immutable server behaviour.
  2. Management: Provides a wrapper for the plug-ins as well as an interface by which they communicate with the core layer/I/O.
  3. Plug-ins:  Provide additional functionality to the server
  
## Navigation
- [Examples](Examples)
  - Contains individual Platform Ocean instances, preconfigured with plug-ins
- [MetaPlatform](MetaPlatform)
  - The starting point of all Platform Ocean instance.
  - Contains the core and management layer functionality of the Platform Ocean system.
- [PluginRepo](PluginRepo)
  - Contains the currently supported Platform Ocean Plug-ins.
