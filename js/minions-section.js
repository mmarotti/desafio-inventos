$(document).ready(function(){
  $("#half-screen-left").hover(function(){
    $("#half-screen-left").addClass("active");
    $("#first-minion").addClass("active")
    $("#half-screen-right").removeClass("active");
    $("#second-minion").removeClass("active");
  });

  $("#first-minion").hover(function(){
    $("#half-screen-left").addClass("active");
    $("#first-minion").addClass("active")
    $("#half-screen-right").removeClass("active");
    $("#second-minion").removeClass("active");
  });

  $("#half-screen-right").hover(function(){
    $("#half-screen-right").addClass("active");
    $("#second-minion").addClass("active")
    $("#half-screen-left").removeClass("active");
    $("#first-minion").removeClass("active");
  })

  $("#second-minion").hover(function(){
    $("#half-screen-right").addClass("active");
    $("#second-minion").addClass("active")
    $("#half-screen-left").removeClass("active");
    $("#first-minion").removeClass("active");
  });

});
