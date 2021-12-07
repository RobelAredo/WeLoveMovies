const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id : [ "movies", null, "movie_id"],
  title : [ "movies", null, "title" ],
  runtime_in_minutes : [ "movies", null, "runtime_in_minutes"],
  rating : [ "movies", null, "rating"],
  description : [ "movies", null, "description"],
  image_url : [ "movies", null, "image_url"],
  "m.created_at" : [ "movies", null, "created_at"],
  "m.updated_at" : [ "movies", null, "updated_at"],
});

function list () {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*", "m.created_at as m.created_at", "m.updated_at as m.updated_at")
    .then(reduceMovies)
}

module.exports = {
  list,
}