$(() => {

  $.get('/menu/featured')
    .then(featured => {
      console.log("Response", featured);

    });
});
