if (process.env.USER) require("dotenv").config();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json())

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// console.log("r.body")

app.use(notFound);
app.use(errorHandler);

module.exports = app;