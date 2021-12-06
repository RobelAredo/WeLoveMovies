const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list (req, res) {
  data = req.query.is_showing == "true"
    ? await service.showingList()
    : await service.list();
  res.json({ data });
}

function validId (search) {
  return async (req, res, next) => {
    const data = await search(req.params.movieId);
    res.locals.data = data;
    if (!data || (!data.id && !data.length)) return next({ status: 404, message: "Movie cannot be found" });
    return next();
  }
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