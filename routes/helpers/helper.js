const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sendEmail(msg){
  sgMail
    .send(msg)
    .then((response) => {
      console.log("here", response)
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
}

function insertResponsesBatch(db, choicesPositions, visitor_name, pollId) {
  return new Promise((resolve, reject) => {
    console.log(choicesPositions);
    choicesPositions.forEach(choicePosition => {
      db.query(`insert into responses (response_position,visitor_name,poll_id, choice_id) values ('${choicePosition.positionChoice}', '${visitor_name}','${pollId}','${choicePosition.codeChoice}');`,(err, success) => {
        if(err){
          reject(false);
        }
      });
    });
    resolve(true);
  });
}

module.exports = {getRandomInt, sendEmail, insertResponsesBatch}
