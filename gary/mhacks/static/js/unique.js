function click_handlers(){
  $(".unique_button").click(function(){
  	console.log(this.id);
  	var button_value = this.id;
  	button_number = button_value.split('_');
  	number = button_number[1];
    console.log(number)
  	var url = document.URL;
  	url += '/' + 'fileupload' + '/' + number
  	window.location.href = url;
  });
}

$(document).ready(function () {
  var url = document.URL;
  url = url.split('/');
  var length = url.length;
  var page = url [length-1];
  
  if (page == "Bloomberg") {
  	$(".unique_bloomberg").show()
  }
  else if (page == "Uber") {
  	$(".unique_uber").show()
  }
  else if (page == "Custom") {
  	$(".unique_custom").show()
  }

  click_handlers();

});