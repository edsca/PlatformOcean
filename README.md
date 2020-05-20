# Platform Ocean

Platform Ocean is a customisable social media meta-platform intended to better support groups in their efforts to self-organise.

The platform may be freely instantiated and modified with server-side plug-ins to tailor the platform's functionality to best suit requirements.

The design and development of the Platform Ocean meta-platform was the Final Year MEng Project of Edward Scaife at Imperial College London.

## Requirements and Usage
This project is implemented in Javascript using Node.js. Node.js, therefore, is required to run any of the code in this repository. It is available [here](https://nodejs.org/en/)

Mobile development has been enabled using [React Native](https://github.com/facebook/react-native) via [Expo](https://github.com/expo/expo).

To run any of the code in this repository:
1. Install Node.js from the above link.
2. Run command `npm install`
3. Run command `npm start`[^1]

[^1]: In the case of Expo based apps, you can run these on your device by installing the 'expo client' mobile app and scanning the QR code generated by npm start.
## Navigation

- [PlatformOceanServer](PlatformOceanServer)
  - Contains the Platform Ocean server-side implementation and plug-in architecture as well as the exemplar server instances generated.
  
- [PlatformOceanClient](PlatformOceanClient)
  - Contains the Platform Ocean client-side implementation and exemplar clients.

