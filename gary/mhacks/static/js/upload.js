uber = ['uber 1', 'uber 2'];
custom = ['graph 1', 'graph 2', 'graph 3', 'graph 4', 'graph 5', 'graph 6'];

function bloomberg_button(){
  $(".bloomberg_data").click(function() {
  	var form = document.getElementById("visualize-form");
  	
  	var form_group = document.createElement("div");
  	form_group.className = "form-group"
  	var row_size1 = document.createElement("div");
  	row_size1.className = "col-lg-offset-1 col-lg-6"
  	var button1 = document.createElement("div");
  	button1.class = "btn btn-danger not-top"
  	var node1 = document.createTextNode('bloomberg 1')
  	var row_size2 = document.createElement("div");
  	row_size2.className = "col-lg-5"
  	var button2 = document.createElement("div");
  	button2.class = "btn btn-danger not-top"
  	var node1 = document.createTextNode('bloomberg 2')

  	button1.appendChild(node1);
  	row_size1.appendChild(button1);
  	form_group.appendChild(row_size1);

  	button2.appendChild(node2);
  	row_size2.appendChild(button2);
  	form_group.appendChild(row_size2);

  	form.appendChild(form_group);

  })
}

function custom_button(){
  $(".custom_data").click(function() {
  	
  })
}

function uber_button(){
  $(".uber_data").click(function() {
  	
  })
}

$(document).ready(function () {
  bloomberg_button();
  custom_button();
  uber_button();
});