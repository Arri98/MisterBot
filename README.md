# WIP Repository to simulate client load in videconfernce webapps.

Create files folder to add your own media to play.
Create folder drivers and donwloadn chrome drivers for your chrome version

Put your own scripts in the scripts folder and execute them.

TODO Documentation properly done
## Config params:
```
* config.browserPerContainer   Number of chrome browsers to launch
* config.headless              Headless mode: No GUI, set to true when creating docker image
* config.script                Selenium script in the script folder to launch when launching npm start
* config.chromeDriver          Chrome driver in the drivers folder
* config.videoFile             Your own video file to play
```
Config params are the default ones and some can be overwritten for each browser when creating the drivers
createDriver(params)

params overrides the config values.
Values that can be overwritten are:
```
* config.headless
* config.videoFile
```

IMPORTANT: It seems there is a bug with chrome so you can't use headless chrome with http pages.
By default chrome does not allow http pages to access the camera but if you override the configuration it only works
with non headless chrome, so it does not work with docker images as they do not have GUI.