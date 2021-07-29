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
      .then(res =>{
        console.log("test")
        console.log(email)
        $("createPollForm").submit(function(event){
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
            // $.ajax({
            //   method:"POST",
            //   url:`${URL}/api/polls`,
            //   dataType: 'json',
            //   data: testJson
            // })
            // .then(res=> {
             testJson.user_email = email;
             const question = $('#pollQuestionId').val()
             testJson.poll_question = question;
             testJson.choices[0].title = $('#choice1Id').val()
             testJson.choices[0].description = $('#description1Id').val()
             testJson.choices[1].title = $('#choice2Id').val()
             testJson.choices[1].description = $('#description2Id').val()
             $.ajax({
              method:"POST",
              url:`${URL}/api/polls`,
              dataType: 'json',
              data: testJson
            })
            .then(res=> {
             console.log('this is the result of####@@@@@ *****************', res)

            })
            .catch((err)=>{
              console.log(`err loading articles: ${err}`)
            })
            .always(()=>{
                console.log(`I'll always say this nomatter what`)
            })

            })
            .catch((err)=>{
              console.log(`err loading articles: ${err}`)
            })
            .always(()=>{
                console.log(`I'll always say this nomatter what`)
            })
        console.log('submited')
        });
      })
      .catch((err)=>{
        console.log(`err loading articles: ${err}`)
      })
      .always(()=>{
          console.log(`I'll always say this nomatter what`)
      })
  console.log('submited')
  // });


});
