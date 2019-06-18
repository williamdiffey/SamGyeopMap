
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const googleKey = 'AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA';
const aqiURL = 'https://api.airvisual.com/v2/nearest_city?';
const aqiKey = 'WxnLijJNB9ho8LCvz';


function loadPage() {
  $('.reloadPage').hide;
  $('#js-error-message').hide;
  $('js-display-results').hide;
  autocomplete();
}


function autocomplete() {
  var input = document.getElementById('AC');
  var options = {
  // types: ['(geocode)'],
  componentRestrictions: { country: "kr" }
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  $('form').submit(event => {
  event.preventDefault();
  const searchAddress = $('#AC').val().trim();
  console.log(searchAddress);
  formatAddress(searchAddress);
  })
}


function formatAddress(searchAddress) {
  let cleanAddress = searchAddress.replace(/\s+/g, '+');
  getGeo(cleanAddress);
}


function getGeo(address) {
  const params = {
    address: address,
    key: googleKey,
    }
  const queryString = formatQueryParams(params);
  const URL = geocodeURL + queryString; 
  
  fetch(URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => setLngLat(responseJson))
    .catch(err => {
      $('#js-error-message').text(`We had a problem getting address data: ${err.message}`);
    });
}


function formatQueryParams(params) {
  console.log(`format query params is working`)
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('+CA&');
}

function getAQI(LAT, LGN) {
  const aqiParams = {
    lat: LAT,
    lon: LGN,
    key: aqiKey,
  }
  const aqiQueryString = aqiFormatQueryParams(aqiParams);
  const URL = aqiURL + aqiQueryString; 
  console.log(URL);

      fetch(URL)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(responseJson => setAQI(responseJson))
        .catch(err => {
          $('#js-aqi-error-message').text(`We had a problem getting AQI data: ${err.message}`);
        });
}


function aqiFormatQueryParams(params) {
  console.log(`format query params is working`)
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function setLngLat(responseJson) {
  const LAT = responseJson.results[0].geometry.location.lat;
  const LNG = responseJson.results[0].geometry.location.lng;
  displayLinks(LAT,LNG);
  getAQI(LAT,LNG);
}


function setAQI(responseJson) {
  const aqiResult = responseJson.data.current.pollution.aqius;
  console.log(aqiResult);
  displayAQI(aqiResult);
  
  
}


function displayLinks(LAT, LNG) {
   $('js-display-results').empty();
   $('form').hide();
   $('#reloadPage').show();
   $('#js-display-results').append(`
  <section aria-label="Links to map services">
    <ul>
      <li><a href="http://maps.google.com/maps?q=${LAT},${LNG}" target="_blank">Open in Google Maps</a></li>
      <li><a href="http://map.naver.com/?elat=${LAT}&elng=${LNG}" target="_blank" >Open in Naver Maps</a></li>
      <li><a href="http://map.daum.net/link/map/${LAT},${LNG}" target="_blank">Open in Kakao Maps</a></li>
    </ul>
  </section>
  `);
  
  reloadPage();
}


function displayAQI(aqi) {
  $('js-aqi-display-results').empty();
  $('#js-display-results').append(`
  <section aria-label="AQI data">
  <p>AQI at this location is currently ${aqi}</p>
  </section>`);
}


function reloadPage() {
  $('#reloadPage').append(`<input type="button" class="reloadPage" value="Find another location"></input>`)
  $('.reloadPage').click(function (event) {
  location.reload();
  });
}


$(loadPage);

