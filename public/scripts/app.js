$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $.ajax({
    method: "GET",
    url: "/api/polls"
  }).done((polls) => {
    for(poll of polls) {
      $("<div>").text(poll.poll_question).appendTo($("body"));
    }
  });
});



