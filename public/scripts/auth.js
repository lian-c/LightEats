const loginUrl = "http://localhost:8080/login";
const registerUrl = "http://localhost:8080/register";
// Login and Register AJAX Functions.

$(() => {
  // Login AJAX Post
  $("#login-submit").click(() => {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    console.log(email, password)
    $.post(loginUrl, { email: email, password: password }, (data, status) => {
      if (data.length !== 1) {
        return console.log("error", data);
      }
      $.modal.close();
      return console.log(data);

    });

  });

  // Register AJAX Post
  $("#register-submit").click(() => {
    const email = $("#registerEmail").val();
    const password = $("#registerPassword").val();
    const name = $("#registerName").val();
    const phone = $("#registerPhone").val();

    $.post(
      registerUrl,
      { name: name, phone: phone ,email: email, password: password },
      (data, status) => {
        if (data.length < 1) {
          return console.log("error", data);
        }
        $.modal.close();
        return console.log(data);
      }
    );
  });
});
