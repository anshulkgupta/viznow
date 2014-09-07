$(document).ready(function () {
  $("#visualization-form").submit(function(event) {
    $.post( "/upload/submit", $( "#visualization-form" ).serialize() );
    event.preventDefault();
    return false;
  });
});