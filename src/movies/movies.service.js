const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const mapCritic = mapProperties({
  critic_id: "critic.critic_id",
  prefered_name: "critic.prefered_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  "c.created_at": "critic.created_at",
  "c.updated_at": "critic.updated_at",
})

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

function reviews (movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*", "c.created_at as c.created_at", "c.updated_at as c.updated_at")
    .where({ movie_id })
    .then(reviews => reviews.map(mapCritic));
}

module.exports = {
  list,
  showingList,
  read,
  showings,
  reviews,
}