
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const googleKey = 'AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA';





function autocomplete() {
  console.log(`autocomplete is running`);
  var input = document.getElementById('AC');
  var options = {
  // types: ['(geocode)'],
  componentRestrictions: { country: "kr" }
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  $('form').submit(event => {
    event.preventDefault();
    const searchAddress = $('#AC').val();
    console.log(searchAddress);
    formatAddress(searchAddress);

  })}

    function formatAddress(searchAddress) {
    let cleanAddress = searchAddress.replace(/\s+/g, '+');
    console.log(cleanAddress);
    getGeo(cleanAddress);
}

   

    // var place = autocomplete.getPlace();
    // console.log(place);
    // var lat = place.geometry.location.lat;
    // console.log(lat);
    // var lgn = place.geometry.location.lgn;
    // console.log(lgn);
  
    
  // places()

// function watchForm() {
//     $('form').submit(event => {
//       event.preventDefault();
//       const searchaddress = $('#address').val().trim();
//       console.log(searchaddress);
//       getGeo(searchaddress);
//     });


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
      .then(responseJson => setLngLat(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function setLngLat(responseJson) {
  console.log(responseJson);
  console.log(`set lnglats running`);
  const LAT = responseJson.results[0].geometry.location.lat;
  const LNG = responseJson.results[0].geometry.location.lng;
  console.log(`lat is ${LAT}`);
  console.log(`long is ${LNG}`);
  createLinks(LAT,LNG);

    // 37.5663797, 126.9777154 Seoul
    // http://maps.google.com/maps/place/37.5667397,126.9777154 (no side panel)
  // http://maps.google.com/maps?q=37.5663797,126.9777154 (side panel)
  // http://map.daum.net/link/map/37.5663797,126.9777154 (side panel)
  // http://map.naver.com/?elat=37.5663797&elng=126.9777154 (side panel)
}

function createLinks(LAT, LNG) {
   $('js-display-results').empty();
   $('#js-display-results').append(`
  <a href="http://maps.google.com/maps?q=${LAT},${LNG}" target="_blank">Open in Google Maps</a>
  <a href="http://map.naver.com/?elat=${LAT}&elng=${LNG}" target="_blank" >Open in Naver Maps</a>
  <a href="http://map.daum.net/link/map/${LAT},${LNG}" target="_blank">Open in Kakao Maps</a>`)
}




function formatQueryParams(params) {
  console.log(`format query params is working`)
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('+CA&');
}

$(autocomplete);

