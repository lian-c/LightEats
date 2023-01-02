$(() => {
  $("#menu-button").click(() => {
    $('main').empty();
    $('#menu-button').remove();
    $('nav').prepend(`<a href="/"><img class="home" src ="../images/the-slice-house-logo.png"></a>`);
    $('body,html').animate({scrollTop: $('main').offset().top}, 800);

    $.get('/menu')
      .then((response) => {
        const { pizzas, wings, dips, beverages } = response;

        $generateMenuItems("pizzas", pizzas);
        $generateMenuItems("wings", wings);
        $generateMenuItems("dips", dips);
        $generateMenuItems("beverages", beverages);
      });
  });
});


/*Helper function takes in two arguments:
1.the name of the menu sub-type, eg: pizza, as a string 
2.the array of all the items inside that sub-type, eg : array of pizzas 
then categorizes each item according to it's category and using JQuery inserts all menu items into the DOM
*/
const $generateMenuItems = (nameOfMenuSubType, menuSubType) => {

  $('main').append(`<section class="menu-container">
  <h3>${nameOfMenuSubType}</h3>
    <div class="${nameOfMenuSubType} menu-subtype">
    </div>
  </section>`);


  for (let eachItem of menuSubType) {
    $(`.${nameOfMenuSubType}`).append(`
                                <div class="menu-item">
                                <img class="menu-photo" src=${eachItem.food_photo_url}>
                                <div class="menu-details">
                                <p class="menu-item-name">${eachItem.name} </p>
                                <p class="menu-item-price">$${eachItem.price} </p>
                                </div>
                                </div>
                                `)
  }
};