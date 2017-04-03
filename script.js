L.mapbox.accessToken = 'pk.eyJ1IjoiZ2x3IiwiYSI6IjdHTVp3eWMifQ.TXIsy6c3KnbqnUAeBawVsA'

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

// set map
var map = L.mapbox.map('map', null, {
    'center':[41.87, -87.8],
    'zoom': 10
  });

//add basemap
L.mapbox.styleLayer('mapbox://styles/glw/cj09rk1cm00362rpfhkjxx7k0')
    .addTo(map);

// add hashed url
//var hash = L.hash(map);

//add strava trails 2014
var fileurl = 'data/yr2014_strava.topojson'

var geojson = new L.geoJson(null, {
  'style': style,
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<strong>' + layer.feature.properties.osm_name + '</strong>' +
  '</br>' + '2014 Total Pedestrian Count: ' + layer.feature.properties.total_athlete_ped + '</br>' + '2014 Total Rider Count: ' + layer.feature.properties.total_athlete_ride + '</br>' + '2014 Total Athelete Count: ' + layer.feature.properties.total_athlete_both, { closeButton: false });
  }
});

var strava14 = omnivore.topojson(fileurl, null, geojson);



var basemaps = {
    "Strava 2014": strava14
};
/*
var overlays = {
//    "Strava 2014 Nodes": null
};
*/
L.control.layers(basemaps).addTo(map);


//Add search tool
L.mapbox.geocoderControl('mapbox.places', {
  autocomplete: true,
  bbox: [-88.25432,41.47461,-87.52773,42.15048]
}).addTo(map);

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

//Add legend
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
