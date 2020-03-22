# QRona 

A mobile and web app that allows you to generate PDF's with QR Codes which are scannable with the App. 
The scanned Codes are entered into a MongoDB.
The mobile app is written in react Native.

This project was created in the scope of the [#WIRVSVIRUS Hackathon](https://wirvsvirushackathon.org/) to fight Corona and track chains of infections.

## Setup

### Android-App
To get the android app running you first need to install node-modules. Go to the parent directory of the app and run the following command:

`npm install`

To run the app on android, run

`react-native run-android`

while having your android phone connected and usb debugging enabled.

### iOS-App
This is a react-native app. Please read [here](https://reactnative.dev/) on how to install React Native. 

Informations on how to install the app can be found [here](https://reactnative.dev/docs/getting-started).


### WebApp

- clone the repository
- Install Docker Compose as described [here](https://docs.docker.com/compose/install/)
- run ```docker-compose build``` followed by ```docker-compose up``` in this folder (Corona-QR-Tracker/web)
- ensure that the ports **80** for the frontend and **2222** for the api are open 
- ports and other environment configurations can be changed in ```docker-compose.yml```
- create an ```.env``` file, as described in this folder with the Database configuration that you want to use