L.mapbox.accessToken = 'pk.eyJ1IjoibHl6aWRpYW1vbmQiLCJhIjoiRkh4OW9layJ9.P2o48WlCqjhGmqoFJl3C_A';

/*
var hospitals = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { "Name": "VA Medical Center -- Leestown Division", "Address": "2250 Leestown Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.539487, 38.072916 ] } },
        { "type": "Feature", "properties": { "Name": "St. Joseph East", "Address": "150 N Eagle Creek Dr" }, "geometry": { "type": "Point", "coordinates": [ -84.440434, 37.998757 ] } },
        { "type": "Feature", "properties": { "Name": "Central Baptist Hospital", "Address": "1740 Nicholasville Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.512283, 38.018918 ] } },
        { "type": "Feature", "properties": { "Name": "VA Medical Center -- Cooper Dr Division", "Address": "1101 Veterans Dr" }, "geometry": { "type": "Point", "coordinates": [ -84.506483, 38.02972 ] } },
        { "type": "Feature", "properties": { "Name": "Shriners Hospital for Children", "Address": "1900 Richmond Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.472941, 38.022564 ] } },
        { "type": "Feature", "properties": { "Name": "Eastern State Hospital", "Address": "627 W Fourth St" }, "geometry": { "type": "Point", "coordinates": [ -84.498816, 38.060791 ] } },
        { "type": "Feature", "properties": { "Name": "Cardinal Hill Rehabilitation Hospital", "Address": "2050 Versailles Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.54212, 38.046568 ] } },
        { "type": "Feature", "properties": { "Name": "St. Joseph Hospital", "ADDRESS": "1 St Joseph Dr" }, "geometry": { "type": "Point", "coordinates": [ -84.523636, 38.032475 ] } },
        { "type": "Feature", "properties": { "Name": "UK Healthcare Good Samaritan Hospital", "Address": "310 S Limestone" }, "geometry": { "type": "Point", "coordinates": [ -84.501222, 38.042123 ] } },
        { "type": "Feature", "properties": { "Name": "UK Medical Center", "Address": "800 Rose St" }, "geometry": { "type": "Point", "coordinates": [ -84.508205, 38.031254 ] }
            }
    ]
};


var libraries = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { "Name": "Village Branch", "Address": "2185 Versailles Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.548369, 38.047876 ] } },
        { "type": "Feature", "properties": { "Name": "Northside Branch", "ADDRESS": "1733 Russell Cave Rd" }, "geometry": { "type": "Point", "coordinates": [ -84.47135, 38.079734 ] } },
        { "type": "Feature", "properties": { "Name": "Central Library", "ADDRESS": "140 E Main St" }, "geometry": { "type": "Point", "coordinates": [ -84.496894, 38.045459 ] } },
        { "type": "Feature", "properties": { "Name": "Beaumont Branch", "Address": "3080 Fieldstone Way" }, "geometry": { "type": "Point", "coordinates": [ -84.557948, 38.012502 ] } },
        { "type": "Feature", "properties": { "Name": "Tates Creek Branch", "Address": "3628 Walden Dr" }, "geometry": { "type": "Point", "coordinates": [ -84.498679, 37.979598 ] } },
        { "type": "Feature", "properties": { "Name": "Eagle Creek Branch", "Address": "101 N Eagle Creek Dr" }, "geometry": { "type": "Point", "coordinates": [ -84.442219, 37.999437 ] } }
    ]
};


  // Add marker color, symbol, and size to hospital GeoJSON
for (var i = 0; i < hospitals.features.length; i++) {
    hospitals.features[i].properties['marker-color'] = '#DC143C';
    hospitals.features[i].properties['marker-symbol'] = 'hospital';
    hospitals.features[i].properties['marker-size'] = 'small';
  };

  // Add marker color, symbol, and size to library GeoJSON
for (var i = 0; i < libraries.features.length; i++) {
    libraries.features[i].properties['marker-color'] = '#4169E1';
    libraries.features[i].properties['marker-symbol'] = 'library';
    libraries.features[i].properties['marker-size'] = 'small';
  };
*/


var map = L.mapbox.map('map', 'mapbox.light')
    .setView([41.87, -87.8], 11);

var myLayer = L.mapbox.featureLayer()
    .addTo(map);

myLayer.loadURL('./data/yr2014_strava.geojson');

/*
var hospitalLayer = L.mapbox.featureLayer(hospitals)
    .addTo(map);
var libraryLayer = L.mapbox.featureLayer(libraries)
    .addTo(map);


map.fitBounds(libraryLayer.getBounds());

  // Bind a popup to each feature in hospitalLayer and libraryLayer
  hospitalLayer.eachLayer(function (layer) {
    layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', { closeButton: false });
  }).addTo(map);
  libraryLayer.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.Name, { closeButton: false });
  }).addTo(map);

  // Open popups on hover
  libraryLayer.on('mouseover', function (e) {
    e.layer.openPopup();
  });
  hospitalLayer.on('mouseover', function (e) {
    e.layer.openPopup();
  });

// Reset marker size to small
  function reset() {
    var hospitalFeatures = hospitalLayer.getGeoJSON();
    for (var i = 0; i < hospitalFeatures.features.length; i++) {
      hospitalFeatures.features[i].properties['marker-size'] = 'small';
    };
    hospitalLayer.setGeoJSON(hospitalFeatures);
  };

  // When a library is clicked, do the following
  libraryLayer.on('click', function (e) {
    // Reset any and all marker sizes to small
    reset();
    // Get the GeoJSON from libraryFeatures and hospitalFeatures
    var libraryFeatures = libraryLayer.getGeoJSON();
    var hospitalFeatures = hospitalLayer.getGeoJSON();
    // Using Turf, find the nearest hospital to library clicked
    var nearestHospital = turf.nearest(e.layer.feature, hospitalFeatures);
    // Change the nearest hospital to a large marker
    nearestHospital.properties['marker-size'] = 'large';
    // Add the new GeoJSON to hospitalLayer
    hospitalLayer.setGeoJSON(hospitalFeatures);
    // Bind popups to new hospitalLayer and open popup
    // for nearest hospital
    hospitalLayer.eachLayer(function (layer) {
      layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', { closeButton: false });
      if (layer.feature.properties['marker-size'] === 'large') {
        layer.openPopup();
      };
    });
  });

  // When the map is clicked on anywhere, reset all
  // hospital markers to small
  map.on('click', function (e) {
    reset();
  });

*/

myLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
myLayer.on('mouseout', function(e) {
    e.layer.closePopup();
});