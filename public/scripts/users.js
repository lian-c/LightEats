// const loginUrl = "http://localhost:8080/login";
// const registerUrl = "http://localhost:8080/register";
// // Login and Register AJAX Functions.

$(() => {
  // Login AJAX Post
  $("#login-submit").click(() => {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    $.get('/users')
    .then(usersData => {

      for(userData of usersData) {
        if (email === userData.email && password === userData.password) {
          $.post('/users/login', {userID: userData.id})
          .then($.modal.close());
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

  // Register AJAX Post
//   $("#register-submit").click(() => {
//     const email = $("#registerEmail").val();
//     const password = $("#registerPassword").val();

//     $.post(
//       registerUrl,
//       { email: email, password: password },
//       (data, status) => {
//         if (data.length !== 1) {
//           return console.log("error", data);
//         }
//         $.modal.close();
//         return console.log(data);
//       }
//     );
//   });
// });
