const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const mapCritic = mapProperties({
  c_critic_id : "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
})

async function destroy (review_id) {
  // replacement for returning
  const reviewToDelete = await knex("reviews").where({ review_id });
  if (!reviewToDelete.length) return [];

  return knex("reviews")
    // .returning("*") not available in sqlite
    .where({ review_id })
    .del()
    .then(() => ["success"]);
}

async function update (review_id, body = { review_id }) {
  await knex("reviews as r")
    .where({ review_id })
    .update(body, "*")

  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*", "c.created_at as c_created_at", "c.updated_at as c_updated_at", "c.critic_id as c_critic_id")
    .where({ review_id })
    .first()
    .then(mapCritic);

}
module.exports = {
  delete: destroy,
  update,
}