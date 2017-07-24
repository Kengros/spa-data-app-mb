# Ken Gros Media - Data CRM (Angular 2 with D3)

## About

**THIS IS AN APPLICATION BUILT TO INGEST AND DISPLAY LARGE DATA SETS**

This application is:

1. Single page loading
2. Built in Angular 2
3. Visualizations built in D3.js
4. Secured with Auth0 (SAML ready)
5. Works with local and remote data sources
6. Can ingest and display data from JSON, CSV or Database
7. Can accept any D3.js chart or graph for visualization



# Setup - OSX



## Prerequisites

Below steps are needed only for the first time when you setup your OSX dev machine

**MAKE SURE YOU HAVE THE LATEST STABLE RELEASE OF OSX AND DEVELOPER ACCOUNT**

1. Install Xcode from https://developer.apple.com/download/ or use terminal:

    `xcode-select --install`

2. Install node.js server from https://nodejs.org/en/download/

3. Install git repository from https://git-scm.com/downloads

4. Install [homebrew](https://brew.sh/)

    `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

5. Clone this git repository locally. Make sure you CD to the correct folder. 

    `git clone https://github.com/riversandtechnologies/ui-platform.git`


## Setup Dnsmasq

1. Navigate to directory '/usr/local/etc/dnsmasq.conf'

2. Insert 'address=/<your-prefix>.com/127.0.0.1' into the file and save

3. Restart process with the following:

    `sudo launchctl stop homebrew.mxcl.dnsmasq`

   Then

   `sudo launchctl start homebrew.mxcl.dnsmasq`

4. Test DNS using the following:

    `dig machinename.<your-prefix>.com @127.0.0.1`

5. Confirm A record has been created. You should get a response of:

    `machinename.<your-prefix>.com. 0	IN	A	127.0.0.1`



## Setup nginx and auth-service

1. Navigate to **root** directory: 

   • Select finder icon 
   • Select 'Go' from top menu
   • Select 'Go To Folder'
   • In the dropdown enter '/'
   • Select 'Go' button to enter **root** directory

2. Unzip AuthSetup-Package from this repository and copy the platformsvc-authenticationsvc folder into **root** directory

3. Copy var folder into root **WARNING!!!** DO NOT OVERWRIVE EXISTING VAR FOLDER!!!

   • Select finder icon 
   • Select 'Go' from top menu
   • Select 'Go To Folder'
   • In the dropdown enter '/var/lib'
   • Select 'Go' button to enter **lib** directory in **root**
   • Open the unzipped AuthSetup-Package folder and then navigate to '/var/lib'
   • Copy 'rs' folder from AuthSetup-Package into OSX **root** '/var/lib' directory

4. Open \var\lib\rs\dataplatform\config\dataplatformpodconfig.json file and edit nginx section as below: 
   Provide node name as local system name. Example: <<machine-name>>.<your-prefix>.com

    • To find your Mac's machine-name, choose the apple icon from the top menu > “System Prefrences” > "sharing"
    • At the top of the pane you will see "Computers on your local network can access your computer at: <<machine-name>>.<your-prefix>.com"

  ```
  "nginx": 
      {
	 "sslEnabled": true,
         "sslPort": 443,
         "httpPort": 80,
         "nodes": 
         [
            "machinename.<your-prefix>.com"
         ]
      }
   }, 
   
   ```
   
 5. In codebase, update your **socket.io** config.js files to update as  https://<<machine-name>>.local. This is required to make socket.io work. Here is sample:  
 
    ```
    {
        "notificationManager" : {
            "url": "https://machinename.local"
        }
     },
     
     ```
    
6. Install nginx 

    • Open terminal and run

    `brew tap homebrew/nginx`

    • Add full permissions with

    `brew install nginx-full --with-auth-req`

    • Confirm install with

    `nginx -V`

7. Copy 'nginx.conf' file from unzipped AuthSetup-Package 'ngnix/conf' into '/usr/local/etc/nginx' and overwrite file in directory



## Run Nginx, auth-service and ui-platform app:

1. Make sure you don’t have port 80 running. Normally skype,SQL server or your local ISS consumes port 80. To stop IIS, run iisreset -stop. For skype, change skype’ s advanced options

2. In Terminal, run `sudo nginx`. Make sure nginx is running by running `sudo nginx` again and confirm the following errors:
    
    'nginx: [emerg] bind() to 0.0.0.0:443 failed (48: Address already in use)'
    'nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)'

    **Please note nginx should be listening on 0.0.0.0:443 & 0.0.0.0:80**

3. In Terminal, install pm2 with the follwoing command:

    `sudo npm install pm2 –g` 

4. In Terminal, go to '/platformsvc-authenticationsvc/src' and run 
   
   `pm2 start app.js --name="auth-service"`

5. All the developers running their local nginx need to do below change:

     - Go to '/platformsvc-authenticationsvc/src/server' folder and open 'passport.js' file. 
     - Search for "tenantId" and replace value there with “<your-project>”.
     - Restart your auth service in terminal `pm2 restart all`
     
6. Run your normal ui-platform using `npm run app` in project folder.

7. With this, when you open your browser with https://machinename.<your-prefix>.com it would redirect you to ask for auth0 authentication and further redirect you to the app.



## Install local dependencies
Below steps are needed every time you pull new changes, specially in the initial phase of the project. 
This MUST should be done within a command window opened at the project folder path

1. Install local npm dependencies
    
    `npm install`

npm and bower will not install the components for which the required/latest versions are already available locally, so there is no harm in running them



## Start the development server with live browser reloading

`npm start`

Use below url format to run main app:
     
    http://localhost:3000/
 