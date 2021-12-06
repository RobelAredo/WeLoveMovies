const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validId = require("../utils/validId")


module.exports = {
  delete: [asyncErrorBoundary(validId("Review", service.delete)), destroy],
}