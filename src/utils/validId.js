function validId (search) {
  return async (req, res, next) => {
    const id = Object.keys(req.params)[0];
    const item = id[0].toUpperCase() + id.slice(1, -2);
    const data = await search(req.params[id]);
    res.locals.data = data;
    if (!data || (!data.id && !data.length)) return next({ status: 404, message: `${item} cannot be found` });
    return next();
  }
}

module.exports = validId;