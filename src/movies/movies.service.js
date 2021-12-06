const { joinRaw } = require("../db/connection");
const knex = require("../db/connection");

function list () {
  return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
}

function showingList () {
  return knex("movies")
  .distinct("movie_id as id")
  .select("title", "runtime_in_minutes", "rating", "description", "image_url")
  .joinRaw("natural join movies_theaters")
  .where({ is_showing: true })
  .orderBy("movie_id");
}

function read (movie_id) {
  return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
    .where({ movie_id })
    .first()
}

function showings (movie_id) {
  return knex({ mt: "movies_theaters" })
    .joinRaw("natural join theaters t")
    .select("t.*")
    .where({ movie_id });
}

module.exports = {
  list,
  showingList,
  read,
  showings,
}