var data = {};
var arr="";
  var data1, data2, data3, data4, data5 = null;

  (function() {
  $.getJSON( "../../mhacks/static/js/tickerdata.json").done(function(content) {
    data = content;
    });
  })();

$(document).ready(function () {



  var options = {
      	"filename" : "tickerdata.json", //all
      	"matrix" : "matrix.json", //chordDiagram
      	"yaxislabel" : null, //lineGraph
      	"xaxis" : "DATE", //lineGraph
      	"yaxis" : null//lineGraph
  		};

  
  $("#visualize_it").on("click", function(){
    arr="";
    var string = $( "#visualization-form" ).serialize();
    arr = string.split("&");
    options.yaxis = arr[arr.length-1].split("=")[1].replace("+", "_").toUpperCase();
    options.yaxislabel = options.yaxis.replace("_", " ");
    arr.splice(-1,1);

    for (var i=0; i<arr.length; i++) {
      arr[i] = arr[i].split("=")[0] + " US Equity";
      console.log(arr[i]);
    }

  //----------------------  
  console.log(data);
  var numOfLines = arr.length;
  if (numOfLines == 1){
    data1 = data[arr[0]];
    console.log(data1);
  }
  if (numOfLines == 2){
    data2 = data[arr[1]];
  }
  if (numOfLines == 3){
    data3 = data[arr[2]];
  }
  if (numOfLines == 4){
    data4 = data[arr[3]];
  }
  if (numOfLines == 5){
    data5 = data[arr[4]];
  }
  //----------------------

  


var WIDTH = 800, HEIGHT = 380;
        var Y_AXIS_LABEL = options.yaxislabel;
        var X_DATA_PARSE = d3.time.format("%Y-%m-%d").parse;
        var X_AXIS_COLUMN = options.xaxis; 
        var Y_AXIS_COLUMN = options.yaxis;

        if(data1){
        data1.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });}

        if(data2){
          data1.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });
        data2.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });
       } 

       if(data3){
        data3.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });
       } 

       if(data4){
        data4.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });
       } 

       if(data5){
        data5.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });
       } 

        var margin = {
            top: 20,
            right: 20,
            bottom: 50,
            left: 80
        }, width = WIDTH - margin.left - margin.right, height = HEIGHT - margin.top - margin.bottom;

        var x = d3.time.scale().range([ 0, width]);
        var y = d3.scale.linear().range([ height, 0 ]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        var yAxis = d3.svg.axis().scale(y).orient("left");

        if(data1){
        var line1 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });}

        if(data2){
        var line2 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });}

        if(data3){
        var line3 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });}

        if(data4){
        var line4 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });}

        if(data5){
        var line5 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });}


        if($("svg").length > 0)
        {
          $("svg").remove();
        }

        var graph = d3.select("#graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if(data1){
        x.domain(d3.extent(data1, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data1, function(d) {
            return d.y_axis;
        }));}

        if(data2){
        x.domain(d3.extent(data2, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data2, function(d) {
            return d.y_axis;
        }));
      }

        if(data3){
        x.domain(d3.extent(data3, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data3, function(d) {
            return d.y_axis;
        }));
      }

      if(data4){
        x.domain(d3.extent(data4, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data4, function(d) {
            return d.y_axis;
        }));
      }

      if(data5){
        x.domain(d3.extent(data5, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data5, function(d) {
            return d.y_axis;
        }));
      }

        graph.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").attr("dy", ".5em").call(xAxis);
        graph.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(Y_AXIS_LABEL);
        if(data1){
          graph.append("path").datum(data1).attr("class", "line1").attr("d", line1);
        }
        if(data2){
          graph.append("path").datum(data2).attr("class", "line2").attr("d", line2);
        }
        if(data3){
          graph.append("path").datum(data2).attr("class", "line2").attr("d", line3);
        }
        if(data4){
          graph.append("path").datum(data2).attr("class", "line2").attr("d", line4);
        }
        if(data5){
          graph.append("path").datum(data2).attr("class", "line2").attr("d", line5);
        }

      });
});
