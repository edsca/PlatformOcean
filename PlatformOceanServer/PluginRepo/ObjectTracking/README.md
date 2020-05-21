# Object Tracking

This plug-in manages allows users to keep track of things and their respective states

A list of object states in `config.json` determines a 'track' along which objects move. States must either be advanced by the user or by a trusted administrator.
## Commands

- `ot.initobject <name>`: instantiates object <name> in the first state and adds it to the sending user's profile.
- `ot.advance <name>`: advances object <name> by one step along the state track IFF the stateEffector is 'self'.
- `ot.adminvance <user>:<name>`: advances user <user>'s object <name> by one step along the state track IFF the stateEffector is 'admin'.
