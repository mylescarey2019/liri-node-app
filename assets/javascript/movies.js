// manage movie retrieval from OMDB API

// Include the axios npm package 
var axios = require("axios");

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
  // hello() {
  //   console.log('in OMDB class object.hello()');
  //   console.log('Hello world - this is movies.js');
  //   console.log('apikey: ',this.apiKey);
  // }



//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.


  // get Movie from OMDB API
  getMovie(searchName) {
    console.log('in OMDB class object.getMovie()');
    if (searchName === '') searchName = 'Mr. NoBody';
    console.log('apikey: ',this.apiKey);
    console.log('search name is: ',searchName);

    var urlMovieTitle = searchName.toLowerCase().replace(' ','+');
    var apiURL = "http://www.omdbapi.com/?t=" + urlMovieTitle + "&y=&plot=short&apikey=trilogy"
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(apiURL).then(
    // axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log(response);
        //    * Title of the movie.
        //    * Year the movie came out.
        //    * IMDB Rating of the movie.
        //    * Rotten Tomatoes Rating of the movie.
        //    * Country where the movie was produced.
        //    * Language of the movie.
        //    * Plot of the movie.
        //    * Actors in the movie.
        console.log("The movie's title is: " + response.data.Title);
        console.log("The movie's year is: " + response.data.Year);
        console.log("The movie's imdb rating is: " + response.data.imdbRating);
        console.log("The movie's rotten tomatoes rating is: " + response.data);
        console.log(response.data);
        console.log(response.data.Ratings[0].Source);
        console.log(response.data.Ratings[0].Value);
        console.log(response.data.Ratings[1].Source);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Ratings[2].Source);
        console.log(response.data.Ratings[2].Value);
        console.log("The movie's country is: " + response.data.Country);
        console.log("The movie's language is: " + response.data.Language);
        console.log("The movie's plot is: " + response.data.Plot);
        console.log("The movie's actors is: " + response.data.Actors);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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