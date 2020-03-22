# Frontend and Backend Documentation

## Backend / API Docu [README.md](https://github.com/Johannes-Vitt/Corona-QR-Tracker/tree/master/web/backend#api-documentation)

## POI Frontend Documentation [README.md](https://github.com/Johannes-Vitt/Corona-QR-Tracker/tree/master/web/poi_frontend#qrona---app)


## Install the App
- clone the repository
- Install Docker Compose as described [here](https://docs.docker.com/compose/install/)
- run ```docker-compose build``` followed by ```docker-compose up``` in this folder (Corona-QR-Tracker/web)
- ensure that the ports **80** for the frontend and **2222** for the api are open 
- ports and other environment configurations can be changed in ```docker-compose.yml```
- create an ```.env``` file, as described in this folder with the Database configuration that you want to use
