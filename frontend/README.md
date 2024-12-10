# Project Frontend

## Overview
This directory houses the frontend of the application. The frontend is built with **REACT.js** and **JavaScript** and is compiled using the **Vite** build tool. Below, you'll find the steps to run the application both in development and production environments.

### Prerequisites
- Ensure you have **Node.js** and **npm** installed. You can download and install them from [here](https://nodejs.org/). 
- Make sure **Vite** is installed globally: - npm install -g vite

## Development Setup Follow these steps to get the frontend running on a local machine for development:
- Add the following to the **scripts** section of the **package.json**
    - "dev": "vite", 
- Build the development environment with **Vite** 
    - npm run dev 
- Terminate development session
    - in **VSCode** terminal enter ctrl + C
    
## Production Setup 
Follow these steps to get the frontend running on the production server:
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

## Citation
- Date: 12/09/2024
- Based on: This project was developed with knowledge gained from the course React - The Complete Guide 2024 on Udemy. The use of the TanStack library and the general project structure were directly inspired from this course. The actual components and pages are original but are based on topics covered in the course.
- Source URL: https://www.udemy.com/course/react-the-complete-guide-incl-redux/
