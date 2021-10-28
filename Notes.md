## Notes for this module

- He uses an API service called Darksky but I can't use it because I have to register and it's currently not accepting new registrations

- This service (Darksky) doesn't let him 'GET' the data from the public index.html (<u>**client-side fetch**</u>), it throws an error known as CORS [^1] 

- He says this error is basically a security-related issue. That's because, in order to access the data, you have to enter your API key and that's private information. <mark>So the API doesn't process your request unless it's done from your server</mark> (<u>**server-side**</u>)

- This all means that we'll make that request (weather-fetch-get request) from our server (server-side)







[^1]: Check [**WebDevSimplified's video on CORS**](https://www.youtube.com/watch?v=PNtFSVU-YTI), maybe it's not that hard to understand


