const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validId = require("../utils/validId")

function destroy (req, res) {
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(validId(service.delete)), destroy],
  update: [asyncErrorBoundary(validId(service.update)), update],
}