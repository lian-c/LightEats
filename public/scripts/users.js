let user = {};

$(() => {

<<<<<<< HEAD
  $('#logout-button').click(() => {
    $.post('/users/logout')
      .then(response => {
        $('#login-button').show()
        $('#register-button').show()
        $("#logout-button").hide()
        $(".welcome").hide();
        console.log(response);
  })

=======
  $("#logout-button").click(() => {
    $("#login-button").show();
    console.log("click worked");
>>>>>>> raheel
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

<<<<<<< HEAD
      // if (userID) {
      //   $('#login-button').hide();
      //   $('#register-button').hide()
      //   $('.right-navlinks').append(`<button id="logout">Logout</button>`)
      // }
    })
=======
      if (userID) {
        $('#login-button').hide();
        $('#register-button').hide();
        $('.right-navlinks').prepend(`Hello ${user.name.split(' ')[0]}`);
        $('.right-navlinks').append(`<button id="logout-button">Logout</button>`);
      }
    });
>>>>>>> raheel



    // Login AJAX Post
    $("#login-submit").click(() => {
      const email = $("#loginEmail").val();
      const password = $("#loginPassword").val();

      $.get('/users')
      .then(usersResonse => {
        const usersData = usersResonse.usersData;

        for(userData of usersData) {
          if (email === userData.email && password === userData.password) {
<<<<<<< HEAD
            $.post('/users/login', {userID: userData.id})
            .then($("#login-button").hide())
            .then($("#register-button").hide())
            .then($("#logout-button").show())
            .then($.modal.close())
            .then($('.right-navlinks').prepend(`<span class="welcome">Hello ${userData.name.split(' ')[0]}</span>`));
=======
            $.post('/users/login', { userID: userData.id })
              .then(() => {
                $.modal.close();
            $('#login-button').hide();
            $('#register-button').hide();
            $('.right-navlinks').prepend(`Hello ${user.name.split(' ')[0]}`);
            $('.right-navlinks').append(`<button id="logout-button">Logout</button>`);
          });
          }
>>>>>>> raheel
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



