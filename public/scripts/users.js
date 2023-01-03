let user = {};

$(() => {

  $("#logout-button").click(() => {
    $("#login-button").show();
    console.log("click worked");
  });

  $.get('/users')
    .then(usersDataResponse => {
      const userID = usersDataResponse.userLoggedIn;
      
      usersDataResponse.usersData.forEach(element => {
        if (element.id == userID) {
          user = element;
        }

      });


      console.log('userObject', user);

      if (userID) {
        $('#login-button').hide();
        $('#register-button').hide();
        $('.right-navlinks').prepend(`Hello ${user.name.split(' ')[0]}`);
        $('.right-navlinks').append(`<button id="logout-button">Logout</button>`);
      }
    });



  // Login AJAX Post
  $("#login-submit").click(() => {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    $.get('/users')
      .then(usersResonse => {
        const usersData = usersResonse.usersData;

        for (userData of usersData) {
          if (email === userData.email && password === userData.password) {
            $.post('/users/login', { userID: userData.id })
              .then(() => {
                $.modal.close();
            $('#login-button').hide();
            $('#register-button').hide();
            $('.right-navlinks').prepend(`Hello ${user.name.split(' ')[0]}`);
            $('.right-navlinks').append(`<button id="logout-button">Logout</button>`);
          });
          }
        }
      });
  });

});


