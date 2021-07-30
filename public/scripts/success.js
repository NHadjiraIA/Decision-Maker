$(document).ready(function() {
  $(() => {
    var admin_link  = sessionStorage.getItem('admin_link');
    var submit_link  = sessionStorage.getItem('submit_link');
    console.log(admin_link);
    $('#linkAdmin').text(admin_link);
    $('#linkVote').text(submit_link);



  });

})
