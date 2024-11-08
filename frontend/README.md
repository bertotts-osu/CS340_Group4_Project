# Project Frontend

## Overview
This directory houses the frontend of the application. The frontend is built with **REACT.js** and **Java** and is compiled using the **Vite** build tool. Below, you'll find the steps to run the application both in development and production environments.

### Prerequisites
- Ensure you have **Node.js** and **npm** installed. You can download and install them from [here](https://nodejs.org/). 
- Make sure **Vite** is installed globally: - npm install -g vite

## Development Setup Follow these steps to get the frontend running on a local machine for development:
- Set the host to 'localhost' in the **vite.config.js** file
- Add the following to the **scripts** section of the **package.json**
    - "dev": "vite", 
- Build the development environment with **Vite** 
    - npm run dev 
- Terminate development session
    - in **VSCode** terminal enter ctrl + C
    
## Production Setup 
Follow these steps to get the frontend running on the production server:
- Set the host and port in the **vite.config.js** file
- Install the **forever** library 
    - npm install forever -save 
- Set an alias for the **forever** library, so it is recognized on the server
    - alias forever='./node_modules/forever/bin/forever'
- Ensure there is a server script (will be used by Vite to serve the built files)
- Add the following to the **scripts** section of the **package.json**
    - "start": "vite",
    - "start:forever": "forever start -c 'node' ./<name of server script file>.js", 
    - "build": "vite build", 
- Generate the production build
    - npm run build 
- Server the Production Build 
    - npm run start:forever
- Terminate the production session (for linux server)
    - pkill -u $(whoami) -f 'node ./server.js'