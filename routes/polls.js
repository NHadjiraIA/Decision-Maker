/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get all polls
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM polls;`)
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // add a poll
  router.post("/", (req, res) => {
        var poll_question = req.body.poll_question;
        var user_id = req.body.user_id;
        var user_email = req.body.user_email;
        db.query(`insert into polls (poll_question, user_id,user_email) values ('${poll_question}', '${user_id}', '${user_email}');`,(err, success) => {
          if (err) {
              return res.send(err)
          } else {
              console.log('poll added')
              res.send('poll added')
          }
      })

      });
  // get links by poll_id to display this links for the user after he create the polls
  router.get("/:poll_id", (req, res) => {
    db.query(`SELECT administrative_link, submission_link, poll_id FROM polls WHERE poll_id = ${req.params.poll_id};`)
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
