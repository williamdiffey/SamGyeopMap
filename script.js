
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const googleKey = 'AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA';
const aqiURL = 'https://api.airvisual.com/v2/nearest_city?';
const aqiKey = 'WxnLijJNB9ho8LCvz';


function loadPage() {
  $('.reloadPage').hide;
  $('#js-error-message').hide;
  $('#js-aqi-display-results').hide;
  $('#js-display-results').hide;
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
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function setLngLat(responseJson) {
  const LAT = responseJson.results[0].geometry.location.lat;
  const LNG = responseJson.results[0].geometry.location.lng;
  getAQI(LAT,LNG);
  displayLinks(LAT,LNG);
  
}


function setAQI(responseJson) {
  const aqiResult = responseJson.data.current.pollution.aqius;
  displayAQI(aqiResult);
  
  
}


function displayLinks(LAT, LNG) {
   $('js-display-results').empty();
   $('form').hide();
   $('#instructions').hide();
   $('#reloadPage').show();
   $('#js-display-results').append(`
  <section aria-label="Links to map services">
    <ul>
      <li><a href="http://maps.google.com/maps?q=${LAT},${LNG}" target="_blank">
        <img src="images/Google.png" alt="Google Maps Logo" class="gmapicon">
      </a></li>
      <li><a href="http://map.naver.com/?elat=${LAT}&elng=${LNG}" target="_blank">
        <img src="images/Naver.png" alt="Naver Maps Logo" class="nmapicon">
      </a></li>
      <li><a href="http://map.daum.net/link/map/${LAT},${LNG}" target="_blank">
        <img src="images/Kakao.png" alt="Kakao Maps Logo"class="kmapicon">
      </a></li>
    </ul>
  </section>
  `);
  
// <a href="default.asp">
  // <img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;border:0">
  // </a>

  reloadPage();
}


function displayAQI(aqi) {
  $('js-aqi-display-results').empty();
  $('#js-aqi-display-results').append(`
  <section aria-label="AQI data">
  <p>AQI near this location is currently ${aqi}</p>
  </section>`);
}


function reloadPage() {
  $('#reloadPage').append(`<input type="button" class="reloadPage" value="Find another location"></input>`)
  $('.reloadPage').click(function (event) {
  location.reload();
  });
}


$(loadPage);

