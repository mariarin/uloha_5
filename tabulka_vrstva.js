const WMSCapabilities = ol.format.WMSCapabilities;
var parser = new WMSCapabilities();
const layersToShow = [];
function visibility() {
fetch('http://localhost:8080/geoserver/uloha_2/ows?service=wms&version=1.3.0&request=GetCapabilities').then(function(response) {
  return response.text();
}).then(function(text) {
  var data = parser.read(text);
 console.log(data.Capability.Layer.Layer);
 console.log( data.Capability.Layer.Layer[0].Name);
//var nazov_vrstvy= data.Capability.Layer.Layer[0].Name;
//var dopytovatelnost = data.Capability.Layer.Layer[0].queryable;
 data.Capability.Layer.Layer.forEach(layer => {
     console.log(layer.Name, layer.queryable) 
 });

var table = "<tr><th>Názov vrstvy</th><th>Dopytovateľné</th><th>Checkbox</th></tr>";
var dlzka = data.Capability.Layer.Layer.length;

for(var r = 1; r <= dlzka; r++){
     table += '<tr>';
     for(var c = 0; c <= 0; c++){
       table +=  '<tr>'+ '<td>'+ data.Capability.Layer.Layer[r-1].Name +'</td>' + '<td>'+ data.Capability.Layer.Layer[r-1].queryable + '</td>' 
       +'<td>'+ `<input onclick="showLayer('` + data.Capability.Layer.Layer[r - 1].Name +`')" type = "checkbox"/>` + '</td>' + '</tr>';
    }
      table += '</tr>';
}
document.body.insertAdjacentHTML('beforeend','<table border = "2"> ' + table + '</table>')
})
}
function showLayer(layerToShow) {
  layersToShow.push(layerToShow);
}
function getLayersToShow() {
  console.log(layersToShow)
}