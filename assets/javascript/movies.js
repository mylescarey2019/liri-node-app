// manage movie retrieval from OMDB API

// Include the axios npm package 
var axios = require("axios");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");

// instansiate new file command object
var myFileCommand = new fileCommandClass.FileManage();

// node liri.js movie-this '<movie name here>'

// class for OMDB object to manage song inquiries
class OMDB {
  constructor(apiKey) {
    this.apiKey = apiKey;
    }
  //methods

  // get Movie from OMDB API
  getMovie(searchName) {
    // console.log('in OMDB class object.getMovie()');
    if (searchName === '') searchName = 'Mr. NoBody';
    // console.log('apikey: ',this.apiKey);
    // console.log('search name is: ',searchName);

    // var urlMovieTitle = searchName.toLowerCase().replace(' ','+');
    // var urlMovieTitle = searchName;
    // console.log('title is: ', urlMovieTitle);
     
    var apiURL = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=" + this.apiKey.id;
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(apiURL).then(
      function(response) {
        // console.log(response);

        //    * Title of the movie.
        var movieTitle = 'Title: ' + response.data.Title;

        //    * Year the movie came out.
        var movieYear = 'Year: ' + response.data.Year;

        //    * Rated
        var movieRated = 'Rated: ' + response.data.Rated;

        //    * IMDB Rating of the movie.
        var movieImdbRating = 'IMDB Rating: ' + response.data.imdbRating;

        //    * Rotten Tomatoes Rating of the movie.
        var movieRottenTomatoes = 'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value;

        //    * Country where the movie was produced.
        var movieCountry = "Country: " + response.data.Country;

        //    * Language of the movie.
        var movieLanguage = "Language: " + response.data.Language

        //    * Plot of the movie.
        var moviePlot = "Plot: " + response.data.Plot;

        //    * Actors in the movie.
        var movieActors = "Actors: " + response.data.Actors;

        // log movie detals
        console.log(movieTitle);
        myFileCommand.appendToLog(movieTitle);
        console.log(movieYear);
        myFileCommand.appendToLog(movieYear);
        console.log(movieRated);
        myFileCommand.appendToLog(movieRated);
        console.log(movieImdbRating);
        myFileCommand.appendToLog(movieImdbRating);
        console.log(movieRottenTomatoes);
        myFileCommand.appendToLog(movieRottenTomatoes);
        console.log(movieCountry);
        myFileCommand.appendToLog(movieCountry);
        console.log(movieLanguage);
        myFileCommand.appendToLog(movieLanguage);
        console.log(moviePlot);
        myFileCommand.appendToLog(moviePlot);
        console.log(movieActors);
        myFileCommand.appendToLog(movieActors);

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