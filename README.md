# Proj-cpu-mem-usage
Python based project to get cpu usage and memory using a docker container
can be used to run on any linux based host .

The backend is written in python 
The frontend is written in nodejs 
It has a nginx proxy 

**Steps to build docker images** 

`docker build -t python-container -f ./Dockerfile . 
`

`docker build -t nodejs-container -f ./nodejs/Dockerfile .
`

`docker build -t nginx-container -f ./nginx/Dockerfile .
`

**To run the built docker images** 

`docker run --name python-container python-container
`

`docker run --name nodejs-container nodejs-container
`

`docker run --name nginx-container -p 80:80 --link nodejs-container --link python-container nginx-container
`

Added Jenkins file to automate the run 
