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

$("#poll_submit").submit(function(event) {
  // prevent the default behaviour to leave the page
//  event.preventDefault();
var formData = JSON.stringify($("#poll_submit").serializeArray());

   $.ajax({
     method: 'POST',
     url: '/api/polls',
    //  data: $(this).serialize()
     data: formData
   }).then(function(data) {
     console.log(data)

   })

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



