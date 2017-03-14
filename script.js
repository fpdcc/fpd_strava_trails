L.mapbox.accessToken = 'pk.eyJ1IjoibHl6aWRpYW1vbmQiLCJhIjoiRkh4OW9layJ9.P2o48WlCqjhGmqoFJl3C_A';

//add color to trails by user numbers
function getColor(d) {
    return d > 2000 ? '#800026' :
           d > 1000 ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 200  ? '#FC4E2A' :
           d > 100  ? '#FD8D3C' :
           d > 50   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

// set trail color and style
function style(feature) {
    return {
        color: getColor(feature.properties.total_athlete_both),
        weight: 4,
        opacity: 1
    };
}

// set map view
var map = L.mapbox.map('map', 'mapbox.light')
    .setView([41.87, -87.8], 11);

// add hashed url
var hash = L.hash(map);

// add geojson data
var myLayer = $.getJSON('data/yr2014_strava.geojson', function(data){
    L.geoJson(data, {
      style: style,
      onEachFeature: function (feature, layer) {
      layer.bindPopup('<strong>' + layer.feature.properties.osm_name + '</strong>' + '</br>' + '2014 Total Athelete Count: ' + layer.feature.properties.total_athlete_both, { closeButton: false });
      }
     }).addTo(map);
 });
// adjust mapview based on geoJson
//map.fitBounds(strava2014.getBounds());


// console.log(myLayer._geojson.features[0].properties.osm_name);
// console.log(myLayer._geojson.features[0].properties.total_athlete_both);

  // Open popups on hover
/*
  myLayer.on('mouseover', function (e) {
    e.layer.openPopup();
  });
  myLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });
*/  

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 50, 100, 200, 500, 1000, 2000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
