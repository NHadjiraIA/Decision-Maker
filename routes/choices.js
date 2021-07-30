/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get all choices
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM choices;`)
      .then(data => {
        const choices = data.rows;
        res.json({ choices });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // add a choice
  router.post("/", (req, res) => {
        var choice_title = req.body.choice_title;
        var choice_description = req.body.choice_description;
        var poll_id = req.body.poll_id;
        db.query(`insert into choices (choice_title, choice_description,poll_id) values ('${choice_title}', '${choice_description}', '${poll_id}');`,(err, success) => {
          if (err) {
              return res.send(err)
          } else {
              console.log('choice added')
              res.send('choice added')
          }
      })

      });
  // get choices by poll_id to display this choices for the visitor  after he click on the sub_link
  router.get("/:poll_id", (req, res) => {
    db.query(`
    SELECT polls.poll_question, choice_title, choice_description
    FROM choices
    JOIN polls ON choices.poll_id = polls.poll_id
    WHERE polls.poll_id = ${req.params.poll_id};`)
      .then(data => {
        const choices = data.rows;
        res.json({ choices });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
