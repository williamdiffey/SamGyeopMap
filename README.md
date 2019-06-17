Samgyeopmap - Korean Location Sharing App.

Background:
The Korean online Map market has 4 main players at the time of writing, Google and Apple as well as domestic offerings from Naver (Naver Maps) and Daum (Kakao Maps). At present Google maps is unable to provide navigation in Korea, in addition its maps are generally less detailed and more likely to be out of date (see attached screen shots for anecdotal examples). To add to the complexity for users, more and more apps such as Kakao Taxi has close integration with one map service or another - for example Kakao Taxi.

Problem:
As map user, this fragmentation of apps leaves me with locations I have pinned spread over several locations. Ideally I would always save locations of interest to one service but the process of retyping out addresses and saving them, in reality get neglected. I have 4 map services on my phone and I need them all. A business owner, sharing the location of my premises means I either have to ask what service people would like a link to be sent for,or just using my address and hoping they find us okay.

Scope of the app:
The main purpose of this app then it to allow users a way to choose what service they use to open a link to a location. If I am in a bar and send a link, I want to know that people can see it in whatever map service they prefer without me having to open each service - especially if it is linked to the app they will use to hail a taxi. I want my customers to be able to use whatever map service they prefer to plan a route to our premises with a few simple clicks. People are busy, customers are fickle, these small things can make a difference in the long run. Additionally, especially as an expat, I sometimes like to scout a location with more than one map service, especially as my preference is still Google maps. Naver or Kakao just tend to offer more detail. I want to be able to do all of these things by searching for the address once.

Method:
Simply, this app will utilise Google's Places and Maps APIs to autofill a search form and return the co-ordinates for that location respectively. My original plan was to use Naver and Kakao APIs to reverse geolocate those coordinates and open at the requested address. Happily, especially considering the cost of keeping 4 different APIs running, I found that the services would accept coordinates as part of their URL scheme, thus removing the need for additional APIs. This reduction in workload allowed me to add air pollution data to the results (Air quality is a perenial concern in Korea).

Name:
The name of the app is a play on the name of the ever popular samgyeopsal (3 layers of flesh) pork dish. We offer 3 layers of maps; it's less delicious but hopefully will be of use to many people.

Next steps:
The next main step will be to incorporate a back end that would allow users to log in, and the pages of shared locations alive. Businesses will be able to store their location and send the link out to any customers that require it.
The other issue to overcome is to find a way to generate income to pay for the hosting and the Google API fees. Obvious candidates are ads or fees for premium services such as pages for businesses or saving multiple locations for quick sharing.  



Input
https://developers.google.com/maps/documentation/javascript/places-autocomplete

Geocoding
https://developers.google.com/maps/documentation/geocoding/start

LongLat lookup
http://apis.map.daum.net/
https://translate.google.com/translate?hl=en&sl=ko&u=https://developers.kakao.com/docs/restapi/local&prev=search

LongLat lookup
https://www.airvisual.com/air-pollution-data-api or 
https://aqicn.org/json-api/doc/


Hyatt Grand address for testing
서울시 용산구 소월로 322, 서울, 대한민국, 04347
322 Sowol-ro, Hannam-dong Yongsan-gu, Seoul

Google API key AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA

Google Places service for autolookup 
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB58D6ZX3OPAiYJrToJCxE7g5CybwcASAA&libraries=places"></script>