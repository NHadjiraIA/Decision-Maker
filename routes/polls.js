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

  router.post("/test", (req, res) => {
    db.query(`select * from polls`)
    .then(data => {
      const poll = data.rows;
      res.status(200)
      .json({poll});
    });
  })

  // add a poll
  router.post("/", (req, res) => {
        var poll_question = req.body.poll_question;
        var user_email = req.body.user_email;
        userEmail=req.body.user_email;
        console.log("&&&&&&&&",req.body)
        console.log("this is a user email #######",user_email)
        var choices = req.body.choices;
        //generate guid code re
        var guid = getRandomInt(10000, 99999);
        //generate links
        var submission_link = 'http://localhost:8080/' + 'submission_page' +  '?pollCode='+guid;
        var admin_link = 'http://localhost:8080/' + 'admin_page' +'?pollCode='+guid;
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
                    console.log("choice added successfully")
                  });
                });
                sendEmail(msg);
                res
                .status(201)
                .json({ poll });
              })
          }
      })

      });
  // get poll by poll_id to display this poll for the visitor after click in the submission_link
  router.get("/:poll_id", (req, res) => {
    var choices = [];
    db.query(`
    SELECT *
    FROM polls
    JOIN choices ON choices.poll_id = polls.poll_id
    WHERE polls.poll_id = ${req.params.poll_id};`)
      .then(data => {
        const polls = data.rows;
        const QuestionWithChoicesOfPoll = dtoPoll(polls)
        res.json({ QuestionWithChoicesOfPoll });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
