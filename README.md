# teachu-client

Client for TeachU

## Installation

npm install in the root directory of the repository

## Run the project

ng serve in the root directory of the repository
maybe change Backend URL in environment.ts

## Docker

Use these two commands to run the teachu-client via docker. This can not be used for development!<br>

1. `docker build . --tag teachu-client --force-rm --no-cache`
2. `docker run -it -v "path/to/teachu-client":/teachu-client -p="80:80" teachu-client`

By default, the project is built with the development config. If you want to use another config,
add `"--build-arg ngConfig=<configName>"` at the end of the build command. 
