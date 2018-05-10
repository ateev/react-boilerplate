# Welcome to just another React Boilerplate.

## Setting up the project

0) [Install Docker](https://docs.docker.com/install/).


## Setting up the project [Dev]

1) Run `docker-compose build`

2) Run `docker-compose up`

3) Open [localhost](localhost:8182)

## Setting up the project [Prod]

1) Run `docker build -t reactBoilerplate .`

2) Run `docker run -d -it -p 8182:8182 --name=kz reactBoilerplate`
