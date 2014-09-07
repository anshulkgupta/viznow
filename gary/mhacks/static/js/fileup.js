function click_handler(){
	$("#fileupload_next").click(function(event) {
    var url = document.URL;
    url += '/final';
    window.location.href = url;
  });
}

$(document).ready(function () {
  // click_handler();
  console.log('ya');
  alert('hi');
});