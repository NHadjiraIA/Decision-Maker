// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const pollsRoutes = require("./routes/polls");
const choicesRoutes = require("./routes/choices");
const responsesRoutes = require("./routes/responses");
const widgetsRoutes = require("./routes/widgets");
//temporal const pollRoutes = require("./routes/poll");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/polls", pollsRoutes(db));
app.use("/api/choices", choicesRoutes(db));
app.use("/api/responses", responsesRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// temporal app.use("/poll", pollRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/createpoll", (req, res) => {
  res.render("createpoll");
});
app.get("/tanksPage", (req, res) => {
  res.render("thanksPage");
});

// app.get("/vote", (req, res) => {
//   res.render("poll");
// });

// app.get("/result", (req, res) => {
//   res.render("results");
// });

// app.get("/success", (req, res) => {
//   res.render("success");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
