var data = {};
var arr
  (function() {
  $.getJSON( "../../mhacks/static/js/tickerdata.json").done(function(content) {
    data = content;
    console.log(data);
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
  data = data[arr[0]];
  console.log(data);
  


var WIDTH = 800, HEIGHT = 380;
        var Y_AXIS_LABEL = options.yaxislabel;
        var X_DATA_PARSE = d3.time.format("%Y-%m-%d").parse;
        var X_AXIS_COLUMN = options.xaxis; 
        var Y_AXIS_COLUMN = options.yaxis;
        console.log(data);
        data.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });

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

        var line = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });



        var graph = d3.select("#graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data, function(d) {
            return d.y_axis;
        }));


        graph.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").attr("dy", ".5em").call(xAxis);
        graph.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(Y_AXIS_LABEL);
        graph.append("path").datum(data).attr("class", "line").attr("d", line);
      });
});
