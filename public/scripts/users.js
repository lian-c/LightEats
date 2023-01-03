// const loginUrl = "http://localhost:8080/login";
// const registerUrl = "http://localhost:8080/register";
// // Login and Register AJAX Functions.

$(() => {
  
  $('#logout').click(() => {
    $.post('/users/logout')
      .then(response => {
        $('#login-button').show()
        console.log(response);
  })
  
  });
  
  $.get('/users')
    .then(usersDataResponse => {
      const userID = usersDataResponse.userLoggedIn;
      let user = {};
      usersDataResponse.usersData.forEach(element => {
        if (element.id == userID) {
          console.log(typeof element);
          user = element;
        }

      });


      console.log('userObject', user);

      if (userID) {
        $('#login-button').hide();
        $('#register-button').hide()
        $('.right-navlinks').prepend(`Hello ${user.name.split(' ')[0]}`)
        $('.right-navlinks').append(`<button id="logout">Logout</button>`)
      }
    })



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
              .then($.modal.close());
          }
        }
      });
  });

});


