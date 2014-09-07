
console.log("js");
var options = {
        "filename1" : "bin/stock1.json", //coming from mayank through gary
        "filename2" : "bin/stock2.json", //coming from mayank through gary
        "yaxislabel" : "Volume", //coming from gary
        "xaxis" : "DATE",
        "yaxis" : "OPEN" //coming from gary
    };

    function getData(){
        
        $.getJSON(options.filename1, function(content1){
            console.log(content1);
            $.getJSON(options.filename2, function(content2){
                lineGraph(content1, content2, options);
            });
        });
    };

    var lineGraph = function(data1, data2, options) { 
        var WIDTH = 800, HEIGHT = 380;
        var Y_AXIS_LABEL = options.yaxislabel;
        var X_DATA_PARSE = d3.time.format("%Y-%m-%d").parse;
        var X_AXIS_COLUMN = options.xaxis; 
        var Y_AXIS_COLUMN = options.yaxis;
        
        data1.forEach(function(d){ 
            d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
            d.y_axis = +d[Y_AXIS_COLUMN];
        });

        data2.forEach(function(d){ 
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

        var line1 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });

        var line2 = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x_axis);
        }).y(function(d) {
            return y(d.y_axis);
        });

        var graph = d3.select("#canvas-svg").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(d3.extent(data1, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data1, function(d) {
            return d.y_axis;
        }));

        x.domain(d3.extent(data2, function(d) {
            return d.x_axis;
        }));
        y.domain(d3.extent(data2, function(d) {
            return d.y_axis;
        }));
        graph.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").attr("dy", ".5em").call(xAxis);
        graph.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(Y_AXIS_LABEL);
        graph.append("path").datum(data1).attr("class", "line1").attr("d", line1);
        graph.append("path").datum(data2).attr("class", "line2").attr("d", line2);


    };

    $(document).ready(function(){
        getData();
    });