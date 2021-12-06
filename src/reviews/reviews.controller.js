const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validId = require("../utils/validId")
// const review


module.exports = {
  delete: [asyncErrorBoundary(validId(service.delete)), destroy],
}