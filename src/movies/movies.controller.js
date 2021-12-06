const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");
const validId = require("../utils/validId");

async function list (req, res) {
  data = req.query.is_showing == "true"
    ? await service.showingList()
    : await service.list();
  res.json({ data });
}

function read (req, res) {
  const { data } = res.locals;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(validId(service.read)), read],
  readShowings: [asyncErrorBoundary(validId(service.showings)), read],
  readReviews: [asyncErrorBoundary(validId(service.reviews)), read],
}