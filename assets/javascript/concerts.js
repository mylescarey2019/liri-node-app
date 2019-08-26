// manage concert information retrieve from Bands In Town API

// will need a class BandsInTown with constructor of key

// will have to do this:

// node liri.js concert-this <artist/band name here>

// class for BandsInTown object to manage concert inquiries
class BandsInTown {
  constructor(apiKey) {
    this.apiKey = apiKey;
    }
  //methods
  
  // remove this when done testing
  // hello() {
  //   console.log('in OMDB class object.hello()');
  //   console.log('Hello world - this is concerts.js');
  //   console.log('apikey: ',this.apiKey);
  // }

  // get Concert from Band In Town
  getConcert(searchName) {
    console.log('in BandsInTown class object.getConcert()');
    if (searchName === '') searchName = 'Bon Jovi';
    console.log('apikey: ',this.apiKey);
    console.log('search name is: ',searchName);
  }
}

// module.exports for use in other .js files
module.exports = {
  BandsInTown: BandsInTown
};

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")





