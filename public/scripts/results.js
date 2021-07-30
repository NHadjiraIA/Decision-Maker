$(document).ready(function() {
  $(() => {
    const URL = "http://localhost:8080"
    var  poll_id = getUrlVars()["pollCode"];
    $.ajax({
      method: "GET",
      url: `${URL}/api/polls/${poll_id}`,
    }).done((poll) => {
      console.log(poll)
      $('.chartTitleContent').text(poll.QuestionWithChoicesOfPoll.questionPoll)
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
