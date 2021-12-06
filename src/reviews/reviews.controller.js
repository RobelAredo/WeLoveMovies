const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validId = require("../utils/validId")

function destroy (req, res) {
  res.sendStatus(204);
}

function update (req, res) {
  const { data } = res.locals;
  res.json({ data });
}

module.exports = {
  delete: [asyncErrorBoundary(validId(service.delete)), destroy],
  update: [asyncErrorBoundary(validId(service.update)), update],
}