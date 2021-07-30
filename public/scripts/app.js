
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

$(() => {
  // Vote Page
  if (document.getElementById('sortable')) {
    // $("#errorMsg").hide();
    let orderArray = [];
    $( "#sortable" ).sortable({
      create: function(event, ui) {
        orderArray = $(this).sortable('toArray');
        // console.log(orderArray);
      }
    });
    $( "#sortable" ).sortable({
    update: function(event, ui) {
      orderArray =   $(this).sortable('toArray');
      console.log(orderArray);
      }
    });
    $( "#sortable" ).disableSelection();

    // $( "#nameField" ).on("input", function() {
    //   $("#errorMsg").slideUp();
    // });
  }
});
