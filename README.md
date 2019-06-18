SamGyeopMap - Korean Location Sharing App.

Background:
The Korean online Map market has 4 main players at the time of writing, Google and Apple as well as domestic offerings from Naver (Naver Maps) and Daum (Kakao Maps). At present Google maps is unable to provide navigation in Korea, in addition its maps are generally less detailed and more likely to be out of date (see attached screen shots for anecdotal examples). To add to the complexity for users, more and more apps such as Kakao Taxi has close integration with one map service or another - for example Kakao Taxi.

Problem:
As map user, this fragmentation of apps leaves me with locations I have pinned spread over several locations. Ideally I would always save locations of interest to one service but the process of retyping out addresses and saving them, in reality get neglected. I have 3 map services on my phone and I need them all.

Scope of the app:
The main purpose of this app then it to allow users a way to choose what service they use to open a link to a location. User can type an address in just once and then open it in the app or webpage of their choice. This is useful as I may want to open it on Google maps (where I store all my locations) but then open it in Kakao to order a taxi or in Naver if I want to use it's route guidance.


Method:
This app will utilise Google's Places and Maps APIs to autofill a search form and return the co-ordinates for that location respectively. My original plan was to use Naver and Kakao APIs to reverse geolocate those coordinates and open at the requested address. Happily, especially considering the cost of keeping 4 different APIs running, I found that the services would accept coordinates as part of their URL scheme, thus removing the need for additional APIs. This reduction in workload allowed me to add air pollution data to the results (Air quality is a perenial concern in Korea).

Name:
The name of the app is a play on the name of the ever popular samgyeopsal (3 layers of flesh) pork dish - we offer 3 layers of maps. This was chosen as it's something that represents Korea but mainly it lets me use a pig logo.

Next steps:
The next main step will be to incorporate a back end that would allow users to log in, and keep the pages of shared locations alive. Businesses will be able to store their location and send the link out to any customers that require it.
The other issue to overcome is to find a way to generate income to pay for the hosting and the Google API fees. Obvious candidates are ads or fees for premium services such as pages for businesses or saving multiple locations for quick sharing.  
