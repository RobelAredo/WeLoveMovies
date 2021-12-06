function validId (item, search) {
  const id = item.toLowerCase() + "Id";
  return async (req, res, next) => {
    const data = await search(req.params[id]);
    res.locals.data = data;
    if (!data || (!data.id && !data.length)) return next({ status: 404, message: `${item} cannot be found` });
    return next();
  }
}

module.exports = validId;