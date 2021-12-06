const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const mapCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.prefered_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  "c.created_at": "critic.created_at",
  "c.updated_at": "critic.updated_at",
})

function destroy (review_id) {
  return knex("reviews")
    .returning("*")
    .where({ review_id })
    .del();
}

async function update (review_id, body) {
  await knex("reviews as r")
    .where({ review_id })
    .update(body, "*")

  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*", "c.created_at as c.created_at", "c.updated_at as c.updated_at")
    .where({ review_id })
    .first()
    .then(mapCritic);

}
module.exports = {
  delete: destroy,
  update,
}