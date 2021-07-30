// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
//   $.ajax({
//     method: "GET",
//     url: "/api/polls"
//   }).done((polls) => {
//     for (poll of polls) {
//       $("<div>").text(poll.poll_question).appendTo($("body"));
//     }
//   });
//   //});

//   $.ajax({
//     method:"POST",
//     url:`${URL}/api/polls`,
//     dataType: 'json',
//     data: testJson
//   })
//     .then(res => {
//       console.log(res);
//       window.location.replace('/createpoll');
//     })
//     .catch((err)=>{
//       console.log(`err loading articles: ${err}`);
//     })
//     .always(()=>{
//       console.log(`I'll always say this nomatter what`);
//     });
//   console.log('submited');
//   // });


// });

// $( "#nameField" ).on("input", function() {
//   $("#errorMsg").slideUp();
// });
//  }
//});

$(() => {
  // Vote Page
  if (document.getElementById('sortable')) {
    // $("#errorMsg").hide();
    let orderArray = [];
    $("#sortable").sortable({
      create: function(event, ui) {
        orderArray = $(this).sortable('toArray');
        // console.log(orderArray);
      }
    });
    $("#sortable").sortable({
      update: function(event, ui) {
        orderArray =   $(this).sortable('toArray');
        console.log(orderArray);
      }
    });
    $("#sortable").disableSelection();

    // $( "#nameField" ).on("input", function() {
    //   $("#errorMsg").slideUp();
    // });
  }
});


