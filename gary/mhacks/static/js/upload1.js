function bloomberg_button(){
  $(".bloomberg_data").click(function() {
    var url = 'http://127.0.0.1:8000/page/Bloomberg/1'
    window.location.href = url;
  })
}

function custom_button(){
  $(".custom_data").click(function() {
    var url = 'http://127.0.0.1:8000/page/Custom'
    window.location.href = url;
  })
}

function uber_button(){
  $(".uber_data").click(function() {
    var url = 'http://127.0.0.1:8000/page/Uber'
    window.location.href = url;
  })
}

$(document).ready(function () {
  bloomberg_button();
  custom_button();
  uber_button();
});