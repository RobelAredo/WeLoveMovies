const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:movieId")
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;