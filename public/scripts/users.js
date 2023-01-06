let user = {};

$(() => {

  $('.logout-button').click(() => {
    $.post('/users/logout')
      .then(response => {
        $('#login-button').show()
        $('#register-button').show()
        $(".logout-button").hide()
        $(".order-button").hide()
        $(".welcome").hide();
        $('#phone-email').show();
        console.log(response);
  })

  });
//placeholder when my orders is pressed
  $('.order-button').click(() => {
    $.post('/order')
      .then(response => {
        console.log(response);
  })
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
        $('#register-button').hide()
        $(".logout-button").show()
        $(".order-button").show()
        $('.right-navlinks').prepend(`<span class="welcome">Hello ${user.name.split(' ')[0]}</span>`)
        $('#phone-email').hide();
        $.modal.close()
      }
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
            .then($(".logout-button").show())
            .then($(".order-button").show())
            .then($('#phone-email').hide())
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

    // $("#register-submit").click(() => {
    //   const name = $("#registerName").val();
    //   const email = $("#registerEmail").val();
    //   const password = $("#registerPassword").val();
    //   const phone = $("#registerPhone").val();

    //   // $.get('/users')
    //   // .then(usersResonse => {
    //   //   const usersData = usersResonse.usersData;

    //   //   for(userData of usersData) {
    //   //     if (email === userData.email && password === userData.password) {
    //   //       $.post('/users/login', {userID: userData.id})
    //         .then($("#login-button").hide())
    //         .then($("#register-button").hide())
    //         .then($(".logout-button").show())
    //         .then($(".order-button").show())
    //         .then($('#phone-email').hide())
    //         .then($.modal.close())
    //         .then($('.right-navlinks').prepend(`<span class="welcome">Hello ${userData.name.split(' ')[0]}</span>`));
    //     }
    //   }

    // })

  //   $.post(loginUrl, { email: email, password: password }, (data, status) => {
  //     if (data.length !== 1) {
  //       return console.log("error", data);
  //     }

  // //     return console.log(data);

  //   });

  });



