$(() => {

  $.get('/menu/featured')
    .then(featured => {
      $('main').append(`<div class="cards"></div>`);
      
      for (featureItem of featured) {
        $('.cards').append(`
        <div class="card">
          <img src=${featureItem.food_photo_url}>
          <strong>${featureItem.name}</strong>
        </div>
        `)
      }


    });
});
