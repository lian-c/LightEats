$(() => {
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
  let totalCost = 0; //start as 0 for total
  $('main').on('click', '#addToCart-button', function () {
    // Add item to shopping cart modal
    const itemId = $(this).data('item-id');

    $.get(`/cart/${itemId}`)
      .then((menuItem) => {
        // Add item to shopping cart modal
        menuOrderArray.push(menuItem.id);
        $('#cart-summary').val(menuOrderArray);

        $(".cart-order").append(`
        <section class="cart-container">
        <div class="cart-items" value="${menuItem.id}">
        <div class="cart-img">
        <img src="${menuItem.food_photo_url}" style={{ height="120px" }} />
        </div>
        <div class="cart-content">
        <span class="menu-name">${menuItem.name}</span>
        </div>
        <div class="counter">
        <div class="counter-btn">+</div>
        <div class="count">1</div>
        <div class="counter-btn">-</div>
        </div>
        <div class="prices">${Number(menuItem.price.toFixed(2))}</div>
        </div>
        </section>
         `);
         totalCost += menuItem.price; //updates the total cost
         $(".total-amount").text(`Total: $${totalCost}.00`);
         // Show shopping cart modal optional
         $("#cart-modal").modal("show");
      });

  });

  $('.cart-order').on('click', '.counter-btn', function() {
    const count =  $(this).siblings('.count');
         console.log("count:", count)
    let countNum = Number(count.text());
    const $cartItem = $(this).closest('.cart-items');
         console.log("$cartItem:", $cartItem)
    const price = Number($cartItem.find('.prices').text());
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
      // Update total cost
    }
    $(".total-amount").text(`Total: $${totalCost}.00`);
    count.text(countNum);
  });
////


  $('main').on('click', '#checkout-button', function () {
    console.log("clicked")
    // document.cookie = JSON.stringify(menuOrderArray)

  })


})


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
                                <p class="menu-item-price">$${eachItem.price} </p>

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
/* <form name="addToCartForm" method="POST" action="/order">
<input type="submit" id="menuID${eachItem.id}" class="add-item" value="Add to cart"/>
</form> */

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
