function visualize_it(data) {
  $(".visualize_button").click(function() {
    var url = 'http://127.0.0.1:8000/home'
    window.location.href = url;
  })
}

$(document).ready(function () {
  visualize_it();
  // console.log('hi');
});