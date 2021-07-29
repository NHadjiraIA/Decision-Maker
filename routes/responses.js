/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get all responses
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM responses;`)
      .then(data => {
        const responses = data.rows;
        res.json({ responses });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // add a response
  router.post("/", (req, res) => {
        var response_position = req.body.response_position;
        var visitor_name = req.body.visitor_name;
        var poll_id = req.body.poll_id;
        var choice_id = req.body.choice_id;
        db.query(`insert into responses (response_position, visitor_name,poll_id, choice_id) values ('${response_position}', '${visitor_name}', '${poll_id}', '${choice_id}');`,(err, success) => {
          if (err) {
              return res.send(err)
          } else {
              console.log('response added')
              res.send('response added')
          }
      })

      });
  // get response by poll_id to display this choices for the visitor  after he click on the sub_link
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
