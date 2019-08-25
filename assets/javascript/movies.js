// manage movie retrieval from OMDB API

// will need a class named OMDB with constuctor of key

// will need to be able to do this:

// node liri.js movie-this '<movie name here>'

// class for OMDB object to manage song inquiries
class OMDB {
  constructor(apiKey) {
    this.apiKey = apiKey;
    }
  //methods

  // remove this when done testing
  hello() {
    console.log('in OMDB class object.hello()');
    console.log('Hello world - this is movies.js');
    console.log('apikey: ',this.apiKey);
  }

  // get Song from Spotify
  getMovie(searchName) {
    console.log('in OMDB class object.getMovie()');
    console.log('search name is: ',searchName);
    if (searchName === undefined) searchName = 'Mr. NoBody';
  }
}

// module.exports for use in other .js files
module.exports = {
  OMDB: OMDB
};


// This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, 
// the OMDB API requires an API key. You may use trilogy.