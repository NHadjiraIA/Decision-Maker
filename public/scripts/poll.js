$(document).ready(function() {
  $(() => {
    const URL = "http://localhost:8080"
    var  poll_id = getUrlVars()["pollCode"];
    console.log('ssssssssssss', poll_id)
    $.ajax({
      method: "GET",
      url: `${URL}/api/polls/${poll_id}`,
    }).done((poll) => {
      console.log(poll)
      $('.candidatequestion').text(poll.QuestionWithChoicesOfPoll.questionPoll)
      $('.choiceOneContent').text(poll.QuestionWithChoicesOfPoll.responseChoices[0].titleChoice)
      $('.choiceTwoContent').text(poll.QuestionWithChoicesOfPoll.responseChoices[1].titleChoice)
      $('.choiceTherdContent').text(poll.QuestionWithChoicesOfPoll.responseChoices[2].titleChoice)
      $('.candidateDescChoiceOne').text(poll.QuestionWithChoicesOfPoll.responseChoices[0].descriptionChoice)
      $('.candidateDescChoiceTwo').text(poll.QuestionWithChoicesOfPoll.responseChoices[1].descriptionChoice)
     // $('.candidateDescChoiceOneTherd').text(poll.QuestionWithChoicesOfPoll.responseChoices[2].descriptionChoice)

      console.log(poll.QuestionWithChoicesOfPoll.questionPoll)

      // for(user of users) {
      //   $("<div>").text(user.name).appendTo($("body"));
      // }
    });;


  });

  function getUrlVars()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }


})
