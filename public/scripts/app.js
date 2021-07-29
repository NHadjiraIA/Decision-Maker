$(() => {
  const URL = "http://localhost:8080"
  $("#pollForm").submit(function(event){
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
            }
        ]
    }
    event.preventDefault();
      const email = $('#email').val()

     $.ajax({
        method:"POST",
        url:`${URL}/api/polls`,
        dataType: 'json',
        data: testJson
     })
      .then(res => {
        console.log(res)
        window.location.replace('/createpoll')
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
