/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Helper Function to get poll information given the poll Id (url type is either admin_url or voter_url)
  const checksubmUrlExists = function(urlcheck) {
    console.log('submissionUrl:', urlcheck);
    return db.query(
      `SELECT submission_link
        FROM polls
        WHERE submission_link = $1;`, [urlcheck]
    ).then((res) => {
      console.log(res.rows);
      return res.rows;
    });
  };

  // Helper Function to call PollId from submission URL
  const callPollId = function(submissionUrl) {
    return db.query(
      `SELECT poll_id, poll_question
      FROM polls
      WHERE submission_link = $1;`, [submissionUrl]
    );
  };

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


  // route to vote on poll
  router.get("/submission_link", (req, res) => {
    const submissionUrl = req.params.submission_link;
    // Check if the url exist in the database
    checksubmUrlExists(submissionUrl).then((response) => {
      // if is false then render:
      if (response.length === 0) {
        res.render('error_template');
      } else {
        callPollId(submissionUrl)
          .then(result => {
            let poll_id = result.rows[0].poll_id;
            let poll_question = result.rows[0].poll_question;
            db.query(`
          SELECT choices.title, choices.id, choices.poll_id
          FROM choices
          WHERE choices.poll_id = $1;`,[poll_id])
              .then(data => {
                const options = data.rows;
                let templateVars = {poll_options: options, question: poll_question};
                console.log(templateVars);
                res.render('submission_form',templateVars);
              });
          });
        }
      });
    });

    //route to manage the submission




  return router;
};






const express = require('express');
const router  = express.Router();


module.exports = () => {


  // route to submit a poll
  router.post("/", (req, res) => {
    res.send('to send poll to database and email to the owner of the poll')
  });

  // route to render admin and vote links
  router.get("/url/:id", (req, res) => {
    res.send('to see urls to vote and admin url');
  });

  // route to vote in the poll
  router.get('/vote/:url_vote', (req, res) => {
    res.send('page to vote');
  });

  // route  to submit the vote
  router.post('/url_vote', (req, res) => {
    res.send('submit the vote');
  });

  // route to check the results
  router.get("/admin/:url_admin", (req, res) => {
    res.send("shows the result");
  });

return router;
}
