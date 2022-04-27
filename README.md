# Oscilation bot

This program aims to create a price oscilation bot with the following input arguments:

Currency Pair: The ticker value for the API to retrieve (ex: BTCUSD)
Oscilation Percentage: The amount of change from original price required for a notification to occur, in percentage (ex: 0.01%)
Fetching Interval: The interval(in seconds) for each API call to check the current price (ex:5)

## Prerequisites

1. NodeJS >=16.4.0
2. npm >=7.18.1
3. Docker and Docker-compose

## Installation process

```sh
npm i --force
```
The `--force` flag is required due to dependency issues in the jest library

## Database Setup

This project uses a MySQL database and sequelize library to interface between the backend application and the Database, this facilitates version managing for database objects

To create your database structure you need to adjust the configuration files: the `.env`, `..env.test.local` file using the` .env` as a basis.

To start the mysql docker service, that is a basis for the application, run:

```sh
docker-compose up mysql
```

To create the `development` database in your local environment (with mysql already running) just run the command:` npm run db:create` (for the test environment `npm run db:create:test`). It is necessary to create the test database to run the tests in the project.

To create migrations based on the project models, simply run the `npm run db:migrate:make` command to create all the migrations.

In case there aren't any new migrations just execute `npm run db:migrate` for development database and `npm run db:migrate:test` for test database, this will create all the tables in the database.

## Test Setup
Run the command `npm run test`. The tests are available in the database configured in the `.test.local` environment.

## Run local application
To run locally use command `npm run start` followed by the input arguments in the following format: CurrencyPair,OscilationPercentage,FetchingInterval ....
You can run it for multiple currencies by providing n arguments. (ex: `npm run start BTCUSD,0.01,5 ADAUSD,0.02,10 ETHUSD,0.03,15`).

## Run dockerized application
To run the dockerized application execute the docker-compose to build the enviroment.
```sh
docker-compose up
```
To change the arguments with which the dockerized application will run go to file `/scripts/startupScript.sh` and add the arguments following the `npm run start` command, then restart it with:

```sh
docker-compose up --build
```
## NPM scripts

* `npm run test`: Run tests & generate coverage report.
* `npm run db:create`: Create development database.
* `npm run db:create:test`: Create test database.
* `npm run db:migrate:make`: Detect models changes and create pending migrations.
* `npm run db:migrate`: Run pending migrations in development database.
* `npm run db:migrate:test`: Run pending migrations in Test Database.
* `npm run build`: Build the project and create folder `build` with the `js` version.
* `npm run start`: Start project in local enviroment with development .env variables.
* `npm run dockerbuild`: Build docker image of project.