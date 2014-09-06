$(document).ready(function(){

    var getData = function(){
        $.getJSON("data.json", function(content){
            //console.log(content);
            lineGraph(content);
        });
    };

    var lineGraph = function(data) {
        //console.log(data);
        var WIDTH = 800, HEIGHT = 380;
        var Y_AXIS_LABEL = "Mean Temperature (F)";
        var X_DATA_PARSE = d3.time.format("%Y-%m-%d").parse;
        var X_AXIS_COLUMN = "PST";
        var Y_AXIS_COLUMN = "Mean TemperatureF";
        data.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
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

        var graph = d3.select("#canvas-svg").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(d3.extent(data, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data, function(d) {
            return d.y_axis;
        }));
        graph.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").attr("dy", ".5em").call(xAxis);
        graph.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(Y_AXIS_LABEL);
        graph.append("path").datum(data).attr("class", "line").attr("d", line);

    };

    getData();
});
