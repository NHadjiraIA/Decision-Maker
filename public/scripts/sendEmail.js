function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username : "<sender’s email address>",
    Password : "<email password>",
    To : 'jon2020@mailinator.com',
    From : "<sender’s email address>",
    Subject : "<email subject>",
    Body : "<email body>",
  })
  .then(function(message){
    alert("***********mail sent successfully")
  });
}
