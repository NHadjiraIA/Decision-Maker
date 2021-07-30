/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const {insertResponsesBatch} = require('./helpers/helper.js');
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
        var visitor_name = req.body.visitor_name;
        var code_poll = req.body.code_poll;
        var choicesPositions = req.body.choicesPositions;
        var pollId = 0;
        db.query(`select * from polls where poll_code = '${code_poll}'`)
          .then(data =>{
            pollId = data.rows[0].poll_id;
            insertResponsesBatch(db, choicesPositions, visitor_name, pollId)
            .then(isSucceded =>{
              if(isSucceded){
                db.query(`SELECT * FROM responses`)
                .then(data => {
                  const response = data.rows;
                  res
                  .status(201)
                  .json({ response });
                  }).catch(err => {
                  res
                    .status(500)
                    .json({ error: err.message });
                  });
              }
            })
          });
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
