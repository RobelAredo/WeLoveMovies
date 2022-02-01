# WeLoveMovies Backend Application

This is the Back End Application for the WeLoveMovies project.

Check out the full working application here: https://welovemovies-frontendserver.herokuapp.com

Check out the backend application here: https://welovemovies-backendserver.herokuapp.com

Some valid routes are:
* /movies
* /movies/:movieId
* /theaters
* /reviews

For all routes and valid methods checkout the controller.js files.

## Getting Started:
1. Fork/Clone this repository
1. Run `npm install`
1. Run `mv env.sample .env`
1. Inside your .env file add your database url (Must be a Postgres database).
1. Run `npx knex migrate:latest`
1. Run `npx knex seed:run`
1. Run `npm start`
