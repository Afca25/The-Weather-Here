## Notes for this module

- He uses an API service called Darksky but I can't use it because I have to register and it's currently not accepting new registrations

- This service (Darksky) doesn't let him 'GET' the data from the public index.html (<u>**client-side fetch**</u>), it throws an error known as CORS [^1] 

- He says this error is basically a security-related issue. That's because, in order to access the data, you have to enter your API key and that's private information. <mark>So the API doesn't process your request unless it's done from your server</mark> (<u>**server-side**</u>)

- This all means that we'll make that request (weather-fetch-get request) from our server (server-side)

- That's all good but **fetch()** is a <u>client-side browser API</u> , meaning,<u> I can't use fetch on my server unless I install a node package called node-fetch</u>

- node-fetch gave me an error because I installed v3.0.0 and he installed v2.6.0, my version was newer and was called as a "module" so you'd have to type 
  
  ```javascript
  import fetch from 'node-fetch'
  // instead of 
  const fetch = require('node-fetch')
  ```

- This error was HARD to find an answer on my own, but I did it (!) I uninstalled my node-fetch, found out his version,  installed specifically his version and it ran perfectly. (Apparently you CANNOT mix 'require' and 'import-from')

- I had an error trying to use .split() on a constant associated to an array. It doesn't work. It has to be directly to the array/object like this:
  
  ```javascript
  /* ---- WRONG WAY ---- */
  const latlon = request.params.latlon
  latlon.split(',')
  console.log(latlon) // logs a string 33.552,-25.226
  const lat = latlon[0]
  const lon = latlon[1]
  console.log(lat, lon) // logs 0,1
  
  /*---- RIGHT WAY ----*/
  const latlon = request.params.latlon.split(',')
  const lat = latlon[0]
  const lon = latlon[1]
  ```

#### Hiding API keys inside your code (Environment variable)

It's like any other variable (like const or let) but it's not set in the code, it's set <u>in the environment</u>.

 It depends on the environment you're currently working on or on the web-server where you're hosting the page. However, you need 2 steps. Store in your environment on Node.js and hide it from git/github 

###### On Node.js

You can use an npm package called [**DotEnv**](C:\Alfredo Cabrera\Personal\Intereses\Study\Web Developer\How to hide your API key in your code using DotEnv on Node.js.md) 

###### Hiding from git/github

create a file in your project's folder called '.gitignore' and inside that file copy on each line the name of the file you want to hide.

For example:

    .env

    node_modules/      ---> why the slash? because it's a folder

    database.db





[^1]: Check [**WebDevSimplified's video on CORS**](https://www.youtube.com/watch?v=PNtFSVU-YTI), maybe it's not that hard to understand
