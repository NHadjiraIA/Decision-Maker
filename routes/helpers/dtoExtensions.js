function dtoPoll(poll) {
  if (!poll) {
    return null
  } else {
    responseChoices = []
    const keyPoll = Object.keys(poll);
    for (let i = 0; i < keyPoll.length; i ++){
      responseChoices.push({
        "idChoice": poll[i].choice_id,
        "titleChoice": poll[i].choice_title,
        "descriptionChoice": poll[i].choice_description
      })
    pollDto = {
      "id" : poll[0].poll_id,
      "questionPoll" : poll[0].poll_question,
      "codePoll": poll[0].poll_code,
      "administrativeLink" : poll[0].administrative_link,
      "responseChoices": responseChoices
    }

    }
    return pollDto;
  }
}

module.exports = {dtoPoll}
