$(() => {
  $("#createPollForm").submit(function(event){
  const emailVal =  $('#email').val();
  var input = document.getElementById("email").value;
  console.log(typeof(emailVal))
  const email = sessionStorage.setItem('emailAddress', input)
  console.log('this is the email', input)
  console.log('this is the email@@@@@@@@@@@@@@@', email)
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });
});
});
