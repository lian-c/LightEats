$(() => {
 $("#menu-button").click(()=> {
   $('main').empty();
   $('#menu-button').remove();
   $('nav').prepend(`<a href="/"><img class="home" src ="https://irp.cdn-website.com/a9e4f39a/DESKTOP/png/the-slice-house-logo.png"></a>`);
   
   $('main').prepend(`<h1 class="menu">Menu</h1>`);

  $.get("/menu")
  .then((response) => {
  

  })

 })
    

});
