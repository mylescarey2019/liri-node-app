// manage song retrieval from spotify API

// Include the axios npm package 
var axios = require("axios");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");

// instansiate new file command object
var myFileCommand = new fileCommandClass.FileManage();

// configure spotify
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

// class for Musc object to manage song inquiries
class Music {
  constructor() {
    }
  //methods

  // remove this when done testing
  // hello() {
  //   console.log('in Spotify class object.hello()');
  //   console.log('Hello world - this is songs.js');
  //   console.log('apikey: ',this.apiKey);
  // }

  // get Song from Spotify API
  getSong(searchName) {
    console.log('in Music class object.getSong()');
    if (searchName === '') searchName = 'The Sign';
    console.log('spotify id: ',process.env.SPOTIFY_ID);
    console.log('spotify secret: ',process.env.SPOTIFY_SECRET);
    console.log('search name is: ',searchName);


    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      // Artist(s)
      // The song's name
      // A preview link of the song from Spotify
      // The album that the song is from
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      var songs = data.tracks.items;
      console.log("artist: " + songs[0].artists[0].name);
      console.log("song name: " + songs[0].name);
      console.log("preview song: ", (songs[0].album.preview_url === undefined) ? 'not available' : songs[0].album.preview_url);
      console.log("album name: " + songs[0].album.name);
      
      
      
      // console.log(data.tracks.items);
      // console.log("artists: ", data.tracks.items.artists);
      // console.log("song name: ", data.tracks.items.name);
      
     
      

      


    // console.log(data); 
    });

    // var urlArtist = searchName.toLowerCase().replace(' ','+');
    // var apiURL = "https://rest.bandsintown.com/artists/" + urlArtist + "/events?app_id=codingbootcamp"
    // // https://rest.bandsintown.com/artists/john%20mayer/events?app_id=codingbootcamp
    // // Then run a request with axios to the OMDB API with the movie specified
    // axios.get(apiURL).then(
    //   function(response) {
    //     // console.log(response.data[0]);
    //     var schedule = response.data;
    //     // console.log(schedule);
    //     var headerString = 'There are ' + schedule.length + ' scheduled appearances for ' + searchName

    //     // log output header
    //     console.log(headerString);
    //     myFileCommand.appendToLog(headerString); 
        
    //     schedule.forEach(appearance => {
    //       // Venue location + Venue name + Date
    //       var outputString = appearance.venue.city + 
    //       ((appearance.venue.region === '') ? '' : ', ' + appearance.venue.region) +
    //       ((appearance.venue.country === 'United States') ? '' : ', ' + appearance.venue.country) +
    //       ' at ' + appearance.venue.name + ' ' + moment(appearance.datetime).format("MM/DD/YYYY");

    //       // log the appearance data
    //       console.log(outputString);
    //       myFileCommand.appendToLog(outputString);           
    //     });
    //   })
    //   .catch(function(error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log("---------------Data---------------");
    //       console.log(error.response.data);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.status);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
  }
}



// module.exports for use in other .js files
module.exports = {
  Music: Music
};

// Spotify does this:

// node liri.js spotify-this-song '<song name here>'




// This will show the following information about the song in your terminal/bash window





// If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// The Spotify API requires you sign up as a developer to generate the necessary credentials.
// You can follow these steps in order to generate a client id and client secret:
// Step One: Visit https://developer.spotify.com/my-applications/#!/
// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to 
// register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields.
// When finished, click the "complete" button.
// Step Four: On the next screen, scroll down to where you see your client id and client secret. 
// Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.