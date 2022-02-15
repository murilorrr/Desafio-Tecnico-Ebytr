<h1 align="center">
  How to install
</h1>

# Contributing

Contributions, issues and feature requests are very welcome.

## Docker

If you have docker installed, you can run with:

```sh
docker-compose up
```

## Pre-requisites

- _Node:_ `^14.16.1` or higher.
- _Npm:_ `8.3.0` or higher.
- _Git:_ `2.25.1` or higher.

## Getting started

Clone the project from Github :

```sh
git clone git@github.com:murilorsv14/Desafio-Tecnico-Ebytr.git
cd Desafio-Tecnico-Ebytr
```

Install dependencies:

```sh
$ npm install
```

Run

```bash
$ npm start
```

If everything is ok, you will be able to open at:

```bash
http://localhost:3000
```

### Backend Architecture

We decided to follow some MSC to guide our backend architecture. Here is a quick glance of what we expect when of new contributions in the backend project. How we organize our project:

- `/back-end/src`: Source of all back-end;
  - `controller`: Is the layer that takes care of http requests to the server;
  - `service`: Is the layer that takes care of the application's business rules, it intermediates the information coming from the route to the model;
  - `model`: Is the layer that governs all the database, connections and queries;
  - `middleware`: Is a type of controller, but can be reused for authentication or error handling functions for example;
  - `routes`: This layer will tell which endpoint will operate for each controller;
  - `server`: Here our server is instantiated and identifies the routes and entities;
  - `test`: This layer makes everything, including coffee;

### Frontend Architecture


 - `public`: This layer has all the static files of the system made available by http;
 - `src`: Source of all front-end code;
   - `api`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `app`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `assets`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `components`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `pages`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `test`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
   - `utils`: Lorem ipsum dolor sit amet, consectetur adipiscing elit;
 


> This project has integration with LGTM automated code review


Thanks ❤️
