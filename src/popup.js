function getUserLoc(successCallback, errorCallback) {
  renderStatus('Finding user location... ');
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function getEstimatedAddress(coords, successCallback) {
  var baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
  var x = new XMLHttpRequest();
  x.open('GET', baseUrl + coords.latitude + ','+coords.longitude);
  x.onreadystatechange = function (aEvt) {
    if (x.readyState == 4) {
      if(x.status == 200)
        var googleResults = JSON.parse(x.responseText);
        successCallback(googleResults.results);
    }
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderLat(latitude) {
  document.getElementById('latitude').textContent = 'Latitude: ' + latitude;
}

function renderLong(longitude) {
  document.getElementById('longitude').textContent = 'Longitude: ' + longitude;
}

function renderEstimatedAddress(results) {
  var address;
  if (results.length > 0) {
    document.getElementById('estimatedAddress').textContent = 'Estimated address: ' + results[0].formatted_address;
  }
  else {
    document.getElementById('estimatedAddress').textContent = 'Address not found...';
  }
}

document.addEventListener('DOMContentLoaded', function() {
    getUserLoc(function(position) {
      var coords = position.coords;
      renderStatus('');
      renderLat(coords.latitude);
      renderLong(coords.longitude);
      getEstimatedAddress(coords, function(results){
        renderEstimatedAddress(results);
      });
    }, function(error) {
      renderStatus(error);
    });
});
