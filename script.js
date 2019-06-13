
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const googleKey = 'AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA';
const address = '322+Sowol-ro,+Hannam-dong+Yongsan-gu,+Seoul';

const testGeoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA';

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchaddress = $('#address').val().trim();
      console.log(searchaddress);
      getGeo(searchaddress);
    });
  }

function getGeo(address) {
  console.log(`getGeo is working`);
  const params = {
    address: address,
    key: googleKey,
    }
const queryString = formatQueryParams(params)
const URL = geocodeURL + queryString; 
console.log(URL);

fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayGeoResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function displayGeoResults(responseJson) {
  console.log(responseJson);
  console.log(`display is running`);
  const LAT = responseJson.results[0].geometry.location.lat;
  const LNG = responseJson.results[0].geometry.location.lng;
  console.log(`lat is ${LAT}`);
  console.log(`long is ${LNG}`);
}



function formatQueryParams(params) {
  console.log(`format query params is working`)
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('+CA&');
}

$(watchForm);
