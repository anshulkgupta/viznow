custom = ['graph 1', 'graph 2', 'graph 3', 'graph 4', 'graph 5', 'graph 6'];
var bloomberg_count = 1;
var custom_count = 1;
var uber_count = 1;

function bloomberg_button(){
  $(".bloomberg_data").click(function() {
  	if (bloomberg_count == 1) {
      var form = document.getElementById("visualize-form");
    	
    	var form_group = document.createElement("div");
    	form_group.className = "form-group"
    	var row_size1 = document.createElement("div");
    	row_size1.className = "col-lg-offset-1 col-lg-6"
    	var button1 = document.createElement("div");
    	button1.className = "btn btn-danger not-top"
    	var node1 = document.createTextNode('bloomberg 1')
    	var row_size2 = document.createElement("div");
    	row_size2.className = "col-lg-5"
    	var button2 = document.createElement("div");
    	button2.className = "btn btn-danger not-top"
    	var node2 = document.createTextNode('bloomberg 2')

    	button1.appendChild(node1);
    	row_size1.appendChild(button1);
    	form_group.appendChild(row_size1);

    	button2.appendChild(node2);
    	row_size2.appendChild(button2);
    	form_group.appendChild(row_size2);

    	form.appendChild(form_group);
      bloomberg_count = 0;
      uber_count = 0;
      custom_count = 0;
    }

  })
}

function custom_button(){
  $(".custom_data").click(function() {
  	if (custom_count == 1){
      var form = document.getElementById("visualize-form");

      var form_group = document.createElement("div");
      form_group.className = "form-group"
      for (var i = 0 ; i<3 ; i++ ) {
        var row_size = document.createElement("div");
        row_size.className = "col-lg-4"
        var button = document.createElement("div");
        button.className = "btn btn-danger not-top"
        var node = document.createTextNode(custom[i]);

        button.appendChild(node);
        row_size.appendChild(button);
        form_group.appendChild(row_size);
      }

      for (var i = 3 ; i<6 ; i++ ) {
        var row_size = document.createElement("div");
        row_size.className = "col-lg-4"
        var button = document.createElement("div");
        button.className = "btn btn-danger not-top"
        var node = document.createTextNode(custom[i]);

        button.appendChild(node);
        row_size.appendChild(button);
        form_group.appendChild(row_size);
      }

      form.appendChild(form_group);
      bloomberg_count = 0;
      uber_count = 0;
      custom_count = 0;
    
    }
  })
}

function uber_button(){
  $(".uber_data").click(function() {
  	if (uber_count == 1) {
      var form = document.getElementById("visualize-form");
      
      var form_group = document.createElement("div");
      form_group.className = "form-group"
      var row_size1 = document.createElement("div");
      row_size1.className = "col-lg-offset-1 col-lg-6"
      var button1 = document.createElement("div");
      button1.className = "btn btn-danger not-top"
      var node1 = document.createTextNode('uber 1')
      var row_size2 = document.createElement("div");
      row_size2.className = "col-lg-5"
      var button2 = document.createElement("div");
      button2.className = "btn btn-danger not-top"
      var node2 = document.createTextNode('uber 2')

      button1.appendChild(node1);
      row_size1.appendChild(button1);
      form_group.appendChild(row_size1);

      button2.appendChild(node2);
      row_size2.appendChild(button2);
      form_group.appendChild(row_size2);

      form.appendChild(form_group);
      bloomberg_count = 0;
      uber_count = 0;
      custom_count = 0;
    }
  })
}

$(document).ready(function () {
  bloomberg_button();
  custom_button();
  uber_button();
});