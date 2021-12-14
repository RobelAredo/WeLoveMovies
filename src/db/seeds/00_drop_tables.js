module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(() => knex("movies_theaters").del())
    .then(() => knex("critics").del())
    .then(() => knex("movies").del())
    .then(() => knex("theaters").del())
    .then(() => knex.raw("alter sequence critics_critic_id_seq restart with 1"))
    .then(() => knex.raw("alter sequence movies_movie_id_seq restart with 1"))
    .then(() => knex.raw("alter sequence reviews_review_id_seq restart with 1"))
    .then(() => knex.raw("alter sequence theaters_theater_id_seq restart with 1"))
  };
