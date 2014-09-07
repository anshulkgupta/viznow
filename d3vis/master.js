var lineGraph = function(options){
  var data = "";
  $.getJSON(options.filename, function(content){
    data=content;
  }).done(function(){
    lineGraphHelper(options, data);
  });
};

var lineGraphHelper = function(options, data){  
    var WIDTH = 800, HEIGHT = 380;
    var Y_AXIS_LABEL = options.yaxislabel;
    var X_DATA_PARSE = d3.time.format("%Y-%m-%d").parse;
    var X_AXIS_COLUMN = options.xaxis;
    var Y_AXIS_COLUMN = options.yaxis;

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

    var graph = d3.select("#svg").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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

var chloroplethGraph = function(options){
  var width = 1000,
  height = 580;

  var rateById = d3.map();

  var quantize = d3.scale.quantize()
  .domain([0, .15])
  .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  var projection = d3.geo.albersUsa()
  .scale(1280)
  .translate([width / 2, height / 2]);

  var path = d3.geo.path()
  .projection(projection);

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

  queue()
  .defer(d3.json, "us.json")
  .defer(d3.tsv, options.filename, function(d) { rateById.set(d.id, +d.rate); })
  .await(ready);

  d3.select(self.frameElement).style("height", height + "px");

  function ready(error, us) {
    svg.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
    .attr("class", function(d) { return quantize(rateById.get(d.id)); })
    .attr("d", path);

    svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr("class", "states")
    .attr("d", path);
  }
};

var chordDiagram = function(options){
  var width = 720,
  height = 720,
  outerRadius = Math.min(width, height) / 2 - 10,
  innerRadius = outerRadius - 24;

  var formatPercent = d3.format(".1%");

  var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

  var layout = d3.layout.chord()
  .padding(.04)
  .sortSubgroups(d3.descending)
  .sortChords(d3.ascending);

  var path = d3.svg.chord()
  .radius(innerRadius);

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("id", "circle")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append("circle")
  .attr("r", outerRadius);

  d3.csv(options.filename, function(cities) {
    d3.json(options.matrix, function(matrix) {

    // Compute the chord layout.
    layout.matrix(matrix);

    // Add a group per neighborhood.
    var group = svg.selectAll(".group")
    .data(layout.groups)
    .enter().append("g")
    .attr("class", "group")
    .on("mouseover", mouseover);

    // Add a mouseover title.
    group.append("title").text(function(d, i) {
      console.log(d.value);
      return cities[i].name + ": " + formatPercent(d.value) + " of origins";
    });

    // Add the group arc.
    var groupPath = group.append("path")
    .attr("id", function(d, i) { return "group" + i; })
    .attr("d", arc)
    .style("fill", function(d, i) { return cities[i].color; });

    // Add a text label.
    var groupText = group.append("text")
    .attr("x", 6)
    .attr("dy", 15);

    groupText.append("textPath")
    .attr("xlink:href", function(d, i) { return "#group" + i; })
    .text(function(d, i) { return cities[i].name; });

    // Remove the labels that don't fit. :(
      groupText.filter(function(d, i) {
        return groupPath[0][i].getTotalLength() / 2 - 20 < this.getComputedTextLength();
      }).remove();

    // Add the chords.
    var chord = svg.selectAll(".chord")
    .data(layout.chords)
    .enter().append("path")
    .attr("class", "chord")
    .style("fill", function(d) { return cities[d.source.index].color; })
    .attr("d", path);

    // Add an elaborate mouseover title for each chord.
    chord.append("title").text(function(d) {
      return cities[d.source.index].name
      + " → " + cities[d.target.index].name
      + ": " + formatPercent(d.source.value)
      + "\n" + cities[d.target.index].name
      + " → " + cities[d.source.index].name
      + ": " + formatPercent(d.target.value);
    });

    function mouseover(d, i) {
      chord.classed("fade", function(p) {
        return p.source.index != i
        && p.target.index != i;
      });
    }
  });
});
};

var zoomableCircle = function(options){
  var margin = 20,
  diameter = 960;

  var color = d3.scale.linear()
  .domain([-1, 5])
  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
  .interpolate(d3.interpolateHcl);

  var pack = d3.layout.pack()
  .padding(2)
  .size([diameter - margin, diameter - margin])
  .value(function(d) { return d.size; })

  var svg = d3.select("body").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .append("g")
  .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
  console.log(options.filename);
  d3.json(options.filename, function(error, root) {
    if (error) return console.error(error);

    var focus = root,
    nodes = pack.nodes(root),
    view;

    var circle = svg.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
    .style("fill", function(d) { return d.children ? color(d.depth) : null; })
    .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    var text = svg.selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("class", "label")
    .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
    .style("display", function(d) { return d.parent === root ? null : "none"; })
    .text(function(d) { return d.name; });

    var node = svg.selectAll("circle,text");

    d3.select("body")
    .style("background", color(-1))
    .on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus; focus = d;

      var transition = d3.transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .tween("zoom", function(d) {
        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
        return function(t) { zoomTo(i(t)); };
      });

      transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
      .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
      .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }
  });

d3.select(self.frameElement).style("height", diameter + "px");
};
