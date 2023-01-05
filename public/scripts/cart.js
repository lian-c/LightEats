// // incomplete https://support.rechargepayments.com/hc/en-us/articles/360008683774-Adding-an-item-to-the-cart-with-AJAX
// //https://stackoverflow.com/questions/13215942/add-item-to-cart-jquery-function
// $(() => {
//   $(".add-item").click(function() {
//     var pos = $(this).parent().find('.inputid').val();
//     $.ajax({
//         url: "cart.php",
//         type: "POST",
//         data: {itemID: pos},
//         success: function(data) {
//             // Do stuff when the AJAX call returns
//         }
//     });
//   });
// });

// $(()=>
// {
//   $("#press-me-button").click(() =>
//   {
//     console.log("pressed")
//   })
// })



$(()=>
{
  $('main > .menu-container > .menu-item > .menu-details > .add-menu-item').click(()=>
  {
    alert("clicked");
  })
});