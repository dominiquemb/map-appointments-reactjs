# Appointment Scheduler Demo

[<img src="https://raw.githubusercontent.com/dominiquemb/dominiquemb.github.io/master/appointment-scheduler.gif" width="100%">](https://raw.githubusercontent.com/dominiquemb/dominiquemb.github.io/master/appointment-scheduler.mp4)

## Getting Started

In order to run the project you need ```Docker and Docker Compose```, if you already have them installed you can skip the step 1 and 2.

### 1. Install Docker

- [Install Docker](https://docs.docker.com/engine/installation/) in your machine for your corresponding OS.
- Verify your installation. Run:

```bash
$ docker --version
Docker version 17.03.0-ce, build 60ccb22
```

### 2. Install Docker Compose

- [Install Docker Compose](https://docs.docker.com/compose/install/) in your machine for your corresponding OS.
- Verify your installation. Run:

```bash
$ docker-compose --version
docker-compose version 1.22.0, build 1719ceb
```

## Running the application with docker

### 1. Build the application

```bash
$ docker-compose -f aws/dev/docker-compose.yml build
```

### 2. Running the application

```bash
$ docker-compose -f aws/dev/docker-compose.yml up
```

Then go to ```http://localhost:3000```.
