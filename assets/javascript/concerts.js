// manage concert information retrieve from Bands In Town API

// Include the axios npm package 
var axios = require("axios");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");

// require for moment
var moment = require("moment");

// instansiate new file command object
var myFileCommand = new fileCommandClass.FileManage();

// class for BandsInTown object to manage concert inquiries
class BandsInTown {
  constructor(apiKey) {
    this.apiKey = apiKey;
    }

  //methods
 
  // get Concert from Bands In Town API
  getConcert(searchName) {
    // console.log('in BandsInTown class object.getConcert()');
    if (searchName === '') searchName = 'Bon Jovi';
    var urlArtist = searchName.toLowerCase().replace(' ','+');
    var apiURL = "https://rest.bandsintown.com/artists/" + urlArtist + "/events?app_id=" + this.apiKey.id; 
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(apiURL).then(
      function(response) {
        var schedule = response.data;
        var headerString = 'There are ' + schedule.length + ' scheduled appearances for ' + searchName

        // log output header
        console.log(headerString);
        myFileCommand.appendToLog(headerString); 
        
        schedule.forEach(appearance => {
          // Venue location + Venue name + Date
          var outputString = appearance.venue.city + 
          ((appearance.venue.region === '') ? '' : ', ' + appearance.venue.region) +
          ((appearance.venue.country === 'United States') ? '' : ', ' + appearance.venue.country) +
          ' at ' + appearance.venue.name + ' ' + moment(appearance.datetime).format("MM/DD/YYYY");

          // log the appearance data
          console.log(outputString);
          myFileCommand.appendToLog(outputString);           
        });
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
  BandsInTown: BandsInTown
};


