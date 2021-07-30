// $(() => {
//   const URL = "http://localhost:8080"
//   $("#pollForm").submit(function(event){
//     const testJson = {
//         poll_question: "which vegetables do you prefer?",
//         user_email: "svthampuran@gmail.com",
//         choices:[
//             {
//                 title: "tomato",
//                 description: "d1 of tomato"
//             },
//             {
//                 title: "apple",
//                 description: "d2 of apple"
//             }
//         ]
//       }
//         event.preventDefault();
//         const email = $('#email').val()

//        $.ajax({
//           method:"POST",
//           url:`${URL}/api/polls`,
//           dataType: 'json',
//           data: testJson
//        })
//         .then(res => {
//           console.log(res)
//           window.location.replace('/createpoll')
//         })
//         .catch((err)=>{
//           console.log(`err loading articles: ${err}`)
//         })
//         .always(()=>{
//             console.log(`I'll always say this nomatter what`)
//         })
//     console.log('submited')
//     // });
//       })

//   });
  //   }
  // });

  // $.ajax({
  //   method: "GET",
  //   url: "/api/polls"
  // }).done((polls) => {
  //   for(poll of polls) {
  //     $("<div>").text(poll.poll_question).appendTo($("body"));
  //   }
  // });
// });

// $("#poll_submit").submit(function(event) {
//   // prevent the default behaviour to leave the page
// //  event.preventDefault();
// var formData = JSON.stringify($("#poll_submit").serializeArray());

//    $.ajax({
//      method: 'POST',
//      url: '/api/polls',
//     //  data: $(this).serialize()
//      data: formData
//    }).then(function(data) {
//      console.log(data)

//    })

// });

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
