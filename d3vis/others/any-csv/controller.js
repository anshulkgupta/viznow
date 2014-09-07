var handleFile = function(){
  var options={
    "typeOfGraph" : "Line",
    "requiredOptions" : {
        "filename" : "data.json",
        "yaxislabel" : "Mean Temperature (F)", 
        "xaxis" : "PST",
        "yaxis" : "Mean TemperatureF"
    }
  };
};

$(document).ready(function(){
  handleFile();
});