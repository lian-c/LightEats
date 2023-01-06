$(() => {
  let totalCost = 0;
  //grabs the sessionStorage and into cart
  const sessionCart = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionCart.push(JSON.parse(value));
  }
  for (let item of sessionCart){
    $createCartHTML(item)
    totalCost += item.price;
    $(".total-amount").text(`Total: $${totalCost}.00`);
  }


  let user;
  $.get('/users')
    .then(usersDataResponse => {
      const userID = usersDataResponse.userLoggedIn;

      usersDataResponse.usersData.forEach(element => {
        if (element.id == userID) {
          user = element;
        }
      });
      console.log('userObject', user);

    })

  $("#menu-button").click(() => {
    $('main').empty();
    $('#menu-button').remove();
    $('nav').prepend(`<a href="/"><img class="home" src ="../images/the-slice-house-logo.png"></a>`);
    $('body,html').animate({ scrollTop: $('main').offset().top }, 800);

    $.get('/menu')
      .then((response) => {
        const { pizzas, wings, dips, beverages } = response;

        $generateMenuItems("pizzas", pizzas);
        $generateMenuItems("wings", wings);
        $generateMenuItems("dips", dips);
        $generateMenuItems("beverages", beverages);
      });
  });


  // Add to cart on click
  const menuOrderArray = [];


  $('main').on('click', '#addToCart-button', function () {
    // Add item to shopping cart modal

    const itemId = $(this).data('item-id');

    $.get(`/cart/${itemId}`)
      .then((menuItem) => {
   
        // Add item to shopping cart modal
        menuOrderArray.push(menuItem.id);
        $('#cart-summary').val(menuOrderArray);
        //helper function that adds item to cart
        $createCartHTML(menuItem);

         //save item to session  with menu id, and the object
         sessionStorage.setItem(itemId, JSON.stringify(menuItem));
        totalCost += menuItem.price; //updates the total cost
        $(".total-amount").text(`Total: $${totalCost}.00`);
        // Show shopping cart modal optional
        $("#cart-modal").modal("show");
      });

  });
  $('.cart-order').on('click', '.counter-btn', function () {
    const count = $(this).siblings('.count');
    let countNum = Number(count.text());
    const $cartItem = $(this).closest('.cart-items');
    const price = Number($cartItem.find('.menu-prices').text());
    console.log("price:", price)
    if ($(this).text() === '+') {
      countNum++;

      totalCost += price;
    } else {
      countNum--;
      totalCost -= price;
    }
    if (countNum === 0) {
      // Remove cart item
      $cartItem.remove();

    }
    count.text(countNum);

    // Update total cost
    $(".total-amount").text(`Total: $${totalCost}.00`);
  });
  ////
  $('#cart-modal').on('click', '.cart-remove-all', function () {
    $('.cart-order').empty();
    totalCost = 0;
    $(".total-amount").text(`Total: $${totalCost}.00`);
  });
});

//helper function
const $createCartHTML = (menuItem) => {

  $(".cart-order").append(`

  <div class="cart-items" value="${menuItem.id}">
  <div class="cart-img">
  <img src="${menuItem.food_photo_url}" style={{ height="120px" }} />
  </div>
  <div class="cart-content">
  <span class="menu-name">${menuItem.name}</span>
  </div>
  <div class="quantity">Quantity:</div>
  <div class="counter">
  <div class="counter-btn">-</div>
  <div class="count">1</div>
  <div class="counter-btn">+</div>
  </div>
  <div class="prices">Price:</div>
  $<span class="menu-prices">${menuItem.price}</span>.00
  <button class="btn btn-danger delete-button">Delete</button>
  </div>

   `);

}

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
    if (eachItem.count === "1") {
      string = "rating";
    };


    $(`.${nameOfMenuSubType}`).append(`
                                <div class="menu-item">
                                <img class="menu-photo" src=${eachItem.food_photo_url}>
                                <div class="menu-details">
                                <p class="menu-item-name">${eachItem.name} </p>
                                <p class="menu-item-price">$${eachItem.price}.00</p>

                              <button type="button" id="addToCart-button" data-item-id=${eachItem.id}>
                                Add to Cart
                              </button>

                              <p>${starReviews(eachItem.rating)}</p>
                              <p>${eachItem.count} ${string} | ${eachItem.rating || "Be the first to rate this item!"} </p>
                                </div>
                                </div>
                                `)
  }
};


function starReviews(average) {
  // Round to nearest half
  rating = Math.round(average * 2) / 2;
  const stars = [];
  // solid stars
  for (let i = 1; i <= rating; i++) {
    stars.push('<i class="fa-solid fa-star"></i>&nbsp;');
  }
  // half values
  if (rating % 1 !== 0) stars.push('<i class="fa-solid fa-star-half-stroke"></i>&nbsp;');
  // empty stars out of 5
  for (let x = (5 - rating); x >= 1; x--) {
    stars.push('<i class="fa-regular fa-star"></i>&nbsp;');
  }
  return stars.join('');
};
