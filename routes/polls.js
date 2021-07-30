/* eslint-disable camelcase */
/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {getRandomInt, sendEmail} = require('./helpers/helper.js');
const {dtoPoll} = require('./helpers/dtoExtensions.js');
let userEmail = undefined;

module.exports = (db) => {
  // get all polls
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM polls;`)
      .then(data => {
        const polls = data.rows;
        res
          .status(201)
          .json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Helper to get poll id from submit url
  const getPollId = function(submission_link) {
    return db.query(
      `SELECT poll_id, poll_question
      FROM polls
      WHERE submission_link = $1`, [submission_link]
    );
  };

  router.post("/test", (req, res) => {
    db.query(`select * from polls`)
    .then(data => {
      const poll = data.rows;
      res.status(200)
      .json({poll});
    });
  });

  // add a poll
  router.post("/", (req, res) => {
        var poll_question = req.body.poll_question;
        var user_email = req.body.user_email;
        userEmail = req.body.user_email;
        console.log("&&&&&&&&",req.body)
        console.log("this is a user email #######",user_email)
        var choices = req.body.choices;
        //generate guid code re
        var guid = getRandomInt(10000, 99999);
        //generate links
        var submission_link = 'http://localhost:8080/' + 'submission_page' +  '?pollCode=' + guid;
        var admin_link = 'http://localhost:8080/' + 'admin_page' +'?pollCode='+ guid;
        const msg = {
          to: user_email,
          from: 'bkh.hadjira@gmail.com',
          subject: 'your links generataed ',
          text: 'congratulations your poll created successfully and we generated these two links for you:  ',
          html: `<strong> Hi, <br>
                 congratulations your poll created successfully and we generated these two links for you:<br>
                 submission_link this link you can send it for your fiends or other persons for they give thier response : ${submission_link} <br>
                 the administrator link this link is for you to see the result of the vote:  ${admin_link} </strong>`,
        }
        console.log("links user and admin", submission_link);
        db.query(`insert into polls (poll_question,administrative_link, submission_link, user_email, poll_code) values ('${poll_question}', '${submission_link}', '${admin_link}', '${user_email}', '${guid}');`,(err, success) => {
          if (err) {
              return res.send(err)
          } else {
             db.query(`SELECT * FROM polls WHERE poll_code = '${guid}';`)
              .then(data => {
                const poll = data.rows[0];
                //add the choices
                choices.forEach(choice => {
                  db.query(`insert into choices (choice_title,choice_description, poll_id) values ('${choice.title}', '${choice.description}', '${data.rows[0].poll_id}');`,(err, success) => {
                    console.log("choice added successfully");
                  });
                });
                sendEmail(msg);
                res
                .status(201)
                .json({ poll, submission_link, admin_link });
              });
          }
      });

  });
  // route to choose on poll
  router.get("/submission_page?:pollCode", (req, res) => {
    const voterUrl = req.params.submission_link;
    getPollId(voterUrl)
      .then(result => {
        let poll_id = result.rows[0].poll_id;
        let poll_question = result.rows[0].poll_question
        db.query(`
        SELECT choices.choice_id, choices.choice_title, choices.choice_description, choices.poll_id
        FROM choices
        WHERE choices.poll_id = $1;`, [poll_id])
          .then(data => {
            const choices = data.rows;
            let templateVars = {poll_choices: choices, poll_question: poll_question};
            console.log(templateVars);
            res.render('choose_form', templateVars);
          });
      });
  });

  return router;
};
