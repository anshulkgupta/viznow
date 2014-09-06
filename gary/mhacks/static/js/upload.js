custom = ['graph 1', 'graph 2', 'graph 3', 'graph 4', 'graph 5', 'graph 6'];
var bloomberg_count = 1;
var custom_count = 1;
var uber_count = 1;
var secondary_count = 1;

function bloomberg_button(){
  $(".bloomberg_data").click(function() {
  	if (bloomberg_count == 1) {
      var form = document.getElementById("visualize-form");
    	
    	var form_group = document.createElement("div");
    	form_group.className = "form-group"
    	var row_size1 = document.createElement("div");
    	row_size1.className = "col-lg-offset-1 col-lg-6"
    	var button1 = document.createElement("div");
    	button1.className = "btn btn-danger not-top secondary"
    	var node1 = document.createTextNode('bloomberg 1')
    	var row_size2 = document.createElement("div");
    	row_size2.className = "col-lg-5"
    	var button2 = document.createElement("div");
    	button2.className = "btn btn-danger not-top secondary"
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

      $(".original").remove();
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
        button.className = "btn btn-danger not-top secondary"
        var node = document.createTextNode(custom[i]);

        button.appendChild(node);
        row_size.appendChild(button);
        form_group.appendChild(row_size);
      }

      for (var i = 3 ; i<6 ; i++ ) {
        var row_size = document.createElement("div");
        row_size.className = "col-lg-4"
        var button = document.createElement("div");
        button.className = "btn btn-danger not-top secondary"
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
      button1.className = "btn btn-danger not-top secondary"
      var node1 = document.createTextNode('uber 1')
      var row_size2 = document.createElement("div");
      row_size2.className = "col-lg-5";
      var button2 = document.createElement("div");
      button2.className = "btn btn-danger not-top secondary";
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
  });
}

function secondary_button(){
  $("#visualize-form").click(function() {
    if (secondary_count != 1){
      console.log('yes');
      console.log(this.id);
    }
    secondary_count += 1
  });
  console.log('what');

  // var form = document.getElementById("visualize-form");

  // var form_group = document.createElement("div");
  // form_group.className = "form-group";
  // var row_size1x = document.createElement("div");
  // row_size1x.className = "col-lg-2 not-top"
  // var x_node = document.createTextNode('x-coordinate: ');
  // var row_size2x = document.createElement("div");
  // row_size2x.className = "col-lg-4"
  // var select = document.createElement("select");
  // select.className = 'form-control m-bot15 not-top';
  // var example_option = document.createElement('option');
  // var example_option_node = document.createTextNode('hiii');
  // example_option.appendChild(example_option_node);
  // select.appendChild(example_option);
  // row_size2x.appendChild(select);
  // row_size1x.appendChild(x_node);
  // form_group.appendChild(row_size1x);
  // form_group.appendChild(row_size2x);

  // var row_size1y = document.createElement("div");
  // row_size1y.className = "col-lg-2 not-top"
  // var y_node = document.createTextNode('y-coordinate: ');
  // var row_size2y = document.createElement("div");
  // row_size2y.className = "col-lg-4"
  // var select = document.createElement("select");
  // select.className = 'form-control m-bot15 not-top';
  // var example_option = document.createElement('option');
  // var example_option_node = document.createTextNode('hiii');
  // example_option.appendChild(example_option_node);
  // select.appendChild(example_option);
  // row_size2y.appendChild(select);
  // row_size1y.appendChild(y_node);
  // form_group.appendChild(row_size1y);
  // form_group.appendChild(row_size2y);

  // form.appendChild(form_group);
}

$(document).ready(function () {
  bloomberg_button();
  custom_button();
  uber_button();
  secondary_button();
});