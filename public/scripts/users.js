// const loginUrl = "http://localhost:8080/login";
// const registerUrl = "http://localhost:8080/register";
// // Login and Register AJAX Functions.

$(() => {

  $('#logout-button').click(() => {
    $.post('/users/logout')
      .then(response => {
        $('#login-button').show()
        $('#register-button').show()
        $("#logout-button").hide()
        $(".welcome").hide();
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

      // if (userID) {
      //   $('#login-button').hide();
      //   $('#register-button').hide()
      //   $('.right-navlinks').append(`<button id="logout">Logout</button>`)
      // }
    })



    // Login AJAX Post
    $("#login-submit").click(() => {
      const email = $("#loginEmail").val();
      const password = $("#loginPassword").val();

      $.get('/users')
      .then(usersResonse => {
        const usersData = usersResonse.usersData;

        for(userData of usersData) {
          if (email === userData.email && password === userData.password) {
            $.post('/users/login', {userID: userData.id})
            .then($("#login-button").hide())
            .then($("#register-button").hide())
            .then($("#logout-button").show())
            .then($.modal.close())
            .then($('.right-navlinks').prepend(`<span class="welcome">Hello ${userData.name.split(' ')[0]}</span>`));
        }
      }

    })

  //   $.post(loginUrl, { email: email, password: password }, (data, status) => {
  //     if (data.length !== 1) {
  //       return console.log("error", data);
  //     }

  //     return console.log(data);

    });

  });



