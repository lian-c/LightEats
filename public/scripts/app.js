$(() => {
  
 
  $.get('/menu/featured')
    .then(featured => {
      $('main').append(`
      <div class="featured-items">
        <h1>Our Featured Items</h1>
        <div class="cards"></div>
      </div>
      `);

      for (featureItem of featured) {
        $('.cards').append(`
        <div class="card">
          <img src=${featureItem.food_photo_url}>
          <strong>${featureItem.name}</strong>
        </div>
        `)
      }


    });

    $(window).scroll(function() {
      let scroll = $(window).scrollTop();
      let header = $('.hero').height();
      if(scroll > header){
        $("nav").addClass("scroll")
        $(".home").hide();
      } else {
        $("nav").removeClass("scroll")
        $(".home").show();
      }
    });
});
