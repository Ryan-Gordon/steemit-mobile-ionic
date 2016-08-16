# STEEM Mobile. Social media meets the blockchain. Built with Ionic!


![alt](http://i.imgur.com/7wjXCv8.png)

This app provides a gateway to the steemit with 3 views for hot, trending and new content in addition to price information for both Steem and Steem Dollars

Included is splashscreen, icon, various plugins and each components code (HTML,SCSS,TS) are grouped into their own folders so you can pick and choose any component you like for your own app.

Languages and Plugins used to create the app:
  - TypeScript
  - Poloniex API
  - Steem JS Restful API  
  
  
# Installation guide:

Included in the repo is a android APK however to create an iOS app package or to compile any changes you will need to use the Ionic 2 beta CLI. To install the CLI open a terminal session and input the command :  
`$ npm install -g ionic@beta`  
sudo may be needed to successfully install dependings on the settings of your computer.

To build or run on android:  
`$ ionic build android`  `$ ionic run android`  

To build or run on android:  
`$ ionic build ios`  `$ ionic emulate ios` 
A target device can be speicifed using this command and without a target it will default to either a plugged in device or the device simulator.

Colour Scheme:
The colour scheme in the app is primarly blue as it is my favorite colour. Sass was used to build this app so by changing the value of $colours.primary in the app.core.scss file will change it within the whole app. Neat huh?

Restful API:
I made use of Fabiens Steem JS api made available on steemit.

Roadmap:  
*iOS and Windows App Packages added to the repo.  
*Login function.  
*Posting using the steemit app.  




## Donations:  
BTC:  144E1nQZH6mf1Y2jqvfYAHyF8y48jJTi1V  
STEEM:  Steem address will be added soon. If you want to show some love, please visit my post on steemit! 
