// manage song retrieval from spotify API

// need class Spotify with constructor (keys)
// see top of liri

// class for Spotify object to manage song inquiries
class Spotify {
  constructor(apiKey) {
    this.apiKey = apiKey;
    }
  //methods

  // remove this when done testing
  hello() {
    console.log('in Spotify class object.hello()');
    console.log('Hello world - this is songs.js');
    console.log('apikey: ',this.apiKey);
  }

  // get Song from Spotify
  getSong(searchName) {
    console.log('in Spotify class object.getSong()');
    if (searchName === '') searchName = 'The Sign';
    console.log('search name is: ',searchName);
  }
}



// module.exports for use in other .js files
module.exports = {
  Spotify: Spotify
};

// Spotify does this:

// node liri.js spotify-this-song '<song name here>'




// This will show the following information about the song in your terminal/bash window


// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


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