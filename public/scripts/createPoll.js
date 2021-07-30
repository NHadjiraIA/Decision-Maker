
$(() => {
  const URL = "http://localhost:8080"
  var emailAddress  = sessionStorage.getItem('emailAddress');
  console.log(emailAddress)
  $("#createPollForm").submit(function(event){

    const testJson = {
        poll_question: "which vegetables do you prefer?",
        user_email: "svthampuran@gmail.com",
        choices:[
            {
                title: "tomato",
                description: "d1 of tomato"
            },
            {
                title: "apple",
                description: "d2 of apple"
            },
            {
              title: "banana",
              description: "d2 of banana"
          }
        ]
    }
    event.preventDefault();
      const email = $('#email').val();
      testJson.user_email = email;
      const question = $('#pollQuestionId').val()
      testJson.poll_question = question;
      testJson.choices[0].title = $('#choiceOneId').val()
      testJson.choices[0].description = $('#descriptionOneId').val()
      testJson.choices[1].title = $('#choiceTwoId').val()
      testJson.choices[1].description = $('#descriptionTwoId').val()
      testJson.choices[2].title = $('#choicetherdId').val()
      testJson.choices[2].description = $('#descriptiontherdId').val()


     $.ajax({
        method:"POST",
        url:`${URL}/api/polls`,
        dataType: 'json',
        data: testJson
     })
      .then(res => {
        sessionStorage.setItem('admin_link', res.poll.submission_link);
        sessionStorage.setItem('submit_link', res.poll.administrative_link);
        sessionStorage.setItem('poll_id', res.poll.poll_id);
        window.location.replace('/success')
      })
      .catch((err)=>{
        console.log(`err loading articles: ${err}`)
      })
      .always(()=>{
          console.log(`I'll always say this nomatter what`)
      })
  console.log('submited')
  // });
    })

});


