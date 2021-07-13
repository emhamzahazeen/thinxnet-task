# ThinkxNet Task
The project contains nodejs apis for the technical task for Senior Nodejs Developer Position

## Technical Details
Framework: NestJs

## Installation

```bash
$ npm install
```
## Running the dependencies

```bash
$ docker compose up

```

## Running the app

```bash
cp .env.sample .env

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
## Limitations
- For the purpose of the task the queue system is not synchronized with the database on restarts
- Limited tests due to limited time.
- Due to limited time api responses only contain http-code, in real systems the cqrs implementation demands an internal response management system.
- Http input validation is lacking at the api layer.
