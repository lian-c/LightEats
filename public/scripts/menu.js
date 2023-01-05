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

  $('main').on('click', '#addToCart-button', function() {
    // Add item to shopping cart modal
    $("#cart-modal .modal-body").append('<div class="shopping-cart-item">Example item </div>');

    // Show shopping cart modal
    $("#cart-modal").modal("show");
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

    let string = "ratings";
    if (eachItem.count === "1" ){
      string = "rating";
    };


    $(`.${nameOfMenuSubType}`).append(`
                                <div class="menu-item">
                                <img class="menu-photo" src=${eachItem.food_photo_url}>
                                <div class="menu-details">
                                <p class="menu-item-name">${eachItem.name} </p>
                                <p class="menu-item-price">$${eachItem.price} </p>

                              <button type="button" id="addToCart-button">
                                Add to Cart
                              </button>

                              <p>${starReviews(eachItem.rating)}</p>
                              <p>${eachItem.count} ${string} | ${eachItem.rating ||"Be the first to rate this item!"} </p>
                                </div>
                                </div>
                                `)
  }
};
/* <form name="addToCartForm" method="POST" action="/order">
<input type="submit" id="menuID${eachItem.id}" class="add-item" value="Add to cart"/>
</form> */

function starReviews(average) {
  // Round to nearest half
  rating = Math.round(average * 2) / 2;
  const stars = [];
  // solid stars
  for (let i = 1; i <= rating; i++){
    stars.push('<i class="fa-solid fa-star"></i>&nbsp;');
}
// half values
  if (rating % 1 !== 0) stars.push('<i class="fa-solid fa-star-half-stroke"></i>&nbsp;');
// empty stars out of 5
for (let x = (5 - rating); x >= 1; x--){
    stars.push('<i class="fa-regular fa-star"></i>&nbsp;');
}
  return stars.join('');
};
